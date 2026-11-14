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
 * SubmitKit Brand Emblem — Matte Orange Aerodynamic Airplane Logo
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
  const dim = { xs: 26, sm: 32, md: 38, lg: 48 }[size];

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
        <linearGradient id={`${uid}-bg`} x1="2" y1="2" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EE6E44" />
          <stop offset="55%" stopColor="#E55729" />
          <stop offset="100%" stopColor="#CB451A" />
        </linearGradient>
        <filter id={`${uid}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="rgba(229, 87, 41, 0.28)" />
        </filter>
      </defs>

      {/* Aerodynamic Squircle Badge with Matte Orange Airplane Logo */}
      <g filter={`url(#${uid}-glow)`}>
        <rect x="2" y="2" width="36" height="36" rx="10" fill={`url(#${uid}-bg)`} />
        <rect x="2.5" y="2.5" width="35" height="35" rx="9.5" stroke="rgba(255,255,255,0.32)" strokeWidth="1" />

        {/* Supersonic Aerodynamic Airplane (Ivory & Faceted Wings) */}
        <path
          d="M30 10L26 28L19 23L30 10Z"
          fill="#FFFFFF"
          fillOpacity="0.98"
        />
        <path
          d="M30 10L19 23L11 21L30 10Z"
          fill="#FAF5EE"
          fillOpacity="0.82"
        />
        <path
          d="M30 10L19 23"
          stroke="#CB451A"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="13" cy="27" r="1.2" fill="#FFFFFF" fillOpacity="0.75" />
        <circle cx="9" cy="30" r="0.8" fill="#FFFFFF" fillOpacity="0.5" />
      </g>
    </svg>
  );
}

/**
 * BrandIcon: Typographic SK monogram badge for Certificates & Avatars
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
      className={`relative inline-flex items-center justify-center font-black font-sans bg-[#FFF5F2] border border-[#FFD4C8] text-[#EA4820] shadow-xs shrink-0 select-none ${dim} ${className}`}
      style={{ letterSpacing: '-0.02em' }}
    >
      SK
    </div>
  );
}

/**
 * SubmitKit Pure Brand Logo — Minimalist Typographic Wordmark
 * Displays pure, clean "SubmitKit.in" with zero icon clutter
 */
export function Logo({
  size = 'md',
  href = '/',
  className = '',
  showSub = false,
  light = false,
}: LogoProps) {
  const sz = {
    xs: { name: '1.0625rem', tld: '0.9375rem' },
    sm: { name: '1.2rem',    tld: '1.05rem' },
    md: { name: '1.375rem',  tld: '1.2rem' },
    lg: { name: '1.75rem',   tld: '1.5rem' },
  }[size];

  const inner = (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        flexShrink: 0,
        transition: 'transform 180ms cubic-bezier(.16, 1, .3, 1), opacity 150ms ease',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-1px)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'baseline',
            fontSize: sz.name,
            fontWeight: 850,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            fontFamily: 'var(--font-sans)',
          }}
        >
          <span style={{ color: light ? '#FAF8F5' : '#18181B', fontWeight: 850, letterSpacing: '-0.04em' }}>
            SubmitKit
          </span>
          <span
            style={{
              color: '#E55729',
              fontWeight: 800,
              fontSize: sz.tld,
              letterSpacing: '-0.02em',
              marginLeft: '1px',
              transition: 'color 150ms ease',
            }}
          >
            .in
          </span>
        </div>
        {showSub && (
          <div
            style={{
              fontSize: '.625rem',
              fontWeight: 700,
              color: light ? '#A1A1AA' : '#71717A',
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

/**
 * AirplaneLogo — Matte Orange Premium Aerospace / Launch Emblem
 * Clean geometric vector airplane designed for high-end international SaaS
 */
export function AirplaneLogo({
  size = 20,
  className = '',
  color = '#E55729',
  style,
}: {
  size?: number;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      <path
        d="M22 2L11 13"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 2L15 22L11 13L2 9L22 2Z"
        fill={color}
        fillOpacity="0.18"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SupersonicPlane({
  size = 22,
  className = '',
  style,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, ...style }}
      aria-hidden="true"
    >
      <path
        d="M21.5 2.5L10 14"
        stroke="#E55729"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.5 2.5L14.5 21.5L10 14L2.5 9.5L21.5 2.5Z"
        fill="#E55729"
        fillOpacity="0.18"
        stroke="#E55729"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
