'use client';

import Link from 'next/link';
import { ArrowLeft, ShoppingBag, CheckCircle2 } from 'lucide-react';
import { CONSTANTS } from '@/lib/constants';

interface DemoBannerProps {
  title: string;
  slug: string;
  price?: number;
}

export function DemoBanner({ title, slug, price = CONSTANTS.PRICING.MINI_PROJECT }: DemoBannerProps) {
  return (
    <div className="sticky top-0 z-[9999] w-full bg-[#09090b] border-b border-emerald-500/30 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-between flex-wrap gap-3 px-4 py-2.5 max-w-screen-2xl mx-auto">

        {/* Left: back + title */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/8 border border-white/15 text-zinc-300 text-xs font-bold hover:bg-white/15 transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Catalog
          </Link>

          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-bold text-white truncate max-w-[200px] md:max-w-none">
              {title}
            </span>
            <span className="hidden sm:inline-flex items-center text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 uppercase tracking-wide shrink-0">
              ⚡ Live Demo
            </span>
          </div>
        </div>

        {/* Middle: deliverables — hidden on small screens */}
        <div className="hidden lg:flex items-center gap-5 text-xs text-zinc-400">
          {[
            '100% Tested Code',
            '60-Pg IEEE Black Book',
            'Viva Defense PPT',
          ].map(item => (
            <span key={item} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              {item}
            </span>
          ))}
        </div>

        {/* Right: buy CTA */}
        <Link
          href={`/projects/${slug}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-xs font-bold shadow-[0_4px_14px_rgba(16,185,129,0.4)] hover:shadow-[0_4px_20px_rgba(16,185,129,0.6)] transition-all shrink-0"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Get Complete Kit — ₹{price}
        </Link>
      </div>
    </div>
  );
}
