import { createAdminClient } from '@/lib/supabase/admin';
import { getFallbackAuditLogs, AuditLogEntry } from '@/lib/audit';
import { AuditLogClient } from './audit-log-client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Audit Logs | SubmitKit Admin',
  robots: 'noindex, nofollow',
};

export const dynamic = 'force-dynamic';

export default async function AuditLogPage() {
  let logs: AuditLogEntry[] = [];
  let isFallback = false;

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error || !data) {
      logs = getFallbackAuditLogs();
      isFallback = true;
    } else {
      logs = data as AuditLogEntry[];
    }
  } catch {
    logs = getFallbackAuditLogs();
    isFallback = true;
  }

  return (
    <AuditLogClient initialLogs={logs} isFallback={isFallback} />
  );
}
