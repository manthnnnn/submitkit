import { createClient } from "@/lib/supabase/server";
import { ProjectCard } from "@/components/ui/project-card";
import { CONSTANTS } from "@/lib/constants";
import Link from "next/link";
import { Project } from "@/lib/types";
import { Terminal, Database, Server, Cpu, Layers, Zap, Clock, CheckCircle2, Sparkles } from "lucide-react";
import { isProjectAvailable, AVAILABLE_PROJECT_SLUGS } from "@/lib/available-projects";

export const dynamic = 'force-dynamic';

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const supabase = await createClient();
  const params = await searchParams;
  const tierFilter = typeof params.tier === 'string' ? params.tier : null;
  const categoryFilter = typeof params.category === 'string' ? params.category : null;
  const statusFilter = typeof params.status === 'string' ? params.status : 'ALL';

  let query = supabase
    .from('projects')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (tierFilter) {
    query = query.eq('tier', tierFilter);
  }
  if (categoryFilter) {
    query = query.eq('category', categoryFilter);
  }

  const { data: projects, error } = await query;
  let allProjects = (projects as Project[]) || [];

  // Filter based on status
  let displayProjects = allProjects;
  if (statusFilter === 'AVAILABLE') {
    displayProjects = allProjects.filter(p => isProjectAvailable(p.slug));
  } else if (statusFilter === 'UPCOMING') {
    displayProjects = allProjects.filter(p => !isProjectAvailable(p.slug));
  } else {
    // Put available projects first in default view
    displayProjects = [
      ...allProjects.filter(p => isProjectAvailable(p.slug)),
      ...allProjects.filter(p => !isProjectAvailable(p.slug)),
    ];
  }

  const availableCount = allProjects.filter(p => isProjectAvailable(p.slug)).length;
  const upcomingCount = allProjects.length - availableCount;

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-[#09090b]">
      
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden flex items-center justify-center">
        <div className="glow-orb w-[600px] h-[600px] bg-brand-500/10 -translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
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
        </div>

        {/* Status Mode Switcher Tabs (Neat Startup SaaS UI) */}
        <div className="flex flex-wrap items-center gap-3 mb-6 p-1.5 rounded-2xl bg-[#141419] border border-white/10 w-fit">
          <Link
            href={`/projects?status=ALL${tierFilter ? `&tier=${tierFilter}` : ''}${categoryFilter ? `&category=${categoryFilter}` : ''}`}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              statusFilter === 'ALL'
                ? 'bg-white/15 text-white shadow-lg border border-white/20'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>All Projects</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-zinc-300">{allProjects.length}</span>
          </Link>

          <Link
            href={`/projects?status=AVAILABLE${tierFilter ? `&tier=${tierFilter}` : ''}${categoryFilter ? `&category=${categoryFilter}` : ''}`}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              statusFilter === 'AVAILABLE'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                : 'text-zinc-400 hover:text-emerald-300 hover:bg-white/5'
            }`}
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>⚡ Ready to Ship (Instant Download)</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">{availableCount}</span>
          </Link>

          <Link
            href={`/projects?status=UPCOMING${tierFilter ? `&tier=${tierFilter}` : ''}${categoryFilter ? `&category=${categoryFilter}` : ''}`}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              statusFilter === 'UPCOMING'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                : 'text-zinc-400 hover:text-purple-300 hover:bg-white/5'
            }`}
          >
            <Clock className="w-4 h-4 text-purple-400" />
            <span>🚀 Upcoming Drops (Batch 2 Pipeline)</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold">{upcomingCount}</span>
          </Link>
        </div>

        {/* Explainer Banner depending on status */}
        {statusFilter === 'AVAILABLE' && (
          <div className="mb-8 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between flex-wrap gap-4 text-emerald-200 text-sm">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>
                <strong>Showing 9 Production-Verified Projects:</strong> Zero bugs, includes full Next.js/Python/Full-Stack codebases, runnable demo servers, 60-page IEEE documentation, and viva defense slides.
              </span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300">
              100% Tested
            </span>
          </div>
        )}

        {statusFilter === 'UPCOMING' && (
          <div className="mb-8 p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-between flex-wrap gap-4 text-purple-200 text-sm">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-purple-400 shrink-0" />
              <span>
                <strong>Showing 42 Pipeline Projects:</strong> Scheduled for upcoming weekly release drops. Click &quot;Reserve&quot; on any kit to pre-order or register for early access notifications.
              </span>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300">
              Pre-Order Available
            </span>
          </div>
        )}

        {/* Secondary Filters Section: Tiers & Categories */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-4 bg-[#18181b]/50 p-2 rounded-2xl border border-white/5 backdrop-blur-sm">
          
          {/* Tier Filters */}
          <div className="flex bg-[#09090b] rounded-xl p-1 border border-white/10 w-full lg:w-auto overflow-x-auto hide-scrollbar">
            <Link 
              href={`/projects?status=${statusFilter}${categoryFilter ? `&category=${categoryFilter}` : ''}`}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${!tierFilter ? 'bg-white/10 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              All Tiers
            </Link>
            <Link 
              href={`/projects?status=${statusFilter}&tier=MINI${categoryFilter ? `&category=${categoryFilter}` : ''}`}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${tierFilter === 'MINI' ? 'bg-emerald-500/20 text-emerald-400 shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Mini Projects (₹{CONSTANTS.PRICING.MINI_PROJECT})
            </Link>
            <Link 
              href={`/projects?status=${statusFilter}&tier=MAJOR${categoryFilter ? `&category=${categoryFilter}` : ''}`}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${tierFilter === 'MAJOR' ? 'bg-brand-500/20 text-brand-400 shadow-lg' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
              Major Projects (₹{CONSTANTS.PRICING.MAJOR_PROJECT})
            </Link>
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 w-full lg:w-auto overflow-x-auto hide-scrollbar pb-1 lg:pb-0 px-2 lg:px-0">
            <Link href={`/projects?status=${statusFilter}${tierFilter ? `&tier=${tierFilter}` : ''}`} className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all whitespace-nowrap ${!categoryFilter ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/10'}`}>
              All Categories
            </Link>
            <Link href={`/projects?status=${statusFilter}&category=AIML${tierFilter ? `&tier=${tierFilter}` : ''}`} className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all whitespace-nowrap flex items-center gap-1.5 ${categoryFilter === 'AIML' ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/10'}`}>
              <Cpu className="w-3 h-3" /> AI & ML
            </Link>
            <Link href={`/projects?status=${statusFilter}&category=FullStack${tierFilter ? `&tier=${tierFilter}` : ''}`} className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all whitespace-nowrap flex items-center gap-1.5 ${categoryFilter === 'FullStack' ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/10'}`}>
              <Layers className="w-3 h-3" /> Full-Stack
            </Link>
            <Link href={`/projects?status=${statusFilter}&category=Cybersecurity${tierFilter ? `&tier=${tierFilter}` : ''}`} className={`px-4 py-2 rounded-lg text-xs font-medium border transition-all whitespace-nowrap flex items-center gap-1.5 ${categoryFilter === 'Cybersecurity' ? 'bg-white/10 border-white/20 text-white' : 'bg-transparent border-white/5 text-zinc-500 hover:text-zinc-300 hover:border-white/10'}`}>
              <Server className="w-3 h-3" /> Cybersecurity
            </Link>
          </div>
        </div>

        {/* Project Grid */}
        {displayProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-16 text-center flex flex-col items-center justify-center border-dashed border-2 border-white/10">
            <Terminal className="w-12 h-12 text-zinc-700 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No projects found</h3>
            <p className="text-zinc-500 mb-6">We couldn&apos;t find any projects matching your current filters.</p>
            <Link href="/projects" className="px-6 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-medium transition-all">
              Clear all filters
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
