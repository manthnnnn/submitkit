'use client';
import { useState } from 'react';
import { CheckCircle2, AlertTriangle, MonitorPlay, MessageSquareWarning, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function HookQuestion() {
  const [step, setStep] = useState<'question' | 'panic' | 'success'>('question');

  return (
    <div className="w-full h-full min-h-[300px] flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {step === 'question' && (
          <motion.div 
            key="question"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md"
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-error-500 to-amber-500"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                  <MessageSquareWarning className="w-5 h-5 text-zinc-400" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">External Examiner</div>
                  <div className="text-xs text-error-400 font-medium animate-pulse">Waiting for your screen share...</div>
                </div>
              </div>

              <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 mb-6 relative">
                <div className="absolute -left-2 -top-2 w-4 h-4 bg-error-500 rounded-full border-4 border-zinc-900 animate-ping"></div>
                <div className="absolute -left-2 -top-2 w-4 h-4 bg-error-500 rounded-full border-4 border-zinc-900"></div>
                <p className="text-white text-lg font-medium leading-snug">"Okay beta, please run the project and show me the output."</p>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-2">Choose your response:</p>
                
                <button 
                  onClick={() => setStep('panic')}
                  className="w-full text-left px-4 py-3 rounded-xl bg-zinc-800/50 hover:bg-error-500/10 border border-zinc-700/50 hover:border-error-500/30 transition-all group flex items-center justify-between"
                >
                  <span className="text-sm text-zinc-300 group-hover:text-error-400 transition-colors">"Uhh.. sir my laptop is hanging..." 😰</span>
                </button>
                
                <button 
                  onClick={() => setStep('success')}
                  className="w-full text-left px-4 py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 transition-all group flex items-center justify-between"
                >
                  <span className="text-sm text-emerald-400 font-medium">"Sure sir. Running it now." 😎</span>
                  <MonitorPlay className="w-4 h-4 text-emerald-500" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'panic' && (
          <motion.div 
            key="panic"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md text-center"
          >
            <div className="w-16 h-16 rounded-full bg-error-500/10 flex items-center justify-center mx-auto mb-4 border border-error-500/20">
              <AlertTriangle className="w-8 h-8 text-error-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">RIP your grades.</h3>
            <p className="text-zinc-400 text-sm mb-6">Don't be that guy. Stop wasting time fixing 100 dependency errors the night before your Viva.</p>
            <button 
              onClick={() => setStep('question')}
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
            >
              <RefreshCcw className="w-4 h-4" /> Try Again
            </button>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md text-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">You passed the Viva!</h3>
            <p className="text-zinc-400 text-sm mb-6">With our 1-click launchers, your project runs flawlessly on the first try. No setup required.</p>
            <button 
              onClick={() => setStep('question')}
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
            >
              <RefreshCcw className="w-4 h-4" /> Reset Scenario
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
