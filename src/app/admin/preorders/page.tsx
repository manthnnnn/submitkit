import { createAdminClient } from '@/lib/supabase/admin';
import { notFound } from 'next/navigation';
import { Users, Clock, BookOpen, Phone, Mail, Building2, ShieldCheck } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Pre-orders Admin | SubmitKit', robots: 'noindex' };

// Simple secret-key guard — set ADMIN_SECRET in Vercel env vars
async function isAuthorized(secret: string | null): Promise<boolean> {
  const expected = process.env.ADMIN_SECRET;
  if (!expected) return false;
  return secret === expected;
}

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

export default async function PreOrdersAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; filter?: string }>;
}) {
  const { key, filter } = await searchParams;

  if (!(await isAuthorized(key || null))) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="text-center">
          <ShieldCheck className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
          <h1 className="text-white font-bold text-xl mb-2">Access Denied</h1>
          <p className="text-zinc-500 text-sm">Add ?key=YOUR_ADMIN_SECRET to the URL</p>
        </div>
      </div>
    );
  }

  const supabase = createAdminClient();

  let query = supabase
    .from('pre_orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (filter) {
    query = query.eq('project_slug', filter);
  }

  const { data: preOrders, error } = await query;

  if (error) {
    console.error(error);
    return notFound();
  }

  const orders = (preOrders ?? []) as PreOrder[];

  // Stats
  const totalOrders = orders.length;
  const projectCounts = orders.reduce<Record<string, number>>((acc, o) => {
    acc[o.project_slug] = (acc[o.project_slug] || 0) + 1;
    return acc;
  }, {});
  const topProject = Object.entries(projectCounts).sort((a, b) => b[1] - a[1])[0];
  const uniqueProjects = Object.keys(projectCounts).length;

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Header */}
      <div className="border-b border-white/5 px-6 py-5 flex items-center justify-between">
        <div>
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest mb-0.5">SubmitKit Admin</p>
          <h1 className="text-xl font-bold text-white">Pre-order Dashboard</h1>
        </div>
        <div className="flex items-center gap-2 text-xs text-zinc-600 bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          Authenticated
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Pre-orders', value: totalOrders, icon: <Users className="w-5 h-5 text-amber-400" />, color: 'amber' },
            { label: 'Projects Requested', value: uniqueProjects, icon: <BookOpen className="w-5 h-5 text-brand-400" />, color: 'brand' },
            { label: 'Most Wanted', value: topProject ? topProject[0].replace(/-/g, ' ') : '—', icon: <Clock className="w-5 h-5 text-emerald-400" />, color: 'emerald', small: true },
          ].map(stat => (
            <div key={stat.label} className="bg-white/5 border border-white/8 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-zinc-500 text-xs font-medium">{stat.label}</span>
                {stat.icon}
              </div>
              <p className={`font-bold text-white ${stat.small ? 'text-base capitalize' : 'text-3xl'}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Filter by project */}
        {uniqueProjects > 1 && (
          <div className="flex flex-wrap gap-2">
            <a
              href={`?key=${key}`}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${!filter ? 'bg-white/10 border-white/20 text-white font-semibold' : 'border-white/10 text-zinc-500 hover:text-white hover:border-white/20'}`}
            >
              All ({totalOrders})
            </a>
            {Object.entries(projectCounts).sort((a, b) => b[1] - a[1]).map(([slug, count]) => (
              <a
                key={slug}
                href={`?key=${key}&filter=${slug}`}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all capitalize ${filter === slug ? 'bg-amber-500/20 border-amber-500/40 text-amber-400 font-semibold' : 'border-white/10 text-zinc-500 hover:text-white hover:border-white/20'}`}
              >
                {slug.replace(/-/g, ' ')} ({count})
              </a>
            ))}
          </div>
        )}

        {/* Table */}
        {orders.length === 0 ? (
          <div className="text-center py-16 text-zinc-600">
            <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No pre-orders yet.</p>
          </div>
        ) : (
          <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/8">
                  {['Name', 'Contact', 'College', 'Project', 'Date'].map(h => (
                    <th key={h} className="text-left px-5 py-3.5 text-zinc-500 text-xs font-semibold uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.map((o, idx) => (
                  <tr key={o.id} className={`border-b border-white/5 hover:bg-white/3 transition-colors ${idx % 2 === 0 ? '' : 'bg-white/2'}`}>
                    <td className="px-5 py-4">
                      <p className="text-white font-medium">{o.name}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                          <Mail className="w-3 h-3" />{o.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                          <Phone className="w-3 h-3" />{o.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-zinc-400 text-xs">
                        <Building2 className="w-3 h-3 shrink-0" />
                        <span>{o.college || '—'}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-1 rounded-lg capitalize font-medium">
                        {o.project_slug.replace(/-/g, ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-zinc-500 text-xs">
                      {new Date(o.created_at).toLocaleString('en-IN', {
                        day: '2-digit', month: 'short', year: 'numeric',
                        hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
