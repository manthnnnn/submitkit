'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { CONSTANTS } from '@/lib/constants';
import {
  ArrowRight, CheckCircle2, Zap, ShieldCheck,
  Search, ChevronRight, MessageCircle,
  FileText, Presentation, Star, Eye
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

function StatNum({ val, suffix = '', label, color }: { val: number; suffix?: string; label: string; color?: string }) {
  const { n, ref } = useCounter(val);
  return (
    <div ref={ref} className="text-center">
      <div style={{ fontSize: 'clamp(1.875rem,4vw,2.5rem)', fontWeight: 900, letterSpacing: '-.05em', color: color || 'var(--navy)', lineHeight: 1 }}>
        {n.toLocaleString('en-IN')}{suffix}
      </div>
      <div style={{ fontSize: '.75rem', color: 'var(--ink-4)', marginTop: '.375rem', fontWeight: 500 }}>{label}</div>
    </div>
  );
}

const SLIDES = [
  { h: 'Build a project you can actually', accent: 'explain.' },
  { h: 'Stop fixing broken GitHub code.', accent: 'Get verified kits today.' },
  { h: 'IEEE Report. Defense PPT.', accent: 'Running code included.' },
  { h: 'Final year done right —', accent: 'download, run, submit.' },
];

const HOW = [
  { n: '01', t: 'Pick a kit and preview it free',  s: 'See the demo and sample pages before paying' },
  { n: '02', t: 'Download and set up',              s: 'Step-by-step guide included with every kit' },
  { n: '03', t: 'Understand your project',          s: 'Docs and viva Q&A so you can defend your work' },
];

const READY = [
  { n: '01', name: 'PhishGuard AI Threat Radar',    cat: 'AI / ML',     price: MINI,  slug: 'phishing-detector-ai' },
  { n: '02', name: 'QuickBite QR Ordering & KDS',   cat: 'Full Stack',  price: MINI,  slug: 'restaurant-qr-ordering' },
  { n: '03', name: 'SentinelPay AI Fraud Radar',     cat: 'FinTech',     price: MINI,  slug: 'credit-card-fraud' },
  { n: '04', name: 'HealthSync EHR Portal',          cat: 'Healthcare',  price: MAJOR, slug: 'healthcare-ehr-portal' },
];

/* ─── Main page ─── */
export default function HomePage() {
  const router = useRouter();
  const [si, setSi] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setSi(p => (p + 1) % SLIDES.length), 5200);
    return () => clearInterval(id);
  }, []);

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
    <div style={{ background: 'var(--canvas)', overflowX: 'hidden', minHeight: '100vh' }}>

      {/* ── background decoration ── */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }} aria-hidden>
        <div className="aorb" style={{ position: 'absolute', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(13,148,136,.07) 0%,transparent 70%)', top: '-18%', right: '-12%', filter: 'blur(80px)' }} />
        <div className="aorb" style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(217,119,6,.05) 0%,transparent 70%)', bottom: '20%', left: '-10%', filter: 'blur(70px)', animationDelay: '4s' }} />
        <div className="aorb" style={{ position: 'absolute', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle,rgba(13,148,136,.05) 0%,transparent 70%)', bottom: '-5%', right: '25%', filter: 'blur(60px)', animationDelay: '7s' }} />
      </div>

      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section style={{ ...S.section(), paddingTop: '5.25rem', paddingBottom: '0' }}>
        <div className="shell">

          {/* Two-column on lg+, stacked on mobile */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 28rem), 1fr))', gap: '2.5rem 3rem', alignItems: 'center' }}>

            {/* ── LEFT ── */}
            <div style={{ maxWidth: '36rem' }}>

              {/* Label + ticker */}
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}
                style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '.625rem', marginBottom: '1.5rem' }}
              >
                <span className="label-chip">Ready-to-run Project Kits</span>
                <LiveTicker />
              </motion.div>

              {/* Rotating headline */}
              <div style={{ minHeight: 'clamp(5.5rem,12vw,8rem)', display: 'flex', alignItems: 'flex-end', marginBottom: '1.25rem' }}>
                <AnimatePresence mode="wait">
                  <motion.h1
                    key={si}
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: .42, ease: [.25, 1, .5, 1] }}
                    style={{ fontSize: 'clamp(2.5rem,6vw,4.25rem)', fontWeight: 900, letterSpacing: '-.045em', lineHeight: 1.08, color: 'var(--navy)' }}
                  >
                    {SLIDES[si].h}{' '}
                    <em className="text-teal-grad" style={{ fontStyle: 'italic' }}>{SLIDES[si].accent}</em>
                  </motion.h1>
                </AnimatePresence>
              </div>

              {/* Sub */}
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .4, delay: .18 }}
                style={{ fontSize: 'clamp(.9375rem,2vw,1.0625rem)', color: 'var(--ink-3)', lineHeight: 1.75, marginBottom: '1.875rem', maxWidth: '30rem' }}
              >
                Complete final-year kits with source code, documentation and viva prep.{' '}
                <strong style={{ color: 'var(--navy)', fontWeight: 700 }}>Preview every kit</strong> before you spend a rupee.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4, delay: .24 }}
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
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .4, delay: .32 }}
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
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .4, delay: .38 }}
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
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .52, delay: .2 }}
            >
              <PricingHook />
            </motion.div>
          </div>

          {/* ── Focused AI Topic Explorer Hub ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .48, delay: .32 }}
            className="mt-6 sm:mt-10 lg:mt-12 max-w-2xl sm:max-w-3xl mx-auto w-full"
          >
            <AiTopicExplorer />
          </motion.div>

          {/* University trust row */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .5, delay: .55 }}
            className="mt-8 sm:mt-12 pt-6 sm:pt-8 text-center pb-8 sm:pb-12"
            style={{ borderTop: '1px solid var(--line)' }}
          >
            <p style={{ fontSize: '.6875rem', fontWeight: 800, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: '1.125rem' }}>
              Trusted by 500+ students from top universities
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '.625rem 1rem' }}>
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
          STATS STRIP — Frosted Glass Cards
      ════════════════════════════════════════════ */}
      <section style={{ ...S.section(), borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: '2.75rem 0' }}>
        <div className="shell">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(13rem, 1fr))', gap: '1.25rem', maxWidth: '64rem', margin: '0 auto' }}>
            <div className="stat-card">
              <StatNum val={59} suffix="" label="Ready Project Kits" />
            </div>
            <div className="stat-card">
              <StatNum val={CONSTANTS.TOTAL_TOPICS} suffix="+" label="Free Blueprints" />
            </div>
            <div className="stat-card">
              <div style={{ fontSize: 'clamp(1.875rem,4vw,2.5rem)', fontWeight: 900, letterSpacing: '-.05em', color: 'var(--teal)', lineHeight: 1, whiteSpace: 'nowrap' }}>₹1,20,000+</div>
              <div style={{ fontSize: '.75rem', color: 'var(--ink-4)', marginTop: '.375rem', fontWeight: 600 }}>Saved vs Local Vendors</div>
            </div>
            <div className="stat-card">
              <StatNum val={512} suffix="+" label="Final Years Passed" color="var(--navy)" />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          READY KITS LIST
      ════════════════════════════════════════════ */}
      <section className="defer" style={{ ...S.section(), padding: '3.5rem 0' }}>
        <div className="shell">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,30rem), 1fr))', gap: '2.5rem 3rem', alignItems: 'start' }}>

            {/* Left: list */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem', marginBottom: '1rem' }}>
                <span className="tag tag-teal" style={{ fontSize: '.6rem' }}>
                  <span className="dot-live apulse" style={{ width: '5px', height: '5px' }} /> Ready to Ship
                </span>
                <p style={{ fontSize: '.6875rem', fontWeight: 800, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '.1em', margin: 0 }}>Instant Download</p>
              </div>
              <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 900, letterSpacing: '-.04em', color: 'var(--navy)', marginBottom: '1.5rem' }}>Ready to Ship Kits</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '.625rem', marginBottom: '1.375rem' }}>
                {READY.map((item, i) => (
                  <motion.div key={item.n}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ duration: .32, delay: i * .07 }}
                  >
                    <Link href={`/projects/${item.slug}`}
                      style={{ display: 'flex', alignItems: 'center', gap: '.875rem', padding: '1rem 1.25rem', borderRadius: '14px', background: 'var(--surface)', border: '1px solid var(--line)', textDecoration: 'none', transition: 'all 150ms' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--line-teal)'; e.currentTarget.style.background = 'var(--surface-teal)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.background = 'var(--surface)'; }}
                    >
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.75rem', fontWeight: 700, color: 'var(--teal)', width: '1.75rem', flexShrink: 0 }}>{item.n}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '.9375rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.3 }}>{item.name}</div>
                        <div style={{ fontSize: '.75rem', color: 'var(--ink-4)', marginTop: '.125rem' }}>{item.cat}</div>
                      </div>
                      <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', flexShrink: 0 }}>₹{item.price}</span>
                      <ArrowRight style={{ width: '.9375rem', height: '.9375rem', color: 'var(--teal)', flexShrink: 0 }} />
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

            {/* Right: blueprint + custom cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Blueprint card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .42 }}
                className="card-teal"
                style={{ padding: '2rem 1.75rem', overflow: 'hidden', position: 'relative' }}
              >
                <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', fontSize: '7rem', fontWeight: 900, color: 'rgba(13,148,136,.07)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', fontFamily: 'var(--font-display)' }}>1K</div>
                <span className="label-chip" style={{ marginBottom: '1rem', display: 'inline-flex', position: 'relative', zIndex: 1 }}>Topic Blueprints</span>
                <div style={{ fontSize: 'clamp(2.5rem,5vw,3.5rem)', fontWeight: 900, letterSpacing: '-.055em', color: 'var(--navy)', lineHeight: 1, marginBottom: '.5rem', position: 'relative', zIndex: 1 }}>1,078</div>
                <p style={{ fontSize: '.9375rem', color: 'var(--ink-2)', fontWeight: 600, marginBottom: '.375rem', position: 'relative', zIndex: 1 }}>Topic Blueprints — 100% Free</p>
                <p style={{ fontSize: '.875rem', color: 'var(--ink-3)', lineHeight: 1.7, marginBottom: '1.375rem', maxWidth: '20rem', position: 'relative', zIndex: 1 }}>
                  Abstract, base paper, architecture and module breakdown. Completely free for all engineering students.
                </p>
                <Link href="/blueprint" className="btn btn-teal" style={{ minHeight: '44px', fontSize: '.9375rem', position: 'relative', zIndex: 1 }}>
                  Browse Blueprints <ArrowRight style={{ width: '.9375rem', height: '.9375rem' }} />
                </Link>
              </motion.div>

              {/* Custom build card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .42, delay: .1 }}
                className="card"
                style={{ padding: '1.5rem 1.75rem' }}
              >
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--navy)', letterSpacing: '-.025em', marginBottom: '.5rem' }}>Have your own idea?</h3>
                <p style={{ fontSize: '.9rem', color: 'var(--ink-3)', lineHeight: 1.65, marginBottom: '1.25rem' }}>
                  We build custom projects with you, from topic selection to final documentation.
                </p>
                <a
                  href={`https://wa.me/918799814256?text=${encodeURIComponent('Hi SubmitKit! I need a custom project. My idea:')}`}
                  target="_blank" rel="noopener noreferrer"
                  className="btn btn-navy"
                  style={{ minHeight: '48px', fontSize: '.9375rem', gap: '.5rem' }}
                >
                  <WaIcon size={16} />
                  Chat on WhatsApp
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          HOW IT WORKS
      ════════════════════════════════════════════ */}
      <section className="defer" style={{ ...S.section(), borderTop: '1px solid var(--line)', padding: '3.5rem 0' }}>
        <div className="shell">
          <p style={{ fontSize: '.6875rem', fontWeight: 800, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '.1em', marginBottom: '1rem' }}>How It Works</p>
          <h2 style={{ fontSize: 'clamp(1.75rem,4vw,2.5rem)', fontWeight: 900, letterSpacing: '-.04em', color: 'var(--navy)', marginBottom: '2.25rem' }}>
            Preview first. Always.
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,16rem), 1fr))', gap: '1.5rem' }}>
            {HOW.map((s, i) => (
              <motion.div key={s.n}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: .38, delay: i * .1 }}
                style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
              >
                <div style={{ width: '2.75rem', height: '2.75rem', borderRadius: '12px', flexShrink: 0, background: 'var(--surface-teal)', border: '1px solid var(--teal-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '.875rem', fontWeight: 800, color: 'var(--teal)' }}>
                  {s.n}
                </div>
                <div>
                  <div style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.35, marginBottom: '.3125rem' }}>{s.t}</div>
                  <div style={{ fontSize: '.9rem', color: 'var(--ink-3)' }}>{s.s}</div>
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
      <section className="defer" style={{ ...S.section(), padding: '4rem 1rem 5rem' }}>
        <div className="shell" style={{ maxWidth: '52rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,253,250,0.85) 55%, rgba(250,247,242,0.9) 100%)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--line)',
            borderRadius: '28px',
            boxShadow: 'var(--sh-xl)',
            padding: ' clamp(2.5rem, 6vw, 4.5rem) clamp(1.5rem, 4vw, 3rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Ambient decorative glow */}
            <div style={{ position: 'absolute', top: '-40%', right: '-20%', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(13,148,136,.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

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
              <a href="https://wa.me/918799814256" target="_blank" rel="noopener noreferrer"
                className="btn btn-wa btn-lg"
              >
                <WaIcon size={18} />
                WhatsApp Support
              </a>
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
