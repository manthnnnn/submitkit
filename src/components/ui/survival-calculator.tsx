'use client';
import { useState } from 'react';
import { AlertTriangle, ShieldCheck, Flame } from 'lucide-react';

export function SurvivalCalculator() {
  const [daysLeft, setDaysLeft] = useState(14);
  const [projectStatus, setProjectStatus] = useState(20); // percentage

  // Calculate survival chance
  let survivalChance = 0;
  if (daysLeft > 20) {
    survivalChance = Math.min(100, projectStatus + 40);
  } else if (daysLeft > 7) {
    survivalChance = Math.min(100, projectStatus + 20);
  } else {
    survivalChance = Math.max(0, Math.min(100, projectStatus - (10 - daysLeft) * 5));
  }

  const getStatusColor = () => {
    if (survivalChance > 70) return 'text-emerald-600';
    if (survivalChance > 30) return 'text-amber-600';
    return 'text-rose-600';
  };

  const getMessage = () => {
    if (survivalChance > 70) return "You're safe. But why build from scratch when you can just buy the Vault?";
    if (survivalChance > 30) return "Tension is high. You might pass, but your Viva will be a nightmare.";
    return "Red Alert! You are running behind schedule. Secure a production-grade verified project immediately!";
  };

  return (
    <div className="bg-white border border-slate-200/90 shadow-sm p-6 md:p-8 rounded-3xl w-full max-w-lg mx-auto">
      <div className="flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
        <Flame className="w-6 h-6 text-indigo-600" />
        <h3 className="font-display font-bold text-xl text-slate-900">Viva Survival Calculator</h3>
      </div>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-slate-700">Days left for submission?</label>
            <span className="text-sm text-indigo-600 font-bold font-mono">{daysLeft} days</span>
          </div>
          <input 
            type="range" min="1" max="30" 
            value={daysLeft} 
            onChange={(e) => setDaysLeft(parseInt(e.target.value))}
            className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-semibold text-slate-700">Current Project Progress?</label>
            <span className="text-sm text-indigo-600 font-bold font-mono">{projectStatus}%</span>
          </div>
          <input 
            type="range" min="0" max="100" step="10"
            value={projectStatus} 
            onChange={(e) => setProjectStatus(parseInt(e.target.value))}
            className="w-full accent-indigo-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-center">
        <p className="text-slate-500 text-xs mb-2 uppercase tracking-widest font-mono font-semibold">Your Survival Chance</p>
        <div className={`text-5xl font-display font-extrabold mb-4 transition-colors ${getStatusColor()}`}>
          {survivalChance}%
        </div>
        <div className="flex items-start gap-3 text-left">
          {survivalChance <= 30 ? (
            <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
          ) : (
            <ShieldCheck className={`w-5 h-5 shrink-0 mt-0.5 ${getStatusColor()}`} />
          )}
          <p className="text-sm text-slate-700 leading-relaxed font-medium">{getMessage()}</p>
        </div>
      </div>
    </div>
  );
}
