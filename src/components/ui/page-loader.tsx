// Legacy page-loader replaced with teal loading.tsx screens
// This component is kept empty to avoid import errors

export function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', background: 'var(--canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '50%', border: '3px solid var(--teal-100)', borderTopColor: 'var(--teal)', animation: 'spin .7s linear infinite' }} />
        <p style={{ fontSize: '.875rem', color: 'var(--ink-4)', fontWeight: 500 }}>Loading…</p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
