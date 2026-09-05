import { cn } from "@/lib/utils";

interface TechBadgeProps {
  tech: string;
  className?: string;
}

export function TechBadge({ tech, className }: TechBadgeProps) {
  // Simple color mapping based on common tech names
  const getColorClasses = (t: string) => {
    const l = t.toLowerCase();
    if (l.includes('python') || l.includes('django') || l.includes('fastapi')) return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    if (l.includes('react') || l.includes('next')) return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
    if (l.includes('node') || l.includes('express')) return 'bg-green-500/10 text-green-400 border-green-500/20';
    if (l.includes('tensor') || l.includes('ml') || l.includes('scikit') || l.includes('pandas')) return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    if (l.includes('sql') || l.includes('mongo') || l.includes('db')) return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    return 'bg-slate-700/50 text-slate-300 border-slate-600/50';
  };

  return (
    <span className={cn(
      "px-2.5 py-0.5 rounded-md text-xs font-medium border",
      getColorClasses(tech),
      className
    )}>
      {tech}
    </span>
  );
}
