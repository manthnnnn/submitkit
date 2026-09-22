"use client";

import { useState, useMemo, useDeferredValue, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Search,
  Clock,
  Zap,
  Star,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  Flame,
  Layers,
  Sparkles,
  Filter,
  X,
  SlidersHorizontal,
  Brain,
  Cpu,
  Globe,
  Lock,
  Rocket,
  RefreshCw,
  MessageCircle,
  FileText,
} from "lucide-react";
import {
  ALL_TOPICS,
  getFeaturedTopics,
  getAllLetters,
  getTopicsByLetter,
  TopicCard,
  canBuildOnAntigravity,
  getProjectSize,
  getProjectTypeTags,
} from "@/lib/blueprint-engine";

const CATEGORIES: { id: string; label: string }[] = [
  { id: "ALL", label: "All Topics" },
  { id: "RAG", label: "🧠 RAG & GenAI" },
  { id: "IoT", label: "📡 IoT & Edge AI" },
  { id: "AIML", label: "🤖 AI & Vision" },
  { id: "STARTUPS", label: "🚀 Startup Ideas" },
  { id: "NLP", label: "💬 NLP & Agents" },
  { id: "FullStack", label: "🌐 Full Stack" },
  { id: "Cybersecurity", label: "🔐 Cybersecurity" },
  { id: "DataScience", label: "📊 Data Science" },
  { id: "Blockchain", label: "⛓️ Blockchain" },
  { id: "Mobile", label: "📱 Mobile Apps" },
  { id: "Fintech", label: "💳 Fintech" },
];

const QUICK_SEARCH_CHIPS = [
  "RAG Pipeline",
  "IoT Telemetry",
  "ESP32 TinyML",
  "Computer Vision",
  "1-Prompt No-Code",
];

