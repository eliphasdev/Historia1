export type TopicId =
  | 'ubicacion-chile'
  | 'nuestra-ciudad'
  | 'nuestra-comuna'
  | 'nuestra-region'
  | 'regiones-chile'
  | 'paisaje-cultural'
  | 'paisaje-natural';

export interface CurriculumTopic {
  id: TopicId;
  orderLabel: string;
  shortTitle: string;
  title: string;
  keyAnswer: string;
  kidExplanation: string;
  audioScript: string;
  accentColor: 'sky' | 'emerald' | 'amber';
  sceneType: 'south-america' | 'valdivia-city' | 'valdivia-commune' | 'los-rios-region' | 'chile-16' | 'cultural' | 'natural';
  highlights: string[];
}

export const CURRICULUM_TOPICS: CurriculumTopic[] = [
  {
    id: 'ubicacion-chile',
    orderLabel: '01',
    shortTitle: 'Ubicación de Chile',
    title: 'Ubicación de Chile en el mapa',
    keyAnswer: 'Chile está en América del Sur, junto al Océano Pacífico.',
    kidExplanation:
      'Nuestro país es largo y angosto. Está en el suroeste de América del Sur, entre la Cordillera de los Andes y el Océano Pacífico.',
    audioScript:
      'Tema uno: Ubicación de Chile en el mapa. Chile está en América del Sur. Es un país muy largo y angosto, al lado del Océano Pacífico y de la Cordillera de los Andes.',
    accentColor: 'sky',
    sceneType: 'south-america',
    highlights: [
      'Continente: América del Sur',
      'Al oeste: Océano Pacífico',
      'Al este: Cordillera de los Andes',
    ],
  },
  {
    id: 'nuestra-ciudad',
    orderLabel: '02',
    shortTitle: 'Nuestra ciudad',
    title: 'Nombre de nuestra ciudad',
    keyAnswer: 'Nuestra ciudad se llama Valdivia.',
    kidExplanation:
      'Vivimos en Valdivia, conocida como la ciudad de los ríos. Aquí están el Río Calle-Calle, el Puente Pedro de Valdivia, la Feria Fluvial y los lobos marinos.',
    audioScript:
      'Tema dos: Nombre de nuestra ciudad. Nuestra ciudad se llama Valdivia. Es famosa por sus ríos hermosos, sus puentes, sus bosques verdes y los lobos marinos en la costanera.',
    accentColor: 'sky',
    sceneType: 'valdivia-city',
    highlights: [
      'Ciudad: Valdivia',
      'Ríos principales: Calle-Calle y Valdivia',
      'Lugar famoso: Puente Pedro de Valdivia y Feria Fluvial',
    ],
  },
  {
    id: 'nuestra-comuna',
    orderLabel: '03',
    shortTitle: 'Nuestra comuna',
    title: 'Nombre de nuestra comuna',
    keyAnswer: 'Nuestra comuna también se llama Valdivia.',
    kidExplanation:
      'Una comuna reúne barrios, escuelas, parques y playas cercanas. Nuestra comuna se llama Valdivia e incluye la ciudad y lugares como Niebla y Punucapa.',
    audioScript:
      'Tema tres: Nombre de nuestra comuna. Nuestra comuna se llama Valdivia, igual que nuestra ciudad. Incluye nuestros barrios, escuelas y también lugares cercanos como Niebla.',
    accentColor: 'amber',
    sceneType: 'valdivia-commune',
    highlights: [
      'Comuna: Valdivia',
      'Incluye: el centro, barrios y costa como Niebla',
      'Ciudad y comuna tienen el mismo nombre: Valdivia',
    ],
  },
  {
    id: 'nuestra-region',
    orderLabel: '04',
    shortTitle: 'Nuestra región',
    title: 'Nombre de nuestra región',
    keyAnswer: 'Nuestra región se llama Región de Los Ríos.',
    kidExplanation:
      'Muchas comunas juntas forman una región. Valdivia es la capital de la Región de Los Ríos, que lleva ese nombre por la gran cantidad de ríos y lagos que tiene.',
    audioScript:
      'Tema cuatro: Nombre de nuestra región. Vivimos en la Región de Los Ríos. Su capital es Valdivia, y se llama así porque tiene muchos ríos y lagos preciosos.',
    accentColor: 'emerald',
    sceneType: 'los-rios-region',
    highlights: [
      'Región: Región de Los Ríos (XIV)',
      'Capital regional: Valdivia',
      'Otras comunas vecinas: Corral, Panguipulli, La Unión',
    ],
  },
  {
    id: 'regiones-chile',
    orderLabel: '05',
    shortTitle: '16 Regiones de Chile',
    title: '¿Cuántas regiones tiene Chile?',
    keyAnswer: 'Chile tiene 16 regiones.',
    kidExplanation:
      'De norte a sur, Chile se divide en 16 regiones. Empieza en Arica y Parinacota en el norte y llega hasta Magallanes en el sur. ¡La nuestra es la Región de Los Ríos!',
    audioScript:
      'Tema cinco: ¿Cuántas regiones tiene Chile? Chile tiene dieciséis regiones de norte a sur. Toca el mapa para contar todas las regiones desde la uno hasta la dieciséis.',
    accentColor: 'sky',
    sceneType: 'chile-16',
    highlights: [
      'Total en Chile: 16 regiones',
      'Norte: comienza en Arica y Parinacota',
      'Sur: termina en Magallanes y la Antártica Chilena',
    ],
  },
  {
    id: 'paisaje-cultural',
    orderLabel: '06',
    shortTitle: 'Paisaje cultural',
    title: 'Elementos del paisaje cultural',
    keyAnswer: 'Son las cosas construidas o hechas por las personas.',
    kidExplanation:
      'Todo lo que construyen las personas forma el paisaje cultural: casas, puentes como el Pedro de Valdivia, calles, escuelas, barcos y el Torreón del Barro.',
    audioScript:
      'Tema seis: Elementos del paisaje cultural. El paisaje cultural son todas las cosas que construyen las personas, como casas, puentes, escuelas, calles y barcos.',
    accentColor: 'amber',
    sceneType: 'cultural',
    highlights: [
      'Hecho por personas: casas, edificios y escuelas',
      'En Valdivia: Puente Pedro de Valdivia y Torreón',
      'Transporte y caminos: calles, lanchas y faros',
    ],
  },
  {
    id: 'paisaje-natural',
    orderLabel: '07',
    shortTitle: 'Paisaje natural',
    title: 'Elementos del paisaje natural',
    keyAnswer: 'Son los elementos creados por la naturaleza, sin intervención humana.',
    kidExplanation:
      'La naturaleza crea el paisaje natural: los ríos como el Calle-Calle, los volcanes, los bosques verdes de la Selva Valdiviana, la lluvia, el mar y los animales silvestres.',
    audioScript:
      'Tema siete: Elementos del paisaje natural. El paisaje natural es todo lo que crea la naturaleza, como los ríos, las montañas, los volcanes, los árboles nativos, la lluvia y los cisnes.',
    accentColor: 'emerald',
    sceneType: 'natural',
    highlights: [
      'Agua y tierra: ríos, mar, volcanes y montañas',
      'Flora del sur: bosques, alerces, helechos y copihues',
      'Clima y fauna: lluvia, nubes, cisnes y lobos marinos',
    ],
  },
];

