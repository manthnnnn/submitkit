'use client';
import { useState } from 'react';
import { Search, Download, AlertCircle, CheckCircle2, Loader2, ArrowRight, Package, ShieldCheck, Zap, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Logo } from '@/components/ui/logo';

type LookupState = 'idle' | 'loading' | 'found' | 'error';

export default function OrderLookupPage() {
  const [query, setQuery]   = useState('');
  const [state, setState]   = useState<LookupState>('idle');
  const [error, setError]   = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const [result, setResult] = useState<{ orderId: string; projectTitle: string; downloadCount: number; downloadLimit: number } | null>(null);
  const [downloading, setDownloading] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) { setError('Enter your Order ID, Email, or Phone number first.'); return; }
    setState('loading'); setError(null); setResult(null); setLimitReached(false);
    try {
      const res  = await fetch('/api/orders/lookup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ query: q }) });
      const data = await res.json();
      if (!res.ok) { setLimitReached(data.limitReached ?? false); setError(data.error ?? 'Something went wrong. Please try again.'); setState('error'); return; }
      setResult(data); setState('found');
    } catch { setError('Network error. Check your connection and try again.'); setState('error'); }
  };

  const handleDownload = async () => {
    if (!result || downloading) return;
    setDownloading(true);
    window.location.href = `/api/downloads/${result.orderId}`;
    setTimeout(() => setDownloading(false), 4000);
  };

  const waLink = `https://wa.me/918799814256?text=${encodeURIComponent(`Hi! I need help with my SubmitKit order. My Order ID is: ${query.trim().toUpperCase()}`)}`;

  return (
    <div style={{ background: 'var(--canvas)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>

      {/* Background orb */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }} aria-hidden>
        <div className="aorb" style={{ position: 'absolute', width: '600px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245, 237, 222, 0.6) 0%, transparent 70%)', top: '-10%', left: '50%', transform: 'translateX(-50%)', filter: 'blur(70px)' }} />
      </div>

      <div style={{ width: '100%', maxWidth: '28rem', position: 'relative', zIndex: 1 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Logo size="md" href="/" className="inline-flex" />
        </div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '16px', background: 'var(--surface-teal)', border: '1px solid var(--teal-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <Package style={{ width: '1.625rem', height: '1.625rem', color: 'var(--teal)' }} />
          </div>
          <h1 className="font-display" style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.035em', marginBottom: '.5rem' }}>
            Find My Order &amp; Download
          </h1>
          <p style={{ fontSize: '.9375rem', color: 'var(--ink-3)', lineHeight: 1.65 }}>
            Enter your Order ID, Email, or Phone to re-access your project kit.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4, delay: .08 }}
          className="card"
          style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          {/* Hint */}
          <div style={{ padding: '.875rem', borderRadius: '12px', background: 'var(--surface-teal)', border: '1px solid var(--teal-100)', fontSize: '.8125rem', color: 'var(--teal-dark)', lineHeight: 1.65 }}>
            <strong>Tip:</strong> Enter your 8-digit Order ID (e.g.{' '}
            <code style={{ background: 'var(--teal-100)', padding: '.125rem .375rem', borderRadius: '4px', fontFamily: 'var(--font-mono)', fontSize: '.8125rem' }}>A3F9B2C1</code>
            ), email address, or phone number.
          </div>

          {/* Form */}
          <form onSubmit={handleLookup} style={{ display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '.75rem', fontWeight: 700, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.5rem' }}>
                Order ID, Email, or Phone
              </label>
              <input
                required type="text"
                placeholder="e.g. A3F9B2C1 or name@gmail.com"
                value={query}
                onChange={e => { setQuery(e.target.value); if (state === 'error') { setState('idle'); setError(null); } if (state === 'found') { setState('idle'); setResult(null); } }}
                autoComplete="off" spellCheck={false}
                className="input"
              />
            </div>

            {/* Error */}
            {state === 'error' && error && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.625rem', padding: '.875rem', borderRadius: '12px', background: 'var(--rose-50)', border: '1px solid var(--rose-100)' }}>
                <AlertCircle style={{ width: '1rem', height: '1rem', color: 'var(--rose)', flexShrink: 0, marginTop: '.125rem' }} />
                <div>
                  <p style={{ fontSize: '.875rem', color: 'var(--rose)', lineHeight: 1.55 }}>{error}</p>
                  {limitReached && (
                    <a href={waLink} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '.375rem', marginTop: '.5rem', fontSize: '.8125rem', fontWeight: 700, color: 'var(--teal)', textDecoration: 'none' }}
                    >
                      <MessageCircle style={{ width: '.875rem', height: '.875rem' }} /> WhatsApp us for a reset
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Found */}
            {state === 'found' && result && (
              <div style={{ padding: '1.125rem', borderRadius: '12px', background: 'var(--emerald-50)', border: '1px solid var(--emerald-100)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <CheckCircle2 style={{ width: '1rem', height: '1rem', color: 'var(--emerald)', flexShrink: 0 }} />
                  <p style={{ fontSize: '.9rem', fontWeight: 700, color: 'var(--emerald)' }}>Order found!</p>
                </div>

                <div style={{ padding: '.75rem', borderRadius: '10px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
                  <p style={{ fontSize: '.625rem', fontWeight: 700, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '.25rem' }}>Project</p>
                  <p style={{ fontSize: '.9375rem', fontWeight: 700, color: 'var(--navy)' }}>{result.projectTitle}</p>
                  <p style={{ fontSize: '.75rem', color: 'var(--ink-4)', marginTop: '.25rem', fontFamily: 'var(--font-mono)' }}>
                    Downloads: {result.downloadCount} / {result.downloadLimit}
                  </p>
                </div>

                <button type="button" onClick={handleDownload} disabled={downloading}
                  className="btn btn-teal"
                  style={{ width: '100%', justifyContent: 'center', borderRadius: '12px', minHeight: '52px', fontSize: '1rem', opacity: downloading ? .7 : 1 }}
                >
                  {downloading ? <><Loader2 style={{ width: '1rem', height: '1rem', animation: 'spin .7s linear infinite' }} /> Preparing…</> : <><Download style={{ width: '1rem', height: '1rem' }} /> Download Bundle (.zip)</>}
                </button>

                <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'center' }}>
                  <Link href={`/viva/${result.orderId}`}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '.25rem', fontSize: '.8125rem', fontWeight: 600, color: 'var(--violet)', textDecoration: 'none' }}
                  >
                    Viva Q&amp;A <ArrowRight style={{ width: '.8125rem', height: '.8125rem' }} />
                  </Link>
                  <Link href={`/certificate/${result.orderId}`} target="_blank"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '.25rem', fontSize: '.8125rem', fontWeight: 600, color: 'var(--amber)', textDecoration: 'none' }}
                  >
                    Certificate <ArrowRight style={{ width: '.8125rem', height: '.8125rem' }} />
                  </Link>
                </div>
              </div>
            )}

            {/* Submit */}
            {state !== 'found' && (
              <button type="submit" disabled={state === 'loading' || !query.trim()} className="btn btn-teal" style={{ width: '100%', justifyContent: 'center', borderRadius: '12px', minHeight: '52px', fontSize: '1rem', opacity: (state === 'loading' || !query.trim()) ? .6 : 1 }}>
                {state === 'loading' ? <><Loader2 style={{ width: '1rem', height: '1rem', animation: 'spin .7s linear infinite' }} /> Looking up…</> : <><Search style={{ width: '1rem', height: '1rem' }} /> Find My Order</>}
              </button>
            )}

            {state === 'found' && (
              <button type="button" onClick={() => { setState('idle'); setResult(null); setQuery(''); }}
                style={{ width: '100%', padding: '.625rem', borderRadius: '10px', background: 'none', border: '1px solid var(--line)', cursor: 'pointer', fontSize: '.875rem', color: 'var(--ink-3)', fontWeight: 500, fontFamily: 'var(--font-sans)' }}
              >
                Look up a different order
              </button>
            )}
          </form>
        </motion.div>

        {/* Help */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .4, delay: .2 }}
          style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}
        >
          <div style={{ padding: '1rem', borderRadius: '14px', background: 'var(--surface)', border: '1px solid var(--line)' }}>
            <p style={{ fontSize: '.8125rem', color: 'var(--ink-3)', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--navy)' }}>Can&apos;t find your Order ID?</strong>{' '}
              Check your inbox for an email from{' '}
              <span style={{ color: 'var(--navy)' }}>team@submitkit.in</span> — the subject line contains your Order ID. Check your spam folder too.
            </p>
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.375rem', marginTop: '.625rem', fontSize: '.875rem', fontWeight: 700, color: 'var(--teal)', textDecoration: 'none' }}
            >
              <MessageCircle style={{ width: '.9375rem', height: '.9375rem' }} /> WhatsApp +91 87998 14256
            </a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', fontSize: '.8125rem', color: 'var(--ink-4)', fontWeight: 500 }}>
            {[{ I: ShieldCheck, t: 'Secure' }, { I: Zap, t: 'Instant' }, { I: Download, t: 'Up to 3 downloads' }].map(({ I, t }) => (
              <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '.375rem' }}><I style={{ width: '.875rem', height: '.875rem' }} />{t}</span>
            ))}
          </div>
        </motion.div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
