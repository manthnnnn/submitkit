'use client';
import { useState } from 'react';
import { Rocket, Clock, CheckCircle2, Loader2, Lock, Bell } from 'lucide-react';

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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-2xl border border-amber-500/30 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-transparent p-6 border-b border-amber-500/20">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full pointer-events-none" />
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1.5 bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-black px-2.5 py-1 rounded-full tracking-widest uppercase">
            <Rocket className="w-3 h-3" />
            Pre-order Open
          </div>
        </div>
        <p className="text-zinc-500 text-xs font-medium mb-1">Early Bird Price — Lock it in now</p>
        <div className="flex items-end gap-2">
          <p className="text-4xl font-display font-bold text-white">{formatCurrency(priceInr)}</p>
          <p className="text-zinc-600 text-sm line-through mb-1">
            {formatCurrency(isMajor ? 3999 : 1499)}
          </p>
        </div>
        <p className="text-amber-400 text-xs font-semibold mt-1 flex items-center gap-1.5">
          <Lock className="w-3 h-3" />
          Price locks in — no increase after launch
        </p>
      </div>

      {/* Body */}
      <div className="p-6">
        {done ? (
          /* Success state */
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-white font-bold text-base mb-2">You are on the list!</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Check your inbox for a confirmation email. We will send the download link the moment this bundle is ready.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* What happens info strip */}
            <div className="space-y-2 mb-4">
              {[
                { icon: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />, text: 'Your slot is reserved at the current price' },
                { icon: <Bell className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />, text: 'You get the download link via email the day it launches' },
                { icon: <Clock className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />, text: 'Estimated delivery: 7–10 days' },
              ].map(item => (
                <div key={item.text} className="flex items-start gap-2.5 text-sm text-zinc-300">
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-white/5 pt-3">
              <p className="text-zinc-400 text-xs mb-3 font-medium">Register your details to pre-order</p>
            </div>

            <input
              required
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
            />
            <input
              required
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
            />
            <input
              required
              type="tel"
              placeholder="Phone / WhatsApp Number"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
            />
            <input
              type="text"
              placeholder="College Name (optional)"
              value={college}
              onChange={e => setCollege(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
            />

            {error && (
              <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-bold py-4 rounded-xl transition-all shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] hover:-translate-y-0.5 text-sm"
            >
              {loading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Registering...</>
              ) : (
                <><Bell className="w-4 h-4" /> Notify Me When Ready</>
              )}
            </button>

            <p className="text-center text-[10px] text-zinc-600">
              No payment now. You will be notified via email when this project is ready.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