export interface ChileRegionInfo {
  number: number;
  roman: string;
  name: string;
  capital: string;
  isHome?: boolean;
  zone: 'Norte' | 'Centro' | 'Sur' | 'Austral';
  color: string;
  funFact: string;
}

export const CHILE_16_REGIONS: ChileRegionInfo[] = [
  { number: 1, roman: 'XV', name: 'Arica y Parinacota', capital: 'Arica', zone: 'Norte', color: '#F59E0B', funFact: 'Está bien al norte, con playas tibias y el altiplano.' },
  { number: 2, roman: 'I', name: 'Tarapacá', capital: 'Iquique', zone: 'Norte', color: '#FBBF24', funFact: 'Tiene el desierto y la hermosa ciudad de Iquique.' },
  { number: 3, roman: 'II', name: 'Antofagasta', capital: 'Antofagasta', zone: 'Norte', color: '#F97316', funFact: 'Aquí está el Desierto de Atacama y la Portada.' },
  { number: 4, roman: 'III', name: 'Atacama', capital: 'Copiapó', zone: 'Norte', color: '#FB923C', funFact: 'A veces el desierto se llena de flores de colores.' },
  { number: 5, roman: 'IV', name: 'Coquimbo', capital: 'La Serena', zone: 'Norte', color: '#EAB308', funFact: 'Tiene cielos muy despejados para mirar las estrellas.' },
  { number: 6, roman: 'V', name: 'Valparaíso', capital: 'Valparaíso', zone: 'Centro', color: '#38BDF8', funFact: 'Tiene cerros con casas de colores y ascensores.' },
  { number: 7, roman: 'RM', name: 'Región Metropolitana', capital: 'Santiago', zone: 'Centro', color: '#0EA5E9', funFact: 'Aquí está Santiago, la capital de todo Chile.' },
  { number: 8, roman: 'VI', name: "O'Higgins", capital: 'Rancagua', zone: 'Centro', color: '#0284C7', funFact: 'Tiene campos verdes y montañas de la cordillera.' },
  { number: 9, roman: 'VII', name: 'Maule', capital: 'Talca', zone: 'Centro', color: '#06B6D4', funFact: 'Tiene grandes ríos y parques de bosques.' },
  { number: 10, roman: 'XVI', name: 'Ñuble', capital: 'Chillán', zone: 'Centro', color: '#14B8A6', funFact: 'Fue la región más nueva que completó las 16 regiones.' },
  { number: 11, roman: 'VIII', name: 'Biobío', capital: 'Concepción', zone: 'Sur', color: '#10B981', funFact: 'Tiene el gran río Biobío y bosques verdes.' },
  { number: 12, roman: 'IX', name: 'La Araucanía', capital: 'Temuco', zone: 'Sur', color: '#22C55E', funFact: 'Es la tierra de las araucarias y lagos.' },
  { number: 13, roman: 'XIV', name: 'Región de Los Ríos', capital: 'Valdivia', isHome: true, zone: 'Sur', color: '#059669', funFact: '¡Es nuestra región! Su capital es Valdivia, con muchos ríos y selva verde.' },
  { number: 14, roman: 'X', name: 'Región de Los Lagos', capital: 'Puerto Montt', zone: 'Sur', color: '#0D9488', funFact: 'Está justo al sur de nosotros, con lagos y Chiloé.' },
  { number: 15, roman: 'XI', name: 'Aysén', capital: 'Coyhaique', zone: 'Austral', color: '#0284C7', funFact: 'Tiene glaciares de hielo azul y montañas nevadas.' },
  { number: 16, roman: 'XII', name: 'Magallanes y Antártica', capital: 'Punta Arenas', zone: 'Austral', color: '#1D4ED8', funFact: 'Es la región del extremo sur, donde viven pingüinos.' },
];

