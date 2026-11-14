'use client';
import { useState } from 'react';
import { Project } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { TechBadge } from './tech-badge';
import { ArrowRight, Flame, CheckCircle2, Clock, Lock, Bell, Zap, FileText, Terminal, LayoutGrid, GitBranch, Copy, Check, Eye } from 'lucide-react';
import { isProjectAvailable, getProjectMeta } from '@/lib/available-projects';

const TRENDING = ['spam-classifier-nlp', 'face-attendance-system', 'crypto-portfolio-tracker', 'face-recognition-attendance', 'intrusion-detection-system'];
type Tab = 'overview' | 'deliverables' | 'run';

const DELIVS = (isMajor: boolean) => [
  { l: 'Source Code (.zip)', ok: true },
  { l: isMajor ? '60-Page IEEE Black Book (.docx)' : '30-Page IEEE Black Book (.docx)', ok: true },
  { l: 'Viva Defense PPT (.pptx)', ok: true },
  { l: isMajor ? 'Top 25 Viva Q&A' : 'Top 15 Viva Q&A', ok: true },
  { l: 'Architecture Diagram', ok: true },
  { l: '1-Click run.bat + run.sh launcher', ok: true },
];

function CopyBtn({ value }: { value: string }) {
  const [c, setC] = useState(false);
  return (
    <button onClick={e => { e.preventDefault(); e.stopPropagation(); navigator.clipboard.writeText(value); setC(true); setTimeout(() => setC(false), 2000); }}
      style={{ background: c ? '#FDF6F2' : '#FFFFFF', color: c ? '#E55729' : '#64748B', border: c ? '1px solid #F3CFBF' : '1px solid #EFE6DC', cursor: 'pointer', padding: '.3125rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '1.875rem', height: '1.875rem', transition: 'all 150ms ease' }}
      aria-label="Copy"
    >
      {c ? <Check style={{ width: '.75rem', height: '.75rem' }} /> : <Copy style={{ width: '.75rem', height: '.75rem' }} />}
    </button>
  );
}

export function ProjectCard({ project, onReserve }: { project: Project; onReserve?: (name: string) => void }) {
  const [tab, setTab] = useState<Tab>('overview');
  const isMajor = project.tier === 'MAJOR';
  const trending = TRENDING.includes(project.slug);
  const available = isProjectAvailable(project.slug);
  const meta = getProjectMeta(project.slug);
  const runCmd = project.tech_stack?.includes('Docker') ? 'docker-compose up' : project.tech_stack?.includes('Python') ? 'python app.py' : 'npm run dev';

  const TABS: { id: Tab; label: string; Icon: React.ComponentType<any> }[] = [
    { id: 'overview', label: 'Overview', Icon: LayoutGrid },
    { id: 'deliverables', label: 'Deliverables', Icon: FileText },
    { id: 'run', label: 'Run', Icon: Terminal },
  ];

  return (
    <div
      className="card card-lift aslide group"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        borderRadius: '20px',
        background: '#FFFFFF',
        border: '1px solid #EFE6DC',
        boxShadow: '0 2px 8px rgba(24, 24, 27, 0.04)',
        willChange: 'transform',
        transition: 'transform 220ms cubic-bezier(.16, 1, .3, 1), box-shadow 220ms ease, border-color 220ms ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = '#F3CFBF';
        e.currentTarget.style.transform = 'translateY(-4px) scale(1.008)';
        e.currentTarget.style.boxShadow = '0 16px 36px -8px rgba(24, 24, 27, 0.1), 0 0 0 1px rgba(229, 87, 41, 0.15)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = '#EFE6DC';
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(24, 24, 27, 0.04)';
      }}
    >
      {/* Matte Terracotta Accent Top Line */}
      <div
        style={{
          height: '3px',
          background: isMajor
            ? 'linear-gradient(90deg, #E55729 0%, #CB451A 100%)'
            : 'linear-gradient(90deg, #F06E42 0%, #E55729 100%)',
        }}
      />

      {/* Header */}
      <div style={{ padding: '1.25rem 1.25rem 0.875rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '1.125rem', right: '1.125rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '.3rem' }}>
          {available
            ? <span style={{ fontSize: '.625rem', fontWeight: 700, padding: '.15rem .5rem', borderRadius: '9999px', background: '#FDF6F2', color: '#E55729', border: '1px solid #F3CFBF', display: 'inline-flex', alignItems: 'center', gap: '.3rem' }}><span className="dot-live apulse" style={{ width: '5px', height: '5px', background: '#E55729' }} /> Ready to Ship</span>
            : <span style={{ fontSize: '.625rem', fontWeight: 700, padding: '.15rem .5rem', borderRadius: '9999px', background: '#FFFBEB', color: '#B45309', border: '1px solid #FDE68A', display: 'inline-flex', alignItems: 'center', gap: '.3rem' }}><Clock style={{ width: '.625rem', height: '.625rem' }} /> Pre-Book</span>
          }
          {trending && <span style={{ fontSize: '.625rem', fontWeight: 700, padding: '.15rem .5rem', borderRadius: '9999px', background: '#FFF1F2', color: '#E11D48', border: '1px solid #FECDD3', display: 'inline-flex', alignItems: 'center', gap: '.3rem' }}><Flame style={{ width: '.625rem', height: '.625rem' }} />Hot</span>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '.4rem', marginBottom: '.75rem', paddingRight: '6.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '.625rem', fontWeight: 800, padding: '.15rem .5rem', borderRadius: '9999px', background: '#FDF6F2', color: '#E55729', border: '1px solid #F3CFBF', textTransform: 'uppercase', letterSpacing: '.04em' }}>
            {isMajor ? 'Production System' : 'Software System'}
          </span>
          <span style={{ fontSize: '.5625rem', fontWeight: 800, padding: '.125rem .45rem', borderRadius: '9999px', background: '#FAF5EE', color: '#52525B', border: '1px solid #EFE6DC', textTransform: 'uppercase', letterSpacing: '.04em' }}>
            Resume Ready
          </span>
          <span style={{ fontSize: '.6875rem', fontWeight: 700, color: '#71717A', textTransform: 'uppercase', letterSpacing: '.05em' }}>{project.category}</span>
        </div>

        {/* Title */}
        <h3 className="font-display" style={{ fontSize: '1.0625rem', fontWeight: 800, color: '#18181B', lineHeight: 1.35, letterSpacing: '-.025em', marginBottom: '.5rem', paddingRight: '6rem', transition: 'color 150ms' }}>
          {project.title}
        </h3>

        <p style={{ fontSize: '.84375rem', color: '#52525B', lineHeight: 1.6 }} className="line-clamp-2">
          {meta?.oneLiner || project.description}
        </p>
      </div>

      {/* Tab bar — Clean segmented selector */}
      <div style={{ display: 'flex', padding: '.25rem', borderTop: '1px solid #EFE6DC', borderBottom: '1px solid #EFE6DC', background: '#FAF5EE', gap: '.25rem' }}>
        {TABS.map(({ id, label, Icon }) => (
          <button key={id} onClick={e => { e.preventDefault(); e.stopPropagation(); setTab(id); }}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '.35rem',
              padding: '.45rem .25rem',
              fontSize: '.75rem',
              fontWeight: tab === id ? 700 : 500,
              color: tab === id ? '#E55729' : '#71717A',
              background: tab === id ? '#FFFFFF' : 'transparent',
              border: tab === id ? '1px solid #EFE6DC' : '1px solid transparent',
              borderRadius: '9999px',
              cursor: 'pointer',
              boxShadow: tab === id ? '0 1px 4px rgba(24,24,27,0.06)' : 'none',
              transition: 'all 150ms ease',
              minHeight: '34px',
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            <Icon style={{ width: '.8125rem', height: '.8125rem' }} />
            <span style={{ fontSize: '.75rem', fontWeight: tab === id ? 700 : 500 }}>{label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="atab flex-1" style={{ padding: '1rem 1.25rem', minHeight: '8.5rem' }}>
        {tab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
            {meta && (
              <div style={{ padding: '.75rem .875rem', borderRadius: '12px', background: '#FDF6F2', border: '1px solid #F3CFBF', fontSize: '.8125rem', color: '#18181B', lineHeight: 1.6 }}>
                <div style={{ fontSize: '.625rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: '#E55729', marginBottom: '.25rem' }}>Plain English</div>
                {meta.tenthGradeExplainer}
              </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.375rem' }}>
              {project.tech_stack.slice(0, 4).map(t => <TechBadge key={t} tech={t} />)}
              {project.tech_stack.length > 4 && <span style={{ fontSize: '.6875rem', color: '#71717A', alignSelf: 'center' }}>+{project.tech_stack.length - 4}</span>}
            </div>
          </div>
        )}

        {tab === 'deliverables' && (
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '.5rem', margin: 0, padding: 0, listStyle: 'none' }}>
            {DELIVS(isMajor).map(({ l, ok }) => (
              <li key={l} style={{ display: 'flex', alignItems: 'center', gap: '.75rem', fontSize: '.8125rem', color: ok ? '#27272A' : '#A1A1AA' }}>
                <CheckCircle2 style={{ width: '.875rem', height: '.875rem', color: ok ? '#E55729' : '#D4D4D8', flexShrink: 0 }} />
                {l}
              </li>
            ))}
          </ul>
        )}

        {tab === 'run' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#18181B', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.4rem .75rem', background: '#27272A', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.625rem', color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>Start project</span>
                <CopyBtn value={runCmd} />
              </div>
              <div style={{ padding: '.65rem .75rem', fontFamily: 'var(--font-mono)', fontSize: '.8125rem', color: '#FFFFFF' }}>
                <span style={{ color: '#E55729', fontWeight: 700 }}>$ </span>{runCmd}
              </div>
            </div>
            <div style={{ padding: '.6rem .85rem', borderRadius: '10px', background: '#FDF6F2', border: '1px solid #F3CFBF', fontSize: '.8125rem', color: '#E55729', fontWeight: 650, display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <Zap style={{ width: '.875rem', height: '.875rem' }} />
              Windows: double-click <code style={{ fontFamily: 'var(--font-mono)', background: '#FAECE5', padding: '.125rem .375rem', borderRadius: '4px' }}>run.bat</code>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid #EFE6DC' }}>
        {available ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.5rem', flexWrap: 'wrap' }}>
            <div>
              <span className="font-display" style={{ fontSize: '1.25rem', fontWeight: 900, color: '#18181B', letterSpacing: '-.03em' }}>{formatCurrency(project.price_inr)}</span>
              <span style={{ fontSize: '.6875rem', color: '#71717A', marginLeft: '.35rem', display: 'block' }}>instant download</span>
            </div>

            {/* Split Action Buttons: View Kit + Demo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '.35rem' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.25rem',
                  padding: '.45rem .8rem',
                  borderRadius: '9999px',
                  background: '#18181B',
                  color: '#FFFFFF',
                  fontSize: '.8125rem',
                  fontWeight: 650,
                  cursor: 'pointer',
                  boxShadow: '0 2px 6px rgba(24, 24, 27, 0.2)',
                  transition: 'all 200ms cubic-bezier(.16, 1, .3, 1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#27272A';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#18181B';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <span>View Kit</span>
                <ArrowRight style={{ width: '.8125rem', height: '.8125rem' }} />
              </div>

              <button
                type="button"
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = `/projects/${project.slug}#demo`;
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.3rem',
                  padding: '.45rem .75rem',
                  borderRadius: '9999px',
                  background: '#FDF6F2',
                  color: '#E55729',
                  border: '1px solid #F3CFBF',
                  fontSize: '.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 200ms cubic-bezier(.16, 1, .3, 1)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#FAEDE5';
                  e.currentTarget.style.borderColor = '#E55729';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#FDF6F2';
                  e.currentTarget.style.borderColor = '#F3CFBF';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                <Eye style={{ width: '.8125rem', height: '.8125rem' }} />
                <span>Demo</span>
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#B45309', letterSpacing: '-.03em' }}>
                {formatCurrency(isMajor ? 499 : 299)}
              </span>
              <span style={{ fontSize: '.6875rem', color: '#B45309', marginLeft: '.25rem', fontWeight: 600 }}>pre-book</span>
            </div>
            <div
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.375rem', padding: '.45rem 1rem', borderRadius: '9999px', background: '#FFFBEB', color: '#B45309', border: '1px solid #FDE68A', fontWeight: 700, fontSize: '.8125rem', cursor: 'pointer' }}
            >
              <Bell style={{ width: '.8125rem', height: '.8125rem' }} />
              Pre-Book
              <ArrowRight style={{ width: '.8125rem', height: '.8125rem' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
