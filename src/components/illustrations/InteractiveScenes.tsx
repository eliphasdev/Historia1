import React, { useState } from 'react';
import { CHILE_16_REGIONS, ChileRegionInfo, LandscapeItem } from '../../data/curriculum';
import { audioManager } from '../../utils/audio';

interface SouthAmericaProps {
  selectedHotspot?: string | null;
  onSelectHotspot?: (id: string, title: string, speech: string) => void;
  gamePromptTarget?: 'chile' | 'pacific' | 'andes' | null;
  onGameClick?: (clickedId: string) => void;
}

export function SouthAmericaMapScene({
  selectedHotspot,
  onSelectHotspot,
  gamePromptTarget,
  onGameClick,
}: SouthAmericaProps) {
  const [localSelected, setLocalSelected] = useState<string>('chile');
  const active = selectedHotspot !== undefined ? selectedHotspot : localSelected;

  const handleTap = (id: string, title: string, speech: string) => {
    audioManager.playSound('tap');
    if (onGameClick) {
      onGameClick(id);
      return;
    }
    setLocalSelected(id);
    if (onSelectHotspot) {
      onSelectHotspot(id, title, speech);
    } else {
      audioManager.speak(speech, `sa-${id}`, { force: true });
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-sky-100 via-sky-50 to-cyan-100 rounded-2xl border border-sky-200 overflow-hidden p-3 sm:p-4">
      <svg
        viewBox="0 0 560 440"
        className="w-full max-w-[520px] h-auto select-none"
        role="img"
        aria-label="Mapa interactivo de América del Sur con Chile destacado"
      >
        {/* Ocean waves */}
        <path d="M20 110 Q45 102 70 110 T120 110" fill="none" stroke="#7DD3FC" strokeWidth="3" strokeLinecap="round" />
        <path d="M35 230 Q60 222 85 230 T135 230" fill="none" stroke="#7DD3FC" strokeWidth="3" strokeLinecap="round" />
        <path d="M55 340 Q80 332 105 340 T155 340" fill="none" stroke="#7DD3FC" strokeWidth="3" strokeLinecap="round" />

        {/* Océano Pacífico clickable zone */}
        <g
          role="button"
          tabIndex={0}
          onClick={() =>
            handleTap(
              'pacific',
              'Océano Pacífico',
              'Este es el Océano Pacífico. Baña toda la costa oeste de Chile, ¡incluso nuestras playas de Niebla y Curiñanco en Valdivia!'
            )
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleTap(
                'pacific',
                'Océano Pacífico',
                'Este es el Océano Pacífico. Baña toda la costa oeste de Chile.'
              );
            }
          }}
          className="cursor-pointer group"
        >
          <rect
            x="24"
            y="148"
            width="138"
            height="68"
            rx="14"
            fill={active === 'pacific' ? '#0284C7' : '#FFFFFF'}
            fillOpacity={active === 'pacific' ? 0.95 : 0.85}
            stroke={active === 'pacific' ? '#0369A1' : '#38BDF8'}
            strokeWidth="2.5"
          />
          <text
            x="93"
            y="177"
            textAnchor="middle"
            className="font-display font-bold"
            fontSize="16"
            fill={active === 'pacific' ? '#FFFFFF' : '#0369A1'}
          >
            Océano
          </text>
          <text
            x="93"
            y="198"
            textAnchor="middle"
            className="font-display font-bold"
            fontSize="16"
            fill={active === 'pacific' ? '#FFFFFF' : '#0369A1'}
          >
            Pacífico
          </text>
        </g>

        {/* Rest of South America landmass (clickable continent) */}
        <g
          role="button"
          tabIndex={0}
          onClick={() =>
            handleTap(
              'continent',
              'América del Sur',
              'Todo este gran continente se llama América del Sur. Aquí viven muchos países vecinos como Argentina, Perú, Bolivia y Brasil.'
            )
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleTap(
                'continent',
                'América del Sur',
                'Todo este gran continente se llama América del Sur.'
              );
            }
          }}
          className="cursor-pointer"
        >
          {/* Main continent silhouette */}
          <path
            d="M235 42 C275 30, 325 36, 365 65 C410 78, 468 112, 488 158 C495 186, 468 232, 438 258 C406 286, 375 308, 345 344 C324 374, 304 404, 286 416 L266 402 C264 366, 266 324, 265 282 C264 240, 260 202, 246 172 C230 144, 206 124, 198 102 C192 78, 212 52, 235 42 Z"
            fill={active === 'continent' ? '#BAE6FD' : '#E2E8F0'}
            stroke="#94A3B8"
            strokeWidth="3"
            className="transition-colors hover:fill-slate-300"
          />
          <text
            x="365"
            y="165"
            textAnchor="middle"
            className="font-display font-bold"
            fontSize="20"
            fill="#334155"
          >
            América
          </text>
          <text
            x="365"
            y="190"
            textAnchor="middle"
            className="font-display font-bold"
            fontSize="20"
            fill="#334155"
          >
            del Sur
          </text>
          <text x="348" y="255" textAnchor="middle" fontSize="13" fontWeight="700" fill="#64748B">
            Argentina
          </text>
          <text x="275" y="132" textAnchor="middle" fontSize="13" fontWeight="700" fill="#64748B">
            Perú
          </text>
          <text x="325" y="122" textAnchor="middle" fontSize="13" fontWeight="700" fill="#64748B">
            Bolivia
          </text>
        </g>

        {/* Cordillera de los Andes (mountain ridge between Chile and Argentina) */}
        <g
          role="button"
          tabIndex={0}
          onClick={() =>
            handleTap(
              'andes',
              'Cordillera de los Andes',
              'Esta cadena de montañas altas y nevadas es la Cordillera de los Andes. Está al este de Chile.'
            )
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleTap('andes', 'Cordillera de los Andes', 'Esta es la Cordillera de los Andes, al este de Chile.');
            }
          }}
          className="cursor-pointer"
        >
          {[192, 222, 252, 282, 312, 342].map((y, idx) => (
            <polygon
              key={y}
              points={`${258 - idx * 2},${y} ${270 - idx * 2},${y - 20} ${282 - idx * 2},${y}`}
              fill={active === 'andes' ? '#D97706' : '#94A3B8'}
              stroke="#475569"
              strokeWidth="1.5"
            />
          ))}
        </g>

        {/* CHILE - Long & narrow on the southwest coast */}
        <g
          role="button"
          tabIndex={0}
          onClick={() =>
            handleTap(
              'chile',
              'Chile',
              '¡Aquí está Chile! Nuestro país es largo y angosto. Está en el suroeste de América del Sur, junto al Océano Pacífico.'
            )
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleTap('chile', 'Chile', '¡Aquí está Chile! En el suroeste de América del Sur.');
            }
          }}
          className="cursor-pointer"
        >
          {/* Hitbox padding for easy 6yo tapping */}
          <path
            d="M214 148 L244 148 L254 218 L258 292 L262 368 L272 418 L244 418 L234 364 L228 286 L222 214 Z"
            fill="transparent"
          />
          <path
            d="M224 152 L236 154 L244 205 L246 270 L252 335 L254 388 L266 414 L256 418 L242 394 L236 335 L230 270 L226 205 Z"
            fill={active === 'chile' ? '#DC2626' : '#EF4444'}
            stroke="#FFFFFF"
            strokeWidth="3"
            className="transition-all hover:brightness-110"
          />
          {/* Valdivia star marker */}
          <circle cx="239" cy="312" r="7" fill="#FACC15" stroke="#78350F" strokeWidth="2" />
          {/* Chile label callout */}
          <g transform="translate(132, 260)">
            <rect
              x="0"
              y="0"
              width="82"
              height="36"
              rx="10"
              fill={active === 'chile' ? '#DC2626' : '#FFFFFF'}
              stroke="#DC2626"
              strokeWidth="2.5"
            />
            <text
              x="41"
              y="24"
              textAnchor="middle"
              className="font-display font-bold"
              fontSize="17"
              fill={active === 'chile' ? '#FFFFFF' : '#B91C1C'}
            >
              CHILE
            </text>
            <line x1="82" y1="18" x2="98" y2="18" stroke="#DC2626" strokeWidth="2.5" />
          </g>

          {/* Valdivia callout */}
          <g transform="translate(108, 304)">
            <rect x="0" y="0" width="110" height="28" rx="8" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
            <text x="55" y="19" textAnchor="middle" fontSize="13" fontWeight="800" fill="#92400E">
              Valdivia (aquí)
            </text>
          </g>
        </g>

        {/* Compass rose (Puntos cardinales simples) */}
        <g transform="translate(490, 56)">
          <circle cx="0" cy="0" r="28" fill="#FFFFFF" fillOpacity="0.9" stroke="#CBD5E1" strokeWidth="2" />
          <text x="0" y="-13" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0284C7">N</text>
          <text x="0" y="21" textAnchor="middle" fontSize="11" fontWeight="800" fill="#64748B">S</text>
          <text x="-17" y="4" textAnchor="middle" fontSize="11" fontWeight="800" fill="#64748B">O</text>
          <text x="17" y="4" textAnchor="middle" fontSize="11" fontWeight="800" fill="#64748B">E</text>
          <polygon points="0,-10 3,0 0,10 -3,0" fill="#0284C7" />
        </g>
      </svg>

      {!gamePromptTarget && (
        <p className="mt-2 text-sm font-semibold text-sky-900 text-center">
          Toca Chile, el Océano Pacífico, la Cordillera o América del Sur para escuchar
        </p>
      )}
    </div>
  );
}

