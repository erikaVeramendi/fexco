import { useState, useEffect, useRef } from "react";
import DownloadSection from './DownloadSection';

// ─── PALETA OFICIAL ───────────────────────────────────────────────────────────
const C = {
  lime:  "#CDF815",
  lime2: "#C8F006",
  lime3: "#BBE732",
  white: "#FFFFFF",
};

// ─── CONFIGURACIÓN SUPABASE ───────────────────────────────────────────────────
const SUPABASE_URL = 'https://ziosmbtgmxuvycnuewoj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_n__VY44aJXPKRtcrl5GMpA_eYnd02C5';

async function supabaseRequest(path, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase error: ${err}`);
  }
  const text = await res.text();
  if (!text) return null;
  return JSON.parse(text);
}

// ─── GUARDAR RESULTADO: incrementa total_tests + inteligencia dominante ────────
async function saveTestResult(primaryIntel) {
  try {
    // 1. Incrementa el total (Asegúrate que el nombre sea 'total_tests' como en tu tabla)
    await supabaseRequest('rpc/incrementar_contador', {
      method: 'POST',
      body: JSON.stringify({ fila_nombre: 'total_tests' }), // ← Cambiado de nombre_contador a fila_nombre
    });

    // 2. Incrementa la inteligencia (ej: 'logica', 'musical')
    await supabaseRequest('rpc/incrementar_contador', {
      method: 'POST',
      body: JSON.stringify({ fila_nombre: primaryIntel }), // ← Cambiado de nombre_contador a fila_nombre
    });
    
    console.log("✅ Datos enviados a Supabase con éxito");
  } catch (err) {
    console.error('❌ Error guardando en Supabase:', err);
  }
}

// ─── CARGAR ESTADÍSTICAS ──────────────────────────────────────────────────────
async function loadStats() {
  try {
    const rows = await supabaseRequest('estadisticas?select=nombre,valor');
    const stats = {
      total: 0, logica: 0, linguistica: 0, visual: 0,
      musical: 0, kinestesica: 0, interpersonal: 0, intrapersonal: 0, naturalista: 0
    };
    if (rows && Array.isArray(rows)) {
      rows.forEach(row => {
        if (row.nombre === 'total_tests') stats.total = row.valor;
        else if (stats.hasOwnProperty(row.nombre)) stats[row.nombre] = row.valor;
      });
    }
    return stats;
  } catch (err) {
    console.error('Error cargando stats:', err);
    return {
      total: 0, logica: 0, linguistica: 0, visual: 0,
      musical: 0, kinestesica: 0, interpersonal: 0, intrapersonal: 0, naturalista: 0
    };
  }
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
const ICONS = {
  logica: ({ size = 32, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect x="3" y="3" width="11" height="11" rx="2" stroke={color} strokeWidth="1.5" fill="none"/>
      <rect x="18" y="3" width="11" height="11" rx="2" stroke={color} strokeWidth="1.5" fill="none"/>
      <rect x="3" y="18" width="11" height="11" rx="2" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="23.5" cy="23.5" r="5.5" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="21" y1="23.5" x2="26" y2="23.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="23.5" y1="21" x2="23.5" y2="26" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="7" y1="7.5" x2="11" y2="7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="5.5" x2="9" y2="9.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20.5" y1="7.5" x2="26.5" y2="7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  linguistica: ({ size = 32, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M4 6C4 4.9 4.9 4 6 4H26C27.1 4 28 4.9 28 6V20C28 21.1 27.1 22 26 22H18L12 28V22H6C4.9 22 4 21.1 4 20V6Z" stroke={color} strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <line x1="9" y1="10" x2="23" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="14" x2="20" y2="14" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="9" y1="18" x2="16" y2="18" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  visual: ({ size = 32, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="16" cy="16" r="4" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="4" y1="16" x2="12" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="20" y1="16" x2="28" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M8 10 Q16 4 24 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M8 22 Q16 28 24 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  musical: ({ size = 32, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M12 24V8L26 5V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <circle cx="9" cy="24" r="3" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="23" cy="21" r="3" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="12" y1="13" x2="26" y2="10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  kinestesica: ({ size = 32, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="6" r="2.5" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M16 9V16L12 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M16 16L20 22" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M10 13H22" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M12 22L10 28" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M20 22L22 28" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
  interpersonal: ({ size = 32, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="10" cy="10" r="4" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="22" cy="10" r="4" stroke={color} strokeWidth="1.5" fill="none"/>
      <path d="M4 26C4 22.7 6.7 20 10 20H14" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M28 26C28 22.7 25.3 20 22 20H18" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M14 23L16 21L18 23" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <line x1="16" y1="21" x2="16" y2="28" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  intrapersonal: ({ size = 32, color = "currentColor" }) => (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
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
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 28V14" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M16 14C16 14 8 12 6 5C6 5 14 4 18 10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M16 18C16 18 22 15 26 8C26 8 19 6 15 13" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      <path d="M10 28H22" stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  ),
};

function IntelIcon({ iconKey, size = 32, color = "currentColor", style = {} }) {
  const Icon = ICONS[iconKey];
  if (!Icon) return null;
  return <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", ...style }}><Icon size={size} color={color} /></span>;
}

// ─── ROBOT IMAGE ──────────────────────────────────────────────────────────────
function RobotImage({ size = 260, style = {} }) {
  return (
    <img src="robot.png" alt="Robot IA" style={{ width: size, height: "auto", objectFit: "contain", display: "block", ...style }} />
  );
}

// ─── CIRCUIT CORNER ───────────────────────────────────────────────────────────
function CircuitCorner({ color = "#CDF815", flip = false, size = 120 }) {
  const style = flip ? { transform: "scaleX(-1)" } : {};
  return (
    <svg width={size} height={size * 1.6} viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg" style={style}>
      <rect x="5" y="5" width="90" height="150" rx="5" stroke={color} strokeWidth="1" fill="none"/>
      <rect x="12" y="12" width="30" height="22" rx="3" stroke={color} strokeWidth="0.8" fill="none"/>
      <line x1="12" y1="20" x2="30" y2="20" stroke={color} strokeWidth="0.7"/>
      <line x1="12" y1="26" x2="26" y2="26" stroke={color} strokeWidth="0.7"/>
      <rect x="58" y="12" width="30" height="22" rx="3" stroke={color} strokeWidth="0.8" fill="none"/>
      <line x1="58" y1="20" x2="76" y2="20" stroke={color} strokeWidth="0.7"/>
      <line x1="58" y1="26" x2="72" y2="26" stroke={color} strokeWidth="0.7"/>
      <line x1="5" y1="42" x2="0" y2="42" stroke={color} strokeWidth="0.9"/>
      <line x1="5" y1="52" x2="0" y2="52" stroke={color} strokeWidth="0.9"/>
      <circle cx="0" cy="42" r="2" fill={color} opacity="0.7"/>
      <circle cx="0" cy="52" r="2" fill={color} opacity="0.7"/>
      <circle cx="50" cy="100" r="30" stroke={color} strokeWidth="1" fill="none"/>
      <circle cx="50" cy="100" r="18" stroke={color} strokeWidth="0.7" fill="none" strokeDasharray="3 3"/>
      <circle cx="50" cy="100" r="7" stroke={color} strokeWidth="1" fill="none"/>
      <circle cx="50" cy="100" r="2.5" fill={color} opacity="0.9"/>
      <line x1="50" y1="70" x2="50" y2="78" stroke={color} strokeWidth="1"/>
      <line x1="50" y1="122" x2="50" y2="130" stroke={color} strokeWidth="1"/>
      <line x1="20" y1="100" x2="28" y2="100" stroke={color} strokeWidth="1"/>
      <line x1="72" y1="100" x2="80" y2="100" stroke={color} strokeWidth="1"/>
      <rect x="12" y="143" width="76" height="10" rx="2" stroke={color} strokeWidth="0.7" fill="none"/>
    </svg>
  );
}

// ─── LOGO ─────────────────────────────────────────────────────────────────────
function AiModeLogo({ scale = 1 }) {
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: "5px", transform: `scale(${scale})`, transformOrigin: "left top" }}>
      <div style={{ fontFamily: "'Poppins', sans-serif", fontSize: 38, fontWeight: 900, lineHeight: 1, color: C.lime, letterSpacing: "-1px", textShadow: `0 0 25px rgba(205,248,21,0.45)` }}>
        Ai MODE
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18, fontWeight: 900, color: C.white, letterSpacing: "2px" }}>LIFE</span>
        <div style={{ width: 40, height: 22, background: "transparent", border: `2px solid ${C.lime}`, borderRadius: 11, position: "relative", flexShrink: 0 }}>
          <div style={{ position: "absolute", right: 3, top: 3, width: 13, height: 13, background: C.lime, borderRadius: "50%", boxShadow: `0 0 8px ${C.lime}` }} />
        </div>
        <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: 18, fontWeight: 900, color: C.white, letterSpacing: "2px" }}>ON</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: C.lime, fontWeight: 500, marginLeft: 3 }}>by Unifranz</span>
      </div>
    </div>
  );
}

// ─── 8 INTELLIGENCES ─────────────────────────────────────────────────────────
const INTELLIGENCES = {
  logica:        { name: "Lógico-Matemática",  iconKey: "logica",        color: "#6366F1", glow: "rgba(99,102,241,0.45)",   num: "1" },
  linguistica:   { name: "Lingüística",         iconKey: "linguistica",   color: "#38BDF8", glow: "rgba(56,189,248,0.45)",   num: "2" },
  visual:        { name: "Visual-Espacial",      iconKey: "visual",        color: "#A78BFA", glow: "rgba(167,139,250,0.45)",  num: "3" },
  musical:       { name: "Musical",             iconKey: "musical",       color: "#F472B6", glow: "rgba(244,114,182,0.45)",  num: "4" },
  kinestesica:   { name: "Cinético-Corporal",   iconKey: "kinestesica",   color: "#FBBF24", glow: "rgba(251,191,36,0.45)",   num: "5" },
  interpersonal: { name: "Interpersonal",       iconKey: "interpersonal", color: "#34D399", glow: "rgba(52,211,153,0.45)",   num: "6" },
  intrapersonal: { name: "Intrapersonal",       iconKey: "intrapersonal", color: "#F87171", glow: "rgba(248,113,113,0.45)",  num: "7" },
  naturalista:   { name: "Naturalista",         iconKey: "naturalista",   color: "#4ADE80", glow: "rgba(74,222,128,0.45)",   num: "8" },
};

// ─── 4 THINKING TYPES ────────────────────────────────────────────────────────
const THINKING_TYPES = {
  A: {
    name: "Analítico Sistémico",
    label: "Mesa A",
    color: "#6EE7B7",
    bg: "rgba(110,231,183,0.10)",
    border: "rgba(110,231,183,0.30)",
    badge: "rgba(110,231,183,0.18)",
    glow: "rgba(110,231,183,0.25)",
    desc: "Procesas el mundo con lógica, estructura y análisis sistemático. Eres el arquitecto de soluciones ordenadas.",
  },
  B: {
    name: "Empático Estratégico",
    label: "Mesa B",
    color: "#60A5FA",
    bg: "rgba(96,165,250,0.10)",
    border: "rgba(96,165,250,0.30)",
    badge: "rgba(96,165,250,0.18)",
    glow: "rgba(96,165,250,0.25)",
    desc: "Combinas empatía con visión estratégica. Entiendes a las personas y construyes puentes entre ideas y equipos.",
  },
  C: {
    name: "Visual Exploratorio",
    label: "Mesa C",
    color: "#C084FC",
    bg: "rgba(192,132,252,0.10)",
    border: "rgba(192,132,252,0.30)",
    badge: "rgba(192,132,252,0.18)",
    glow: "rgba(192,132,252,0.25)",
    desc: "Exploras el mundo a través de imágenes, patrones y movimiento. Tu mente crea antes de calcular.",
  },
  D: {
    name: "Creativo Expresivo",
    label: "Mesa D",
    color: "#FB923C",
    bg: "rgba(251,146,60,0.10)",
    border: "rgba(251,146,60,0.30)",
    badge: "rgba(251,146,60,0.18)",
    glow: "rgba(251,146,60,0.25)",
    desc: "Expresas el mundo con creatividad, ritmo y emoción. Das vida a ideas que otros no pueden ver.",
  },
};

// ─── MATRIX ───────────────────────────────────────────────────────────────────
const MATRIX = {
  logica: {
    A: { herramienta: "Claude", desc: "Razonamiento lógico y cálculo predictivo" },
    B: { herramienta: "Perplexity / Claude", desc: "Análisis estratégico con datos" },
    C: { herramienta: "Claude / ChatGPT", desc: "Exploración lógica visual" },
    D: { herramienta: "Gamma / Gemini", desc: "Expresión lógica creativa" },
  },
  linguistica: {
    A: { herramienta: "Claude", desc: "Redacción analítica y estructurada" },
    B: { herramienta: "Grammarly", desc: "Comunicación estratégica y empática" },
    C: { herramienta: "Claude / DeepL / Canva Magic / Gamma", desc: "Narrativa visual exploratoria" },
    D: { herramienta: "Claude / Gemini", desc: "Escritura creativa y expresiva" },
  },
  visual: {
    A: { herramienta: "Gemini", desc: "Diseño sistemático y ordenado" },
    B: { herramienta: "Gemini / Claude", desc: "Visualización estratégica" },
    C: { herramienta: "Kling / Gemini", desc: "Exploración visual libre" },
    D: { herramienta: "Canva / Gemini", desc: "Expresión visual y artística" },
  },
  musical: {
    A: { herramienta: "Suno / Udio", desc: "Composición analítica y estructurada" },
    B: { herramienta: "Suno / Soundraw", desc: "Música estratégica y emocional" },
    C: { herramienta: "MusicGen / Udio", desc: "Exploración sonora experimental" },
    D: { herramienta: "Suno / Udio", desc: "Composición creativa y expresiva" },
  },
  kinestesica: {
    A: { herramienta: "Claude", desc: "Planificación física sistemática" },
    B: { herramienta: "Gemini", desc: "Movimiento con intención estratégica" },
    C: { herramienta: "Runway", desc: "Exploración corporal y espacial" },
    D: { herramienta: "Claude", desc: "Captura y expresión del movimiento" },
  },
  interpersonal: {
    A: { herramienta: "Claude / Lobe Chat", desc: "Gestión social sistémica" },
    B: { herramienta: "Otter.ai / ChatGPT", desc: "Comunicación estratégica de equipos" },
    C: { herramienta: "Gemini / character.ai", desc: "Exploración de dinámicas sociales" },
    D: { herramienta: "Pi / ChatGPT", desc: "Liderazgo creativo y empático" },
  },
  intrapersonal: {
    A: { herramienta: "Claude", desc: "Autoconocimiento estructurado" },
    B: { herramienta: "Claude", desc: "Reflexión estratégica personal" },
    C: { herramienta: "ChatGPT / Character.ai", desc: "Exploración interior profunda" },
    D: { herramienta: "Gemini/ ChatGPT", desc: "Expresión y diario personal con IA" },
  },
  naturalista: {
    A: { herramienta: "iNaturalist / Gemini", desc: "Clasificación y análisis ecológico" },
    B: { herramienta: "PlantNet / Gemini", desc: "Estrategia ambiental y sostenible" },
    C: { herramienta: "iNaturalist / Claude", desc: "Exploración del entorno natural" },
    D: { herramienta: "ChatGPT / Gemini / ", desc: "Expresión creativa con la naturaleza" },
  },
};

// ─── PROFILES ────────────────────────────────────────────────────────────────
const PROFILES = {
  logica:        { desc: "Tu mente funciona como un procesador: detectas patrones, razonas con precisión y disfrutas de los desafíos lógicos y matemáticos.", ai: "Claude 3.5 / Wolfram Alpha", aiDesc: "Potencia tus cálculos, análisis y lógica con modelos avanzados." },
  linguistica:   { desc: "Las palabras son tu superpoder. Comunicas ideas con claridad, disfrutas de la lectura, escritura y el debate.", ai: "Claude / GPT-4 Turbo", aiDesc: "Genera contenido, escribe historias y comunica con precisión." },
  visual:        { desc: "Piensas en imágenes y espacios. Tu mente visualiza soluciones antes de escribirlas. Sobresales en diseño y arte.", ai: "Midjourney / DALL-E 3", aiDesc: "Crea y explora mundos visuales con IA generativa de imágenes." },
  musical:       { desc: "Tu cerebro está sintonizado con el ritmo, la melodía y los patrones sonoros. Procesas el mundo a través del sonido.", ai: "Suno / Udio", aiDesc: "Compón música y explora la creatividad sonora con IA avanzada." },
  kinestesica:   { desc: "Aprendes haciendo. Tu inteligencia vive en tus manos y tu cuerpo. Destacas en actividades físicas y manualidades.", ai: "Move.ai / Rokoko", aiDesc: "Crea con tu cuerpo y movimiento potenciado por IA." },
  interpersonal: { desc: "Eres un conector de personas. Entiendes emociones y motivaciones. Lideras y construyes comunidades naturalmente.", ai: "Otter.ai / Pi AI", aiDesc: "Facilita el trabajo en equipo, la comunicación y gestión social." },
  intrapersonal: { desc: "Tu mayor laboratorio eres tú mismo. Tienes profunda conciencia de tus emociones, metas y procesos mentales.", ai: "Claude / Day One", aiDesc: "Explora ideas, emociones y crecimiento personal con IA reflexiva." },
  naturalista:   { desc: "Observas patrones en la naturaleza. Comprendes sistemas complejos y clasificas información ambiental con facilidad.", ai: "iNaturalist / PlantNet", aiDesc: "Analiza datos ambientales y patrones naturales con IA." },
};

// ─── QUESTIONS ───────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    num: "01",
    title: "El Diagnóstico",
    text: "Si tienes un reto complejo, ¿cuál es tu primer instinto?",
    options: [
      { text: "Desglosarlo en datos y lógica.",               intel: ["logica"],        thinking: "A" },
      { text: "Escribirlo o explicarlo para darle forma.",    intel: ["linguistica"],   thinking: "B" },
      { text: "Dibujar un esquema o mapa visual.",            intel: ["visual"],        thinking: "C" },
      { text: "Consultarlo con otros para ver reacciones.",   intel: ["interpersonal"], thinking: "D" },
    ],
  },
  {
    num: "02",
    title: "El Insumo",
    text: "Cuando aprendes algo nuevo, ¿qué hace que 'te caiga el veinte'?",
    options: [
      { text: "Entender la estructura y el 'por qué'.",       intel: ["intrapersonal"], thinking: "A" },
      { text: "Verlo en imágenes o videos.",                  intel: ["naturalista"],   thinking: "B" },
      { text: "Hacerlo con las manos o el cuerpo.",           intel: ["kinestesica"],   thinking: "C" },
      { text: "Escuchar el ritmo o la narrativa del tema.",   intel: ["musical"],       thinking: "D" },
    ],
  },
  {
    num: "03",
    title: "El Rol",
    text: "En un equipo, ¿dónde aportas más valor?",
    options: [
      { text: "Siendo el estratega que analiza riesgos.",     intel: ["logica"],        thinking: "A" },
      { text: "Siendo el comunicador que explica ideas.",     intel: ["linguistica"],   thinking: "B" },
      { text: "Siendo el motor que organiza la acción física.", intel: ["kinestesica"], thinking: "C" },
      { text: "Siendo el conector que une a las personas.",   intel: ["interpersonal"], thinking: "D" },
    ],
  },
  {
    num: "04",
    title: "La Herramienta",
    text: "¿Con qué interfaz te sientes más en control?",
    options: [
      { text: "Sistemas de datos, código o entornos naturales.", intel: ["naturalista"],  thinking: "A" },
      { text: "Software de audio, música o ritmos.",          intel: ["musical"],       thinking: "B" },
      { text: "Herramientas de diseño, dibujo o 3D.",         intel: ["visual"],        thinking: "C" },
      { text: "Aplicaciones de chat, redes o gestión humana.", intel: ["intrapersonal"], thinking: "D" },
    ],
  },
  {
    num: "05",
    title: "La Decisión",
    text: "Al elegir un camino difícil, ¿qué pesa más?",
    options: [
      { text: "El análisis de pros, contras y evidencia.",    intel: ["logica"],        thinking: "A" },
      { text: "Mi intuición y valores personales.",           intel: ["intrapersonal"], thinking: "B" },
      { text: "La opinión y el bienestar de mi equipo.",      intel: ["interpersonal"], thinking: "C" },
      { text: "La estética y armonía del resultado final.",   intel: ["musical"],       thinking: "D" },
    ],
  },
  {
    num: "06",
    title: "La Aspiración",
    text: "Si una IA pudiera potenciarte, ¿qué elegirías?",
    options: [
      { text: "Capacidad infinita de cálculo y organización.", intel: ["naturalista"],  thinking: "A" },
      { text: "Elocuencia perfecta y memoria de textos.",     intel: ["linguistica"],   thinking: "B" },
      { text: "Creatividad visual y espacial sin límites.",   intel: ["visual"],        thinking: "C" },
      { text: "Empatía total y lectura de entornos sociales.", intel: ["kinestesica"],  thinking: "D" },
    ],
  },
];

const LETTERS = ["A", "B", "C", "D"];

// ─── SCORING LOGIC ────────────────────────────────────────────────────────────
function computeResult(answers) {
  const intelScores = {};
  const thinkingScores = { A: 0, B: 0, C: 0, D: 0 };
  Object.keys(INTELLIGENCES).forEach(k => (intelScores[k] = 0));
  answers.forEach(a => {
    a.intel.forEach(i => { intelScores[i] = (intelScores[i] || 0) + 1; });
    thinkingScores[a.thinking]++;
  });
  const sortedIntel = Object.entries(intelScores).sort((a, b) => b[1] - a[1]);
  const sortedThinking = Object.entries(thinkingScores).sort((a, b) => b[1] - a[1]);
  return {
    primaryIntel: sortedIntel[0][0],
    secondaryIntel: sortedIntel[1][0],
    primaryThinking: sortedThinking[0][0],
    intelScores,
    thinkingScores,
  };
}

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html,body,#root{width:100%;height:100%;overflow-x:hidden;}

  .mit-root {
    font-family:'Inter',sans-serif;
    background:linear-gradient(155deg,#FF4103 0%,#A8320E 12%,#7B2B12 24%,#4A2419 36%,#1F1B1C 50%,#031720 74%,#001621 100%);
    width:100vw;min-height:100vh;color:#fff;overflow-x:hidden;position:relative;
  }
  .grid-overlay{
    position:fixed;inset:0;pointer-events:none;z-index:0;
    background-image:linear-gradient(rgba(205,248,21,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(205,248,21,0.035) 1px,transparent 1px);
    background-size:48px 48px;
  }
  .circuit-deco{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;}
  .mit-container{position:relative;z-index:1;width:100%;min-height:100vh;display:flex;align-items:stretch;}

  /* SIDE */
  .side-panel{
    width:38%;min-height:100vh;display:flex;flex-direction:column;
    justify-content:center;align-items:center;
    padding:3rem 2rem;position:sticky;top:0;
    border-right:1px solid rgba(205,248,21,0.14);
    background:rgba(0,0,0,0.18);backdrop-filter:blur(6px);
  }
  .side-logo-wrap{margin-bottom:1.75rem;}
  .side-robot-wrap{
    width:140px;height:175px;display:flex;align-items:center;justify-content:center;
    margin-bottom:1.75rem;
    animation:floatRobot 4s ease-in-out infinite;
    filter:drop-shadow(0 0 18px rgba(205,248,21,0.5));
  }
  .side-robot-wrap img{width:140px;height:auto;object-fit:contain;}
  @keyframes floatRobot{0%,100%{transform:translateY(0) rotate(-1deg);}50%{transform:translateY(-13px) rotate(1deg);}}
  .side-badge{display:inline-flex;align-items:center;gap:7px;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#CDF815;border:1px solid rgba(205,248,21,0.32);background:rgba(205,248,21,0.07);padding:6px 14px;border-radius:50px;margin-bottom:1rem;}
  .side-badge::before{content:'';width:5px;height:5px;background:#CDF815;border-radius:50%;box-shadow:0 0 8px #CDF815;animation:blink 2s ease-in-out infinite;}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0.25}}
  .side-title{font-family:'Poppins',sans-serif;font-size:clamp(20px,2.4vw,32px);font-weight:800;line-height:1.2;text-align:center;color:#fff;letter-spacing:-0.5px;margin-bottom:0.6rem;}
  .side-title .grad{color:#CDF815;text-shadow:0 0 18px rgba(205,248,21,0.45);}
  .side-sub{font-size:12px;color:rgba(255,255,255,0.5);line-height:1.7;text-align:center;margin-bottom:1.75rem;}
  .intel-pills{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;}
  .intel-pill{display:inline-flex;align-items:center;gap:5px;font-size:9px;padding:4px 9px;border-radius:50px;font-weight:500;transition:all 0.3s;}

  /* MAIN */
  .main-panel{flex:1;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:3rem 4rem;overflow-y:auto;}
  .main-inner{width:100%;max-width:620px;}

  /* INTRO — full two-column layout */
  .intro-grid{display:grid;grid-template-columns:1fr 1fr;gap:0;width:100%;min-height:100vh;align-items:stretch;}
  .intro-left{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:4rem 4rem 4rem 5rem;border-right:1px solid rgba(205,248,21,0.1);position:relative;overflow:hidden;}
  .intro-right{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:3rem 2rem;background:rgba(0,0,0,0.12);position:relative;overflow:hidden;}
  .intro-logo-wrap{margin-bottom:1.75rem;}
  .intro-tagline{font-size:10px;font-weight:700;letter-spacing:3.5px;text-transform:uppercase;color:rgba(205,248,21,0.65);margin-bottom:1.25rem;}
  .intro-badge{display:inline-flex;align-items:center;gap:7px;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#CDF815;border:1px solid rgba(205,248,21,0.28);background:rgba(205,248,21,0.07);padding:7px 16px;border-radius:50px;margin-bottom:1.5rem;}
  .intro-badge::before{content:'';width:5px;height:5px;background:#CDF815;border-radius:50%;box-shadow:0 0 8px #CDF815;animation:blink 2s ease-in-out infinite;}
  .intro-title{font-family:'Poppins',sans-serif;font-size:clamp(34px,4.5vw,60px);font-weight:900;line-height:1.07;margin-bottom:1.1rem;letter-spacing:-1.5px;color:#fff;}
  .intro-title .grad{color:#CDF815;text-shadow:0 0 28px rgba(205,248,21,0.5);}
  .intro-sub{font-size:13px;color:rgba(255,255,255,0.55);line-height:1.8;margin-bottom:2.25rem;max-width:390px;}
  .btn-start{display:inline-flex;align-items:center;gap:10px;font-family:'Poppins',sans-serif;font-size:14px;font-weight:800;padding:14px 38px;border-radius:9px;border:2px solid #CDF815;background:transparent;color:#CDF815;cursor:pointer;transition:all 0.22s;letter-spacing:1.2px;text-transform:uppercase;box-shadow:0 0 25px rgba(205,248,21,0.18),inset 0 0 25px rgba(205,248,21,0.04);}
  .btn-start:hover{background:#CDF815;color:#001621;box-shadow:0 0 45px rgba(205,248,21,0.5);transform:translateY(-2px);}
  .intro-robot-wrap{position:relative;z-index:2;animation:floatRobot 4s ease-in-out infinite;filter:drop-shadow(0 0 40px rgba(205,248,21,0.55)) drop-shadow(0 0 80px rgba(205,248,21,0.25));margin-bottom:1.5rem;}
  .intro-robot-wrap img{width:clamp(220px,20vw,320px);height:auto;display:block;object-fit:contain;}
  .intro-circuit-corner-l{position:absolute;left:-8px;top:50%;transform:translateY(-50%);opacity:0.32;pointer-events:none;z-index:1;}
  .intro-circuit-corner-r{position:absolute;right:-8px;top:50%;transform:translateY(-50%) scaleX(-1);opacity:0.32;pointer-events:none;z-index:1;}
  .intro-circuit-top{position:absolute;top:14px;left:50%;transform:translateX(-50%);opacity:0.3;pointer-events:none;z-index:1;}
  .intro-circuit-bottom{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);opacity:0.3;pointer-events:none;z-index:1;}

  /* STATS ROW — intro screen */
  .stats-row{display:flex;gap:2.25rem;margin-top:1.75rem;}
  .stat-item{text-align:center;}
  .stat-num{font-family:'Poppins',sans-serif;font-size:28px;font-weight:900;color:#CDF815;display:block;line-height:1;margin-bottom:4px;text-shadow:0 0 14px rgba(205,248,21,0.5);}
  .stat-label{font-size:8px;color:rgba(255,255,255,0.38);letter-spacing:2px;text-transform:uppercase;font-weight:600;}

  /* LIVE COUNTER BLOCK — pantalla principal derecha */
  .intro-live-counter{
    width:100%;max-width:320px;
    background:rgba(0,0,0,0.28);
    border:1px solid rgba(205,248,21,0.18);
    border-radius:14px;
    padding:1.1rem 1.25rem;
    margin-top:1.25rem;
    position:relative;overflow:hidden;
    backdrop-filter:blur(12px);
  }
  .intro-live-counter::before{content:'';position:absolute;top:0;left:0;width:100%;height:2px;background:linear-gradient(90deg,transparent,#CDF815,transparent);}
  .ilc-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:0.85rem;}
  .ilc-label{font-size:8px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(205,248,21,0.55);}
  .ilc-live{display:inline-flex;align-items:center;gap:5px;font-size:7px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#CDF815;}
  .ilc-dot{width:5px;height:5px;border-radius:50%;background:#CDF815;box-shadow:0 0 6px #CDF815;animation:blink 2s ease-in-out infinite;flex-shrink:0;}
  .ilc-total-row{display:flex;align-items:baseline;gap:8px;margin-bottom:0.9rem;}
  .ilc-total-num{font-family:'Poppins',sans-serif;font-size:36px;font-weight:900;color:#CDF815;line-height:1;text-shadow:0 0 18px rgba(205,248,21,0.5);}
  .ilc-total-text{font-size:11px;color:rgba(255,255,255,0.45);line-height:1.5;}
  .ilc-bars{display:flex;flex-direction:column;gap:5px;}
  .ilc-bar-row{display:flex;align-items:center;gap:7px;}
  .ilc-bar-icon{flex-shrink:0;}
  .ilc-bar-name{font-size:9px;font-weight:600;width:90px;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
  .ilc-bar-track{flex:1;height:4px;border-radius:4px;overflow:hidden;}
  .ilc-bar-fill{height:100%;border-radius:4px;transition:width 1.2s cubic-bezier(0.4,0,0.2,1);}
  .ilc-bar-num{font-size:9px;font-weight:800;width:22px;text-align:right;flex-shrink:0;}

  /* TRANSITIONS */
  .screen-enter{animation:screenIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards;}
  @keyframes screenIn{from{opacity:0;transform:translateY(18px) scale(0.98);}to{opacity:1;transform:translateY(0) scale(1);}}
  @keyframes screenOut{from{opacity:1;transform:translateY(0);}to{opacity:0;transform:translateY(-14px);}}

  /* QUIZ */
  .progress-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:11px;}
  .progress-label{font-size:9px;color:rgba(205,248,21,0.45);letter-spacing:2.5px;text-transform:uppercase;font-weight:700;}
  .progress-frac{font-family:'Poppins',sans-serif;font-size:12px;color:#CDF815;font-weight:800;}
  .progress-track{height:2px;background:rgba(205,248,21,0.1);border-radius:2px;margin-bottom:18px;overflow:hidden;}
  .progress-fill{height:100%;background:linear-gradient(90deg,#CDF815,#BBE732);border-radius:2px;transition:width 0.6s cubic-bezier(0.4,0,0.2,1);box-shadow:0 0 10px rgba(205,248,21,0.8);}
  .step-dots{display:flex;gap:5px;justify-content:center;margin-bottom:1.75rem;}
  .step-dot{height:2px;width:20px;border-radius:2px;background:rgba(205,248,21,0.1);transition:all 0.3s;}
  .step-dot.active{background:#CDF815;width:36px;box-shadow:0 0 9px rgba(205,248,21,0.7);}
  .step-dot.done{background:rgba(205,248,21,0.4);}
  .q-card{background:rgba(0,0,0,0.28);border:1px solid rgba(205,248,21,0.16);border-radius:16px;padding:2.25rem;backdrop-filter:blur(18px);position:relative;overflow:hidden;}
  .q-card::before{content:'';position:absolute;top:0;left:0;width:100%;height:2px;background:linear-gradient(90deg,transparent,#CDF815,transparent);}
  .q-card.exit{animation:screenOut 0.28s cubic-bezier(0.4,0,1,1) forwards;}
  .q-card.enter{animation:screenIn 0.42s cubic-bezier(0.16,1,0.3,1) forwards;}
  .q-number{font-size:9px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:rgba(205,248,21,0.55);margin-bottom:4px;}
  .q-title{font-family:'Poppins',sans-serif;font-size:11px;font-weight:600;color:rgba(205,248,21,0.8);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:0.8rem;}
  .q-text{font-family:'Poppins',sans-serif;font-size:clamp(17px,2vw,23px);font-weight:700;line-height:1.4;color:#fff;margin-bottom:1.4rem;}
  .options-list{display:flex;flex-direction:column;gap:9px;}
  .option-btn{display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:9px;border:1px solid rgba(205,248,21,0.1);background:rgba(255,255,255,0.03);cursor:pointer;transition:all 0.18s;text-align:left;width:100%;}
  .option-btn:hover{border-color:rgba(205,248,21,0.45);background:rgba(205,248,21,0.07);transform:translateX(5px);box-shadow:-3px 0 0 0 #CDF815;}
  .option-btn.selected{border-color:#CDF815;background:rgba(205,248,21,0.1);box-shadow:-3px 0 0 0 #CDF815,0 0 22px rgba(205,248,21,0.18);transform:translateX(5px);}
  .option-btn.disabled{pointer-events:none;opacity:0.4;}
  .opt-letter{width:36px;height:36px;border-radius:7px;display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;font-size:12px;font-weight:800;background:rgba(205,248,21,0.05);border:1px solid rgba(205,248,21,0.18);color:rgba(205,248,21,0.55);flex-shrink:0;transition:all 0.18s;}
  .option-btn:hover .opt-letter,.option-btn.selected .opt-letter{background:#CDF815;border-color:#CDF815;color:#001621;box-shadow:0 0 12px rgba(205,248,21,0.45);}
  .opt-text{font-size:13px;color:rgba(255,255,255,0.65);line-height:1.5;font-weight:500;transition:color 0.18s;}
  .option-btn:hover .opt-text,.option-btn.selected .opt-text{color:#fff;}

  /* RESULT */
  .result-hero{background:rgba(0,0,0,0.28);border:1px solid rgba(205,248,21,0.18);border-radius:16px;padding:2.25rem 1.75rem;margin-bottom:1.1rem;text-align:center;position:relative;overflow:hidden;}
  .result-hero::before{content:'';position:absolute;top:0;left:0;width:100%;height:2px;background:linear-gradient(90deg,transparent,#CDF815,transparent);}
  .result-hero-content{position:relative;z-index:1;}
  .result-icon-wrap{width:86px;height:86px;display:flex;align-items:center;justify-content:center;margin:0 auto 1.1rem;animation:floatRobot 3.5s ease-in-out infinite;}
  .result-tag{font-size:8px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;margin-bottom:0.5rem;color:rgba(205,248,21,0.65);}
  .result-intel-name{font-family:'Poppins',sans-serif;font-size:clamp(22px,3vw,40px);font-weight:900;margin-bottom:6px;line-height:1.1;color:#CDF815;text-shadow:0 0 22px rgba(205,248,21,0.4);}
  .result-thinking-badge{display:inline-flex;align-items:center;gap:6px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:5px 14px;border-radius:50px;margin-bottom:0.9rem;}
  .result-desc{font-size:12px;color:rgba(255,255,255,0.55);line-height:1.8;max-width:480px;margin:0 auto;}
  .glass-card{background:rgba(0,0,0,0.22);border:1px solid rgba(205,248,21,0.1);border-radius:13px;padding:1.4rem;margin-bottom:1.1rem;position:relative;overflow:hidden;}
  .glass-card::before{content:'';position:absolute;top:0;left:0;width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(205,248,21,0.28),transparent);}
  .card-label{font-size:8px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(205,248,21,0.38);margin-bottom:0.9rem;}
  .ai-row{display:flex;align-items:flex-start;gap:13px;}
  .ai-icon-wrap{width:44px;height:44px;border-radius:9px;display:flex;align-items:center;justify-content:center;background:rgba(205,248,21,0.08);border:1px solid rgba(205,248,21,0.22);flex-shrink:0;}
  .ai-name{font-family:'Poppins',sans-serif;font-size:13px;font-weight:700;color:#CDF815;margin-bottom:3px;}
  .ai-desc{font-size:11px;color:rgba(255,255,255,0.45);line-height:1.6;}
  .intel-bars-container{display:flex;flex-direction:column;gap:6px;margin-top:0.2rem;}
  .bar-row{display:flex;align-items:center;gap:9px;padding:8px 11px;border-radius:9px;border:1px solid;transition:transform 0.16s;}
  .bar-row:hover{transform:translateX(3px);}
  .bar-icon-wrap{width:18px;height:18px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .bar-name{font-size:11px;width:106px;text-align:left;flex-shrink:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:600;}
  .bar-track{flex:1;height:5px;border-radius:5px;overflow:hidden;}
  .bar-fill{height:100%;border-radius:5px;transition:width 1.3s cubic-bezier(0.4,0,0.2,1);}
  .bar-num{font-size:11px;width:16px;text-align:right;flex-shrink:0;font-weight:800;}

  /* STATS PANEL */
  .stats-panel-total{display:flex;align-items:center;gap:14px;margin-bottom:1.1rem;padding:14px 18px;background:rgba(205,248,21,0.06);border:1px solid rgba(205,248,21,0.2);border-radius:11px;}
  .stats-total-num{font-family:'Poppins',sans-serif;font-size:36px;font-weight:900;color:#CDF815;line-height:1;text-shadow:0 0 18px rgba(205,248,21,0.45);}
  .stats-total-label{font-size:12px;color:rgba(255,255,255,0.5);line-height:1.6;}
  .stats-total-live{display:inline-flex;align-items:center;gap:5px;font-size:8px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#CDF815;margin-top:4px;}
  .stats-total-dot{width:5px;height:5px;border-radius:50%;background:#CDF815;box-shadow:0 0 6px #CDF815;animation:blink 2s ease-in-out infinite;flex-shrink:0;}
  .thinking-stats-bars{display:flex;flex-direction:column;gap:7px;}
  .thinking-stat-row{display:flex;align-items:center;gap:9px;padding:9px 12px;border-radius:9px;border:1px solid;transition:transform 0.16s;}
  .thinking-stat-row:hover{transform:translateX(3px);}
  .thinking-stat-label{font-size:11px;width:150px;flex-shrink:0;font-weight:600;line-height:1.3;}
  .thinking-stat-track{flex:1;height:5px;border-radius:5px;overflow:hidden;}
  .thinking-stat-fill{height:100%;border-radius:5px;transition:width 1.2s cubic-bezier(0.4,0,0.2,1);}
  .thinking-stat-nums{font-size:11px;width:60px;text-align:right;flex-shrink:0;font-weight:800;opacity:0.9;}

  /* MESAS */
  .mesas-section{margin-bottom:1.1rem;}
  .matrix-intro{font-size:12px;color:rgba(255,255,255,0.5);line-height:1.7;margin-bottom:1rem;}
  .mesas-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
  .mesa-card{border-radius:11px;padding:0.9rem 1rem 1.1rem;border:1.5px solid;position:relative;overflow:hidden;transition:transform 0.2s;}
  .mesa-card:hover{transform:translateY(-2px);}
  .mesa-tipo-badge{display:inline-flex;align-items:center;gap:4px;font-size:7.5px;font-weight:800;letter-spacing:1.8px;text-transform:uppercase;padding:3px 8px;border-radius:50px;margin-bottom:6px;}
  .mesa-tipo-dot{width:4px;height:4px;border-radius:50%;flex-shrink:0;}
  .mesa-herramienta{font-family:'Poppins',sans-serif;font-size:11.5px;font-weight:700;margin-bottom:3px;line-height:1.3;}
  .mesa-desc{font-size:10px;font-weight:400;line-height:1.4;opacity:0.72;}
  .thinking-bars{display:flex;flex-direction:column;gap:6px;}
  .thinking-bar-row{display:flex;align-items:center;gap:9px;padding:8px 11px;border-radius:9px;border:1px solid;transition:transform 0.16s;}
  .thinking-bar-row:hover{transform:translateX(3px);}
  .thinking-bar-name{font-size:11px;width:130px;flex-shrink:0;font-weight:600;}
  .thinking-bar-track{flex:1;height:5px;border-radius:5px;overflow:hidden;}
  .thinking-bar-fill{height:100%;border-radius:5px;transition:width 1.3s cubic-bezier(0.4,0,0.2,1);}
  .thinking-bar-num{font-size:11px;width:16px;text-align:right;flex-shrink:0;font-weight:800;}
  .restart-btn{display:flex;align-items:center;justify-content:center;gap:7px;font-size:11px;font-weight:700;padding:10px 26px;border-radius:50px;border:1px solid rgba(205,248,21,0.28);background:transparent;color:rgba(205,248,21,0.55);cursor:pointer;transition:all 0.22s;font-family:'Poppins',sans-serif;letter-spacing:0.5px;margin-top:1.1rem;text-transform:uppercase;}
  .restart-btn:hover{border-color:#CDF815;color:#CDF815;background:rgba(205,248,21,0.07);}

  /* LOADING */
  .loading-screen{position:fixed;inset:0;z-index:100;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(155deg,#FF4103 0%,#A8320E 15%,#4A2419 35%,#1F1B1C 55%,#031720 80%,#001621 100%);animation:loadingFadeOut 0.6s ease-in-out forwards;animation-delay:2.8s;}
  @keyframes loadingFadeOut{from{opacity:1;}to{opacity:0;pointer-events:none;}}
  .loading-center{display:flex;flex-direction:column;align-items:center;}
  .loading-robot-wrap{margin-bottom:1.75rem;filter:drop-shadow(0 0 28px rgba(205,248,21,0.7));animation:floatRobot 2s ease-in-out infinite;}
  .loading-robot-wrap img{width:130px;height:auto;object-fit:contain;}
  .loading-title{font-family:'Poppins',sans-serif;font-size:clamp(26px,5vw,44px);font-weight:900;color:#CDF815;letter-spacing:5px;margin-bottom:0.45rem;text-transform:uppercase;text-shadow:0 0 28px rgba(205,248,21,0.6);animation:titleReveal 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both;}
  @keyframes titleReveal{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
  .loading-subtitle{font-size:12px;color:rgba(255,255,255,0.45);margin-bottom:1.25rem;animation:titleReveal 0.7s 0.5s both;}
  .loading-badge{display:inline-flex;align-items:center;gap:7px;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#CDF815;background:rgba(205,248,21,0.07);border:1px solid rgba(205,248,21,0.22);padding:7px 16px;border-radius:50px;animation:titleReveal 0.7s 0.7s both;}
  .loading-logo-wrap{margin-top:1.75rem;animation:titleReveal 0.7s 0.9s both;}
  .loading-dot-live{width:5px;height:5px;border-radius:50%;background:#CDF815;box-shadow:0 0 7px #CDF815;animation:blink 1.2s ease-in-out infinite;}

  /* CREDITS */
  .credits-footer{position:fixed;bottom:0;left:0;right:0;z-index:50;display:flex;justify-content:center;align-items:center;padding:10px 20px;background:linear-gradient(to top,rgba(0,22,33,0.97) 0%,rgba(0,22,33,0.0) 100%);pointer-events:none;}
  .credits-inner{display:inline-flex;align-items:center;gap:8px;background:rgba(205,248,21,0.05);border:1px solid rgba(205,248,21,0.18);border-radius:50px;padding:7px 18px;backdrop-filter:blur(10px);}
  .credits-label{font-size:9px;font-weight:600;color:rgba(255,255,255,0.3);letter-spacing:1.8px;text-transform:uppercase;white-space:nowrap;}
  .credits-dot{width:3px;height:3px;background:rgba(205,248,21,0.3);border-radius:50%;flex-shrink:0;}
  .credits-name{font-family:'Poppins',sans-serif;font-size:11px;font-weight:800;color:#CDF815;letter-spacing:0.4px;white-space:nowrap;text-shadow:0 0 9px rgba(205,248,21,0.35);}
  .credits-sep{font-size:10px;color:rgba(205,248,21,0.22);padding:0 1px;}

  /* RESPONSIVE */
  @media (max-width:900px){
    .intro-grid{grid-template-columns:1fr;min-height:auto;}
    .intro-left{padding:3rem 2rem 2rem;align-items:center;text-align:center;border-right:none;border-bottom:1px solid rgba(205,248,21,0.1);}
    .intro-sub{max-width:100%;}
    .intro-right{padding:2.25rem 2rem;}
    .side-panel{display:none;}
    .main-panel{padding:2rem 1.5rem;padding-bottom:4rem;}
    .intro-live-counter{max-width:100%;}
  }
  @media (max-width:640px){
    .intro-left{padding:2.25rem 1.25rem 1.5rem;}
    .intro-title{font-size:34px;}
    .q-card{padding:1.4rem 1rem;}
    .result-hero{padding:1.5rem 1rem;}
    .glass-card{padding:1rem;}
    .mesas-grid{grid-template-columns:1fr;}
    .stats-row{gap:1.5rem;}
    .btn-start{padding:12px 26px;font-size:12px;}
    .thinking-stat-label{width:110px;}
  }
`;

// ─── BG DECO ──────────────────────────────────────────────────────────────────
function BgDeco() {
  return (
    <div className="circuit-deco">
      <div style={{ position:"absolute", left:-18, top:"8%", opacity:0.08 }}>
        <CircuitCorner color="#CDF815" size={140} />
      </div>
      <div style={{ position:"absolute", right:-18, top:"8%", opacity:0.08 }}>
        <CircuitCorner color="#CDF815" size={140} flip={true} />
      </div>
      <div style={{ position:"absolute", left:-18, bottom:"4%", opacity:0.05 }}>
        <CircuitCorner color="#CDF815" size={100} />
      </div>
      <div style={{ position:"absolute", right:-18, bottom:"4%", opacity:0.05 }}>
        <CircuitCorner color="#CDF815" size={100} flip={true} />
      </div>
    </div>
  );
}

// ─── INTRO LIVE COUNTER — bloque que aparece en pantalla principal ─────────────
function IntroLiveCounter() {
  const [stats, setStats] = useState(null);
  const [barsReady, setBarsReady] = useState(false);

  useEffect(() => {
  // 1. Revisar si venimos de un QR con resultados
  const params = new URLSearchParams(window.location.search);
  const qIntel = params.get('intel');
  const qThinking = params.get('thinking');

  if (qIntel && qThinking) {
    // Si existen estos datos, saltamos directamente al resultado
    setPrimaryIntel(qIntel);
    setPrimaryThinking(qThinking);
    setStep('results'); // <--- ASEGÚRATE que 'results' sea el nombre de tu pantalla final
    setBarsReady(false);
    setTimeout(() => setBarsReady(true), 600);
  }

  // 2. Cargar las estadísticas globales de Supabase como ya hacías
  loadStats().then(s => {
    if (s) setStats(s);
    if (!qIntel) { // Solo animamos barras si no saltamos por QR
       setTimeout(() => setBarsReady(true), 400);
    }
  });
}, []);

  const intelOrder = ['logica','linguistica','visual','musical','kinestesica','interpersonal','intrapersonal','naturalista'];

  if (!stats) {
    return (
      <div className="intro-live-counter">
        <div className="ilc-header">
          <span className="ilc-label">Estadísticas globales</span>
          <span className="ilc-live"><span className="ilc-dot"/>En vivo</span>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', textAlign: 'center', padding: '0.5rem 0' }}>
          Cargando datos...
        </div>
      </div>
    );
  }

  const maxVal = Math.max(...intelOrder.map(k => stats[k] || 0), 1);

  return (
    <div className="intro-live-counter">
      <div className="ilc-header">
        <span className="ilc-label">Estadísticas globales</span>
        <span className="ilc-live"><span className="ilc-dot"/>En vivo · Supabase</span>
      </div>

      {/* Total grande */}
      <div className="ilc-total-row">
        <span className="ilc-total-num">{stats.total}</span>
        <span className="ilc-total-text">personas han<br/>completado el test</span>
      </div>

      {/* Mini barras por inteligencia */}
      <div className="ilc-bars">
        {intelOrder.map(key => {
          const intel = INTELLIGENCES[key];
          const val = stats[key] || 0;
          const barW = barsReady && maxVal > 0 ? `${(val / maxVal) * 100}%` : '0%';
          return (
            <div key={key} className="ilc-bar-row">
              <div className="ilc-bar-icon">
                <IntelIcon iconKey={intel.iconKey} size={11} color={intel.color}/>
              </div>
              <span className="ilc-bar-name" style={{ color: intel.color }}>{intel.name}</span>
              <div className="ilc-bar-track" style={{ background: `${intel.color}16` }}>
                <div className="ilc-bar-fill" style={{
                  width: barW,
                  background: `linear-gradient(90deg,${intel.color}70,${intel.color})`,
                  boxShadow: `0 0 5px ${intel.glow}`,
                }}/>
              </div>
              <span className="ilc-bar-num" style={{ color: intel.color }}>{val}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── STATS PANEL (en resultado) ───────────────────────────────────────────────
function StatsPanel({ highlightThinking, highlightIntel }) {
  const [stats, setStats] = useState(null);
  const [barsReady, setBarsReady] = useState(false);

  useEffect(() => {
    loadStats().then(s => {
      setStats(s);
      setTimeout(() => setBarsReady(true), 300);
    });
  }, []);

  if (!stats) return (
    <div className="glass-card" style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>
      Cargando estadísticas globales...
    </div>
  );

  const intelOrder = ['logica','linguistica','visual','musical','kinestesica','interpersonal','intrapersonal','naturalista'];
  const maxIntel = Math.max(...intelOrder.map(k => stats[k] || 0), 1);

  return (
    <div className="glass-card">
      <div className="card-label">Estadísticas globales · Todos los tests realizados</div>

      <div className="stats-panel-total">
        <div className="stats-total-num">{stats.total}</div>
        <div>
          <div className="stats-total-label">personas han completado<br/>este test</div>
          <div className="stats-total-live"><span className="stats-total-dot"/>Datos en tiempo real · Supabase</div>
        </div>
      </div>

      <div className="card-label" style={{ marginTop: '1rem', marginBottom: '0.7rem' }}>
        Distribución global por inteligencia
      </div>
      <div className="thinking-stats-bars">
        {intelOrder.map(key => {
          const intel = INTELLIGENCES[key];
          const val = stats[key] || 0;
          const pct = stats.total > 0 ? Math.round((val / stats.total) * 100) : 0;
          const barW = barsReady ? `${(val / maxIntel) * 100}%` : '0%';
          const isHighlight = key === highlightIntel;
          return (
            <div key={key} className="thinking-stat-row" style={{
              background: isHighlight ? `${intel.color}15` : 'rgba(255,255,255,0.03)',
              borderColor: isHighlight ? `${intel.color}40` : 'rgba(255,255,255,0.06)',
              boxShadow: isHighlight ? `0 2px 16px ${intel.glow}` : 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, width: 150, flexShrink: 0 }}>
                <IntelIcon iconKey={intel.iconKey} size={13} color={intel.color}/>
                <span className="thinking-stat-label" style={{ color: intel.color, width: 'auto' }}>
                  {intel.name}
                  {isHighlight && <span style={{ display: 'block', fontSize: 7, opacity: 0.7, marginTop: 1, fontWeight: 700, letterSpacing: '1px' }}>★ TU RESULTADO</span>}
                </span>
              </div>
              <div className="thinking-stat-track" style={{ background: `${intel.color}16` }}>
                <div className="thinking-stat-fill" style={{
                  width: barW,
                  background: `linear-gradient(90deg,${intel.color}70,${intel.color})`,
                  boxShadow: isHighlight ? `0 0 8px ${intel.glow}` : 'none',
                }}/>
              </div>
              <div className="thinking-stat-nums" style={{ color: intel.color }}>
                {val} <span style={{ fontSize: 9, opacity: 0.6 }}>({pct}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── MATRIX MESAS ─────────────────────────────────────────────────────────────
function MesasMatrix({ primaryIntel, primaryThinking }) {
  const thinkingOrder = ["A", "B", "C", "D"];
  return (
    <div className="glass-card mesas-section">
      <div className="card-label">Matriz de Herramientas · Tu inteligencia en los 4 tipos de pensamiento</div>
      <p className="matrix-intro">
        Basado en tu inteligencia <strong style={{ color: INTELLIGENCES[primaryIntel].color }}>{INTELLIGENCES[primaryIntel].name}</strong>,
        estas son las herramientas IA recomendadas para cada tipo de pensamiento.
        Tu pensamiento dominante es <strong style={{ color: THINKING_TYPES[primaryThinking].color }}>{THINKING_TYPES[primaryThinking].name}</strong>.
      </p>
      <div className="mesas-grid">
        {thinkingOrder.map((tKey) => {
          const t = THINKING_TYPES[tKey];
          const mesa = MATRIX[primaryIntel][tKey];
          const isActive = tKey === primaryThinking;
          return (
            <div key={tKey} className="mesa-card" style={{
              background: isActive ? t.bg : "rgba(0,0,0,0.18)",
              borderColor: isActive ? t.border : "rgba(255,255,255,0.08)",
              boxShadow: isActive ? `0 3px 20px ${t.glow}` : "none",
            }}>
              <div className="mesa-tipo-badge" style={{ background: isActive ? t.badge : "rgba(255,255,255,0.06)", color: isActive ? t.color : "rgba(255,255,255,0.4)" }}>
                <span className="mesa-tipo-dot" style={{ background: isActive ? t.color : "rgba(255,255,255,0.3)" }} />
                {t.label} · {t.name}
                {isActive && <span style={{ marginLeft: 3, fontSize: 7 }}>★ TU PERFIL</span>}
              </div>
              <div className="mesa-herramienta" style={{ color: isActive ? t.color : "rgba(255,255,255,0.75)" }}>
                {mesa.herramienta}
              </div>
              <div className="mesa-desc" style={{ color: isActive ? t.color : "rgba(255,255,255,0.4)" }}>
                {mesa.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── INTRO SCREEN ─────────────────────────────────────────────────────────────
function IntroScreen({ onStart }) {
  return (
    <div className="intro-grid screen-enter">
      {/* LEFT: título, botón, stats fijos */}
      <div className="intro-left">
        <div className="intro-logo-wrap"><AiModeLogo scale={1} /></div>
        <div className="intro-tagline">Activa el modo IA. Enciende tu vida</div>
        <div className="intro-badge">Test de Inteligencias Múltiples</div>
        <h1 className="intro-title">Descubre tu<br /><span className="grad">superpoder<br />cognitivo</span></h1>
        <p className="intro-sub">
          Basado en la teoría de Howard Gardner y la Matriz de Herramientas IA,
          este test identifica tu inteligencia dominante y tu tipo de pensamiento
          para recomendarte las mejores herramientas IA.
        </p>
        <button className="btn-start" onClick={onStart}>Comenzar el test →</button>
        <div className="stats-row">
          <div className="stat-item"><span className="stat-num">8</span><span className="stat-label">Inteligencias</span></div>
          <div className="stat-item"><span className="stat-num">4</span><span className="stat-label">Pensamientos</span></div>
          <div className="stat-item"><span className="stat-num">6</span><span className="stat-label">Preguntas</span></div>
        </div>
      </div>

      {/* RIGHT: robot + pills + CONTADORES EN VIVO */}
      <div className="intro-right">
        <div className="intro-circuit-corner-l"><CircuitCorner color="#CDF815" size={110} /></div>
        <div className="intro-circuit-corner-r"><CircuitCorner color="#CDF815" size={110} /></div>
        <div className="intro-circuit-top">
          <svg width="160" height="18" fill="none">
            <line x1="0" y1="9" x2="64" y2="9" stroke="#CDF815" strokeWidth="1"/>
            <circle cx="70" cy="9" r="5" stroke="#CDF815" strokeWidth="1" fill="none"/>
            <line x1="76" y1="9" x2="160" y2="9" stroke="#CDF815" strokeWidth="1"/>
          </svg>
        </div>
        <div className="intro-robot-wrap">
          <RobotImage size={300} />
        </div>
        <div className="intro-circuit-bottom">
          <svg width="160" height="18" fill="none">
            <line x1="0" y1="9" x2="64" y2="9" stroke="#CDF815" strokeWidth="1"/>
            <circle cx="70" cy="9" r="5" stroke="#CDF815" strokeWidth="1" fill="none"/>
            <line x1="76" y1="9" x2="160" y2="9" stroke="#CDF815" strokeWidth="1"/>
          </svg>
        </div>
        <div className="intel-pills" style={{ marginBottom: '0.85rem' }}>
          {Object.entries(INTELLIGENCES).map(([key, intel]) => (
            <span key={key} className="intel-pill" style={{ border:`1px solid ${intel.color}44`, color:intel.color, background:`${intel.color}12` }}>
              <IntelIcon iconKey={intel.iconKey} size={12} color={intel.color}/>{intel.name}
            </span>
          ))}
        </div>

        {/* ★ CONTADORES EN VIVO — aparecen aquí en la pantalla principal */}
        <IntroLiveCounter />
      </div>
    </div>
  );
}

// ─── QUIZ SCREEN ──────────────────────────────────────────────────────────────
function QuizScreen({ qIndex, onAnswer }) {
  const [phase, setPhase] = useState("enter");
  const [selected, setSelected] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const prevIndex = useRef(qIndex);

  useEffect(() => {
    if (prevIndex.current !== qIndex) {
      setPhase("enter"); setSelected(null); setDisabled(false);
      prevIndex.current = qIndex;
    }
  }, [qIndex]);

  const q = QUESTIONS[qIndex];
  const pct = (qIndex / QUESTIONS.length) * 100;

  const handleSelect = (i) => {
    if (disabled) return;
    setSelected(i); setDisabled(true); setPhase("exit");
    setTimeout(() => onAnswer(q.options[i]), 380);
  };

  return (
    <>
      <div className="side-panel">
        <div className="side-logo-wrap"><AiModeLogo scale={0.82} /></div>
        <div className="side-robot-wrap"><RobotImage size={140} /></div>
        <div className="side-badge">Inteligencias Múltiples</div>
        <h2 className="side-title">Descubre tu<br /><span className="grad">perfil cognitivo</span></h2>
        <p className="side-sub">Responde con honestidad.<br />No hay respuestas incorrectas.</p>
        <div className="intel-pills">
          {Object.entries(INTELLIGENCES).map(([key, intel]) => (
            <span key={key} className="intel-pill" style={{ border:`1px solid ${intel.color}44`, color:intel.color, background:`${intel.color}12` }}>
              <IntelIcon iconKey={intel.iconKey} size={11} color={intel.color}/>{intel.name}
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
          <div className="progress-track"><div className="progress-fill" style={{ width:`${pct}%` }}/></div>
          <div className="step-dots">
            {QUESTIONS.map((_, i) => (
              <div key={i} className={`step-dot ${i < qIndex ? "done" : i === qIndex ? "active" : ""}`}/>
            ))}
          </div>
          <div className={`q-card ${phase}`}>
            <div className="q-number">Pregunta {qIndex + 1} de {QUESTIONS.length}</div>
            <div className="q-title">{q.title}</div>
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

// ─── RESULT SCREEN ────────────────────────────────────────────────────────────
function ResultScreen({ answers, onRestart }) {
  const [barsReady, setBarsReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setBarsReady(true), 350); return () => clearTimeout(t); }, []);

  const { primaryIntel, secondaryIntel, primaryThinking, intelScores, thinkingScores } = computeResult(answers);

  const primary = INTELLIGENCES[primaryIntel];
  const secondary = INTELLIGENCES[secondaryIntel];
  const thinking = THINKING_TYPES[primaryThinking];
  const profile = PROFILES[primaryIntel];

  const sortedIntel = Object.entries(intelScores).sort((a, b) => b[1] - a[1]).filter(([, v]) => v > 0);
  const maxIntel = sortedIntel[0]?.[1] || 1;
  const maxThinking = Math.max(...Object.values(thinkingScores), 1);

  return (
    <>
      <div className="side-panel">
        <div className="side-logo-wrap"><AiModeLogo scale={0.82} /></div>
        <div className="side-robot-wrap" style={{ filter:`drop-shadow(0 0 22px ${primary.glow})` }}>
          <RobotImage size={140} />
        </div>
        <div className="side-badge">Tu resultado</div>
        <h2 className="side-title" style={{ color: primary.color }}>{primary.name}</h2>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6, fontSize: 10, fontWeight: 700,
          letterSpacing: "1.5px", textTransform: "uppercase", padding: "5px 12px",
          borderRadius: 50, border: `1px solid ${thinking.color}44`,
          background: `${thinking.color}12`, color: thinking.color, marginBottom: "0.8rem"
        }}>
          {thinking.label} · {thinking.name}
        </div>
        <p className="side-sub">{profile.desc}</p>
        <button className="restart-btn" onClick={onRestart}>↺ Repetir test</button>
      </div>
      <div className="main-panel">
        <div className="main-inner">
          <div className="screen-enter">

            {/* HERO */}
            <div className="result-hero">
              <div className="result-hero-content">
                <div className="result-icon-wrap" style={{ filter:`drop-shadow(0 0 18px ${primary.glow})` }}>
                  <IntelIcon iconKey={primary.iconKey} size={78} color={primary.color}/>
                </div>
                <div className="result-tag">Tu inteligencia dominante</div>
                <div className="result-intel-name">[{primary.name}]</div>
                <div className="result-thinking-badge" style={{ background: `${thinking.color}18`, border: `1px solid ${thinking.color}44`, color: thinking.color }}>
                  {thinking.label} · {thinking.name}
                </div>
                <p className="result-desc">{profile.desc}</p>
              </div>
            </div>

            {/* THINKING SCORES */}
            <div className="glass-card">
              <div className="card-label">Tu distribución por tipo de pensamiento</div>
              <div className="thinking-bars">
                {Object.entries(THINKING_TYPES).map(([tKey, t]) => {
                  const val = thinkingScores[tKey] || 0;
                  const pct = barsReady ? `${(val / maxThinking) * 100}%` : "0%";
                  const isActive = tKey === primaryThinking;
                  return (
                    <div className="thinking-bar-row" key={tKey}
                      style={{ background: `${t.color}10`, borderColor: `${t.color}25`, opacity: isActive ? 1 : 0.6 }}
                    >
                      <div className="thinking-bar-name" style={{ color: t.color }}>
                        {t.label} · {t.name}
                      </div>
                      <div className="thinking-bar-track" style={{ background: `${t.color}16` }}>
                        <div className="thinking-bar-fill" style={{ width: pct, background: `linear-gradient(90deg,${t.color}88,${t.color})`, boxShadow: `0 0 7px ${t.glow}` }}/>
                      </div>
                      <div className="thinking-bar-num" style={{ color: t.color }}>{val}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* HERRAMIENTA */}
            <div className="glass-card">
              <div className="card-label">Tu herramienta IA recomendada</div>
              <div className="ai-row">
                <div className="ai-icon-wrap"><IntelIcon iconKey={primary.iconKey} size={22} color={primary.color}/></div>
                <div style={{ flex:1 }}>
                  <div className="ai-name">{profile.ai}</div>
                  <div className="ai-desc">{profile.aiDesc}</div>
                </div>
              </div>
            </div>

            {/* MATRIX MESAS */}
            <MesasMatrix primaryIntel={primaryIntel} primaryThinking={primaryThinking} />

            {/* STATS GLOBALES */}
            <StatsPanel highlightThinking={primaryThinking} highlightIntel={primaryIntel} />

            {/* INTEL BARS */}
            <div className="glass-card">
              <div className="card-label">Tu perfil completo de inteligencias</div>
              <div className="intel-bars-container">
                {sortedIntel.map(([k, v]) => {
                  const col = INTELLIGENCES[k].color;
                  const glw = INTELLIGENCES[k].glow;
                  const pct = barsReady ? `${(v / maxIntel) * 100}%` : "0%";
                  return (
                    <div className="bar-row" key={k} style={{ background:`${col}10`, borderColor:`${col}25` }}>
                      <div className="bar-icon-wrap"><IntelIcon iconKey={INTELLIGENCES[k].iconKey} size={15} color={col}/></div>
                      <div className="bar-name" style={{ color:col }}>{INTELLIGENCES[k].name}</div>
                      <div className="bar-track" style={{ background:`${col}16` }}>
                        <div className="bar-fill" style={{ width:pct, background:`linear-gradient(90deg,${col}88,${col})`, boxShadow:`0 0 7px ${glw}` }}/>
                      </div>
                      <div className="bar-num" style={{ color:col }}>{v}</div>
                    </div>
                  );
                })}
              </div>
            </div>



            <DownloadSection 
              primary={primary} 
              thinking={thinking} 
              profile={profile}
              matrixItem={MATRIX[primaryIntel][primaryThinking]}
              primaryIntel={primaryIntel}       
              primaryThinking={primaryThinking}
            />


            <div style={{ textAlign:"center" }}>
              <button className="restart-btn" onClick={onRestart} style={{ margin:"0 auto" }}>↺ Repetir el test</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

// ─── LOADING SCREEN ───────────────────────────────────────────────────────────
function LoadingScreen({ onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3200); return () => clearTimeout(t); }, [onDone]);
  return (
    <div className="loading-screen">
      <div className="loading-center">
        <div className="loading-robot-wrap"><RobotImage size={130} /></div>
        <h1 className="loading-title">Analizando</h1>
        <p className="loading-subtitle">Procesando tu perfil cognitivo...</p>
        <div className="loading-badge"><span className="loading-dot-live"/>IA Orchestrator activa</div>
        <div className="loading-logo-wrap"><AiModeLogo scale={0.85}/></div>
      </div>
    </div>
  );
}

// ─── CREDITS ──────────────────────────────────────────────────────────────────
function CreditsFooter() {
  return (
    <div className="credits-footer">
      <div className="credits-inner">
        <span className="credits-label">Creado por</span>
        <span className="credits-dot"/>
        <span className="credits-name">Alba Gomez</span>
        <span className="credits-sep">&amp;</span>
        <span className="credits-name">Erika Veramendi</span>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function MultipleIntelligencesTest() {
  const [screen, setScreen] = useState("intro");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const [pendingAnswers, setPendingAnswers] = useState(null);

  const handleStart = () => { setQIndex(0); setAnswers([]); setScreen("quiz"); };

  const handleAnswer = (option) => {
    const next = [...answers, option];
    setAnswers(next);
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      setPendingAnswers(next);
      setShowLoading(true);
      const { primaryIntel } = computeResult(next);
      saveTestResult(primaryIntel);
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
        <BgDeco/>
        <div className="grid-overlay"/>
        {showLoading && <LoadingScreen onDone={handleLoadingDone}/>}
        <div className="mit-container" style={isIntro ? {} : { display:"flex" }}>
          {screen === "intro"  && <IntroScreen onStart={handleStart}/>}
          {screen === "quiz"   && <QuizScreen key={qIndex} qIndex={qIndex} onAnswer={handleAnswer}/>}
          {screen === "result" && <ResultScreen answers={displayAnswers} onRestart={handleRestart}/>}
        </div>
        <CreditsFooter/>
      </div>
    </>
  );
}