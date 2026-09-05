'use client';
import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const lines = [
  "> INITIALIZING SECURE CONNECTION...",
  "> BYPASSING MAINFRAME ENCRYPTION...",
  "> ACCESSING STUDENT VAULT...",
  "> VERIFYING 15,000+ DEPLOYMENTS...",
  "> SYSTEM READY. ACCESS GRANTED."
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
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-500 to-accent-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-[#05080c] border border-brand-500/30 rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,240,255,0.15)] font-mono text-sm sm:text-base">
        {/* Terminal Header */}
        <div className="flex items-center px-4 py-2 bg-[#0a0e14] border-b border-brand-500/20">
          <Terminal className="w-4 h-4 text-brand-400 mr-2" />
          <span className="text-slate-400 text-xs">vault_access.exe</span>
          <div className="ml-auto flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            <div className="w-3 h-3 rounded-full bg-brand-400 shadow-[0_0_5px_rgba(0,240,255,0.8)]"></div>
          </div>
        </div>
        
        {/* Terminal Body */}
        <div className="p-4 sm:p-6 min-h-[200px] text-left">
          {lines.slice(0, currentLineIndex).map((line, i) => (
            <div key={i} className="text-brand-400 mb-2">
              <span className={i === lines.length - 1 ? "text-success-400 text-neon" : ""}>{line}</span>
            </div>
          ))}
          
          {currentLineIndex < lines.length && (
            <div className="text-brand-400">
              {currentText}<span className="inline-block w-2 h-4 bg-brand-400 animate-blink ml-1 align-middle"></span>
            </div>
          )}
          
          {!isTyping && (
            <div className="mt-4 text-success-400 font-bold animate-pulse">
              _AWAITING_USER_INPUT_
            </div>
          )}
        </div>
        
        {/* Scanline Overlay */}
        <div className="scanline"></div>
      </div>
    </div>
  );
}
