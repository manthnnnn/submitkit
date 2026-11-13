'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus, X, Loader2, CheckCircle2, ChevronLeft,
  AlertCircle, Rocket, Save, FileArchive, CloudUpload, AlertTriangle
} from 'lucide-react';
import type { Project, ProjectCategory, ProjectTier } from '@/lib/types';

/* ── Constants ── */
const CATEGORIES: ProjectCategory[] = ['AIML', 'FullStack', 'Cybersecurity', 'Healthcare', 'FinTech', 'Cloud'];
const TIERS: ProjectTier[] = ['MINI', 'MAJOR'];

const CATEGORY_META: Record<ProjectCategory, { emoji: string; label: string; color: string; bg: string }> = {
  AIML:          { emoji: '🤖', label: 'AIML',          color: '#0D9488', bg: '#F0FDFA' },
  FullStack:     { emoji: '🌐', label: 'FullStack',     color: '#0D9488', bg: '#F0FDFA' },
  Cybersecurity: { emoji: '🔐', label: 'Cybersecurity', color: '#DC2626', bg: '#FEF2F2' },
  Healthcare:    { emoji: '🏥', label: 'Healthcare',    color: '#059669', bg: '#ECFDF5' },
  FinTech:       { emoji: '💳', label: 'FinTech',       color: '#B45309', bg: '#FFFBEB' },
  Cloud:         { emoji: '☁️',  label: 'Cloud',         color: '#0369A1', bg: '#EFF6FF' },
};

const TIER_PRICES: Record<ProjectTier, { price: number; subtitle: string; desc: string }> = {
  MINI:  { price: 299, subtitle: '1-Click Kit',    desc: 'Source code, docs & setup guide' },
  MAJOR: { price: 499, subtitle: 'Full Platform',  desc: 'Complete IEEE report, PPT, & viva prep' },
};

/* ── Design Tokens ── */
const WHITE = '#FFFFFF';
const TEAL = '#0D9488';
const TEAL_DARK = '#0A7C72';
const NAVY = '#0F172A';
const MUTED = '#64748B';
const BORDER = '#EAE3D6';
const BORDER_INPUT = '#CBD5E1';

const cardStyle: React.CSSProperties = {
  background: WHITE,
  border: `1px solid ${BORDER}`,
  borderRadius: 16,
  boxShadow: '0 1px 3px rgba(15,23,42,.06)',
  padding: 24,
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: WHITE,
  border: `1px solid ${BORDER_INPUT}`,
  borderRadius: 10,
  padding: '10px 14px',
  fontSize: 14,
  color: NAVY,
  outline: 'none',
  transition: 'border-color .15s, box-shadow .15s',
  fontFamily: 'inherit',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: 11,
  fontWeight: 700,
  color: MUTED,
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  marginBottom: 6,
};

function toSlug(val: string) {
  return val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      {hint && <p style={{ fontSize: 11, color: '#B45309', marginBottom: 6 }}>{hint}</p>}
      {children}
    </div>
  );
}

interface ProjectFormProps {
  initialData?: Partial<Project>;
  mode: 'create' | 'edit';
  projectId?: string;
}

