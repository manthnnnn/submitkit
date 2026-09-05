'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Projects route error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 py-24 text-center">
      <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-full mb-6">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      
      <h2 className="text-3xl font-bold text-white mb-4">
        Unable to load projects
      </h2>
      
      <p className="text-gray-400 max-w-md mx-auto mb-8 text-lg">
        We encountered a temporary issue while retrieving the project catalog. 
        Our edge nodes might be experiencing a cold start delay.
      </p>
      
      <div className="flex items-center gap-4 flex-wrap justify-center">
        <button
          onClick={() => reset()}
          className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
        >
          <RefreshCcw className="w-4 h-4" />
          Try Again
        </button>
        
        <Link 
          href="/"
          className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-3 rounded-lg font-bold hover:bg-white/10 transition-colors"
        >
          <Home className="w-4 h-4" />
          Return Home
        </Link>
      </div>
    </div>
  );
}
