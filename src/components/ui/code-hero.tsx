'use client';
import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const codeLines = [
  "$ vault extract --target=\"Final Year Project\"",
  "> Authenticating secure connection... SUCCESS",
  "> Downloading Bug-Free Source Code... 100%",
  "> Generating 60-page IEEE Black Book... DONE",
  "> Preparing PPT Slides for Defense... DONE",
  "> Injecting Top 25 Viva Questions... DONE",
  "",
  "[SYSTEM ALERT]: Project ready to submit. Zero tension.",
  "> Go get your marks. 🚀",
];

export function CodeHero() {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= codeLines.length) {
      setIsTyping(false);
      return;
    }

    const fullLine = codeLines[currentLineIndex];
    
    // Skip typing for empty lines
    if (fullLine === "") {
      setCurrentLineIndex(prev => prev + 1);
      setCurrentText('');
      return;
    }

    // Faster typing for the command lines
    const typingSpeed = fullLine.startsWith('$') ? 40 : 15;
    
    if (currentText.length < fullLine.length) {
      const timeout = setTimeout(() => {
        setCurrentText(fullLine.slice(0, currentText.length + 1));
      }, Math.random() * typingSpeed + 10);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentText('');
      }, fullLine.startsWith('[SYSTEM') ? 800 : 300); // Pause longer before the final alert
      return () => clearTimeout(timeout);
    }
  }, [currentText, currentLineIndex]);

  return (
    <div className="w-full max-w-2xl mx-auto mb-16 relative group">
      {/* Decorative Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/20 to-emerald-500/20 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition duration-1000"></div>
      
      <div className="relative bg-[#09090b] border border-white/10 rounded-xl overflow-hidden shadow-2xl font-mono text-xs sm:text-sm text-left">
        {/* Editor Header */}
        <div className="flex items-center px-4 py-3 bg-[#18181b]/80 border-b border-white/5 backdrop-blur-md">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]/80"></div>
            <div className="w-3 h-3 rounded-full bg-[#f59e0b]/80"></div>
            <div className="w-3 h-3 rounded-full bg-[#10b981]/80"></div>
          </div>
          <span className="text-zinc-500 text-xs flex items-center gap-2">
            <Terminal className="w-3 h-3" /> vault_extractor.exe
          </span>
        </div>
        
        {/* Terminal Body */}
        <div className="p-5 sm:p-6 min-h-[260px] bg-black/40">
          {codeLines.slice(0, currentLineIndex).map((line, i) => (
            <div key={i} className="flex mb-1.5">
              <span className="text-zinc-300 whitespace-pre">
                {line.startsWith('$') ? (
                  <><span className="text-emerald-400 font-bold">$</span> <span className="text-white">{line.slice(2)}</span></>
                ) : line.startsWith('>') ? (
                  <><span className="text-zinc-500">{'>'}</span> <span className="text-zinc-400">{line.slice(2).replace('SUCCESS', '<span class="text-emerald-400 font-bold">SUCCESS</span>').replace('100%', '<span class="text-emerald-400 font-bold">100%</span>').replace(/DONE/g, '<span class="text-emerald-400 font-bold">DONE</span>')}</span></>
                ) : line.startsWith('[SYSTEM ALERT]') ? (
                  <><span className="text-brand-400 font-bold">[SYSTEM ALERT]:</span> <span className="text-white font-medium">{line.slice(15)}</span></>
                ) : (
                  <span className="text-zinc-400" dangerouslySetInnerHTML={{ __html: line.replace('SUCCESS', '<span class="text-emerald-400 font-bold">SUCCESS</span>').replace('100%', '<span class="text-emerald-400 font-bold">100%</span>').replace(/DONE/g, '<span class="text-emerald-400 font-bold">DONE</span>') }}></span>
                )}
              </span>
            </div>
          ))}
          
          {currentLineIndex < codeLines.length && (
            <div className="flex mb-1.5">
              <span className="text-zinc-300 whitespace-pre">
                {currentText.startsWith('$') ? (
                  <><span className="text-emerald-400 font-bold">$</span> <span className="text-white">{currentText.slice(2)}</span></>
                ) : currentText.startsWith('>') ? (
                  <><span className="text-zinc-500">{'>'}</span> <span className="text-zinc-400">{currentText.slice(2)}</span></>
                ) : currentText.startsWith('[SYSTEM ALERT]') ? (
                  <><span className="text-brand-400 font-bold">[SYSTEM ALERT]:</span> <span className="text-white font-medium">{currentText.slice(15)}</span></>
                ) : (
                  <span className="text-zinc-400">{currentText}</span>
                )}
                <span className="inline-block w-2.5 h-4 bg-emerald-400 animate-pulse ml-1 align-middle"></span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
