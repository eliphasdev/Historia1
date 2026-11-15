// Browser Speech Synthesis (Spanish) & Web Audio API gentle sound effects

type SpeechListener = (speakingId: string | null) => void;

class AudioManager {
  private audioCtx: AudioContext | null = null;
  private soundEnabled = true;
  private autoSpeak = true;
  private currentSpeakingId: string | null = null;
  private listeners = new Set<SpeechListener>();
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const loadVoices = () => {
        this.voices = window.speechSynthesis.getVoices();
      };
      loadVoices();
      window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices);
    }
  }

  subscribe(listener: SpeechListener): () => void {
    this.listeners.add(listener);
    listener(this.currentSpeakingId);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.currentSpeakingId));
  }

  setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (!enabled) {
      this.stopSpeaking();
    }
  }

  getSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  setAutoSpeak(enabled: boolean) {
    this.autoSpeak = enabled;
  }

  getAutoSpeak(): boolean {
    return this.autoSpeak;
  }

  getSpeakingId(): string | null {
    return this.currentSpeakingId;
  }

  private getPreferredSpanishVoice(): SpeechSynthesisVoice | null {
    if (!this.voices.length && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.voices = window.speechSynthesis.getVoices();
    }
    const priorities = ['es-CL', 'es-419', 'es-MX', 'es-AR', 'es-US', 'es-ES'];
    for (const lang of priorities) {
      const found = this.voices.find((v) => v.lang.toLowerCase() === lang.toLowerCase());
      if (found) return found;
    }
    return this.voices.find((v) => v.lang.toLowerCase().startsWith('es')) || null;
  }

  stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (this.currentSpeakingId !== null) {
      this.currentSpeakingId = null;
      this.notify();
    }
  }

  speak(text: string, id = 'global', options?: { force?: boolean; rate?: number }) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (!this.soundEnabled && !options?.force) return;

    // Toggle off if clicking the currently speaking button
    if (this.currentSpeakingId === id && options?.force) {
      this.stopSpeaking();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = this.getPreferredSpanishVoice();
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    } else {
      utterance.lang = 'es-CL';
    }

    utterance.rate = options?.rate ?? 0.92;
    utterance.pitch = 1.06;
    utterance.volume = 1;

    this.currentSpeakingId = id;
    this.notify();

    utterance.onend = () => {
      if (this.currentSpeakingId === id) {
        this.currentSpeakingId = null;
        this.notify();
      }
    };

    utterance.onerror = () => {
      if (this.currentSpeakingId === id) {
        this.currentSpeakingId = null;
        this.notify();
      }
    };

    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      this.currentSpeakingId = null;
      this.notify();
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  playSound(type: 'tap' | 'correct' | 'gentle_wrong' | 'win' | 'star') {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    const playTone = (freq: number, startTime: number, duration: number, gainPeak = 0.12, wave: OscillatorType = 'sine') => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = wave;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(gainPeak, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + duration + 0.02);
    };

    if (type === 'tap') {
      playTone(520, now, 0.08, 0.06, 'triangle');
    } else if (type === 'star') {
      playTone(659.25, now, 0.14, 0.1, 'sine');
      playTone(880, now + 0.08, 0.22, 0.1, 'sine');
    } else if (type === 'correct') {
      playTone(523.25, now, 0.14, 0.1, 'triangle'); // C5
      playTone(659.25, now + 0.09, 0.14, 0.1, 'triangle'); // E5
      playTone(783.99, now + 0.18, 0.26, 0.12, 'triangle'); // G5
    } else if (type === 'gentle_wrong') {
      playTone(330, now, 0.16, 0.08, 'sine');
      playTone(261.63, now + 0.12, 0.22, 0.07, 'sine');
    } else if (type === 'win') {
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((n, idx) => {
        playTone(n, now + idx * 0.11, 0.28, 0.11, 'triangle');
      });
    }
  }
}

export const audioManager = new AudioManager();
