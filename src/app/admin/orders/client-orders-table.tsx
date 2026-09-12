'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import {
  Download, Search, FileDown, ChevronDown, ChevronUp,
  Mail, RotateCcw, Loader2, Phone, Building2, Check, AlertCircle, X, RefreshCw,
  CheckSquare, Square, Send, CheckCircle2,
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
  const router = useRouter();
  const [isRefreshing, setIsRefreshing]   = useState(false);
  const [searchQuery, setSearchQuery]     = useState('');
  const [statusFilter, setStatusFilter]   = useState<'ALL' | 'PAID' | 'PENDING' | 'FAILED'>('ALL');
  const [dateFilter, setDateFilter]       = useState<DateFilter>('all');
  const [projectFilter, setProjectFilter] = useState('ALL');
  const [expandedId, setExpandedId]       = useState<string | null>(null);
  const [selectedIds, setSelectedIds]     = useState<Set<string>>(new Set());
  const [isBulkResending, setIsBulkResending] = useState(false);
  const [bulkProgress, setBulkProgress]   = useState<string | null>(null);

  // Optimistic UI state
  const [resendState, setResendState]     = useState<Record<string, 'idle' | 'loading' | 'done' | 'err'>>({});
  const [resetState, setResetState]       = useState<Record<string, 'idle' | 'loading' | 'done' | 'err'>>({});
  const [resetConfirm, setResetConfirm]   = useState<string | null>(null);
  const [dlCounts, setDlCounts]           = useState<Record<string, number>>({});

  const handleRefresh = () => {
    setIsRefreshing(true);
    router.refresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

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
        const shortId = o.id.split('-')[0].toUpperCase();
        const shortIdLower = shortId.toLowerCase();
        return (
          o.customer_name?.toLowerCase().includes(q) ||
          o.customer_email?.toLowerCase().includes(q) ||
          o.customer_phone?.includes(q) ||
          o.order_id?.toLowerCase().includes(q) ||
          o.id?.toLowerCase().includes(q) ||
          shortIdLower.includes(q) ||
          o.payment_id?.toLowerCase().includes(q) ||
          o.projects?.title?.toLowerCase().includes(q) ||
          o.college_name?.toLowerCase().includes(q)
        );
      });
    }
    return result;
  }, [initialOrders, searchQuery, statusFilter, projectFilter, dateFilter]);

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredOrders.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredOrders.map(o => o.id)));
    }
  };

  const toggleSelectRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleExportCSV = (ordersToExport = filteredOrders) => {
    const headers = ['Date', 'Short ID', 'Order UUID', 'Customer', 'Email', 'Phone', 'College', 'Project', 'Amount', 'Status', 'Personaliz.', 'Plagiarism', 'Viva', 'Downloads'];
    const rows = ordersToExport.map(o => [
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

  const handleResend = async (orderId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setResendState(s => ({ ...s, [orderId]: 'loading' }));
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/resend-email`, { method: 'POST' });
      setResendState(s => ({ ...s, [orderId]: res.ok ? 'done' : 'err' }));
      if (res.ok) setTimeout(() => setResendState(s => ({ ...s, [orderId]: 'idle' })), 3000);
    } catch {
      setResendState(s => ({ ...s, [orderId]: 'err' }));
    }
  };

  const handleBulkResend = async () => {
    const paidSelected = filteredOrders.filter(o => selectedIds.has(o.id) && o.status === 'PAID');
    if (paidSelected.length === 0) {
      alert('None of the selected orders are marked as PAID.');
      return;
    }

    if (!confirm(`Resend confirmation emails to ${paidSelected.length} customers?`)) return;

    setIsBulkResending(true);
    let successCount = 0;

    for (let i = 0; i < paidSelected.length; i++) {
      const o = paidSelected[i];
      setBulkProgress(`Sending ${i + 1} of ${paidSelected.length}...`);
      try {
        const res = await fetch(`/api/admin/orders/${o.id}/resend-email`, { method: 'POST' });
        if (res.ok) successCount++;
      } catch {
        // ignore
      }
    }

    setIsBulkResending(false);
    setBulkProgress(`Completed: ${successCount} emails sent.`);
    setTimeout(() => setBulkProgress(null), 4000);
  };

  const handleResetDownloads = async (orderId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    // Optimistic update
    setDlCounts(c => ({ ...c, [orderId]: 0 }));
    setResetState(s => ({ ...s, [orderId]: 'loading' }));
    try {
      const res = await fetch(`/api/admin/orders/${orderId}/reset-downloads`, { method: 'POST' });
      if (res.ok) {
        setResetState(s => ({ ...s, [orderId]: 'done' }));
        setTimeout(() => setResetState(s => ({ ...s, [orderId]: 'idle' })), 3000);
      } else {
        setResetState(s => ({ ...s, [orderId]: 'err' }));
      }
    } catch {
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
          <button
            key={t.value}
            onClick={() => setDateFilter(t.value)}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={dateFilter === t.value ? {
              background: 'rgba(99,102,241,0.18)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc'
            } : { border: '1px solid transparent', color: '#71717a' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Search + filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="relative flex-1 min-w-0 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search by student, email, order ID, short ID (A3F9B2C1)…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-8 py-2.5 text-sm placeholder:text-zinc-500 focus:outline-none transition-all"
            style={{ ...inputStyle, ...(searchQuery ? { borderColor: 'rgba(99,102,241,0.4)', boxShadow: '0 0 0 3px rgba(99,102,241,0.08)' } : {}) }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="px-3 py-2.5 text-sm focus:outline-none cursor-pointer"
            style={inputStyle}
          >
            <option value="ALL">All Statuses</option>
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
          </select>

          <select
            value={projectFilter}
            onChange={e => setProjectFilter(e.target.value)}
            className="px-3 py-2.5 text-sm focus:outline-none cursor-pointer max-w-[180px] truncate"
            style={inputStyle}
          >
            <option value="ALL">All Projects</option>
            {projectTitles.map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            title="Refresh orders"
            className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-zinc-300 hover:text-white transition-all disabled:opacity-50"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-indigo-400' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={() => handleExportCSV()}
            className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium text-zinc-300 hover:text-white transition-all"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}
          >
            <FileDown className="w-4 h-4" /> CSV
          </button>
        </div>
      </div>

      {/* Floating Bulk Actions Bar */}
      {selectedIds.size > 0 && (
        <div
          className="flex items-center justify-between px-4 py-3 rounded-xl border animate-in fade-in slide-in-from-top-2 duration-150"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.18), rgba(99,102,241,0.08))',
            borderColor: 'rgba(99,102,241,0.35)',
            boxShadow: '0 8px 24px rgba(99,102,241,0.15)',
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-white bg-indigo-600 px-2.5 py-1 rounded-full">
              {selectedIds.size} Selected
            </span>
            <span className="text-xs text-zinc-300">
              {bulkProgress || 'Actions available for selection'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBulkResend}
              disabled={isBulkResending}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors disabled:opacity-50"
            >
              {isBulkResending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              Bulk Resend Email
            </button>

            <button
              onClick={() => handleExportCSV(filteredOrders.filter(o => selectedIds.has(o.id)))}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white bg-white/5 border border-white/10"
            >
              <FileDown className="w-3.5 h-3.5" /> Export Selection
            </button>

            <button
              onClick={() => setSelectedIds(new Set())}
              className="text-xs text-zinc-400 hover:text-white px-2 py-1"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Table container */}
      <div className="rounded-2xl overflow-hidden" style={cardStyle}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <th className="px-3 py-3 w-10 text-center">
                  <button onClick={toggleSelectAll} className="text-zinc-500 hover:text-white transition-colors">
                    {selectedIds.size === filteredOrders.length && filteredOrders.length > 0 ? (
                      <CheckSquare className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Project / ID</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">Add-ons</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider text-right">DL</th>
                <th className="px-4 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-zinc-500 text-xs">
                    No orders match the selected criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o, idx) => {
                  const isExpanded = expandedId === o.id;
                  const isSelected = selectedIds.has(o.id);
                  const dlCount = dlCounts[o.id] ?? o.download_count ?? 0;
                  const rState = resendState[o.id] ?? 'idle';
                  const rstState = resetState[o.id] ?? 'idle';
                  const shortId = o.id.split('-')[0].toUpperCase();
                  const statusCfg = STATUS_CONFIG[o.status] ?? STATUS_CONFIG.FAILED;
                  const isLast = idx === filteredOrders.length - 1;

                  return (
                    <React.Fragment key={o.id}>
                      <tr
                        onClick={() => setExpandedId(isExpanded ? null : o.id)}
                        className="cursor-pointer transition-colors group"
                        style={{
                          borderBottom: isLast && !isExpanded ? 'none' : '1px solid rgba(255,255,255,0.04)',
                          background: isSelected
                            ? 'rgba(99,102,241,0.08)'
                            : isExpanded
                            ? 'rgba(99,102,241,0.04)'
                            : 'transparent',
                        }}
                      >
                        <td className="px-3 py-3.5 text-center" onClick={e => toggleSelectRow(o.id, e)}>
                          <button className="text-zinc-500 hover:text-white transition-colors">
                            {isSelected ? (
                              <CheckSquare className="w-4 h-4 text-indigo-400" />
                            ) : (
                              <Square className="w-4 h-4" />
                            )}
                          </button>
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
                          <p className="text-zinc-500 text-[11px] mt-0.5">{o.customer_email}</p>
                        </td>

                        <td className="px-4 py-3.5 max-w-[200px]">
                          <p className="text-zinc-300 text-xs truncate">{o.projects?.title ?? <span className="italic text-zinc-600">Unknown</span>}</p>
                          <p className="text-zinc-500 text-[11px] font-mono mt-0.5 flex items-center gap-1">
                            <span className="text-indigo-400 font-semibold">{shortId}</span>
                            <span>·</span>
                            <span className="truncate">{o.order_id}</span>
                          </p>
                        </td>

                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <p className="text-white text-xs font-bold">{formatCurrency(o.amount_paid)}</p>
                        </td>

                        <td className="px-4 py-3.5">
                          <span
                            className="text-[11px] px-2.5 py-0.5 rounded-full font-bold inline-block"
                            style={{ background: statusCfg.bg, border: `1px solid ${statusCfg.border}`, color: statusCfg.text }}
                          >
                            {statusCfg.label}
                          </span>
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="flex flex-wrap gap-1">
                            {o.has_personalization && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8' }}>Name</span>
                            )}
                            {o.has_plagiarism_cert && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: 'rgba(245,158,11,0.12)', color: '#fbbf24' }}>Cert</span>
                            )}
                            {o.has_viva_call && (
                              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa' }}>Viva</span>
                            )}
                            {!o.has_personalization && !o.has_plagiarism_cert && !o.has_viva_call && (
                              <span className="text-zinc-700 text-[10px]">—</span>
                            )}
                          </div>
                        </td>

                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <span
                            className="inline-flex items-center gap-1 text-xs"
                            style={{ color: dlCount >= (o.download_limit ?? 3) ? '#f87171' : '#a1a1aa' }}
                          >
                            <Download className="w-3 h-3" />
                            {dlCount}/{o.download_limit ?? 3}
                          </span>
                        </td>

                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5" onClick={e => e.stopPropagation()}>
                            {o.status === 'PAID' && (
                              <button
                                onClick={e => handleResend(o.id, e)}
                                disabled={rState === 'loading'}
                                title="Resend download email"
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-white transition-colors"
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                              >
                                {rState === 'loading' ? <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-400" /> : rState === 'done' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Mail className="w-3.5 h-3.5" />}
                              </button>
                            )}

                            <button
                              onClick={e => handleResetDownloads(o.id, e)}
                              disabled={rstState === 'loading'}
                              title="Reset download limit"
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-400 transition-colors"
                              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                            >
                              {rstState === 'loading' ? <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" /> : <RotateCcw className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* Expanded row card */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={9} className="p-4" style={{ background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                              <div>
                                <p className="text-zinc-500 font-semibold uppercase tracking-wider mb-1">Customer Details</p>
                                <p className="text-white font-medium">{o.customer_name}</p>
                                <p className="text-zinc-400">{o.customer_email}</p>
                                <p className="text-zinc-400">{o.customer_phone}</p>
                                {o.college_name && <p className="text-zinc-400 mt-1 flex items-center gap-1"><Building2 className="w-3 h-3" /> {o.college_name}</p>}
                              </div>

                              <div>
                                <p className="text-zinc-500 font-semibold uppercase tracking-wider mb-1">Transaction Data</p>
                                <p className="text-zinc-300 font-mono">UUID: {o.id}</p>
                                <p className="text-zinc-300 font-mono">Razorpay Order: {o.order_id}</p>
                                <p className="text-zinc-300 font-mono">Payment ID: {o.payment_id || 'None'}</p>
                                <p className="text-zinc-300">Amount: ₹{o.amount_paid}</p>
                              </div>

                              <div>
                                <p className="text-zinc-500 font-semibold uppercase tracking-wider mb-1">Delivery Status</p>
                                <p className="text-zinc-300">Downloads: {dlCount} / {o.download_limit ?? 3}</p>
                                <p className="text-zinc-300">Project: {o.projects?.title}</p>
                                <div className="mt-3 flex gap-2">
                                  {o.status === 'PAID' && (
                                    <button
                                      onClick={e => handleResend(o.id, e)}
                                      disabled={rState === 'loading'}
                                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500"
                                    >
                                      {rState === 'loading' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Mail className="w-3 h-3" />}
                                      Resend Email
                                    </button>
                                  )}
                                  <button
                                    onClick={e => handleResetDownloads(o.id, e)}
                                    disabled={rstState === 'loading'}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-300 hover:text-white bg-white/5 border border-white/10"
                                  >
                                    <RotateCcw className="w-3 h-3" /> Reset Limit
                                  </button>
                                </div>
                              </div>
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
