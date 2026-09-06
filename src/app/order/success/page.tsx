'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  CheckCircle, Download, AlertCircle, Share2, ArrowRight,
  Copy, Zap, ShieldCheck, FolderOpen, Terminal, Play, GraduationCap,
  Check, MessageCircle, FileText, Award, ChevronDown, ChevronUp, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const STEPS = [
  { icon: <FolderOpen className="w-4 h-4 text-blue-400" />, bg: 'bg-blue-500/10 border-blue-500/30', title: '1. Extract the ZIP', body: 'Right-click â†’ "Extract All". You\'ll find Code, Report, and PPT folders inside.' },
  { icon: <Terminal className="w-4 h-4 text-emerald-400" />, bg: 'bg-emerald-500/10 border-emerald-500/30', title: '2. Windows â€” double-click', body: <span>Double-click <code className="bg-zinc-800 text-emerald-400 px-1.5 py-0.5 rounded font-mono text-[11px]">run.bat</code> in the Code folder. Installs &amp; starts automatically.</span> },
  { icon: <Terminal className="w-4 h-4 text-purple-400" />, bg: 'bg-purple-500/10 border-purple-500/30', title: '2. Mac / Linux', body: <span>Open Terminal in Code folder and run: <code className="bg-zinc-800 text-purple-400 px-1.5 py-0.5 rounded font-mono text-[11px]">bash run.sh</code></span> },
  { icon: <Play className="w-4 h-4 text-amber-400" />, bg: 'bg-amber-500/10 border-amber-500/30', title: '3. Open in browser', body: <span>When terminal shows "Ready", open <code className="bg-zinc-800 text-amber-400 px-1.5 py-0.5 rounded font-mono text-[11px]">localhost:3000</code></span> },
  { icon: <GraduationCap className="w-4 h-4 text-rose-400" />, bg: 'bg-rose-500/10 border-rose-500/30', title: '4. Prepare for Viva', body: 'Read PPT speaker notes, print the IEEE Black Book, use the 25 Q&A answers.' },
];