export type LandscapeCategory = 'natural' | 'cultural';

export interface LandscapeItem {
  id: string;
  name: string;
  category: LandscapeCategory;
  iconKey:
    | 'river'
    | 'bridge'
    | 'volcano'
    | 'house'
    | 'forest'
    | 'boat'
    | 'school'
    | 'swan'
    | 'torreon'
    | 'rain'
    | 'street'
    | 'sea_lion';
  explanation: string;
}

export const LANDSCAPE_SORT_ITEMS: LandscapeItem[] = [
  {
    id: 'rio',
    name: 'Río Calle-Calle',
    category: 'natural',
    iconKey: 'river',
    explanation: '¡Correcto! El río lo creó la naturaleza, por eso es parte del paisaje natural.',
  },
  {
    id: 'puente',
    name: 'Puente Pedro de Valdivia',
    category: 'cultural',
    iconKey: 'bridge',
    explanation: '¡Muy bien! El puente lo construyeron las personas, es paisaje cultural.',
  },
  {
    id: 'volcan',
    name: 'Volcán con nieve',
    category: 'natural',
    iconKey: 'volcano',
    explanation: '¡Excelente! Los volcanes y montañas son elementos del paisaje natural.',
  },
  {
    id: 'casa',
    name: 'Casa de madera',
    category: 'cultural',
    iconKey: 'house',
    explanation: '¡Sí! Las casas las construyen las personas, así que son paisaje cultural.',
  },
  {
    id: 'bosque',
    name: 'Selva Valdiviana',
    category: 'natural',
    iconKey: 'forest',
    explanation: '¡Genial! Los árboles y bosques nativos pertenecen al paisaje natural.',
  },
  {
    id: 'lancha',
    name: 'Lancha en el río',
    category: 'cultural',
    iconKey: 'boat',
    explanation: '¡Así es! Las lanchas y barcos los fabrican las personas: paisaje cultural.',
  },
  {
    id: 'escuela',
    name: 'Nuestra escuela',
    category: 'cultural',
    iconKey: 'school',
    explanation: '¡Perfecto! La escuela es un edificio construido por personas: paisaje cultural.',
  },
  {
    id: 'cisne',
    name: 'Cisne de cuello negro',
    category: 'natural',
    iconKey: 'swan',
    explanation: '¡Bravo! Los animales silvestres como el cisne son parte del paisaje natural.',
  },
  {
    id: 'torreon',
    name: 'Torreón del Barro',
    category: 'cultural',
    iconKey: 'torreon',
    explanation: '¡Correcto! El Torreón de Valdivia fue construido hace mucho por personas: paisaje cultural.',
  },
  {
    id: 'lluvia',
    name: 'Lluvia y nubes del sur',
    category: 'natural',
    iconKey: 'rain',
    explanation: '¡Muy bien! La lluvia y las nubes son fenómenos de la naturaleza: paisaje natural.',
  },
];

