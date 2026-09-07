'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X, Loader2, Save, CheckCircle2 } from 'lucide-react';
import type { Project, ProjectCategory, ProjectTier } from '@/lib/types';

const CATEGORIES: ProjectCategory[] = ['AIML', 'FullStack', 'Cybersecurity', 'Healthcare', 'FinTech', 'Cloud'];
const TIERS: ProjectTier[] = ['MINI', 'MAJOR'];

const CATEGORY_META: Record<ProjectCategory, { emoji: string; color: string }> = {
  AIML:          { emoji: '🤖', color: '#818cf8' },
  FullStack:     { emoji: '🌐', color: '#34d399' },
  Cybersecurity: { emoji: '🔐', color: '#f87171' },
  Healthcare:    { emoji: '🏥', color: '#34d399' },
  FinTech:       { emoji: '💳', color: '#fbbf24' },
  Cloud:         { emoji: '☁️',  color: '#38bdf8' },
};

const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(24,24,27,0.8), rgba(9,9,11,0.9))',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset',
};

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  color: '#fff',
  width: '100%',
  padding: '10px 14px',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.15s, box-shadow 0.15s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 700,
  color: '#52525b',
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: '8px',
};

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

  const [title, setTitle]              = useState(initialData?.title ?? '');
  const [slug, setSlug]                = useState(initialData?.slug ?? '');
  const [description, setDescription]  = useState(initialData?.description ?? '');
  const [problemStatement, setProblem] = useState(initialData?.problem_statement ?? '');
  const [category, setCategory]        = useState<ProjectCategory>(initialData?.category ?? 'FullStack');
  const [tier, setTier]                = useState<ProjectTier>(initialData?.tier ?? 'MINI');
  const [price, setPrice]              = useState(String(initialData?.price_inr ?? ''));
  const [techStack, setTechStack]      = useState<string[]>(initialData?.tech_stack ?? []);
  const [techInput, setTechInput]      = useState('');
  const [features, setFeatures]        = useState<string[]>(initialData?.features ?? []);
  const [featureInput, setFeatureInput]= useState('');
  const [isActive, setIsActive]        = useState(initialData?.is_active ?? false);
  const [s3Key, setS3Key]              = useState(initialData?.s3_storage_key ?? '');
  const [reportKey, setReportKey]      = useState(initialData?.report_template_key ?? '');

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (mode === 'create') {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    }
  };

  const addTech = () => {
    const val = techInput.trim();
    if (val && !techStack.includes(val)) setTechStack(p => [...p, val]);
    setTechInput('');
  };

  const addFeature = () => {
    const val = featureInput.trim();
    if (val) setFeatures(p => [...p, val]);
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
      { method: mode === 'create' ? 'POST' : 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
    );

    const data = await res.json();
    if (!res.ok) { setError(data.error ?? 'Something went wrong'); setSaving(false); return; }

    setSuccess(true);
    setTimeout(() => router.push('/admin/projects'), 900);
  };

  const catMeta = CATEGORY_META[category];

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">

      {error && (
        <div className="rounded-xl px-4 py-3 text-sm font-medium"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171' }}>
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-xl px-4 py-3 text-sm font-medium flex items-center gap-2"
          style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: '#34d399' }}>
          <CheckCircle2 className="w-4 h-4" />
          {mode === 'create' ? 'Project created!' : 'Changes saved!'} Redirecting…
        </div>
      )}

      {/* Title */}
      <FormField label="Project Title *">
        <input
          type="text" required value={title} onChange={e => handleTitleChange(e.target.value)}
          placeholder="AI-Powered Student Management System"
          style={inputStyle}
          onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(99,102,241,0.5)'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(99,102,241,0.08)'; }}
          onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.target as HTMLInputElement).style.boxShadow = 'none'; }}
        />
      </FormField>

      {/* Slug */}
      <FormField label="Slug *" hint={mode === 'edit' ? '⚠️ Changing the slug breaks all existing public URLs' : undefined}>
        <input
          type="text" required value={slug} onChange={e => setSlug(e.target.value)}
          placeholder="ai-powered-student-management"
          style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '13px' }}
          onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(99,102,241,0.5)'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(99,102,241,0.08)'; }}
          onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.target as HTMLInputElement).style.boxShadow = 'none'; }}
        />
      </FormField>

      {/* Category + Tier + Price row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Category */}
        <FormField label="Category *">
          <div className="grid grid-cols-2 gap-1.5">
            {CATEGORIES.map(c => {
              const meta = CATEGORY_META[c];
              const isSelected = category === c;
              return (
                <button key={c} type="button" onClick={() => setCategory(c)}
                  className="px-2 py-1.5 rounded-lg text-xs font-semibold transition-all text-left flex items-center gap-1.5"
                  style={isSelected ? {
                    background: `${meta.color}18`, border: `1px solid ${meta.color}40`, color: meta.color,
                  } : {
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#52525b',
                  }}>
                  <span>{meta.emoji}</span> {c}
                </button>
              );
            })}
          </div>
        </FormField>

        {/* Tier */}
        <FormField label="Tier *">
          <div className="flex gap-2">
            {TIERS.map(t => (
              <button key={t} type="button" onClick={() => setTier(t)}
                className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
                style={tier === t
                  ? t === 'MAJOR'
                    ? { background: 'rgba(20,184,166,0.15)', border: '1px solid rgba(20,184,166,0.4)', color: '#2dd4bf' }
                    : { background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.4)', color: '#818cf8' }
                  : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', color: '#52525b' }
                }>
                {t}
              </button>
            ))}
          </div>
        </FormField>

        {/* Price */}
        <FormField label="Price (₹) *">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 text-sm font-bold">₹</span>
            <input
              type="number" required min={1} value={price} onChange={e => setPrice(e.target.value)}
              placeholder="499"
              style={{ ...inputStyle, paddingLeft: '28px' }}
              onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(99,102,241,0.5)'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(99,102,241,0.08)'; }}
              onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.target as HTMLInputElement).style.boxShadow = 'none'; }}
            />
          </div>
        </FormField>
      </div>

      {/* Description */}
      <FormField label="Short Description">
        <textarea rows={3} value={description} onChange={e => setDescription(e.target.value)}
          placeholder="Marketing description shown on the project card…"
          style={{ ...inputStyle, resize: 'none', lineHeight: '1.6' }}
          onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(99,102,241,0.5)'; (e.target as HTMLTextAreaElement).style.boxShadow = '0 0 0 3px rgba(99,102,241,0.08)'; }}
          onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.target as HTMLTextAreaElement).style.boxShadow = 'none'; }}
        />
      </FormField>

      {/* Problem Statement */}
      <FormField label="Problem Statement">
        <textarea rows={4} value={problemStatement} onChange={e => setProblem(e.target.value)}
          placeholder="Detailed technical problem statement…"
          style={{ ...inputStyle, resize: 'none', lineHeight: '1.6' }}
          onFocus={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(99,102,241,0.5)'; (e.target as HTMLTextAreaElement).style.boxShadow = '0 0 0 3px rgba(99,102,241,0.08)'; }}
          onBlur={e => { (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.target as HTMLTextAreaElement).style.boxShadow = 'none'; }}
        />
      </FormField>

      {/* Tech Stack */}
      <FormField label="Tech Stack">
        <div className="flex gap-2 mb-2">
          <input
            type="text" value={techInput} onChange={e => setTechInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTech(); }}}
            placeholder="Next.js, Python, PostgreSQL… (Enter to add)"
            style={{ ...inputStyle, flex: 1 }}
            onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(99,102,241,0.5)'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(99,102,241,0.08)'; }}
            onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.target as HTMLInputElement).style.boxShadow = 'none'; }}
          />
          <button type="button" onClick={addTech}
            className="px-3 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#818cf8' }}>
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {techStack.map(t => (
              <span key={t} className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#a1a1aa' }}>
                {t}
                <button type="button" onClick={() => setTechStack(p => p.filter(x => x !== t))}
                  className="text-zinc-700 hover:text-red-400 transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </FormField>

      {/* Features */}
      <FormField label="Features">
        <div className="flex gap-2 mb-2">
          <input
            type="text" value={featureInput} onChange={e => setFeatureInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); }}}
            placeholder="Role-based auth, Real-time dashboard… (Enter to add)"
            style={{ ...inputStyle, flex: 1 }}
            onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(99,102,241,0.5)'; (e.target as HTMLInputElement).style.boxShadow = '0 0 0 3px rgba(99,102,241,0.08)'; }}
            onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.target as HTMLInputElement).style.boxShadow = 'none'; }}
          />
          <button type="button" onClick={addFeature}
            className="px-3 py-2 rounded-xl text-sm font-semibold"
            style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', color: '#818cf8' }}>
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {features.length > 0 && (
          <ul className="space-y-1.5">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-2.5 text-sm px-3 py-2 rounded-lg"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: '#6366f1' }}>·</span>
                <span className="flex-1 text-zinc-300 text-xs">{f}</span>
                <button type="button" onClick={() => setFeatures(p => p.filter((_, idx) => idx !== i))}
                  className="text-zinc-700 hover:text-red-400 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </FormField>

      {/* Edit-only: storage keys */}
      {mode === 'edit' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="R2 Storage Key" hint="Set via upload script — update after uploading ZIP">
            <input type="text" value={s3Key} onChange={e => setS3Key(e.target.value)}
              placeholder="bundles/project-slug.zip"
              style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '12px', color: '#71717a' }}
              onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(99,102,241,0.5)'; }}
              onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
            />
          </FormField>
          <FormField label="Report Template Key" hint="Set via upload script">
            <input type="text" value={reportKey} onChange={e => setReportKey(e.target.value)}
              placeholder="templates/project-slug.docx"
              style={{ ...inputStyle, fontFamily: 'monospace', fontSize: '12px', color: '#71717a' }}
              onFocus={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(99,102,241,0.5)'; }}
              onBlur={e => { (e.target as HTMLInputElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
            />
          </FormField>
        </div>
      )}

      {/* Publish toggle */}
      <div className="flex items-center justify-between px-4 py-4 rounded-xl"
        style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div>
          <p className="text-sm font-semibold text-white">
            {isActive ? '🟢 Live — visible to students' : '⚫ Draft — hidden from public'}
          </p>
          <p className="text-xs text-zinc-600 mt-0.5">
            {isActive ? 'Students can find and purchase this project' : 'Toggle on when ready to publish'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsActive(v => !v)}
          className="relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300"
          style={{
            background: isActive ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'rgba(255,255,255,0.08)',
            boxShadow: isActive ? '0 0 12px rgba(99,102,241,0.4)' : 'none',
            border: `1px solid ${isActive ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.1)'}`,
          }}
        >
          <span
            className="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300"
            style={{ transform: isActive ? 'translateX(22px)' : 'translateX(2px)' }}
          />
        </button>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || success}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-60"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            boxShadow: '0 0 20px rgba(99,102,241,0.3)',
          }}
        >
          {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving…</>
            : success ? <><CheckCircle2 className="w-4 h-4" /> Saved!</>
            : <><Save className="w-4 h-4" /> {mode === 'create' ? 'Create Project' : 'Save Changes'}</>}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/projects')}
          className="px-5 py-3 text-sm text-zinc-500 hover:text-white transition-colors rounded-xl"
          style={{ border: '1px solid transparent' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.borderColor = 'transparent'; }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function FormField({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {hint && <p className="text-[11px] text-amber-500/80 mb-2">{hint}</p>}
      {children}
    </div>
  );
}
