'use client';

import React, { useState, useMemo } from 'react';
import {
  ShieldAlert, Search, Filter, Terminal, Check, Copy, Clock,
  User, Database, ChevronDown, ChevronUp, RefreshCw, FileText
} from 'lucide-react';
import { AuditLogEntry } from '@/lib/audit';

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(24,24,27,0.8), rgba(9,9,11,0.9))',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset',
};

const ACTION_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  ADMIN_LOGIN: { bg: 'rgba(56,189,248,0.12)', border: 'rgba(56,189,248,0.3)', text: '#38bdf8' },
  ORDER_RESET_DOWNLOADS: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', text: '#fbbf24' },
  ORDER_RESEND_EMAIL: { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', text: '#34d399' },
  PROJECT_CREATE: { bg: 'rgba(129,140,248,0.12)', border: 'rgba(129,140,248,0.3)', text: '#818cf8' },
  PROJECT_UPDATE: { bg: 'rgba(192,132,252,0.12)', border: 'rgba(192,132,252,0.3)', text: '#c084fc' },
  PROJECT_DELETE: { bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.3)', text: '#f87171' },
};

export function AuditLogClient({
  initialLogs,
  isFallback,
}: {
  initialLogs: AuditLogEntry[];
  isFallback?: boolean;
}) {
  const [logs, setLogs] = useState<AuditLogEntry[]>(initialLogs);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('ALL');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedSql, setCopiedSql] = useState(false);

  const actions = useMemo(() => {
    return Array.from(new Set(logs.map(l => l.action))).sort();
  }, [logs]);

  const filteredLogs = useMemo(() => {
    return logs.filter(l => {
      if (actionFilter !== 'ALL' && l.action !== actionFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        return (
          l.admin_email.toLowerCase().includes(q) ||
          l.action.toLowerCase().includes(q) ||
          l.entity_type.toLowerCase().includes(q) ||
          l.entity_id.toLowerCase().includes(q) ||
          JSON.stringify(l.metadata || {}).toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [logs, actionFilter, search]);

  const copySqlMigration = () => {
    const sql = `CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_email TEXT NOT NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs (created_at DESC);`;
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2.5">
            <ShieldAlert className="h-6 w-6 text-indigo-400" />
            Security & Audit Logs
          </h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            Immutable tracking of all administrative mutations, logins, and overrides
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl font-mono">
            {filteredLogs.length} Events
          </span>
        </div>
      </div>

      {/* SQL Setup helper banner if table isn't migrated yet */}
      {isFallback && (
        <div
          className="rounded-2xl p-4 border flex items-start justify-between gap-4"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(24,24,27,0.9))',
            borderColor: 'rgba(99,102,241,0.3)',
          }}
        >
          <div className="flex items-start gap-3">
            <Database className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-white">In-Memory Audit Mode Active</p>
              <p className="text-xs text-zinc-400 mt-0.5">
                Audit logs are actively stored in memory. To make them persistent across cold restarts, execute the provided SQL migration in your Supabase SQL Editor.
              </p>
            </div>
          </div>
          <button
            onClick={copySqlMigration}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shrink-0"
          >
            {copiedSql ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copiedSql ? 'Copied SQL!' : 'Copy SQL'}</span>
          </button>
        </div>
      )}

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 min-w-0 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search email, action, entity ID, metadata..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm placeholder:text-zinc-500 focus:outline-none transition-all rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#fff',
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={actionFilter}
            onChange={e => setActionFilter(e.target.value)}
            className="px-3 py-2.5 text-sm focus:outline-none cursor-pointer rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: '#fff',
            }}
          >
            <option value="ALL">All Actions</option>
            {actions.map(act => (
              <option key={act} value={act}>{act}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-2xl overflow-hidden" style={cardStyle}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Timestamp</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Action</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Admin</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Entity</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider text-right">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-zinc-500 text-xs">
                    No audit records recorded yet. Any actions taken in the admin console will appear here.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log, index) => {
                  const isExpanded = expandedId === (log.id || String(index));
                  const colors = ACTION_COLORS[log.action] || {
                    bg: 'rgba(255,255,255,0.05)',
                    border: 'rgba(255,255,255,0.1)',
                    text: '#a1a1aa',
                  };

                  return (
                    <React.Fragment key={log.id || index}>
                      <tr
                        onClick={() => setExpandedId(isExpanded ? null : (log.id || String(index)))}
                        className="cursor-pointer hover:bg-white/[0.02] transition-colors"
                        style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                      >
                        <td className="px-4 py-3.5 whitespace-nowrap text-xs text-zinc-400">
                          <span className="text-zinc-200">
                            {new Date(log.created_at || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                          </span>
                          <span className="text-zinc-500 ml-1.5">
                            {new Date(log.created_at || Date.now()).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </td>

                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <span
                            className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full inline-block"
                            style={{ background: colors.bg, border: `1px solid ${colors.border}`, color: colors.text }}
                          >
                            {log.action}
                          </span>
                        </td>

                        <td className="px-4 py-3.5 text-xs text-zinc-300 font-mono">
                          {log.admin_email}
                        </td>

                        <td className="px-4 py-3.5 text-xs text-zinc-400">
                          <span className="font-semibold text-zinc-200">{log.entity_type}</span>: <span className="font-mono text-[11px]">{log.entity_id}</span>
                        </td>

                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <button className="text-zinc-500 hover:text-white inline-flex items-center gap-1 text-xs">
                            <span>Metadata</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                        </td>
                      </tr>

                      {isExpanded && (
                        <tr>
                          <td colSpan={5} className="p-4" style={{ background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="rounded-xl p-3 bg-black/50 border border-white/10 font-mono text-[11px] text-zinc-300 overflow-x-auto">
                              <pre>{JSON.stringify(log.metadata || {}, null, 2)}</pre>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
