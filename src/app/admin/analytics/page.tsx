import { createAdminClient } from '@/lib/supabase/admin';
import { formatCurrency } from '@/lib/utils';
import { AlertTriangle } from 'lucide-react';
import { RevenueProjectChart, SalesVelocityChart } from '../components/revenue-chart';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Analytics | SubmitKit Admin', robots: 'noindex' };
export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  const supabase = createAdminClient();

  const [
    { data: paidOrders, error: e1 },
    { data: preOrders,  error: e2 },
  ] = await Promise.all([
    supabase.from('orders')
      .select('amount_paid, created_at, has_personalization, has_plagiarism_cert, has_viva_call, projects(title, tier)')
      .eq('status', 'PAID')
      .order('created_at', { ascending: false }),
    supabase.from('pre_orders').select('project_slug, project_title'),
  ]);

  if (e1 || e2) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">Analytics</h1>
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 flex items-start gap-4">
          <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
          <p className="text-red-300 text-sm">{(e1 ?? e2)?.message}</p>
        </div>
      </div>
    );
  }

  const orders = paidOrders ?? [];
  const preOrderList = preOrders ?? [];

  // ── Section 1: Revenue by project ──────────────────────────────────────────
  const projectRevMap: Record<string, { revenue: number; tier: 'MINI' | 'MAJOR'; name: string }> = {};
  for (const o of orders) {
    const proj = (o.projects as any);
    if (!proj) continue;
    const key = proj.title ?? 'Unknown';
    if (!projectRevMap[key]) projectRevMap[key] = { revenue: 0, tier: proj.tier ?? 'MINI', name: key };
    projectRevMap[key].revenue += o.amount_paid;
  }
  const revenueByProject = Object.values(projectRevMap)
    .sort((a, b) => b.revenue - a.revenue)
    .map(p => ({ name: p.name, revenue: p.revenue, tier: p.tier }));

  // ── Section 2: Sales velocity (last 30 days) ────────────────────────────────
  const velocityMap: Record<string, { total: number; paid: number }> = {};
  const allOrders30 = orders.filter(o =>
    Date.now() - new Date(o.created_at).getTime() <= 30 * 86400000
  );
  for (let i = 29; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const key = d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    velocityMap[key] = { total: 0, paid: 0 };
  }
  for (const o of allOrders30) {
    const key = new Date(o.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    if (velocityMap[key]) { velocityMap[key].total++; velocityMap[key].paid++; }
  }
  const salesVelocityData = Object.entries(velocityMap).map(([date, v]) => ({ date, ...v }));

  // ── Section 3: Add-on adoption ────────────────────────────────────────────
  const total = orders.length;
  const personalizationCount = orders.filter(o => (o as any).has_personalization).length;
  const plagiarismCount      = orders.filter(o => (o as any).has_plagiarism_cert).length;
  const vivaCount            = orders.filter(o => (o as any).has_viva_call).length;
  const addonRate = (n: number) => total > 0 ? Math.round((n / total) * 100) : 0;

  const addons = [
    { label: 'Name Personalisation', count: personalizationCount, pct: addonRate(personalizationCount), color: '#818cf8' },
    { label: 'Plagiarism Certificate', count: plagiarismCount,    pct: addonRate(plagiarismCount),      color: '#f59e0b' },
    { label: 'Viva / Custom Changes', count: vivaCount,           pct: addonRate(vivaCount),            color: '#34d399' },
  ];

  // ── Section 4: Pre-order demand ───────────────────────────────────────────
  const demandMap: Record<string, { title: string; count: number }> = {};
  for (const p of preOrderList) {
    const key = p.project_slug;
    if (!demandMap[key]) demandMap[key] = { title: p.project_title || p.project_slug, count: 0 };
    demandMap[key].count++;
  }
  const demandRanked = Object.values(demandMap).sort((a, b) => b.count - a.count);

  const totalRevenue = orders.reduce((s, o) => s + o.amount_paid, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-slate-400 text-sm mt-0.5">
          {orders.length} paid orders &nbsp;·&nbsp; {formatCurrency(totalRevenue)} total revenue
        </p>
      </div>

      {/* Section 1 — Revenue by project */}
      <section>
        <h2 className="text-base font-bold text-white mb-4">Revenue by Project</h2>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" /> MAJOR tier</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-brand-500 inline-block" /> MINI tier</span>
          </div>
          <RevenueProjectChart data={revenueByProject} />
        </div>
      </section>

      {/* Section 2 — Sales velocity */}
      <section>
        <h2 className="text-base font-bold text-white mb-4">Sales Velocity — Last 30 Days</h2>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-4 mb-4 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><span className="w-3 h-1 bg-brand-500 inline-block rounded" /> Paid orders</span>
          </div>
          <SalesVelocityChart data={salesVelocityData} />
        </div>
      </section>

      {/* Section 3 — Add-on adoption */}
      <section>
        <h2 className="text-base font-bold text-white mb-4">Add-on Adoption Rate</h2>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
          {addons.map(a => (
            <div key={a.label}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-300 font-medium">{a.label}</span>
                <span className="text-sm font-bold" style={{ color: a.color }}>
                  {a.pct}% <span className="text-slate-500 font-normal text-xs">({a.count} buyers)</span>
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${a.pct}%`, background: a.color }} />
              </div>
            </div>
          ))}
          {total === 0 && <p className="text-slate-600 text-sm text-center py-2">No paid orders yet</p>}
        </div>
      </section>

      {/* Section 4 — Pre-order demand */}
      <section>
        <h2 className="text-base font-bold text-white mb-4">Pre-order Demand Pipeline</h2>
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          {demandRanked.length === 0 ? (
            <p className="text-slate-600 text-sm text-center py-8">No pre-orders recorded</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-950 border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider">
                  <th className="px-5 py-3 font-medium text-left">Rank</th>
                  <th className="px-5 py-3 font-medium text-left">Project</th>
                  <th className="px-5 py-3 font-medium text-right">Waitlist</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {demandRanked.map((item, i) => (
                  <tr key={i} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3 text-slate-500 text-xs font-mono">#{i + 1}</td>
                    <td className="px-5 py-3 text-slate-300 text-sm capitalize">{item.title.replace(/-/g, ' ')}</td>
                    <td className="px-5 py-3 text-right">
                      <span className="text-xs font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/25 px-2.5 py-1 rounded-full">
                        {item.count} {item.count === 1 ? 'student' : 'students'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
}
