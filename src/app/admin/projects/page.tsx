'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { formatCurrency } from '@/lib/utils';
import {
  Pencil, Trash2, Plus, ToggleLeft, ToggleRight, Loader2,
  Package, CheckCircle2, Upload, AlertTriangle,
  FileArchive, CloudUpload, X, ChevronUp, ChevronDown, Search,
} from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import type { Project, ProjectCategory } from '@/lib/types';

type ProjectRow = Project & { _pending?: boolean };
type SortKey = 'title' | 'price_inr' | 'is_active';
type SortDir = 'asc' | 'desc';

const CATEGORIES: Array<'All' | ProjectCategory> = ['All', 'AIML', 'FullStack', 'Cybersecurity', 'Healthcare', 'FinTech', 'Cloud'];

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(165deg, rgba(255,255,255,0.98) 0%, rgba(253,251,247,0.95) 100%)',
  border: '1px solid #EAE3D6',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 8px 24px -4px rgba(15, 23, 42, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
  borderRadius: '12px',
};

const tableHeaderStyle: React.CSSProperties = {
  background: '#FAF7F0',
  borderBottom: '1px solid #EAE3D6',
};

interface UploadState {
  projectId: string;
  file: File | null;
  progress: number;
  status: 'idle' | 'validating' | 'uploading' | 'success' | 'error';
  message: string;
  warning?: string | null;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [uploadPanel, setUploadPanel] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<UploadState | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter / search / sort state
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | ProjectCategory>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Live' | 'Draft'>('All');
  const [sortKey, setSortKey] = useState<SortKey>('title');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

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

