import { StudentSession } from '../types';

/**
 * MORE ENGLISH MORE LOVE - Cryptographic & Mathematical Code Generator
 * Supervisor: Teacher Jaidaa Saqer (المعلمة جيداء صقر)
 *
 * Algorithm Features:
 * - 100% Client-Side execution (Netlify / static hosting compatible)
 * - Deterministic, irreversible hashing based on student full name + secret salt
 * - Normalization for Arabic & Latin names (handles tashkeel, hamza variants, taa marbuta)
 * - Standard output format: MEML-XXXX-XXXX
 */

const SECRET_SALT = "MEML_JAIDAA_SAQER_MATH_SALT_2026_EXCLUSIVE_KEY_#963933036079";
export const ADMIN_PERMANENT_PIN = "b13a15m17";
export const TEACHER_WHATSAPP_NUMBER = "+963933036079";
export const TEACHER_WHATSAPP_LINK = "https://wa.me/963933036079";
export const SUBSCRIPTION_DURATION_DAYS = 180; // 6 months

// Unambiguous 32-character alphabet (excludes 0, O, 1, I to prevent reading mistakes)
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/**
 * Normalizes student name to prevent mismatch due to Arabic keyboard differences
 */
export function normalizeStudentName(name: string): string {
  if (!name) return "";
  let normalized = name.trim().toLowerCase();

  // Remove Arabic diacritics / tashkeel
  normalized = normalized.replace(/[\u064B-\u065F\u0670]/g, "");

  // Normalize Alef variants: أ, إ, آ, ٱ -> ا
  normalized = normalized.replace(/[أإآٱ]/g, "ا");

  // Normalize Taa Marbuta: ة -> ه
  normalized = normalized.replace(/ة/g, "ه");

  // Normalize Alif Maqsura: ى -> ي
  normalized = normalized.replace(/ى/g, "ي");

  // Normalize spaces (collapse multiple spaces, tabs)
  normalized = normalized.replace(/\s+/g, " ");

  return normalized.trim();
}

/**
 * 32-bit Murmur/FNV style hash generator
 */
function hashString(str: string, seed: number): number {
  let h = seed >>> 0;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    h = Math.imul(h ^ code, 2654435761);
    h = ((h << 13) | (h >>> 19)) >>> 0;
  }
  // Avalanching
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^ (h >>> 16)) >>> 0;
}

/**
 * Generates the deterministic activation code for a given student name
 * Format: MEML-XXXX-XXXX
 */
export function generateStudentCode(rawStudentName: string): string {
  const normalized = normalizeStudentName(rawStudentName);
  if (!normalized) return "";

  // Combine normalized name with teacher salt
  const payloadA = `${SECRET_SALT}_NAME_${normalized}_PART_A`;
  const payloadB = `${SECRET_SALT}_NAME_${normalized}_PART_B`;

  const hashA = hashString(payloadA, 0x1a2b3c4d);
  const hashB = hashString(payloadB, 0x5e6f7a8b);

  // Derive 4 characters for part 1 from hashA
  let part1 = "";
  let tempA = hashA;
  for (let i = 0; i < 4; i++) {
    const idx = tempA % CODE_ALPHABET.length;
    part1 += CODE_ALPHABET[idx];
    tempA = Math.floor(tempA / CODE_ALPHABET.length);
  }

  // Derive 4 characters for part 2 from hashB
  let part2 = "";
  let tempB = hashB;
  for (let i = 0; i < 4; i++) {
    const idx = tempB % CODE_ALPHABET.length;
    part2 += CODE_ALPHABET[idx];
    tempB = Math.floor(tempB / CODE_ALPHABET.length);
  }

  return `MEML-${part1}-${part2}`;
}

/**
 * Formats user input code with hyphens automatically
 */
export function formatCodeInput(input: string): string {
  // Strip non-alphanumeric
  const clean = input.toUpperCase().replace(/[^A-Z0-9]/g, "");

  // If user pasted or typed with or without MEML prefix
  let body = clean;
  if (clean.startsWith("MEML")) {
    body = clean.slice(4);
  }

  const part1 = body.slice(0, 4);
  const part2 = body.slice(4, 8);

  if (part2) {
    return `MEML-${part1}-${part2}`;
  } else if (part1) {
    return `MEML-${part1}`;
  } else if (clean.startsWith("MEML")) {
    return "MEML-";
  }
  return clean;
}

/**
 * Validates a student's entered code against their name
 */
