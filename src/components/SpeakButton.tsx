import { useEffect, useState } from 'react';
import { Volume2, Square } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface SpeakButtonProps {
  text: string;
  id: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'subtle';
  className?: string;
}

export function SpeakButton({
  text,
  id,
  label = 'Escuchar',
  size = 'md',
  variant = 'primary',
  className = '',
}: SpeakButtonProps) {
  const [speakingId, setSpeakingId] = useState<string | null>(audioManager.getSpeakingId());

  useEffect(() => {
    return audioManager.subscribe(setSpeakingId);
  }, []);

  const isSpeaking = speakingId === id;

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm min-h-[40px]',
    md: 'px-4 py-2.5 text-base min-h-[44px]',
    lg: 'px-6 py-3 text-lg min-h-[52px]',
  }[size];

  const variantClasses = {
    primary: isSpeaking
      ? 'bg-sky-700 text-white border-b-4 border-sky-900 shadow-sm'
      : 'bg-sky-600 hover:bg-sky-700 text-white border-b-4 border-sky-800 shadow-sm',
    secondary: isSpeaking
      ? 'bg-sky-100 text-sky-900 border border-sky-300 border-b-4 border-b-sky-400'
      : 'bg-white hover:bg-sky-50 text-sky-800 border border-slate-200 border-b-4 border-b-slate-300',
    subtle: isSpeaking
      ? 'bg-sky-100 text-sky-900 border border-sky-300'
      : 'bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-800 border border-slate-200',
  }[variant];

  return (
    <button
      type="button"
      onClick={() => {
        audioManager.playSound('tap');
        audioManager.speak(text, id, { force: true });
      }}
      aria-label={isSpeaking ? 'Detener audio' : `${label}: ${text}`}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-bold transition-transform active:translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 ${sizeClasses} ${variantClasses} ${className}`}
    >
      {isSpeaking ? (
        <>
          <Square className="w-4 h-4 fill-current shrink-0" aria-hidden="true" />
          <span>Detener</span>
        </>
      ) : (
        <>
          <Volume2 className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