function SuccessContent() {
  const searchParams    = useSearchParams();
  const orderId         = searchParams.get('order_id');
  const projectTitle    = searchParams.get('title') || 'Your Project Bundle';

  // Add-on flags from URL (passed after verification)
  const hasPersonalization = searchParams.get('personalize') === '1';
  const hasPlagiarismCert  = searchParams.get('plagiarism')  === '1';
  const hasVivaCall        = searchParams.get('viva')        === '1';

  const [error,       setError]       = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied,      setCopied]      = useState(false);
  const [idCopied,    setIdCopied]    = useState(false);

  // Personalization form
  const [showPersonalForm, setShowPersonalForm] = useState(false);
  const [rollNumber,  setRollNumber]  = useState('');
  const [guideName,   setGuideName]   = useState('');
  const [customerEmailForPersonal, setCustomerEmailForPersonal] = useState('');
  const [personalizing, setPersonalizing] = useState(false);
  const [personalDone,  setPersonalDone]  = useState(false);
  const [personalError, setPersonalError] = useState<string | null>(null);

  // Confetti
  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
    s.onload = () => {
      const c = (window as any).confetti;
      if (!c) return;
      const end = Date.now() + 3000;
      (function frame() {
        c({ particleCount: 5, angle: 60,  spread: 55, origin: { x: 0 }, colors: ['#10b981','#34d399','#fff'] });
        c({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#10b981','#34d399','#fff'] });
        if (Date.now() < end) requestAnimationFrame(frame);
      }());
    };
    document.head.appendChild(s);
    return () => { if (document.head.contains(s)) document.head.removeChild(s); };
  }, []);

  const handleDownload = async () => {
    if (downloading) return;
    if (!orderId) { setError('Missing order details. Contact team@submitkit.in.'); return; }
    setDownloading(true); setError(null);
    try {
      const res = await fetch(`/api/downloads/${orderId}`, { redirect: 'manual' });
      if (res.type === 'opaqueredirect' || res.status === 0 || (res.status >= 300 && res.status < 400)) {
        window.location.href = `/api/downloads/${orderId}`; return;
      }
      if (!res.ok) {
        let msg = 'Download failed. Try again or email team@submitkit.in.';
        try { const b = await res.json(); if (b?.error) msg = b.error; } catch { /**/ }
        setError(msg); setDownloading(false); return;
      }
      window.location.href = `/api/downloads/${orderId}`;
    } catch { setError('Network error. Check connection and try again.'); setDownloading(false); }
  };

  const handlePersonalize = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;
    setPersonalizing(true); setPersonalError(null);
    try {
      const res = await fetch('/api/personalize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, customerEmail: customerEmailForPersonal, rollNumber, guideName }),
      });
      const data = await res.json();
      if (!res.ok || !data.downloadUrl) {
        setPersonalError(data.error || 'Personalisation failed. Contact team@submitkit.in.');
      } else {
        setPersonalDone(true);
        window.open(data.downloadUrl, '_blank');
      }
    } catch { setPersonalError('Network error. Try again.'); }
    setPersonalizing(false);
  };

  const waLink = `https://wa.me/918799814256?text=${encodeURIComponent(`Hi! I purchased "${projectTitle}" (Order: ${orderId?.split('-')[0].toUpperCase() ?? ''}). Ready to book my Viva Prep Call!`)}`;

  return (
    <div className="min-h-screen bg-[#09090b] px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-50" />
        <div className="glow-orb w-[700px] h-[700px] bg-emerald-500/8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30 mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-emerald-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">Payment Successful!</h1>
          <p className="text-emerald-400 text-sm font-medium flex items-center justify-center gap-1.5">
            <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" /><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" /></span>
            Order confirmed â€” check your email for receipt
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* â”€â”€ LEFT: Download + Add-ons â”€â”€ */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="lg:col-span-3 space-y-4">

            {/* Order card */}
            <div className="glass-card p-6 rounded-2xl border-t-2 border-t-emerald-500 shadow-2xl shadow-emerald-900/20">
              <div className="bg-zinc-950/50 border border-white/5 rounded-xl p-4 mb-5">
                <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-semibold mb-1">Purchased Item</p>
                <p className="text-white text-base font-semibold">{projectTitle}</p>
                {orderId && (
                  <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-zinc-600 text-[10px] uppercase tracking-wider font-semibold">Order ID</p>
                      <p className="text-zinc-400 font-mono text-xs">{orderId.split('-')[0].toUpperCase()}</p>
                    </div>
                    <button onClick={() => { navigator.clipboard.writeText(orderId); setIdCopied(true); setTimeout(() => setIdCopied(false), 2000); }} className="text-zinc-500 hover:text-white transition-colors p-1">
                      {idCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                )}
              </div>

              {/* Download box */}
              {error ? (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl flex items-start gap-3 text-sm">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold mb-1">Download unavailable</p>
                    <p className="text-red-300/80 text-xs leading-relaxed">{error}</p>
                    <button onClick={() => { setError(null); setDownloading(false); }} className="mt-2 text-xs font-bold text-red-400 hover:text-white underline">Try again</button>
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-500/8 border border-emerald-500/20 rounded-xl p-5">
                  <div className="flex items-center justify-between text-xs text-emerald-400/70 mb-4 font-medium">
                    <span className="flex items-center gap-1.5"><Zap className="w-3 h-3" /> Link expires in 10 minutes</span>
                    <span>3 downloads remaining</span>
                  </div>
                  <button onClick={handleDownload} disabled={downloading} className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all disabled:opacity-50 text-base shadow-[0_0_25px_rgba(16,185,129,0.35)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)]">
                    <Download className="h-5 w-5" />
                    {downloading ? 'Preparing Your Bundle...' : 'Download Complete Bundle (.zip)'}
                  </button>
                  <p className="text-center text-[11px] text-zinc-600 mt-3 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3 h-3" /> Secure delivery via Cloudflare R2 CDN
                  </p>
                </div>
              )}
            </div>

            {/* â”€â”€ ADD-ON 1: Personalisation â”€â”€ */}
            {hasPersonalization && (
              <div className="glass-card p-5 rounded-2xl border border-brand-500/30 bg-brand-500/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-brand-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">Add My Name on Front Page</p>
                      <p className="text-zinc-400 text-xs">We'll type your name &amp; roll no on the Black Book cover</p>
                    </div>
                  </div>
                  {!personalDone && (
                    <button onClick={() => setShowPersonalForm(!showPersonalForm)} className="text-brand-400 text-xs font-bold flex items-center gap-1">
                      {showPersonalForm ? <><ChevronUp className="w-3 h-3" />Hide</> : <><ChevronDown className="w-3 h-3" />Fill Details</>}
                    </button>
                  )}
                </div>

                {personalDone && (
                  <div className="mt-3 flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                    <Check className="w-4 h-4" /> Personalised report downloading! Check your Downloads folder.
                  </div>
                )}

                {showPersonalForm && !personalDone && (
                  <form onSubmit={handlePersonalize} className="mt-4 space-y-3">
                    <input required type="email" placeholder="Your email (same as order)" value={customerEmailForPersonal} onChange={e => setCustomerEmailForPersonal(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-brand-500/50" />
                    <input required type="text" placeholder="Your Full Name (as on cover)" value={rollNumber} onChange={e => setRollNumber(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-brand-500/50" />
                    <input type="text" placeholder="Guide / Professor Name (optional)" value={guideName} onChange={e => setGuideName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder:text-zinc-500 text-sm focus:outline-none focus:border-brand-500/50" />
                    {personalError && <p className="text-red-400 text-xs">{personalError}</p>}
                    <button type="submit" disabled={personalizing} className="w-full py-2.5 bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">
                      {personalizing ? <><Loader2 className="w-4 h-4 animate-spin" /> Generatingâ€¦</> : 'Generate My Personalised Report'}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* â”€â”€ ADD-ON 2: Plagiarism Certificate â”€â”€ */}
            {hasPlagiarismCert && (
              <div className="glass-card p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Award className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">Plagiarism-Free Certificate</p>
                    <p className="text-zinc-400 text-xs mt-0.5 leading-relaxed">
                      Your real Turnitin report (&lt;10% similarity) will be emailed to you within <strong className="text-amber-400">24 hours</strong>. No action needed â€” we process it automatically.
                    </p>
                    <p className="text-zinc-500 text-[11px] mt-2">
                      Questions? WhatsApp <a href={waLink} className="text-amber-400 hover:underline">+91 87998 14256</a>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* â”€â”€ ADD-ON 3: Viva Prep Call â”€â”€ */}
            {hasVivaCall && (
              <div className="glass-card p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold">30-Min Viva Prep Call</p>
                    <p className="text-zinc-400 text-xs mt-0.5 leading-relaxed">
                      Book your slot on WhatsApp. Our expert will walk you through exactly what to say for each Viva question.
                    </p>
                    <a href={waLink} target="_blank" rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                      <MessageCircle className="w-3.5 h-3.5" />
                      Book on WhatsApp Now
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button onClick={() => { const t = 'Just got my final year project bundle from SubmitKit! ðŸš€'; if (navigator.share) navigator.share({ title: 'SubmitKit', text: t, url: 'https://submitkit.in' }).catch(() => {}); else { navigator.clipboard.writeText(t + ' https://submitkit.in'); setCopied(true); setTimeout(() => setCopied(false), 2000); } }} className="flex-1 flex items-center justify-center gap-2 text-sm text-zinc-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 py-3 rounded-xl transition-all">
                <Share2 className="w-4 h-4" />{copied ? 'Copied!' : 'Recommend to classmates'}
              </button>
              <Link href="/projects" className="flex-1 flex items-center justify-center gap-2 text-sm text-zinc-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 py-3 rounded-xl transition-all group">
                Browse more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Support */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
              <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <p className="text-blue-200/60 text-xs leading-relaxed">
                Issues? Email <a href="mailto:team@submitkit.in" className="text-blue-400 hover:underline font-medium">team@submitkit.in</a> with your Order ID â€” we respond within 2 hours.
                For a <strong>custom project</strong>, just email us your requirements.
              </p>
            </div>
          </motion.div>

          {/* â”€â”€ RIGHT: How to Run â”€â”€ */}
          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="lg:col-span-2">
            <div className="glass-card p-6 rounded-2xl h-full">
              <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400" /> How to Run Your Project
              </h3>
              <p className="text-zinc-500 text-xs mb-5 leading-relaxed">Running in under 5 minutes on any laptop.</p>
              <div className="space-y-3.5">
                {STEPS.map((s, i) => (
                  <div key={i} className={`p-3.5 rounded-xl border flex items-start gap-3 ${s.bg}`}>
                    <div className="w-7 h-7 rounded-lg bg-black/20 flex items-center justify-center shrink-0">{s.icon}</div>
                    <div>
                      <p className="text-white text-xs font-semibold mb-0.5">{s.title}</p>
                      <div className="text-zinc-400 text-xs leading-relaxed">{s.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090b] flex items-center justify-center"><div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" /></div>}>
      <SuccessContent />
    </Suspense>
  );
}

