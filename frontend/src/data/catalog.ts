export interface ServiceItem {
  id: string;
  name: string;
  category: "manicura" | "pedicura" | "nailart" | "acrilico";
  price: number;
  duration: number;
  desc: string;
  tag?: string;
  imgUrl: string;
  includedNotes?: string;
  supportsLength?: boolean;
  supportsShape?: boolean;
  supportsPediExtras?: boolean;
}

export interface LengthOption {
  id: string;
  name: string;
  price: number;
  tag?: string;
  measureCm?: string;
  desc?: string;
  imgUrl?: string;
}

export interface ShapeOption {
  id: string;
  name: string;
  price: number;
  tag?: string;
  desc?: string;
  imgUrl?: string;
}

export interface EffectOption {
  id: string;
  name: string;
  price: number;
  duration: number;
  tag?: string;
  desc?: string;
  imgUrl?: string;
}

export interface DesignLevel {
  id: string;
  name: string;
  pricePerNail: number;
  durationPerNail: number;
  desc: string;
  imgUrl: string;
  examples: string[];
}

export interface RemovalOption {
  id: string;
  name: string;
  price: number;
  duration: number;
  desc?: string;
}

export interface CartItem {
  id: string;
  serviceId: string;
  name: string;
  category: "manicura" | "pedicura";
  basePrice: number;
  baseDuration: number;
  imgUrl: string;
  finish: "color_entero" | "francesa";
  length?: LengthOption;
  shape?: ShapeOption;
  effect?: EffectOption;
  designN1: number;
  designN2: number;
  designN3: number;
  removal: RemovalOption;
  reconstructedToes?: number;
  pediEffect?: boolean;
  pediDesignToes?: boolean;
  totalPrice: number;
  totalDuration: number;
}

export const LENGTH_OPTIONS: LengthOption[] = [
  {
    id: "len-1-3",
    name: "Largo #1, #2 o #3",
    price: 0,
    tag: "Incluido",
    measureCm: "1.2 – 1.6 cm",
    desc: "Largo natural o de oficina. Máxima comodidad para teclado y actividades diarias.",
    imgUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "len-4",
    name: "Largo #4",
    price: 8,
    tag: "+S/ 8",
    measureCm: "1.8 – 2.0 cm",
    desc: "Medio estilizado. Alarga visiblemente los dedos manteniendo resistencia y firmeza.",
    imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "len-5",
    name: "Largo #5",
    price: 15,
    tag: "+S/ 15",
    measureCm: "2.2 – 2.5 cm",
    desc: "Largo salón glamuroso. Perfecto para lucir diseño elaborado y ápice pronunciado.",
    imgUrl: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "len-6",
    name: "Largo #6 (XL)",
    price: 22,
    tag: "+S/ 22",
    measureCm: "2.8 – 3.2 cm",
    desc: "Extra largo editorial de alto impacto para clientas que buscan presencia y longitud extrema.",
    imgUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
  },
];

export const SHAPE_OPTIONS: ShapeOption[] = [
  {
    id: "shape-classic",
    name: "Forma Clásica (Cuadrada / Oval / Redonda)",
    price: 0,
    tag: "Incluida",
    desc: "Bordes rectos simétricos o contorno oval suave anatómico.",
    imgUrl: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "shape-coffin",
    name: "Punta Coffin Marcada",
    price: 5,
    tag: "+S/ 5",
    desc: "Silueta bailarina con laterales cónicos convergentes y punta recta perfecta.",
    imgUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "shape-stiletto",
    name: "Punta Stiletto",
    price: 5,
    tag: "+S/ 5",
    desc: "Vértice afilado en punta de aguja que estiliza la mano con estética vanguardista.",
    imgUrl: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "shape-almond",
    name: "Punta Almendra",
    price: 5,
    tag: "+S/ 5",
    desc: "Laterales estilizados con silueta almendrada suave que estiliza y alarga visualmente los dedos.",
    imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80"
  },
];

export const EFFECT_OPTIONS_HANDS: EffectOption[] = [
  {
    id: "eff-none",
    name: "Sin efecto adicional",
    price: 0,
    duration: 0,
    desc: "Brillo Top Coat cristalino de alta duración.",
    imgUrl: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "eff-aurora",
    name: "Efecto Aurora / Glaseado / Espejo / Ojo de Gato (10 uñas)",
    price: 8,
    duration: 15,
    tag: "+S/ 8",
    desc: "Polvo de perla cromo iridiscente al horno o partículas magnéticas terciopelo.",
    imgUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "eff-babyboomer",
    name: "Técnica Baby Boomer / Ombré Difuminado (10 uñas)",
    price: 12,
    duration: 20,
    tag: "+S/ 12",
    desc: "Degradado suave sin cortes de blanco lechoso a nude translúcido.",
    imgUrl: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80"
  },
];

export const DESIGN_LEVELS: DesignLevel[] = [
  {
    id: "des-n1",
    name: "Nivel 1 (Básico)",
    pricePerNail: 2.50,
    durationPerNail: 3,
    desc: "Stickers botánicos, puntitos minimalistas, líneas fineline, papel oro/foil o 1–2 piedritas en cutícula.",
    imgUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80",
    examples: ["Stickers botánicos", "Pan de oro / Foil", "Líneas fineline", "1–2 Cristales en cutícula"]
  },
  {
    id: "des-n2",
    name: "Nivel 2 (Intermedio)",
    pricePerNail: 5.00,
    durationPerNail: 5,
    desc: "Mano alzada artística: micro-flores, ondas fluidas, animal print, francesa doble/diseño, efecto Aura o encapsulado glitter.",
    imgUrl: "https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=600&q=80",
    examples: ["Efecto Aura difuminado", "Flores a mano alzada", "Ondas fluidas pastel", "Francesa doble", "Glitter encapsulado"]
  },
  {
    id: "des-n3",
    name: "Nivel 3 (Avanzado / 3D)",
    pricePerNail: 8.00,
    durationPerNail: 8,
    desc: "Relieve 3D con texturas de gel orgánicas, uña full pedrería/cristales de impacto o ilustraciones complejas.",
    imgUrl: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=600&q=80",
    examples: ["Relieve 3D de autor", "Full cristales Swarovski", "Micro-pintura compleja", "Encapsulado 3D"]
  }
];

