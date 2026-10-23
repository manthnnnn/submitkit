import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { parseAdminSession, hasPermission } from '@/lib/rbac';
import { logAuditAction } from '@/lib/audit';
import { revalidateTag } from 'next/cache';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import zlib from 'zlib';
import { promisify } from 'util';

const deflate = promisify(zlib.deflateRaw);

function getR2Client() {
  return new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
    },
  });
}

/**
 * Minimal ZIP validator — reads local file headers to verify ZIP structure.
 * Returns { valid, fileCount, paths } without extracting anything.
 */
function validateZip(buffer: Buffer): { valid: boolean; fileCount: number; paths: string[]; error?: string } {
  try {
    // ZIP local file header signature = 0x04034b50 (PK\x03\x04)
    const SIG = 0x04034b50;
    let offset = 0;
    let fileCount = 0;
    const paths: string[] = [];

    while (offset < buffer.length - 4) {
      const sig = buffer.readUInt32LE(offset);
      if (sig !== SIG) break;

      const compressionMethod = buffer.readUInt16LE(offset + 8);
      const compressedSize    = buffer.readUInt32LE(offset + 18);
      const fileNameLen       = buffer.readUInt16LE(offset + 26);
      const extraLen          = buffer.readUInt16LE(offset + 28);
      const fileName          = buffer.subarray(offset + 30, offset + 30 + fileNameLen).toString('utf8');

      // Path traversal check
      if (fileName.includes('../') || fileName.startsWith('/') || fileName.includes('..\\')) {
        return { valid: false, fileCount, paths, error: `Path traversal detected: "${fileName}"` };
      }

      paths.push(fileName);
      fileCount++;

      // Advance to next entry
      offset += 30 + fileNameLen + extraLen + compressedSize;

      // Safety: avoid infinite loop on malformed ZIPs
      if (fileCount > 10000) break;
    }

    if (fileCount === 0) {
      return { valid: false, fileCount: 0, paths: [], error: 'ZIP appears to be empty or corrupt' };
    }

    return { valid: true, fileCount, paths };
  } catch (err) {
    return { valid: false, fileCount: 0, paths: [], error: `Failed to parse ZIP: ${String(err)}` };
  }
}

/**
 * Re-packages the ZIP: reads raw bytes, writes a new ZIP using maximum deflate compression.
 * For simplicity in edge-compatible Node environment, we re-compress the whole archive
 * as a deflated single buffer. We keep the original ZIP intact but compressed further
 * using gzip level 9 as the outer wrapper — this gives the best compression ratio
 * without needing a native unzip/rezip cycle.
 */
async function recompressBuffer(original: Buffer): Promise<Buffer> {
  // Re-compress the entire ZIP at max zlib level using deflateRaw
  // This wraps the ZIP in a maximum-compressed envelope
  // (The download route will need to serve as-is; the ZIP itself is already valid)
  // Actually: best approach is to gzip-compress the ZIP contents
  return new Promise((resolve, reject) => {
    zlib.gzip(original, { level: 9 }, (err, result) => {
      if (err) reject(err);
      else {
        // If gzip is smaller, use it; otherwise keep original
        resolve(result.length < original.length ? result : original);
      }
    });
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get('admin_token')?.value;
  const session = await parseAdminSession(token);

  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(session.role, 'projects:upload')) {
    return NextResponse.json({ error: 'Forbidden: no upload permission' }, { status: 403 });
  }

  const { id } = await params;

  // Parse multipart form data
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('zipFile') as File | null;
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  // Size check — 200MB max
  const MAX_BYTES = 200 * 1024 * 1024;
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: `File too large (max 200MB, got ${(file.size / 1024 / 1024).toFixed(1)}MB)` }, { status: 400 });
  }

  // Type check
  if (!file.name.toLowerCase().endsWith('.zip')) {
    return NextResponse.json({ error: 'Only .zip files are allowed' }, { status: 400 });
  }

  // Read buffer
  const arrayBuf = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuf);

  // Validate ZIP structure
  const validation = validateZip(buffer);
  if (!validation.valid) {
    return NextResponse.json({ error: validation.error || 'Invalid ZIP file' }, { status: 422 });
  }

  // Warn if no README (non-blocking)
  const hasReadme = validation.paths.some(p =>
    p.toLowerCase().includes('readme') || p.toLowerCase() === 'main.py' || p.toLowerCase() === 'index.js'
  );

  // Fetch the project to get its slug
  const supabase = createAdminClient();
  const { data: project, error: projErr } = await supabase
    .from('projects')
    .select('slug, title')
    .eq('id', id)
    .single();

  if (projErr || !project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  // Re-compress the ZIP
  let finalBuffer: Buffer;
  try {
    // We keep the ZIP as-is (it's already a valid ZIP format that customers download)
    // but we attempt to reduce size via max-level zlib on the raw bytes
    // Note: ZIP files are already compressed; we store as-is to maintain ZIP validity
    finalBuffer = buffer; // Store original ZIP directly — it must remain a valid ZIP
  } catch {
    finalBuffer = buffer;
  }

  const storageKey = `bundles/${project.slug}.zip`;

  // Upload to Cloudflare R2
  try {
    const r2 = getR2Client();
    await r2.send(new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || 'projecthub',
      Key: storageKey,
      Body: finalBuffer,
      ContentType: 'application/zip',
      ContentLength: finalBuffer.length,
      Metadata: {
        'project-id': id,
        'project-slug': project.slug,
        'uploaded-by': session.email,
        'file-count': String(validation.fileCount),
        'original-name': file.name,
        'uploaded-at': new Date().toISOString(),
      },
    }));
  } catch (uploadErr) {
    console.error('[upload-zip] R2 upload failed:', uploadErr);
    return NextResponse.json({ error: 'Upload to cloud storage failed. Check R2 credentials.' }, { status: 502 });
  }

  // Update project record with new storage key
  const { error: updateErr } = await supabase
    .from('projects')
    .update({ s3_storage_key: storageKey })
    .eq('id', id);

  if (updateErr) {
    return NextResponse.json({ error: `File uploaded but DB update failed: ${updateErr.message}` }, { status: 500 });
  }

  // Audit log
  await logAuditAction({
    admin_email: session.email,
    action: 'PROJECT_ZIP_UPLOAD',
    entity_type: 'PROJECT',
    entity_id: id,
    metadata: {
      storageKey,
      fileCount: validation.fileCount,
      sizeBytes: file.size,
      hasReadme,
      originalName: file.name,
    },
  });

  // Revalidate cache
  try { revalidateTag('projects', { expire: 0 }); } catch { /* ignore */ }

  return NextResponse.json({
    success: true,
    storageKey,
    fileCount: validation.fileCount,
    sizeBytes: finalBuffer.length,
    warning: !hasReadme ? 'No README or main entry file found in ZIP — verify the project structure.' : null,
  });
}
