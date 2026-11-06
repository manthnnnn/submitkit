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
      {/* Soft ambient glow backdrop */}
      <div
        className="absolute -inset-3 rounded-3xl opacity-60 blur-2xl pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(245, 238, 224, 0.7) 0%, rgba(255, 255, 255, 0.5) 45%, transparent 75%)',
        }}
      />

      {/* Clean bordered card with soft brand gradient header */}
      <div
        className="card relative rounded-3xl overflow-hidden"
        style={{
          border: '1px solid #E5DCCF',
          boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 12px 32px -4px rgba(220, 205, 185, 0.25)',
        }}
      >
        {/* Card body */}
        <div className="pricing-hook-body relative">
          {/* Subtle multi-tone brand rule */}
          <div
            style={{
              height: '3px',
              background: 'linear-gradient(90deg, #0D9488 0%, #14B8A6 40%, #F59E0B 75%, #10B981 100%)',
            }}
          />

          <div className="pricing-hook-content p-4 sm:p-5 lg:p-6">
            {/* Executive Badges Row */}
            <div className="pricing-hook-badges flex items-center justify-between gap-2 mb-3">
              <span className="tag tag-teal text-[11px] font-bold">
                <Zap className="w-3 h-3 text-teal-600 fill-teal-600" />
                Verified Kit
              </span>
              <span className="tag tag-amber text-[11px] font-bold">
                Mini Bundle
              </span>
            </div>

            {/* Title & Tagline */}
            <h3 className="font-display text-2xl sm:text-[1.65rem] font-black text-slate-900 tracking-tight leading-tight mb-1">
              Mini Project Kit
            </h3>
            <p className="pricing-hook-description text-xs sm:text-sm text-slate-600 leading-relaxed mb-3.5">
              5th &amp; 6th semester done right. Download, run, submit with confidence.
            </p>

            {/* Clean, Non-Wrapping Price Showcase */}
            <div className="pricing-hook-price flex items-baseline gap-3 mb-4 flex-wrap sm:flex-nowrap">
              <span className="text-4xl sm:text-[2.75rem] font-black text-slate-900 tracking-tight font-display whitespace-nowrap leading-none select-none inline-block">
                ₹{mini}
              </span>
              <span className="text-base sm:text-lg font-semibold text-slate-400 line-through whitespace-nowrap select-none inline-block">
                ₹1499
              </span>
              <span className="tag tag-teal text-[11px] sm:text-xs font-bold whitespace-nowrap">
                SAVE ₹1,200
              </span>
            </div>

            {/* Deliverables List with clean surface rows */}
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

            {/* High-Converting Minimal CTA Button */}
            <Link
              href="/projects?tier=MINI"
              className="btn btn-teal w-full text-sm sm:text-base font-bold text-white group overflow-hidden"
              style={{
                minHeight: '48px',
                borderRadius: '12px',
              }}
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <Zap className="w-4 h-4 text-teal-200 fill-teal-200 shrink-0" />
              <span className="whitespace-nowrap font-bold">Get Mini Kit — ₹{mini}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>

            {/* Guarantee Footnote */}
            <p className="pricing-hook-guarantee text-center text-[11px] text-slate-500 mt-2.5 flex items-center justify-center gap-1.5 font-medium flex-wrap">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Instant Download · 100% Bug-Free Guarantee</span>
            </p>

            {/* Major Project Upsell Drawer with soft warm gradient */}
            <div
              className="pricing-hook-upsell mt-3.5 pt-2.5 rounded-xl p-3 flex items-center justify-between gap-3"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #FAF6EE 50%, #F5EFE4 100%)',
                border: '1px solid #E6DED0',
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
                className="btn btn-outline"
                style={{ minHeight: '32px', padding: '0 0.75rem', fontSize: '0.75rem', borderRadius: '8px', fontWeight: 700 }}
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
