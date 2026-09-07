export default function AdminLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Page header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-40 rounded-xl bg-white/[0.06] mb-2" />
          <div className="h-4 w-64 rounded-lg bg-white/[0.03]" />
        </div>
        <div className="h-8 w-20 rounded-full bg-white/[0.04]" />
      </div>

      {/* Stat cards skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl p-4"
            style={{
              background: 'linear-gradient(135deg, rgba(24,24,27,0.6), rgba(9,9,11,0.7))',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="h-3 w-20 rounded bg-white/[0.05]" />
              <div className="w-7 h-7 rounded-lg bg-white/[0.05]" />
            </div>
            <div className="h-7 w-16 rounded-lg bg-white/[0.07]" />
          </div>
        ))}
      </div>

      {/* Content area skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div
          className="lg:col-span-2 rounded-2xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(24,24,27,0.6), rgba(9,9,11,0.7))',
            border: '1px solid rgba(255,255,255,0.05)',
            height: '280px',
          }}
        >
          <div className="p-5 border-b border-white/5">
            <div className="h-4 w-48 rounded bg-white/[0.06]" />
          </div>
          <div className="p-5 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-end gap-1" style={{ height: '28px' }}>
                {[...Array(14)].map((_, j) => (
                  <div
                    key={j}
                    className="flex-1 rounded-sm bg-white/[0.04]"
                    style={{ height: `${20 + Math.random() * 60}%` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl p-4 flex-1"
              style={{
                background: 'linear-gradient(135deg, rgba(24,24,27,0.6), rgba(9,9,11,0.7))',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div className="h-4 w-28 rounded bg-white/[0.06] mb-4" />
              {[...Array(3)].map((_, j) => (
                <div key={j} className="flex justify-between mb-3">
                  <div className="h-3 w-32 rounded bg-white/[0.04]" />
                  <div className="h-3 w-16 rounded bg-white/[0.04]" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
