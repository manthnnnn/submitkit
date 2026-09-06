import { createAdminClient } from '@/lib/supabase/admin';
import { formatCurrency } from '@/lib/utils';
import { AlertTriangle, Download } from 'lucide-react';

export const dynamic = 'force-dynamic';

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

export default async function AdminOrdersPage() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('orders')
    .select('id, order_id, customer_name, customer_email, customer_phone, amount_paid, status, download_count, download_limit, created_at, has_personalization, has_viva_call, projects(title)')
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">Orders</h1>
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 flex items-start gap-4">
          <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-red-300 font-semibold mb-1">Failed to load orders</p>
            <p className="text-red-200/70 text-sm">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const orders = (data ?? []) as unknown as OrderRow[];
  const paidCount    = orders.filter(o => o.status === 'PAID').length;
  const pendingCount = orders.filter(o => o.status === 'PENDING').length;
  const revenue      = orders.filter(o => o.status === 'PAID').reduce((s, o) => s + o.amount_paid, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <span className="text-xs text-slate-500 font-medium">Showing last {orders.length}</span>
      </div>

      {/* Quick stat strip */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Revenue (shown)',  value: formatCurrency(revenue),       color: 'text-emerald-400' },
          { label: 'Paid',             value: String(paidCount),             color: 'text-emerald-400' },
          { label: 'Pending / Failed', value: String(pendingCount),          color: 'text-amber-400'   },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3">
            <p className="text-slate-500 text-xs mb-1">{label}</p>
            <p className={`text-xl font-bold font-display ${color}`}>{value}</p>
          </div>
        ))}
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
              {orders.map((o) => (
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

              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-16 text-center text-slate-600 text-sm">
                    No orders yet. They will appear here once customers check out.
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
