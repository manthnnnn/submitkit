import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { generatePPT } from '@/lib/ppt-generator';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const url = new URL(req.url);

    const supabase = createAdminClient();
    const { data: order, error } = await supabase
      .from('orders')
      .select('*, projects(title, slug, category)')
      .eq('id', orderId)
      .single();

    if (error || !order || order.status !== 'PAID') {
      return NextResponse.json({ error: 'Order not found or not paid' }, { status: 404 });
    }

    const projectSlug      = order.projects?.slug ?? 'default';
    const hasPersonalization = !!order.has_personalization;

    // Name data only injected if personalization was purchased
    const studentName = hasPersonalization ? (url.searchParams.get('name')    || order.customer_name || '') : '';
    const rollNumber  = hasPersonalization ? (url.searchParams.get('roll')    || '') : '';
    const guideName   = hasPersonalization ? (url.searchParams.get('guide')   || '') : '';
    const collegeName = hasPersonalization ? (url.searchParams.get('college') || order.college_name || '') : '';

    const buffer = await generatePPT({
      projectSlug,
      ...(hasPersonalization ? {
        studentName:  studentName  || undefined,
        rollNumber:   rollNumber   || undefined,
        guideName:    guideName    || undefined,
        collegeName:  collegeName  || undefined,
      } : {}),
    });

    const nameTag  = hasPersonalization && studentName ? `-${studentName.replace(/\s+/g, '_')}` : '';
    const filename = `${projectSlug}-Presentation${nameTag}.pptx`;

    return new NextResponse(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type':        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length':      String(buffer.byteLength),
        'Cache-Control':       'no-store',
      },
    });
  } catch (err: any) {
    console.error('[ppt] generation error:', err);
    return NextResponse.json({ error: err.message || 'PPT generation failed' }, { status: 500 });
  }
}
