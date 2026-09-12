import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { parseAdminSession, hasPermission } from '@/lib/rbac';
import { logAuditAction } from '@/lib/audit';
import { revalidateTag } from 'next/cache';

// ── POST /api/admin/projects — create new project ──────────────────────────
export async function POST(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  const session = await parseAdminSession(token);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'projects:create')) {
    return NextResponse.json({ error: 'Forbidden: Insufficient role permissions' }, { status: 403 });
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

  await logAuditAction({
    admin_email: session.email,
    action: 'PROJECT_CREATE',
    entity_type: 'PROJECT',
    entity_id: data.id,
    metadata: { title: data.title, slug: data.slug, tier: data.tier, price_inr: data.price_inr },
  });

  try {
    revalidateTag('projects', { expire: 0 });
    revalidateTag('dashboard', { expire: 0 });
  } catch {
    // ignore
  }

  return NextResponse.json({ project: data }, { status: 201 });
}
