export default function VivaLoading() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--canvas)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem' }}>
      <div style={{ width: '2.5rem', height: '2.5rem', border: '3px solid var(--teal-100)', borderTopColor: 'var(--teal)', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
      <p style={{ fontSize: '.9rem', color: 'var(--ink-4)', fontWeight: 500 }}>Loading Viva Defense Portal…</p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
