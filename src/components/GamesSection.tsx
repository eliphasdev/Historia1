import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, HelpCircle, RotateCcw, Star, Trophy } from 'lucide-react';
import {
  CHILE_16_REGIONS,
  LANDSCAPE_SORT_ITEMS,
  LandscapeCategory,
  MEMORY_PAIRS,
  QUIZ_QUESTIONS,
} from '../data/curriculum';
import { audioManager } from '../utils/audio';
import { SpeakButton } from './SpeakButton';
import {
  Chile16RegionsMap,
  LandscapeItemGraphic,
  SouthAmericaMapScene,
} from './illustrations/InteractiveScenes';

export type ActiveGameId = 'hub' | 'sorting' | 'maphunt' | 'memory' | 'quiz';
type GameStage = 'TITLE_MENU' | 'PLAYING' | 'ROUND_SUMMARY';

interface GamesSectionProps {
  initialGame?: ActiveGameId;
  onEarnStars: (stars: number) => void;
  autoSpeak: boolean;
}

function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function GamesSection({
  initialGame = 'hub',
  onEarnStars,
  autoSpeak,
}: GamesSectionProps) {
  const [activeGame, setActiveGame] = useState<ActiveGameId>(initialGame);

  useEffect(() => {
    setActiveGame(initialGame);
  }, [initialGame]);

  if (activeGame === 'sorting') {
    return (
      <SortingGame
        onBack={() => setActiveGame('hub')}
        onEarnStars={onEarnStars}
        autoSpeak={autoSpeak}
      />
    );
  }
  if (activeGame === 'maphunt') {
    return (
      <MapHuntGame
        onBack={() => setActiveGame('hub')}
        onEarnStars={onEarnStars}
        autoSpeak={autoSpeak}
      />
    );
  }
  if (activeGame === 'memory') {
    return (
      <MemoryGame
        onBack={() => setActiveGame('hub')}
        onEarnStars={onEarnStars}
      />
    );
  }
  if (activeGame === 'quiz') {
    return (
      <QuizGame
        onBack={() => setActiveGame('hub')}
        onEarnStars={onEarnStars}
        autoSpeak={autoSpeak}
      />
    );
  }

  const games = [
    {
      id: 'sorting' as const,
      title: '¿Natural o Cultural?',
      subtitle: 'Clasifica ríos, puentes, volcanes y casas de Valdivia',
      action: 'Jugar ahora',
      color: 'emerald',
      icon: 'river' as const,
    },
    {
      id: 'maphunt' as const,
      title: '¡Encuentra en el Mapa!',
      subtitle: 'Toca Chile, el Océano Pacífico y la Región de Los Ríos',
      action: 'Explorar mapa',
      color: 'sky',
      icon: 'chile' as const,
    },
    {
      id: 'memory' as const,
      title: 'Memoria de Valdivia',
      subtitle: 'Encuentra las parejas mientras escuchas cada palabra',
      action: 'Jugar memoria',
      color: 'amber',
      icon: 'city' as const,
    },
    {
      id: 'quiz' as const,
      title: 'Súper Prueba de Historia',
      subtitle: '10 preguntas con voz sobre toda la evaluación',
      action: 'Comenzar prueba',
      color: 'sky',
      icon: 'count16' as const,
    },
  ];

  return (
    <section className="space-y-5" aria-label="Juegos educativos">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Sala de Juegos de Historia
          </h2>
          <p className="text-base text-slate-600 font-semibold mt-1">
            Elige un juego para practicar escuchando y ganar estrellas.
          </p>
        </div>
        <SpeakButton
          text="Elige un juego para practicar: ¿Natural o Cultural?, Encuentra en el Mapa, Memoria de Valdivia, o la Súper Prueba de Historia."
          id="games-hub-intro"
          label="Escuchar opciones"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {games.map((g) => (
          <div
            key={g.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex items-center gap-5 justify-between"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="shrink-0">
                <LandscapeItemGraphic iconKey={g.icon} />
              </div>
              <div className="min-w-0">
                <h3 className="font-display text-xl font-bold text-slate-900">
                  {g.title}
                </h3>
                <p className="text-sm font-semibold text-slate-600 mt-1 leading-snug">
                  {g.subtitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                audioManager.playSound('tap');
                setActiveGame(g.id);
              }}
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm border-b-4 border-sky-800 whitespace-nowrap shrink-0 cursor-pointer min-h-[44px] active:translate-y-0.5 transition-transform"
            >
              {g.action}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================================
   GAME 1: ¿Natural o Cultural?
============================================================================ */
function SortingGame({
  onBack,
  onEarnStars,
  autoSpeak,
}: {
  onBack: () => void;
  onEarnStars: (stars: number) => void;
  autoSpeak: boolean;
}) {
  const [stage, setStage] = useState<GameStage>('TITLE_MENU');
  const [deck, setDeck] = useState(() => shuffleArray(LANDSCAPE_SORT_ITEMS).slice(0, 8));
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ ok: boolean; message: string } | null>(null);

  const currentItem = deck[index];

  const startGame = () => {
    audioManager.playSound('tap');
    const freshDeck = shuffleArray(LANDSCAPE_SORT_ITEMS).slice(0, 8);
    setDeck(freshDeck);
    setIndex(0);
    setScore(0);
    setFeedback(null);
    setStage('PLAYING');
    if (autoSpeak && freshDeck[0]) {
      audioManager.speak(`${freshDeck[0].name}. ¿Es paisaje natural o paisaje cultural?`, 'sort-q0');
    }
  };

  useEffect(() => {
    if (stage === 'PLAYING' && currentItem && !feedback && autoSpeak) {
      audioManager.speak(`${currentItem.name}. ¿Es paisaje natural o cultural?`, `sort-${currentItem.id}`);
    }
  }, [stage, index, currentItem, feedback, autoSpeak]);

  const handleGuess = (choice: LandscapeCategory) => {
    if (!currentItem || feedback) return;
    if (choice === currentItem.category) {
      audioManager.playSound('correct');
      setScore((s) => s + 1);
      setFeedback({ ok: true, message: currentItem.explanation });
      audioManager.speak(currentItem.explanation, `sort-fb-${currentItem.id}`);
    } else {
      audioManager.playSound('gentle_wrong');
      const hint =
        currentItem.category === 'natural'
          ? `Casi. Piensa: ¿lo fabricaron las personas o lo creó la naturaleza? Intenta con Paisaje Natural.`
          : `Casi. Piensa: ¿nació solo en el bosque o lo construyeron las personas? Intenta con Paisaje Cultural.`;
      setFeedback({ ok: false, message: hint });
      audioManager.speak(hint, `sort-hint-${currentItem.id}`);
    }
  };

  const nextCard = () => {
    audioManager.playSound('tap');
    if (index + 1 >= deck.length) {
      setStage('ROUND_SUMMARY');
      audioManager.playSound('win');
      onEarnStars(3);
      audioManager.speak(`¡Excelente trabajo! Clasificaste ${score} de ${deck.length} elementos y ganaste 3 estrellas.`, 'sort-win');
    } else {
      setFeedback(null);
      setIndex((i) => i + 1);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            audioManager.stopSpeaking();
            onBack();
          }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold cursor-pointer min-h-[42px]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Volver a juegos</span>
        </button>

        {stage === 'PLAYING' && (
          <div className="text-sm font-bold text-slate-600 tabular-nums">
            Tarjeta {index + 1} de {deck.length} · Puntos: {score}
          </div>
        )}
      </div>

      {stage === 'TITLE_MENU' && (
        <div className="text-center space-y-5 py-4">
          <div className="flex justify-center gap-3">
            <LandscapeItemGraphic iconKey="natural" />
            <LandscapeItemGraphic iconKey="cultural" />
          </div>
          <h2 className="font-display text-3xl font-bold text-slate-900">
            ¿Paisaje Natural o Cultural?
          </h2>
          <p className="text-base text-slate-600 font-semibold max-w-lg mx-auto leading-relaxed">
            Mira cada dibujo de Valdivia y elige si lo creó la naturaleza (Natural) o si lo construyeron las personas (Cultural).
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <SpeakButton
              text="En este juego verás dibujos de Valdivia. Elige Paisaje Natural si lo creó la naturaleza, o Paisaje Cultural si lo hicieron las personas."
              id="sort-intro"
              variant="secondary"
              label="Escuchar reglas"
            />
            <button
              type="button"
              onClick={startGame}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg border-b-4 border-emerald-800 cursor-pointer min-h-[52px]"
            >
              Comenzar juego
            </button>
          </div>
        </div>
      )}

      {stage === 'PLAYING' && currentItem && (
        <div className="space-y-6">
          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 flex flex-col items-center text-center gap-4">
            <LandscapeItemGraphic iconKey={currentItem.iconKey} />
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              {currentItem.name}
            </h3>
            <SpeakButton
              text={`${currentItem.name}. ¿Es paisaje natural o paisaje cultural?`}
              id={`sort-btn-${currentItem.id}`}
              size="sm"
              variant="secondary"
            />
          </div>

          {!feedback ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleGuess('natural')}
                className="p-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white border-b-4 border-emerald-800 text-center cursor-pointer transition-transform active:translate-y-0.5 min-h-[88px]"
              >
                <div className="font-display text-2xl font-bold">Paisaje Natural</div>
                <div className="text-sm font-semibold text-emerald-100 mt-1">
                  Creado por la naturaleza
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleGuess('cultural')}
                className="p-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white border-b-4 border-amber-700 text-center cursor-pointer transition-transform active:translate-y-0.5 min-h-[88px]"
              >
                <div className="font-display text-2xl font-bold">Paisaje Cultural</div>
                <div className="text-sm font-semibold text-amber-50 mt-1">
                  Hecho por las personas
                </div>
              </button>
            </div>
          ) : (
            <div
              className={`rounded-2xl p-5 border space-y-4 ${
                feedback.ok
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-start gap-3">
                {feedback.ok ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                ) : (
                  <HelpCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                )}
                <p className="text-base font-bold leading-relaxed">{feedback.message}</p>
              </div>
              <div className="flex justify-end gap-3">
                {!feedback.ok ? (
                  <button
                    type="button"
                    onClick={() => setFeedback(null)}
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold border-b-4 border-amber-700 cursor-pointer min-h-[44px]"
                  >
                    Intentar otra vez
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={nextCard}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-b-4 border-emerald-800 cursor-pointer min-h-[44px]"
                  >
                    {index + 1 >= deck.length ? 'Ver premio' : 'Siguiente tarjeta'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {stage === 'ROUND_SUMMARY' && (
        <div className="text-center space-y-5 py-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <Trophy className="w-9 h-9" aria-hidden="true" />
          </div>
          <h3 className="font-display text-3xl font-bold text-slate-900">
            ¡Muy bien hecho!
          </h3>
          <p className="text-lg font-bold text-slate-700 tabular-nums">
            Acertaste {score} de {deck.length} tarjetas y ganaste 3 estrellas.
          </p>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={startGame}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold border-b-4 border-sky-800 cursor-pointer min-h-[48px]"
            >
              <RotateCcw className="w-5 h-5" aria-hidden="true" />
              <span>Jugar otra vez</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   GAME 2: ¡Encuentra en el Mapa!
============================================================================ */
interface MapMission {
  id: string;
  mapType: 'south-america' | 'chile-16';
  targetId: string;
  prompt: string;
  successMsg: string;
}

const MAP_MISSIONS: MapMission[] = [
  {
    id: 'find-chile',
    mapType: 'south-america',
    targetId: 'chile',
    prompt: 'Toca dónde está CHILE en el mapa de América del Sur.',
    successMsg: '¡Excelente! Encontraste a Chile, nuestro país largo y angosto.',
  },
  {
    id: 'find-pacific',
    mapType: 'south-america',
    targetId: 'pacific',
    prompt: 'Toca el OCÉANO PACÍFICO al lado de Chile.',
    successMsg: '¡Muy bien! El Océano Pacífico está al oeste de Chile.',
  },
  {
    id: 'find-los-rios',
    mapType: 'chile-16',
    targetId: '13',
    prompt: 'Toca nuestra REGIÓN DE LOS RÍOS en el mapa de las 16 regiones.',
    successMsg: '¡Bravo! Ahí está nuestra Región de Los Ríos, cuya capital es Valdivia.',
  },
  {
    id: 'find-andes',
    mapType: 'south-america',
    targetId: 'andes',
    prompt: 'Toca las montañas de la CORDILLERA DE LOS ANDES.',
    successMsg: '¡Genial! La Cordillera de los Andes está al este de Chile.',
  },
];

function MapHuntGame({
  onBack,
  onEarnStars,
  autoSpeak,
}: {
  onBack: () => void;
  onEarnStars: (stars: number) => void;
  autoSpeak: boolean;
}) {
  const [stage, setStage] = useState<GameStage>('TITLE_MENU');
  const [missionIdx, setMissionIdx] = useState(0);
  const [statusMsg, setStatusMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const mission = MAP_MISSIONS[missionIdx];

  const startGame = () => {
    audioManager.playSound('tap');
    setMissionIdx(0);
    setStatusMsg(null);
    setStage('PLAYING');
    if (autoSpeak) {
      audioManager.speak(MAP_MISSIONS[0].prompt, 'maphunt-0');
    }
  };

  useEffect(() => {
    if (stage === 'PLAYING' && mission && !statusMsg && autoSpeak) {
      audioManager.speak(mission.prompt, `maphunt-${mission.id}`);
    }
  }, [stage, missionIdx, mission, statusMsg, autoSpeak]);

  const checkAnswer = (clickedId: string) => {
    if (!mission || statusMsg?.ok) return;
    if (clickedId === mission.targetId) {
      audioManager.playSound('correct');
      setStatusMsg({ ok: true, text: mission.successMsg });
      audioManager.speak(mission.successMsg, `mh-ok-${mission.id}`);
    } else {
      audioManager.playSound('gentle_wrong');
      const retry = 'Casi, ese es otro lugar. ¡Mira bien y vuelve a tocar!';
      setStatusMsg({ ok: false, text: retry });
      audioManager.speak(retry, `mh-try-${mission.id}`);
    }
  };

  const nextMission = () => {
    audioManager.playSound('tap');
    if (missionIdx + 1 >= MAP_MISSIONS.length) {
      setStage('ROUND_SUMMARY');
      audioManager.playSound('win');
      onEarnStars(3);
      audioManager.speak('¡Misión cumplida! Eres un gran explorador de mapas y ganaste 3 estrellas.', 'mh-win');
    } else {
      setStatusMsg(null);
      setMissionIdx((i) => i + 1);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            audioManager.stopSpeaking();
            onBack();
          }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold cursor-pointer min-h-[42px]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Volver a juegos</span>
        </button>
        {stage === 'PLAYING' && (
          <div className="text-sm font-bold text-slate-600 tabular-nums">
            Misión {missionIdx + 1} de {MAP_MISSIONS.length}
          </div>
        )}
      </div>

      {stage === 'TITLE_MENU' && (
        <div className="text-center space-y-5 py-6 max-w-lg mx-auto">
          <div className="flex justify-center">
            <LandscapeItemGraphic iconKey="chile" />
          </div>
          <h2 className="font-display text-3xl font-bold text-slate-900">
            ¡Encuentra en el Mapa!
          </h2>
          <p className="text-base text-slate-600 font-semibold leading-relaxed">
            Escucha la pista y toca el lugar correcto en el mapa de América del Sur y en las 16 regiones de Chile.
          </p>
          <button
            type="button"
            onClick={startGame}
            className="px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-lg border-b-4 border-sky-800 cursor-pointer min-h-[52px]"
          >
            Comenzar búsqueda
          </button>
        </div>
      )}

      {stage === 'PLAYING' && mission && (
        <div className="space-y-4">
          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-sky-950">
              {mission.prompt}
            </h3>
            <SpeakButton text={mission.prompt} id={`mh-p-${mission.id}`} size="sm" />
          </div>

          {statusMsg && (
            <div
              className={`rounded-xl p-4 border flex flex-wrap items-center justify-between gap-3 ${
                statusMsg.ok
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <span className="font-bold text-base">{statusMsg.text}</span>
              {statusMsg.ok && (
                <button
                  type="button"
                  onClick={nextMission}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-b-4 border-emerald-800 cursor-pointer"
                >
                  {missionIdx + 1 >= MAP_MISSIONS.length ? 'Ver premio' : 'Siguiente misión'}
                </button>
              )}
            </div>
          )}

          {mission.mapType === 'south-america' ? (
            <SouthAmericaMapScene
              selectedHotspot={statusMsg?.ok ? mission.targetId : null}
              gamePromptTarget={mission.targetId as 'chile' | 'pacific' | 'andes'}
              onGameClick={checkAnswer}
            />
          ) : (
            <Chile16RegionsMap
              highlightHome={false}
              selectedRegionNumber={statusMsg?.ok ? 13 : null}
              onSelectRegion={(reg) => checkAnswer(String(reg.number))}
            />
          )}
        </div>
      )}

      {stage === 'ROUND_SUMMARY' && (
        <div className="text-center space-y-5 py-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <Trophy className="w-9 h-9" aria-hidden="true" />
          </div>
          <h3 className="font-display text-3xl font-bold text-slate-900">
            ¡Misión cumplida!
          </h3>
          <p className="text-lg font-bold text-slate-700">
            Encontraste todos los lugares en el mapa y ganaste 3 estrellas.
          </p>
          <button
            type="button"
            onClick={startGame}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold border-b-4 border-sky-800 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" aria-hidden="true" />
            <span>Jugar de nuevo</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   GAME 3: Memoria de Valdivia y Chile
============================================================================ */
interface MemoryTile {
  uid: string;
  pairId: string;
  label: string;
  sublabel: string;
  iconKey: 'chile' | 'city' | 'region' | 'count16' | 'natural' | 'cultural';
}

function buildMemoryDeck(): MemoryTile[] {
  const doubled = [...MEMORY_PAIRS, ...MEMORY_PAIRS].map((p, idx) => ({
    uid: `${p.pairId}-${idx}`,
    pairId: p.pairId,
    label: p.label,
    sublabel: p.sublabel,
    iconKey: p.iconKey,
  }));
  return shuffleArray(doubled);
}

function MemoryGame({
  onBack,
  onEarnStars,
}: {
  onBack: () => void;
  onEarnStars: (stars: number) => void;
}) {
  const [tiles, setTiles] = useState<MemoryTile[]>(() => buildMemoryDeck());
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);

  const isWin = matchedPairs.length === MEMORY_PAIRS.length;

  const resetGame = () => {
    audioManager.playSound('tap');
    setTiles(buildMemoryDeck());
    setFlippedIds([]);
    setMatchedPairs([]);
    setMoves(0);
    setLocked(false);
  };

  const flipTile = (tile: MemoryTile) => {
    if (locked) return;
    if (flippedIds.includes(tile.uid) || matchedPairs.includes(tile.pairId)) return;

    audioManager.playSound('tap');
    audioManager.speak(`${tile.label}: ${tile.sublabel}`, `mem-${tile.uid}`);

    const nextFlipped = [...flippedIds, tile.uid];
    setFlippedIds(nextFlipped);

    if (nextFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [firstUid, secondUid] = nextFlipped;
      const firstTile = tiles.find((t) => t.uid === firstUid);
      const secondTile = tiles.find((t) => t.uid === secondUid);

      if (firstTile && secondTile && firstTile.pairId === secondTile.pairId) {
        const nextMatched = [...matchedPairs, firstTile.pairId];
        setMatchedPairs(nextMatched);
        setFlippedIds([]);
        audioManager.playSound('correct');
        if (nextMatched.length === MEMORY_PAIRS.length) {
          window.setTimeout(() => {
            audioManager.playSound('win');
            onEarnStars(3);
            audioManager.speak('¡Fantástico! Encontraste todas las parejas de Valdivia y Chile y ganaste 3 estrellas.', 'mem-win');
          }, 400);
        }
      } else {
        setLocked(true);
        window.setTimeout(() => {
          setFlippedIds([]);
          setLocked(false);
        }, 900);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 max-w-4xl mx-auto space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            audioManager.stopSpeaking();
            onBack();
          }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold cursor-pointer min-h-[42px]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Volver a juegos</span>
        </button>

        <div className="flex items-center gap-4 text-sm font-bold text-slate-700 tabular-nums">
          <span>Parejas: {matchedPairs.length}/{MEMORY_PAIRS.length}</span>
          <span>Intentos: {moves}</span>
          <button
            type="button"
            onClick={resetGame}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Reiniciar</span>
          </button>
        </div>
      </div>

      {isWin ? (
        <div className="text-center space-y-5 py-8">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <Trophy className="w-9 h-9" aria-hidden="true" />
          </div>
          <h3 className="font-display text-3xl font-bold text-slate-900">
            ¡Completaste la memoria!
          </h3>
          <p className="text-lg font-bold text-slate-700 tabular-nums">
            Lo lograste en {moves} intentos y ganaste 3 estrellas.
          </p>
          <button
            type="button"
            onClick={resetGame}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold border-b-4 border-sky-800 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" aria-hidden="true" />
            <span>Jugar otra partida</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {tiles.map((tile) => {
            const revealed = flippedIds.includes(tile.uid) || matchedPairs.includes(tile.pairId);
            const matched = matchedPairs.includes(tile.pairId);
            return (
              <button
                key={tile.uid}
                type="button"
                onClick={() => flipTile(tile)}
                aria-label={revealed ? `${tile.label} ${tile.sublabel}` : 'Voltear tarjeta'}
                className={`rounded-2xl p-3 min-h-[126px] flex flex-col items-center justify-center text-center transition-all cursor-pointer border-2 ${
                  matched
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                    : revealed
                    ? 'bg-white border-sky-500 text-slate-900 shadow-sm'
                    : 'bg-sky-600 hover:bg-sky-700 border-sky-800 border-b-4 text-white'
                }`}
              >
                {revealed ? (
                  <>
                    <div className="scale-75 -my-2">
                      <LandscapeItemGraphic iconKey={tile.iconKey} />
                    </div>
                    <div className="font-display font-bold text-base leading-tight mt-1">
                      {tile.label}
                    </div>
                    <div className="text-xs font-bold text-slate-500 mt-0.5">
                      {tile.sublabel}
                    </div>
                  </>
                ) : (
                  <div className="font-display text-3xl font-bold text-sky-100">?</div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ============================================================================
   GAME 4: Súper Prueba de Historia (10 preguntas de los 7 temas)
============================================================================ */
function QuizGame({
  onBack,
  onEarnStars,
  autoSpeak,
}: {
  onBack: () => void;
  onEarnStars: (stars: number) => void;
  autoSpeak: boolean;
}) {
  const [stage, setStage] = useState<GameStage>('TITLE_MENU');
  const [questions, setQuestions] = useState(() => QUIZ_QUESTIONS);
  const [qIdx, setQIdx] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [firstTryRight, setFirstTryRight] = useState(true);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);

  const q = questions[qIdx];

  const startQuiz = () => {
    audioManager.playSound('tap');
    setQuestions(QUIZ_QUESTIONS);
    setQIdx(0);
    setCorrectCount(0);
    setFirstTryRight(true);
    setFeedback(null);
    setStage('PLAYING');
  };

  useEffect(() => {
    if (stage === 'PLAYING' && q && !feedback && autoSpeak) {
      const optionsSpeech = q.options.map((o, i) => `Opción ${i + 1}: ${o}`).join('. ');
      audioManager.speak(`${q.question} ${optionsSpeech}`, `quiz-${q.id}`);
    }
  }, [stage, qIdx, q, feedback, autoSpeak]);

  const answer = (idx: number) => {
    if (!q || feedback?.ok) return;
    if (idx === q.correctIndex) {
      audioManager.playSound('correct');
      if (firstTryRight) {
        setCorrectCount((c) => c + 1);
      }
      setFeedback({ ok: true, text: q.celebration });
      audioManager.speak(q.celebration, `quiz-ok-${q.id}`);
    } else {
      audioManager.playSound('gentle_wrong');
      setFirstTryRight(false);
      setFeedback({ ok: false, text: q.hint });
      audioManager.speak(q.hint, `quiz-hint-${q.id}`);
    }
  };

  const goNext = () => {
    audioManager.playSound('tap');
    if (qIdx + 1 >= questions.length) {
      setStage('ROUND_SUMMARY');
      audioManager.playSound('win');
      onEarnStars(5);
      audioManager.speak(
        '¡Felicitaciones! Terminaste la Súper Prueba de Historia y estás listo para tu evaluación. Ganaste cinco estrellas.',
        'quiz-win'
      );
    } else {
      setFeedback(null);
      setFirstTryRight(true);
      setQIdx((i) => i + 1);
    }
  };

  const fullQuestionSpeech = q
    ? `${q.question}. ${q.options.map((o, i) => `Opción ${i + 1}: ${o}`).join('. ')}`
    : '';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-8 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => {
            audioManager.stopSpeaking();
            onBack();
          }}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold cursor-pointer min-h-[42px]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Volver a juegos</span>
        </button>

        {stage === 'PLAYING' && (
          <div className="text-sm font-bold text-slate-600 tabular-nums">
            Pregunta {qIdx + 1} de {questions.length}
          </div>
        )}
      </div>

      {stage === 'TITLE_MENU' && (
        <div className="text-center space-y-5 py-4">
          <div className="flex justify-center">
            <LandscapeItemGraphic iconKey="count16" />
          </div>
          <h2 className="font-display text-3xl font-bold text-slate-900">
            Súper Prueba de Historia
          </h2>
          <p className="text-base text-slate-600 font-semibold max-w-lg mx-auto leading-relaxed">
            Responde 10 preguntas sobre los 7 contenidos de tu evaluación: Chile, Valdivia, Los Ríos, las 16 regiones y el paisaje natural y cultural.
          </p>
          <button
            type="button"
            onClick={startQuiz}
            className="px-7 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-lg border-b-4 border-sky-800 cursor-pointer min-h-[52px]"
          >
            Comenzar Súper Prueba
          </button>
        </div>
      )}

      {stage === 'PLAYING' && q && (
        <div className="space-y-5">
          {/* Progress bar */}
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-sky-600 transition-all duration-300"
              style={{ width: `${((qIdx + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="bg-sky-50 border border-sky-200 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-display text-2xl font-bold text-slate-900 leading-snug text-balance">
              {q.question}
            </h3>
            <SpeakButton text={fullQuestionSpeech} id={`q-read-${q.id}`} label="Escuchar" className="shrink-0" />
          </div>

          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const isCorrectRevealed = feedback?.ok && idx === q.correctIndex;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => answer(idx)}
                  disabled={Boolean(feedback?.ok)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 font-bold text-lg transition-all cursor-pointer flex items-center justify-between gap-3 min-h-[60px] ${
                    isCorrectRevealed
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                      : 'bg-white hover:bg-sky-50 border-slate-200 border-b-4 hover:border-sky-300 text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 font-display font-bold flex items-center justify-center shrink-0 tabular-nums">
                      {idx + 1}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {isCorrectRevealed && (
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>

          {feedback && (
            <div
              className={`rounded-2xl p-4 sm:p-5 border flex flex-wrap items-center justify-between gap-4 ${
                feedback.ok
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50 border-amber-300 text-amber-950'
              }`}
            >
              <p className="font-bold text-base leading-relaxed flex-1">{feedback.text}</p>
              {feedback.ok && (
                <button
                  type="button"
                  onClick={goNext}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-b-4 border-emerald-800 cursor-pointer min-h-[44px]"
                >
                  {qIdx + 1 >= questions.length ? 'Ver Diploma' : 'Siguiente pregunta'}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {stage === 'ROUND_SUMMARY' && (
        <div className="text-center space-y-5 py-6 bg-gradient-to-b from-amber-50 to-white rounded-2xl border-2 border-amber-300 p-6">
          <div className="w-20 h-20 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <Trophy className="w-11 h-11" aria-hidden="true" />
          </div>
          <div className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
            Diploma de Explorador de Valdivia
          </div>
          <h3 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
            ¡Listo para la prueba de Historia!
          </h3>
          <p className="text-lg font-bold text-slate-700 tabular-nums">
            Respondiste {correctCount} de {questions.length} a la primera y ganaste 5 estrellas.
          </p>
          <div className="flex items-center justify-center gap-1.5 text-amber-500">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-8 h-8 fill-amber-400" aria-hidden="true" />
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={startQuiz}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold border-b-4 border-sky-800 cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" aria-hidden="true" />
              <span>Repetir Súper Prueba</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
