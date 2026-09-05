'use client';

import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Sparkles, CheckCircle2 } from 'lucide-react';

interface DemoBannerProps {
  title: string;
  slug: string;
  price?: number;
}

export function DemoBanner({ title, slug, price = 299 }: DemoBannerProps) {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 9999,
      width: '100%',
      backgroundColor: '#09090b',
      borderBottom: '1px solid rgba(16, 185, 129, 0.3)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '12px',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Left: Brand & Back link */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <Link
          href="/projects"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#e4e4e7',
            fontSize: '12px',
            fontWeight: 700,
            textDecoration: 'none'
          }}
        >
          <ArrowLeft size={14} />
          <span>Catalog</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>
            {title}
          </span>
          <span style={{
            fontSize: '10px',
            fontWeight: 800,
            padding: '2px 8px',
            borderRadius: '999px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            color: '#34d399',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            ⚡ Live Interactive Demo
          </span>
        </div>
      </div>

      {/* Middle: Deliverables pill */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: '#a1a1aa' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CheckCircle2 size={13} color="#34d399" /> 100% Tested Source Code
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CheckCircle2 size={13} color="#34d399" /> 60-Pg Black Book (.docx)
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <CheckCircle2 size={13} color="#34d399" /> Viva PPT (.pptx)
        </span>
      </div>

      {/* Right: Buy Kit button */}
      <Link
        href={`/projects/${slug}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 18px',
          borderRadius: '999px',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: '#ffffff',
          fontSize: '12px',
          fontWeight: 800,
          textDecoration: 'none',
          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)'
        }}
      >
        <ShoppingBag size={14} />
        <span>Get Complete Kit (₹{price})</span>
      </Link>
    </div>
  );
}
