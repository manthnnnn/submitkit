import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { verifySignature } from '@/lib/razorpay';
import { generateDownloadUrl } from '@/lib/s3';
import { sendOrderConfirmationEmail } from '@/lib/email';
import { sendTelegramNotification, buildOrderNotificationMessage } from '@/lib/telegram';

export async function POST(req: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
    
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
    }

    // 1. Verify HMAC Signature
    const isValid = verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    const supabase = createAdminClient();
    
    // 2. Fetch Order and associated Project
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*, projects(*)')
      .eq('order_id', razorpay_order_id)
      .single();
      
    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    // 3. Update Order Status (only if still PENDING — prevents duplicate emails)
    if (order.status !== 'PAID') {
      const { data: updated } = await supabase
        .from('orders')
        .update({ 
          status: 'PAID',
          payment_id: razorpay_payment_id
        })
        .eq('id', order.id)
        .eq('status', 'PENDING') // Atomic: only updates if still PENDING
        .select('id')
        .single();

      // 3a. Send confirmation email ONLY if we were the one to flip status
      // This prevents duplicate emails when both verify + webhook fire
      if (updated) {
        await sendOrderConfirmationEmail({
          customerName:       order.customer_name,
          customerEmail:      order.customer_email,
          projectTitle:       order.projects.title,
          orderId:            order.id,
          amountPaid:         order.amount_paid,
          tier:               order.projects.tier ?? 'MINI',
          hasPersonalization: !!order.has_personalization,
          hasPlagiarismCert:  !!order.has_plagiarism_cert,
          hasVivaCall:        !!order.has_viva_call,
        });

        // Await Telegram sale notification so it doesn't get dropped by serverless functions
        await sendTelegramNotification(buildOrderNotificationMessage({
          customerName:       order.customer_name,
          customerEmail:      order.customer_email,
          customerPhone:      order.customer_phone,
          projectTitle:       order.projects.title,
          amountPaid:         order.amount_paid,
          orderId:            order.id,
          hasPersonalization: !!order.has_personalization,
          hasPlagiarismCert:  !!order.has_plagiarism_cert,
          hasVivaCall:        !!order.has_viva_call,
        })).catch(err => console.error('[telegram] sale notify failed:', err));
      }
    }
    
    // 4. Generate Pre-signed Download URL (10-minute expiry)
    // The client gets an initial URL immediately to start download smoothly
    let downloadUrl = null;
    try {
      downloadUrl = await generateDownloadUrl(
        order.projects.s3_storage_key, 
        `${order.projects.slug}-bundle.zip`
      );
    } catch (s3Error) {
      console.error('AWS S3 Error during verify:', s3Error);
      // We don't throw here. The order is PAID, the user should see the success screen.
      // They can use the backup download button which hits /api/downloads/[orderId]
    }
    
    return NextResponse.json({
      success: true,
      orderId: order.id,
      projectTitle: order.projects.title,
      downloadUrl,
      hasPersonalization: !!order.has_personalization,
      hasPlagiarismCert:  !!order.has_plagiarism_cert,
      hasVivaCall:        !!order.has_viva_call,
    });
    
  } catch (error: any) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
