import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { generateIEEEReport, type ReportSize } from '@/lib/ieee-report-generator';

/**
 * POST /api/personalize
 *
 * Generates a personalised IEEE report for a student who purchased the
 * Name Personalisation add-on. Uses the full programmatic ieee-report-generator
 * (no template file required — nothing can be "missing" from R2).
 *
 * Body:
 *   orderId        — required
 *   customerEmail  — required (ownership gate)
 *   studentName    — optional override (defaults to order.customer_name)
 *   rollNumber     — optional
 *   guideName      — optional
 *   collegeName    — optional
 *   size           — optional: 'mini' | 'standard' | 'full' (default: 'full')
 */

function sanitize(value: string | undefined | null, maxLen = 200): string {
  if (!value) return '';
  return value.replace(/[<>"'\\{}]/g, '').trim().substring(0, maxLen);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body?.orderId || !body?.customerEmail) {
      return NextResponse.json({ error: 'Missing orderId or customerEmail.' }, { status: 400 });
    }

    const { orderId, customerEmail, studentName, rollNumber, guideName, collegeName, size } = body;

    const supabase = createAdminClient();
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, projects(*)')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    }

    // Ownership gate — email must match
    if (order.customer_email.trim().toLowerCase() !== (customerEmail as string).trim().toLowerCase()) {
      return NextResponse.json({ error: 'Not authorised.' }, { status: 403 });
    }

    if (order.status !== 'PAID') {
      return NextResponse.json({ error: 'Payment not completed.' }, { status: 403 });
    }

    if (!order.has_personalization) {
      return NextResponse.json({ error: 'Name Personalisation add-on was not purchased with this order.' }, { status: 403 });
    }

    // Resolve size — default to 'full' for personalized reports (they paid premium)
    const reportSize: ReportSize = ['mini', 'standard', 'full'].includes(size)
      ? (size as ReportSize)
      : 'full';

    // Generate the full IEEE report in memory — no R2 template needed
    const docxBuffer = await generateIEEEReport({
      projectSlug:  order.projects?.slug ?? 'default',
      size:         reportSize,
      studentName:  sanitize(studentName || order.customer_name, 100) || undefined,
      rollNumber:   sanitize(rollNumber, 30)  || undefined,
      guideName:    sanitize(guideName, 100)  || undefined,
      collegeName:  sanitize(collegeName || order.college_name, 150) || undefined,
      academicYear: new Date().getFullYear().toString(),
    });

    // Stream directly to client — no R2 upload needed
    const slug       = order.projects?.slug ?? 'project';
    const nameSlug   = (sanitize(studentName || order.customer_name, 40)).replace(/\s+/g, '_') || 'Personalised';
    const sizeLabel  = { mini: '15pg', standard: '20pg', full: '60pg' }[reportSize];
    const filename   = `${slug}-IEEE-Report-${sizeLabel}-${nameSlug}.docx`;

    return new NextResponse(docxBuffer as unknown as BodyInit, {
      status: 200,
      headers: {
        'Content-Type':        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length':      String(docxBuffer.byteLength),
        'Cache-Control':       'no-store',
      },
    });

  } catch (err: any) {
    console.error('[personalize] error:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to generate personalised report.' },
      { status: 500 }
    );
  }
}
