import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { parseAdminSession, hasPermission } from '@/lib/rbac';
import { logAuditAction } from '@/lib/audit';
import { revalidateTag } from 'next/cache';

// DELETE /api/admin/orders/clear-test — deletes test/stale orders only
export async function DELETE(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  const session = await parseAdminSession(token);

  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!hasPermission(session.role, 'orders:modify')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = createAdminClient();

  // Only delete: PENDING orders older than 1 day OR emails containing test/example patterns
  const cutoff = new Date(Date.now() - 86400000).toISOString();

  const { data: toDelete, error: fetchErr } = await supabase
    .from('orders')
    .select('id, customer_email, status, created_at')
    .or(`status.eq.PENDING,customer_email.ilike.%@test.%,customer_email.ilike.%@example.%,customer_email.ilike.%test@%`)
    .lt('created_at', cutoff);

  if (fetchErr) return NextResponse.json({ error: fetchErr.message }, { status: 500 });

  if (!toDelete || toDelete.length === 0) {
    return NextResponse.json({ deleted: 0, message: 'No test/stale orders found' });
  }

  const ids = toDelete.map(o => o.id);
  const { error: delErr } = await supabase.from('orders').delete().in('id', ids);
  if (delErr) return NextResponse.json({ error: delErr.message }, { status: 500 });

  await logAuditAction({
    admin_email: session.email,
    action: 'ORDERS_CLEAR_TEST',
    entity_type: 'ORDER',
    entity_id: 'bulk',
    metadata: { deletedCount: ids.length, ids: ids.slice(0, 10) },
  });

  try { revalidateTag('orders', { expire: 0 }); revalidateTag('dashboard', { expire: 0 }); } catch { /* ignore */ }

  return NextResponse.json({ deleted: ids.length, message: `${ids.length} test/stale order(s) removed` });
}
