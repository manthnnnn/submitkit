"use client";

import React, { useState, useMemo, useDeferredValue, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search, Clock, Zap, BookOpen, ShieldCheck, ArrowRight,
  Flame, Layers, Sparkles, X, Brain, Cpu, Lock,
  RefreshCw, MessageCircle, FileText, ChevronDown, Check,
} from "lucide-react";
import { AirplaneLogo } from "@/components/ui/logo";
import {
  ALL_TOPICS, getFeaturedTopics, getAllLetters,
  type TopicCard, canBuildOnAntigravity, getProjectSize, getProjectTypeTags,
} from "@/lib/blueprint-engine";

const CATS = [
  { id: "ALL",          label: "All Topics" },
  { id: "RAG",          label: "RAG & GenAI" },
  { id: "IoT",          label: "IoT & Edge AI" },
  { id: "AIML",         label: "AI & Vision" },
  { id: "STARTUPS",     label: "Startup Ideas" },
  { id: "NLP",          label: "NLP & Agents" },
  { id: "FullStack",    label: "Full Stack" },
  { id: "Cybersecurity",label: "Cybersecurity" },
  { id: "DataScience",  label: "Data Science" },
  { id: "Blockchain",   label: "Blockchain" },
  { id: "Mobile",       label: "Mobile Apps" },
  { id: "Fintech",      label: "FinTech" },
];

const TRENDING_CHIPS = ["RAG Pipeline", "IoT Telemetry", "ESP32 TinyML", "Computer Vision", "1-Prompt No-Code"];

const SORT_OPTIONS = [
  { value: "popular",         label: "Trending First",      desc: "Most viewed by CSE students" },
  { value: "difficulty-asc",  label: "Mini Projects First", desc: "Faster to build (2–3 days)" },
  { value: "difficulty-desc", label: "Major Projects First",desc: "Comprehensive capstones (5+ days)" },
  { value: "name-asc",        label: "Alphabetical (A–Z)",  desc: "Sorted A to Z" },
] as const;

