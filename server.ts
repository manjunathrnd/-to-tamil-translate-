import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory cache to handle repeated searches and avoid redundant API pressure
const lookupCache = new Map<string, any>();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client lazily / securely
  const getAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not configured.');
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'Word — ಪದ — சொல் Trilingual Dictionary' });
  });

  // Candidate models to fallback if one model experiences high demand spikes (503 / 429)
  const FALLBACK_MODELS = [
    'gemini-3.7-flash',
    'gemini-flash-latest',
    'gemini-3.1-flash-lite',
  ];

  // Helper to call Gemini with retry & model fallback
  async function generateTrilingualLookup(ai: GoogleGenAI, cleanWord: string) {
    const systemInstruction = `You are an expert trilingual lexicographer, linguist, and scholar specializing in Kannada, English, and Tamil.
Your task is to take a single word or phrase inputted by the user in ANY script (Kannada script, Tamil script, English/Latin script, or romanized/transliterated forms such as "sneha", "belaku", "vanakkam", "maram", "anbu", "neeru", "thanni", "hello", "namaskara", "light", etc.).

Instructions:
1. Identify the input word's meaning accurately. If it is romanized/transliterated, resolve it to the most natural intended word in Kannada/Tamil/English.
2. Provide the direct lexical equivalent, pronunciation, definition, and a practical example sentence in all three languages:
   - Kannada: 
     * word in native Kannada script (e.g. ನಮಸ್ಕಾರ / ಹಲೋ)
     * accurate romanized pronunciation (e.g. namaskāra)
     * clear one-sentence definition in Kannada
     * example_sentence: a natural sentence in Kannada script, its romanized pronunciation, and its English translation.
   - English: 
     * word in English (e.g. Hello / Greeting)
     * phonetic pronunciation (e.g. /həˈloʊ/)
     * clear one-sentence definition in English
     * example_sentence: a natural sentence in English, phonetic guide, and its meaning/translation.
   - Tamil: 
     * word in native Tamil script (e.g. வணக்கம் / ஹலோ)
     * accurate romanized pronunciation (e.g. vaṇakkam)
     * clear one-sentence definition in Tamil
     * example_sentence: a natural sentence in Tamil script, its romanized pronunciation, and its English translation.
3. Identify the part of speech (e.g., "Noun", "Verb", "Adjective", "Adverb", "Interjection / Greeting", "Idiom").
4. Provide a rich, informative short "note" explaining any interesting nuances, shared Dravidian etymology/cognates, cultural context, or common contextual usage (in English, so all readers can appreciate the comparative linguistic connection).
5. Ensure strict fidelity and valid JSON matching the exact schema.`;

    const schemaConfig = {
      systemInstruction,
      temperature: 0.2,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          kannada: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING, description: 'The word in native Kannada script' },
              pronunciation: { type: Type.STRING, description: 'Romanized phonetic pronunciation' },
              meaning: { type: Type.STRING, description: 'One-sentence meaning/definition in Kannada' },
              example_sentence: {
                type: Type.OBJECT,
                properties: {
                  sentence: { type: Type.STRING, description: 'Example sentence in Kannada script' },
                  pronunciation: { type: Type.STRING, description: 'Romanized pronunciation of the sentence' },
                  translation: { type: Type.STRING, description: 'English translation of the sentence' },
                },
                required: ['sentence', 'pronunciation', 'translation'],
              },
            },
            required: ['word', 'pronunciation', 'meaning', 'example_sentence'],
          },
          english: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING, description: 'The word in English' },
              pronunciation: { type: Type.STRING, description: 'English pronunciation/phonetics' },
              meaning: { type: Type.STRING, description: 'One-sentence meaning/definition in English' },
              example_sentence: {
                type: Type.OBJECT,
                properties: {
                  sentence: { type: Type.STRING, description: 'Example sentence in English' },
                  pronunciation: { type: Type.STRING, description: 'Phonetic or pronunciation guide' },
                  translation: { type: Type.STRING, description: 'Context or meaning of the sentence' },
                },
                required: ['sentence', 'pronunciation', 'translation'],
              },
            },
            required: ['word', 'pronunciation', 'meaning', 'example_sentence'],
          },
          tamil: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING, description: 'The word in native Tamil script' },
              pronunciation: { type: Type.STRING, description: 'Romanized phonetic pronunciation' },
              meaning: { type: Type.STRING, description: 'One-sentence meaning/definition in Tamil' },
              example_sentence: {
                type: Type.OBJECT,
                properties: {
                  sentence: { type: Type.STRING, description: 'Example sentence in Tamil script' },
                  pronunciation: { type: Type.STRING, description: 'Romanized pronunciation of the sentence' },
                  translation: { type: Type.STRING, description: 'English translation of the sentence' },
                },
                required: ['sentence', 'pronunciation', 'translation'],
              },
            },
            required: ['word', 'pronunciation', 'meaning', 'example_sentence'],
          },
          part_of_speech: {
            type: Type.STRING,
            description: 'Part of speech, e.g. Interjection, Noun, Verb',
          },
          note: {
            type: Type.STRING,
            description: 'Short usage note, etymological insight, or cultural nuance',
          },
        },
        required: ['kannada', 'english', 'tamil', 'part_of_speech', 'note'],
      },
    };

    let lastError: any = null;

    // Try candidate models in order if transient 503 or overload happens
    for (const modelName of FALLBACK_MODELS) {
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: `Look up this word: "${cleanWord}"`,
            config: schemaConfig,
          });

          const responseText = response.text;
          if (!responseText) {
            throw new Error('Empty response from model');
          }

          const parsed = JSON.parse(responseText);
          parsed.query = cleanWord;
          return parsed;
        } catch (err: any) {
          lastError = err;
          const isDemandError =
            err?.message?.includes('503') ||
            err?.message?.includes('demand') ||
            err?.message?.includes('UNAVAILABLE') ||
            err?.message?.includes('RESOURCE_EXHAUSTED') ||
            err?.status === 'UNAVAILABLE';

          if (isDemandError && attempt === 0) {
            // Wait 500ms before quick retry
            await new Promise((resolve) => setTimeout(resolve, 500));
            continue;
          }
          // Break to next candidate model if 503/demand error
          if (isDemandError) {
            break;
          }
          // If other error, also try next model fallback
          break;
        }
      }
    }

    throw lastError || new Error('All model candidates were unavailable.');
  }

  // Dictionary Lookup API endpoint
  app.post('/api/lookup', async (req, res) => {
    const { word } = req.body;

    if (!word || typeof word !== 'string' || !word.trim()) {
      return res.status(400).json({ error: 'Please provide a valid word to look up.' });
    }

    const cleanWord = word.trim();
    const cacheKey = cleanWord.toLowerCase();

    // Check cache
    if (lookupCache.has(cacheKey)) {
      return res.json(lookupCache.get(cacheKey));
    }

    try {
      const ai = getAI();
      const result = await generateTrilingualLookup(ai, cleanWord);

      // Cache successful response
      lookupCache.set(cacheKey, result);

      return res.json(result);
    } catch (err: any) {
      console.error('Lookup error:', err);
      const isDemandError =
        err?.message?.includes('503') ||
        err?.message?.includes('demand') ||
        err?.message?.includes('UNAVAILABLE');

      const userMessage = isDemandError
        ? 'The AI model is momentarily experiencing high traffic. Please tap "Try Again" in a moment.'
        : err.message || 'Failed to fetch trilingual dictionary definition. Please try again.';

      return res.status(isDemandError ? 503 : 500).json({
        error: userMessage,
      });
    }
  });

  // Vite middleware for development or static serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Word — ಪದ — சொல் server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
