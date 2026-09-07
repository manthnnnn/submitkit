'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { CheckCircle2, ChevronDown, GraduationCap, Printer, Trophy } from 'lucide-react';
import type { VivaSections } from './question-banks';

interface VivaClientProps {
  orderId: string;
  studentName: string;
  projectTitle: string;
  categoryLabel: string;
  categoryColor: string;
  purchaseDate: string;
  sections: VivaSections;
}

const TOTAL_QUESTIONS = 25;

export default function VivaClient(props: VivaClientProps) {
  const {
    orderId, studentName, projectTitle,
    categoryLabel, categoryColor, purchaseDate, sections,
  } = props;

  const storageKey = `viva_progress_${orderId}`;

  // Use lazy initialisers so no SSR/client mismatch
  const [reviewed, setReviewed] = useState<Set<string>>(() => new Set());
  const [openCards, setOpenCards] = useState<Set<string>>(() => new Set());
  const [openSections, setOpenSections] = useState<Set<number>>(
    () => new Set(sections.map((_, i) => i))
  );
  const [allDone, setAllDone] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Mark mounted so localStorage reads only happen client-side
  useEffect(() => { setMounted(true); }, []);

  // Load progress from localStorage (client only)
  useEffect(() => {
    if (!mounted) return;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const arr: string[] = JSON.parse(saved);
        setReviewed(new Set(arr));
        if (arr.length >= TOTAL_QUESTIONS) setAllDone(true);
      }
    } catch { /* ignore */ }
  }, [mounted, storageKey]);

  const toggleReviewed = useCallback((key: string) => {
    setReviewed(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      try { localStorage.setItem(storageKey, JSON.stringify([...next])); } catch { /* ignore */ }
      setAllDone(next.size >= TOTAL_QUESTIONS);
      return next;
    });
  }, [storageKey]);

  const toggleCard = useCallback((key: string) => {
    setOpenCards(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }, []);

  const toggleSection = useCallback((idx: number) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  }, []);

  const reviewedCount = reviewed.size;
  const progressPct = Math.round((reviewedCount / TOTAL_QUESTIONS) * 100);

  const isSectionDone = (sIdx: number) =>
    sections[sIdx].questions.every((_, qIdx) => reviewed.has(`${sIdx}-${qIdx}`));

  return (
    <div className="min-h-screen bg-[#09090b] text-slate-200 font-sans pb-32">

      {/* Sticky header */}
      <div className="sticky top-0 z-50 bg-[#09090b]/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="container mx-auto px-4 max-w-3xl py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center border shrink-0"
              style={{ background: `${categoryColor}20`, borderColor: `${categoryColor}40` }}
            >
              <GraduationCap className="w-4 h-4" style={{ color: categoryColor }} />
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-bold leading-tight truncate">Viva Q&amp;A Portal</p>
              <p className="text-zinc-500 text-[11px] truncate">{projectTitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold text-zinc-400 hidden sm:block">
              {reviewedCount}/{TOTAL_QUESTIONS}
            </span>
            <div className="w-24 h-2 rounded-full bg-zinc-800 overflow-hidden hidden sm:block">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progressPct}%`,
                  background: `linear-gradient(to right, ${categoryColor}, ${categoryColor}cc)`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="h-0.5 bg-zinc-900">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${progressPct}%`,
              background: `linear-gradient(to right, ${categoryColor}80, ${categoryColor})`,
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl pt-8">

        {/* Hero */}
        <div className="mb-8">
          <p className="text-sm font-medium mb-1" style={{ color: categoryColor }}>
            {categoryLabel}
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
            Hello, {studentName.split(' ')[0]}. Let&apos;s ace your viva.
          </h2>
          <p className="text-zinc-500 text-sm">{projectTitle} &nbsp;·&nbsp; Purchased on {purchaseDate}</p>

          <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-zinc-400">Your Progress</span>
                <span className="text-xs font-bold" style={{ color: reviewedCount > 0 ? categoryColor : '#52525b' }}>
                  {reviewedCount} / {TOTAL_QUESTIONS} reviewed
                </span>
              </div>
              <div className="h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${progressPct}%`,
                    background: `linear-gradient(to right, ${categoryColor}80, ${categoryColor})`,
                  }}
                />
              </div>
            </div>
            <div className="text-xl font-black" style={{ color: reviewedCount > 0 ? categoryColor : '#3f3f46' }}>
              {progressPct}%
            </div>
          </div>
        </div>

        {/* All-done celebration */}
        {allDone && (
          <div
            className="mb-8 p-5 rounded-2xl border text-center"
            style={{ background: `${categoryColor}10`, borderColor: `${categoryColor}40` }}
          >
            <Trophy className="w-10 h-10 mx-auto mb-3" style={{ color: categoryColor }} />
            <p className="text-lg font-black text-white mb-1">All 25 reviewed!</p>
            <p className="text-sm text-zinc-400">You are ready. Go ace that viva.</p>
          </div>
        )}

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, sIdx) => {
            const sectionOpen = openSections.has(sIdx);
            const sectionDone = isSectionDone(sIdx);
            const sectionReviewedCount = section.questions.filter((_, qIdx) =>
              reviewed.has(`${sIdx}-${qIdx}`)
            ).length;

            return (
              <div
                key={sIdx}
                className="rounded-2xl overflow-hidden border border-zinc-800/60 bg-zinc-900/30"
              >
                <button
                  onClick={() => toggleSection(sIdx)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-zinc-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                      style={{ background: `${section.color}20`, color: section.color }}
                    >
                      {sIdx + 1}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white">{section.title}</span>
                      <span className="ml-2 text-xs text-zinc-500">
                        {sectionReviewedCount}/{section.questions.length}
                      </span>
                    </div>
                    {sectionDone && (
                      <CheckCircle2 className="w-4 h-4" style={{ color: section.color }} />
                    )}
                  </div>
                  <ChevronDown
                    className="w-4 h-4 text-zinc-500 transition-transform shrink-0"
                    style={{ transform: sectionOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                {sectionOpen && (
                  <div className="px-3 pb-3 space-y-2">
                    {section.questions.map((item, qIdx) => {
                      const cardKey = `${sIdx}-${qIdx}`;
                      const isOpen = openCards.has(cardKey);
                      const isReviewed = reviewed.has(cardKey);
                      const globalIdx = sIdx * 5 + qIdx + 1;

                      return (
                        <div
                          key={qIdx}
                          className="rounded-xl border transition-all duration-200"
                          style={{
                            background: isReviewed ? `${section.color}08` : 'rgba(255,255,255,0.02)',
                            borderColor: isReviewed ? `${section.color}40` : 'rgba(255,255,255,0.06)',
                            borderLeftWidth: isReviewed ? '3px' : '1px',
                            borderLeftColor: isReviewed ? section.color : 'rgba(255,255,255,0.06)',
                          }}
                        >
                          <div className="flex items-start gap-3 p-4">
                            {/* Checkbox */}
                            <button
                              onClick={() => toggleReviewed(cardKey)}
                              className="shrink-0 mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all"
                              style={{
                                background: isReviewed ? section.color : 'transparent',
                                borderColor: isReviewed ? section.color : '#52525b',
                              }}
                              aria-label={isReviewed ? 'Unmark' : 'Mark reviewed'}
                            >
                              {isReviewed && (
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                  <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </button>

                            {/* Question */}
                            <button
                              onClick={() => toggleCard(cardKey)}
                              className="flex-1 text-left flex items-start gap-2"
                            >
                              <span
                                className="text-xs font-bold font-mono mt-0.5 shrink-0"
                                style={{ color: section.color }}
                              >
                                Q{globalIdx}.
                              </span>
                              <span
                                className={`text-sm leading-snug font-medium transition-colors ${isReviewed ? 'text-zinc-400' : 'text-white'}`}
                              >
                                {item.q}
                              </span>
                            </button>

                            <button onClick={() => toggleCard(cardKey)} className="shrink-0">
                              <ChevronDown
                                className="w-4 h-4 text-zinc-600 transition-transform"
                                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                              />
                            </button>
                          </div>

                          {isOpen && (
                            <div className="px-4 pb-4 pl-12">
                              <div
                                className="p-4 rounded-xl text-sm leading-relaxed"
                                style={{
                                  background: `${section.color}10`,
                                  borderLeft: `3px solid ${section.color}60`,
                                }}
                              >
                                <span className="font-bold mr-2" style={{ color: section.color }}>A:</span>
                                <span className="text-zinc-200">{item.a}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" /> All 25 Questions Unlocked
          </div>
          <p className="text-zinc-600 text-xs">Best of luck with your viva defense! You&apos;ve got this.</p>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-80 print:hidden"
            style={{
              background: `${categoryColor}15`,
              border: `1px solid ${categoryColor}40`,
              color: categoryColor,
            }}
          >
            <Printer className="w-4 h-4" />
            Print All Q&amp;As
          </button>
        </div>
      </div>

      <style>{`
        @media print {
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          @page { size: A4 portrait; margin: 20mm; }
          body { background: white !important; color: black !important; }
          .sticky { position: relative !important; }
        }
      `}</style>
    </div>
  );
}
