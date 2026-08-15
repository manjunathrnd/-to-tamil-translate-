import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSkeleton: React.FC<{ query?: string }> = ({ query }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-8" id="loading-state">
      <div className="flex items-center justify-center gap-2 mb-6 text-sm text-[#C8973E] font-medium">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>
          Analyzing &ldquo;{query || 'word'}&rdquo; across Kannada, English, and Tamil...
        </span>
      </div>

      {/* 3-Column Skeleton Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Kannada Skeleton */}
        <div className="bg-[#211A14] border border-[#C8973E]/20 rounded-2xl p-6 relative overflow-hidden animate-pulse">
          <div className="h-4 w-24 bg-[#C8973E]/20 rounded-full mb-6" />
          <div className="h-12 w-36 bg-[#C8973E]/30 rounded-lg mb-3" />
          <div className="h-4 w-28 bg-white/10 rounded mb-6" />
          <div className="space-y-2.5">
            <div className="h-3.5 bg-white/10 rounded w-full" />
            <div className="h-3.5 bg-white/10 rounded w-5/6" />
            <div className="h-3.5 bg-white/10 rounded w-4/6" />
          </div>
        </div>

        {/* English Skeleton */}
        <div className="bg-[#211A14] border border-[#A8493F]/20 rounded-2xl p-6 relative overflow-hidden animate-pulse">
          <div className="h-4 w-20 bg-[#A8493F]/20 rounded-full mb-6" />
          <div className="h-12 w-40 bg-[#A8493F]/30 rounded-lg mb-3" />
          <div className="h-4 w-24 bg-white/10 rounded mb-6" />
          <div className="space-y-2.5">
            <div className="h-3.5 bg-white/10 rounded w-full" />
            <div className="h-3.5 bg-white/10 rounded w-5/6" />
            <div className="h-3.5 bg-white/10 rounded w-4/6" />
          </div>
        </div>

        {/* Tamil Skeleton */}
        <div className="bg-[#211A14] border border-[#3E7A70]/20 rounded-2xl p-6 relative overflow-hidden animate-pulse">
          <div className="h-4 w-24 bg-[#3E7A70]/20 rounded-full mb-6" />
          <div className="h-12 w-36 bg-[#3E7A70]/30 rounded-lg mb-3" />
          <div className="h-4 w-28 bg-white/10 rounded mb-6" />
          <div className="space-y-2.5">
            <div className="h-3.5 bg-white/10 rounded w-full" />
            <div className="h-3.5 bg-white/10 rounded w-5/6" />
            <div className="h-3.5 bg-white/10 rounded w-4/6" />
          </div>
        </div>
      </div>

      {/* Meta note skeleton */}
      <div className="mt-5 bg-[#211A14]/70 border border-white/5 rounded-2xl p-5 animate-pulse">
        <div className="h-4 w-32 bg-white/10 rounded mb-3" />
        <div className="h-3.5 bg-white/10 rounded w-3/4 mb-2" />
        <div className="h-3.5 bg-white/10 rounded w-2/3" />
      </div>
    </div>
  );
};
