import { createAdminClient } from '@/lib/supabase/admin';
import { Users, Clock, BookOpen, Phone, Mail, Building2, AlertTriangle, Sparkles } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ExportCSVButton } from './PreOrdersClient';

export const metadata: Metadata = { title: 'Pre-orders | SubmitKit Admin', robots: 'noindex' };
export const dynamic = 'force-dynamic';

interface PreOrder {
  id: string;
  project_slug: string;
  project_title: string;
  name: string;
  email: string;
  phone: string;
  college: string | null;
  created_at: string;
}

const cardStyle = {
  background: 'linear-gradient(135deg, rgba(24,24,27,0.8), rgba(9,9,11,0.9))',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset',
};

export default async function PreOrdersAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const supabase = createAdminClient();

  let query = supabase.from('pre_orders').select('*').order('created_at', { ascending: false });
  if (filter) query = query.eq('project_slug', filter);
  const { data: preOrders, error } = await query;

  if (error) {
    return (
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Pre-orders</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Student interest registrations</p>
        </div>
        <div className="rounded-2xl p-5 flex items-start gap-4" style={{ ...cardStyle, borderColor: 'rgba(245,158,11,0.25)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.25)' }}>
            <AlertTriangle className="h-4 w-4 text-amber-400" />
          </div>
          <div>
            <p className="text-amber-300 font-semibold text-sm mb-1">Pre-orders table error</p>
            <p className="text-zinc-500 text-xs">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  const orders = (preOrders ?? []) as PreOrder[];
  const totalOrders = orders.length;
  const projectCounts = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.project_slug] = (acc[o.project_slug] || 0) + 1;
    return acc;
  }, {});
  const topProject = Object.entries(projectCounts).sort((a, b) => b[1] - a[1])[0];
  const uniqueProjects = Object.keys(projectCounts).length;

  const statCards = [
    { label: 'Total Registrations', value: totalOrders,    Icon: Users,    accent: '#818cf8', iconBg: 'rgba(99,102,241,0.12)'   },
    { label: 'Unique Projects',     value: uniqueProjects,  Icon: BookOpen, accent: '#34d399', iconBg: 'rgba(16,185,129,0.12)'   },
    { label: 'Highest Demand',      value: topProject ? `${topProject[0].replace(/-/g, ' ')} (${topProject[1]})` : '—',
      Icon: Sparkles, accent: '#fbbf24', iconBg: 'rgba(245,158,11,0.12)', truncate: true },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Pre-orders</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Students waiting for upcoming projects</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium px-3 py-1.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#52525b' }}>
            {totalOrders} registration{totalOrders !== 1 ? 's' : ''}
          </span>
          <ExportCSVButton orders={orders} />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statCards.map(({ label, value, Icon, accent, iconBg, truncate }) => (
          <div key={label} className="rounded-2xl p-5 relative overflow-hidden" style={cardStyle}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-zinc-600 text-xs font-medium uppercase tracking-wider">{label}</span>
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: iconBg, border: `1px solid ${accent}30` }}>
                <Icon className="w-3.5 h-3.5" style={{ color: accent }} />
              </div>
            </div>
            <p className={`text-xl font-bold text-white capitalize ${truncate ? 'truncate' : ''}`}>
              {typeof value === 'number' ? value : value}
            </p>
            <div className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(to right, transparent, ${accent}30, transparent)` }} />
          </div>
        ))}
      </div>

      {/* Brevo tip */}
      <div className="rounded-xl px-4 py-3 flex items-center gap-2.5 text-xs"
        style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
        <span className="text-brand-400 text-base">📬</span>
        <span className="text-zinc-400">
          <span className="text-zinc-200 font-semibold">When your project launches:</span> Export CSV → paste into Brevo bulk campaign to notify everyone at once.
        </span>
      </div>

      {/* Project filter pills */}
      {uniqueProjects > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-zinc-600 mr-1 font-medium">Filter:</span>
          <Link href="/admin/preorders"
            className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all"
            style={!filter ? {
              background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc'
            } : {
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#52525b'
            }}>
            All ({totalOrders})
          </Link>
          {Object.entries(projectCounts).sort((a, b) => b[1] - a[1]).map(([slug, count]) => (
            <Link key={slug} href={`/admin/preorders?filter=${slug}`}
              className="text-xs px-3 py-1.5 rounded-full font-semibold transition-all capitalize"
              style={filter === slug ? {
                background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc'
              } : {
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#52525b'
              }}>
              {slug.replace(/-/g, ' ')} ({count})
            </Link>
          ))}
        </div>
      )}

      {/* Table */}
      {orders.length === 0 ? (
        <div className="rounded-2xl py-20 text-center" style={cardStyle}>
          <Clock className="w-10 h-10 text-zinc-800 mx-auto mb-3" />
          <p className="text-zinc-600 text-sm font-medium">No pre-orders yet</p>
          <p className="text-zinc-700 text-xs mt-1">Registrations will appear here</p>
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={cardStyle}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  {['Student', 'Contact', 'College', 'Project', 'Registered'].map(h => (
                    <th key={h} className="px-5 py-3.5 text-[11px] font-semibold text-zinc-600 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o, i) => (
                  <tr key={o.id}
                    className="transition-colors"
                    style={{ borderBottom: i < orders.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.015)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-white text-sm">{o.name}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        <a href={`mailto:${o.email}`} className="flex items-center gap-1.5 text-zinc-400 hover:text-white text-xs transition-colors">
                          <Mail className="w-3.5 h-3.5 text-zinc-600 shrink-0" /> {o.email}
                        </a>
                        <a href={`tel:${o.phone}`} className="flex items-center gap-1.5 text-zinc-500 hover:text-white text-xs transition-colors">
                          <Phone className="w-3.5 h-3.5 text-zinc-700 shrink-0" /> {o.phone}
                        </a>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                        <Building2 className="w-3.5 h-3.5 text-zinc-700 shrink-0" />
                        <span>{o.college || '—'}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize"
                        style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}>
                        {o.project_slug.replace(/-/g, ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-zinc-500 text-xs whitespace-nowrap">
                      {new Date(o.created_at).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
