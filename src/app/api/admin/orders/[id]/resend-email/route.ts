import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendOrderConfirmationEmail } from '@/lib/email';
import { parseAdminSession } from '@/lib/rbac';
import { logAuditAction } from '@/lib/audit';
import { revalidateTag } from 'next/cache';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get('admin_token')?.value;
  const session = await parseAdminSession(token);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createAdminClient();

  const { data: order, error } = await supabase
    .from('orders')
    .select('*, projects(*)')
    .eq('id', id)
    .single();

  if (error || !order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }
  if (order.status !== 'PAID') {
    return NextResponse.json({ error: 'Can only resend email for PAID orders' }, { status: 400 });
  }

  await sendOrderConfirmationEmail({
    customerName:       order.customer_name,
    customerEmail:      order.customer_email,
    projectTitle:       order.projects?.title ?? 'SubmitKit Bundle',
    orderId:            order.id,
    amountPaid:         order.amount_paid,
    tier:               order.projects?.tier ?? 'MINI',
    hasPersonalization: !!order.has_personalization,
    hasPlagiarismCert:  !!order.has_plagiarism_cert,
    hasVivaCall:        !!order.has_viva_call,
  });

  // Log audit event
  await logAuditAction({
    admin_email: session.email,
    action: 'ORDER_RESEND_EMAIL',
    entity_type: 'ORDER',
    entity_id: id,
    metadata: {
      recipient: order.customer_email,
      project: order.projects?.title,
      amount: order.amount_paid,
    },
  });

  try {
    revalidateTag('orders', { expire: 0 });
  } catch {
    // ignore
  }

  return NextResponse.json({ success: true, sentTo: order.customer_email });
}
