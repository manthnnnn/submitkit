import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';

/**
 * POST /api/orders/lookup
 * Accepts short ID (A3F9B2C1), full UUID, Razorpay order_id, or payment_id.
 *
 * Strategy for short ID: Supabase PostgREST doesn't support ::text casts in
 * .filter(), so we use a Postgres function via .rpc() instead. If RPC isn't
 * available we fall back to fetching all IDs and filtering in JS (safe since
 * we only pull the id column and it's rate-limited).
 */
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

  const lower = raw.toLowerCase().replace(/\s+/g, '');
  const supabase = createAdminClient();

  const FIELDS = 'id, status, download_count, download_limit, has_personalization, customer_name, projects(title)';

  // ── 1. Full UUID ──────────────────────────────────────────────────────────
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(raw);
  if (isUUID) {
    const { data } = await supabase.from('orders').select(FIELDS).eq('id', lower).maybeSingle();
    if (data) return buildResponse(data);
  }

  // ── 2. Razorpay order_id (order_xxx) ─────────────────────────────────────
  if (/^order_/i.test(raw)) {
    const { data } = await supabase.from('orders').select(FIELDS).eq('order_id', raw).limit(1).maybeSingle();
    if (data) return buildResponse(data);
  }

  // ── 3. Razorpay payment_id (pay_xxx) ─────────────────────────────────────
  if (/^pay_/i.test(raw)) {
    const { data } = await supabase.from('orders').select(FIELDS).eq('payment_id', raw).limit(1).maybeSingle();
    if (data) return buildResponse(data);
  }

  // ── 4. Short ID — 6–12 hex chars ─────────────────────────────────────────
  // PostgREST doesn't support ::text cast in .filter(), so we use a raw
  // Postgres function. If the function doesn't exist we fall back to JS filter.
  const isShortId = /^[0-9a-f]{6,12}$/i.test(lower);
  if (isShortId) {
    // Strategy A: try Supabase RPC (requires function find_order_by_prefix)
    try {
      const { data: rpcData } = await supabase.rpc('find_order_by_prefix', { prefix: lower });
      if (rpcData && (rpcData as any).id) return buildResponse(rpcData as any);
    } catch { /* function may not exist — fall through to Strategy B */ }

    // Strategy B: fetch all order IDs (only id column) and filter in JS
    // This is safe because: (a) id is not PII, (b) rate-limited to 15/min,
    // (c) typical order count is low enough to be negligible
    const { data: allIds } = await supabase
      .from('orders')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(5000);

    const matched = (allIds ?? []).find((o: any) =>
      (o.id as string).replace(/-/g, '').startsWith(lower) ||
      (o.id as string).split('-')[0] === lower
    );

    if (matched) {
      const { data } = await supabase
        .from('orders')
        .select(FIELDS)
        .eq('id', matched.id)
        .single();
      if (data) return buildResponse(data);
    }
  }

  // ── 5. Partial match on Razorpay order_id ─────────────────────────────────
  // Sometimes students copy partial Razorpay IDs from emails
  if (raw.length >= 6) {
    const { data: partial } = await supabase
      .from('orders')
      .select(FIELDS)
      .ilike('order_id', `%${raw}%`)
      .limit(1)
      .maybeSingle();
    if (partial) return buildResponse(partial);
  }

  // ── 6. Student Email lookup ───────────────────────────────────────────────
  if (raw.includes('@')) {
    const { data: byEmail } = await supabase
      .from('orders')
      .select(FIELDS)
      .ilike('customer_email', raw.toLowerCase().trim())
      .eq('status', 'PAID')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (byEmail) return buildResponse(byEmail);
  }

  // ── 7. Student Phone lookup (10 digits) ───────────────────────────────────
  const digits = raw.replace(/\D/g, '');
  if (digits.length >= 10) {
    const last10 = digits.slice(-10);
    const { data: byPhone } = await supabase
      .from('orders')
      .select(FIELDS)
      .ilike('customer_phone', `%${last10}%`)
      .eq('status', 'PAID')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    if (byPhone) return buildResponse(byPhone);
  }

  return NextResponse.json({
    error: `No paid order found for "${raw}". You can look up by your Order ID, student Email address, or Phone number. If you need help, WhatsApp our support at +91 87998 14256.`,
  }, { status: 404 });
}

function buildResponse(order: any): NextResponse {
  if (order.status !== 'PAID') {
    return NextResponse.json({
      error: 'This order has not been paid yet. If you just completed payment, please wait 30 seconds and try again.',
    }, { status: 403 });
  }

  const dlCount = order.download_count ?? 0;
  const dlLimit = order.download_limit ?? 3;

  if (dlCount >= dlLimit) {
    return NextResponse.json({
      error: `Download limit reached (${dlCount}/${dlLimit}). WhatsApp us at +91 87998 14256 with your Order ID for a free reset.`,
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
