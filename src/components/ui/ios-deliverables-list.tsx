'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, Code2, FileText, Presentation, BookOpen, Download } from 'lucide-react';

interface DeliverableItem {
  icon: any;
  title: string;
  subtitle: string;
  color: string;
  delay: number;
}

const DELIVERABLES: DeliverableItem[] = [
  {
    icon: Code2,
    title: 'Working Source Code',
    subtitle: '1-click launcher included',
    color: 'var(--teal)',
    delay: 0,
  },
  {
    icon: FileText,
    title: 'IEEE Black Book Report',
    subtitle: '60+ pages, print-ready',
    color: 'var(--violet)',
    delay: 100,
  },
  {
    icon: Presentation,
    title: 'Viva Defense PPT',
    subtitle: 'Speaker notes included',
    color: 'var(--amber)',
    delay: 200,
  },
  {
    icon: BookOpen,
    title: '25 Viva Q&A Answers',
    subtitle: 'Examiner-tested questions',
    color: 'var(--teal-dark)',
    delay: 300,
  },
  {
    icon: Download,
    title: 'Instant Delivery',
    subtitle: 'Download immediately',
    color: 'var(--teal)',
    delay: 400,
  },
];

export function IosDeliverablesList({ isMajor = true }: { isMajor?: boolean }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const deliverables = DELIVERABLES.map(item => {
    if (item.title === 'IEEE Black Book Report') {
      return {
        ...item,
        subtitle: isMajor ? '60+ pages, print-ready' : '30+ pages, print-ready',
      };
    }
    return item;
  });

  return (
    <div
      role="list"
      aria-label="Project deliverables"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '.75rem',
      }}
    >
      {deliverables.map((item, idx) => {
        const Icon = item.icon;
        const isHovered = hoveredIndex === idx;

        return (
          <div
            key={idx}
            role="listitem"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '.875rem',
              padding: '1rem 1.125rem',
              borderRadius: '14px',
              background: isHovered
                ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(13, 148, 136, 0.05) 100%)'
                : 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(10px)',
              border: `1px solid ${isHovered ? 'rgba(13, 148, 136, 0.3)' : 'rgba(226, 232, 240, 0.8)'}`,
              boxShadow: isHovered
                ? '0 8px 24px rgba(13, 148, 136, 0.12), 0 2px 8px rgba(15, 23, 42, 0.08)'
                : '0 2px 8px rgba(15, 23, 42, 0.04)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateX(0)' : 'translateX(-8px)',
              transition: `all 0.18s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 30}ms`,
              cursor: 'default',
            }}
          >
            {/* Icon */}
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: isHovered
                  ? `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`
                  : `color-mix(in srgb, ${item.color} 15%, white)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'scale(1.05) rotate(5deg)' : 'scale(1) rotate(0deg)',
                boxShadow: isHovered ? `0 4px 16px ${item.color}40` : 'none',
              }}
            >
              <Icon
                aria-hidden="true"
                style={{
                  width: '20px',
                  height: '20px',
                  color: isHovered ? 'white' : item.color,
                  transition: 'color 0.3s ease',
                }}
              />
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: '.9375rem',
                fontWeight: 700,
                color: 'var(--navy)',
                marginBottom: '.125rem',
                letterSpacing: '-.02em',
                transition: 'color 0.3s ease',
              }}>
                {item.title}
              </div>
              <div style={{
                fontSize: '.8125rem',
                color: 'var(--ink-3)',
                lineHeight: 1.4,
              }}>
                {item.subtitle}
              </div>
            </div>

            {/* Check Icon */}
            <CheckCircle2
              aria-hidden="true"
              style={{
                width: '20px',
                height: '20px',
                color: 'var(--teal)',
                flexShrink: 0,
                opacity: isHovered ? 1 : 0.6,
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
