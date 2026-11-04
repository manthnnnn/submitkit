export default function BlogLoading() {
  return (
    <div style={{ background: 'var(--canvas-base)', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Skeleton Header */}
      <div
        className="pt-12 pb-14 border-b border-[var(--line)]"
        style={{
          background: 'linear-gradient(180deg, rgba(253, 251, 247, 0.85) 0%, rgba(250, 246, 238, 0.95) 100%)',
        }}
      >
        <div className="shell max-w-6xl mx-auto">
          {/* Breadcrumb skeleton */}
          <div className="h-4 w-32 bg-slate-200/70 rounded-md animate-pulse mb-8" />

          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
            <div className="flex-1 space-y-4">
              <div className="h-6 w-52 bg-teal-100/70 rounded-full animate-pulse" />
              <div className="h-10 sm:h-12 w-full max-w-xl bg-slate-200/80 rounded-xl animate-pulse" />
              <div className="h-4 w-full max-w-lg bg-slate-200/60 rounded-md animate-pulse" />
              <div className="flex gap-3 pt-2">
                <div className="h-10 w-44 bg-teal-600/40 rounded-xl animate-pulse" />
                <div className="h-10 w-48 bg-slate-200/70 rounded-xl animate-pulse" />
              </div>
            </div>

            {/* 3 Metric skeleton cards */}
            <div className="grid grid-cols-3 gap-3 w-full md:w-auto md:min-w-[420px]">
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-white/80 border border-slate-200/70 space-y-2 animate-pulse"
                >
                  <div className="h-7 w-12 bg-slate-200 rounded-md" />
                  <div className="h-3 w-20 bg-teal-100 rounded" />
                  <div className="h-2.5 w-16 bg-slate-100 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skeleton Content Grid */}
      <div className="shell max-w-6xl mx-auto pt-10">
        {/* Category bar skeleton */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-9 w-28 bg-white/90 border border-slate-200/70 rounded-xl animate-pulse" />
          ))}
        </div>

        {/* 6 Guide skeleton cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div
              key={i}
              className="card p-6 rounded-2xl border border-slate-200/80 bg-white/90 space-y-4 animate-pulse"
              style={{
                boxShadow: '0 4px 16px -2px rgba(15, 23, 42, 0.04)',
              }}
            >
              <div className="flex justify-between">
                <div className="h-5 w-24 bg-teal-100/70 rounded-full" />
                <div className="h-5 w-16 bg-slate-100 rounded-full" />
              </div>
              <div className="h-6 w-full bg-slate-200/80 rounded-md" />
              <div className="space-y-1.5">
                <div className="h-3.5 w-full bg-slate-100 rounded" />
                <div className="h-3.5 w-4/5 bg-slate-100 rounded" />
              </div>
              <div className="flex gap-1.5 pt-2">
                <div className="h-4 w-12 bg-slate-100 rounded" />
                <div className="h-4 w-16 bg-slate-100 rounded" />
                <div className="h-4 w-14 bg-slate-100 rounded" />
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-teal-100" />
                  <div className="h-3 w-16 bg-slate-200 rounded" />
                </div>
                <div className="h-4 w-14 bg-teal-200/60 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

