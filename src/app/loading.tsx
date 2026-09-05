'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  // We initialize with a line already present so the terminal is NEVER blank
  const [activeLines, setActiveLines] = useState<string[]>(["[SUBMITKIT v1.0] Core engine starting..."]);
  
  const loadingScenarios = [
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

  useEffect(() => {
    // Pick a random scenario on mount
    const selectedLines = loadingScenarios[Math.floor(Math.random() * loadingScenarios.length)];
    
    let index = 0;
    // Start typing immediately after a tiny delay
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        if (index < selectedLines.length) {
          setActiveLines(prev => {
            const next = [...prev, selectedLines[index]];
            // Keep only the last 3 or 4 lines to fit nicely in the window
            if (next.length > 4) return next.slice(1);
            return next;
          });
          index++;
        } else {
          clearInterval(interval);
        }
      }, 150); // Very fast typing speed so it never feels boring
      
      return () => clearInterval(interval);
    }, 100);
    
    return () => clearTimeout(timeout);
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
           {activeLines.map((line, i) => (
             <motion.div 
               key={line + i}
               initial={{ opacity: 0, x: -5 }}
               animate={{ opacity: 1, x: 0 }}
               className={`mb-3 ${
                 line.includes('[OK]') ? 'text-emerald-400 font-bold' : 
                 line.includes('[SUBMITKIT]') ? 'text-zinc-300' : 'text-zinc-500'
               }`}
             >
               {line}
             </motion.div>
           ))}
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
            transition={{ duration: 1.2, ease: "circOut" }} // Fast progress bar
          />
        </div>
      </div>
    </div>
  );
}
