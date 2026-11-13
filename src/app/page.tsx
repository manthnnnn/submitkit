'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Zap, ShieldCheck, Globe, Code2,
  Layers, BrainCircuit, Terminal, Package, Sparkles,
  CheckCircle2, ExternalLink, ChevronRight, FileText, Presentation, BookOpen,
  Play, Award, CheckCheck, Laptop, Cpu,
  Activity, Droplet, ShieldAlert, QrCode, Plane, Receipt, Leaf, Newspaper,
  Rocket, GraduationCap
} from 'lucide-react';
import { FaqSection } from '@/components/ui/faq-section';

/* ─── Addictive Dual-Concept Hooks: College Projects & Startup MVPs ─── */
const HERO_HOOKS = [
  { lead: 'Final-year college project due?', accent: 'Get verified code, IEEE report & PPT.' },
  { lead: 'Got a startup idea?', accent: 'Launch your working MVP in days.' },
  { lead: 'Need a ready college kit?', accent: '1-click runnable systems from ₹299.' },
  { lead: 'Turn any software concept', accent: 'into production-ready code.' },
  { lead: 'Stuck on your Viva defense?', accent: 'Ace it with top examiner Q&A.' },
  { lead: 'Custom project or MVP?', accent: 'Our engineers build it from scratch.' },
];

