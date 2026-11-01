'use client';
import { useEffect } from 'react';
import { AlertCircle, RefreshCcw, Home, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Projects route error:', error);
  }, [error]);

  return (
    <div style={{
      minHeight: '70vh',
      background: 'var(--canvas)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1.5rem',
    }}>
      <div className="card" style={{ maxWidth: '30rem', width: '100%', padding: '2.5rem', textAlign: 'center', borderRadius: '22px', boxShadow: 'var(--sh-xl)' }}>

        {/* Animated icon */}
        <div style={{ width: '4.5rem', height: '4.5rem', borderRadius: '18px', background: 'var(--amber-50)', border: '1px solid var(--amber-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.625rem' }}>
          <AlertCircle style={{ width: '2rem', height: '2rem', color: 'var(--amber)' }} />
        </div>

        <h2 className="font-display" style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '.875rem', letterSpacing: '-.035em' }}>
          Unable to load projects
        </h2>
        <p style={{ fontSize: '.9375rem', color: 'var(--ink-3)', lineHeight: 1.75, marginBottom: '2rem' }}>
          We hit a temporary issue fetching the project catalog. This is usually a cold-start delay — clicking Try Again almost always fixes it.
        </p>

        {/* Tip */}
        <div style={{ padding: '.875rem 1rem', borderRadius: '12px', background: 'var(--surface-teal)', border: '1px solid var(--teal-100)', marginBottom: '1.5rem', fontSize: '.8125rem', color: 'var(--teal-dark)', display: 'flex', alignItems: 'flex-start', gap: '.625rem', textAlign: 'left' }}>
          <Zap style={{ width: '1rem', height: '1rem', flexShrink: 0, marginTop: '.125rem' }} />
          <span>Our project database uses edge caching. The first load after inactivity may take 5–10 seconds. Please try again.</span>
        </div>

        <div style={{ display: 'flex', gap: '.75rem' }}>
          <button
            onClick={() => reset()}
            className="btn btn-teal"
            style={{ flex: 1, justifyContent: 'center', borderRadius: '12px', minHeight: '50px' }}
          >
            <RefreshCcw style={{ width: '1rem', height: '1rem' }} />
            Try Again
          </button>
          <Link
            href="/"
            className="btn btn-outline"
            style={{ flex: 1, justifyContent: 'center', borderRadius: '12px', minHeight: '50px' }}
          >
            <Home style={{ width: '1rem', height: '1rem' }} />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
