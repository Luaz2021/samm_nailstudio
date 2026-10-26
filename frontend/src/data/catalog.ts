export interface ServiceItem {
  id: string;
  name: string;
  category: "manicura" | "pedicura" | "nailart" | "acrilico";
  price: number;
  duration: number;
  desc: string;
  tag?: string;
  imgUrl: string;
}

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
export const DEFAULT_ABOUT_PHOTO = "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=85";

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
    title: "Kapping Gel & Rubber Base",
    category: "Salud Ungueal",
    time: "2 horas",
    imgUrl: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80",
    desc: "Refuerzo elástico invisible que detiene quiebres y permite el crecimiento natural de la uña."
  },
  {
    id: "home-2",
    title: "Manicura Rusa & Semipermanente",
    category: "Técnica Anatómica",
    time: "2 horas",
    imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
    desc: "Limpieza profunda de cutículas con microfresas de diamante y esmaltado bajo pliegue."
  },
  {
    id: "home-3",
    title: "Extensiones Soft Gel & Glazed",
    category: "Alta Durabilidad",
    time: "2h 30m",
    imgUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80",
    desc: "Tips premoldeados de gel con acabado perlado cromo y resistencia total al agua."
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
    url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=85",
    category: "kapping",
    title: "Kapping Rubber & Nivelación",
    tag: "Salud Ungueal",
    desc: "Refuerzo anatómico con brillo espejo y cutículas perfectas sin limado agresivo.",
    likes: 142
  },
  {
    id: "g2",
    url: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=85",
    category: "glazed",
    title: "Glazed Donut Cromo Hailey Bieber",
    tag: "Efecto Cromo",
    desc: "Polvo de perla cromo sobre base milky almond con destellos según la luz solar.",
    likes: 218
  },
  {
    id: "g3",
    url: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=1000&q=85",
    category: "rusa",
    title: "Manicura Rusa Anatómica Pura",
    tag: "Técnica Alemana",
    desc: "Fresado milimétrico con brocas de diamante y esmaltado bajo pliegue que dura 21+ días.",
    likes: 189
  },
  {
    id: "g4",
    url: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=1000&q=85",
    category: "softgel",
    title: "Soft Gel Tips & French Micro",
    tag: "Estructura Ligera",
    desc: "Largo almendrado en gel premoldeado sin agresiones ni peso para la uña natural.",
    likes: 167
  },
  {
    id: "g5",
    url: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1000&q=85",
    category: "diseño",
    title: "Baby Boomer & Toques Dorados",
    tag: "Nail Art Minimal",
    desc: "Degradado suave con láminas de pan de oro encapsulado en acabado cristalino.",
    likes: 245
  },
  {
    id: "g6",
    url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",
    category: "glazed",
    title: "Espresso Glaze & Cat Eye Magnético",
    tag: "Tendencia Velvet",
    desc: "Partículas magnéticas orientadas bajo luz LED con reflejos de terciopelo café moka.",
    likes: 198
  },
  {
    id: "g7",
    url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1000&q=85",
    category: "rusa",
    title: "Clean Girl Nails & Nude Translúcido",
    tag: "Acabado Natural",
    desc: "Esmaltado lechoso semitransparente que resalta la salud y luminosidad natural.",
    likes: 173
  },
  {
    id: "g8",
    url: "https://images.unsplash.com/photo-1583001809873-a128495da465?auto=format&fit=crop&w=1000&q=85",
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
    imgUrl: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=1200&q=85"
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
    imgUrl: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=1200&q=85"
  },
  {
    id: "care-3",
    num: "03",
    tag: "SALUD UNGUEAL",
    title: "Jamás arranques el producto levantado",
    short: "Si se desprende un lateral, jamás lo jales ni lo muerdas.",
    detail: "Arrancar el gel a la fuerza arranca hasta 4 capas dorsales de queratina de tu uña biológica viva, volviéndola delgada como papel y dolorosa al calor de la lámpara UV/LED.",
    tip: "Protégelo con una vendita adhesiva limpia hasta acudir a la cabina.",
    impact: "Conserva el 100% del grosor natural de tu lámina ungueal",
    imgUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1200&q=85"
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
    imgUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=85"
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
    imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=85"
  }
];

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "kapping-rubber",
    name: "Kapping Gel & Rubber Base Fortalecedor",
    category: "manicura",
    price: 70,
    duration: 120,
    desc: "Capa protectora flexible de base Rubber sobre la uña natural para frenar roturas, estrías y permitir que crezca sana sin necesidad de tips. Incluye manicura anatómica y esmaltado nivelado.",
    tag: "Salud Ungueal",
    imgUrl: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "manicura-rusa-semi",
    name: "Manicura Rusa Combinada & Semipermanente",
    category: "manicura",
    price: 60,
    duration: 120,
    desc: "Limpieza anatómica profunda de cutícula con fresas de diamante alemanas y esmaltado bajo cutícula de máxima precisión para alargar el crecimiento impecable por más de 3 semanas.",
    tag: "Más Solicitado",
    imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "soft-gel-tips",
    name: "Extensiones Soft Gel & Full Cover Tips",
    category: "acrilico",
    price: 110,
    duration: 150,
    desc: "Extensiones ligeras de gel premoldeado que se adhieren con base rubber sin dañar tu lecho ungueal. Resultado natural, resistente al agua y sin limados agresivos.",
    tag: "Largo & Estructura",
    imgUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "spa-pedicura-rusa",
    name: "Pedicura Rusa Anatómica & Spa Jelly",
    category: "pedicura",
    price: 85,
    duration: 120,
    desc: "Tratamiento podo-estético intensivo. Retiro de durezas con disco podológico, exfoliación aromática, hidratación profunda y esmaltado semipermanente de larga duración.",
    tag: "Bienestar",
    imgUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "reforzamiento-biab",
    name: "BIAB Builder in a Bottle & Reparación",
    category: "manicura",
    price: 80,
    duration: 120,
    desc: "Gel constructor en botella de alta viscosidad para corregir uñas mordidas, curvadas hacia abajo o dañadas tras acrílicos anteriores.",
    tag: "Tratamiento",
    imgUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "polygel-esculpido",
    name: "Esculpido Dual Polygel de Precisión",
    category: "acrilico",
    price: 130,
    duration: 160,
    desc: "La combinación perfecta entre acrílico y gel: fuerza extrema sin olor a monómero y máxima ligereza en tus manos.",
    tag: "Alta Resistencia",
    imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80"
  }
];

