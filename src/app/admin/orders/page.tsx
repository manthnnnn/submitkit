import { createAdminClient } from '@/lib/supabase/admin';
import { formatCurrency } from '@/lib/utils';
import { AlertTriangle, ShoppingCart } from 'lucide-react';
import { ClientOrdersTable, type OrderRow } from './client-orders-table';

export const dynamic = 'force-dynamic';

const cardStyle = {
  background: 'linear-gradient(135deg, rgba(24,24,27,0.8), rgba(9,9,11,0.9))',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset',
};

import { unstable_cache } from 'next/cache';
import { safeQuery } from '@/lib/safe-query';

const getCachedOrders = unstable_cache(
  async () => {
    const supabase = createAdminClient();
    const result = await safeQuery<{ data: any[] | null; error: any }>(
      Promise.resolve(
        supabase
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
          .limit(300)
      ),
      { data: [], error: null },
      3500
    );

    return { data: (result?.data || []) as OrderRow[], error: (result?.error?.message as string) || null };
  },
  ['admin-orders-list-safe-cache'],
  { revalidate: 30, tags: ['orders'] }
);

export default async function AdminOrdersPage() {
  const { data, error } = await getCachedOrders();

  if (error) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Orders</h1>
          <p className="text-zinc-500 text-sm mt-0.5">All customer orders and transactions</p>
        </div>
        <div className="rounded-2xl p-5 flex items-start gap-4" style={{ ...cardStyle, borderColor: 'rgba(239,68,68,0.25)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </div>
          <div>
            <p className="text-red-300 font-semibold text-sm mb-1">Failed to load orders</p>
            <p className="text-zinc-500 text-xs">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const orders = (data ?? []) as unknown as OrderRow[];
  const paidCount    = orders.filter(o => o.status === 'PAID').length;
  const pendingCount = orders.filter(o => o.status === 'PENDING').length;
  const revenue      = orders.filter(o => o.status === 'PAID').reduce((s, o) => s + o.amount_paid, 0);

  const stats = [
    { label: 'Revenue (shown)', value: formatCurrency(revenue), accent: '#34d399' },
    { label: 'Paid Orders',     value: String(paidCount),        accent: '#34d399' },
    { label: 'Pending / Other', value: String(pendingCount),     accent: '#fbbf24' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Orders</h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            All customer purchases — click any row to expand details and take actions
          </p>
        </div>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <ShoppingCart className="w-4 h-4 text-emerald-400" />
        </div>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map(({ label, value, accent }) => (
          <div key={label} className="rounded-2xl p-4" style={cardStyle}>
            <p className="text-zinc-600 text-xs font-medium mb-1">{label}</p>
            <p className="text-xl font-bold font-display" style={{ color: accent }}>{value}</p>
          </div>
        ))}
      </div>

      {/* Search tip */}
      <div className="rounded-xl px-4 py-2.5 text-xs flex items-center gap-2" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <span className="text-brand-400">💡</span>
        <span className="text-zinc-400">
          Search by <span className="text-zinc-200 font-medium">student name</span>, <span className="text-zinc-200 font-medium">email</span>, <span className="text-zinc-200 font-medium">short Order ID</span> (e.g. <code className="font-mono text-brand-400">A3F9B2C1</code>), phone, or Razorpay ID
        </span>
      </div>

      <ClientOrdersTable initialOrders={orders} />
    </div>
  );
}
