import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
    }

    const cleanSlug = slug.replace(/[^a-zA-Z0-9_-]/g, '');

    const candidates = [
      path.join(process.cwd(), `${cleanSlug}.zip`),
      path.join(process.cwd(), 'bundles', `${cleanSlug}.zip`),
      path.join(process.cwd(), 'project-factory', cleanSlug, `${cleanSlug}.zip`),
    ];

    const found = candidates.find(p => fs.existsSync(p));
    if (!found) {
      return NextResponse.json({ error: 'Local bundle not found' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(found);
    const filename = `${cleanSlug}-complete-bundle.zip`;

    return new NextResponse(new Uint8Array(fileBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'no-store',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Download failed' }, { status: 500 });
  }
}
