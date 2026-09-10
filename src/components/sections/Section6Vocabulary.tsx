import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  Search,
  Sparkles,
  Layers,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { UNIT_VOCABULARY, VocabularyItem } from '../../data/curriculumData';
import { speakEnglish } from '../../utils/speech';

export const Section6Vocabulary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const categories = ['all', 'School', 'Family', 'Home', 'Emotions', 'Grammar'];

  const filteredVocab = UNIT_VOCABULARY.filter((v) => {
    const matchesCategory = selectedCategory === 'all' || v.category === selectedCategory;
    const matchesSearch =
      v.wordEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.wordAr.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSpeak = (word: string) => {
    speakEnglish(word, 0.85);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/50 to-slate-900 border border-blue-800/40 rounded-3xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-3">
          <span>الوحدة 1 • الدرس 6</span>
          <span>•</span>
          <span className="font-english">Unit Vocabulary & Audio Bank</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
          <span className="font-english text-cyan-400">6. Vocabulary & Pronunciation Bank</span>
          <span className="text-slate-300 text-lg sm:text-xl font-normal font-arabic">(بنك الكلمات والمفردات الصوتية)</span>
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          مفردات الوحدة الأولى كاملة مع النطق الصوتي الدقيق والترجمة وجمل توضيحية من سياق الكتاب المدرسي.
        </p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-700 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'جميع الكلمات' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
            <input
              type="text"
              placeholder="بحث عن كلمة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-9 pl-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Vocabulary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVocab.map((v) => {
          const isFlipped = flippedCards[v.id];

          return (
            <div
              key={v.id}
              className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between gap-4 relative shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{v.icon}</span>
                    <div>
                      <h3 className="font-english font-black text-xl text-white tracking-wide">
                        {v.wordEn}
                      </h3>
                      <div className="font-mono text-xs text-cyan-400 font-english">
                        {v.pronunciation}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSpeak(v.wordEn)}
                    className="p-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-colors cursor-pointer"
                    title="استمع للنطق"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-3 text-sm font-bold text-slate-200 font-arabic border-r-2 border-cyan-500 pr-2">
                  {v.wordAr}
                </div>
              </div>

              {/* Example Sentence Box */}
              <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 uppercase font-bold font-english">
                    Example Sentence:
                  </span>
                  <button
                    onClick={() => handleSpeak(v.sentenceEn)}
                    className="text-cyan-400 hover:text-cyan-300 p-0.5"
                    title="نطق المثال"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="font-english text-xs font-medium text-white">{v.sentenceEn}</div>
                <div className="text-[11px] text-slate-400 font-arabic">{v.sentenceAr}</div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span className="bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                  {v.category}
                </span>
                <span className="text-cyan-400/80 font-medium">MORE ENGLISH MORE LOVE</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
