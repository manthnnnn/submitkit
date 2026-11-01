export default function ProjectsLoading() {
  return (
    <div style={{ background: 'var(--canvas)', minHeight: '100vh' }}>
      <div className="shell" style={{ paddingTop: '1.25rem', paddingBottom: '.25rem' }}>
        <div style={{ height: '.875rem', width: '8rem', borderRadius: '6px' }} className="shimmer-bar" />
      </div>
      <div className="shell" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>
        {/* Header skeleton */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1.125rem' }}>
            {[5, 7, 5].map((w, i) => (
              <div key={i} className="shimmer-bar" style={{ height: '1.375rem', width: `${w}rem`, borderRadius: '9999px' }} />
            ))}
          </div>
          <div className="shimmer-bar" style={{ height: '2.5rem', width: 'min(100%, 28rem)', borderRadius: '10px', marginBottom: '.75rem' }} />
          <div className="shimmer-bar" style={{ height: '1.375rem', width: 'min(100%, 36rem)', borderRadius: '8px' }} />
        </div>
        {/* Custom banner */}
        <div className="shimmer-bar" style={{ height: '5rem', borderRadius: '16px', marginBottom: '2rem' }} />
        {/* Search + filters */}
        <div className="shimmer-bar" style={{ height: '3rem', width: 'min(100%, 36rem)', borderRadius: '11px', marginBottom: '1.375rem' }} />
        <div style={{ display: 'flex', gap: '.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          {[8, 9, 9].map((w, i) => (
            <div key={i} className="shimmer-bar" style={{ height: '2.75rem', width: `${w}rem`, borderRadius: '10px' }} />
          ))}
        </div>
        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 22rem), 1fr))', gap: '1.25rem' }}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="card" style={{ borderRadius: '18px', overflow: 'hidden', minHeight: '24rem' }}>
              <div style={{ height: '3px' }} className="shimmer-bar" />
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                <div style={{ display: 'flex', gap: '.5rem' }}>
                  <div className="shimmer-bar" style={{ height: '1.25rem', width: '4rem', borderRadius: '9999px' }} />
                  <div className="shimmer-bar" style={{ height: '1.25rem', width: '3.5rem', borderRadius: '9999px' }} />
                </div>
                <div className="shimmer-bar" style={{ height: '1.375rem', width: '85%', borderRadius: '6px' }} />
                <div className="shimmer-bar" style={{ height: '1rem', width: '70%', borderRadius: '6px' }} />
                <div className="shimmer-bar" style={{ height: '5rem', borderRadius: '10px', marginTop: '.25rem' }} />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem', marginTop: '.25rem' }}>
                  {[1,2,3,4].map(j => <div key={j} className="shimmer-bar" style={{ height: '.75rem', borderRadius: '6px' }} />)}
                </div>
                <div style={{ display: 'flex', gap: '.5rem', marginTop: '.25rem' }}>
                  {[3,3.5,3,3.5].map((w,j) => <div key={j} className="shimmer-bar" style={{ height: '1.375rem', width: `${w}rem`, borderRadius: '9999px' }} />)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '.25rem', paddingTop: '.75rem', borderTop: '1px solid var(--line)' }}>
                  <div className="shimmer-bar" style={{ height: '1.75rem', width: '5rem', borderRadius: '8px' }} />
                  <div className="shimmer-bar" style={{ height: '2.5rem', width: '7rem', borderRadius: '10px' }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
