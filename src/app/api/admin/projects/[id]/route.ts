import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { cookies } from 'next/headers';

// ── Auth helper (mirrors middleware logic, for API routes) ──────────────────
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

// ── PATCH /api/admin/projects/[id] ─────────────────────────────────────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminCookie())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();

  // Whitelist updatable fields
  const ALLOWED = [
    'title', 'slug', 'description', 'problem_statement',
    'category', 'tier', 'price_inr', 'tech_stack', 'features',
    'is_active', 'demo_video_id', 'demo_screenshots', 'architecture_details',
  ] as const;

  const update: Record<string, unknown> = {};
  for (const key of ALLOWED) {
    if (key in body) update[key] = body[key];
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('projects')
    .update(update)
    .eq('id', id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ project: data });
}

// ── DELETE /api/admin/projects/[id] ────────────────────────────────────────
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminCookie())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createAdminClient();

  // Soft delete — set is_active = false only; never hard-delete project data
  const { error } = await supabase
    .from('projects')
    .update({ is_active: false })
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}

// ── POST /api/admin/projects/[id] — create (used from /new form) ───────────
// We use [id] = "new" as the sentinel handled by the new page calling POST /api/admin/projects
