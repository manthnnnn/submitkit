'use client';
import { useState } from 'react';
import { Project } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { TechBadge } from './tech-badge';
import { ArrowRight, Flame, CheckCircle2, Clock, Lock, Bell, Zap, FileText, Terminal, LayoutGrid, GitBranch, Copy, Check, Eye } from 'lucide-react';
import { isProjectAvailable, getProjectMeta } from '@/lib/available-projects';

const TRENDING = ['spam-classifier-nlp','face-attendance-system','crypto-portfolio-tracker','face-recognition-attendance','intrusion-detection-system'];
type Tab = 'overview' | 'deliverables' | 'run';

const DELIVS = (isMajor: boolean) => [
  { l: 'Source Code (.zip)',                         ok: true },
  { l: isMajor ? '60-Page IEEE Black Book (.docx)' : '30-Page IEEE Black Book (.docx)', ok: true },
  { l: 'Viva Defense PPT (.pptx)',                   ok: true },
  { l: isMajor ? 'Top 25 Viva Q&A' : 'Top 15 Viva Q&A', ok: true },
  { l: 'Architecture Diagram',                       ok: true },
  { l: '1-Click run.bat + run.sh launcher',          ok: true },
];

function CopyBtn({ value }: { value: string }) {
  const [c, setC] = useState(false);
  return (
    <button onClick={e => { e.preventDefault(); e.stopPropagation(); navigator.clipboard.writeText(value); setC(true); setTimeout(() => setC(false), 2000); }}
      style={{ background: c ? 'var(--teal-50)' : '#FFFFFF', color: c ? 'var(--teal)' : '#64748B', border: '1px solid #CBD5E1', cursor: 'pointer', padding: '.3125rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '1.875rem', height: '1.875rem' }}
      aria-label="Copy"
    >
      {c ? <Check style={{ width: '.75rem', height: '.75rem' }} /> : <Copy style={{ width: '.75rem', height: '.75rem' }} />}
    </button>
  );
}

export function ProjectCard({ project, onReserve }: { project: Project; onReserve?: (name: string) => void }) {
  const [tab, setTab] = useState<Tab>('overview');
  const isMajor       = project.tier === 'MAJOR';
  const trending      = TRENDING.includes(project.slug);
  const available     = isProjectAvailable(project.slug);
  const meta          = getProjectMeta(project.slug);
  const runCmd        = project.tech_stack?.includes('Docker') ? 'docker-compose up' : project.tech_stack?.includes('Python') ? 'python app.py' : 'npm run dev';

  const TABS: { id: Tab; label: string; Icon: React.ComponentType<any> }[] = [
    { id: 'overview',     label: 'Overview',     Icon: LayoutGrid },
    { id: 'deliverables', label: 'Deliverables', Icon: FileText   },
    { id: 'run',          label: 'Run',          Icon: Terminal   },
  ];

  return (
    <div className="card card-lift aslide" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: '18px', background: 'var(--surface)', willChange: 'transform' }}>
      {/* Tier bar */}
      <div style={{ height: '3px', background: isMajor ? 'linear-gradient(90deg,#0D9488,#14B8A6)' : 'linear-gradient(90deg,#14B8A6,#2DD4BF)' }} />

      {/* Header */}
      <div style={{ padding: '1.125rem 1.25rem .875rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '.3rem' }}>
          {available
            ? <span className="tag tag-teal" style={{ fontSize: '.6rem' }}><span className="dot-live apulse" style={{ width:'5px',height:'5px' }} /> Ready to Ship</span>
            : <span className="tag tag-amber" style={{ fontSize: '.6rem' }}><Clock style={{ width:'.625rem',height:'.625rem' }} /> Pre-Book</span>
          }
          {trending && <span className="tag tag-rose" style={{ fontSize: '.6rem' }}><Flame style={{ width:'.625rem',height:'.625rem' }} />Hot</span>}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.75rem', paddingRight: '6rem' }}>
          <span className={`tag ${isMajor ? 'tag-violet' : 'tag-teal'}`} style={{ fontSize: '.6rem' }}>{project.tier}</span>
          <span style={{ fontSize: '.6875rem', fontWeight: 600, color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{project.category}</span>
        </div>

        {/* Title */}
        <h3 className="font-display" style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--navy)', lineHeight: 1.35, letterSpacing: '-.025em', marginBottom: '.5rem', paddingRight: '6rem', transition: 'color 150ms' }}>
          {project.title}
        </h3>

        <p style={{ fontSize: '.875rem', color: 'var(--ink-3)', lineHeight: 1.65 }} className="line-clamp-2">
          {meta?.oneLiner || project.description}
        </p>
      </div>

      {/* Tab bar */}
      <div style={{ display: 'flex', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', background: 'var(--surface-2)' }}>
        {TABS.map(({ id, label, Icon }) => (
          <button key={id} onClick={e => { e.preventDefault(); e.stopPropagation(); setTab(id); }}
            style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '.3rem', padding: '.625rem .25rem', fontSize: '.6875rem', fontWeight: tab===id ? 700 : 500, color: tab===id ? 'var(--teal)' : 'var(--ink-3)', background: tab===id ? 'var(--surface)' : 'transparent', border: 'none', cursor: 'pointer', borderBottom: tab===id ? `2px solid var(--teal)` : '2px solid transparent', transition: 'all 150ms', minHeight: '40px', WebkitTapHighlightColor: 'transparent' }}
          >
            <Icon style={{ width: '.8125rem', height: '.8125rem' }} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="atab flex-1" style={{ padding: '1rem 1.25rem', minHeight: '9rem' }}>
        {tab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.875rem' }}>
            {meta && (
              <div style={{ padding: '.875rem', borderRadius: '12px', background: 'var(--surface-teal)', border: '1px solid var(--teal-100)', fontSize: '.8125rem', color: 'var(--navy)', lineHeight: 1.7 }}>
                <div style={{ fontSize: '.625rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--teal)', marginBottom: '.375rem' }}>Plain English</div>
                {meta.tenthGradeExplainer}
              </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.375rem' }}>
              {project.tech_stack.slice(0, 4).map(t => <TechBadge key={t} tech={t} />)}
              {project.tech_stack.length > 4 && <span style={{ fontSize: '.6875rem', color: 'var(--ink-4)', alignSelf: 'center' }}>+{project.tech_stack.length - 4}</span>}
            </div>
          </div>
        )}

        {tab === 'deliverables' && (
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
            {DELIVS(isMajor).map(({ l, ok }) => (
              <li key={l} style={{ display: 'flex', alignItems: 'center', gap: '.75rem', fontSize: '.875rem', color: ok ? 'var(--ink-2)' : 'var(--ink-4)' }}>
                <CheckCircle2 style={{ width: '.9375rem', height: '.9375rem', color: ok ? 'var(--teal)' : 'var(--line-2)', flexShrink: 0 }} />
                {l}
              </li>
            ))}
          </ul>
        )}

        {tab === 'run' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            <div style={{ borderRadius: '12px', overflow: 'hidden', background: 'var(--canvas-warm)', border: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.5rem .875rem', background: 'var(--surface-3)', borderBottom: '1px solid var(--line)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.625rem', color: 'var(--ink-4)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>Start project</span>
                <CopyBtn value={runCmd} />
              </div>
              <div style={{ padding: '.75rem .875rem', fontFamily: 'var(--font-mono)', fontSize: '.8125rem', color: 'var(--navy)' }}>
                <span style={{ color: '#10B981', fontWeight: 700 }}>$ </span>{runCmd}
              </div>
            </div>
            <div style={{ padding: '.75rem 1rem', borderRadius: '12px', background: 'var(--teal-50)', border: '1px solid var(--teal-100)', fontSize: '.875rem', color: 'var(--teal-dark)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <Zap style={{ width: '.9375rem', height: '.9375rem' }} />
              Windows: double-click <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--teal-100)', padding: '.125rem .375rem', borderRadius: '4px' }}>run.bat</code>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--line)' }}>
        {available ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span className="font-display" style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-.04em' }}>{formatCurrency(project.price_inr)}</span>
              <span style={{ fontSize: '.6875rem', color: 'var(--ink-4)', marginLeft: '.25rem' }}>instant download</span>
            </div>
            {/* Visual button — actual navigation handled by outer Link wrapper */}
            <div
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.375rem', padding: '.4375rem 1rem', borderRadius: '10px', background: 'var(--teal)', color: '#fff', fontWeight: 700, fontSize: '.875rem', boxShadow: '0 4px 14px rgba(13,148,136,.28)', cursor: 'pointer' }}
            >
              Buy &amp; Download
              <ArrowRight style={{ width: '.875rem', height: '.875rem' }} />
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <span className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#92400E', letterSpacing: '-.03em' }}>
                {formatCurrency(isMajor ? 499 : 299)}
              </span>
              <span style={{ fontSize: '.6875rem', color: 'var(--amber)', marginLeft: '.25rem', fontWeight: 600 }}>pre-book</span>
            </div>
            <div
              style={{ display: 'inline-flex', alignItems: 'center', gap: '.375rem', padding: '.4375rem .875rem', borderRadius: '10px', background: 'var(--amber-50)', color: 'var(--amber)', border: '1.5px solid var(--amber-100)', fontWeight: 700, fontSize: '.8125rem', cursor: 'pointer' }}
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
