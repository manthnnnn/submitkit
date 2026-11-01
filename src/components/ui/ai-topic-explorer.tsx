'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowRight, ChevronRight, BookOpen } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  category: string;
  tagline: string;
}

const TRENDING_TOPICS = [
  { name: 'Face Attendance', id: 'face-recognition-attendance', category: 'AIML' },
  { name: 'Fraud Detection', id: 'credit-card-fraud-detection', category: 'FinTech' },
  { name: 'EHR Health Portal', id: 'healthcare-ehr-portal', category: 'Full-Stack' },
  { name: 'LLM Research Agent', id: 'autonomous-llm-researcher', category: 'AI' },
];

export function AiTopicExplorer() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [res, setRes] = useState<SearchResult[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const tmr = useRef<NodeJS.Timeout | null>(null);

  const onQ = (v: string) => {
    setQ(v);
    if (tmr.current) clearTimeout(tmr.current);
    if (v.trim().length >= 1) {
      tmr.current = setTimeout(async () => {
        try {
          const r = await fetch(`/api/blueprint/search?q=${encodeURIComponent(v.trim())}&limit=4`);
          if (r.ok) {
            const data = await r.json();
            setRes(data.results || []);
          }
        } catch {
          // silent fallback
        }
      }, 120);
    } else {
      setRes([]);
    }
  };

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setRes([]);
    if (q.trim()) {
      router.push(`/blueprint?q=${encodeURIComponent(q.trim())}`);
    } else {
      router.push('/blueprint');
    }
  };

  return (
    <div className="relative w-full">
      <div
        className="card relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-md transition-shadow hover:shadow-lg"
        style={{
          background: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="p-4 sm:p-5 lg:p-6">
          {/* Header Row: Minimal & Clean */}
          <div className="flex items-center justify-between gap-3 mb-3.5">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0"
                style={{
                  background: 'var(--teal-50)',
                  border: '1px solid var(--teal-100)',
                }}
              >
                <BookOpen className="w-4 h-4 text-teal-700" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 tracking-tight leading-tight m-0">
                    AI Topic Explorer
                  </h3>
                  <span className="tag tag-teal text-[10px] font-bold px-2 py-0.5">
                    100% Free
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 leading-snug m-0">
                  Search 1,078 engineering topics — architecture, IEEE base paper &amp; viva Q&amp;A.
                </p>
              </div>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/80 shrink-0">
              <span className="dot-live apulse" style={{ width: '5px', height: '5px' }} />
              <span className="text-xs text-slate-600 font-medium">
                <strong className="text-slate-900 font-bold">1,078</strong> Live
              </span>
            </div>
          </div>

          {/* Search Command Input */}
          <form onSubmit={onSearch} className="relative mb-3">
            <div
              className={`flex items-center gap-2 rounded-xl transition-all duration-200 pl-3 pr-1.5 py-1.5 border ${
                isFocused
                  ? 'border-teal-600 ring-3 ring-teal-500/15 bg-white shadow-xs'
                  : 'border-slate-200 bg-slate-50/70 hover:border-slate-300'
              }`}
            >
              <Search
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isFocused ? 'text-teal-600' : 'text-slate-400'
                }`}
              />
              <input
                type="text"
                value={q}
                onChange={e => onQ(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search topics (e.g. Face Attendance, Fraud Detection, EHR...)"
                className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 font-sans min-w-0"
              />

              <button
                type="submit"
                aria-label="Search Blueprints"
                className="btn btn-teal shrink-0 rounded-lg px-3.5 py-1.5 text-xs sm:text-sm font-bold flex items-center gap-1 active:scale-95 transition-all shadow-xs"
              >
                <span>Search</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Floating Autocomplete Dropdown */}
            {res.length > 0 && (
              <div className="card absolute top-[calc(100%+6px)] left-0 right-0 z-50 rounded-xl overflow-hidden shadow-2xl border border-teal-200 bg-white/98 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="font-bold uppercase tracking-wider text-teal-800">
                    Matching Blueprints
                  </span>
                  <span className="text-slate-400">Tap to inspect</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  {res.map(t => (
                    <Link
                      key={t.id}
                      href={`/blueprint/${t.id}`}
                      onClick={() => setRes([])}
                      className="flex items-center justify-between px-3.5 py-2 hover:bg-teal-50/60 active:bg-teal-100/50 transition-colors"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {t.title}
                          </span>
                          <span className="tag tag-slate text-[10px] px-1.5 py-0.5 shrink-0">
                            {t.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {t.tagline}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-teal-600 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </form>

          {/* Footer Row: Trending Chips & Browse Link */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                Trending:
              </span>
              {TRENDING_TOPICS.map(c => (
                <Link
                  key={c.id}
                  href={`/blueprint/${c.id}`}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200/80 text-[11px] font-medium text-slate-700 whitespace-nowrap shrink-0 hover:border-teal-300 hover:bg-teal-50/50 hover:text-teal-900 transition-all active:scale-95"
                >
                  <span>{c.name}</span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">
                    {c.category}
                  </span>
                </Link>
              ))}
            </div>

            <Link
              href="/blueprint"
              className="text-xs font-bold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 shrink-0 ml-auto active:opacity-75 transition-opacity"
            >
              Browse All 1,078 <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
