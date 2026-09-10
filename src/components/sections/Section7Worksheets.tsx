import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  FileText,
  CheckCircle,
  Eye,
  EyeOff,
  Printer,
  Sparkles,
  Download,
  Award,
  BookOpen,
  HelpCircle,
  Check
} from 'lucide-react';

interface WorksheetDef {
  id: number;
  titleEn: string;
  titleAr: string;
  pageNumber: string;
  badge: string;
}

const WORKSHEETS: WorksheetDef[] = [
  { id: 1, titleEn: 'Worksheet 1: Look, read then tick (✓)', titleAr: 'ورقة عمل 1: انظر واقرأ ثم ضع علامة صح', pageNumber: 'Activity Book - Page 7', badge: 'اختيار من متعدد' },
  { id: 2, titleEn: 'Worksheet 2: Read & Match + Listen & Circle', titleAr: 'ورقة عمل 2: التوصيل وتحديد الكلمة المسموعة', pageNumber: 'Activity Book - Page 8', badge: 'توصيل + دوائر' },
  { id: 3, titleEn: 'Worksheet 3: Have got / Has got + Write About You', titleAr: 'ورقة عمل 3: إكمال الفراغات والكتابة عن النفس', pageNumber: 'Activity Book - Page 9', badge: 'قواعد وكتابة' },
  { id: 4, titleEn: 'Worksheet 4: Grammar Mastery (have got / has got)', titleAr: 'ورقة عمل 4: اختبار القواعد النحوية الشامل', pageNumber: "Student's Book - Page 10", badge: 'قواعد تخصصية' },
  { id: 5, titleEn: 'Worksheet 5: Phonics & Sounds Lab ("oo" sound)', titleAr: 'ورقة عمل 5: الصوتيات وتمييز صوت الحرفين oo', pageNumber: "Student's Book - Page 11", badge: 'صوتيات وقراءة' },
  { id: 6, titleEn: 'Worksheet 6: Dialogue & Reading Comprehension', titleAr: 'ورقة عمل 6: استيعاب وفهم محادثة العودة للمدرسة', pageNumber: "Student's Book - Page 9", badge: 'استيعاب مقروء' },
  { id: 7, titleEn: 'Worksheet 7: Unit 1 Comprehensive Final Exam', titleAr: 'ورقة عمل 7: الاختبار النهائي الشامل للوحدة الأولى', pageNumber: 'Curriculum Final Review', badge: 'اختبار ختامي' },
];

