'use client';
import { useState, useRef } from 'react';
import { Eye } from 'lucide-react';

export function XRayReveal() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full aspect-[1/1.4] md:aspect-video rounded-3xl overflow-hidden border border-slate-200 cursor-crosshair bg-slate-50 shadow-sm"
      >
        {/* Placeholder Base (Blurred) - Simulating the report */}
        <div className="absolute inset-0 p-8 flex flex-col gap-4 filter blur-[6px] opacity-40 pointer-events-none select-none bg-slate-100">
          <div className="w-1/2 h-8 bg-slate-300 rounded"></div>
          <div className="w-1/3 h-4 bg-slate-300 rounded mb-8"></div>
          
          <div className="space-y-3">
             <div className="w-full h-3 bg-slate-300 rounded"></div>
             <div className="w-full h-3 bg-slate-300 rounded"></div>
             <div className="w-4/5 h-3 bg-slate-300 rounded"></div>
          </div>
          
          <div className="w-full h-48 bg-slate-200 rounded mt-8 flex items-center justify-center">
             {/* Mock UML diagram box */}
          </div>
          
          <div className="space-y-3 mt-8">
             <div className="w-full h-3 bg-slate-300 rounded"></div>
             <div className="w-3/4 h-3 bg-slate-300 rounded"></div>
          </div>
        </div>

        {/* X-Ray Mask Layer */}
        <div 
          className="absolute inset-0 p-8 flex flex-col gap-4 pointer-events-none transition-opacity duration-300 bg-white"
          style={{
            opacity: isHovered ? 1 : 0,
            clipPath: `circle(120px at ${mousePos.x}% ${mousePos.y}%)`,
          }}
        >
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
             <div>
                <div className="text-3xl font-serif font-bold text-slate-900 tracking-tight mb-1">CHAPTER 3</div>
                <div className="text-sm text-slate-500 font-serif font-semibold uppercase tracking-widest">How the System Works</div>
             </div>
             <div className="text-4xl font-serif text-slate-200 font-black">03</div>
          </div>
          
          <div className="space-y-4 text-sm text-slate-700 font-serif leading-relaxed mt-2 text-justify">
             <p><strong className="text-slate-900">3.1 Step-by-Step Flow:</strong> The project is divided into three simple parts. First, the user opens the website and clicks a button. Next, the website safely sends this request over the internet to our Python server. Finally, the server saves the data in the database and shows the final output on the screen.</p>
          </div>
          
          <div className="w-full h-56 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl mt-4 flex flex-col items-center justify-center p-4 relative overflow-hidden">
             {/* Grid background for blueprint feel */}
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
             
             {/* Diagram */}
             <div className="relative z-10 flex flex-col items-center gap-3 w-full max-w-sm mt-2">
                <div className="flex justify-between w-full">
                   <div className="px-4 py-2 bg-white border border-slate-300 shadow-xs rounded text-xs font-bold text-slate-800 text-center w-28">User Screen</div>
                   <div className="px-4 py-2 bg-white border border-slate-300 shadow-xs rounded text-xs font-bold text-slate-800 text-center w-28">Internet</div>
                </div>
                
                {/* Connecting lines */}
                <div className="flex justify-between w-full px-12">
                   <div className="h-6 w-0.5 bg-slate-300"></div>
                   <div className="h-6 w-0.5 bg-slate-300"></div>
                </div>
                
                <div className="px-6 py-2.5 bg-indigo-600 text-white shadow-sm rounded-lg text-xs font-bold w-full text-center">Main Python Server</div>
                
                <div className="flex justify-between w-full px-12">
                   <div className="h-6 w-0.5 bg-slate-300"></div>
                   <div className="h-6 w-0.5 bg-slate-300"></div>
                </div>
                
                <div className="flex justify-between w-full">
                   <div className="px-4 py-2 bg-white border border-slate-300 shadow-xs rounded text-xs font-bold text-slate-800 text-center w-28 flex items-center justify-center gap-1">Database</div>
                   <div className="px-4 py-2 bg-slate-100 border border-slate-300 shadow-xs rounded text-xs font-bold text-slate-800 text-center w-28">AI Brain</div>
                </div>
             </div>
          </div>
          
          <div className="text-xs text-slate-500 font-serif text-center mt-2 italic font-medium">
             Fig 3.1: Simple diagram showing how the data flows from the user to the server.
          </div>
        </div>

        {/* Call to action overlay when not hovered */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 pointer-events-none ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
          <div className="bg-white/95 backdrop-blur-md px-6 py-3 rounded-full border border-slate-200 flex items-center gap-2 shadow-lg">
            <Eye className="w-5 h-5 text-indigo-600" />
            <span className="text-slate-800 font-semibold text-sm">Hover mouse to peek inside the Report</span>
          </div>
        </div>
      </div>
    </div>
  );
}
