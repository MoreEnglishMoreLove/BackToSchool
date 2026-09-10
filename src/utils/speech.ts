/**
 * Web Speech API helper for English interactive pronunciation
 */

let synth: SpeechSynthesis | null = null;
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  synth = window.speechSynthesis;
}

export function speakEnglish(
  text: string,
  rate: number = 0.9,
  pitch: number = 1.0,
  onEnd?: () => void
): void {
  if (!synth) {
    if (onEnd) onEnd();
    return;
  }

  try {
    synth.cancel(); // Stop any pending speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;
    utterance.pitch = pitch;

    // Pick best English voice if available
    const voices = synth.getVoices();
    const enVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (enVoice) {
      utterance.voice = enVoice;
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = () => onEnd();
    }

    synth.speak(utterance);
  } catch (e) {
    console.warn('Speech synthesis error:', e);
    if (onEnd) onEnd();
  }
}

export function stopSpeaking(): void {
  if (synth) {
    try {
      synth.cancel();
    } catch (e) {
      console.warn('Stop speech error:', e);
    }
  }
}
