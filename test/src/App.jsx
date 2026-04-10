import { useState, useEffect, useRef } from "react";

// ─── PALETA OFICIAL ───────────────────────────────────────────────────────────
const C = {
  lime:  "#CDF815",
  lime2: "#C8F006",
  lime3: "#BBE732",
  white: "#FFFFFF",
};

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
      <line x1="7" y1="23" x2="11" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="11" y1="23" x2="7" y2="25" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
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

// ─── ROBOT SVG ANIMADO (estilo circuito del banner) ────────────────────────────
function RobotIcon({ size = 160, color = "#CDF815" }) {
  return (
    <svg width={size} height={size * 1.25} viewBox="0 0 160 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="80" y1="8" x2="80" y2="28" stroke={color} strokeWidth="2" strokeLinecap="round"/>
      <circle cx="80" cy="5" r="4" stroke={color} strokeWidth="2" fill="none"/>
      <circle cx="80" cy="5" r="1.5" fill={color}/>
      <rect x="38" y="28" width="84" height="62" rx="12" stroke={color} strokeWidth="2" fill="none"/>
      <rect x="50" y="44" width="22" height="16" rx="5" stroke={color} strokeWidth="2" fill="none"/>
      <rect x="88" y="44" width="22" height="16" rx="5" stroke={color} strokeWidth="2" fill="none"/>
      <circle cx="57" cy="51" r="4" fill={color} opacity="0.9"/>
      <circle cx="99" cy="51" r="4" fill={color} opacity="0.9"/>
      <rect x="54" y="70" width="52" height="9" rx="4.5" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="63" y1="70" x2="63" y2="79" stroke={color} strokeWidth="1.2"/>
      <line x1="72" y1="70" x2="72" y2="79" stroke={color} strokeWidth="1.2"/>
      <line x1="80" y1="70" x2="80" y2="79" stroke={color} strokeWidth="1.2"/>
      <line x1="88" y1="70" x2="88" y2="79" stroke={color} strokeWidth="1.2"/>
      <line x1="97" y1="70" x2="97" y2="79" stroke={color} strokeWidth="1.2"/>
      <rect x="24" y="42" width="14" height="30" rx="5" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="24" y1="52" x2="38" y2="52" stroke={color} strokeWidth="1.2"/>
      <line x1="24" y1="60" x2="38" y2="60" stroke={color} strokeWidth="1.2"/>
      <rect x="122" y="42" width="14" height="30" rx="5" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="122" y1="52" x2="136" y2="52" stroke={color} strokeWidth="1.2"/>
      <line x1="122" y1="60" x2="136" y2="60" stroke={color} strokeWidth="1.2"/>
      <rect x="66" y="90" width="28" height="12" rx="4" stroke={color} strokeWidth="1.5" fill="none"/>
      <rect x="28" y="102" width="104" height="68" rx="10" stroke={color} strokeWidth="2" fill="none"/>
      <rect x="46" y="114" width="68" height="42" rx="7" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="80" cy="135" r="15" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="80" cy="135" r="7" stroke={color} strokeWidth="1.5" fill="none"/>
      <circle cx="80" cy="135" r="2.5" fill={color}/>
      <line x1="46" y1="124" x2="62" y2="124" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="46" y1="130" x2="58" y2="130" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="98" y1="124" x2="114" y2="124" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="102" y1="130" x2="114" y2="130" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <rect x="2" y="106" width="26" height="48" rx="8" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="2" y1="120" x2="28" y2="120" stroke={color} strokeWidth="1.2"/>
      <line x1="2" y1="130" x2="28" y2="130" stroke={color} strokeWidth="1.2"/>
      <rect x="132" y="106" width="26" height="48" rx="8" stroke={color} strokeWidth="1.5" fill="none"/>
      <line x1="132" y1="120" x2="158" y2="120" stroke={color} strokeWidth="1.2"/>
      <line x1="132" y1="130" x2="158" y2="130" stroke={color} strokeWidth="1.2"/>
      <rect x="5" y="154" width="20" height="12" rx="4" stroke={color} strokeWidth="1.2" fill="none"/>
      <rect x="135" y="154" width="20" height="12" rx="4" stroke={color} strokeWidth="1.2" fill="none"/>
      <rect x="42" y="170" width="30" height="22" rx="6" stroke={color} strokeWidth="1.5" fill="none"/>
      <rect x="88" y="170" width="30" height="22" rx="6" stroke={color} strokeWidth="1.5" fill="none"/>
      <rect x="38" y="192" width="38" height="8" rx="4" stroke={color} strokeWidth="1.2" fill="none"/>
      <rect x="84" y="192" width="38" height="8" rx="4" stroke={color} strokeWidth="1.2" fill="none"/>
    </svg>
  );
}

