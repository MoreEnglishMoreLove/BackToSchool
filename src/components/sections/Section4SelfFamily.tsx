import React, { useState } from 'react';
import {
  User,
  Users,
  MapPin,
  Calendar,
  Volume2,
  Sparkles,
  Heart,
  Check,
  Send,
  MessageSquare
} from 'lucide-react';
import { speakEnglish } from '../../utils/speech';

interface Section4SelfFamilyProps {
  initialStudentName?: string;
}

export const Section4SelfFamily: React.FC<Section4SelfFamilyProps> = ({
  initialStudentName = 'Ali',
}) => {
  const [name, setName] = useState(initialStudentName || 'Ali');
  const [city, setCity] = useState('Damascus');
  const [age, setAge] = useState('10');
  const [livingWith, setLivingWith] = useState('my parents');
  const [siblings, setSiblings] = useState('one brother and one sister');

  // Full English presentation paragraph
  const fullScript = `Hello! My name's ${name}. I'm ${age} years old. I live in ${city}. I live with ${livingWith}. I've got ${siblings}. I love my family and I love my school!`;

  const handleSpeakSentence = (text: string) => {
    speakEnglish(text);
  };

  const handleSpeakAll = () => {
    speakEnglish(fullScript, 0.85);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/50 to-slate-900 border border-blue-800/40 rounded-3xl p-6 sm:p-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold mb-3">
          <span>الوحدة 1 • الدرس 4</span>
          <span>•</span>
          <span className="font-english">Pages 9 & 10 in Student's Book</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
          <span className="font-english text-cyan-400">4. Talk About Your Family & Yourself</span>
          <span className="text-slate-300 text-lg sm:text-xl font-normal font-arabic">(التحدث عن العائلة والنفس)</span>
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          تدرب على تقديم نفسك وعائلتك ومدينتك وعمرك باللغة الإنجليزية كما في كتاب الطالب وأوراق العمل النموذجية.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Customizer */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <User className="w-5 h-5 text-cyan-400" />
            <h2 className="text-base font-bold text-white">اكتب وتدرب على معلوماتك الشخصية:</h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              اسمك (My name's):
            </label>
            <input
              id="talk-name-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white font-medium focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              عمرك (I'm ... years old):
            </label>
            <div className="flex gap-2">
              {['8', '9', '10', '11', '12'].map((a) => (
                <button
                  key={a}
                  onClick={() => setAge(a)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    age === a
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              مدينتك (I live in ...):
            </label>
            <input
              id="talk-city-input"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="مثال: Damascus, Aleppo, Homs, London..."
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white font-medium focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              مع من تعيش؟ (I live with ...):
            </label>
            <select
              id="talk-living-select"
              value={livingWith}
              onChange={(e) => setLivingWith(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:border-cyan-400"
            >
              <option value="my parents">my parents (مع والديّ)</option>
              <option value="my family">my family (مع عائلتي)</option>
              <option value="my grandparents">my grandparents (مع أجدادي)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              إخوتك (I've got ...):
            </label>
            <select
              id="talk-siblings-select"
              value={siblings}
              onChange={(e) => setSiblings(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white focus:border-cyan-400"
            >
              <option value="one brother and one sister">one brother and one sister (أخ وأخت)</option>
              <option value="two brothers">two brothers (أخوان)</option>
              <option value="two sisters">two sisters (أختان)</option>
              <option value="a little brother">a little brother (أخ صغير)</option>
              <option value="a sister and a brother">a sister and a brother (أخت وأخ)</option>
            </select>
          </div>

          <button
            onClick={() => {
              setName('Ali');
              setCity('Damascus');
              setAge('10');
              setLivingWith('my parents');
              setSiblings('one brother and one sister');
            }}
            className="w-full py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
          >
            استعادة نموذج الكتاب المدرسي (علي - دمشق - 10 سنوات)
          </button>
        </div>

        {/* Right Preview & Speech Card (Styled like Activity 5 Worksheet in Book Page 9) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-cyan-500/40 shadow-2xl relative space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📋</span>
                <h3 className="font-english font-bold text-lg text-white">
                  5. Write about you (بطاقتي التقديمية)
                </h3>
              </div>

              <button
                id="talk-read-all-btn"
                onClick={handleSpeakAll}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>قراءة العرض بالكامل</span>
              </button>
            </div>

            {/* Notebook style lined presentation */}
            <div className="space-y-4 p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
              {/* Line 1: Name */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="font-english text-base text-slate-300 font-semibold">My name's</span>
                  <span className="font-english text-lg font-bold text-cyan-400 underline underline-offset-4">
                    {name || '...'}
                  </span>
                  <span className="font-english text-base text-slate-300 font-semibold">.</span>
                </div>
                <button
                  onClick={() => handleSpeakSentence(`My name's ${name}.`)}
                  className="p-1.5 rounded-lg bg-slate-800 text-cyan-400 hover:bg-slate-700"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Line 2: Age */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="font-english text-base text-slate-300 font-semibold">I'm</span>
                  <span className="font-english text-lg font-bold text-cyan-400 underline underline-offset-4">
                    {age}
                  </span>
                  <span className="font-english text-base text-slate-300 font-semibold">years old.</span>
                </div>
                <button
                  onClick={() => handleSpeakSentence(`I'm ${age} years old.`)}
                  className="p-1.5 rounded-lg bg-slate-800 text-cyan-400 hover:bg-slate-700"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Line 3: City */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="font-english text-base text-slate-300 font-semibold">I live in</span>
                  <span className="font-english text-lg font-bold text-cyan-400 underline underline-offset-4">
                    {city || '...'}
                  </span>
                  <span className="font-english text-base text-slate-300 font-semibold">.</span>
                </div>
                <button
                  onClick={() => handleSpeakSentence(`I live in ${city}.`)}
                  className="p-1.5 rounded-lg bg-slate-800 text-cyan-400 hover:bg-slate-700"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Line 4: Living with */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="font-english text-base text-slate-300 font-semibold">I live with</span>
                  <span className="font-english text-lg font-bold text-cyan-400 underline underline-offset-4">
                    {livingWith}
                  </span>
                  <span className="font-english text-base text-slate-300 font-semibold">.</span>
                </div>
                <button
                  onClick={() => handleSpeakSentence(`I live with ${livingWith}.`)}
                  className="p-1.5 rounded-lg bg-slate-800 text-cyan-400 hover:bg-slate-700"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Line 5: Siblings */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-english text-base text-slate-300 font-semibold">I've got</span>
                  <span className="font-english text-lg font-bold text-cyan-400 underline underline-offset-4">
                    {siblings}
                  </span>
                  <span className="font-english text-base text-slate-300 font-semibold">.</span>
                </div>
                <button
                  onClick={() => handleSpeakSentence(`I've got ${siblings}.`)}
                  className="p-1.5 rounded-lg bg-slate-800 text-cyan-400 hover:bg-slate-700"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-cyan-400" />
              <span>
                نصيحة المعلمة جيداء صقر: اضغط على زر مكبر الصوت بجانب كل جملة لتكرارها وتقليد النطق الإنجليزي السليم!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
