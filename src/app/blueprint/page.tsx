"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Clock, Zap, Star, AlertTriangle, BookOpen, ShieldCheck } from "lucide-react";
import { ALL_TOPICS, getFeaturedTopics, getAllLetters, getTopicsByLetter, searchTopics, TopicCard } from "@/lib/blueprint-engine";

export default function BlueprintBrowserPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const featured = getFeaturedTopics();
  const letters = getAllLetters();
  
  const searchResults = searchQuery ? searchTopics(searchQuery) : [];

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Hero Section */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 font-medium text-sm border border-blue-500/20">
            <BookOpen className="w-4 h-4" />
            Project Blueprint Generator
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Choose Your Project. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Get the Complete Build Plan.
            </span>
          </h1>
          <p className="text-lg text-slate-400">
            Pick from 120+ trending software topics. Understand what it is instantly. Unlock the 20-page step-by-step PDF blueprint for just ₹19.
          </p>
          
          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto mt-8">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-4 bg-[#111827] border border-slate-700 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-xl"
              placeholder="Search topics (e.g., Face Recognition, Chatbot, Prediction...)"
            />
          </div>
        </div>

        {/* Search Results */}
        {searchQuery && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-slate-800 pb-2">
              Search Results for "{searchQuery}"
            </h2>
            {searchResults.length === 0 ? (
              <div className="text-center py-12 text-slate-400 bg-[#111827] rounded-2xl border border-slate-800">
                No projects found. Try different keywords.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map(topic => <TopicCardComponent key={topic.id} topic={topic} />)}
              </div>
            )}
          </div>
        )}

        {/* Featured / Trending Topics */}
        {!searchQuery && featured.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold">Trending Right Now</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map((topic) => (
                <TopicCardComponent key={topic.id} topic={topic} featured />
              ))}
            </div>
          </div>
        )}

        {/* A-Z Directory */}
        {!searchQuery && (
          <div className="space-y-12 pt-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              <h2 className="text-2xl font-bold">A-Z Topic Directory</h2>
            </div>
            
            <div className="space-y-16">
              {letters.map((letter) => {
                const topics = getTopicsByLetter(letter);
                return (
                  <div key={letter} id={`letter-${letter}`} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <h3 className="text-3xl font-black text-slate-700">{letter}</h3>
                      <div className="h-px bg-slate-800 flex-1"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {topics.map((topic) => (
                        <TopicCardComponent key={topic.id} topic={topic} />
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

function TopicCardComponent({ topic, featured = false }: { topic: TopicCard; featured?: boolean }) {
  return (
    <Link 
      href={`/blueprint/${topic.id}`}
      className={`group block bg-[#111827] rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
        featured 
          ? "border-orange-500/50 hover:border-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.1)]" 
          : "border-slate-800 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5"
      }`}
    >
      <div className="p-6 space-y-4">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
              {topic.category}
            </span>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
              {topic.title}
            </h3>
          </div>
          {featured && (
            <span className="shrink-0 px-2.5 py-1 text-xs font-bold bg-orange-500/20 text-orange-400 rounded border border-orange-500/20 flex items-center gap-1">
              🔥 HOT
            </span>
          )}
        </div>
        
        <p className="text-sm text-slate-400 line-clamp-2">
          {topic.tagline}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            {topic.buildTimeDays}
          </div>
          <div className="flex items-center gap-1 text-xs font-medium text-amber-400">
            Difficulty: {Array(topic.difficulty).fill("★").join("")}
          </div>
        </div>
      </div>
    </Link>
  );
}
