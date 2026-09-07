'use client';

import { useState, useEffect, useCallback } from 'react';
import { formatCurrency } from '@/lib/utils';
import { CheckCircle2, XCircle, Pencil, Trash2, Plus, ToggleLeft, ToggleRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { Project } from '@/lib/types';

type ProjectRow = Project & { _pending?: boolean };

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error: err } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    if (err) setError(err.message);
    else setProjects((data ?? []) as Project[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleToggle = async (p: ProjectRow) => {
    setTogglingId(p.id);
    // Optimistic update
    setProjects(prev => prev.map(x => x.id === p.id ? { ...x, is_active: !x.is_active } : x));
    const res = await fetch(`/api/admin/projects/${p.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !p.is_active }),
    });
    if (!res.ok) {
      // Revert on failure
      setProjects(prev => prev.map(x => x.id === p.id ? { ...x, is_active: p.is_active } : x));
      showToast('Failed to update status', false);
    } else {
      showToast(`${p.title} is now ${!p.is_active ? 'Active' : 'Draft'}`);
    }
    setTogglingId(null);
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    const res = await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      showToast('Delete failed', false);
    } else {
      setProjects(prev => prev.filter(x => x.id !== id));
      showToast('Project removed from catalog');
    }
    setDeletingId(null);
    setDeleteConfirm(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 text-brand-400 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <div className="text-error-400 text-sm">Failed to load projects: {error}</div>;
  }

  return (
    <div className="relative">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-semibold shadow-xl transition-all ${toast.ok ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' : 'bg-red-500/20 border border-red-500/40 text-red-300'}`}>
          {toast.msg}
        </div>
      )}

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Manage Projects</h1>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-500 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
        >
          <Plus className="w-4 h-4" /> Add New Project
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Tier</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-4">
                    <p className="text-white font-medium text-sm">{p.title}</p>
                    <p className="text-xs text-slate-500 font-mono">{p.slug}</p>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded font-bold ${p.tier === 'MAJOR' ? 'bg-accent-500/20 text-accent-400' : 'bg-brand-500/20 text-brand-400'}`}>
                      {p.tier}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300 text-sm">{p.category}</td>
                  <td className="p-4 text-slate-300 text-sm">{formatCurrency(p.price_inr)}</td>
                  <td className="p-4">
                    {/* Toggle button */}
                    <button
                      onClick={() => handleToggle(p)}
                      disabled={togglingId === p.id}
                      className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border transition-all disabled:opacity-50 ${
                        p.is_active
                          ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/25'
                          : 'bg-slate-700/40 border-slate-600/40 text-slate-400 hover:bg-slate-700/60'
                      }`}
                    >
                      {togglingId === p.id ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : p.is_active ? (
                        <><ToggleRight className="w-3.5 h-3.5" /> Active</>
                      ) : (
                        <><ToggleLeft className="w-3.5 h-3.5" /> Draft</>
                      )}
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${p.id}/edit`}
                        className="flex items-center gap-1.5 text-brand-400 hover:text-brand-300 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/20 transition-all"
                      >
                        <Pencil className="w-3 h-3" /> Edit
                      </Link>

                      {deleteConfirm === p.id ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleDelete(p.id)}
                            disabled={deletingId === p.id}
                            className="text-xs font-bold text-red-400 hover:text-red-300 px-2.5 py-1.5 rounded-lg bg-red-500/15 border border-red-500/25 transition-all disabled:opacity-50"
                          >
                            {deletingId === p.id ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Confirm'}
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="text-xs text-slate-400 hover:text-white px-2 py-1.5"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(p.id)}
                          className="flex items-center gap-1 text-slate-500 hover:text-red-400 text-xs font-semibold px-2.5 py-1.5 rounded-lg hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500 text-sm">No projects found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
