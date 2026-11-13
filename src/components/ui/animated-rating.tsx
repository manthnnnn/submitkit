'use client';
import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface Props {
  rating: number;
  reviews: number;
  compact?: boolean;
}

export function AnimatedRating({ rating, reviews, compact = false }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedRating, setAnimatedRating] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    // Animate rating number
    let start = 0;
    const duration = 1000;
    const increment = rating / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= rating) {
        setAnimatedRating(rating);
        clearInterval(timer);
      } else {
        setAnimatedRating(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [rating]);

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  return (
    <div
      role="img"
      aria-label={`${rating} out of 5 stars based on ${reviews} reviews`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: compact ? '.5rem' : '.75rem',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(5px)',
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Stars */}
      <div
        aria-hidden="true"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '.25rem',
        }}
      >
        {[...Array(5)].map((_, idx) => {
          const isFilled = idx < fullStars;
          const isHalf = idx === fullStars && hasHalfStar;

          return (
            <div
              key={idx}
              style={{
                position: 'relative',
                width: compact ? '16px' : '18px',
                height: compact ? '16px' : '18px',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-180deg)',
                transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${idx * 100}ms`,
              }}
            >
              {/* Background star (gray) */}
              <Star
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  fill: 'rgba(203, 213, 225, 0.3)',
                  stroke: 'none',
                }}
              />

              {/* Filled star (gradient) */}
              {(isFilled || isHalf) && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: isHalf ? '50%' : '100%',
                    height: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <Star
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: compact ? '16px' : '18px',
                      height: compact ? '16px' : '18px',
                      fill: 'url(#star-gradient)',
                      stroke: 'none',
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Rating number */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '.375rem' }}>
        <span
          style={{
            fontSize: compact ? '.9375rem' : '1.125rem',
            fontWeight: 800,
            color: 'var(--navy)',
            letterSpacing: '-.02em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {animatedRating.toFixed(1)}
        </span>

        {!compact && (
          <span
            style={{
              fontSize: '.8125rem',
              color: 'var(--ink-3)',
              fontWeight: 500,
            }}
          >
            ({reviews.toLocaleString()}+ reviews)
          </span>
        )}
      </div>

      {/* SVG gradient definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="star-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#F59E0B', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#D97706', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