  const openUploadPanel = (projectId: string) => {
    setUploadPanel(projectId);
    setUploadState({ projectId, file: null, progress: 0, status: 'idle', message: '' });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, projectId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.zip')) {
      setUploadState(s => s ? { ...s, status: 'error', message: 'Only .zip files are allowed' } : null);
      return;
    }
    const MAX = 200 * 1024 * 1024;
    if (file.size > MAX) {
      setUploadState(s => s ? { ...s, status: 'error', message: `File too large (max 200MB, got ${(file.size / 1024 / 1024).toFixed(1)}MB)` } : null);
      return;
    }
    setUploadState({ projectId, file, progress: 0, status: 'idle', message: `${file.name} — ${(file.size / 1024 / 1024).toFixed(2)} MB` });
  };

  const handleUpload = async () => {
    if (!uploadState?.file || !uploadState.projectId) return;
    const { file, projectId } = uploadState;

    setUploadState(s => s ? { ...s, status: 'validating', progress: 5, message: 'Validating ZIP structure…' } : null);

    const formData = new FormData();
    formData.append('zipFile', file);

    setUploadState(s => s ? { ...s, status: 'uploading', progress: 20, message: 'Uploading to cloud…' } : null);

    let fakeProgress = 20;
    const ticker = setInterval(() => {
      fakeProgress = Math.min(fakeProgress + Math.random() * 8, 88);
      setUploadState(s => s ? { ...s, progress: Math.round(fakeProgress) } : null);
    }, 400);

    try {
      const res = await fetch(`/api/admin/projects/${projectId}/upload-zip`, {
        method: 'POST',
        body: formData,
      });

      clearInterval(ticker);
      const data = await res.json();

      if (!res.ok) {
        setUploadState(s => s ? { ...s, status: 'error', progress: 0, message: data.error || 'Upload failed' } : null);
        return;
      }

      setUploadState(s => s ? {
        ...s,
        status: 'success',
        progress: 100,
        message: `✅ Uploaded! ${data.fileCount} files · ${(data.sizeBytes / 1024 / 1024).toFixed(2)} MB`,
        warning: data.warning,
      } : null);

      setProjects(prev => prev.map(p => p.id === projectId ? { ...p, s3_storage_key: data.storageKey } : p));
      showToast('ZIP uploaded and linked to project!');

    } catch {
      clearInterval(ticker);
      setUploadState(s => s ? { ...s, status: 'error', progress: 0, message: 'Network error during upload' } : null);
    }
  };

  // --- Derived filtered + sorted list ---
  const filtered = useMemo(() => {
    let list = [...projects];

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q));
    }
    if (categoryFilter !== 'All') {
      list = list.filter(p => p.category === categoryFilter);
    }
    if (statusFilter === 'Live') list = list.filter(p => p.is_active);
    if (statusFilter === 'Draft') list = list.filter(p => !p.is_active);

    list.sort((a, b) => {
      let cmp = 0;
      if (sortKey === 'title') cmp = a.title.localeCompare(b.title);
      else if (sortKey === 'price_inr') cmp = a.price_inr - b.price_inr;
      else if (sortKey === 'is_active') cmp = (a.is_active === b.is_active ? 0 : a.is_active ? -1 : 1);
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return list;
  }, [projects, search, categoryFilter, statusFilter, sortKey, sortDir]);

  const liveCount = projects.filter(p => p.is_active).length;
  const draftCount = projects.length - liveCount;
  const missingZip = projects.filter(p => !p.s3_storage_key).length;

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronUp className="w-3 h-3 opacity-30" />;
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-teal-600" />
      : <ChevronDown className="w-3 h-3 text-teal-600" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 gap-3">
        <Loader2 className="w-5 h-5 text-teal-500 animate-spin" />
        <span className="text-zinc-500 text-sm">Loading projects…</span>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-sm p-4 rounded-xl" style={cardStyle}>{error}</div>;
  }

  return (
    <div className="space-y-5 relative">
      {/* Toast */}
      {toast && (
        <div
          className="fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-semibold"
          style={toast.ok ? {
            background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', color: '#059669',
            boxShadow: '0 0 20px rgba(16,185,129,0.1)',
          } : {
            background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#dc2626',
          }}
        >
          {toast.msg}
        </div>
      )}

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Projects</h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            {filtered.length} project{filtered.length !== 1 ? 's' : ''} · {liveCount} live
            {missingZip > 0 && <span className="ml-2 text-amber-600">· ⚠️ {missingZip} missing ZIP</span>}
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:brightness-110"
          style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)', boxShadow: '0 4px 14px rgba(13,148,136,0.3)' }}
        >
          <Plus className="w-4 h-4" /> New Project
        </Link>
      </div>

      {/* Quick Stats Strip */}
      <div className="flex items-center gap-3 flex-wrap">
        {[
          { emoji: '🟢', label: `${liveCount} Live`, color: '#059669', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
          { emoji: '⚫', label: `${draftCount} Draft`, color: '#71717a', bg: 'rgba(113,113,122,0.08)', border: 'rgba(113,113,122,0.2)' },
          { emoji: '📦', label: `${projects.length} Total`, color: '#0D9488', bg: 'rgba(13,148,136,0.08)', border: 'rgba(13,148,136,0.2)' },
        ].map(chip => (
          <span
            key={chip.label}
            className="px-3 py-1.5 rounded-full text-xs font-bold"
            style={{ background: chip.bg, border: `1px solid ${chip.border}`, color: chip.color }}
          >
            {chip.emoji} {chip.label}
          </span>
        ))}
      </div>

      {/* Main card */}
      <div style={cardStyle}>
        {/* Search + Filter bar */}
        <div className="p-4 space-y-3 border-b" style={{ borderColor: '#EAE3D6' }}>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search by title or slug…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg text-sm bg-white border text-zinc-800 placeholder:text-zinc-400 outline-none focus:ring-2 focus:ring-teal-500/30"
              style={{ border: '1px solid #EAE3D6' }}
            />
          </div>

          {/* Category + Status filters */}
          <div className="flex flex-wrap gap-2 items-center justify-between">
            {/* Category pills */}
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                  style={categoryFilter === cat ? {
                    background: '#0D9488', color: '#fff', border: '1px solid #0D9488',
                  } : {
                    background: '#FAF7F0', color: '#52525b', border: '1px solid #EAE3D6',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Status filter */}
            <div className="flex gap-1.5">
              {(['All', 'Live', 'Draft'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
                  style={statusFilter === s ? {
                    background: '#0D9488', color: '#fff', border: '1px solid #0D9488',
                  } : {
                    background: '#FAF7F0', color: '#52525b', border: '1px solid #EAE3D6',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Package className="w-10 h-10 text-zinc-300 mx-auto mb-3" />
            <p className="text-zinc-500 text-sm font-medium">
              {projects.length === 0 ? 'No projects yet' : 'No projects match your filters'}
            </p>
            {projects.length === 0 && (
              <Link
                href="/admin/projects/new"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)' }}
              >
                <Plus className="w-4 h-4" /> Add your first project
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={tableHeaderStyle}>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-500 w-12"></th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort('title')}
                      className="flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
                    >
                      Title / Slug <SortIcon col="title" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-500">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-500">Tier</th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort('price_inr')}
                      className="flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
                    >
                      Price <SortIcon col="price_inr" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button
                      onClick={() => handleSort('is_active')}
                      className="flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
                    >
                      Status <SortIcon col="is_active" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-zinc-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, idx) => (
                  <>
                    <tr
                      key={p.id}
                      style={{
                        opacity: p.is_active ? 1 : 0.7,
                        borderBottom: uploadPanel === p.id ? 'none' : '1px solid #EAE3D6',
                        background: idx % 2 === 0 ? '#fff' : 'rgba(253,251,247,0.5)',
                        transition: 'opacity 0.2s',
                      }}
                    >
                      {/* Thumbnail */}
                      <td className="px-4 py-3">
                        {p.thumbnail_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={p.thumbnail_url}
                            alt={p.title}
                            className="w-10 h-10 rounded-full object-cover border"
                            style={{ border: '1px solid #EAE3D6' }}
                          />
                        ) : (
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{ background: 'linear-gradient(135deg, #0D9488, #6366f1)' }}
                          >
                            {p.title.charAt(0)}
                          </div>
                        )}
                      </td>

                      {/* Title + Slug */}
                      <td className="px-4 py-3">
                        <p className="font-semibold text-zinc-900 text-sm truncate max-w-xs">{p.title}</p>
                        <p className="text-zinc-400 text-[11px] font-mono mt-0.5">{p.slug}</p>
                        {!p.s3_storage_key && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded mt-1"
                            style={{ background: 'rgba(245,158,11,0.1)', color: '#d97706' }}>
                            <AlertTriangle className="w-2.5 h-2.5" /> No ZIP
                          </span>
                        )}
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3">
                        <span className="text-xs font-medium text-zinc-600 px-2 py-1 rounded-full"
                          style={{ background: '#FAF7F0', border: '1px solid #EAE3D6' }}>
                          {p.category}
                        </span>
                      </td>

                      {/* Tier */}
                      <td className="px-4 py-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={p.tier === 'MAJOR'
                            ? { background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.25)', color: '#0D9488' }
                            : { background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#6366f1' }
                          }>
                          {p.tier}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-3">
                        <p className="font-bold text-zinc-900 text-sm">{formatCurrency(p.price_inr)}</p>
                      </td>

                      {/* Status toggle */}
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggle(p)}
                          disabled={togglingId === p.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all disabled:opacity-50"
                          style={p.is_active ? {
                            background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.3)', color: '#0D9488',
                          } : {
                            background: 'rgba(113,113,122,0.08)', border: '1px solid rgba(113,113,122,0.2)', color: '#71717a',
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
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          {/* Upload ZIP */}
                          <button
                            onClick={() => uploadPanel === p.id ? setUploadPanel(null) : openUploadPanel(p.id)}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
                            style={uploadPanel === p.id
                              ? { background: 'rgba(13,148,136,0.15)', border: '1px solid rgba(13,148,136,0.3)', color: '#0D9488' }
                              : { background: 'rgba(13,148,136,0.06)', border: '1px solid rgba(13,148,136,0.15)', color: '#0D9488' }}
                          >
                            <CloudUpload className="w-3 h-3" /> ZIP
                          </button>

                          {/* Edit */}
                          <Link
                            href={`/admin/projects/${p.id}/edit`}
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
                            style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', color: '#6366f1' }}
                          >
                            <Pencil className="w-3 h-3" /> Edit
                          </Link>

                          {/* Delete */}
                          {deleteConfirm === p.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleDelete(p.id)}
                                disabled={deletingId === p.id}
                                className="px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50"
                                style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', color: '#dc2626' }}
                              >
                                {deletingId === p.id ? <Loader2 className="w-3 h-3 animate-spin" /> : 'Confirm'}
                              </button>
                              <button onClick={() => setDeleteConfirm(null)} className="text-xs text-zinc-500 hover:text-zinc-800 px-1.5 py-1.5 transition-colors">
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(p.id)}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 transition-all"
                              style={{ border: '1px solid transparent' }}
                              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.06)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(239,68,68,0.15)'; }}
                              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>

                    {/* Upload panel — inline below row */}
                    {uploadPanel === p.id && (
                      <tr key={`${p.id}-upload`} style={{ borderBottom: '1px solid #EAE3D6' }}>
                        <td colSpan={7} className="px-5 pb-5 pt-0">
                          <div className="rounded-xl p-4 space-y-4 mt-2" style={{ background: '#FAF7F0', border: '1px solid #EAE3D6' }}>
                            <div className="flex items-center justify-between">
                              <p className="text-xs font-bold text-zinc-700 flex items-center gap-2">
                                <Upload className="w-3.5 h-3.5 text-teal-600" />
                                Upload Project ZIP — <span className="font-mono text-zinc-500">{p.slug}</span>
                              </p>
                              <button onClick={() => setUploadPanel(null)} className="text-zinc-400 hover:text-zinc-700">
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Drop zone */}
                            <div
                              className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all"
                              style={{ borderColor: 'rgba(13,148,136,0.3)', background: 'rgba(13,148,136,0.02)' }}
                              onClick={() => fileInputRef.current?.click()}
                              onDragOver={e => { e.preventDefault(); (e.currentTarget as HTMLElement).style.borderColor = '#0D9488'; }}
                              onDragLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(13,148,136,0.3)'; }}
                              onDrop={e => {
                                e.preventDefault();
                                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(13,148,136,0.3)';
                                const dropped = e.dataTransfer.files[0];
                                if (dropped) {
                                  const fakeEvt = { target: { files: [dropped] } } as unknown as React.ChangeEvent<HTMLInputElement>;
                                  handleFileSelect(fakeEvt, p.id);
                                }
                              }}
                            >
                              <FileArchive className="w-8 h-8 text-teal-500 mx-auto mb-2" />
                              <p className="text-zinc-600 text-xs font-semibold">Drag & drop ZIP here or click to browse</p>
                              <p className="text-zinc-400 text-[11px] mt-1">Max 200MB · .zip only</p>
                            </div>

                            <input
                              ref={fileInputRef}
                              type="file"
                              accept=".zip"
                              className="hidden"
                              onChange={e => handleFileSelect(e, p.id)}
                            />

                            {uploadState?.projectId === p.id && uploadState.message && (
                              <div className="space-y-2">
                                <p className={`text-xs font-medium ${
                                  uploadState.status === 'error' ? 'text-red-500' :
                                  uploadState.status === 'success' ? 'text-teal-600' : 'text-zinc-700'
                                }`}>
                                  {uploadState.message}
                                </p>

                                {uploadState.warning && (
                                  <p className="text-amber-600 text-xs flex items-center gap-1.5">
                                    <AlertTriangle className="w-3 h-3" /> {uploadState.warning}
                                  </p>
                                )}

                                {(uploadState.status === 'uploading' || uploadState.status === 'validating') && (
                                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#EAE3D6' }}>
                                    <div
                                      className="h-full rounded-full transition-all duration-300"
                                      style={{
                                        width: `${uploadState.progress}%`,
                                        background: 'linear-gradient(90deg, #0D9488, #10b981)',
                                      }}
                                    />
                                  </div>
                                )}
                              </div>
                            )}

                            {uploadState?.projectId === p.id && uploadState.file && uploadState.status !== 'success' && (
                              <button
                                onClick={handleUpload}
                                disabled={uploadState.status === 'uploading' || uploadState.status === 'validating'}
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-white transition-all disabled:opacity-50"
                                style={{ background: 'linear-gradient(135deg, #0D9488, #0F766E)', boxShadow: '0 0 16px rgba(13,148,136,0.2)' }}
                              >
                                {uploadState.status === 'uploading' ? (
                                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading to R2…</>
                                ) : uploadState.status === 'validating' ? (
                                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Validating ZIP…</>
                                ) : (
                                  <><CloudUpload className="w-3.5 h-3.5" /> Upload & Publish ZIP</>
                                )}
                              </button>
                            )}

                            {uploadState?.status === 'success' && (
                              <div className="flex items-center gap-2 text-teal-600 text-xs font-bold">
                                <CheckCircle2 className="w-4 h-4" />
                                ZIP is live on cloud — students can download now!
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
