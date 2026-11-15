/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { CheckCircle2, Star, Volume2, VolumeX } from 'lucide-react';
import { CURRICULUM_TOPICS, TopicId } from './data/curriculum';
import { audioManager } from './utils/audio';
import { SpeakButton } from './components/SpeakButton';
import { LearnSection } from './components/LearnSection';
import { MapExplorerSection } from './components/MapExplorerSection';
import { ActiveGameId, GamesSection } from './components/GamesSection';
import { LandscapeItemGraphic, SouthAmericaMapScene } from './components/illustrations/InteractiveScenes';

type AppTab = 'inicio' | 'aprender' | 'mapa' | 'juegos';

const STORAGE_KEY = 'explora_valdivia_progress_v1';

interface SavedProgress {
  masteredTopics: TopicId[];
  stars: number;
}

function loadProgress(): SavedProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { masteredTopics: [], stars: 0 };
    const parsed = JSON.parse(raw) as Partial<SavedProgress>;
    return {
      masteredTopics: Array.isArray(parsed.masteredTopics) ? parsed.masteredTopics : [],
      stars: typeof parsed.stars === 'number' ? parsed.stars : 0,
    };
  } catch {
    return { masteredTopics: [], stars: 0 };
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('inicio');
  const [selectedTopicId, setSelectedTopicId] = useState<TopicId>('ubicacion-chile');
  const [initialGame, setInitialGame] = useState<ActiveGameId>('hub');
  const [progress, setProgress] = useState<SavedProgress>(() => loadProgress());
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [autoSpeak, setAutoSpeak] = useState<boolean>(true);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    audioManager.setSoundEnabled(next);
    if (next) {
      audioManager.playSound('tap');
    }
  };

  const toggleAutoSpeak = () => {
    const next = !autoSpeak;
    setAutoSpeak(next);
    audioManager.setAutoSpeak(next);
    audioManager.playSound('tap');
  };

  const handleToggleMastered = (id: TopicId) => {
    setProgress((prev) => {
      const exists = prev.masteredTopics.includes(id);
      return {
        masteredTopics: exists
          ? prev.masteredTopics.filter((t) => t !== id)
          : [...prev.masteredTopics, id],
        stars: exists ? prev.stars : prev.stars + 1,
      };
    });
  };

  const handleEarnStars = (earned: number) => {
    setProgress((prev) => ({
      ...prev,
      stars: prev.stars + earned,
    }));
  };

  const openTopic = (id: TopicId) => {
    audioManager.playSound('tap');
    setSelectedTopicId(id);
    setActiveTab('aprender');
  };

  const openSuperQuiz = () => {
    audioManager.playSound('tap');
    setInitialGame('quiz');
    setActiveTab('juegos');
  };

  const navItems: { id: AppTab; label: string }[] = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'aprender', label: 'Aprender' },
    { id: 'mapa', label: 'Mapa' },
    { id: 'juegos', label: 'Juegos' },
  ];

  const topicIconMap: Record<TopicId, 'chile' | 'city' | 'region' | 'count16' | 'cultural' | 'natural'> = {
    'ubicacion-chile': 'chile',
    'nuestra-ciudad': 'city',
    'nuestra-comuna': 'city',
    'nuestra-region': 'region',
    'regiones-chile': 'count16',
    'paisaje-cultural': 'cultural',
    'paisaje-natural': 'natural',
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FA] text-slate-900">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => {
              audioManager.stopSpeaking();
              setActiveTab('inicio');
            }}
            className="font-display text-xl sm:text-2xl font-bold tracking-tight text-sky-800 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-600"
          >
            Explora Valdivia
          </button>

          {/* Zone 2: 4 single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Navegación principal">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    audioManager.stopSpeaking();
                    audioManager.playSound('tap');
                    if (item.id === 'juegos') setInitialGame('hub');
                    setActiveTab(item.id);
                  }}
                  className={`text-base font-bold py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-sky-700 border-sky-600'
                      : 'text-slate-600 border-transparent hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <button
            type="button"
            onClick={openSuperQuiz}
            className="px-4 py-2 text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl border-b-4 border-sky-800 transition-transform active:translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer min-h-[42px]"
          >
            Súper Prueba
          </button>
        </div>

        {/* Mobile single-row navigation */}
        <nav
          className="flex md:hidden items-center justify-around border-t border-slate-100 px-2 py-1.5 bg-white"
          aria-label="Navegación móvil"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  audioManager.stopSpeaking();
                  audioManager.playSound('tap');
                  if (item.id === 'juegos') setInitialGame('hub');
                  setActiveTab(item.id);
                }}
                className={`px-3 py-1.5 text-sm font-bold rounded-lg whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive ? 'text-sky-700 bg-sky-50' : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* Workspace Control & Progress Strip */}
        <div className="bg-white rounded-2xl border border-slate-200 px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-slate-700 tabular-nums">
            <span className="inline-flex items-center gap-1.5 text-amber-700">
              <Star className="w-5 h-5 fill-amber-400 text-amber-500" aria-hidden="true" />
              <span>Estrellas: {progress.stars}</span>
            </span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span className="text-emerald-800">
              Temas listos: {progress.masteredTopics.length} / {CURRICULUM_TOPICS.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleAutoSpeak}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold border transition-colors cursor-pointer whitespace-nowrap min-h-[38px] ${
                autoSpeak
                  ? 'bg-sky-50 text-sky-900 border-sky-200'
                  : 'bg-slate-50 text-slate-600 border-slate-200'
              }`}
            >
              {autoSpeak ? 'Lectura automática: Sí' : 'Lectura automática: No'}
            </button>

            <button
              type="button"
              onClick={toggleSound}
              aria-label={soundEnabled ? 'Silenciar sonidos' : 'Activar sonidos'}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer whitespace-nowrap min-h-[38px]"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-sky-700" aria-hidden="true" />
                  <span>Audio activo</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-500" aria-hidden="true" />
                  <span>En silencio</span>
                </>
              )}
            </button>
          </div>
        </div>

        {activeTab === 'inicio' && (
          <>
            {/* Hero 2-column split */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <p className="text-sm font-bold text-emerald-700">
                    Valdivia · Región de Los Ríos · Chile
                  </p>
                  <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight text-balance">
                    ¡Hola explorador! Prepara tu prueba de Historia
                  </h1>
                  <p className="text-base sm:text-lg text-slate-600 font-semibold leading-relaxed">
                    Toca los mapas para escuchar, descubre nuestra ciudad y comuna de Valdivia, cuenta las 16 regiones de Chile y juega con el paisaje natural y cultural.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => openTopic('ubicacion-chile')}
                    className="px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-base border-b-4 border-sky-800 cursor-pointer min-h-[48px] active:translate-y-0.5 transition-transform whitespace-nowrap"
                  >
                    Empezar a aprender
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      audioManager.playSound('tap');
                      setInitialGame('hub');
                      setActiveTab('juegos');
                    }}
                    className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-base border-b-4 border-emerald-800 cursor-pointer min-h-[48px] active:translate-y-0.5 transition-transform whitespace-nowrap"
                  >
                    Ir a los juegos
                  </button>

                  <SpeakButton
                    text="¡Hola explorador de Valdivia! Vamos a estudiar jugando los siete temas de tu evaluación de Historia: la ubicación de Chile, nuestra ciudad y comuna Valdivia, nuestra Región de Los Ríos, las dieciséis regiones de Chile, y el paisaje cultural y natural."
                    id="hero-welcome"
                    label="Escuchar"
                    variant="secondary"
                  />
                </div>
              </div>

              <div className="lg:col-span-6">
                <SouthAmericaMapScene />
              </div>
            </section>

            {/* 7 Evaluation Topics Grid */}
            <section className="space-y-4" aria-label="Temas de la evaluación de Historia">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
                    Los 7 temas de tu evaluación
                  </h2>
                  <p className="text-base font-semibold text-slate-600 mt-0.5">
                    Toca cualquier tarjeta para explorar el dibujo interactivo o escuchar la explicación.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CURRICULUM_TOPICS.map((topic) => {
                  const isDone = progress.masteredTopics.includes(topic.id);
                  return (
                    <article
                      key={topic.id}
                      className={`rounded-2xl border p-5 flex flex-col justify-between gap-4 transition-colors ${
                        isDone
                          ? 'bg-emerald-50/60 border-emerald-300'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="shrink-0">
                            <LandscapeItemGraphic iconKey={topicIconMap[topic.id]} />
                          </div>
                          <div className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                            <span className="tabular-nums">Tema {topic.orderLabel}</span>
                            {isDone && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className="inline-flex items-center gap-1 text-emerald-700 font-extrabold">
                                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                                  Listo
                                </span>
                              </>
                            )}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-display text-xl font-bold text-slate-900 leading-snug">
                            {topic.title}
                          </h3>
                          <p className="text-sm font-bold text-sky-800 mt-1.5">
                            {topic.keyAnswer}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => openTopic(topic.id)}
                          className="flex-1 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold border-b-4 border-sky-800 cursor-pointer min-h-[42px] whitespace-nowrap"
                        >
                          Explorar tema
                        </button>
                        <SpeakButton
                          text={topic.audioScript}
                          id={`card-${topic.id}`}
                          label="Oír"
                          size="sm"
                          variant="secondary"
                        />
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          </>
        )}

        {activeTab === 'aprender' && (
          <LearnSection
            activeTopicId={selectedTopicId}
            onSelectTopic={setSelectedTopicId}
            masteredTopics={progress.masteredTopics}
            onToggleMastered={handleToggleMastered}
            autoSpeak={autoSpeak}
          />
        )}

        {activeTab === 'mapa' && <MapExplorerSection />}

        {activeTab === 'juegos' && (
          <GamesSection
            initialGame={initialGame}
            onEarnStars={handleEarnStars}
            autoSpeak={autoSpeak}
          />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 text-sm font-semibold text-slate-500">
          <span>Explora Valdivia · Historia 1° Básico · Región de Los Ríos, Chile</span>
          <button
            type="button"
            onClick={() => {
              audioManager.stopSpeaking();
              setActiveTab('inicio');
            }}
            className="text-sky-700 hover:underline font-bold cursor-pointer"
          >
            Volver al inicio
          </button>
        </div>
      </footer>
    </div>
  );
}
