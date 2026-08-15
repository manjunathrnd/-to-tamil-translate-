import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  error: string;
  onRetry: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  return (
    <div
      className="w-full max-w-2xl mx-auto px-4 mt-8"
      id="error-display"
    >
      <div className="bg-[#211A14] border border-[#A8493F]/50 rounded-2xl p-6 text-center shadow-xl">
        <div className="w-12 h-12 rounded-full bg-[#A8493F]/20 text-[#E68A80] flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-medium text-[#EFE6D3] mb-1">
          Lookup Encountered an Issue
        </h3>
        <p className="text-sm text-[#EFE6D3]/70 mb-5 font-sans-ui max-w-md mx-auto">
          {error || 'Unable to retrieve definitions at this moment. Please check your query or try again.'}
        </p>
        <button
          type="button"
          onClick={onRetry}
          id="retry-search-btn"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#A8493F] hover:bg-[#b85348] text-[#EFE6D3] text-sm font-medium transition cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    </div>
  );
};
