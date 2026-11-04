'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Clock, CheckCircle2, ArrowRight,
  Sparkles, Check, Bell, Star, Tag, Users
} from 'lucide-react';
import { READY_PROJECTS } from '@/lib/available-projects';
import { CONSTANTS } from '@/lib/constants';

// Price map derived from CONSTANTS — single source of truth
const PRICE_MAP: Record<string, number> = {
  'healthcare-ehr-portal':  CONSTANTS.PRICING.MAJOR_PROJECT,
  'blood-bank-management':  CONSTANTS.PRICING.MINI_PROJECT,
  'resume-parsing-engine':  CONSTANTS.PRICING.MAJOR_PROJECT,
  'online-code-compiler':   CONSTANTS.PRICING.MAJOR_PROJECT,
  'credit-card-fraud':      CONSTANTS.PRICING.MINI_PROJECT,
  'phishing-detector-ai':   CONSTANTS.PRICING.MINI_PROJECT,
  'restaurant-qr-ordering': CONSTANTS.PRICING.MINI_PROJECT,
  'aerofuel-predictor':     CONSTANTS.PRICING.MAJOR_PROJECT,
  'smart-expense-tracker':  CONSTANTS.PRICING.MINI_PROJECT,
};

// Tag colours for upcoming cards (Clean Teal, Amber, Emerald, Slate palette — zero rogue purple)
const TAG_COLORS: Record<string, string> = {
  'Dropping Friday': 'text-amber-800 bg-amber-50 border-amber-200',
  'High Demand':     'text-rose-800 bg-rose-50 border-rose-200',
  'Most Requested':  'text-teal-900 bg-teal-50 border-teal-200',
  'Trending':        'text-amber-900 bg-amber-50/80 border-amber-200',
  'In Testing':      'text-slate-800 bg-slate-100 border-slate-200',
  'Security Lab':    'text-emerald-800 bg-emerald-50 border-emerald-200',
};

const UPCOMING_CATALOG = [
  {
    slug: 'crop-disease-detector',
    name: 'Smart Crop Disease Detector AI',
    category: 'AIML',
    tier: 'MAJOR',
    price: CONSTANTS.PRICING.MAJOR_PROJECT,
    requests: '1,420+ students',
    description: 'Snap a photo of any sick crop leaf. The AI detects the exact plant disease in seconds and prescribes the right treatment plan.',
    tenthGradeExplainer: 'Works like a digital plant doctor on your phone. Farmers upload a photo of a sick leaf, and the AI instantly identifies the disease and tells them which spray or medicine will save their crop.',
    tag: 'Dropping Friday',
  },
  {
    slug: 'skin-lesion-classifier',
    name: 'DermatoScan Skin Lesion & Cancer AI',
    category: 'AIML',
    tier: 'MAJOR',
    price: CONSTANTS.PRICING.MAJOR_PROJECT,
    requests: '1,180+ students',
    description: 'AI medical screening tool that spots suspicious skin spots and mole changes with 94%+ diagnostic accuracy.',
    tenthGradeExplainer: 'Takes a photo of any skin mole or rash and immediately analyzes whether it looks harmless or warrants a doctor checkup, highlighting the danger areas with visual heatmaps.',
    tag: 'High Demand',
  },
  {
    slug: 'face-attendance-system',
    name: 'Smart Classroom Face Recognition Attendance',
    category: 'AIML',
    tier: 'MINI',
    price: CONSTANTS.PRICING.MINI_PROJECT,
    requests: '2,350+ students',
    description: 'Automated attendance system using classroom cameras with anti-spoofing photo protection and 1-click Excel export.',
    tenthGradeExplainer: 'Replaces manual roll-call. Scans students faces as they enter class, detects if anyone tries holding up a fake phone photo, and auto-marks attendance in an Excel sheet in real time.',
    tag: 'Most Requested',
  },
  {
    slug: 'crypto-portfolio-tracker',
    name: 'Live Web3 Crypto Tracker & Risk Engine',
    category: 'FinTech',
    tier: 'MINI',
    price: CONSTANTS.PRICING.MINI_PROJECT,
    requests: '980+ students',
    description: 'Real-time multi-wallet cryptocurrency portfolio dashboard with live CoinGecko API prices, profit/loss metrics, and risk scores.',
    tenthGradeExplainer: 'Shows all crypto investments in one clean screen, tracks live prices, and calculates daily profits and wallet risk automatically.',
    tag: 'Trending',
  },
  {
    slug: 'microservices-log-aggregator',
    name: 'Distributed Cloud Log Engine (ELK Stack)',
    category: 'Cloud',
    tier: 'MAJOR',
    price: CONSTANTS.PRICING.MAJOR_PROJECT,
    requests: '840+ students',
    description: 'Enterprise-grade microservices log pipeline with Docker Compose, Elasticsearch search, and live Kibana dashboards.',
    tenthGradeExplainer: 'Collects error logs from multiple backend servers into one searchable dashboard so developers instantly see what went wrong.',
    tag: 'In Testing',
  },
  {
    slug: 'network-intrusion-ids',
    name: 'Neural Network Intrusion Detection (IDS)',
    category: 'Cybersecurity',
    tier: 'MAJOR',
    price: CONSTANTS.PRICING.MAJOR_PROJECT,
    requests: '1,670+ students',
    description: 'Deep learning cyber defense system that inspects live PCAP network packets to detect DDoS attacks, port scans, and malware probes.',
    tenthGradeExplainer: 'Acts like a digital security guard for college computer networks, spotting hackers trying to break in and sending immediate alerts.',
    tag: 'Security Lab',
  },
];

