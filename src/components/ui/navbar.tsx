'use client';
import Link from 'next/link';
import { Layers, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#09090b]/80 backdrop-blur-2xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="bg-white/5 p-1.5 rounded border border-white/10 group-hover:bg-white/10 transition-all">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <span className="font-display font-medium text-lg tracking-tight text-white">
                Submit<span className="text-zinc-500 font-normal">Kit</span>
              </span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-6 text-sm">
              <Link href="/projects" className="text-zinc-400 hover:text-white transition-colors">
                Browse Projects
              </Link>
              <Link href="/#features" className="text-zinc-400 hover:text-white transition-colors">
                Architecture
              </Link>
              <Link href="/projects" className="bg-white hover:bg-zinc-200 text-zinc-950 px-4 py-2 rounded-full font-medium transition-all">
                Access Catalog
              </Link>
            </div>
          </div>
          
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              href="/projects" 
              className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              Browse Projects
            </Link>
            <Link 
              href="/#how-it-works" 
              className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
