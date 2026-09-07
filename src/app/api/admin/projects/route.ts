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

// ── POST /api/admin/projects — create new project ──────────────────────────
export async function POST(req: NextRequest) {
  if (!(await verifyAdminCookie())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();

  const { title, slug, description, category, tier, price_inr } = body;
  if (!title || !slug || !category || !tier || !price_inr) {
    return NextResponse.json({ error: 'title, slug, category, tier, price_inr are required' }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from('projects')
    .insert({
      title,
      slug,
      description:        body.description ?? '',
      problem_statement:  body.problem_statement ?? '',
      category,
      tier,
      price_inr:          Number(price_inr),
      tech_stack:         body.tech_stack ?? [],
      features:           body.features ?? [],
      is_active:          body.is_active ?? false,
      s3_storage_key:     body.s3_storage_key ?? '',
      report_template_key: body.report_template_key ?? '',
      demo_video_id:      body.demo_video_id ?? null,
      demo_screenshots:   body.demo_screenshots ?? [],
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ project: data }, { status: 201 });
}
