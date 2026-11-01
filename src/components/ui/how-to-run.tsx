'use client';
import { useState } from 'react';
import { Terminal, FolderOpen, Play, GraduationCap, CheckCircle2, Copy, Check, Zap } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    title: 'Extract the ZIP',
    desc: 'Right-click → "Extract All" (Windows) or double-click (Mac). You\'ll see three folders:',
    items: ['Code — the full project source', 'Report — your IEEE Black Book (.docx)', 'PPT — Defense slides with speaker notes'],
    code: null,
  },
  {
    n: '02',
    title: 'Run on Windows',
    desc: 'Open the Code folder and double-click the launcher:',
    items: null,
    code: { label: 'Windows (1-click)', value: 'run.bat' },
  },
  {
    n: '03',
    title: 'Run on Mac / Linux',
    desc: 'Open Terminal in the Code folder and run:',
    items: null,
    code: { label: 'Mac / Linux', value: 'bash run.sh' },
  },
  {
    n: '04',
    title: 'Open in Browser',
    desc: 'When terminal shows "Ready", open:',
    items: null,
    code: { label: 'In your browser', value: 'http://localhost:3000' },
  },
  {
    n: '05',
    title: 'Prepare for Viva',
    desc: 'Read the PPT speaker notes — they tell you word-for-word what to say. Print the Black Book.',
    items: ['Print the Report at a local print shop', 'Read speaker notes in PPT before your defense', 'Use the Viva Q&A list to prepare answers'],
    code: null,
  },
];

function CodeBlock({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div style={{ marginTop: '.75rem', borderRadius: '10px', overflow: 'hidden', background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '.4375rem .875rem', background: '#F1F5F9', borderBottom: '1px solid #E2E8F0' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.625rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 700 }}>{label}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          style={{ display: 'flex', alignItems: 'center', gap: '.25rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '.75rem', color: copied ? '#059669' : '#64748B', fontWeight: 600, padding: '.1875rem .375rem' }}
        >
          {copied ? <Check style={{ width: '.75rem', height: '.75rem' }} /> : <Copy style={{ width: '.75rem', height: '.75rem' }} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div style={{ padding: '.625rem .875rem', fontFamily: 'var(--font-mono)', fontSize: '.875rem', color: '#0F172A', fontWeight: 600 }}>
        <span style={{ color: '#94A3B8' }}>$ </span>{value}
      </div>
    </div>
  );
}

export function HowToRun({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);

  if (compact) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
        {STEPS.map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: '.75rem', alignItems: 'flex-start' }}>
            <div style={{ width: '1.625rem', height: '1.625rem', borderRadius: '6px', flexShrink: 0, background: 'var(--surface-teal)', border: '1px solid var(--teal-100)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '.625rem', fontWeight: 800, color: 'var(--teal)', marginTop: '.125rem' }}>
              {step.n}
            </div>
            <div>
              <p style={{ fontSize: '.8125rem', fontWeight: 600, color: 'var(--navy)', lineHeight: 1.3 }}>{step.title}</p>
              {step.code && (
                <code style={{ fontSize: '.6875rem', fontFamily: 'var(--font-mono)', color: 'var(--teal-dark)', background: 'var(--teal-50)', border: '1px solid var(--teal-100)', padding: '.125rem .375rem', borderRadius: '4px', display: 'inline-block', marginTop: '.25rem' }}>
                  {step.code.value}
                </code>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
      {STEPS.map((step, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderRadius: '12px', border: `1px solid ${isOpen ? 'var(--teal-100)' : 'var(--line)'}`, background: isOpen ? 'var(--surface-teal)' : 'var(--surface)', overflow: 'hidden', transition: 'all 200ms' }}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '.875rem', padding: '.875rem 1rem', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', WebkitTapHighlightColor: 'transparent' }}
            >
              <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '10px', flexShrink: 0, background: isOpen ? 'var(--teal-100)' : 'var(--surface-2)', border: `1px solid ${isOpen ? 'var(--line-teal)' : 'var(--line)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: '.75rem', fontWeight: 800, color: isOpen ? 'var(--teal-dark)' : 'var(--ink-3)' }}>
                {step.n}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: '.9375rem', fontWeight: 600, color: 'var(--navy)', lineHeight: 1.3 }}>{step.title}</p>
              </div>
              <CheckCircle2 style={{ width: '1rem', height: '1rem', color: isOpen ? 'var(--teal)' : 'var(--line-2)', flexShrink: 0 }} />
            </button>

            {isOpen && (
              <div style={{ padding: '0 1rem .875rem 1rem' }}>
                <p style={{ fontSize: '.875rem', color: 'var(--ink-2)', lineHeight: 1.65, marginBottom: '.5rem' }}>{step.desc}</p>
                {step.items && (
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '.375rem' }}>
                    {step.items.map((item, j) => (
                      <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem', fontSize: '.8125rem', color: 'var(--ink-2)' }}>
                        <CheckCircle2 style={{ width: '.875rem', height: '.875rem', color: 'var(--teal)', flexShrink: 0, marginTop: '.125rem' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {step.code && <CodeBlock value={step.code.value} label={step.code.label} />}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