export default function BlueprintClient() {
  const [query,       setQuery]       = useState("");
  const [selCat,      setSelCat]      = useState("ALL");
  const [selSize,     setSelSize]     = useState("ALL");
  const [buildMode,   setBuildMode]   = useState<"ALL"|"NOCODE"|"CODE">("ALL");
  const [sortBy,      setSortBy]      = useState<"popular"|"difficulty-asc"|"difficulty-desc"|"name-asc">("popular");
  const [sortOpen,    setSortOpen]    = useState(false);
  const sortRef                       = useRef<HTMLDivElement>(null);
  const [visible,     setVisible]     = useState(24);
  const [expanded,    setExpanded]    = useState<Set<string>>(new Set());
  const [dismissed,   setDismissed]   = useState(false);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    try { if (sessionStorage.getItem("bp_banner") === "1") setDismissed(true); } catch {}
  }, []);

  const dismiss = () => { setDismissed(true); try { sessionStorage.setItem("bp_banner","1"); } catch {} };

  const toggleLetter = useCallback((l: string) => {
    setExpanded(prev => { const n = new Set(prev); n.has(l) ? n.delete(l) : n.add(l); return n; });
  }, []);

  const letters  = useMemo(() => getAllLetters(), []);
  const featured = useMemo(() => getFeaturedTopics(), []);

  // Pre-indexed search metadata for zero lag filtering
  const searchIndex = useMemo(() => ALL_TOPICS.map(t => {
    const size    = getProjectSize(t);
    const isStart = t.id.startsWith("startup-") || t.title.toLowerCase().includes("startup");
    const isNC    = canBuildOnAntigravity(t);
    const tags    = getProjectTypeTags(t);
    const str = `${t.title} ${t.tagline} ${t.whatItDoes} ${t.category} ${t.id} ${tags.join(" ")} ${size} ${isNC ? "no code nocode 1 prompt" : ""} ${isStart ? "startup" : ""} final year project cse`.toLowerCase();
    return { topic: t, size, tags, isStart, isNC, str };
  }), []);

  // Pre-computed Letter Map: eliminates 28,000+ array iterations on every re-render
  const letterMap = useMemo(() => {
    const map = new Map<string, TopicCard[]>();
    for (const l of letters) map.set(l, []);
    for (const t of ALL_TOPICS) {
      const l = t.letter.toUpperCase();
      const arr = map.get(l);
      if (arr) arr.push(t);
    }
    return map;
  }, [letters]);

  const counts = useMemo(() => {
    let rag=0,ai=0,iot=0,mini=0,major=0,nc=0,startup=0,web=0,cyber=0;
    for (const i of searchIndex) {
      if (i.tags.includes("RAG")||i.tags.includes("LLM")||i.tags.includes("Agent")) rag++;
      if (i.tags.includes("AI")||i.topic.category==="AIML") ai++;
      if (i.tags.includes("IoT")||i.topic.category==="IoT") iot++;
      if (i.size==="Mini") mini++;
      if (i.size==="Major") major++;
      if (i.isNC) nc++;
      if (i.isStart) startup++;
      if (i.tags.includes("Web")||i.topic.category==="FullStack") web++;
      if (i.topic.category==="Cybersecurity") cyber++;
    }
    return { rag,ai,iot,mini,major,nc,startup,web,cyber,total:searchIndex.length };
  }, [searchIndex]);

  const dQ  = useDeferredValue(query);
  const dC  = useDeferredValue(selCat);
  const dS  = useDeferredValue(selSize);
  const dBM = useDeferredValue(buildMode);
  const dSO = useDeferredValue(sortBy);

  const filtered = useMemo(() => {
    let list = searchIndex;
    if (dC==="STARTUPS")  list = list.filter(i=>i.isStart);
    else if (dC==="RAG")  list = list.filter(i=>i.tags.includes("RAG")||i.tags.includes("LLM")||i.tags.includes("Agent"));
    else if (dC==="IoT")  list = list.filter(i=>i.tags.includes("IoT")||i.topic.category==="IoT");
    else if (dC!=="ALL")  list = list.filter(i=>i.topic.category===dC);
    if (dS!=="ALL") list = list.filter(i=>i.size===dS);
    if (dBM==="NOCODE")   list = list.filter(i=>i.isNC);
    else if (dBM==="CODE") list = list.filter(i=>!i.isNC);
    const q = dQ.trim().toLowerCase();
    if (q) list = list.filter(i=>i.str.includes(q));
    const s = [...list];
    if (dSO==="difficulty-asc") s.sort((a,b)=>a.topic.difficulty-b.topic.difficulty);
    else if (dSO==="difficulty-desc") s.sort((a,b)=>b.topic.difficulty-a.topic.difficulty);
    else if (dSO==="name-asc") s.sort((a,b)=>a.topic.title.localeCompare(b.topic.title));
    else s.sort((a,b)=>(b.topic.trending?1:0)-(a.topic.trending?1:0));
    return s.map(i=>i.topic);
  }, [dQ,dC,dS,dBM,dSO,searchIndex]);

  const isFiltering = Boolean(dQ.trim()) || dC!=="ALL" || dS!=="ALL" || dBM!=="ALL";

  const reset = () => { setQuery(""); setSelCat("ALL"); setSelSize("ALL"); setBuildMode("ALL"); setSortBy("popular"); };

  useEffect(() => { setVisible(24); }, [dQ,dC,dS,dBM,dSO]);

  /* ── tag button style helper ── */
  const catBtn = (active: boolean): React.CSSProperties => ({
    display: 'inline-flex', alignItems: 'center', gap: '.375rem',
    padding: '.4375rem .875rem', borderRadius: '10px',
    fontSize: '.8125rem', fontWeight: active ? 750 : 500, cursor: 'pointer',
    border: active ? '1px solid #F3CFBF' : '1px solid #EFE6DC',
    background: active ? '#FDF6F2' : '#FFFFFF',
    color: active ? '#E55729' : '#52525B',
    boxShadow: active ? '0 1px 4px rgba(229, 87, 41, 0.08)' : 'none',
    transition: 'background 140ms ease, color 140ms ease, border-color 140ms ease',
    whiteSpace: 'nowrap' as const,
    WebkitTapHighlightColor: 'transparent',
  });

  const sizeBtn = (active: boolean): React.CSSProperties => ({
    padding: '.3125rem .75rem', borderRadius: '8px', border: 'none',
    fontSize: '.8125rem', fontWeight: active ? 750 : 500, cursor: 'pointer',
    background: active ? '#FFFFFF' : 'transparent',
    color: active ? '#18181B' : '#71717A',
    boxShadow: active ? '0 1px 3px rgba(24, 24, 27, 0.08)' : 'none',
    transition: 'background 140ms ease, color 140ms ease',
  });

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', paddingBottom: '4rem' }}>
      <div className="shell" style={{ paddingTop: '2.5rem' }}>

        {/* ── Hero section ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', maxWidth: '46rem', margin: '0 auto 2.5rem' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', padding: '0.25rem 0.8rem', borderRadius: '9999px', background: '#FDF6F2', border: '1px solid #F3CFBF', marginBottom: '1rem', boxShadow: '0 1px 3px rgba(229, 87, 41, 0.08)' }}>
            <AirplaneLogo size={13} color="#E55729" />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#E55729', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Ideas &amp; Blueprints · 1,078+ Verified Topics
            </span>
          </div>

          <h1 className="font-display font-black" style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)', letterSpacing: '-.04em', color: '#18181B', marginTop: '.5rem', marginBottom: '1rem', lineHeight: 1.15 }}>
            Good ideas{' '}
            <span style={{
              display: 'inline-block',
              color: '#E55729',
              background: 'linear-gradient(135deg, #EE6E44 0%, #E55729 50%, #CB451A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              deserve to be built.
            </span>
          </h1>
          <p style={{ fontSize: 'clamp(.9375rem, 2vw, 1.0625rem)', color: '#52525B', lineHeight: 1.75 }}>
            Browse 1,078 verified engineering topics across AI, Full-Stack, IoT, and Cloud. Get the complete IEEE roadmap, architecture, mock dataset, and AI build guide —{' '}
            <strong style={{ color: '#CB451A', fontWeight: 750 }}>100% free</strong>.
          </p>
        </motion.div>

        {/* ── Search bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '40rem', margin: '0 auto 1.5rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', background: '#FFFFFF', border: '1.5px solid #EFE6DC', borderRadius: '16px', padding: '.45rem .45rem .45rem 1rem', gap: '.5rem', boxShadow: '0 4px 18px rgba(24, 24, 27, 0.05)', transition: 'border-color 150ms ease' }}>
            <Search style={{ width: '1.125rem', height: '1.125rem', color: '#71717A', flexShrink: 0 }} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search 1,078 topics by tech, domain, or keyword..."
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontSize: '.9375rem', color: '#18181B', fontFamily: 'var(--font-sans)', minWidth: 0 }}
            />
            {query && (
              <button onClick={() => setQuery("")} style={{ display: 'inline-flex', alignItems: 'center', gap: '.25rem', padding: '.25rem .625rem', borderRadius: '7px', background: '#FAF5EE', border: 'none', cursor: 'pointer', fontSize: '.75rem', color: '#52525B', fontWeight: 650 }}>
                <X style={{ width: '.75rem', height: '.75rem' }} /> Clear
              </button>
            )}
          </div>

          {/* Trending chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '.5rem', marginTop: '.875rem', alignItems: 'center' }}>
            <span style={{ fontSize: '.6875rem', color: '#71717A', fontWeight: 750, textTransform: 'uppercase', letterSpacing: '.08em' }}>Trending:</span>
            {TRENDING_CHIPS.map(c => (
              <button key={c} onClick={() => c === "1-Prompt No-Code" ? (setBuildMode("NOCODE"), setQuery("")) : setQuery(c)}
                style={{ padding: '.3125rem .75rem', borderRadius: '9999px', background: '#FFFFFF', border: '1px solid #EFE6DC', fontSize: '.8125rem', fontWeight: 600, color: '#52525B', cursor: 'pointer', transition: 'all 140ms ease', WebkitTapHighlightColor: 'transparent' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#FDF6F2'; e.currentTarget.style.color = '#E55729'; e.currentTarget.style.borderColor = '#F3CFBF'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.color = '#52525B'; e.currentTarget.style.borderColor = '#EFE6DC'; }}
              >
                {c}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Free blueprint banner ── */}
        {!dismissed && (
          <div
            style={{ maxWidth: '40rem', margin: '0 auto 2rem', padding: '1.125rem 1.375rem', background: 'linear-gradient(135deg, #FDF6F2 0%, #FFFFFF 100%)', border: '1.5px solid #F3CFBF', borderRadius: '16px', boxShadow: '0 2px 10px rgba(229, 87, 41, 0.05)' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.875rem' }}>
                <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '10px', background: '#FFFFFF', border: '1px solid #F3CFBF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FileText style={{ width: '1rem', height: '1rem', color: '#E55729' }} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', flexWrap: 'wrap', marginBottom: '.25rem' }}>
                    <span style={{ fontSize: '.875rem', fontWeight: 800, color: '#18181B' }}>Every Topic Includes a Free Blueprint Starter</span>
                    <span style={{ fontSize: '.625rem', fontWeight: 800, padding: '.15rem .5rem', borderRadius: '9999px', background: '#FFFFFF', color: '#E55729', border: '1px solid #F3CFBF' }}>100% Free</span>
                  </div>
                  <p style={{ fontSize: '.8125rem', color: '#52525B', margin: 0, lineHeight: 1.6 }}>
                    IEEE roadmap, system architecture, mock dataset, and top 10 examiner Q&amp;A — no purchase needed.
                  </p>
                </div>
              </div>
              <button onClick={dismiss} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#71717A', padding: '.25rem', flexShrink: 0 }} aria-label="Dismiss">
                <X style={{ width: '1rem', height: '1rem' }} />
              </button>
            </div>
          </div>
        )}

        {/* ── Category tabs ── */}
        <div className="scroll-x" style={{ display: 'flex', gap: '.5rem', paddingBottom: '.5rem', marginBottom: '1.5rem', maxWidth: '100%' }}>
          {CATS.map(c => {
            const count = c.id==="ALL" ? counts.total : c.id==="RAG" ? `${counts.rag}+` : c.id==="IoT" ? `${counts.iot}+` : c.id==="AIML" ? `${counts.ai}+` : c.id==="STARTUPS" ? counts.startup : c.id==="FullStack" ? counts.web : c.id==="Cybersecurity" ? counts.cyber : null;
            const active = selCat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelCat(c.id)}
                className="snap-s"
                style={{ ...catBtn(active), flexShrink: 0 }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.background = '#FDF6F2';
                    e.currentTarget.style.color = '#E55729';
                    e.currentTarget.style.borderColor = '#F3CFBF';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.background = '#FFFFFF';
                    e.currentTarget.style.color = '#52525B';
                    e.currentTarget.style.borderColor = '#EFE6DC';
                  }
                }}
              >
                {c.label}
                {count !== null && (
                  <span style={{ padding: '.0625rem .4375rem', borderRadius: '9999px', fontSize: '.625rem', fontWeight: 700, background: active ? '#E55729' : '#FAF5EE', color: active ? '#FFFFFF' : '#71717A' }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Refinement strip ── */}
        <div style={{ padding: '.875rem 1.125rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '.75rem', marginBottom: '2rem', background: '#FFFFFF', borderRadius: '16px', border: '1.5px solid #EFE6DC', boxShadow: '0 2px 8px rgba(24, 24, 27, 0.04)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '.625rem' }}>
            {/* Size filter */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '.125rem', padding: '.25rem', background: '#FAF5EE', borderRadius: '10px', border: '1px solid #EFE6DC' }}>
              {[{id:"ALL",l:"All Sizes"},{id:"Mini",l:"Mini (2–3d)"},{id:"Mid",l:"Mid-Level"},{id:"Major",l:"Major (5d+)"}].map(s => (
                <button key={s.id} onClick={() => setSelSize(s.id)} style={sizeBtn(selSize===s.id)}>{s.l}</button>
              ))}
            </div>
            {/* No-code toggle */}
            <button
              onClick={() => setBuildMode(buildMode==="NOCODE" ? "ALL" : "NOCODE")}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '.375rem',
                padding: '.375rem .75rem',
                borderRadius: '8px',
                fontSize: '.8125rem',
                fontWeight: 650,
                cursor: 'pointer',
                background: buildMode === "NOCODE" ? '#E55729' : '#FFFFFF',
                color: buildMode === "NOCODE" ? '#FFFFFF' : '#52525B',
                border: buildMode === "NOCODE" ? '1px solid #E55729' : '1px solid #EFE6DC',
                boxShadow: buildMode === "NOCODE" ? '0 2px 8px rgba(229, 87, 41, 0.25)' : 'none',
                transition: 'all 140ms ease',
              }}
            >
              <Sparkles style={{ width: '.875rem', height: '.875rem', color: buildMode === "NOCODE" ? '#FFFFFF' : '#E55729' }} />
              1-Prompt Ready ({counts.nc})
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '.625rem' }}>
            {/* Custom Aesthetic Sort Dropdown */}
            <div ref={sortRef} style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setSortOpen(!sortOpen)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.5rem',
                  background: '#FFFFFF',
                  color: '#18181B',
                  fontSize: '.8125rem',
                  fontWeight: 650,
                  border: '1.5px solid #EFE6DC',
                  borderRadius: '10px',
                  padding: '.4375rem .875rem',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(24, 24, 27, 0.04)',
                  transition: 'border-color 140ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#F3CFBF')}
                onMouseLeave={e => { if (!sortOpen) e.currentTarget.style.borderColor = '#EFE6DC'; }}
              >
                <span style={{ color: '#71717A', fontWeight: 500 }}>Sort:</span>
                <span>{SORT_OPTIONS.find(o => o.value === sortBy)?.label || 'Trending First'}</span>
                <ChevronDown style={{ width: '.8125rem', height: '.8125rem', color: '#71717A', transform: sortOpen ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }} />
              </button>

              {sortOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 6px)',
                    right: 0,
                    zIndex: 50,
                    minWidth: '15.5rem',
                    background: '#FFFFFF',
                    border: '1.5px solid #F3CFBF',
                    borderRadius: '14px',
                    boxShadow: '0 12px 32px rgba(24, 24, 27, 0.12), 0 2px 6px rgba(0, 0, 0, 0.04)',
                    padding: '.375rem',
                  }}
                >
                  <div style={{ padding: '.375rem .625rem .25rem', fontSize: '.6875rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em', color: '#71717A' }}>
                    Sort Blueprints
                  </div>
                  {SORT_OPTIONS.map(opt => {
                    const active = sortBy === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setSortBy(opt.value as typeof sortBy);
                          setSortOpen(false);
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '.75rem',
                          padding: '.5rem .625rem',
                          borderRadius: '8px',
                          border: 'none',
                          background: active ? '#FDF6F2' : 'transparent',
                          color: active ? '#CB451A' : '#18181B',
                          fontSize: '.8125rem',
                          fontWeight: active ? 750 : 500,
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'background 120ms ease',
                        }}
                        onMouseEnter={e => {
                          if (!active) e.currentTarget.style.background = '#FAF5EE';
                        }}
                        onMouseLeave={e => {
                          if (!active) e.currentTarget.style.background = 'transparent';
                        }}
                      >
                        <div>
                          <div style={{ lineHeight: 1.25 }}>{opt.label}</div>
                          <div style={{ fontSize: '.6875rem', color: '#71717A', marginTop: '.125rem', fontWeight: 400 }}>{opt.desc}</div>
                        </div>
                        {active && <Check style={{ width: '.875rem', height: '.875rem', color: '#E55729', flexShrink: 0 }} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            {isFiltering && (
              <button
                onClick={reset}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.25rem',
                  padding: '.4375rem .875rem',
                  borderRadius: '10px',
                  background: '#FFFFFF',
                  border: '1.5px solid #EFE6DC',
                  color: '#52525B',
                  fontSize: '.8125rem',
                  fontWeight: 650,
                  cursor: 'pointer',
                  transition: 'all 140ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#F3CFBF'; e.currentTarget.style.color = '#E55729'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#EFE6DC'; e.currentTarget.style.color = '#52525B'; }}
              >
                <RefreshCw style={{ width: '.8125rem', height: '.8125rem' }} /> Reset
              </button>
            )}
          </div>
        </div>

        {/* ── Active filter pills ── */}
        {isFiltering && (
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '.5rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '.6875rem', color: '#71717A', fontWeight: 650 }}>Active:</span>
            {dC!=="ALL" && <FilterPill label={CATS.find(c=>c.id===dC)?.label||dC} onRemove={() => setSelCat("ALL")} />}
            {dS!=="ALL" && <FilterPill label={`Size: ${dS}`} onRemove={() => setSelSize("ALL")} />}
            {dBM==="NOCODE" && <FilterPill label="1-Prompt No-Code" onRemove={() => setBuildMode("ALL")} />}
            {dQ.trim() && <FilterPill label={`"${dQ.trim()}"`} onRemove={() => setQuery("")} />}
          </div>
        )}

        {/* ── Filtered results ── */}
        {isFiltering && (
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #EFE6DC' }}>
              <h2 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#18181B', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <Layers style={{ width: '1.125rem', height: '1.125rem', color: '#E55729' }} />
                Matching Topics ({filtered.length})
              </h2>
              <span style={{ fontSize: '.8125rem', color: '#71717A' }}>Showing {Math.min(visible, filtered.length)} of {filtered.length}</span>
            </div>

            {filtered.length === 0 ? (
              <div style={{ padding: '3rem 2rem', textAlign: 'center', maxWidth: '32rem', margin: '0 auto', background: '#FFFFFF', borderRadius: '18px', border: '1.5px solid #EFE6DC' }}>
                <Search style={{ width: '2.5rem', height: '2.5rem', color: '#A1A1AA', margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#18181B', marginBottom: '.5rem' }}>No topics matched</h3>
                <p style={{ fontSize: '.875rem', color: '#52525B', marginBottom: '1.25rem', lineHeight: 1.65 }}>Try a broader keyword or clear one of the filters.</p>
                <button
                  onClick={reset}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '.35rem',
                    padding: '.5rem 1rem',
                    borderRadius: '8px',
                    background: '#18181B',
                    color: '#FFFFFF',
                    fontSize: '.8125rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    margin: '0 auto',
                  }}
                >
                  <RefreshCw style={{ width: '.875rem', height: '.875rem' }} /> Reset All Filters
                </button>
              </div>
            ) : (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 21rem), 1fr))', gap: '1.125rem' }}>
                  {filtered.slice(0, visible).map(t => <TopicCard key={t.id} topic={t} />)}
                </div>
                {visible < filtered.length && (
                  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <button
                      onClick={() => setVisible(v => v + 24)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '.45rem',
                        padding: '.65rem 2rem',
                        borderRadius: '9999px',
                        background: '#FFFFFF',
                        border: '1.5px solid #EFE6DC',
                        color: '#18181B',
                        fontSize: '.875rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(24, 24, 27, 0.04)',
                        transition: 'all 140ms ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#F3CFBF'; e.currentTarget.style.color = '#E55729'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#EFE6DC'; e.currentTarget.style.color = '#18181B'; }}
                    >
                      Show More ({filtered.length - visible} remaining) <ArrowRight style={{ width: '.9375rem', height: '.9375rem' }} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ── Default view: Featured ── */}
        {!isFiltering && featured.length > 0 && (
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '.875rem', borderBottom: '1px solid #EFE6DC' }}>
              <h2 className="font-display" style={{ fontSize: '1.375rem', fontWeight: 800, color: '#18181B', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <Flame style={{ width: '1.125rem', height: '1.125rem', color: '#E55729' }} />
                Trending Final Year Topics
              </h2>
              <span style={{ fontSize: '.8125rem', color: '#71717A', fontWeight: 600 }}>Most requested</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 21rem), 1fr))', gap: '1.125rem' }}>
              {featured.map(t => <TopicCard key={t.id} topic={t} featured />)}
            </div>
          </div>
        )}

        {/* ── Default view: A-Z Directory with Native Virtualization ── */}
        {!isFiltering && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', paddingBottom: '.875rem', borderBottom: '1px solid #EFE6DC' }}>
              <h2 className="font-display" style={{ fontSize: '1.375rem', fontWeight: 800, color: '#18181B', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <BookOpen style={{ width: '1.125rem', height: '1.125rem', color: '#E55729' }} />
                A-Z Topic Directory
              </h2>
              {/* Letter jump links */}
              <div className="scroll-x hidden sm:flex" style={{ gap: '.375rem' }}>
                {letters.map(l => (
                  <a key={l} href={`#letter-${l}`}
                    style={{ width: '1.625rem', height: '1.625rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', background: '#FFFFFF', border: '1px solid #EFE6DC', fontSize: '.6875rem', fontWeight: 700, color: '#52525B', textDecoration: 'none', transition: 'all 120ms ease', fontFamily: 'var(--font-mono)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#FDF6F2'; e.currentTarget.style.color = '#E55729'; e.currentTarget.style.borderColor = '#F3CFBF'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.color = '#52525B'; e.currentTarget.style.borderColor = '#EFE6DC'; }}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {letters.map(letter => {
                const topics = letterMap.get(letter) || [];
                if (topics.length === 0) return null;
                const isExp  = expanded.has(letter);
                const shown  = isExp ? topics : topics.slice(0, 6);
                return (
                  <div
                    key={letter}
                    id={`letter-${letter}`}
                    style={{
                      scrollMarginTop: '5rem',
                      contentVisibility: 'auto',
                      containIntrinsicSize: '280px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.125rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                        <div style={{ width: '2.25rem', height: '2.25rem', borderRadius: '10px', background: '#18181B', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: '1.0625rem', fontWeight: 900, color: '#fff', flexShrink: 0 }}>
                          {letter}
                        </div>
                        <div style={{ width: '3rem', height: '1px', background: '#EFE6DC' }} />
                        <span style={{ fontSize: '.75rem', color: '#71717A', fontWeight: 600 }}>{topics.length} topics</span>
                      </div>
                      {topics.length > 6 && (
                        <button
                          onClick={() => toggleLetter(letter)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '.8125rem',
                            fontWeight: 750,
                            color: '#CB451A',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '.25rem',
                            padding: '.25rem .5rem',
                            borderRadius: '6px',
                            transition: 'color 120ms ease',
                          }}
                        >
                          {isExp ? `Show less` : `View all ${topics.length}`}
                          <ArrowRight style={{ width: '.875rem', height: '.875rem' }} />
                        </button>
                      )}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 21rem), 1fr))', gap: '1.125rem' }}>
                      {shown.map(t => <TopicCard key={t.id} topic={t} />)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div style={{ marginTop: '4rem', padding: '2.5rem', textAlign: 'center', background: '#FAF5EE', borderRadius: '24px', border: '1.5px solid #EFE6DC' }}>
              <Sparkles style={{ width: '2.25rem', height: '2.25rem', color: '#E55729', margin: '0 auto 1rem' }} />
              <h3 className="font-display" style={{ fontSize: '1.5rem', fontWeight: 900, color: '#18181B', marginBottom: '.625rem', letterSpacing: '-.03em' }}>
                Can&apos;t find your topic?
              </h3>
              <p style={{ fontSize: '.9375rem', color: '#52525B', lineHeight: 1.7, maxWidth: '30rem', margin: '0 auto 1.5rem' }}>
                Tell us your topic and requirements. Our senior engineering team will craft a custom 20-page blueprint with Master Prompt within 24 hours.
              </p>
              <a
                href={`https://wa.me/918799814256?text=${encodeURIComponent("Hi SubmitKit! I couldn't find my project topic. I need a blueprint for: ")}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '.5rem',
                  padding: '0.75rem 1.75rem',
                  borderRadius: '9999px',
                  background: '#18181B',
                  color: '#FFFFFF',
                  fontSize: '.9375rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  minHeight: '48px',
                  boxShadow: '0 4px 16px rgba(24, 24, 27, 0.18)',
                  transition: 'background 140ms ease, transform 140ms ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#27272A'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#18181B'; e.currentTarget.style.transform = 'none'; }}
              >
                <WaIcon />
                Request Custom Blueprint on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Topic card component with Hardware Accelerated CSS ── */
const TopicCard = React.memo(function TopicCard({ topic, featured = false }: { topic: TopicCard; featured?: boolean }) {
  const isNC = canBuildOnAntigravity(topic);
  const size = getProjectSize(topic);

  const sizeTag = size === "Mini"
    ? { bg: '#FDF6F2', color: '#CB451A', border: '#F3CFBF', dot: '#E55729', label: 'Mini (2–3d)' }
    : size === "Mid"
    ? { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A', dot: '#F59E0B', label: 'Mid (3–5d)' }
    : { bg: '#FAF5EE', color: '#18181B', border: '#EFE6DC', dot: '#E55729', label: 'Major Capstone' };

  return (
    <div
      style={{
        height: '100%',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'subpixel-antialiased',
      }}
    >
      <Link
        href={`/blueprint/${topic.id}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1.15rem',
          textDecoration: 'none',
          overflow: 'hidden',
          position: 'relative',
          borderRadius: '18px',
          border: '1.5px solid #EFE6DC',
          background: '#FFFFFF',
          boxShadow: '0 2px 8px rgba(24, 24, 27, 0.04)',
          height: '100%',
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitFontSmoothing: 'subpixel-antialiased',
          transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1), border-color 180ms ease, box-shadow 180ms ease',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.borderColor = '#F3CFBF';
          e.currentTarget.style.boxShadow = '0 12px 28px -4px rgba(229, 87, 41, 0.12)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateZ(0)';
          e.currentTarget.style.borderColor = '#EFE6DC';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(24, 24, 27, 0.04)';
        }}
      >
        {/* Top accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: isNC ? 'linear-gradient(90deg, #EE6E44, #E55729)' : featured ? 'linear-gradient(90deg, #F59E0B, #E55729)' : 'linear-gradient(90deg, #E55729, #F3CFBF)' }} />

        {/* Badges row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '.5rem', marginBottom: '.875rem', marginTop: '.125rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.375rem' }}>
            <span style={{ fontSize: '.625rem', fontWeight: 700, padding: '.15rem .5rem', borderRadius: '9999px', background: '#FAF5EE', color: '#71717A', border: '1px solid #EFE6DC' }}>{topic.category}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.25rem', padding: '.15rem .55rem', borderRadius: '9999px', fontSize: '.625rem', fontWeight: 750, background: sizeTag.bg, color: sizeTag.color, border: `1px solid ${sizeTag.border}` }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: sizeTag.dot, display: 'inline-block' }} />
              {sizeTag.label}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '.375rem' }}>
            {isNC && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.25rem', padding: '.15rem .5rem', borderRadius: '9999px', fontSize: '.625rem', fontWeight: 750, background: '#FDF6F2', color: '#E55729', border: '1px solid #F3CFBF' }}>
                <Sparkles style={{ width: '.625rem', height: '.625rem', color: '#E55729' }} /> 1-Prompt
              </span>
            )}
            {featured && !isNC && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.25rem', padding: '.15rem .5rem', borderRadius: '9999px', fontSize: '.625rem', fontWeight: 750, background: '#FFF1F2', color: '#E11D48', border: '1px solid #FECDD3' }}>
                <Flame style={{ width: '.625rem', height: '.625rem', fill: '#E11D48' }} /> Hot
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display" style={{ fontSize: '1rem', fontWeight: 800, color: '#18181B', lineHeight: 1.35, letterSpacing: '-.02em', marginBottom: '.5rem', transition: 'color 150ms' }}>
          {topic.title}
        </h3>

        <p style={{ fontSize: '.8125rem', color: '#52525B', lineHeight: 1.65, marginBottom: '1rem', flex: 1 }} className="line-clamp-2">
          {topic.tagline}
        </p>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '.875rem', borderTop: '1px solid #EFE6DC', fontSize: '.8125rem' }}>
          <span style={{ color: isNC ? '#CB451A' : '#71717A', fontWeight: 650, display: 'flex', alignItems: 'center', gap: '.375rem' }}>
            {isNC ? <><Sparkles style={{ width: '.875rem', height: '.875rem', color: '#E55729' }} /> Make in 1 Prompt</> : <><BookOpen style={{ width: '.875rem', height: '.875rem' }} /> Free Blueprint</>}
          </span>
          <span style={{ color: '#E55729', fontWeight: 750, display: 'inline-flex', alignItems: 'center', gap: '.25rem' }}>
            Free Preview <ArrowRight style={{ width: '.875rem', height: '.875rem' }} />
          </span>
        </div>
      </Link>
    </div>
  );
});

/* ── Filter pill ── */
function FilterPill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.375rem', padding: '.25rem .75rem', borderRadius: '9999px', background: '#FDF6F2', color: '#CB451A', border: '1px solid #F3CFBF', fontSize: '.75rem', fontWeight: 700 }}>
      {label}
      <button onClick={onRemove} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#E55729', display: 'flex', padding: 0 }}>
        <X style={{ width: '.75rem', height: '.75rem' }} />
      </button>
    </span>
  );
}

function WaIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}
