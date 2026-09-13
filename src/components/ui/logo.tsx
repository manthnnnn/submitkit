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
    sm: { box: 'w-8 h-8 p-1.5 rounded-xl' },
    md: { box: 'w-9 h-9 p-1.5 rounded-xl' },
    lg: { box: 'w-12 h-12 p-2 rounded-2xl' },
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
          <linearGradient id="folder-grad" x1="6" y1="10" x2="42" y2="42" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="arrow-grad" x1="16" y1="12" x2="42" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>

        {/* Folder Base Outline */}
        <path
          d="M6 14C6 11.7909 7.79086 10 10 10H18L24 16H38C40.2091 16 42 17.7909 42 20V24"
          stroke="url(#folder-grad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 14V38C6 40.2091 7.79086 42 10 42H30"
          stroke="url(#folder-grad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* The Launch Checkmark Arrow */}
        <path
          d="M16 28L24 36L42 12"
          stroke="url(#arrow-grad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M30 12H42V24"
          stroke="url(#arrow-grad)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
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
