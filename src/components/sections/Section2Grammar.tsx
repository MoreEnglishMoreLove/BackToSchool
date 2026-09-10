import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Volume2,
  HelpCircle,
  ArrowRight,
  BookOpen,
  Award
} from 'lucide-react';
import { speakEnglish } from '../../utils/speech';

interface GrammarQuizItem {
  id: string;
  subject: string;
  subjectAr: string;
  correctAnswer: 'have got' | 'has got';
  predicate: string;
  predicateAr: string;
  explanation: string;
}

const GRAMMAR_QUIZ: GrammarQuizItem[] = [
  {
    id: 'g1',
    subject: 'Maya',
    subjectAr: 'مايا (She)',
    correctAnswer: 'has got',
    predicate: 'a little sister.',
    predicateAr: 'أخت صغيرة.',
    explanation: 'مايا اسم مفرد مؤنث يعامل معاملة (She)، لذلك نستخدم has got.',
  },
  {
    id: 'g2',
    subject: 'I',
    subjectAr: 'أنا',
    correctAnswer: 'have got',
    predicate: 'two brothers.',
    predicateAr: 'أخوان.',
    explanation: 'الضمير I يأخذ دائماً have got.',
  },
  {
    id: 'g3',
    subject: 'He',
    subjectAr: 'هو',
    correctAnswer: 'has got',
    predicate: 'a car.',
    predicateAr: 'سيارة.',
    explanation: 'الضمير He للمفرد المذكر يأخذ has got.',
  },
  {
    id: 'g4',
    subject: 'We',
    subjectAr: 'نحن',
    correctAnswer: 'have got',
    predicate: 'a nice flat.',
    predicateAr: 'شقة جميلة.',
    explanation: 'الضمير We للجمع يأخذ have got.',
  },
  {
    id: 'g5',
    subject: 'She',
    subjectAr: 'هي',
    correctAnswer: 'has got',
    predicate: 'a doll.',
    predicateAr: 'دمية.',
    explanation: 'الضمير She يأخذ has got.',
  },
  {
    id: 'g6',
    subject: 'They',
    subjectAr: 'هم',
    correctAnswer: 'have got',
    predicate: 'a cat.',
    predicateAr: 'قطة.',
    explanation: 'الضمير They للجمع يأخذ have got.',
  },
];

