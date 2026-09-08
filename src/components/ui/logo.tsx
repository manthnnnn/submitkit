import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  href?: string | null;
  className?: string;
  badge?: string;
}

export function BrandIcon({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg'; className?: string }) {
  const dimensions = {
    sm: { box: 'w-8 h-8 p-1.5 rounded-xl', icon: 20 },
    md: { box: 'w-9 h-9 p-1.5 rounded-xl', icon: 24 },
    lg: { box: 'w-12 h-12 p-2 rounded-2xl', icon: 34 },
  }[size];

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 bg-[#121217] border border-white/10 shadow-[0_0_20px_rgba(16,185,129,0.12)] group-hover:border-emerald-500/40 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] transition-all duration-300 ${dimensions.box} ${className}`}
    >
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform group-hover:scale-105 transition-transform duration-300"
      >
        <defs>
          {/* Top Facet (Submission Platform: Sky Cyan -> Mint Emerald) */}
          <linearGradient id="sk-top-facet" x1="10" y1="14" x2="38" y2="14" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>

          {/* Left Facet (Core Code Engine: Electric Indigo) */}
          <linearGradient id="sk-left-facet" x1="10" y1="16" x2="23" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4338ca" />
          </linearGradient>

          {/* Right Facet (Verified Bundle: Cyan to Teal) */}
          <linearGradient id="sk-right-facet" x1="25" y1="16" x2="38" y2="38" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
        </defs>

        {/* Top Isometric Face */}
        <path d="M24 6L38.5 14.5L24 23L9.5 14.5L24 6Z" fill="url(#sk-top-facet)" />

        {/* Left Vertical Face */}
        <path d="M9.5 17L22.5 24.5V39L9.5 31.5V17Z" fill="url(#sk-left-facet)" />

        {/* Right Vertical Face */}
        <path d="M25.5 24.5L38.5 17V31.5L25.5 39V24.5Z" fill="url(#sk-right-facet)" />

        {/* Specular Apex Chevron (Upward launch indicator) */}
        <path d="M24 10L31 14.2L24 18.5L17 14.2L24 10Z" fill="#ffffff" fillOpacity="0.45" />

        {/* Center Apex Specular Node */}
        <circle cx="24" cy="14.2" r="1.5" fill="#ffffff" />
      </svg>
    </div>
  );
}

export function Logo({
  size = 'md',
  showWordmark = true,
  href = '/',
  className = '',
  badge,
}: LogoProps) {
  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  }[size];

  const content = (
    <div className={`flex items-center gap-2.5 group shrink-0 ${className}`}>
      <BrandIcon size={size} />
      {showWordmark && (
        <div className="flex items-center gap-1.5">
          <span className={`font-display font-bold tracking-tight text-white leading-none ${textSizes}`}>
            Submit<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 font-extrabold">Kit</span>
          </span>
          {badge && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400">
              {badge}
            </span>
          )}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
}
