export default function PreordersLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-32 rounded-xl bg-white/[0.06] mb-2" />
          <div className="h-4 w-52 rounded-lg bg-white/[0.03]" />
        </div>
        <div className="h-10 w-28 rounded-xl bg-white/[0.05]" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl p-5"
            style={{ background: 'rgba(24,24,27,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="h-3 w-24 rounded bg-white/[0.05] mb-3" />
            <div className="h-7 w-12 rounded-lg bg-white/[0.07]" />
          </div>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden"
        style={{ background: 'rgba(24,24,27,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="px-5 py-3.5 flex gap-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          {[20, 28, 20, 16, 16].map((w, i) => (
            <div key={i} className="h-3 rounded bg-white/[0.06]" style={{ width: `${w}%` }} />
          ))}
        </div>
        {[...Array(7)].map((_, i) => (
          <div key={i} className="px-5 py-4 flex gap-4 items-center"
            style={{ borderBottom: i < 6 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
            <div className="h-4 w-32 rounded bg-white/[0.06]" style={{ width: '20%' }} />
            <div className="space-y-1.5" style={{ width: '28%' }}>
              <div className="h-3 rounded bg-white/[0.05]" />
              <div className="h-3 w-3/4 rounded bg-white/[0.03]" />
            </div>
            <div className="h-3 w-32 rounded bg-white/[0.04]" style={{ width: '20%' }} />
            <div className="h-5 w-24 rounded-full bg-white/[0.06]" />
            <div className="h-3 w-28 rounded bg-white/[0.04]" />
          </div>
        ))}
      </div>
    </div>
  );
}