interface Chile16Props {
  selectedRegionNumber?: number | null;
  onSelectRegion?: (region: ChileRegionInfo) => void;
  highlightHome?: boolean;
}

export function Chile16RegionsMap({
  selectedRegionNumber,
  onSelectRegion,
  highlightHome = true,
}: Chile16Props) {
  const [localSelected, setLocalSelected] = useState<number>(13); // Los Ríos is #13 from North to South (XIV)
  const activeNum = selectedRegionNumber !== undefined ? selectedRegionNumber : localSelected;
  const activeRegion = CHILE_16_REGIONS.find((r) => r.number === activeNum) || CHILE_16_REGIONS[12];

  const handleSelect = (region: ChileRegionInfo) => {
    audioManager.playSound('tap');
    setLocalSelected(region.number);
    if (onSelectRegion) {
      onSelectRegion(region);
    } else {
      audioManager.speak(
        `Región número ${region.number}: ${region.name}. Su capital es ${region.capital}. ${region.funFact}`,
        `reg-${region.number}`,
        { force: true }
      );
    }
  };

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-stretch gap-4 bg-gradient-to-b from-sky-50 to-emerald-50/40 rounded-2xl border border-slate-200 p-4">
      {/* Interactive Visual Columns of 16 Regions (North to South in 2 crisp kid-friendly columns) */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-slate-700">
            Toca cualquier región del 1 al 16:
          </span>
          <span className="text-sm font-bold text-emerald-700 tabular-nums">
            Total: 16 regiones
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CHILE_16_REGIONS.map((region) => {
            const isSelected = activeNum === region.number;
            const isLosRios = region.isHome && highlightHome;
            return (
              <button
                key={region.number}
                type="button"
                onClick={() => handleSelect(region)}
                className={`relative flex flex-col items-start p-2.5 rounded-xl text-left transition-all cursor-pointer min-h-[58px] focus-visible:outline-2 focus-visible:outline-sky-600 ${
                  isSelected
                    ? 'bg-sky-600 text-white border-b-4 border-sky-800 shadow-sm scale-[1.02]'
                    : isLosRios
                    ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-950 border-2 border-emerald-500 border-b-4'
                    : 'bg-white hover:bg-sky-50 text-slate-800 border border-slate-200 border-b-4 border-b-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full gap-1">
                  <span
                    className={`text-base font-display font-bold tabular-nums ${
                      isSelected ? 'text-white' : isLosRios ? 'text-emerald-800' : 'text-sky-700'
                    }`}
                  >
                    #{region.number}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      isSelected ? 'text-sky-100' : 'text-slate-500'
                    }`}
                  >
                    {region.zone}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-bold leading-tight mt-0.5 line-clamp-2">
                  {region.name}
                </span>
                {isLosRios && (
                  <span
                    className={`text-[11px] font-extrabold mt-0.5 ${
                      isSelected ? 'text-amber-200' : 'text-emerald-700'
                    }`}
                  >
                    Nuestra región
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Region Detail Card */}
      <div className="w-full lg:w-64 shrink-0 bg-white rounded-xl border border-slate-200 p-4 flex flex-col justify-between">
        <div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            Región #{activeRegion.number} de 16 · Zona {activeRegion.zone}
          </div>
          <h4 className="font-display text-xl font-bold text-slate-900 mt-1">
            {activeRegion.name}
          </h4>
          <p className="text-sm font-bold text-sky-700 mt-1">
            Capital: {activeRegion.capital}
          </p>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            {activeRegion.funFact}
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            audioManager.playSound('tap');
            audioManager.speak(
              `Región ${activeRegion.number}: ${activeRegion.name}. Capital ${activeRegion.capital}. ${activeRegion.funFact}`,
              `detail-${activeRegion.number}`,
              { force: true }
            );
          }}
          className="mt-4 w-full py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm cursor-pointer border-b-4 border-sky-800 active:translate-y-0.5 transition-transform"
        >
          Escuchar esta región
        </button>
      </div>
    </div>
  );
}

interface ValdiviaPlaceProps {
  initialLevel?: 'ciudad' | 'comuna' | 'region';
  onLevelChange?: (level: 'ciudad' | 'comuna' | 'region') => void;
}

export function ValdiviaPlaceZoomScene({ initialLevel = 'ciudad', onLevelChange }: ValdiviaPlaceProps) {
  const [level, setLevel] = useState<'ciudad' | 'comuna' | 'region'>(initialLevel);

  const selectLevel = (next: 'ciudad' | 'comuna' | 'region') => {
    audioManager.playSound('tap');
    setLevel(next);
    if (onLevelChange) onLevelChange(next);
    const messages = {
      ciudad: 'Nuestra ciudad se llama Valdivia. Aquí cruzamos el Puente Pedro de Valdivia sobre el Río Calle-Calle.',
      comuna: 'Nuestra comuna también se llama Valdivia. Incluye nuestros barrios, escuelas, Niebla y los ríos.',
      region: 'Nuestra región se llama Región de Los Ríos. Su capital es Valdivia y tiene doce comunas con muchos ríos y lagos.',
    };
    audioManager.speak(messages[next], `zoom-${next}`);
  };

  return (
    <div className="w-full h-full flex flex-col justify-between bg-gradient-to-b from-sky-50 via-white to-emerald-50 rounded-2xl border border-slate-200 p-4">
      {/* Level selector */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-3">
        {[
          { id: 'ciudad' as const, title: '1. Mi Ciudad: Valdivia' },
          { id: 'comuna' as const, title: '2. Mi Comuna: Valdivia' },
          { id: 'region' as const, title: '3. Mi Región: Los Ríos' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => selectLevel(tab.id)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer whitespace-nowrap min-h-[42px] ${
              level === tab.id
                ? 'bg-emerald-600 text-white border-b-4 border-emerald-800 shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-emerald-50'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Interactive Illustration Stage */}
      <div className="flex-1 flex items-center justify-center">
        {level === 'ciudad' && (
          <svg viewBox="0 0 560 280" className="w-full max-w-[540px] h-auto select-none">
            <rect width="560" height="280" rx="16" fill="#E0F2FE" />
            {/* Sun & clouds */}
            <circle cx="80" cy="54" r="24" fill="#FDE047" />
            <ellipse cx="180" cy="50" rx="34" ry="15" fill="#FFFFFF" />
            <ellipse cx="440" cy="46" rx="40" ry="16" fill="#FFFFFF" />
            {/* Green Valdivia hills */}
            <path d="M0 175 Q120 120 260 165 T560 155 L560 205 L0 205 Z" fill="#10B981" />
            {/* Calle-Calle River */}
            <path d="M0 195 Q160 185 320 200 T560 192 L560 280 L0 280 Z" fill="#0284C7" />
            <path d="M40 230 Q90 222 140 230" stroke="#7DD3FC" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M350 245 Q400 237 450 245" stroke="#7DD3FC" strokeWidth="3" fill="none" strokeLinecap="round" />
            {/* Puente Pedro de Valdivia */}
            <g
              onClick={() => audioManager.speak('Este es el Puente Pedro de Valdivia que cruza el río en nuestra ciudad.', 'city-bridge', { force: true })}
              className="cursor-pointer"
            >
              <path d="M90 190 Q280 125 470 190" stroke="#FFFFFF" strokeWidth="10" fill="none" />
              <path d="M90 190 Q280 125 470 190" stroke="#CBD5E1" strokeWidth="3" fill="none" />
              <rect x="170" y="168" width="10" height="42" fill="#94A3B8" />
              <rect x="275" y="155" width="10" height="55" fill="#94A3B8" />
              <rect x="380" y="168" width="10" height="42" fill="#94A3B8" />
            </g>
            {/* Houses & Torreón */}
            <g
              onClick={() => audioManager.speak('En la ciudad de Valdivia hay casas de madera, escuelas y el famoso Torreón.', 'city-houses', { force: true })}
              className="cursor-pointer"
            >
              <rect x="44" y="146" width="44" height="36" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
              <polygon points="40,146 66,124 92,146" fill="#DC2626" />
              <rect x="478" y="128" width="26" height="56" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
              <polygon points="474,128 491,106 508,128" fill="#B45309" />
            </g>
            {/* Friendly sea lion on dock */}
            <g
              onClick={() => audioManager.speak('¡Hola! Soy un lobo marino de la costanera de Valdivia.', 'city-sealion', { force: true })}
              className="cursor-pointer"
            >
              <rect x="210" y="218" width="76" height="14" rx="4" fill="#92400E" />
              <ellipse cx="246" cy="212" rx="18" ry="10" fill="#78716C" />
              <circle cx="258" cy="202" r="8" fill="#78716C" />
              <circle cx="261" cy="200" r="1.5" fill="#0F172A" />
            </g>
            <rect x="150" y="16" width="260" height="36" rx="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" />
            <text x="280" y="40" textAnchor="middle" className="font-display font-bold" fontSize="18" fill="#0369A1">
              Ciudad: VALDIVIA
            </text>
          </svg>
        )}

        {level === 'comuna' && (
          <svg viewBox="0 0 560 280" className="w-full max-w-[540px] h-auto select-none">
            <rect width="560" height="280" rx="16" fill="#FEF3C7" />
            {/* Ocean left + Comuna territory */}
            <rect x="0" y="0" width="125" height="280" fill="#38BDF8" />
            <text x="62" y="145" textAnchor="middle" fontSize="14" fontWeight="800" fill="#FFFFFF">
              Océano
            </text>
            <text x="62" y="163" textAnchor="middle" fontSize="14" fontWeight="800" fill="#FFFFFF">
              Pacífico
            </text>

            {/* Comuna border shape */}
            <path
              d="M125 35 C220 25, 360 40, 485 75 C515 125, 505 210, 445 245 C340 258, 210 245, 125 225 Z"
              fill="#ECFDF5"
              stroke="#D97706"
              strokeWidth="4"
              strokeDasharray="10 6"
            />
            {/* River winding through commune */}
            <path d="M125 140 Q250 115 360 155 T495 140" stroke="#0EA5E9" strokeWidth="14" fill="none" strokeLinecap="round" />

            {/* Clickable spots in the Comuna of Valdivia */}
            {[
              { x: 165, y: 122, label: 'Niebla (costa)', speech: 'Niebla es la playa y el fuerte que está en nuestra Comuna de Valdivia.' },
              { x: 300, y: 138, label: 'Centro de Valdivia', speech: 'El centro y nuestros barrios forman parte de la Comuna de Valdivia.' },
              { x: 390, y: 92, label: 'Punucapa y ríos', speech: 'Punucapa y el santuario del río también están en nuestra Comuna de Valdivia.' },
            ].map((spot) => (
              <g
                key={spot.label}
                onClick={() => audioManager.speak(spot.speech, `comuna-${spot.label}`, { force: true })}
                className="cursor-pointer"
              >
                <circle cx={spot.x} cy={spot.y} r="14" fill="#D97706" stroke="#FFFFFF" strokeWidth="3" />
                <rect x={spot.x - 62} y={spot.y + 18} width="124" height="24" rx="8" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="1.5" />
                <text x={spot.x} y={spot.y + 34} textAnchor="middle" fontSize="12" fontWeight="800" fill="#78350F">
                  {spot.label}
                </text>
              </g>
            ))}

            <rect x="170" y="14" width="280" height="34" rx="12" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
            <text x="310" y="37" textAnchor="middle" className="font-display font-bold" fontSize="17" fill="#B45309">
              Comuna: VALDIVIA
            </text>
          </svg>
        )}

        {level === 'region' && (
          <svg viewBox="0 0 560 280" className="w-full max-w-[540px] h-auto select-none">
            <rect width="560" height="280" rx="16" fill="#ECFDF5" />
            {/* Ocean left */}
            <rect x="0" y="0" width="95" height="280" fill="#0EA5E9" />
            {/* Region shape */}
            <path
              d="M95 55 L420 45 L495 135 L465 235 L95 230 Z"
              fill="#D1FAE5"
              stroke="#059669"
              strokeWidth="4"
            />
            {/* Andes right */}
            <polygon points="455,95 480,55 505,95" fill="#94A3B8" />
            <polygon points="475,165 500,120 525,165" fill="#94A3B8" />
            <polygon points="460,225 485,180 510,225" fill="#94A3B8" />

            {/* Communes of Los Ríos */}
            {[
              { x: 165, y: 130, name: 'Valdivia (Capital)', main: true },
              { x: 145, y: 175, name: 'Corral', main: false },
              { x: 255, y: 88, name: 'Mariquina / Lanco', main: false },
              { x: 375, y: 118, name: 'Panguipulli', main: false },
              { x: 270, y: 185, name: 'La Unión / Río Bueno', main: false },
            ].map((c) => (
              <g
                key={c.name}
                onClick={() =>
                  audioManager.speak(
                    c.main
                      ? 'Valdivia es la capital de nuestra Región de Los Ríos.'
                      : `${c.name} también es parte de nuestra Región de Los Ríos.`,
                    `regspot-${c.name}`,
                    { force: true }
                  )
                }
                className="cursor-pointer"
              >
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={c.main ? 14 : 9}
                  fill={c.main ? '#DC2626' : '#059669'}
                  stroke="#FFFFFF"
                  strokeWidth="3"
                />
                <rect
                  x={c.x - 66}
                  y={c.y + 14}
                  width="132"
                  height="22"
                  rx="7"
                  fill="#FFFFFF"
                  stroke={c.main ? '#DC2626' : '#10B981'}
                  strokeWidth="1.5"
                />
                <text
                  x={c.x}
                  y={c.y + 29}
                  textAnchor="middle"
                  fontSize="11.5"
                  fontWeight="800"
                  fill={c.main ? '#B91C1C' : '#065F46'}
                >
                  {c.name}
                </text>
              </g>
            ))}

            <rect x="145" y="12" width="310" height="34" rx="12" fill="#FFFFFF" stroke="#059669" strokeWidth="2.5" />
            <text x="300" y="35" textAnchor="middle" className="font-display font-bold" fontSize="17" fill="#065F46">
              Región: REGIÓN DE LOS RÍOS
            </text>
          </svg>
        )}
      </div>
    </div>
  );
}

interface LandscapeSceneProps {
  initialFilter?: 'all' | 'natural' | 'cultural';
}

export function LandscapeExplorerScene({ initialFilter = 'all' }: LandscapeSceneProps) {
  const [filter, setFilter] = useState<'all' | 'natural' | 'cultural'>(initialFilter);
  const [selectedName, setSelectedName] = useState<string>('Toca cualquier dibujo de Valdivia');
  const [selectedType, setSelectedType] = useState<'natural' | 'cultural' | null>(null);

  const inspect = (name: string, type: 'natural' | 'cultural', speech: string) => {
    audioManager.playSound('tap');
    setSelectedName(name);
    setSelectedType(type);
    audioManager.speak(speech, `land-${name}`, { force: true });
  };

  const showNatural = filter === 'all' || filter === 'natural';
  const showCultural = filter === 'all' || filter === 'cultural';

  return (
    <div className="w-full h-full flex flex-col justify-between bg-sky-50 rounded-2xl border border-slate-200 p-4">
      {/* Interactive filter controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-slate-200">
          {[
            { id: 'all' as const, label: 'Ver Todo' },
            { id: 'natural' as const, label: 'Solo Natural' },
            { id: 'cultural' as const, label: 'Solo Cultural' },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => {
                audioManager.playSound('tap');
                setFilter(btn.id);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
                filter === btn.id
                  ? btn.id === 'natural'
                    ? 'bg-emerald-600 text-white'
                    : btn.id === 'cultural'
                    ? 'bg-amber-600 text-white'
                    : 'bg-sky-600 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="text-sm font-bold text-slate-700">
          {selectedType === 'natural' && <span className="text-emerald-700">Paisaje Natural · </span>}
          {selectedType === 'cultural' && <span className="text-amber-700">Paisaje Cultural · </span>}
          <span>{selectedName}</span>
        </div>
      </div>

      {/* Panoramic Valdivia Scene */}
      <svg viewBox="0 0 600 300" className="w-full h-auto rounded-xl border border-sky-200 bg-gradient-to-b from-sky-200 via-sky-100 to-sky-50 select-none">
        {/* Sky base */}
        <rect width="600" height="300" fill="url(#skyGrad)" />
        <defs>
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#F0F9FF" />
          </linearGradient>
        </defs>

        {/* NATURAL: Raincloud */}
        <g
          opacity={showNatural ? 1 : 0.18}
          onClick={() =>
            inspect(
              'Nubes y lluvia del sur',
              'natural',
              'Las nubes y la lluvia son parte del paisaje natural. ¡En Valdivia la lluvia hace crecer nuestros bosques verdes!'
            )
          }
          className="cursor-pointer transition-opacity"
        >
          <ellipse cx="110" cy="48" rx="44" ry="20" fill="#FFFFFF" />
          <ellipse cx="140" cy="44" rx="32" ry="18" fill="#F1F5F9" />
          <line x1="92" y1="74" x2="86" y2="88" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <line x1="115" y1="74" x2="109" y2="88" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
          <line x1="138" y1="74" x2="132" y2="88" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* NATURAL: Volcano */}
        <g
          opacity={showNatural ? 1 : 0.18}
          onClick={() =>
            inspect(
              'Volcán con nieve',
              'natural',
              'Este volcán es parte del paisaje natural porque lo formó la naturaleza hace miles de años.'
            )
          }
          className="cursor-pointer transition-opacity"
        >
          <polygon points="350,185 450,55 550,185" fill="#64748B" />
          <polygon points="419,95 450,55 481,95 466,104 450,92 434,104" fill="#FFFFFF" />
        </g>

        {/* NATURAL: Selva Valdiviana (green hills & native trees) */}
        <g
          opacity={showNatural ? 1 : 0.18}
          onClick={() =>
            inspect(
              'Bosque y árboles nativos',
              'natural',
              'Los árboles y la Selva Valdiviana son paisaje natural, porque crecen de la tierra sin que los fabriquen las personas.'
            )
          }
          className="cursor-pointer transition-opacity"
        >
          <path d="M0 178 Q150 135 320 175 T600 168 L600 205 L0 205 Z" fill="#10B981" />
          {/* Trees */}
          {[42, 78, 520, 558].map((tx) => (
            <g key={tx}>
              <rect x={tx - 4} y="146" width="8" height="28" fill="#78350F" />
              <polygon points={`${tx - 18},154 ${tx},112 ${tx + 18},154`} fill="#047857" />
              <polygon points={`${tx - 14},136 ${tx},100 ${tx + 14},136`} fill="#059669" />
            </g>
          ))}
        </g>

        {/* NATURAL: Río Calle-Calle */}
        <g
          opacity={showNatural ? 1 : 0.25}
          onClick={() =>
            inspect(
              'Río Calle-Calle',
              'natural',
              'El Río Calle-Calle es paisaje natural. El agua del río nace en la naturaleza y llega hasta el mar.'
            )
          }
          className="cursor-pointer transition-opacity"
        >
          <path d="M0 202 Q180 192 360 206 T600 198 L600 300 L0 300 Z" fill="#0284C7" />
          <path d="M55 245 Q110 236 165 245" stroke="#7DD3FC" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M405 268 Q465 258 525 268" stroke="#7DD3FC" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </g>

        {/* CULTURAL: Puente Pedro de Valdivia */}
        <g
          opacity={showCultural ? 1 : 0.15}
          onClick={() =>
            inspect(
              'Puente Pedro de Valdivia',
              'cultural',
              'El Puente Pedro de Valdivia es paisaje cultural. Fue construido por personas para poder cruzar el río.'
            )
          }
          className="cursor-pointer transition-opacity"
        >
          <path d="M165 198 Q310 132 455 198" stroke="#FFFFFF" strokeWidth="11" fill="none" />
          <path d="M165 198 Q310 132 455 198" stroke="#D97706" strokeWidth="3" fill="none" />
          <rect x="235" y="172" width="10" height="44" fill="#CBD5E1" />
          <rect x="305" y="162" width="10" height="54" fill="#CBD5E1" />
          <rect x="375" y="172" width="10" height="44" fill="#CBD5E1" />
        </g>

        {/* CULTURAL: House & School on riverbank */}
        <g
          opacity={showCultural ? 1 : 0.15}
          onClick={() =>
            inspect(
              'Casa y escuela',
              'cultural',
              'Las casas y las escuelas son paisaje cultural porque las construimos las personas para vivir y aprender.'
            )
          }
          className="cursor-pointer transition-opacity"
        >
          <rect x="115" y="144" width="46" height="42" fill="#FEF3C7" stroke="#B45309" strokeWidth="2" />
          <polygon points="110,144 138,118 166,144" fill="#DC2626" />
          <rect x="131" y="164" width="14" height="22" fill="#92400E" />
          <rect x="148" y="152" width="9" height="9" fill="#38BDF8" />
        </g>

        {/* CULTURAL: Boat on the river */}
        <g
          opacity={showCultural ? 1 : 0.15}
          onClick={() =>
            inspect(
              'Lancha fluvial',
              'cultural',
              'Esta lancha es paisaje cultural porque fue fabricada por personas para navegar por los ríos de Valdivia.'
            )
          }
          className="cursor-pointer transition-opacity"
        >
          <polygon points="245,250 325,250 310,268 258,268" fill="#F59E0B" stroke="#92400E" strokeWidth="2" />
          <rect x="268" y="232" width="32" height="18" rx="3" fill="#FFFFFF" stroke="#64748B" strokeWidth="2" />
          <rect x="275" y="236" width="18" height="8" fill="#38BDF8" />
        </g>

        {/* NATURAL: Black-necked swan */}
        <g
          opacity={showNatural ? 1 : 0.15}
          onClick={() =>
            inspect(
              'Cisne de cuello negro',
              'natural',
              'El cisne de cuello negro vive libre en los ríos y humedales de Valdivia. Es parte del paisaje natural.'
            )
          }
          className="cursor-pointer transition-opacity"
        >
          <ellipse cx="145" cy="264" rx="18" ry="10" fill="#FFFFFF" />
          <path d="M158 262 Q166 244 160 236" stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="160" cy="235" r="4" fill="#1E293B" />
          <polygon points="164,235 170,237 164,239" fill="#EF4444" />
        </g>

        {/* CULTURAL: Torreón del Barro */}
        <g
          opacity={showCultural ? 1 : 0.15}
          onClick={() =>
            inspect(
              'Torreón de Valdivia',
              'cultural',
              'El Torreón de Valdivia es paisaje cultural porque fue construido por personas hace muchos años.'
            )
          }
          className="cursor-pointer transition-opacity"
        >
          <rect x="464" y="136" width="28" height="54" fill="#F1F5F9" stroke="#475569" strokeWidth="2" />
          <polygon points="459,136 478,112 497,136" fill="#B45309" />
          <rect x="474" y="152" width="8" height="14" rx="4" fill="#334155" />
        </g>
      </svg>
    </div>
  );
}

export function LandscapeItemGraphic({ iconKey }: { iconKey: LandscapeItem['iconKey'] | 'chile' | 'city' | 'region' | 'count16' | 'natural' | 'cultural' }) {
  switch (iconKey) {
    case 'river':
    case 'natural':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect width="80" height="80" rx="16" fill="#ECFDF5" />
          <path d="M8 52 Q26 42 40 52 T72 50 L72 72 L8 72 Z" fill="#0284C7" />
          <polygon points="16,44 30,22 44,44" fill="#059669" />
          <polygon points="36,44 52,18 68,44" fill="#10B981" />
          <circle cx="60" cy="18" r="7" fill="#FACC15" />
        </svg>
      );
    case 'bridge':
    case 'cultural':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect width="80" height="80" rx="16" fill="#FEF3C7" />
          <rect x="8" y="54" width="64" height="18" rx="4" fill="#0284C7" />
          <path d="M12 52 Q40 24 68 52" stroke="#D97706" strokeWidth="7" fill="none" strokeLinecap="round" />
          <line x1="26" y1="43" x2="26" y2="56" stroke="#92400E" strokeWidth="4" />
          <line x1="40" y1="38" x2="40" y2="56" stroke="#92400E" strokeWidth="4" />
          <line x1="54" y1="43" x2="54" y2="56" stroke="#92400E" strokeWidth="4" />
        </svg>
      );
    case 'volcano':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect width="80" height="80" rx="16" fill="#E0F2FE" />
          <polygon points="10,66 40,18 70,66" fill="#475569" />
          <polygon points="28,37 40,18 52,37 45,42 40,35 35,42" fill="#FFFFFF" />
        </svg>
      );
    case 'house':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect width="80" height="80" rx="16" fill="#FEF3C7" />
          <rect x="20" y="38" width="40" height="30" fill="#FDE68A" stroke="#B45309" strokeWidth="2.5" />
          <polygon points="14,38 40,16 66,38" fill="#DC2626" />
          <rect x="34" y="48" width="12" height="20" fill="#92400E" />
        </svg>
      );
    case 'forest':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect width="80" height="80" rx="16" fill="#ECFDF5" />
          <rect x="24" y="48" width="6" height="18" fill="#78350F" />
          <polygon points="12,50 27,20 42,50" fill="#047857" />
          <rect x="48" y="48" width="6" height="18" fill="#78350F" />
          <polygon points="36,50 51,16 66,50" fill="#059669" />
        </svg>
      );
    case 'boat':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect width="80" height="80" rx="16" fill="#E0F2FE" />
          <rect x="8" y="54" width="64" height="18" rx="4" fill="#0284C7" />
          <polygon points="18,46 62,46 54,58 26,58" fill="#F59E0B" />
          <rect x="30" y="30" width="20" height="16" rx="3" fill="#FFFFFF" stroke="#475569" strokeWidth="2" />
        </svg>
      );
    case 'school':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect width="80" height="80" rx="16" fill="#FEF3C7" />
          <rect x="14" y="34" width="52" height="32" fill="#FFFFFF" stroke="#D97706" strokeWidth="2.5" />
          <polygon points="10,34 40,16 70,34" fill="#0284C7" />
          <rect x="34" y="46" width="12" height="20" fill="#D97706" />
          <circle cx="40" cy="27" r="4" fill="#FACC15" />
        </svg>
      );
    case 'swan':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect width="80" height="80" rx="16" fill="#E0F2FE" />
          <rect x="8" y="54" width="64" height="18" rx="4" fill="#0284C7" />
          <ellipse cx="36" cy="52" rx="16" ry="9" fill="#FFFFFF" />
          <path d="M48 50 Q56 30 48 22" stroke="#1E293B" strokeWidth="5" fill="none" strokeLinecap="round" />
          <circle cx="48" cy="22" r="4" fill="#1E293B" />
          <polygon points="52,22 58,24 52,26" fill="#EF4444" />
        </svg>
      );
    case 'torreon':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect width="80" height="80" rx="16" fill="#FEF3C7" />
          <rect x="28" y="28" width="24" height="40" fill="#F1F5F9" stroke="#475569" strokeWidth="2.5" />
          <polygon points="24,28 40,12 56,28" fill="#B45309" />
          <rect x="36" y="42" width="8" height="12" rx="4" fill="#334155" />
        </svg>
      );
    case 'rain':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect width="80" height="80" rx="16" fill="#E0F2FE" />
          <ellipse cx="40" cy="30" rx="22" ry="12" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
          <line x1="28" y1="48" x2="24" y2="60" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <line x1="42" y1="48" x2="38" y2="60" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <line x1="56" y1="48" x2="52" y2="60" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );
    case 'chile':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect width="80" height="80" rx="16" fill="#E0F2FE" />
          <path d="M36 10 L44 10 L46 38 L48 64 L54 70 L42 70 L38 50 L36 30 Z" fill="#DC2626" />
          <circle cx="42" cy="48" r="4" fill="#FACC15" />
        </svg>
      );
    case 'city':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect width="80" height="80" rx="16" fill="#FEF3C7" />
          <rect x="10" y="54" width="60" height="16" rx="4" fill="#0284C7" />
          <path d="M14 52 Q40 28 66 52" stroke="#D97706" strokeWidth="5" fill="none" />
          <rect x="20" y="34" width="16" height="20" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
          <polygon points="18,34 28,24 38,34" fill="#DC2626" />
        </svg>
      );
    case 'region':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect width="80" height="80" rx="16" fill="#ECFDF5" />
          <path d="M18 22 L62 18 L66 58 L20 62 Z" fill="#A7F3D0" stroke="#059669" strokeWidth="3" />
          <path d="M18 42 Q40 34 64 44" stroke="#0284C7" strokeWidth="5" fill="none" />
          <circle cx="32" cy="40" r="5" fill="#DC2626" />
        </svg>
      );
    case 'count16':
      return (
        <svg viewBox="0 0 80 80" className="w-16 h-16">
          <rect width="80" height="80" rx="16" fill="#E0F2FE" />
          <text x="40" y="50" textAnchor="middle" className="font-display font-bold" fontSize="34" fill="#0284C7">
            16
          </text>
        </svg>
      );
    default:
      return null;
  }
}
