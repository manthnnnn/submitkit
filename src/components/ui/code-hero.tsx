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
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 to-emerald-500/10 rounded-2xl blur-lg opacity-70 group-hover:opacity-100 transition duration-1000"></div>
      
      <div className="relative bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xl font-mono text-xs sm:text-sm text-left">
        {/* Editor Header */}
        <div className="flex items-center px-4 py-3 bg-slate-100/80 border-b border-slate-200 backdrop-blur-md">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-rose-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
          </div>
          <span className="text-slate-600 text-xs flex items-center gap-2 font-semibold">
            <Terminal className="w-3.5 h-3.5 text-indigo-600" /> vault_extractor.sh
          </span>
        </div>
        
        {/* Terminal Body */}
        <div className="p-5 sm:p-6 min-h-[260px] bg-slate-50/70">
          {codeLines.slice(0, currentLineIndex).map((line, i) => (
            <div key={i} className="flex mb-1.5">
              <span className="text-slate-700 whitespace-pre">
                {line.startsWith('$') ? (
                  <><span className="text-emerald-600 font-bold">$</span> <span className="text-slate-900 font-semibold">{line.slice(2)}</span></>
                ) : line.startsWith('>') ? (
                  <><span className="text-slate-400">{'>'}</span> <span className="text-slate-600">{line.slice(2).replace('SUCCESS', '<span class="text-emerald-600 font-bold">SUCCESS</span>').replace('100%', '<span class="text-emerald-600 font-bold">100%</span>').replace(/DONE/g, '<span class="text-emerald-600 font-bold">DONE</span>')}</span></>
                ) : line.startsWith('[SYSTEM ALERT]') ? (
                  <><span className="text-indigo-600 font-bold">[SYSTEM ALERT]:</span> <span className="text-slate-900 font-bold">{line.slice(15)}</span></>
                ) : (
                  <span className="text-slate-600" dangerouslySetInnerHTML={{ __html: line.replace('SUCCESS', '<span class="text-emerald-600 font-bold">SUCCESS</span>').replace('100%', '<span class="text-emerald-600 font-bold">100%</span>').replace(/DONE/g, '<span class="text-emerald-600 font-bold">DONE</span>') }}></span>
                )}
              </span>
            </div>
          ))}
          
          {currentLineIndex < codeLines.length && (
            <div className="flex mb-1.5">
              <span className="text-slate-700 whitespace-pre">
                {currentText.startsWith('$') ? (
                  <><span className="text-emerald-600 font-bold">$</span> <span className="text-slate-900 font-semibold">{currentText.slice(2)}</span></>
                ) : currentText.startsWith('>') ? (
                  <><span className="text-slate-400">{'>'}</span> <span className="text-slate-600">{currentText.slice(2)}</span></>
                ) : currentText.startsWith('[SYSTEM ALERT]') ? (
                  <><span className="text-indigo-600 font-bold">[SYSTEM ALERT]:</span> <span className="text-slate-900 font-bold">{currentText.slice(15)}</span></>
                ) : (
                  <span className="text-slate-600">{currentText}</span>
                )}
                <span className="inline-block w-2.5 h-4 bg-indigo-600 animate-pulse ml-1 align-middle"></span>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