// ─── PANEL DE CIRCUITO (igual al banner — columnas laterales) ─────────────────
function CircuitPanel({ color = "#CDF815", size = 180 }) {
  const h = size * 1.5;
  return (
    <svg width={size} height={h} viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="110" height="170" rx="6" stroke={color} strokeWidth="1.2" fill="none"/>
      <rect x="15" y="15" width="35" height="28" rx="3" stroke={color} strokeWidth="1" fill="none"/>
      <line x1="15" y1="24" x2="35" y2="24" stroke={color} strokeWidth="0.8"/>
      <line x1="15" y1="30" x2="30" y2="30" stroke={color} strokeWidth="0.8"/>
      <rect x="70" y="15" width="35" height="28" rx="3" stroke={color} strokeWidth="1" fill="none"/>
      <line x1="70" y1="24" x2="90" y2="24" stroke={color} strokeWidth="0.8"/>
      <line x1="70" y1="30" x2="85" y2="30" stroke={color} strokeWidth="0.8"/>
      <line x1="5" y1="50" x2="0" y2="50" stroke={color} strokeWidth="1"/>
      <line x1="5" y1="60" x2="0" y2="60" stroke={color} strokeWidth="1"/>
      <line x1="5" y1="70" x2="0" y2="70" stroke={color} strokeWidth="1"/>
      <circle cx="0" cy="50" r="2.5" fill={color} opacity="0.7"/>
      <circle cx="0" cy="60" r="2.5" fill={color} opacity="0.7"/>
      <circle cx="0" cy="70" r="2.5" fill={color} opacity="0.7"/>
      <line x1="115" y1="50" x2="120" y2="50" stroke={color} strokeWidth="1"/>
      <line x1="115" y1="60" x2="120" y2="60" stroke={color} strokeWidth="1"/>
      <line x1="115" y1="70" x2="120" y2="70" stroke={color} strokeWidth="1"/>
      <circle cx="120" cy="50" r="2.5" fill={color} opacity="0.7"/>
      <circle cx="120" cy="60" r="2.5" fill={color} opacity="0.7"/>
      <circle cx="120" cy="70" r="2.5" fill={color} opacity="0.7"/>
      <circle cx="60" cy="110" r="38" stroke={color} strokeWidth="1.2" fill="none"/>
      <circle cx="60" cy="110" r="24" stroke={color} strokeWidth="0.8" fill="none" strokeDasharray="3 3"/>
      <circle cx="60" cy="110" r="10" stroke={color} strokeWidth="1.2" fill="none"/>
      <circle cx="60" cy="110" r="3" fill={color} opacity="0.9"/>
      <line x1="60" y1="72" x2="60" y2="82" stroke={color} strokeWidth="1.2"/>
      <line x1="60" y1="138" x2="60" y2="148" stroke={color} strokeWidth="1.2"/>
      <line x1="22" y1="110" x2="32" y2="110" stroke={color} strokeWidth="1.2"/>
      <line x1="88" y1="110" x2="98" y2="110" stroke={color} strokeWidth="1.2"/>
      <rect x="15" y="158" width="90" height="14" rx="3" stroke={color} strokeWidth="0.8" fill="none"/>
      <line x1="22" y1="165" x2="55" y2="165" stroke={color} strokeWidth="0.8"/>
      <circle cx="70" cy="165" r="3" stroke={color} strokeWidth="0.8" fill="none"/>
      <circle cx="84" cy="165" r="3" stroke={color} strokeWidth="0.8" fill="none"/>
      <circle cx="98" cy="165" r="3" stroke={color} strokeWidth="0.8" fill="none"/>
      <line x1="60" y1="172" x2="60" y2="180" stroke={color} strokeWidth="1"/>
      <circle cx="60" cy="180" r="2.5" fill={color} opacity="0.6"/>
    </svg>
  );
}

// ─── LOGO OFICIAL ─────────────────────────────────────────────────────────────
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

// ─── DATA ─────────────────────────────────────────────────────────────────────
const INTELLIGENCES = {
  logica:        { name: "Lógico-Matemática",  iconKey: "logica",        color: "#6366F1", glow: "rgba(99,102,241,0.45)"   },
  linguistica:   { name: "Lingüística",         iconKey: "linguistica",   color: "#38BDF8", glow: "rgba(56,189,248,0.45)"   },
  visual:        { name: "Visual-Espacial",      iconKey: "visual",        color: "#A78BFA", glow: "rgba(167,139,250,0.45)"  },
  musical:       { name: "Musical",             iconKey: "musical",       color: "#F472B6", glow: "rgba(244,114,182,0.45)"  },
  kinestesica:   { name: "Cinético-Corporal",   iconKey: "kinestesica",   color: "#FBBF24", glow: "rgba(251,191,36,0.45)"   },
  interpersonal: { name: "Interpersonal",       iconKey: "interpersonal", color: "#34D399", glow: "rgba(52,211,153,0.45)"   },
  intrapersonal: { name: "Intrapersonal",       iconKey: "intrapersonal", color: "#F87171", glow: "rgba(248,113,113,0.45)"  },
  naturalista:   { name: "Naturalista",         iconKey: "naturalista",   color: "#4ADE80", glow: "rgba(74,222,128,0.45)"   },
};

function IntelIcon({ iconKey, size = 32, color = "currentColor", style = {} }) {
  const Icon = ICONS[iconKey];
  if (!Icon) return null;
  return <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", ...style }}><Icon size={size} color={color} /></span>;
}

