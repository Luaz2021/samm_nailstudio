const DEFAULT_HERO_BG = "https://images.unsplash.com/photo-1632345031435-8727f6897d53?auto=format&fit=crop&w=1920&q=85";

const DEFAULT_SERVICES = [
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

const DEFAULT_ARTICLES = [
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
      intro: "El maximalismo recargado da paso a la estética 'Clean Girl Aesthetic' de alta gama.",
      points: [
        {
          subtitle: "1. Polvos de perla ultrafina",
          text: "Aplicados sobre una base translúcida Milky Almond o Nude Blush."
        }
      ],
      conclusion: "Un estilo versátil que combina impecablemente."
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
      intro: "Tu salud no es negociable. En muchos salones convencionales, las fresas y alicates solo se rocían con alcohol al 70%.",
      points: [
        {
          subtitle: "Paso 1: Desinfección enzimática por inmersión",
          text: "Elimina residuos biológicos microscópicos."
        }
      ],
      conclusion: "Disfruta de tu sesión de belleza con la absoluta tranquilidad de que cada herramienta está 100% estéril."
    }
  }
];

const DEFAULT_SEASONS = [
  {
    id: "verano",
    name: "Verano Lima & Costa Verde",
    badge: "ACTIVA EN VIVO",
    description: "Paleta luminosa con tonos arena cálidos, terracota rosewood y acentos glazed solares.",
    colors: {
      primary: "#C8927B",
      bg: "#FBF8F6",
      accent: "#84323E",
      dark: "#231C1A"
    },
    isActive: true
  },
  {
    id: "otono",
    name: "Otoño Velvet & Espresso",
    badge: "TEMPORADA MAYO-JULIO",
    description: "Tonos intensos de café moka, chocolate caliente, burgundy oscuro y acabados velvet mate.",
    colors: {
      primary: "#A36655",
      bg: "#F6F1EC",
      accent: "#5C262E",
      dark: "#1A1513"
    },
    isActive: false
  },
  {
    id: "primavera",
    name: "Primavera Bloom & Pastel",
    badge: "TEMPORADA SETIEMBRE",
    description: "Tonos blush gel suaves, butter cream lechoso y degradados aura nails en lila y durazno.",
    colors: {
      primary: "#D9A094",
      bg: "#FAF7F5",
      accent: "#B85D6F",
      dark: "#2A201C"
    },
    isActive: false
  },
  {
    id: "fiestas_peru",
    name: "Fiestas Patrias Perú & San Valentín",
    badge: "EVENTO ESPECIAL PERÚ",
    description: "Edición conmemorativa con Rouge Couture brillante, detalles pan de oro y promos especiales.",
    colors: {
      primary: "#B8292F",
      bg: "#FAF6F6",
      accent: "#D4AF37",
      dark: "#1D1414"
    },
    isActive: false
  }
];

module.exports = {
  DEFAULT_HERO_BG,
  DEFAULT_SERVICES,
  DEFAULT_ARTICLES,
  DEFAULT_SEASONS
};
