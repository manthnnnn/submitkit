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

// Tag colours for upcoming cards
const TAG_COLORS: Record<string, string> = {
  'Dropping Friday': 'text-amber-300 bg-amber-500/15 border-amber-500/30',
  'High Demand':     'text-rose-300 bg-rose-500/15 border-rose-500/30',
  'Most Requested':  'text-sky-300 bg-sky-500/15 border-sky-500/30',
  'Trending':        'text-orange-300 bg-orange-500/15 border-orange-500/30',
  'In Testing':      'text-zinc-300 bg-zinc-500/15 border-zinc-500/30',
  'Security Lab':    'text-red-300 bg-red-500/15 border-red-500/30',
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
    slug: 'spaceshield-ai',
    name: 'SpaceShield AI: Satellite Debris Collision Radar',
    category: 'AIML',
    tier: 'MAJOR',
    price: CONSTANTS.PRICING.MAJOR_PROJECT,
    requests: '960+ students',
    description: 'Predicts space junk orbits and alerts satellite operators before high-speed space collisions happen.',
    tenthGradeExplainer: 'Tracks thousands of pieces of space junk flying around Earth and calculates safety warnings so satellites can steer out of the danger zone in time.',
    tag: 'Trending',
  },
  {
    slug: 'smart-city-traffic',
    name: 'Smart City Traffic & Live Accident Detection',
    category: 'AIML',
    tier: 'MAJOR',
    price: CONSTANTS.PRICING.MAJOR_PROJECT,
    requests: '880+ students',
    description: 'CCTV video analytics system that detects road crashes in real time and automatically alerts emergency response teams with GPS coordinates.',
    tenthGradeExplainer: 'Monitors traffic camera feeds 24/7. When two vehicles crash, it instantly spots the impact and sends the exact GPS location to emergency services.',
    tag: 'In Testing',
  },
  {
    slug: 'ransomware-sandbox',
    name: 'Automated Ransomware Detonation & Defense Sandbox',
    category: 'Cybersecurity',
    tier: 'MAJOR',
    price: CONSTANTS.PRICING.MAJOR_PROJECT,
    requests: '790+ students',
    description: 'Safe, isolated testing chamber that safely unleashes malware samples to detect malicious encryption before it spreads across a network.',
    tenthGradeExplainer: 'A secure digital quarantine room. It runs dangerous malware safely inside an isolated environment to study how it attacks files and stop it before real computers get hit.',
    tag: 'Security Lab',
  },
];

