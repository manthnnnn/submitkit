'use client';
import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Application Error:', error);
  }, [error]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--canvas)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.5rem',
    }}>
      <div style={{
        maxWidth: '28rem',
        width: '100%',
        padding: '2.5rem',
        textAlign: 'center',
        borderRadius: '22px',
        background: 'var(--surface)',
        border: '1px solid var(--line)',
        boxShadow: 'var(--sh-xl)',
      }}>
        {/* Icon */}
        <div style={{
          width: '4rem', height: '4rem', borderRadius: '16px',
          background: 'var(--rose-50)', border: '1px solid var(--rose-100)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}>
          <AlertTriangle style={{ width: '1.75rem', height: '1.75rem', color: 'var(--rose)' }} />
        </div>

        <h1 style={{
          fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)',
          marginBottom: '.75rem', letterSpacing: '-.03em',
          fontFamily: 'var(--font-display)',
        }}>
          Something went wrong
        </h1>
        <p style={{
          fontSize: '.9375rem', color: 'var(--ink-3)',
          lineHeight: 1.7, marginBottom: '2rem',
        }}>
          We encountered an unexpected issue loading this page.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
          <button
            onClick={() => reset()}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: '.5rem', width: '100%', padding: '.875rem', borderRadius: '12px',
              background: 'var(--teal)', color: '#fff', fontWeight: 700,
              fontSize: '1rem', border: 'none', cursor: 'pointer',
              boxShadow: 'var(--sh-teal)', fontFamily: 'var(--font-sans)',
            }}
          >
            <RefreshCcw style={{ width: '1rem', height: '1rem' }} />
            Try Again
          </button>
          {/* No event handlers on Link — only static styles */}
          <Link
            href="/"
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: '.5rem', width: '100%', padding: '.875rem', borderRadius: '12px',
              background: 'var(--surface-2)', color: 'var(--ink-2)',
              border: '1.5px solid var(--line)', fontWeight: 600,
              fontSize: '1rem', textDecoration: 'none',
            }}
          >
            <Home style={{ width: '1rem', height: '1rem' }} />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
