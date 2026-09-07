import { createAdminClient } from '@/lib/supabase/admin';
import { formatCurrency } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import { ClientOrdersTable, type OrderRow } from './client-orders-table';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from('orders')
    .select(`
      id, order_id, payment_id,
      customer_name, customer_email, customer_phone, college_name,
      amount_paid, status,
      download_count, download_limit,
      created_at,
      has_personalization, has_plagiarism_cert, has_viva_call,
      projects(title)
    `)
    .order('created_at', { ascending: false })
    .limit(200);

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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Revenue (shown)',  value: formatCurrency(revenue), color: 'text-emerald-400' },
          { label: 'Paid',             value: String(paidCount),        color: 'text-emerald-400' },
          { label: 'Pending / Failed', value: String(pendingCount),     color: 'text-amber-400'  },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3">
            <p className="text-slate-500 text-xs mb-1">{label}</p>
            <p className={`text-xl font-bold font-display ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <ClientOrdersTable initialOrders={orders} />
    </div>
  );
}