export const Section7Worksheets: React.FC = () => {
  const [selectedWorksheetId, setSelectedWorksheetId] = useState<number>(1);
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);

  // Student inputs for worksheets
  const [ws1Answers, setWs1Answers] = useState<Record<number, string>>({});
  const [ws2Match, setWs2Match] = useState<Record<number, string>>({});
  const [ws2Circle, setWs2Circle] = useState<Record<number, string>>({});
  const [ws3Fill, setWs3Fill] = useState<Record<number, string>>({});
  const [ws3Self, setWs3Self] = useState({ name: '', city: '', livingWith: '', age: '', siblings: '' });
  const [ws4Grammar, setWs4Grammar] = useState<Record<number, string>>({});
  const [ws5Phonics, setWs5Phonics] = useState<Record<number, string>>({});
  const [ws6Dialogue, setWs6Dialogue] = useState<Record<number, string>>({});
  const [ws7Exam, setWs7Exam] = useState<Record<number, string>>({});

  const handlePrint = () => {
    window.print();
  };

  const handleToggleModelAnswer = () => {
    const nextState = !showModelAnswer;
    setShowModelAnswer(nextState);
    if (nextState) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const currentWs = WORKSHEETS.find((w) => w.id === selectedWorksheetId) || WORKSHEETS[0];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/50 to-slate-900 border border-blue-800/40 rounded-3xl p-6 sm:p-8 no-print">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-3">
              <span>القسم السابع والأخير</span>
              <span>•</span>
              <span className="font-english">7 Curriculum Worksheets</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              <span className="font-english text-cyan-400">7. Curriculum Worksheets & Model Answers</span>
              <span className="text-slate-300 text-lg sm:text-xl font-normal font-arabic">(أوراق عمل المنهاج والحلول النموذجية)</span>
            </h1>
            <p className="text-sm text-slate-400 mt-2">
              جميع أوراق العمل السبعة المعتمدة في كتاب الأنشطة وكتاب الطالب، مع ميزة التبديل بين وضع الحل التفاعلي وإظهار الحل النموذجي المعتمد من المعلمة جيداء صقر.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="toggle-model-answer-btn"
              onClick={handleToggleModelAnswer}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                showModelAnswer
                  ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400/50'
                  : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40'
              }`}
            >
              {showModelAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showModelAnswer ? 'إخفاء الحل النموذجي' : 'عرض الحل النموذجي المعتمد'}</span>
            </button>

            <button
              id="print-worksheet-btn"
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة ورقة العمل</span>
            </button>
          </div>
        </div>

        {/* 7 Worksheets Selector Chips */}
        <div className="flex gap-2 overflow-x-auto pt-6 pb-2 no-scrollbar">
          {WORKSHEETS.map((ws) => (
            <button
              key={ws.id}
              id={`select-ws-${ws.id}`}
              onClick={() => setSelectedWorksheetId(ws.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                selectedWorksheetId === ws.id
                  ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-950/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-white'
              }`}
            >
              <span className="font-english font-black">WS #{ws.id}</span>
              <span>{ws.titleAr.replace(/^ورقة عمل \d+:\s*/, '')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Worksheet Display Card (Styled like official textbook page) */}
      <div
        id="printable-worksheet-area"
        className="p-6 sm:p-10 rounded-3xl bg-slate-900 border-2 border-slate-800 shadow-2xl relative space-y-8"
      >
        {/* Worksheet Header Header (Textbook style) */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-slate-950 font-black font-english text-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              {currentWs.id}
            </div>
            <div>
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider font-english">
                {currentWs.pageNumber}
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-english text-white">
                {currentWs.titleEn}
              </h2>
              <p className="text-xs text-slate-400 font-arabic">{currentWs.titleAr}</p>
            </div>
          </div>

          <div className="text-right sm:text-left text-xs text-slate-400">
            <div className="font-bold text-cyan-300 font-arabic">بإشراف وتدريس المعلمة جيداء صقر</div>
            <div className="font-english text-[11px] text-slate-500">MORE ENGLISH MORE LOVE</div>
          </div>
        </div>

        {/* Model Answer Banner if toggled */}
        {showModelAnswer && (
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/50 text-amber-300 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                <strong>الحل النموذجي مفعل:</strong> الإجابات الصحيحة موضحة باللون الأزرق والأخضر ومطابقة تماماً لنسخة المعلمة في كتاب الطالب.
              </span>
            </div>
            <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-full font-english">
              OFFICIAL KEY
            </span>
          </div>
        )}

        {/* ========================================================= */}
        {/* WORKSHEET 1: LOOK, READ THEN TICK (PAGE 7) */}
        {/* ========================================================= */}
        {selectedWorksheetId === 1 && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
              <strong className="text-white font-english">1 Look, read then tick (✓).</strong> انظر، اقرأ ثم ضع علامة (✓) بجانب الجملة الصحيحة المعبرة عن الصورة.
            </div>

            {/* Q1 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="font-bold text-sm text-cyan-300">1. Sally's Family Picture (سالي مع إخوتها):</div>
              <div className="space-y-2 text-sm">
                <div
                  onClick={() => setWs1Answers({ ...ws1Answers, 1: 'a' })}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                    ws1Answers[1] === 'a' ? 'border-cyan-400 bg-slate-900' : 'border-slate-800 bg-slate-950'
                  }`}
                >
                  <div>
                    <span className="font-english font-bold text-white">a- Sally has got two sisters.</span>
                    <span className="text-xs text-slate-400 mr-2 font-arabic">(سالي لديها أختان.)</span>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center">
                    {ws1Answers[1] === 'a' && <span className="text-cyan-400 font-bold">✓</span>}
                  </div>
                </div>

                <div
                  onClick={() => setWs1Answers({ ...ws1Answers, 1: 'b' })}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                    showModelAnswer || ws1Answers[1] === 'b'
                      ? 'border-emerald-500 bg-emerald-950/20 text-emerald-300'
                      : 'border-slate-800 bg-slate-950'
                  }`}
                >
                  <div>
                    <span className="font-english font-bold">b- Sally has got a sister and a brother.</span>
                    <span className="text-xs opacity-80 mr-2 font-arabic">(سالي لديها أخت وأخ.)</span>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-emerald-500 bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                    ✓
                  </div>
                </div>
              </div>
            </div>

            {/* Q2 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="font-bold text-sm text-cyan-300">2. Living Arrangement (العائلة والمنزل):</div>
              <div className="space-y-2 text-sm">
                <div
                  onClick={() => setWs1Answers({ ...ws1Answers, 2: 'a' })}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                    showModelAnswer || ws1Answers[2] === 'a'
                      ? 'border-emerald-500 bg-emerald-950/20 text-emerald-300'
                      : 'border-slate-800 bg-slate-950'
                  }`}
                >
                  <div>
                    <span className="font-english font-bold">a- They live with their parents.</span>
                    <span className="text-xs opacity-80 mr-2 font-arabic">(هم يعيشون مع والديهم.)</span>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-emerald-500 bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                    ✓
                  </div>
                </div>

                <div
                  onClick={() => setWs1Answers({ ...ws1Answers, 2: 'b' })}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                    ws1Answers[2] === 'b' ? 'border-cyan-400 bg-slate-900' : 'border-slate-800 bg-slate-950'
                  }`}
                >
                  <div>
                    <span className="font-english font-bold text-white">b- They live with their grandparents.</span>
                    <span className="text-xs text-slate-400 mr-2 font-arabic">(هم يعيشون مع أجدادهم.)</span>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center">
                    {ws1Answers[2] === 'b' && <span className="text-cyan-400 font-bold">✓</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Q3 */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
              <div className="font-bold text-sm text-cyan-300">3. Going to School (الذهاب للمدرسة):</div>
              <div className="space-y-2 text-sm">
                <div
                  onClick={() => setWs1Answers({ ...ws1Answers, 3: 'a' })}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                    showModelAnswer || ws1Answers[3] === 'a'
                      ? 'border-emerald-500 bg-emerald-950/20 text-emerald-300'
                      : 'border-slate-800 bg-slate-950'
                  }`}
                >
                  <div>
                    <span className="font-english font-bold">a- Sally walks to school.</span>
                    <span className="text-xs opacity-80 mr-2 font-arabic">(سالي تمشي إلى المدرسة.)</span>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-emerald-500 bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">
                    ✓
                  </div>
                </div>

                <div
                  onClick={() => setWs1Answers({ ...ws1Answers, 3: 'b' })}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
                    ws1Answers[3] === 'b' ? 'border-cyan-400 bg-slate-900' : 'border-slate-800 bg-slate-950'
                  }`}
                >
                  <div>
                    <span className="font-english font-bold text-white">b- Sally goes to school by car.</span>
                    <span className="text-xs text-slate-400 mr-2 font-arabic">(سالي تذهب إلى المدرسة بالسيارة.)</span>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center">
                    {ws1Answers[3] === 'b' && <span className="text-cyan-400 font-bold">✓</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* WORKSHEET 2: MATCH + LISTEN AND CIRCLE (PAGE 8) */}
        {/* ========================================================= */}
        {selectedWorksheetId === 2 && (
          <div className="space-y-8">
            {/* Part 2: Read and Match */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
                <strong className="text-white font-english">2 Read and match.</strong> اقرأ وصل كل سؤال بالجواب المناسب.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="text-xs font-bold text-cyan-400">الأسئلة (Questions):</div>
                  {[
                    { id: 1, q: '1- How old are you?', ans: 'b' },
                    { id: 2, q: '2- Where do you live?', ans: 'c' },
                    { id: 3, q: '3- Who do you live with?', ans: 'd' },
                    { id: 4, q: "4- What's your brother's name?", ans: 'a' },
                  ].map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-sm"
                    >
                      <span className="font-english text-white">{item.q}</span>
                      <span
                        className={`w-7 h-7 rounded-lg font-bold font-english flex items-center justify-center text-xs ${
                          showModelAnswer
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : 'bg-slate-800 text-cyan-400'
                        }`}
                      >
                        {showModelAnswer ? item.ans : ws2Match[item.id] || '؟'}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-bold text-blue-400">الإجابات (Answers):</div>
                  {[
                    { key: 'a', text: "a - He's Dani." },
                    { key: 'b', text: "b - I'm ten years old." },
                    { key: 'c', text: 'c - I live in a flat in London.' },
                    { key: 'd', text: 'd - I live with my parents.' },
                  ].map((opt) => (
                    <div
                      key={opt.key}
                      className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm font-english text-slate-200"
                    >
                      {opt.text}
                    </div>
                  ))}
                </div>
              </div>

              {showModelAnswer && (
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs text-cyan-300 font-mono font-bold">
                  Answers: 1 → b | 2 → c | 3 → d | 4 → a
                </div>
              )}
            </div>

            {/* Part 3: Listen and Circle */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
                <strong className="text-white font-english">3 Listen and circle.</strong> استمع وضع دائرة حول الكلمة الصحيحة.
              </div>

              <div className="space-y-3">
                {[
                  { id: 1, pre: "1- I'm Steve. I'm", opt1: 'nine', opt2: 'ten', suf: 'years old.', correct: 'ten' },
                  { id: 2, pre: '2- I live with my', opt1: 'parents', opt2: 'grandmother', suf: '.', correct: 'parents' },
                  { id: 3, pre: '3- I go to school by', opt1: 'bus', opt2: 'car', suf: '.', correct: 'bus' },
                  { id: 4, pre: "4- I've got a", opt1: 'brother', opt2: 'sister', suf: 'in grade one.', correct: 'sister' },
                ].map((item) => (
                  <div key={item.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-sm flex items-center justify-between">
                    <div className="font-english text-white">
                      {item.pre}{' '}
                      <span className="font-bold text-cyan-400">
                        (
                        <span
                          className={`px-2 py-0.5 rounded cursor-pointer ${
                            showModelAnswer && item.correct === item.opt1
                              ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
                              : ''
                          }`}
                        >
                          {item.opt1}
                        </span>
                        {' , '}
                        <span
                          className={`px-2 py-0.5 rounded cursor-pointer ${
                            showModelAnswer && item.correct === item.opt2
                              ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
                              : ''
                          }`}
                        >
                          {item.opt2}
                        </span>
                        )
                      </span>{' '}
                      {item.suf}
                    </div>

                    {showModelAnswer && (
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded-lg border border-emerald-500/30">
                        الحل: {item.correct}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* WORKSHEET 3: READ AND WRITE + WRITE ABOUT YOU (PAGE 9) */}
        {/* ========================================================= */}
        {selectedWorksheetId === 3 && (
          <div className="space-y-8">
            {/* Part 4 */}
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <div>
                  <strong className="text-white font-english">4 Read and write.</strong> اقرأ واكتب الفراغات باستخدام (have got / has got).
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold">
                    have got
                  </span>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono text-xs font-bold">
                    has got
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { id: 1, sentence: '1- Maya ________ a little sister.', ans: 'has got' },
                  { id: 2, sentence: '2- I ________ two brothers.', ans: 'have got' },
                  { id: 3, sentence: '3- He ________ a car.', ans: 'has got' },
                  { id: 4, sentence: '4- We ________ a nice flat.', ans: 'have got' },
                ].map((item) => (
                  <div key={item.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div className="font-english text-white text-base">
                      {item.sentence.replace('________', '')}
                      <span className="px-3 py-1 mx-2 rounded-lg bg-slate-900 border border-slate-700 text-cyan-400 font-bold">
                        {showModelAnswer ? item.ans : ws3Fill[item.id] || '..........'}
                      </span>
                    </div>
                    {showModelAnswer && (
                      <span className="text-xs font-bold text-emerald-400 font-english font-mono">
                        {item.ans}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Part 5: Write about you */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
                <strong className="text-white font-english">5 Write about you.</strong> اكتب عن نفسك في بطاقة الدفتر المدرسي.
              </div>

              <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-english">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">My name's</span>
                  <span className="font-bold text-cyan-400 underline underline-offset-4">
                    {showModelAnswer ? 'Ali' : '__________'}
                  </span>
                  <span className="text-slate-400">.</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400">I live in</span>
                  <span className="font-bold text-cyan-400 underline underline-offset-4">
                    {showModelAnswer ? 'Damascus' : '__________'}
                  </span>
                  <span className="text-slate-400">.</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400">I live with my</span>
                  <span className="font-bold text-cyan-400 underline underline-offset-4">
                    {showModelAnswer ? 'parents' : '__________'}
                  </span>
                  <span className="text-slate-400">.</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400">I'm</span>
                  <span className="font-bold text-cyan-400 underline underline-offset-4">
                    {showModelAnswer ? 'ten' : '__________'}
                  </span>
                  <span className="text-slate-400">years old.</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-400">I've got</span>
                  <span className="font-bold text-cyan-400 underline underline-offset-4">
                    {showModelAnswer ? 'one brother and one sister' : '__________'}
                  </span>
                  <span className="text-slate-400">.</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* WORKSHEETS 4-7: ADVANCED CURRICULUM SHEETS */}
        {/* ========================================================= */}
        {selectedWorksheetId === 4 && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
              <strong className="text-white font-english">Grammar Mastery:</strong> ورقة عمل القواعد الشاملة (have got / has got).
            </div>
            {[
              { q: '1. They _______ a new computer at school.', ans: 'have got' },
              { q: '2. She _______ a beautiful doll.', ans: 'has got' },
              { q: '3. We _______ a big garden.', ans: 'have got' },
              { q: '4. Zak _______ a little brother.', ans: 'has got' },
              { q: '5. I _______ an English lesson today.', ans: 'have got' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-sm">
                <span className="font-english text-white">{item.q}</span>
                <span className={`px-3 py-1 rounded-lg font-bold font-mono text-xs ${showModelAnswer ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-500'}`}>
                  {showModelAnswer ? item.ans : 'have/has got'}
                </span>
              </div>
            ))}
          </div>
        )}

        {selectedWorksheetId === 5 && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
              <strong className="text-white font-english">Phonics & "oo" Sound Sheet:</strong> استخرج الكلمات التي تحتوي على صوت /uː/ من الوحدة.
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['ZOO (حديقة حيوانات)', 'broom (مكنسة)', 'school (مدرسة)', 'book (كتاب)', 'spoon (ملعقة)', 'moon (قمر)'].map((w, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-1">
                  <div className="font-english font-bold text-white text-base">{w.split(' ')[0]}</div>
                  <div className="text-xs text-slate-400 font-arabic">{w.split(' ')[1]}</div>
                  <span className="inline-block text-[10px] text-amber-400 font-mono font-bold">/uː/ sound ✓</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedWorksheetId === 6 && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
              <strong className="text-white font-english">Dialogue Comprehension:</strong> أسئلة فهم محادثة الدرس الأول (Back to School).
            </div>
            {[
              { q: '1. What grade is Zak in?', ans: 'He is in grade three.' },
              { q: '2. Where does Zak live?', ans: 'He lives in a flat with his parents.' },
              { q: "3. Who is Carla's brother?", ans: 'John is her brother.' },
              { q: "4. What is the teacher's name?", ans: 'Her name is Miss Maria.' },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-sm">
                <div className="font-english font-bold text-white">{item.q}</div>
                <div className={`p-2.5 rounded-lg text-xs font-english ${showModelAnswer ? 'bg-emerald-950/30 text-emerald-300 border border-emerald-500/30 font-bold' : 'bg-slate-900 text-slate-500'}`}>
                  {showModelAnswer ? item.ans : 'اكتب إجابتك هنا...'}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedWorksheetId === 7 && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400">
              <strong className="text-white font-english">Unit 1 Comprehensive Exam:</strong> الاختبار الختامي للوحدة الأولى من المنهاج.
            </div>
            <div className="space-y-3 text-sm">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="font-english text-white">Q1: Choose: I (have got / has got) a little brother.</span>
                <span className={`px-2.5 py-1 rounded font-bold text-xs ${showModelAnswer ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400'}`}>
                  {showModelAnswer ? 'have got' : '؟'}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="font-english text-white">Q2: Choose: Maya lives in a (flat / car) in Damascus.</span>
                <span className={`px-2.5 py-1 rounded font-bold text-xs ${showModelAnswer ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400'}`}>
                  {showModelAnswer ? 'flat' : '؟'}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="font-english text-white">Q3: Match: "How are you?" → ("I'm fine. Thank you.")</span>
                <span className={`px-2.5 py-1 rounded font-bold text-xs ${showModelAnswer ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400'}`}>
                  {showModelAnswer ? 'Correct Match' : '؟'}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="font-english text-white">Q4: Phonics: Is "broom" pronounced with /uː/ sound?</span>
                <span className={`px-2.5 py-1 rounded font-bold text-xs ${showModelAnswer ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400'}`}>
                  {showModelAnswer ? 'Yes' : '؟'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Worksheet Footer (Official Signature) */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>منهاج اللغة الإنجليزية التفاعلي — المعلمة جيداء صقر</span>
          </div>
          <div className="font-english text-[11px] text-slate-500">
            Unit 1: Back to School • All Rights Reserved
          </div>
        </div>
      </div>
    </div>
  );
};