export const REMOVAL_OPTIONS: RemovalOption[] = [
  {
    id: "rem-none",
    name: "Uñas limpias (Sin material previo)",
    price: 0,
    duration: 0,
    desc: "Tus uñas vienen listas sin restos de esmalte ni acrílico."
  },
  {
    id: "rem-gel",
    name: "Retiro de Esmaltado en Gel o Rubber",
    price: 8,
    duration: 20,
    desc: "Retiro con microfresa suave respetando el grosor biológico."
  },
  {
    id: "rem-studio",
    name: "Retiro Acrílico / Polygel / Builder (De Samm)",
    price: 15,
    duration: 30,
    desc: "Remoción médica de set realizado previamente en nuestro estudio."
  },
  {
    id: "rem-foreign",
    name: "Retiro Acrílico / Polygel / Builder (De otro salón)",
    price: 20,
    duration: 35,
    desc: "Remoción minuciosa y detox de material colocado en salón ajeno."
  }
];

export interface ExtraItem {
  id: string;
  name: string;
  price: number;
  duration: number;
  desc: string;
}

export const DEFAULT_EXTRAS: ExtraItem[] = [
  {
    id: "retiro-acrilico-otro",
    name: "Retiro Seguro de Acrílico/Gel Ajeno",
    price: 25,
    duration: 30,
    desc: "Remoción con torno médico sin limar tu uña natural para comenzar desde cero."
  },
  {
    id: "nailart-minimal-mano",
    name: "Nail Art Minimalista a Mano Alzada",
    price: 20,
    duration: 30,
    desc: "Líneas fineline, flores sutiles, micro-puntos o efecto aura en 2 a 4 uñas."
  },
  {
    id: "efecto-cromo-glaze",
    name: "Efecto Glazed Donut / Cromo Perlado",
    price: 15,
    duration: 15,
    desc: "Micropolvo de destellos iridiscentes sellado al horno en set completo."
  },
  {
    id: "french-inverso-micro",
    name: "Micro-Francesa Editorial o Reversa",
    price: 20,
    duration: 25,
    desc: "Línea de sonrisa ultrafina de alta precisión geométrica."
  }
];

export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  imgUrl: string;
  desc: string;
  content?: {
    intro: string;
    points: { subtitle: string; text: string }[];
    conclusion: string;
  };
}

export const DEFAULT_HERO_BG = "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1920&q=85";
export const DEFAULT_ABOUT_PHOTO = "/images/salon/sheyla-moreno.webp";

export interface HomeShowcaseItem {
  id: string;
  title: string;
  category: string;
  time: string;
  imgUrl: string;
  desc: string;
}

export const DEFAULT_HOME_SHOWCASE: HomeShowcaseItem[] = [
  {
    id: "home-1",
    title: "Uñas Acrílicas con Tip",
    category: "Estructura & Largo",
    time: "2 horas",
    imgUrl: "/images/servicios/acrilicas-tip.webp",
    desc: "Set completo hasta largo #3 con color entero o francesa. Estilizadas, resistentes y con acabado prolijo."
  },
  {
    id: "home-2",
    title: "Nivelación Rubber Gel",
    category: "Uña Natural",
    time: "1h 30m",
    imgUrl: "/images/servicios/nivelacion-rubber.webp",
    desc: "Fortalecimiento sobre tu propia uña natural. Corrige imperfecciones y permite que crezcan sanas sin quebrarse."
  },
  {
    id: "home-3",
    title: "Pedigel & Acripie",
    category: "Pies Impecables",
    time: "1h 30m",
    imgUrl: "/images/servicios/pedigel-acripie.webp",
    desc: "Pedicura estética completa con esmaltado en gel o acrílico en los 10 dedos para máxima duración."
  }
];

export interface GalleryPhotoItem {
  id: string;
  url: string;
  category: "kapping" | "rusa" | "softgel" | "diseño" | "glazed";
  title: string;
  tag: string;
  desc: string;
  likes: number;
}

export const DEFAULT_GALLERY: GalleryPhotoItem[] = [
  {
    id: "g1",
    url: "/images/galeria/galeria-1.webp",
    category: "kapping",
    title: "Kapping Rubber & Nivelación",
    tag: "Salud Ungueal",
    desc: "Refuerzo anatómico con brillo espejo y cutículas perfectas sin limado agresivo.",
    likes: 142
  },
  {
    id: "g2",
    url: "/images/galeria/galeria-2.webp",
    category: "glazed",
    title: "Glazed Donut Cromo Hailey Bieber",
    tag: "Efecto Cromo",
    desc: "Polvo de perla cromo sobre base milky almond con destellos según la luz solar.",
    likes: 218
  },
  {
    id: "g3",
    url: "/images/galeria/galeria-3.webp",
    category: "kapping",
    title: "Limpieza Profunda & Esmaltado Prolijo",
    tag: "Acabado Limpio",
    desc: "Preparación suave de cutículas y esmaltado impecable desde la raíz que dura 3+ semanas.",
    likes: 189
  },
  {
    id: "g4",
    url: "/images/galeria/galeria-4.webp",
    category: "softgel",
    title: "Soft Gel Tips & French Micro",
    tag: "Estructura Ligera",
    desc: "Largo almendrado en gel premoldeado sin agresiones ni peso para la uña natural.",
    likes: 167
  },
  {
    id: "g5",
    url: "/images/galeria/galeria-5.webp",
    category: "diseño",
    title: "Baby Boomer & Toques Dorados",
    tag: "Nail Art Minimal",
    desc: "Degradado suave con láminas de pan de oro encapsulado en acabado cristalino.",
    likes: 245
  },
  {
    id: "g6",
    url: "/images/galeria/galeria-6.webp",
    category: "glazed",
    title: "Espresso Glaze & Cat Eye Magnético",
    tag: "Tendencia Velvet",
    desc: "Partículas magnéticas orientadas bajo luz LED con reflejos de terciopelo café moka.",
    likes: 198
  },
  {
    id: "g7",
    url: "/images/galeria/galeria-7.webp",
    category: "kapping",
    title: "Clean Girl Nails & Nude Translúcido",
    tag: "Acabado Natural",
    desc: "Esmaltado lechoso semitransparente que resalta la salud y luminosidad natural.",
    likes: 173
  },
  {
    id: "g8",
    url: "/images/galeria/galeria-8.webp",
    category: "diseño",
    title: "Aura Nails & Lilac Mist",
    tag: "Aerógrafo Editorial",
    desc: "Difuminado concéntrico con aerógrafo en tonos lila pastel y brillo perlado.",
    likes: 312
  }
];

