export default function ProjectsLoading() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-28 rounded-xl bg-white/[0.06] mb-2" />
          <div className="h-4 w-40 rounded-lg bg-white/[0.03]" />
        </div>
        <div className="h-10 w-32 rounded-xl bg-white/[0.08]" style={{ border: '1px solid rgba(99,102,241,0.2)' }} />
      </div>

      <div className="space-y-2">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-2xl px-5 py-4 flex items-center gap-4"
            style={{ background: 'rgba(24,24,27,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="w-7 h-7 rounded-lg bg-white/[0.06] shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-4 w-64 rounded bg-white/[0.07]" />
              <div className="h-3 w-40 rounded bg-white/[0.04]" />
            </div>
            <div className="h-4 w-16 rounded bg-white/[0.05]" />
            <div className="h-6 w-16 rounded-full bg-white/[0.06]" />
            <div className="flex gap-2">
              <div className="h-8 w-16 rounded-lg bg-white/[0.05]" />
              <div className="h-8 w-8 rounded-lg bg-white/[0.04]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
