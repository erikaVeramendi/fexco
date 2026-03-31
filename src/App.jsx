import { useState, useEffect, useRef } from "react";

const ICONS = {
  logica: ({ size = 32, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="11" height="11" rx="2" stroke={color} strokeWidth="1.5" fill="none"/>
      <rect x="18" y="3" width="11" height="11" rx="2" stroke={color} strokeWidth="1.5" fill="none"/>
      <rect x="3" y="18" width="11" height="11" rx="2" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="23.5" cy="23.5" r="5.5" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="21" y1="23.5" x2="26" y2="23.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="23.5" y1="21" x2="23.5" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="7" y1="7.5" x2="11" y2="7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="5.5" x2="9" y2="9.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20.5" y1="7.5" x2="26.5" y2="7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="7" y1="23" x2="11" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="11" y1="23" x2="7" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  linguistica: ({ size = 32, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 6C4 4.9 4.9 4 6 4H26C27.1 4 28 4.9 28 6V20C28 21.1 27.1 22 26 22H18L12 28V22H6C4.9 22 4 21.1 4 20V6Z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <line x1="9" y1="10" x2="23" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="14" x2="20" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="18" x2="16" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  visual: ({ size = 32, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="16" cy="16" r="4" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="4" y1="16" x2="12" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="16" x2="28" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 10 Q16 4 24 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M8 22 Q16 28 24 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  musical: ({ size = 32, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 24V8L26 5V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="9" cy="24" r="3" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="23" cy="21" r="3" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="12" y1="13" x2="26" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  kinestesica: ({ size = 32, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="6" r="2.5" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M16 9V16L12 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M16 16L20 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M10 13H22" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M12 22L10 28" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M20 22L22 28" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  interpersonal: ({ size = 32, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="4" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="22" cy="10" r="4" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M4 26C4 22.7 6.7 20 10 20H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M28 26C28 22.7 25.3 20 22 20H18" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M14 23L16 21L18 23" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <line x1="16" y1="21" x2="16" y2="28" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  intrapersonal: ({ size = 32, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="16" cy="16" r="7" stroke={color} strokeWidth="1.5" strokeDasharray="3 2" fill="none"/>
      <circle cx="16" cy="16" r="2.5" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="16" y1="4" x2="16" y2="7" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="16" y1="25" x2="16" y2="28" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="4" y1="16" x2="7" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="25" y1="16" x2="28" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  naturalista: ({ size = 32, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 28V14" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M16 14C16 14 8 12 6 5C6 5 14 4 18 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M16 18C16 18 22 15 26 8C26 8 19 6 15 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M10 28H22" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  brain: ({ size = 32, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 6C16 6 14 4 11 4C8 4 5 6.5 5 10C5 11.5 5.5 13 6.5 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M16 6C16 6 18 4 21 4C24 4 27 6.5 27 10C27 11.5 26.5 13 25.5 14" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M6.5 14C5 15 4 16.5 4 18.5C4 21 6 23 8 23.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M25.5 14C27 15 28 16.5 28 18.5C28 21 26 23 24 23.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M8 23.5C8 26 10 28 12 28C13.5 28 14.5 27 15 26" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M24 23.5C24 26 22 28 20 28C18.5 28 17.5 27 17 26" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M15 26C15 26.5 15.5 27 16 27C16.5 27 17 26.5 17 26" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M16 6V27" stroke={color} strokeWidth="1" strokeLinecap="round" strokeDasharray="1.5 2" fill="none"/>
      <path d="M10 13C10 13 12 16 16 16C20 16 22 13 22 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M9 19C11 18 13 19 14 20" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <path d="M23 19C21 18 19 19 18 20" stroke={color} strokeWidth="1.2" strokeLinecap="round" fill="none"/>
    </svg>
  ),
};

const INTELLIGENCES = {
  logica:        { name: "Lógico-Matemática",  iconKey: "logica",        color: "#6366F1", glow: "rgba(99,102,241,0.45)"   },
  linguistica:   { name: "Lingüística",         iconKey: "linguistica",   color: "#38BDF8", glow: "rgba(56,189,248,0.45)"   },
  visual:        { name: "Visual-Espacial",      iconKey: "visual",        color: "#A78BFA", glow: "rgba(167,139,250,0.45)"  },
  musical:       { name: "Musical",              iconKey: "musical",       color: "#F472B6", glow: "rgba(244,114,182,0.45)"  },
  kinestesica:   { name: "Cinético-Corporal",    iconKey: "kinestesica",   color: "#FBBF24", glow: "rgba(251,191,36,0.45)"   },
  interpersonal: { name: "Interpersonal",        iconKey: "interpersonal", color: "#34D399", glow: "rgba(52,211,153,0.45)"   },
  intrapersonal: { name: "Intrapersonal",        iconKey: "intrapersonal", color: "#F87171", glow: "rgba(248,113,113,0.45)"  },
  naturalista:   { name: "Naturalista",          iconKey: "naturalista",   color: "#4ADE80", glow: "rgba(74,222,128,0.45)"   },
};

function IntelIcon({ iconKey, size = 32, color = "currentColor", style = {} }) {
  const Icon = ICONS[iconKey];
  if (!Icon) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", ...style }}>
      <Icon size={size} color={color} />
    </span>
  );
}

const MESAS = {
  logica: [
    { tipo: "Inductiva",    herramienta: "ChatGPT + Notion",             desc: "Lógico-matemática aplicada" },
    { tipo: "Deductiva",    herramienta: "Claude 3.5 Sonnet + Wolfram Alpha", desc: "Cálculo y lógica pura" },
    { tipo: "Convergente",  herramienta: "Claude 3.5 Alpha",             desc: "Análisis enfocado" },
    { tipo: "Divergente",   herramienta: "ChatGPT",                      desc: "Lluvia de ideas lógicas" },
    { tipo: "Creativa",     herramienta: "ChatGPT",                      desc: "Modelado de soluciones" },
  ],
  linguistica: [
    { tipo: "Inductiva",    herramienta: "Perplexity",                   desc: "Investigación avanzada" },
    { tipo: "Deductiva",    herramienta: "DALL-E / Midjourney vía texto", desc: "Generación de imágenes" },
    { tipo: "Convergente",  herramienta: "Wolfram a Cattalho",           desc: "Análisis lingüístico" },
    { tipo: "Divergente",   herramienta: "ChatGPT + Notion",             desc: "Redacción y lluvia de ideas" },
    { tipo: "Creativa",     herramienta: "ChatGPT + Notion",             desc: "Redacción creativa" },
  ],
  visual: [
    { tipo: "Inductiva",    herramienta: "DALL-E + Notion",              desc: "Pensamiento espacial" },
    { tipo: "Deductiva",    herramienta: "Prompt Engineering",           desc: "Redacción de imágenes" },
    { tipo: "Convergente",  herramienta: "Gestión lingüística-visual",   desc: "Síntesis visual" },
    { tipo: "Divergente",   herramienta: "Redacción visual",             desc: "Lluvia de ideas visuales" },
    { tipo: "Creativa",     herramienta: "Midjourney / Adobe Firefly",   desc: "Generación de imágenes" },
  ],
  musical: [
    { tipo: "Inductiva",    herramienta: "Midjourney",                   desc: "Inspiración visual para música" },
    { tipo: "Deductiva",    herramienta: "Suno AI",                      desc: "Composición musical" },
    { tipo: "Convergente",  herramienta: "Luma AI",                      desc: "Estructura sonora" },
    { tipo: "Divergente",   herramienta: "Avera AI",                     desc: "Exploración de ritmos" },
    { tipo: "Creativa",     herramienta: "Suno AI",                      desc: "Composición musical avanzada" },
  ],
  kinestesica: [
    { tipo: "Inductiva",    herramienta: "Midjourney",                   desc: "Diseño de movimiento" },
    { tipo: "Deductiva",    herramienta: "ChatGPT + Notion",             desc: "Rutinas y protocolos" },
    { tipo: "Convergente",  herramienta: "Luma AI",                      desc: "Captura de movimiento / 3D" },
    { tipo: "Divergente",   herramienta: "Asana + Luma AI",              desc: "Gestión de flujos físicos" },
    { tipo: "Creativa",     herramienta: "Asana AI",                     desc: "Planificación de acción" },
  ],
  interpersonal: [
    { tipo: "Inductiva",    herramienta: "IA social",                    desc: "Cálculo matemático social" },
    { tipo: "Deductiva",    herramienta: "Gong",                         desc: "Análisis de reuniones" },
    { tipo: "Convergente",  herramienta: "Suno",                         desc: "Composición colaborativa" },
    { tipo: "Divergente",   herramienta: "ChatGPT + Notion",             desc: "Gestión de equipos" },
    { tipo: "Creativa",     herramienta: "Avera AI",                     desc: "Liderazgo con IA" },
  ],
  intrapersonal: [
    { tipo: "Inductiva",    herramienta: "IA de bienestar",              desc: "Equipos sonrientes" },
    { tipo: "Deductiva",    herramienta: "Avera AI",                     desc: "Análisis de metas" },
    { tipo: "Convergente",  herramienta: "IA de productividad",          desc: "Objetivos y foco" },
    { tipo: "Divergente",   herramienta: "ChatGPT",                      desc: "Diario reflexivo con IA" },
    { tipo: "Creativa",     herramienta: "Runway",                       desc: "Elaboración de visiones personales" },
  ],
  naturalista: [
    { tipo: "Inductiva",    herramienta: "Perplexity",                   desc: "Investigación ecológica" },
    { tipo: "Deductiva",    herramienta: "Patrones de la naturaleza",    desc: "Organización musical" },
    { tipo: "Convergente",  herramienta: "Avera AI",                     desc: "Sostenibilidad" },
    { tipo: "Divergente",   herramienta: "Tableau",                      desc: "Visualización de datos ambientales" },
    { tipo: "Creativa",     herramienta: "AI Mode: LIFE ON",             desc: "Proyectos de bio-innovación" },
  ],
};

// ─── COLORES DIFERENCIADOS POR TIPO DE MESA ───────────────────────────────────
const MESA_COLORS = {
  Inductiva:   {
    bg:     "rgba(79,70,229,0.12)",
    border: "rgba(79,70,229,0.30)",
    label:  "#6366F1",
    text:   "#E0E7FF",
    badge:  "rgba(99,102,241,0.20)",
    glow:   "rgba(99,102,241,0.25)",
  },
  Deductiva:   {
    bg:     "rgba(14,165,233,0.12)",
    border: "rgba(14,165,233,0.30)",
    label:  "#38BDF8",
    text:   "#E0F2FE",
    badge:  "rgba(56,189,248,0.20)",
    glow:   "rgba(56,189,248,0.25)",
  },
  Convergente: {
    bg:     "rgba(139,92,246,0.12)",
    border: "rgba(139,92,246,0.30)",
    label:  "#A78BFA",
    text:   "#EDE9FE",
    badge:  "rgba(167,139,250,0.20)",
    glow:   "rgba(167,139,250,0.25)",
  },
  Divergente:  {
    bg:     "rgba(236,72,153,0.12)",
    border: "rgba(236,72,153,0.30)",
    label:  "#F472B6",
    text:   "#FCE7F3",
    badge:  "rgba(244,114,182,0.20)",
    glow:   "rgba(244,114,182,0.25)",
  },
  Creativa:    {
    bg:     "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.30)",
    label:  "#FBBF24",
    text:   "#FEF3C7",
    badge:  "rgba(251,191,36,0.20)",
    glow:   "rgba(251,191,36,0.25)",
  },
};

const PROFILES = {
  logica: {
    desc: "Tu mente funciona como un procesador: detectas patrones, razonas con precisión y disfrutas de los desafíos lógicos.",
    perfil: "Análisis y cálculo predictivo. Resolución de problemas y modelado lógico.",
    ai: "Claude 3.5 / Análisis Predictivo",
    aiDesc: "Potencia tus cálculos y análisis con modelos de lenguaje avanzados. Tu perfil analítico es el complemento perfecto para esta IA."
  },
  linguistica: {
    desc: "Las palabras son tu superpoder. Comunicas ideas con claridad, tienes facilidad para aprender idiomas y disfrutas de la lectura.",
    perfil: "IA generativa de texto (LLM). Creación de contenido y storytelling.",
    ai: "Claude / GPT-4 Turbo",
    aiDesc: "Genera contenido, escribe historias y comunica con precisión. Las IA generativas amplificarán tu creatividad lingüística."
  },
  visual: {
    desc: "Piensas en imágenes y espacios. Tu mente visualiza soluciones antes de escribirlas. Sobresales en diseño y arte.",
    perfil: "IA generativa de imágenes. Diseño visual y creatividad aumentada.",
    ai: "Midjourney / DALL-E 3",
    aiDesc: "Crea y explora mundos visuales con IA generativa. Transforma tus visiones mentales en imágenes reales."
  },
  musical: {
    desc: "Tu cerebro está sintonizado con el ritmo, la melodía y los patrones sonoros. Procesas el mundo a través del sonido.",
    perfil: "IA de síntesis y composición. Creación sonora y producción algorítmica.",
    ai: "Suno / Udio",
    aiDesc: "Compón música, crea beats y explora la creatividad sonora con inteligencia artificial avanzada."
  },
  kinestesica: {
    desc: "Aprendes haciendo. Tu inteligencia vive en tus manos y tu cuerpo. Destacas en actividades físicas y manualidades.",
    perfil: "IA aplicada al movimiento. Interacción dinámica y prototipado físico.",
    ai: "Robótica + ML / Simuladores",
    aiDesc: "Crea con tus manos potenciada por IA. Desde prototipado físico hasta control de sistemas con aprendizaje automático."
  },
  interpersonal: {
    desc: "Eres un conector de personas. Entiendes emociones y motivaciones. Lideras y construyes comunidades naturalmente.",
    perfil: "IA colaborativa multiagente. Simulación social y trabajo en equipo.",
    ai: "Asana / Slack IA",
    aiDesc: "Facilita el trabajo en equipo y la gestión de proyectos. Las IA colaborativas optimizan tu liderazgo natural."
  },
  intrapersonal: {
    desc: "Tu mayor laboratorio eres tú mismo. Tienes profunda conciencia de tus emociones, metas y procesos mentales.",
    perfil: "IA de reflexión y orientación. Autoconocimiento y orientación vocacional.",
    ai: "Claude / Woebot",
    aiDesc: "Explora ideas, emociones y crecimiento personal con IA reflexiva. Journaling potenciado por inteligencia artificial."
  },
  naturalista: {
    desc: "Observas patrones en la naturaleza. Comprendes sistemas complejos y clasificas información ambiental con facilidad.",
    perfil: "IA de análisis de entorno. Clasificación de datos y análisis contextual.",
    ai: "TensorFlow / Análisis Ecológico",
    aiDesc: "Analiza datos ambientales y patrones naturales. La IA ecológica amplifica tu capacidad de observación sistemática."
  },
};

const QUESTIONS = [
  {
    text: "Si tienes que resolver un problema importante, ¿qué haces primero?",
    options: [
      { text: "Analizo datos, números o patrones", key: "logica" },
      { text: "Lo explico con palabras o lo escribo", key: "linguistica" },
      { text: "Hago un dibujo o esquema mental", key: "visual" },
      { text: "Hablo con alguien para entender mejor", key: "interpersonal" },
    ],
  },
  {
    text: "¿Qué actividad te gusta más en tus ratos libres?",
    options: [
      { text: "Resolver acertijos o juegos de ingenio", key: "logica" },
      { text: "Escribir, leer o debatir ideas", key: "linguistica" },
      { text: "Diseñar, dibujar o editar fotos", key: "visual" },
      { text: "Escuchar música o crear ritmos", key: "musical" },
    ],
  },
  {
    text: "Cuando aprendes algo nuevo, prefieres:",
    options: [
      { text: "Ver cómo funciona la lógica detrás", key: "logica" },
      { text: "Ver imágenes, gráficos o videos", key: "visual" },
      { text: "Practicar haciendo algo físico", key: "kinestesica" },
      { text: "Observar cómo encaja en la naturaleza", key: "naturalista" },
    ],
  },
  {
    text: "En un grupo de trabajo, tu rol suele ser:",
    options: [
      { text: "El que comunica y explica las ideas", key: "linguistica" },
      { text: "El que motiva y conecta al equipo", key: "interpersonal" },
      { text: "El que reflexiona sobre la estrategia", key: "intrapersonal" },
      { text: "El que organiza el movimiento y acción", key: "kinestesica" },
    ],
  },
  {
    text: "¿Qué te llama más la atención de un nuevo entorno?",
    options: [
      { text: "El orden y la estructura del lugar", key: "logica" },
      { text: "Los sonidos, música o ambiente sonoro", key: "musical" },
      { text: "La flora, fauna o elementos naturales", key: "naturalista" },
      { text: "Las personas y cómo interactúan", key: "interpersonal" },
    ],
  },
  {
    text: "Si pudieras tener un superpoder, ¿cuál elegirías?",
    options: [
      { text: "Memoria perfecta para textos y frases", key: "linguistica" },
      { text: "Habilidad física y agilidad extrema", key: "kinestesica" },
      { text: "Conocimiento profundo de tu mente", key: "intrapersonal" },
      { text: "Comprender el lenguaje de la naturaleza", key: "naturalista" },
    ],
  },
  {
    text: "Al tomar una decisión difícil, confías más en:",
    options: [
      { text: "El análisis de pros y contras", key: "logica" },
      { text: "Tu intuición y paz interior", key: "intrapersonal" },
      { text: "Lo que dicen tus mentores o amigos", key: "interpersonal" },
      { text: "Cómo se siente el ritmo del proyecto", key: "musical" },
    ],
  },
  {
    text: "Te sientes más cómodo/a trabajando con:",
    options: [
      { text: "Herramientas de diseño y dibujo", key: "visual" },
      { text: "Instrumentos o software de sonido", key: "musical" },
      { text: "Tus propias manos y movimiento", key: "kinestesica" },
      { text: "Sistemas biológicos o ambientales", key: "naturalista" },
    ],
  },
  {
    text: "¿Qué tipo de libros o contenido prefieres?",
    options: [
      { text: "Novelas, poemas o ensayos", key: "linguistica" },
      { text: "Guías visuales o libros de arte", key: "visual" },
      { text: "Biografías de personas inspiradoras", key: "interpersonal" },
      { text: "Libros de meditación y psicología", key: "intrapersonal" },
    ],
  },
  {
    text: "¿Cuál de estos es tu mayor talento?",
    options: [
      { text: "Encontrar errores en un sistema", key: "logica" },
      { text: "Recordar melodías con facilidad", key: "musical" },
      { text: "Coordinar movimientos difíciles", key: "kinestesica" },
      { text: "Categorizar y organizar elementos", key: "naturalista" },
    ],
  }
];

const LETTERS = ["A", "B", "C", "D"];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { width: 100%; height: 100%; overflow-x: hidden; }

  .mit-root {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(135deg, #0F0E0A 0%, #1A1512 100%);
    width: 100vw; min-height: 100vh;
    color: #F5E6D0; overflow-x: hidden; position: relative;
  }

  .aurora { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
  .aurora-blob {
    position: absolute; border-radius: 50%;
    filter: blur(100px); opacity: 0.15;
    animation: drift linear infinite;
  }
  @keyframes drift {
    0%   { transform: translate(0,0) scale(1); }
    33%  { transform: translate(40px,-25px) scale(1.08); }
    66%  { transform: translate(-25px,20px) scale(0.92); }
    100% { transform: translate(0,0) scale(1); }
  }

  .grid-overlay {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(255,87,34,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,87,34,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
  }

  .mit-container {
    position: relative; z-index: 1; width: 100%; min-height: 100vh;
    display: flex; align-items: stretch;
  }

  .side-panel {
    width: 40%; min-height: 100vh;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    padding: 3rem; position: sticky; top: 0;
    border-right: 1px solid rgba(255,87,34,0.12);
    background: rgba(255,87,34,0.02); backdrop-filter: blur(4px);
  }

  .side-brain-wrap {
    width: 140px; height: 140px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 2rem;
    animation: floatBrain 4s ease-in-out infinite;
    filter: drop-shadow(0 0 40px rgba(255,87,34,0.5));
  }

  @keyframes floatBrain {
    0%,100% { transform: translateY(0) rotate(-2deg); }
    50%      { transform: translateY(-16px) rotate(2deg); }
  }

  .side-badge {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 10px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: #FF5722;
    border: 1px solid rgba(255,87,34,0.3); background: rgba(255,87,34,0.1);
    padding: 8px 18px; border-radius: 50px; margin-bottom: 1.5rem;
  }
  .side-badge::before {
    content: ''; width: 6px; height: 6px; background: #FF5722;
    border-radius: 50%; box-shadow: 0 0 10px #FF5722;
    animation: blink 2s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.4} }

  .side-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(28px, 3vw, 44px); font-weight: 800;
    line-height: 1.15; text-align: center; color: #FFF5EB;
    letter-spacing: -0.5px; margin-bottom: 1rem;
  }
  .side-title .grad {
    background: linear-gradient(135deg, #FF5722 0%, #FF6D00 50%, #FF8A65 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; filter: drop-shadow(0 0 20px rgba(255,87,34,0.3));
  }

  .side-sub {
    font-size: 14px; color: #B8916B; line-height: 1.8;
    text-align: center; margin-bottom: 2.5rem; font-weight: 400;
  }

  .intel-pills { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
  .intel-pill {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 11px; padding: 6px 12px; border-radius: 50px;
    font-weight: 500; transition: all 0.3s;
  }
  .intel-pill:hover { transform: translateY(-1px); opacity: 0.9; }

  .main-panel {
    flex: 1; min-height: 100vh; display: flex;
    align-items: center; justify-content: center;
    padding: 3rem 4rem; overflow-y: auto;
  }
  .main-inner { width: 100%; max-width: 620px; }

  .intro-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 0; width: 100%; min-height: 100vh; align-items: stretch;
  }
  .intro-left {
    display: flex; flex-direction: column;
    justify-content: center; align-items: flex-start;
    padding: 4rem 5rem 4rem 6rem;
    border-right: 1px solid rgba(255,87,34,0.12);
  }
  .intro-right {
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    padding: 4rem 5rem; background: rgba(255,87,34,0.02);
  }

  .intro-badge {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 10px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: #FF5722;
    border: 1px solid rgba(255,87,34,0.3); background: rgba(255,87,34,0.1);
    padding: 8px 18px; border-radius: 50px; margin-bottom: 2rem;
  }
  .intro-badge::before {
    content: ''; width: 6px; height: 6px; background: #FF5722;
    border-radius: 50%; box-shadow: 0 0 10px #FF5722;
    animation: blink 2s ease-in-out infinite;
  }

  .intro-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(40px, 5vw, 68px); font-weight: 800;
    line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -1px; color: #FFF5EB;
  }
  .intro-title .grad {
    background: linear-gradient(135deg, #FF5722 0%, #FF6D00 50%, #FF8A65 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; filter: drop-shadow(0 0 25px rgba(255,87,34,0.35));
  }

  .intro-sub {
    font-size: 15px; color: #B8916B; line-height: 1.8;
    margin-bottom: 2.5rem; font-weight: 400; max-width: 420px;
  }

  .btn-start {
    position: relative; display: inline-flex; align-items: center; gap: 12px;
    font-family: 'Poppins', sans-serif; font-size: 16px; font-weight: 700;
    padding: 16px 42px; border-radius: 12px; border: none;
    background: linear-gradient(135deg, #FF5722 0%, #FF7043 100%);
    color: #fff; cursor: pointer; transition: all 0.25s;
    box-shadow: 0 8px 24px rgba(255,87,34,0.4), 0 0 60px rgba(255,87,34,0.15);
    letter-spacing: 0.3px; overflow: hidden;
  }
  .btn-start::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, #FF7043 0%, #FF9800 100%);
    opacity: 0; transition: opacity 0.3s;
  }
  .btn-start:hover { transform: translateY(-3px); box-shadow: 0 12px 36px rgba(255,87,34,0.5), 0 0 80px rgba(255,87,34,0.2); }
  .btn-start:hover::before { opacity: 1; }
  .btn-start:active { transform: scale(0.98); }
  .btn-start span { position: relative; z-index: 1; }

  .intro-brain-big-wrap {
    width: 180px; height: 180px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 2rem;
    animation: floatBrain 4s ease-in-out infinite;
    filter: drop-shadow(0 0 50px rgba(255,87,34,0.6));
  }

  .stats-row { display: flex; gap: 2.5rem; margin-top: 2rem; }
  .stat-item { text-align: center; }
  .stat-num {
    font-family: 'Poppins', sans-serif; font-size: 32px; font-weight: 800;
    color: #FF5722; display: block; line-height: 1; margin-bottom: 6px;
  }
  .stat-label {
    font-size: 10px; color: #6B5344; letter-spacing: 1.5px;
    text-transform: uppercase; font-weight: 500;
  }

  .screen-enter { animation: screenIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards; }
  .screen-exit  { animation: screenOut 0.35s cubic-bezier(0.4,0,1,1) forwards; }

  @keyframes screenIn {
    from { opacity: 0; transform: translateY(24px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes screenOut {
    from { opacity: 1; transform: translateY(0) scale(1); }
    to   { opacity: 0; transform: translateY(-16px) scale(0.98); }
  }

  .progress-header {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px;
  }
  .progress-label { font-size: 11px; color: #6B5344; letter-spacing: 2px; text-transform: uppercase; font-weight: 600; }
  .progress-frac { font-family: 'Poppins', sans-serif; font-size: 13px; color: #FF5722; font-weight: 700; }
  .progress-track {
    height: 3px; background: rgba(255,87,34,0.12); border-radius: 3px;
    margin-bottom: 20px; overflow: hidden;
  }
  .progress-fill {
    height: 100%; background: linear-gradient(90deg, #FF5722, #FF7043, #FF8A65);
    border-radius: 3px; transition: width 0.6s cubic-bezier(0.4,0,0.2,1);
    box-shadow: 0 0 16px rgba(255,87,34,0.6);
  }

  .step-dots { display: flex; gap: 6px; justify-content: center; margin-bottom: 2.5rem; }
  .step-dot { height: 3px; width: 24px; border-radius: 3px; background: rgba(255,87,34,0.15); transition: all 0.3s; }
  .step-dot.active { background: #FF5722; width: 40px; box-shadow: 0 0 12px rgba(255,87,34,0.6); }
  .step-dot.done   { background: #FF7043; }

  .q-card {
    background: rgba(255,87,34,0.05); border: 1px solid rgba(255,87,34,0.15);
    border-radius: 20px; padding: 2.5rem;
    backdrop-filter: blur(20px); position: relative; overflow: hidden;
  }
  .q-card::before {
    content: ''; position: absolute; top: 0; left: 0; width: 120px; height: 120px;
    background: radial-gradient(circle at 0% 0%, rgba(255,87,34,0.1), transparent 70%);
    pointer-events: none;
  }
  .q-card.exit  { animation: screenOut 0.3s cubic-bezier(0.4,0,1,1) forwards; }
  .q-card.enter { animation: screenIn 0.45s cubic-bezier(0.16,1,0.3,1) forwards; }

  .q-number { font-size: 10px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: #FF5722; margin-bottom: 1rem; }
  .q-text {
    font-family: 'Poppins', sans-serif; font-size: clamp(20px, 2.2vw, 26px);
    font-weight: 700; line-height: 1.4; color: #FFF5EB; margin-bottom: 1.75rem;
  }

  .options-list { display: flex; flex-direction: column; gap: 11px; }

  .option-btn {
    display: flex; align-items: center; gap: 14px; padding: 14px 20px;
    border-radius: 12px; border: 1px solid rgba(255,87,34,0.12);
    background: rgba(255,87,34,0.05); cursor: pointer; transition: all 0.2s;
    text-align: left; width: 100%; color: #D4A880;
  }
  .option-btn:hover {
    border-color: rgba(255,87,34,0.35); background: rgba(255,87,34,0.1);
    transform: translateX(6px);
    box-shadow: -4px 0 0 0 #FF5722, 0 0 20px rgba(255,87,34,0.15);
  }
  .option-btn.selected {
    border-color: #FF5722; background: rgba(255,87,34,0.15);
    box-shadow: -4px 0 0 0 #FF5722, 0 0 30px rgba(255,87,34,0.28);
    transform: translateX(6px); animation: optPick 0.35s ease;
  }
  .option-btn.disabled { pointer-events: none; opacity: 0.5; }

  @keyframes optPick {
    0%   { transform: scale(1) translateX(0); }
    35%  { transform: scale(1.015) translateX(8px); }
    100% { transform: scale(1) translateX(6px); }
  }

  .opt-letter {
    width: 40px; height: 40px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700;
    background: rgba(255,87,34,0.08); border: 1px solid rgba(255,87,34,0.18);
    color: #8B6E59; flex-shrink: 0; transition: all 0.2s;
  }
  .option-btn:hover .opt-letter,
  .option-btn.selected .opt-letter {
    background: #FF5722; border-color: #FF5722; color: #fff;
    box-shadow: 0 0 16px rgba(255,87,34,0.5);
  }
  .opt-text { font-size: 14px; color: #C4906A; line-height: 1.5; font-weight: 500; transition: color 0.2s; }
  .option-btn:hover .opt-text,
  .option-btn.selected .opt-text { color: #FFF5EB; }

  .result-hero {
    background: rgba(255,87,34,0.06); border: 1px solid rgba(255,87,34,0.2);
    border-radius: 20px; padding: 3rem 2.5rem; margin-bottom: 1.5rem;
    text-align: center; position: relative; overflow: hidden;
  }
  .result-hero::before {
    content: ''; position: absolute; inset: 0;
    background:
      radial-gradient(ellipse at 50% -10%, rgba(255,87,34,0.15), transparent 65%),
      radial-gradient(ellipse at 100% 100%, rgba(255,87,34,0.08), transparent 50%);
    pointer-events: none;
  }
  .result-hero-content { position: relative; z-index: 1; }

  .result-icon-wrap {
    width: 96px; height: 96px;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.5rem;
    animation: floatBrain 3.5s ease-in-out infinite;
  }

  .result-tag { font-size: 10px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; margin-bottom: 0.75rem; color: #FF5722; }
  .result-name {
    font-family: 'Poppins', sans-serif; font-size: clamp(28px, 3.5vw, 48px);
    font-weight: 800; margin-bottom: 1.25rem; line-height: 1.15; letter-spacing: -0.5px;
  }
  .result-desc { font-size: 14px; color: #A0836B; line-height: 1.8; max-width: 540px; margin: 0 auto; font-weight: 400; }

  .glass-card {
    background: rgba(255,87,34,0.04); border: 1px solid rgba(255,87,34,0.12);
    border-radius: 16px; padding: 1.75rem; margin-bottom: 1.5rem;
    position: relative; overflow: hidden;
  }
  .glass-card::before {
    content: ''; position: absolute; top: 0; right: 0; width: 100px; height: 100px;
    background: radial-gradient(circle at 100% 0%, rgba(255,87,34,0.08), transparent 70%);
    pointer-events: none;
  }

  .card-label { font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: #6B5344; margin-bottom: 1.25rem; }

  .secondary-row { display: flex; align-items: center; gap: 14px; }
  .secondary-icon-wrap {
    width: 44px; height: 44px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .secondary-name { font-family: 'Poppins', sans-serif; font-size: 17px; font-weight: 700; color: #FFF5EB; margin-bottom: 4px; }
  .secondary-desc { font-size: 13px; color: #8B6E59; line-height: 1.5; font-weight: 400; }

  .ai-row { display: flex; align-items: flex-start; gap: 14px; }
  .ai-icon-wrap {
    width: 48px; height: 48px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    background: rgba(255,87,34,0.12); border: 1px solid rgba(255,87,34,0.2);
    flex-shrink: 0; box-shadow: 0 0 16px rgba(255,87,34,0.12);
  }
  .ai-name { font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 700; color: #FF5722; margin-bottom: 4px; }
  .ai-desc { font-size: 13px; color: #8B6E59; line-height: 1.6; font-weight: 400; }

  .intel-bars-container { margin-top: 0.5rem; display: flex; flex-direction: column; gap: 8px; }
  .bar-row {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 14px; border-radius: 12px; border: 1px solid;
    transition: transform 0.18s;
  }
  .bar-row:hover { transform: translateX(4px); }
  .bar-icon-wrap { width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .bar-name { font-size: 12px; width: 110px; text-align: left; flex-shrink: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 600; }
  .bar-track { flex: 1; height: 6px; border-radius: 6px; overflow: hidden; }
  .bar-fill { height: 100%; border-radius: 6px; transition: width 1.3s cubic-bezier(0.4,0,0.2,1); }
  .bar-num { font-size: 13px; width: 20px; text-align: right; flex-shrink: 0; font-weight: 800; }

  /* ─── MESAS DE EXPERIENCIA ─── */
  .mesas-section { margin-bottom: 1.5rem; }

  .perfil-badge {
    display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 600;
    color: #FF5722; background: rgba(255,87,34,0.1); border: 1px solid rgba(255,87,34,0.2);
    padding: 5px 12px; border-radius: 50px; margin-bottom: 1.25rem;
  }
  .perfil-badge::before {
    content: ''; width: 5px; height: 5px; background: #FF5722;
    border-radius: 50%; box-shadow: 0 0 6px #FF5722;
  }

  .mesas-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

  .mesa-card {
    border-radius: 14px; padding: 1.1rem 1.25rem 2.5rem; border: 1.5px solid;
    position: relative; overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s; cursor: default;
  }
  .mesa-card:hover { transform: translateY(-3px); }
  .mesa-card:last-child:nth-child(odd) { grid-column: 1 / -1; }

  .mesa-tipo-badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 9px; font-weight: 800; letter-spacing: 1.8px;
    text-transform: uppercase; padding: 4px 10px; border-radius: 50px;
    margin-bottom: 9px;
  }
  .mesa-tipo-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

  .mesa-herramienta {
    font-family: 'Poppins', sans-serif; font-size: 13px; font-weight: 700;
    margin-bottom: 4px; line-height: 1.3;
  }
  .mesa-desc { font-size: 11px; font-weight: 400; line-height: 1.4; opacity: 0.8; }

  .mesa-watermark-icon { position: absolute; bottom: 8px; right: 10px; opacity: 0.15; }

  .restart-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    font-size: 13px; font-weight: 600; padding: 12px 32px; border-radius: 50px;
    border: 1px solid rgba(255,87,34,0.2); background: rgba(255,87,34,0.05); color: #6B5344;
    cursor: pointer; transition: all 0.25s; font-family: 'Poppins', sans-serif; letter-spacing: 0.3px; margin-top: 1.5rem;
  }
  .restart-btn:hover { border-color: rgba(255,87,34,0.4); color: #FF5722; background: rgba(255,87,34,0.1); }

  .loading-screen {
    position: fixed; inset: 0; z-index: 100;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    background: linear-gradient(135deg, #0F0E0A 0%, #1A1512 100%);
    animation: loadingFadeOut 0.6s ease-in-out forwards; animation-delay: 2.8s;
  }
  @keyframes loadingFadeOut { from { opacity: 1; } to { opacity: 0; pointer-events: none; } }

  .loading-center { display: flex; flex-direction: column; align-items: center; gap: 0; }
  .loading-orbit-wrap { position: relative; width: 180px; height: 180px; margin-bottom: 2.5rem; }
  .loading-orbit-wrap::before {
    content: ''; position: absolute; inset: -20px; border-radius: 50%;
    border: 1.5px dashed rgba(255,87,34,0.25); animation: orbitSpin 8s linear infinite;
  }
  .loading-orbit-wrap::after {
    content: ''; position: absolute; inset: -20px; border-radius: 50%;
    border: 2px solid transparent; border-top-color: rgba(255,87,34,0.4);
    animation: orbitSpin 3s linear infinite;
  }
  @keyframes orbitSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

  .loading-circle {
    width: 180px; height: 180px; border-radius: 50%;
    background: rgba(255,87,34,0.08); border: 1px solid rgba(255,87,34,0.2);
    display: flex; align-items: center; justify-content: center; position: relative;
    box-shadow: 0 8px 40px rgba(255,87,34,0.15), 0 2px 12px rgba(255,87,34,0.08), inset 0 1px 0 rgba(255,255,255,0.1);
  }

  .loading-icon-anim { animation: iconPulse 1.2s ease-in-out infinite; position: relative; z-index: 1; filter: drop-shadow(0 0 20px rgba(255,87,34,0.6)); }
  @keyframes iconPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }

  .loading-title {
    font-family: 'Poppins', sans-serif; font-size: clamp(32px, 5vw, 52px); font-weight: 800;
    color: #FFF5EB; letter-spacing: -1px; margin-bottom: 0.75rem;
    animation: titleReveal 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both;
  }
  @keyframes titleReveal { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  .loading-subtitle {
    font-size: 14px; color: #A0836B; font-weight: 400; margin-bottom: 1.5rem;
    animation: titleReveal 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s both;
  }
  .loading-badge {
    display: inline-flex; align-items: center; gap: 8px; font-size: 11px; font-weight: 600;
    letter-spacing: 2px; text-transform: uppercase; color: #FF5722;
    background: rgba(255,87,34,0.1); border: 1px solid rgba(255,87,34,0.2);
    padding: 8px 18px; border-radius: 50px;
    animation: titleReveal 0.7s cubic-bezier(0.16,1,0.3,1) 0.7s both;
  }
  .loading-dot-live {
    width: 6px; height: 6px; border-radius: 50%; background: #FF5722;
    box-shadow: 0 0 8px #FF5722; animation: blink 1.2s ease-in-out infinite;
  }

  @media (max-width: 1024px) {
    .side-panel { width: 35%; padding: 2.5rem 2rem; }
    .main-panel { padding: 2.5rem 2.5rem; }
  }
  @media (max-width: 900px) {
    .intro-grid { grid-template-columns: 1fr; min-height: auto; }
    .intro-left { padding: 3rem 2.5rem 2rem; align-items: center; text-align: center; border-right: none; border-bottom: 1px solid rgba(255,87,34,0.12); }
    .intro-right { padding: 2.5rem 2rem; }
    .side-panel { display: none; }
    .main-panel { padding: 2rem 1.5rem; }
  }
  @media (max-width: 640px) {
    .mit-root { font-size: 14px; }
    .intro-left { padding: 2.5rem 1.5rem 1.5rem; }
    .intro-title { font-size: 32px; }
    .q-card { padding: 1.75rem 1.25rem; }
    .result-hero { padding: 2rem 1.5rem; }
    .glass-card { padding: 1.25rem; }
    .mesas-grid { grid-template-columns: 1fr; }
    .mesa-card:last-child:nth-child(odd) { grid-column: auto; }
  }
`;

function Aurora() {
  const blobs = [
    { w: 700, h: 700, x: "-15%", y: "-20%", color: "#FF5722", dur: "20s" },
    { w: 550, h: 550, x: "55%",  y: "45%",  color: "#FF7043", dur: "25s" },
    { w: 480, h: 480, x: "25%",  y: "30%",  color: "#FF6D00", dur: "30s" },
    { w: 420, h: 420, x: "75%",  y: "-10%", color: "#FF8A65", dur: "22s" },
    { w: 360, h: 360, x: "-5%",  y: "60%",  color: "#FF5722", dur: "28s" },
  ];
  return (
    <div className="aurora">
      {blobs.map((b, i) => (
        <div key={i} className="aurora-blob" style={{ width: b.w, height: b.h, left: b.x, top: b.y, background: b.color, animationDuration: b.dur, animationDelay: `${i * -5}s` }} />
      ))}
    </div>
  );
}

function MesasExperiencia({ primaryKey, primaryColor }) {
  const mesas = MESAS[primaryKey];
  const profile = PROFILES[primaryKey];
  return (
    <div className="glass-card mesas-section">
      <div className="card-label">Mesas de experiencia</div>
      <div className="perfil-badge">{profile.perfil}</div>
      <div className="mesas-grid">
        {mesas.map((mesa) => {
          const c = MESA_COLORS[mesa.tipo];
          return (
            <div
              key={mesa.tipo}
              className="mesa-card"
              style={{
                background: c.bg,
                borderColor: c.border,
                boxShadow: `0 4px 20px ${c.glow}`,
              }}
            >
              {/* Badge del tipo */}
              <div
                className="mesa-tipo-badge"
                style={{ background: c.badge, color: c.label }}
              >
                <span className="mesa-tipo-dot" style={{ background: c.label }} />
                Mesa {mesa.tipo}
              </div>

              {/* Herramienta */}
              <div className="mesa-herramienta" style={{ color: c.text }}>
                {mesa.herramienta}
              </div>

              {/* Descripción */}
              <div className="mesa-desc" style={{ color: c.text }}>
                {mesa.desc}
              </div>

              {/* Ícono de marca de agua */}
              <span className="mesa-watermark-icon">
                <IntelIcon iconKey={primaryKey} size={20} color={c.label} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function IntroScreen({ onStart }) {
  return (
    <div className="intro-grid screen-enter">
      <div className="intro-left">
        <div className="intro-badge">Test de Inteligencias Múltiples</div>
        <h1 className="intro-title">
          Descubre tu<br />
          <span className="grad">superpoder<br />cognitivo</span>
        </h1>
        <p className="intro-sub">
          Basado en la teoría de Howard Gardner, este test identifica tu inteligencia dominante y te recomienda la IA ideal para potenciarla.
        </p>
        <button className="btn-start" onClick={onStart}>
          <span>Comenzar el test</span>
          <span>→</span>
        </button>
        <div className="stats-row">
          <div className="stat-item"><span className="stat-num">8</span><span className="stat-label">Perfiles</span></div>
          <div className="stat-item"><span className="stat-num">10</span><span className="stat-label">Preguntas</span></div>
          <div className="stat-item"><span className="stat-num">3'</span><span className="stat-label">Duración</span></div>
        </div>
      </div>

      <div className="intro-right">
        <div className="intro-brain-big-wrap">
          <IntelIcon iconKey="brain" size={160} color="#FF5722" />
        </div>
        <div className="intel-pills">
          {Object.entries(INTELLIGENCES).map(([key, intel]) => (
            <span key={key} className="intel-pill" style={{
              border: `1px solid ${intel.color}44`,
              color: intel.color,
              background: `${intel.color}12`,
            }}>
              <IntelIcon iconKey={intel.iconKey} size={14} color={intel.color} />
              {intel.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function QuizScreen({ qIndex, onAnswer }) {
  const [phase, setPhase] = useState("enter");
  const [selected, setSelected] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const prevIndex = useRef(qIndex);

  useEffect(() => {
    if (prevIndex.current !== qIndex) {
      setPhase("enter");
      setSelected(null);
      setDisabled(false);
      prevIndex.current = qIndex;
    }
  }, [qIndex]);

  const q = QUESTIONS[qIndex];
  const pct = (qIndex / QUESTIONS.length) * 100;

  const handleSelect = (i) => {
    if (disabled) return;
    setSelected(i);
    setDisabled(true);
    setPhase("exit");
    setTimeout(() => onAnswer(q.options[i].key), 400);
  };

  return (
    <>
      <div className="side-panel">
        <div className="side-brain-wrap">
          <IntelIcon iconKey="brain" size={120} color="#FF5722" />
        </div>
        <div className="side-badge">Inteligencias Múltiples</div>
        <h2 className="side-title">Descubre tu<br /><span className="grad">perfil cognitivo</span></h2>
        <p className="side-sub">Responde con honestidad.<br />No hay respuestas correctas o incorrectas.</p>
        <div className="intel-pills">
          {Object.entries(INTELLIGENCES).map(([key, intel]) => (
            <span key={key} className="intel-pill" style={{
              border: `1px solid ${intel.color}44`,
              color: intel.color,
              background: `${intel.color}12`,
            }}>
              <IntelIcon iconKey={intel.iconKey} size={14} color={intel.color} />
              {intel.name}
            </span>
          ))}
        </div>
      </div>

      <div className="main-panel">
        <div className="main-inner">
          <div className="progress-header">
            <span className="progress-label">Progreso</span>
            <span className="progress-frac">{qIndex + 1} / {QUESTIONS.length}</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
          <div className="step-dots">
            {QUESTIONS.map((_, i) => (
              <div key={i} className={`step-dot ${i < qIndex ? "done" : i === qIndex ? "active" : ""}`} />
            ))}
          </div>
          <div className={`q-card ${phase}`}>
            <div className="q-number">Pregunta {qIndex + 1} de {QUESTIONS.length}</div>
            <div className="q-text">{q.text}</div>
            <div className="options-list">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  className={`option-btn ${selected === i ? "selected" : ""} ${disabled && selected !== i ? "disabled" : ""}`}
                  onClick={() => handleSelect(i)}
                >
                  <div className="opt-letter">{LETTERS[i]}</div>
                  <div className="opt-text">{opt.text}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ResultScreen({ answers, onRestart }) {
  const [barsReady, setBarsReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setBarsReady(true), 350); return () => clearTimeout(t); }, []);

  const scores = {};
  Object.keys(INTELLIGENCES).forEach((k) => (scores[k] = 0));
  answers.forEach((a) => { scores[a]++; });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [primaryKey, primaryScore] = sorted[0];
  const [secondaryKey, secondaryScore] = sorted[1];
  const isTie = primaryScore === secondaryScore;
  const maxScore = primaryScore || 1;

  const primary   = INTELLIGENCES[primaryKey];
  const secondary = INTELLIGENCES[secondaryKey];
  const profile   = PROFILES[primaryKey];
  const visibleBars = sorted.filter(([, v]) => v > 0);

  return (
    <>
      <div className="side-panel">
        <div className="side-brain-wrap" style={{ filter: `drop-shadow(0 0 40px ${primary.glow})` }}>
          <IntelIcon iconKey={primary.iconKey} size={120} color={primary.color} />
        </div>
        <div className="side-badge">Tu resultado</div>
        <h2 className="side-title" style={{ color: primary.color }}>{primary.name}</h2>
        <p className="side-sub">{profile.desc}</p>
        <button className="restart-btn" onClick={onRestart}>↺ Repetir test</button>
      </div>

      <div className="main-panel">
        <div className="main-inner">
          <div className="screen-enter">
            <div className="result-hero">
              <div className="result-hero-content">
                <div className="result-icon-wrap" style={{ filter: `drop-shadow(0 0 28px ${primary.glow})` }}>
                  <IntelIcon iconKey={primary.iconKey} size={90} color={primary.color} />
                </div>
                <div className="result-tag">{isTie ? "Inteligencias Dominantes" : "Tu inteligencia dominante es:"}</div>
                <div className="result-name" style={{ color: primary.color }}>[{primary.name}]</div>
                <p className="result-desc">{profile.desc}</p>
              </div>
            </div>

            {!isTie && (
              <div className="glass-card">
                <div className="card-label">Inteligencia secundaria</div>
                <div className="secondary-row">
                  <div className="secondary-icon-wrap">
                    <IntelIcon iconKey={secondary.iconKey} size={40} color={secondary.color} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="secondary-name">{secondary.name}</div>
                    <div className="secondary-desc">{PROFILES[secondaryKey].desc.substring(0, 90)}…</div>
                  </div>
                </div>
              </div>
            )}

            <div className="glass-card">
              <div className="card-label">Tu herramienta recomendada</div>
              <div className="ai-row">
                <div className="ai-icon-wrap">
                  <IntelIcon iconKey={primary.iconKey} size={26} color={primary.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="ai-name">{profile.ai}</div>
                  <div className="ai-desc">{profile.aiDesc}</div>
                </div>
              </div>
            </div>

            <MesasExperiencia primaryKey={primaryKey} primaryColor={primary.color} />

            <div className="glass-card">
              <div className="card-label">Tu perfil completo</div>
              <div className="intel-bars-container">
                {visibleBars.map(([k, v]) => {
                  const col = INTELLIGENCES[k].color;
                  const glw = INTELLIGENCES[k].glow;
                  const pct = barsReady ? `${(v / maxScore) * 100}%` : "0%";
                  return (
                    <div
                      className="bar-row"
                      key={k}
                      style={{ background: `${col}12`, borderColor: `${col}33` }}
                    >
                      <div className="bar-icon-wrap">
                        <IntelIcon iconKey={INTELLIGENCES[k].iconKey} size={18} color={col} />
                      </div>
                      <div className="bar-name" style={{ color: col }}>
                        {INTELLIGENCES[k].name}
                      </div>
                      <div className="bar-track" style={{ background: `${col}20` }}>
                        <div
                          className="bar-fill"
                          style={{
                            width: pct,
                            background: `linear-gradient(90deg, ${col}88, ${col})`,
                            boxShadow: `0 0 10px ${glw}`,
                          }}
                        />
                      </div>
                      <div className="bar-num" style={{ color: col }}>{v}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <button className="restart-btn" onClick={onRestart} style={{ margin: "0 auto" }}>↺ Repetir el test</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function LoadingScreen({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3200); return () => clearTimeout(t); }, [onDone]);
  return (
    <div className="loading-screen">
      <div className="loading-center">
        <div className="loading-orbit-wrap">
          <div className="loading-circle">
            <div className="loading-icon-anim">
              <IntelIcon iconKey="brain" size={60} color="#FF5722" />
            </div>
          </div>
        </div>
        <h1 className="loading-title">ANALIZANDO</h1>
        <p className="loading-subtitle">Procesando tu perfil cognitivo...</p>
        <div className="loading-badge">
          <span className="loading-dot-live" />
          IA Orchestrator activa
        </div>
      </div>
    </div>
  );
}

export default function MultipleIntelligencesTest() {
  const [screen, setScreen]   = useState("intro");
  const [qIndex, setQIndex]   = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [pendingAnswers, setPendingAnswers] = useState(null);

  const handleStart = () => { setQIndex(0); setAnswers([]); setScreen("quiz"); };
  const handleAnswer = (key) => {
    const next = [...answers, key];
    setAnswers(next);
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setPendingAnswers(next);
      setShowLoading(true);
    }
  };
  const handleLoadingDone = () => { setShowLoading(false); setScreen("result"); };
  const handleRestart = () => { setScreen("intro"); setQIndex(0); setAnswers([]); setPendingAnswers(null); };

  const isIntro = screen === "intro";
  const displayAnswers = pendingAnswers || answers;

  return (
    <>
      <style>{css}</style>
      <div className="mit-root">
        <Aurora />
        <div className="grid-overlay" />
        {showLoading && <LoadingScreen onDone={handleLoadingDone} />}
        <div className="mit-container" style={isIntro ? {} : { display: "flex" }}>
          {screen === "intro"  && <IntroScreen onStart={handleStart} />}
          {screen === "quiz"   && <QuizScreen key={qIndex} qIndex={qIndex} onAnswer={handleAnswer} />}
          {screen === "result" && <ResultScreen answers={displayAnswers} onRestart={handleRestart} />}
        </div>
      </div>
    </>
  );
}