'use client';

interface ScoreGaugeProps {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D';
  size?: number;
}

export default function ScoreGauge({ score, grade, size = 180 }: ScoreGaugeProps) {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  let strokeColor = 'var(--accent-emerald)';
  let glowColor = 'rgba(16, 185, 129, 0.4)';
  if (score < 55) {
    strokeColor = 'var(--accent-rose)';
    glowColor = 'rgba(244, 63, 94, 0.4)';
  } else if (score < 70) {
    strokeColor = 'var(--accent-amber)';
    glowColor = 'rgba(245, 158, 11, 0.4)';
  } else if (score < 85) {
    strokeColor = 'var(--primary)';
    glowColor = 'rgba(99, 102, 241, 0.4)';
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          style={{
            transition: 'stroke-dashoffset 1s ease-out',
            filter: `drop-shadow(0 0 10px ${glowColor})`,
          }}
        />
      </svg>

      {/* Center Text */}
      <div style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '2.4rem',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: strokeColor,
          fontFamily: 'var(--font-mono)',
        }}>
          {score}%
        </div>
        <div style={{
          marginTop: '6px',
          padding: '2px 10px',
          borderRadius: '999px',
          fontSize: '0.75rem',
          fontWeight: 700,
          background: 'rgba(255, 255, 255, 0.08)',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}>
          GRADE {grade}
        </div>
      </div>
    </div>
  );
}
