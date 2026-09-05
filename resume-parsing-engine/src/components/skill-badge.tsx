'use client';

interface SkillBadgeProps {
  label: string;
  category?: 'languages' | 'frameworks' | 'cloudDevOps' | 'databases' | 'tools' | 'softSkills';
  status?: 'matched' | 'missing' | 'neutral';
  showCategory?: boolean;
}

export default function SkillBadge({ label, category, status = 'neutral', showCategory = false }: SkillBadgeProps) {
  let bg = 'rgba(255, 255, 255, 0.05)';
  let border = 'rgba(255, 255, 255, 0.12)';
  let textColor = 'var(--text-secondary)';

  if (status === 'matched') {
    bg = 'rgba(16, 185, 129, 0.12)';
    border = 'rgba(16, 185, 129, 0.35)';
    textColor = '#34d399';
  } else if (status === 'missing') {
    bg = 'rgba(244, 63, 94, 0.12)';
    border = 'rgba(244, 63, 94, 0.35)';
    textColor = '#fb7185';
  } else if (category) {
    switch (category) {
      case 'languages':
        bg = 'rgba(6, 182, 212, 0.1)';
        border = 'rgba(6, 182, 212, 0.3)';
        textColor = '#38bdf8';
        break;
      case 'frameworks':
        bg = 'rgba(99, 102, 241, 0.12)';
        border = 'rgba(99, 102, 241, 0.35)';
        textColor = '#a5b4fc';
        break;
      case 'cloudDevOps':
        bg = 'rgba(245, 158, 11, 0.1)';
        border = 'rgba(245, 158, 11, 0.3)';
        textColor = '#fbbf24';
        break;
      case 'databases':
        bg = 'rgba(16, 185, 129, 0.1)';
        border = 'rgba(16, 185, 129, 0.3)';
        textColor = '#6ee7b7';
        break;
      case 'tools':
        bg = 'rgba(139, 92, 246, 0.1)';
        border = 'rgba(139, 92, 246, 0.3)';
        textColor = '#c084fc';
        break;
      case 'softSkills':
        bg = 'rgba(236, 72, 153, 0.1)';
        border = 'rgba(236, 72, 153, 0.3)';
        textColor = '#f472b6';
        break;
    }
  }

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 10px',
      borderRadius: '6px',
      fontSize: '0.78rem',
      fontWeight: 600,
      background: bg,
      border: `1px solid ${border}`,
      color: textColor,
      fontFamily: 'var(--font-mono)',
      whiteSpace: 'nowrap',
    }}>
      {status === 'matched' && <span style={{ color: 'var(--accent-emerald)' }}>✓</span>}
      {status === 'missing' && <span style={{ color: 'var(--accent-rose)' }}>✗</span>}
      {label}
      {showCategory && category && (
        <span style={{
          fontSize: '0.65rem',
          opacity: 0.6,
          textTransform: 'uppercase',
          marginLeft: '2px',
        }}>
          [{category}]
        </span>
      )}
    </span>
  );
}
