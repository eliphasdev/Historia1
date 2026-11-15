import { useEffect, useRef, useState } from 'react';
import { Play, Square } from 'lucide-react';
import { CHILE_16_REGIONS } from '../data/curriculum';
import { audioManager } from '../utils/audio';
import { SpeakButton } from './SpeakButton';
import {
  Chile16RegionsMap,
  SouthAmericaMapScene,
  ValdiviaPlaceZoomScene,
} from './illustrations/InteractiveScenes';

type MapTab = 'south-america' | '16-regions' | 'valdivia';

export function MapExplorerSection() {
  const [tab, setTab] = useState<MapTab>('south-america');
  const [hotspotText, setHotspotText] = useState<string>(
    'Toca Chile, el Océano Pacífico o la Cordillera en el mapa.'
  );
  const [countingIndex, setCountingIndex] = useState<number | null>(null);
  const countTimerRef = useRef<number | null>(null);

  const stopCounting = () => {
    if (countTimerRef.current !== null) {
      window.clearInterval(countTimerRef.current);
      countTimerRef.current = null;
    }
    setCountingIndex(null);
    audioManager.stopSpeaking();
  };

  useEffect(() => {
    return () => {
      if (countTimerRef.current !== null) {
        window.clearInterval(countTimerRef.current);
      }
    };
  }, []);

  const startCounting16 = () => {
    if (countingIndex !== null) {
      stopCounting();
      return;
    }
    audioManager.playSound('tap');
    let idx = 0;
    const step = () => {
      if (idx >= CHILE_16_REGIONS.length) {
        stopCounting();
        audioManager.playSound('win');
        audioManager.speak('¡Listo! Chile tiene dieciséis regiones en total.', 'count-done');
        return;
      }
      const region = CHILE_16_REGIONS[idx];
      setCountingIndex(region.number);
      audioManager.speak(`${region.number}: ${region.name}`, `count-${region.number}`, { rate: 1.02 });
      idx += 1;
    };
    step();
    countTimerRef.current = window.setInterval(step, 2600);
  };

  return (
    <section className="space-y-5" aria-label="Explorador de mapas de Chile y Valdivia">
      <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            Mapa Vivo de Chile y Valdivia
          </h2>
          <p className="text-base text-slate-600 font-semibold mt-1">
            Explora América del Sur, cuenta las 16 regiones de Chile y conoce nuestra ciudad y comuna.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl shrink-0">
          {[
            { id: 'south-america' as const, label: 'América del Sur' },
            { id: '16-regions' as const, label: '16 Regiones' },
            { id: 'valdivia' as const, label: 'Mi Valdivia' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                stopCounting();
                audioManager.playSound('tap');
                setTab(item.id);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors cursor-pointer whitespace-nowrap min-h-[40px] ${
                tab === item.id
                  ? 'bg-white text-sky-800 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'south-america' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-4">
            <SouthAmericaMapScene
              onSelectHotspot={(_id, _title, speech) => {
                setHotspotText(speech);
                audioManager.speak(speech, 'map-sa-hotspot', { force: true });
              }}
            />
          </div>
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <h3 className="font-display text-2xl font-bold text-slate-900">
                ¿Dónde está Chile?
              </h3>
              <p className="text-base text-slate-700 font-semibold leading-relaxed">
                {hotspotText}
              </p>
            </div>
            <SpeakButton text={hotspotText} id="map-sa-hotspot" label="Escuchar pista" className="w-full" />
          </div>
        </div>
      )}

      {tab === '16-regions' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900">
                Chile tiene 16 regiones de norte a sur
              </h3>
              <p className="text-sm font-semibold text-slate-600">
                Nuestra Región de Los Ríos aparece destacada en verde.
              </p>
            </div>
            <button
              type="button"
              onClick={startCounting16}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-base cursor-pointer whitespace-nowrap min-h-[44px] transition-transform active:translate-y-0.5 ${
                countingIndex !== null
                  ? 'bg-rose-600 hover:bg-rose-700 text-white border-b-4 border-rose-800'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white border-b-4 border-emerald-800'
              }`}
            >
              {countingIndex !== null ? (
                <>
                  <Square className="w-4 h-4 fill-current" aria-hidden="true" />
                  <span>Detener conteo ({countingIndex}/16)</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                  <span>Contar las 16 regiones</span>
                </>
              )}
            </button>
          </div>

          <Chile16RegionsMap selectedRegionNumber={countingIndex ?? undefined} />
        </div>
      )}

      {tab === 'valdivia' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6">
          <ValdiviaPlaceZoomScene initialLevel="ciudad" />
        </div>
      )}
    </section>
  );
}
