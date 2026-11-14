'use client';

import { CheckCircle2, ShieldCheck, FileText, Code2, Presentation, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { CONSTANTS } from '@/lib/constants';

const DELIVERABLES = [
  {
    Icon: Code2,
    label: '1-Click Runnable Code',
    sub: 'Double-click run.bat — zero errors, 2 min setup',
    accent: '#E55729',
    bg: 'linear-gradient(135deg, #FDF6F2 0%, #FAEDE5 100%)',
    border: 'rgba(229, 87, 41, 0.25)',
  },
  {
    Icon: FileText,
    label: '30-Page IEEE Black Book (.docx)',
    sub: 'Pre-formatted, fill in your name & submit',
    accent: '#18181B',
    bg: 'linear-gradient(135deg, #F4F4F5 0%, #E4E4E7 100%)',
    border: 'rgba(24, 24, 27, 0.2)',
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
    accent: '#CB451A',
    bg: 'linear-gradient(135deg, #FDF6F2 0%, #FAEDE5 100%)',
    border: 'rgba(203, 69, 26, 0.25)',
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
              background: 'linear-gradient(90deg, #EE6E44 0%, #E55729 40%, #CB451A 100%)',
            }}
          />

          <div className="pricing-hook-content p-4 sm:p-5 lg:p-6">
            {/* Executive Badges Row */}
            <div className="pricing-hook-badges flex items-center justify-between gap-2 mb-3">
              <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px', background: '#FDF6F2', color: '#E55729', border: '1px solid #F3CFBF', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Zap style={{ width: '12px', height: '12px', color: '#E55729', fill: '#E55729' }} />
                Pre-Made College Kit
              </span>
              <span className="tag tag-amber text-[11px] font-bold">
                Resume Booster
              </span>
            </div>

            {/* Title & Tagline */}
            <h3 className="font-display text-2xl sm:text-[1.65rem] font-black text-slate-900 tracking-tight leading-tight mb-1">
              Software System (Mini Kit)
            </h3>
            <p className="pricing-hook-description text-xs sm:text-sm text-slate-600 leading-relaxed mb-3.5">
              Need a ready-made project for your resume? Want to enhance your developer profile for placements? Download, run, and submit with confidence.
            </p>

            {/* Clean, Non-Wrapping Price Showcase */}
            <div className="pricing-hook-price flex items-baseline gap-3 mb-4 flex-wrap sm:flex-nowrap">
              <span className="text-4xl sm:text-[2.75rem] font-black text-slate-900 tracking-tight font-display whitespace-nowrap leading-none select-none inline-block">
                ₹{mini}
              </span>
              <span className="text-base sm:text-lg font-semibold text-slate-400 line-through whitespace-nowrap select-none inline-block">
                ₹1499
              </span>
              <span style={{ fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '9999px', background: '#FDF6F2', color: '#E55729', border: '1px solid #F3CFBF' }}>
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
              className="w-full text-sm sm:text-base font-bold text-white group overflow-hidden"
              style={{
                minHeight: '48px',
                borderRadius: '12px',
                background: '#18181B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 14px rgba(24, 24, 27, 0.25)',
                position: 'relative',
                transition: 'all 180ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#27272A')}
              onMouseLeave={e => (e.currentTarget.style.background = '#18181B')}
            >
              <Zap className="w-4 h-4 text-white fill-white shrink-0" />
              <span className="whitespace-nowrap font-bold">Get Mini Kit — ₹{mini}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>

            {/* Guarantee Footnote */}
            <p className="pricing-hook-guarantee text-center text-[11px] text-slate-500 mt-2.5 flex items-center justify-center gap-1.5 font-medium flex-wrap">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E55729] shrink-0" />
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
                <div style={{ fontSize: '10px', fontWeight: 900, color: '#E55729', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Need Production System? (Major Kit)
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 whitespace-nowrap">
                  ₹{major} <span className="text-[11px] font-normal text-slate-500">/ 60-pg IEEE Report &amp; PPT</span>
                </div>
              </div>
              <Link
                href="/projects?tier=MAJOR"
                className="btn btn-outline"
                style={{ minHeight: '32px', padding: '0 0.75rem', fontSize: '0.75rem', borderRadius: '8px', fontWeight: 700 }}
              >
                <span>View</span>
                <ArrowRight style={{ width: '14px', height: '14px', color: '#18181B' }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