export interface CareStepItem {
  id: string;
  num: string;
  tag: string;
  title: string;
  short: string;
  detail: string;
  tip: string;
  impact: string;
  imgUrl: string;
}

export const DEFAULT_CARE_STEPS: CareStepItem[] = [
  {
    id: "care-1",
    num: "01",
    tag: "PROTECCIÓN QUÍMICA",
    title: "Usa guantes al limpiar la casa",
    short: "Evita el contacto directo con detergentes, lejía y solventes.",
    detail: "Los químicos domésticos degradan gradualmente la película protectora del Top Coat y resecan la queratina natural, provocando opacidad y desprendimientos prematuros.",
    tip: "Ten siempre un par de guantes de látex o nitrilo en la cocina y otro en el baño.",
    impact: "Mantiene el brillo efecto espejo por 3 semanas completas",
    imgUrl: "/images/cuidados/cuidado-1-guantes.webp"
  },
  {
    id: "care-2",
    num: "02",
    tag: "HÁBITO DIARIO",
    title: "Tus uñas son joyas, no herramientas",
    short: "Cero palancas, abrir latas o raspar etiquetas con la punta.",
    detail: "Hacer fuerza de torsión con el borde libre genera microfisuras internas en el gel nivelador o acrílico. Usa la yema de tus dedos o la ayuda de una cuchara para abrir paquetes.",
    tip: "Preserva el ápice y la curvatura C arquitectónica intacta.",
    impact: "Cero fisuras en los laterales ni roturas de estrés",
    imgUrl: "/images/cuidados/cuidado-2-joyas.webp"
  },
  {
    id: "care-3",
    num: "03",
    tag: "SALUD UNGUEAL",
    title: "Jamás arranques el producto levantado",
    short: "Si se desprende un lateral, jamás lo jales ni lo muerdas.",
    detail: "Arrancar el acrílico o gel a la fuerza daña las capas de queratina de tu uña natural, volviéndola débil y quebradiza. Si algo se levanta, ven al estudio para retirarlo con calma y de forma segura.",
    tip: "Protégelo con una vendita adhesiva limpia hasta acudir a tu cita.",
    impact: "Conserva la fuerza y salud de tu uña natural",
    imgUrl: "/images/cuidados/cuidado-3-no-arrancar.webp"
  },
  {
    id: "care-4",
    num: "04",
    tag: "HIDRATACIÓN PROFUNDA",
    title: "Aceite de cutícula todas las noches",
    short: "Una gota antes de dormir marca la diferencia en tu crecimiento.",
    detail: "El aceite botánico de jojoba y almendras penetra la matriz ungueal, mantiene el eponiquio flexible e impide que se formen padrastros o grietas antiestéticas en los surcos laterales.",
    tip: "Aplica una gota en la base y masajea suavemente hacia la matriz.",
    impact: "Cutículas suaves, sin padrastros ni piel engrosada",
    imgUrl: "/images/cuidados/cuidado-4-aceite.webp"
  },
  {
    id: "care-5",
    num: "05",
    tag: "PUNTUALIDAD DE ATELIER",
    title: "Retoque y mantenimiento cada 15 a 21 días",
    short: "Equilibrio anatómico y reubicación del centro de gravedad.",
    detail: "A medida que la uña natural crece, el peso del ápice se traslada hacia adelante. Retocar a tiempo previene el efecto palanca que causa desgarros dolorosos en la base.",
    tip: "Asegura tu cita con anticipación para no perder la armonía de tus manos.",
    impact: "Estructura segura y simetría milimétrica continua",
    imgUrl: "/images/cuidados/cuidado-5-retoque.webp"
  }
];

