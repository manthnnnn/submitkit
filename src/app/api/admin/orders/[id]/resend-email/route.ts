import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendOrderConfirmationEmail } from '@/lib/email';
import { cookies } from 'next/headers';

async function hmacSHA256(key: string, data: string): Promise<string> {
  const encoder = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey(
    'raw', encoder.encode(key),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(data));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
async function verifyAdminCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  const secret = process.env.ADMIN_SECRET_KEY || '';
  if (!token || !secret) return false;
  const dot = token.lastIndexOf('.');
  if (dot === -1) return constantTimeEqual(token, secret);
  const sess = token.substring(0, dot);
  const hmac = token.substring(dot + 1);
  if (!sess || !hmac) return false;
  return constantTimeEqual(await hmacSHA256(secret, sess), hmac);
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminCookie())) {
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
    projectTitle:       order.projects.title,
    orderId:            order.id,
    amountPaid:         order.amount_paid,
    tier:               order.projects.tier ?? 'MINI',
    hasPersonalization: !!order.has_personalization,
    hasPlagiarismCert:  !!order.has_plagiarism_cert,
    hasVivaCall:        !!order.has_viva_call,
  });

  return NextResponse.json({ success: true, sentTo: order.customer_email });
}
