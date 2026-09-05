import { Sparkles, Terminal, Database, Server } from 'lucide-react';

export default function ProjectsLoading() {
  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden flex flex-col">
      <main className="flex-1 relative z-10 w-full max-w-[1400px] mx-auto px-6 py-12 md:py-20 lg:py-28">
        
        {/* Skeleton Hero Section */}
        <div className="max-w-4xl mb-16 md:mb-24 animate-pulse">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
            <Sparkles className="w-4 h-4 text-blue-400 opacity-50" />
            <div className="h-3 w-32 bg-blue-400/20 rounded"></div>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="h-12 md:h-16 w-3/4 bg-white/10 rounded-lg"></div>
            <div className="h-12 md:h-16 w-1/2 bg-white/10 rounded-lg"></div>
          </div>
          
          <div className="space-y-3 mb-10 max-w-2xl">
            <div className="h-4 w-full bg-gray-800 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-800 rounded"></div>
            <div className="h-4 w-4/6 bg-gray-800 rounded"></div>
          </div>
        </div>

        {/* Skeleton Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div 
              key={i}
              className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 h-[400px] flex flex-col animate-pulse"
            >
              {/* Card Header Skeleton */}
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/10"></div>
                <div className="w-20 h-6 rounded-full bg-white/10"></div>
              </div>
              
              {/* Card Title Skeleton */}
              <div className="h-6 w-3/4 bg-white/10 rounded mb-4"></div>
              
              {/* Card Description Skeleton */}
              <div className="space-y-2 mb-8">
                <div className="h-3 w-full bg-gray-800 rounded"></div>
                <div className="h-3 w-full bg-gray-800 rounded"></div>
                <div className="h-3 w-4/5 bg-gray-800 rounded"></div>
              </div>
              
              <div className="mt-auto">
                <div className="flex gap-2 mb-6">
                  <div className="h-6 w-16 bg-gray-800 rounded-full"></div>
                  <div className="h-6 w-20 bg-gray-800 rounded-full"></div>
                  <div className="h-6 w-14 bg-gray-800 rounded-full"></div>
                </div>
                
                <div className="h-12 w-full bg-white/5 rounded-xl"></div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
