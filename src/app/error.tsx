'use client';
import { useEffect } from 'react';
import { AlertTriangle, Home, RefreshCcw } from 'lucide-react';
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
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="glow-orb w-[600px] h-[600px] bg-red-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="max-w-md w-full glass-card p-8 rounded-3xl text-center border-t-2 border-t-red-500 shadow-2xl">
        <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/20">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>
        
        <h1 className="text-2xl font-display font-bold text-white mb-2">Something went wrong</h1>
        <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
          We encountered an unexpected issue while loading this page. Our team has been notified.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => reset()}
            className="flex-1 flex items-center justify-center gap-2 bg-white text-zinc-950 font-semibold py-3 rounded-xl hover:bg-zinc-200 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
            Try Again
          </button>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-white/5 text-white font-medium py-3 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
