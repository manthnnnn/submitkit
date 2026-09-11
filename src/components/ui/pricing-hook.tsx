'use client';
import { CheckCircle2, Zap, ShieldCheck, FileText, Code2, Presentation } from 'lucide-react';
import Link from 'next/link';
import { CONSTANTS } from '@/lib/constants';

export function PricingHook() {
  return (
    <div className="w-full max-w-sm mx-auto lg:ml-auto relative group animate-slide-up mt-8 lg:mt-0" style={{ transform: 'translateZ(0)' }}>
      <div className="relative glass-card rounded-2xl p-7 border border-brand-500/25 bg-[#121217] shadow-xl flex flex-col">

        {/* Header row */}
        <div className="flex justify-between items-start mb-6">
          <div className="bg-brand-500/15 border border-brand-500/30 text-brand-400 text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
            <Zap className="w-3 h-3 fill-brand-400" />
            Verified Standard
          </div>
          <div className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
            Mini Bundle
          </div>
        </div>

        <h3 className="text-2xl font-display font-semibold text-white mb-1">Mini Project Kit</h3>
        <p className="text-xs text-zinc-400 mb-6">Stop stressing over your 5th &amp; 6th semester submission. Download, double-click to run, and submit with total confidence.</p>

        {/* Price */}
        <div className="flex items-end gap-3 mb-6 pb-6 border-b border-white/5">
          <span className="text-5xl font-display font-bold text-white tracking-tight">
            ₹{CONSTANTS.PRICING.MINI_PROJECT}
          </span>
          <div className="mb-1">
            <span className="text-zinc-500 text-base line-through block">
              ₹{CONSTANTS.PRICING.MINI_PROJECT + 1200}
            </span>
            <span className="text-emerald-400 text-xs font-semibold">Save ₹1,200</span>
          </div>
        </div>

        {/* What's included — consistent with the rest of the site */}
        <ul className="space-y-3.5 mb-8 flex-grow">
          {[
            { Icon: Code2,         text: '1-Click Runnable Code',            sub: 'Double-click run.bat (Zero Errors)' },
            { Icon: FileText,      text: '30-Page IEEE Black Book (.docx)',  sub: 'Pre-formatted report, just add your name' },
            { Icon: Presentation,  text: 'Viva Defense PPT Slides',          sub: 'Clean slides with speaker talking points' },
            { Icon: CheckCircle2,  text: 'Top 15 Viva Q&A with Answers',     sub: 'Know exactly what external examiners ask' },
          ].map(({ Icon, text, sub }) => (
            <li key={text} className="flex items-start gap-3">
              <div className="bg-emerald-500/10 p-1.5 rounded-lg mt-0.5 shrink-0">
                <Icon className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <div>
                <span className="text-zinc-200 text-sm font-medium block">{text}</span>
                <span className="text-zinc-500 text-xs">{sub}</span>
              </div>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/projects?tier=MINI"
          className="w-full py-4 bg-white hover:bg-zinc-100 text-center rounded-xl text-zinc-950 font-bold transition-all text-sm shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Get Mini Project Kit
        </Link>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-zinc-500">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>Instant Download · 100% Bug-Free Guarantee</span>
        </div>
      </div>
    </div>
  );
}
