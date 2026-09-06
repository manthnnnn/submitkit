import Link from 'next/link';
import { ArrowRight, Home, Package } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-[#09090b] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Glowing 404 */}
        <div className="relative mb-8">
          <div className="text-[9rem] font-display font-black text-white/5 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl font-display font-black text-white leading-none">
              404
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-display font-bold text-white mb-3">
          Page not found
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed mb-8">
          The page you are looking for does not exist or may have been moved.
          Check the URL or navigate back to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-sm transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-all border border-white/10 group"
          >
            <Package className="w-4 h-4" />
            Browse Projects
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <p className="text-zinc-600 text-xs mt-8">
          Need help?{' '}
          <a href="mailto:team@submitkit.in" className="text-zinc-500 hover:text-white transition-colors">
            team@submitkit.in
          </a>
        </p>
      </div>
    </div>
  );
}