export const DEFAULT_SERVICES: ServiceItem[] = [
  // --- 1. SERVICIOS BASE - MANOS (Elige tu base) ---
  {
    id: "acrilicas-tip",
    name: "Uñas Acrílicas (con tip)",
    category: "manicura",
    price: 65,
    duration: 120,
    desc: "Estructura acrílica clásica de alta durabilidad con tip. Color entero o francesa clásica incluido hasta largo #3.",
    tag: "Más Solicitado",
    imgUrl: "/images/servicios/unas-acrilicas.webp",
    includedNotes: "Color entero o francesa | Hasta #3 incluido",
    supportsLength: true,
    supportsShape: true
  },
  {
    id: "sistema-polygel",
    name: "Sistema Polygel",
    category: "manicura",
    price: 65,
    duration: 120,
    desc: "Híbrido liviano y flexible que combina la resistencia del acrílico con la pureza del gel sin olor a monómero.",
    tag: "Ultra Ligero",
    imgUrl: "/images/servicios/sistema-polygel.webp",
    includedNotes: "Color entero o francesa | Hasta #3 incluido",
    supportsLength: true,
    supportsShape: true
  },
  {
    id: "sistema-builder-gel",
    name: "Sistema Builder Gel",
    category: "manicura",
    price: 70,
    duration: 120,
    desc: "Gel constructor autonivelante de alta densidad. Fuerza elástica ideal para uñas con tendencia a quebrarse.",
    tag: "Fuerza & Flexibilidad",
    imgUrl: "/images/servicios/sistema-builder-gel.webp",
    includedNotes: "Color entero o francesa | Hasta #3 incluido",
    supportsLength: true,
    supportsShape: true
  },
  {
    id: "esculpidas-molde",
    name: "Uñas Esculpidas (con molde)",
    category: "manicura",
    price: 90,
    duration: 140,
    desc: "Esculpido a mano con molde sin tips. Estructura personalizada a la medida de tus dedos con máxima resistencia y acabado fino.",
    tag: "Esculpido Personalizado",
    imgUrl: "/images/servicios/unas-esculpidas.webp",
    includedNotes: "Color entero o francesa | Hasta #3 incluido",
    supportsLength: true,
    supportsShape: true
  },
  {
    id: "rubber-gel",
    name: "Nivelación Rubber Gel (Uña natural)",
    category: "manicura",
    price: 55,
    duration: 90,
    desc: "Refuerzo y nivelación con base rubber sobre tu uña natural. Corrige imperfecciones y fortalece para que crezcan sanas sin quebrarse.",
    tag: "Fortalecimiento Natural",
    imgUrl: "/images/servicios/nivelacion-rubber.webp",
    includedNotes: "Color entero o francesa en uña natural",
    supportsLength: false,
    supportsShape: false
  },
  {
    id: "esmaltado-gel",
    name: "Esmaltado en Gel (Uña natural)",
    category: "manicura",
    price: 45,
    duration: 60,
    desc: "Limpieza detallada de cutículas y esmaltado en gel curado en lámpara LED con brillo cristalino que dura 3+ semanas.",
    tag: "Clásico Duradero",
    imgUrl: "/images/servicios/esmaltado-gel.webp",
    includedNotes: "Color entero o francesa en uña natural",
    supportsLength: false,
    supportsShape: false
  },
  {
    id: "reconstruccion-suelta",
    name: "Alargamiento / Reconstrucción (por uña)",
    category: "manicura",
    price: 8,
    duration: 20,
    desc: "Reparación y reconstrucción individual para uñas rotas, mordidas o desparejadas antes de tu tratamiento.",
    tag: "Reparación SOS",
    imgUrl: "/images/servicios/alargamiento-reconstruccion.webp",
    includedNotes: "Desde S/ 8 c/u (según largo)",
    supportsLength: true,
    supportsShape: true
  },

  // --- 2. SERVICIOS BASE - PIES ---
  {
    id: "pedigel",
    name: "Pedigel",
    category: "pedicura",
    price: 50,
    duration: 75,
    desc: "Limpieza profunda de pies, exfoliación estética y esmaltado en gel de alta duración sobre uña natural.",
    tag: "Pies Impecables",
    imgUrl: "/images/servicios/pedigel.webp",
    includedNotes: "Color entero o francesa en uña natural",
    supportsLength: false,
    supportsShape: false,
    supportsPediExtras: true
  },
  {
    id: "acripie",
    name: "Acripie",
    category: "pedicura",
    price: 80,
    duration: 90,
    desc: "Sistema acrílico completo en los 10 dedos de los pies para máxima duración, simetría y brillo inalterable.",
    tag: "Máxima Duración",
    imgUrl: "/images/servicios/acripie.webp",
    includedNotes: "Color entero o francesa en los 10 dedos",
    supportsLength: false,
    supportsShape: false,
    supportsPediExtras: true
  }
];

