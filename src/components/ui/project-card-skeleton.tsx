// Premium shimmer skeleton for a single project card
export function ProjectCardSkeleton() {
  return (
    <div className="glass-card flex flex-col rounded-2xl border border-white/5 p-6 animate-pulse">
      {/* Status + tier badges */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-24 rounded-full bg-white/8" />
        <div className="h-4 w-12 rounded-full bg-white/5" />
      </div>
      {/* Title */}
      <div className="h-5 w-full rounded-lg bg-white/10 mb-2" />
      <div className="h-4 w-3/4 rounded-lg bg-white/8 mb-4" />
      {/* One-liner */}
      <div className="h-3 w-full rounded bg-white/6 mb-1" />
      <div className="h-3 w-5/6 rounded bg-white/6 mb-4" />
      {/* Callout box */}
      <div className="h-16 w-full rounded-xl bg-white/[0.03] border border-white/5 mb-5" />
      {/* Deliverables */}
      <div className="space-y-2 mb-6 pt-3 border-t border-white/5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white/8 shrink-0" />
            <div className="h-3 rounded bg-white/6" style={{ width: `${60 + i * 8}%` }} />
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="h-5 w-16 rounded bg-white/10" />
        <div className="flex gap-2">
          <div className="h-8 w-16 rounded-xl bg-white/8" />
          <div className="h-8 w-20 rounded-xl bg-white/15" />
        </div>
      </div>
    </div>
  );
}

// Grid of skeletons shown while the catalog loads
export function ProjectsCatalogSkeleton() {
  return (
    <div>
      {/* Header skeleton */}
      <div className="mb-10 animate-pulse">
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="h-7 w-44 rounded-full bg-white/8" />
          <div className="h-7 w-36 rounded-full bg-white/6" />
          <div className="h-7 w-32 rounded-full bg-white/5" />
        </div>
        <div className="h-10 w-80 rounded-xl bg-white/10 mb-3" />
        <div className="h-4 w-full max-w-lg rounded bg-white/6 mb-2" />
        <div className="h-4 w-2/3 max-w-md rounded bg-white/5" />
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-2 mb-8 p-1.5 rounded-2xl bg-[#141419] border border-white/10 w-fit animate-pulse">
        <div className="h-10 w-28 rounded-xl bg-white/15" />
        <div className="h-10 w-52 rounded-xl bg-white/6" />
        <div className="h-10 w-56 rounded-xl bg-white/6" />
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
