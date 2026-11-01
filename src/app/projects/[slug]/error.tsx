'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCcw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProjectDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Project Detail route error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 py-24 text-center bg-[#F8FAFC]">
      <div className="bg-rose-50 border border-rose-200 p-4 rounded-full mb-6 shadow-sm">
        <AlertCircle className="w-10 h-10 text-rose-600" />
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900 mb-3 tracking-tight">
        Unable to load project details
      </h2>
      
      <p className="text-slate-600 max-w-md mx-auto mb-8 text-sm sm:text-base leading-relaxed">
        We encountered a temporary issue while retrieving this project. Our CDN nodes might be refreshing.
      </p>
      
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition-all shadow-sm"
        >
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </button>
        
        <Link 
          href="/projects"
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-50 transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalog
        </Link>
      </div>
    </div>
  );
}
