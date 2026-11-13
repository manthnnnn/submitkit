'use client';
import { useState, useEffect } from 'react';
import { Star, Download, ShieldCheck, Zap, TrendingUp, Users, Clock } from 'lucide-react';

interface EnhancedProjectHeroProps {
  title: string;
  description: string;
  category: string;
  tier: 'MINI' | 'MAJOR';
  available: boolean;
  rating?: number;
  downloads?: number;
}

export function EnhancedProjectHero({
  title,
  description,
  category,
  tier,
  available,
  rating = 4.9,
  downloads = 500
}: EnhancedProjectHeroProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMajor = tier === 'MAJOR';

  return (
    <div
      role="region"
      aria-label="Project overview and key information"
      className={`transition-all duration-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      style={{
        background: 'linear-gradient(135deg, rgba(20, 184, 166, 0.05) 0%, rgba(99, 102, 241, 0.05) 100%)',
        borderRadius: '20px',
        padding: 'clamp(1.125rem, 3.5vw, 2rem)',
        marginBottom: '2rem',
        border: '1px solid rgba(20, 184, 166, 0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated background gradient orbs */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite',
          pointerEvents: 'none'
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(50px)',
          animation: 'float 6s ease-in-out infinite reverse',
          pointerEvents: 'none'
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Trust indicators row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <div style={{ display: 'flex', gap: '2px' }} aria-label={`${rating} out of 5 stars`}>
              {[1, 2, 3, 4, 5].map(s => (
                <Star
                  key={s}
                  style={{
                    width: '14px',
                    height: '14px',
                    fill: '#F59E0B',
                    color: '#F59E0B'
                  }}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span style={{ fontSize: '.9375rem', fontWeight: 700, color: 'var(--navy)' }}>
              {rating}
            </span>
            <span style={{ fontSize: '.8125rem', color: 'var(--ink-3)', fontWeight: 500 }}>
              · {downloads}+ students
            </span>
          </div>

          <div
            role="status"
            aria-live="polite"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.5rem',
              padding: '.375rem .75rem',
              borderRadius: '9999px',
              background: available ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
              border: `1px solid ${available ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`
            }}
          >
            {available ? (
              <>
                <Zap style={{ width: '.875rem', height: '.875rem', color: '#10B981' }} aria-hidden="true" />
                <span style={{ fontSize: '.8125rem', fontWeight: 600, color: '#047857' }}>
                  Instant Download
                </span>
              </>
            ) : (
              <>
                <Clock style={{ width: '.875rem', height: '.875rem', color: '#F59E0B' }} aria-hidden="true" />
                <span style={{ fontSize: '.8125rem', fontWeight: 600, color: '#D97706' }}>
                  Pre-Book Open
                </span>
              </>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
            <ShieldCheck style={{ width: '.875rem', height: '.875rem', color: 'var(--teal)' }} aria-hidden="true" />
            <span style={{ fontSize: '.8125rem', color: 'var(--ink-3)', fontWeight: 500 }}>
              Bug-free guarantee
            </span>
          </div>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '1rem',
            marginTop: '1.5rem'
          }}
        >
          <StatCard
            icon={Download}
            label="Ready to Deploy"
            value="1-Click Setup"
            color="var(--teal)"
          />
          <StatCard
            icon={Users}
            label="Success Rate"
            value="100%"
            color="var(--violet)"
          />
          <StatCard
            icon={TrendingUp}
            label="Kit Size"
            value={isMajor ? "60+ Pages" : "30+ Pages"}
            color="var(--amber)"
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-20px, 20px) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color
}: {
  icon: React.ComponentType<any>;
  label: string;
  value: string;
  color: string;
}) {
  const getBackgroundColor = (color: string) => {
    if (color === 'var(--teal)') return 'rgba(13, 148, 136, 0.1)';
    if (color === 'var(--violet)') return 'rgba(15, 118, 110, 0.1)';
    if (color === 'var(--amber)') return 'rgba(180, 83, 9, 0.1)';
    return `color-mix(in srgb, ${color} 10%, white)`;
  };

  return (
    <div
      style={{
        padding: '1rem',
        borderRadius: '14px',
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(226, 232, 240, 0.6)',
        display: 'flex',
        alignItems: 'center',
        gap: '.75rem'
      }}
    >
      <div
        aria-hidden="true"
        style={{
          width: '2.5rem',
          height: '2.5rem',
          borderRadius: '10px',
          background: getBackgroundColor(color),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}
      >
        <Icon style={{ width: '1.125rem', height: '1.125rem', color }} />
      </div>
      <div>
        <p style={{ fontSize: '.6875rem', color: 'var(--ink-4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '.125rem' }}>
          {label}
        </p>
        <p style={{ fontSize: '.9375rem', fontWeight: 800, color: 'var(--navy)', letterSpacing: '-.02em' }}>
          {value}
        </p>
      </div>
    </div>
  );
}
