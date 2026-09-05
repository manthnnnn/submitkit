'use client';
import { CheckCircle2, Zap, Clock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { CONSTANTS } from '@/lib/constants';

export function PricingHook() {
  return (
    <div className="w-full max-w-sm mx-auto lg:ml-auto relative group animate-slide-up mt-8 lg:mt-0">
      {/* Decorative Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/50 to-emerald-500/50 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition duration-1000"></div>
      
      <div className="relative glass-card rounded-3xl p-8 border border-white/10 bg-[#09090b]/90 backdrop-blur-2xl shadow-2xl flex flex-col">
        
        {/* Top Hooks */}
        <div className="flex justify-between items-start mb-6">
          <div className="bg-brand-500/20 border border-brand-500/30 text-brand-400 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Zap className="w-3 h-3 fill-brand-400" />
            Most Popular
          </div>
          
          <div className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
            <Clock className="w-3 h-3" />
            <span>Ends Soon</span>
          </div>
        </div>

        <h3 className="text-2xl font-display font-medium text-white mb-2">Mini Project</h3>
        <p className="text-sm text-zinc-400 mb-6">Everything you need to pass 6th Sem.</p>
        
        {/* Pricing Hook (Anchor Price) */}
        <div className="flex items-end gap-3 mb-6 pb-6 border-b border-white/10">
          <span className="text-5xl font-display font-bold text-white tracking-tight">₹{CONSTANTS.PRICING.MINI_PROJECT}</span>
          <span className="text-zinc-500 text-lg line-through mb-1">₹1,500</span>
        </div>
        
        {/* Value Props */}
        <ul className="space-y-4 mb-8 flex-grow">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-zinc-300 text-sm">Working Source Code</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-zinc-300 text-sm">30-Page Word Report</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-zinc-300 text-sm font-medium text-white">Instant Download to Email</span>
          </li>
        </ul>
        
        {/* CTA */}
        <Link href="/projects?tier=MINI" className="w-full py-4 bg-white hover:bg-zinc-200 text-center rounded-xl text-zinc-950 font-bold transition-all text-sm shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2">
          Claim Deal Now
        </Link>
        
        {/* Trust Hook */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-zinc-500">
          <ShieldCheck className="w-3 h-3" />
          <span>100% Secure UPI Payment</span>
        </div>
      </div>
    </div>
  );
}