export default function BlueprintBrowserPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedSize, setSelectedSize] = useState<string>("ALL");
  const [buildMode, setBuildMode] = useState<"ALL" | "NOCODE" | "CODE">("ALL");
  const [sortBy, setSortBy] = useState<"popular" | "difficulty-asc" | "difficulty-desc" | "name-asc">("popular");
  const [visibleCount, setVisibleCount] = useState<number>(24);
  const [expandedLetters, setExpandedLetters] = useState<Set<string>>(new Set());
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        const dismissed = sessionStorage.getItem("blueprint_starter_banner_dismissed");
        if (dismissed === "true") setBannerDismissed(true);
      }
    } catch {}
  }, []);

  const handleDismissBanner = () => {
    setBannerDismissed(true);
    try {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("blueprint_starter_banner_dismissed", "true");
      }
    } catch {}
  };

  const toggleLetter = useCallback((letter: string) => {
    setExpandedLetters((prev) => {
      const next = new Set(prev);
      if (next.has(letter)) next.delete(letter);
      else next.add(letter);
      return next;
    });
  }, []);

  const letters = getAllLetters();
  const featured = useMemo(() => getFeaturedTopics(), []);

  // Pre-indexed search data created once with rich size and domain metadata
  const searchIndex = useMemo(() => {
    return ALL_TOPICS.map((t) => {
      const size = getProjectSize(t);
      const isStartup =
        t.id.startsWith("startup-") ||
        t.title.toLowerCase().includes("startup") ||
        t.tagline.toLowerCase().includes("startup");
      const isNoCode = canBuildOnAntigravity(t);
      const tags = getProjectTypeTags(t);

      const sizeKeywords =
        size === "Mini"
          ? "mini project mini easy beginner simple 2-3 days small"
          : size === "Mid"
          ? "mid project mid-level moderate 3-5 days intermediate"
          : "major project major final year capstone advanced complex 5+ days";

      const ragKeywords = tags.includes("RAG") ? "rag retrieval augmented generation vector database chromadb pinecone llamaindex langchain embeddings hybrid search" : "";
      const agentKeywords = tags.includes("Agent") ? "agent multi agent crewai langgraph autonomous tool calling function calling workflow" : "";
      const llmKeywords = tags.includes("LLM") ? "llm large language model generative ai genai ollama mistral llama gpt prompt" : "";
      const iotKeywords = tags.includes("IoT") ? "iot internet of things esp32 esp32-cam arduino raspberry pi sensor telemetry lorawan tinyml edge ai mqtt" : "";
      const aiKeywords = tags.includes("AI") ? "ai based ai project artificial intelligence computer vision neural deep learning" : "";
      const mlKeywords = tags.includes("ML") ? "ml based ml project machine learning model classifier prediction dataset scikit" : "";
      const nlpKeywords = tags.includes("NLP") ? "nlp natural language processing indicbert bert sentiment text speech voice translation summarization" : "";
      const webKeywords = tags.includes("Web") ? "web based web project full stack fullstack website portal dashboard app" : "";
      const noCodeKeywords = isNoCode ? "no code nocode 1 prompt one prompt antigravity without coding" : "";
      const startupKeywords = isStartup ? "startup idea startup project business product saas" : "";

      return {
        topic: t,
        size,
        tags,
        isStartup,
        isNoCode,
        searchStr: `${t.title} ${t.tagline} ${t.whatItDoes} ${t.category} ${t.id} ${tags.join(" ")} ${sizeKeywords} ${ragKeywords} ${agentKeywords} ${llmKeywords} ${iotKeywords} ${aiKeywords} ${mlKeywords} ${nlpKeywords} ${webKeywords} ${noCodeKeywords} ${startupKeywords} final year project college project cse it`.toLowerCase(),
      };
    });
  }, []);

  // Sync state with URL params on initial load
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const params = new URLSearchParams(window.location.search);
      const q = params.get("q");
      const cat = params.get("category");
      const size = params.get("size");
      const mode = params.get("mode");
      const sort = params.get("sort");

      if (q) setSearchQuery(q);
      if (cat && (CATEGORIES.some((c) => c.id === cat) || cat === "AI" || cat === "ML" || cat === "RAG" || cat === "IoT")) {
        setSelectedCategory(cat);
      }
      if (size && ["Mini", "Mid", "Major", "ALL"].includes(size)) {
        setSelectedSize(size);
      }
      if (mode && ["ALL", "NOCODE", "CODE"].includes(mode)) {
        setBuildMode(mode as any);
      }
      if (sort && ["popular", "difficulty-asc", "difficulty-desc", "name-asc"].includes(sort)) {
        setSortBy(sort as any);
      }
    } catch {
      // ignore URL parsing errors
    }
  }, []);

  // Update URL params without triggering a full page reload or suspense remount
  const updateUrl = useCallback(
    (q: string, cat: string, size: string, mode: string, sort: string) => {
      if (typeof window === "undefined") return;
      const params = new URLSearchParams();
      if (q.trim()) params.set("q", q.trim());
      if (cat !== "ALL") params.set("category", cat);
      if (size !== "ALL") params.set("size", size);
      if (mode !== "ALL") params.set("mode", mode);
      if (sort !== "popular") params.set("sort", sort);

      const qs = params.toString();
      const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    },
    []
  );

  // Quick Pick counts computed from the search index
  const counts = useMemo(() => {
    let ragCount = 0;
    let aiCount = 0;
    let mlCount = 0;
    let iotCount = 0;
    let miniCount = 0;
    let majorCount = 0;
    let noCodeCount = 0;
    let codeCount = 0;
    let startupCount = 0;
    let webCount = 0;
    let cyberCount = 0;

    for (const item of searchIndex) {
      if (item.tags.includes("RAG") || item.tags.includes("LLM") || item.tags.includes("Agent")) ragCount++;
      if (item.tags.includes("AI") || item.topic.category === "AIML") aiCount++;
      if (item.tags.includes("ML") || item.topic.category === "DataScience") mlCount++;
      if (item.tags.includes("IoT") || item.topic.category === "IoT") iotCount++;
      if (item.size === "Mini") miniCount++;
      if (item.size === "Major") majorCount++;
      if (item.isNoCode) noCodeCount++;
      else codeCount++;
      if (item.isStartup) startupCount++;
      if (item.tags.includes("Web") || item.topic.category === "FullStack") webCount++;
      if (item.topic.category === "Cybersecurity") cyberCount++;
    }

    return {
      rag: ragCount,
      ai: aiCount,
      ml: mlCount,
      iot: iotCount,
      mini: miniCount,
      major: majorCount,
      noCode: noCodeCount,
      code: codeCount,
      startup: startupCount,
      web: webCount,
      cyber: cyberCount,
      total: searchIndex.length,
    };
  }, [searchIndex]);

  // Defer search value to ensure input typing never stutters
  const deferredQuery = useDeferredValue(searchQuery);
  const deferredCategory = useDeferredValue(selectedCategory);
  const deferredSize = useDeferredValue(selectedSize);
  const deferredBuildMode = useDeferredValue(buildMode);
  const deferredSort = useDeferredValue(sortBy);

  // Filtered and sorted topics
  const filteredTopics = useMemo(() => {
    let list = searchIndex;

    // Filter by category or AI/ML/RAG/IoT quick tags
    if (deferredCategory === "STARTUPS") {
      list = list.filter((item) => item.isStartup);
    } else if (deferredCategory === "RAG") {
      list = list.filter((item) => item.tags.includes("RAG") || item.tags.includes("LLM") || item.tags.includes("Agent"));
    } else if (deferredCategory === "IoT") {
      list = list.filter((item) => item.tags.includes("IoT") || item.topic.category === "IoT");
    } else if (deferredCategory === "AI") {
      list = list.filter((item) => item.tags.includes("AI") || item.topic.category === "AIML");
    } else if (deferredCategory === "ML") {
      list = list.filter((item) => item.tags.includes("ML") || item.topic.category === "AIML" || item.topic.category === "DataScience");
    } else if (deferredCategory !== "ALL") {
      list = list.filter((item) => item.topic.category === deferredCategory);
    }

    // Filter by project size (Mini, Mid, Major)
    if (deferredSize !== "ALL") {
      list = list.filter((item) => item.size === deferredSize);
    }

    // Filter by buildMode
    if (deferredBuildMode === "NOCODE") {
      list = list.filter((item) => item.isNoCode);
    } else if (deferredBuildMode === "CODE") {
      list = list.filter((item) => !item.isNoCode);
    }

    // Filter by text search query
    const q = deferredQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((item) => item.searchStr.includes(q));
    }

    // Sort results
    const sorted = [...list];
    if (deferredSort === "difficulty-asc") {
      sorted.sort((a, b) => a.topic.difficulty - b.topic.difficulty);
    } else if (deferredSort === "difficulty-desc") {
      sorted.sort((a, b) => b.topic.difficulty - a.topic.difficulty);
    } else if (deferredSort === "name-asc") {
      sorted.sort((a, b) => a.topic.title.localeCompare(b.topic.title));
    } else {
      // Default: trending first, then balanced
      sorted.sort((a, b) => (b.topic.trending ? 1 : 0) - (a.topic.trending ? 1 : 0));
    }

    return sorted.map((item) => item.topic);
  }, [deferredQuery, deferredCategory, deferredSize, deferredBuildMode, deferredSort, searchIndex]);

  // Reset pagination when query or filters change
  useEffect(() => {
    setVisibleCount(24);
    updateUrl(searchQuery, selectedCategory, selectedSize, buildMode, sortBy);
  }, [searchQuery, selectedCategory, selectedSize, buildMode, sortBy, updateUrl]);

  // Check if any filter is active
  const isFilteringActive =
    Boolean(searchQuery.trim()) ||
    selectedCategory !== "ALL" ||
    selectedSize !== "ALL" ||
    buildMode !== "ALL";

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("ALL");
    setSelectedSize("ALL");
    setBuildMode("ALL");
    setSortBy("popular");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#09090b] text-white page-enter">
      {/* Background glow orbs matching SubmitKit */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="glow-orb w-[850px] h-[850px] bg-brand-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="glow-orb w-[650px] h-[650px] bg-emerald-500/8 bottom-10 right-10" />
        <div className="glow-orb w-[500px] h-[500px] bg-purple-500/5 top-1/3 left-10" />
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-5 max-w-3xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-400 font-bold text-xs border border-brand-500/25 tracking-wide uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            Project Blueprint Generator · 1,000+ Topics
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white leading-tight">
            Choose Your Project. <br />
            <span className="text-gradient font-extrabold">
              Make It in ONE Prompt.
            </span>
          </h1>

          <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Pick from 1,000+ verified engineering topics. Filter by AI, ML, Mini vs. Major, or No-Code. Download the complete step-by-step roadmap, mock dataset generator, and 1-prompt AI build guide for just <span className="text-white font-semibold">₹19</span>.
          </p>
        </div>

        {/* ─── CLEAN SEARCH & DISCOVERY CONSOLE ─── */}
        <div className="space-y-6 max-w-5xl mx-auto pt-2">
          {/* Centered Search Bar */}
          <div className="max-w-2xl mx-auto space-y-3">
            <div className="relative flex items-center bg-zinc-900/90 border border-white/10 hover:border-white/20 rounded-2xl p-2 shadow-2xl backdrop-blur-xl focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 transition-all">
              <Search className="h-5 w-5 text-zinc-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-white px-3 py-2 outline-none text-sm placeholder:text-zinc-500"
                placeholder="Search 1,000+ topics by tech stack, domain, or keyword..."
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white bg-white/5 rounded-lg mr-2 transition-colors flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Clear
                </button>
              )}
            </div>

            {/* Curated Trending Searches (Clean & focused) */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-[11px] text-zinc-500 font-medium">Trending:</span>
              {QUICK_SEARCH_CHIPS.map((chip) => (
                <button
                  key={chip}
                  onClick={() => {
                    if (chip === "1-Prompt No-Code") {
                      setBuildMode("NOCODE");
                      setSearchQuery("");
                    } else {
                      setSearchQuery(chip);
                    }
                  }}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5 transition-all"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* ₹19 Blueprint Starter Callout Banner (Dismissable) */}
          {!bannerDismissed && (
            <div className="relative overflow-hidden rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-zinc-900/90 to-amber-950/30 p-4 sm:p-5 shadow-xl shadow-amber-500/5 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5 shadow-sm">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-white">
                        Every Topic Includes a ₹19 Blueprint Starter Pack
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-extrabold uppercase tracking-wider">
                        ₹19 Only
                      </span>
                    </div>
                    <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
                      Need topic approval first? Get the complete step-by-step IEEE roadmap (.docx &amp; .pdf), system architecture, mock dataset, and top 10 examiner viva Q&amp;A for any topic below before buying code.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => {
                      const sampleCard = document.querySelector('a[href^="/blueprint/"]');
                      if (sampleCard) {
                        sampleCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <span>Pick a Topic</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleDismissBanner}
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors"
                    title="Dismiss"
                    aria-label="Dismiss banner"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Unified Domain Category Tabs with Live Counts */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto py-1">
            {CATEGORIES.map((cat) => {
              const count =
                cat.id === "ALL" ? counts.total :
                cat.id === "RAG" ? `${counts.rag}+` :
                cat.id === "IoT" ? `${counts.iot}+` :
                cat.id === "AIML" ? `${counts.ai}+` :
                cat.id === "STARTUPS" ? counts.startup :
                cat.id === "FullStack" ? counts.web :
                cat.id === "Cybersecurity" ? counts.cyber :
                null;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                    selectedCategory === cat.id
                      ? "bg-white text-zinc-950 font-bold shadow-md scale-[1.02]"
                      : "bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800/80 border border-white/5"
                  }`}
                >
                  <span>{cat.label}</span>
                  {count !== null && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        selectedCategory === cat.id
                          ? "bg-zinc-200 text-zinc-950 font-bold"
                          : "bg-white/10 text-zinc-400"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Single Compact Refinement Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur-xl">
            {/* Scope (Mini / Mid / Major) & 1-Prompt Mode */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/5">
                {[
                  { id: "ALL", label: "All Sizes" },
                  { id: "Mini", label: "Mini (2–3d)" },
                  { id: "Mid", label: "Mid-Level" },
                  { id: "Major", label: "Major (5d+)" },
                ].map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setSelectedSize(size.id)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedSize === size.id
                        ? "bg-white/20 text-white font-bold"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>

              {/* 1-Prompt No-Code Toggle */}
              <button
                onClick={() => setBuildMode(buildMode === "NOCODE" ? "ALL" : "NOCODE")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                  buildMode === "NOCODE"
                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm shadow-emerald-500/20"
                    : "bg-black/30 text-zinc-400 hover:text-emerald-300 border-white/5"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>⚡ 1-Prompt Only ({counts.noCode})</span>
              </button>
            </div>

            {/* Sort Order & Reset */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-zinc-900 text-zinc-300 text-xs border border-white/10 rounded-xl px-3 py-1.5 outline-none focus:border-brand-500 cursor-pointer"
              >
                <option value="popular">🔥 Trending / Most Popular</option>
                <option value="difficulty-asc">🟢 Mini First (Easy → Hard)</option>
                <option value="difficulty-desc">🔴 Major First (Hard → Easy)</option>
                <option value="name-asc">🔤 Alphabetical (A → Z)</option>
              </select>

              {isFilteringActive && (
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-brand-400 hover:text-brand-300 hover:bg-brand-500/10 rounded-lg transition-colors font-medium"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              )}
            </div>
          </div>

          {/* Active Filter Pills (if filtering) */}
          {isFilteringActive && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
              <span className="text-zinc-500 text-[11px]">Active filters:</span>
              {selectedCategory !== "ALL" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-brand-500/15 text-brand-300 border border-brand-500/30 text-[11px]">
                  {CATEGORIES.find((c) => c.id === selectedCategory)?.label || selectedCategory}
                  <button onClick={() => setSelectedCategory("ALL")} className="hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedSize !== "ALL" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-teal-500/15 text-teal-300 border border-teal-500/30 text-[11px]">
                  Size: {selectedSize}
                  <button onClick={() => setSelectedSize("ALL")} className="hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {buildMode === "NOCODE" && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[11px]">
                  Mode: 1-Prompt No Code
                  <button onClick={() => setBuildMode("ALL")} className="hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/10 text-white border border-white/20 text-[11px]">
                  Query: &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery("")} className="hover:text-white">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* ─── SEARCH / FILTER RESULTS ─── */}
        {isFilteringActive && (
          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-400" />
                Matching Projects ({filteredTopics.length})
              </h2>
              <span className="text-xs text-zinc-400">
                Showing {Math.min(visibleCount, filteredTopics.length)} of {filteredTopics.length} topics
              </span>
            </div>

            {filteredTopics.length === 0 ? (
              <div className="text-center py-16 text-zinc-400 glass-card rounded-2xl border border-white/5 p-8 space-y-4 max-w-xl mx-auto">
                <div className="w-12 h-12 rounded-full bg-zinc-800/80 border border-white/10 flex items-center justify-center mx-auto text-zinc-400">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-base font-bold text-white mb-1">
                    No matching project found for your criteria
                  </p>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Try clearing one of the filters or searching with a broader keyword (e.g. &quot;ai based&quot;, &quot;mini project&quot;, &quot;fraud&quot;).
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-bold inline-flex items-center gap-2 shadow-lg shadow-brand-500/20 transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset All Filters
                </button>

                {/* Suggestions fallback */}
                <div className="pt-6 border-t border-white/10 text-left space-y-3">
                  <p className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Recommended Trending Projects You Might Like:
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    {featured.slice(0, 3).map((f) => (
                      <Link
                        key={f.id}
                        href={`/blueprint/${f.id}`}
                        className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/90 border border-white/5 hover:border-brand-500/30 group transition-all"
                      >
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-brand-300">
                            {f.title}
                          </p>
                          <p className="text-[11px] text-zinc-500">{f.tagline}</p>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white shrink-0 ml-2" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredTopics.slice(0, visibleCount).map((topic) => (
                    <SubmitKitTopicCard key={topic.id} topic={topic} />
                  ))}
                </div>

                {visibleCount < filteredTopics.length && (
                  <div className="text-center pt-6">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 24)}
                      className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs inline-flex items-center gap-2 border border-white/10 shadow-lg transition-all hover:scale-105"
                    >
                      Show More Projects ({filteredTopics.length - visibleCount} remaining)
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* ─── TRENDING / FEATURED TOPICS (Default View) ─── */}
        {!isFilteringActive && featured.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-400 fill-orange-400" />
                <h2 className="text-xl font-display font-bold text-white">Trending Final Year Topics</h2>
              </div>
              <span className="text-xs text-zinc-500 font-medium">Most requested by students</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featured.map((topic) => (
                <SubmitKitTopicCard key={topic.id} topic={topic} featured={true} />
              ))}
            </div>
          </div>
        )}

        {/* ─── A-Z DIRECTORY (Default View) ─── */}
        {!isFilteringActive && (
          <div className="space-y-10 pt-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-display font-bold text-white">A-Z Topic Directory</h2>
              </div>
              <div className="flex flex-wrap gap-1.5 text-xs text-zinc-400">
                {letters.map((l) => (
                  <a
                    key={l}
                    href={`#letter-${l}`}
                    className="w-6 h-6 flex items-center justify-center rounded bg-zinc-900 border border-white/5 hover:border-brand-500 hover:text-white transition-colors font-mono"
                  >
                    {l}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-12">
              {letters.map((letter) => {
                const topics = getTopicsByLetter(letter);
                const isExpanded = expandedLetters.has(letter);
                const displayTopics = isExpanded ? topics : topics.slice(0, 6);
                return (
                  <div key={letter} id={`letter-${letter}`} className="space-y-4 scroll-mt-24">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-display font-black text-lg text-white">
                          {letter}
                        </span>
                        <div className="h-px w-16 md:w-32 bg-white/10"></div>
                        <span className="text-xs text-zinc-500">{topics.length} topics</span>
                      </div>
                      {topics.length > 6 && (
                        <button
                          onClick={() => toggleLetter(letter)}
                          className="text-xs text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1 transition-colors"
                        >
                          {isExpanded ? (
                            <>Show less (6 of {topics.length})</>
                          ) : (
                            <>View all {topics.length} <ArrowRight className="w-3 h-3" /></>
                          )}
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {displayTopics.map((topic) => (
                        <SubmitKitTopicCard key={topic.id} topic={topic} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── REQUEST A TOPIC CTA ── */}
            <div className="rounded-2xl border border-brand-500/25 bg-gradient-to-r from-brand-950/60 via-purple-950/40 to-zinc-950 p-8 text-center space-y-4 shadow-xl mt-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-500/20 text-brand-400 mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1.5 max-w-xl mx-auto">
                <h3 className="text-xl font-display font-bold text-white">Can't find your project topic?</h3>
                <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                  Tell us your topic and technical requirements. Our engineering team will craft a custom 20-page blueprint with Master Prompt within 24 hours.
                </p>
              </div>
              <a
                href={`https://wa.me/918799814256?text=${encodeURIComponent("Hi SubmitKit! I couldn't find my project topic in the blueprint catalog. I need a blueprint for: ")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold rounded-xl text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)]"
              >
                <MessageCircle className="w-4 h-4" /> Request a Custom Blueprint on WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SubmitKitTopicCard({ topic, featured = false }: { topic: TopicCard; featured?: boolean }) {
  const isNoCode = canBuildOnAntigravity(topic);
  const size = getProjectSize(topic);

  return (
    <Link
      href={`/blueprint/${topic.id}`}
      className={`glass-card flex flex-col group transition-all duration-300 hover:-translate-y-1 relative overflow-hidden rounded-2xl border p-5 bg-zinc-900/50 backdrop-blur-xl ${
        featured
          ? "border-orange-500/30 hover:border-orange-500/60 shadow-lg shadow-orange-500/5"
          : isNoCode
          ? "border-white/10 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10"
          : "border-white/5 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/5"
      }`}
    >
      <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-brand-500/20 bg-brand-500/10 text-brand-400 uppercase tracking-wider">
            {topic.category}
          </span>

          {/* Project Size Badge */}
          {size === "Mini" && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-300 border border-teal-500/25 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
              Mini (2-3d)
            </span>
          )}
          {size === "Mid" && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              Mid (3-5d)
            </span>
          )}
          {size === "Major" && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />
              Major Capstone
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {isNoCode ? (
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-emerald-400" /> 1-Prompt No-Code
            </span>
          ) : topic.category === "IoT" ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/15 text-sky-400 border border-sky-500/30 flex items-center gap-1">
              <Cpu className="w-2.5 h-2.5 text-sky-400" /> Hardware + Code
            </span>
          ) : topic.category === "Cybersecurity" ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center gap-1">
              <Lock className="w-2.5 h-2.5 text-rose-400" /> Security Blueprint
            </span>
          ) : topic.category === "Blockchain" ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/30 flex items-center gap-1">
              <Layers className="w-2.5 h-2.5 text-purple-400" /> Web3 Guide
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-white/10 flex items-center gap-1">
              <BookOpen className="w-2.5 h-2.5 text-zinc-400" /> Full Code Guide
            </span>
          )}
          {featured && (
            <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/25">
              <Flame className="w-3 h-3" /> HOT
            </span>
          )}
        </div>
      </div>

      <h3 className="text-base font-display font-bold text-white group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug mb-2">
        {topic.title}
      </h3>

      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4 flex-1">
        {topic.tagline}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
        {isNoCode ? (
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Make in 1 Prompt</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-zinc-400 font-medium text-xs">
            <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
            <span>Step-by-Step Code</span>
          </div>
        )}

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-400 group-hover:translate-x-0.5 transition-transform">
          Free Preview <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}