export const DEFAULT_ARTICLES: ArticleItem[] = [
  {
    id: "kapping-vs-acrilico",
    title: "Nivelación Rubber vs Uñas Acrílicas: ¿Cuál necesita tu uña?",
    category: "Guía de Cuidado",
    date: "Guía de Estudio",
    readTime: "3 min de lectura",
    imgUrl: "/images/servicios/nivelacion-rubber.webp",
    desc: "Descubre las diferencias entre reforzar tu uña natural con Rubber Gel o elegir la longitud y resistencia de las Uñas Acrílicas.",
    content: {
      intro: "Si tienes dudas entre lucir un set largo o cuidar el crecimiento de tu uña natural, en samm. NAIL STUDIO te asesoramos para elegir la técnica perfecta según tus actividades y tu estilo de vida.",
      points: [
        {
          subtitle: "1. Uñas Acrílicas con Tip: Resistencia y largo inmediato",
          text: "Ideales si buscas lucir un largo definido desde el primer momento (#1 al #6 XL) o para ocasiones especiales. Soportan el ajetreo diario y mantienen su forma estilizada por semanas."
        },
        {
          subtitle: "2. Nivelación Rubber Gel: Tu uña natural más fuerte",
          text: "Si tus uñas se quiebran o doblan fácilmente, la base rubber aporta una capa elástica que las refuerza sin necesidad de alargarlas, permitiendo que crezcan sanas y fuertes."
        },
        {
          subtitle: "3. Retiros seguros sin dañar la uña",
          text: "Nunca te arranques las uñas postizas ni las forces. En el estudio realizamos el retiro con suavidad y paciencia para que tu uña natural quede intacta e hidratada."
        }
      ],
      conclusion: "Conversa con nosotras al iniciar tu cita en cabina y evaluaremos juntas qué servicio se adapta mejor a lo que necesitas."
    }
  },
  {
    id: "tendencias-glazed-cromo",
    title: "Tendencias de Nail Art en Lima: Glazed Donut, Cat Eye y Mano Alzada",
    category: "Tendencias 2026",
    date: "Colección Lima",
    readTime: "3 min de lectura",
    imgUrl: "/images/disenos/tendencias-nail-art.webp",
    desc: "Efectos aperlados virales, destellos magnéticos de terciopelo y arte a mano alzada para inspirar tu próxima cita.",
    content: {
      intro: "El estilo clean girl aesthetic y los efectos visuales son los grandes favoritos de nuestras clientas en Lima: acabados finos, elegantes y que combinan con todo.",
      points: [
        {
          subtitle: "1. Efecto Glazed Donut & Polvos Aurora",
          text: "El acabado aperlado viral. Sobre una base nude o lechosa se aplica un polvo perlado que refleja destellos de luz con cada movimiento de tus manos."
        },
        {
          subtitle: "2. Velvet Cat Eye (Ojo de Gato)",
          text: "Micropartículas magnéticas trabajadas con imán antes de curar en lámpara LED, logrando un brillo de terciopelo en tonos nude, café o rosa empolvado."
        },
        {
          subtitle: "3. Nail Art a Mano Alzada",
          text: "Flores minimalistas, ondas fluidas, francesas dobles y toques de papel oro. Trae la foto que guardaste en Instagram o Pinterest y la recreamos para ti."
        }
      ],
      conclusion: "Elige desde un detalle sutil en una uña hasta un set completo con efectos. Diseñamos a tu gusto."
    }
  },
  {
    id: "protocolo-esterilizacion-autoclave",
    title: "Bioseguridad & Cuidado: Por qué tu salud es nuestra prioridad",
    category: "Bioseguridad",
    date: "Compromiso Samm",
    readTime: "2 min de lectura",
    imgUrl: "/images/salon/bioseguridad.webp",
    desc: "En samm. NAIL STUDIO aplicamos protocolos estrictos de desinfección, instrumental esterilizado y limas descartables para cada cita.",
    content: {
      intro: "Tu tranquilidad es lo primero. En el estudio privado de Sheyla Astrid Moreno Medina cuidamos cada paso de bioseguridad para que disfrutes de tu momento de engreimiento sin preocupaciones.",
      points: [
        {
          subtitle: "Paso 1: Instrumental Desinfectado y Esterilizado",
          text: "Todas las herramientas metálicas pasan por desinfección profunda y esterilización para garantizar cero riesgos y máxima higiene en cabina."
        },
        {
          subtitle: "Paso 2: Limas y Pulidores Descartables",
          text: "Cada clienta cuenta con limas y bloques pulidores de uso individual que se desechan al terminar la sesión."
        },
        {
          subtitle: "Paso 3: Marcas Profesionales de Calidad",
          text: "Trabajamos con insumos reconocidos en el rubro (Mia Secret, OPI, Gelish) que cuidan la queratina natural y garantizan semanas de adherencia."
        }
      ],
      conclusion: "Disfruta de tu cita con la seguridad de que tus manos y pies están en las mejores manos profesionales."
    }
  }
];

/* =========================================================================
   MOTOR DE TEMAS DINÁMICOS PARA LIMA, PERÚ (4 ESTACIONES + 14 EVENTOS)
   ========================================================================= */

export interface LimaTheme {
  id: string;
  type: "estacion" | "evento";
  name: string;
  dateRangeLabel: string;
  climateVibe: string;
  heroBadge: string;
  featuredDesigns: string[];
  colors: {
    primary: string;
    bg: string;
    surface: string;
    accent: string;
    dark: string;
  };
}

export const LIMA_SEASONS: LimaTheme[] = [
  {
    id: "estacion-verano",
    type: "estacion",
    name: "Verano en Lima & Playas del Sur",
    dateRangeLabel: "21 de diciembre al 20 de marzo",
    climateVibe: "Sol intenso (26°C-30°C), temporada de playas en Asia y Punta Hermosa.",
    heroBadge: "TEMPORADA VERANO LIMA · ESPECIAL SOL & PLAYA",
    featuredDesigns: [
      "Blanco Leche (Milky Nails)",
      "Corales & Tonos Neón",
      "Diseños Marinos & Conchitas",
      "Aura Nails Luminosas",
      "Pedigel & Acripie de Playa"
    ],
    colors: {
      primary: "#E07A5F", // Coral cálido
      bg: "#FFFDF9",      // Blanco luminoso arena
      surface: "#F9F3EB", // Arena cálido
      accent: "#2A9D8F",  // Turquesa agua
      dark: "#231C1A"
    }
  },
  {
    id: "estacion-otono",
    type: "estacion",
    name: "Otoño Limeño · Tierra & Oliva",
    dateRangeLabel: "21 de marzo al 20 de junio",
    climateVibe: "Clima templado, tardes de brisa fresca y estética cálida acogedora.",
    heroBadge: "TEMPORADA OTOÑO EN LIMA · ESTÉTICA TERRACOTA & OLIVA",
    featuredDesigns: [
      "Tonos Tierra & Nude Cálido",
      "Marrón Chocolate & Café",
      "Verde Oliva Editorial",
      "Efecto Carey (Tortoiseshell)",
      "Acabados Velvet Mate"
    ],
    colors: {
      primary: "#B5654B", // Terracota
      bg: "#FAF6F0",      // Crema suave
      surface: "#F2EAE0", // Beige cálido
      accent: "#606C38",  // Verde oliva
      dark: "#261C18"     // Marrón café profundo
    }
  },
  {
    id: "estacion-invierno",
    type: "estacion",
    name: "Invierno en Lima · Neblina & Elegancia",
    dateRangeLabel: "21 de junio al 22 de septiembre",
    climateVibe: "Cielo gris limeño, humedad alta (14°C-18°C) y sofisticación nocturna.",
    heroBadge: "TEMPORADA INVIERNO LIMA · BORGOÑA, CAT EYE & PLATA",
    featuredDesigns: [
      "Borgoña & Vino Tinto",
      "Efecto Ojo de Gato (Cat Eye)",
      "Azul Noche & Gris Perla",
      "Cromados Oscuros & Plata",
      "Taupe & Negro Espejo"
    ],
    colors: {
      primary: "#722F37", // Borgoña / Vino
      bg: "#F6F6F8",      // Gris perla muy claro
      surface: "#ECECEF", // Topo perla
      accent: "#1D2D44",  // Azul noche
      dark: "#1B191E"     // Espresso grafito
    }
  },
  {
    id: "estacion-primavera",
    type: "estacion",
    name: "Primavera en Lima · Bloom & Bodas",
    dateRangeLabel: "23 de septiembre al 20 de diciembre",
    climateVibe: "Días soleados suaves, flores e inicio de temporada de bodas y eventos.",
    heroBadge: "TEMPORADA PRIMAVERA LIMA · BABY PINK & CLEAN NAILS",
    featuredDesigns: [
      "Baby Pink & Rosa Empolvado",
      "Flores Minimalistas a Mano Alzada",
      "Micro French Pastel & Mantequilla",
      "Lavanda & Verde Menta Suave",
      "Efecto Jabón / Clean Nails"
    ],
    colors: {
      primary: "#D88C9A", // Rosa empolvado
      bg: "#FDFBF9",      // Blanco floral cálido
      surface: "#F7F0F2", // Lavanda/rosa sutil
      accent: "#8E7DBE",  // Lavanda elegante
      dark: "#282024"
    }
  }
];

