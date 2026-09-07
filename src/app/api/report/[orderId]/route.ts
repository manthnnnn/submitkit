import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateIEEEReport, type ReportSize } from '@/lib/ieee-report-generator';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const url = new URL(req.url);

    // Page size param: mini | standard | full (default: standard)
    const sizeParam = url.searchParams.get('size') ?? 'standard';
    const size: ReportSize = ['mini', 'standard', 'full'].includes(sizeParam)
      ? (sizeParam as ReportSize)
      : 'standard';

    const supabase = createAdminClient();
    const { data: order, error } = await supabase
      .from('orders')
      .select('*, projects(title, slug, category)')
      .eq('id', orderId)
      .single();

    if (error || !order || order.status !== 'PAID') {
      return NextResponse.json({ error: 'Order not found or not paid' }, { status: 404 });
    }

    const projectSlug = order.projects?.slug ?? 'default';

    // Personalization data — only inject if they purchased the add-on
    const hasPersonalization = !!order.has_personalization;
    const studentName  = hasPersonalization ? (url.searchParams.get('name')    || order.customer_name || '') : '';
    const rollNumber   = hasPersonalization ? (url.searchParams.get('roll')    || '') : '';
    const guideName    = hasPersonalization ? (url.searchParams.get('guide')   || '') : '';
    const collegeName  = hasPersonalization ? (url.searchParams.get('college') || order.college_name || '') : '';
    const academicYear = url.searchParams.get('year') ?? new Date().getFullYear().toString();

    const buffer = await generateIEEEReport({
      projectSlug,
      size,
      ...(hasPersonalization ? {
        studentName:  studentName  || undefined,
        rollNumber:   rollNumber   || undefined,
        guideName:    guideName    || undefined,
        collegeName:  collegeName  || undefined,
        academicYear: academicYear || undefined,
      } : {}),
    });

    const sizeLabel  = { mini: '15pg', standard: '20pg', full: '60pg' }[size];
    const nameTag    = hasPersonalization && studentName ? `-${studentName.replace(/\s+/g, '_')}` : '';
    const filename   = `${projectSlug}-IEEE-Report-${sizeLabel}${nameTag}.docx`;

    return new NextResponse(buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type':        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length':      String(buffer.byteLength),
        'Cache-Control':       'no-store',
      },
    });
  } catch (err: any) {
    console.error('[report] generation error:', err);
    return NextResponse.json({ error: err.message || 'Report generation failed' }, { status: 500 });
  }
}
