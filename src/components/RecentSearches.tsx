import React from 'react';
import { History, Sparkles, Trash2 } from 'lucide-react';
import { PRESET_CHIPS } from '../data/presetSearches';

interface RecentSearchesProps {
  recentQueries: string[];
  onSelectWord: (word: string) => void;
  onClearHistory?: () => void;
  activeQuery?: string;
}

export const RecentSearches: React.FC<RecentSearchesProps> = ({
  recentQueries,
  onSelectWord,
  onClearHistory,
  activeQuery,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 mt-4" id="recent-searches-section">
      {/* If there are recent user lookups */}
      {recentQueries.length > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-[#EFE6D3]/60 mb-2 px-1">
            <span className="flex items-center gap-1.5 font-medium tracking-wide">
              <History className="w-3.5 h-3.5 text-[#C8973E]" />
              Recent Searches
            </span>
            {onClearHistory && (
              <button
                type="button"
                onClick={onClearHistory}
                className="hover:text-[#E68A80] transition flex items-center gap-1 text-[11px]"
                title="Clear recent history"
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {recentQueries.map((query) => {
              const isActive = activeQuery?.toLowerCase() === query.toLowerCase();
              return (
                <button
                  key={query}
                  id={`recent-chip-${query}`}
                  type="button"
                  onClick={() => onSelectWord(query)}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#C8973E]/20 text-[#C8973E] border-[#C8973E]'
                      : 'bg-[#211A14] text-[#EFE6D3]/80 border-white/10 hover:border-[#C8973E]/40 hover:text-[#EFE6D3] hover:bg-[#2a221b]'
                  }`}
                >
                  <span>{query}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommended seed chips */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[#EFE6D3]/50 mb-2 px-1">
          <Sparkles className="w-3.5 h-3.5 text-[#73BAAD]" />
          <span>Explore examples (try any script or romanized):</span>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          {PRESET_CHIPS.map((chip) => {
            const isActive = activeQuery?.toLowerCase() === chip.query.toLowerCase();
            return (
              <button
                key={chip.query}
                id={`preset-chip-${chip.query}`}
                type="button"
                onClick={() => onSelectWord(chip.query)}
                className={`group px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#C8973E]/20 text-[#C8973E] border-[#C8973E]'
                    : 'bg-[#211A14]/70 text-[#EFE6D3]/70 border-white/5 hover:border-[#73BAAD]/40 hover:text-[#EFE6D3] hover:bg-[#251e18]'
                }`}
              >
                <span>{chip.label}</span>
                {chip.sub && (
                  <span className="text-[11px] text-[#EFE6D3]/40 group-hover:text-[#EFE6D3]/60 hidden sm:inline">
                    · {chip.sub}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
