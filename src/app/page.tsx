'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Zap, ShieldCheck, Globe, Code2,
  Layers, Terminal, Package, Sparkles, CheckCircle2, ChevronRight,
  FileText, Presentation, BookOpen, Laptop, Cpu, Activity, Droplet,
  ShieldAlert, QrCode, Plane, Receipt, Leaf, Newspaper, Rocket,
  GraduationCap, Star, Search, Check, Brain, BarChart3, Database,
  Lightbulb, Code, ExternalLink, ArrowDown, Eye
} from 'lucide-react';
import { FaqSection } from '@/components/ui/faq-section';
import { Logo, AirplaneLogo, SupersonicPlane } from '@/components/ui/logo';

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
  },
  {
    slug: 'resume-parsing-engine',
    shortName: 'TalentScan AI',
    systemType: 'NLP Candidate Scoring & ATS',
    Icon: FileText,
    metric: '99.4% Skill Parse',
    name: 'TalentScan AI Resume Scanner & ATS',
    category: 'AI & Machine Learning',
    tech: ['Python', 'NLP', 'React'],
    desc: 'Upload any resume PDF: AI extracts candidate skills, scores them against job requirements, and ranks top applicants automatically.',
    price: 499,
    tier: 'MAJOR',
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
  },
  {
    slug: 'credit-card-fraud',
    shortName: 'SentinelPay Radar',
    systemType: 'Real-Time Fraud Detection',
    Icon: ShieldAlert,
    metric: '11.4ms Anomaly Latency',
    name: 'SentinelPay Real-Time Fraud Radar',
    category: 'FinTech & AI',
    tech: ['Python', 'Scikit-learn', 'React'],
    desc: 'Machine learning system that detects and blocks stolen cards and suspicious transactions in under 15 milliseconds.',
    price: 299,
    tier: 'MINI',
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
  },
  {
    slug: 'restaurant-qr-ordering',
    shortName: 'DineFlow KDS',
    systemType: 'Contactless Food Ordering',
    Icon: QrCode,
    metric: 'Instant Kitchen Ticket Sync',
    name: 'DineFlow QR Food Ordering & Kitchen Display',
    category: 'SaaS & Full-Stack',
    tech: ['Next.js', 'Stripe', 'Real-time DB'],
    desc: 'Customers scan a table QR code to order food on their phone, sending live order tickets directly to the kitchen display.',
    price: 299,
    tier: 'MINI',
  },
  {
    slug: 'aerofuel-predictor',
    shortName: 'AeroFuel AI',
    systemType: 'Aviation Burn Forecasting',
    Icon: Plane,
    metric: '98.2% Jet Burn Accuracy',
    name: 'AeroFuel AI Jet Fuel Burn Predictor',
    category: 'AI & Aviation',
    tech: ['Python', 'XGBoost', 'Streamlit'],
    desc: 'Calculates the exact amount of fuel an airliner needs based on weather data and flight distance, saving airlines lakhs on wasted jet fuel.',
    price: 499,
    tier: 'MAJOR',
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
  },
  {
    slug: 'plant-disease-detection',
    shortName: 'CropGuard AI',
    systemType: 'CNN Agricultural Pathology',
    Icon: Leaf,
    metric: '97.4% Crop Pathology Accuracy',
    name: 'CropGuard AI Crop Disease Scanner',
    category: 'AI & AgriTech',
    tech: ['Python', 'CNN', 'FastAPI'],
    desc: 'Upload a photo of a sick crop leaf — the AI spots the exact disease with 97% accuracy and recommends how to treat it.',
    price: 499,
    tier: 'MAJOR',
  },
  {
    slug: 'fake-news-detector',
    shortName: 'TruthLens AI',
    systemType: 'BERT Misinformation Scanner',
    Icon: Newspaper,
    metric: 'Fine-Grained Truth Confidence',
    name: 'TruthLens AI Fake News Scanner',
    category: 'AI & NLP',
    tech: ['Python', 'BERT', 'React'],
    desc: 'Paste any news headline or message — the AI reads it and tells you if it is real or fabricated, complete with confidence scores.',
    price: 499,
    tier: 'MAJOR',
  },
];

