'use client';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CONSTANTS } from '@/lib/constants';
import {
  ArrowRight, CheckCircle2, Zap, ShieldCheck, Star,
  Package, BookOpen, Award
} from 'lucide-react';
import { PricingHook } from '@/components/ui/pricing-hook';
import { FleetSection } from '@/components/ui/fleet-section';
import { Testimonials } from '@/components/ui/testimonials';
import { LiveTicker } from '@/components/ui/live-ticker';
import { AiTopicExplorer } from '@/components/ui/ai-topic-explorer';
import { useEffect, useState, useRef } from 'react';

/* ─── types ─── */
interface SR { id: string; title: string; category: string; tagline: string; }

const MINI  = CONSTANTS.PRICING.MINI_PROJECT;
const MAJOR = CONSTANTS.PRICING.MAJOR_PROJECT;

/* ─── animated counter ─── */
function useCounter(target: number, dur = 1600) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        const t0 = performance.now();
        const frame = (now: number) => {
          const p = Math.min((now - t0) / dur, 1);
          setN(Math.floor((1 - (1 - p) ** 3) * target));
          if (p < 1) requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
      }
    }, { threshold: 0.15 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [target, dur]);
  return { n, ref };
}

function StatCard({
  icon: Icon,
  val,
  suffix = '',
  label,
  accent = '#0D9488',
  bg = 'rgba(13,148,136,0.08)',
  border = 'rgba(13,148,136,0.18)',
  customVal,
}: {
  icon: any;
  val?: number;
  suffix?: string;
  label: string;
  accent?: string;
  bg?: string;
  border?: string;
  customVal?: string;
}) {
  const { n, ref } = useCounter(val || 0);
  return (
    <div
      ref={ref}
      className="card card-lift group home-stat-card"
      style={{
        padding: '1.25rem 1.125rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        borderRadius: 'var(--r-xl)',
        boxShadow: 'var(--sh-sm)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Top micro squircle */}
      <div
        className="w-8 h-8 rounded-xl mb-2.5 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform"
        style={{ background: bg, border: `1px solid ${border}` }}
      >
        <Icon className="w-4 h-4" style={{ color: accent }} />
      </div>

      {/* Main Metric Value — strictly non-wrapping */}
      <div
        className="font-display font-black tracking-tight leading-none whitespace-nowrap"
        style={{
          fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
          color: customVal ? accent : 'var(--navy)',
        }}
      >
        {customVal || `${n.toLocaleString('en-IN')}${suffix}`}
      </div>

      {/* Metric Label */}
      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mt-1.5 whitespace-nowrap">
        {label}
      </div>
    </div>
  );
}

const HOW = [
  { n: '01', t: 'Pick a kit and preview it free',  s: 'See the demo and sample pages before paying' },
  { n: '02', t: 'Download and set up',              s: 'Step-by-step guide included with every kit' },
  { n: '03', t: 'Understand your project',          s: 'Docs and viva Q&A so you can defend your work' },
];

const HERO_HOOKS = [
  { lead: 'Final-year project kits,', accent: 'ready to submit.' },
  { lead: 'Working code + IEEE report,', accent: 'one download.' },
  { lead: 'Build a project', accent: 'you can actually explain.' },
  { lead: 'Preview free. Pay ₹299.', accent: 'Submit with confidence.' },
];

const READY = [
  { n: '01', name: 'PhishGuard AI Threat Radar',    cat: 'AI / ML',     price: MINI,  slug: 'phishing-detector-ai' },
  { n: '02', name: 'QuickBite QR Ordering & KDS',   cat: 'Full Stack',  price: MINI,  slug: 'restaurant-qr-ordering' },
  { n: '03', name: 'SentinelPay AI Fraud Radar',     cat: 'FinTech',     price: MINI,  slug: 'credit-card-fraud' },
  { n: '04', name: 'HealthSync EHR Portal',          cat: 'Healthcare',  price: MAJOR, slug: 'healthcare-ehr-portal' },
];

/* ─── Main page ─── */
export default function HomePage() {
  const [activeHook, setActiveHook] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setActiveHook(index => (index + 1) % HERO_HOOKS.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

  /* ─ inline style helpers ─ */
  const S = {
    section: (bg?: string): React.CSSProperties => ({
      position: 'relative',
      zIndex: 1,
      background: bg || 'transparent',
      padding: '3rem 0',
    }),
    row: (gap?: string): React.CSSProperties => ({
      display: 'flex',
      flexWrap: 'wrap' as const,
      gap: gap || '1rem',
    }),
  };

  return (
    <div className="home-page" style={{ background: 'var(--canvas)', overflowX: 'hidden', minHeight: '100vh' }}>

      {/* ── background decoration ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }} aria-hidden>
        <div className="aorb" style={{ position: 'absolute', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(13,148,136,.07) 0%,transparent 70%)', top: '-18%', right: '-12%', filter: 'blur(80px)' }} />
        <div className="aorb" style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(217,119,6,.05) 0%,transparent 70%)', bottom: '20%', left: '-10%', filter: 'blur(70px)', animationDelay: '4s' }} />
        <div className="aorb" style={{ position: 'absolute', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(13,148,136,.05) 0%,transparent 70%)', bottom: '-5%', right: '25%', filter: 'blur(60px)', animationDelay: '7s' }} />
      </div>

      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section className="home-hero" style={{ ...S.section(), paddingTop: '5.25rem', paddingBottom: '0' }}>
        <div className="shell">

          {/* Two-column on lg+, stacked on mobile */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 28rem), 1fr))', gap: '2.5rem 3rem', alignItems: 'center' }}>

            {/* ── LEFT ── */}
            <div className="home-hero-copy" style={{ maxWidth: '36rem' }}>

              {/* Label + ticker */}
              <motion.div
                initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}
                className="home-hero-eyebrow"
                style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '.625rem', marginBottom: '1.5rem' }}
              >
                <span className="label-chip">Final-year project kits</span>
                <span className="home-live-ticker"><LiveTicker /></span>
              </motion.div>

              <div className="home-hero-title-wrap">
                <motion.h1
                  initial={false} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: .42, ease: [.32, .72, 0, 1] }}
                  className="home-hero-title"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={activeHook}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: .24, ease: [.32, .72, 0, 1] }}
                    >
                      {HERO_HOOKS[activeHook].lead}{' '}
                      <em className="text-teal-grad">{HERO_HOOKS[activeHook].accent}</em>
                    </motion.span>
                  </AnimatePresence>
                </motion.h1>
              </div>

              {/* Sub */}
              <motion.p
                initial={false} animate={{ opacity: 1 }} transition={{ duration: .35, delay: .05 }}
                className="home-hero-description"
                style={{ fontSize: 'clamp(.9375rem,2vw,1.0625rem)', color: 'var(--ink-3)', lineHeight: 1.75, marginBottom: '1.875rem', maxWidth: '30rem' }}
              >
                Complete project kits with working code, an IEEE report, presentation slides and viva prep.{' '}
                <strong style={{ color: 'var(--navy)', fontWeight: 700 }}>Preview free</strong> before you buy.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: .35, delay: .1 }}
                className="home-hero-actions"
                style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', marginBottom: '2rem' }}
              >
                <Link href="/projects" className="btn btn-navy btn-lg">
                  Browse Projects
                </Link>
                <Link href="/blueprint" className="btn btn-outline btn-lg">
                  Free Previews
                </Link>
              </motion.div>

              {/* Deliverable pills */}
              <motion.div
                initial={false} animate={{ opacity: 1 }} transition={{ duration: .35, delay: .15 }}
                className="home-deliverables"
                style={{ display: 'flex', flexWrap: 'wrap', gap: '.625rem .875rem', marginBottom: '2rem' }}
              >
                {['Source code', 'IEEE Black Book', 'Defense PPT', 'Viva Q&A'].map(t => (
                  <span key={t} className="pill-check">
                    <span className="dot" />
                    {t}
                  </span>
                ))}
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={false} animate={{ opacity: 1 }} transition={{ duration: .35, delay: .2 }}
                className="home-social-proof"
                style={{ display: 'flex', alignItems: 'center', gap: '.875rem', paddingTop: '1.375rem', borderTop: '1px solid var(--line)' }}
              >
                <div style={{ display: 'flex' }}>
                  {['VK', 'RS', 'PN', 'AP'].map((init, i) => (
                    <div key={i} style={{
                      width: '2.125rem', height: '2.125rem', borderRadius: '50%',
                      border: '2.5px solid var(--surface)',
                      background: ['#E6F7F5', '#ECFDF5', '#F5F3FF', '#FFFBEB'][i],
                      color: ['#0A7C72', '#059669', '#7C3AED', '#D97706'][i],
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '.6rem', fontWeight: 800, marginLeft: i > 0 ? '-8px' : 0,
                      boxShadow: 'var(--sh-xs)',
                    }}>{init}</div>
                  ))}
                </div>
                <div>
                  <div style={{ display: 'flex', gap: '1px', marginBottom: '.125rem' }}>
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} style={{ width: '13px', height: '13px', fill: '#F59E0B', color: '#F59E0B' }} />)}
                  </div>
                  <span style={{ fontSize: '.875rem', color: 'var(--ink-3)' }}>
                    Trusted by <strong style={{ color: 'var(--navy)', fontWeight: 700 }}>500+</strong> students across India
                  </span>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Pricing card ── */}
            <motion.div
              initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: .1 }}
            >
              <div className="home-hero-pricing"><PricingHook /></div>
            </motion.div>
          </div>

          {/* ── Focused AI Topic Explorer Hub ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .45, delay: .18 }}
            className="home-topic-explorer mt-8 sm:mt-12 lg:mt-14 max-w-5xl mx-auto w-full"
          >
            <AiTopicExplorer />
          </motion.div>
          <Link href="/blueprint" className="home-topic-quick-link">
            <BookOpen aria-hidden="true" />
            <span>Explore 1,078 free topic blueprints</span>
            <ArrowRight aria-hidden="true" />
          </Link>

          {/* University trust row */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .4, delay: .3 }}
            className="home-university-trust mt-8 sm:mt-12 pt-6 sm:pt-8 text-center pb-8 sm:pb-12"
            style={{ borderTop: '1px solid var(--line)' }}
          >
            <p style={{ fontSize: '.6875rem', fontWeight: 800, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: '1.125rem' }}>
              Trusted by 500+ students from top universities
            </p>
            <div className="home-university-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '.625rem 1rem' }}>
              {CONSTANTS.UNIVERSITIES.map(u => (
                <span key={u}
                  style={{
                    fontSize: '.875rem', fontWeight: 600, color: 'var(--ink-2)',
                    background: 'var(--canvas-warm)', border: '1px solid var(--line)',
                    borderRadius: '9999px', padding: '.375rem .875rem',
                    boxShadow: 'var(--sh-xs)',
                    display: 'inline-flex', alignItems: 'center', gap: '.375rem',
                    transition: 'all 150ms ease'
                  }}
                >
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--teal)', opacity: .7 }} />
                  {u}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STATS STRIP — 3D Tactile Metric Dock
      ════════════════════════════════════════════ */}
      <section className="home-stats" style={{ ...S.section(), borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '2.5rem 0' }}>
        <div className="shell">
          <div className="home-stat-track" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 1fr))', gap: '1.25rem', maxWidth: '66rem', margin: '0 auto' }}>
            <StatCard icon={Package} val={59} suffix="" label="Ready Project Kits" accent="#0D9488" bg="#F0FDFA" border="rgba(13,148,136,0.2)" />
            <StatCard icon={BookOpen} val={CONSTANTS.TOTAL_TOPICS} suffix="+" label="Free Blueprints" accent="#0F766E" bg="#ECFDF5" border="rgba(5,150,105,0.2)" />
            <StatCard icon={ShieldCheck} customVal="₹1,20,000+" label="Saved vs Local Vendors" accent="#059669" bg="#F0FDF4" border="rgba(5,150,105,0.2)" />
            <StatCard icon={Award} val={512} suffix="+" label="Final Years Passed" accent="#D97706" bg="#FFFBEB" border="rgba(217,119,6,0.2)" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          READY KITS LIST
      ════════════════════════════════════════════ */}
      <section className="home-ready-kits defer" style={{ ...S.section(), padding: '3.75rem 0' }}>
        <div className="shell">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,30rem), 1fr))', gap: '2.5rem 3rem', alignItems: 'start' }}>

            {/* Left: 3D interactive list */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem', marginBottom: '1rem' }}>
                <span className="tag tag-teal" style={{ fontSize: '.6rem' }}>
                  <span className="dot-live apulse" style={{ width: '5px', height: '5px' }} /> Ready to Ship
                </span>
                <p style={{ fontSize: '.6875rem', fontWeight: 800, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '.1em', margin: 0 }}>Instant Download</p>
              </div>
              <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 900, letterSpacing: '-.04em', color: 'var(--navy)', marginBottom: '1.5rem' }}>Ready to Ship Kits</h2>

              <div className="home-ready-track" style={{ display: 'flex', flexDirection: 'column', gap: '.75rem', marginBottom: '1.5rem' }}>
                {READY.map((item, i) => (
                  <motion.div key={item.n}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ duration: .32, delay: i * .07 }}
                  >
                    <Link href={`/projects/${item.slug}`}
                      className="card card-lift group"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '1rem 1.25rem',
                        borderRadius: 'var(--r-lg)',
                        background: 'var(--surface)',
                        border: '1px solid var(--line)',
                        textDecoration: 'none',
                        boxShadow: 'var(--sh-xs)',
                      }}
                    >
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center font-mono text-xs font-black text-teal-800 bg-teal-50 border border-teal-200/80 shrink-0 shadow-2xs">
                        {item.n}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-tight">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {item.cat}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-base font-black text-slate-900 font-display">
                          ₹{item.price}
                        </div>
                        <div className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">
                          Ready
                        </div>
                      </div>
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-slate-50 group-hover:bg-teal-50 text-slate-400 group-hover:text-teal-700 transition-all shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <Link href="/projects" className="btn btn-outline"
                style={{ width: '100%', maxWidth: '24rem', justifyContent: 'center', borderRadius: '12px' }}
              >
                View all project kits <ArrowRight style={{ width: '.9375rem', height: '.9375rem' }} />
              </Link>
            </div>

            {/* Right: 3D blueprint + custom cards */}
            <div className="home-secondary-track" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* 3D Blueprint showcase card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .42 }}
                className="card card-lift home-blueprints-card relative overflow-hidden"
                style={{
                  padding: '2rem 1.75rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--teal-100)',
                  borderRadius: 'var(--r-2xl)',
                  boxShadow: 'var(--sh-sm)',
                }}
              >
                <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '7.5rem', fontWeight: 900, color: 'rgba(13,148,136,.06)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', fontFamily: 'var(--font-display)' }}>1K</div>
                <span className="label-chip" style={{ marginBottom: '1rem', display: 'inline-flex', position: 'relative', zIndex: 1 }}>Topic Blueprints</span>
                <div style={{ fontSize: 'clamp(2.5rem,5vw,3.5rem)', fontWeight: 900, letterSpacing: '-.055em', color: 'var(--navy)', lineHeight: 1, marginBottom: '.5rem', position: 'relative', zIndex: 1 }}>1,078</div>
                <p style={{ fontSize: '.9375rem', color: 'var(--ink-2)', fontWeight: 700, marginBottom: '.375rem', position: 'relative', zIndex: 1 }}>Topic Blueprints — 100% Free</p>
                <p style={{ fontSize: '.875rem', color: 'var(--ink-3)', lineHeight: 1.7, marginBottom: '1.375rem', maxWidth: '22rem', position: 'relative', zIndex: 1 }}>
                  Abstract, base paper, architecture and module breakdown. Completely free for all engineering students.
                </p>
                <Link href="/blueprint" className="btn btn-teal" style={{ minHeight: '46px', fontSize: '.9375rem', position: 'relative', zIndex: 1 }}>
                  Browse Blueprints <ArrowRight style={{ width: '.9375rem', height: '.9375rem' }} />
                </Link>
              </motion.div>

              {/* 3D Custom build card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .42, delay: .1 }}
                className="card card-lift home-custom-card"
                style={{
                  padding: '1.75rem',
                  borderRadius: 'var(--r-2xl)',
                  background: 'var(--surface)',
                  boxShadow: 'var(--sh-sm)',
                }}
              >
                <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.025em', marginBottom: '.5rem' }}>Have your own project idea?</h3>
                <p style={{ fontSize: '.9rem', color: 'var(--ink-3)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  We build custom projects with you, from topic selection and algorithm design to final IEEE documentation.
                </p>
                <Link href="/custom" className="btn btn-navy" style={{ minHeight: '48px', fontSize: '.9375rem', gap: '.5rem', width: '100%', justifyContent: 'center' }}>
                  Request a custom project <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          HOW IT WORKS — 3D Steps
      ════════════════════════════════════════════ */}
      <section className="home-how defer" style={{ ...S.section(), borderTop: '1px solid var(--line)', padding: '3.75rem 0' }}>
        <div className="shell">
          <p style={{ fontSize: '.6875rem', fontWeight: 800, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '1rem' }}>How It Works</p>
          <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 900, letterSpacing: '-.04em', color: 'var(--navy)', marginBottom: '2.25rem' }}>
            Preview first. Always.
          </h2>

          <div className="home-how-track" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,18rem), 1fr))', gap: '1.5rem' }}>
            {HOW.map((s, i) => (
              <motion.div key={s.n}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: .38, delay: i * .1 }}
                className="card card-lift home-how-card"
                style={{
                  padding: '1.75rem',
                  borderRadius: 'var(--r-xl)',
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  background: 'var(--surface)',
                }}
              >
                <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '14px', flexShrink: 0, background: 'var(--surface-teal)', border: '1px solid var(--teal-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '.9375rem', fontWeight: 900, color: 'var(--teal)', boxShadow: '0 2px 6px rgba(13,148,136,0.1)' }}>
                  {s.n}
                </div>
                <div>
                  <div style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.35, marginBottom: '.375rem' }}>{s.t}</div>
                  <div style={{ fontSize: '.875rem', color: 'var(--ink-3)', lineHeight: 1.6 }}>{s.s}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fleet section + Testimonials */}
      <FleetSection />
      <Testimonials />

      {/* ════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════ */}
      <section className="home-final-cta defer" style={{ ...S.section(), padding: '4rem 1rem 5rem' }}>
        <div className="shell" style={{ maxWidth: '52rem' }}>
          <div
            className="home-final-panel relative overflow-hidden"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--teal-100)',
              borderRadius: 'var(--r-2xl)',
              boxShadow: 'var(--sh-lg)',
              padding: 'clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 4vw, 3rem)',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, letterSpacing: '-.04em', color: 'var(--navy)', marginBottom: '.875rem', lineHeight: 1.15, position: 'relative', zIndex: 1 }}>
              Your project kit is waiting.
            </h2>
            <p style={{ fontSize: 'clamp(.9375rem,2vw,1.0625rem)', color: 'var(--ink-3)', lineHeight: 1.8, marginBottom: '2.25rem', position: 'relative', zIndex: 1 }}>
              Mini kits from ₹{MINI} · Major kits from ₹{MAJOR}.<br />
              Preview free. Download instantly. Submit with confidence.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '.875rem', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
              <Link href="/projects" className="btn btn-teal btn-lg">
                Browse All Kits <ArrowRight style={{ width: '1.125rem', height: '1.125rem' }} />
              </Link>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '.75rem 2rem', paddingTop: '2rem', borderTop: '1px solid var(--line)', fontSize: '.875rem', color: 'var(--ink-4)', fontWeight: 600, position: 'relative', zIndex: 1 }}>
              {[
                { Icon: ShieldCheck, t: 'Razorpay Secured' },
                { Icon: Zap,         t: 'Instant Download' },
                { Icon: CheckCircle2,t: 'Bug-Free Guarantee' },
              ].map(({ Icon, t }) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '.375rem' }}>
                  <Icon style={{ width: '.9375rem', height: '.9375rem', color: 'var(--teal)' }} />{t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

/* ─── inline WhatsApp icon ─── */
function WaIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
