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
  const rawLogs = await safeQuery(
    supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)
      .then(r => r.data || []),
    [],
    2000
  );

  const isFallback = rawLogs.length === 0;
  const logs: AuditLogEntry[] = isFallback ? getFallbackAuditLogs() : (rawLogs as AuditLogEntry[]);

  return (
    <AuditLogClient initialLogs={logs} isFallback={isFallback} />
  );
}
