'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X, Loader2, Save } from 'lucide-react';
import type { Project, ProjectCategory, ProjectTier } from '@/lib/types';

const CATEGORIES: ProjectCategory[] = ['AIML', 'FullStack', 'Cybersecurity', 'Healthcare', 'FinTech', 'Cloud'];
const TIERS: ProjectTier[] = ['MINI', 'MAJOR'];

interface ProjectFormProps {
  initialData?: Partial<Project>;
  mode: 'create' | 'edit';
  projectId?: string;
}

export default function ProjectForm({ initialData, mode, projectId }: ProjectFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [title, setTitle]               = useState(initialData?.title ?? '');
  const [slug, setSlug]                 = useState(initialData?.slug ?? '');
  const [description, setDescription]   = useState(initialData?.description ?? '');
  const [problemStatement, setProblem]  = useState(initialData?.problem_statement ?? '');
  const [category, setCategory]         = useState<ProjectCategory>(initialData?.category ?? 'FullStack');
  const [tier, setTier]                 = useState<ProjectTier>(initialData?.tier ?? 'MINI');
  const [price, setPrice]               = useState(String(initialData?.price_inr ?? ''));
  const [techStack, setTechStack]       = useState<string[]>(initialData?.tech_stack ?? []);
  const [techInput, setTechInput]       = useState('');
  const [features, setFeatures]         = useState<string[]>(initialData?.features ?? []);
  const [featureInput, setFeatureInput] = useState('');
  const [isActive, setIsActive]         = useState(initialData?.is_active ?? false);
  const [s3Key, setS3Key]               = useState(initialData?.s3_storage_key ?? '');
  const [reportKey, setReportKey]       = useState(initialData?.report_template_key ?? '');

  // Auto-generate slug from title in create mode
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (mode === 'create') {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    }
  };

  const addTech = () => {
    const val = techInput.trim();
    if (val && !techStack.includes(val)) setTechStack(prev => [...prev, val]);
    setTechInput('');
  };

  const addFeature = () => {
    const val = featureInput.trim();
    if (val) setFeatures(prev => [...prev, val]);
    setFeatureInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !category || !tier || !price) {
      setError('Title, slug, category, tier and price are required.');
      return;
    }
    setSaving(true);
    setError(null);

    const payload = {
      title, slug, description, problem_statement: problemStatement,
      category, tier, price_inr: Number(price),
      tech_stack: techStack, features, is_active: isActive,
      ...(mode === 'edit' ? { s3_storage_key: s3Key, report_template_key: reportKey } : {}),
    };

    const res = await fetch(
      mode === 'create' ? '/api/admin/projects' : `/api/admin/projects/${projectId}`,
      {
        method: mode === 'create' ? 'POST' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Something went wrong');
      setSaving(false);
      return;
    }

    setSuccess(true);
    setTimeout(() => router.push('/admin/projects'), 800);
  };

  const inputClass = "w-full bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-brand-500/60 transition-colors";
  const labelClass = "block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm px-4 py-3 rounded-xl">
          {mode === 'create' ? 'Project created!' : 'Saved!'} Redirecting…
        </div>
      )}

      {/* Title */}
      <div>
        <label className={labelClass}>Title *</label>
        <input type="text" required value={title} onChange={e => handleTitleChange(e.target.value)}
          placeholder="AI-Powered Student Management System"
          className={inputClass} />
      </div>

      {/* Slug */}
      <div>
        <label className={labelClass}>Slug *</label>
        {mode === 'edit' && (
          <p className="text-amber-400 text-[11px] mb-1.5">⚠ Changing the slug breaks all existing public URLs for this project.</p>
        )}
        <input type="text" required value={slug} onChange={e => setSlug(e.target.value)}
          placeholder="ai-powered-student-management"
          className={inputClass + ' font-mono'} />
      </div>

      {/* Category + Tier + Price */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Category *</label>
          <select value={category} onChange={e => setCategory(e.target.value as ProjectCategory)}
            className={inputClass + ' cursor-pointer'}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Tier *</label>
          <div className="flex gap-2">
            {TIERS.map(t => (
              <button key={t} type="button" onClick={() => setTier(t)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                  tier === t
                    ? t === 'MAJOR'
                      ? 'bg-accent-500/20 border-accent-500/50 text-accent-400'
                      : 'bg-brand-500/20 border-brand-500/50 text-brand-400'
                    : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:border-slate-600'
                }`}>{t}</button>
            ))}
          </div>
        </div>
        <div>
          <label className={labelClass}>Price (₹) *</label>
          <input type="number" required min={1} value={price} onChange={e => setPrice(e.target.value)}
            placeholder="499" className={inputClass} />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}>Short Description</label>
        <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)}
          placeholder="Marketing description shown on the project card"
          className={inputClass + ' resize-none'} />
      </div>

      {/* Problem Statement */}
      <div>
        <label className={labelClass}>Problem Statement</label>
        <textarea rows={4} value={problemStatement} onChange={e => setProblem(e.target.value)}
          placeholder="Detailed technical problem statement..."
          className={inputClass + ' resize-none'} />
      </div>

      {/* Tech Stack tags */}
      <div>
        <label className={labelClass}>Tech Stack</label>
        <div className="flex gap-2 mb-2">
          <input type="text" value={techInput} onChange={e => setTechInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTech(); }}}
            placeholder="Next.js, Python, PostgreSQL…"
            className={inputClass + ' flex-1'} />
          <button type="button" onClick={addTech}
            className="px-3 py-2 bg-brand-500/20 hover:bg-brand-500/30 border border-brand-500/30 text-brand-400 rounded-xl text-sm font-semibold transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {techStack.map(t => (
              <span key={t} className="flex items-center gap-1.5 text-xs bg-slate-700/60 border border-slate-600/50 text-slate-300 px-2.5 py-1 rounded-lg">
                {t}
                <button type="button" onClick={() => setTechStack(prev => prev.filter(x => x !== t))}
                  className="text-slate-500 hover:text-red-400 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Features */}
      <div>
        <label className={labelClass}>Features</label>
        <div className="flex gap-2 mb-2">
          <input type="text" value={featureInput} onChange={e => setFeatureInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); }}}
            placeholder="Role-based authentication, Real-time dashboard…"
            className={inputClass + ' flex-1'} />
          <button type="button" onClick={addFeature}
            className="px-3 py-2 bg-brand-500/20 hover:bg-brand-500/30 border border-brand-500/30 text-brand-400 rounded-xl text-sm font-semibold transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {features.length > 0 && (
          <ul className="space-y-1.5">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300 bg-slate-800/40 px-3 py-2 rounded-lg border border-slate-700/50">
                <span className="text-brand-400 mt-0.5 shrink-0">·</span>
                <span className="flex-1">{f}</span>
                <button type="button" onClick={() => setFeatures(prev => prev.filter((_, idx) => idx !== i))}
                  className="text-slate-600 hover:text-red-400 transition-colors shrink-0">
                  <X className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Edit-only: storage keys (read-only display) */}
      {mode === 'edit' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>R2 Storage Key</label>
            <input type="text" value={s3Key} onChange={e => setS3Key(e.target.value)}
              placeholder="Set via upload script"
              className={inputClass + ' font-mono text-xs text-slate-500'} />
          </div>
          <div>
            <label className={labelClass}>Report Template Key</label>
            <input type="text" value={reportKey} onChange={e => setReportKey(e.target.value)}
              placeholder="Set via upload script"
              className={inputClass + ' font-mono text-xs text-slate-500'} />
          </div>
        </div>
      )}

      {/* Active toggle */}
      <div className="flex items-center justify-between p-4 bg-slate-800/40 border border-slate-700/50 rounded-xl">
        <div>
          <p className="text-sm font-semibold text-white">Publish Status</p>
          <p className="text-xs text-slate-400 mt-0.5">
            {isActive ? 'Project is live and visible to students' : 'Project is in draft — not visible publicly'}
          </p>
        </div>
        <button type="button" onClick={() => setIsActive(v => !v)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 transition-colors ${
            isActive ? 'bg-brand-500 border-brand-400' : 'bg-slate-700 border-slate-600'
          }`}>
          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isActive ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={saving || success}
          className="flex items-center gap-2 px-6 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm rounded-xl transition-colors disabled:opacity-60">
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</> : <><Save className="w-4 h-4" /> {mode === 'create' ? 'Create Project' : 'Save Changes'}</>}
        </button>
        <button type="button" onClick={() => router.push('/admin/projects')}
          className="px-5 py-2.5 text-sm text-slate-400 hover:text-white transition-colors">
          Cancel
        </button>
      </div>
    </form>
  );
}
