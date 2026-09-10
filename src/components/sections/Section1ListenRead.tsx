import React, { useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Square,
  Repeat,
  Sparkles,
  BookOpen,
  Users,
  Eye,
  EyeOff
} from 'lucide-react';
import { DIALOGUE_ITEMS, DialogueLineItem } from '../../data/curriculumData';
import { speakEnglish, stopSpeaking } from '../../utils/speech';

export const Section1ListenRead: React.FC = () => {
  const [activeLineId, setActiveLineId] = useState<string | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [showArabic, setShowArabic] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.9);

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleSpeakLine = (item: DialogueLineItem) => {
    setActiveLineId(item.id);
    speakEnglish(item.textEn, playbackSpeed, 1.0, () => {
      setActiveLineId(null);
    });
  };

  const handlePlayAll = () => {
    if (isPlayingAll) {
      stopSpeaking();
      setIsPlayingAll(false);
      setActiveLineId(null);
      return;
    }

    setIsPlayingAll(true);
    let index = 0;

    const playNext = () => {
      if (index >= DIALOGUE_ITEMS.length) {
        setIsPlayingAll(false);
        setActiveLineId(null);
        return;
      }

      const item = DIALOGUE_ITEMS[index];
      setActiveLineId(item.id);

      speakEnglish(item.textEn, playbackSpeed, 1.0, () => {
        index++;
        setTimeout(playNext, 600);
      });
    };

    playNext();
  };

  const filteredItems = selectedRole === 'all'
    ? DIALOGUE_ITEMS
    : DIALOGUE_ITEMS.filter((item) => item.speaker.toLowerCase().includes(selectedRole.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/50 to-slate-900 border border-blue-800/40 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-3">
              <span>الوحدة 1 • الدرس 1</span>
              <span>•</span>
              <span className="font-english">Page 9 in Student's Book</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <span className="font-english text-cyan-400">1. Back to School</span>
              <span className="text-slate-300 text-lg sm:text-xl font-normal font-arabic">(العودة إلى المدرسة)</span>
            </h1>
            <p className="text-sm text-slate-400 mt-2 flex items-center gap-2">
              <span className="font-bold text-slate-200 font-english">Listen and read:</span>
              <span>استمع واقرأ المحادثات التفاعلية مع شخصيات الدرس وتدرب على النطق الصحيح.</span>
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="play-all-dialogue-btn"
              onClick={handlePlayAll}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                isPlayingAll
                  ? 'bg-rose-600 hover:bg-rose-500 text-white'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
              }`}
            >
              {isPlayingAll ? <Square className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-slate-950" />}
              <span>{isPlayingAll ? 'إيقاف التشغيل' : 'تشغيل المحادثة كاملة'}</span>
            </button>

            <button
              onClick={() => setShowArabic(!showArabic)}
              className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              {showArabic ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showArabic ? 'إخفاء الترجمة' : 'إظهار الترجمة'}</span>
            </button>

            {/* Speed toggle */}
            <button
              onClick={() => setPlaybackSpeed(playbackSpeed === 0.9 ? 0.75 : 0.9)}
              className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-mono font-bold border border-slate-700 cursor-pointer"
              title="تغيير سرعة النطق"
            >
              {playbackSpeed === 0.9 ? '1x عادي' : '0.75x هادئ'}
            </button>
          </div>
        </div>
      </div>

      {/* Role Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 text-xs font-bold pl-2 flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          <span>تصفية بالشخصية:</span>
        </span>
        {['all', 'John', 'Carla', 'Zak', 'Maria'].map((role) => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              selectedRole === role
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200'
            }`}
          >
            {role === 'all' ? 'جميع الشخصيات' : role}
          </button>
        ))}
      </div>

      {/* Dialogue Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.map((item, idx) => {
          const isActive = activeLineId === item.id;
          return (
            <div
              key={item.id}
              id={`dialogue-item-${item.id}`}
              className={`p-4 sm:p-5 rounded-2xl border transition-all relative ${
                isActive
                  ? 'bg-gradient-to-br from-cyan-950/60 to-slate-900 border-cyan-400 ring-2 ring-cyan-500/30 shadow-xl shadow-cyan-950/50 scale-[1.01]'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                {/* Speaker Avatar & Name */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-xl shadow-inner">
                    {item.avatar}
                  </div>
                  <div>
                    <div className="font-english font-bold text-white text-sm flex items-center gap-2">
                      <span>{item.speaker}</span>
                      <span className="text-xs font-normal text-slate-400 font-arabic">({item.speakerAr})</span>
                    </div>
                    <span className="text-[10px] text-cyan-400 font-medium font-english">
                      Line #{idx + 1}
                    </span>
                  </div>
                </div>

                {/* Speak Button */}
                <button
                  id={`speak-btn-${item.id}`}
                  onClick={() => handleSpeakLine(item)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 animate-pulse'
                      : 'bg-slate-800/80 hover:bg-slate-700 text-cyan-400 border-slate-700'
                  }`}
                  title="استمع للنطق"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Text Area */}
              <div className="mt-3.5 space-y-2">
                <p className="text-base sm:text-lg font-english font-medium text-white tracking-wide leading-relaxed">
                  "{item.textEn}"
                </p>

                {showArabic && (
                  <p className="text-xs sm:text-sm text-slate-400 font-arabic border-r-2 border-cyan-500/50 pr-2">
                    {item.textAr}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
