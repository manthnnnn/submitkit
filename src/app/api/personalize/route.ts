import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { generatePersonalizedDocx } from '@/lib/docx-injector';
import { generateDownloadUrl } from '@/lib/s3';

// Sanitize user-supplied strings before injecting into Word templates
function sanitize(value: string | undefined | null, maxLen = 200): string {
  if (!value) return '';
  return value
    .replace(/[<>"'\\{}]/g, '') // strip characters that could break XML/template
    .trim()
    .substring(0, maxLen);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);

    if (!body?.orderId || !body?.customerEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { orderId, customerEmail, studentName, rollNumber, guideName, submissionDate } = body;

    const supabase = createAdminClient();

    // 1. Fetch Order and Project
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, projects(*)')
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // 2. Ownership verification — caller must supply the email on the order
    //    This prevents anyone who guesses a UUID from accessing someone else's order.
    if (order.customer_email.trim().toLowerCase() !== (customerEmail as string).trim().toLowerCase()) {
      return NextResponse.json({ error: 'Not authorised' }, { status: 403 });
    }

    // 3. Validate payment & add-on
    if (order.status !== 'PAID') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 403 });
    }
    if (!order.has_personalization) {
      return NextResponse.json({ error: 'Personalization add-on not purchased' }, { status: 403 });
    }

    // 4. Validate project relation
    if (!order.projects?.slug) {
      return NextResponse.json({ error: 'Associated project not found' }, { status: 500 });
    }

    // 5. Generate Personalised Docx with sanitised inputs
    const outputKey = `personalized/${order.id}/${order.projects.slug}-report.docx`;

    await generatePersonalizedDocx(
      order.projects.report_template_key,
      {
        studentName:    sanitize(studentName || order.customer_name, 100),
        rollNumber:     sanitize(rollNumber, 30),
        guideName:      sanitize(guideName, 100),
        collegeName:    sanitize(order.college_name, 150),
        projectTitle:   sanitize(order.projects.title, 200),
        submissionDate: sanitize(submissionDate, 20) || new Date().toISOString().split('T')[0],
      },
      outputKey
    );

    // 6. Generate Pre-signed URL (expires in 10 min)
    const downloadUrl = await generateDownloadUrl(
      outputKey,
      `${order.projects.slug}-personalized-report.docx`
    );

    return NextResponse.json({ success: true, downloadUrl });

  } catch (error: any) {
    console.error('Personalization error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
