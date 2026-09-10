import React, { useState } from 'react';
import {
  Lock,
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  GraduationCap,
  ShieldCheck,
  BookOpen,
  Headphones,
  CheckCheck,
  Calendar
} from 'lucide-react';
import {
  verifyStudentCode,
  formatCodeInput,
  buildStudentRequestWhatsAppUrl,
  TEACHER_WHATSAPP_NUMBER,
  SUBSCRIPTION_DURATION_DAYS
} from '../utils/cryptoAlgorithm';
import { SocialBar } from './SocialBar';

interface LockScreenProps {
  onActivate: (studentName: string, code: string) => void;
  onOpenAdminPortal: () => void;
  initialStudentName?: string;
}

export const LockScreen: React.FC<LockScreenProps> = ({
  onActivate,
  onOpenAdminPortal,
  initialStudentName = '',
}) => {
  const [studentName, setStudentName] = useState(initialStudentName);
  const [activationCode, setActivationCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setActivationCode(formatCodeInput(val));
    setErrorMessage('');
  };

  const handleActivationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);

    const verification = verifyStudentCode(studentName, activationCode);

    if (verification.isValid) {
      setSuccessMessage(verification.message);
      setTimeout(() => {
        onActivate(studentName.trim(), activationCode.trim());
      }, 500);
    } else {
      setErrorMessage(verification.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#080E1A] text-slate-100 selection:bg-cyan-500 selection:text-white">
      {/* Top Bar with Teacher Portal Trigger */}
      <header className="w-full max-w-7xl mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs text-slate-400 font-medium">المنصة التعليمية التفاعلية الرسمية</span>
        </div>

        {/* Teacher's Gate Button */}
        <button
          id="teacher-portal-gate-btn"
          onClick={onOpenAdminPortal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 border border-slate-800 hover:border-cyan-500/40 text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
          <span>بوابة المعلمة</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 my-4">
        <div className="w-full max-w-xl">
          {/* Main Card */}
          <div
            id="lock-screen-card"
            className="relative rounded-3xl bg-slate-900/90 border border-blue-900/50 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl p-6 sm:p-8 overflow-hidden"
          >
            {/* Top decorative glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-36 bg-gradient-to-r from-blue-600/30 to-cyan-500/30 blur-3xl pointer-events-none"></div>

            {/* Branding Header */}
            <div className="text-center space-y-3 mb-8 relative z-10">
              <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/30 shadow-inner text-cyan-400 mx-auto">
                <GraduationCap className="w-10 h-10" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-black font-english tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-blue-300 uppercase">
                  MORE ENGLISH MORE LOVE
                </h1>
                <div className="mt-1 flex items-center justify-center gap-1.5 text-cyan-300 font-bold text-sm sm:text-base">
                  <span>بإشراف وتدريس المعلمة</span>
                  <span className="text-white underline decoration-cyan-500 decoration-2 underline-offset-4">
                    جيداء صقر
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                المنهاج التفاعلي المطور لتعليم اللغة الإنجليزية — نظام تحقق كودي مستقل ومحمي لجهازك
              </p>
            </div>

            {/* Feature Highlights Pills */}
            <div className="grid grid-cols-3 gap-2 mb-6 text-[11px] text-slate-300">
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col items-center text-center gap-1">
                <BookOpen className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold">7 أقسام للمنهاج</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col items-center text-center gap-1">
                <Headphones className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold">نطق صوتي تفاعلي</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col items-center text-center gap-1">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span className="font-semibold">تفعيل لمدة 6 أشهر</span>
              </div>
            </div>

            {/* Activation Form */}
            <form onSubmit={handleActivationSubmit} className="space-y-4 relative z-10">
              {/* Student Name */}
              <div>
                <label
                  htmlFor="student-name-input"
                  className="block text-xs font-bold text-slate-300 mb-1.5"
                >
                  اسم الطالب(ة) الكامل:
                </label>
                <input
                  id="student-name-input"
                  type="text"
                  required
                  placeholder="اكتب اسمك الثلاثي كما تم إرساله للمعلمة..."
                  value={studentName}
                  onChange={(e) => {
                    setStudentName(e.target.value);
                    setErrorMessage('');
                  }}
                  className="w-full px-4 py-3 bg-slate-950/90 border border-slate-700/80 rounded-xl text-white placeholder:text-slate-600 text-sm font-medium focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>

              {/* Activation Code */}
              <div>
                <label
                  htmlFor="activation-code-input"
                  className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center justify-between"
                >
                  <span>كود التفعيل السري:</span>
                  <span className="text-[11px] text-cyan-400 font-english font-mono">MEML-XXXX-XXXX</span>
                </label>
                <div className="relative">
                  <input
                    id="activation-code-input"
                    type="text"
                    required
                    maxLength={14}
                    placeholder="MEML-XXXX-XXXX"
                    value={activationCode}
                    onChange={handleCodeChange}
                    className="w-full px-4 py-3 pl-10 bg-slate-950/90 border border-slate-700/80 rounded-xl text-cyan-300 placeholder:text-slate-600 text-base font-mono font-bold tracking-wider uppercase focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 transition-all font-english"
                  />
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                </div>
              </div>

              {/* Error or Success Alert */}
              {errorMessage && (
                <div
                  id="activation-error-alert"
                  className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/50 text-rose-300 text-xs flex items-start gap-2 animate-in fade-in duration-200"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                  <span className="leading-relaxed">{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div
                  id="activation-success-alert"
                  className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/50 text-emerald-300 text-xs flex items-start gap-2 animate-in fade-in duration-200"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                  <span className="leading-relaxed">{successMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                id="activate-account-button"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-xl shadow-cyan-600/30 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <ShieldCheck className="w-5 h-5 text-white" />
                <span>تفعيل الحساب والدخول للمنهاج</span>
              </button>
            </form>

            {/* How to get code / WhatsApp support section */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 text-center space-y-3">
              <p className="text-xs font-semibold text-slate-300">
                كيف أحصل على كود تفعيل؟ تواصل مباشرة مع المعلمة جيداء صقر عبر واتساب
              </p>

              <a
                id="student-request-whatsapp-link"
                href={buildStudentRequestWhatsAppUrl(studentName)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-700/20 transition-all transform active:scale-[0.99]"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>طلب الكود عبر واتساب المعلمة (+963933036079)</span>
              </a>

              <p className="text-[11px] text-slate-500">
                سيتم فتح محادثة مباشرة تتضمن اسمك تلقائياً لترسل لك المعلمة كودك الحصري.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Social Footer */}
      <SocialBar />
    </div>
  );
};
