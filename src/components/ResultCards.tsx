import React, { useState } from 'react';
import { Volume2, Copy, Check, Quote, Compass } from 'lucide-react';
import { TrilingualDictionaryResult } from '../types';
import { speakWord } from '../utils/audio';

interface ResultCardsProps {
  result: TrilingualDictionaryResult;
}

export const ResultCards: React.FC<ResultCardsProps> = ({ result }) => {
  const [copiedLang, setCopiedLang] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleCopy = (text: string, lang: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLang(lang);
    setTimeout(() => setCopiedLang(null), 2000);
  };

  const handleCopyAll = () => {
    const fullText = `Word — ಪದ — சொல் Trilingual Dictionary Result:
Query: ${result.query || ''}
Part of Speech: ${result.part_of_speech}

[ಕನ್ನಡ / Kannada]
Word: ${result.kannada.word} (${result.kannada.pronunciation})
Meaning: ${result.kannada.meaning}
${result.kannada.example_sentence ? `Example: ${result.kannada.example_sentence.sentence}\nPronunciation: ${result.kannada.example_sentence.pronunciation}\nTranslation: ${result.kannada.example_sentence.translation}` : ''}

[English]
Word: ${result.english.word} (${result.english.pronunciation})
Meaning: ${result.english.meaning}
${result.english.example_sentence ? `Example: ${result.english.example_sentence.sentence}\nPronunciation: ${result.english.example_sentence.pronunciation}\nTranslation: ${result.english.example_sentence.translation}` : ''}

[தமிழ் / Tamil]
Word: ${result.tamil.word} (${result.tamil.pronunciation})
Meaning: ${result.tamil.meaning}
${result.tamil.example_sentence ? `Example: ${result.tamil.example_sentence.sentence}\nPronunciation: ${result.tamil.example_sentence.pronunciation}\nTranslation: ${result.tamil.example_sentence.translation}` : ''}

Linguistic Note:
${result.note}`;

    navigator.clipboard.writeText(fullText);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleSpeak = (text: string, langCode: 'kn-IN' | 'en-US' | 'ta-IN', id: string) => {
    setPlayingId(id);
    speakWord(text, langCode);
    setTimeout(() => setPlayingId(null), 1500);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-6 sm:mt-8 space-y-6" id="result-cards-container">
      {/* Top Query & Meta Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#211A14]/70 border border-white/5 rounded-2xl px-5 py-3.5">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs uppercase tracking-wider text-[#EFE6D3]/50 font-medium">
            Looked up:
          </span>
          <span className="px-3 py-1 rounded-lg bg-[#C8973E]/15 text-[#C8973E] font-medium text-sm border border-[#C8973E]/30">
            &ldquo;{result.query}&rdquo;
          </span>
          {result.part_of_speech && (
            <span className="px-3 py-1 rounded-lg bg-white/5 text-[#EFE6D3]/80 text-xs font-medium border border-white/10">
              {result.part_of_speech}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleCopyAll}
          id="copy-all-btn"
          className="text-xs text-[#EFE6D3]/70 hover:text-[#C8973E] transition flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 cursor-pointer self-end sm:self-auto"
        >
          {copiedAll ? (
            <>
              <Check className="w-3.5 h-3.5 text-green-400" />
              <span className="text-green-400 font-medium">Copied All</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Full Entry</span>
            </>
          )}
        </button>
      </div>

      {/* 3-Column Result Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6" id="three-column-results">
        
        {/* 1. KANNADA CARD (Gold Accent) */}
        <div
          id="kannada-result-card"
          className="relative bg-[#211A14] border border-[#C8973E]/40 hover:border-[#C8973E]/70 rounded-2xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between group"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C8973E] rounded-t-2xl" />

          <div>
            {/* Header Badge & Action Icons */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C8973E]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#C8973E]">
                  ಕನ್ನಡ · Kannada
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleSpeak(result.kannada.word, 'kn-IN', 'kannada-word')}
                  id="speak-kannada-btn"
                  title="Listen to word"
                  aria-label="Listen to Kannada word"
                  className={`p-2 rounded-xl text-[#EFE6D3]/60 hover:text-[#C8973E] hover:bg-[#C8973E]/10 transition cursor-pointer ${
                    playingId === 'kannada-word' ? 'text-[#C8973E] scale-110' : ''
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(result.kannada.word, 'kannada')}
                  id="copy-kannada-btn"
                  title="Copy Kannada word"
                  aria-label="Copy Kannada word"
                  className="p-2 rounded-xl text-[#EFE6D3]/60 hover:text-[#C8973E] hover:bg-[#C8973E]/10 transition cursor-pointer"
                >
                  {copiedLang === 'kannada' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Word in Kannada Script */}
            <div className="mb-4">
              <h2 className="text-3xl sm:text-4xl font-bold font-kannada text-[#EFE6D3] tracking-wide leading-tight group-hover:text-[#F3ECE0] transition">
                {result.kannada.word}
              </h2>
              {result.kannada.pronunciation && (
                <p className="mt-1.5 text-sm text-[#C8973E] font-mono tracking-wide">
                  [{result.kannada.pronunciation}]
                </p>
              )}
            </div>

            <div className="h-px w-full bg-white/5 my-4" />

            {/* Meaning in Kannada */}
            <div className="space-y-1.5 mb-5">
              <span className="text-[11px] uppercase tracking-wider text-[#EFE6D3]/40 font-medium block">
                ಅರ್ಥ · Meaning
              </span>
              <p className="text-sm sm:text-base font-kannada text-[#EFE6D3]/90 leading-relaxed">
                {result.kannada.meaning}
              </p>
            </div>

            {/* Example Sentence Section */}
            {result.kannada.example_sentence && (
              <div className="mt-4 p-4 rounded-xl bg-[#17130F]/80 border border-[#C8973E]/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#C8973E] font-medium">
                    <Quote className="w-3 h-3" />
                    <span>ಉದಾಹರಣೆ · Example</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleSpeak(
                        result.kannada.example_sentence!.sentence,
                        'kn-IN',
                        'kannada-sentence'
                      )
                    }
                    title="Listen to example sentence"
                    className={`text-[#EFE6D3]/50 hover:text-[#C8973E] p-1 transition ${
                      playingId === 'kannada-sentence' ? 'text-[#C8973E] scale-110' : ''
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* Kannada sentence in Noto Serif Kannada */}
                <p className="font-kannada text-base text-[#EFE6D3] leading-relaxed">
                  {result.kannada.example_sentence.sentence}
                </p>
                {/* Romanized pronunciation */}
                <p className="text-xs text-[#C8973E]/90 italic font-mono">
                  &ldquo;{result.kannada.example_sentence.pronunciation}&rdquo;
                </p>
                {/* Translation */}
                <p className="text-xs text-[#EFE6D3]/70 font-sans-ui pt-0.5 border-t border-white/5">
                  <strong className="text-[#EFE6D3]/50 font-normal">Translation: </strong>
                  {result.kannada.example_sentence.translation}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#EFE6D3]/40">
            <span>Dravidian language</span>
            <span className="font-kannada text-[#C8973E]/80">ಕರ್ನಾಟಕ</span>
          </div>
        </div>

        {/* 2. ENGLISH CARD (Maroon/Coral Accent) */}
        <div
          id="english-result-card"
          className="relative bg-[#211A14] border border-[#A8493F]/40 hover:border-[#A8493F]/70 rounded-2xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between group"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#A8493F] rounded-t-2xl" />

          <div>
            {/* Header Badge & Action Icons */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#A8493F]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#E68A80]">
                  English
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleSpeak(result.english.word, 'en-US', 'english-word')}
                  id="speak-english-btn"
                  title="Listen to word"
                  aria-label="Listen to English word"
                  className={`p-2 rounded-xl text-[#EFE6D3]/60 hover:text-[#E68A80] hover:bg-[#A8493F]/10 transition cursor-pointer ${
                    playingId === 'english-word' ? 'text-[#E68A80] scale-110' : ''
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(result.english.word, 'english')}
                  id="copy-english-btn"
                  title="Copy English word"
                  aria-label="Copy English word"
                  className="p-2 rounded-xl text-[#EFE6D3]/60 hover:text-[#E68A80] hover:bg-[#A8493F]/10 transition cursor-pointer"
                >
                  {copiedLang === 'english' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Word in English */}
            <div className="mb-4">
              <h2 className="text-3xl sm:text-4xl font-semibold font-fraunces text-[#EFE6D3] tracking-tight leading-tight group-hover:text-[#F3ECE0] transition">
                {result.english.word}
              </h2>
              {result.english.pronunciation && (
                <p className="mt-1.5 text-sm text-[#E68A80] font-mono tracking-wide">
                  [{result.english.pronunciation}]
                </p>
              )}
            </div>

            <div className="h-px w-full bg-white/5 my-4" />

            {/* Meaning in English */}
            <div className="space-y-1.5 mb-5">
              <span className="text-[11px] uppercase tracking-wider text-[#EFE6D3]/40 font-medium block font-sans-ui">
                Definition
              </span>
              <p className="text-sm sm:text-base font-sans-ui text-[#EFE6D3]/90 leading-relaxed">
                {result.english.meaning}
              </p>
            </div>

            {/* Example Sentence Section in Fraunces */}
            {result.english.example_sentence && (
              <div className="mt-4 p-4 rounded-xl bg-[#17130F]/80 border border-[#A8493F]/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#E68A80] font-medium">
                    <Quote className="w-3 h-3" />
                    <span>Example Usage</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleSpeak(
                        result.english.example_sentence!.sentence,
                        'en-US',
                        'english-sentence'
                      )
                    }
                    title="Listen to example sentence"
                    className={`text-[#EFE6D3]/50 hover:text-[#E68A80] p-1 transition ${
                      playingId === 'english-sentence' ? 'text-[#E68A80] scale-110' : ''
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* English sentence in Fraunces */}
                <p className="font-fraunces text-base text-[#EFE6D3] leading-relaxed">
                  {result.english.example_sentence.sentence}
                </p>
                {/* Pronunciation guide */}
                <p className="text-xs text-[#E68A80]/90 italic font-mono">
                  &ldquo;{result.english.example_sentence.pronunciation}&rdquo;
                </p>
                {/* Translation / Context */}
                <p className="text-xs text-[#EFE6D3]/70 font-sans-ui pt-0.5 border-t border-white/5">
                  <strong className="text-[#EFE6D3]/50 font-normal">Context: </strong>
                  {result.english.example_sentence.translation}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#EFE6D3]/40 font-sans-ui">
            <span>Global bridge</span>
            <span className="text-[#E68A80]/80">International</span>
          </div>
        </div>

        {/* 3. TAMIL CARD (Teal Accent) */}
        <div
          id="tamil-result-card"
          className="relative bg-[#211A14] border border-[#3E7A70]/40 hover:border-[#3E7A70]/70 rounded-2xl p-6 shadow-xl transition-all duration-300 flex flex-col justify-between group"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#3E7A70] rounded-t-2xl" />

          <div>
            {/* Header Badge & Action Icons */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3E7A70]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#73BAAD]">
                  தமிழ் · Tamil
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleSpeak(result.tamil.word, 'ta-IN', 'tamil-word')}
                  id="speak-tamil-btn"
                  title="Listen to word"
                  aria-label="Listen to Tamil word"
                  className={`p-2 rounded-xl text-[#EFE6D3]/60 hover:text-[#73BAAD] hover:bg-[#3E7A70]/10 transition cursor-pointer ${
                    playingId === 'tamil-word' ? 'text-[#73BAAD] scale-110' : ''
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(result.tamil.word, 'tamil')}
                  id="copy-tamil-btn"
                  title="Copy Tamil word"
                  aria-label="Copy Tamil word"
                  className="p-2 rounded-xl text-[#EFE6D3]/60 hover:text-[#73BAAD] hover:bg-[#3E7A70]/10 transition cursor-pointer"
                >
                  {copiedLang === 'tamil' ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Word in Tamil Script */}
            <div className="mb-4">
              <h2 className="text-3xl sm:text-4xl font-bold font-tamil text-[#EFE6D3] tracking-wide leading-tight group-hover:text-[#F3ECE0] transition">
                {result.tamil.word}
              </h2>
              {result.tamil.pronunciation && (
                <p className="mt-1.5 text-sm text-[#73BAAD] font-mono tracking-wide">
                  [{result.tamil.pronunciation}]
                </p>
              )}
            </div>

            <div className="h-px w-full bg-white/5 my-4" />

            {/* Meaning in Tamil */}
            <div className="space-y-1.5 mb-5">
              <span className="text-[11px] uppercase tracking-wider text-[#EFE6D3]/40 font-medium block">
                பொருள் · Meaning
              </span>
              <p className="text-sm sm:text-base font-tamil text-[#EFE6D3]/90 leading-relaxed">
                {result.tamil.meaning}
              </p>
            </div>

            {/* Example Sentence Section in Noto Serif Tamil */}
            {result.tamil.example_sentence && (
              <div className="mt-4 p-4 rounded-xl bg-[#17130F]/80 border border-[#3E7A70]/20 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#73BAAD] font-medium">
                    <Quote className="w-3 h-3" />
                    <span>உதாரணம் · Example</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      handleSpeak(
                        result.tamil.example_sentence!.sentence,
                        'ta-IN',
                        'tamil-sentence'
                      )
                    }
                    title="Listen to example sentence"
                    className={`text-[#EFE6D3]/50 hover:text-[#73BAAD] p-1 transition ${
                      playingId === 'tamil-sentence' ? 'text-[#73BAAD] scale-110' : ''
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                {/* Tamil sentence in Noto Serif Tamil */}
                <p className="font-tamil text-base text-[#EFE6D3] leading-relaxed">
                  {result.tamil.example_sentence.sentence}
                </p>
                {/* Romanized pronunciation */}
                <p className="text-xs text-[#73BAAD]/90 italic font-mono">
                  &ldquo;{result.tamil.example_sentence.pronunciation}&rdquo;
                </p>
                {/* Translation */}
                <p className="text-xs text-[#EFE6D3]/70 font-sans-ui pt-0.5 border-t border-white/5">
                  <strong className="text-[#EFE6D3]/50 font-normal">Translation: </strong>
                  {result.tamil.example_sentence.translation}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-[#EFE6D3]/40">
            <span>Classical Dravidian</span>
            <span className="font-tamil text-[#73BAAD]/80">தமிழ்நாடு</span>
          </div>
        </div>

      </div>

      {/* Usage Note & Etymological Insight Card */}
      {result.note && (
        <div
          id="etymological-note-card"
          className="bg-[#211A14] border border-[#C8973E]/20 hover:border-[#C8973E]/40 rounded-2xl p-5 sm:p-6 transition shadow-lg"
        >
          <div className="flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-[#C8973E]/10 text-[#C8973E] shrink-0 mt-0.5">
              <Compass className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs uppercase tracking-wider text-[#C8973E] font-semibold">
                Lexical Nuance &amp; Cultural Context
              </h3>
              <p className="text-sm sm:text-base text-[#EFE6D3]/85 leading-relaxed font-sans-ui">
                {result.note}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
