'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, Clock, CheckCircle2, ArrowRight, ExternalLink, 
  Cpu, Layers, HeartPulse, Terminal, ShieldAlert, DollarSign, 
  Sparkles, Flame, Check, Bell, Star
} from 'lucide-react';
import { READY_PROJECTS, AvailableProjectMeta } from '@/lib/available-projects';

const UPCOMING_CATALOG = [
  {
    slug: 'crop-disease-detector',
    name: 'Agricultural Crop Disease Detector AI',
    category: 'AIML',
    tier: 'MAJOR',
    price: 499,
    requests: '1,420+ students',
    description: 'Farmers upload photos of infected leaves; CNN model classifies pathology and outputs precise pesticide treatment plans.',
    tenthGradeExplainer: 'A plant doctor on your phone that looks at leaf photos and tells farmers how to save their crops.',
    tag: 'Dropping Friday',
  },
  {
    slug: 'skin-lesion-classifier',
    name: 'DermatoScan Skin Lesion & Acne Classifier',
    category: 'AIML',
    tier: 'MAJOR',
    price: 499,
    requests: '1,180+ students',
    description: 'Computer vision dermatology triage tool classifying benign moles vs malignant melanoma with heatmap confidence overlays.',
    tenthGradeExplainer: 'Takes a picture of a skin mole and warns you if you need to visit a doctor for a biopsy.',
    tag: 'High Demand',
  },
  {
    slug: 'face-attendance-system',
    name: 'Smart Class Attendance via Face Recognition',
    category: 'AIML',
    tier: 'MINI',
    price: 299,
    requests: '2,350+ students',
    description: 'Real-time CCTV classroom face attendance marking with anti-spoofing blink detection and Excel attendance export.',
    tenthGradeExplainer: 'Walks into class, camera recognizes your face, and automatically marks your roll call.',
    tag: 'Most Requested',
  },
  {
    slug: 'spaceshield-ai',
    name: 'SpaceShield AI: Orbital Debris Avoidance',
    category: 'AIML',
    tier: 'MAJOR',
    price: 499,
    requests: '960+ students',
    description: 'Predictive Keplerian orbital trajectory simulator warning satellite constellations of millimeter debris collisions.',
    tenthGradeExplainer: 'Traffic control for satellites in space to stop them from crashing into million-dollar space junk.',
    tag: 'Trending',
  },
  {
    slug: 'smart-city-traffic',
    name: 'Smart City Traffic & Accident Detector',
    category: 'AIML',
    tier: 'MAJOR',
    price: 499,
    requests: '880+ students',
    description: 'Autonomous intersection surveillance detecting vehicular crashes and broadcasting automated SOS coordinates to 911 dispatch.',
    tenthGradeExplainer: 'Watches street cameras, spots car crashes instantly, and calls emergency ambulances automatically.',
    tag: 'In Testing',
  },
  {
    slug: 'ransomware-sandbox',
    name: 'Autonomous Ransomware Detonation Sandbox',
    category: 'Cybersecurity',
    tier: 'MAJOR',
    price: 499,
    requests: '790+ students',
    description: 'Isolated behavioral containment chamber monitoring encryption heuristics and shadow copy deletion signatures.',
    tenthGradeExplainer: 'A bulletproof glass room for dangerous computer viruses so researchers can watch how they attack files.',
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
    if (selectedCategory === 'Healthcare') return p.category === 'Healthcare';
    if (selectedCategory === 'AIML') return p.category === 'AIML';
    if (selectedCategory === 'Cybersecurity') return p.category === 'Cybersecurity';
    if (selectedCategory === 'FinTech') return p.category === 'FinTech';
    if (selectedCategory === 'FullStack') return p.category === 'FullStack' || p.category === 'Cloud';
    return true;
  });

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservedEmail.includes('@')) return;
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
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Software Fleet</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white mb-4 tracking-tight">
            Available Kits & <span className="text-gradient">Upcoming Drops</span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
            Choose from our 9 production-tested, execution-ready projects available for instant checkout, or preview upcoming high-demand batch releases.
          </p>

          {/* Master Dual-Section Switcher Tabs */}
          <div className="flex items-center justify-center gap-3 mt-8 p-1.5 rounded-2xl bg-[#141419] border border-white/10 w-fit mx-auto">
            <button
              onClick={() => setActiveTab('available')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'available'
                  ? 'bg-emerald-500 text-zinc-950 shadow-[0_0_25px_rgba(16,185,129,0.3)] scale-[1.02]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Available Now (9 Instant-Ready Kits)</span>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/20 text-zinc-950 font-black">
                Verified
              </span>
            </button>

            <button
              onClick={() => setActiveTab('upcoming')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'upcoming'
                  ? 'bg-purple-600 text-white shadow-[0_0_25px_rgba(168,85,247,0.3)] scale-[1.02]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Upcoming Drops (Batch 2 Pipeline)</span>
              <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white font-black">
                Pre-Order
              </span>
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            TAB 1: AVAILABLE NOW (9 READY KITS)
        ══════════════════════════════════════════ */}
        {activeTab === 'available' && (
          <div>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
              {[
                { id: 'ALL', label: 'All 9 Ready Kits' },
                { id: 'Healthcare', label: '🏥 Healthcare & Logistics' },
                { id: 'AIML', label: '🧠 AI & Natural Language' },
                { id: 'Cloud', label: '⚡ Cloud DevTools & Compilers' },
                { id: 'Cybersecurity', label: '🛡️ Cybersecurity & Fraud' },
                { id: 'FinTech', label: '💳 FinTech & Expense AI' },
                { id: 'FullStack', label: '📱 Full-Stack & Hospitality' },
              ].map((cat) => (
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

            {/* 9 Available Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {filteredAvailable.map((project) => {
                const isPortActive = Boolean(project.port);
                return (
                  <div
                    key={project.slug}
                    className="glass-card flex flex-col rounded-2xl border border-emerald-500/25 hover:border-emerald-500/50 hover-glow transition-all duration-500 hover:-translate-y-1 relative overflow-hidden p-6 bg-gradient-to-b from-white/[0.03] to-transparent shadow-xl shadow-emerald-500/5"
                  >
                    {/* Top Status Strip */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-0.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>Ready to Ship</span>
                      </span>

                      {project.port && (
                        <span className="text-[10px] font-mono text-zinc-400 bg-zinc-800/80 px-2 py-0.5 rounded-md border border-white/10">
                          Port {project.port}
                        </span>
                      )}
                    </div>

                    {/* Title & One-Liner */}
                    <h3 className="text-lg font-display font-bold text-white mb-2 leading-snug">
                      {project.name}
                    </h3>
                    <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                      {project.oneLiner}
                    </p>

                    {/* 10th-Grade Explainer Callout Box */}
                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 mb-5 text-[11px] text-zinc-300 leading-relaxed">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-400 mb-1">
                        <Star className="w-3 h-3 fill-emerald-400 text-emerald-400" />
                        <span>In Plain English (10th-Grade Concept):</span>
                      </div>
                      <p>{project.tenthGradeExplainer}</p>
                    </div>

                    {/* Verified Deliverables List */}
                    <div className="space-y-1.5 mb-6 pt-3 border-t border-white/5 text-[11px] text-zinc-400">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>100% Tested Bug-Free Source Code</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>60-Page IEEE Format Black Book</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Viva Defense Presentation Slides</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Top 25 Viva Examination Q&As</span>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-base font-bold text-white">
                          {project.slug === 'online-code-compiler' || project.slug === 'healthcare-ehr-portal' ? '₹499' : '₹299'}
                        </span>
                        <span className="text-[10px] text-zinc-500 ml-1">instant delivery</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-2 rounded-xl transition-all"
                            title="Open the real running application in a new tab"
                          >
                            <span>Live Test</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}

                        <Link
                          href={`/projects/${project.slug}`}
                          className="flex items-center gap-1 text-xs font-bold text-zinc-950 bg-white hover:bg-zinc-200 px-4 py-2 rounded-xl transition-all shadow-md shadow-white/10"
                        >
                          <span>Get Kit</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════
            TAB 2: UPCOMING DROPS (BATCH 2 PIPELINE)
        ══════════════════════════════════════════ */}
        {activeTab === 'upcoming' && (
          <div>
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 max-w-3xl mx-auto mb-10 text-center text-purple-200 text-sm">
              <span className="font-bold text-white">Batch 2 Release Schedule:</span> These projects are undergoing final QA packaging. Reserve your kit now to lock in launch pricing with free viva defense coaching included!
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {UPCOMING_CATALOG.map((project) => (
                <div
                  key={project.slug}
                  className="glass-card flex flex-col rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden p-6 bg-gradient-to-b from-white/[0.02] to-transparent"
                >
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-purple-300 bg-purple-500/15 border border-purple-500/30 px-2.5 py-0.5 rounded-full">
                      <Clock className="w-3 h-3" />
                      <span>{project.tag}</span>
                    </span>

                    <span className="text-[10px] text-zinc-500 font-semibold">
                      {project.requests}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-white mb-2 leading-snug">
                    {project.name}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 mb-5 text-[11px] text-zinc-300 leading-relaxed">
                    <span className="text-purple-400 font-bold mr-1">💡 In simple terms:</span>
                    {project.tenthGradeExplainer}
                  </div>

                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-base font-bold text-white">₹{project.price}</span>
                      <span className="text-[10px] text-zinc-500 ml-1">pre-order price</span>
                    </div>

                    <button
                      onClick={() => setReserveModalProject(project.name)}
                      className="flex items-center gap-1.5 text-xs font-bold text-purple-200 hover:text-white bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 px-4 py-2 rounded-xl transition-all"
                    >
                      <Bell className="w-3.5 h-3.5" />
                      <span>Pre-Order Kit</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/projects?status=UPCOMING"
                className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-white transition-colors"
              >
                <span>View all 42 upcoming pipeline projects in the master catalog</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </div>

      {/* Pre-Order / Reserve Modal */}
      {reserveModalProject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md p-6 rounded-2xl border border-purple-500/30 shadow-2xl relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Pre-Order & Early Access</h4>
                <p className="text-xs text-zinc-400 truncate max-w-[260px]">{reserveModalProject}</p>
              </div>
            </div>

            {reserveSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 mb-4">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Reserved successfully! You will receive priority download access as soon as the project drops.</span>
              </div>
            ) : (
              <form onSubmit={handleReserveSubmit} className="space-y-4">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Enter your email address to lock in launch day pricing (₹299/₹499) and receive priority download access.
                </p>
                <input
                  type="email"
                  required
                  placeholder="student@college.edu or name@gmail.com"
                  value={reservedEmail}
                  onChange={(e) => setReservedEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#09090b] border border-white/10 text-white text-sm outline-none focus:border-purple-500 transition-all"
                />
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setReserveModalProject(null)}
                    className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
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
