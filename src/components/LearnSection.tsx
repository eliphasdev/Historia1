import { useEffect, useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { CURRICULUM_TOPICS, TopicId } from '../data/curriculum';
import { audioManager } from '../utils/audio';
import { SpeakButton } from './SpeakButton';
import {
  Chile16RegionsMap,
  LandscapeExplorerScene,
  SouthAmericaMapScene,
  ValdiviaPlaceZoomScene,
} from './illustrations/InteractiveScenes';

interface LearnSectionProps {
  activeTopicId: TopicId;
  onSelectTopic: (id: TopicId) => void;
  masteredTopics: TopicId[];
  onToggleMastered: (id: TopicId) => void;
  autoSpeak: boolean;
}

export function LearnSection({
  activeTopicId,
  onSelectTopic,
  masteredTopics,
  onToggleMastered,
  autoSpeak,
}: LearnSectionProps) {
  const currentIndex = CURRICULUM_TOPICS.findIndex((t) => t.id === activeTopicId);
  const topic = CURRICULUM_TOPICS[currentIndex >= 0 ? currentIndex : 0];
  const isMastered = masteredTopics.includes(topic.id);

  const [saHotspotInfo, setSaHotspotInfo] = useState<{ title: string; speech: string } | null>(null);

  useEffect(() => {
    setSaHotspotInfo(null);
    if (autoSpeak) {
      const timer = window.setTimeout(() => {
        audioManager.speak(topic.audioScript, `topic-${topic.id}`);
      }, 150);
      return () => window.clearTimeout(timer);
    }
  }, [topic.id, topic.audioScript, autoSpeak]);

  const goPrev = () => {
    audioManager.playSound('tap');
    const prev = CURRICULUM_TOPICS[(currentIndex - 1 + CURRICULUM_TOPICS.length) % CURRICULUM_TOPICS.length];
    onSelectTopic(prev.id);
  };

  const goNext = () => {
    audioManager.playSound('tap');
    const next = CURRICULUM_TOPICS[(currentIndex + 1) % CURRICULUM_TOPICS.length];
    onSelectTopic(next.id);
  };

  return (
    <section className="space-y-5" aria-label="Aprender los 7 temas de Historia">
      {/* Topic Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {CURRICULUM_TOPICS.map((item) => {
          const active = item.id === topic.id;
          const done = masteredTopics.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                audioManager.playSound('tap');
                onSelectTopic(item.id);
              }}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer min-h-[42px] focus-visible:outline-2 focus-visible:outline-sky-600 ${
                active
                  ? 'bg-sky-600 text-white border-b-4 border-sky-800 shadow-sm'
                  : done
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className="tabular-nums opacity-80">{item.orderLabel}.</span>
              <span>{item.shortTitle}</span>
              {done && (
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 ${active ? 'text-emerald-200' : 'text-emerald-600'}`}
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Two-Zone Educational Sandbox: 65% Interactive Stage + 35% Concept Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Interactive Stage */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col bg-white rounded-2xl border border-slate-200 p-4 min-h-[380px]">
          {topic.sceneType === 'south-america' && (
            <div className="flex-1 flex flex-col gap-3">
              <div className="flex-1">
                <SouthAmericaMapScene
                  onSelectHotspot={(_id, title, speech) => {
                    setSaHotspotInfo({ title, speech });
                    audioManager.speak(speech, `sa-info-${title}`, { force: true });
                  }}
                />
              </div>
              {saHotspotInfo && (
                <div className="bg-sky-50 border border-sky-200 rounded-xl px-4 py-2.5 text-sm text-sky-950 font-semibold">
                  <span className="font-extrabold">{saHotspotInfo.title}: </span>
                  {saHotspotInfo.speech}
                </div>
              )}
            </div>
          )}

          {topic.sceneType === 'valdivia-city' && <ValdiviaPlaceZoomScene key="city" initialLevel="ciudad" />}
          {topic.sceneType === 'valdivia-commune' && <ValdiviaPlaceZoomScene key="commune" initialLevel="comuna" />}
          {topic.sceneType === 'los-rios-region' && <ValdiviaPlaceZoomScene key="region" initialLevel="region" />}
          {topic.sceneType === 'chile-16' && <Chile16RegionsMap />}
          {topic.sceneType === 'cultural' && <LandscapeExplorerScene key="cultural" initialFilter="cultural" />}
          {topic.sceneType === 'natural' && <LandscapeExplorerScene key="natural" initialFilter="natural" />}
        </div>

        {/* Concept & Audio Control Deck */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col justify-between gap-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-2 text-xs font-bold text-slate-500">
              <span>Tema {topic.orderLabel} de 07</span>
              <span>{isMastered ? 'Completado' : 'Por explorar'}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 leading-tight text-balance">
              {topic.title}
            </h2>

            <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
              <p className="text-xs font-extrabold text-sky-800 uppercase tracking-wide mb-1">
                Para recordar en la prueba
              </p>
              <p className="font-display text-lg font-bold text-sky-950 leading-snug">
                {topic.keyAnswer}
              </p>
            </div>

            <p className="text-base text-slate-700 leading-relaxed font-semibold">
              {topic.kidExplanation}
            </p>

            <ul className="space-y-2 pt-1">
              {topic.highlights.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-sm font-bold text-slate-700">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex flex-wrap gap-2.5">
              <SpeakButton
                text={topic.audioScript}
                id={`topic-${topic.id}`}
                label="Escuchar tema"
                size="md"
                className="flex-1"
              />

              <button
                type="button"
                onClick={() => {
                  audioManager.playSound(isMastered ? 'tap' : 'star');
                  onToggleMastered(topic.id);
                  if (!isMastered) {
                    audioManager.speak('¡Muy bien! Ganaste una estrella por aprender este tema.', 'mastered-toast');
                  }
                }}
                className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-base font-bold transition-transform active:translate-y-0.5 cursor-pointer whitespace-nowrap min-h-[44px] ${
                  isMastered
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 border-b-4 border-b-emerald-400'
                    : 'bg-amber-500 hover:bg-amber-600 text-white border-b-4 border-amber-700'
                }`}
              >
                <Star className={`w-5 h-5 ${isMastered ? 'fill-emerald-600 text-emerald-600' : 'fill-white'}`} aria-hidden="true" />
                <span>{isMastered ? 'Aprendido' : '¡Lo entendí!'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <button
                type="button"
                onClick={goPrev}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold cursor-pointer min-h-[40px] whitespace-nowrap"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <span>Anterior</span>
              </button>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold cursor-pointer min-h-[40px] whitespace-nowrap"
              >
                <span>Siguiente tema</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
