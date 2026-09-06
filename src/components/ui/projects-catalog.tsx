'use client';

import { ProjectCard } from "@/components/ui/project-card";
import { Project } from "@/lib/types";
import { Terminal, Zap, Clock, CheckCircle2, Sparkles } from "lucide-react";
import { isProjectAvailable } from "@/lib/available-projects";
import { useState, useMemo } from 'react';
import Link from "next/link";
import { CONSTANTS } from "@/lib/constants";
import { Bell, Check } from "lucide-react";

type StatusFilter = 'ALL' | 'AVAILABLE' | 'UPCOMING';
type TierFilter = 'ALL' | 'MINI' | 'MAJOR';
type CategoryFilter = string;

export function ProjectsCatalog({ initialProjects }: { initialProjects: Project[] }) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');
  const [tierFilter, setTierFilter] = useState<TierFilter>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('ALL');

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
  }, [initialProjects, statusFilter, tierFilter, categoryFilter]);

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
          Project <span className="text-zinc-500">Database & Showcase</span>
        </h1>
        <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed">
          Every available project includes 100% bug-free source code, a 60-page IEEE format Black Book report, and Viva defense slides. Instant download upon checkout.
        </p>
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
        </div>
      ) : (
        <div className="text-center py-20 bg-[#111115] border border-white/5 rounded-2xl">
          <Sparkles className="w-10 h-10 text-zinc-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-zinc-300 mb-2">No projects match these filters</h3>
          <p className="text-zinc-500 max-w-md mx-auto mb-6">
            Try adjusting your tier or category filters, or browse all projects.
          </p>
          <button
            onClick={() => {
              setStatusFilter('ALL');
              setTierFilter('ALL');
              setCategoryFilter('ALL');
            }}
            className="px-6 py-2.5 bg-white text-zinc-950 font-bold rounded-xl hover:bg-zinc-200 transition-colors"
          >
            Clear All Filters
          </button>
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
