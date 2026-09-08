'use client';
import { useState } from 'react';
import {
  Search, Download, AlertCircle, CheckCircle, Loader2,
  ArrowRight, Package, ShieldCheck, Zap, MessageCircle,
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type LookupState = 'idle' | 'loading' | 'found' | 'error';

export default function OrderLookupPage() {
  const [query, setQuery]         = useState('');
  const [state, setState]         = useState<LookupState>('idle');
  const [error, setError]         = useState<string | null>(null);
  const [limitReached, setLimitReached] = useState(false);
  const [result, setResult]       = useState<{
    orderId: string;
    projectTitle: string;
    downloadCount: number;
    downloadLimit: number;
  } | null>(null);
  const [downloading, setDownloading] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) { setError('Enter your Order ID first.'); return; }

    setState('loading');
    setError(null);
    setResult(null);
    setLimitReached(false);

    try {
      const res = await fetch('/api/orders/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      });
      const data = await res.json();

      if (!res.ok) {
        setLimitReached(data.limitReached ?? false);
        setError(data.error ?? 'Something went wrong. Please try again.');
        setState('error');
        return;
      }

      setResult(data);
      setState('found');
    } catch {
      setError('Network error. Check your connection and try again.');
      setState('error');
    }
  };

  const handleDownload = async () => {
    if (!result || downloading) return;
    setDownloading(true);
    window.location.href = `/api/downloads/${result.orderId}`;
    // Reset downloading after a delay so button doesn't stay stuck
    setTimeout(() => setDownloading(false), 4000);
  };

  const waLink = `https://wa.me/918799814256?text=${encodeURIComponent(
    `Hi! I need help with my SubmitKit order. My Order ID is: ${query.trim().toUpperCase()}`
  )}`;

  return (
    <div className="min-h-screen bg-[#09090b] relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="glow-orb w-[700px] h-[500px] bg-brand-500/8 -top-20 left-1/2 -translate-x-1/2" />
        <div className="glow-orb w-[400px] h-[400px] bg-emerald-500/5 bottom-0 right-0" />
      </div>

      <div className="container mx-auto px-4 py-16 max-w-md relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8"
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center border mx-auto mb-5"
            style={{ background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.25)', boxShadow: '0 0 30px rgba(99,102,241,0.15)' }}>
            <Package className="h-7 w-7 text-brand-400" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2 tracking-tight">
            Find My Order & Download
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Enter your Order ID, Email, or Phone number to re-access your project and Viva prep portal.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card rounded-2xl p-6 space-y-5"
        >

          {/* Flexible search info */}
          <div className="rounded-xl p-3 text-xs"
            style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <p className="text-zinc-400 leading-relaxed">
              <span className="text-brand-400 font-semibold">Instant Access:</span> Enter your 8-digit Order ID (like{' '}
              <code className="font-mono font-bold text-brand-300 bg-brand-500/10 px-1.5 py-0.5 rounded">A3F9B2C1</code>
              ), your student <strong className="text-zinc-200">Email address</strong>, or your <strong className="text-zinc-200">Phone number</strong>.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <label className="block text-xs text-zinc-400 font-semibold mb-2 uppercase tracking-wider">
                Order ID, Email, or Phone
              </label>
              <input
                required
                type="text"
                placeholder="e.g. A3F9B2C1 or name@gmail.com"
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                  if (state === 'error') { setState('idle'); setError(null); }
                  if (state === 'found') { setState('idle'); setResult(null); }
                }}
                autoComplete="off"
                spellCheck={false}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all text-sm"
              />
              <p className="text-zinc-500 text-[11px] mt-1.5">
                Instant match on Order ID, Payment ID, Email address, or Phone
              </p>
            </div>

            {/* Error state */}
            {state === 'error' && error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-3.5 flex items-start gap-3 text-sm"
                style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-300 text-xs leading-relaxed">{error}</p>
                  {limitReached && (
                    <a href={waLink} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp us for a reset
                    </a>
                  )}
                </div>
              </motion.div>
            )}

            {/* Found state */}
            {state === 'found' && result && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-4 space-y-4"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>

                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <p className="text-emerald-300 text-sm font-semibold">Order found!</p>
                </div>

                <div className="rounded-lg px-3 py-2.5 space-y-1"
                  style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold">Project</p>
                  <p className="text-white text-sm font-semibold">{result.projectTitle}</p>
                  <p className="text-zinc-600 text-[11px] font-mono mt-0.5">
                    Downloads used: {result.downloadCount} / {result.downloadLimit}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={downloading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: '#fff',
                    boxShadow: '0 0 20px rgba(16,185,129,0.3)',
                  }}
                >
                  {downloading
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Preparing…</>
                    : <><Download className="w-4 h-4" /> Download Bundle (.zip)</>}
                </button>

                <div className="flex items-center justify-center gap-4 text-xs">
                  <Link href={`/viva/${result.orderId}`}
                    className="text-zinc-600 hover:text-brand-400 transition-colors flex items-center gap-1">
                    Viva Q&amp;A <ArrowRight className="w-3 h-3" />
                  </Link>
                  <Link href={`/certificate/${result.orderId}`} target="_blank"
                    className="text-zinc-600 hover:text-amber-400 transition-colors flex items-center gap-1">
                    Certificate <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Submit button — only show when not found */}
            {state !== 'found' && (
              <button
                type="submit"
                disabled={state === 'loading' || !query.trim()}
                className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                style={{ background: '#ffffff', color: '#09090b' }}
              >
                {state === 'loading'
                  ? <><Loader2 className="w-4 h-4 animate-spin" /> Looking up…</>
                  : <><Search className="w-4 h-4" /> Find My Order</>}
              </button>
            )}

            {/* Try again button when found */}
            {state === 'found' && (
              <button
                type="button"
                onClick={() => { setState('idle'); setResult(null); setQuery(''); }}
                className="w-full py-2.5 rounded-xl text-sm text-zinc-500 hover:text-white transition-colors"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                Look up a different order
              </button>
            )}
          </form>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-6 space-y-3"
        >
          <div className="rounded-xl p-4"
            style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <p className="text-zinc-600 text-xs leading-relaxed">
              <span className="text-zinc-400 font-medium">Can&apos;t find your Order ID?</span>{' '}
              Check your inbox for an email from{' '}
              <span className="text-zinc-300">team@submitkit.in</span> — the subject line will contain your Order ID.
              Check your spam folder too.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Still stuck? WhatsApp +91 87998 14256
            </a>
          </div>

          <div className="flex items-center justify-center gap-5 text-[11px] text-zinc-700">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> Secure</span>
            <span className="flex items-center gap-1.5"><Zap className="w-3 h-3" /> Instant</span>
            <span className="flex items-center gap-1.5"><Download className="w-3 h-3" /> Up to 3 downloads</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