export function FleetSection() {
  const [activeTab, setActiveTab] = useState<'available' | 'upcoming'>('available');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [reserveModalProject, setReserveModalProject] = useState<string | null>(null);
  const [reservedEmail, setReservedEmail] = useState('');
  const [reserveSuccess, setReserveSuccess] = useState(false);

  // Strictly filter only genuinely ready-to-ship projects (the 9 verified flagship kits)
  const availableProjects = Object.values(READY_PROJECTS).filter(p => p.isReady);

  const filteredAvailable = selectedCategory === 'ALL'
    ? availableProjects
    : availableProjects.filter(p => p.category === selectedCategory);

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservedEmail) return;
    setReserveSuccess(true);
    setTimeout(() => {
      setReserveSuccess(false);
      setReserveModalProject(null);
      setReservedEmail('');
    }, 2500);
  };

  return (
    <section className="py-20 relative border-t border-[var(--line)] bg-transparent">
      <div className="container mx-auto px-4 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="section-label mb-3">Live Inventory</div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 mb-3 tracking-tight">
            Available Kits &amp; <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">Upcoming Drops</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            9 production-tested, execution-ready kits for instant checkout — or preview the next high-demand batch.
          </p>

          {/* Tab Switcher */}
          <div className="flex items-center justify-center gap-1.5 mt-8 p-1 rounded-2xl bg-slate-200/60 border border-slate-300/60 w-fit mx-auto">
            <button
              onClick={() => setActiveTab('available')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'available'
                  ? 'bg-white text-emerald-800 shadow-sm border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Available Now</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'available' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
              }`}>
                9 Kits
              </span>
            </button>

            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                activeTab === 'upcoming'
                  ? 'bg-white text-teal-800 shadow-sm border border-teal-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>Upcoming Drops</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'upcoming' ? 'bg-teal-100 text-teal-800' : 'bg-slate-200 text-slate-600'
              }`}>
                Batch 2
              </span>
            </button>
          </div>
        </div>

        {/* ══ TAB 1: AVAILABLE NOW ══ */}
        <AnimatePresence mode="wait">
          {activeTab === 'available' && (
            <motion.div
              key="available"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
            >
              {/* Category Pills — Clean, Descent, No Emojis, 3D Tactile Filter */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                {[
                  { id: 'ALL',          label: 'All 9 Kits' },
                  { id: 'Healthcare',   label: 'Healthcare' },
                  { id: 'AIML',         label: 'AI / Machine Learning' },
                  { id: 'Cloud',        label: 'Cloud & DevTools' },
                  { id: 'Cybersecurity',label: 'Cybersecurity' },
                  { id: 'FinTech',      label: 'FinTech' },
                  { id: 'FullStack',    label: 'Full-Stack' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-gradient-to-r from-teal-700 to-teal-800 text-white shadow-md shadow-teal-900/20'
                        : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200/90 shadow-2xs hover:border-teal-300 hover:bg-teal-50/40'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {filteredAvailable.map(project => {
                  const price = PRICE_MAP[project.slug] ?? CONSTANTS.PRICING.MINI_PROJECT;
                  const isMajor = price === CONSTANTS.PRICING.MAJOR_PROJECT;

                  return (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="card card-lift flex flex-col rounded-2xl border border-slate-200/90 hover:border-teal-400 transition-all duration-300 relative overflow-hidden p-6 group cursor-pointer"
                      style={{
                        background: 'var(--surface)',
                        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(15, 23, 42, 0.06)',
                      }}
                    >
                      {/* Top 3D accent */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{
                          background: isMajor
                            ? 'linear-gradient(90deg, #0D9488, #14B8A6)'
                            : 'linear-gradient(90deg, #14B8A6, #059669)',
                        }}
                      />
                      {/* Tier badge top-right */}
                      <div className="absolute top-4 right-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isMajor
                            ? 'bg-teal-50 text-teal-800 border-teal-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {isMajor ? 'MAJOR' : 'MINI'}
                        </span>
                      </div>

                      {/* Status row */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          Ready to Ship
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">{project.category}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-display font-bold text-slate-900 mb-1.5 leading-snug pr-12 group-hover:text-teal-600 transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed mb-4">
                        {project.oneLiner}
                      </p>

                      {/* Quick Overview callout */}
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-5 text-[11px] text-slate-600 leading-relaxed">
                        <div className="flex items-center gap-1.5 font-bold text-emerald-700 text-[10px] uppercase tracking-wider mb-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Quick Overview:
                        </div>
                        <p className="text-slate-600">{project.tenthGradeExplainer}</p>
                      </div>

                      {/* Deliverables */}
                      <div className="grid grid-cols-2 gap-1.5 mb-5 pt-3 border-t border-slate-100 text-[10px] text-slate-500 font-medium">
                        {[
                          '1-Click Runnable Code',
                          '60-Page IEEE Black Book',
                          'Defense PPT Slides',
                          'Top 25 Viva Q&A Answers',
                        ].map(item => (
                          <div key={item} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-lg font-bold text-slate-900">₹{price}</span>
                          <span className="text-[10px] text-slate-400 ml-1">one-time</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-white bg-teal-600 group-hover:bg-teal-700 px-3.5 py-1.5 rounded-xl transition-all shadow-sm">
                          View & Buy
                          <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {filteredAvailable.length === 0 && (
                <div className="text-center py-16 text-slate-400">
                  No kits in this category yet.
                </div>
              )}

              <div className="mt-12 text-center">
                <Link
                  href="/projects?status=AVAILABLE"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors border border-teal-200 bg-teal-50 hover:bg-teal-100 px-5 py-2.5 rounded-xl shadow-sm"
                >
                  View Full Project Catalog
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}

          {/* ══ TAB 2: UPCOMING DROPS ══ */}
          {activeTab === 'upcoming' && (
            <motion.div
              key="upcoming"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.18 }}
            >
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 max-w-3xl mx-auto mb-10 text-center text-teal-900 text-xs sm:text-sm leading-relaxed shadow-sm">
                <span className="font-bold text-teal-950">Batch 2 Release Pipeline:</span> These high-demand projects are undergoing final QA tests and documentation. Pre-order now to lock in launch discounts and get instant WhatsApp delivery the moment they drop!
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {UPCOMING_CATALOG.map(project => {
                  const tagClass = TAG_COLORS[project.tag] ?? 'text-slate-800 bg-slate-100 border-slate-200';
                  return (
                    <div
                      key={project.slug}
                      className="card card-lift flex flex-col rounded-2xl border border-slate-200/90 hover:border-teal-400 transition-all duration-300 relative overflow-hidden p-6 group"
                      style={{
                        background: 'var(--surface)',
                        boxShadow: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -4px rgba(15, 23, 42, 0.06)',
                      }}
                    >
                      {/* Top row */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${tagClass}`}>
                          <Clock className="w-2.5 h-2.5" />
                          {project.tag}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                          <Users className="w-2.5 h-2.5" />
                          {project.requests}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          project.tier === 'MAJOR'
                            ? 'bg-teal-50 text-teal-800 border-teal-200'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {project.tier}
                        </span>
                      </div>

                      <h3 className="text-base font-display font-bold text-slate-900 mb-1.5 leading-snug pr-12">
                        {project.name}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed mb-4">{project.description}</p>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 mb-5 text-[11px] text-slate-600 leading-relaxed">
                        <div className="flex items-center gap-1.5 font-bold text-teal-700 text-[10px] uppercase tracking-wider mb-1">
                          <CheckCircle2 className="w-3 h-3 text-teal-600" />
                          Quick Overview:
                        </div>
                        <p className="text-slate-600">{project.tenthGradeExplainer}</p>
                      </div>

                      <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-lg font-bold text-slate-900">₹{project.price}</span>
                          <span className="text-[10px] text-slate-400 ml-1">pre-order</span>
                        </div>
                        <button
                          onClick={() => setReserveModalProject(project.name)}
                          className="flex items-center gap-1.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 px-3.5 py-1.5 rounded-xl transition-all shadow-sm"
                        >
                          <Bell className="w-3.5 h-3.5" />
                          Pre-Order
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 text-center">
                <Link
                  href="/projects?status=UPCOMING"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors"
                >
                  View all upcoming pipeline projects in the master catalog
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pre-Order Modal */}
      {reserveModalProject && (
        <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(15,23,42,.45)', backdropFilter: 'blur(6px)' }}
          onClick={e => { if (e.target === e.currentTarget) setReserveModalProject(null); }}
        >
          <div className="bg-white w-full max-w-md p-6 rounded-2xl border border-slate-200 shadow-2xl">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-0.5">Pre-Order &amp; Early Access</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{reserveModalProject}</p>
              </div>
            </div>

            {reserveSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                Reserved! You&apos;ll get priority download access the moment this drops.
              </div>
            ) : (
              <form onSubmit={handleReserveSubmit} className="space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lock in launch-day pricing (₹{CONSTANTS.PRICING.MINI_PROJECT}–₹{CONSTANTS.PRICING.MAJOR_PROJECT}) and get emailed the instant this kit drops.
                </p>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={reservedEmail}
                  onChange={e => setReservedEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm outline-none focus:border-teal-500 transition-all placeholder:text-slate-400"
                />
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setReserveModalProject(null)}
                    className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-all shadow-sm"
                  >
                    Lock My Reservation
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
