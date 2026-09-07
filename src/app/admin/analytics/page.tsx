import { createAdminClient } from '@/lib/supabase/admin';
import { formatCurrency } from '@/lib/utils';
import { AlertTriangle, BarChart3 } from 'lucide-react';
import { RevenueProjectChart, SalesVelocityChart } from '../components/revenue-chart';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Analytics | SubmitKit Admin', robots: 'noindex' };
export const dynamic = 'force-dynamic';

const cardStyle = {
  background: 'linear-gradient(135deg, rgba(24,24,27,0.8), rgba(9,9,11,0.9))',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset',
};

export default async function AnalyticsPage() {
  const supabase = createAdminClient();

  const [
    { data: paidOrders, error: e1 },
    { data: preOrders,  error: e2 },
  ] = await Promise.all([
    supabase
      .from('orders')
      .select('amount_paid, created_at, has_personalization, has_plagiarism_cert, has_viva_call, projects(title, tier)')
      .eq('status', 'PAID')
      .order('created_at', { ascending: false }),
    supabase.from('pre_orders').select('project_slug, project_title'),
  ]);

  if (e1 || e2) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Analytics</h1>
        </div>
        <div className="rounded-2xl p-5 flex items-start gap-4" style={{ ...cardStyle, borderColor: 'rgba(239,68,68,0.25)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.25)' }}>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </div>
          <p className="text-red-300 text-sm">{(e1 ?? e2)?.message}</p>
        </div>
      </div>
    );
  }

  const orders = paidOrders ?? [];
  const preOrderList = preOrders ?? [];
  const totalRevenue = orders.reduce((s, o) => s + o.amount_paid, 0);
  const total = orders.length;

  // ── Revenue by project ──────────────────────────────────────────────────
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

  // ── Sales velocity (last 30 days) ───────────────────────────────────────
  const velocityMap: Record<string, { total: number; paid: number }> = {};
  for (let i = 29; i >= 0; i--) {
    const key = new Date(Date.now() - i * 86400000)
      .toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    velocityMap[key] = { total: 0, paid: 0 };
  }
  for (const o of orders.filter(o => Date.now() - new Date(o.created_at).getTime() <= 30 * 86400000)) {
    const key = new Date(o.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    if (velocityMap[key]) { velocityMap[key].total++; velocityMap[key].paid++; }
  }
  const salesVelocityData = Object.entries(velocityMap).map(([date, v]) => ({ date, ...v }));

  // ── Add-on adoption ─────────────────────────────────────────────────────
  const personCount = orders.filter(o => (o as any).has_personalization).length;
  const plagCount   = orders.filter(o => (o as any).has_plagiarism_cert).length;
  const vivaCount   = orders.filter(o => (o as any).has_viva_call).length;
  const pct = (n: number) => total > 0 ? Math.round((n / total) * 100) : 0;

  const addons = [
    { label: 'Name Personalisation',  count: personCount, pct: pct(personCount), color: '#818cf8', bg: 'rgba(99,102,241,0.12)'  },
    { label: 'Plagiarism Certificate', count: plagCount,   pct: pct(plagCount),   color: '#fbbf24', bg: 'rgba(245,158,11,0.12)'  },
    { label: 'Viva / Custom Changes',  count: vivaCount,   pct: pct(vivaCount),   color: '#34d399', bg: 'rgba(16,185,129,0.12)'  },
  ];

  // ── Pre-order demand ────────────────────────────────────────────────────
  const demandMap: Record<string, { title: string; count: number }> = {};
  for (const p of preOrderList) {
    if (!demandMap[p.project_slug]) demandMap[p.project_slug] = { title: p.project_title || p.project_slug, count: 0 };
    demandMap[p.project_slug].count++;
  }
  const demandRanked = Object.values(demandMap).sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Analytics</h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            {total} paid orders · {formatCurrency(totalRevenue)} total revenue
          </p>
        </div>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <BarChart3 className="w-4 h-4 text-brand-400" />
        </div>
      </div>

      {/* Section 1 — Revenue by project */}
      <section className="space-y-3">
        <SectionHeader title="Revenue by Project" subtitle="Total earnings per project, sorted highest to lowest" />
        <div className="rounded-2xl p-5" style={cardStyle}>
          <div className="flex items-center gap-5 mb-5 text-xs text-zinc-600">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#f59e0b' }} /> MAJOR tier
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#6366f1' }} /> MINI tier
            </span>
          </div>
          <RevenueProjectChart data={revenueByProject} />
        </div>
      </section>

      {/* Section 2 — Sales velocity */}
      <section className="space-y-3">
        <SectionHeader title="Sales Velocity" subtitle="Orders per day over the last 30 days" />
        <div className="rounded-2xl p-5" style={cardStyle}>
          <div className="flex items-center gap-2 mb-5 text-xs text-zinc-600">
            <span className="w-6 h-0.5 rounded inline-block" style={{ background: '#6366f1' }} /> Paid orders
          </div>
          <SalesVelocityChart data={salesVelocityData} />
        </div>
      </section>

      {/* Section 3 — Add-on adoption */}
      <section className="space-y-3">
        <SectionHeader title="Add-on Adoption" subtitle="What percentage of buyers added each upgrade" />
        <div className="rounded-2xl p-6 space-y-6" style={cardStyle}>
          {total === 0 ? (
            <p className="text-zinc-700 text-sm text-center py-4">No paid orders yet</p>
          ) : addons.map(a => (
            <div key={a.label}>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: a.bg, border: `1px solid ${a.color}30` }}>
                    <span className="text-[10px]">
                      {a.label.includes('Name') ? '✏️' : a.label.includes('Plag') ? '🏆' : '📞'}
                    </span>
                  </div>
                  <span className="text-zinc-200 text-sm font-medium">{a.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold" style={{ color: a.color }}>{a.pct}%</span>
                  <span className="text-zinc-600 text-xs ml-2">({a.count} buyers)</span>
                </div>
              </div>
              {/* Track */}
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${a.pct}%`,
                    background: `linear-gradient(to right, ${a.color}80, ${a.color})`,
                    boxShadow: `0 0 8px ${a.color}40`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — Pre-order demand */}
      <section className="space-y-3">
        <SectionHeader title="Pre-order Demand Pipeline" subtitle="Which upcoming projects have the most student interest" />
        <div className="rounded-2xl overflow-hidden" style={cardStyle}>
          {demandRanked.length === 0 ? (
            <p className="text-zinc-700 text-sm text-center py-12">No pre-orders recorded yet</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-zinc-600 uppercase tracking-wider">Rank</th>
                  <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-zinc-600 uppercase tracking-wider">Project</th>
                  <th className="px-5 py-3.5 text-right text-[11px] font-semibold text-zinc-600 uppercase tracking-wider">Waitlist</th>
                </tr>
              </thead>
              <tbody>
                {demandRanked.map((item, i) => (
                  <tr
                    key={i}
                    style={{ borderBottom: i < demandRanked.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.015)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    <td className="px-5 py-4">
                      <span
                        className="text-xs font-bold w-6 h-6 rounded-lg flex items-center justify-center"
                        style={{
                          background: i === 0 ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${i === 0 ? 'rgba(245,158,11,0.3)' : 'rgba(255,255,255,0.06)'}`,
                          color: i === 0 ? '#fbbf24' : '#52525b',
                        }}
                      >
                        {i + 1}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-zinc-300 text-sm capitalize">
                      {item.title.replace(/-/g, ' ')}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', color: '#a78bfa' }}
                      >
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

function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <h2 className="text-base font-semibold text-white">{title}</h2>
      <p className="text-zinc-600 text-xs mt-0.5">{subtitle}</p>
    </div>
  );
}
