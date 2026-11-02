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

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'ai', label: 'AI & Vision' },
  { id: 'fullstack', label: 'Full Stack' },
  { id: 'cybersecurity', label: 'Cybersecurity' },
  { id: 'fintech', label: 'FinTech' },
  { id: 'iot', label: 'IoT & Edge' },
];

const ALL_TRENDING = [
  { name: 'Face Attendance', id: 'face-recognition-attendance', category: 'AIML', catId: 'ai' },
  { name: 'Fraud Detection', id: 'credit-card-fraud-detection', category: 'FinTech', catId: 'fintech' },
  { name: 'EHR Health Portal', id: 'healthcare-ehr-portal', category: 'Full-Stack', catId: 'fullstack' },
  { name: 'LLM Research Agent', id: 'autonomous-llm-researcher', category: 'AI', catId: 'ai' },
  { name: 'Phishing Threat Radar', id: 'phishing-detector-ai', category: 'CYBER', catId: 'cybersecurity' },
];

export function AiTopicExplorer() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
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
    } else if (activeCategory !== 'all') {
      router.push(`/blueprint?category=${encodeURIComponent(activeCategory)}`);
    } else {
      router.push('/blueprint');
    }
  };

  const handleCategoryClick = (catId: string) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      setQ('');
    } else {
      const match = CATEGORIES.find(c => c.id === catId);
      if (match) {
        // Subtle hint or can redirect to blueprint
        router.push(`/blueprint?category=${encodeURIComponent(catId)}`);
      }
    }
  };

  const filteredTrending = activeCategory === 'all'
    ? ALL_TRENDING
    : ALL_TRENDING.filter(t => t.catId === activeCategory);

  const displayTrending = filteredTrending.length > 0 ? filteredTrending : ALL_TRENDING;

  return (
    <div className="relative w-full">
      {/* 3D Ambient Backdrop Glow */}
      <div
        className="absolute -inset-2.5 rounded-3xl opacity-40 blur-2xl pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse at 50% 25%, rgba(13, 148, 136, 0.22) 0%, rgba(245, 158, 11, 0.1) 50%, transparent 80%)',
        }}
      />
      
      <div
        className="card relative rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/90 transition-all duration-300"
        style={{
          background: 'linear-gradient(165deg, rgba(255, 255, 255, 0.98) 0%, rgba(253, 251, 247, 0.95) 45%, rgba(246, 252, 250, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 12px 36px -8px rgba(15, 23, 42, 0.08), 0 4px 12px -2px rgba(13, 148, 136, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.95)',
        }}
      >
        <div className="p-4 sm:p-6 lg:p-7">
          {/* Header Row: Title, 100% Free, Subtitle & Live Counter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex items-start sm:items-center gap-3">
              <div
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs"
                style={{
                  background: 'var(--teal-50)',
                  border: '1px solid var(--teal-100)',
                }}
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-teal-700" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight m-0">
                    AI Topic Explorer
                  </h3>
                  <span className="tag tag-teal text-[10px] sm:text-[11px] font-bold px-2 py-0.5">
                    100% FREE
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-slate-500 mt-1 leading-snug m-0">
                  Search 1,078 engineering topics — architecture, IEEE base papers &amp; viva Q&amp;A.
                </p>
              </div>
            </div>

            <div className="inline-flex self-start sm:self-center items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200/80 shrink-0 shadow-2xs">
              <span className="dot-live apulse" style={{ width: '6px', height: '6px' }} />
              <span className="text-xs text-slate-600 font-medium">
                <strong className="text-slate-900 font-bold">1,078</strong> Live
              </span>
            </div>
          </div>

          {/* Category Filter Pills (Matches Image 2) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 mb-3.5 scrollbar-none">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150 active:scale-95 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 border border-slate-200/70'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search Command Input with Wide Button */}
          <form onSubmit={onSearch} className="relative mb-4">
            <div
              className={`flex items-center gap-2 rounded-xl transition-all duration-200 pl-3.5 pr-2 py-2 border ${
                isFocused
                  ? 'border-teal-600 ring-3 ring-teal-500/15 bg-white'
                  : 'border-slate-200/90 bg-slate-50/80 hover:border-slate-300'
              }`}
              style={{
                boxShadow: isFocused
                  ? '0 0 0 3px rgba(13, 148, 136, 0.15), inset 0 1px 2px rgba(15,23,42,0.03)'
                  : 'inset 0 1.5px 3px rgba(15, 23, 42, 0.04)',
              }}
            >
              <Search
                className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 transition-colors ${
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
                className="btn btn-teal shrink-0 rounded-lg px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold flex items-center gap-1.5 active:scale-95 transition-all shadow-sm"
              >
                <span>Search Blueprints</span>
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
                      className="flex items-center justify-between px-3.5 py-2.5 hover:bg-teal-50/60 active:bg-teal-100/50 transition-colors"
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

          {/* Footer Row: Trending Chips & Browse Link (Matches Image 2) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                Trending:
              </span>
              {displayTrending.map(c => (
                <Link
                  key={c.id}
                  href={`/blueprint/${c.id}`}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200/90 text-[11px] font-medium text-slate-700 whitespace-nowrap shrink-0 shadow-2xs hover:border-teal-400 hover:bg-teal-50/50 hover:text-teal-900 transition-all hover:-translate-y-0.5 active:scale-95"
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
