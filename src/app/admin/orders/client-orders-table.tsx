'use client';

import { useState, useMemo } from 'react';
import { formatCurrency } from '@/lib/utils';
import {
  Download, Search, FileDown, ChevronDown, ChevronUp,
  Mail, RotateCcw, Loader2, Phone, Building2, Check, AlertCircle, X,
} from 'lucide-react';

export type OrderRow = {
  id: string;
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  college_name: string | null;
  payment_id: string | null;
  amount_paid: number;
  status: 'PAID' | 'PENDING' | 'FAILED';
  download_count: number | null;
  download_limit: number | null;
  created_at: string;
  has_personalization: boolean;
  has_plagiarism_cert: boolean;
  has_viva_call: boolean;
  projects: { title: string } | null;
};

type DateFilter = 'all' | 'today' | '7d' | '30d';

function isWithin(date: string, filter: DateFilter): boolean {
  if (filter === 'all') return true;
  const ms = { today: 86400000, '7d': 7 * 86400000, '30d': 30 * 86400000 }[filter]!;
  return Date.now() - new Date(date).getTime() <= ms;
}

// ── shared card style (glass, matching main site) ──────────────────────────
const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(24,24,27,0.8), rgba(9,9,11,0.9))',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset',
};

const STATUS_CONFIG: Record<string, { bg: string; border: string; text: string; label: string }> = {
  PAID:    { bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.3)',  text: '#34d399', label: 'PAID'    },
  PENDING: { bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.3)',  text: '#fbbf24', label: 'PENDING' },
  FAILED:  { bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.3)',   text: '#f87171', label: 'FAILED'  },
};

