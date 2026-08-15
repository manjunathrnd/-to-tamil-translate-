import { SearchChip, TrilingualDictionaryResult } from '../types';

export const PRESET_CHIPS: SearchChip[] = [
  { label: 'Hello (ನಮಸ್ಕಾರ / வணக்கம்)', query: 'hello', sub: 'Greeting', category: 'Conversation' },
  { label: 'ಸ್ನೇಹ (Sneha)', query: 'sneha', sub: 'Friendship / நட்பு', category: 'Emotion' },
  { label: 'Light', query: 'light', sub: 'ಬೆಳಕು / வெளிச்சம்', category: 'Nature' },
  { label: 'வணக்கம் (Vanakkam)', query: 'vanakkam', sub: 'Greeting / ನಮಸ್ಕಾರ', category: 'Culture' },
  { label: 'ಅರಿವು (Arivu)', query: 'arivu', sub: 'Wisdom / அறிவு', category: 'Mind' },
  { label: 'Anbu (அன்பு)', query: 'anbu', sub: 'Love / ಪ್ರೀತಿ', category: 'Emotion' },
  { label: 'ಕನಸು (Kanasu)', query: 'kanasu', sub: 'Dream / கனவு', category: 'Abstract' },
  { label: 'Water (ನೀರು / நீர்)', query: 'water', sub: 'Neeru / Neer', category: 'Nature' },
];

export const INITIAL_SAMPLE_RESULT: TrilingualDictionaryResult = {
  kannada: {
    word: 'ನಮಸ್ಕಾರ / ಹಲೋ',
    pronunciation: 'namaskāra / halō',
    meaning: 'ಸ್ನೇಹಿತರು ಅಥವಾ ಇತರರನ್ನು ಭೇಟಿಯಾದಾಗ ಪ್ರೀತಿ ಹಾಗೂ ಗೌರವದಿಂದ ಮಾಡುವ ಅಭಿವಂದನೆ.',
    example_sentence: {
      sentence: 'ಹಲೋ, ನೀವು ಹೇಗಿದ್ದೀರಿ? ನಿಮ್ಮನ್ನು ಭೇಟಿಯಾಗಿದ್ದು ತುಂಬಾ ಸಂತೋಷವಾಯಿತು.',
      pronunciation: 'Halō, nīvu hēgiddīri? Nimmannu bhēṭiyāgiddu tumbā santōṣavāyitu.',
      translation: 'Hello, how are you? It was a great pleasure meeting you.',
    },
  },
  english: {
    word: 'Hello',
    pronunciation: '/həˈloʊ/',
    meaning: 'An expression of greeting, greeting someone on arrival or when answering a call.',
    example_sentence: {
      sentence: '“Hello! It is wonderful to see you after such a long time,” she said with a warm smile.',
      pronunciation: '/həˈloʊ ɪt ɪz ˈwʌndərfəl tuː siː juː ˈæftər sʌtʃ ə lɔːŋ taɪm/',
      translation: 'Used as an inviting, friendly salutation upon encountering someone.',
    },
  },
  tamil: {
    word: 'வணக்கம் / ஹலோ',
    pronunciation: 'vaṇakkam / halō',
    meaning: 'மற்றவர்களைச் சந்திக்கும் போது அல்லது உரையாடலைத் தொடங்கும் போது கூறும் மரியாதைக்குரிய வாழ்த்து.',
    example_sentence: {
      sentence: 'வணக்கம், நீங்கள் நலமாக இருக்கிறீர்களா? உங்களைச் சந்தித்ததில் மிக்க மகிழ்ச்சி.',
      pronunciation: 'Vaṇakkam, nīṅkaḷ nalamāka irukkiṟīrkaḷā? Uṅkaḷaic cantittatil mikka makiḻcci.',
      translation: 'Hello, are you doing well? Very pleased to meet you.',
    },
  },
  part_of_speech: 'Interjection / Greeting (ಅವ್ಯಯ / வாழ்த்துச்சொல்)',
  note: 'In traditional Indian culture, "ನಮಸ್ಕಾರ" (Namaskāra) in Kannada and "வணக்கம்" (Vaṇakkam) in Tamil are deep gestures of respect meaning "I bow to the divinity within you." "Hello" is adopted universally in modern phone and informal conversational contexts.',
  query: 'hello',
};
