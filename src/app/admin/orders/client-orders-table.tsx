'use client';

import { useState, useMemo } from 'react';
import { formatCurrency } from '@/lib/utils';
import {
  Download, Search, FileDown, ChevronDown, ChevronUp,
  Mail, RotateCcw, Loader2, Phone, Building2, Check, AlertCircle,
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

const STATUS_STYLES: Record<string, string> = {
  PAID:    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  PENDING: 'bg-amber-500/20  text-amber-400  border border-amber-500/30',
  FAILED:  'bg-red-500/20    text-red-400    border border-red-500/30',
};

type DateFilter = 'all' | 'today' | '7d' | '30d';

function isWithin(date: string, filter: DateFilter): boolean {
  if (filter === 'all') return true;
  const now = Date.now();
  const ms = { today: 86400000, '7d': 7 * 86400000, '30d': 30 * 86400000 }[filter]!;
  return now - new Date(date).getTime() <= ms;
}

export function ClientOrdersTable({ initialOrders }: { initialOrders: OrderRow[] }) {
  const [searchQuery, setSearchQuery]     = useState('');
  const [statusFilter, setStatusFilter]   = useState<'ALL' | 'PAID' | 'PENDING' | 'FAILED'>('ALL');
  const [dateFilter, setDateFilter]       = useState<DateFilter>('all');
  const [projectFilter, setProjectFilter] = useState('ALL');
  const [expandedId, setExpandedId]       = useState<string | null>(null);

  // Per-row action states
  const [resendState, setResendState]     = useState<Record<string, 'idle' | 'loading' | 'done' | 'err'>>({});
  const [resetState, setResetState]       = useState<Record<string, 'idle' | 'loading' | 'done' | 'err'>>({});
  const [resetConfirm, setResetConfirm]   = useState<string | null>(null);
  // Local download_count mirror for optimistic update
  const [dlCounts, setDlCounts]           = useState<Record<string, number>>({});

  // Collect unique project titles for filter dropdown
  const projectTitles = useMemo(() => {
    const titles = new Set(initialOrders.map(o => o.projects?.title ?? 'Unknown'));
    return Array.from(titles).sort();
  }, [initialOrders]);

  const filteredOrders = useMemo(() => {
    let result = initialOrders;
    if (statusFilter !== 'ALL') result = result.filter(o => o.status === statusFilter);
    if (projectFilter !== 'ALL') result = result.filter(o => (o.projects?.title ?? 'Unknown') === projectFilter);
    if (dateFilter !== 'all') result = result.filter(o => isWithin(o.created_at, dateFilter));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(o =>
        o.customer_name?.toLowerCase().includes(q) ||
        o.customer_email?.toLowerCase().includes(q) ||
        o.order_id?.toLowerCase().includes(q) ||
        o.projects?.title?.toLowerCase().includes(q)
      );
    }
    return result;
  }, [initialOrders, searchQuery, statusFilter, projectFilter, dateFilter]);

  const handleExportCSV = () => {
    const headers = ['Date', 'Order ID', 'Customer', 'Email', 'Phone', 'College', 'Project', 'Amount', 'Status', 'Personaliz.', 'Plagiarism', 'Viva', 'Downloads'];
    const rows = filteredOrders.map(o => [
      new Date(o.created_at).toISOString(),
      o.order_id,
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
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
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

  return (
    <div>
      {/* Date range tabs */}
      <div className="flex gap-1 mb-4 p-1 bg-slate-900 border border-slate-800 rounded-xl w-fit">
        {DATE_TABS.map(t => (
          <button key={t.value} onClick={() => setDateFilter(t.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              dateFilter === t.value
                ? 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                : 'text-slate-400 hover:text-white'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Search + filters row */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input type="text" placeholder="Search name, email, order ID…"
            value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500/50" />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as typeof statusFilter)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500/50">
            <option value="ALL">All Statuses</option>
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
          </select>
          <select value={projectFilter} onChange={e => setProjectFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500/50 max-w-[160px]">
            <option value="ALL">All Projects</option>
            {projectTitles.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <button onClick={handleExportCSV}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-3 py-2 rounded-lg text-sm transition-colors">
            <FileDown className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-4 py-3 font-medium w-4" />
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Customer</th>
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Add-ons</th>
                <th className="px-4 py-3 font-medium text-right">Downloads</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.map((o) => {
                const isExpanded = expandedId === o.id;
                const dlCount = dlCounts[o.id] ?? o.download_count ?? 0;
                const rState = resendState[o.id] ?? 'idle';
                const rstState = resetState[o.id] ?? 'idle';

                return (
                  <>
                    {/* Main row */}
                    <tr key={o.id}
                      className={`transition-colors cursor-pointer ${isExpanded ? 'bg-slate-800/60' : 'hover:bg-slate-800/40'}`}
                      onClick={() => setExpandedId(isExpanded ? null : o.id)}
                    >
                      <td className="px-4 py-3 text-slate-500">
                        {isExpanded
                          ? <ChevronUp className="w-3.5 h-3.5" />
                          : <ChevronDown className="w-3.5 h-3.5" />}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <p className="text-slate-300 text-xs">
                          {new Date(o.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                        </p>
                        <p className="text-slate-600 text-[11px]">
                          {new Date(o.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })} IST
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-white font-medium text-xs">{o.customer_name}</p>
                        <p className="text-slate-500 text-[11px]">{o.customer_email}</p>
                      </td>
                      <td className="px-4 py-3 max-w-[180px]">
                        <p className="text-slate-300 text-xs truncate">{o.projects?.title ?? <span className="italic text-slate-600">Unknown</span>}</p>
                        <p className="text-slate-600 text-[11px] font-mono truncate">{o.order_id}</p>
                      </td>
                      <td className="px-4 py-3 text-slate-300 font-medium whitespace-nowrap text-xs">
                        {formatCurrency(o.amount_paid)}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${STATUS_STYLES[o.status] ?? STATUS_STYLES.FAILED}`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1">
                          {o.has_personalization && <span className="text-[10px] bg-brand-500/15 text-brand-400 px-1.5 py-0.5 rounded font-medium">Name</span>}
                          {o.has_plagiarism_cert  && <span className="text-[10px] bg-amber-500/15 text-amber-400 px-1.5 py-0.5 rounded font-medium">Cert</span>}
                          {o.has_viva_call        && <span className="text-[10px] bg-purple-500/15 text-purple-400 px-1.5 py-0.5 rounded font-medium">Viva</span>}
                          {!o.has_personalization && !o.has_plagiarism_cert && !o.has_viva_call && <span className="text-[10px] text-slate-700">—</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-slate-400 text-xs">
                          <Download className="w-3 h-3" />
                          {dlCount} / {o.download_limit ?? 3}
                        </span>
                      </td>
                    </tr>

                    {/* Expanded detail row */}
                    {isExpanded && (
                      <tr key={`${o.id}-detail`} className="bg-slate-800/30 border-b border-slate-700/50">
                        <td colSpan={8} className="px-6 py-5">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
                            {/* Full IDs */}
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Full Order UUID</p>
                              <p className="text-xs font-mono text-slate-300 break-all">{o.id}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Razorpay Payment ID</p>
                              <p className="text-xs font-mono text-slate-300">{o.payment_id ?? '—'}</p>
                            </div>
                            {/* Contact */}
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Phone</p>
                              <a href={`tel:${o.customer_phone}`} className="text-xs text-brand-400 hover:underline flex items-center gap-1">
                                <Phone className="w-3 h-3" /> {o.customer_phone}
                              </a>
                            </div>
                            {o.college_name && (
                              <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">College</p>
                                <p className="text-xs text-slate-300 flex items-center gap-1">
                                  <Building2 className="w-3 h-3 text-slate-500" /> {o.college_name}
                                </p>
                              </div>
                            )}
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Exact Time (IST)</p>
                              <p className="text-xs text-slate-300">
                                {new Date(o.created_at).toLocaleString('en-IN', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Asia/Kolkata' })}
                              </p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Downloads Used</p>
                              <p className="text-xs text-slate-300">{dlCount} of {o.download_limit ?? 3} used</p>
                            </div>
                          </div>

                          {/* Action buttons */}
                          <div className="flex flex-wrap gap-3 pt-3 border-t border-slate-700/50">
                            {/* Resend email */}
                            <button
                              onClick={e => { e.stopPropagation(); handleResend(o.id); }}
                              disabled={rState === 'loading' || rState === 'done'}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                                rState === 'done' ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                                : rState === 'err'  ? 'bg-red-500/15 border-red-500/30 text-red-400'
                                : 'bg-slate-700/60 border-slate-600/50 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50'
                              }`}
                            >
                              {rState === 'loading' ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                : rState === 'done'  ? <Check className="w-3.5 h-3.5" />
                                : rState === 'err'   ? <AlertCircle className="w-3.5 h-3.5" />
                                : <Mail className="w-3.5 h-3.5" />}
                              {rState === 'done' ? 'Email Sent!' : rState === 'err' ? 'Send Failed' : 'Resend Confirmation Email'}
                            </button>

                            {/* Reset downloads */}
                            {resetConfirm === o.id ? (
                              <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                                <span className="text-xs text-amber-400">Give {o.customer_name.split(' ')[0]} 3 fresh downloads?</span>
                                <button
                                  onClick={() => handleResetDownloads(o.id)}
                                  disabled={rstState === 'loading'}
                                  className="px-3 py-2 rounded-lg text-xs font-bold bg-amber-500/20 border border-amber-500/30 text-amber-400 hover:bg-amber-500/30 transition-all disabled:opacity-50"
                                >
                                  {rstState === 'loading' ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Confirm'}
                                </button>
                                <button onClick={() => setResetConfirm(null)} className="text-xs text-slate-500 hover:text-white">Cancel</button>
                              </div>
                            ) : (
                              <button
                                onClick={e => { e.stopPropagation(); setResetConfirm(o.id); }}
                                disabled={rstState === 'done'}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border transition-all ${
                                  rstState === 'done' ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                                  : rstState === 'err' ? 'bg-red-500/15 border-red-500/30 text-red-400'
                                  : 'bg-slate-700/60 border-slate-600/50 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-50'
                                }`}
                              >
                                {rstState === 'done' ? <Check className="w-3.5 h-3.5" />
                                  : rstState === 'err' ? <AlertCircle className="w-3.5 h-3.5" />
                                  : <RotateCcw className="w-3.5 h-3.5" />}
                                {rstState === 'done' ? 'Downloads Reset!' : rstState === 'err' ? 'Reset Failed' : 'Reset Download Count'}
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-16 text-center text-slate-600 text-sm">
                    No orders match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
