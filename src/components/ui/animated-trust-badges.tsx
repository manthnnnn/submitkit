'use client';
import { useState, useEffect } from 'react';
import { Shield, Zap, Clock, Award } from 'lucide-react';

interface FloatingBadge {
  icon: any;
  text: string;
  color: string;
  delay: number;
}

const BADGES: FloatingBadge[] = [
  { icon: Shield, text: 'Bug-Free Guarantee', color: 'var(--teal)', delay: 0 },
  { icon: Zap, text: '1-Click Run', color: 'var(--violet)', delay: 200 },
  { icon: Clock, text: 'Instant Download', color: 'var(--amber)', delay: 400 },
  { icon: Award, text: 'IEEE Certified', color: 'var(--teal-dark)', delay: 600 },
];

export function AnimatedTrustBadges() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      role="list"
      aria-label="Trust and quality badges"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '.75rem',
        marginTop: '1.25rem',
      }}
    >
      {BADGES.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <div
            key={idx}
            role="listitem"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.5rem',
              padding: '.625rem .875rem',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(6px)',
              transition: `all 0.18s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 30}ms`,
            }}
          >
            <Icon
              aria-hidden="true"
              style={{
                width: '1rem',
                height: '1rem',
                color: badge.color,
                flexShrink: 0,
              }}
            />
            <span style={{
              fontSize: '.8125rem',
              fontWeight: 600,
              color: 'var(--navy)',
              letterSpacing: '-.01em',
            }}>
              {badge.text}
            </span>
          </div>
        );
      })}
    </div>
  );
}
