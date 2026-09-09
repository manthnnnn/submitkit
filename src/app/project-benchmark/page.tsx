'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Search, CheckCircle2, Circle } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export default function BenchmarkLandingPage() {
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [loadingPhase, setLoadingPhase] = useState(0);
  const router = useRouter();

  const loadingPhases = [
    { text: 'Cloning repository securely...', delay: 0 },
    { text: 'Extracting project DNA & dependencies...', delay: 1500 },
    { text: 'Scanning heuristics & AST signatures...', delay: 3500 },
    { text: 'Cross-referencing README claims (Anti-Hallucination)...', delay: 5500 },
    { text: 'Calculating Category & Maturity Level...', delay: 7500 },
  ];

  const handleBenchmark = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!repoUrl.includes('github.com')) {
      setError('Please enter a valid GitHub repository URL');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    
    // Simulate phases progressing for UX
    const timers = loadingPhases.map((phase, i) => 
      setTimeout(() => setLoadingPhase(i), phase.delay)
    );

    try {
      const res = await fetch('/api/benchmark/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to analyze repository');
      }

      // Small delay so users see the final phase before redirect
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

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <main className="container mx-auto px-4 py-24 relative z-10 max-w-4xl flex flex-col items-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-sm text-zinc-400 mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Deterministic Repository Intelligence Layer
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            We don't flatter your project. <br className="hidden md:block"/>
            We <span className="text-white">benchmark</span> it.
          </h1>
          
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Paste a GitHub URL to get a brutally honest, evidence-backed assessment of your code. 
            Discover your exact maturity level and the top 3 gaps preventing you from reaching production grade.
          </p>
        </motion.div>

        {!isAnalyzing ? (
          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleBenchmark}
            className="w-full max-w-2xl relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
            <div className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded-2xl p-2 shadow-2xl overflow-hidden focus-within:border-zinc-700 transition-colors">
              <div className="pl-4 text-zinc-500">
                <GithubIcon className="w-6 h-6" />
              </div>
              <input
                type="url"
                required
                placeholder="https://github.com/username/repository"
                className="w-full bg-transparent border-none text-white px-4 py-4 focus:outline-none focus:ring-0 text-lg placeholder:text-zinc-600"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
              />
              <button 
                type="submit"
                className="bg-white text-black px-6 py-4 rounded-xl font-medium flex items-center gap-2 hover:bg-zinc-200 transition-colors whitespace-nowrap"
              >
                Analyze Project
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            {error && (
              <div className="absolute -bottom-10 left-0 w-full text-center text-red-400 text-sm">
                {error}
              </div>
            )}
          </motion.form>
        ) : (
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
        )}
      </main>
    </div>
  );
}
