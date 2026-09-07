export default function AnalyticsLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-28 rounded-xl bg-white/[0.06] mb-2" />
          <div className="h-4 w-56 rounded-lg bg-white/[0.03]" />
        </div>
        <div className="w-9 h-9 rounded-xl bg-white/[0.06]" />
      </div>

      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-3">
          <div>
            <div className="h-4 w-40 rounded bg-white/[0.06] mb-1" />
            <div className="h-3 w-64 rounded bg-white/[0.03]" />
          </div>
          <div className="rounded-2xl p-5"
            style={{ background: 'rgba(24,24,27,0.6)', border: '1px solid rgba(255,255,255,0.05)', height: i === 1 ? '260px' : '220px' }}>
            <div className="h-full flex items-end gap-1 pb-4">
              {[...Array(i === 0 ? 6 : i === 1 ? 30 : 3)].map((_, j) => (
                <div key={j} className="flex-1 rounded-sm bg-white/[0.04]"
                  style={{ height: `${15 + Math.random() * 70}%` }} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
