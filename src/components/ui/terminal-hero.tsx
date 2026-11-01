'use client';
import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const lines = [
  "> INITIALIZING SECURE CONNECTION...",
  "> VERIFYING SUBMITKIT VAULT INTEGRITY...",
  "> ACCESSING 15,000+ TESTED CODEBASES...",
  "> RUNNING LOCALHOST:3000 HEALTH CHECK...",
  "> SYSTEM READY. ZERO DEPENDENCY CONFLICTS."
];

export function TerminalHero() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsTyping(false);
      return;
    }

    const fullLine = lines[currentLineIndex];
    
    if (currentText.length < fullLine.length) {
      const timeout = setTimeout(() => {
        setCurrentText(fullLine.slice(0, currentText.length + 1));
      }, Math.random() * 30 + 20); // Fast typing effect
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentText('');
      }, 500); // Pause before next line
      return () => clearTimeout(timeout);
    }
  }, [currentText, currentLineIndex]);

  return (
    <div className="w-full max-w-2xl mx-auto mb-10 relative group">
      <div className="relative bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm font-mono text-sm sm:text-base">
        {/* Terminal Header */}
        <div className="flex items-center px-4 py-2.5 bg-slate-50 border-b border-slate-200">
          <Terminal className="w-4 h-4 text-teal-600 mr-2" />
          <span className="text-slate-600 text-xs font-semibold">submitkit_runner.bat</span>
          <div className="ml-auto flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
          </div>
        </div>
        
        {/* Terminal Body */}
        <div className="p-4 sm:p-6 min-h-[190px] text-left bg-slate-50/50">
          {lines.slice(0, currentLineIndex).map((line, i) => (
            <div key={i} className="text-slate-700 mb-2 font-medium">
              <span className={i === lines.length - 1 ? "text-teal-700 font-bold" : ""}>{line}</span>
            </div>
          ))}
          
          {currentLineIndex < lines.length && (
            <div className="text-teal-700 font-semibold">
              {currentText}<span className="inline-block w-2 h-4 bg-teal-600 animate-pulse ml-1 align-middle"></span>
            </div>
          )}
          
          {!isTyping && (
            <div className="mt-4 text-emerald-700 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              READY: 1-Click Launch Verified
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
