import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getRazorpay } from '@/lib/razorpay';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';
import { CONSTANTS } from '@/lib/constants';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  const rl = checkRateLimit(`shield-create:${ip}`, { maxRequests: 5, windowSeconds: 60 });
  if (!rl.allowed) return NextResponse.json({ error: 'Too many requests' }, { status: 429 });

  const { benchmarkId, email, phone, packType = 'bundle' } = await req.json();
  if (!benchmarkId || !email || !phone) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Define pricing logic
  const price = packType === 'bundle' ? 29 : 19;

  const supabase = createAdminClient();

  // Check if already paid — return content access flag
  const { data: existing } = await supabase
    .from('benchmark_purchases')
    .select('id, status')
    .eq('benchmark_id', benchmarkId)
    .eq('customer_email', email.toLowerCase().trim())
    .eq('status', 'PAID')
    .maybeSingle();

  if (existing) {
    return NextResponse.json({ alreadyPurchased: true });
  }

  // Validate benchmark exists
  const { data: benchmark } = await supabase
    .from('benchmark_runs')
    .select('id')
    .eq('id', benchmarkId)
    .maybeSingle();

  if (!benchmark) return NextResponse.json({ error: 'Benchmark not found' }, { status: 404 });

  // Create Razorpay order
  const razorpay = getRazorpay();
  const receipt = `shield_${crypto.randomBytes(6).toString('hex')}`;
  const rzpOrder = await razorpay.orders.create({
    amount: price * 100, // paise
    currency: 'INR',
    receipt,
  });

  // Store pending purchase
  await supabase.from('benchmark_purchases').insert({
    benchmark_id: benchmarkId,
    customer_email: email.toLowerCase().trim(),
    customer_phone: phone.trim(),
    razorpay_order_id: rzpOrder.id,
    pack_type: packType,
    status: 'PENDING',
    amount: price,
  });

  return NextResponse.json({
    razorpayOrderId: rzpOrder.id,
    amount: rzpOrder.amount,
    currency: rzpOrder.currency,
    key: (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '').trim(),
  });
}
