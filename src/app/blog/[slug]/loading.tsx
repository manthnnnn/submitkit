export default function BlogPostLoading() {
  return (
    <div style={{ background: 'var(--canvas-base)', minHeight: '100vh', paddingBottom: '5rem' }}>
      <div
        className="pt-8 pb-10 border-b border-[var(--line)]"
        style={{
          background: 'linear-gradient(180deg, rgba(253, 251, 247, 0.85) 0%, rgba(250, 246, 238, 0.95) 100%)',
        }}
      >
        <div className="shell max-w-4xl mx-auto space-y-4">
          <div className="h-4 w-48 bg-slate-200/70 rounded-md animate-pulse mb-4" />
          <div className="flex gap-2">
            <div className="h-6 w-24 bg-teal-100 rounded-full animate-pulse" />
            <div className="h-6 w-20 bg-slate-100 rounded-full animate-pulse" />
          </div>
          <div className="h-10 w-4/5 bg-slate-200/80 rounded-xl animate-pulse" />
          <div className="h-4 w-32 bg-slate-200/50 rounded animate-pulse" />
        </div>
      </div>

      <div className="shell max-w-4xl mx-auto pt-10 space-y-6">
        <div className="card p-8 rounded-2xl bg-white/90 border border-slate-200/80 space-y-4 animate-pulse">
          <div className="h-6 w-3/4 bg-slate-200 rounded-md" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-slate-100 rounded" />
            <div className="h-4 w-full bg-slate-100 rounded" />
            <div className="h-4 w-5/6 bg-slate-100 rounded" />
          </div>
          <div className="h-32 w-full bg-teal-50/60 rounded-xl border border-teal-100/60" />
        </div>
      </div>
    </div>
  );
}

