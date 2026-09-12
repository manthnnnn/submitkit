import { createAdminClient } from '@/lib/supabase/admin';
import { getFallbackAuditLogs, AuditLogEntry } from '@/lib/audit';
import { AuditLogClient } from './audit-log-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audit Logs | SubmitKit Admin',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

import { safeQuery } from '@/lib/safe-query';

export default async function AuditLogPage() {
  const supabase = createAdminClient();
  const res = await safeQuery<{ data: any[] | null; error: any }>(
    Promise.resolve(
      supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100)
    ),
    { data: [], error: null },
    2500
  );

  // Fallback is only true if Supabase explicitly returned a missing table error
  const tableMissing = Boolean(
    res?.error && (res.error.code === '42P01' || res.error.message?.toLowerCase().includes('does not exist'))
  );

  const logs = tableMissing
    ? getFallbackAuditLogs()
    : ((res?.data || []) as AuditLogEntry[]);

  return (
    <AuditLogClient initialLogs={logs} isFallback={tableMissing} />
  );
}
