'use client';

import { ProjectCard } from '@/components/ui/project-card';
import { Project } from '@/lib/types';
import { Clock, CheckCircle2, Sparkles, Search, ArrowRight, Bell, Check } from 'lucide-react';
import { isProjectAvailable } from '@/lib/available-projects';
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CONSTANTS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { AirplaneLogo } from '@/components/ui/logo';

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
          <span style={{ fontSize: '.6875rem', fontWeight: 800, padding: '.2rem .65rem', borderRadius: '9999px', background: '#FDF6F2', color: '#E55729', border: '1px solid #F3CFBF', textTransform: 'uppercase', letterSpacing: '.04em', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
            <AirplaneLogo size={12} color="#E55729" /> SubmitKit Systems
          </span>
          <span style={{ fontSize: '.6875rem', fontWeight: 700, padding: '.2rem .65rem', borderRadius: '9999px', background: '#FAF5EE', color: '#18181B', border: '1px solid #EFE6DC', display: 'inline-flex', alignItems: 'center', gap: '.35rem' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#E55729' }} />
            {availCount} Ready to Ship
          </span>
          <span style={{ fontSize: '.6875rem', fontWeight: 700, padding: '.2rem .65rem', borderRadius: '9999px', background: '#FFFBEB', color: '#B45309', border: '1px solid #FDE68A', display: 'inline-flex', alignItems: 'center', gap: '.35rem' }}>
            <Clock style={{ width: '.75rem', height: '.75rem' }} />
            {upCount} Upcoming
          </span>
        </div>
        <h1 className="font-display font-black" style={{ fontSize: 'clamp(2rem,5vw,3.25rem)', letterSpacing: '-.04em', color: '#18181B', marginBottom: '.875rem', lineHeight: 1.15 }}>
          Production Software Systems.{' '}
          <span style={{
            color: '#E55729',
            background: 'linear-gradient(135deg, #EE6E44 0%, #E55729 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Ready to Run &amp; Deploy.
          </span>
        </h1>
        <p style={{ fontSize: 'clamp(.9375rem,2vw,1.1rem)', color: '#52525B', maxWidth: '44rem', lineHeight: 1.7 }}>
          Pre-made software systems (₹299) and production systems (₹499) for college students. Need a ready-made project for your resume or want to enhance your profile for placements? Download, execute with 1-click, and submit with full IEEE documentation.
        </p>
      </div>

      {/* ── Build Startup Idea / Custom Build Banner ── */}
      <div style={{
        padding: 'clamp(1rem, 3vw, 1.375rem) clamp(1rem, 3vw, 1.5rem)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '2rem',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, #FDF6F2 0%, #FFFFFF 100%)',
        border: '1.5px solid #F3CFBF',
        boxShadow: '0 4px 16px rgba(229, 87, 41, 0.08)',
        transition: 'all 200ms cubic-bezier(.16, 1, .3, 1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.875rem' }}>
          <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '12px', flexShrink: 0, background: '#FFFFFF', border: '1px solid #F3CFBF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <AirplaneLogo size={18} color="#E55729" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem', flexWrap: 'wrap', marginBottom: '.3125rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#18181B', margin: 0, letterSpacing: '-.02em' }}>
                Custom College Projects &amp; Startup Ideas Execution
              </h3>
              <span style={{ fontSize: '.625rem', fontWeight: 800, padding: '.15rem .5rem', borderRadius: '9999px', background: '#FFFFFF', color: '#E55729', border: '1px solid #F3CFBF' }}>
                48–72h Turnaround
              </span>
            </div>
            <p style={{ fontSize: '.84375rem', color: '#52525B', margin: 0 }}>
              Have an approved college topic or a custom startup idea? Senior engineers build your project from scratch with IEEE report &amp; 1-on-1 walkthrough ·{' '}
              <strong style={{ color: '#CB451A' }}>Starts ₹1,999 (48–72h delivery)</strong>
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexWrap: 'wrap' }}>
          <Link
            href="/custom"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.375rem',
              padding: '.55rem 1.15rem',
              borderRadius: '9999px',
              background: '#18181B',
              color: '#FFFFFF',
              fontSize: '.8125rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 2px 8px rgba(24, 24, 27, 0.25)',
              transition: 'all 200ms cubic-bezier(.16, 1, .3, 1)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#27272A';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#18181B';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <span>Build Custom Project</span>
            <ArrowRight style={{ width: '.8125rem', height: '.8125rem' }} />
          </Link>
          <a
            href={`https://wa.me/918799814256?text=${encodeURIComponent('Hi SubmitKit! I want to customize a project or startup idea.\n\nTopic:\nTech Stack:\nFeatures:\nDeadline:')}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.4rem',
              padding: '.5rem 1.25rem',
              borderRadius: '9999px',
              background: '#FFFFFF',
              color: '#18181B',
              border: '1.5px solid #EFE6DC',
              fontSize: '.84375rem',
              fontWeight: 650,
              textDecoration: 'none',
              transition: 'all 200ms cubic-bezier(.16, 1, .3, 1)',
            }}
          >
            <WaIcon />
            WhatsApp
          </a>
        </div>
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

      {/* ── Status Tabs (Aesthetic Segmented Control with Fluid Slide) ── */}
      <div className="scroll-x no-scrollbar" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '.25rem', padding: '.25rem', borderRadius: '12px', background: 'var(--surface-2)', border: '1px solid var(--line)', marginBottom: '1.25rem', maxWidth: '100%' }}>
        {([
          { v: 'AVAILABLE', label: 'Ready to Ship',      n: availCount,             live: true },
          { v: 'UPCOMING',  label: 'Pre-Order Pipeline', n: upCount,                live: false },
          { v: 'ALL',       label: 'All Project Kits',   n: initialProjects.length, live: false },
        ] as const).map(({ v, label, n, live }) => {
          const active = status === v;
          return (
            <motion.button
              key={v}
              onClick={() => setStatus(v)}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
              className="shrink-0 whitespace-nowrap"
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.5rem',
                padding: '.5rem .875rem',
                borderRadius: '9px',
                border: 'none',
                fontSize: '.8125rem',
                fontWeight: active ? 700 : 500,
                cursor: 'pointer',
                background: 'transparent',
                color: active ? 'var(--navy)' : 'var(--ink-4)',
                zIndex: 1,
              }}
            >
              {active && (
                <motion.div
                  layoutId="catalog-status-pill"
                  transition={{ type: 'spring', stiffness: 440, damping: 32 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '9px',
                    background: 'var(--surface)',
                    boxShadow: '0 2px 6px rgba(60,40,10,0.07), 0 1px 2px rgba(0,0,0,0.04)',
                    zIndex: -1,
                  }}
                />
              )}
              {live && (
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E55729', display: 'inline-block' }} />
              )}
              <span>{label}</span>
              <span
                style={{
                  padding: '.125rem .5rem',
                  borderRadius: '9999px',
                  fontSize: '.6875rem',
                  fontWeight: 700,
                  background: active ? '#FDF6F2' : '#F4EBE0',
                  color: active ? '#E55729' : 'var(--ink-4)',
                  border: active ? '1px solid #F3CFBF' : '1px solid transparent',
                  transition: 'all 150ms ease',
                }}
              >
                {n}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* ── Unified Filter Toolbar: Startup Software vs Engineering Systems ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '.875rem', marginBottom: '2rem' }}>
        {/* Tier filter segmented track */}
        <div className="scroll-x no-scrollbar max-w-full" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '.25rem', padding: '.25rem', background: '#F0E6DA', border: '1px solid #E5D8CA', borderRadius: '10px' }}>
          {(['ALL', 'MAJOR', 'MINI'] as TierFilter[]).map(t => {
            const active = tier === t;
            return (
              <motion.button
                key={t}
                onClick={() => handleTierChange(t)}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                className="shrink-0 whitespace-nowrap"
                style={{
                  position: 'relative',
                  padding: '.45rem .85rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '.8125rem',
                  fontWeight: active ? 750 : 550,
                  cursor: 'pointer',
                  background: 'transparent',
                  color: active ? '#18181B' : '#71717A',
                  zIndex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                {active && (
                  <motion.div
                    layoutId="catalog-tier-pill"
                    transition={{ type: 'spring', stiffness: 440, damping: 32 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '8px',
                      background: '#FFFFFF',
                      boxShadow: '0 1px 3px rgba(60,40,10,0.07)',
                      zIndex: -1,
                    }}
                  />
                )}
                <span>
                  {t === 'ALL'
                    ? 'All Systems (11)'
                    : t === 'MAJOR'
                    ? 'Production Systems (₹499)'
                    : 'Software Systems (₹299)'}
                </span>
                {t === 'MAJOR' && (
                  <span style={{ fontSize: '.5625rem', fontWeight: 800, padding: '.1rem .4rem', borderRadius: '4px', background: active ? '#FDF6F2' : '#FFFFFF', color: '#E55729', border: '1px solid #F3CFBF' }}>
                    Production-Grade
                  </span>
                )}
                {t === 'MINI' && (
                  <span style={{ fontSize: '.5625rem', fontWeight: 800, padding: '.1rem .4rem', borderRadius: '4px', background: active ? '#FAF5EE' : '#FFFFFF', color: '#52525B', border: '1px solid #EFE6DC' }}>
                    Pre-Made Kit
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Category domain pills */}
        <div className="scroll-x" style={{ display: 'flex', alignItems: 'center', gap: '.375rem', flex: 1, minWidth: 'min(100%, 18rem)', paddingBottom: '2px' }}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            onClick={() => handleCatChange('ALL')}
            style={{
              padding: '.375rem .8125rem',
              borderRadius: '9999px',
              border: `1px solid ${cat === 'ALL' ? '#F3CFBF' : '#EFE6DC'}`,
              background: cat === 'ALL' ? '#FDF6F2' : '#FFFFFF',
              color: cat === 'ALL' ? '#E55729' : 'var(--ink-3)',
              fontSize: '.75rem',
              fontWeight: cat === 'ALL' ? 700 : 500,
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 140ms ease',
            }}
          >
            All Domains
          </motion.button>
          {categories.map(c => {
            const active = cat === c;
            return (
              <motion.button
                key={c}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                onClick={() => handleCatChange(c)}
                style={{
                  padding: '.375rem .8125rem',
                  borderRadius: '9999px',
                  border: `1px solid ${active ? '#F3CFBF' : '#EFE6DC'}`,
                  background: active ? '#FDF6F2' : '#FFFFFF',
                  color: active ? '#E55729' : 'var(--ink-3)',
                  fontSize: '.75rem',
                  fontWeight: active ? 700 : 500,
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 140ms ease',
                }}
              >
                {c}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── Context Banners (Zero Green) ── */}
      {status === 'AVAILABLE' && (
        <div style={{ display: 'flex', gap: '.875rem', padding: '1rem 1.25rem', borderRadius: '16px', background: '#FDF6F2', border: '1.5px solid #F3CFBF', marginBottom: '2rem' }}>
          <div style={{ width: '2rem', height: '2rem', borderRadius: '8px', background: '#FFFFFF', border: '1px solid #F3CFBF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AirplaneLogo size={14} color="#E55729" />
          </div>
          <div>
            <h4 style={{ fontSize: '.9375rem', fontWeight: 800, color: '#18181B', margin: '0 0 .25rem' }}>11 Verified Systems Ready for Instant Launch</h4>
            <p style={{ fontSize: '.84375rem', color: '#52525B', margin: 0, lineHeight: 1.65 }}>100% execution-tested code, double-click run.bat launcher, 60-page IEEE standard report (.docx), and defense presentation slides.</p>
          </div>
        </div>
      )}
      {status === 'UPCOMING' && (
        <div style={{ display: 'flex', gap: '.875rem', padding: '1rem 1.25rem', borderRadius: '16px', background: '#FAF5EE', border: '1.5px solid #EFE6DC', marginBottom: '2rem' }}>
          <Clock style={{ width: '1.25rem', height: '1.25rem', color: '#71717A', flexShrink: 0, marginTop: '.125rem' }} />
          <div>
            <h4 style={{ fontSize: '.9375rem', fontWeight: 800, color: '#18181B', margin: '0 0 .25rem' }}>Early Access Pipeline</h4>
            <p style={{ fontSize: '.84375rem', color: '#52525B', margin: 0, lineHeight: 1.65 }}>These architectures are in final verification and documentation formatting. Pre-book now to lock in 50% early bird access and priority handover.</p>
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

      {/* ── Project Grid with Staggered 3D Reveal ── */}
      {displayed.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%,22rem),1fr))', gap: '1.25rem', perspective: 1200 }}>
          {displayed.map((p, idx) => (
            /* Entire card is clickable — Link wraps ProjectCard */
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 22, rotateX: 2.5, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              transition={{
                duration: 0.52,
                delay: Math.min(idx * 0.05, 0.35),
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ perspective: 1000 }}
            >
              <Link
                href={`/projects/${p.slug}`}
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <ProjectCard project={p} onReserve={(name) => { setReserve(name); }} />
              </Link>
            </motion.div>
          ))}

          {/* Custom Project Card */}
          <motion.div
            initial={{ opacity: 0, y: 22, rotateX: 2.5, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            transition={{ duration: 0.52, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1000 }}
          >
            <div className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', background: 'linear-gradient(145deg, #FFFFFF 0%, #FDF6F2 55%, #FAEDE5 100%)', border: '1.5px solid #F3CFBF', borderRadius: '20px', height: '100%', boxShadow: '0 4px 16px rgba(229, 87, 41, 0.08)' }}>
              <span style={{ fontSize: '.625rem', fontWeight: 800, padding: '.15rem .55rem', borderRadius: '9999px', background: '#FFFFFF', color: '#E55729', border: '1px solid #F3CFBF', width: 'fit-content', marginBottom: '.875rem', textTransform: 'uppercase', letterSpacing: '.04em' }}>
                Custom Engineering
              </span>
              <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#18181B', marginBottom: '.5rem', letterSpacing: '-.02em' }}>
                Need Custom Software Built from Scratch?
              </h3>
              <p style={{ fontSize: '.84375rem', color: '#52525B', lineHeight: 1.65, marginBottom: '1.25rem', flex: 1 }}>
                Specific problem statement or custom stack? Senior software engineers build 100% of your code, UI, database, documentation, and walkthrough.
              </p>
              <div style={{ paddingTop: '.875rem', borderTop: '1px dashed rgba(229, 87, 41, 0.25)', display: 'flex', flexDirection: 'column', gap: '.5rem', marginBottom: '1.25rem' }}>
                {[{ l: 'Turnaround', v: '48–72 Hours', c: '#CB451A' }, { l: 'Starting at', v: '₹1,999*', c: '#18181B' }].map(r => (
                  <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.84375rem' }}>
                    <span style={{ color: '#71717A' }}>{r.l}</span>
                    <span style={{ fontWeight: 750, color: r.c }}>{r.v}</span>
                  </div>
                ))}
              </div>
              <a href={`https://wa.me/918799814256?text=${encodeURIComponent('Hi SubmitKit! I want a custom project / startup build. My idea: ')}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  justifyContent: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '.45rem',
                  padding: '.625rem 1.25rem',
                  borderRadius: '9999px',
                  background: '#18181B',
                  color: '#FFFFFF',
                  fontSize: '.84375rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 2px 6px rgba(24, 24, 27, 0.25)',
                  transition: 'all 200ms cubic-bezier(.16, 1, .3, 1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#27272A';
                  e.currentTarget.style.transform = 'translateY(-1px) scale(1.02)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#18181B';
                  e.currentTarget.style.transform = 'none';
                }}
                onClick={e => e.stopPropagation()}
              >
                <WaIcon /> Submit Idea on WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      ) : (
        <div className="card" style={{ padding: '4rem 2rem', textAlign: 'center', maxWidth: '32rem', margin: '0 auto', background: '#FFFFFF', border: '1.5px solid #EFE6DC', borderRadius: '20px' }}>
          <Sparkles style={{ width: '2.5rem', height: '2.5rem', color: '#E55729', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#18181B', marginBottom: '.5rem' }}>No projects match your filters</h3>
          <p style={{ fontSize: '.9375rem', color: '#52525B', marginBottom: '1.5rem', lineHeight: 1.65 }}>
            Try clearing filters, or let us build a custom project for you in 48h.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', justifyContent: 'center' }}>
            <a href={`https://wa.me/918799814256?text=${encodeURIComponent('Hi SubmitKit! I need a custom project.')}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.4rem',
                padding: '.625rem 1.5rem',
                borderRadius: '9999px',
                background: '#18181B',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '.875rem',
                textDecoration: 'none',
                boxShadow: '0 2px 6px rgba(24, 24, 27, 0.25)',
              }}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem', padding: '.875rem', borderRadius: '12px', background: '#FDF6F2', border: '1px solid #F3CFBF', fontSize: '.875rem', color: '#E55729', fontWeight: 650 }}>
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