export function ClientOrdersTable({ initialOrders }: { initialOrders: OrderRow[] }) {
  const [searchQuery, setSearchQuery]     = useState('');
  const [statusFilter, setStatusFilter]   = useState<'ALL' | 'PAID' | 'PENDING' | 'FAILED'>('ALL');
  const [dateFilter, setDateFilter]       = useState<DateFilter>('all');
  const [projectFilter, setProjectFilter] = useState('ALL');
  const [expandedId, setExpandedId]       = useState<string | null>(null);
  const [resendState, setResendState]     = useState<Record<string, 'idle' | 'loading' | 'done' | 'err'>>({});
  const [resetState, setResetState]       = useState<Record<string, 'idle' | 'loading' | 'done' | 'err'>>({});
  const [resetConfirm, setResetConfirm]   = useState<string | null>(null);
  const [dlCounts, setDlCounts]           = useState<Record<string, number>>({});

  const projectTitles = useMemo(() =>
    Array.from(new Set(initialOrders.map(o => o.projects?.title ?? 'Unknown'))).sort(),
    [initialOrders]
  );

  const filteredOrders = useMemo(() => {
    let result = initialOrders;
    if (statusFilter !== 'ALL') result = result.filter(o => o.status === statusFilter);
    if (projectFilter !== 'ALL') result = result.filter(o => (o.projects?.title ?? 'Unknown') === projectFilter);
    if (dateFilter !== 'all') result = result.filter(o => isWithin(o.created_at, dateFilter));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(o => {
        const shortId = o.id.split('-')[0].toUpperCase();       // e.g. A3F9B2C1
        const shortIdLower = shortId.toLowerCase();
        return (
          o.customer_name?.toLowerCase().includes(q) ||
          o.customer_email?.toLowerCase().includes(q) ||
          o.customer_phone?.includes(q) ||
          o.order_id?.toLowerCase().includes(q) ||              // Razorpay order ID
          o.id?.toLowerCase().includes(q) ||                    // full UUID
          shortIdLower.includes(q) ||                           // short ID (what student sees)
          o.payment_id?.toLowerCase().includes(q) ||            // Razorpay payment ID
          o.projects?.title?.toLowerCase().includes(q) ||
          o.college_name?.toLowerCase().includes(q)
        );
      });
    }
    return result;
  }, [initialOrders, searchQuery, statusFilter, projectFilter, dateFilter]);

  const handleExportCSV = () => {
    const headers = ['Date', 'Short ID', 'Order UUID', 'Customer', 'Email', 'Phone', 'College', 'Project', 'Amount', 'Status', 'Personaliz.', 'Plagiarism', 'Viva', 'Downloads'];
    const rows = filteredOrders.map(o => [
      new Date(o.created_at).toISOString(),
      o.id.split('-')[0].toUpperCase(),
      o.id,
      `"${o.customer_name}"`,
      o.customer_email,
      o.customer_phone,
      `"${o.college_name ?? ''}"`,
      `"${o.projects?.title ?? 'Unknown'}"`,
      o.amount_paid,
      o.status,
      o.has_personalization ? 'Yes' : 'No',
      o.has_plagiarism_cert ? 'Yes' : 'No',
      o.has_viva_call ? 'Yes' : 'No',
      `${dlCounts[o.id] ?? o.download_count ?? 0}/${o.download_limit ?? 3}`,
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleResend = async (orderId: string) => {
    setResendState(s => ({ ...s, [orderId]: 'loading' }));
    const res = await fetch(`/api/admin/orders/${orderId}/resend-email`, { method: 'POST' });
    setResendState(s => ({ ...s, [orderId]: res.ok ? 'done' : 'err' }));
    if (res.ok) setTimeout(() => setResendState(s => ({ ...s, [orderId]: 'idle' })), 3000);
  };

  const handleResetDownloads = async (orderId: string) => {
    setResetState(s => ({ ...s, [orderId]: 'loading' }));
    const res = await fetch(`/api/admin/orders/${orderId}/reset-downloads`, { method: 'POST' });
    if (res.ok) {
      setDlCounts(c => ({ ...c, [orderId]: 0 }));
      setResetState(s => ({ ...s, [orderId]: 'done' }));
      setTimeout(() => setResetState(s => ({ ...s, [orderId]: 'idle' })), 3000);
    } else {
      setResetState(s => ({ ...s, [orderId]: 'err' }));
    }
    setResetConfirm(null);
  };

  const DATE_TABS: { label: string; value: DateFilter }[] = [
    { label: 'All Time', value: 'all' },
    { label: 'Today',    value: 'today' },
    { label: '7 Days',   value: '7d' },
    { label: '30 Days',  value: '30d' },
  ];

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: '#fff',
    borderRadius: '10px',
  };

  return (
    <div className="space-y-4">
      {/* Date tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
        {DATE_TABS.map(t => (
          <button key={t.value} onClick={() => setDateFilter(t.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={dateFilter === t.value ? {
              background: 'rgba(99,102,241,0.18)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc'
            } : { border: '1px solid transparent', color: '#52525b' }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 min-w-0 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input
            type="text"
            placeholder="Search by name, email, order ID, short ID (A3F9B2C1)…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none transition-all"
            style={{ ...inputStyle, ...(searchQuery ? { borderColor: 'rgba(99,102,241,0.4)', boxShadow: '0 0 0 3px rgba(99,102,241,0.08)' } : {}) }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)}
            className="px-3 py-2.5 text-sm focus:outline-none cursor-pointer"
            style={inputStyle}>
            <option value="ALL">All Statuses</option>
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
          </select>

          <select value={projectFilter} onChange={e => setProjectFilter(e.target.value)}
            className="px-3 py-2.5 text-sm focus:outline-none cursor-pointer max-w-[180px] truncate"
            style={inputStyle}>
            <option value="ALL">All Projects</option>
            {projectTitles.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <button onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-zinc-300 hover:text-white transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
            <FileDown className="w-4 h-4" /> CSV
          </button>
        </div>
      </div>

      {/* Search hint */}
      {searchQuery && (
        <p className="text-xs text-zinc-600">
          {filteredOrders.length} result{filteredOrders.length !== 1 ? 's' : ''} for &quot;<span className="text-zinc-400">{searchQuery}</span>&quot;
          {filteredOrders.length === 0 && <span className="ml-2 text-zinc-700">— try the short ID shown on the student&apos;s success page (e.g. <code className="font-mono">A3F9B2C1</code>)</span>}
        </p>
      )}

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={cardStyle}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <th className="px-4 py-3 w-8" />
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Project / Order ID</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Add-ons</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider text-right">DL</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o, idx) => {
                const isExpanded = expandedId === o.id;
                const dlCount = dlCounts[o.id] ?? o.download_count ?? 0;
                const rState = resendState[o.id] ?? 'idle';
                const rstState = resetState[o.id] ?? 'idle';
                const shortId = o.id.split('-')[0].toUpperCase();
                const statusCfg = STATUS_CONFIG[o.status] ?? STATUS_CONFIG.FAILED;
                const isLast = idx === filteredOrders.length - 1;

                return (
                  <>
                    <tr
                      key={o.id}
                      onClick={() => setExpandedId(isExpanded ? null : o.id)}
                      className="cursor-pointer transition-colors group"
                      style={{
                        borderBottom: isLast && !isExpanded ? 'none' : '1px solid rgba(255,255,255,0.04)',
                        background: isExpanded ? 'rgba(99,102,241,0.04)' : 'transparent',
                      }}
                      onMouseEnter={e => { if (!isExpanded) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'; }}
                      onMouseLeave={e => { if (!isExpanded) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                    >
                      <td className="px-4 py-3.5">
                        <div className="w-5 h-5 rounded-md flex items-center justify-center transition-all"
                          style={{ background: isExpanded ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.04)', border: `1px solid ${isExpanded ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.06)'}` }}>
                          {isExpanded
                            ? <ChevronUp className="w-3 h-3 text-brand-400" />
                            : <ChevronDown className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400" />}
                        </div>
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <p className="text-zinc-300 text-xs font-medium">
                          {new Date(o.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                        </p>
                        <p className="text-zinc-600 text-[11px] mt-0.5">
                          {new Date(o.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })}
                        </p>
                      </td>

                      <td className="px-4 py-3.5">
                        <p className="text-white text-xs font-semibold">{o.customer_name}</p>
                        <p className="text-zinc-600 text-[11px] mt-0.5">{o.customer_email}</p>
                      </td>

                      <td className="px-4 py-3.5 max-w-[200px]">
                        <p className="text-zinc-300 text-xs truncate">{o.projects?.title ?? <span className="italic text-zinc-700">Unknown</span>}</p>
                        <p className="text-zinc-700 text-[11px] font-mono mt-0.5 flex items-center gap-1">
                          <span className="text-zinc-500 font-semibold not-italic">{shortId}</span>
                          <span className="text-zinc-800">·</span>
                          <span className="truncate">{o.order_id}</span>
                        </p>
                      </td>

                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <p className="text-white text-xs font-bold">{formatCurrency(o.amount_paid)}</p>
                      </td>

                      <td className="px-4 py-3.5">
                        <span className="text-[11px] px-2 py-0.5 rounded-full font-bold"
                          style={{ background: statusCfg.bg, border: `1px solid ${statusCfg.border}`, color: statusCfg.text }}>
                          {statusCfg.label}
                        </span>
                      </td>

                      <td className="px-4 py-3.5">
                        <div className="flex flex-wrap gap-1">
                          {o.has_personalization && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                              style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8' }}>Name</span>
                          )}
                          {o.has_plagiarism_cert && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                              style={{ background: 'rgba(245,158,11,0.12)', color: '#fbbf24' }}>Cert</span>
                          )}
                          {o.has_viva_call && (
                            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                              style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}>Viva</span>
                          )}
                          {!o.has_personalization && !o.has_plagiarism_cert && !o.has_viva_call && (
                            <span className="text-zinc-800 text-[10px]">—</span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-xs"
                          style={{ color: dlCount >= (o.download_limit ?? 3) ? '#f87171' : '#52525b' }}>
                          <Download className="w-3 h-3" />
                          {dlCount}/{o.download_limit ?? 3}
                        </span>
                      </td>
                    </tr>

                    {/* Expanded panel */}
                    {isExpanded && (
                      <tr key={`${o.id}-exp`}>
                        <td colSpan={8} style={{ borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.04)', background: 'rgba(99,102,241,0.03)' }}>
                          <div className="px-6 py-5 row-expand">
                            {/* Detail grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-5">
                              <DetailCell label="Short Order ID" value={
                                <span className="font-mono font-bold text-brand-400 text-sm">{shortId}</span>
                              } />
                              <DetailCell label="Full UUID" value={
                                <span className="font-mono text-zinc-400 text-[11px] break-all">{o.id}</span>
                              } />
                              <DetailCell label="Razorpay Order" value={
                                <span className="font-mono text-zinc-400 text-[11px]">{o.order_id}</span>
                              } />
                              <DetailCell label="Payment ID" value={
                                <span className="font-mono text-zinc-400 text-[11px]">{o.payment_id ?? '—'}</span>
                              } />
                              <DetailCell label="Phone" value={
                                <a href={`tel:${o.customer_phone}`} className="text-brand-400 hover:text-brand-300 flex items-center gap-1 text-xs">
                                  <Phone className="w-3 h-3" /> {o.customer_phone}
                                </a>
                              } />
                              {o.college_name && (
                                <DetailCell label="College" value={
                                  <span className="text-zinc-300 flex items-center gap-1 text-xs">
                                    <Building2 className="w-3 h-3 text-zinc-600 shrink-0" /> {o.college_name}
                                  </span>
                                } />
                              )}
                              <DetailCell label="Time (IST)" value={
                                <span className="text-zinc-300 text-xs">
                                  {new Date(o.created_at).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata' })}
                                </span>
                              } />
                              <DetailCell label="Downloads" value={
                                <span className="text-xs" style={{ color: dlCount >= (o.download_limit ?? 3) ? '#f87171' : '#34d399' }}>
                                  {dlCount} of {o.download_limit ?? 3} used
                                </span>
                              } />
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-2 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                              {/* Resend email */}
                              <ActionButton
                                onClick={e => { e.stopPropagation(); handleResend(o.id); }}
                                disabled={rState === 'loading' || rState === 'done'}
                                state={rState}
                                idle={<><Mail className="w-3.5 h-3.5" /> Resend Confirmation Email</>}
                                loading={<><Loader2 className="w-3.5 h-3.5 animate-spin" /> Sending…</>}
                                done={<><Check className="w-3.5 h-3.5" /> Email Sent!</>}
                                err={<><AlertCircle className="w-3.5 h-3.5" /> Failed — Retry</>}
                                accentColor="rgba(99,102,241"
                              />

                              {/* Reset downloads */}
                              {resetConfirm === o.id ? (
                                <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                  <span className="text-xs text-amber-400 font-medium">
                                    Give {o.customer_name.split(' ')[0]} 3 fresh downloads?
                                  </span>
                                  <button
                                    onClick={() => handleResetDownloads(o.id)}
                                    disabled={rstState === 'loading'}
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
                                    style={{ background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', color: '#fbbf24' }}>
                                    {rstState === 'loading' ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Confirm Reset'}
                                  </button>
                                  <button onClick={() => setResetConfirm(null)}
                                    className="text-xs text-zinc-600 hover:text-white transition-colors px-2 py-2">
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <ActionButton
                                  onClick={e => { e.stopPropagation(); setResetConfirm(o.id); }}
                                  disabled={rstState === 'done'}
                                  state={rstState}
                                  idle={<><RotateCcw className="w-3.5 h-3.5" /> Reset Downloads</>}
                                  loading={<><Loader2 className="w-3.5 h-3.5 animate-spin" /> Resetting…</>}
                                  done={<><Check className="w-3.5 h-3.5" /> Downloads Reset!</>}
                                  err={<><AlertCircle className="w-3.5 h-3.5" /> Failed — Retry</>}
                                  accentColor="rgba(245,158,11"
                                />
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-20 text-center">
                    <Search className="w-8 h-8 text-zinc-800 mx-auto mb-3" />
                    <p className="text-zinc-600 text-sm font-medium">No orders found</p>
                    {searchQuery && (
                      <p className="text-zinc-700 text-xs mt-1">
                        Try searching the short ID (e.g. <code className="font-mono text-zinc-500">A3F9B2C1</code>), email, or phone number
                      </p>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-zinc-700 text-xs text-right">
        {filteredOrders.length} of {initialOrders.length} orders
      </p>
    </div>
  );
}

// ── Micro helpers ────────────────────────────────────────────────────────────
function DetailCell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-1">{label}</p>
      <div>{value}</div>
    </div>
  );
}

function ActionButton({
  onClick, disabled, state, idle, loading, done, err, accentColor,
}: {
  onClick: (e: React.MouseEvent) => void;
  disabled: boolean;
  state: 'idle' | 'loading' | 'done' | 'err';
  idle: React.ReactNode;
  loading: React.ReactNode;
  done: React.ReactNode;
  err: React.ReactNode;
  accentColor: string;
}) {
  const styles: Record<string, React.CSSProperties> = {
    idle:    { background: 'rgba(255,255,255,0.04)',      border: '1px solid rgba(255,255,255,0.08)', color: '#a1a1aa'  },
    loading: { background: 'rgba(255,255,255,0.04)',      border: '1px solid rgba(255,255,255,0.08)', color: '#71717a'  },
    done:    { background: `${accentColor},0.12)`,        border: `1px solid ${accentColor},0.3)`,    color: '#34d399'  },
    err:     { background: 'rgba(239,68,68,0.1)',         border: '1px solid rgba(239,68,68,0.25)',   color: '#f87171'  },
  };
  const content = { idle, loading, done, err }[state];
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all disabled:opacity-60 hover:brightness-110"
      style={styles[state]}
      onMouseEnter={e => {
        if (state === 'idle') {
          (e.currentTarget as HTMLElement).style.background = `${accentColor},0.1)`;
          (e.currentTarget as HTMLElement).style.borderColor = `${accentColor},0.25)`;
          (e.currentTarget as HTMLElement).style.color = '#fff';
        }
      }}
      onMouseLeave={e => {
        if (state === 'idle') {
          (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
          (e.currentTarget as HTMLElement).style.color = '#a1a1aa';
        }
      }}
    >
      {content}
    </button>
  );
}
