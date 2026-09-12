import { createAdminClient } from '@/lib/supabase/admin';

export type AuditActionType =
  | 'ORDER_RESET_DOWNLOADS'
  | 'ORDER_RESEND_EMAIL'
  | 'PROJECT_CREATE'
  | 'PROJECT_UPDATE'
  | 'PROJECT_DELETE'
  | 'BLUEPRINT_SYNC'
  | 'PREORDER_BROADCAST'
  | 'ANALYTICS_RESET'
  | 'ADMIN_LOGIN'
  | 'ADMIN_LOGOUT';

export interface AuditLogEntry {
  id?: string;
  admin_email: string;
  action: AuditActionType | string;
  entity_type: string;
  entity_id: string;
  metadata?: Record<string, any>;
  ip_address?: string;
  created_at?: string;
}

// In-memory fallback ring-buffer for audit logs (preserves last 50 actions even if DB table is unmigrated)
const fallbackBuffer: AuditLogEntry[] = [];

export async function logAuditAction(entry: AuditLogEntry): Promise<void> {
  const fullEntry: AuditLogEntry = {
    ...entry,
    id: entry.id || (typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : Math.random().toString(36).substring(2)),
    created_at: entry.created_at || new Date().toISOString(),
    metadata: entry.metadata || {},
  };

  // Push to local memory buffer
  fallbackBuffer.unshift(fullEntry);
  if (fallbackBuffer.length > 100) fallbackBuffer.pop();

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from('audit_logs').insert({
      admin_email: fullEntry.admin_email,
      action: fullEntry.action,
      entity_type: fullEntry.entity_type,
      entity_id: fullEntry.entity_id,
      metadata: fullEntry.metadata,
      ip_address: fullEntry.ip_address || null,
      created_at: fullEntry.created_at,
    });

    if (error) {
      // Table may not exist yet in Supabase. Don't throw — keep app stable.
      console.warn('[Audit Log Warning] Supabase insert failed (fallback active):', error.message);
    }
  } catch (err) {
    console.warn('[Audit Log Error] Exception writing audit record:', err);
  }
}

export function getFallbackAuditLogs(): AuditLogEntry[] {
  return [...fallbackBuffer];
}
