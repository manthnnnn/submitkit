export default function AuditLogLoading() {
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

      {/* Filter skeleton */}
      <div className="flex gap-3 items-center">
        <div className="h-10 w-80 rounded-xl bg-white/[0.05]" />
        <div className="h-10 w-36 rounded-xl bg-white/[0.05]" />
      </div>

      {/* Table skeleton */}
      <div
        className="rounded-2xl overflow-hidden border border-white/5"
        style={{ background: 'linear-gradient(135deg, rgba(24,24,27,0.6), rgba(9,9,11,0.7))' }}
      >
        <div className="h-10 bg-white/[0.03] border-b border-white/5" />
        <div className="p-4 space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="h-4 w-24 rounded bg-white/[0.05]" />
                <div className="h-5 w-32 rounded-full bg-white/[0.06]" />
                <div className="h-4 w-40 rounded bg-white/[0.04]" />
              </div>
              <div className="h-4 w-16 rounded bg-white/[0.04]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
