import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { checkRateLimit, getClientIP } from '@/lib/rate-limit';

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const ip = getClientIP(req);
  const limit = checkRateLimit(`confirmation:${ip}`, { maxRequests: 20, windowSeconds: 60 });
  if (!limit.allowed) {
    return NextResponse.json({ error: 'Please wait a moment, then try again.' }, { status: 429 });
  }

  const { orderId } = await params;
  if (!UUID_PATTERN.test(orderId)) {
    return NextResponse.json({ error: 'Order confirmation could not be verified.' }, { status: 404 });
  }

  try {
    const supabase = createAdminClient();
    const { data: order, error } = await supabase
      .from('orders')
      .select('id, status, amount_paid, created_at, download_count, download_limit, has_personalization, has_plagiarism_cert, has_viva_call, projects(title)')
      .eq('id', orderId)
      .maybeSingle();

    if (error) {
      console.error('[confirmation] Could not read order status:', error.message);
      return NextResponse.json({ error: 'Order status is temporarily unavailable.' }, { status: 503 });
    }
    if (!order) {
      return NextResponse.json({ error: 'Order confirmation could not be verified.' }, { status: 404 });
    }
    if (order.status === 'PENDING') {
      return NextResponse.json({ status: 'PENDING' }, { status: 202 });
    }
    if (order.status !== 'PAID') {
      return NextResponse.json({ error: 'This order is not confirmed as paid.' }, { status: 409 });
    }

    return NextResponse.json({
      orderId: order.id,
      projectTitle: (order.projects as { title?: string } | null)?.title ?? 'Your Project Bundle',
      amountPaid: Number(order.amount_paid) || 0,
      createdAt: order.created_at,
      downloadCount: Number(order.download_count) || 0,
      downloadLimit: Number(order.download_limit) || 3,
      hasPersonalization: Boolean(order.has_personalization),
      hasPlagiarismCert: Boolean(order.has_plagiarism_cert),
      hasVivaCall: Boolean(order.has_viva_call),
    }, { headers: { 'Cache-Control': 'private, no-store, max-age=0' } });
  } catch (error) {
    console.error('[confirmation] Unexpected order lookup failure:', error);
    return NextResponse.json({ error: 'Order status is temporarily unavailable.' }, { status: 503 });
  }
}