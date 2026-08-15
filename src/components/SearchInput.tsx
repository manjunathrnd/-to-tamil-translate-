import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, ArrowRight } from 'lucide-react';

interface SearchInputProps {
  onSearch: (word: string) => void;
  isLoading: boolean;
  initialValue?: string;
}

const PLACEHOLDERS = [
  'Type any word (e.g., ಬೆಳಕು, vanakkam, friendship...)',
  'Try "sneha", "ಅರಿವು", "அன்பு", "light"...',
  'Kannada, English, or Tamil — native or romanized...',
  'Try "maram", "ಕನಸು", "dream", "vanakkam"...',
];

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  isLoading,
  initialValue = '',
}) => {
  const [value, setValue] = useState(initialValue);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Rotate placeholder periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSearch(value.trim());
    }
  };

  const handleClear = () => {
    setValue('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto px-4"
      id="dictionary-search-form"
    >
      <div className="relative group">
        {/* Glow effect on focus */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#C8973E]/30 via-[#A8493F]/20 to-[#3E7A70]/30 rounded-2xl blur opacity-30 group-hover:opacity-75 group-focus-within:opacity-100 transition duration-300" />

        <div className="relative flex items-center bg-[#211A14] border border-[#C8973E]/30 group-focus-within:border-[#C8973E] rounded-2xl shadow-2xl transition-all">
          <div className="pl-4 sm:pl-5 text-[#C8973E]/70 flex items-center pointer-events-none">
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          <input
            ref={inputRef}
            id="word-search-input"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={PLACEHOLDERS[placeholderIndex]}
            disabled={isLoading}
            autoComplete="off"
            autoFocus
            className="w-full py-4 sm:py-5 pl-3 pr-24 sm:pr-28 bg-transparent text-[#EFE6D3] placeholder-[#EFE6D3]/40 text-base sm:text-lg focus:outline-none disabled:opacity-50 font-sans-ui"
          />

          <div className="absolute right-2.5 sm:right-3 flex items-center gap-1.5 sm:gap-2">
            {value && !isLoading && (
              <button
                type="button"
                id="clear-search-btn"
                onClick={handleClear}
                aria-label="Clear input"
                className="p-1.5 sm:p-2 text-[#EFE6D3]/50 hover:text-[#EFE6D3] rounded-full hover:bg-white/5 transition"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}

            <button
              type="submit"
              id="submit-search-btn"
              disabled={!value.trim() || isLoading}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#C8973E] hover:bg-[#d6a54c] text-[#17130F] font-semibold text-sm sm:text-base transition shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer active:scale-95"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  <span className="hidden sm:inline text-xs font-medium">Looking up...</span>
                </>
              ) : (
                <>
                  <span className="font-medium text-xs sm:text-sm">Search</span>
                  <ArrowRight className="w-4 h-4 hidden sm:block" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