export const DEFAULT_ARTICLES: ArticleItem[] = [
  {
    id: "kapping-vs-acrilico",
    title: "Kapping Rubber vs Acrílico Tradicional: ¿Cuál necesita tu uña?",
    category: "Salud Ungueal",
    date: "Guía de Estudio",
    readTime: "3 min de lectura",
    imgUrl: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1000&q=85",
    desc: "Descubre cómo el refuerzo flexible de base Rubber permite que tus uñas respiren y crezcan largas sin desprendimientos ni limados agresivos.",
    content: {
      intro: "Durante años, el acrílico fue la única alternativa para lucir uñas largas y resistentes. Sin embargo, en el atelier de Samm apostamos por la preservación de la lámina biológica natural mediante técnicas europeas modernas.",
      points: [
        {
          subtitle: "1. Flexibilidad y amortiguación biológica",
          text: "La base Rubber posee una formulación con alta elasticidad molecular. Ante un golpe o palanca accidental, la uña flexiona en vez de quebrarse en el lecho vivo."
        },
        {
          subtitle: "2. Adherencia sin limado destructivo",
          text: "No es necesario limar agresivamente la queratina natural para que el gel ancle. Una microporosidad suave es suficiente para garantizar más de 3 semanas de retención intacta."
        },
        {
          subtitle: "3. Nivelación del Ápice Anatómico",
          text: "Se moldea una gota arquitectónica en el tercio medio de la uña para reforzar el centro de gravedad mientras tu propia uña gana longitud de manera saludable."
        }
      ],
      conclusion: "Si tus uñas son quebradizas, se abren en capas o buscas recuperar el grosor natural tras años de acrílico tradicional, el Kapping Rubber es tu mejor opción clínica."
    }
  },
  {
    id: "tendencias-glazed-cromo",
    title: "Tendencias de Primavera-Verano: Tonos Glazed y Cromo Perlado",
    category: "Lookbook Editorial",
    date: "Colección 2026",
    readTime: "4 min de lectura",
    imgUrl: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1000&q=85",
    desc: "Inspirado en el minimalismo de Nueva York y Madrid: destellos sutiles sobre bases milky y nude con acabados espejo de alta durabilidad.",
    content: {
      intro: "El maximalismo recargado da paso a la estética 'Clean Girl Aesthetic' de alta gama: uñas cortas a medianas, formas almendradas precisas y efectos de luz que parecen joyas líquidas.",
      points: [
        {
          subtitle: "1. Polvos de perla ultrafina",
          text: "Aplicados sobre una base translúcida Milky Almond o Nude Blush antes de sellar con Top Coat sin capa de dispersión, generando un halo nacarado que cambia según el ángulo del sol."
        },
        {
          subtitle: "2. Micro French invertido y acentos metálicos",
          text: "Líneas de 1 milímetro en plata líquida o pan de oro 24K que abrazan la cutícula en lugar de la punta, alargando visualmente los dedos."
        },
        {
          subtitle: "3. Velvet Cat Eye en tonos neutros",
          text: "Lejos de los colores oscuros de invierno, el efecto ojo de gato se reinventa en bases beige, champán y rosa empolvado para el día a día."
        }
      ],
      conclusion: "Un estilo versátil que combina impecablemente tanto para una reunión ejecutiva como para un fin de semana en la playa."
    }
  },
  {
    id: "protocolo-esterilizacion-autoclave",
    title: "Protocolo de Esterilización: Por qué exigimos autoclave en cada sesión",
    category: "Seguridad Clínica",
    date: "Transparencia Samm",
    readTime: "2 min de lectura",
    imgUrl: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=1000&q=85",
    desc: "Nuestro instrumental metálico pasa por desinfección enzimática y esterilización por calor húmedo en bolsas grado quirúrgico que se abren delante de ti.",
    content: {
      intro: "Tu salud no es negociable. En muchos salones convencionales, las fresas y alicates solo se rocían con alcohol al 70%. En samm. NAIL STUDIO aplicamos estándares hospitalarios.",
      points: [
        {
          subtitle: "Paso 1: Desinfección enzimática por inmersión",
          text: "Elimina residuos biológicos microscópicos en tinas ultrasónicas con detergente bactericida de grado médico."
        },
        {
          subtitle: "Paso 2: Ensobrado hermético individual",
          text: "Cada set de instrumental (fresas de diamante, empujador y tijera anatómica) se sella en bolsas con indicador químico termosensible."
        },
        {
          subtitle: "Paso 3: Autoclave a 134°C bajo presión",
          text: "El calor húmedo destruye al 100% esporas, hongos y virus. La bolsa cambia de color de rosa a marrón oscuro y se abre exclusivamente frente a tus ojos al iniciar tu turno."
        }
      ],
      conclusion: "Disfruta de tu sesión de belleza con la absoluta tranquilidad de que cada herramienta está 100% estéril y virgen para tus manos."
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
      "Pedicura Rusa de Playa"
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
      "Manicura Rusa & Spa Hidratante",
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
    climateVibe: "Gala y alta costura en Lima: novias, promociones y fiestas de etiqueta.",
    heroBadge: "TEMPORADA DE BODAS & GALA · ALTA COSTURA UNGUEAL",
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
