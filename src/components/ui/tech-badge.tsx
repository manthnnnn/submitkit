import { cn } from "@/lib/utils";

interface TechBadgeProps {
  tech: string;
  className?: string;
}

export function TechBadge({ tech, className }: TechBadgeProps) {
  // Soft, readable modern badge colors for light SaaS palette
  const getColorClasses = (t: string) => {
    const l = t.toLowerCase();
    if (l.includes('python') || l.includes('django') || l.includes('fastapi')) return 'bg-amber-50 text-amber-800 border-amber-200/80';
    if (l.includes('react') || l.includes('next')) return 'bg-[#FDF6F2] text-[#E55729] border-[#F3CFBF]';
    if (l.includes('node') || l.includes('express')) return 'bg-[#FAF5EE] text-[#18181B] border-[#EFE6DC]';
    if (l.includes('tensor') || l.includes('ml') || l.includes('scikit') || l.includes('pandas')) return 'bg-orange-50 text-orange-700 border-orange-200/80';
    if (l.includes('sql') || l.includes('mongo') || l.includes('db')) return 'bg-stone-100 text-stone-800 border-stone-200';
    return 'bg-[#FAF5EE] text-[#52525B] border-[#EFE6DC]';
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
