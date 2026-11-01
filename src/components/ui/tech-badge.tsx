import { cn } from "@/lib/utils";

interface TechBadgeProps {
  tech: string;
  className?: string;
}

export function TechBadge({ tech, className }: TechBadgeProps) {
  // Soft, readable modern badge colors for light SaaS palette
  const getColorClasses = (t: string) => {
    const l = t.toLowerCase();
    if (l.includes('python') || l.includes('django') || l.includes('fastapi')) return 'bg-blue-50 text-blue-700 border-blue-200/80';
    if (l.includes('react') || l.includes('next')) return 'bg-sky-50 text-sky-700 border-sky-200/80';
    if (l.includes('node') || l.includes('express')) return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
    if (l.includes('tensor') || l.includes('ml') || l.includes('scikit') || l.includes('pandas')) return 'bg-orange-50 text-orange-700 border-orange-200/80';
    if (l.includes('sql') || l.includes('mongo') || l.includes('db')) return 'bg-teal-50 text-teal-800 border-teal-200/80';
    return 'bg-slate-100 text-slate-700 border-slate-200/80';
  };

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-lg text-[11px] font-semibold border shadow-xs inline-block",
      getColorClasses(tech),
      className
    )}>
      {tech}
    </span>
  );
}
