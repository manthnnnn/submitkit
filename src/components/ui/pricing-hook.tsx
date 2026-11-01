'use client';

import { CheckCircle2, ShieldCheck, FileText, Code2, Presentation, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { CONSTANTS } from '@/lib/constants';

const DELIVERABLES = [
  {
    Icon: Code2,
    label: '1-Click Runnable Source Code',
    sub: 'Tested on Python / Node / Java — double-click run.bat, zero errors',
    accent: '#0D9488',
    bg: 'linear-gradient(135deg, #CCFBF1 0%, #E6FFFA 100%)',
    border: 'rgba(13, 148, 136, 0.25)',
  },
  {
    Icon: FileText,
    label: '30+ Page IEEE Black Book (.docx)',
    sub: 'University formatted — Literature Survey, Architecture & UML',
    accent: '#0F766E',
    bg: 'linear-gradient(135deg, #D1FAE5 0%, #ECFDF5 100%)',
    border: 'rgba(5, 150, 105, 0.25)',
  },
  {
    Icon: Presentation,
    label: 'Examiner Defense PPT Presentation',
    sub: '12 professional slides with word-for-word speaker notes on what to say',
    accent: '#D97706',
    bg: 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)',
    border: 'rgba(217, 119, 6, 0.25)',
  },
  {
    Icon: CheckCircle2,
    label: 'Top 25 Viva Q&A with Model Answers',
    sub: 'Every question examiners ask, with exact answers to score 90%+',
    accent: '#059669',
    bg: 'linear-gradient(135deg, #D1FAE5 0%, #F0FDF4 100%)',
    border: 'rgba(16, 185, 129, 0.25)',
  },
];

