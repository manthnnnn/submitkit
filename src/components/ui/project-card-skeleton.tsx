'use client';

// Single project card skeleton with shimmer animation
export function ProjectCardSkeleton() {
  return (
    <div className="glass-card flex flex-col rounded-2xl border border-white/5 p-6 overflow-hidden relative">
      {/* Shimmer sweep */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

      {/* Status + tier */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-28 rounded-full bg-white/8 animate-pulse" />
        <div className="h-4 w-14 rounded-full bg-white/5 animate-pulse" />
      </div>
      {/* Title */}
      <div className="h-5 w-full rounded-lg bg-white/10 mb-2 animate-pulse" />
      <div className="h-4 w-4/5 rounded-lg bg-white/8 mb-4 animate-pulse" />
      {/* Description */}
      <div className="h-3 w-full rounded bg-white/6 mb-1.5 animate-pulse" />
      <div className="h-3 w-5/6 rounded bg-white/6 mb-4 animate-pulse" />
      {/* Callout box */}
      <div className="h-16 w-full rounded-xl bg-white/[0.025] border border-white/5 mb-5 animate-pulse" />
      {/* Deliverables */}
      <div className="space-y-2 mb-6 pt-3 border-t border-white/5">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white/8 shrink-0 animate-pulse" />
            <div className="h-2.5 rounded bg-white/5 animate-pulse" style={{ width: `${55 + i * 10}%` }} />
          </div>
        ))}
      </div>
      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
        <div className="h-5 w-16 rounded bg-white/10 animate-pulse" />
        <div className="h-8 w-24 rounded-xl bg-white/10 animate-pulse" />
      </div>
    </div>
  );
}

// Full catalog skeleton — shown via Suspense while Supabase fetches
export function ProjectsCatalogSkeleton() {
  return (
    <div>
      {/* Page header skeleton */}
      <div className="mb-10">
        {/* Badges row */}
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="h-7 w-40 rounded-full bg-white/8 animate-pulse" />
          <div className="h-7 w-32 rounded-full bg-white/5 animate-pulse" />
          <div className="h-7 w-36 rounded-full bg-white/5 animate-pulse" />
        </div>
        {/* Title */}
        <div className="h-10 w-80 rounded-xl bg-white/10 mb-3 animate-pulse" />
        <div className="h-10 w-48 rounded-xl bg-white/8 mb-4 animate-pulse" />
        {/* Subtitle */}
        <div className="h-4 w-full max-w-xl rounded bg-white/5 mb-2 animate-pulse" />
        <div className="h-4 w-2/3 max-w-lg rounded bg-white/[0.03] animate-pulse" />
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-2 mb-8 p-1.5 rounded-2xl bg-[#141419] border border-white/10 w-fit">
        <div className="h-10 w-28 rounded-xl bg-white/12 animate-pulse" />
        <div className="h-10 w-56 rounded-xl bg-white/5 animate-pulse" />
        <div className="h-10 w-60 rounded-xl bg-white/5 animate-pulse" />
      </div>

      {/* Secondary filters */}
      <div className="flex gap-2 mb-8">
        <div className="h-9 w-64 rounded-xl bg-white/[0.03] border border-white/5 animate-pulse" />
        <div className="h-9 w-80 rounded-xl bg-white/[0.03] border border-white/5 animate-pulse" />
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
