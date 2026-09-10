import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  CheckCircle2,
  XCircle,
  Volume2,
  RotateCcw,
  Sparkles,
  Trophy,
  HelpCircle,
  ArrowLeftRight
} from 'lucide-react';
import { speakEnglish } from '../../utils/speech';

export const Section5InteractiveGames: React.FC = () => {
  const [activeGame, setActiveGame] = useState<'match' | 'circle' | 'tick'>('match');

  // GAME 1: READ AND MATCH (Page 8 Activity 2)
  const [matchAnswers, setMatchAnswers] = useState<Record<number, string>>({});
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  const matchQuestions = [
    { id: 1, textEn: '1- How old are you?', textAr: 'كم عمرك؟', correctKey: 'b' },
    { id: 2, textEn: '2- Where do you live?', textAr: 'أين تعيش؟', correctKey: 'c' },
    { id: 3, textEn: '3- Who do you live with?', textAr: 'مع من تعيش؟', correctKey: 'd' },
    { id: 4, textEn: "4- What's your brother's name?", textAr: 'ما اسم أخيك؟', correctKey: 'a' },
  ];

  const matchOptions = [
    { key: 'a', textEn: "a - He's Dani.", textAr: 'اسمه داني.' },
    { key: 'b', textEn: "b - I'm ten years old.", textAr: 'عمري عشر سنوات.' },
    { key: 'c', textEn: 'c - I live in a flat in London.', textAr: 'أعيش في شقة في لندن.' },
    { key: 'd', textEn: 'd - I live with my parents.', textAr: 'أعيش مع والديّ.' },
  ];

  // GAME 2: LISTEN AND CIRCLE (Page 8 Activity 3)
  const [circleAnswers, setCircleAnswers] = useState<Record<number, string>>({});
  const circleQuestions = [
    {
      id: 1,
      prefix: "1- I'm Steve. I'm",
      options: ['nine', 'ten'],
      correct: 'ten',
      suffix: 'years old.',
      ar: 'أنا ستيف. عمري (تسع ، عشر) سنوات.',
      fullSentence: "I'm Steve. I'm ten years old.",
    },
    {
      id: 2,
      prefix: '2- I live with my',
      options: ['parents', 'grandmother'],
      correct: 'parents',
      suffix: '.',
      ar: 'أعيش مع (والديّ ، جدتي).',
      fullSentence: 'I live with my parents.',
    },
    {
      id: 3,
      prefix: '3- I go to school by',
      options: ['bus', 'car'],
      correct: 'bus',
      suffix: '.',
      ar: 'أذهب إلى المدرسة بـ (الباص ، السيارة).',
      fullSentence: 'I go to school by bus.',
    },
    {
      id: 4,
      prefix: "4- I've got a",
      options: ['brother', 'sister'],
      correct: 'sister',
      suffix: 'in grade one.',
      ar: 'لدي (أخ ، أخت) في الصف الأول.',
      fullSentence: "I've got a sister in grade one.",
    },
  ];

  // GAME 3: LOOK, READ THEN TICK (Page 7 Activity 1)
  const [tickAnswers, setTickAnswers] = useState<Record<number, 'a' | 'b'>>({});
  const tickItems = [
    {
      id: 1,
      title: 'Sally & Siblings (صورة سالي مع إخوتها)',
      icon: '👧👦👧',
      options: [
        { key: 'a', textEn: 'Sally has got two sisters.', textAr: 'سالي لديها أختان.' },
        { key: 'b', textEn: 'Sally has got a sister and a brother.', textAr: 'سالي لديها أخت وأخ.' },
      ],
      correct: 'b',
    },
    {
      id: 2,
      title: 'Family Living (صورة العائلة والمنزل)',
      icon: '👨‍👩‍👧‍👦',
      options: [
        { key: 'a', textEn: 'They live with their parents.', textAr: 'هم يعيشون مع والديهم.' },
        { key: 'b', textEn: 'They live with their grandparents.', textAr: 'هم يعيشون مع أجدادهم.' },
      ],
      correct: 'a',
    },
    {
      id: 3,
      title: 'Going to School (صورة الذهاب للمدرسة)',
      icon: '🏫🚶',
      options: [
        { key: 'a', textEn: 'Sally walks to school.', textAr: 'سالي تمشي إلى المدرسة.' },
        { key: 'b', textEn: 'Sally goes to school by car.', textAr: 'سالي تذهب إلى المدرسة بالسيارة.' },
      ],
      correct: 'a',
    },
  ];

  const handleMatchSelect = (optionKey: string) => {
    if (selectedQuestionId === null) return;
    setMatchAnswers((prev) => ({
      ...prev,
      [selectedQuestionId]: optionKey,
    }));
    setSelectedQuestionId(null);
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/50 to-slate-900 border border-blue-800/40 rounded-3xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-3">
          <span>الوحدة 1 • الدرس 5</span>
          <span>•</span>
          <span className="font-english">Interactive Workbook Games</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
          <span className="font-english text-cyan-400">5. Interactive Games & Quizzes</span>
          <span className="text-slate-300 text-lg sm:text-xl font-normal font-arabic">(الألعاب والتمارين التفاعلية)</span>
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          تمارين كتاب الأنشطة بالكامل بصيغة ألعاب تفاعلية ذاتية التصحيح مع نطق صوتي واحتفال بالإنجاز!
        </p>

        {/* Game Switcher Tabs */}
        <div className="flex flex-wrap gap-2 mt-6">
          <button
            onClick={() => setActiveGame('match')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeGame === 'match'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900/80 text-slate-300 border border-slate-700 hover:border-slate-600'
            }`}
          >
            <ArrowLeftRight className="w-4 h-4" />
            <span>لعبة التوصيل (Read and match)</span>
          </button>

          <button
            onClick={() => setActiveGame('circle')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeGame === 'circle'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900/80 text-slate-300 border border-slate-700 hover:border-slate-600'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>استمع واختر (Listen and circle)</span>
          </button>

          <button
            onClick={() => setActiveGame('tick')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeGame === 'tick'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900/80 text-slate-300 border border-slate-700 hover:border-slate-600'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>ضع علامة صح (Look and tick)</span>
          </button>
        </div>
      </div>

      {/* GAME 1: READ AND MATCH */}
      {activeGame === 'match' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white font-english">2. Read and match (اقرأ ووصل)</h2>
              <p className="text-xs text-slate-400">اضغط على السؤال أولاً، ثم اضغط على الإجابة المطابقة له</p>
            </div>

            <button
              onClick={() => {
                setMatchAnswers({ 1: 'b', 2: 'c', 3: 'd', 4: 'a' });
                triggerCelebration();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold"
            >
              عرض الحل النموذجي
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Questions Column */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider font-english">
                Questions (الأسئلة):
              </h3>
              {matchQuestions.map((q) => {
                const answer = matchAnswers[q.id];
                const isSelected = selectedQuestionId === q.id;
                const isCorrect = answer === q.correctKey;

                return (
                  <div
                    key={q.id}
                    onClick={() => setSelectedQuestionId(q.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 ring-2 ring-cyan-500/30'
                        : answer
                        ? isCorrect
                          ? 'bg-emerald-950/30 border-emerald-500/40'
                          : 'bg-rose-950/30 border-rose-500/40'
                        : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-english font-bold text-white text-base">{q.textEn}</div>
                      <div className="text-xs text-slate-400 font-arabic">{q.textAr}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      {answer ? (
                        <span className="w-8 h-8 rounded-xl bg-cyan-500 text-slate-950 font-black font-english text-sm flex items-center justify-center">
                          {answer}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-500">اختر...</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Answers Column */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-blue-400 uppercase tracking-wider font-english">
                Answers (الإجابات):
              </h3>
              {matchOptions.map((opt) => (
                <div
                  key={opt.key}
                  onClick={() => handleMatchSelect(opt.key)}
                  className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-900 transition-all cursor-pointer flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-english font-bold text-white text-base">{opt.textEn}</div>
                    <div className="text-xs text-slate-400 font-arabic">{opt.textAr}</div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      speakEnglish(opt.textEn.replace(/^[a-d]\s*-\s*/, ''));
                    }}
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-cyan-400"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Bar */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              مطابقات صحيحة:{' '}
              <strong className="text-cyan-400">
                {Object.entries(matchAnswers).filter(([k, v]) => {
                  const q = matchQuestions.find((mq) => mq.id === Number(k));
                  return q && q.correctKey === v;
                }).length}{' '}
                / 4
              </strong>
            </span>
            <button
              onClick={() => setMatchAnswers({})}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة المحاولة</span>
            </button>
          </div>
        </div>
      )}

      {/* GAME 2: LISTEN AND CIRCLE */}
      {activeGame === 'circle' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white font-english">
                3. Listen and circle (استمع وضع دائرة)
              </h2>
              <p className="text-xs text-slate-400">
                استمع إلى المتحدث ستيف، ثم اختر الكلمة الصحيحة المسموعة
              </p>
            </div>

            <button
              onClick={() => {
                setCircleAnswers({ 1: 'ten', 2: 'parents', 3: 'bus', 4: 'sister' });
                triggerCelebration();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold"
            >
              عرض الحل النموذجي
            </button>
          </div>

          <div className="space-y-4">
            {circleQuestions.map((cq) => {
              const chosen = circleAnswers[cq.id];
              const isCorrect = chosen === cq.correct;

              return (
                <div
                  key={cq.id}
                  className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => speakEnglish(cq.fullSentence)}
                        className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                        title="استمع للجملة بصوت ستيف"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <div className="font-english text-lg text-white font-medium">
                        {cq.prefix}{' '}
                        <span className="font-bold text-cyan-400 underline decoration-2 underline-offset-4">
                          ( {cq.options.join(' , ')} )
                        </span>{' '}
                        {cq.suffix}
                      </div>
                    </div>
                    <div className="text-xs text-slate-400 mr-10">{cq.ar}</div>
                  </div>

                  {/* Options to click/circle */}
                  <div className="flex items-center gap-2 mr-10 md:mr-0">
                    {cq.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setCircleAnswers((prev) => ({ ...prev, [cq.id]: opt }));
                          if (opt === cq.correct) triggerCelebration();
                        }}
                        className={`px-4 py-2 rounded-xl font-english text-sm font-bold transition-all cursor-pointer ${
                          chosen === opt
                            ? isCorrect
                              ? 'bg-emerald-500 text-slate-950 ring-4 ring-emerald-500/30'
                              : 'bg-rose-500 text-white ring-4 ring-rose-500/30'
                            : 'bg-slate-900 text-slate-300 border border-slate-700 hover:border-cyan-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* GAME 3: LOOK, READ THEN TICK */}
      {activeGame === 'tick' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-bold text-white font-english">
                1. Look, read then tick (✓) (انظر واقرأ ثم ضع علامة)
              </h2>
              <p className="text-xs text-slate-400">تمرين كتاب الأنشطة - الصفحة 7</p>
            </div>

            <button
              onClick={() => {
                setTickAnswers({ 1: 'b', 2: 'a', 3: 'a' });
                triggerCelebration();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-bold"
            >
              عرض الحل النموذجي
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {tickItems.map((ti) => {
              const selected = tickAnswers[ti.id];
              return (
                <div key={ti.id} className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-bold text-cyan-300">
                    <span className="text-xl">{ti.icon}</span>
                    <span>{ti.title}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {ti.options.map((opt) => {
                      const isChosen = selected === opt.key;
                      const isRight = opt.key === ti.correct;

                      return (
                        <div
                          key={opt.key}
                          onClick={() => {
                            setTickAnswers((prev) => ({ ...prev, [ti.id]: opt.key as 'a' | 'b' }));
                            if (opt.key === ti.correct) triggerCelebration();
                          }}
                          className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            isChosen
                              ? isRight
                                ? 'bg-emerald-950/30 border-emerald-500/50'
                                : 'bg-rose-950/30 border-rose-500/50'
                              : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div>
                            <div className="font-english text-sm font-bold text-white">{opt.textEn}</div>
                            <div className="text-xs text-slate-400">{opt.textAr}</div>
                          </div>

                          <div
                            className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                              isChosen
                                ? isRight
                                  ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                                  : 'bg-rose-500 border-rose-400 text-white'
                                : 'border-slate-700 text-transparent'
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
