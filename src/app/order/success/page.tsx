'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Download, AlertCircle, Share2, ArrowRight, FileCheck2, Cpu, GraduationCap, Copy } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order_id');
  const projectTitle = searchParams.get('title') || 'Your Project Bundle';

  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {

    // Fire confetti using canvas-confetti loaded from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
    script.onload = () => {
      const confetti = (window as any).confetti;
      if (!confetti) return;
      
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#10b981', '#34d399', '#ffffff']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#10b981', '#34d399', '#ffffff']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, [searchParams]);

  const handleDownload = async () => {
    if (downloading) return;
    if (!orderId) {
      setError("Missing order details. Please contact support@submitkit.in with your payment details.");
      return;
    }
    setDownloading(true);
    setError(null);

    try {
      // Check the API response before redirecting so we can show errors
      const res = await fetch(`/api/downloads/${orderId}`, { redirect: 'manual' });

      if (res.type === 'opaqueredirect' || res.status === 0 || (res.status >= 300 && res.status < 400)) {
        // Successful redirect to R2 presigned URL — follow it
        window.location.href = `/api/downloads/${orderId}`;
        // Leave downloading=true so button shows "Preparing..." while browser navigates
        return;
      }

      if (!res.ok) {
        let errMsg = 'Download failed. Please try again or contact support@submitkit.in.';
        try {
          const body = await res.json();
          if (body?.error) errMsg = body.error;
        } catch { /* not JSON */ }
        setError(errMsg);
        setDownloading(false);
        return;
      }

      // 2xx — should not happen for this endpoint, but handle gracefully
      window.location.href = `/api/downloads/${orderId}`;
    } catch {
      setError('Network error. Please check your connection and try again.');
      setDownloading(false);
    }
  };

  const handleShare = () => {
    const text = 'Just got my final year project bundle from SubmitKit! Running perfectly 🚀';
    if (navigator.share) {
      navigator.share({ title: 'SubmitKit', text, url: 'https://submitkit.in' }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text + ' https://submitkit.in');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      
      {/* Premium Background Effects */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:24px_24px] opacity-50" />
        <div className="glow-orb w-[800px] h-[800px] bg-emerald-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#09090b]/80 to-[#09090b]" />
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 relative z-10">
        
        {/* Main Success Area (Takes up 3 columns) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-3 space-y-6"
        >
          <div className="glass-card p-8 md:p-10 rounded-3xl border-t-2 border-t-emerald-500 relative overflow-hidden shadow-2xl shadow-emerald-900/20">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/80 to-transparent shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.2)] shrink-0">
                <CheckCircle className="h-8 w-8 text-emerald-400" />
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold text-white tracking-tight mb-1">Payment Successful</h1>
                <p className="text-emerald-400 text-sm font-medium flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Order processed instantly
                </p>
              </div>
            </div>

            <div className="bg-zinc-950/50 border border-white/5 rounded-2xl p-5 mb-8">
              <p className="text-zinc-500 text-xs uppercase tracking-wider font-semibold mb-2">Purchased Item</p>
              <p className="text-white text-lg font-medium leading-tight">{projectTitle}</p>
              {orderId && (
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-zinc-600 text-[10px] uppercase tracking-wider font-semibold">Order ID</p>
                    <p className="text-zinc-400 font-mono text-xs">{orderId.split('-')[0].toUpperCase()}</p>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(orderId);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="text-zinc-500 hover:text-white transition-colors"
                    title="Copy Order ID"
                  >
                    {copied ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              )}
            </div>

            {/* Download Box */}
            {error ? (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-5 rounded-2xl flex items-start gap-3 text-sm">
                <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Download unavailable</p>
                  <p className="leading-relaxed text-red-300/80">{error}</p>
                  <button
                    onClick={() => { setError(null); setDownloading(false); }}
                    className="mt-3 text-xs font-bold text-red-400 hover:text-white underline underline-offset-2"
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-emerald-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                
                <p className="text-xs text-emerald-300/80 mb-4 font-medium flex items-center justify-between">
                  <span>⏱ Link expires in 10 minutes</span>
                  <span>3 downloads remaining</span>
                </p>
                
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="relative w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-[0.98]"
                >
                  <Download className="h-5 w-5" />
                  <span className="text-base">{downloading ? 'Preparing Your Zip File...' : 'Download Complete Bundle (.zip)'}</span>
                </button>
              </div>
            )}
          </div>
          
          {/* Action Row */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center gap-2 text-sm text-zinc-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 py-3.5 rounded-2xl transition-all"
            >
              <Share2 className="w-4 h-4" />
              {copied ? 'Link Copied!' : 'Recommend to classmates'}
            </button>
            <Link 
              href="/projects" 
              className="flex-1 flex items-center justify-center gap-2 text-sm text-zinc-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 py-3.5 rounded-2xl transition-all group"
            >
              Browse more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Sidebar Steps (Takes up 2 columns) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2"
        >
          <div className="glass-card p-6 md:p-8 rounded-3xl h-full border-white/10">
            <h3 className="text-white font-medium mb-6 pb-4 border-b border-white/5 flex items-center justify-between">
              What happens next?
              <span className="text-[10px] uppercase tracking-wider font-bold bg-white/10 text-zinc-400 px-2 py-1 rounded-md">Guide</span>
            </h3>
            
            <div className="space-y-8">
              <div className="relative pl-6 border-l-2 border-emerald-500/30">
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
                  <FileCheck2 className="w-4 h-4 text-emerald-400" />
                </div>
                <h4 className="text-white font-medium text-sm mb-1 ml-4">1. Extract the ZIP</h4>
                <p className="text-zinc-500 text-xs leading-relaxed ml-4">Find the downloaded file and right-click to "Extract All". You'll see folders for Code, Report, and PPT.</p>
              </div>

              <div className="relative pl-6 border-l-2 border-brand-500/30">
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-brand-500/20 border border-brand-500/50 flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-brand-400" />
                </div>
                <h4 className="text-white font-medium text-sm mb-1 ml-4">2. Run the Code</h4>
                <p className="text-zinc-500 text-xs leading-relaxed ml-4">Double-click the <code className="bg-white/10 px-1 rounded">run.bat</code> file inside the code folder. Your project will launch instantly in your browser.</p>
              </div>

              <div className="relative pl-6 border-l-2 border-transparent">
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                </div>
                <h4 className="text-white font-medium text-sm mb-1 ml-4">3. Prepare for Viva</h4>
                <p className="text-zinc-500 text-xs leading-relaxed ml-4">Open the PPT file and read the speaker notes. Print out the IEEE Black Book report and submit it.</p>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/5">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                <AlertCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-200 text-xs font-medium mb-1">Facing any issues?</p>
                  <p className="text-blue-200/60 text-xs leading-relaxed">Reply to your order confirmation email or drop us a message at <a href="mailto:support@submitkit.in" className="text-blue-400 hover:underline">support@submitkit.in</a>.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
