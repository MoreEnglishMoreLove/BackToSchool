import React from 'react';
import {
  GraduationCap,
  Clock,
  LogOut,
  MessageCircle,
  Volume2,
  Sparkles,
  BookOpen,
  CheckCircle2,
  KeyRound,
  ShieldCheck
} from 'lucide-react';
import { StudentSession } from '../types';
import { getSubscriptionStatus, TEACHER_WHATSAPP_LINK } from '../utils/cryptoAlgorithm';

interface HeaderProps {
  session: StudentSession;
  activeSection: number;
  onSelectSection: (sectionIndex: number) => void;
  onLogout: () => void;
  onOpenAdminPortal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  session,
  activeSection,
  onSelectSection,
  onLogout,
  onOpenAdminPortal,
}) => {
  const status = getSubscriptionStatus(session.expiresAt);

  const sections = [
    { id: 1, title: 'محادثة وقراءة', sub: 'Listen & Read', icon: '📖' },
    { id: 2, title: 'قواعد المنهاج', sub: 'Have/Has got', icon: '🧠' },
    { id: 3, title: 'الأنشودة والصوتيات', sub: 'Sing & Phonics', icon: '🎵' },
    { id: 4, title: 'التحدث عن نفسي', sub: 'Talk About You', icon: '🗣️' },
    { id: 5, title: 'ألعاب واختبارات', sub: 'Fun Quiz & Games', icon: '🎮' },
    { id: 6, title: 'بنك الكلمات', sub: 'Unit Vocabulary', icon: '📚' },
    { id: 7, title: 'أوراق العمل والحلول', sub: '7 Worksheets', icon: '📝' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Branding */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-english font-black text-white text-base tracking-wide">
                MORE ENGLISH MORE LOVE
              </span>
              <span className="hidden sm:inline-block text-[10px] bg-cyan-500/20 text-cyan-300 font-bold px-2 py-0.5 rounded-md border border-cyan-500/30">
                Unit 1: Back to School
              </span>
            </div>
            <p className="text-xs text-slate-400 font-arabic">
              إشراف وتدريس المعلمة: <strong className="text-cyan-300">جيداء صقر</strong>
            </p>
          </div>
        </div>

        {/* Student Profile & Countdown Timer */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Student Name */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-400">الطالب:</span>
            <span className="font-bold text-white max-w-[120px] sm:max-w-[180px] truncate">
              {session.studentName}
            </span>
          </div>

          {/* 180 Days Countdown Badge */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium ${
              status.daysLeft < 10
                ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
                : 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
            }`}
            title={`تاريخ انتهاء الاشتراك: ${status.formattedExpiryDate}`}
          >
            <Clock className="w-3.5 h-3.5 shrink-0 text-cyan-400" />
            <span>
              صلاحية الكود: <strong>{status.daysLeft}</strong> يوماً
            </span>
          </div>

          {/* Teacher Portal Trigger */}
          <button
            id="header-teacher-portal-btn"
            onClick={onOpenAdminPortal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all shadow-sm cursor-pointer"
            title="فتح بوابة المعلمة وتوليد الأكواد"
          >
            <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">بوابة المعلمة</span>
          </button>

          {/* WhatsApp teacher quick link */}
          <a
            id="header-teacher-whatsapp"
            href={TEACHER_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-colors"
            title="تواصل مع المعلمة جيداء عبر واتساب"
          >
            <MessageCircle className="w-4 h-4" />
          </a>

          {/* Logout / Lock */}
          <button
            id="logout-btn"
            onClick={onLogout}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors cursor-pointer"
            title="قفل التطبيق"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 7 Interactive Sections Navigation Bar */}
      <div className="bg-slate-950/70 border-t border-slate-800/60 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-2 flex items-center gap-1 sm:gap-2 py-1.5 min-w-max">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                id={`nav-section-${sec.id}`}
                onClick={() => onSelectSection(sec.id)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/30 text-cyan-300 border border-cyan-500/50 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                }`}
              >
                <span className="text-base">{sec.icon}</span>
                <div className="text-right leading-tight">
                  <div className="font-arabic">{sec.title}</div>
                  <div className="text-[10px] text-slate-500 font-english font-normal">{sec.sub}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
