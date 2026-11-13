'use client';
import { CheckCircle2, X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ComparisonRow {
  feature: string;
  submitkit: boolean | string;
  localShop: boolean | string;
  college: boolean | string;
}

const COMPARISON_DATA: ComparisonRow[] = [
  { feature: '1-Click Launcher (run.bat/sh)', submitkit: true, localShop: false, college: false },
  { feature: 'IEEE Black Book Report', submitkit: '60-75 pages', localShop: '20-30 pages', college: 'No help' },
  { feature: 'Viva Defense PPT', submitkit: '15-20 slides + notes', localShop: '8-10 slides', college: 'Self prep' },
  { feature: 'Top 25 Viva Q&A', submitkit: true, localShop: '10 questions', college: false },
  { feature: 'Code Works First Try', submitkit: true, localShop: '60% success', college: '30% success' },
  { feature: 'WhatsApp Support', submitkit: 'Lifetime', localShop: '7 days', college: false },
  { feature: 'Customization Service', submitkit: '₹99-199', localShop: '₹500-1000', college: 'Not available' },
  { feature: 'Delivery Time', submitkit: 'Instant', localShop: '2-3 days', college: '1-2 weeks' },
  { feature: 'Price (Major Project)', submitkit: '₹499', localShop: '₹3,500-4,000', college: '₹2,000-3,000' }
];

export function FeatureComparisonTable() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div
        role="table"
        aria-label="Feature comparison between SubmitKit, Local Shops, and College Projects"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        {COMPARISON_DATA.map((row, idx) => (
          <div
            key={idx}
            role="row"
            style={{
              borderRadius: '12px',
              border: '1px solid var(--line)',
              background: 'var(--surface)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '.75rem'
            }}
          >
            <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '.9375rem', paddingBottom: '.5rem', borderBottom: '1px solid var(--line)' }}>
              {row.feature}
            </div>
            <MobileRow label="SubmitKit" value={row.submitkit} highlight />
            <MobileRow label="Local Shops" value={row.localShop} />
            <MobileRow label="College Projects" value={row.college} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      role="table"
      aria-label="Feature comparison between SubmitKit, Local Shops, and College Projects"
      style={{ overflow: 'hidden', borderRadius: '16px', border: '1px solid var(--line)', background: 'var(--surface)' }}
    >
      {/* Header */}
      <div
        role="row"
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '1rem',
          padding: '1.25rem 1.5rem',
          background: 'linear-gradient(135deg, var(--teal-50) 0%, var(--violet-50) 100%)',
          borderBottom: '1px solid var(--line)',
          fontSize: '.875rem',
          fontWeight: 700,
          color: 'var(--navy)',
          textAlign: 'center'
        }}
      >
        <div role="columnheader" style={{ textAlign: 'left' }}>What You Get</div>
        <div role="columnheader" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.25rem' }}>
          <Sparkles style={{ width: '1rem', height: '1rem', color: 'var(--teal)' }} aria-hidden="true" />
          <span>SubmitKit</span>
        </div>
        <div role="columnheader">Local Shops</div>
        <div role="columnheader">College Projects</div>
      </div>

      {/* Rows */}
      {COMPARISON_DATA.map((row, idx) => (
        <div
          key={idx}
          role="row"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '1rem',
            padding: '1rem 1.5rem',
            borderBottom: idx < COMPARISON_DATA.length - 1 ? '1px solid var(--line)' : 'none',
            fontSize: '.875rem',
            alignItems: 'center',
            background: idx % 2 === 0 ? 'var(--surface)' : 'var(--surface-2)'
          }}
        >
          <div role="cell" style={{ fontWeight: 600, color: 'var(--ink-2)' }}>
            {row.feature}
          </div>
          <Cell value={row.submitkit} highlight />
          <Cell value={row.localShop} />
          <Cell value={row.college} />
        </div>
      ))}
    </div>
  );
}

function Cell({ value, highlight }: { value: boolean | string; highlight?: boolean }) {
  const isBoolean = typeof value === 'boolean';

  return (
    <div
      role="cell"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: highlight ? 'var(--teal)' : 'var(--ink-3)',
        fontWeight: highlight ? 700 : 500
      }}
    >
      {isBoolean ? (
        value ? (
          <>
            <CheckCircle2
              style={{
                width: '1.25rem',
                height: '1.25rem',
                color: highlight ? 'var(--teal)' : '#10B981'
              }}
              aria-hidden="true"
            />
            <span className="sr-only">Yes</span>
          </>
        ) : (
          <>
            <X
              style={{
                width: '1.25rem',
                height: '1.25rem',
                color: '#94A3B8'
              }}
              aria-hidden="true"
            />
            <span className="sr-only">No</span>
          </>
        )
      ) : (
        <span style={{ fontSize: '.8125rem', textAlign: 'center' }}>{value}</span>
      )}
    </div>
  );
}

function MobileRow({ label, value, highlight }: { label: string; value: boolean | string; highlight?: boolean }) {
  const isBoolean = typeof value === 'boolean';

  return (
    <div
      role="cell"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '.5rem 0'
      }}
    >
      <span style={{ fontSize: '.875rem', fontWeight: 600, color: 'var(--ink-3)' }}>
        {label}:
      </span>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '.5rem',
          color: highlight ? 'var(--teal)' : 'var(--ink-2)',
          fontWeight: highlight ? 700 : 600
        }}
      >
        {isBoolean ? (
          value ? (
            <>
              <CheckCircle2
                style={{
                  width: '1.125rem',
                  height: '1.125rem',
                  color: highlight ? 'var(--teal)' : '#10B981'
                }}
                aria-hidden="true"
              />
              <span className="sr-only">Yes</span>
            </>
          ) : (
            <>
              <X
                style={{
                  width: '1.125rem',
                  height: '1.125rem',
                  color: '#94A3B8'
                }}
                aria-hidden="true"
              />
              <span className="sr-only">No</span>
            </>
          )
        ) : (
          <span style={{ fontSize: '.875rem' }}>{value}</span>
        )}
      </div>
    </div>
  );
}