export const Section2Grammar: React.FC = () => {
  // Practice answers state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'have got' | 'has got'>>({});
  const [showResults, setShowResults] = useState(false);

  // Interactive Sentence Builder state
  const [builderSubject, setBuilderSubject] = useState<'I' | 'He' | 'She' | 'They' | 'We'>('I');
  const [builderVerb, setBuilderVerb] = useState<'have got' | 'has got'>('have got');
  const [builderObject, setBuilderObject] = useState<string>('a big house');

  const subjectsList: Array<{ en: 'I' | 'He' | 'She' | 'They' | 'We'; ar: string; correctVerb: 'have got' | 'has got' }> = [
    { en: 'I', ar: 'أنا', correctVerb: 'have got' },
    { en: 'He', ar: 'هو', correctVerb: 'has got' },
    { en: 'She', ar: 'هي', correctVerb: 'has got' },
    { en: 'They', ar: 'هم', correctVerb: 'have got' },
    { en: 'We', ar: 'نحن', correctVerb: 'have got' },
  ];

  const objectsList = [
    { en: 'a big house', ar: 'منزل كبير' },
    { en: 'a ball', ar: 'كرة' },
    { en: 'two brothers', ar: 'أخوان' },
    { en: 'a nice flat', ar: 'شقة جميلة' },
    { en: 'a green book', ar: 'كتاب أخضر' },
  ];

  const handleSelectQuizAnswer = (id: string, answer: 'have got' | 'has got') => {
    setSelectedAnswers((prev) => ({ ...prev, [id]: answer }));
  };

  const calculateScore = () => {
    let score = 0;
    GRAMMAR_QUIZ.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  const builtSentence = `${builderSubject} ${builderVerb} ${builderObject}.`;
  const isBuilderCorrect =
    (builderSubject === 'He' || builderSubject === 'She')
      ? builderVerb === 'has got'
      : builderVerb === 'have got';

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Title */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/50 to-slate-900 border border-blue-800/40 rounded-3xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-3">
          <span>الوحدة 1 • الدرس 2</span>
          <span>•</span>
          <span className="font-english">Page 10 in Student's Book</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
          <span className="font-english text-cyan-400">2. Grammar: Have got & Has got</span>
          <span className="text-slate-300 text-lg sm:text-xl font-normal font-arabic">(القاعدة النحوية للملكية)</span>
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          تعلم كيف تعبر عن الملكية واستخدام <code className="text-cyan-300 font-bold font-english">have got</code> و <code className="text-cyan-300 font-bold font-english">has got</code> بالشكل الصحيح مع كل ضمير.
        </p>
      </div>

      {/* Grammar Rules Table (From Student Book Page 10) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* HAVE GOT Card */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
              <h2 className="text-xl font-black font-english text-cyan-400">have got</h2>
              <span className="text-xs text-slate-400 font-arabic">(لدي / لدينا / لديهم)</span>
            </div>
            <button
              onClick={() => speakEnglish('We have got a big house.')}
              className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
              title="نطق المثال"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-300">تستخدم مع الضمائر التالية:</div>
            <div className="flex flex-wrap gap-2">
              {['I (أنا)', 'You (أنت / أنتم)', 'We (نحن)', 'They (هم)'].map((p) => (
                <span
                  key={p}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold text-xs font-english"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-300">أمثلة الكتاب المدرسي:</div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="font-english text-white font-medium">We have got a big house.</div>
                <div className="text-slate-400 text-[11px]">لدينا منزل كبير.</div>
              </div>
              <button
                onClick={() => speakEnglish('We have got a big house.')}
                className="text-cyan-400 hover:text-cyan-300 p-1"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="font-english text-white font-medium">I have got a book.</div>
                <div className="text-slate-400 text-[11px]">لدي كتاب.</div>
              </div>
              <button
                onClick={() => speakEnglish('I have got a book.')}
                className="text-cyan-400 hover:text-cyan-300 p-1"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* HAS GOT Card */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-blue-500/40 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-400"></span>
              <h2 className="text-xl font-black font-english text-blue-400">has got</h2>
              <span className="text-xs text-slate-400 font-arabic">(لديه / لديها / للمفرد)</span>
            </div>
            <button
              onClick={() => speakEnglish('He has got a ball.')}
              className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30"
              title="نطق المثال"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-slate-300">تستخدم مع المفرد والضمائر:</div>
            <div className="flex flex-wrap gap-2">
              {['He (هو)', 'She (هي)', 'It (هو/هي لغير العاقل)', 'Singular Noun (اسم مفرد)'].map((p) => (
                <span
                  key={p}
                  className="px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-300 font-bold text-xs font-english"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="font-bold text-slate-300">أمثلة الكتاب المدرسي:</div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="font-english text-white font-medium">He has got a ball.</div>
                <div className="text-slate-400 text-[11px]">لقد حصل على كرة / لديه كرة.</div>
              </div>
              <button
                onClick={() => speakEnglish('He has got a ball.')}
                className="text-blue-400 hover:text-blue-300 p-1"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
              <div>
                <div className="font-english text-white font-medium">She has got a doll.</div>
                <div className="text-slate-400 text-[11px]">لديها دمية.</div>
              </div>
              <button
                onClick={() => speakEnglish('She has got a doll.')}
                className="text-blue-400 hover:text-blue-300 p-1"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Sentence Builder */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h2 className="text-lg font-bold text-white">مختبر تركيب الجمل التفاعلي (Interactive Builder)</h2>
        </div>
        <p className="text-xs text-slate-400">
          اختر الفاعل والفعل والمفعول به لتكوين جملتك بنفسك والتحقق من صحتها سماعياً!
        </p>

        {/* Step 1: Subject */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-2">1. اختر الفاعل (Subject):</label>
          <div className="flex flex-wrap gap-2">
            {subjectsList.map((s) => (
              <button
                key={s.en}
                onClick={() => {
                  setBuilderSubject(s.en);
                  setBuilderVerb(s.correctVerb);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  builderSubject === s.en
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="font-english text-sm">{s.en}</span>{' '}
                <span className="text-[11px] opacity-80">({s.ar})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Verb */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-2">2. اختر الفعل المناسب (Verb):</label>
          <div className="flex gap-3">
            {(['have got', 'has got'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setBuilderVerb(v)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold font-english transition-all cursor-pointer ${
                  builderVerb === v
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Object */}
        <div>
          <label className="block text-xs font-bold text-slate-300 mb-2">3. اختر التكملة (Object):</label>
          <div className="flex flex-wrap gap-2">
            {objectsList.map((o) => (
              <button
                key={o.en}
                onClick={() => setBuilderObject(o.en)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  builderObject === o.en
                    ? 'bg-slate-800 text-cyan-300 border border-cyan-500/50'
                    : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="font-english font-bold">{o.en}</span>{' '}
                <span className="text-[11px] text-slate-400">({o.ar})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Output Box */}
        <div
          className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
            isBuilderCorrect
              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/20 border-rose-500/40 text-rose-300'
          }`}
        >
          <div className="space-y-1 text-center sm:text-right">
            <div className="text-xs font-semibold flex items-center gap-1.5 justify-center sm:justify-start">
              {isBuilderCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">جملة صحيحة قواعدياً وممتازة!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span className="text-rose-400">انتبه! الفاعل المختار لا يتطابق مع الفعل.</span>
                </>
              )}
            </div>
            <div className="font-english text-xl sm:text-2xl font-black text-white tracking-wide">
              {builtSentence}
            </div>
          </div>

          <button
            onClick={() => speakEnglish(builtSentence)}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>نطق الجملة</span>
          </button>
        </div>
      </div>

      {/* Quick Interactive Exercise */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-cyan-400" />
              <span>تطبيق سريع: اختر الفعل الصحيح (Quick Practice)</span>
            </h2>
            <p className="text-xs text-slate-400">من أوراق عمل وتمارين الكتاب المدرسي</p>
          </div>

          <button
            onClick={() => setShowResults(!showResults)}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold transition-all cursor-pointer"
          >
            {showResults ? 'إخفاء التصحيح' : 'تصحيح إجاباتي'}
          </button>
        </div>

        <div className="space-y-3">
          {GRAMMAR_QUIZ.map((q, idx) => {
            const chosen = selectedAnswers[q.id];
            const isCorrect = chosen === q.correctAnswer;

            return (
              <div
                key={q.id}
                className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="font-english text-base text-white font-medium flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-cyan-400 text-xs flex items-center justify-center font-bold">
                      {idx + 1}
                    </span>
                    <strong className="text-cyan-300">{q.subject}</strong>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-dashed border-slate-700 text-slate-400">
                      {chosen || '.....'}
                    </span>
                    <span>{q.predicate}</span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {q.subjectAr} — {q.predicateAr}
                  </div>
                  {showResults && (
                    <div
                      className={`text-xs mt-1.5 flex items-center gap-1.5 ${
                        isCorrect ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'
                      }`}
                    >
                      {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span>{q.explanation}</span>
                    </div>
                  )}
                </div>

                {/* Choice buttons */}
                <div className="flex items-center gap-2 self-end md:self-center">
                  {(['have got', 'has got'] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelectQuizAnswer(q.id, opt)}
                      className={`px-3 py-1.5 rounded-xl font-english text-xs font-bold transition-all cursor-pointer ${
                        chosen === opt
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-900 text-slate-300 border border-slate-700 hover:border-slate-600'
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

        {showResults && (
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 text-center font-bold text-cyan-300">
            درجتك: {calculateScore()} من {GRAMMAR_QUIZ.length} — أحسنت يا بطل! 🌟
          </div>
        )}
      </div>
    </div>
  );
};
