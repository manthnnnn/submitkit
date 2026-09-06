'use client';
import { useState } from 'react';
import { Terminal, FolderOpen, Play, GraduationCap, CheckCircle2, Copy, Check } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: <FolderOpen className="w-5 h-5 text-blue-400" />,
    color: 'border-blue-500/40 bg-blue-500/10',
    iconBg: 'bg-blue-500/10',
    title: 'Extract the ZIP',
    desc: 'Right-click the downloaded file and select "Extract All" (Windows) or double-click (Mac). You\'ll find three folders inside:',
    items: ['📁 Code — the full project source', '📄 Report — your IEEE Black Book (.docx)', '📊 PPT — Defense slides with speaker notes'],
    code: null,
  },
  {
    num: '02',
    icon: <Terminal className="w-5 h-5 text-emerald-400" />,
    color: 'border-emerald-500/40 bg-emerald-500/10',
    iconBg: 'bg-emerald-500/10',
    title: 'Run the Project (Windows)',
    desc: 'Open the Code folder. Double-click the launcher — it installs dependencies and starts the server automatically:',
    items: null,
    code: { label: 'Windows (1-click)', value: 'run.bat', lang: 'bat' },
  },
  {
    num: '03',
    icon: <Terminal className="w-5 h-5 text-purple-400" />,
    color: 'border-purple-500/40 bg-purple-500/10',
    iconBg: 'bg-purple-500/10',
    title: 'Run the Project (Mac / Linux)',
    desc: 'Open Terminal in the Code folder and run:',
    items: null,
    code: { label: 'Mac / Linux', value: 'bash run.sh', lang: 'bash' },
  },
  {
    num: '04',
    icon: <Play className="w-5 h-5 text-amber-400" />,
    color: 'border-amber-500/40 bg-amber-500/10',
    iconBg: 'bg-amber-500/10',
    title: 'Open in Browser',
    desc: 'Once the terminal shows "Ready", open your browser and visit:',
    items: null,
    code: { label: 'Your browser', value: 'http://localhost:3000', lang: 'url' },
  },
  {
    num: '05',
    icon: <GraduationCap className="w-5 h-5 text-rose-400" />,
    color: 'border-rose-500/40 bg-rose-500/10',
    iconBg: 'bg-rose-500/10',
    title: 'Prepare for Viva',
    desc: 'Open the PPT slides and read the speaker notes — they tell you word-for-word what to say to your examiner. Print the IEEE Black Book and submit.',
    items: ['Print the Report (.docx) at a local print shop', 'Read speaker notes in the PPT before your defense', 'Use the 25 Viva Q&A list to prepare answers'],
    code: null,
  },
];

function CodeBlock({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mt-3 bg-zinc-950 rounded-xl border border-white/10 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/5">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">{label}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-white transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="px-4 py-3 font-mono text-sm text-emerald-400">{value}</div>
    </div>
  );
}

interface HowToRunProps {
  compact?: boolean; // for sidebar usage
}

export function HowToRun({ compact = false }: HowToRunProps) {
  const [open, setOpen] = useState<number | null>(0);

  if (compact) {
    // Simple numbered list for sidebar
    return (
      <div className="space-y-3">
        {STEPS.map((step, i) => (
          <div key={i} className="flex gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 ${step.iconBg} border ${step.color.split(' ')[0]}`}>
              {i + 1}
            </div>
            <div>
              <p className="text-zinc-300 text-xs font-semibold">{step.title}</p>
              {step.code && (
                <code className="text-[11px] font-mono text-emerald-400 bg-zinc-900 px-1.5 py-0.5 rounded mt-1 inline-block">{step.code.value}</code>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {STEPS.map((step, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen ? step.color + ' border-opacity-60' : 'border-white/8 bg-white/[0.02] hover:border-white/15'
            }`}
          >
            <button
              className="w-full flex items-center gap-4 p-4 text-left"
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${step.iconBg}`}>
                {step.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-zinc-600 font-mono">STEP {step.num}</span>
                </div>
                <p className="text-sm font-semibold text-white">{step.title}</p>
              </div>
              <CheckCircle2 className={`w-4 h-4 shrink-0 transition-colors ${isOpen ? 'text-emerald-400' : 'text-zinc-700'}`} />
            </button>

            {isOpen && (
              <div className="px-4 pb-5">
                <p className="text-zinc-400 text-sm leading-relaxed mb-2">{step.desc}</p>
                {step.items && (
                  <ul className="space-y-1.5 mt-2">
                    {step.items.map((item, j) => (
                      <li key={j} className="text-zinc-300 text-xs flex items-start gap-2">
                        <span className="shrink-0 mt-0.5">{item.split(' ')[0]}</span>
                        <span>{item.split(' ').slice(1).join(' ')}</span>
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