export const LIMA_EVENTS: LimaTheme[] = [
  {
    id: "evento-aniversario-lima",
    type: "evento",
    name: "Aniversario de Lima",
    dateRangeLabel: "12 al 19 de enero (Central: 18 ene)",
    climateVibe: "Verano elegante de terraza, tradición republicana y destellos dorados.",
    heroBadge: "EDICIÓN ESPECIAL · ANIVERSARIO DE LIMA",
    featuredDesigns: [
      "Dorado Champán & Pan de Oro",
      "Blanco Luminoso de Terraza",
      "Amarillo Suave & Perla",
      "Francesa Dorada de Gala"
    ],
    colors: {
      primary: "#C59B27",
      bg: "#FFFDF7",
      surface: "#F9F4E6",
      accent: "#8C6D1F",
      dark: "#241E14"
    }
  },
  {
    id: "evento-san-valentin",
    type: "evento",
    name: "San Valentín · Amor y Amistad",
    dateRangeLabel: "1 al 15 de febrero (Central: 14 feb)",
    climateVibe: "Estética Coquette, romance editorial en rojo pasión y rosa cuarzo.",
    heroBadge: "EDICIÓN SAN VALENTÍN · COQUETTE & GLAZED ROSÉ",
    featuredDesigns: [
      "Glazed Donut Nails Rosas",
      "Corazones Minimalistas",
      "Francesa con Bordes de Corazón",
      "Rojo Pasión & Rosa Cuarzo"
    ],
    colors: {
      primary: "#C9184A",
      bg: "#FFF8FA",
      surface: "#FCEEF2",
      accent: "#FF758F",
      dark: "#2B131A"
    }
  },
  {
    id: "evento-carnavales",
    type: "evento",
    name: "Carnavales de Verano",
    dateRangeLabel: "16 al 28 de febrero",
    climateVibe: "Fines de semana vibrantes de playa, ondas psicodélicas y color.",
    heroBadge: "EDICIÓN CARNAVALES DE VERANO · SWIRLS & COLOR",
    featuredDesigns: [
      "Ondas Swirls Multicolor",
      "Tonos Vibrantes de Playa",
      "Brillos & Encapsulados",
      "Aura Nails Tropicales"
    ],
    colors: {
      primary: "#F77F00",
      bg: "#FFFDF9",
      surface: "#FBF3E8",
      accent: "#D62828",
      dark: "#211A1D"
    }
  },
  {
    id: "evento-dia-mujer",
    type: "evento",
    name: "Día Internacional de la Mujer",
    dateRangeLabel: "1 al 9 de marzo (Central: 8 mar)",
    climateVibe: "Enfoque en autocuidado femenino, spa de manos y tonos lavanda.",
    heroBadge: "ESPECIAL 8 DE MARZO · AUTOCUIDADO & SPA DE MANOS",
    featuredDesigns: [
      "Tonos Lila & Lavanda Suave",
      "Neutros Elegantes Ejecutivos",
      "Nivelación Rubber & Spa Hidratante",
      "Amatista Translúcido"
    ],
    colors: {
      primary: "#7B52AB",
      bg: "#FCFaff",
      surface: "#F3EEFA",
      accent: "#5A189A",
      dark: "#21182B"
    }
  },
  {
    id: "evento-semana-santa",
    type: "evento",
    name: "Semana Santa · Feriado Largo",
    dateRangeLabel: "Feriado Largo de Viajes (Marzo / Abril)",
    climateVibe: "Sets de alta resistencia y larga duración para viajes a playa o sierra.",
    heroBadge: "ESPECIAL SEMANA SANTA · SETS RESISTENTES DE VIAJE",
    featuredDesigns: [
      "Kapping Blindado para Viajes",
      "Extensiones Soft Gel Resistentes",
      "Tonos Neutros & Arena",
      "Semipermanente 21+ Días"
    ],
    colors: {
      primary: "#A67C52",
      bg: "#FBF9F5",
      surface: "#F2ECE1",
      accent: "#6B4F35",
      dark: "#231D18"
    }
  },
  {
    id: "evento-dia-madre",
    type: "evento",
    name: "Día de la Madre · Lujo Suave",
    dateRangeLabel: "25 de abril al 2do domingo de mayo",
    climateVibe: "Pico alto de reservas, paquetes Mamá e Hija y Gift Cards de regalo.",
    heroBadge: "EDICIÓN DÍA DE LA MADRE · GIFT CARDS & MAMÁ E HIJA",
    featuredDesigns: [
      "Baby Boomer Clásico con Perlas",
      "Rosa Palo & Dorado Champán",
      "Diseños Florales Finos",
      "Sesión Dúo Mamá e Hija"
    ],
    colors: {
      primary: "#C98A8B",
      bg: "#FFFBFB",
      surface: "#F9EFEF",
      accent: "#B8860B",
      dark: "#281C1D"
    }
  },
  {
    id: "evento-fiestas-patrias",
    type: "evento",
    name: "Fiestas Patrias Perú",
    dateRangeLabel: "15 al 30 de julio (Central: 28-29 jul)",
    climateVibe: "Orgullo peruano en rojo carmín, blanco humo, dorado y sets de viaje.",
    heroBadge: "ESPECIAL FIESTAS PATRIAS PERÚ · ROJO CARMÍN & ORO",
    featuredDesigns: [
      "Rojo Carmín Clásico de Gala",
      "Francesa Roja & Blanco Humo",
      "Acentos en Pan de Oro",
      "Estructuras para Feriado Largo"
    ],
    colors: {
      primary: "#B81D24",
      bg: "#FCF9F9",
      surface: "#F5ECEC",
      accent: "#C59B27",
      dark: "#1F1415"
    }
  },
  {
    id: "evento-santa-rosa",
    type: "evento",
    name: "Santa Rosa de Lima",
    dateRangeLabel: "24 al 31 de agosto (Central: 30 ago)",
    climateVibe: "Estética botánica de rosas antiguas (Dusty Rose) hacia la primavera.",
    heroBadge: "EDICIÓN SANTA ROSA · DUSTY ROSE & BOTÁNICA",
    featuredDesigns: [
      "Rosa Antiguo (Dusty Rose)",
      "Arte Botánico de Rosas Sutiles",
      "Kapping Natural Translúcido",
      "Tonos Nude Rosados"
    ],
    colors: {
      primary: "#B5727A",
      bg: "#FDF9FA",
      surface: "#F6ECEE",
      accent: "#7A3E48",
      dark: "#261B1D"
    }
  },
  {
    id: "evento-primavera-juventud",
    type: "evento",
    name: "Día de la Primavera y la Juventud",
    dateRangeLabel: "20 al 26 de septiembre (Central: 23 sep)",
    climateVibe: "Explosión de tonos pastel, margaritas y diseños frescos juveniles.",
    heroBadge: "BIENVENIDA PRIMAVERA · MARGARITAS & TONOS PASTEL",
    featuredDesigns: [
      "Margaritas Minimalistas",
      "Explosión Pastel & Butter Yellow",
      "Micro French Multicolor",
      "Aura Nails Primaveral"
    ],
    colors: {
      primary: "#E58F9E",
      bg: "#FFFEFA",
      surface: "#FBF4E9",
      accent: "#6BBF99",
      dark: "#241E20"
    }
  },
  {
    id: "evento-mes-morado",
    type: "evento",
    name: "Mes Morado · Tradición Limeña",
    dateRangeLabel: "1 al 17 de octubre",
    climateVibe: "Tradición de octubre en Lima con tonos lila, violeta suave y amatista.",
    heroBadge: "OCTUBRE EN LIMA · COLECCIÓN LILA & AMATISTA",
    featuredDesigns: [
      "Lila Pastel & Violeta Suave",
      "Efecto Cromo Amatista",
      "Francesa Lavanda",
      "Cat Eye Magnético Violeta"
    ],
    colors: {
      primary: "#7E52A0",
      bg: "#FCFAFD",
      surface: "#F3EDF7",
      accent: "#522B72",
      dark: "#1E1624"
    }
  },
  {
    id: "evento-halloween-criolla",
    type: "evento",
    name: "Halloween & Día de la Canción Criolla",
    dateRangeLabel: "18 de octubre al 1 de noviembre (Central: 31 oct)",
    climateVibe: "Pico alto de reservas: Spooky Aesthetic minimalista y gala nocturna.",
    heroBadge: "EDICIÓN 31 OCT · SPOOKY CHIC & GALA NOCTURNA",
    featuredDesigns: [
      "Cat Eye Oscuro & Terciopelo",
      "Negro Espejo & Naranja Quemado",
      "Efecto Vampiro / Sangre Bordo",
      "Micro Telarañas & Gala Nocturna"
    ],
    colors: {
      primary: "#C85A32", // Naranja quemado elegante
      bg: "#FAF6F3",
      surface: "#F1E8E2",
      accent: "#4A154B",  // Morado oscuro nocturno
      dark: "#181216"
    }
  },
  {
    id: "evento-graduaciones-bodas",
    type: "evento",
    name: "Temporada de Graduaciones y Bodas",
    dateRangeLabel: "10 al 30 de noviembre",
    climateVibe: "Diseños elegantes para ocasiones especiales en Lima: novias, graduaciones y eventos.",
    heroBadge: "TEMPORADA DE BODAS & GRADUACIONES · DISEÑOS EXCLUSIVOS",
    featuredDesigns: [
      "Efecto Perla (Chrome White)",
      "Baby Boomer Clásico de Novia",
      "Cristales Swarovski & Pedrería Fina",
      "Detalles en Dorado y Plata"
    ],
    colors: {
      primary: "#B89B72", // Champán dorado
      bg: "#FCFBF9",
      surface: "#F4F0EA",
      accent: "#8C7355",
      dark: "#211E1A"
    }
  },
  {
    id: "evento-navidad",
    type: "evento",
    name: "Navidad en el Atelier",
    dateRangeLabel: "1 al 25 de diciembre (Central: 24-25 dic)",
    climateVibe: "Rojo navideño, verde pino, dorado, nieve y uñas terciopelo velvet.",
    heroBadge: "EDICIÓN NAVIDAD · VELVET NAILS, ROJO & ORO",
    featuredDesigns: [
      "Efecto Terciopelo (Velvet Nails)",
      "Rojo Navideño & Lazos Coquette",
      "Verde Pino & Dorado Metálico",
      "Blanco Nieve & Glitter Fino"
    ],
    colors: {
      primary: "#9E2A2B", // Rojo navideño editorial
      bg: "#FBF9F7",
      surface: "#F3EDE6",
      accent: "#2D5A27",  // Verde pino
      dark: "#1B1616"
    }
  },
  {
    id: "evento-ano-nuevo",
    type: "evento",
    name: "Año Nuevo · Cábalas y Fiesta de Playa",
    dateRangeLabel: "26 de diciembre al 2 de enero (Central: 31 dic)",
    climateVibe: "Dorado, amarillo cábala peruana, plata metálico y sets para el Sur.",
    heroBadge: "EDICIÓN AÑO NUEVO · DORADO CÁBALA, GLITTER & PLAYA",
    featuredDesigns: [
      "Dorado & Amarillo Cábala Sutil",
      "Plateado Metálico & Chrome",
      "Full Glitter & Pedrería de Fiesta",
      "Sets Luminosos para Playa"
    ],
    colors: {
      primary: "#D4AF37", // Dorado cábala
      bg: "#FFFDF8",
      surface: "#F9F4E6",
      accent: "#8A6D1B",
      dark: "#1C1914"
    }
  }
];