export default function ProjectForm({ initialData, mode, projectId }: ProjectFormProps) {
  const router = useRouter();

  // Core fields
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [category, setCategory] = useState<ProjectCategory>(initialData?.category ?? 'FullStack');
  const [tier, setTier] = useState<ProjectTier>(initialData?.tier ?? 'MINI');
  const [price, setPrice] = useState(String(initialData?.price_inr ?? TIER_PRICES[initialData?.tier ?? 'MINI'].price));
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [problemStatement, setProblemStatement] = useState(initialData?.problem_statement ?? '');
  const [architectureDetails, setArchitectureDetails] = useState(initialData?.architecture_details ?? '');

  // Tech stack & features
  const [techStack, setTechStack] = useState<string[]>(initialData?.tech_stack ?? []);
  const [techInput, setTechInput] = useState('');
  const [features, setFeatures] = useState<string[]>(initialData?.features ?? []);
  const [featureInput, setFeatureInput] = useState('');

  // Storage keys & upload
  const [s3Key, setS3Key] = useState(initialData?.s3_storage_key ?? (initialData?.slug ? `bundles/${initialData.slug}.zip` : ''));
  const [reportKey, setReportKey] = useState(initialData?.report_template_key ?? (initialData?.slug ? `templates/${initialData.slug}.docx` : ''));
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // Status & submission
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (mode === 'create') {
      const derived = toSlug(val);
      setSlug(derived);
      if (!s3Key || s3Key.startsWith('bundles/')) setS3Key(`bundles/${derived}.zip`);
      if (!reportKey || reportKey.startsWith('templates/')) setReportKey(`templates/${derived}.docx`);
    }
  };

  const handleTierSelect = (t: ProjectTier) => {
    setTier(t);
    setPrice(String(TIER_PRICES[t].price));
  };

  const addTech = () => {
    const val = techInput.trim();
    if (val && !techStack.includes(val)) setTechStack(prev => [...prev, val]);
    setTechInput('');
  };

  const removeTech = (item: string) => {
    setTechStack(prev => prev.filter(t => t !== item));
  };

  const addFeature = () => {
    const val = featureInput.trim();
    if (val) setFeatures(prev => [...prev, val]);
    setFeatureInput('');
  };

  const removeFeature = (idx: number) => {
    setFeatures(prev => prev.filter((_, i) => i !== idx));
  };

  // ZIP upload to Cloudflare R2
  const handleZipUpload = useCallback(async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.zip')) {
      setUploadError('Only .zip files are allowed.');
      return;
    }
    setUploading(true);
    setUploadError(null);
    setUploadStatus('Uploading bundle to Cloudflare R2...');

    try {
      const formData = new FormData();
      formData.append('file', file);
      if (slug) formData.append('slug', slug);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json() as { key?: string; error?: string };
      if (!res.ok) {
        setUploadError(data.error ?? 'Upload failed.');
        setUploadStatus(null);
        return;
      }

      if (data.key) {
        setS3Key(data.key);
        setUploadStatus(`Uploaded successfully! Key: ${data.key}`);
      }
    } catch {
      setUploadError('Upload failed. Check network or server connection.');
      setUploadStatus(null);
    } finally {
      setUploading(false);
    }
  }, [slug]);

  // Submit project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim() || !category || !tier || !price) {
      setError('Title, slug, category, tier, and price are required.');
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim(),
      problem_statement: problemStatement.trim(),
      architecture_details: architectureDetails.trim(),
      category,
      tier,
      price_inr: Number(price),
      tech_stack: techStack,
      features,
      is_active: isActive,
      s3_storage_key: s3Key.trim(),
      report_template_key: reportKey.trim(),
    };

    try {
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
        setError(data.error ?? 'Failed to save project.');
        setSaving(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/projects');
      }, 700);
    } catch {
      setError('Connection error. Please try again.');
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl pb-16 font-sans">
      {/* ── Section 1: Core Details ── */}
      <div style={cardStyle} className="space-y-5">
        <h2 style={{ fontSize: 16, fontWeight: 700, color: NAVY }}>Core Project Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Project Title *">
            <input
              type="text"
              value={title}
              onChange={e => handleTitleChange(e.target.value)}
              placeholder="e.g. HealthSync EHR & Telehealth Portal"
              style={inputStyle}
              required
            />
          </Field>

          <Field label="URL Slug *" hint="Permanent unique URL path">
            <input
              type="text"
              value={slug}
              onChange={e => setSlug(toSlug(e.target.value))}
              placeholder="e.g. healthcare-ehr-portal"
              style={{ ...inputStyle, fontFamily: 'monospace', fontSize: 13 }}
              required
            />
          </Field>
        </div>

        {/* Category Selector */}
        <div>
          <label style={labelStyle}>Category *</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {CATEGORIES.map(cat => {
              const meta = CATEGORY_META[cat];
              const selected = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: '10px 8px',
                    borderRadius: 12,
                    border: `2px solid ${selected ? TEAL : BORDER}`,
                    background: selected ? meta.bg : WHITE,
                    color: selected ? TEAL_DARK : NAVY,
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    transition: 'all .15s',
                  }}
                >
                  <span style={{ fontSize: 18 }}>{meta.emoji}</span>
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tier & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div>
            <label style={labelStyle}>Project Tier *</label>
            <div className="grid grid-cols-2 gap-2.5">
              {TIERS.map(t => {
                const meta = TIER_PRICES[t];
                const selected = tier === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleTierSelect(t)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: `2px solid ${selected ? TEAL : BORDER}`,
                      background: selected ? '#F0FDFA' : WHITE,
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all .15s',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 800, fontSize: 14, color: selected ? TEAL_DARK : NAVY }}>{t}</span>
                      <span style={{ fontWeight: 700, fontSize: 12, color: TEAL }}>₹{meta.price}</span>
                    </div>
                    <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{meta.subtitle}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <Field label="Price (INR) *">
            <input
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              placeholder="299"
              style={{ ...inputStyle, fontWeight: 700 }}
              required
            />
          </Field>
        </div>
      </div>

      {/* ── Section 2: Descriptions ── */}
      <div style={cardStyle} className="space-y-4">
        <h2 style={{ fontSize: 16, fontWeight: 700, color: NAVY }}>Academic Description & Problem Statement</h2>

        <Field label="Project Overview / Description">
          <textarea
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Concise overview of what this project does and why students choose it..."
            style={inputStyle}
          />
        </Field>

        <Field label="Problem Statement">
          <textarea
            rows={4}
            value={problemStatement}
            onChange={e => setProblemStatement(e.target.value)}
            placeholder="Detailed academic problem statement explaining the current industry or real-world challenges..."
            style={inputStyle}
          />
        </Field>

        <Field label="System Architecture Summary (Optional)">
          <textarea
            rows={2}
            value={architectureDetails}
            onChange={e => setArchitectureDetails(e.target.value)}
            placeholder="e.g. Next.js 14 App Router, Node.js API with Prisma ORM and SQLite embedded database."
            style={inputStyle}
          />
        </Field>
      </div>

      {/* ── Section 3: Tech Stack & Features ── */}
      <div style={cardStyle} className="space-y-5">
        <h2 style={{ fontSize: 16, fontWeight: 700, color: NAVY }}>Tech Stack & Key Deliverable Features</h2>

        {/* Tech Stack */}
        <div>
          <label style={labelStyle}>Tech Stack</label>
          <div className="flex gap-2 mb-2.5">
            <input
              type="text"
              value={techInput}
              onChange={e => setTechInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addTech(); } }}
              placeholder="e.g. Python, Next.js, FastAPI, Prisma (Press Enter to add)"
              style={inputStyle}
            />
            <button
              type="button"
              onClick={addTech}
              style={{
                padding: '0 16px',
                borderRadius: 10,
                border: `1px solid ${BORDER}`,
                background: WHITE,
                color: TEAL_DARK,
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 min-h-[32px]">
            {techStack.map(t => (
              <span
                key={t}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  padding: '4px 10px',
                  borderRadius: 20,
                  background: '#F0FDFA',
                  border: '1px solid #CCFBF1',
                  color: TEAL_DARK,
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                {t}
                <button
                  type="button"
                  onClick={() => removeTech(t)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: MUTED, display: 'flex', padding: 0 }}
                >
                  <X style={{ width: 12, height: 12 }} />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div>
          <label style={labelStyle}>Core Features (Shown to Students)</label>
          <div className="flex gap-2 mb-2.5">
            <input
              type="text"
              value={featureInput}
              onChange={e => setFeatureInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addFeature(); } }}
              placeholder="e.g. Real-Time Patient Vitals Telemetry with WebSockets"
              style={inputStyle}
            />
            <button
              type="button"
              onClick={addFeature}
              style={{
                padding: '0 16px',
                borderRadius: 10,
                border: `1px solid ${BORDER}`,
                background: WHITE,
                color: TEAL_DARK,
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Add
            </button>
          </div>

          <ul className="space-y-1.5">
            {features.map((f, i) => (
              <li
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 12px',
                  borderRadius: 8,
                  background: '#FAF7F0',
                  border: `1px solid ${BORDER}`,
                  fontSize: 13,
                  color: NAVY,
                }}
              >
                <span>{f}</span>
                <button
                  type="button"
                  onClick={() => removeFeature(i)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: MUTED }}
                >
                  <X style={{ width: 14, height: 14 }} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Section 4: Cloudflare R2 Deliverables & Upload ── */}
      <div style={cardStyle} className="space-y-5">
        <h2 style={{ fontSize: 16, fontWeight: 700, color: NAVY }}>Deliverables & Cloudflare R2 Storage Keys</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Source Code ZIP Storage Key">
            <input
              type="text"
              value={s3Key}
              onChange={e => setS3Key(e.target.value)}
              placeholder="bundles/project-slug.zip"
              style={{ ...inputStyle, fontFamily: 'monospace', fontSize: 12 }}
            />
          </Field>

          <Field label="IEEE Report Template Key">
            <input
              type="text"
              value={reportKey}
              onChange={e => setReportKey(e.target.value)}
              placeholder="templates/project-slug.docx"
              style={{ ...inputStyle, fontFamily: 'monospace', fontSize: 12 }}
            />
          </Field>
        </div>

        {/* Drag & Drop ZIP Upload Panel */}
        <div>
          <label style={labelStyle}>Upload Project ZIP to Cloudflare R2</label>
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => {
              e.preventDefault();
              setDragOver(false);
              const dropped = e.dataTransfer.files[0];
              if (dropped) handleZipUpload(dropped);
            }}
            onClick={() => document.getElementById('zip-upload-input')?.click()}
            style={{
              border: `2px dashed ${dragOver ? TEAL : BORDER}`,
              borderRadius: 12,
              padding: '24px 20px',
              textAlign: 'center',
              background: dragOver ? '#F0FDFA' : '#FAF7F0',
              cursor: uploading ? 'wait' : 'pointer',
              transition: 'all .15s',
            }}
          >
            <input
              id="zip-upload-input"
              type="file"
              accept=".zip"
              style={{ display: 'none' }}
              onChange={e => {
                const f = e.target.files?.[0];
                if (f) handleZipUpload(f);
              }}
            />
            {uploading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <Loader2 style={{ width: 28, height: 28, color: TEAL, animation: 'spin 1s linear infinite' }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: TEAL_DARK }}>{uploadStatus}</span>
              </div>
            ) : (
              <div>
                <FileArchive style={{ width: 32, height: 32, color: TEAL, margin: '0 auto 8px' }} />
                <p style={{ fontSize: 13, fontWeight: 700, color: NAVY }}>
                  Drag & drop project ZIP here, or click to browse
                </p>
                <p style={{ fontSize: 11, color: MUTED, marginTop: 4 }}>
                  Excludes node_modules/.next automatically · Max 200MB · Direct R2 Cloud Upload
                </p>
              </div>
            )}
          </div>

          {uploadStatus && !uploading && (
            <p style={{ fontSize: 12, color: '#059669', fontWeight: 600, marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <CheckCircle2 style={{ width: 14, height: 14 }} /> {uploadStatus}
            </p>
          )}

          {uploadError && (
            <p style={{ fontSize: 12, color: '#DC2626', fontWeight: 600, marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <AlertCircle style={{ width: 14, height: 14 }} /> {uploadError}
            </p>
          )}
        </div>
      </div>

      {/* ── Section 5: Publication Status & Submission ── */}
      <div style={cardStyle} className="space-y-4">
        <h2 style={{ fontSize: 16, fontWeight: 700, color: NAVY }}>Catalog Visibility</h2>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setIsActive(false)}
            style={{
              padding: '14px',
              borderRadius: 12,
              border: `2px solid ${!isActive ? '#0F172A' : BORDER}`,
              background: !isActive ? '#0F172A' : WHITE,
              color: !isActive ? WHITE : MUTED,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all .15s',
            }}
          >
            ⚫ Draft
            <div style={{ fontSize: 11, fontWeight: 400, marginTop: 3, opacity: 0.75 }}>Hidden from public catalog</div>
          </button>

          <button
            type="button"
            onClick={() => setIsActive(true)}
            style={{
              padding: '14px',
              borderRadius: 12,
              border: `2px solid ${isActive ? TEAL : BORDER}`,
              background: isActive ? '#F0FDFA' : WHITE,
              color: isActive ? TEAL_DARK : MUTED,
              fontWeight: 700,
              fontSize: 14,
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all .15s',
            }}
          >
            🟢 Live
            <div style={{ fontSize: 11, fontWeight: 400, marginTop: 3, opacity: 0.75 }}>Visible to students</div>
          </button>
        </div>

        {error && (
          <div style={{ background: '#FFF1F2', border: '1px solid #FECDD3', borderRadius: 10, padding: '12px 16px', color: '#DC2626', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertCircle style={{ width: 16, height: 16, flexShrink: 0 }} /> {error}
          </div>
        )}

        {/* Submit Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={saving || success}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              padding: '14px 24px',
              borderRadius: 12,
              border: 'none',
              background: `linear-gradient(135deg, ${TEAL} 0%, ${TEAL_DARK} 100%)`,
              color: WHITE,
              fontWeight: 700,
              fontSize: 14,
              cursor: (saving || success) ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 14px -2px rgba(13,148,136,.4)',
              transition: 'all .15s',
              opacity: (saving || success) ? 0.7 : 1,
            }}
          >
            {saving ? (
              <>
                <Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} />
                <span>Saving Project...</span>
              </>
            ) : success ? (
              <>
                <CheckCircle2 style={{ width: 16, height: 16 }} />
                <span>Saved Successfully!</span>
              </>
            ) : (
              <>
                <Save style={{ width: 16, height: 16 }} />
                <span>{mode === 'create' ? 'Create Project Kit' : 'Save Changes'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => router.push('/admin/projects')}
            style={{
              padding: '14px 20px',
              borderRadius: 12,
              border: `1px solid ${BORDER}`,
              background: WHITE,
              color: MUTED,
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}
