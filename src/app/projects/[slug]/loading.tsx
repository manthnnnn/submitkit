export default function ProjectDetailLoading() {
  return (
    <div style={{ background: 'var(--canvas)', minHeight: '100vh' }}>
      {/* Hero header skeleton */}
      <div style={{ borderBottom: '1px solid var(--line)', paddingTop: '1.5rem', paddingBottom: '2rem' }}>
        <div className="shell">
          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1.25rem', alignItems: 'center' }}>
            <div className="shimmer-bar" style={{ height: '.75rem', width: '3rem', borderRadius: '6px' }} />
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--line-2)' }} />
            <div className="shimmer-bar" style={{ height: '.75rem', width: '4rem', borderRadius: '6px' }} />
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--line-2)' }} />
            <div className="shimmer-bar" style={{ height: '.75rem', width: '10rem', borderRadius: '6px' }} />
          </div>
          {/* Badges */}
          <div style={{ display: 'flex', gap: '.5rem', marginBottom: '1rem' }}>
            {[5, 6, 8].map((w, i) => (
              <div key={i} className="shimmer-bar" style={{ height: '1.375rem', width: `${w}rem`, borderRadius: '9999px' }} />
            ))}
          </div>
          {/* Title */}
          <div className="shimmer-bar" style={{ height: '2.75rem', width: 'min(100%, 32rem)', borderRadius: '10px', marginBottom: '.75rem' }} />
          <div className="shimmer-bar" style={{ height: '2rem', width: 'min(100%, 24rem)', borderRadius: '10px', marginBottom: '1rem' }} />
          {/* Trust row */}
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {[7, 9, 8].map((w, i) => (
              <div key={i} className="shimmer-bar" style={{ height: '.875rem', width: `${w}rem`, borderRadius: '6px' }} />
            ))}
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="shell" style={{ paddingTop: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))', gap: '2rem' }}>
          {/* Left */}
          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '48rem' }}>
            <div className="shimmer-bar" style={{ height: '22rem', borderRadius: '14px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
              {[100, 85, 90, 70].map((w, i) => (
                <div key={i} className="shimmer-bar" style={{ height: '1rem', width: `${w}%`, borderRadius: '6px' }} />
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.625rem' }}>
              {[1,2,3,4].map(i => (
                <div key={i} className="shimmer-bar" style={{ height: '3.5rem', borderRadius: '12px' }} />
              ))}
            </div>
          </div>
          {/* Right */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="shimmer-bar" style={{ height: '3.5rem', borderRadius: '12px' }} />
            <div className="shimmer-bar" style={{ height: '28rem', borderRadius: '18px' }} />
            <div className="shimmer-bar" style={{ height: '12rem', borderRadius: '18px' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
