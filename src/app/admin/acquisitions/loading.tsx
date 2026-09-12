export default function AcquisitionsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-48 rounded-xl bg-white/[0.06] mb-2" />
          <div className="h-4 w-72 rounded-lg bg-white/[0.03]" />
        </div>
        <div className="h-8 w-24 rounded-xl bg-white/[0.04]" />
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl p-5 border border-white/5"
            style={{ background: 'linear-gradient(135deg, rgba(24,24,27,0.6), rgba(9,9,11,0.7))' }}
          >
            <div className="h-4 w-32 rounded bg-white/[0.05] mb-3" />
            <div className="h-2 w-full rounded bg-white/[0.04] mb-2" />
            <div className="h-3 w-40 rounded bg-white/[0.03]" />
          </div>
        ))}
      </div>

      {/* Card skeleton */}
      <div
        className="rounded-2xl p-5 border border-white/5 space-y-4"
        style={{ background: 'linear-gradient(135deg, rgba(24,24,27,0.6), rgba(9,9,11,0.7))' }}
      >
        <div className="h-4 w-40 rounded bg-white/[0.05] mb-4" />
        {[...Array(5)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between">
              <div className="h-3 w-28 rounded bg-white/[0.04]" />
              <div className="h-3 w-16 rounded bg-white/[0.04]" />
            </div>
            <div className="h-2 w-full rounded bg-white/[0.03]" />
          </div>
        ))}
      </div>
    </div>
  );
}