export interface QuizQuestion {
  id: string;
  topicId: TopicId;
  question: string;
  options: string[];
  correctIndex: number;
  hint: string;
  celebration: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    topicId: 'ubicacion-chile',
    question: '¿En qué continente está ubicado Chile?',
    options: ['En América del Sur', 'En Europa', 'En África'],
    correctIndex: 0,
    hint: 'Pista: Nuestro país largo y angosto está en la parte sur de América.',
    celebration: '¡Exacto! Chile está ubicado en América del Sur.',
  },
  {
    id: 'q2',
    topicId: 'ubicacion-chile',
    question: '¿Qué océano baña toda la costa de Chile al oeste?',
    options: ['Océano Atlántico', 'Océano Pacífico', 'Océano Índico'],
    correctIndex: 1,
    hint: 'Pista: Cuando vamos a la playa en Niebla, miramos hacia ese gran océano.',
    celebration: '¡Muy bien! Al oeste de Chile está el Océano Pacífico.',
  },
  {
    id: 'q3',
    topicId: 'nuestra-ciudad',
    question: '¿Cómo se llama nuestra ciudad de los ríos?',
    options: ['Santiago', 'Valdivia', 'Puerto Montt'],
    correctIndex: 1,
    hint: 'Pista: Tiene el Puente Pedro de Valdivia y el Río Calle-Calle.',
    celebration: '¡Sí! Nuestra hermosa ciudad se llama Valdivia.',
  },
  {
    id: 'q4',
    topicId: 'nuestra-comuna',
    question: '¿Cuál es el nombre de nuestra comuna?',
    options: ['Comuna de Valdivia', 'Comuna de Osorno', 'Comuna de Temuco'],
    correctIndex: 0,
    hint: 'Pista: Nuestra comuna tiene el mismo nombre que nuestra ciudad.',
    celebration: '¡Correcto! Vivimos en la Comuna de Valdivia.',
  },
  {
    id: 'q5',
    topicId: 'nuestra-region',
    question: '¿Cómo se llama nuestra región?',
    options: ['Región de Los Lagos', 'Región de Los Ríos', 'Región de Atacama'],
    correctIndex: 1,
    hint: 'Pista: Lleva el nombre de los muchos ríos que cruzan nuestra tierra.',
    celebration: '¡Bravo! Vivimos en la Región de Los Ríos.',
  },
  {
    id: 'q6',
    topicId: 'regiones-chile',
    question: '¿Cuántas regiones tiene Chile en total?',
    options: ['10 regiones', '16 regiones', '25 regiones'],
    correctIndex: 1,
    hint: 'Pista: Son más de quince y menos de diecisiete.',
    celebration: '¡Excelente! Chile tiene 16 regiones de norte a sur.',
  },
  {
    id: 'q7',
    topicId: 'paisaje-cultural',
    question: '¿Quién crea los elementos del paisaje cultural?',
    options: ['Solo la lluvia y el viento', 'Las personas', 'Los volcanes'],
    correctIndex: 1,
    hint: 'Pista: Casas, puentes y escuelas no nacen solos en el bosque.',
    celebration: '¡Muy bien! El paisaje cultural lo crean las personas.',
  },
  {
    id: 'q8',
    topicId: 'paisaje-cultural',
    question: '¿Cuál de estos es un elemento del paisaje CULTURAL de Valdivia?',
    options: ['El Puente Pedro de Valdivia', 'El Río Calle-Calle', 'Un árbol de alerce'],
    correctIndex: 0,
    hint: 'Pista: Busca algo construido por ingenieros y trabajadores.',
    celebration: '¡Genial! El puente fue construido por personas, es paisaje cultural.',
  },
  {
    id: 'q9',
    topicId: 'paisaje-natural',
    question: '¿Cuál de estos pertenece al paisaje NATURAL?',
    options: ['Una calle con autos', 'Un volcán y un bosque nativo', 'Una casa de madera'],
    correctIndex: 1,
    hint: 'Pista: Busca elementos creados por la naturaleza.',
    celebration: '¡Perfecto! Volcanes y bosques son parte del paisaje natural.',
  },
  {
    id: 'q10',
    topicId: 'paisaje-natural',
    question: 'El Río Calle-Calle y los lobos marinos de la costanera son parte del...',
    options: ['Paisaje cultural', 'Paisaje natural', 'Paisaje de plástico'],
    correctIndex: 1,
    hint: 'Pista: Ni el río ni los lobos marinos fueron fabricados por personas.',
    celebration: '¡Lo lograste! Ríos y animales silvestres son parte del paisaje natural.',
  },
];

export interface MemoryCardPair {
  pairId: string;
  label: string;
  sublabel: string;
  color: 'sky' | 'emerald' | 'amber';
  iconKey: 'chile' | 'city' | 'region' | 'count16' | 'natural' | 'cultural';
}

export const MEMORY_PAIRS: MemoryCardPair[] = [
  { pairId: 'chile', label: 'Chile', sublabel: 'América del Sur', color: 'sky', iconKey: 'chile' },
  { pairId: 'city', label: 'Valdivia', sublabel: 'Ciudad y Comuna', color: 'amber', iconKey: 'city' },
  { pairId: 'region', label: 'Los Ríos', sublabel: 'Nuestra Región', color: 'emerald', iconKey: 'region' },
  { pairId: 'count16', label: '16 Regiones', sublabel: 'Tiene Chile', color: 'sky', iconKey: 'count16' },
  { pairId: 'natural', label: 'Paisaje Natural', sublabel: 'Ríos y bosques', color: 'emerald', iconKey: 'natural' },
  { pairId: 'cultural', label: 'Paisaje Cultural', sublabel: 'Puentes y casas', color: 'amber', iconKey: 'cultural' },
];
