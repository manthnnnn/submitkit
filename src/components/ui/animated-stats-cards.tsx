'use client';
import { useState, useEffect } from 'react';
import { FileText, Users, Code2, TrendingUp } from 'lucide-react';

interface StatItem {
  icon: any;
  value: number;
  suffix: string;
  label: string;
  color: string;
  delay: number;
}

const STATS: StatItem[] = [
  { icon: FileText, value: 60, suffix: '+', label: 'Pages', color: 'var(--violet)', delay: 0 },
  { icon: Code2, value: 5000, suffix: '+', label: 'Lines', color: 'var(--teal)', delay: 100 },
  { icon: Users, value: 500, suffix: '+', label: 'Students', color: 'var(--amber)', delay: 200 },
  { icon: TrendingUp, value: 95, suffix: '%', label: 'Success', color: 'var(--teal-dark)', delay: 300 },
];

export function AnimatedStatsCards({ pageCount = 60, lineCount = 5000, downloads = 500 }: { pageCount?: number; lineCount?: number; downloads?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0]);

  const stats = [
    { ...STATS[0], value: pageCount },
    { ...STATS[1], value: lineCount },
    { ...STATS[2], value: downloads },
    STATS[3],
  ];

  useEffect(() => {
    setIsVisible(true);

    // Animate each stat value
    stats.forEach((stat, idx) => {
      let start = 0;
      const duration = 600;
      const increment = stat.value / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= stat.value) {
          setAnimatedValues(prev => {
            const newValues = [...prev];
            newValues[idx] = stat.value;
            return newValues;
          });
          clearInterval(timer);
        } else {
          setAnimatedValues(prev => {
            const newValues = [...prev];
            newValues[idx] = Math.floor(start);
            return newValues;
          });
        }
      }, 16);
    });
  }, []);

  return (
    <div
      role="list"
      aria-label="Project statistics"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '.75rem',
        marginTop: '1.5rem',
      }}
    >
      {stats.map((stat, idx) => {
        const Icon = stat.icon;

        return (
          <div
            key={idx}
            role="listitem"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.25rem 1rem',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(226, 232, 240, 0.8)',
              boxShadow: '0 4px 16px rgba(15, 23, 42, 0.06)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.97)',
              transition: `all 0.18s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 30}ms`,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background gradient */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '150%',
                height: '150%',
                background: `radial-gradient(circle, ${stat.color}10 0%, transparent 70%)`,
                opacity: isVisible ? 1 : 0,
                transition: 'opacity 1s ease',
              }}
            />

            {/* Icon */}
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${stat.color}20 0%, ${stat.color}10 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '.75rem',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Icon
                aria-hidden="true"
                style={{
                  width: '20px',
                  height: '20px',
                  color: stat.color,
                }}
              />
            </div>

            {/* Value */}
            <div
              style={{
                fontSize: '1.75rem',
                fontWeight: 900,
                color: 'var(--navy)',
                letterSpacing: '-.04em',
                lineHeight: 1,
                marginBottom: '.375rem',
                fontVariantNumeric: 'tabular-nums',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {animatedValues[idx].toLocaleString()}{stat.suffix}
            </div>

            {/* Label */}
            <div
              style={{
                fontSize: '.8125rem',
                fontWeight: 600,
                color: 'var(--ink-3)',
                letterSpacing: '.01em',
                textAlign: 'center',
                position: 'relative',
                zIndex: 1,
              }}
            >
              {stat.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
