'use client';

import { ProjectCard } from "@/components/ui/project-card";
import { Project } from "@/lib/types";
import { Terminal, Zap, Clock, CheckCircle2, Sparkles, Search, MessageCircle, ArrowRight, Bell, Check } from "lucide-react";
import { isProjectAvailable } from "@/lib/available-projects";
import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import { CONSTANTS } from "@/lib/constants";

type StatusFilter = 'ALL' | 'AVAILABLE' | 'UPCOMING';
type TierFilter = 'ALL' | 'MINI' | 'MAJOR';
type CategoryFilter = string;

export function ProjectsCatalog({ initialProjects }: { initialProjects: Project[] }) {
  const searchParams = useSearchParams();
  const rawTier = searchParams.get('tier')?.toUpperCase();
  const initialTier: TierFilter = (rawTier === 'MINI' || rawTier === 'MAJOR') ? rawTier : 'ALL';
  const initialCat = searchParams.get('category') || 'ALL';

  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [tierFilter, setTierFilter] = useState<TierFilter>(initialTier);
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>(initialCat);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const t = searchParams.get('tier')?.toUpperCase();
    if (t === 'MINI' || t === 'MAJOR') {
      setTierFilter(t);
    }
    const c = searchParams.get('category');
    if (c) {
      setCategoryFilter(c);
    }
  }, [searchParams]);

  // Derive unique categories from project list
  const categories = useMemo(() => {
    const cats = Array.from(new Set(initialProjects.map(p => p.category)));
    return cats.sort();
  }, [initialProjects]);

  const [reserveModalProject, setReserveModalProject] = useState<string | null>(null);
  const [reservedEmail, setReservedEmail] = useState('');
  const [reserveSuccess, setReserveSuccess] = useState(false);

  const handleReserveSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservedEmail.includes('@') || !reserveModalProject) return;
    try {
      const slug = reserveModalProject.toLowerCase().replace(/\s+/g, '-');
      await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: reservedEmail, projectName: reserveModalProject, projectSlug: slug }),
      });
    } catch {
      /* silent */
    }
    setReserveSuccess(true);
    setTimeout(() => {
      setReserveModalProject(null);
      setReserveSuccess(false);
      setReservedEmail('');
    }, 3000);
  };

  const availableCount = useMemo(
    () => initialProjects.filter(p => isProjectAvailable(p.slug)).length,
    [initialProjects]
  );
  const upcomingCount = initialProjects.length - availableCount;

  // All filtering happens in memory — instant, zero network requests
  const displayProjects = useMemo(() => {
    let result = initialProjects;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tech_stack.some(t => t.toLowerCase().includes(q))
      );
    }

    if (tierFilter !== 'ALL') {
      result = result.filter(p => p.tier === tierFilter);
    }
    if (categoryFilter !== 'ALL') {
      result = result.filter(p => p.category === categoryFilter);
    }
    if (statusFilter === 'AVAILABLE') {
      result = result.filter(p => isProjectAvailable(p.slug));
    } else if (statusFilter === 'UPCOMING') {
      result = result.filter(p => !isProjectAvailable(p.slug));
    } else {
      // ALL — put available first
      result = [
        ...result.filter(p => isProjectAvailable(p.slug)),
        ...result.filter(p => !isProjectAvailable(p.slug)),
      ];
    }

    return result;
  }, [initialProjects, statusFilter, tierFilter, categoryFilter, searchQuery]);

  const filteredAvailableCount = useMemo(
    () => displayProjects.filter(p => isProjectAvailable(p.slug)).length,
    [displayProjects]
  );

  return (
    <>
      {/* Page Header */}
      <div className="mb-10">
        <div className="inline-flex flex-wrap items-center gap-3 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-zinc-300 text-sm">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>SubmitKit Fleet Catalog</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{availableCount} Available Now</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium">
            <Clock className="w-3.5 h-3.5" />
            <span>{upcomingCount} Upcoming Drops</span>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-medium text-white mb-4 tracking-tight">
          Verified Engineering Projects. <span className="text-gradient">Ready to Run &amp; Submit.</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed">
          Skip the endless GitHub bugs, missing Python libraries, and 3 AM panics. Every project kit comes with 100% working code, an IEEE format Black Book report (.docx), defense PPT slides, and top 25 Viva Q&amp;A with answers.
        </p>
      </div>

      {/* Short & High-Hook Custom Project Banner (#custom anchor) */}
      <div
        id="custom"
        className="scroll-mt-24 mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-brand-500/15 via-[#13131c] to-emerald-500/15 border border-brand-500/30 relative overflow-hidden shadow-lg group flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400 shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Sparkles className="w-5 h-5 text-brand-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-display font-bold text-white tracking-tight">
                Need a Custom Project? We'll Build It in 48 Hours.
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wide">
                100% Custom Build
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-2 flex-wrap">
              <span>100% working custom code</span>
              <span className="text-zinc-600">•</span>
              <span>IEEE Black Book (.docx) &amp; PPT</span>
              <span className="text-zinc-600">•</span>
              <span>1-on-1 setup walkthrough</span>
              <span className="text-zinc-600">•</span>
              <span className="text-emerald-400 font-semibold">Starts ₹1,999</span>
            </p>
          </div>
        </div>

        <a
          href={`https://wa.me/918799814256?text=${encodeURIComponent(
            "Hi SubmitKit team! I want to build a custom project. Here are my requirements:\n\n• Project Title / Idea:\n• Preferred Tech Stack:\n• Core Features Needed:\n• Target Timeline / Deadline:"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-105 active:scale-95"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Chat on WhatsApp</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6 max-w-lg">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          placeholder="Search projects (e.g. Face Recognition, Fraud, EHR, Python, React)..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-500/30 focus:ring-1 focus:ring-brand-500/20 transition-all text-sm"
        />
      </div>

      {/* Status Tabs — pure useState, instant switching */}
      <div className="flex flex-wrap items-center gap-2 mb-6 p-1.5 rounded-2xl bg-[#141419] border border-white/10 w-fit">
        <button
          onClick={() => setStatusFilter('ALL')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            statusFilter === 'ALL'
              ? 'bg-white/15 text-white shadow-lg border border-white/20'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>All Projects</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">{initialProjects.length}</span>
        </button>

        <button
          onClick={() => setStatusFilter('AVAILABLE')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            statusFilter === 'AVAILABLE'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
              : 'text-zinc-400 hover:text-emerald-300 hover:bg-white/5'
          }`}
        >
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>⚡ Ready to Ship (Instant Download)</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">{availableCount}</span>
        </button>

        <button
          onClick={() => setStatusFilter('UPCOMING')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            statusFilter === 'UPCOMING'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
              : 'text-zinc-400 hover:text-purple-300 hover:bg-white/5'
          }`}
        >
          <Clock className="w-4 h-4 text-purple-400" />
          <span>🚀 Upcoming Drops (Batch 2 Pipeline)</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold">{upcomingCount}</span>
        </button>
      </div>

      {/* Secondary Filters Row */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {/* Tier filter */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/5">
          {(['ALL', 'MINI', 'MAJOR'] as TierFilter[]).map(tier => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                tierFilter === tier
                  ? 'bg-white/15 text-white'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tier === 'ALL' ? 'All Tiers' : tier === 'MINI' ? 'Mini (₹299)' : 'Major (₹499)'}
            </button>
          ))}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-white/[0.03] border border-white/5">
          <button
            onClick={() => setCategoryFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              categoryFilter === 'ALL' ? 'bg-white/15 text-white' : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                categoryFilter === cat ? 'bg-white/15 text-white' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Contextual banner */}
      {statusFilter === 'UPCOMING' && (
        <div className="mb-8 bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 flex items-start gap-3">
          <div className="bg-purple-500/20 p-2 rounded-lg mt-0.5 shrink-0">
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div>
            <h4 className="text-purple-300 font-bold text-sm mb-1">Batch 2 Waitlist is Open</h4>
            <p className="text-purple-200/70 text-sm leading-relaxed">
              These projects are in final testing. Preview the architecture and join the waitlist to be notified when they drop at launch pricing.
            </p>
          </div>
        </div>
      )}

      {statusFilter === 'AVAILABLE' && (
        <div className="mb-8 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3">
          <div className="bg-emerald-500/20 p-2 rounded-lg mt-0.5 shrink-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h4 className="text-emerald-300 font-bold text-sm mb-1">Instant Fulfillment Active</h4>
            <p className="text-emerald-200/70 text-sm leading-relaxed">
              All projects below are verified and on CDN. Upon checkout you receive an instant download link for source code, IEEE report, and PPT defense slides.
            </p>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {displayProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onReserve={setReserveModalProject} />
          ))}

          {/* Custom Project Card in Grid */}
          <div className="flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-b from-[#14141d] to-[#0f0f14] border border-brand-500/30 hover:border-brand-500/60 transition-all group relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.06)]">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-[11px] font-semibold">
                <Sparkles className="w-3 h-3 text-brand-400" />
                Custom Development
              </div>
              <h3 className="text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                Need a Custom Project Built from Scratch?
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                If you have specific requirements or an unlisted topic, our engineers will build your custom software with clean code, a 20-page technical report, and setup assistance.
              </p>
            </div>
            <div className="pt-6 mt-4 border-t border-white/5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Turnaround</span>
                <span className="text-emerald-400 font-semibold">48 Hours</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Starting at</span>
                <span className="text-white font-bold">₹1,999</span>
              </div>
              <a
                href={`https://wa.me/918799814256?text=${encodeURIComponent(
                  "Hi SubmitKit team! I want to request a custom project. My topic / idea is: "
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-emerald-600 text-white text-xs font-bold transition-all"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Submit Idea on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-16 px-4 bg-[#111115] border border-white/5 rounded-2xl max-w-xl mx-auto">
          <Sparkles className="w-10 h-10 text-brand-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Don't see your specific project or stack?</h3>
          <p className="text-zinc-400 text-sm max-w-md mx-auto mb-6">
            We can build your exact project from scratch in 48 hours with 100% bug-free code, a 20-page technical report, presentation slides, and technical walkthrough.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/918799814256?text=${encodeURIComponent(
                `Hi SubmitKit team! I searched for "${searchQuery}" in your catalog. Can your team build this custom project for me?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Get Custom Project on WhatsApp</span>
            </a>
            <button
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('ALL');
                setTierFilter('ALL');
                setCategoryFilter('ALL');
              }}
              className="w-full sm:w-auto px-5 py-3 bg-white/10 text-zinc-300 font-semibold rounded-xl hover:bg-white/15 text-sm transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
      {/* Pre-Order Modal */}
      {reserveModalProject && (
        <div
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={e => { if (e.target === e.currentTarget) setReserveModalProject(null); }}
        >
          <div className="glass-card w-full max-w-md p-6 rounded-2xl border border-purple-500/30 shadow-2xl relative z-[101]">
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
                Reserved! You'll get an email as soon as this drops.
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
                    className="text-xs font-semibold text-zinc-400 hover:text-white px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-xs font-bold text-purple-950 bg-purple-400 hover:bg-purple-300 px-5 py-2.5 rounded-lg transition-all"
                  >
                    Join Waitlist
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