const POPULAR_CATEGORIES = [
  { name: 'Web Development', icon: Globe, count: 'SaaS & Web', href: '/projects?category=Web' },
  { name: 'AI & Machine Learning', icon: Brain, count: 'GenAI & Vision', href: '/projects?category=AI' },
  { name: 'Data Science', icon: BarChart3, count: 'APIs & Data', href: '/projects?category=Data' },
  { name: 'IoT & Hardware', icon: Cpu, count: 'Hardware & IoT', href: '/projects?category=IoT' },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'mini' | 'major'>('all');
  const [engineMode, setEngineMode] = useState<'startup' | 'vault'>('startup');

  const filteredProjects = activeTab === 'all'
    ? PROJECTS.slice(0, 3)
    : PROJECTS.filter(p => (activeTab === 'mini' ? p.tier === 'MINI' : p.tier === 'MAJOR')).slice(0, 3);

  return (
    <div style={{ overflowX: 'hidden', minHeight: '100vh', background: 'transparent' }}>

      {/* ═══════════════════════════════════════════════════
          1. HERO SECTION (SPLIT LAYOUT MATCHING REFERENCE IMAGE)
      ═══════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(1.5rem, 3.5vw, 2.75rem) 0 clamp(1.75rem, 4vw, 3rem)',
        overflow: 'hidden',
      }}>
        {/* Warm Ambient Peach Glow Blobs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }} aria-hidden="true">
          <div style={{
            position: 'absolute',
            width: '680px',
            height: '680px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 138, 101, 0.18) 0%, rgba(255, 175, 140, 0.08) 45%, transparent 70%)',
            top: '-15%',
            right: '-10%',
            filter: 'blur(70px)',
          }} />
          <div style={{
            position: 'absolute',
            width: '540px',
            height: '540px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255, 204, 160, 0.16) 0%, rgba(254, 230, 205, 0.06) 50%, transparent 70%)',
            top: '20%',
            left: '-15%',
            filter: 'blur(60px)',
          }} />
        </div>

        <div className="shell" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 24rem), 1fr))',
            alignItems: 'center',
            gap: 'clamp(1.75rem, 3.5vw, 3rem)',
          }}>

            {/* ── Left Column: Headline, Copy & CTAs ── */}
            <div style={{ maxWidth: '38rem' }}>

              {/* Eyebrow Pill Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 0.95rem', borderRadius: '9999px', background: '#FDF6F2', border: '1px solid #F3CFBF', marginBottom: '1rem', boxShadow: '0 1px 3px rgba(229, 87, 41, 0.08)' }}>
                <AirplaneLogo size={14} color="#E55729" />
                <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#18181B', letterSpacing: '0.01em' }}>
                  Global Software &amp; End-to-End Startup Studio
                </span>
              </div>

              {/* Master H1 — Compact & punchy on phones */}
              <h1
                className="font-display font-black"
                style={{
                  fontSize: 'clamp(1.85rem, 5vw, 3.85rem)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.15,
                  color: '#18181B',
                  margin: '0 0 0.85rem',
                }}
              >
                Turn Your Ideas Into{' '}
                <span style={{
                  display: 'inline-block',
                  color: '#E55729',
                  background: 'linear-gradient(135deg, #EE6E44 0%, #E55729 50%, #CB451A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  Working Software
                </span>
              </h1>

              {/* Subtitle */}
              <p style={{
                fontSize: 'clamp(0.9375rem, 2vw, 1.15rem)',
                color: '#52525B',
                lineHeight: 1.6,
                margin: '0 0 1.35rem',
                maxWidth: '34rem',
              }}>
                Tailored for college students, developers, and startup founders. Commission a custom college capstone or execute your startup idea in <strong style={{ color: '#18181B', fontWeight: 650 }}>48–72 hours</strong> — or instantly deploy verified <strong style={{ color: '#18181B', fontWeight: 650 }}>pre-made systems</strong> with 1-click launchers.
              </p>

              {/* Desktop Action Buttons & Trust Checks — On mobile, the interactive Showcase Card below serves as the clean, direct action hub */}
              <div className="hidden md:block">
                {/* Action Buttons: Near-Black Pill + Warm Cream Pill with 3D Spring Motion */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <Link
                    href="/projects"
                    className="btn-hero-primary"
                  >
                    <Package style={{ width: '1.0625rem', height: '1.0625rem', color: '#FFFFFF' }} />
                    Explore Pre-Made Projects
                    <ArrowRight style={{ width: '1rem', height: '1rem', marginLeft: '0.125rem' }} />
                  </Link>

                  <Link
                    href="/custom"
                    className="btn-hero-secondary"
                  >
                    <AirplaneLogo size={15} color="#E55729" />
                    Custom Project &amp; Ideas
                    <ArrowUpRight style={{ width: '1rem', height: '1rem', color: '#E55729' }} />
                  </Link>
                </div>

                {/* Quick Trust Checks (Matte Terracotta — Zero Green) */}
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem 1.25rem', color: '#71717A', fontSize: '0.8125rem', fontWeight: 600 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <CheckCircle2 style={{ width: '0.9375rem', height: '0.9375rem', color: '#E55729' }} />
                    1-Click Execution Launcher
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <CheckCircle2 style={{ width: '0.9375rem', height: '0.9375rem', color: '#E55729' }} />
                    100% Full Source Code Ownership
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                    <CheckCircle2 style={{ width: '0.9375rem', height: '0.9375rem', color: '#E55729' }} />
                    48–72h Custom Delivery
                  </span>
                </div>
              </div>
            </div>

            {/* ── Right Column: Dual Execution Showcase (College Projects vs Startup Ideas) ── */}
            <motion.div
              style={{
                position: 'relative',
                maxWidth: '430px',
                width: '100%',
                margin: '0 auto',
                alignSelf: 'center',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'subpixel-antialiased',
              }}
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            >
              <div
                style={{
                  background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF8F5 100%)',
                  borderRadius: '24px',
                  border: '1.5px solid #EFE6DC',
                  boxShadow: '0 24px 56px -12px rgba(24, 24, 27, 0.12), 0 4px 20px -2px rgba(229, 87, 41, 0.10), inset 0 1px 0 rgba(255, 255, 255, 1)',
                  padding: 'clamp(0.85rem, 2.5vw, 1.15rem)',
                  position: 'relative',
                }}
              >
                {/* Dual Core Launch Cards: 🎓 Custom College Project vs 🚀 Execute Startup Idea */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative', zIndex: 1 }}>

                  {/* Card 1: Custom College Project — Tailored for Students & Capstones */}
                  <Link
                    href="/custom?type=college"
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      padding: 'clamp(0.85rem, 2vw, 1.05rem)',
                      borderRadius: '18px',
                      background: 'linear-gradient(145deg, #FFFFFF 0%, #FDF9F6 60%, #FAF2EC 100%)',
                      border: '1.5px solid #F3CFBF',
                      boxShadow: '0 4px 14px rgba(229, 87, 41, 0.06)',
                      transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      WebkitFontSmoothing: 'subpixel-antialiased',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px -6px rgba(229, 87, 41, 0.20), 0 2px 6px rgba(0, 0, 0, 0.04)';
                      e.currentTarget.style.borderColor = '#E55729';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateZ(0)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(229, 87, 41, 0.06)';
                      e.currentTarget.style.borderColor = '#F3CFBF';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '2rem', height: '2rem', borderRadius: '10px', background: '#FFFFFF', border: '1px solid #F3CFBF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(229, 87, 41, 0.08)' }}>
                          <GraduationCap style={{ width: '1.05rem', height: '1.05rem', color: '#E55729' }} />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#CB451A', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', lineHeight: 1 }}>
                            College Capstone
                          </span>
                          <span style={{ fontSize: '0.875rem', fontWeight: 850, color: '#18181B', letterSpacing: '-0.02em', display: 'block', marginTop: '0.15rem' }}>
                            Custom College Project
                          </span>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#E55729', background: '#FFFFFF', padding: '0.18rem 0.55rem', borderRadius: '9999px', border: '1px solid #F3CFBF', boxShadow: '0 1px 2px rgba(229, 87, 41, 0.06)' }}>
                        IEEE Black Book
                      </span>
                    </div>

                    {/* Mobile Clean Deliverable Strip vs Desktop Full Description */}
                    <div className="flex sm:hidden items-center gap-1.5 text-[0.71875rem] text-[#52525B] font-medium my-1.5">
                      <span className="text-[#CB451A] font-bold">Working Code</span>
                      <span>·</span>
                      <span>60p IEEE Docx</span>
                      <span>·</span>
                      <span>Viva PPT &amp; Q&amp;A</span>
                    </div>

                    <p className="hidden sm:block" style={{ fontSize: '0.78125rem', color: '#52525B', margin: '0 0 0.75rem', lineHeight: 1.45 }}>
                      Approved university topic or syllabus guidelines. Senior engineers build working code, 60-page IEEE .docx report, PPT deck, and Viva Q&amp;A in 48–72h.
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.45rem', borderTop: '1px dashed rgba(229, 87, 41, 0.2)' }}>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 750, color: '#CB451A' }}>
                        From ₹1,999<span className="hidden sm:inline"> · Direct Engineer Chat</span>
                      </span>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.75rem',
                        fontWeight: 750,
                        color: '#FFFFFF',
                        background: '#18181B',
                        padding: '0.35rem 0.8rem',
                        borderRadius: '9999px',
                        boxShadow: '0 2px 6px rgba(24, 24, 27, 0.25)',
                      }}>
                        <span className="hidden sm:inline">Build College Project</span>
                        <span className="sm:hidden">Build Project</span> <ArrowUpRight className="hero-btn-arrow" style={{ width: '0.75rem', height: '0.75rem', color: '#FFFFFF', transition: 'transform 180ms ease' }} />
                      </span>
                    </div>
                  </Link>

                  {/* Card 2: Execute Startup Idea — Tailored for Founders & Non-Coders */}
                  <Link
                    href="/custom?type=startup"
                    style={{
                      display: 'block',
                      textDecoration: 'none',
                      padding: 'clamp(0.85rem, 2vw, 1.05rem)',
                      borderRadius: '18px',
                      background: 'linear-gradient(145deg, #FFFFFF 0%, #F8F9FA 60%, #F1F3F5 100%)',
                      border: '1.5px solid #E4E4E7',
                      boxShadow: '0 4px 14px rgba(24, 24, 27, 0.04)',
                      transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      WebkitFontSmoothing: 'subpixel-antialiased',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-3px)';
                      e.currentTarget.style.boxShadow = '0 12px 28px -6px rgba(24, 24, 27, 0.16), 0 2px 6px rgba(0, 0, 0, 0.04)';
                      e.currentTarget.style.borderColor = '#18181B';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateZ(0)';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(24, 24, 27, 0.04)';
                      e.currentTarget.style.borderColor = '#E4E4E7';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{ width: '2rem', height: '2rem', borderRadius: '10px', background: '#FFFFFF', border: '1px solid #E4E4E7', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px rgba(24, 24, 27, 0.06)' }}>
                          <Rocket style={{ width: '1.05rem', height: '1.05rem', color: '#18181B' }} />
                        </div>
                        <div>
                          <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#71717A', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', lineHeight: 1 }}>
                            Founders &amp; Non-Coders
                          </span>
                          <span style={{ fontSize: '0.875rem', fontWeight: 850, color: '#18181B', letterSpacing: '-0.02em', display: 'block', marginTop: '0.15rem' }}>
                            Execute Startup Idea
                          </span>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#18181B', background: '#FFFFFF', padding: '0.18rem 0.55rem', borderRadius: '9999px', border: '1px solid #E4E4E7', boxShadow: '0 1px 2px rgba(24, 24, 27, 0.04)' }}>
                        100% IP Rights
                      </span>
                    </div>

                    {/* Mobile Clean Deliverable Strip vs Desktop Full Description */}
                    <div className="flex sm:hidden items-center gap-1.5 text-[0.71875rem] text-[#52525B] font-medium my-1.5">
                      <span className="text-[#18181B] font-bold">Full-Stack Code</span>
                      <span>·</span>
                      <span>48–72h Launch</span>
                      <span>·</span>
                      <span>100% IP</span>
                    </div>

                    <p className="hidden sm:block" style={{ fontSize: '0.78125rem', color: '#52525B', margin: '0 0 0.75rem', lineHeight: 1.45 }}>
                      Turn your software or SaaS concept into working reality. Senior engineers build full-stack code, modern UI, backend APIs, and complete intellectual property ownership.
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.45rem', borderTop: '1px dashed rgba(24, 24, 27, 0.12)' }}>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 750, color: '#52525B' }}>
                        48–72h Launch<span className="hidden sm:inline"> · Production Code</span>
                      </span>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        fontSize: '0.75rem',
                        fontWeight: 750,
                        color: '#FFFFFF',
                        background: '#E55729',
                        padding: '0.35rem 0.8rem',
                        borderRadius: '9999px',
                        boxShadow: '0 2px 8px rgba(229, 87, 41, 0.3)',
                      }}>
                        <span className="hidden sm:inline">Execute Startup Idea</span>
                        <span className="sm:hidden">Launch Idea</span> <ArrowUpRight className="hero-btn-arrow" style={{ width: '0.75rem', height: '0.75rem', color: '#FFFFFF', transition: 'transform 180ms ease' }} />
                      </span>
                    </div>
                  </Link>

                  {/* Bottom Quick-Bridge: 11 Ready Pre-Made Systems */}
                  <Link
                    href="/projects"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '12px',
                      background: '#FAF7F2',
                      border: '1px solid #EFE6DC',
                      textDecoration: 'none',
                      marginTop: '0.15rem',
                      transition: 'all 160ms ease',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      WebkitFontSmoothing: 'subpixel-antialiased',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#F6EFE6';
                      e.currentTarget.style.borderColor = '#E55729';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#FAF7F2';
                      e.currentTarget.style.borderColor = '#EFE6DC';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Layers style={{ width: '0.875rem', height: '0.875rem', color: '#E55729' }} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#18181B' }}>
                        Need ready-to-run systems today?
                      </span>
                    </div>
                    <span style={{ fontSize: '0.71875rem', fontWeight: 800, color: '#CB451A', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      11 Pre-Made Kits <ArrowRight style={{ width: '0.75rem', height: '0.75rem' }} />
                    </span>
                  </Link>

                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          2. TRUSTED BY STUDENTS, DEVELOPERS & INSTITUTIONS WORLDWIDE
      ═══════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid #EFE6DC',
        borderBottom: '1px solid #EFE6DC',
        background: '#FAF5EE',
        padding: 'clamp(1rem, 2.5vw, 1.5rem) 0',
      }}>
        <div className="shell" style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: '#71717A',
            margin: '0 0 1rem',
          }}>
            Trusted by Students, Developers &amp; Institutions Worldwide
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(0.75rem, 3vw, 2rem)',
            color: '#71717A',
            fontWeight: 800,
            fontSize: 'clamp(0.875rem, 2vw, 1.15rem)',
            letterSpacing: '-0.02em',
          }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Google
            </span>
            <span className="hidden md:inline" style={{ color: '#DDD5CB' }}>|</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Microsoft
            </span>
            <span className="hidden md:inline" style={{ color: '#DDD5CB' }}>|</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              IIT Bombay &amp; Delhi
            </span>
            <span className="hidden md:inline" style={{ color: '#DDD5CB' }}>|</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              AWS Cloud
            </span>
            <span className="hidden md:inline" style={{ color: '#DDD5CB' }}>|</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              TATA
            </span>
            <span className="hidden md:inline" style={{ color: '#DDD5CB' }}>|</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              GitHub
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          3. YOUR COMPLETE PROJECT JOURNEY (FROM REFERENCE IMAGE)
      ═══════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(1.75rem, 3.5vw, 3.25rem) 0',
      }}>
        <div className="shell">
          <div className="journey-grid">

            {/* Left Info Box */}
            <div style={{ maxWidth: '24rem' }} className="text-center md:text-left mx-auto md:mx-0">
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                background: '#FDF6F2',
                border: '1px solid #F3CFBF',
                fontSize: '0.6875rem',
                fontWeight: 800,
                color: '#E55729',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '0.875rem',
              }}>
                Simple. Powerful. Effective.
              </div>

              <h2 style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 900,
                letterSpacing: '-0.04em',
                lineHeight: 1.18,
                color: '#18181B',
                margin: '0 0 0.875rem',
              }}>
                Your Complete Project Journey
              </h2>

              <p style={{
                fontSize: '0.9375rem',
                color: '#52525B',
                lineHeight: 1.65,
                margin: '0 0 1.5rem',
              }}>
                From idea to deployment — everything you need in one place.
              </p>

              <Link
                href="/projects"
                className="hidden md:inline-flex"
                style={{
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.625rem 1.35rem',
                  borderRadius: '9999px',
                  background: '#18181B',
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                  fontWeight: 650,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(24, 24, 27, 0.2)',
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
                Explore Features <ArrowRight style={{ width: '0.9375rem', height: '0.9375rem' }} />
              </Link>
            </div>

            {/* Right 3 Connected Journey Steps with Horizontal Line & Arrows */}
            <div>
              <div className="journey-cards-track mobile-snap-row">
                {/* Step 1 */}
                <div className="journey-step-card">
                  <div>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '50%',
                      background: '#FDF6F2',
                      border: '1px solid #F3CFBF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                    }}>
                      <Lightbulb style={{ width: '1.25rem', height: '1.25rem', color: '#E55729' }} />
                    </div>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#18181B', letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>
                      1. Explore Ideas
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: '#52525B', lineHeight: 1.6, margin: 0 }}>
                      Browse ideas, 1,000+ blueprints or request a custom project built from scratch.
                    </p>
                  </div>
                </div>

                {/* Connector 1 ➔ 2 (Horizontal line with Arrow badge) */}
                <div className="journey-connector" aria-hidden="true">
                  <div className="journey-connector-line" />
                  <div className="journey-arrow-badge">
                    <ArrowRight className="hidden md:block" style={{ width: '13px', height: '13px' }} />
                    <ArrowDown className="block md:hidden" style={{ width: '13px', height: '13px' }} />
                  </div>
                </div>

                {/* Step 2 */}
                <div className="journey-step-card">
                  <div>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '50%',
                      background: '#FDF6F2',
                      border: '1px solid #F3CFBF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                    }}>
                      <Code style={{ width: '1.25rem', height: '1.25rem', color: '#E55729' }} />
                    </div>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#18181B', letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>
                      2. Get Your Project
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: '#52525B', lineHeight: 1.6, margin: 0 }}>
                      Receive verified source code, 60-page IEEE reports &amp; full viva documentation.
                    </p>
                  </div>
                </div>

                {/* Connector 2 ➔ 3 (Horizontal line with Arrow badge) */}
                <div className="journey-connector" aria-hidden="true">
                  <div className="journey-connector-line" />
                  <div className="journey-arrow-badge">
                    <ArrowRight className="hidden md:block" style={{ width: '13px', height: '13px' }} />
                    <ArrowDown className="block md:hidden" style={{ width: '13px', height: '13px' }} />
                  </div>
                </div>

                {/* Step 3 */}
                <div className="journey-step-card">
                  <div>
                    <div style={{
                      width: '3rem',
                      height: '3rem',
                      borderRadius: '50%',
                      background: '#FDF6F2',
                      border: '1px solid #F3CFBF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                    }}>
                      <AirplaneLogo size={20} color="#E55729" />
                    </div>
                    <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#18181B', letterSpacing: '-0.02em', margin: '0 0 0.5rem' }}>
                      3. Launch &amp; Scale
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: '#52525B', lineHeight: 1.6, margin: 0 }}>
                      Deploy, showcase, and scale your software architecture with complete engineering confidence.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mobile-swipe-hint">← Swipe 3 steps →</div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          4. TAILORED FOR COLLEGE STUDENTS, DEVELOPERS & STARTUP FOUNDERS
      ═══════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        background: '#FAF5EE',
        borderTop: '1px solid #EFE6DC',
        borderBottom: '1px solid #EFE6DC',
        padding: 'clamp(1.75rem, 3.5vw, 3.25rem) 0',
      }}>
        <div className="shell">
          <div style={{ textAlign: 'center', maxWidth: '44rem', margin: '0 auto clamp(1.25rem, 3vw, 2.25rem)' }}>
            <p style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#E55729', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 0.5rem' }}>
              One Engineering Platform · Three Core Missions
            </p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#18181B', margin: '0 0 0.75rem' }}>
              Tailored for College Students, Developers &amp; Startup Founders
            </h2>
            <p style={{ fontSize: '0.9375rem', color: '#52525B', lineHeight: 1.6, margin: 0 }}>
              Whether you need an academic capstone with full IEEE documentation, production systems to enhance your developer resume, or a custom startup idea executed into reality without writing code.
            </p>
          </div>

          <div
            className="mobile-snap-row"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
              gap: '1.25rem',
              maxWidth: '72rem',
              margin: '0 auto',
            }}
          >
            {/* Pillar 1: For College Students */}
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid #F3CFBF',
              borderRadius: '22px',
              padding: '1.5rem',
              boxShadow: '0 4px 16px rgba(229, 87, 41, 0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'subpixel-antialiased',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 28px -6px rgba(229, 87, 41, 0.18)';
                e.currentTarget.style.borderColor = '#E55729';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateZ(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(229, 87, 41, 0.06)';
                e.currentTarget.style.borderColor = '#F3CFBF';
              }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                  <span style={{
                    fontSize: '0.6875rem', fontWeight: 800, padding: '0.2rem 0.6rem',
                    borderRadius: '9999px', background: '#FDF6F2', color: '#E55729',
                    border: '1px solid #F3CFBF', textTransform: 'uppercase', letterSpacing: '0.04em',
                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  }}>
                    <GraduationCap style={{ width: '13px', height: '13px', color: '#E55729' }} /> College Students
                  </span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 850, color: '#E55729' }}>₹299 / ₹499 / Custom</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#18181B', letterSpacing: '-0.025em', margin: '0 0 0.5rem' }}>
                  Pre-Made &amp; Custom College Projects
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#52525B', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
                  Approved university topic or syllabus guidelines. Get 100% working code with 60-page IEEE Black Book report (.docx), 20-slide Viva defense presentation, and top 25 examiner Q&amp;A notes for top grades.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                  {['IEEE Black Book (.docx)', 'Viva PPT & Q&A', '1-Click run.bat', 'Plagiarism-Free'].map((t, idx) => (
                    <span key={t} className={idx >= 2 ? "hidden sm:inline-flex" : "inline-flex"} style={{
                      fontSize: '0.6875rem', fontWeight: 650, padding: '0.2rem 0.55rem',
                      borderRadius: '6px', background: '#FAF5EE', border: '1px solid #EFE6DC', color: '#52525B',
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Link
                  href="/projects"
                  style={{
                    flex: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    padding: '0.625rem 0.85rem',
                    borderRadius: '9999px',
                    background: '#18181B',
                    color: '#FFFFFF',
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    transition: 'background 150ms ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#27272A')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#18181B')}
                >
                  Browse Kits <ArrowRight style={{ width: '0.75rem', height: '0.75rem' }} />
                </Link>
                <Link
                  href="/custom?type=college"
                  style={{
                    flex: 1,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.35rem',
                    padding: '0.625rem 0.85rem',
                    borderRadius: '9999px',
                    background: '#FDF6F2',
                    border: '1px solid #F3CFBF',
                    color: '#CB451A',
                    fontSize: '0.8125rem',
                    fontWeight: 750,
                    textDecoration: 'none',
                    transition: 'all 150ms ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = '#FAEDE5';
                    e.currentTarget.style.borderColor = '#E55729';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = '#FDF6F2';
                    e.currentTarget.style.borderColor = '#F3CFBF';
                  }}
                >
                  Custom Topic <ArrowUpRight style={{ width: '0.75rem', height: '0.75rem' }} />
                </Link>
              </div>
            </div>

            {/* Pillar 2: For Developers & Resume Builders */}
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid #EFE6DC',
              borderRadius: '22px',
              padding: '1.5rem',
              boxShadow: '0 2px 8px rgba(24, 24, 27, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'subpixel-antialiased',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 28px -6px rgba(24, 24, 27, 0.12)';
                e.currentTarget.style.borderColor = '#18181B';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateZ(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(24, 24, 27, 0.04)';
                e.currentTarget.style.borderColor = '#EFE6DC';
              }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                  <span style={{
                    fontSize: '0.6875rem', fontWeight: 800, padding: '0.2rem 0.6rem',
                    borderRadius: '9999px', background: '#F4F4F5', color: '#18181B',
                    border: '1px solid #E4E4E7', textTransform: 'uppercase', letterSpacing: '0.04em',
                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  }}>
                    <Code2 style={{ width: '13px', height: '13px', color: '#18181B' }} /> Developers &amp; Builders
                  </span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 850, color: '#18181B' }}>11 Production Systems</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#18181B', letterSpacing: '-0.025em', margin: '0 0 0.5rem' }}>
                  Production Systems &amp; Resume Enhancement
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#52525B', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
                  Need a ready-made project for your resume? Want to enhance your developer profile for campus placements &amp; job interviews? Download verified source code with real-world architecture, schema &amp; APIs.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                  {['Next.js & FastAPI', 'Clean Architecture', 'Resume Enhancer', 'Full Source Code'].map((t, idx) => (
                    <span key={t} className={idx >= 2 ? "hidden sm:inline-flex" : "inline-flex"} style={{
                      fontSize: '0.6875rem', fontWeight: 650, padding: '0.2rem 0.55rem',
                      borderRadius: '6px', background: '#FAF5EE', border: '1px solid #EFE6DC', color: '#52525B',
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              <Link
                href="/projects"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.625rem 1.25rem',
                  borderRadius: '9999px',
                  background: '#18181B',
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'background 150ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#27272A')}
                onMouseLeave={e => (e.currentTarget.style.background = '#18181B')}
              >
                Browse 11 Systems <ArrowRight style={{ width: '0.875rem', height: '0.875rem' }} />
              </Link>
            </div>

            {/* Pillar 3: For Startup Founders & Ideas */}
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid #F3CFBF',
              borderRadius: '22px',
              padding: '1.5rem',
              boxShadow: '0 4px 16px rgba(229, 87, 41, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitFontSmoothing: 'subpixel-antialiased',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 28px -6px rgba(229, 87, 41, 0.22)';
                e.currentTarget.style.borderColor = '#E55729';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateZ(0)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(229, 87, 41, 0.08)';
                e.currentTarget.style.borderColor = '#F3CFBF';
              }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                  <span style={{
                    fontSize: '0.6875rem', fontWeight: 800, padding: '0.2rem 0.6rem',
                    borderRadius: '9999px', background: '#FDF6F2', color: '#E55729',
                    border: '1px solid #F3CFBF', textTransform: 'uppercase', letterSpacing: '0.04em',
                    display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  }}>
                    <Rocket style={{ width: '13px', height: '13px', color: '#E55729' }} /> Startup Founders
                  </span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 850, color: '#CB451A' }}>Starts ₹1,999</span>
                </div>

                <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#18181B', letterSpacing: '-0.025em', margin: '0 0 0.5rem' }}>
                  Execute Startup Ideas into Software
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#52525B', lineHeight: 1.6, margin: '0 0 1.25rem' }}>
                  Turn your software, AI tool, or SaaS concept into working reality. Senior engineers design, build, test, and deliver 100% working software with complete source code &amp; IP ownership in 48–72h.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                  {['100% IP Ownership', '48-72h Launch', 'Zero Code Needed', '1-on-1 Walkthrough'].map((t, idx) => (
                    <span key={t} className={idx >= 2 ? "hidden sm:inline-flex" : "inline-flex"} style={{
                      fontSize: '0.6875rem', fontWeight: 650, padding: '0.2rem 0.55rem',
                      borderRadius: '6px', background: '#FAF5EE', border: '1px solid #EFE6DC', color: '#52525B',
                    }}>{t}</span>
                  ))}
                </div>
              </div>

              <Link
                href="/startup"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  padding: '0.625rem 1.25rem',
                  borderRadius: '9999px',
                  background: 'linear-gradient(180deg, #E86337 0%, #D4491D 100%)',
                  color: '#FFFFFF',
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(229, 87, 41, 0.3)',
                  transition: 'all 160ms ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 6px 18px rgba(229, 87, 41, 0.45)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(229, 87, 41, 0.3)';
                }}
              >
                Execute Startup Idea <ArrowUpRight style={{ width: '0.875rem', height: '0.875rem' }} />
              </Link>
            </div>
          </div>
          <div className="mobile-swipe-hint">← Swipe 3 missions →</div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          5. FEATURED PRODUCTION SYSTEMS (WITH 3D SPRING TABS)
      ═══════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        padding: 'clamp(1.75rem, 3.5vw, 3.25rem) 0',
      }}>
        <div className="shell">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
            <div>
              <p style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#E55729', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 0.5rem' }}>
                Verified &amp; 1-Click Runnable
              </p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#18181B', margin: 0 }}>
                Featured Production Systems
              </h2>
            </div>

            {/* 3D Spring Tabs Glider */}
            <div style={{
              display: 'inline-flex',
              padding: '0.25rem',
              borderRadius: '9999px',
              background: '#F0E6DA',
              border: '1px solid #E5D8CA',
              position: 'relative',
            }}>
              {(['all', 'mini', 'major'] as const).map(tab => {
                const active = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      position: 'relative',
                      padding: '0.4rem 1rem',
                      borderRadius: '9999px',
                      fontSize: '0.8125rem',
                      fontWeight: active ? 750 : 550,
                      color: active ? '#18181B' : '#71717A',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      zIndex: 1,
                      transition: 'color 160ms ease',
                    }}
                  >
                    {active && (
                      <motion.div
                        layoutId="featuredTabsGlider"
                        transition={{ type: 'spring', stiffness: 500, damping: 32 }}
                        style={{
                          position: 'absolute',
                          inset: 0,
                          borderRadius: '9999px',
                          background: '#FFFFFF',
                          boxShadow: '0 2px 8px rgba(24, 24, 27, 0.08)',
                          zIndex: -1,
                        }}
                      />
                    )}
                    {tab === 'all' ? 'All Systems' : tab === 'mini' ? 'Mini Systems' : 'Major Capstones'}
                  </button>
                );
              })}
            </div>

            <Link
              href="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: 700,
                color: '#E55729',
                textDecoration: 'none',
              }}
            >
              Browse all 11 systems <ChevronRight style={{ width: '1rem', height: '1rem' }} />
            </Link>
          </div>

          {/* 3 Main Flagship Cards with 3D Spring Motion */}
          <motion.div
            layout
            className="mobile-snap-row"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
              gap: '1.25rem',
            }}
          >
            {filteredProjects.map((p) => (
              <motion.div
                key={p.slug}
                layout
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '20px',
                  border: '1.5px solid #EFE6DC',
                  boxShadow: '0 2px 8px rgba(24, 24, 27, 0.04)',
                  padding: 'clamp(1rem, 2.5vw, 1.5rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  perspective: 1000,
                  transition: 'border-color 200ms ease, box-shadow 200ms ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#F3CFBF';
                  e.currentTarget.style.boxShadow = '0 16px 36px -8px rgba(24, 24, 27, 0.1), 0 0 0 1px rgba(229, 87, 41, 0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#EFE6DC';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(24, 24, 27, 0.04)';
                }}
              >
                <div>
                  {/* Category & Tier Badge (Price Moved to Bottom) */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                    <span style={{
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.65rem',
                      borderRadius: '9999px',
                      background: '#FDF6F2',
                      color: '#E55729',
                      border: '1px solid #F3CFBF',
                    }}>
                      {p.category}
                    </span>

                    <span style={{
                      fontSize: '0.625rem',
                      fontWeight: 750,
                      padding: '0.18rem 0.55rem',
                      borderRadius: '9999px',
                      background: '#FAF5EE',
                      color: '#18181B',
                      border: '1px solid #EFE6DC',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}>
                      {p.price === 499 ? 'Production System' : 'Software System'}
                    </span>
                    <span className="hidden sm:inline-flex" style={{
                      fontSize: '0.5625rem',
                      fontWeight: 800,
                      padding: '0.15rem 0.45rem',
                      borderRadius: '9999px',
                      background: '#FDF6F2',
                      color: '#E55729',
                      border: '1px solid #F3CFBF',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}>
                      Resume Booster
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#18181B', letterSpacing: '-0.025em', margin: '0 0 0.5rem', lineHeight: 1.35 }}>
                    {p.name}
                  </h3>

                  <p style={{ fontSize: '0.8125rem', color: '#52525B', lineHeight: 1.6, margin: '0 0 1rem' }}>
                    {p.desc}
                  </p>

                  {/* Tech stack pills — clean 1-row on mobile */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                    {p.tech.slice(0, 3).map(t => (
                      <span key={t} style={{
                        fontSize: '0.6875rem', fontWeight: 600, padding: '0.15rem 0.5rem',
                        borderRadius: '6px', background: '#FAF5EE', border: '1px solid #EFE6DC', color: '#52525B',
                        fontFamily: 'var(--font-mono)',
                      }}>{t}</span>
                    ))}
                    {p.tech.slice(3).map(t => (
                      <span key={t} className="hidden sm:inline-flex" style={{
                        fontSize: '0.6875rem', fontWeight: 600, padding: '0.15rem 0.5rem',
                        borderRadius: '6px', background: '#FAF5EE', border: '1px solid #EFE6DC', color: '#52525B',
                        fontFamily: 'var(--font-mono)',
                      }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Price on Left, View Kit & Demo on Right */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '0.625rem',
                  paddingTop: '0.875rem',
                  marginTop: 'auto',
                  borderTop: '1px solid #EFE6DC',
                }}>
                  <div>
                    <span style={{ fontSize: '1.25rem', fontWeight: 900, color: '#18181B', letterSpacing: '-0.03em', lineHeight: 1, display: 'block' }}>
                      ₹{p.price}
                    </span>
                    <span style={{ fontSize: '0.625rem', color: '#71717A', fontWeight: 600 }}>
                      instant download
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Link
                      href={`/projects/${p.slug}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        padding: '0.45rem 0.8rem',
                        borderRadius: '9999px',
                        background: '#18181B',
                        color: '#FFFFFF',
                        fontSize: '0.78125rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        boxShadow: '0 2px 6px rgba(24, 24, 27, 0.2)',
                        transition: 'all 180ms ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#27272A';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#18181B';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      <span>View Kit</span>
                      <ArrowRight style={{ width: '0.75rem', height: '0.75rem' }} />
                    </Link>

                    <Link
                      href={`/projects/${p.slug}#demo`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.28rem',
                        padding: '0.45rem 0.75rem',
                        borderRadius: '9999px',
                        background: '#FDF6F2',
                        color: '#E55729',
                        border: '1px solid #F3CFBF',
                        fontSize: '0.78125rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        transition: 'all 180ms ease',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#FAEDE5';
                        e.currentTarget.style.transform = 'translateY(-1px)';
                        e.currentTarget.style.borderColor = '#E55729';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#FDF6F2';
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.borderColor = '#F3CFBF';
                      }}
                    >
                      <Eye style={{ width: '0.75rem', height: '0.75rem' }} />
                      <span>Demo</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="mobile-swipe-hint">← Swipe systems →</div>

          {/* Full Catalog Banner */}
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            borderRadius: '20px',
            background: '#FAF5EE',
            border: '1px solid #EFE6DC',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
          }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.6875rem', fontWeight: 800, color: '#E55729', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.35rem' }}>
                <Package style={{ width: '13px', height: '13px' }} /> Full Production Vault
              </div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 900, color: '#18181B', letterSpacing: '-0.02em', margin: '0 0 0.25rem' }}>
                Need another domain? Browse all 11 verified engineering systems
              </h3>
              <p style={{ fontSize: '0.84375rem', color: '#52525B', margin: 0 }}>
                From FinTech fraud radars to deep learning crop pathology — each verified with clean code &amp; 1-click execution.
              </p>
            </div>

            <Link
              href="/projects"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.625rem 1.35rem',
                borderRadius: '9999px',
                background: '#18181B',
                color: '#FFFFFF',
                fontSize: '0.875rem',
                fontWeight: 650,
                textDecoration: 'none',
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
              Explore All 11 Systems <ArrowRight style={{ width: '0.9375rem', height: '0.9375rem' }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          6. PRICING SECTION (SIMPLE, TRANSPARENT PRICING)
      ═══════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        background: '#FAF5EE',
        borderTop: '1px solid #EFE6DC',
        borderBottom: '1px solid #EFE6DC',
        padding: 'clamp(1.75rem, 3.5vw, 3.25rem) 0',
      }}>
        <div className="shell" style={{ maxWidth: '64rem' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(1.25rem, 3vw, 2.25rem)' }}>
            <p style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#E55729', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.5rem' }}>
              Pre-Made Projects for College Students · Placement &amp; Resume Enhancement
            </p>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#18181B', margin: '0 0 0.75rem' }}>
              Software Systems &amp; Production Systems. Simple Pricing.
            </h2>
            <p style={{ fontSize: '0.9375rem', color: '#52525B', margin: '0 auto', maxWidth: '38rem', lineHeight: 1.65 }}>
              Need a ready-made project for your resume? Want to enhance your developer profile for campus placements &amp; interviews? Pre-made, tested, and ready to deploy in 60 seconds.
            </p>
          </div>

          <div
            className="mobile-snap-row"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
              gap: '1.25rem',
            }}
          >
            {/* Mini: Software System */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #EFE6DC',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(24, 24, 27, 0.04)',
              transition: 'all 200ms cubic-bezier(.16, 1, .3, 1)',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#F3CFBF';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 28px -4px rgba(24, 24, 27, 0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#EFE6DC';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(24, 24, 27, 0.04)';
              }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#E55729', textTransform: 'uppercase', letterSpacing: '0.06em', background: '#FDF6F2', padding: '0.15rem 0.5rem', borderRadius: '9999px', border: '1px solid #F3CFBF' }}>
                    Pre-Made College Project
                  </span>
                  <span style={{ fontSize: '0.625rem', fontWeight: 700, color: '#71717A' }}>Resume Ready</span>
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 850, color: '#18181B', letterSpacing: '-0.02em', margin: '0.25rem 0' }}>
                  Software System (Mini Kit)
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', margin: '0.4rem 0 0.75rem' }}>
                  <span style={{ fontSize: '1.875rem', fontWeight: 900, color: '#18181B', letterSpacing: '-0.03em' }}>₹299</span>
                  <span style={{ fontSize: '0.8125rem', color: '#71717A' }}>(~$4 USD)</span>
                </div>
                <p style={{ fontSize: '0.84375rem', color: '#52525B', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  <span className="sm:hidden">Ready-to-run full-stack code with 30-page IEEE report, 10-slide Viva PPT, and 1-click execution.</span>
                  <span className="hidden sm:inline">Pre-made full-stack software system for college students. Ready-to-run working code, 30-page IEEE report (.docx), 10-slide Viva defense presentation, and 1-click execution.</span>
                </p>
              </div>

              <Link
                href="/projects?tier=MINI"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.625rem 1rem',
                  borderRadius: '9999px',
                  background: '#FFFFFF',
                  color: '#18181B',
                  border: '1.5px solid #EFE6DC',
                  fontSize: '0.84375rem',
                  fontWeight: 650,
                  textDecoration: 'none',
                  transition: 'all 150ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#F3CFBF')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#EFE6DC')}
              >
                Browse Pre-Made Kits (₹299)
              </Link>
            </div>

            {/* Major: Production System */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #EFE6DC',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 2px 8px rgba(24, 24, 27, 0.04)',
              transition: 'all 200ms cubic-bezier(.16, 1, .3, 1)',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = '#F3CFBF';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 28px -4px rgba(24, 24, 27, 0.08)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#EFE6DC';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(24, 24, 27, 0.04)';
              }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.625rem', fontWeight: 800, color: '#E55729', textTransform: 'uppercase', letterSpacing: '0.06em', background: '#FDF6F2', padding: '0.15rem 0.5rem', borderRadius: '9999px', border: '1px solid #F3CFBF' }}>
                    Production-Grade Capstone
                  </span>
                  <span style={{ fontSize: '0.625rem', fontWeight: 700, color: '#16A34A', background: '#F0FDF4', padding: '0.15rem 0.5rem', borderRadius: '9999px', border: '1px solid #BBF7D0' }}>Profile Booster</span>
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 850, color: '#18181B', letterSpacing: '-0.02em', margin: '0.25rem 0' }}>
                  Production System (Major Kit)
                </h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', margin: '0.4rem 0 0.75rem' }}>
                  <span style={{ fontSize: '1.875rem', fontWeight: 900, color: '#18181B', letterSpacing: '-0.03em' }}>₹499</span>
                  <span style={{ fontSize: '0.8125rem', color: '#71717A' }}>(~$6 USD)</span>
                </div>
                <p style={{ fontSize: '0.84375rem', color: '#52525B', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  <span className="sm:hidden">Production capstone with 60-page IEEE Black Book (.docx), 20-slide defense PPT, top 25 Viva Q&amp;A.</span>
                  <span className="hidden sm:inline">Complete production system with advanced architecture. 60-page IEEE Black Book report (.docx), 20-slide defense PPT, top 25 Viva Q&amp;A, and high-impact resume enhancement.</span>
                </p>
              </div>

              <Link
                href="/projects?tier=MAJOR"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.625rem 1rem',
                  borderRadius: '9999px',
                  background: '#FFFFFF',
                  color: '#18181B',
                  border: '1.5px solid #EFE6DC',
                  fontSize: '0.84375rem',
                  fontWeight: 650,
                  textDecoration: 'none',
                  transition: 'all 150ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#F3CFBF')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#EFE6DC')}
              >
                Browse Production Systems (₹499)
              </Link>
            </div>

            {/* Custom Build */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1.5px solid #F3CFBF',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 6px 20px rgba(229, 87, 41, 0.12)',
              position: 'relative',
              transition: 'all 200ms cubic-bezier(.16, 1, .3, 1)',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(229, 87, 41, 0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(229, 87, 41, 0.12)';
              }}>
              <div style={{ position: 'absolute', top: '-11px', right: '14px' }}>
                <span style={{
                  padding: '0.2rem 0.65rem',
                  borderRadius: '9999px',
                  background: '#E55729',
                  color: '#FFFFFF',
                  fontSize: '0.625rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}>
                  Custom Built
                </span>
              </div>

              <div>
                <span style={{ fontSize: '0.6875rem', fontWeight: 800, color: '#E55729', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Custom College Project / Startup Execution
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', margin: '0.5rem 0 0.75rem' }}>
                  <span style={{ fontSize: '1.875rem', fontWeight: 900, color: '#18181B', letterSpacing: '-0.03em' }}>₹1,999</span>
                  <span style={{ fontSize: '0.8125rem', color: '#71717A' }}>(~$24 USD)</span>
                </div>
                <p style={{ fontSize: '0.84375rem', color: '#52525B', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  <span className="sm:hidden">Custom working code, database, UI, 60-page IEEE report (.docx), and 1-on-1 walkthrough in 48–72h.</span>
                  <span className="hidden sm:inline">Have an approved college topic or a startup concept? 100% working code, database, UI, IEEE documentation (.docx), and a 1-on-1 walkthrough in 48–72 hours.</span>
                </p>
              </div>

              <Link
                href="/custom"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.625rem 1rem',
                  borderRadius: '9999px',
                  background: 'linear-gradient(180deg, #FF6B4A 0%, #FF522B 100%)',
                  color: '#FFFFFF',
                  fontSize: '0.84375rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(255, 92, 53, 0.3)',
                }}
              >
                Customize Your Project / Idea →
              </Link>
            </div>
          </div>
          <div className="mobile-swipe-hint">← Swipe to compare plans →</div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          7. FREQUENTLY ASKED QUESTIONS (FAQ)
      ═══════════════════════════════════════════════════ */}
      <FaqSection />

      {/* ═══════════════════════════════════════════════════
          8. TRUST & ACADEMIC STANDARD GUARANTEE
      ═══════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        zIndex: 1,
        borderTop: '1px solid #EFE6DC',
        padding: 'clamp(1.75rem, 3.5vw, 3.25rem) 0',
        background: '#FAF5EE',
      }}>
        <div className="shell">
          <div style={{ textAlign: 'center', marginBottom: 'clamp(1rem, 2.5vw, 1.5rem)' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.25rem 0.75rem',
              borderRadius: '9999px',
              background: '#FDF6F2',
              border: '1px solid #F3CFBF',
              fontSize: '0.6875rem',
              fontWeight: 800,
              color: '#E55729',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.5rem',
            }}>
              <AirplaneLogo size={12} color="#E55729" />
              What Every Kit Includes
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2rem)', fontWeight: 900, color: '#18181B', letterSpacing: '-0.04em', margin: 0 }}>
              Engineering-Grade. Academic Standard.
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#52525B', margin: '0.4rem auto 0', maxWidth: '32rem', lineHeight: 1.55 }}>
              Every single kit is pre-configured with tested code, defense slides, and physical IEEE documentation.
            </p>
          </div>

          <div className="deliverables-grid" style={{ maxWidth: '72rem', margin: '0 auto' }}>
            {[
              {
                Icon: ShieldCheck,
                t: '100% Working Code',
                badge: 'Verified Clean',
                d: 'Pre-tested on clean Windows and macOS machines with complete source code ownership.',
              },
              {
                Icon: Zap,
                t: '1-Click Launchers',
                badge: 'run.bat & run.sh',
                d: 'Double-click to automatically configure dependencies, boot backend, and open browser.',
              },
              {
                Icon: FileText,
                t: 'IEEE Black Book',
                badge: '60-Page .docx',
                d: 'Physical university format report with system architecture, ER diagrams, and test logs.',
              },
              {
                Icon: Presentation,
                t: 'Viva PPT & Notes',
                badge: '20 Slides + Q&A',
                d: 'Defense presentation slide deck plus top 25 examiner viva questions with model answers.',
              },
            ].map(({ Icon, t, badge, d }) => (
              <div key={t} className="deliverable-card">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div
                      className="deliverable-icon-box"
                      style={{
                        width: '2.5rem',
                        height: '2.5rem',
                        borderRadius: '12px',
                        background: '#FDF6F2',
                        border: '1.2px solid #F3CFBF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 1px 3px rgba(229, 87, 41, 0.08)',
                        transition: 'transform 200ms ease, border-color 200ms ease',
                      }}
                    >
                      <Icon style={{ width: '1.15rem', height: '1.15rem', color: '#E55729' }} />
                    </div>
                    <span style={{
                      fontSize: '0.625rem',
                      fontWeight: 750,
                      color: '#E55729',
                      background: '#FDF6F2',
                      border: '1px solid #F3CFBF',
                      padding: '0.18rem 0.55rem',
                      borderRadius: '9999px',
                      letterSpacing: '0.02em',
                    }}>
                      {badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 800, color: '#18181B', letterSpacing: '-0.02em', margin: '0 0 0.4rem' }}>
                    {t}
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: '#52525B', lineHeight: 1.55, margin: 0 }}>
                    {d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