const MESAS = {
  logica:        [{ tipo:"Inductiva",herramienta:"ChatGPT + Notion",desc:"Lógico-matemática aplicada"},{ tipo:"Deductiva",herramienta:"Claude 3.5 + Wolfram Alpha",desc:"Cálculo y lógica pura"},{ tipo:"Convergente",herramienta:"Claude 3.5 Alpha",desc:"Análisis enfocado"},{ tipo:"Divergente",herramienta:"ChatGPT",desc:"Lluvia de ideas lógicas"},{ tipo:"Creativa",herramienta:"ChatGPT",desc:"Modelado de soluciones"}],
  linguistica:   [{ tipo:"Inductiva",herramienta:"Perplexity",desc:"Investigación avanzada"},{ tipo:"Deductiva",herramienta:"DALL-E / Midjourney vía texto",desc:"Generación de imágenes"},{ tipo:"Convergente",herramienta:"Wolfram a Cattalho",desc:"Análisis lingüístico"},{ tipo:"Divergente",herramienta:"ChatGPT + Notion",desc:"Redacción y lluvia de ideas"},{ tipo:"Creativa",herramienta:"ChatGPT + Notion",desc:"Redacción creativa"}],
  visual:        [{ tipo:"Inductiva",herramienta:"DALL-E + Notion",desc:"Pensamiento espacial"},{ tipo:"Deductiva",herramienta:"Prompt Engineering",desc:"Redacción de imágenes"},{ tipo:"Convergente",herramienta:"Gestión lingüística-visual",desc:"Síntesis visual"},{ tipo:"Divergente",herramienta:"Redacción visual",desc:"Lluvia de ideas visuales"},{ tipo:"Creativa",herramienta:"Midjourney / Adobe Firefly",desc:"Generación de imágenes"}],
  musical:       [{ tipo:"Inductiva",herramienta:"Midjourney",desc:"Inspiración visual para música"},{ tipo:"Deductiva",herramienta:"Suno AI",desc:"Composición musical"},{ tipo:"Convergente",herramienta:"Luma AI",desc:"Estructura sonora"},{ tipo:"Divergente",herramienta:"Avera AI",desc:"Exploración de ritmos"},{ tipo:"Creativa",herramienta:"Suno AI",desc:"Composición avanzada"}],
  kinestesica:   [{ tipo:"Inductiva",herramienta:"Midjourney",desc:"Diseño de movimiento"},{ tipo:"Deductiva",herramienta:"ChatGPT + Notion",desc:"Rutinas y protocolos"},{ tipo:"Convergente",herramienta:"Luma AI",desc:"Captura de movimiento / 3D"},{ tipo:"Divergente",herramienta:"Asana + Luma AI",desc:"Flujos físicos"},{ tipo:"Creativa",herramienta:"Asana AI",desc:"Planificación de acción"}],
  interpersonal: [{ tipo:"Inductiva",herramienta:"IA social",desc:"Cálculo matemático social"},{ tipo:"Deductiva",herramienta:"Gong",desc:"Análisis de reuniones"},{ tipo:"Convergente",herramienta:"Suno",desc:"Composición colaborativa"},{ tipo:"Divergente",herramienta:"ChatGPT + Notion",desc:"Gestión de equipos"},{ tipo:"Creativa",herramienta:"Avera AI",desc:"Liderazgo con IA"}],
  intrapersonal: [{ tipo:"Inductiva",herramienta:"IA de bienestar",desc:"Equipos sonrientes"},{ tipo:"Deductiva",herramienta:"Avera AI",desc:"Análisis de metas"},{ tipo:"Convergente",herramienta:"IA de productividad",desc:"Objetivos y foco"},{ tipo:"Divergente",herramienta:"ChatGPT",desc:"Diario reflexivo con IA"},{ tipo:"Creativa",herramienta:"Runway",desc:"Visiones personales"}],
  naturalista:   [{ tipo:"Inductiva",herramienta:"Perplexity",desc:"Investigación ecológica"},{ tipo:"Deductiva",herramienta:"Patrones de la naturaleza",desc:"Organización musical"},{ tipo:"Convergente",herramienta:"Avera AI",desc:"Sostenibilidad"},{ tipo:"Divergente",herramienta:"Tableau",desc:"Datos ambientales"},{ tipo:"Creativa",herramienta:"AI Mode: LIFE ON",desc:"Bio-innovación"}],
};

const MESA_COLORS = {
  Inductiva:   { bg:"rgba(79,70,229,0.12)",  border:"rgba(79,70,229,0.30)",  label:"#6366F1", text:"#E0E7FF", badge:"rgba(99,102,241,0.20)",  glow:"rgba(99,102,241,0.25)"  },
  Deductiva:   { bg:"rgba(14,165,233,0.12)", border:"rgba(14,165,233,0.30)", label:"#38BDF8", text:"#E0F2FE", badge:"rgba(56,189,248,0.20)",  glow:"rgba(56,189,248,0.25)"  },
  Convergente: { bg:"rgba(139,92,246,0.12)", border:"rgba(139,92,246,0.30)", label:"#A78BFA", text:"#EDE9FE", badge:"rgba(167,139,250,0.20)", glow:"rgba(167,139,250,0.25)" },
  Divergente:  { bg:"rgba(236,72,153,0.12)", border:"rgba(236,72,153,0.30)", label:"#F472B6", text:"#FCE7F3", badge:"rgba(244,114,182,0.20)", glow:"rgba(244,114,182,0.25)" },
  Creativa:    { bg:"rgba(245,158,11,0.12)", border:"rgba(245,158,11,0.30)", label:"#FBBF24", text:"#FEF3C7", badge:"rgba(251,191,36,0.20)",  glow:"rgba(251,191,36,0.25)"  },
};

