import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  const ip = getClientIP(req);
  const rl = checkRateLimit(`lookup:${ip}`, { maxRequests: 15, windowSeconds: 60 });
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Too many attempts. Please wait a minute.' }, { status: 429 });
  }

  let body: { query?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid request.' }, { status: 400 }); }

  const raw = (body.query ?? '').trim();
  if (!raw) return NextResponse.json({ error: 'Please enter your Order ID.' }, { status: 400 });

  const lower = raw.toLowerCase();
  const supabase = createAdminClient();

  const FIELDS = 'id, status, download_count, download_limit, has_personalization, customer_name, projects(title)';

  // ── Strategy 1: full UUID ──────────────────────────────────────────────
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(raw);
  if (isUUID) {
    const { data } = await supabase.from('orders').select(FIELDS).eq('id', lower).maybeSingle();
    if (data) return buildResponse(data);
  }

  // ── Strategy 2: Razorpay order_id ─────────────────────────────────────
  const isRazorpay = /^order_/i.test(raw);
  if (isRazorpay) {
    const { data } = await supabase.from('orders').select(FIELDS).ilike('order_id', raw).limit(1).maybeSingle();
    if (data) return buildResponse(data);
  }

  // ── Strategy 3: Short ID (first 8 hex chars of UUID) ──────────────────
  // UUID format: c2aefc63-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  // We use a Postgres RPC / raw filter with text cast since ilike on UUID may fail
  const isShortId = /^[0-9a-f]{6,12}$/i.test(raw);
  if (isShortId) {
    // Use textSearch via cast — Supabase supports filter on uuid::text
    // We do: id::text ilike 'c2aefc63%'
    const { data } = await supabase
      .from('orders')
      .select(FIELDS)
      .filter('id::text', 'ilike', `${lower}%`)
      .limit(1)
      .maybeSingle();
    if (data) return buildResponse(data);
  }

  // ── Strategy 4: Razorpay payment_id ───────────────────────────────────
  const isPaymentId = /^pay_/i.test(raw);
  if (isPaymentId) {
    const { data } = await supabase.from('orders').select(FIELDS).ilike('payment_id', raw).limit(1).maybeSingle();
    if (data) return buildResponse(data);
  }

  // ── Nothing matched ────────────────────────────────────────────────────
  return NextResponse.json({
    error: `Order not found for "${raw.toUpperCase()}". Double-check your Order ID — it's the 8-character code in your confirmation email (e.g. C2AEFC63).`,
  }, { status: 404 });
}

function buildResponse(order: any): NextResponse {
  if (order.status !== 'PAID') {
    return NextResponse.json({
      error: 'This order has not been paid yet. If you just paid, wait 30 seconds and try again.',
    }, { status: 403 });
  }

  const dlCount = order.download_count ?? 0;
  const dlLimit = order.download_limit ?? 3;

  if (dlCount >= dlLimit) {
    return NextResponse.json({
      error: `Download limit reached (${dlCount}/${dlLimit}). WhatsApp +91 87998 14256 with your Order ID for a reset.`,
      limitReached: true,
    }, { status: 403 });
  }

  return NextResponse.json({
    orderId:            order.id,
    projectTitle:       (order.projects as any)?.title ?? 'Your Project Bundle',
    customerName:       order.customer_name ?? '',
    hasPersonalization: !!order.has_personalization,
    downloadCount:      dlCount,
    downloadLimit:      dlLimit,
  });
}
