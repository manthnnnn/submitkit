'use client';
import { useEffect, useState } from 'react';
import { Zap, Bell } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface Props { price: number; title: string; available?: boolean; }

export function StickyBuyBar({ price, title, available = true }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let last = false;
    const fn = () => {
      const v = window.scrollY > 380;
      if (v !== last) { last = v; setShow(v); }
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = () => document.getElementById('checkout-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <div className="md:hidden" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 45,
      transform: show ? 'translateY(0)' : 'translateY(100%)',
      opacity: show ? 1 : 0,
      transition: 'transform 380ms cubic-bezier(.16,1,.3,1), opacity 380ms ease',
    }}>
      <div style={{ background: 'rgba(252,252,249,.97)', backdropFilter: 'blur(20px)', borderTop: '1px solid var(--line)', padding: '.875rem 1.25rem calc(.875rem + env(safe-area-inset-bottom,0px))', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 -8px 32px rgba(60,40,10,.08)' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p className="font-display" style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--navy)', letterSpacing: '-.03em', lineHeight: 1 }}>{formatCurrency(price)}</p>
          <p style={{ fontSize: '.8125rem', color: 'var(--ink-3)', marginTop: '.25rem' }} className="truncate">{title}</p>
        </div>
        {available ? (
          <button onClick={go} className="btn btn-teal" style={{ padding: '0 1.5rem', minHeight: '48px', fontSize: '1rem', borderRadius: '12px', flexShrink: 0 }}>
            <Zap style={{ width: '1rem', height: '1rem', fill: 'white' }} />
            Buy Now
          </button>
        ) : (
          <button onClick={go} style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', padding: '0 1.5rem', minHeight: '48px', borderRadius: '12px', background: 'var(--amber-50)', color: 'var(--amber)', border: '1.5px solid var(--amber-100)', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', flexShrink: 0 }}>
            <Bell style={{ width: '1rem', height: '1rem' }} />
            Pre-order
          </button>
        )}
      </div>
    </div>
  );
}
