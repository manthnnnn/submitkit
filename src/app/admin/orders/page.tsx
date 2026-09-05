import { createAdminClient } from '@/lib/supabase/admin';
import { formatCurrency } from '@/lib/utils';
import { Order } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
  const supabase = createAdminClient();
  
  // Fetch orders with project title
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*, projects(title)')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    return <div className="text-error-400">Failed to load orders: {error.message}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Recent Orders</h1>
      
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-sm">
                <th className="p-4 font-medium">Order ID / Date</th>
                <th className="p-4 font-medium">Customer</th>
                <th className="p-4 font-medium">Project</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Downloads</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.map((o: any) => (
                <tr key={o.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <p className="text-white font-mono text-sm">{o.order_id}</p>
                    <p className="text-xs text-slate-500">{new Date(o.created_at).toLocaleString()}</p>
                  </td>
                  <td className="p-4">
                    <p className="text-white text-sm">{o.customer_name}</p>
                    <p className="text-xs text-slate-400">{o.customer_email}</p>
                  </td>
                  <td className="p-4 text-slate-300 text-sm max-w-[200px] truncate" title={o.projects?.title}>
                    {o.projects?.title || 'Unknown Project'}
                  </td>
                  <td className="p-4 text-slate-300">{formatCurrency(o.amount_paid)}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded font-bold ${
                      o.status === 'PAID' ? 'bg-success-500/20 text-success-400' :
                      o.status === 'PENDING' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-error-500/20 text-error-400'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="p-4 text-right text-slate-400 text-sm">
                    {o.download_count} / {o.download_limit}
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">No orders found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
