export interface ExampleSentence {
  sentence: string;
  pronunciation: string;
  translation: string;
}

export interface LanguageEntry {
  word: string;
  pronunciation: string;
  meaning: string;
  example_sentence?: ExampleSentence;
}

export interface TrilingualDictionaryResult {
  kannada: LanguageEntry;
  english: LanguageEntry;
  tamil: LanguageEntry;
  part_of_speech: string;
  note: string;
  query?: string;
  detected_language?: 'kannada' | 'english' | 'tamil' | 'romanized' | 'auto';
}

export interface SearchChip {
  label: string;
  query: string;
  sub?: string;
  category?: string;
}
