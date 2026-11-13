import { NextRequest, NextResponse } from 'next/server';
import { parseAdminSession, hasPermission } from '@/lib/rbac';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

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

function validateZip(buffer: Buffer): { valid: boolean; fileCount: number; paths: string[]; error?: string } {
  try {
    const SIG = 0x04034b50;
    let offset = 0;
    let fileCount = 0;
    const paths: string[] = [];

    while (offset < buffer.length - 4) {
      const sig = buffer.readUInt32LE(offset);
      if (sig !== SIG) break;

      const compressedSize = buffer.readUInt32LE(offset + 18);
      const fileNameLen = buffer.readUInt16LE(offset + 26);
      const extraLen = buffer.readUInt16LE(offset + 28);
      const fileName = buffer.subarray(offset + 30, offset + 30 + fileNameLen).toString('utf8');

      if (fileName.includes('../') || fileName.startsWith('/') || fileName.includes('..\\')) {
        return { valid: false, fileCount, paths, error: `Path traversal detected: "${fileName}"` };
      }

      paths.push(fileName);
      fileCount++;
      offset += 30 + fileNameLen + extraLen + compressedSize;
      if (fileCount > 10000) break;
    }

    if (fileCount === 0) {
      return { valid: false, fileCount: 0, paths: [], error: 'ZIP file appears empty or corrupt' };
    }

    return { valid: true, fileCount, paths };
  } catch (err) {
    return { valid: false, fileCount: 0, paths: [], error: `ZIP parsing error: ${String(err)}` };
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  const session = await parseAdminSession(token);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'projects:upload') && !hasPermission(session.role, 'projects:create')) {
    return NextResponse.json({ error: 'Forbidden: Insufficient role permissions' }, { status: 403 });
  }

  const formData = await req.formData().catch(() => null);
  if (!formData) {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = (formData.get('file') || formData.get('zipFile')) as File | null;
  const slug = (formData.get('slug') as string | null) || 'project';

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const cleanName = file.name.toLowerCase();
  const isZip = cleanName.endsWith('.zip');
  const isDocx = cleanName.endsWith('.docx');
  const isImage = cleanName.endsWith('.jpg') || cleanName.endsWith('.jpeg') || cleanName.endsWith('.png') || cleanName.endsWith('.webp');

  const MAX_SIZE = 200 * 1024 * 1024; // 200MB
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File exceeds 200MB limit' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  if (isZip) {
    const validation = validateZip(buffer);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error || 'Invalid ZIP structure' }, { status: 400 });
    }
  }

  const sanitizedSlug = slug.replace(/[^a-z0-9_-]/gi, '-').toLowerCase();
  let storageKey = `bundles/${sanitizedSlug}.zip`;
  let contentType = 'application/zip';

  if (isDocx) {
    storageKey = `templates/${sanitizedSlug}.docx`;
    contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
  } else if (isImage) {
    const ext = cleanName.split('.').pop() || 'jpg';
    storageKey = `thumbnails/${sanitizedSlug}.${ext}`;
    contentType = `image/${ext === 'jpg' ? 'jpeg' : ext}`;
  }

  try {
    const r2 = getR2Client();
    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME || 'projecthub',
        Key: storageKey,
        Body: buffer,
        ContentType: contentType,
        ContentLength: buffer.length,
        Metadata: {
          'project-slug': sanitizedSlug,
          'uploaded-by': session.email,
          'original-name': file.name,
          'uploaded-at': new Date().toISOString(),
        },
      })
    );

    return NextResponse.json({
      success: true,
      key: storageKey,
      storageKey,
      fileSize: buffer.length,
    });
  } catch (err) {
    console.error('[admin/upload] R2 upload failed:', err);
    return NextResponse.json({ error: 'Failed to upload file to R2 cloud storage' }, { status: 502 });
  }
}

