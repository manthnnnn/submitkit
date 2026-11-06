'use client';

import { CheckCircle2, ShieldCheck, FileText, Code2, Presentation, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { CONSTANTS } from '@/lib/constants';

const DELIVERABLES = [
  {
    Icon: Code2,
    label: '1-Click Runnable Code',
    sub: 'Double-click run.bat — zero errors, 2 min setup',
    accent: '#0D9488',
    bg: 'linear-gradient(135deg, #CCFBF1 0%, #E6FFFA 100%)',
    border: 'rgba(13, 148, 136, 0.25)',
  },
  {
    Icon: FileText,
    label: '30-Page IEEE Black Book (.docx)',
    sub: 'Pre-formatted, fill in your name & submit',
    accent: '#0F766E',
    bg: 'linear-gradient(135deg, #D1FAE5 0%, #ECFDF5 100%)',
    border: 'rgba(5, 150, 105, 0.25)',
  },
  {
    Icon: Presentation,
    label: 'Viva Defense PPT Slides',
    sub: 'Speaker notes tell you what to say',
    accent: '#D97706',
    bg: 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)',
    border: 'rgba(217, 119, 6, 0.25)',
  },
  {
    Icon: CheckCircle2,
    label: 'Top 15 Viva Q&A with Answers',
    sub: 'Every question examiners typically ask',
    accent: '#059669',
    bg: 'linear-gradient(135deg, #D1FAE5 0%, #F0FDF4 100%)',
    border: 'rgba(16, 185, 129, 0.25)',
  },
];

export function PricingHook() {
  const mini = CONSTANTS.PRICING.MINI_PROJECT; // ₹299
  const major = CONSTANTS.PRICING.MAJOR_PROJECT; // ₹499

  return (
    <div className="w-full max-w-[27rem] mx-auto lg:ml-auto lg:mr-0 relative">
      {/* Clean bordered card */}
      <div
        className="relative rounded-3xl"
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--teal-100)',
          boxShadow: 'var(--sh-lg)',
        }}
      >
        {/* Card body */}
        <div
          className="pricing-hook-body relative rounded-[calc(1.5rem-1.5px)] overflow-hidden"
          style={{
            background: 'var(--surface)',
          }}
        >
          {/* Slim brand rule */}
          <div
            style={{
              height: '3px',
              background:
                'linear-gradient(90deg, #0D9488 0%, #14B8A6 100%)',
            }}
          />

          <div className="pricing-hook-content p-4 sm:p-5 lg:p-6">
            {/* Executive Badges Row (Matches Image 3) */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-teal-900 bg-teal-50 border border-teal-200/80 shadow-xs uppercase tracking-wide">
                <Zap className="w-3 h-3 text-teal-600 fill-teal-600" />
                Verified Kit
              </span>
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/70 shadow-xs">
                Mini Bundle
              </span>
            </div>

            {/* Title & Tagline (Matches Image 3) */}
            <h3 className="font-display text-2xl sm:text-[1.65rem] font-black text-slate-900 tracking-tight leading-tight mb-1">
              Mini Project Kit
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3.5">
              5th &amp; 6th semester done right. Download, run, submit with confidence.
            </p>

            {/* Clean, Non-Wrapping Price Showcase (Matches Image 3) */}
            <div className="flex items-baseline gap-3 mb-4 flex-wrap sm:flex-nowrap">
              <span className="text-4xl sm:text-[2.75rem] font-black text-slate-900 tracking-tight font-display whitespace-nowrap leading-none select-none inline-block">
                ₹{mini}
              </span>
              <span className="text-base sm:text-lg font-semibold text-slate-400 line-through whitespace-nowrap select-none inline-block">
                ₹1499
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] sm:text-xs font-bold text-teal-800 bg-teal-50/90 border border-teal-200 whitespace-nowrap uppercase tracking-wider shadow-2xs">
                SAVE ₹1,200
              </span>
            </div>

            {/* Deliverables List (Matches Image 3) */}
          <div className="pricing-hook-deliverables space-y-2 mb-4">
              {DELIVERABLES.map(({ Icon, label, sub, accent, bg, border }) => (
                <div
                  key={label}
                  className="flex items-start gap-2.5 sm:gap-3 p-2.5 rounded-xl transition-all duration-200 hover:translate-x-0.5"
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--line)',
                  }}
                >
                  <div
                    className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center mt-0.5 shadow-xs"
                    style={{ background: bg, border: `1px solid ${border}` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: accent }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-[13px] font-bold text-slate-900 leading-tight">
                      {label}
                    </div>
                    <div className="text-[11px] text-slate-500 leading-normal mt-0.5 line-clamp-1 sm:line-clamp-none">
                      {sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* High-Converting CTA Button (Matches Image 3) */}
            <Link
              href="/projects?tier=MINI"
              className="group relative w-full flex items-center justify-center gap-2 rounded-xl text-sm sm:text-base font-bold text-white transition-all active:scale-[0.98] shadow-lg hover:shadow-xl overflow-hidden"
              style={{
                minHeight: '48px',
                background: 'var(--teal)',
                boxShadow: 'var(--sh-teal)',
              }}
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <Zap className="w-4 h-4 text-teal-200 fill-teal-200 shrink-0" />
              <span className="whitespace-nowrap font-bold">Get Mini Kit — ₹{mini}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>

            {/* Guarantee Footnote (Matches Image 3) */}
            <p className="text-center text-[11px] text-slate-500 mt-2.5 flex items-center justify-center gap-1.5 font-medium flex-wrap">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Instant Download · 100% Bug-Free Guarantee</span>
            </p>

            {/* Major Project Upsell Drawer (Matches Top Right of Image 1) */}
              <div
                className="pricing-hook-upsell mt-3.5 pt-2.5 rounded-xl p-3 border flex items-center justify-between gap-3"
                style={{
                  background: 'var(--teal-50)',
                  borderColor: 'var(--teal-100)',
                }}
              >
              <div className="min-w-0">
                <div className="text-[10px] font-black text-teal-800 uppercase tracking-wider">
                  Need Major Project?
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 whitespace-nowrap">
                  ₹{major} <span className="text-[11px] font-normal text-slate-500">/ 60-pg Report</span>
                </div>
              </div>
              <Link
                href="/projects?tier=MAJOR"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-900 bg-white border border-teal-300/80 hover:bg-teal-50 transition-all shrink-0 active:scale-95 shadow-xs"
              >
                <span>View</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-700" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
