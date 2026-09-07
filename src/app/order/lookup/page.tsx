'use client';
import { useState } from 'react';
import { Search, Download, AlertCircle, CheckCircle, Loader2, ArrowRight, Package } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function OrderLookupPage() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [found, setFound] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) { setError('Please enter your Order ID.'); return; }
    setLoading(true);
    setError(null);
    setFound(false);

    try {
      // Try fetching the download — this will validate order exists and is paid
      const res = await fetch(`/api/downloads/${orderId.trim()}`, { method: 'HEAD', redirect: 'manual' });

      if (res.status === 404) {
        setError('Order not found. Double-check your Order ID from the confirmation email.');
      } else if (res.status === 403) {
        const data = await res.json().catch(() => null);
        setError(data?.error || 'Access denied. This order may not be paid yet or download limit reached.');
      } else if (res.status === 429) {
        setError('Too many attempts. Please wait a minute and try again.');
      } else {
        setFound(true);
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    }
    setLoading(false);
  };

  const handleDownload = () => {
    window.location.href = `/api/downloads/${orderId.trim()}`;
  };

  return (
    <div className="min-h-screen bg-[#09090b] relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="glow-orb w-[600px] h-[600px] bg-brand-500/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 py-20 max-w-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <div className="w-14 h-14 bg-brand-500/10 rounded-2xl flex items-center justify-center border border-brand-500/20 mx-auto mb-5">
            <Package className="h-7 w-7 text-brand-400" />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">
            Find Your Order
          </h1>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Lost your download link? Enter your Order ID from the confirmation email to re-download your project bundle.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <form onSubmit={handleLookup} className="glass-card p-6 rounded-2xl space-y-4">
            <div>
              <label className="block text-xs text-zinc-500 font-medium mb-2 uppercase tracking-wider">
                Order ID
              </label>
              <input
                required
                type="text"
                placeholder="e.g. a1b2c3d4-e5f6-..."
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/20 transition-all text-sm font-mono"
              />
              <p className="text-zinc-600 text-[11px] mt-1.5">
                Found in your confirmation email subject line or the order receipt.
              </p>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl flex items-start gap-2.5 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-xs">{error}</p>
              </div>
            )}

            {found && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                  <CheckCircle className="w-4 h-4" />
                  Order found! Ready to download.
                </div>
                <button
                  type="button"
                  onClick={handleDownload}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                >
                  <Download className="h-4 w-4" />
                  Download Bundle
                </button>
              </div>
            )}

            {!found && (
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Looking up...</>
                ) : (
                  <><Search className="w-4 h-4" /> Find My Order</>
                )}
              </button>
            )}
          </form>

          {/* Help section */}
          <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/5">
            <p className="text-zinc-500 text-xs leading-relaxed">
              Can&apos;t find your Order ID? Check your email from{' '}
              <span className="text-zinc-300 font-medium">team@submitkit.in</span>.
              Still stuck? WhatsApp us at{' '}
              <a href="https://wa.me/918799814256" className="text-emerald-400 hover:underline font-medium">
                +91 87998 14256
              </a>
            </p>
          </div>

          <div className="text-center mt-6">
            <Link href="/projects" className="text-zinc-500 text-xs hover:text-white transition-colors inline-flex items-center gap-1.5">
              Browse more projects <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