export const ALL_LIMA_THEMES: LimaTheme[] = [...LIMA_SEASONS, ...LIMA_EVENTS];

/**
 * Evalúa la fecha en Lima y devuelve:
 * - activeEvent (Prioridad 1: si hoy cae dentro de un evento festivo)
 * - baseSeason (Prioridad 2: la estación astronómica actual del hemisferio sur)
 * - activeTheme (el evento si existe, o la estación base)
 */
export function detectAutoLimaTheme(date: Date = new Date()): {
  activeTheme: LimaTheme;
  baseSeason: LimaTheme;
  activeEvent: LimaTheme | null;
} {
  const m = date.getMonth() + 1; // 1..12
  const d = date.getDate();      // 1..31

  // 1. Determinar Estación Base (Hemisferio Sur - Lima)
  // Verano: 21 dic - 20 mar
  // Otoño: 21 mar - 20 jun
  // Invierno: 21 jun - 22 sep
  // Primavera: 23 sep - 20 dic
  let baseSeason = LIMA_SEASONS[0]; // Verano default
  if ((m === 3 && d >= 21) || m === 4 || m === 5 || (m === 6 && d <= 20)) {
    baseSeason = LIMA_SEASONS.find(s => s.id === "estacion-otono")!;
  } else if ((m === 6 && d >= 21) || m === 7 || m === 8 || (m === 9 && d <= 22)) {
    baseSeason = LIMA_SEASONS.find(s => s.id === "estacion-invierno")!;
  } else if ((m === 9 && d >= 23) || m === 10 || m === 11 || (m === 12 && d <= 20)) {
    baseSeason = LIMA_SEASONS.find(s => s.id === "estacion-primavera")!;
  } else {
    baseSeason = LIMA_SEASONS.find(s => s.id === "estacion-verano")!;
  }

  // 2. Determinar si hay un Evento Festivo Activo (Prioridad Alta)
  let eventId: string | null = null;

  if ((m === 12 && d >= 26) || (m === 1 && d <= 2)) {
    eventId = "evento-ano-nuevo";
  } else if (m === 1 && d >= 12 && d <= 19) {
    eventId = "evento-aniversario-lima";
  } else if (m === 2 && d >= 1 && d <= 15) {
    eventId = "evento-san-valentin";
  } else if (m === 2 && d >= 16) {
    eventId = "evento-carnavales";
  } else if (m === 3 && d >= 1 && d <= 9) {
    eventId = "evento-dia-mujer";
  } else if (m === 4 && d >= 1 && d <= 10) {
    eventId = "evento-semana-santa";
  } else if ((m === 4 && d >= 25) || (m === 5 && d <= 14)) {
    eventId = "evento-dia-madre";
  } else if (m === 7 && d >= 15 && d <= 30) {
    eventId = "evento-fiestas-patrias";
  } else if (m === 8 && d >= 24 && d <= 31) {
    eventId = "evento-santa-rosa";
  } else if (m === 9 && d >= 20 && d <= 26) {
    eventId = "evento-primavera-juventud";
  } else if (m === 10 && d >= 1 && d <= 17) {
    eventId = "evento-mes-morado";
  } else if ((m === 10 && d >= 18) || (m === 11 && d === 1)) {
    eventId = "evento-halloween-criolla";
  } else if (m === 11 && d >= 10 && d <= 30) {
    eventId = "evento-graduaciones-bodas";
  } else if (m === 12 && d >= 1 && d <= 25) {
    eventId = "evento-navidad";
  }

  const activeEvent = eventId ? LIMA_EVENTS.find(e => e.id === eventId) || null : null;

  return {
    activeTheme: activeEvent || baseSeason,
    baseSeason,
    activeEvent
  };
}

