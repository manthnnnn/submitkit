export default function OrdersLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-24 rounded-xl bg-white/[0.06] mb-2" />
          <div className="h-4 w-56 rounded-lg bg-white/[0.03]" />
        </div>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-3 gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl p-4"
            style={{ background: 'rgba(24,24,27,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div className="h-3 w-24 rounded bg-white/[0.05] mb-2" />
            <div className="h-6 w-16 rounded bg-white/[0.07]" />
          </div>
        ))}
      </div>

      {/* Search bar */}
      <div className="flex gap-3">
        <div className="h-10 flex-1 rounded-xl bg-white/[0.04]" style={{ border: '1px solid rgba(255,255,255,0.06)' }} />
        <div className="h-10 w-28 rounded-xl bg-white/[0.04]" style={{ border: '1px solid rgba(255,255,255,0.06)' }} />
        <div className="h-10 w-28 rounded-xl bg-white/[0.04]" style={{ border: '1px solid rgba(255,255,255,0.06)' }} />
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden"
        style={{ background: 'rgba(24,24,27,0.6)', border: '1px solid rgba(255,255,255,0.05)' }}>
        {/* Header */}
        <div className="px-4 py-3 flex gap-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          {[8, 16, 20, 24, 12, 10, 10].map((w, i) => (
            <div key={i} className={`h-3 rounded bg-white/[0.06]`} style={{ width: `${w}%` }} />
          ))}
        </div>
        {/* Rows */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="px-4 py-4 flex gap-4 items-center"
            style={{ borderBottom: i < 7 ? '1px solid rgba(255,255,255,0.03)' : 'none' }}>
            <div className="h-3 w-8 rounded bg-white/[0.04]" />
            <div className="h-3 w-16 rounded bg-white/[0.04]" />
            <div className="space-y-1.5" style={{ width: '20%' }}>
              <div className="h-3 rounded bg-white/[0.05]" />
              <div className="h-2.5 w-3/4 rounded bg-white/[0.03]" />
            </div>
            <div className="space-y-1.5" style={{ width: '24%' }}>
              <div className="h-3 rounded bg-white/[0.05]" />
              <div className="h-2.5 w-2/3 rounded bg-white/[0.03]" />
            </div>
            <div className="h-3 w-12 rounded bg-white/[0.04]" />
            <div className="h-5 w-12 rounded-full bg-white/[0.06]" />
            <div className="h-3 w-10 rounded bg-white/[0.04]" />
          </div>
        ))}
      </div>
    </div>
  );
}