const PROFILES = {
  logica:        { desc:"Tu mente funciona como un procesador: detectas patrones, razonas con precisión y disfrutas de los desafíos lógicos.", perfil:"Análisis y cálculo predictivo. Resolución de problemas y modelado lógico.", ai:"Claude 3.5 / Análisis Predictivo", aiDesc:"Potencia tus cálculos y análisis con modelos de lenguaje avanzados." },
  linguistica:   { desc:"Las palabras son tu superpoder. Comunicas ideas con claridad y disfrutas de la lectura y el debate.", perfil:"IA generativa de texto (LLM). Creación de contenido y storytelling.", ai:"Claude / GPT-4 Turbo", aiDesc:"Genera contenido, escribe historias y comunica con precisión." },
  visual:        { desc:"Piensas en imágenes y espacios. Tu mente visualiza soluciones antes de escribirlas. Sobresales en diseño y arte.", perfil:"IA generativa de imágenes. Diseño visual y creatividad aumentada.", ai:"Midjourney / DALL-E 3", aiDesc:"Crea y explora mundos visuales con IA generativa." },
  musical:       { desc:"Tu cerebro está sintonizado con el ritmo, la melodía y los patrones sonoros. Procesas el mundo a través del sonido.", perfil:"IA de síntesis y composición. Creación sonora y producción algorítmica.", ai:"Suno / Udio", aiDesc:"Compón música y explora la creatividad sonora con IA avanzada." },
  kinestesica:   { desc:"Aprendes haciendo. Tu inteligencia vive en tus manos y tu cuerpo. Destacas en actividades físicas y manualidades.", perfil:"IA aplicada al movimiento. Interacción dinámica y prototipado físico.", ai:"Robótica + ML / Simuladores", aiDesc:"Crea con tus manos potenciada por IA." },
  interpersonal: { desc:"Eres un conector de personas. Entiendes emociones y motivaciones. Lideras y construyes comunidades naturalmente.", perfil:"IA colaborativa multiagente. Simulación social y trabajo en equipo.", ai:"Asana / Slack IA", aiDesc:"Facilita el trabajo en equipo y la gestión de proyectos." },
  intrapersonal: { desc:"Tu mayor laboratorio eres tú mismo. Tienes profunda conciencia de tus emociones, metas y procesos mentales.", perfil:"IA de reflexión y orientación. Autoconocimiento y orientación vocacional.", ai:"Claude / Woebot", aiDesc:"Explora ideas, emociones y crecimiento personal con IA reflexiva." },
  naturalista:   { desc:"Observas patrones en la naturaleza. Comprendes sistemas complejos y clasificas información ambiental con facilidad.", perfil:"IA de análisis de entorno. Clasificación de datos y análisis contextual.", ai:"TensorFlow / Análisis Ecológico", aiDesc:"Analiza datos ambientales y patrones naturales con IA." },
};

const QUESTIONS = [
  { text:"Si tienes que resolver un problema importante, ¿qué haces primero?", options:[{text:"Analizo datos, números o patrones",key:"logica"},{text:"Lo explico con palabras o lo escribo",key:"linguistica"},{text:"Hago un dibujo o esquema mental",key:"visual"},{text:"Hablo con alguien para entender mejor",key:"interpersonal"}] },
  { text:"¿Qué actividad te gusta más en tus ratos libres?", options:[{text:"Resolver acertijos o juegos de ingenio",key:"logica"},{text:"Escribir, leer o debatir ideas",key:"linguistica"},{text:"Diseñar, dibujar o editar fotos",key:"visual"},{text:"Escuchar música o crear ritmos",key:"musical"}] },
  { text:"Cuando aprendes algo nuevo, prefieres:", options:[{text:"Ver cómo funciona la lógica detrás",key:"logica"},{text:"Ver imágenes, gráficos o videos",key:"visual"},{text:"Practicar haciendo algo físico",key:"kinestesica"},{text:"Observar cómo encaja en la naturaleza",key:"naturalista"}] },
  { text:"En un grupo de trabajo, tu rol suele ser:", options:[{text:"El que comunica y explica las ideas",key:"linguistica"},{text:"El que motiva y conecta al equipo",key:"interpersonal"},{text:"El que reflexiona sobre la estrategia",key:"intrapersonal"},{text:"El que organiza el movimiento y acción",key:"kinestesica"}] },
  { text:"¿Qué te llama más la atención de un nuevo entorno?", options:[{text:"El orden y la estructura del lugar",key:"logica"},{text:"Los sonidos, música o ambiente sonoro",key:"musical"},{text:"La flora, fauna o elementos naturales",key:"naturalista"},{text:"Las personas y cómo interactúan",key:"interpersonal"}] },
  { text:"Si pudieras tener un superpoder, ¿cuál elegirías?", options:[{text:"Memoria perfecta para textos y frases",key:"linguistica"},{text:"Habilidad física y agilidad extrema",key:"kinestesica"},{text:"Conocimiento profundo de tu mente",key:"intrapersonal"},{text:"Comprender el lenguaje de la naturaleza",key:"naturalista"}] },
  { text:"Al tomar una decisión difícil, confías más en:", options:[{text:"El análisis de pros y contras",key:"logica"},{text:"Tu intuición y paz interior",key:"intrapersonal"},{text:"Lo que dicen tus mentores o amigos",key:"interpersonal"},{text:"Cómo se siente el ritmo del proyecto",key:"musical"}] },
  { text:"Te sientes más cómodo/a trabajando con:", options:[{text:"Herramientas de diseño y dibujo",key:"visual"},{text:"Instrumentos o software de sonido",key:"musical"},{text:"Tus propias manos y movimiento",key:"kinestesica"},{text:"Sistemas biológicos o ambientales",key:"naturalista"}] },
  { text:"¿Qué tipo de libros o contenido prefieres?", options:[{text:"Novelas, poemas o ensayos",key:"linguistica"},{text:"Guías visuales o libros de arte",key:"visual"},{text:"Biografías de personas inspiradoras",key:"interpersonal"},{text:"Libros de meditación y psicología",key:"intrapersonal"}] },
  { text:"¿Cuál de estos es tu mayor talento?", options:[{text:"Encontrar errores en un sistema",key:"logica"},{text:"Recordar melodías con facilidad",key:"musical"},{text:"Coordinar movimientos difíciles",key:"kinestesica"},{text:"Categorizar y organizar elementos",key:"naturalista"}] },
];

