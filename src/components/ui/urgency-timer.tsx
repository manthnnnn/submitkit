'use client';
import { useState, useEffect } from 'react';
import { Clock, Zap } from 'lucide-react';

export function UrgencyTimer() {
  const [time, setTime] = useState<{ m: number; s: number } | null>(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const KEY = 'sk_offer_exp';
    let exp = parseInt(sessionStorage.getItem(KEY) || '0');
    if (!exp || exp < Date.now()) {
      exp = Date.now() + 15 * 60 * 1000;
      sessionStorage.setItem(KEY, exp.toString());
    }
    const tick = () => {
      const r = exp - Date.now();
      if (r <= 0) { setExpired(true); return; }
      setTime({ m: Math.floor((r / 1000 / 60) % 60), s: Math.floor((r / 1000) % 60) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (time === null && !expired) {
    return <div style={{ height: '3.25rem', borderRadius: '12px', background: 'var(--amber-50)', border: '1px solid var(--amber-100)' }} />;
  }

  if (expired) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem', padding: '.875rem 1rem', borderRadius: '12px', background: 'var(--teal-50)', border: '1px solid var(--teal-100)' }}>
        <Zap style={{ width: '1rem', height: '1rem', color: 'var(--teal)' }} />
        <p style={{ fontSize: '.9rem', color: 'var(--teal-dark)', fontWeight: 600, margin: 0 }}>Special pricing active — limited availability</p>
      </div>
    );
  }

  const fmt = (n: number) => String(n).padStart(2, '0');

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.75rem', padding: '.875rem 1rem', borderRadius: '12px', background: 'var(--amber-50)', border: '1.5px solid var(--amber-100)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
        <Clock style={{ width: '1rem', height: '1rem', color: 'var(--amber)' }} />
        <p style={{ fontSize: '.9rem', color: '#92400E', fontWeight: 600, margin: 0 }}>Offer ends in</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '.375rem' }} aria-live="polite">
        {[fmt(time!.m), fmt(time!.s)].map((v, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '.25rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: '2.375rem', padding: '.25rem .5rem', borderRadius: '8px', background: 'var(--amber)', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '1rem', fontWeight: 800 }}>
              {v}
            </span>
            {i === 0 && <span style={{ color: 'var(--amber)', fontWeight: 800, fontSize: '1.125rem' }}>:</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
