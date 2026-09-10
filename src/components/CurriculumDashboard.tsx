import React, { useState } from 'react';
import { StudentSession } from '../types';
import { Header } from './Header';
import { SocialBar } from './SocialBar';
import { Section1ListenRead } from './sections/Section1ListenRead';
import { Section2Grammar } from './sections/Section2Grammar';
import { Section3SongPhonics } from './sections/Section3SongPhonics';
import { Section4SelfFamily } from './sections/Section4SelfFamily';
import { Section5InteractiveGames } from './sections/Section5InteractiveGames';
import { Section6Vocabulary } from './sections/Section6Vocabulary';
import { Section7Worksheets } from './sections/Section7Worksheets';
import { AdminPortalModal } from './AdminPortalModal';
import { ShieldCheck, BookOpen, Sparkles } from 'lucide-react';

interface CurriculumDashboardProps {
  session: StudentSession;
  onLogout: () => void;
  onOpenAdminPortal?: () => void;
}

export const CurriculumDashboard: React.FC<CurriculumDashboardProps> = ({
  session,
  onLogout,
  onOpenAdminPortal,
}) => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [showAdminPortal, setShowAdminPortal] = useState<boolean>(false);

  const handleTriggerAdminPortal = () => {
    if (onOpenAdminPortal) {
      onOpenAdminPortal();
    } else {
      setShowAdminPortal(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-arabic selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Header & Navigation */}
      <Header
        session={session}
        activeSection={activeSection}
        onSelectSection={(secId) => setActiveSection(secId)}
        onLogout={onLogout}
        onOpenAdminPortal={handleTriggerAdminPortal}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 sm:py-8">
        {activeSection === 1 && <Section1ListenRead />}
        {activeSection === 2 && <Section2Grammar />}
        {activeSection === 3 && <Section3SongPhonics />}
        {activeSection === 4 && <Section4SelfFamily initialStudentName={session.studentName} />}
        {activeSection === 5 && <Section5InteractiveGames />}
        {activeSection === 6 && <Section6Vocabulary />}
        {activeSection === 7 && <Section7Worksheets />}
      </main>

      {/* Teacher's Quick Gate in Footer */}
      <div className="max-w-7xl mx-auto w-full px-4 pb-4 flex justify-between items-center text-xs text-slate-500">
        <div>MORE ENGLISH MORE LOVE • إشراف المعلمة جيداء صقر</div>
        <button
          onClick={handleTriggerAdminPortal}
          className="hover:text-cyan-400 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>بوابة المعلمة</span>
        </button>
      </div>

      {/* Social and Contact Bar */}
      <SocialBar />

      {/* Admin Portal Modal (if standalone) */}
      {!onOpenAdminPortal && (
        <AdminPortalModal
          isOpen={showAdminPortal}
          onClose={() => setShowAdminPortal(false)}
        />
      )}
    </div>
  );
};