export function verifyStudentCode(
  rawStudentName: string,
  rawEnteredCode: string
): { isValid: boolean; message: string } {
  const cleanName = normalizeStudentName(rawStudentName);
  if (!cleanName || cleanName.length < 2) {
    return {
      isValid: false,
      message: "يرجى كتابة اسم الطالب الكامل بشكل صحيح.",
    };
  }

  if (!rawEnteredCode) {
    return {
      isValid: false,
      message: "يرجى إدخال كود التفعيل السري.",
    };
  }

  // Normalize code: remove spaces and hyphens, uppercase
  const cleanedCode = rawEnteredCode.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  const expectedCodeRaw = generateStudentCode(cleanName).replace(/[^A-Z0-9]/g, "");

  if (cleanedCode === expectedCodeRaw) {
    return {
      isValid: true,
      message: "تم التحقق بنجاح! مرحباً بك في منهاج MORE ENGLISH MORE LOVE.",
    };
  }

  return {
    isValid: false,
    message: "كود التفعيل غير متطابق مع اسم الطالب. يرجى التأكد من كتابة الاسم والكود كما استلمتهما من المعلمة جيداء صقر.",
  };
}

/**
 * Device Fingerprint generator for local verification
 */
export function getOrCreateDeviceId(): string {
  const KEY = "meml_device_fingerprint";
  let deviceId = localStorage.getItem(KEY);
  if (!deviceId) {
    deviceId = "DEV_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now().toString(36);
    localStorage.setItem(KEY, deviceId);
  }
  return deviceId;
}

/**
 * Time remaining calculation for 180-day subscription
 */
export function getSubscriptionStatus(expiresAt: number): {
  isExpired: boolean;
  daysLeft: number;
  hoursLeft: number;
  minutesLeft: number;
  percentRemaining: number;
  formattedExpiryDate: string;
} {
  const now = Date.now();
  const diffMs = expiresAt - now;

  if (diffMs <= 0) {
    return {
      isExpired: true,
      daysLeft: 0,
      hoursLeft: 0,
      minutesLeft: 0,
      percentRemaining: 0,
      formattedExpiryDate: new Date(expiresAt).toLocaleDateString("ar-EG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  }

  const totalDurationMs = SUBSCRIPTION_DURATION_DAYS * 24 * 60 * 60 * 1000;
  const percentRemaining = Math.max(0, Math.min(100, Math.round((diffMs / totalDurationMs) * 100)));

  const daysLeft = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hoursLeft = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutesLeft = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return {
    isExpired: false,
    daysLeft,
    hoursLeft,
    minutesLeft,
    percentRemaining,
    formattedExpiryDate: new Date(expiresAt).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}

/**
 * WhatsApp message generators
 */
export function buildStudentRequestWhatsAppUrl(studentName: string): string {
  const cleanName = studentName.trim() || "طالب جديد";
  const text = encodeURIComponent(
    `السلام عليكم ورحمة الله وبركاته،\nأستاذتي الفاضلة جيداء صقر، أنا الطالب(ة): ${cleanName}، أرجو تزويدي بكود التفعيل الحصري لتطبيق MORE ENGLISH MORE LOVE للانضمام ومتابعة المنهاج. شكراً جزيلاً!`
  );
  return `https://wa.me/963933036079?text=${text}`;
}

export function buildTeacherSendCodeWhatsAppUrl(studentName: string, code: string): string {
  const text = encodeURIComponent(
    `مرحباً بك يا بطل! 🌟\nيسعدني انضمامك إلى تطبيق "MORE ENGLISH MORE LOVE" بإشراف المعلمة جيداء صقر.\n\n👤 اسم الطالب: ${studentName}\n🔑 كود التفعيل الحصري لجهازك:\n${code}\n\n⏳ صلاحية الكود: 6 أشهر (180 يوماً)\n💡 طريقة التفعيل: افتح التطبيق، واكتب اسمك كما هو تماماً، ثم الصق كود التفعيل واضغط "تفعيل الحساب".\n\nنتمنى لك رحلة تعليمية ممتعة ومليئة بالتفوق والنجاح! 💙✨`
  );
  return `https://wa.me/963933036079?text=${text}`;
}

const SESSION_STORAGE_KEY = "MEML_STUDENT_SESSION";

export function getStoredSession(): StudentSession | null {
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StudentSession;
  } catch (e) {
    console.error("Failed to parse student session", e);
    return null;
  }
}

export function setStudentSession(session: StudentSession): void {
  try {
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
  } catch (e) {
    console.error("Failed to save student session", e);
  }
}

export function clearStudentSession(): void {
  try {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  } catch (e) {
    console.error("Failed to clear student session", e);
  }
}
