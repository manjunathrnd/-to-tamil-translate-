import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { SearchInput } from './components/SearchInput';
import { RecentSearches } from './components/RecentSearches';
import { ResultCards } from './components/ResultCards';
import { LoadingSkeleton } from './components/LoadingSkeleton';
import { ErrorDisplay } from './components/ErrorDisplay';
import { TrilingualDictionaryResult } from './types';
import { INITIAL_SAMPLE_RESULT } from './data/presetSearches';

const STORAGE_KEY = 'trilingual_recent_searches';

export default function App() {
  const [currentQuery, setCurrentQuery] = useState<string>('sneha');
  const [result, setResult] = useState<TrilingualDictionaryResult | null>(INITIAL_SAMPLE_RESULT);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recentQueries, setRecentQueries] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : ['sneha', 'light', 'vanakkam'];
    } catch {
      return ['sneha', 'light', 'vanakkam'];
    }
  });

  const saveRecentQuery = (word: string) => {
    setRecentQueries((prev) => {
      const filtered = prev.filter((item) => item.toLowerCase() !== word.toLowerCase());
      const updated = [word, ...filtered].slice(0, 10);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.warn('Could not save to localStorage', e);
      }
      return updated;
    });
  };

  const handleClearHistory = () => {
    setRecentQueries([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Could not clear localStorage', e);
    }
  };

  const executeLookup = async (word: string) => {
    if (!word.trim()) return;

    setCurrentQuery(word);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: word.trim() }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Server responded with status ${response.status}. Please check your input.`
        );
      }

      const data: TrilingualDictionaryResult = await response.json();
      setResult(data);
      saveRecentQuery(word.trim());
    } catch (err: any) {
      console.error('Lookup failed:', err);
      setError(
        err.message || 'Unable to fetch trilingual definitions. Please verify the word and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#17130F] text-[#EFE6D3] flex flex-col justify-between selection:bg-[#C8973E]/30 selection:text-[#EFE6D3]">
      <div className="pb-16">
        {/* Top Header */}
        <Header />

        {/* Search Input Box */}
        <div className="mt-2">
          <SearchInput
            onSearch={executeLookup}
            isLoading={isLoading}
            initialValue={currentQuery}
          />
        </div>

        {/* Recent Searches / Preset Chips */}
        <RecentSearches
          recentQueries={recentQueries}
          onSelectWord={executeLookup}
          onClearHistory={recentQueries.length > 0 ? handleClearHistory : undefined}
          activeQuery={currentQuery}
        />

        {/* Dynamic Content: Loading vs Error vs Results */}
        <main className="transition-all duration-300">
          {isLoading && <LoadingSkeleton query={currentQuery} />}

          {!isLoading && error && (
            <ErrorDisplay
              error={error}
              onRetry={() => executeLookup(currentQuery)}
            />
          )}

          {!isLoading && !error && result && (
            <ResultCards result={result} />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 py-6 px-4 text-center text-xs text-[#EFE6D3]/40 font-sans-ui bg-[#17130F]/90">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-kannada text-[#C8973E]">ಪದಕೋಶ</span>
            <span>·</span>
            <span className="font-fraunces italic text-[#EFE6D3]/70">Trilingual Lexicon</span>
            <span>·</span>
            <span className="font-tamil text-[#73BAAD]">அகராதி</span>
          </div>
          <p>
            Kannada (ಕನ್ನಡ) · English · Tamil (தமிழ்) Dictionary Tool
          </p>
        </div>
      </footer>
    </div>
  );
}
