import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { parseAdminSession } from '@/lib/rbac';
import { logAuditAction } from '@/lib/audit';
import { revalidateTag } from 'next/cache';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = req.cookies.get('admin_token')?.value;
  const session = await parseAdminSession(token);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createAdminClient();

  const { error } = await supabase
    .from('orders')
    .update({ download_count: 0 })
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Log audit event
  await logAuditAction({
    admin_email: session.email,
    action: 'ORDER_RESET_DOWNLOADS',
    entity_type: 'ORDER',
    entity_id: id,
    metadata: { reset_download_count_to: 0 },
  });

  try {
    revalidateTag('orders', { expire: 0 });
    revalidateTag('dashboard', { expire: 0 });
  } catch {
    // ignore
  }

  return NextResponse.json({ success: true });
}