/* ─── 11 Real Flagship Project Kits ─── */
const PROJECTS = [
  {
    slug: 'healthcare-ehr-portal',
    shortName: 'HealthSync OS',
    systemType: 'Real-Time Hospital Telemetry',
    Icon: Activity,
    metric: 'Sub-10ms Vital Stream',
    name: 'HealthSync Hospital & Telehealth Portal',
    category: 'Healthcare',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    desc: 'Full hospital network with live patient vital monitors, doctor appointment scheduling, and automated medicine clash detection.',
    price: 499,
    tier: 'MAJOR',
    color: '#0D9488',
    bgGradient: 'linear-gradient(135deg, #F0FDFA 0%, #E6FFFA 50%, #CCFBF1 100%)',
    border: '#99F6E4',
  },
  {
    slug: 'blood-bank-management',
    shortName: 'LifeDrop OS',
    systemType: 'Emergency Blood Logistics',
    Icon: Droplet,
    metric: 'Live Donor Matching',
    name: 'LifeDrop Emergency Blood OS',
    category: 'Health IT',
    tech: ['Next.js', 'Supabase', 'Tailwind'],
    desc: 'Live blood inventory tracker that matches urgent patient requests with nearby donors and alerts staff before blood bags expire.',
    price: 299,
    tier: 'MINI',
    color: '#E11D48',
    bgGradient: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FECDD3 100%)',
    border: '#FECDD3',
  },
  {
    slug: 'resume-parsing-engine',
    shortName: 'TalentScan AI',
    systemType: 'NLP Candidate Scoring & ATS',
    Icon: FileText,
    metric: '99.4% Skill Parse',
    name: 'TalentScan AI Resume Scanner & ATS',
    category: 'AI / HR Tech',
    tech: ['Python', 'NLP', 'React'],
    desc: 'Upload any resume PDF: AI extracts candidate skills, scores them against job requirements, and ranks top applicants automatically.',
    price: 499,
    tier: 'MAJOR',
    color: '#087F75',
    bgGradient: 'linear-gradient(135deg, #F0FDF9 0%, #E6FFFA 50%, #CCFBF1 100%)',
    border: '#99F6E4',
  },
  {
    slug: 'online-code-compiler',
    shortName: 'DevForge IDE',
    systemType: 'Isolated Cloud Code Sandbox',
    Icon: Code2,
    metric: 'Zero-Config Container Run',
    name: 'DevForge In-Browser Code Sandbox',
    category: 'Developer Tools',
    tech: ['Docker', 'WebSockets', 'Node.js'],
    desc: 'Run Python, JavaScript, and C++ directly in the browser. Safe container execution with instant speed analysis and Big-O runtime tips.',
    price: 299,
    tier: 'MINI',
    color: '#0F766E',
    bgGradient: 'linear-gradient(135deg, #ECFEFF 0%, #E0F2FE 50%, #CCFBF1 100%)',
    border: '#A5F3FC',
  },
  {
    slug: 'credit-card-fraud',
    shortName: 'SentinelPay Radar',
    systemType: 'Real-Time Fraud Detection',
    Icon: ShieldAlert,
    metric: '11.4ms Anomaly Latency',
    name: 'SentinelPay Real-Time Fraud Radar',
    category: 'FinTech / AI',
    tech: ['Python', 'Scikit-learn', 'React'],
    desc: 'Machine learning system that detects and blocks stolen cards and suspicious transactions in under 15 milliseconds.',
    price: 299,
    tier: 'MINI',
    color: '#D97706',
    bgGradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 50%, #FDE68A 100%)',
    border: '#FDE68A',
  },
  {
    slug: 'phishing-detector-ai',
    shortName: 'PhishGuard AI',
    systemType: 'Zero-Day Cybersecurity Radar',
    Icon: ShieldCheck,
    metric: 'URL Feature Heuristics',
    name: 'PhishGuard AI Threat Radar',
    category: 'Cybersecurity',
    tech: ['Python', 'TensorFlow', 'Flask'],
    desc: 'Scans web links and lookalike domain names to protect users and businesses from fake login pages and stolen credentials.',
    price: 299,
    tier: 'MINI',
    color: '#DC2626',
    bgGradient: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 50%, #FECACA 100%)',
    border: '#FECACA',
  },
  {
    slug: 'restaurant-qr-ordering',
    shortName: 'DineFlow KDS',
    systemType: 'Contactless Food Ordering',
    Icon: QrCode,
    metric: 'Instant Kitchen Ticket Sync',
    name: 'DineFlow QR Food Ordering & Kitchen Display',
    category: 'SaaS / Full-Stack',
    tech: ['Next.js', 'Stripe', 'Real-time DB'],
    desc: 'Customers scan a table QR code to order food on their phone, sending live order tickets directly to the kitchen display.',
    price: 299,
    tier: 'MINI',
    color: '#059669',
    bgGradient: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 50%, #A7F3D0 100%)',
    border: '#A7F3D0',
  },
  {
    slug: 'aerofuel-predictor',
    shortName: 'AeroFuel AI',
    systemType: 'Aviation Burn Forecasting',
    Icon: Plane,
    metric: '98.2% Jet Burn Accuracy',
    name: 'AeroFuel AI Jet Fuel Burn Predictor',
    category: 'AI / Aviation',
    tech: ['Python', 'XGBoost', 'Streamlit'],
    desc: 'Calculates the exact amount of fuel an airliner needs based on weather data and flight distance, saving airlines lakhs on wasted jet fuel.',
    price: 499,
    tier: 'MAJOR',
    color: '#1D4ED8',
    bgGradient: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #BFDBFE 100%)',
    border: '#BFDBFE',
  },
  {
    slug: 'smart-expense-tracker',
    shortName: 'SpendWise AI',
    systemType: 'Automated Receipt Auditor',
    Icon: Receipt,
    metric: 'OCR Receipt Vectorization',
    name: 'SpendWise AI Receipt Scanner & Tracker',
    category: 'FinTech',
    tech: ['React', 'Node.js', 'MongoDB'],
    desc: 'Snap a photo of any receipt: it extracts amounts, auto-groups your spending, and alerts you before you overspend.',
    price: 299,
    tier: 'MINI',
    color: '#0D9488',
    bgGradient: 'linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 50%, #99F6E4 100%)',
    border: '#99F6E4',
  },
  {
    slug: 'plant-disease-detection',
    shortName: 'CropGuard AI',
    systemType: 'CNN Agricultural Pathology',
    Icon: Leaf,
    metric: '97.4% Crop Pathology Accuracy',
    name: 'CropGuard AI Crop Disease Scanner',
    category: 'AI / AgriTech',
    tech: ['Python', 'CNN', 'FastAPI'],
    desc: 'Upload a photo of a sick crop leaf — the AI spots the exact disease with 97% accuracy and recommends how to treat it.',
    price: 499,
    tier: 'MAJOR',
    color: '#16A34A',
    bgGradient: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 50%, #BBF7D0 100%)',
    border: '#BBF7D0',
  },
  {
    slug: 'fake-news-detector',
    shortName: 'TruthLens AI',
    systemType: 'BERT Misinformation Scanner',
    Icon: Newspaper,
    metric: 'Fine-Grained Truth Confidence',
    name: 'TruthLens AI Fake News Scanner',
    category: 'AI / NLP',
    tech: ['Python', 'BERT', 'React'],
    desc: 'Paste any news headline or message — the AI reads it and tells you if it is real or fabricated, complete with confidence scores.',
    price: 499,
    tier: 'MAJOR',
    color: '#B45309',
    bgGradient: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 50%, #FDE68A 100%)',
    border: '#FDE68A',
  },
];

const KIT_DELIVERABLES = [
  { icon: Terminal, title: '1-Click Runnable Code', desc: 'Pre-configured run.bat & run.sh scripts' },
  { icon: FileText, title: 'IEEE Report (.docx)', desc: 'Literature survey, UML, system design' },
  { icon: Presentation, title: 'Defense PPT (.pptx)', desc: '15–20 slides with complete speaker notes' },
  { icon: BookOpen, title: 'Top 25 Viva Q&A', desc: 'Examiner-level answers ready to memorize' },
];

