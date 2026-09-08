'use client';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const LOADING_SCENARIOS: readonly (readonly string[])[] = [
  [
    "[SYSTEM] Initiating bootstrap...",
    "[AUTH] Verifying secure tokens...",
    "[DB] Querying project repository...",
    "[FS] Resolving architecture...",
    "[COMPILER] Bundling source code...",
    "[UI] Painting layout trees...",
    "[OK] Loading Succeeded."
  ],
  [
    "[NETWORK] Establishing Handshake...",
    "[SEC] SSL Handshake Confirmed...",
    "[CDN] Fetching Assets from Edge...",
    "[CACHE] Cache Miss. Hitting Database...",
    "[DB] Retrieving Heavy Assets...",
    "[RENDER] Injecting CSS Variables...",
    "[OK] Loading Succeeded."
  ],
  [
    "[BOOT] Waking up Serverless Functions...",
    "[AUTH] Validating Session JWT...",
    "[API] Fetching Dynamic Routes...",
    "[DOM] Hydrating React Components...",
    "[STATE] Syncing Context Providers...",
    "[OPTIMIZE] Compressing Payloads...",
    "[OK] Loading Succeeded."
  ]
];

export default function Loading() {
  const [activeLines, setActiveLines] = useState<string[]>([
    "[SUBMITKIT v1.0] Core engine starting..."
  ]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const scenarioIndex = Math.floor(Math.random() * LOADING_SCENARIOS.length);
    const selectedLines = LOADING_SCENARIOS[scenarioIndex] || LOADING_SCENARIOS[0];
    let index = 0;

    timerRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        if (index < selectedLines.length) {
          const nextLine = selectedLines[index];
          if (nextLine && typeof nextLine === 'string') {
            setActiveLines(prev => {
              const clean = prev.filter(l => Boolean(l) && typeof l === 'string');
              const updated = [...clean, nextLine];
              return updated.length > 4 ? updated.slice(updated.length - 4) : updated;
            });
          }
          index++;
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      }, 150);
    }, 100);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center bg-[#09090b] px-4">
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-emerald-500/5 blur-[100px] rounded-full animate-pulse" />
      </div>

      <div className="w-full max-w-sm bg-[#0a0a0c] border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative z-10 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none" />
        
        {/* Terminal Header */}
        <div className="bg-white/[0.02] px-4 py-3 border-b border-white/5 flex items-center justify-between">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            COMPILING
          </span>
        </div>
        
        {/* Terminal Body */}
        <div className="p-6 h-48 flex flex-col justify-end font-mono text-xs relative z-10">
           {activeLines.map((line, i) => {
             const safeLine = typeof line === 'string' ? line : '';
             const isOk = safeLine.includes('[OK]');
             const isSubmitKit = safeLine.includes('[SUBMITKIT]');

             return (
               <motion.div 
                 key={`${safeLine}-${i}`}
                 initial={{ opacity: 0, x: -5 }}
                 animate={{ opacity: 1, x: 0 }}
                 className={`mb-3 ${
                   isOk ? 'text-emerald-400 font-bold' : 
                   isSubmitKit ? 'text-zinc-300' : 'text-zinc-500'
                 }`}
               >
                 {safeLine}
               </motion.div>
             );
           })}
           <div className="flex items-center mt-1">
             <span className="text-emerald-500 mr-2 font-bold">{'>'}</span>
             <motion.div 
               animate={{ opacity: [1, 0] }} 
               transition={{ duration: 0.8, repeat: Infinity }} 
               className="w-1.5 h-3.5 bg-emerald-400" 
             />
           </div>
        </div>

        {/* Minimal Progress Line */}
        <div className="h-[2px] w-full bg-white/5">
          <motion.div 
            className="h-full bg-emerald-500"
            animate={{ width: ["0%", "100%"] }}
            transition={{ duration: 1.2, ease: "circOut" }}
          />
        </div>
      </div>
    </div>
  );
}
