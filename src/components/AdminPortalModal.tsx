import React, { useState, useEffect } from 'react';
import {
  KeyRound,
  ShieldCheck,
  UserCheck,
  Copy,
  Check,
  Share2,
  Trash2,
  X,
  Search,
  Sparkles,
  Lock,
  MessageCircle,
  Clock,
  BookOpen,
  Eye,
  EyeOff,
  LogIn
} from 'lucide-react';
import {
  ADMIN_PERMANENT_PIN,
  generateStudentCode,
  buildTeacherSendCodeWhatsAppUrl,
  verifyStudentCode,
  normalizeStudentName
} from '../utils/cryptoAlgorithm';
import { GeneratedCodeRecord } from '../types';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateActivation?: (studentName: string, code: string) => void;
  onTeacherDirectAccess?: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({
  isOpen,
  onClose,
  onSimulateActivation,
  onTeacherDirectAccess,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState('');

  // Generation state
  const [studentNameInput, setStudentNameInput] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [hasCopied, setHasCopied] = useState(false);
  const [records, setRecords] = useState<GeneratedCodeRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'generator' | 'records' | 'verifier'>('generator');

  // Verifier test state
  const [testName, setTestName] = useState('');
  const [testCode, setTestCode] = useState('');
  const [testResult, setTestResult] = useState<{ isValid: boolean; message: string } | null>(null);

  // Load records and auth status from local storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('meml_teacher_generated_codes');
      if (raw) {
        setRecords(JSON.parse(raw));
      }
      const auth = sessionStorage.getItem('meml_teacher_authenticated');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save records
  const saveRecords = (newRecords: GeneratedCodeRecord[]) => {
    setRecords(newRecords);
    localStorage.setItem('meml_teacher_generated_codes', JSON.stringify(newRecords));
  };

  const normalizePin = (input: string): string => {
    // Convert Arabic-Indic numerals (٠-٩) to Western (0-9)
    const arabicIndic = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    let normalized = input.trim();
    arabicIndic.forEach((digit, idx) => {
      normalized = normalized.split(digit).join(idx.toString());
    });
    return normalized.toLowerCase();
  };

  const verifyAndLogin = (val: string) => {
    const clean = normalizePin(val);
    if (clean === ADMIN_PERMANENT_PIN.toLowerCase()) {
      setIsAuthenticated(true);
      setPinError('');
      sessionStorage.setItem('meml_teacher_authenticated', 'true');
      return true;
    }
    return false;
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verifyAndLogin(pinInput)) {
      setPinError('الرمز السري غير صحيح! تأكدي من كتابة الرمز: b13a15m17 أو اضغطي على زر التعبئة التلقائية.');
    }
  };

  const handleQuickFill = () => {
    setPinInput(ADMIN_PERMANENT_PIN);
    verifyAndLogin(ADMIN_PERMANENT_PIN);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = studentNameInput.trim();
    if (!cleanName || cleanName.length < 2) {
      alert('يرجى إدخال اسم الطالب كاملاً');
      return;
    }

    const code = generateStudentCode(cleanName);
    setGeneratedCode(code);
    setHasCopied(false);

    // Save to records
    const newRecord: GeneratedCodeRecord = {
      id: Date.now().toString(),
      studentName: cleanName,
      code: code,
      generatedAt: Date.now(),
    };

    const existingFiltered = records.filter(
      (r) => normalizeStudentName(r.studentName) !== normalizeStudentName(cleanName)
    );
    saveRecords([newRecord, ...existingFiltered]);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleDeleteRecord = (id: string) => {
    if (window.confirm('هل أنتِ متأكدة من حذف هذا السجل؟')) {
      saveRecords(records.filter((r) => r.id !== id));
    }
  };

  const handleTestVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const res = verifyStudentCode(testName, testCode);
    setTestResult(res);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div
        id="admin-portal-modal"
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl shadow-cyan-950/50 overflow-hidden text-slate-100 my-8"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>بوابة المعلمة جيداء صقر</span>
                <span className="text-xs font-mono font-normal bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  نظام التوليد المشفر
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                لوحة التحكم الحصرية لتوليد وإدارة أكواد التفعيل لطلاب المنهاج
              </p>
            </div>
          </div>
          <button
            id="admin-close-button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isAuthenticated ? (
            /* PIN Screen */
            <form onSubmit={handlePinSubmit} className="max-w-md mx-auto py-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-4 text-cyan-400 shadow-inner">
                <Lock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">أهلاً بكِ أستاذة جيداء صقر</h3>
              <p className="text-sm text-slate-400 mb-6">
                يرجى إدخال الرمز السري المعتمد (Admin PIN) للوصول إلى لوحة توليد الأكواد وإدارة المنهاج
              </p>

              <div className="mb-4">
                <div className="relative">
                  <input
                    id="admin-pin-input"
                    type={showPin ? 'text' : 'password'}
                    placeholder="أدخل رمز المعلمة السري..."
                    value={pinInput}
                    onChange={(e) => {
                      setPinInput(e.target.value);
                      setPinError('');
                    }}
                    autoFocus
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck="false"
                    className="w-full text-center tracking-widest text-lg font-mono px-12 py-3 bg-slate-950/80 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-300 p-1 rounded-lg transition-colors cursor-pointer"
                    title={showPin ? 'إخفاء الرمز' : 'إظهار الرمز'}
                  >
                    {showPin ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {pinError && (
                  <p className="text-xs text-rose-400 mt-2 font-medium bg-rose-950/40 p-2 rounded-lg border border-rose-500/40">
                    {pinError}
                  </p>
                )}
              </div>

              <div className="space-y-2.5">
                <button
                  id="admin-pin-submit"
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <KeyRound className="w-4 h-4" />
                  <span>دخول لوحة التحكم</span>
                </button>

                {/* Quick Auto-Fill for Teacher Jaidaa */}
                <button
                  id="admin-quick-fill-btn"
                  type="button"
                  onClick={handleQuickFill}
                  className="w-full py-2.5 px-3 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/40 text-cyan-300 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>تعبئة رمز المعلمة المعتمد تلقائياً (b13a15m17)</span>
                </button>
              </div>

              <div className="mt-4 text-[11px] text-slate-500 flex items-center justify-center gap-1.5">
                <span>الرمز الدائم المخصص للمعلمة:</span>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="text-cyan-400 font-mono underline hover:text-cyan-300 cursor-pointer"
                  title="انقر لتعبئة الرمز تلقائياً"
                >
                  b13a15m17
                </button>
              </div>
            </form>
          ) : (
            /* Authenticated Admin Dashboard */
            <div>
              {/* Teacher Direct Entry Banner */}
              {onTeacherDirectAccess && (
                <div className="mb-5 p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/60 via-blue-950/60 to-slate-900 border border-cyan-500/40 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-xs text-slate-200">
                      أهلاً بكِ أستاذة <strong>جيداء صقر</strong> • يمكنكِ الدخول مباشرة لمعاينة وتدريس المنهاج
                    </span>
                  </div>
                  <button
                    id="teacher-direct-login-btn"
                    type="button"
                    onClick={() => {
                      onTeacherDirectAccess();
                      onClose();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-600/30 cursor-pointer transition-all"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>دخول المنهاج كمعلمة الآن</span>
                  </button>
                </div>
              )}

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-800 mb-6 gap-2">
                <button
                  id="tab-generator-btn"
                  onClick={() => setActiveTab('generator')}
                  className={`px-4 py-2.5 text-sm font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
                    activeTab === 'generator'
                      ? 'text-cyan-400 border-cyan-400 bg-cyan-950/30'
                      : 'text-slate-400 border-transparent hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>توليد كود جديد</span>
                </button>
                <button
                  id="tab-records-btn"
                  onClick={() => setActiveTab('records')}
                  className={`px-4 py-2.5 text-sm font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
                    activeTab === 'records'
                      ? 'text-cyan-400 border-cyan-400 bg-cyan-950/30'
                      : 'text-slate-400 border-transparent hover:text-slate-200'
                  }`}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>سجل الطلاب ({records.length})</span>
                </button>
                <button
                  id="tab-verifier-btn"
                  onClick={() => setActiveTab('verifier')}
                  className={`px-4 py-2.5 text-sm font-bold rounded-t-xl transition-all flex items-center gap-2 border-b-2 ${
                    activeTab === 'verifier'
                      ? 'text-cyan-400 border-cyan-400 bg-cyan-950/30'
                      : 'text-slate-400 border-transparent hover:text-slate-200'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>فحص صحة الأكواد</span>
                </button>
              </div>

              {/* TAB 1: CODE GENERATOR */}
              {activeTab === 'generator' && (
                <div className="space-y-6">
                  <form onSubmit={handleGenerate} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                        اسم الطالب الكامل (عربي أو إنجليزي):
                      </label>
                      <input
                        id="generator-student-name"
                        type="text"
                        placeholder="مثال: أحمد محمد علي / Maya Ahmad"
                        value={studentNameInput}
                        onChange={(e) => setStudentNameInput(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-950/80 border border-slate-700 rounded-xl focus:outline-none focus:border-cyan-400 text-white placeholder:text-slate-600 font-medium"
                      />
                      <p className="text-[11px] text-slate-400 mt-1">
                        * سيتم تشفير الاسم رياضياً وإنتاج كود بصيغة MEML-XXXX-XXXX حصري لهذا الاسم لمدة 6 أشهر.
                      </p>
                    </div>

                    <button
                      id="generate-code-btn"
                      type="submit"
                      className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>توليد كود التفعيل الحصري فوراً</span>
                    </button>
                  </form>

                  {/* Generated Code Result Display */}
                  {generatedCode && (
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/50 via-slate-900 to-blue-950/50 border border-cyan-500/40 space-y-4 animate-in fade-in duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-cyan-400">
                          الكود المولد للطالب: <strong className="text-white">{studentNameInput}</strong>
                        </span>
                        <span className="text-[11px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                          صالح لمدة 180 يوماً
                        </span>
                      </div>

                      <div className="flex items-center justify-between bg-slate-950/90 border border-cyan-500/50 rounded-xl p-3">
                        <span
                          id="generated-code-display"
                          className="font-mono text-xl md:text-2xl font-black text-cyan-300 tracking-wider font-english"
                        >
                          {generatedCode}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            id="copy-code-btn"
                            type="button"
                            onClick={() => handleCopy(generatedCode)}
                            className="p-2.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                            title="نسخ الكود"
                          >
                            {hasCopied ? (
                              <>
                                <Check className="w-4 h-4 text-emerald-400" />
                                <span className="text-emerald-400">تم النسخ!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                <span>نسخ</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* WhatsApp Dispatch Button */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        <a
                          id="teacher-whatsapp-send-btn"
                          href={buildTeacherSendCodeWhatsAppUrl(studentNameInput, generatedCode)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/30 transition-all"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>إرسال الكود للطالب عبر واتساب</span>
                        </a>

                        {onSimulateActivation && (
                          <button
                            id="simulate-login-btn"
                            type="button"
                            onClick={() => {
                              onSimulateActivation(studentNameInput, generatedCode);
                              onClose();
                            }}
                            className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                          >
                            <BookOpen className="w-4 h-4" />
                            <span>تجربة التفعيل والدخول بالمنهاج</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: RECORDS */}
              {activeTab === 'records' && (
                <div className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                    <input
                      id="search-records-input"
                      type="text"
                      placeholder="بحث باسم الطالب أو الكود..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pr-9 pl-4 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* List */}
                  {records.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-sm">
                      لم يتم توليد أي أكواد بعد. انتقلي إلى تبويب "توليد كود جديد" للبدء.
                    </div>
                  ) : (
                    <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                      {records
                        .filter(
                          (r) =>
                            r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            r.code.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((rec) => (
                          <div
                            key={rec.id}
                            className="p-3 bg-slate-950/60 border border-slate-800 hover:border-slate-700 rounded-xl flex items-center justify-between gap-3 text-xs"
                          >
                            <div>
                              <div className="font-bold text-white flex items-center gap-1.5">
                                <span>{rec.studentName}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-400">
                                <span className="font-mono text-cyan-400 font-semibold">{rec.code}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1 text-slate-500">
                                  <Clock className="w-3 h-3" />
                                  {new Date(rec.generatedAt).toLocaleDateString('ar-EG')}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleCopy(rec.code)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                                title="نسخ الكود"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                              <a
                                href={buildTeacherSendCodeWhatsAppUrl(rec.studentName, rec.code)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400"
                                title="إرسال عبر واتساب"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                              <button
                                onClick={() => handleDeleteRecord(rec.id)}
                                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"
                                title="حذف السجل"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: VERIFIER TEST */}
              {activeTab === 'verifier' && (
                <form onSubmit={handleTestVerify} className="space-y-4">
                  <p className="text-xs text-slate-400">
                    يمكنكِ تجربة وفحص أي كود للتأكد من أنه سيعمل على هاتف الطالب دون أي أخطاء.
                  </p>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">اسم الطالب:</label>
                    <input
                      id="test-student-name"
                      type="text"
                      placeholder="اكتب الاسم كما أدخله الطالب..."
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">الكود المراد اختباره:</label>
                    <input
                      id="test-code-input"
                      type="text"
                      placeholder="MEML-XXXX-XXXX"
                      value={testCode}
                      onChange={(e) => setTestCode(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-sm text-white font-mono"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                  >
                    فحص التطابق الرياضي
                  </button>

                  {testResult && (
                    <div
                      className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                        testResult.isValid
                          ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                          : 'bg-rose-950/30 border-rose-500/50 text-rose-300'
                      }`}
                    >
                      {testResult.isValid ? (
                        <Check className="w-4 h-4 shrink-0 text-emerald-400" />
                      ) : (
                        <X className="w-4 h-4 shrink-0 text-rose-400" />
                      )}
                      <span>{testResult.message}</span>
                    </div>
                  )}
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
