import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { verifyWebhookSignature } from '@/lib/razorpay';

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    
    if (!signature) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    // 1. Verify Webhook Signature
    const isValid = verifyWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.error('Razorpay Webhook: Invalid Signature');
      return NextResponse.json({ error: 'Tampered Signature Detected' }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const payment = payload.payload.payment.entity;
    
    const supabase = createAdminClient();
    
    // 2. Handle Events
    if (event === 'payment.captured') {
      const orderId = payment.order_id;
      const paymentId = payment.id;
      
      // Update order status if not already paid
      await supabase
        .from('orders')
        .update({ 
          status: 'PAID',
          payment_id: paymentId
        })
        .eq('order_id', orderId)
        .eq('status', 'PENDING'); // Only update if pending (idempotent)
        
    } else if (event === 'payment.failed') {
      const orderId = payment.order_id;
      
      await supabase
        .from('orders')
        .update({ status: 'FAILED' })
        .eq('order_id', orderId)
        .eq('status', 'PENDING');
    }
    
    // Always return 200 to acknowledge receipt to Razorpay
    return NextResponse.json({ received: true });
    
  } catch (error: any) {
    console.error('Webhook error:', error);
    // Always return 200 after signature is verified to prevent Razorpay retry storms
    return NextResponse.json({ received: true, error: error.message }, { status: 200 });
  }
}
