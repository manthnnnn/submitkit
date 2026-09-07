'use client';

import { useState, useMemo } from 'react';
import { formatCurrency } from '@/lib/utils';
import { Download, Search, FileDown } from 'lucide-react';

type OrderRow = {
  id: string;
  order_id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  amount_paid: number;
  status: 'PAID' | 'PENDING' | 'FAILED';
  download_count: number | null;
  download_limit: number | null;
  created_at: string;
  has_personalization: boolean;
  has_viva_call: boolean;
  projects: { title: string } | null;
};

const STATUS_STYLES: Record<string, string> = {
  PAID:    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
  PENDING: 'bg-amber-500/20  text-amber-400  border border-amber-500/30',
  FAILED:  'bg-red-500/20    text-red-400    border border-red-500/30',
};

export function ClientOrdersTable({ initialOrders }: { initialOrders: OrderRow[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PAID' | 'PENDING' | 'FAILED'>('ALL');

  const filteredOrders = useMemo(() => {
    let result = initialOrders;

    if (statusFilter !== 'ALL') {
      result = result.filter(o => o.status === statusFilter);
    }

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
  }, [initialOrders, searchQuery, statusFilter]);

  const handleExportCSV = () => {
    const headers = ['Date', 'Order ID', 'Customer Name', 'Email', 'Phone', 'Project', 'Amount', 'Status', 'Personalization', 'Viva', 'Downloads'];
    const rows = filteredOrders.map(o => [
      new Date(o.created_at).toISOString(),
      o.order_id,
      `"${o.customer_name}"`,
      o.customer_email,
      o.customer_phone,
      `"${o.projects?.title || 'Unknown'}"`,
      o.amount_paid,
      o.status,
      o.has_personalization ? 'Yes' : 'No',
      o.has_viva_call ? 'Yes' : 'No',
      `${o.download_count || 0}/${o.download_limit || 3}`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `orders_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name, email, or order ID..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-brand-500/50"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as any)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-500/50"
          >
            <option value="ALL">All Statuses</option>
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
            <option value="FAILED">Failed</option>
          </select>
          
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
          >
            <FileDown className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
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
              {filteredOrders.map((o) => (
                <tr key={o.id} className="hover:bg-slate-800/40 transition-colors group">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <p className="text-slate-300 text-xs">
                      {new Date(o.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: '2-digit' })}
                    </p>
                    <p className="text-slate-600 text-[11px]">
                      {new Date(o.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </td>

                  <td className="px-4 py-3">
                    <p className="text-white font-medium text-xs">{o.customer_name}</p>
                    <p className="text-slate-500 text-[11px]">{o.customer_email}</p>
                    <p className="text-slate-600 text-[11px]">{o.customer_phone}</p>
                  </td>

                  <td className="px-4 py-3 max-w-[180px]">
                    <p className="text-slate-300 text-xs truncate" title={o.projects?.title ?? ''}>
                      {o.projects?.title ?? <span className="text-slate-600 italic">Unknown</span>}
                    </p>
                    <p className="text-slate-600 text-[11px] font-mono truncate">{o.order_id}</p>
                  </td>

                  <td className="px-4 py-3 text-slate-300 font-medium whitespace-nowrap">
                    {formatCurrency(o.amount_paid)}
                  </td>

                  <td className="px-4 py-3">
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${STATUS_STYLES[o.status] ?? STATUS_STYLES.FAILED}`}>
                      {o.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {o.has_personalization && (
                        <span className="text-[10px] bg-brand-500/15 text-brand-400 px-1.5 py-0.5 rounded font-medium">
                          Name
                        </span>
                      )}
                      {o.has_viva_call && (
                        <span className="text-[10px] bg-purple-500/15 text-purple-400 px-1.5 py-0.5 rounded font-medium">
                          Viva
                        </span>
                      )}
                      {!o.has_personalization && !o.has_viva_call && (
                        <span className="text-[10px] text-slate-700">—</span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-slate-400 text-xs">
                      <Download className="w-3 h-3" />
                      {o.download_count ?? 0} / {o.download_limit ?? 3}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center text-slate-600 text-sm">
                    No orders match your search criteria.
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