export function getActiveLimaThemeState(): {
  mode: "auto" | "manual";
  activeTheme: LimaTheme;
  baseSeason: LimaTheme;
  activeEvent: LimaTheme | null;
} {
  const auto = detectAutoLimaTheme();
  if (typeof window === "undefined") {
    return { mode: "auto", ...auto };
  }
  try {
    const raw = localStorage.getItem("samm_lima_theme_config");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.mode === "manual" && parsed.themeId) {
        const found = ALL_LIMA_THEMES.find(t => t.id === parsed.themeId);
        if (found) {
          return {
            mode: "manual",
            activeTheme: found,
            baseSeason: auto.baseSeason,
            activeEvent: auto.activeEvent
          };
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
  return { mode: "auto", ...auto };
}

export function applySeasonTheme(colors: { primary: string; bg: string; surface?: string; accent: string; dark: string }) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--rosewood-chrome", colors.primary);
  root.style.setProperty("--milky-almond", colors.bg);
  root.style.setProperty("--berry-glaze", colors.accent);
  root.style.setProperty("--espresso-ink", colors.dark);
  root.style.setProperty("--canvas-vanilla", colors.bg);
  root.style.setProperty("--butter-accent", colors.primary);
  root.style.setProperty("--burgundy-accent", colors.accent);
  root.style.setProperty("--ink-primary", colors.dark);
  root.style.setProperty("--theme-surface", colors.surface || colors.bg);
  document.body.style.backgroundColor = colors.bg;
  document.body.style.color = colors.dark;
}
