import { ChevronRight } from 'lucide-react';

export default function ProjectDetailLoading() {
  return (
    <div className="min-h-screen bg-[#030712] relative overflow-hidden flex flex-col pt-[80px]">
      <main className="flex-1 relative z-10 w-full max-w-[1400px] mx-auto px-6 py-12">
        
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-8 animate-pulse">
          <div className="h-4 w-16 bg-gray-800 rounded"></div>
          <ChevronRight className="w-4 h-4 text-gray-700" />
          <div className="h-4 w-48 bg-white/10 rounded"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 animate-pulse">
          
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Header Skeleton */}
            <div className="space-y-6">
              <div className="flex gap-3">
                <div className="h-6 w-24 bg-white/10 rounded-full"></div>
                <div className="h-6 w-32 bg-white/10 rounded-full"></div>
              </div>
              
              <div className="h-16 md:h-20 w-4/5 bg-white/10 rounded-lg"></div>
              
              <div className="space-y-3 max-w-2xl">
                <div className="h-5 w-full bg-gray-800 rounded"></div>
                <div className="h-5 w-full bg-gray-800 rounded"></div>
                <div className="h-5 w-3/4 bg-gray-800 rounded"></div>
              </div>
            </div>

            {/* Problem/Solution Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-[200px]"></div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-[200px]"></div>
            </div>
            
            {/* Image Skeleton */}
            <div className="w-full aspect-video bg-white/5 border border-white/10 rounded-2xl"></div>

            {/* Tech Stack Skeleton */}
            <div className="space-y-4">
              <div className="h-8 w-48 bg-white/10 rounded"></div>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-10 w-28 bg-gray-800 rounded-xl"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Sidebar Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 sticky top-28 h-[500px]">
              <div className="h-10 w-32 bg-white/10 rounded mb-8"></div>
              
              <div className="space-y-4 mb-8">
                <div className="h-6 w-full bg-gray-800 rounded"></div>
                <div className="h-6 w-full bg-gray-800 rounded"></div>
                <div className="h-6 w-full bg-gray-800 rounded"></div>
              </div>
              
              <div className="h-14 w-full bg-blue-500/20 rounded-xl mb-4"></div>
              <div className="h-14 w-full bg-white/10 rounded-xl"></div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
