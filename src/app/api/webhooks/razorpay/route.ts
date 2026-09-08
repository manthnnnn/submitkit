import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyWebhookSignature } from '@/lib/razorpay';
import { sendOrderConfirmationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
  let rawBody = '';

  try {
    rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // 1. Verify signature BEFORE parsing — prevents processing tampered payloads
    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.error('Razorpay Webhook: Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload?.event as string | undefined;

    if (!event) {
      return NextResponse.json({ received: true }); // Unknown event, ignore
    }

    // 2. Safe access — not all events have payment entity
    const payment = payload?.payload?.payment?.entity;

    const supabase = createAdminClient();

    if (event === 'payment.captured' && payment) {
      const razorpayOrderId = payment.order_id as string;
      const paymentId       = payment.id        as string;

      if (!razorpayOrderId || !paymentId) {
        console.error('Webhook payment.captured: missing order_id or id', payment);
        return NextResponse.json({ received: true });
      }

      const { data: updated, error } = await supabase
        .from('orders')
        .update({ status: 'PAID', payment_id: paymentId })
        .eq('order_id', razorpayOrderId)
        .eq('status', 'PENDING') // Idempotent — only update if still pending
        .select('id')
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error('Webhook DB update failed (payment.captured):', error.message);
        return NextResponse.json({ error: 'DB write failed' }, { status: 500 });
      }

      // Safety net: fetch order details and send confirmation email + telegram
      // Only do this if WE flipped the status to PAID
      if (updated) {
        try {
          const { data: order } = await supabase
            .from('orders')
            .select('*, projects(title, tier)')
            .eq('order_id', razorpayOrderId)
            .single();

          if (order) {
            const { sendTelegramNotification, buildOrderNotificationMessage } = await import('@/lib/telegram');

            await Promise.all([
              sendOrderConfirmationEmail({
                customerName:       order.customer_name,
                customerEmail:      order.customer_email,
                projectTitle:       order.projects?.title ?? 'Your Project Bundle',
                orderId:            order.id,
                amountPaid:         order.amount_paid,
                tier:               order.projects?.tier ?? 'MINI',
                hasPersonalization: !!order.has_personalization,
                hasPlagiarismCert:  !!order.has_plagiarism_cert,
                hasVivaCall:        !!order.has_viva_call,
              }).catch(emailErr => console.error('Webhook: email send failed (non-blocking):', emailErr)),
              
              sendTelegramNotification(buildOrderNotificationMessage({
                customerName:       order.customer_name,
                customerEmail:      order.customer_email,
                customerPhone:      order.customer_phone,
                projectTitle:       order.projects?.title ?? 'Your Project Bundle',
                amountPaid:         order.amount_paid,
                orderId:            order.id,
                hasPersonalization: !!order.has_personalization,
                hasPlagiarismCert:  !!order.has_plagiarism_cert,
                hasVivaCall:        !!order.has_viva_call,
              })).catch(err => console.error('[telegram] webhook sale notify failed:', err))
            ]);
          }
        } catch (err) {
          console.error('Webhook: notification failed (non-blocking):', err);
        }
      }

    } else if (event === 'payment.failed' && payment) {
      const razorpayOrderId = payment.order_id as string;

      if (!razorpayOrderId) {
        return NextResponse.json({ received: true });
      }

      const { error } = await supabase
        .from('orders')
        .update({ status: 'FAILED' })
        .eq('order_id', razorpayOrderId)
        .eq('status', 'PENDING');

      if (error) {
        console.error('Webhook DB update failed (payment.failed):', error.message);
        return NextResponse.json({ error: 'DB write failed' }, { status: 500 });
      }

    } else {
      // All other events (refund.created, order.paid, etc.) — acknowledge and ignore
      console.log(`Razorpay webhook: unhandled event "${event}" — ignored`);
    }

    return NextResponse.json({ received: true });

  } catch (error: any) {
    console.error('Webhook unhandled error:', error);
    // Only return 200 if we already verified the signature; otherwise let Razorpay retry
    return NextResponse.json({ received: true, error: error.message }, { status: 200 });
  }
}
