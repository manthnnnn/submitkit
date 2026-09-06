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
    <div className="w-full flex flex-col items-center pb-8 pt-4">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-display font-bold text-white mb-2">
          Which side do you want to be on at 3 AM?
        </h3>
        <p className="text-zinc-400 text-sm">Drag the slider — or use arrow keys.</p>
      </div>

      <div
        ref={containerRef}
        role="slider"
        aria-label="Compare doing it yourself vs SubmitKit"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        className="relative w-full max-w-3xl aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl cursor-ew-resize select-none border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        onMouseDown={(e) => { setIsDragging(true); handleMove(e.clientX); }}
        onTouchStart={(e) => { setIsDragging(true); const t = e.touches[0]; if (t) handleMove(t.clientX); }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onKeyDown={handleKeyDown}
      >
        {/* RIGHT: The SubmitKit Way — base layer */}
        <div className="absolute inset-0 bg-zinc-950 flex flex-col justify-center p-8 border-l-4 border-emerald-500">
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold border border-emerald-500/30">
            <Sparkles className="w-3 h-3" /> THE SUBMITKIT WAY
          </div>
          <div className="pl-[50%] md:pl-[40%] flex flex-col gap-4">
            {[
              { label: '1-Click Runner Executed',   sub: 'Server running on localhost:3000' },
              { label: '60-Page Black Book Ready',  sub: 'Formatted and ready to print' },
              { label: 'Sleeping Peacefully',        sub: 'Ready for tomorrow\'s Viva' },
            ].map(({ label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{label}</div>
                  <div className="text-xs text-zinc-400">{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LEFT: Doing it yourself — clipped overlay */}
        <div
          className="absolute inset-0 bg-zinc-900 flex flex-col p-6 border-r-4 border-red-500 shadow-[10px_0_20px_rgba(0,0,0,0.5)]"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          aria-hidden="true"
        >
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-500/30">
            <Flame className="w-3 h-3" /> DOING IT YOURSELF
          </div>
          <div className="mt-12 font-mono text-xs md:text-sm text-red-400 flex flex-col gap-2 opacity-80">
            <p>C:\Users\Student\Project&gt; npm start</p>
            <p className="text-zinc-500">Starting development server...</p>
            <p>Error: Cannot find module 'express'</p>
            <p>Error: Node-gyp rebuild failed</p>
            <p>Error: Database connection refused</p>
            <p>Failed to compile. 104 errors found.</p>
            <br />
            <p className="text-amber-500">Warning: 104 high severity vulnerabilities</p>
            <br />
            <p className="animate-pulse text-white bg-red-700 inline-block px-2 py-1 w-max">
              FATAL: Viva in 4 hours.
            </p>
          </div>
        </div>

        {/* Drag handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10 flex items-center justify-center"
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
          aria-hidden="true"
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-zinc-900 hover:scale-110 transition-transform">
            <ChevronLeft className="w-4 h-4 text-zinc-900 -mr-1" />
            <ChevronRight className="w-4 h-4 text-zinc-900 -ml-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