const HOW_STEPS = [
  {
    n: '01',
    title: 'Choose: College Kit or Startup Idea',
    desc: 'Download 11 verified runnable college project kits (₹299/₹499) for instant submission, or submit any custom startup idea for rapid MVP build.',
    icon: Globe,
  },
  {
    n: '02',
    title: 'Inspect Architecture & Blueprints',
    desc: 'Review full system schematics, database schemas, tech stack tradeoffs, and complete academic or production deliverable specifications.',
    icon: Layers,
  },
  {
    n: '03',
    title: 'Launch, Submit & Defend Confidently',
    desc: 'Launch software in 1 click with zero-config launchers. Walk into your faculty review or investor pitch backed by full code & documentation.',
    icon: Terminal,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.16, delay: i * 0.03, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function HomePage() {
  const [activeHook, setActiveHook] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHook((prev) => (prev + 1) % HERO_HOOKS.length);
    }, 3500); // comfortable 3.5s reading cadence
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ background: 'transparent', overflowX: 'hidden', minHeight: '100vh' }}>

      {/* ════ HERO ════ */}
      <section style={{ position: 'relative', zIndex: 1, padding: 'clamp(2.75rem,6vw,5.5rem) 0 clamp(2rem,4vw,3.5rem)', overflow: 'hidden' }}>
        {/* Subtle hero-only ambient backdrop */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }} aria-hidden>
          <div style={{ position: 'absolute', width: '700px', height: '700px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245, 228, 202, 0.65) 0%, rgba(250, 240, 225, 0.3) 45%, transparent 70%)', top: '-18%', right: '-8%', filter: 'blur(70px)' }} />
          <div style={{ position: 'absolute', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(250, 235, 215, 0.7) 0%, rgba(245, 225, 200, 0.25) 50%, transparent 70%)', top: '8%', left: '-12%', filter: 'blur(60px)' }} />
        </div>

        <div className="shell" style={{ maxWidth: '64rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>

          {/* Eyebrow Hook Badge */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.16 }}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '.4rem',
              padding: '.35rem .875rem', borderRadius: '9999px',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(250,245,236,0.9) 100%)',
              border: '1.2px solid rgba(226, 216, 201, 0.9)',
              fontSize: 'clamp(.725rem, 2.5vw, .8125rem)', fontWeight: 700, color: 'var(--navy)',
              boxShadow: '0 2px 8px rgba(180, 155, 120, 0.08)',
            }}>
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--teal)', boxShadow: '0 0 8px rgba(13,148,136,0.6)', flexShrink: 0 }} className="apulse" />
              <span>SubmitKit — College Projects &amp; Startup MVP Studio</span>
              <span style={{ fontSize: '.6875rem', color: 'var(--ink-4)', borderLeft: '1px solid var(--line)', paddingLeft: '.45rem' }}>11 Kits + Custom Build</span>
            </span>
          </motion.div>

          {/* Rapidly Rotating Hook Headline */}
          <div style={{ minHeight: 'clamp(5.75rem, 14vw, 8.5rem)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
            <h1
              className="font-display font-black"
              style={{
                fontSize: 'clamp(1.85rem, 5.2vw, 3.85rem)',
                letterSpacing: '-.045em',
                lineHeight: 1.18,
                color: 'var(--navy)',
                margin: 0,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeHook}
                  initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'inline-block' }}
                >
                  {HERO_HOOKS[activeHook].lead}{' '}
                  <em style={{ fontStyle: 'normal', color: 'var(--teal)' }}>
                    {HERO_HOOKS[activeHook].accent}
                  </em>
                </motion.span>
              </AnimatePresence>
            </h1>
          </div>

          {/* Subtitle — Merging College Projects & Startup MVPs */}
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(.9375rem, 2vw, 1.15rem)', color: 'var(--ink-3)',
              lineHeight: 1.7, maxWidth: '46rem', margin: '0 auto 1.75rem',
            }}>
            Download verified <strong style={{ color: 'var(--navy)' }}>1-click college engineering projects</strong> (Code + IEEE Black Book + Viva PPT) or have our engineering team build your <strong style={{ color: 'var(--navy)' }}>startup MVP &amp; custom software idea</strong> from scratch in 48–72 hours.
          </motion.p>

          {/* Action CTAs — modern iOS squircle button pair */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.16 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem', justifyContent: 'center', marginBottom: '1.75rem' }}>
            <Link
              href="/projects"
              className="btn-hero-primary w-full sm:w-auto"
              style={{ minWidth: '13.5rem' }}
            >
              <GraduationCap style={{ width: '1.125rem', height: '1.125rem' }} />
              Browse College Kits
              <ArrowRight style={{ width: '1rem', height: '1rem' }} />
            </Link>
            <Link
              href="/custom"
              className="btn-hero-secondary w-full sm:w-auto"
              style={{ minWidth: '13.5rem' }}
            >
              <Sparkles style={{ width: '1rem', height: '1rem', color: 'var(--teal)' }} />
              Customize Project / Startup Idea
              <ArrowUpRight style={{ width: '1rem', height: '1rem', color: 'var(--teal)' }} />
            </Link>
          </motion.div>

          {/* Dual-Pillar Concept Strip: College Projects vs Startup MVPs */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18, delay: 0.06 }}
            style={{ maxWidth: '58rem', margin: '0 auto', textAlign: 'left' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 17.5rem), 1fr))',
              gap: '.875rem',
            }}>
              {/* Pillar 1: College Projects */}
              <div style={{
                background: 'linear-gradient(175deg, #FFFFFF 0%, #FDFBF8 35%, #F7EFE3 75%, #F0E3CF 100%)',
                border: '1.5px solid rgba(220, 208, 188, 0.95)',
                borderRadius: '16px',
                padding: '1.125rem 1.25rem',
                boxShadow: 'inset 0 1px 0 #FFFFFF, 0 4px 20px -3px rgba(180, 145, 100, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '.5rem' }}>
                    <span style={{
                      fontSize: '.625rem', fontWeight: 800, padding: '.2rem .55rem',
                      borderRadius: '6px', background: 'var(--teal-50)', color: 'var(--teal-dark)',
                      border: '1px solid var(--teal-100)', letterSpacing: '.06em', textTransform: 'uppercase',
                    }}>
                      🎓 Ready College Kits
                    </span>
                    <span style={{ fontSize: '.75rem', fontWeight: 800, color: 'var(--teal)' }}>₹299 / ₹499</span>
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.02em', margin: '0 0 .35rem' }}>
                    100% Working College Projects
                  </h3>
                  <p style={{ fontSize: '.8125rem', color: 'var(--ink-3)', lineHeight: 1.55, margin: '0 0 .75rem' }}>
                    Download verified source code with 60-page IEEE Black Book, 20-slide Viva PPT &amp; top 25 examiner Q&amp;A.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem', marginBottom: '.75rem' }}>
                    {['1-Click run.bat', 'IEEE Report (.docx)', 'Defense PPT', 'Top 25 Viva Q&A'].map(t => (
                      <span key={t} style={{
                        fontSize: '.6875rem', fontWeight: 600, padding: '.15rem .45rem',
                        borderRadius: '4px', background: 'var(--surface-2)', border: '1px solid var(--line)', color: 'var(--ink-3)',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
                <Link href="/projects" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '.35rem',
                  fontSize: '.8125rem', fontWeight: 700, color: 'var(--teal)', textDecoration: 'none',
                  paddingTop: '.5rem', borderTop: '1px solid var(--line)',
                }}>
                  Browse 11 Ready Kits <ArrowRight style={{ width: '.8125rem', height: '.8125rem' }} />
                </Link>
              </div>

              {/* Pillar 2: Customize Your Project / Startup Idea (Built for Non-Coders & Founders) */}
              <div style={{
                background: 'linear-gradient(175deg, #FFFFFF 0%, #FDFBF8 35%, #F7EFE3 75%, #F0E3CF 100%)',
                border: '1.5px solid rgba(220, 208, 188, 0.95)',
                borderRadius: '16px',
                padding: '1.125rem 1.25rem',
                boxShadow: 'inset 0 1px 0 #FFFFFF, 0 4px 20px -3px rgba(180, 145, 100, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '.5rem' }}>
                    <span style={{
                      fontSize: '.625rem', fontWeight: 800, padding: '.2rem .55rem',
                      borderRadius: '6px', background: 'rgba(217, 119, 6, 0.1)', color: '#B45309',
                      border: '1px solid rgba(217, 119, 6, 0.25)', letterSpacing: '.06em', textTransform: 'uppercase',
                    }}>
                      ✨ Non-Coder Studio &amp; Custom Builds
                    </span>
                    <span style={{ fontSize: '.75rem', fontWeight: 800, color: '#B45309' }}>Starts ₹1,999</span>
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.02em', margin: '0 0 .35rem' }}>
                    Turn Any Concept into Live Software (Zero Code Required)
                  </h3>
                  <p style={{ fontSize: '.8125rem', color: 'var(--ink-3)', lineHeight: 1.55, margin: '0 0 .75rem' }}>
                    Have an approved college topic or a startup MVP idea? Even without any programming skills, our senior engineers build 100% working code, database, UI &amp; documentation in 48–72h.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem', marginBottom: '.75rem' }}>
                    {['Zero Coding Needed', '100% Working MVP', 'Custom IEEE Report', '1-on-1 Walkthrough'].map(t => (
                      <span key={t} style={{
                        fontSize: '.6875rem', fontWeight: 600, padding: '.15rem .45rem',
                        borderRadius: '4px', background: 'var(--surface-2)', border: '1px solid var(--line)', color: 'var(--ink-3)',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
                <Link href="/custom" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '.35rem',
                  fontSize: '.8125rem', fontWeight: 700, color: '#B45309', textDecoration: 'none',
                  paddingTop: '.5rem', borderTop: '1px solid var(--line)',
                }}>
                  Customize Your Project / Startup Idea <ArrowUpRight style={{ width: '.8125rem', height: '.8125rem' }} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════ LIVE FLAGSHIP PROJECT KITS (TOP 3 PREVIEW) ════ */}
      <section style={{ position: 'relative', zIndex: 1, borderTop: '1px solid var(--line)', padding: 'clamp(2.5rem,5vw,4.5rem) 0' }}>
        <div className="shell">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem 1rem', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div>
              <p style={{ fontSize: '.6875rem', fontWeight: 800, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '.5rem' }}>
                Verified &amp; 1-Click Runnable
              </p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 900, letterSpacing: '-.04em', color: 'var(--navy)', margin: 0 }}>
                Featured Flagship Project Kits
              </h2>
            </div>
            <Link href="/projects" style={{
              display: 'inline-flex', alignItems: 'center', gap: '.375rem',
              fontSize: '.875rem', fontWeight: 700, color: 'var(--teal)',
              textDecoration: 'none', whiteSpace: 'nowrap',
            }}>
              Browse all 11 kits <ChevronRight style={{ width: '1rem', height: '1rem' }} />
            </Link>
          </div>

          {/* 3 Main Flagship Cards — Clean, Minimal, Responsive Mobile Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PROJECTS.slice(0, 3).map((p, i) => (
              <motion.div key={p.slug} custom={i} initial="hidden" whileInView="visible"
                viewport={{ once: true, margin: '-40px' }} variants={fadeUp} style={{ height: '100%' }}>
                <Link href={`/projects/${p.slug}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <div className="card card-lift group" style={{
                    borderRadius: '16px',
                    background: 'linear-gradient(175deg, #FFFFFF 0%, #FDFBF8 35%, #F8EFE3 75%, #F0E3CF 100%)',
                    border: '1.5px solid rgba(220, 208, 188, 0.95)',
                    boxShadow: 'inset 0 1px 0 #FFFFFF, 0 4px 20px -3px rgba(180, 145, 100, 0.12)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    padding: 'clamp(1.125rem, 3vw, 1.375rem) clamp(1rem, 2.5vw, 1.25rem)',
                    transition: 'all 150ms cubic-bezier(.16, 1, .3, 1)',
                  }}>
                    {/* Top Row: Category + Tier + Ready to Ship */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.5rem', marginBottom: '.875rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem' }}>
                        <span style={{
                          fontSize: '.625rem', fontWeight: 800, padding: '.2rem .55rem',
                          borderRadius: '6px', color: 'var(--teal-dark)', background: 'var(--teal-50)',
                          border: '1px solid var(--teal-100)', letterSpacing: '.05em', textTransform: 'uppercase',
                        }}>
                          {p.category}
                        </span>
                        <span style={{
                          fontSize: '.625rem', fontWeight: 800, padding: '.2rem .5rem',
                          borderRadius: '6px', color: p.tier === 'MAJOR' ? '#B45309' : '#0D9488',
                          background: p.tier === 'MAJOR' ? '#FFFBEB' : '#F0FDFA',
                          border: `1px solid ${p.tier === 'MAJOR' ? '#FDE68A' : '#CCFBF1'}`,
                          letterSpacing: '.04em', textTransform: 'uppercase',
                        }}>
                          {p.tier}
                        </span>
                      </div>

                      <span style={{
                        fontSize: '.625rem', fontWeight: 700, padding: '.2rem .5rem',
                        borderRadius: '9999px', color: '#065F46', background: '#ECFDF5',
                        border: '1px solid #A7F3D0', letterSpacing: '.02em',
                        display: 'inline-flex', alignItems: 'center', gap: '.3rem',
                      }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981' }} />
                        Ready to Ship
                      </span>
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontSize: '1.0625rem', fontWeight: 800, color: 'var(--navy)',
                      letterSpacing: '-.025em', lineHeight: 1.35, margin: '0 0 .5rem',
                      display: 'flex', alignItems: 'center',
                    }}>
                      {p.name}
                    </h3>

                    {/* Description */}
                    <p style={{
                      fontSize: '.8375rem', color: 'var(--ink-3)', lineHeight: 1.6,
                      margin: '0 0 1rem',
                    }}>
                      {p.desc}
                    </p>

                    {/* Tech stack pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.35rem', marginBottom: '1.25rem', alignItems: 'center' }}>
                      {p.tech.map(t => (
                        <span key={t} style={{
                          fontSize: '.6875rem', fontWeight: 600, padding: '.15rem .45rem',
                          borderRadius: '4px', background: 'var(--surface-2)',
                          border: '1px solid var(--line)', color: 'var(--ink-3)',
                          fontFamily: 'var(--font-mono)',
                        }}>{t}</span>
                      ))}
                    </div>

                    {/* Bottom Price & CTA */}
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      paddingTop: '.875rem', borderTop: '1px solid var(--line)', marginTop: 'auto', gap: '.5rem',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: '.35rem', whiteSpace: 'nowrap' }}>
                        <span className="font-display font-black" style={{ fontSize: '1.35rem', color: 'var(--navy)' }}>
                          ₹{p.price}
                        </span>
                        <span style={{ fontSize: '.75rem', color: 'var(--ink-4)', fontWeight: 600 }}>
                          (~${p.tier === 'MAJOR' ? '6' : '4'} USD)
                        </span>
                      </div>
                      <span className="btn btn-teal btn-sm" style={{ fontSize: '.75rem', padding: '0 .75rem', minHeight: '34px', whiteSpace: 'nowrap' }}>
                        View Kit &amp; Demo →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Explore All 11 Projects Banner Dock */}
          <div style={{
            marginTop: '2rem',
            padding: 'clamp(1.25rem, 3.5vw, 2rem)',
            borderRadius: '18px',
            background: 'linear-gradient(155deg, #FFFFFF 0%, #FDFBF8 30%, #F6EDE0 65%, #EEE0C9 100%)',
            border: '1.5px solid rgba(220, 208, 188, 0.95)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
            boxShadow: 'inset 0 1px 0 #FFFFFF, 0 8px 28px -4px rgba(180, 145, 100, 0.15)',
          }}>
            <div style={{ flex: '1 1 18rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontSize: '.6875rem', fontWeight: 800, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: '.35rem' }}>
                <Package style={{ width: '13px', height: '13px' }} /> Full Project Catalog
              </div>
              <h3 style={{ fontSize: 'clamp(1.0625rem, 2.5vw, 1.25rem)', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-.025em', margin: '0 0 .35rem' }}>
                Looking for more domains? Explore all 11 verified engineering kits
              </h3>
              <p style={{ fontSize: '.84375rem', color: 'var(--ink-3)', margin: 0, lineHeight: 1.55 }}>
                FinTech, Computer Vision, IoT, NLP, Cloud Compilers &amp; Agriculture — all with 1-click runnable code, IEEE reports &amp; Viva decks.
              </p>
            </div>
            <Link href="/projects" className="btn-hero-primary w-full sm:w-auto" style={{ gap: '.5rem', justifyContent: 'center', whiteSpace: 'nowrap' }}>
              Explore All 11 Kits <ArrowRight style={{ width: '1.0625rem', height: '1.0625rem' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════ HOW IT WORKS ════ */}
      <section style={{ position: 'relative', zIndex: 1, background: 'linear-gradient(180deg, rgba(250, 246, 238, 0.75) 0%, rgba(245, 238, 226, 0.9) 100%)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', padding: 'clamp(2.5rem,5vw,4.5rem) 0' }}>
        <div className="shell">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontSize: '.6875rem', fontWeight: 800, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '.625rem' }}>Simple 3-Step Process</p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 900, letterSpacing: '-.04em', color: 'var(--navy)', margin: '0 auto', maxWidth: '36rem' }}>
              How SubmitKit Works
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))', gap: '1.25rem' }}>
            {HOW_STEPS.map((s, i) => (
              <motion.div key={s.n} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="card card-lift" style={{ padding: 'clamp(1.25rem, 3vw, 1.75rem)', borderRadius: 'var(--r-xl)', border: '1.5px solid rgba(220, 208, 188, 0.95)', background: 'linear-gradient(175deg, #FFFFFF 0%, #FDFBF8 35%, #F7EEE0 100%)', boxShadow: 'inset 0 1px 0 #FFFFFF, 0 4px 18px -3px rgba(180, 145, 100, 0.1)', height: '100%' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '12px', background: 'rgba(13,148,136,0.1)', border: '1px solid rgba(13,148,136,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <s.icon style={{ width: '1.125rem', height: '1.125rem', color: 'var(--teal)' }} />
                  </div>
                  <div style={{ fontSize: '.6875rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--ink-5)', letterSpacing: '.1em', marginBottom: '.5rem' }}>{s.n}</div>
                  <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.025em', marginBottom: '.625rem' }}>{s.title}</h3>
                  <p style={{ fontSize: '.875rem', color: 'var(--ink-3)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ PRICING & CUSTOM BUILDS (AUTHENTIC PRICING DOCK) ════ */}
      <section style={{ position: 'relative', zIndex: 1, padding: 'clamp(2.5rem,5vw,4.5rem) 0' }}>
        <div className="shell" style={{ maxWidth: '68rem' }}>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.18 }}>
            <div style={{
              borderRadius: 'var(--r-2xl)',
              background: 'linear-gradient(160deg, #FFFFFF 0%, #FDFBF8 30%, #F7EFE3 65%, #EEE0C9 100%)',
              border: '1.5px solid rgba(220, 208, 188, 0.95)',
              boxShadow: 'inset 0 1px 0 #FFFFFF, 0 12px 36px -6px rgba(180, 145, 100, 0.16)',
              padding: 'clamp(1.5rem,4vw,3rem) clamp(1rem,3vw,2.5rem)',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
            }}>
              <p style={{ fontSize: '.6875rem', fontWeight: 800, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '.14em', marginBottom: '.625rem' }}>
                Simple, Transparent Pricing
              </p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 900, letterSpacing: '-.04em', color: 'var(--navy)', marginBottom: '.75rem', lineHeight: 1.2 }}>
                College Project Kits &amp; Startup MVP Builds
              </h2>
              <p style={{ fontSize: 'clamp(.875rem, 2vw, 1.0625rem)', color: 'var(--ink-3)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '38rem', margin: '0 auto 2rem' }}>
                Instant download for ready college project kits, or commission our engineering team to build your startup MVP from scratch.
              </p>

              {/* 3 Real Matching Cards — Guaranteed Single Horizontal Row on md+ */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left" style={{ marginBottom: 0 }}>
                {/* Mini */}
                <div style={{ padding: '1.375rem 1.25rem', borderRadius: '16px', background: 'linear-gradient(175deg, #FFFFFF 0%, #FDFBF8 40%, #F6EDE1 100%)', border: '1.2px solid rgba(220, 208, 188, 0.95)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', boxShadow: 'inset 0 1px 0 #FFFFFF, 0 3px 12px -2px rgba(180, 145, 100, 0.08)' }}>
                  <div>
                    <span style={{ fontSize: '.6875rem', fontWeight: 800, color: 'var(--teal)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Mini Project Kit</span>
                    <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '.35rem', margin: '.375rem 0 .625rem' }}>
                      <span style={{ fontSize: '1.625rem', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-.03em', whiteSpace: 'nowrap', lineHeight: 1 }}>₹299</span>
                      <span style={{ fontSize: '.75rem', color: 'var(--ink-4)', fontWeight: 600, whiteSpace: 'nowrap' }}>(~$4 USD)</span>
                    </div>
                    <p style={{ fontSize: '.8125rem', color: 'var(--ink-3)', lineHeight: 1.55, marginBottom: '1.125rem' }}>
                      Ready-to-run working code, 25-page report (.docx), and 10-slide Viva defense presentation.
                    </p>
                  </div>
                  <Link href="/projects?tier=MINI" className="btn btn-outline" style={{ fontSize: '.8125rem', justifyContent: 'center', borderRadius: '10px', minHeight: '40px', width: '100%', marginTop: 'auto' }}>
                    Browse Mini Kits (₹299)
                  </Link>
                </div>

                {/* Major */}
                <div style={{ padding: '1.375rem 1.25rem', borderRadius: '16px', background: 'linear-gradient(175deg, #FFFFFF 0%, #FEFAF4 40%, #F8EFE0 100%)', border: '1.2px solid rgba(220, 208, 188, 0.95)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', boxShadow: 'inset 0 1px 0 #FFFFFF, 0 3px 12px -2px rgba(180, 145, 100, 0.08)' }}>
                  <div>
                    <span style={{ fontSize: '.6875rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', letterSpacing: '.06em' }}>Major Capstone Kit</span>
                    <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '.35rem', margin: '.375rem 0 .625rem' }}>
                      <span style={{ fontSize: '1.625rem', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-.03em', whiteSpace: 'nowrap', lineHeight: 1 }}>₹499</span>
                      <span style={{ fontSize: '.75rem', color: 'var(--ink-4)', fontWeight: 600, whiteSpace: 'nowrap' }}>(~$6 USD)</span>
                    </div>
                    <p style={{ fontSize: '.8125rem', color: 'var(--ink-3)', lineHeight: 1.55, marginBottom: '1.125rem' }}>
                      Complete source code, 60-page IEEE Black Book report, 20-slide PPT, and top 25 Viva Q&amp;A.
                    </p>
                  </div>
                  <Link href="/projects?tier=MAJOR" className="btn btn-outline" style={{ fontSize: '.8125rem', justifyContent: 'center', borderRadius: '10px', minHeight: '40px', width: '100%', marginTop: 'auto' }}>
                    Browse Major Kits (₹499)
                  </Link>
                </div>

                {/* Custom (Highlighted) */}
                <div style={{ padding: '1.375rem 1.25rem', borderRadius: '16px', background: 'linear-gradient(175deg, #FFFFFF 0%, #F2FDF9 45%, #E1F6F0 100%)', border: '1.5px solid var(--teal-200)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', position: 'relative', boxShadow: 'inset 0 1px 0 #FFFFFF, 0 4px 18px -2px rgba(13, 148, 136, 0.16)' }}>
                  <div style={{ position: 'absolute', top: '-10px', right: '12px' }}>
                    <span style={{ padding: '.2rem .625rem', borderRadius: '9999px', background: 'var(--teal)', color: '#FFF', fontSize: '.625rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                      Custom Built
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '.6875rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', letterSpacing: '.06em' }}>Customize Project / Startup Idea</span>
                    <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '.35rem', margin: '.375rem 0 .625rem' }}>
                      <span style={{ fontSize: '1.625rem', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-.03em', whiteSpace: 'nowrap', lineHeight: 1 }}>₹1,999</span>
                      <span style={{ fontSize: '.75rem', color: 'var(--ink-4)', fontWeight: 600, whiteSpace: 'nowrap' }}>(~$24 USD)</span>
                      <span style={{ fontSize: '.625rem', fontWeight: 800, color: '#D97706', background: 'rgba(217,119,6,0.12)', border: '1px solid rgba(217,119,6,0.25)', padding: '.15rem .45rem', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '.04em', whiteSpace: 'nowrap' }}>
                        Base Price
                      </span>
                    </div>
                    <p style={{ fontSize: '.8125rem', color: 'var(--ink-2)', lineHeight: 1.55, marginBottom: '1.125rem' }}>
                      Have a specific approved topic or startup concept? Complete custom working code, IEEE documentation, and 1-on-1 walkthrough.
                    </p>
                  </div>
                  <Link href="/custom" className="btn btn-teal" style={{ fontSize: '.8125rem', justifyContent: 'center', borderRadius: '10px', minHeight: '40px', width: '100%', marginTop: 'auto' }}>
                    Customize Your Project / Idea →
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════ FREQUENTLY ASKED QUESTIONS (FAQ) ════ */}
      <FaqSection />

      {/* ════ FINAL TRUST & GUARANTEE STRIP ════ */}
      <section style={{ position: 'relative', zIndex: 1, borderTop: '1px solid var(--line)', padding: 'clamp(2rem,4vw,2.75rem) 0', background: 'linear-gradient(180deg, rgba(248, 242, 232, 0.7) 0%, rgba(243, 236, 222, 0.95) 100%)' }}>
        <div className="shell">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 2rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ maxWidth: '34rem' }}>
              <div style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.025em', marginBottom: '.25rem' }}>
                Engineering-Grade Software &amp; Academic Standard Guarantee
              </div>
              <div style={{ fontSize: '.875rem', color: 'var(--ink-3)', lineHeight: 1.55 }}>
                Every delivery includes verified runnable code, automated 1-click launchers, IEEE Black Book reports, and direct engineer support.
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.625rem 1.25rem', alignItems: 'center' }}>
              {[
                { Icon: ShieldCheck, t: '100% Working Code' },
                { Icon: Zap, t: 'Instant 1-Click Run' },
                { Icon: FileText, t: 'IEEE Black Book (.docx)' },
                { Icon: Presentation, t: 'Viva PPT & Notes' },
              ].map(({ Icon, t }) => (
                <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '.4rem', fontSize: '.8125rem', fontWeight: 650, color: 'var(--navy)', background: 'var(--surface)', padding: '.35rem .75rem', borderRadius: '8px', border: '1px solid var(--line)' }}>
                  <Icon style={{ width: '.9375rem', height: '.9375rem', color: 'var(--teal)' }} />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
