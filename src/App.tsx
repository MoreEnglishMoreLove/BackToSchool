/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { StudentSession } from './types';
import {
  getStoredSession,
  clearStudentSession,
  setStudentSession,
  getSubscriptionStatus,
  SUBSCRIPTION_DURATION_DAYS,
  getOrCreateDeviceId,
} from './utils/cryptoAlgorithm';
import { LockScreen } from './components/LockScreen';
import { CurriculumDashboard } from './components/CurriculumDashboard';
import { AdminPortalModal } from './components/AdminPortalModal';

export default function App() {
  const [session, setSession] = useState<StudentSession | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAdminPortal, setShowAdminPortal] = useState(false);

  // Check stored student session on boot
  useEffect(() => {
    try {
      const stored = getStoredSession();
      if (stored) {
        const status = getSubscriptionStatus(stored.expiresAt);
        if (!status.isExpired) {
          setSession(stored);
        } else {
          clearStudentSession();
        }
      }
    } catch (e) {
      console.error('Failed to load session', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAuthenticated = (newSession: StudentSession) => {
    setStudentSession(newSession);
    setSession(newSession);
  };

  const handleActivate = (studentName: string, code: string) => {
    const newSession: StudentSession = {
      studentName: studentName.trim(),
      activationCode: code.trim(),
      activatedAt: Date.now(),
      expiresAt: Date.now() + SUBSCRIPTION_DURATION_DAYS * 24 * 60 * 60 * 1000,
      deviceId: getOrCreateDeviceId(),
    };
    handleAuthenticated(newSession);
  };

  const handleTeacherDirectAccess = () => {
    const teacherSession: StudentSession = {
      studentName: 'المعلمة جيداء صقر (Teacher)',
      activationCode: 'TEACHER-DIRECT-ACCESS',
      activatedAt: Date.now(),
      expiresAt: Date.now() + SUBSCRIPTION_DURATION_DAYS * 24 * 60 * 60 * 1000,
      deviceId: getOrCreateDeviceId(),
    };
    handleAuthenticated(teacherSession);
    setShowAdminPortal(false);
  };

  const handleLogout = () => {
    clearStudentSession();
    setSession(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-400 font-arabic">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-medium">جاري تحميل التطبيق...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {!session ? (
        <LockScreen
          onActivate={handleActivate}
          onOpenAdminPortal={() => setShowAdminPortal(true)}
        />
      ) : (
        <CurriculumDashboard
          session={session}
          onLogout={handleLogout}
          onOpenAdminPortal={() => setShowAdminPortal(true)}
        />
      )}

      {/* Admin / Teacher Portal Modal */}
      <AdminPortalModal
        isOpen={showAdminPortal}
        onClose={() => setShowAdminPortal(false)}
        onSimulateActivation={(studentName, code) => {
          handleActivate(studentName, code);
          setShowAdminPortal(false);
        }}
        onTeacherDirectAccess={handleTeacherDirectAccess}
      />
    </>
  );
}

