'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { Terminal, CheckCircle2, ChevronRight, ChevronLeft, Flame, Sparkles } from 'lucide-react';

export function CompareSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    // Guard: touches[0] may be undefined if all fingers lifted simultaneously
    const touch = e.touches[0];
    if (!touch) return;
    handleMove(touch.clientX);
  };

  // Keyboard support: left/right arrows move slider by 5%
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft')  setSliderPosition(p => Math.max(0,   p - 5));
    if (e.key === 'ArrowRight') setSliderPosition(p => Math.min(100, p + 5));
  };

  useEffect(() => {
    const stop = () => setIsDragging(false);
    window.addEventListener('mouseup',  stop);
    window.addEventListener('touchend', stop);
    return () => {
      window.removeEventListener('mouseup',  stop);
      window.removeEventListener('touchend', stop);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-2">
      <div
        ref={containerRef}
        role="slider"
        aria-label="Compare unverified codebases vs SubmitKit accredited bundle"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        className="relative w-full max-w-3xl aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 bg-[#0c0c0f]"
        style={{ transform: 'translateZ(0)' }}
        onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
        onTouchStart={(e) => { setIsDragging(true); const t = e.touches[0]; if (t) handleMove(t.clientX); }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onKeyDown={handleKeyDown}
      >
        {/* RIGHT: SubmitKit Accredited Standard */}
        <div className="absolute inset-0 bg-[#09090c] flex flex-col justify-center p-8 border-l-2 border-emerald-500/50">
          <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-[11px] font-bold border border-emerald-500/25 tracking-wide">
            <Sparkles className="w-3 h-3" /> THE SUBMITKIT WAY
          </div>
          <div className="pl-[50%] md:pl-[40%] flex flex-col gap-4">
            {[
              { label: 'Double-Click run.bat → Runs Instantly', sub: 'Tested & running on localhost:3000 in 2 minutes' },
              { label: 'Complete 60-Page Black Book (.docx)',   sub: 'Print-ready with circuit diagrams & literature survey' },
              { label: 'Viva Defense PPT + Top 25 Q&A',          sub: 'All answers prepared so you ace your college evaluation' },
            ].map(({ label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-white font-medium text-xs sm:text-sm">{label}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LEFT: Unverified internet codebases */}
        <div
          className="absolute inset-0 bg-[#121217] flex flex-col p-6 border-r-2 border-rose-500/50"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
            transform: 'translateZ(0)'
          }}
          aria-hidden="true"
        >
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-rose-500/10 text-rose-400 px-3 py-1 rounded-full text-[11px] font-bold border border-rose-500/25 tracking-wide">
            <Flame className="w-3 h-3" /> COPYING RANDOM GITHUB REPOS
          </div>
          <div className="mt-12 font-mono text-xs text-rose-400/90 flex flex-col gap-2">
            <p className="text-zinc-400">C:\Users\Student\Project&gt; npm start</p>
            <p className="text-zinc-500">&gt; Starting development build...</p>
            <p className="text-rose-400">Error: Cannot find module &apos;react-scripts&apos;</p>
            <p className="text-rose-400">Error: Python syntax error (code written in 2018)</p>
            <p className="text-rose-400">Error: Database connection failed (no documentation)</p>
            <p className="text-amber-400">Failed to compile: 104 errors found.</p>
            <div className="mt-2">
              <span className="text-white bg-rose-700/90 font-mono px-2 py-1 rounded text-[11px] font-bold">
                VIVA IN 12 HOURS: Code won&apos;t run. No report ready.
              </span>
            </div>
          </div>
        </div>

        {/* Drag handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white/80 cursor-ew-resize shadow-[0_0_12px_rgba(255,255,255,0.4)] z-10 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%) translateZ(0)' }}
          aria-hidden="true"
        >
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-xl border-2 border-zinc-900 pointer-events-auto hover:scale-105 transition-transform">
            <ChevronLeft className="w-3.5 h-3.5 text-zinc-900 -mr-0.5" />
            <ChevronRight className="w-3.5 h-3.5 text-zinc-900 -ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
