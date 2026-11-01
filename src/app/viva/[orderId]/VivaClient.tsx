'use client';

import { useState, useEffect, useCallback } from 'react';
import { CheckCircle2, ChevronDown, GraduationCap, Printer, Trophy } from 'lucide-react';
import { getVivaSections, getCategoryLabel } from './question-banks';
import type { ProjectCategory } from '@/lib/types';

interface VivaClientProps {
  orderId:      string;
  studentName:  string;
  projectTitle: string;
  category:     ProjectCategory;
  purchaseDate: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  AIML:          '#818cf8',
  FullStack:     '#6366f1',
  Cybersecurity: '#f87171',
  Healthcare:    '#34d399',
  FinTech:       '#f59e0b',
  Cloud:         '#38bdf8',
};

const TOTAL_QUESTIONS = 25;

export default function VivaClient({
  orderId, studentName, projectTitle, category, purchaseDate,
}: VivaClientProps) {

  // Import question banks client-side — avoids passing 150KB across RSC boundary
  const sections      = getVivaSections(category);
  const categoryLabel = getCategoryLabel(category);
  const categoryColor = CATEGORY_COLORS[category] ?? '#818cf8';
  const storageKey    = `viva_progress_${orderId}`;

  const [reviewed,     setReviewed]     = useState<Set<string>>(() => new Set());
  const [openCards,    setOpenCards]    = useState<Set<string>>(() => new Set());
  const [openSections, setOpenSections] = useState<Set<number>>(
    () => new Set(sections.map((_, i) => i))
  );
  const [allDone,  setAllDone]  = useState(false);
  const [mounted,  setMounted]  = useState(false);

  useEffect(() => { setMounted(true); }, []);

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
      try { localStorage.setItem(storageKey, JSON.stringify([...next])); } catch { /**/ }
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
  const progressPct   = Math.round((reviewedCount / TOTAL_QUESTIONS) * 100);
  const isSectionDone = (sIdx: number) =>
    sections[sIdx]?.questions?.every((_, qIdx) => reviewed.has(`${sIdx}-${qIdx}`)) ?? false;

  const displayName = studentName?.trim() ? studentName.trim().split(/\s+/)[0] : 'Student';

  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--canvas)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem' }}>
        <div style={{ width: '2.5rem', height: '2.5rem', border: '3px solid var(--teal-100)', borderTopColor: 'var(--teal)', borderRadius: '50%', animation: 'spin .7s linear infinite' }} />
        <p style={{ fontSize: '.9rem', color: 'var(--ink-4)', fontWeight: 500 }}>Loading Viva Defense Portal…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--canvas)', color: 'var(--ink)', paddingBottom: '6rem' }}>

      {/* Sticky header */}
      <div style={{ position: 'sticky', top: '60px', zIndex: 40, background: 'rgba(255,255,255,.95)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--line)' }}>
        <div className="container mx-auto px-4 max-w-3xl py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center border shrink-0"
              style={{ background: `${categoryColor}20`, borderColor: `${categoryColor}40` }}>
              <GraduationCap className="w-4 h-4" style={{ color: categoryColor }} />
            </div>
            <div className="min-w-0">
            <p className="text-sm font-bold leading-tight truncate" style={{ color: 'var(--navy)' }}>Viva Q&amp;A Portal</p>
              <p className="text-xs truncate" style={{ color: 'var(--ink-4)' }}>{projectTitle || 'Your Project'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-bold hidden sm:block" style={{ color: 'var(--ink-4)' }}>
              {reviewedCount}/{TOTAL_QUESTIONS}
            </span>
            <div className="w-24 h-2 rounded-full overflow-hidden hidden sm:block" style={{ background: 'var(--line)' }}>
              <div className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%`, background: `linear-gradient(to right, ${categoryColor}, ${categoryColor}cc)` }} />
            </div>
          </div>
        </div>
        <div style={{ height: '2px', background: 'var(--line)' }}>
          <div className="h-full transition-all duration-500"
            style={{ width: `${progressPct}%`, background: `linear-gradient(to right, ${categoryColor}80, ${categoryColor})` }} />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl pt-8">

        {/* Hero */}
        <div className="mb-8">
          <p className="text-sm font-medium mb-1" style={{ color: categoryColor }}>{categoryLabel}</p>
          <h2 className="font-display" style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', fontWeight: 900, color: 'var(--navy)', letterSpacing: '-.04em', marginBottom: '.375rem' }}>
            Hello, {displayName}. Let&apos;s ace your viva.
          </h2>
          <p className="text-zinc-500 text-sm">{projectTitle || 'Your Project'} · Purchased on {purchaseDate}</p>

          <div className="mt-4 flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-500">Your Progress</span>
                <span className="text-xs font-bold" style={{ color: reviewedCount > 0 ? categoryColor : '#64748b' }}>
                  {reviewedCount} / {TOTAL_QUESTIONS} reviewed
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${progressPct}%`, background: `linear-gradient(to right, ${categoryColor}80, ${categoryColor})` }} />
              </div>
            </div>
            <div className="text-xl font-black" style={{ color: reviewedCount > 0 ? categoryColor : '#94a3b8' }}>
              {progressPct}%
            </div>
          </div>
        </div>

        {/* All done */}
        {allDone && (
          <div className="mb-8 p-5 rounded-2xl border text-center bg-emerald-50 border-emerald-200 shadow-xs">
            <Trophy className="w-10 h-10 mx-auto mb-3 text-emerald-600" />
            <p className="text-lg font-black text-slate-900 mb-1">All 25 reviewed!</p>
            <p className="text-sm text-slate-600">You are ready. Go ace that viva.</p>
          </div>
        )}

        {/* Sections */}
        <div className="space-y-4">
          {sections.map((section, sIdx) => {
            const sectionOpen          = openSections.has(sIdx);
            const sectionDone          = isSectionDone(sIdx);
            const questionsList        = section.questions || [];
            const sectionReviewedCount = questionsList.filter((_, qIdx) => reviewed.has(`${sIdx}-${qIdx}`)).length;

            return (
              <div key={sIdx} className="rounded-2xl overflow-hidden border border-slate-200/90 bg-white shadow-xs">
                <button onClick={() => toggleSection(sIdx)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black"
                      style={{ background: `${section.color}20`, color: section.color }}>
                      {sIdx + 1}
                    </div>
                    <div>
                      <span className="text-sm font-bold text-slate-900">{section.title}</span>
                      <span className="ml-2 text-xs text-slate-500 font-medium">{sectionReviewedCount}/{questionsList.length}</span>
                    </div>
                    {sectionDone && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 transition-transform shrink-0"
                    style={{ transform: sectionOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>

                {sectionOpen && (
                  <div className="px-3 pb-3 space-y-2">
                    {questionsList.map((item, qIdx) => {
                      const cardKey   = `${sIdx}-${qIdx}`;
                      const isOpen    = openCards.has(cardKey);
                      const isReviewed = reviewed.has(cardKey);
                      const globalIdx = sIdx * 5 + qIdx + 1;

                      return (
                        <div key={qIdx} className="rounded-xl border transition-all duration-200"
                          style={{
                            background:      isReviewed ? `${section.color}08` : '#f8fafc',
                            borderColor:     isReviewed ? `${section.color}40` : '#e2e8f0',
                            borderLeftWidth: isReviewed ? '3px' : '1px',
                            borderLeftColor: isReviewed ? section.color : '#e2e8f0',
                          }}>
                          <div className="flex items-start gap-3 p-4">
                            {/* Checkbox */}
                            <button onClick={() => toggleReviewed(cardKey)}
                              className="shrink-0 mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all"
                              style={{ background: isReviewed ? section.color : 'transparent', borderColor: isReviewed ? section.color : '#94a3b8' }}
                              aria-label={isReviewed ? 'Unmark' : 'Mark reviewed'}>
                              {isReviewed && (
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                  <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                              )}
                            </button>
                            {/* Question */}
                            <button onClick={() => toggleCard(cardKey)} className="flex-1 text-left flex items-start gap-2">
                              <span className="text-xs font-bold font-mono mt-0.5 shrink-0" style={{ color: section.color }}>
                                Q{globalIdx}.
                              </span>
                              <span className={`text-sm leading-snug font-medium ${isReviewed ? 'text-slate-400' : 'text-slate-900'}`}>
                                {item.q}
                              </span>
                            </button>
                            <button onClick={() => toggleCard(cardKey)} className="shrink-0">
                              <ChevronDown className="w-4 h-4 text-slate-400 transition-transform"
                                style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                            </button>
                          </div>

                          {isOpen && (
                            <div className="px-4 pb-4 pl-12">
                              <div className="p-4 rounded-xl text-sm leading-relaxed"
                                style={{ background: `${section.color}10`, borderLeft: `3px solid ${section.color}60` }}>
                                <span className="font-bold mr-2" style={{ color: section.color }}>A:</span>
                                <span className="text-slate-700">{item.a}</span>
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> All 25 Questions Unlocked
          </div>
          <p className="text-slate-500 text-xs">Best of luck with your viva defense!</p>
          <button onClick={() => window.print()}
            className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-80 print:hidden shadow-xs"
            style={{ background: `${categoryColor}15`, border: `1px solid ${categoryColor}40`, color: categoryColor }}>
            <Printer className="w-4 h-4" /> Print All Q&amp;As
          </button>
        </div>
      </div>
    </div>
  );
}
