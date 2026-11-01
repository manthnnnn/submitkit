'use client';
import React, { useId } from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  href?: string | null;
  className?: string;
  showSub?: boolean;
  light?: boolean;
}

/**
 * SubmitKit Premier Brand Emblem
 *
 * Decent, Soft, Minimalist S-Monogram:
 * Soft dual-interlocking ribbons forming an S and a verified delivery kit fold.
 * Rendered inside a soft, warm cream-mint squircle with delicate border.
 */
export function BrandMark({
  size = 'md',
  className = '',
  animate = false,
  light = false,
  style,
}: {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
  animate?: boolean;
  light?: boolean;
  style?: React.CSSProperties;
}) {
  const uid = useId().replace(/:/g, 'x');
  const dim = { xs: 24, sm: 30, md: 36, lg: 44 }[size];

  return (
    <svg
      width={dim}
      height={dim}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${animate ? 'hover:scale-105 transition-transform duration-200' : ''} ${className}`.trim()}
      aria-hidden="true"
      style={{ flexShrink: 0, display: 'block', ...(style ?? {}) }}
    >
      <defs>
        {/* Soft squircle background */}
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          {light ? (
            <>
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="55%" stopColor="#FAF7F2" />
              <stop offset="100%" stopColor="#EEF8F5" />
            </>
          )}
        </linearGradient>

        {/* Soft delicate perimeter rim */}
        <linearGradient id={`${uid}-rim`} x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          {light ? (
            <>
              <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0D9488" stopOpacity="0.1" />
            </>
          ) : (
            <>
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="100%" stopColor="rgba(13,148,136,0.22)" />
            </>
          )}
        </linearGradient>

        {/* Upper S ribbon: Radiant Mint to Brand Teal */}
        <linearGradient id={`${uid}-upper`} x1="14" y1="10" x2="27" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={light ? "#5EEAD4" : "#2DD4BF"} />
          <stop offset="100%" stopColor="#0D9488" />
        </linearGradient>

        {/* Lower S ribbon: Brand Teal to Deep Forest Sage */}
        <linearGradient id={`${uid}-lower`} x1="13" y1="20" x2="26" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0D9488" />
          <stop offset="100%" stopColor={light ? "#0D9488" : "#0A7C72"} />
        </linearGradient>

        {/* Soft ambient drop shadow for the squircle */}
        <filter id={`${uid}-sh`} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor={light ? "rgba(0,0,0,0.3)" : "rgba(13,148,136,0.08)"} />
        </filter>
      </defs>

      {/* Soft Pebble/Squircle Base */}
      <rect
        width="40"
        height="40"
        rx="11"
        fill={`url(#${uid}-bg)`}
        stroke={`url(#${uid}-rim)`}
        strokeWidth="1.2"
        filter={`url(#${uid}-sh)`}
      />

      {/* Upper S ribbon (Forward / Submit momentum) */}
      <path
        d="M 14.5 17.5 C 14.5 13 17.2 10.5 21.5 10.5 C 25.5 10.5 27 13 27 15.5 C 27 18.2 24.5 19.5 20.8 20.2"
        stroke={`url(#${uid}-upper)`}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Lower S ribbon (Foundation / Kit container) */}
      <path
        d="M 25.5 22.5 C 25.5 27 22.8 29.5 18.5 29.5 C 14.5 29.5 13 27 13 24.5 C 13 21.8 15.5 20.5 19.2 19.8"
        stroke={`url(#${uid}-lower)`}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Subtle apex mint accent dot */}
      <circle cx="21.5" cy="10.5" r="1.3" fill={light ? "#5EEAD4" : "#2DD4BF"} />
    </svg>
  );
}

/**
 * BrandIcon: Clean typographic SK monogram badge for Certificates & Avatars
 */
export function BrandIcon({
  size = 'md',
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const dim = {
    sm: 'w-8 h-8 text-[11px] rounded-lg',
    md: 'w-9 h-9 text-xs rounded-xl',
    lg: 'w-12 h-12 text-sm rounded-xl',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center font-black font-sans bg-teal-50 border border-teal-200/80 text-teal-800 shadow-xs shrink-0 select-none ${dim} ${className}`}
      style={{ letterSpacing: '-0.02em' }}
    >
      SK
    </div>
  );
}

/**
 * SubmitKit Pure Typographic Wordmark Logo
 * Clean, executive, modern typography without distracting icon shapes.
 */
export function Logo({
  size = 'md',
  href = '/',
  className = '',
  showSub = false,
  light = false,
}: LogoProps) {
  const sz = {
    xs: { name: '1.0625rem', dot: '4px' },
    sm: { name: '1.25rem',   dot: '4.5px' },
    md: { name: '1.4375rem', dot: '5px' },
    lg: { name: '1.875rem',  dot: '6px' },
  }[size];

  const inner = (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'opacity 150ms ease, transform 150ms ease',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          fontSize: sz.name,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          lineHeight: 1,
          fontFamily: 'var(--font-sans)',
        }}
      >
        <span style={{ color: light ? '#FAF8F5' : '#0F172A', fontWeight: 800 }}>
          Submit
        </span>
        <span style={{ color: 'var(--teal)', fontWeight: 800 }}>
          Kit
        </span>
        <span
          style={{
            display: 'inline-block',
            width: sz.dot,
            height: sz.dot,
            borderRadius: '50%',
            background: 'var(--teal)',
            marginLeft: '2.5px',
            marginBottom: '2px',
            opacity: 0.9,
          }}
        />
      </div>
      {showSub && (
        <div
          style={{
            fontSize: '.625rem',
            fontWeight: 700,
            color: light ? '#8A8278' : 'var(--ink-4)',
            letterSpacing: '.09em',
            textTransform: 'uppercase',
            lineHeight: 1,
            marginTop: '.25rem',
          }}
        >
          Verified Project Vault
        </div>
      )}
    </div>
  );

  if (!href) return inner;
  return (
    <Link
      href={href}
      style={{
        textDecoration: 'none',
        display: 'inline-flex',
        alignItems: 'center',
      }}
    >
      {inner}
    </Link>
  );
}
