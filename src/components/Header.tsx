import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="text-center pt-8 pb-6 px-4 max-w-4xl mx-auto" id="app-header">
      {/* Script badges */}
      <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#C8973E]/15 text-[#C8973E] border border-[#C8973E]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C8973E]" />
          ಕನ್ನಡ (Kannada)
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#A8493F]/15 text-[#E68A80] border border-[#A8493F]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A8493F]" />
          English
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#3E7A70]/15 text-[#73BAAD] border border-[#3E7A70]/30">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3E7A70]" />
          தமிழ் (Tamil)
        </span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-[#EFE6D3] flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        <span className="font-fraunces italic font-normal text-[#EFE6D3]">Word</span>
        <span className="text-[#C8973E]/60 text-2xl sm:text-3xl">—</span>
        <span className="font-kannada font-bold text-[#C8973E]">ಪದ</span>
        <span className="text-[#C8973E]/60 text-2xl sm:text-3xl">—</span>
        <span className="font-tamil font-bold text-[#73BAAD]">சொல்</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-3 text-sm sm:text-base text-[#EFE6D3]/70 max-w-xl mx-auto font-sans-ui leading-relaxed">
        Type any word in <strong className="text-[#EFE6D3] font-medium">Kannada</strong>, <strong className="text-[#EFE6D3] font-medium">English</strong>, or <strong className="text-[#EFE6D3] font-medium">Tamil</strong> — in native or romanized script — for instant trilingual lexical meanings, pronunciations, and etymology.
      </p>

      {/* Subtle gold line ornament */}
      <div className="mt-5 flex items-center justify-center gap-3">
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#C8973E]/40" />
        <div className="w-1.5 h-1.5 rotate-45 bg-[#C8973E]/60" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#C8973E]/40" />
      </div>
    </header>
  );
};
