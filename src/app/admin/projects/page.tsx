'use client';

import { useState, useEffect, useCallback } from 'react';
import { formatCurrency } from '@/lib/utils';
import { Pencil, Trash2, Plus, ToggleLeft, ToggleRight, Loader2, Package, CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { Project } from '@/lib/types';

type ProjectRow = Project & { _pending?: boolean };

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(24,24,27,0.8), rgba(9,9,11,0.9))',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset',
};

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
    setTimeout(() => setToast(null), 3500);
  };

  const load = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const { data, error: err } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
    if (err) setError(err.message);
    else setProjects((data ?? []) as Project[]);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleToggle = async (p: ProjectRow) => {
    setTogglingId(p.id);
    setProjects(prev => prev.map(x => x.id === p.id ? { ...x, is_active: !x.is_active } : x));
    const res = await fetch(`/api/admin/projects/${p.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !p.is_active }),
    });
    if (!res.ok) {
      setProjects(prev => prev.map(x => x.id === p.id ? { ...x, is_active: p.is_active } : x));
      showToast('Failed to update status', false);
    } else {
      showToast(`${p.title} → ${!p.is_active ? 'Live' : 'Draft'}`);
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
      <div className="flex items-center justify-center h-64 gap-3">
        <Loader2 className="w-5 h-5 text-brand-400 animate-spin" />
        <span className="text-zinc-500 text-sm">Loading projects…</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400 text-sm p-4 rounded-xl" style={cardStyle}>{error}</div>;
  }

  const activeCount = projects.filter(p => p.is_active).length;

  return (
    <div className="space-y-6 relative">
      {/* Toast */}
      {toast && (
        <div
          className="fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-semibold animate-slide-up"
          style={toast.ok ? {
            background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399',
            boxShadow: '0 0 20px rgba(16,185,129,0.1)',
          } : {
            background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171',
          }}
        >
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">Projects</h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            {activeCount} live · {projects.length - activeCount} draft
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110"
          style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 0 20px rgba(99,102,241,0.3)' }}
        >
          <Plus className="w-4 h-4" /> New Project
        </Link>
      </div>

      {/* Project cards */}
      <div className="space-y-2">
        {projects.map((p, idx) => (
          <div
            key={p.id}
            className="rounded-2xl transition-all duration-200 group"
            style={{ ...cardStyle, ...(p.is_active ? {} : { opacity: 0.7 }) }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'}
          >
            <div className="px-5 py-4 flex items-center gap-4">
              {/* Index */}
              <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold"
                style={{ background: 'rgba(255,255,255,0.04)', color: '#52525b', border: '1px solid rgba(255,255,255,0.06)' }}>
                {idx + 1}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-white font-semibold text-sm truncate">{p.title}</p>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                    style={p.tier === 'MAJOR'
                      ? { background: 'rgba(20,184,166,0.12)', border: '1px solid rgba(20,184,166,0.25)', color: '#2dd4bf' }
                      : { background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#818cf8' }
                    }>
                    {p.tier}
                  </span>
                  <span className="text-[10px] text-zinc-600 font-medium">{p.category}</span>
                </div>
                <p className="text-zinc-600 text-[11px] font-mono mt-0.5">{p.slug}</p>
              </div>

              {/* Price */}
              <p className="text-white font-bold text-sm shrink-0">{formatCurrency(p.price_inr)}</p>

              {/* Status toggle */}
              <button
                onClick={() => handleToggle(p)}
                disabled={togglingId === p.id}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all disabled:opacity-50 shrink-0"
                style={p.is_active ? {
                  background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399'
                } : {
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#52525b'
                }}
              >
                {togglingId === p.id ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : p.is_active ? (
                  <><ToggleRight className="w-3.5 h-3.5" /> Live</>
                ) : (
                  <><ToggleLeft className="w-3.5 h-3.5" /> Draft</>
                )}
              </button>

              {/* Actions */}
              <div className="flex items-center gap-1.5 shrink-0">
                <Link
                  href={`/admin/projects/${p.id}/edit`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', color: '#818cf8' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.18)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.1)'; }}
                >
                  <Pencil className="w-3 h-3" /> Edit
                </Link>

                {deleteConfirm === p.id ? (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleDelete(p.id)}
                      disabled={deletingId === p.id}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
                      style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
                      {deletingId === p.id ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Confirm'}
                    </button>
                    <button onClick={() => setDeleteConfirm(null)}
                      className="text-xs text-zinc-600 hover:text-white px-2 py-1.5 transition-colors">
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(p.id)}
                    className="p-1.5 rounded-lg text-zinc-700 hover:text-red-400 transition-all"
                    style={{ border: '1px solid transparent' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.08)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239,68,68,0.15)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}>
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="rounded-2xl py-20 text-center" style={cardStyle}>
            <Package className="w-10 h-10 text-zinc-800 mx-auto mb-3" />
            <p className="text-zinc-600 text-sm font-medium">No projects yet</p>
            <p className="text-zinc-700 text-xs mt-1">Add your first project to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