const LETTERS = ["A","B","C","D"];

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
  @keyframes floatRobot{0%,100%{transform:translateY(0) rotate(-1deg);}50%{transform:translateY(-13px) rotate(1deg);}}
  .side-badge{
    display:inline-flex;align-items:center;gap:7px;font-size:9px;font-weight:700;
    letter-spacing:2px;text-transform:uppercase;color:#CDF815;
    border:1px solid rgba(205,248,21,0.32);background:rgba(205,248,21,0.07);
    padding:6px 14px;border-radius:50px;margin-bottom:1rem;
  }
  .side-badge::before{content:'';width:5px;height:5px;background:#CDF815;border-radius:50%;box-shadow:0 0 8px #CDF815;animation:blink 2s ease-in-out infinite;}
  @keyframes blink{0%,100%{opacity:1}50%{opacity:0.25}}
  .side-title{font-family:'Poppins',sans-serif;font-size:clamp(20px,2.4vw,32px);font-weight:800;line-height:1.2;text-align:center;color:#fff;letter-spacing:-0.5px;margin-bottom:0.6rem;}
  .side-title .grad{color:#CDF815;text-shadow:0 0 18px rgba(205,248,21,0.45);}
  .side-sub{font-size:12px;color:rgba(255,255,255,0.5);line-height:1.7;text-align:center;margin-bottom:1.75rem;}
  .intel-pills{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;}
  .intel-pill{display:inline-flex;align-items:center;gap:5px;font-size:9px;padding:4px 9px;border-radius:50px;font-weight:500;transition:all 0.3s;}
  .intel-pill:hover{transform:translateY(-1px);opacity:0.9;}

  /* MAIN */
  .main-panel{flex:1;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:3rem 4rem;overflow-y:auto;}
  .main-inner{width:100%;max-width:620px;}

  /* INTRO */
  .intro-grid{display:grid;grid-template-columns:1fr 1fr;gap:0;width:100%;min-height:100vh;align-items:stretch;}
  .intro-left{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:4rem 4rem 4rem 5rem;border-right:1px solid rgba(205,248,21,0.1);position:relative;overflow:hidden;}
  .intro-right{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:3rem;background:rgba(0,0,0,0.12);position:relative;overflow:hidden;}
  .intro-circuit-l{position:absolute;left:-25px;top:50%;transform:translateY(-50%);opacity:0.35;}
  .intro-circuit-r{position:absolute;right:-25px;top:50%;transform:translateY(-50%) scaleX(-1);opacity:0.35;}
  .intro-logo-wrap{margin-bottom:1.75rem;}
  .intro-tagline{font-size:10px;font-weight:700;letter-spacing:3.5px;text-transform:uppercase;color:rgba(205,248,21,0.65);margin-bottom:1.25rem;}
  .intro-badge{display:inline-flex;align-items:center;gap:7px;font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#CDF815;border:1px solid rgba(205,248,21,0.28);background:rgba(205,248,21,0.07);padding:7px 16px;border-radius:50px;margin-bottom:1.5rem;}
  .intro-badge::before{content:'';width:5px;height:5px;background:#CDF815;border-radius:50%;box-shadow:0 0 8px #CDF815;animation:blink 2s ease-in-out infinite;}
  .intro-title{font-family:'Poppins',sans-serif;font-size:clamp(34px,4.5vw,60px);font-weight:900;line-height:1.07;margin-bottom:1.1rem;letter-spacing:-1.5px;color:#fff;}
  .intro-title .grad{color:#CDF815;text-shadow:0 0 28px rgba(205,248,21,0.5);}
  .intro-sub{font-size:13px;color:rgba(255,255,255,0.55);line-height:1.8;margin-bottom:2.25rem;max-width:390px;}
  .btn-start{
    display:inline-flex;align-items:center;gap:10px;
    font-family:'Poppins',sans-serif;font-size:14px;font-weight:800;
    padding:14px 38px;border-radius:9px;border:2px solid #CDF815;
    background:transparent;color:#CDF815;cursor:pointer;transition:all 0.22s;
    letter-spacing:1.2px;text-transform:uppercase;
    box-shadow:0 0 25px rgba(205,248,21,0.18),inset 0 0 25px rgba(205,248,21,0.04);
  }
  .btn-start:hover{background:#CDF815;color:#001621;box-shadow:0 0 45px rgba(205,248,21,0.5);transform:translateY(-2px);}
  .btn-start:active{transform:scale(0.98);}
  .intro-robot-wrap{animation:floatRobot 4s ease-in-out infinite;filter:drop-shadow(0 0 28px rgba(205,248,21,0.6));margin-bottom:1.25rem;}
  .stats-row{display:flex;gap:2.25rem;margin-top:1.75rem;}
  .stat-item{text-align:center;}
  .stat-num{font-family:'Poppins',sans-serif;font-size:28px;font-weight:900;color:#CDF815;display:block;line-height:1;margin-bottom:4px;text-shadow:0 0 14px rgba(205,248,21,0.5);}
  .stat-label{font-size:8px;color:rgba(255,255,255,0.38);letter-spacing:2px;text-transform:uppercase;font-weight:600;}

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
  .q-card{
    background:rgba(0,0,0,0.28);border:1px solid rgba(205,248,21,0.16);
    border-radius:16px;padding:2.25rem;backdrop-filter:blur(18px);position:relative;overflow:hidden;
  }
  .q-card::before{content:'';position:absolute;top:0;left:0;width:100%;height:2px;background:linear-gradient(90deg,transparent,#CDF815,transparent);}
  .q-card.exit{animation:screenOut 0.28s cubic-bezier(0.4,0,1,1) forwards;}
  .q-card.enter{animation:screenIn 0.42s cubic-bezier(0.16,1,0.3,1) forwards;}
  .q-number{font-size:9px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:rgba(205,248,21,0.55);margin-bottom:0.8rem;}
  .q-text{font-family:'Poppins',sans-serif;font-size:clamp(17px,2vw,23px);font-weight:700;line-height:1.4;color:#fff;margin-bottom:1.4rem;}
  .options-list{display:flex;flex-direction:column;gap:9px;}
  .option-btn{
    display:flex;align-items:center;gap:12px;padding:12px 16px;
    border-radius:9px;border:1px solid rgba(205,248,21,0.1);
    background:rgba(255,255,255,0.03);cursor:pointer;transition:all 0.18s;
    text-align:left;width:100%;
  }
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
  .result-name{font-family:'Poppins',sans-serif;font-size:clamp(22px,3vw,40px);font-weight:900;margin-bottom:0.9rem;line-height:1.1;color:#CDF815;text-shadow:0 0 22px rgba(205,248,21,0.4);}
  .result-desc{font-size:12px;color:rgba(255,255,255,0.55);line-height:1.8;max-width:480px;margin:0 auto;}
  .glass-card{background:rgba(0,0,0,0.22);border:1px solid rgba(205,248,21,0.1);border-radius:13px;padding:1.4rem;margin-bottom:1.1rem;position:relative;overflow:hidden;}
  .glass-card::before{content:'';position:absolute;top:0;left:0;width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(205,248,21,0.28),transparent);}
  .card-label{font-size:8px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(205,248,21,0.38);margin-bottom:0.9rem;}
  .secondary-row{display:flex;align-items:center;gap:13px;}
  .secondary-icon-wrap{width:40px;height:40px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .secondary-name{font-family:'Poppins',sans-serif;font-size:15px;font-weight:700;color:#fff;margin-bottom:3px;}
  .secondary-desc{font-size:11px;color:rgba(255,255,255,0.45);line-height:1.5;}
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

  /* MESAS */
  .mesas-section{margin-bottom:1.1rem;}
  .perfil-badge{display:inline-flex;align-items:center;gap:5px;font-size:9px;font-weight:700;color:#CDF815;background:rgba(205,248,21,0.07);border:1px solid rgba(205,248,21,0.18);padding:4px 11px;border-radius:50px;margin-bottom:0.9rem;}
  .perfil-badge::before{content:'';width:4px;height:4px;background:#CDF815;border-radius:50%;box-shadow:0 0 5px #CDF815;}
  .mesas-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
  .mesa-card{border-radius:11px;padding:0.9rem 1rem 2rem;border:1.5px solid;position:relative;overflow:hidden;transition:transform 0.2s;}
  .mesa-card:hover{transform:translateY(-2px);}
  .mesa-card:last-child:nth-child(odd){grid-column:1 / -1;}
  .mesa-tipo-badge{display:inline-flex;align-items:center;gap:4px;font-size:7.5px;font-weight:800;letter-spacing:1.8px;text-transform:uppercase;padding:3px 8px;border-radius:50px;margin-bottom:7px;}
  .mesa-tipo-dot{width:4px;height:4px;border-radius:50%;flex-shrink:0;}
  .mesa-herramienta{font-family:'Poppins',sans-serif;font-size:11.5px;font-weight:700;margin-bottom:3px;line-height:1.3;}
  .mesa-desc{font-size:10px;font-weight:400;line-height:1.4;opacity:0.72;}
  .mesa-watermark-icon{position:absolute;bottom:6px;right:8px;opacity:0.11;}
  .restart-btn{display:flex;align-items:center;justify-content:center;gap:7px;font-size:11px;font-weight:700;padding:10px 26px;border-radius:50px;border:1px solid rgba(205,248,21,0.28);background:transparent;color:rgba(205,248,21,0.55);cursor:pointer;transition:all 0.22s;font-family:'Poppins',sans-serif;letter-spacing:0.5px;margin-top:1.1rem;text-transform:uppercase;}
  .restart-btn:hover{border-color:#CDF815;color:#CDF815;background:rgba(205,248,21,0.07);}

  /* LOADING */
  .loading-screen{position:fixed;inset:0;z-index:100;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(155deg,#FF4103 0%,#A8320E 15%,#4A2419 35%,#1F1B1C 55%,#031720 80%,#001621 100%);animation:loadingFadeOut 0.6s ease-in-out forwards;animation-delay:2.8s;}
  @keyframes loadingFadeOut{from{opacity:1;}to{opacity:0;pointer-events:none;}}
  .loading-center{display:flex;flex-direction:column;align-items:center;}
  .loading-robot-wrap{margin-bottom:1.75rem;filter:drop-shadow(0 0 28px rgba(205,248,21,0.7));animation:floatRobot 2s ease-in-out infinite;}
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
  @media (max-width:1024px){.side-panel{width:34%;padding:2rem 1.5rem;}.main-panel{padding:2rem 2.5rem;}}
  @media (max-width:900px){
    .intro-grid{grid-template-columns:1fr;min-height:auto;}
    .intro-left{padding:3rem 2rem 2rem;align-items:center;text-align:center;border-right:none;border-bottom:1px solid rgba(205,248,21,0.1);}
    .intro-sub{max-width:100%;}
    .intro-right{padding:2.25rem 2rem;}
    .side-panel{display:none;}
    .main-panel{padding:2rem 1.5rem;padding-bottom:4rem;}
  }
  @media (max-width:640px){
    .intro-left{padding:2.25rem 1.25rem 1.5rem;}
    .intro-title{font-size:34px;}
    .q-card{padding:1.4rem 1rem;}
    .result-hero{padding:1.5rem 1rem;}
    .glass-card{padding:1rem;}
    .mesas-grid{grid-template-columns:1fr;}
    .mesa-card:last-child:nth-child(odd){grid-column:auto;}
    .stats-row{gap:1.5rem;}
    .btn-start{padding:12px 26px;font-size:12px;}
  }
`;

// ─── BG DECO (paneles circuito esquinas como en el banner) ────────────────────
function BgDeco() {
  return (
    <div className="circuit-deco">
      <div style={{ position:"absolute", left:-18, top:"8%", opacity:0.1 }}><CircuitPanel color="#CDF815" size={160} /></div>
      <div style={{ position:"absolute", right:-18, top:"8%", opacity:0.1, transform:"scaleX(-1)" }}><CircuitPanel color="#CDF815" size={160} /></div>
      <div style={{ position:"absolute", left:-18, bottom:"4%", opacity:0.07 }}><CircuitPanel color="#CDF815" size={120} /></div>
      <div style={{ position:"absolute", right:-18, bottom:"4%", opacity:0.07, transform:"scaleX(-1)" }}><CircuitPanel color="#CDF815" size={120} /></div>
      <div style={{ position:"absolute", top:10, left:"50%", transform:"translateX(-50%)", opacity:0.25 }}>
        <svg width="140" height="22" fill="none"><line x1="0" y1="11" x2="58" y2="11" stroke="#CDF815" strokeWidth="1"/><circle cx="63" cy="11" r="4.5" stroke="#CDF815" strokeWidth="1" fill="none"/><line x1="68" y1="11" x2="140" y2="11" stroke="#CDF815" strokeWidth="1"/></svg>
      </div>
      <div style={{ position:"absolute", bottom:10, left:"50%", transform:"translateX(-50%)", opacity:0.25 }}>
        <svg width="140" height="22" fill="none"><line x1="0" y1="11" x2="58" y2="11" stroke="#CDF815" strokeWidth="1"/><circle cx="63" cy="11" r="4.5" stroke="#CDF815" strokeWidth="1" fill="none"/><line x1="68" y1="11" x2="140" y2="11" stroke="#CDF815" strokeWidth="1"/></svg>
      </div>
    </div>
  );
}

function MesasExperiencia({ primaryKey }) {
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
            <div key={mesa.tipo} className="mesa-card" style={{ background:c.bg, borderColor:c.border, boxShadow:`0 3px 16px ${c.glow}` }}>
              <div className="mesa-tipo-badge" style={{ background:c.badge, color:c.label }}><span className="mesa-tipo-dot" style={{ background:c.label }}/> Mesa {mesa.tipo}</div>
              <div className="mesa-herramienta" style={{ color:c.text }}>{mesa.herramienta}</div>
              <div className="mesa-desc" style={{ color:c.text }}>{mesa.desc}</div>
              <span className="mesa-watermark-icon"><IntelIcon iconKey={primaryKey} size={17} color={c.label}/></span>
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
        <div className="intro-logo-wrap"><AiModeLogo scale={1} /></div>
        <div className="intro-tagline">Activa el modo IA. Enciende tu vida</div>
        <div className="intro-badge">Test de Inteligencias Múltiples</div>
        <h1 className="intro-title">Descubre tu<br /><span className="grad">superpoder<br />cognitivo</span></h1>
        <p className="intro-sub">Basado en la teoría de Howard Gardner, este test identifica tu inteligencia dominante y te recomienda la IA ideal para potenciarla.</p>
        <button className="btn-start" onClick={onStart}>Comenzar el test →</button>
        <div className="stats-row">
          <div className="stat-item"><span className="stat-num">8</span><span className="stat-label">Perfiles</span></div>
          <div className="stat-item"><span className="stat-num">10</span><span className="stat-label">Preguntas</span></div>
          <div className="stat-item"><span className="stat-num">3'</span><span className="stat-label">Duración</span></div>
        </div>
      </div>
      <div className="intro-right">
        <div className="intro-circuit-l"><CircuitPanel color="#CDF815" size={110} /></div>
        <div className="intro-circuit-r"><CircuitPanel color="#CDF815" size={110} /></div>
        <div className="intro-robot-wrap"><RobotIcon size={190} color="#CDF815" /></div>
        <div className="intel-pills">
          {Object.entries(INTELLIGENCES).map(([key, intel]) => (
            <span key={key} className="intel-pill" style={{ border:`1px solid ${intel.color}44`, color:intel.color, background:`${intel.color}12` }}>
              <IntelIcon iconKey={intel.iconKey} size={12} color={intel.color}/>{intel.name}
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
    if (prevIndex.current !== qIndex) { setPhase("enter"); setSelected(null); setDisabled(false); prevIndex.current = qIndex; }
  }, [qIndex]);
  const q = QUESTIONS[qIndex];
  const pct = (qIndex / QUESTIONS.length) * 100;
  const handleSelect = (i) => {
    if (disabled) return;
    setSelected(i); setDisabled(true); setPhase("exit");
    setTimeout(() => onAnswer(q.options[i].key), 380);
  };
  return (
    <>
      <div className="side-panel">
        <div className="side-logo-wrap"><AiModeLogo scale={0.82} /></div>
        <div className="side-robot-wrap"><RobotIcon size={120} color="#CDF815" /></div>
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
          <div className="step-dots">{QUESTIONS.map((_,i) => <div key={i} className={`step-dot ${i<qIndex?"done":i===qIndex?"active":""}`}/>)}</div>
          <div className={`q-card ${phase}`}>
            <div className="q-number">Pregunta {qIndex + 1} de {QUESTIONS.length}</div>
            <div className="q-text">{q.text}</div>
            <div className="options-list">
              {q.options.map((opt, i) => (
                <button key={i} className={`option-btn ${selected===i?"selected":""} ${disabled&&selected!==i?"disabled":""}`} onClick={() => handleSelect(i)}>
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
  Object.keys(INTELLIGENCES).forEach(k => (scores[k] = 0));
  answers.forEach(a => { scores[a]++; });
  const sorted = Object.entries(scores).sort((a,b) => b[1]-a[1]);
  const [primaryKey, primaryScore] = sorted[0];
  const [secondaryKey, secondaryScore] = sorted[1];
  const isTie = primaryScore === secondaryScore;
  const maxScore = primaryScore || 1;
  const primary   = INTELLIGENCES[primaryKey];
  const secondary = INTELLIGENCES[secondaryKey];
  const profile   = PROFILES[primaryKey];
  const visibleBars = sorted.filter(([,v]) => v > 0);
  return (
    <>
      <div className="side-panel">
        <div className="side-logo-wrap"><AiModeLogo scale={0.82} /></div>
        <div className="side-robot-wrap" style={{ filter:`drop-shadow(0 0 22px ${primary.glow})` }}>
          <RobotIcon size={120} color={primary.color} />
        </div>
        <div className="side-badge">Tu resultado</div>
        <h2 className="side-title" style={{ color:primary.color }}>{primary.name}</h2>
        <p className="side-sub">{profile.desc}</p>
        <button className="restart-btn" onClick={onRestart}>↺ Repetir test</button>
      </div>
      <div className="main-panel">
        <div className="main-inner">
          <div className="screen-enter">
            <div className="result-hero">
              <div className="result-hero-content">
                <div className="result-icon-wrap" style={{ filter:`drop-shadow(0 0 18px ${primary.glow})` }}>
                  <IntelIcon iconKey={primary.iconKey} size={78} color={primary.color}/>
                </div>
                <div className="result-tag">{isTie?"Inteligencias Dominantes":"Tu inteligencia dominante es:"}</div>
                <div className="result-name">[{primary.name}]</div>
                <p className="result-desc">{profile.desc}</p>
              </div>
            </div>
            {!isTie && (
              <div className="glass-card">
                <div className="card-label">Inteligencia secundaria</div>
                <div className="secondary-row">
                  <div className="secondary-icon-wrap"><IntelIcon iconKey={secondary.iconKey} size={36} color={secondary.color}/></div>
                  <div style={{ flex:1 }}>
                    <div className="secondary-name">{secondary.name}</div>
                    <div className="secondary-desc">{PROFILES[secondaryKey].desc.substring(0,88)}…</div>
                  </div>
                </div>
              </div>
            )}
            <div className="glass-card">
              <div className="card-label">Tu herramienta recomendada</div>
              <div className="ai-row">
                <div className="ai-icon-wrap"><IntelIcon iconKey={primary.iconKey} size={22} color={primary.color}/></div>
                <div style={{ flex:1 }}>
                  <div className="ai-name">{profile.ai}</div>
                  <div className="ai-desc">{profile.aiDesc}</div>
                </div>
              </div>
            </div>
            <MesasExperiencia primaryKey={primaryKey}/>
            <div className="glass-card">
              <div className="card-label">Tu perfil completo</div>
              <div className="intel-bars-container">
                {visibleBars.map(([k,v]) => {
                  const col = INTELLIGENCES[k].color;
                  const glw = INTELLIGENCES[k].glow;
                  const pct = barsReady ? `${(v/maxScore)*100}%` : "0%";
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
            <div style={{ textAlign:"center" }}>
              <button className="restart-btn" onClick={onRestart} style={{ margin:"0 auto" }}>↺ Repetir el test</button>
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
        <div className="loading-robot-wrap"><RobotIcon size={130} color="#CDF815"/></div>
        <h1 className="loading-title">Analizando</h1>
        <p className="loading-subtitle">Procesando tu perfil cognitivo...</p>
        <div className="loading-badge"><span className="loading-dot-live"/>IA Orchestrator activa</div>
        <div className="loading-logo-wrap"><AiModeLogo scale={0.85}/></div>
      </div>
    </div>
  );
}

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

export default function MultipleIntelligencesTest() {
  const [screen, setScreen]               = useState("intro");
  const [qIndex, setQIndex]               = useState(0);
  const [answers, setAnswers]             = useState([]);
  const [showLoading, setShowLoading]     = useState(false);
  const [pendingAnswers, setPendingAnswers] = useState(null);

  const handleStart       = () => { setQIndex(0); setAnswers([]); setScreen("quiz"); };
  const handleAnswer      = (key) => {
    const next = [...answers, key];
    setAnswers(next);
    if (qIndex < QUESTIONS.length - 1) { setQIndex(qIndex + 1); }
    else { setPendingAnswers(next); setShowLoading(true); }
  };
  const handleLoadingDone = () => { setShowLoading(false); setScreen("result"); };
  const handleRestart     = () => { setScreen("intro"); setQIndex(0); setAnswers([]); setPendingAnswers(null); };

  const isIntro        = screen === "intro";
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