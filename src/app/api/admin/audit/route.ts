import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { parseAdminSession } from '@/lib/rbac';
import { getFallbackAuditLogs, logAuditAction } from '@/lib/audit';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  const session = await parseAdminSession(token);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) {
      // If table doesn't exist yet, return fallback memory buffer
      const fallback = getFallbackAuditLogs();
      return NextResponse.json({
        logs: fallback,
        isFallback: true,
        notice: 'Table audit_logs not detected in Supabase. Showing local memory events.',
      });
    }

    return NextResponse.json({ logs: data || [], isFallback: false });
  } catch (err: any) {
    return NextResponse.json({ logs: getFallbackAuditLogs(), isFallback: true, error: err?.message });
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value;
  const session = await parseAdminSession(token);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    await logAuditAction({
      admin_email: session.email,
      action: body.action || 'CUSTOM_ACTION',
      entity_type: body.entity_type || 'SYSTEM',
      entity_id: body.entity_id || 'manual',
      metadata: body.metadata || {},
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Failed' }, { status: 500 });
  }
}
