'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ChevronRight, ExternalLink, AlertTriangle, CheckCircle2, XCircle, ArrowUpRight, TrendingUp, ShieldCheck } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Page Header (Not sticky, to avoid global navbar overlap) */}
      <header className="border-b border-zinc-800 bg-black/50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="font-bold text-white text-lg tracking-tight">Benchmark Results</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={data.repo_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors bg-zinc-900 px-4 py-1.5 rounded-full border border-zinc-800">
              <GithubIcon className="w-4 h-4" />
              <span className="text-sm font-medium">{data.repo_owner}/{data.repo_name}</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
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
            <p className="text-2xl leading-relaxed font-light text-zinc-100">
              {data.honest_verdict}
            </p>
            
            <div className="mt-8 flex items-center gap-4 border-t border-zinc-800 pt-6">
              <div className="flex-1">
                <div className="text-sm text-zinc-500 mb-1">Analyzed Commit</div>
                <div className="font-mono text-zinc-300">{data.commit_sha.substring(0, 7)}</div>
              </div>
              {data.score_delta !== null && (
                <div className="flex-1 border-l border-zinc-800 pl-4">
                  <div className="text-sm text-zinc-500 mb-1">Progress vs Last Run</div>
                  <div className={`flex items-center gap-1 font-bold ${data.score_delta > 0 ? 'text-green-500' : 'text-zinc-300'}`}>
                    {data.score_delta > 0 ? <TrendingUp className="w-4 h-4" /> : null}
                    {data.score_delta > 0 ? '+' : ''}{data.score_delta} pts
                  </div>
                </div>
              )}
              <div className="flex-1 border-l border-zinc-800 pl-4">
                <button 
                  onClick={() => router.push('/project-benchmark')}
                  className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors"
                >
                  Re-Benchmark
                </button>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Next Best Improvements */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-12">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <TrendingUp className="w-6 h-6 text-blue-500" />
            Top 3 Actions to Improve
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.top_improvements.map((imp: Improvement, idx: number) => (
              <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-blue-500/50 transition-colors group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded border ${imp.impact === 'VERY HIGH' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-zinc-800 text-zinc-400 border-zinc-700'}`}>
                    {imp.impact} IMPACT
                  </span>
                </div>
                <h4 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">{imp.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">{imp.why}</p>
              </div>
            ))}
            {data.top_improvements.length === 0 && (
              <div className="md:col-span-3 text-center py-12 bg-zinc-900 rounded-2xl border border-zinc-800 text-zinc-500">
                You've reached peak maturity for this category. Incredible work!
              </div>
            )}
          </div>
        </motion.div>

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