export function FleetSection() {
  const [activeTab, setActiveTab] = useState<'available' | 'upcoming'>('available');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [reserveModalProject, setReserveModalProject] = useState<string | null>(null);
  const [reservedEmail, setReservedEmail] = useState('');
  const [reserveSuccess, setReserveSuccess] = useState(false);

  const availableList = Object.values(READY_PROJECTS);

  const filteredAvailable = availableList.filter(p => {
    if (selectedCategory === 'ALL') return true;
    if (selectedCategory === 'FullStack') return p.category === 'FullStack' || p.category === 'Cloud';
    return p.category === selectedCategory;
  });

  const handleReserveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservedEmail.includes('@') || !reserveModalProject) return;
    try {
      // Find slug for the project name
      const slug = UPCOMING_CATALOG.find(p => p.name === reserveModalProject)?.slug ?? reserveModalProject.toLowerCase().replace(/\s+/g, '-');
      await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: reservedEmail, projectName: reserveModalProject, projectSlug: slug }),
      });
    } catch { /* silent — success UI still shows */ }
    setReserveSuccess(true);
    setTimeout(() => {
      setReserveModalProject(null);
      setReserveSuccess(false);
      setReservedEmail('');
    }, 1800);
  };

  return (
    <section className="py-20 relative z-10 border-t border-white/5 bg-[#09090b]">
      <div className="container mx-auto px-4">

        {/* ── Section Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Software Fleet</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white mb-4 tracking-tight">
            Available Kits &amp; <span className="text-gradient">Upcoming Drops</span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
            9 production-tested, execution-ready kits for instant checkout — or preview the next high-demand batch.
          </p>

          {/* Tab Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8 p-1.5 rounded-2xl bg-[#141419] border border-white/10 w-fit mx-auto">
            <button
              onClick={() => setActiveTab('available')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeTab === 'available'
                  ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_25px_rgba(16,185,129,0.35)] scale-[1.02]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Available Now</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                activeTab === 'available' ? 'bg-black/20 text-zinc-950' : 'bg-white/10 text-zinc-400'
              }`}>
                9 Kits
              </span>
            </button>

            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                activeTab === 'upcoming'
                  ? 'bg-purple-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.35)] scale-[1.02]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Upcoming Drops</span>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                activeTab === 'upcoming' ? 'bg-white/20 text-white' : 'bg-white/10 text-zinc-400'
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
              {/* Category Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                {[
                  { id: 'ALL',          label: 'All 9 Kits' },
                  { id: 'Healthcare',   label: '🏥 Healthcare' },
                  { id: 'AIML',         label: '🧠 AI / ML' },
                  { id: 'Cloud',        label: '⚡ Cloud & DevTools' },
                  { id: 'Cybersecurity',label: '🛡️ Cybersecurity' },
                  { id: 'FinTech',      label: '💳 FinTech' },
                  { id: 'FullStack',    label: '📱 Full-Stack' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-white/15 text-white border border-white/25 shadow-sm'
                        : 'text-zinc-400 hover:text-zinc-200 bg-white/[0.02] border border-white/5'
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
                      className="glass-card flex flex-col rounded-2xl border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden p-6 bg-gradient-to-b from-white/[0.03] to-transparent shadow-xl shadow-emerald-500/5 group cursor-pointer"
                    >
                      {/* Tier badge top-right */}
                      <div className="absolute top-3 right-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isMajor
                            ? 'bg-brand-500/15 text-brand-400 border-brand-500/25'
                            : 'bg-zinc-800 text-zinc-300 border-white/10'
                        }`}>
                          {isMajor ? 'MAJOR' : 'MINI'}
                        </span>
                      </div>

                      {/* Status row */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-0.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Ready to Ship
                        </span>
                        <span className="text-[10px] text-zinc-500 font-medium">{project.category}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-display font-bold text-white mb-2 leading-snug pr-12 group-hover:text-emerald-100 transition-colors group-hover:underline decoration-emerald-500/40 underline-offset-2">
                        {project.name}
                      </h3>
                      <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                        {project.oneLiner}
                      </p>

                      {/* Quick Overview callout */}
                      <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 mb-5 text-[11px] text-zinc-300 leading-relaxed">
                        <div className="flex items-center gap-1.5 font-semibold text-emerald-400 text-[10px] uppercase tracking-wider mb-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Quick Overview:
                        </div>
                        <p className="text-zinc-300">{project.tenthGradeExplainer}</p>
                      </div>

                      {/* Deliverables */}
                      <div className="grid grid-cols-2 gap-1.5 mb-6 pt-3 border-t border-white/5 text-[10px] text-zinc-400">
                        {[
                          '1-Click Runnable Code',
                          '60-Page IEEE Black Book',
                          'Defense PPT Slides',
                          'Top 25 Viva Q&A Answers',
                        ].map(item => (
                          <div key={item} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer */}
                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-lg font-bold text-white">₹{price}</span>
                          <span className="text-[10px] text-zinc-500 ml-1">one-time</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-zinc-950 bg-white group-hover:bg-emerald-400 px-4 py-2 rounded-xl transition-all shadow-md shadow-white/10">
                          View & Buy
                          <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {filteredAvailable.length === 0 && (
                <div className="text-center py-16 text-zinc-500">
                  No kits in this category yet.
                </div>
              )}

              <div className="mt-12 text-center">
                <Link
                  href="/projects?status=AVAILABLE"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 px-5 py-2.5 rounded-xl"
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
              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 max-w-3xl mx-auto mb-10 text-center text-purple-200 text-sm leading-relaxed">
                <span className="font-bold text-white">Batch 2 Release Pipeline:</span> These high-demand projects are undergoing final QA tests and documentation. Pre-order now to lock in launch discounts and get instant WhatsApp delivery the moment they drop!
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {UPCOMING_CATALOG.map(project => {
                  const tagClass = TAG_COLORS[project.tag] ?? 'text-zinc-300 bg-zinc-500/15 border-zinc-500/30';
                  return (
                    <div
                      key={project.slug}
                      className="glass-card flex flex-col rounded-2xl border border-purple-500/15 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden p-6 bg-gradient-to-b from-white/[0.02] to-transparent group"
                    >
                      {/* Top row */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${tagClass}`}>
                          <Clock className="w-2.5 h-2.5" />
                          {project.tag}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-zinc-500 font-medium">
                          <Users className="w-2.5 h-2.5" />
                          {project.requests}
                        </span>
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          project.tier === 'MAJOR'
                            ? 'bg-brand-500/15 text-brand-400 border-brand-500/25'
                            : 'bg-zinc-800 text-zinc-300 border-white/10'
                        }`}>
                          {project.tier}
                        </span>
                      </div>

                      <h3 className="text-base font-display font-bold text-white mb-2 leading-snug pr-12">
                        {project.name}
                      </h3>
                      <p className="text-zinc-400 text-xs leading-relaxed mb-4">{project.description}</p>

                      <div className="p-3 rounded-xl bg-zinc-900/60 border border-purple-500/20 mb-5 text-[11px] text-zinc-300 leading-relaxed">
                        <div className="flex items-center gap-1.5 font-semibold text-purple-400 text-[10px] uppercase tracking-wider mb-1">
                          <CheckCircle2 className="w-3 h-3 text-purple-400" />
                          Quick Overview:
                        </div>
                        <p className="text-zinc-300">{project.tenthGradeExplainer}</p>
                      </div>

                      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                        <div>
                          <span className="text-lg font-bold text-white">₹{project.price}</span>
                          <span className="text-[10px] text-zinc-500 ml-1">pre-order</span>
                        </div>
                        <button
                          onClick={() => setReserveModalProject(project.name)}
                          className="flex items-center gap-1.5 text-xs font-bold text-purple-200 hover:text-white bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 px-4 py-2 rounded-xl transition-all"
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
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-white transition-colors"
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
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={e => { if (e.target === e.currentTarget) setReserveModalProject(null); }}
        >
          <div className="glass-card w-full max-w-md p-6 rounded-2xl border border-purple-500/30 shadow-2xl">
            <div className="flex items-start gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-0.5">Pre-Order & Early Access</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{reserveModalProject}</p>
              </div>
            </div>

            {reserveSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                Reserved! You'll get priority download access the moment this drops.
              </div>
            ) : (
              <form onSubmit={handleReserveSubmit} className="space-y-4">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Lock in launch-day pricing (₹{CONSTANTS.PRICING.MINI_PROJECT}–₹{CONSTANTS.PRICING.MAJOR_PROJECT}) and get emailed the instant this kit drops.
                </p>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={reservedEmail}
                  onChange={e => setReservedEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#09090b] border border-white/10 text-white text-sm outline-none focus:border-purple-500/60 transition-all"
                />
                <div className="flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setReserveModalProject(null)}
                    className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-purple-600 hover:bg-purple-500 rounded-xl transition-all shadow-lg shadow-purple-600/20"
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