export function PricingHook() {
  const mini = CONSTANTS.PRICING.MINI_PROJECT;
  const major = CONSTANTS.PRICING.MAJOR_PROJECT;

  return (
    <div className="w-full max-w-[27rem] mx-auto lg:ml-auto lg:mr-0 relative">
      {/* Soft Multi-Tone Ambient Glow Backdrop */}
      <div
        className="absolute -inset-3 rounded-3xl opacity-60 blur-2xl pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 80% 15%, rgba(13, 148, 136, 0.35) 0%, rgba(245, 158, 11, 0.18) 45%, transparent 75%)',
        }}
      />
      <div
        className="absolute -inset-2 rounded-3xl opacity-40 blur-xl pointer-events-none -z-10"
        style={{
          background:
            'radial-gradient(circle at 20% 85%, rgba(5, 150, 105, 0.25) 0%, rgba(13, 148, 136, 0.15) 45%, transparent 70%)',
        }}
      />

      {/* Outer Gradient-Border Card Shell */}
      <div
        className="relative rounded-3xl p-[1.5px] transition-all duration-300 shadow-2xl"
        style={{
          background:
            'linear-gradient(145deg, rgba(13, 148, 136, 0.45) 0%, rgba(20, 184, 166, 0.2) 28%, rgba(245, 158, 11, 0.28) 68%, rgba(5, 150, 105, 0.42) 100%)',
          boxShadow:
            '0 24px 60px -12px rgba(13, 148, 136, 0.16), 0 12px 28px -6px rgba(15, 23, 42, 0.08), 0 0 0 1px rgba(255, 255, 255, 0.4)',
        }}
      >
        {/* Main Inner Card with Multi-Stop Gradient Blend */}
        <div
          className="relative rounded-[calc(1.5rem-1.5px)] overflow-hidden"
          style={{
            background:
              'linear-gradient(170deg, #FFFFFF 0%, #F5FBF9 32%, #FCFAF7 68%, #F0FDF8 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          {/* Top Iridescent Jewel Accent Rule */}
          <div
            style={{
              height: '4px',
              background:
                'linear-gradient(90deg, #0D9488 0%, #14B8A6 35%, #F59E0B 70%, #059669 100%)',
            }}
          />

          <div className="p-4 sm:p-5 lg:p-6">
            {/* Executive Badges Row */}
            <div className="flex items-center justify-between gap-2 mb-3.5 flex-wrap sm:flex-nowrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-teal-900 bg-gradient-to-r from-teal-100/90 via-emerald-100/80 to-teal-50 border border-teal-300/70 shadow-xs uppercase tracking-wide">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
                </span>
                Verified Kit
              </span>
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider bg-gradient-to-r from-amber-100/70 to-orange-50/70 px-2.5 py-1 rounded-full border border-amber-300/60 shadow-xs">
                Mini Bundle · Sem 5/6
              </span>
            </div>

            {/* Title & Tagline */}
            <h3 className="font-display text-2xl sm:text-[1.65rem] font-black text-slate-900 tracking-tight leading-tight mb-1.5">
              Mini Project Kit
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Complete turn-key submission package with 1-click execution, IEEE report &amp; viva coaching.
            </p>

            {/* Luxury Price Showcase with Warm Iridescent Gradient (Zero-Wrap Guaranteed) */}
            <div
              className="rounded-2xl p-3.5 sm:p-4 mb-4 relative overflow-hidden transition-all"
              style={{
                background:
                  'linear-gradient(135deg, rgba(240, 253, 250, 0.95) 0%, rgba(255, 255, 255, 0.98) 45%, rgba(254, 243, 199, 0.5) 100%)',
                border: '1px solid rgba(13, 148, 136, 0.22)',
                boxShadow:
                  '0 4px 20px -2px rgba(13, 148, 136, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
              }}
            >
              {/* Subtle ambient flare in corner */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none opacity-40 blur-xl"
                style={{
                  background: 'radial-gradient(circle, rgba(245, 158, 11, 0.35) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2.5 flex-wrap">
                  {/* Price & strike - strictly non-wrapping */}
                  <div className="flex items-baseline gap-2 whitespace-nowrap shrink-0">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-display whitespace-nowrap leading-none select-none">
                      ₹{mini}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-slate-400 line-through whitespace-nowrap select-none">
                      ₹{mini + 1200}
                    </span>
                  </div>

                  {/* Gradient discount pill */}
                  <div className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider text-emerald-900 bg-gradient-to-r from-emerald-100 via-teal-100 to-emerald-50 border border-emerald-300/80 shadow-xs whitespace-nowrap shrink-0">
                    Save 80% (₹1,200)
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-600 font-medium flex-wrap gap-1">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 inline-block shrink-0" />
                    <span>One-time payment · Lifetime access</span>
                  </span>
                  <span className="font-bold text-teal-700 whitespace-nowrap">
                    Instant Download
                  </span>
                </div>
              </div>
            </div>

            {/* High-Class Deliverables Capsules */}
            <div className="space-y-2 mb-4.5">
              {DELIVERABLES.map(({ Icon, label, sub, accent, bg, border }) => (
                <div
                  key={label}
                  className="flex items-start gap-2.5 sm:gap-3 p-2.5 rounded-xl transition-all duration-200 hover:translate-x-0.5"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(246, 250, 249, 0.6) 100%)',
                    border: '1px solid rgba(226, 232, 240, 0.8)',
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

            {/* Luxury Tactile CTA Button */}
            <Link
              href="/projects?tier=MINI"
              className="group relative w-full flex items-center justify-center gap-2.5 rounded-xl text-sm sm:text-base font-bold text-white transition-all active:scale-[0.98] shadow-lg hover:shadow-xl overflow-hidden"
              style={{
                minHeight: '48px',
                background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 50%, #065F59 100%)',
                boxShadow:
                  '0 8px 24px -4px rgba(13, 148, 136, 0.45), 0 2px 6px -1px rgba(13, 148, 136, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.28)',
              }}
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <Sparkles className="w-4 h-4 text-teal-200 animate-pulse shrink-0" />
              <span className="whitespace-nowrap font-bold">Get Mini Kit — ₹{mini}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>

            {/* Trust Footnote */}
            <p className="text-center text-[11px] text-slate-500 mt-2.5 flex items-center justify-center gap-1.5 font-medium flex-wrap">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Instant Download · 100% Run Guarantee · Verified</span>
            </p>

            {/* Executive Major Project Upsell Drawer */}
            <div
              className="mt-3.5 pt-3 rounded-xl p-3 border flex items-center justify-between gap-3"
              style={{
                background:
                  'linear-gradient(135deg, rgba(240, 253, 250, 0.7) 0%, rgba(254, 249, 235, 0.5) 100%)',
                borderColor: 'rgba(13, 148, 136, 0.18)',
              }}
            >
              <div className="min-w-0">
                <div className="text-[10px] font-black text-teal-800 uppercase tracking-wider">
                  Need Final Year Major Capstone?
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 whitespace-nowrap">
                  ₹{major} <span className="text-[11px] font-normal text-slate-500">/ 60+ Page IEEE Report</span>
                </div>
              </div>
              <Link
                href="/projects?tier=MAJOR"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-teal-900 bg-white border border-teal-300/80 hover:bg-teal-50 transition-all shrink-0 active:scale-95 shadow-xs"
              >
                <span>View Major</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-700" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
