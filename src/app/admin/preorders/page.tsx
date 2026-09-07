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

export default async function PreOrdersAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
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
    return (
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">Pre-orders</h1>
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 flex items-start gap-4">
          <AlertTriangle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-amber-300 font-semibold mb-1">Pre-orders table not found or query error</p>
            <p className="text-amber-200/70 text-sm mb-3">
              Make sure the <code className="bg-white/10 px-1.5 py-0.5 rounded text-amber-100">pre_orders</code> table is created in your Supabase SQL editor.
            </p>
            <p className="text-xs text-slate-400">{error.message}</p>
          </div>
        </div>
      </div>
    );
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Pre-orders</h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Students waiting for upcoming and in-development projects
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg self-start">
            {totalOrders} registration{totalOrders === 1 ? '' : 's'} recorded
          </span>
          <ExportCSVButton orders={orders} />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total Pre-orders</span>
            <Users className="w-4 h-4 text-brand-400" />
          </div>
          <p className="text-2xl font-bold text-white">{totalOrders}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Requested Projects</span>
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-bold text-white">{uniqueProjects}</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Highest Demand</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-base font-semibold text-amber-300 truncate capitalize">
            {topProject ? `${topProject[0].replace(/-/g, ' ')} (${topProject[1]})` : '—'}
          </p>
        </div>
      </div>

      {/* Project Filter Pills */}
      {uniqueProjects > 1 && (
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs text-slate-400 mr-1">Filter:</span>
          <Link
            href="/admin/preorders"
            className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
              !filter
                ? 'bg-brand-500/20 border-brand-500/40 text-brand-300 font-medium'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            All ({totalOrders})
          </Link>
          {Object.entries(projectCounts).sort((a, b) => b[1] - a[1]).map(([slug, count]) => (
            <Link
              key={slug}
              href={`/admin/preorders?filter=${slug}`}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors capitalize ${
                filter === slug
                  ? 'bg-brand-500/20 border-brand-500/40 text-brand-300 font-medium'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {slug.replace(/-/g, ' ')} ({count})
            </Link>
          ))}
        </div>
      )}

      {/* Bulk contact tip */}
      <div className="bg-indigo-500/8 border border-indigo-500/20 rounded-xl px-4 py-3 text-xs text-indigo-300/80 leading-relaxed">
        <span className="font-bold text-indigo-300">📬 When your project is ready:</span> Export this list and use Brevo&apos;s bulk email campaign to notify everyone at once.
      </div>

      {/* Table */}
      {orders.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-500">
          <Clock className="w-10 h-10 mx-auto mb-3 opacity-30 text-slate-400" />
          <p className="text-sm font-medium text-slate-400">No pre-orders found</p>
          <p className="text-xs text-slate-500 mt-1">Registrations will appear here when students pre-order upcoming projects.</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-950/60 border-b border-slate-800 text-xs uppercase text-slate-400 font-semibold tracking-wider">
                <tr>
                  <th className="px-5 py-3.5">Student</th>
                  <th className="px-5 py-3.5">Contact</th>
                  <th className="px-5 py-3.5">College</th>
                  <th className="px-5 py-3.5">Project</th>
                  <th className="px-5 py-3.5">Registered At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-white">{o.name}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-300 text-xs">
                          <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <a href={`mailto:${o.email}`} className="hover:underline">{o.email}</a>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                          <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <a href={`tel:${o.phone}`} className="hover:underline">{o.phone}</a>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-slate-300 text-xs">
                        <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{o.college || '—'}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-xs bg-brand-500/10 text-brand-300 border border-brand-500/20 px-2.5 py-1 rounded-md capitalize font-medium">
                        {o.project_slug.replace(/-/g, ' ')}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-xs whitespace-nowrap">
                      {new Date(o.created_at).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'Asia/Kolkata',
                      })}
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
