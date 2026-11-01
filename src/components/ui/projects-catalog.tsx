'use client';

import { ProjectCard } from '@/components/ui/project-card';
import { Project } from '@/lib/types';
import { Clock, CheckCircle2, Sparkles, Search, ArrowRight, Bell, Check } from 'lucide-react';
import { isProjectAvailable } from '@/lib/available-projects';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CONSTANTS } from '@/lib/constants';

type StatusFilter = 'ALL' | 'AVAILABLE' | 'UPCOMING';
type TierFilter   = 'ALL' | 'MINI' | 'MAJOR';

export function ProjectsCatalog({ initialProjects }: { initialProjects: Project[] }) {
  const sp     = useSearchParams();
  const router = useRouter();

  // Read URL params on every render — these are the source of truth for tier/category
  const urlTier: TierFilter = (() => {
    const t = sp.get('tier')?.toUpperCase();
    return t === 'MINI' || t === 'MAJOR' ? t : 'ALL';
  })();
  const urlCat = sp.get('category') || 'ALL';
  const urlStatus: StatusFilter = (() => {
    const s = sp.get('status')?.toUpperCase();
    if (s === 'UPCOMING') return 'UPCOMING';
    if (s === 'ALL') return 'ALL';
    return 'AVAILABLE'; // Default to Available Now (9 verified kits)
  })();

  // Local-only state (defaults to 9 Available Kits)
  const [status,   setStatus]   = useState<StatusFilter>(urlStatus);
  const [query,    setQuery]    = useState('');
  // These mirror URL but can be overridden locally (clicking chips without nav)
  const [tier,     setTierLocal] = useState<TierFilter>(urlTier);
  const [cat,      setCatLocal]  = useState<string>(urlCat);

  // Sync local state whenever URL changes (e.g. navbar click → /projects?tier=MAJOR)
  useEffect(() => {
    setTierLocal(urlTier);
    setCatLocal(urlCat);
    setStatus(urlStatus);
    setQuery('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp.toString()]);

  const categories = useMemo(
    () => Array.from(new Set(initialProjects.map(p => p.category))).sort(),
    [initialProjects]
  );
  const availCount = useMemo(
    () => initialProjects.filter(p => isProjectAvailable(p.slug)).length,
    [initialProjects]
  );
  const upCount = initialProjects.length - availCount;

  const displayed = useMemo(() => {
    let r = initialProjects;
    if (query.trim()) {
      const q = query.toLowerCase();
      r = r.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tech_stack.some(t => t.toLowerCase().includes(q))
      );
    }
    if (tier !== 'ALL')   r = r.filter(p => p.tier === tier);
    if (cat  !== 'ALL')   r = r.filter(p => p.category === cat);
    if (status === 'AVAILABLE')  r = r.filter(p => isProjectAvailable(p.slug));
    else if (status === 'UPCOMING') r = r.filter(p => !isProjectAvailable(p.slug));
    else r = [
      ...r.filter(p =>  isProjectAvailable(p.slug)),
      ...r.filter(p => !isProjectAvailable(p.slug)),
    ];
    return r;
  }, [initialProjects, status, tier, cat, query]);

  // Reserve modal state
  const [reserve,  setReserve]  = useState<string | null>(null);
  const [resEmail, setResEmail] = useState('');
  const [resOk,    setResOk]    = useState(false);

  const onReserveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resEmail.includes('@') || !reserve) return;
    try {
      await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resEmail, projectName: reserve }),
      });
    } catch { /* silent */ }
    setResOk(true);
    setTimeout(() => { setReserve(null); setResOk(false); setResEmail(''); }, 3000);
  };

  // Change tier — update local state + push URL so back/forward works
  const handleTierChange = (t: TierFilter) => {
    setTierLocal(t);
    const params = new URLSearchParams(sp.toString());
    if (t === 'ALL') params.delete('tier');
    else params.set('tier', t);
    router.replace(`/projects?${params.toString()}`, { scroll: false });
  };

  const handleCatChange = (c: string) => {
    setCatLocal(c);
    const params = new URLSearchParams(sp.toString());
    if (c === 'ALL') params.delete('category');
    else params.set('category', c);
    router.replace(`/projects?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    setQuery('');
    setStatus('AVAILABLE');
    setTierLocal('ALL');
    setCatLocal('ALL');
    router.replace('/projects', { scroll: false });
  };

  return (
    <>
      {/* ── Page Header ── */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '.625rem', marginBottom: '1.125rem' }}>
          <span className="tag tag-teal">SubmitKit Fleet Catalog</span>
          <span className="tag tag-emerald">
            <span className="dot-live apulse" style={{ width: '5px', height: '5px' }} />
            {availCount} Ready to Ship
          </span>
          <span className="tag tag-amber">
            <Clock style={{ width: '.75rem', height: '.75rem' }} />
            {upCount} Upcoming
          </span>
        </div>
        <h1 className="font-display" style={{ fontSize: 'clamp(1.875rem,5vw,3rem)', fontWeight: 900, letterSpacing: '-.04em', color: 'var(--navy)', marginBottom: '.875rem' }}>
          Verified Projects.{' '}
          <span className="text-teal-grad">Ready to Run &amp; Submit.</span>
        </h1>
        <p style={{ fontSize: 'clamp(.9375rem,2vw,1.0625rem)', color: 'var(--ink-3)', maxWidth: '42rem', lineHeight: 1.75 }}>
          Skip the GitHub bugs. Every kit has 100% working code, IEEE Black Book, defense PPT, and top 25 Viva Q&amp;A.
        </p>
      </div>

      {/* ── Custom Project Banner ── */}
      <div className="card-teal" style={{ padding: '1.25rem 1.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.875rem' }}>
          <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '12px', flexShrink: 0, background: 'var(--teal-100)', border: '1px solid var(--line-teal)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles style={{ width: '1.125rem', height: '1.125rem', color: 'var(--teal-dark)' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem', flexWrap: 'wrap', marginBottom: '.3125rem' }}>
              <h3 style={{ fontSize: '.9375rem', fontWeight: 700, color: 'var(--navy)', margin: 0 }}>
                Need a Custom Project? Built in 48 Hours.
              </h3>
              <span className="tag tag-teal" style={{ fontSize: '.6rem' }}>100% Custom</span>
            </div>
            <p style={{ fontSize: '.8125rem', color: 'var(--ink-3)', margin: 0 }}>
              Working code · IEEE Black Book &amp; PPT · 1-on-1 walkthrough ·{' '}
              <strong style={{ color: 'var(--teal-dark)' }}>Starts ₹1,999</strong>
            </p>
          </div>
        </div>
        <a
          href={`https://wa.me/918799814256?text=${encodeURIComponent('Hi SubmitKit! I want a custom project.\n\nTopic:\nTech Stack:\nFeatures:\nDeadline:')}`}
          target="_blank" rel="noopener noreferrer"
          className="btn btn-teal btn-sm"
          style={{ flexShrink: 0 }}
        >
          <WaIcon />
          Chat on WhatsApp
          <ArrowRight style={{ width: '.8125rem', height: '.8125rem' }} />
        </a>
      </div>

      {/* ── Search ── */}
      <div style={{ position: 'relative', maxWidth: '36rem', marginBottom: '1.375rem' }}>
        <Search style={{ position: 'absolute', left: '.875rem', top: '50%', transform: 'translateY(-50%)', width: '1rem', height: '1rem', color: 'var(--ink-4)', pointerEvents: 'none' }} />
        <input
          type="text"
          placeholder="Search — Face Recognition, Fraud Detection, EHR..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="input"
          style={{ paddingLeft: '2.5rem' }}
        />
      </div>

      {/* ── Status Tabs (Aesthetic Segmented Control) ── */}
      <div className="scroll-x no-scrollbar" style={{ display: 'inline-flex', alignItems: 'center', gap: '.25rem', padding: '.25rem', borderRadius: '12px', background: 'var(--surface-2)', border: '1px solid var(--line)', marginBottom: '1.25rem', maxWidth: '100%' }}>
        {([
          { v: 'AVAILABLE', label: 'Ready to Ship',      n: availCount,             live: true },
          { v: 'UPCOMING',  label: 'Pre-Order Pipeline', n: upCount,                live: false },
          { v: 'ALL',       label: 'All Project Kits',   n: initialProjects.length, live: false },
        ] as const).map(({ v, label, n, live }) => {
          const active = status === v;
          return (
            <button
              key={v}
              onClick={() => setStatus(v)}
              className="shrink-0 whitespace-nowrap active:scale-95"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.5rem',
                padding: '.5rem .875rem',
                borderRadius: '9px',
                border: 'none',
                fontSize: '.8125rem',
                fontWeight: active ? 700 : 500,
                cursor: 'pointer',
                background: active ? 'var(--surface)' : 'transparent',
                color: active ? 'var(--navy)' : 'var(--ink-4)',
                boxShadow: active ? '0 2px 6px rgba(60,40,10,0.07), 0 1px 2px rgba(0,0,0,0.04)' : 'none',
                transition: 'all 150ms ease',
              }}
            >
              {live && (
                <span className="dot-live apulse" style={{ width: '6px', height: '6px' }} />
              )}
              <span>{label}</span>
              <span
                style={{
                  padding: '.125rem .5rem',
                  borderRadius: '9999px',
                  fontSize: '.6875rem',
                  fontWeight: 700,
                  background: active ? 'var(--teal-50)' : 'var(--surface-3)',
                  color: active ? 'var(--teal-dark)' : 'var(--ink-4)',
                  border: active ? '1px solid var(--teal-100)' : '1px solid transparent',
                }}
              >
                {n}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Unified Filter Toolbar: Tier & Domain ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '.875rem', marginBottom: '2rem' }}>
        {/* Tier filter segmented track */}
        <div className="scroll-x no-scrollbar max-w-full" style={{ display: 'inline-flex', alignItems: 'center', gap: '.25rem', padding: '.25rem', background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: '10px' }}>
          {(['ALL', 'MINI', 'MAJOR'] as TierFilter[]).map(t => {
            const active = tier === t;
            return (
              <button
                key={t}
                onClick={() => handleTierChange(t)}
                className="shrink-0 whitespace-nowrap active:scale-95"
                style={{
                  padding: '.375rem .75rem',
                  borderRadius: '7px',
                  border: 'none',
                  fontSize: '.8125rem',
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  background: active ? 'var(--surface)' : 'transparent',
                  color: active ? 'var(--navy)' : 'var(--ink-4)',
                  boxShadow: active ? '0 1px 3px rgba(60,40,10,0.07)' : 'none',
                  transition: 'all 140ms ease',
                }}
              >
                {t === 'ALL' ? 'All Tiers' : t === 'MINI' ? `Mini (₹${CONSTANTS.PRICING.MINI_PROJECT})` : `Major (₹${CONSTANTS.PRICING.MAJOR_PROJECT})`}
              </button>
            );
          })}
        </div>

        {/* Category domain pills */}
        <div className="scroll-x" style={{ display: 'flex', alignItems: 'center', gap: '.375rem', flex: 1, minWidth: 'min(100%, 18rem)', paddingBottom: '2px' }}>
          <button
            onClick={() => handleCatChange('ALL')}
            style={{
              padding: '.375rem .8125rem',
              borderRadius: '9999px',
              border: `1px solid ${cat === 'ALL' ? 'var(--teal)' : 'var(--line)'}`,
              background: cat === 'ALL' ? 'var(--teal-50)' : 'var(--surface)',
              color: cat === 'ALL' ? 'var(--teal-dark)' : 'var(--ink-3)',
              fontSize: '.75rem',
              fontWeight: cat === 'ALL' ? 700 : 500,
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 140ms ease',
            }}
          >
            All Domains
          </button>
          {categories.map(c => {
            const active = cat === c;
            return (
              <button
                key={c}
                onClick={() => handleCatChange(c)}
                style={{
                  padding: '.375rem .8125rem',
                  borderRadius: '9999px',
                  border: `1px solid ${active ? 'var(--teal)' : 'var(--line)'}`,
                  background: active ? 'var(--teal-50)' : 'var(--surface)',
                  color: active ? 'var(--teal-dark)' : 'var(--ink-3)',
                  fontSize: '.75rem',
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 140ms ease',
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Context Banners ── */}
      {status === 'AVAILABLE' && (
        <div style={{ display: 'flex', gap: '.875rem', padding: '1rem 1.25rem', borderRadius: '14px', background: 'var(--emerald-50)', border: '1px solid var(--emerald-100)', marginBottom: '2rem' }}>
          <CheckCircle2 style={{ width: '1.25rem', height: '1.25rem', color: 'var(--emerald)', flexShrink: 0, marginTop: '.125rem' }} />
          <div>
            <h4 style={{ fontSize: '.9375rem', fontWeight: 700, color: 'var(--emerald)', margin: '0 0 .25rem' }}>9 Verified Kits Ready for Instant Submission</h4>
            <p style={{ fontSize: '.875rem', color: 'var(--ink-3)', margin: 0, lineHeight: 1.65 }}>100% execution-tested code, 60-page IEEE Black Book (.docx), defense presentation slides, and top 25 Viva Q&amp;A. Checkout → instant download.</p>
          </div>
        </div>
      )}
      {status === 'UPCOMING' && (
        <div style={{ display: 'flex', gap: '.875rem', padding: '1rem 1.25rem', borderRadius: '14px', background: 'var(--amber-50)', border: '1px solid var(--amber-100)', marginBottom: '2rem' }}>
          <Clock style={{ width: '1.25rem', height: '1.25rem', color: '#D97706', flexShrink: 0, marginTop: '.125rem' }} />
          <div>
            <h4 style={{ fontSize: '.9375rem', fontWeight: 700, color: '#92400E', margin: '0 0 .25rem' }}>Pre-Order Early Access Pipeline</h4>
            <p style={{ fontSize: '.875rem', color: '#B45309', margin: 0, lineHeight: 1.65 }}>These projects are in active QA and Black Book formatting. Pre-book now for ₹299 (Mini) / ₹499 (Major) to lock in 50% early bird discount and receive priority delivery.</p>
          </div>
        </div>
      )}

      {/* ── Active Filter Indicator ── */}
      {(tier !== 'ALL' || cat !== 'ALL' || query.trim() || status !== 'ALL') && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '.75rem', color: 'var(--ink-4)', fontWeight: 600 }}>
            Showing {displayed.length} of {initialProjects.length} projects
          </span>
          <button onClick={clearAll} style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--teal-dark)', background: 'none', border: 'none', cursor: 'pointer', padding: '.1875rem .5rem', textDecoration: 'underline', textUnderlineOffset: '2px' }}>
            Clear all
          </button>
        </div>
      )}

      {/* ── Project Grid ── */}
      {displayed.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,22rem),1fr))', gap: '1.25rem' }}>
          {displayed.map(p => (
            /* Entire card is clickable — Link wraps ProjectCard */
            <Link
              key={p.id}
              href={`/projects/${p.slug}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <ProjectCard project={p} onReserve={(name) => { setReserve(name); }} />
            </Link>
          ))}

          {/* Custom Project Card */}
          <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', background: 'linear-gradient(135deg,var(--teal-50) 0%,var(--surface) 100%)', border: '1px solid var(--teal-100)' }}>
            <span className="tag tag-teal" style={{ fontSize: '.6rem', width: 'fit-content', marginBottom: '.875rem' }}>Custom Development</span>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '.5rem' }}>Need a Custom Project from Scratch?</h3>
            <p style={{ fontSize: '.875rem', color: 'var(--ink-3)', lineHeight: 1.65, marginBottom: '1.25rem', flex: 1 }}>
              Specific topic or stack? Our engineers build your exact project with clean code, a technical report, and setup support.
            </p>
            <div style={{ paddingTop: '.875rem', borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: '.5rem', marginBottom: '1rem' }}>
              {[{ l: 'Turnaround', v: '48 Hours', c: 'var(--teal)' }, { l: 'Starting at', v: '₹1,999', c: 'var(--navy)' }].map(r => (
                <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.875rem' }}>
                  <span style={{ color: 'var(--ink-4)' }}>{r.l}</span>
                  <span style={{ fontWeight: 700, color: r.c }}>{r.v}</span>
                </div>
              ))}
            </div>
            <a href={`https://wa.me/918799814256?text=${encodeURIComponent('Hi SubmitKit! I want a custom project. My idea: ')}`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-teal btn-sm"
              style={{ justifyContent: 'center' }}
              onClick={e => e.stopPropagation()}
            >
              <WaIcon /> Submit Idea on WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '32rem', margin: '0 auto' }}>
          <Sparkles style={{ width: '2.5rem', height: '2.5rem', color: 'var(--teal)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '.5rem' }}>No projects match your filters</h3>
          <p style={{ fontSize: '.9375rem', color: 'var(--ink-3)', marginBottom: '1.5rem', lineHeight: 1.65 }}>
            Try clearing filters, or let us build a custom project for you in 48h.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', justifyContent: 'center' }}>
            <a href={`https://wa.me/918799814256?text=${encodeURIComponent('Hi SubmitKit! I need a custom project.')}`}
              target="_blank" rel="noopener noreferrer"
              className="btn btn-teal"
              style={{ padding: '0 1.5rem' }}
            >
              <WaIcon /> Custom on WhatsApp
            </a>
            <button onClick={clearAll} className="btn btn-outline" style={{ padding: '0 1.5rem' }}>
              Clear All Filters
            </button>
          </div>
        </div>
      )}

      {/* ── Pre-Order Modal ── */}
      {reserve && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(15,23,42,.4)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={e => { if (e.target === e.currentTarget) setReserve(null); }}
        >
          <div className="card" style={{ width: '100%', maxWidth: '26rem', padding: '1.75rem', borderRadius: '20px', boxShadow: 'var(--sh-2xl)' }}>
            <div style={{ display: 'flex', gap: '.875rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '12px', background: 'var(--teal-50)', border: '1px solid var(--teal-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Bell style={{ width: '1.25rem', height: '1.25rem', color: 'var(--teal)' }} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', margin: '0 0 .25rem' }}>Pre-Order &amp; Early Access</h4>
                <p style={{ fontSize: '.8125rem', color: 'var(--ink-3)', margin: 0 }}>{reserve}</p>
              </div>
            </div>
            {resOk ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem', padding: '.875rem', borderRadius: '12px', background: 'var(--emerald-50)', border: '1px solid var(--emerald-100)', fontSize: '.875rem', color: 'var(--emerald)', fontWeight: 600 }}>
                <Check style={{ width: '1rem', height: '1rem', flexShrink: 0 }} /> Reserved! You&apos;ll be emailed the moment this drops.
              </div>
            ) : (
              <form onSubmit={onReserveSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
                <p style={{ fontSize: '.875rem', color: 'var(--ink-3)', margin: 0, lineHeight: 1.65 }}>
                  Lock in launch pricing (₹{CONSTANTS.PRICING.MINI_PROJECT}–₹{CONSTANTS.PRICING.MAJOR_PROJECT}) and get emailed the instant this drops.
                </p>
                <input type="email" required placeholder="your@email.com" value={resEmail} onChange={e => setResEmail(e.target.value)} className="input" />
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '.625rem' }}>
                  <button type="button" onClick={() => setReserve(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '.875rem', fontWeight: 600, color: 'var(--ink-3)', padding: '.5rem .75rem' }}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-teal btn-sm">Lock My Reservation</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function WaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
