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
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-amber-500"></div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <MessageSquareWarning className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">External Examiner</div>
                  <div className="text-xs text-rose-600 font-medium animate-pulse">Waiting for your screen share...</div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 relative">
                <div className="absolute -left-1.5 -top-1.5 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white animate-ping"></div>
                <div className="absolute -left-1.5 -top-1.5 w-3.5 h-3.5 bg-rose-500 rounded-full border-2 border-white"></div>
                <p className="text-slate-900 text-lg font-medium leading-snug">&quot;Okay beta, please run the project and show me the output.&quot;</p>
              </div>

              <div className="space-y-3">
                <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2">Choose your response:</p>
                
                <button 
                  onClick={() => setStep('panic')}
                  className="w-full text-left px-4 py-3 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 transition-all group flex items-center justify-between"
                >
                  <span className="text-sm text-slate-700 group-hover:text-rose-700 font-medium transition-colors">&quot;Uhh.. sir my laptop is hanging...&quot; 😰</span>
                </button>
                
                <button 
                  onClick={() => setStep('success')}
                  className="w-full text-left px-4 py-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all group flex items-center justify-between"
                >
                  <span className="text-sm text-emerald-800 font-bold">&quot;Sure sir. Running it now.&quot; 😎</span>
                  <MonitorPlay className="w-4 h-4 text-emerald-600" />
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
            className="w-full max-w-md text-center p-6 bg-white border border-rose-200 rounded-2xl shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4 border border-rose-200">
              <AlertTriangle className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">RIP your grades.</h3>
            <p className="text-slate-600 text-sm mb-6">Don&apos;t be that student. Stop wasting time fixing 100 dependency errors the night before your Viva.</p>
            <button 
              onClick={() => setStep('question')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
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
            className="w-full max-w-md text-center p-6 bg-white border border-emerald-200 rounded-2xl shadow-sm"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4 border border-emerald-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">You passed the Viva!</h3>
            <p className="text-slate-600 text-sm mb-6">With our 1-click launchers, your project runs flawlessly on the first try. No setup required.</p>
            <button 
              onClick={() => setStep('question')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              <RefreshCcw className="w-4 h-4" /> Reset Scenario
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
