import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { verifySignature } from '@/lib/razorpay';
import { generateDefenseShield } from '@/lib/defense-shield';
import { sendTelegramNotification } from '@/lib/telegram';

export async function POST(req: NextRequest) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
  }

  const isValid = verifySignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);
  if (!isValid) return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });

  const supabase = createAdminClient();

  // Fetch the pending purchase
  const { data: purchase, error: purchaseError } = await supabase
    .from('benchmark_purchases')
    .select('*, benchmark_runs(*)')
    .eq('razorpay_order_id', razorpay_order_id)
    .maybeSingle();

  if (purchaseError || !purchase) {
    return NextResponse.json({ error: 'Purchase record not found' }, { status: 404 });
  }

  // Mark as PAID (atomic — only if PENDING)
  const { data: updated } = await supabase
    .from('benchmark_purchases')
    .update({ status: 'PAID', razorpay_payment_id })
    .eq('id', purchase.id)
    .eq('status', 'PENDING')
    .select('id')
    .maybeSingle();

  if (updated) {
    // Fire Telegram notification
    sendTelegramNotification(
      `🛡 Defense Shield Sold!\n\n💰 ₹19\n📧 ${purchase.customer_email}\n📱 ${purchase.customer_phone}\n🔗 Repo: ${purchase.benchmark_runs?.repo_name || 'unknown'}`
    ).catch(console.error);
  }

  // Generate the personalized content
  const shieldData = generateDefenseShield(purchase.benchmark_runs, purchase.pack_type || 'bundle');

  return NextResponse.json({ success: true, shieldData });
}
