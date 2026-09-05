import { createAdminClient } from '@/lib/supabase/admin';
import { formatCurrency } from '@/lib/utils';
import { IndianRupee, Package, ShoppingCart, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const supabase = createAdminClient();
  
  // Fetch overview stats
  const { count: projectCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true });
    
  const { data: paidOrders } = await supabase
    .from('orders')
    .select('amount_paid')
    .eq('status', 'PAID');
    
  const { count: pendingOrders } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'PENDING');
    
  const totalRevenue = paidOrders?.reduce((sum, order) => sum + order.amount_paid, 0) || 0;
  const totalPaidCount = paidOrders?.length || 0;

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">Total Revenue</h3>
            <div className="bg-brand-500/10 p-2 rounded-lg"><IndianRupee className="h-5 w-5 text-brand-400" /></div>
          </div>
          <p className="text-3xl font-bold text-white">{formatCurrency(totalRevenue)}</p>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">Successful Orders</h3>
            <div className="bg-success-500/10 p-2 rounded-lg"><ShoppingCart className="h-5 w-5 text-success-400" /></div>
          </div>
          <p className="text-3xl font-bold text-white">{totalPaidCount}</p>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">Active Projects</h3>
            <div className="bg-accent-500/10 p-2 rounded-lg"><Package className="h-5 w-5 text-accent-400" /></div>
          </div>
          <p className="text-3xl font-bold text-white">{projectCount || 0}</p>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 font-medium">Pending Carts</h3>
            <div className="bg-orange-500/10 p-2 rounded-lg"><TrendingUp className="h-5 w-5 text-orange-400" /></div>
          </div>
          <p className="text-3xl font-bold text-white">{pendingOrders || 0}</p>
        </div>
      </div>
      
      {/* Could add recent orders table here as well */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">System Status</h2>
        </div>
        <div className="p-6">
          <p className="text-slate-400">All systems operational. Webhooks are active.</p>
        </div>
      </div>
    </div>
  );
}
