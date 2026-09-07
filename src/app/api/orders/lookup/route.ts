import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';

/**
 * POST /api/orders/lookup
 * Body: { query: string }
 *
 * Accepts any of:
 *  - Short ID:    "A3F9B2C1"            (first segment of UUID, uppercased)
 *  - Full UUID:   "a3f9b2c1-xxxx-..."   (the internal Supabase order id)
 *  - Razorpay ID: "order_xxxxxxxx"      (the Razorpay order_id column)
 *
 * Returns: { orderId, projectTitle, status, downloadCount, downloadLimit }
 * or 404 if not found.
 *
 * Rate-limited: 10 lookups per minute per IP to prevent enumeration.
 */
export async function POST(req: NextRequest) {
  // Rate limit
  const ip = getClientIP(req);
  const rl = checkRateLimit(`lookup:${ip}`, { maxRequests: 10, windowSeconds: 60 });
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Too many attempts. Please wait a minute.' }, { status: 429 });
  }

  let body: { query?: string };
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 }); }

  const raw = (body.query ?? '').trim();
  if (!raw) {
    return NextResponse.json({ error: 'Please enter your Order ID.' }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Normalise input
  const upper   = raw.toUpperCase();
  const lower   = raw.toLowerCase();

  // Strategy 1: Full UUID match (contains hyphens and is 36 chars)
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(raw);

  // Strategy 2: Short ID — 8 hex chars (first segment of UUID)
  const isShortId = /^[0-9a-f]{8}$/i.test(raw);

  // Strategy 3: Razorpay order_id
  const isRazorpay = raw.startsWith('order_') || raw.startsWith('ORDER_');

  let order: any = null;

  if (isUUID) {
    // Direct UUID lookup
    const { data } = await supabase
      .from('orders')
      .select('id, status, download_count, download_limit, projects(title)')
      .eq('id', lower)
      .single();
    order = data;
  } else if (isRazorpay) {
    // Razorpay order_id
    const { data } = await supabase
      .from('orders')
      .select('id, status, download_count, download_limit, projects(title)')
      .ilike('order_id', raw)
      .single();
    order = data;
  } else if (isShortId) {
    // Short ID = first 8 chars of UUID. Use ilike pattern match on the id column.
    // UUID format: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    // So short ID "A3F9B2C1" matches id starting with "a3f9b2c1-"
    const pattern = `${lower}-%`;
    const { data } = await supabase
      .from('orders')
      .select('id, status, download_count, download_limit, projects(title)')
      .ilike('id', pattern)
      .limit(1)
      .maybeSingle();
    order = data;
  } else {
    // Try both — maybe partial UUID or odd format
    // Try short id prefix pattern
    const pattern = `${lower}%`;
    const { data } = await supabase
      .from('orders')
      .select('id, status, download_count, download_limit, projects(title)')
      .ilike('id', pattern)
      .limit(1)
      .maybeSingle();
    order = data;
  }

  if (!order) {
    return NextResponse.json({
      error: 'Order not found. Check your Order ID from the confirmation email. It looks like A3F9B2C1 (8 characters).',
    }, { status: 404 });
  }

  if (order.status !== 'PAID') {
    return NextResponse.json({
      error: 'This order hasn\'t been paid yet. If you completed payment, please wait a few minutes and try again.',
    }, { status: 403 });
  }

  const dlCount = order.download_count ?? 0;
  const dlLimit = order.download_limit ?? 3;

  if (dlCount >= dlLimit) {
    return NextResponse.json({
      error: `Download limit reached (${dlCount}/${dlLimit}). WhatsApp +91 87998 14256 with your Order ID to get a reset.`,
      limitReached: true,
    }, { status: 403 });
  }

  return NextResponse.json({
    orderId:       order.id,
    projectTitle:  (order.projects as any)?.title ?? 'Your Project Bundle',
    downloadCount: dlCount,
    downloadLimit: dlLimit,
  });
}
