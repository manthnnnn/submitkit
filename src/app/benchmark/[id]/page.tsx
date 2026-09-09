'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, TrendingUp, AlertTriangle, ShieldCheck, CheckCircle2, Search, Lock, Code2, Rocket, Building2, ExternalLink, Share2, Copy, Trophy, BadgeCheck } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
import { Logo } from '@/components/ui/logo';
import { BenchmarkRun, Capability, Improvement, DimensionScore } from '@/lib/benchmark/types';

export default function BenchmarkResultPage() {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<BenchmarkRun | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [percentile, setPercentile] = useState<number | null>(null);
  const [avgScore, setAvgScore] = useState<number | null>(null);
  const [totalScans, setTotalScans] = useState<number>(0);
  const [copied, setCopied] = useState('');
  const [showBadge, setShowBadge] = useState(false);

  useEffect(() => {
    const fetchBenchmark = async () => {
      try {
        const res = await fetch(`/api/benchmark/${id}`);
        if (!res.ok) throw new Error('Benchmark not found');
        const json = await res.json();
        setData(json.benchmark);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBenchmark();
  }, [id]);

  // Fetch leaderboard percentile
  useEffect(() => {
    if (!data) return;
    const fetchPercentile = async () => {
      try {
        const res = await fetch(`/api/benchmark/leaderboard?category=${data.category}&score=${data.score}`);
        if (res.ok) {
          const json = await res.json();
          setPercentile(json.percentile);
          setAvgScore(json.avgScore);
          setTotalScans(json.totalScans);
        }
      } catch (e) { /* ignore */ }
    };
    fetchPercentile();
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Benchmark Not Found</h2>
        <p className="text-zinc-400">{error}</p>
        <button onClick={() => router.push('/project-benchmark')} className="mt-8 bg-zinc-800 px-6 py-2 rounded-lg">Go Back</button>
      </div>
    );
  }

  const getMaturityColor = (level: number) => {
    if (level >= 5) return 'text-green-400 bg-green-400/10 border-green-400/20';
    if (level >= 3) return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
  };

  const siteUrl = typeof window !== 'undefined' ? window.location.origin : 'https://submitkit.in';
  const benchmarkUrl = `${siteUrl}/benchmark/${id}`;
  const badgeMarkdown = `[![SubmitKit Score](${siteUrl}/api/badge/${id})](${benchmarkUrl})`;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const shareOnTwitter = () => {
    const text = `My project scored ${data!.score}/100 on SubmitKit Benchmark! Level ${data!.maturity_level} — ${data!.classification_title}. Check your project's potential:`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(benchmarkUrl)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(benchmarkUrl)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Page Header */}
      <header className="border-b border-zinc-800 bg-black/50">
        <div className="container mx-auto px-4 py-4 sm:py-0 sm:h-16 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zinc-400 w-full sm:w-auto justify-between sm:justify-start">
            <span className="font-bold text-white text-lg tracking-tight">Benchmark Results</span>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0">
            <button onClick={() => handleCopy(benchmarkUrl, 'link')} className="whitespace-nowrap flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800 text-sm">
              {copied === 'link' ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied === 'link' ? 'Copied!' : 'Copy Link'}
            </button>
            <a href={data.repo_url} target="_blank" rel="noreferrer" className="whitespace-nowrap flex items-center gap-2 text-zinc-400 hover:text-white transition-colors bg-zinc-900 px-4 py-1.5 rounded-full border border-zinc-800">
              <GithubIcon className="w-4 h-4 shrink-0" />
              <span className="text-sm font-medium">{data.repo_owner}/{data.repo_name}</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1 shrink-0" />
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Top Section: Score & Verdict */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-1 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
            
            <div className={`px-4 py-1 rounded-full border text-sm font-semibold mb-6 ${getMaturityColor(data.maturity_level)}`}>
              Level {data.maturity_level} Maturity
            </div>

            <div className="relative">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle cx="80" cy="80" r="70" className="stroke-zinc-800 fill-none" strokeWidth="8" />
                <circle 
                  cx="80" cy="80" r="70" 
                  className="stroke-blue-500 fill-none transition-all duration-1000 ease-out" 
                  strokeWidth="8"
                  strokeDasharray="440"
                  strokeDashoffset={440 - (440 * data.score) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold">{data.score}</span>
                <span className="text-zinc-500 text-sm">/ 100</span>
              </div>
            </div>
            
            <h2 className="mt-6 font-bold text-xl">{data.classification_title}</h2>
            <p className="text-zinc-500 text-sm mt-1">Classification Confidence: {data.category_confidence}%</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col justify-center"
          >
            <h3 className="text-lg font-semibold text-zinc-400 mb-4 uppercase tracking-wider text-sm">The Honest Verdict</h3>
            <p className="text-2xl leading-relaxed font-light text-zinc-100 whitespace-pre-wrap">
              {data.honest_verdict}
            </p>
            
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-4 border-t border-zinc-800 pt-6">
              <div className="flex-1">
                <div className="text-sm text-zinc-500 mb-1">Analyzed Commit</div>
                <div className="font-mono text-zinc-300">{data.commit_sha.substring(0, 7)}</div>
              </div>
              {data.score_delta !== null && (
                <div className="flex-1 sm:border-l border-zinc-800 sm:pl-4">
                  <div className="text-sm text-zinc-500 mb-1">Progress vs Last Run</div>
                  <div className={`flex items-center gap-1 font-bold ${data.score_delta > 0 ? 'text-green-500' : 'text-zinc-300'}`}>
                    {data.score_delta > 0 ? <TrendingUp className="w-4 h-4" /> : null}
                    {data.score_delta > 0 ? '+' : ''}{data.score_delta} pts
                  </div>
                </div>
              )}
              <div className="flex-1 sm:border-l border-zinc-800 sm:pl-4 mt-2 sm:mt-0">
                <button 
                  onClick={() => router.push('/project-benchmark')}
                  className="w-full sm:w-auto bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors"
                >
                  Re-Benchmark
                </button>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Leaderboard + Share + Badge Row */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Category Percentile */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex items-center gap-4">
            <div className="w-12 h-12 shrink-0 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              {percentile !== null ? (
                <>
                  <div className="text-2xl font-bold text-white">Top {percentile}%</div>
                  <div className="text-zinc-500 text-xs">of {totalScans} {data.category.replace('_', ' ')} projects scanned (avg: {avgScore})</div>
                </>
              ) : (
                <>
                  <div className="text-lg font-bold text-white">First in category!</div>
                  <div className="text-zinc-500 text-xs">Be the first {data.category.replace('_', ' ')} project benchmarked</div>
                </>
              )}
            </div>
          </div>

          {/* Share Buttons */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Share Your Score</div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button onClick={shareOnTwitter} className="flex-1 flex items-center justify-center gap-2 bg-[#1DA1F2]/10 text-[#1DA1F2] border border-[#1DA1F2]/20 px-3 py-2.5 sm:py-2 rounded-lg text-sm font-medium hover:bg-[#1DA1F2]/20 transition-colors">
                <span className="text-base">𝕏</span> Tweet
              </button>
              <button onClick={shareOnLinkedIn} className="flex-1 flex items-center justify-center gap-2 bg-[#0A66C2]/10 text-[#0A66C2] border border-[#0A66C2]/20 px-3 py-2.5 sm:py-2 rounded-lg text-sm font-medium hover:bg-[#0A66C2]/20 transition-colors">
                <Share2 className="w-4 h-4" /> LinkedIn
              </button>
              <button onClick={() => handleCopy(benchmarkUrl, 'url')} className="flex-1 flex items-center justify-center gap-2 bg-zinc-800 text-zinc-300 px-3 py-2.5 sm:py-2 rounded-lg text-sm font-medium hover:bg-zinc-700 transition-colors">
                {copied === 'url' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copied === 'url' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* GitHub Badge */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 flex items-center justify-between">
              GitHub README Badge
              <button onClick={() => setShowBadge(!showBadge)} className="text-blue-400 hover:text-blue-300 text-[10px] uppercase">
                {showBadge ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="flex items-center gap-3 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/api/badge/${id}`} alt="SubmitKit Badge" className="h-5" />
              <span className="text-zinc-500 text-xs">← This appears in your README</span>
            </div>
            {showBadge && (
              <div className="relative">
                <pre className="bg-black border border-zinc-800 rounded-lg p-3 text-xs text-zinc-400 overflow-x-auto">
                  {badgeMarkdown}
                </pre>
                <button 
                  onClick={() => handleCopy(badgeMarkdown, 'badge')}
                  className="absolute top-2 right-2 bg-zinc-800 p-1.5 rounded-md hover:bg-zinc-700 transition-colors"
                >
                  {copied === 'badge' ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                </button>
              </div>
            )}
          </div>

        </motion.div>

        {/* Next Best Improvements */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            Actionable Improvements
          </h3>

          {/* Total Effort Summary Bar */}
          {data.top_improvements.length > 0 && data.top_improvements.some(i => i.estimatedHours) && (() => {
            const totalHours = data.top_improvements.reduce((sum, imp) => sum + (imp.estimatedHours || 0), 0);
            return (
              <div className="mb-8 bg-zinc-950 border border-blue-500/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
                <div className="relative z-10">
                  <div className="text-zinc-400 text-sm mb-2">To bring your project to Level 5 (Production Ready):</div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {[...Array(10)].map((_, i) => (
                        <div key={i} className={`h-2 w-3 rounded-full ${i < 7 ? 'bg-orange-500' : 'bg-zinc-800'}`} />
                      ))}
                    </div>
                    <span className="text-white font-bold">~{totalHours} - {totalHours + Math.floor(totalHours * 0.5)} hours</span>
                    <span className="text-zinc-500 text-sm">of manual work</span>
                  </div>
                </div>
                <div className="relative z-10 flex flex-col items-center md:items-end text-center md:text-right">
                  <div className="text-zinc-500 text-sm mb-2">— OR — get a pre-built bundle in 5 minutes</div>
                  <button onClick={() => window.open('https://submitkit.in/projects', '_blank')} className="bg-white text-black px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2">
                    Browse Bundles <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })()}

          <div 
            className="grid gap-6"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
          >
            {data.top_improvements.map((imp: Improvement, idx: number) => (
              <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-2xl flex flex-col hover:border-blue-500/50 transition-colors group overflow-hidden">
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold shrink-0">
                        {idx + 1}
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded border ${imp.impact === 'VERY HIGH' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : imp.impact === 'HIGH' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>
                        {imp.impact} IMPACT
                      </span>
                    </div>
                    {imp.estimatedHours && (
                      <span className="text-zinc-500 text-xs font-medium flex items-center gap-1 bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                        ⏱ ~{imp.estimatedHours}h
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">{imp.title}</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">{imp.why}</p>
                  
                  {imp.freeTool && (
                    <div className="mt-auto border border-zinc-800 rounded-xl overflow-hidden">
                      <div className="bg-zinc-950 px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wider border-b border-zinc-800 flex justify-between items-center">
                        <span>Free Tool to use</span>
                        <a href={imp.freeTool.url} target="_blank" rel="noreferrer" className="text-blue-400 hover:text-blue-300 flex items-center gap-1">Docs <ExternalLink className="w-3 h-3" /></a>
                      </div>
                      <div className="p-3 bg-zinc-900/50 flex flex-col gap-2">
                        <div className="font-bold text-sm text-zinc-200">{imp.freeTool.name}</div>
                        <div className="font-mono text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded w-fit select-all border border-blue-500/20">
                          {imp.freeTool.badge}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {imp.submitkitNote && (
                  <div className="bg-gradient-to-r from-blue-500/10 to-transparent border-t border-blue-500/20 px-6 py-4 flex items-start gap-3">
                    <span className="text-blue-400 mt-0.5">✨</span>
                    <p className="text-sm text-blue-200/80 font-medium leading-relaxed">
                      {imp.submitkitNote}
                    </p>
                  </div>
                )}
              </div>
            ))}
            {data.top_improvements.length === 0 && (
              <div className="md:col-span-3 text-center py-12 bg-zinc-900 rounded-2xl border border-zinc-800 text-zinc-500">
                You've reached peak maturity for this category. Incredible work!
              </div>
            )}
          </div>
        </motion.div>

        {/* ULTRA DEEP: Production Level Analysis */}
        {data.production_analysis && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Building2 className="w-6 h-6 text-indigo-500" />
              Production Level Analysis (Customer Focus)
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left col: Customer Hooks */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-zinc-950 border border-indigo-500/20 rounded-3xl p-6 relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
                  <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-6">Features to Grab Customers</h4>
                  <div className="space-y-4 relative z-10">
                    {data.production_analysis.customerHooks?.map((hook: any, idx: number) => (
                      <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                        <h5 className="text-lg font-bold text-white mb-2">{hook.feature}</h5>
                        <p className="text-zinc-400 text-sm mb-4">{hook.valueProposition}</p>
                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-3">
                          <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1">Marketing Angle</div>
                          <p className="text-indigo-200/90 text-xs font-medium">{hook.howToMarket}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right col: Readiness & Bottlenecks */}
              <div className="space-y-6">
                <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
                  <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Enterprise Readiness</h4>
                  <div className="flex items-center gap-3">
                    <span className={`px-4 py-2 rounded-xl text-sm font-bold border ${
                      data.production_analysis.enterpriseReadiness === 'PRODUCTION_READY' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      data.production_analysis.enterpriseReadiness === 'SCALABLE' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                      'bg-orange-500/10 text-orange-400 border-orange-500/20'
                    }`}>
                      {data.production_analysis.enterpriseReadiness.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
                  <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Scalability Bottlenecks</h4>
                  <div className="space-y-4">
                    {data.production_analysis.scalabilityBottlenecks?.map((neck: any, idx: number) => (
                      <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                        <div className="text-sm font-bold text-red-400 mb-1">{neck.component}</div>
                        <p className="text-zinc-500 text-xs mb-2">{neck.risk}</p>
                        <div className="text-emerald-400 text-xs border-t border-zinc-800 pt-2">
                          <span className="font-semibold text-zinc-400">Fix:</span> {neck.solution}
                        </div>
                      </div>
                    ))}
                    {(!data.production_analysis.scalabilityBottlenecks || data.production_analysis.scalabilityBottlenecks.length === 0) && (
                      <div className="text-zinc-500 text-sm italic">
                        No major architectural bottlenecks detected.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ULTRA DEEP: Security & Quality Grid */}
        {(data.security_audit || data.code_quality) && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Security Audit */}
            {data.security_audit && (
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Lock className="w-5 h-5 text-red-400" />
                  Security Vulnerability Scan
                </h3>
                <div className="mb-6 flex items-center justify-between p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                  <span className="text-zinc-400 text-sm">Overall Risk Level</span>
                  <span className={`font-bold px-3 py-1 rounded-md text-sm ${
                    data.security_audit.overallRisk === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                    data.security_audit.overallRisk === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {data.security_audit.overallRisk}
                  </span>
                </div>
                <div className="space-y-3 relative z-10">
                  {data.security_audit.vulnerabilities?.map((vuln: any, idx: number) => (
                    <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className={`w-4 h-4 ${vuln.severity === 'CRITICAL' ? 'text-red-500' : 'text-orange-500'}`} />
                        <span className="font-bold text-zinc-200 text-sm">{vuln.issue}</span>
                      </div>
                      <p className="text-zinc-500 text-xs pl-6">Fix: {vuln.fix}</p>
                    </div>
                  ))}
                  {(!data.security_audit.vulnerabilities || data.security_audit.vulnerabilities.length === 0) && (
                    <div className="text-center py-6 text-zinc-500 text-sm border border-dashed border-zinc-800 rounded-xl">
                      No critical vulnerabilities detected based on static capabilities.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Code Quality */}
            {data.code_quality && (
              <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  Code Quality Metrics
                </h3>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <div className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">Architecture</div>
                    <div className="text-white text-sm font-bold truncate">{data.code_quality.architecturePattern}</div>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <div className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">Maintainability</div>
                    <div className="text-white text-lg font-bold">{data.code_quality.maintainabilityScore} <span className="text-zinc-500 text-xs">/ 100</span></div>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <div className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">Complexity</div>
                    <div className="text-white text-sm font-bold">{data.code_quality.cyclomaticComplexityEst}</div>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <div className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-1">Duplicate Code</div>
                    <div className="text-white text-sm font-bold">{data.code_quality.duplicateCodeProbability}</div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ULTRA DEEP: Startup Potential */}
        {(data.startup_potential || data.real_world_comparison) && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-12">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Rocket className="w-6 h-6 text-purple-500" />
              Startup Potential & Real-World Readiness
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {data.startup_potential && (
                <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-3xl p-6 md:p-8">
                  <h4 className="text-sm font-bold text-purple-400 uppercase tracking-wider mb-6">Commercial Viability</h4>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="text-zinc-400 text-sm mb-1">Investor Pitch (One-Liner)</div>
                      <div className="text-white font-medium text-lg leading-snug">"{data.startup_potential.pitchOneLiner}"</div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className={`px-4 py-2 rounded-lg font-bold text-sm ${data.startup_potential.monetizable ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-400'}`}>
                        {data.startup_potential.monetizable ? '💰 Monetizable' : '🚫 Not Yet Monetizable'}
                      </div>
                      <div className="px-4 py-2 rounded-lg font-bold text-sm bg-zinc-800 text-zinc-300">
                        Audience: {data.startup_potential.targetAudience}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {data.real_world_comparison && (
                <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6 md:p-8">
                  <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> Industry Comparison
                  </h4>
                  
                  <div className="flex items-end gap-3 mb-6">
                    <div className="text-4xl font-display font-bold text-white">{data.score}</div>
                    <div className="text-zinc-500 font-medium mb-1 flex items-center gap-2">
                      vs <span className="text-white">{data.real_world_comparison.industryStandardScore}</span> (Industry Std)
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm font-medium text-zinc-400 mb-2">Comparable to:</div>
                    <div className="text-white font-semibold bg-white/5 border border-white/10 px-4 py-2 rounded-lg inline-block">
                      {data.real_world_comparison.comparableRealProject}
                    </div>
                  </div>

                  {data.real_world_comparison.missingProductionFeatures?.length > 0 && (
                    <div>
                      <div className="text-sm font-medium text-zinc-400 mb-2">Missing Production Features:</div>
                      <ul className="space-y-2">
                        {data.real_world_comparison.missingProductionFeatures.map((feat: string, idx: number) => (
                          <li key={idx} className="text-red-400 text-sm flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" /> {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

            </div>
          </motion.div>
        )}

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-500" />
              Deep Code Extraction & Verification
            </h3>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              {data.capabilities.map((cap: Capability, idx: number) => (
                <div key={idx} className={`p-4 flex items-start gap-4 border-b border-zinc-800/50 last:border-0 ${cap.status === '❌' ? 'bg-red-500/5' : ''}`}>
                  <div className="mt-1 text-xl">{cap.status}</div>
                  <div>
                    <h5 className="font-semibold">{cap.name}</h5>
                    <p className="text-sm text-zinc-400 mt-1">{cap.evidence}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-zinc-600 mt-4 px-2">
              ✅ Detected · ❌ README Hallucination · ⚪ Not Detected / Not Claimed
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <h3 className="text-xl font-bold mb-6">Dimension Scores</h3>
            <div className="space-y-4">
              {data.dimension_scores.map((dim: DimensionScore, idx: number) => {
                if (dim.maxScore === 0) return null; // Skip N/A categories
                const pct = (dim.score / dim.maxScore) * 100;
                return (
                  <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-medium text-sm text-zinc-300">{dim.name}</span>
                      <span className="text-sm font-bold">{dim.score} <span className="text-zinc-600">/ {dim.maxScore}</span></span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${pct > 80 ? 'bg-green-500' : pct > 40 ? 'bg-blue-500' : 'bg-orange-500'}`} 
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

        </div>

      </main>
    </div>
  );
}
