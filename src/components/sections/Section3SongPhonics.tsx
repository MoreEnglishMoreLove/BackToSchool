import React, { useState, useEffect } from 'react';
import {
  Music,
  Play,
  Square,
  Volume2,
  Sparkles,
  Repeat,
  Radio,
  Mic,
  Award
} from 'lucide-react';
import { SONG_LINES, PHONICS_WORDS, PhonicsWord } from '../../data/curriculumData';
import { speakEnglish, stopSpeaking } from '../../utils/speech';

export const Section3SongPhonics: React.FC = () => {
  const [activeSongLineIndex, setActiveSongLineIndex] = useState<number | null>(null);
  const [isSinging, setIsSinging] = useState(false);
  const [activeWordId, setActiveWordId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handlePlaySong = () => {
    if (isSinging) {
      stopSpeaking();
      setIsSinging(false);
      setActiveSongLineIndex(null);
      return;
    }

    setIsSinging(true);
    let index = 0;

    const singNextLine = () => {
      if (index >= SONG_LINES.length) {
        setIsSinging(false);
        setActiveSongLineIndex(null);
        return;
      }

      setActiveSongLineIndex(index);
      const line = SONG_LINES[index];
      // Faster, rhythmic pitch for song
      speakEnglish(line.en, 1.0, 1.15, () => {
        index++;
        setTimeout(singNextLine, 500);
      });
    };

    singNextLine();
  };

  const handlePlayWord = (p: PhonicsWord) => {
    setActiveWordId(p.id);
    speakEnglish(p.word, 0.8, 1.0, () => {
      setActiveWordId(null);
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/50 to-slate-900 border border-blue-800/40 rounded-3xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-3">
          <span>الوحدة 1 • الدرس 3</span>
          <span>•</span>
          <span className="font-english">Page 11 in Student's Book</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
          <span className="font-english text-cyan-400">3. Song & Phonics (oo Sound)</span>
          <span className="text-slate-300 text-lg sm:text-xl font-normal font-arabic">(أنشودة العودة للمدرسة وصوتيات الحروف)</span>
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          استمع وغنّ أنشودة <span className="text-cyan-300 font-english font-bold">Going back to school today</span>، ثم تدرب على نطق حرفي <span className="text-yellow-400 font-bold font-english text-base">"oo"</span> في مختلف الكلمات!
        </p>
      </div>

      {/* Part 1: Listen and Sing (Interactive Karaoke Card) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
              <Music className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black font-english text-white">5. Listen and sing (استمع وغنِّ)</h2>
              <p className="text-xs text-slate-400">كاراوكي تفاعلي لمتابعة وترديد كلمات الأنشودة سطراً بسطر</p>
            </div>
          </div>

          <button
            id="sing-song-btn"
            onClick={handlePlaySong}
            className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
              isSinging
                ? 'bg-rose-600 hover:bg-rose-500 text-white'
                : 'bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-black shadow-amber-500/20'
            }`}
          >
            {isSinging ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-slate-950" />}
            <span>{isSinging ? 'إيقاف الأنشودة' : 'بدء تشغيل الأنشودة بالصوت'}</span>
          </button>
        </div>

        {/* Lyrics List */}
        <div className="space-y-3">
          {SONG_LINES.map((line, idx) => {
            const isLineActive = activeSongLineIndex === idx;
            return (
              <div
                key={line.id}
                onClick={() => {
                  setActiveSongLineIndex(idx);
                  speakEnglish(line.en, 1.0, 1.15, () => setActiveSongLineIndex(null));
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isLineActive
                    ? 'bg-gradient-to-r from-amber-500/20 via-rose-500/20 to-slate-900 border-amber-400 scale-[1.01] shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center font-english ${
                      isLineActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div>
                    <div
                      className={`font-english text-base sm:text-lg font-bold tracking-wide ${
                        line.highlight ? 'text-amber-400' : 'text-white'
                      }`}
                    >
                      {line.en}
                    </div>
                    <div className="text-xs text-slate-400 font-arabic">{line.ar}</div>
                  </div>
                </div>

                <Volume2
                  className={`w-4 h-4 transition-colors ${
                    isLineActive ? 'text-amber-400 animate-bounce' : 'text-slate-600'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Phonics "oo" Sound (From Student Book Page 11) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-400 to-amber-500 flex items-center justify-center text-slate-950 font-black text-2xl font-english shadow-lg shadow-yellow-500/20">
              oo
            </div>
            <div>
              <h2 className="text-xl font-black font-english text-white">
                6. Listen to the sounds and words, then repeat them
              </h2>
              <p className="text-xs text-slate-400">
                استمع إلى صوت الحرفين <span className="text-yellow-400 font-bold font-english text-sm">"oo"</span> والكلمات وكررها بصوت مرتفع
              </p>
            </div>
          </div>

          <button
            onClick={() => speakEnglish('zoo, broom, school, book, spoon, moon')}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-xs font-bold transition-all"
          >
            <Radio className="w-4 h-4" />
            <span>نطق جميع الكلمات</span>
          </button>
        </div>

        {/* Phonics Words Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {PHONICS_WORDS.map((p) => {
            const isCurrent = activeWordId === p.id;
            return (
              <button
                key={p.id}
                id={`phonics-btn-${p.id}`}
                onClick={() => handlePlayWord(p)}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                  isCurrent
                    ? 'bg-yellow-500/20 border-yellow-400 ring-2 ring-yellow-400/30 shadow-lg scale-105'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-950'
                }`}
              >
                <div className="text-3xl">{p.icon}</div>
                <div className="font-english font-black text-lg text-white tracking-wider flex items-center gap-0.5">
                  {p.word.includes('oo') ? (
                    <>
                      <span>{p.word.split('oo')[0]}</span>
                      <span className="text-yellow-400 font-extrabold underline decoration-yellow-400">oo</span>
                      <span>{p.word.split('oo')[1]}</span>
                    </>
                  ) : (
                    <span className="text-yellow-400">{p.word}</span>
                  )}
                </div>
                <div className="text-xs text-slate-400 font-arabic">{p.arabicMeaning}</div>
                <div className="text-[10px] text-cyan-400 flex items-center gap-1 font-medium">
                  <Volume2 className="w-3 h-3" />
                  <span>اضغط للاستماع</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
