"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Clock, Zap, Star, BookOpen, ShieldCheck, ArrowRight, Flame, Layers } from "lucide-react";
import { ALL_TOPICS, getFeaturedTopics, getAllLetters, getTopicsByLetter, searchTopics, TopicCard, BlueprintCategory } from "@/lib/blueprint-engine";

const CATEGORIES: { id: string; label: string }[] = [
  { id: "ALL", label: "All Topics" },
  { id: "STARTUPS", label: "🚀 Startup Ideas" },
  { id: "AIML", label: "AI / ML" },
  { id: "FullStack", label: "Full Stack" },
  { id: "Cybersecurity", label: "Cybersecurity" },
  { id: "DataScience", label: "Data Science" },
  { id: "NLP", label: "NLP" },
  { id: "IoT", label: "IoT" },
  { id: "Blockchain", label: "Blockchain" },
  { id: "Mobile", label: "Mobile Apps" },
  { id: "Fintech", label: "Fintech" },
];

export default function BlueprintBrowserPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const letters = getAllLetters();

  const filteredTopics = useMemo(() => {
    let list = ALL_TOPICS;
    if (selectedCategory === "STARTUPS") {
      list = list.filter(
        (t) =>
          t.id.startsWith("startup-") ||
          t.title.toLowerCase().includes("startup") ||
          t.tagline.toLowerCase().includes("startup")
      );
    } else if (selectedCategory !== "ALL") {
      list = list.filter((t) => t.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.whatItDoes.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [searchQuery, selectedCategory]);

  const featured = useMemo(() => getFeaturedTopics(), []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#09090b] text-white">
      {/* Background glow orbs matching SubmitKit */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="glow-orb w-[750px] h-[750px] bg-brand-500/10 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="glow-orb w-[600px] h-[600px] bg-emerald-500/8 bottom-10 right-10" />
      </div>

      <div className="container mx-auto px-4 py-16 max-w-6xl space-y-14 relative z-10">
        {/* Hero Section */}
        <div className="text-center space-y-5 max-w-3xl mx-auto pt-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-400 font-bold text-xs border border-brand-500/25 tracking-wide uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            Project Blueprint Generator
          </div>

          <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight text-white leading-tight">
            Choose Your Project. <br />
            <span className="text-gradient font-extrabold">
              Get the Complete Build Plan.
            </span>
          </h1>

          <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Pick from 1000+ curated trending engineering topics. Understand what your examiner expects for free. Unlock the complete step-by-step build guide, dataset links, and viva answers for just <span className="text-white font-semibold">₹19</span>.
          </p>

          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto pt-4">
            <div className="relative flex items-center bg-zinc-900/80 border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl focus-within:border-brand-500 focus-within:ring-4 focus-within:ring-brand-500/20 transition-all">
              <Search className="h-5 w-5 text-zinc-500 ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none text-white px-3 py-2.5 outline-none text-sm placeholder:text-zinc-500"
                placeholder="Search topics (e.g., Face Recognition, Plant Disease, Fraud Detection, IoT...)"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white bg-white/5 rounded-lg mr-2"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? "bg-white text-zinc-950 shadow-md shadow-white/10 font-bold"
                      : "bg-zinc-900/60 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/5"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Search / Filter Results */}
        {(searchQuery || selectedCategory !== "ALL") && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h2 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-brand-400" />
                Matching Topics ({filteredTopics.length})
              </h2>
              <span className="text-xs text-zinc-500">Click any card to read free preview</span>
            </div>

            {filteredTopics.length === 0 ? (
              <div className="text-center py-16 text-zinc-400 glass-card rounded-2xl border border-white/5 p-8">
                <p className="text-base font-medium text-white mb-1">No matching project found</p>
                <p className="text-xs text-zinc-500 mb-4">Try searching with a broader keyword or browse all categories.</p>
                <button
                  onClick={() => { setSearchQuery(""); setSelectedCategory("ALL"); }}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold"
                >
                  Reset Search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTopics.map((topic) => (
                  <SubmitKitTopicCard key={topic.id} topic={topic} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Featured / Trending Topics */}
        {!searchQuery && selectedCategory === "ALL" && featured.length > 0 && (
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

        {/* A-Z Directory */}
        {!searchQuery && selectedCategory === "ALL" && (
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
                return (
                  <div key={letter} id={`letter-${letter}`} className="space-y-4 scroll-mt-24">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-display font-black text-lg text-white">
                        {letter}
                      </span>
                      <div className="h-px bg-white/10 flex-1"></div>
                      <span className="text-xs text-zinc-500">{topics.length} topics</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {topics.map((topic) => (
                        <SubmitKitTopicCard key={topic.id} topic={topic} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SubmitKitTopicCard({ topic, featured = false }: { topic: TopicCard; featured?: boolean }) {
  return (
    <Link
      href={`/blueprint/${topic.id}`}
      className={`glass-card flex flex-col group transition-all duration-300 hover:-translate-y-1 relative overflow-hidden rounded-2xl border p-5 bg-zinc-900/50 backdrop-blur-xl ${
        featured
          ? "border-orange-500/30 hover:border-orange-500/60 shadow-lg shadow-orange-500/5"
          : "border-white/5 hover:border-brand-500/40 hover:shadow-xl hover:shadow-brand-500/5"
      }`}
    >
      <div className="flex justify-between items-start gap-2 mb-3">
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-brand-500/20 bg-brand-500/10 text-brand-400 uppercase tracking-wider">
          {topic.category}
        </span>

        {featured && (
          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/25">
            <Flame className="w-3 h-3" /> HOT
          </span>
        )}
      </div>

      <h3 className="text-base font-display font-bold text-white group-hover:text-brand-400 transition-colors line-clamp-2 leading-snug mb-2">
        {topic.title}
      </h3>

      <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4 flex-1">
        {topic.tagline}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
        <div className="flex items-center gap-1.5 text-zinc-500">
          <Clock className="w-3.5 h-3.5 text-zinc-400" />
          <span>{topic.buildTimeDays}</span>
        </div>

        <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-400 group-hover:translate-x-0.5 transition-transform">
          Free Preview <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}
