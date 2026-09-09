'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, CheckCircle2, Circle, ShieldCheck, HelpCircle, Database, Lock, FileText, Zap } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

function BenchmarkContent() {
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [loadingPhase, setLoadingPhase] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Score Estimator State
  const [showQuiz, setShowQuiz] = useState(true);
  const [answers, setAnswers] = useState({
    db: null as boolean | null,
    auth: null as boolean | null,
    readme: null as boolean | null,
  });
  const [estimatedScore, setEstimatedScore] = useState<[number, number] | null>(null);

  useEffect(() => {
    const urlParam = searchParams.get('url');
    if (urlParam && urlParam.includes('github.com') && !isAnalyzing) {
      setShowQuiz(false); // Bypass quiz if came from homepage
      setRepoUrl(urlParam);
      const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
      handleBenchmark(syntheticEvent, urlParam);
    }
  }, [searchParams]);

  // Calculate score estimate when all answers are filled
  useEffect(() => {
    if (answers.db !== null && answers.auth !== null && answers.readme !== null) {
      let min = 20;
      let max = 40;
      
      if (answers.db) { min += 15; max += 15; }
      if (answers.auth) { min += 15; max += 15; }
      if (answers.readme) { min += 10; max += 15; }

      // Randomize slightly for psychological realism
      min += Math.floor(Math.random() * 5);
      max += Math.floor(Math.random() * 5);

      setTimeout(() => setEstimatedScore([min, Math.min(100, max)]), 600);
    }
  }, [answers]);

  const loadingPhases = [
    { text: 'Cloning repository securely...', delay: 0 },
    { text: 'Woah, interesting structure! Extracting dependencies...', delay: 3000 },
    { text: 'Scanning heuristics & evaluating complexity...', delay: 8000 },
    { text: 'This is actually pretty impressive. Cross-referencing README...', delay: 14000 },
    { text: 'Unlocking hidden potential... Calculating final maturity...', delay: 20000 },
    { text: 'Almost there! Preparing your comprehensive benchmark report...', delay: 26000 },
  ];

  const handleBenchmark = async (e: React.FormEvent, directUrl?: string) => {
    e.preventDefault();
    const targetUrl = directUrl || repoUrl;

    if (!targetUrl.includes('github.com')) {
      setError('Please enter a valid GitHub repository URL');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    
    const timers = loadingPhases.map((phase, i) => 
      setTimeout(() => setLoadingPhase(i), phase.delay)
    );

    try {
      const res = await fetch('/api/benchmark/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl: targetUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze repository');
      }

      setTimeout(() => {
        router.push(`/benchmark/${data.benchmarkId}`);
      }, 1000);

    } catch (err: any) {
      setError(err.message);
      setIsAnalyzing(false);
    } finally {
      timers.forEach(clearTimeout);
    }
  };

  const setAnswer = (key: keyof typeof answers, value: boolean) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <main className="container mx-auto px-4 py-16 md:py-24 relative z-10 max-w-4xl flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-sm text-zinc-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Deterministic Repository Intelligence Layer
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent leading-[1.1]">
            We don't flatter your project. <br className="hidden md:block"/>
            We <span className="text-white">benchmark</span> it.
          </h1>
          
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Get a brutally honest, evidence-backed assessment of your code. 
            Discover your exact maturity level and the gaps preventing you from reaching production grade.
          </p>
        </motion.div>

        {isAnalyzing ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-lg bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex flex-col items-center mb-8">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
              <h3 className="text-xl font-bold">Benchmarking Engine Active</h3>
              <p className="text-zinc-400 text-sm text-center mt-2">
                Running static analysis in isolated sandbox. Please wait...
              </p>
            </div>

            <div className="space-y-4">
              {loadingPhases.map((phase, idx) => {
                const isActive = idx === loadingPhase;
                const isPast = idx < loadingPhase;
                return (
                  <div key={idx} className={`flex items-center gap-3 transition-opacity duration-300 ${!isPast && !isActive ? 'opacity-30' : 'opacity-100'}`}>
                    {isPast ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : isActive ? (
                      <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                    ) : (
                      <Circle className="w-5 h-5 text-zinc-600" />
                    )}
                    <span className={`text-sm ${isActive ? 'text-white font-medium' : 'text-zinc-400'}`}>
                      {phase.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <div className="w-full max-w-2xl flex flex-col items-center w-full">
            
            {/* SCORE ESTIMATOR QUIZ */}
            <AnimatePresence>
              {showQuiz && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, height: 0 }}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 blur-3xl -translate-y-1/2 translate-x-1/3" />
                  
                  {!estimatedScore ? (
                    <>
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <HelpCircle className="w-5 h-5 text-blue-400" /> Pre-Scan Estimator
                      </h3>
                      
                      <div className="space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-zinc-800 rounded-lg"><Database className="w-4 h-4 text-emerald-400" /></div>
                            <span className="text-sm font-medium">Does your project connect to a database?</span>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setAnswer('db', true)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${answers.db === true ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>Yes</button>
                            <button onClick={() => setAnswer('db', false)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${answers.db === false ? 'bg-zinc-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>No</button>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-zinc-800 rounded-lg"><Lock className="w-4 h-4 text-purple-400" /></div>
                            <span className="text-sm font-medium">Does it have user authentication?</span>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setAnswer('auth', true)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${answers.auth === true ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>Yes</button>
                            <button onClick={() => setAnswer('auth', false)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${answers.auth === false ? 'bg-zinc-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>No</button>
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-zinc-800 rounded-lg"><FileText className="w-4 h-4 text-amber-400" /></div>
                            <span className="text-sm font-medium">Do you have a detailed README file?</span>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setAnswer('readme', true)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${answers.readme === true ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>Yes</button>
                            <button onClick={() => setAnswer('readme', false)} className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${answers.readme === false ? 'bg-zinc-600 text-white' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'}`}>No</button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6"
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold mb-4 uppercase tracking-wider">
                        <Zap className="w-3.5 h-3.5" /> Estimate Ready
                      </div>
                      <h3 className="text-zinc-400 text-lg mb-2">Based on your answers, your project likely scores:</h3>
                      <div className="text-5xl md:text-7xl font-display font-bold text-white mb-6">
                        {estimatedScore[0]} - {estimatedScore[1]}<span className="text-3xl text-zinc-600">/100</span>
                      </div>
                      <p className="text-zinc-400 text-sm">
                        Paste your GitHub URL below to run the deep analysis and find out your exact score.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* INPUT FORM */}
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onSubmit={handleBenchmark}
              className="w-full relative group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
              <div className="relative flex flex-col sm:flex-row sm:items-center bg-zinc-900 border border-zinc-800 rounded-2xl p-2 shadow-2xl overflow-hidden focus-within:border-zinc-700 transition-colors">
                <div className="hidden sm:block pl-4 text-zinc-500">
                  <GithubIcon className="w-6 h-6" />
                </div>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/username/repository"
                  className="w-full bg-transparent border-none text-white px-4 py-4 focus:outline-none focus:ring-0 text-base sm:text-lg placeholder:text-zinc-600"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                />
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-white text-black px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors whitespace-nowrap"
                >
                  Analyze Project
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              {error && (
                <div className="absolute -bottom-8 left-0 w-full text-center text-red-400 text-sm font-medium">
                  {error}
                </div>
              )}
              
              <div className="mt-4 w-full text-center flex items-center justify-center gap-1.5 text-zinc-500 text-sm">
                <ShieldCheck className="w-4 h-4" />
                Repository must be public
              </div>
            </motion.form>

          </div>
        )}
      </main>
    </div>
  );
}

export default function BenchmarkLandingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <BenchmarkContent />
    </Suspense>
  );
}
