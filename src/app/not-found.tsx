import Link from 'next/link';
import { ArrowRight, Home, Package } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', background: 'var(--canvas)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '28rem', width: '100%', textAlign: 'center' }}>

        {/* 404 display */}
        <div style={{ position: 'relative', marginBottom: '2rem' }}>
          <div style={{ fontSize: '9rem', fontWeight: 900, color: 'var(--surface-3)', lineHeight: 1, userSelect: 'none', fontFamily: 'var(--font-display)', letterSpacing: '-.08em' }}>
            404
          </div>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: '5rem', fontWeight: 900, color: 'var(--navy)', lineHeight: 1, fontFamily: 'var(--font-display)', letterSpacing: '-.08em' }}>
              404
            </div>
          </div>
        </div>

        <h1 className="font-display" style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '.75rem', letterSpacing: '-.03em' }}>
          Page not found
        </h1>
        <p style={{ fontSize: '.9375rem', color: 'var(--ink-3)', lineHeight: 1.75, marginBottom: '2rem' }}>
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem', maxWidth: '18rem', margin: '0 auto' }}>
          <Link href="/" className="btn btn-teal" style={{ justifyContent: 'center', borderRadius: '12px', minHeight: '50px' }}>
            <Home style={{ width: '1rem', height: '1rem' }} />
            Back to Home
          </Link>
          <Link href="/projects" className="btn btn-outline" style={{ justifyContent: 'center', borderRadius: '12px', minHeight: '50px' }}>
            <Package style={{ width: '1rem', height: '1rem' }} />
            Browse Projects
            <ArrowRight style={{ width: '.9375rem', height: '.9375rem' }} />
          </Link>
        </div>

        <p style={{ fontSize: '.8125rem', color: 'var(--ink-4)', marginTop: '2rem' }}>
          Need help?{' '}
          <a href="mailto:team@submitkit.in" style={{ color: 'var(--teal)', fontWeight: 600, textDecoration: 'none' }}>
            team@submitkit.in
          </a>
        </p>
      </div>
    </div>
  );
}
