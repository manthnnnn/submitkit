import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
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
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}

async function verifyAdminCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  const secret = process.env.ADMIN_SECRET_KEY || '';
  if (!token || !secret) return false;
  const dotIndex = token.lastIndexOf('.');
  if (dotIndex === -1) return constantTimeEqual(token, secret);
  const sessionToken = token.substring(0, dotIndex);
  const providedHmac = token.substring(dotIndex + 1);
  if (!sessionToken || !providedHmac) return false;
  const expectedHmac = await hmacSHA256(secret, sessionToken);
  return constantTimeEqual(expectedHmac, providedHmac);
}

export async function GET(req: NextRequest) {
  if (!(await verifyAdminCookie())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const since = searchParams.get('since');

  const supabase = createAdminClient();
  let query = supabase
    .from('pre_orders')
    .select('id, created_at', { count: 'exact', head: true });

  if (since) {
    query = query.gt('created_at', since);
  }

  const { count, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const unreadCount = count ?? 0;
  return NextResponse.json({
    count: unreadCount,
    hasUnread: unreadCount > 0,
  });
}
