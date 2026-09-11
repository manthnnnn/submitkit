import Link from "next/link";
import { Project } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { TechBadge } from "./tech-badge";
import { ArrowRight, Flame, CheckCircle2, Clock } from "lucide-react";
import { isProjectAvailable, getProjectMeta } from "@/lib/available-projects";

const TRENDING_SLUGS = ['spam-classifier-nlp', 'face-attendance-system', 'crypto-portfolio-tracker', 'spaceshield-ai', 'crop-disease-detector'];

export function ProjectCard({ project, onReserve }: { project: Project; onReserve?: (projectName: string) => void }) {
  const isMajor     = project.tier === 'MAJOR';
  const isTrending  = TRENDING_SLUGS.includes(project.slug);
  const isAvailable = isProjectAvailable(project.slug);
  const meta        = getProjectMeta(project.slug);
  const href        = `/projects/${project.slug}`;

  return (
    <div
      style={{ transform: 'translateZ(0)' }}
      className={`glass-card flex flex-col hover-glow group transition-all duration-200 hover:-translate-y-1 relative overflow-hidden ${
        isAvailable
          ? 'border-emerald-500/20 hover:border-emerald-500/40'
          : 'border-white/5 hover:border-white/20'
      }`}
    >
      {/* Status badges */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
        {isAvailable ? (
          <div className="flex items-center gap-1 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Available</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Clock className="w-2.5 h-2.5" />
            <span>Upcoming</span>
          </div>
        )}
        {isTrending && !isAvailable && (
          <div className="flex items-center gap-1 bg-orange-500/15 text-orange-400 border border-orange-500/25 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Flame className="w-2.5 h-2.5" /> High Demand
          </div>
        )}
      </div>

      {/* Header */}
      <div className="p-5 pb-0 flex justify-between items-start mb-3 relative z-10">
        <div className="flex flex-col flex-grow min-w-0 pr-24">
          <div className="flex items-center gap-2 mb-2.5">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              isMajor
                ? 'bg-brand-500/15 text-brand-400 border-brand-500/25'
                : 'bg-zinc-800 text-zinc-300 border-white/10'
            }`}>
              {project.tier} BUNDLE
            </span>
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
              {project.category}
            </span>
          </div>
          <Link href={href}>
            <h3 className="font-display text-base font-semibold text-white hover:text-emerald-200 transition-colors line-clamp-2 leading-snug hover:underline decoration-emerald-500/40 underline-offset-2">
              {project.title}
            </h3>
          </Link>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 pt-0 flex-grow flex flex-col">
        <p className="text-zinc-400 text-xs leading-relaxed mb-3 line-clamp-2">
          {meta ? meta.oneLiner : project.description}
        </p>

        {meta && (
          <div className="mb-4 p-2.5 rounded-xl bg-zinc-900/60 border border-white/5 text-[11px] text-zinc-300 leading-relaxed">
            <span className="text-emerald-400 font-semibold text-[10px] uppercase tracking-wider block mb-0.5">Quick Overview:</span>
            {meta.tenthGradeExplainer}
          </div>
        )}

        {/* Deliverables */}
        <div className="mb-4 pt-2 border-t border-white/5 grid grid-cols-2 gap-1.5 text-[10px] text-zinc-400">
          {[
            '1-Click Runnable Code',
            isMajor ? '60-Page Black Book' : '30-Page Black Book',
            'Viva Defense PPT',
            isMajor ? 'Top 25 Viva Q&As' : 'Top 15 Viva Q&As'
          ].map(item => (
            <div key={item} className="flex items-center gap-1">
              <CheckCircle2 className={`w-3 h-3 shrink-0 ${isAvailable ? 'text-emerald-400' : 'text-zinc-600'}`} />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto space-y-3">
          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech_stack.slice(0, 3).map(tech => <TechBadge key={tech} tech={tech} />)}
            {project.tech_stack.length > 3 && (
              <span className="text-[10px] text-zinc-600 flex items-center">+{project.tech_stack.length - 3} more</span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div>
              <span className="font-bold text-white text-sm">{formatCurrency(project.price_inr)}</span>
              <span className="text-[10px] text-zinc-500 ml-1">one-time</span>
            </div>

            <div className="flex items-center gap-2">
              <Link href={href} className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all group/btn ${
                isAvailable
                  ? 'text-zinc-950 bg-white hover:bg-emerald-400 shadow-md shadow-white/10'
                  : 'text-zinc-300 bg-white/5 hover:bg-white/10 border border-white/10'
              }`}>
                <span>{isAvailable ? 'View & Buy' : 'View Details'}</span>
                <ArrowRight className={`h-3 w-3 group-hover/btn:translate-x-0.5 transition-transform ${
                  isAvailable ? 'text-zinc-950' : 'text-zinc-500 group-hover/btn:text-white'
                }`} />
              </Link>
              
              {!isAvailable && (
                <button
                  onClick={() => onReserve ? onReserve(project.title) : (window.location.href = href)}
                  className="flex items-center gap-1.5 text-xs font-bold text-purple-200 hover:text-white bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 px-3 py-1.5 rounded-lg transition-all"
                >
                  Pre-Book
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
