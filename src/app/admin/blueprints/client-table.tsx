'use client';

import { useState, useMemo } from 'react';
import type { BlueprintRow } from './page';
import { ChevronDown, ChevronUp, Download, Search } from 'lucide-react';

const cardStyle = {
  background: 'linear-gradient(135deg, rgba(24,24,27,0.8), rgba(9,9,11,0.9))',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(20px)',
};

function StatusBadge({ status }: { status: BlueprintRow['status'] }) {
  const map = {
    PAID:    { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', color: '#34d399', label: 'Paid' },
    PENDING: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', color: '#fbbf24', label: 'Pending' },
    FAILED:  { bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.3)',  color: '#f87171', label: 'Failed' },
  };
  const s = map[status] ?? map.PENDING;
  return (
    <span
      className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold"
      style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.color }}
    >
      {s.label}
    </span>
  );
}

type SortKey = 'created_at' | 'status' | 'topic_title' | 'pdf_downloads';

export function BlueprintPurchasesTable({ rows }: { rows: BlueprintRow[] }) {
  const [query, setQuery]     = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('created_at');
  const [sortAsc, setSortAsc] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    const result = q
      ? rows.filter(r =>
          r.topic_title.toLowerCase().includes(q) ||
          r.customer_email.toLowerCase().includes(q) ||
          r.customer_phone.includes(q) ||
          (r.razorpay_order_id ?? '').toLowerCase().includes(q) ||
          (r.razorpay_payment_id ?? '').toLowerCase().includes(q) ||
          r.topic_id.toLowerCase().includes(q)
        )
      : rows;

    return [...result].sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'created_at') cmp = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      else if (sortKey === 'topic_title') cmp = a.topic_title.localeCompare(b.topic_title);
      else if (sortKey === 'status') cmp = a.status.localeCompare(b.status);
      else if (sortKey === 'pdf_downloads') cmp = a.pdf_downloads - b.pdf_downloads;
      return sortAsc ? cmp : -cmp;
    });
  }, [rows, query, sortKey, sortAsc]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(v => !v);
    else { setSortKey(key); setSortAsc(false); }
  }

  function SortIcon({ k }: { k: SortKey }) {
    if (sortKey !== k) return null;
    return sortAsc
      ? <ChevronUp className="w-3 h-3 inline ml-1" />
      : <ChevronDown className="w-3 h-3 inline ml-1" />;
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-2xl p-12 text-center" style={cardStyle}>
        <p className="text-zinc-500 text-sm">No blueprint purchases yet.</p>
        <p className="text-zinc-700 text-xs mt-1">Purchases will appear here once users buy a ₹19 blueprint.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
        <input
          type="text"
          placeholder="Search topic, email, Razorpay ID…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:ring-1 focus:ring-indigo-500/50"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
        />
      </div>

      <p className="text-zinc-600 text-xs">{filtered.length} of {rows.length} purchases</p>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={cardStyle}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                {[
                  { label: 'Topic',     key: 'topic_title'   as SortKey },
                  { label: 'Email',     key: null },
                  { label: 'Phone',     key: null },
                  { label: 'Status',    key: 'status'        as SortKey },
                  { label: 'Downloads', key: 'pdf_downloads' as SortKey },
                  { label: 'Date',      key: 'created_at'    as SortKey },
                ].map(({ label, key }) => (
                  <th
                    key={label}
                    onClick={key ? () => toggleSort(key) : undefined}
                    className={`px-4 py-3 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider ${key ? 'cursor-pointer hover:text-zinc-300' : ''}`}
                  >
                    {label}{key && <SortIcon k={key} />}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <>
                  <tr
                    key={row.id}
                    onClick={() => setExpanded(expanded === row.id ? null : row.id)}
                    className="cursor-pointer transition-colors"
                    style={{
                      borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.04)' : undefined,
                      background: expanded === row.id ? 'rgba(99,102,241,0.06)' : undefined,
                    }}
                    onMouseEnter={e => { if (expanded !== row.id) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.025)'; }}
                    onMouseLeave={e => { if (expanded !== row.id) (e.currentTarget as HTMLElement).style.background = ''; }}
                  >
                    {/* Topic */}
                    <td className="px-4 py-3">
                      <p className="text-zinc-100 font-medium leading-tight truncate max-w-[200px]" title={row.topic_title}>
                        {row.topic_title}
                      </p>
                      <p className="text-zinc-600 text-xs mt-0.5 font-mono">{row.topic_id}</p>
                    </td>
                    {/* Email */}
                    <td className="px-4 py-3 text-zinc-300 max-w-[180px] truncate" title={row.customer_email}>
                      {row.customer_email}
                    </td>
                    {/* Phone */}
                    <td className="px-4 py-3 text-zinc-400 font-mono text-xs">{row.customer_phone}</td>
                    {/* Status */}
                    <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                    {/* Downloads */}
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-1.5 text-zinc-400 text-xs">
                        <Download className="w-3 h-3" />
                        {row.pdf_downloads}
                      </span>
                    </td>
                    {/* Date */}
                    <td className="px-4 py-3 text-zinc-500 text-xs whitespace-nowrap">
                      {new Date(row.created_at).toLocaleDateString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric',
                      })}
                      <br />
                      <span className="text-zinc-700">
                        {new Date(row.created_at).toLocaleTimeString('en-IN', {
                          hour: '2-digit', minute: '2-digit', hour12: true,
                        })}
                      </span>
                    </td>
                  </tr>

                  {/* Expanded row */}
                  {expanded === row.id && (
                    <tr key={`${row.id}-expanded`}>
                      <td colSpan={6} className="px-4 pb-4">
                        <div
                          className="rounded-xl p-4 space-y-3 mt-1 row-expand"
                          style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}
                        >
                          <p className="text-xs font-semibold text-indigo-300 uppercase tracking-wider mb-2">Purchase Detail</p>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {[
                              { label: 'Purchase ID',      value: row.id },
                              { label: 'Amount',           value: `₹${row.amount}` },
                              { label: 'Status',           value: row.status },
                              { label: 'Razorpay Order',   value: row.razorpay_order_id },
                              { label: 'Razorpay Payment', value: row.razorpay_payment_id ?? '—' },
                              { label: '.docx Downloads',  value: String(row.pdf_downloads) },
                            ].map(({ label, value }) => (
                              <div key={label}>
                                <p className="text-zinc-600 text-xs font-medium">{label}</p>
                                <p className="text-zinc-200 text-xs font-mono mt-0.5 break-all">{value}</p>
                              </div>
                            ))}
                          </div>
                          <div className="flex gap-3 pt-2">
                            <a
                              href={`mailto:${row.customer_email}?subject=Your ${row.topic_title} Blueprint | SubmitKit`}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                              style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' }}
                            >
                              ✉ Email Customer
                            </a>
                            <a
                              href={`https://wa.me/${row.customer_phone.replace(/\D/g, '')}?text=Hi! This is SubmitKit support regarding your "${row.topic_title}" blueprint purchase.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                              style={{ background: 'rgba(34,197,94,0.1)', color: '#86efac', border: '1px solid rgba(34,197,94,0.25)' }}
                            >
                              💬 WhatsApp
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
