'use client';
import { useState } from 'react';
import { Lock, Bell, CheckCircle2, Loader2, Clock, Wrench, Zap } from 'lucide-react';

interface PreOrderFormProps {
  projectSlug: string;
  projectTitle: string;
  priceInr: number;
  isMajor: boolean;
}

export function PreOrderForm({ projectSlug, projectTitle, priceInr, isMajor }: PreOrderFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/preorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectSlug, projectTitle, name, email, phone, college }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setDone(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl border border-amber-500/30 overflow-hidden shadow-2xl">

      {/* TOP BANNER — crystal clear "not available yet" */}
      <div className="bg-amber-500/10 border-b border-amber-500/25 px-5 py-3 flex items-center gap-2">
        <Lock className="w-4 h-4 text-amber-400 shrink-0" />
        <p className="text-amber-300 text-xs font-bold">
          🚧 This project is currently under development — not available for purchase yet.
        </p>
      </div>

      {/* Status card */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
            <Wrench className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">We&apos;re Building This</p>
            <p className="text-zinc-400 text-xs leading-relaxed mt-0.5">
              Our engineering team is actively working on this project kit. Drop your email below and we&apos;ll notify you the moment it&apos;s ready — at the current price.
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2.5 text-xs text-zinc-400">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Estimated delivery: <strong className="text-white">7–14 days</strong></span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-zinc-400">
            <Zap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Price when ready: <strong className="text-white">{formatCurrency(priceInr)}</strong> (locked for you)</span>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-zinc-400">
            <Bell className="w-3.5 h-3.5 text-brand-400 shrink-0" />
            <span><strong className="text-white">No payment now.</strong> Notification only — pay when it&apos;s ready.</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-5">
        {done ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-white font-bold text-base mb-2">You&apos;re on the list! ✅</h3>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-xs mx-auto">
              We&apos;ll send the download link directly to your inbox the moment this project is ready. No payment needed until then.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <p className="text-zinc-400 text-xs font-medium mb-3">Enter your details to join the waitlist:</p>

            <input
              required type="text" placeholder="Full Name"
              value={name} onChange={e => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
            />
            <input
              required type="email" placeholder="Email Address"
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
            />
            <input
              type="tel" placeholder="WhatsApp Number (optional)"
              value={phone} onChange={e => setPhone(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
            />
            <input
              type="text" placeholder="College Name (optional)"
              value={college} onChange={e => setCollege(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
            />

            {error && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">{error}</p>
            )}

            <button
              type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.45)] text-sm"
            >
              {loading
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                : <><Bell className="w-4 h-4" /> Notify Me When It&apos;s Ready</>
              }
            </button>

            <p className="text-center text-[10px] text-zinc-600">
              🔒 No payment charged now. You&apos;ll only pay when the project is delivered to your inbox.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
