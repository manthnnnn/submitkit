import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { parseAdminSession, hasPermission } from '@/lib/rbac';
import { logAuditAction } from '@/lib/audit';
import { revalidateTag } from 'next/cache';

// ── PATCH /api/admin/projects/[id] ─────────────────────────────────────────
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get('admin_token')?.value;
  const session = await parseAdminSession(token);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'projects:edit')) {
    return NextResponse.json({ error: 'Forbidden: Insufficient role permissions' }, { status: 403 });
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

  await logAuditAction({
    admin_email: session.email,
    action: 'PROJECT_UPDATE',
    entity_type: 'PROJECT',
    entity_id: id,
    metadata: update,
  });

  try {
    revalidateTag('projects', { expire: 0 });
    revalidateTag('dashboard', { expire: 0 });
  } catch {
    // ignore
  }

  return NextResponse.json({ project: data });
}

// ── DELETE /api/admin/projects/[id] ────────────────────────────────────────
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get('admin_token')?.value;
  const session = await parseAdminSession(token);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!hasPermission(session.role, 'projects:delete')) {
    return NextResponse.json({ error: 'Forbidden: Insufficient role permissions to delete' }, { status: 403 });
  }

  const { id } = await params;
  const supabase = createAdminClient();

  // Soft delete — set is_active = false only; never hard-delete project data
  const { error } = await supabase
    .from('projects')
    .update({ is_active: false })
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await logAuditAction({
    admin_email: session.email,
    action: 'PROJECT_DELETE',
    entity_type: 'PROJECT',
    entity_id: id,
    metadata: { soft_delete: true, is_active: false },
  });

  try {
    revalidateTag('projects', { expire: 0 });
    revalidateTag('dashboard', { expire: 0 });
  } catch {
    // ignore
  }

  return NextResponse.json({ success: true });
}
