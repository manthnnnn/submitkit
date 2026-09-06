'use client';
import { useEffect, useState } from 'react';

const COMPILE_LINES = [
  { delay: 0,    color: '#64748b', text: '> initializing submitkit runtime engine...' },
  { delay: 180,  color: '#38bdf8', text: '> fetching project metadata from database...' },
  { delay: 380,  color: '#64748b', text: '> resolving dependencies [source, report, ppt]...' },
  { delay: 560,  color: '#a78bfa', text: '> compiling project bundle descriptor...' },
  { delay: 740,  color: '#64748b', text: '> verifying bundle integrity [SHA-256]...' },
  { delay: 920,  color: '#34d399', text: '> ✓ bundle verified — rendering project page...' },
];

export function PageLoader() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    COMPILE_LINES.forEach((line, i) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, i]);
      }, line.delay);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">

        {/* Terminal window */}
        <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl shadow-black/60">

          {/* Title bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#111115] border-b border-white/8">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#f43f5e]" />
              <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
              <div className="w-3 h-3 rounded-full bg-[#10b981]" />
            </div>
            <span className="text-[11px] font-mono text-zinc-600 tracking-wider">submitkit-engine — bundle-loader</span>
            <div className="w-16" />
          </div>

          {/* Terminal body */}
          <div className="bg-[#0c0c10] px-5 py-5 font-mono text-sm min-h-[200px] space-y-2">
            {COMPILE_LINES.map((line, i) => (
              <div
                key={i}
                className="transition-all duration-300"
                style={{
                  opacity: visibleLines.includes(i) ? 1 : 0,
                  transform: visibleLines.includes(i) ? 'translateY(0)' : 'translateY(4px)',
                  color: line.color,
                }}
              >
                {line.text}
              </div>
            ))}

            {/* Blinking cursor */}
            <div className="flex items-center gap-1 mt-1">
              <span className="text-zinc-600">&gt;</span>
              <span
                className="inline-block w-2 h-4 bg-emerald-400 ml-1"
                style={{ animation: 'blink 1s step-end infinite' }}
              />
            </div>
          </div>

          {/* Progress bar */}
          <div className="bg-[#0c0c10] px-5 pb-5">
            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-600 mb-2">
              <span>LOADING PROJECT</span>
              <span className="text-emerald-400">
                {Math.round((visibleLines.length / COMPILE_LINES.length) * 100)}%
              </span>
            </div>
            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(visibleLines.length / COMPILE_LINES.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Brand */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-zinc-600 text-xs font-mono">submitkit.in</span>
        </div>
      </div>

      {/* Blink keyframe */}
      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
