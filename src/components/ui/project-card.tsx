import Link from "next/link";
import { Project } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { TechBadge } from "./tech-badge";
import { ArrowRight, Flame, CheckCircle2, Clock, Zap } from "lucide-react";
import { isProjectAvailable, getProjectMeta } from "@/lib/available-projects";

const TRENDING_SLUGS = ['spam-classifier-nlp', 'face-attendance-system', 'crypto-portfolio-tracker', 'spaceshield-ai', 'crop-disease-detector'];

export function ProjectCard({ project }: { project: Project }) {
  const isMajor     = project.tier === 'MAJOR';
  const isTrending  = TRENDING_SLUGS.includes(project.slug);
  const isAvailable = isProjectAvailable(project.slug);
  const meta        = getProjectMeta(project.slug);

  return (
    <div className={`glass-card flex flex-col hover-glow group transition-all duration-500 hover:-translate-y-1 relative overflow-hidden ${
      isAvailable ? 'border-emerald-500/20 hover:border-emerald-500/40 shadow-lg shadow-emerald-500/5' : 'border-white/5 hover:border-white/20'
    }`}>

      {/* Availability / Status Badges */}
      <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
        {isAvailable ? (
          <div className="flex items-center gap-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Ready to Ship</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Clock className="w-2.5 h-2.5" />
            <span>Upcoming Drop</span>
          </div>
        )}

        {isTrending && !isAvailable && (
          <div className="flex items-center gap-1 bg-orange-500/15 text-orange-400 border border-orange-500/25 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Flame className="w-2.5 h-2.5" /> Hot
          </div>
        )}
      </div>

      {/* Top Banner */}
      <div className="p-5 pb-0 flex justify-between items-start mb-3 relative z-10">
        <div className="flex flex-col flex-grow min-w-0 pr-24">
          <div className="flex items-center gap-2 mb-2.5">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${isMajor
              ? 'bg-brand-500/15 text-brand-400 border-brand-500/25'
              : 'bg-zinc-800 text-zinc-300 border-white/10'
            }`}>
              {project.tier} BUNDLE
            </span>
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          <h3 className="font-display text-base font-medium text-white group-hover:text-zinc-200 transition-colors line-clamp-2 leading-snug">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 pt-0 flex-grow flex flex-col">
        <p className="text-zinc-400 text-xs leading-relaxed mb-3 line-clamp-2">
          {meta ? meta.oneLiner : project.description}
        </p>

        {/* 10th Grade Explainer Callout Snippet (if available) */}
        {meta && (
          <div className="mb-4 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-[11px] text-zinc-400 leading-relaxed">
            <span className="text-emerald-400 font-semibold mr-1">💡 In simple terms:</span>
            {meta.tenthGradeExplainer}
          </div>
        )}

        {/* Deliverables Checklist */}
        <div className="mb-4 pt-2 border-t border-white/5 grid grid-cols-2 gap-1.5 text-[10px] text-zinc-400">
          <div className="flex items-center gap-1">
            <CheckCircle2 className={`w-3 h-3 ${isAvailable ? 'text-emerald-400' : 'text-zinc-600'}`} />
            <span>Working Source Code</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className={`w-3 h-3 ${isAvailable ? 'text-emerald-400' : 'text-zinc-600'}`} />
            <span>60-Page Black Book</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className={`w-3 h-3 ${isAvailable ? 'text-emerald-400' : 'text-zinc-600'}`} />
            <span>Viva PPT & Defense</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className={`w-3 h-3 ${isAvailable ? 'text-emerald-400' : 'text-zinc-600'}`} />
            <span>0-Bug Guarantee</span>
          </div>
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {project.tech_stack.slice(0, 3).map((tech) => (
              <TechBadge key={tech} tech={tech} />
            ))}
            {project.tech_stack.length > 3 && (
              <span className="text-[10px] text-zinc-600 flex items-center">+{project.tech_stack.length - 3} more</span>
            )}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div>
              <span className="font-bold text-white text-sm">{formatCurrency(project.price_inr)}</span>
              <span className="text-[10px] text-zinc-500 ml-1">one-time</span>
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all group/btn ${
                isAvailable
                  ? 'text-zinc-950 bg-white hover:bg-zinc-200 shadow-md shadow-white/10'
                  : 'text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
            >
              <span>{isAvailable ? 'Get Kit' : 'Reserve'}</span>
              <ArrowRight className={`h-3 w-3 transition-all group-hover/btn:translate-x-0.5 ${
                isAvailable ? 'text-zinc-950' : 'text-zinc-500 group-hover/btn:text-white'
              }`} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
