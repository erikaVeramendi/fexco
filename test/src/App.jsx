import { useState, useEffect, useRef } from "react";

const INTELLIGENCES = {
  logica:        { name: "Lógico-Matemática",  emoji: "🧮", color: "#FF9A3C", glow: "rgba(255,154,60,0.4)"  },
  linguistica:   { name: "Lingüística",         emoji: "📝", color: "#FFD166", glow: "rgba(255,209,102,0.4)" },
  visual:        { name: "Visual-Espacial",      emoji: "🎨", color: "#FF6B1A", glow: "rgba(255,107,26,0.4)"  },
  musical:       { name: "Musical",              emoji: "🎵", color: "#FF3D3D", glow: "rgba(255,61,61,0.4)"   },
  kinestesica:   { name: "Kinestésica",          emoji: "⚡", color: "#FFBA08", glow: "rgba(255,186,8,0.4)"   },
  interpersonal: { name: "Interpersonal",        emoji: "🤝", color: "#FF8C42", glow: "rgba(255,140,66,0.4)"  },
  intrapersonal: { name: "Intrapersonal",        emoji: "🔮", color: "#FFA552", glow: "rgba(255,165,82,0.4)"  },
};

const PROFILES = {
  logica:        { desc: "Tu mente funciona como un procesador: detectas patrones, razonas con precisión y disfrutas de los desafíos lógicos. Eres un pensador sistemático nato.", ai: "IA de Análisis y Cálculo", aiDesc: "Wolfram Alpha, Code Interpreter, GPT-4 para análisis numérico, modelado de datos y resolución de problemas complejos.", aiIcon: "🧮" },
  linguistica:   { desc: "Las palabras son tu superpoder. Comunicas ideas con claridad, tienes facilidad para aprender idiomas y disfrutas de la lectura, escritura y el debate.", ai: "IA de Generación de Texto", aiDesc: "Claude, GPT-4 o Gemini para escritura creativa, resúmenes, comunicación efectiva y generación de contenido.", aiIcon: "✍️" },
  visual:        { desc: "Piensas en imágenes y espacios. Tu mente visualiza soluciones antes de escribirlas. Sobresales en diseño, arte y comprensión de estructuras complejas.", ai: "IA de Generación de Imágenes", aiDesc: "Midjourney, DALL-E o Stable Diffusion para crear, explorar y transformar el mundo visual con IA generativa.", aiIcon: "🎨" },
  musical:       { desc: "Tu cerebro está sintonizado con el ritmo, la melodía y los patrones sonoros. Procesas el mundo a través del sonido y tienes una memoria auditiva excepcional.", ai: "IA de Creación Musical", aiDesc: "Suno, Udio o MusicLM para componer música, crear beats y explorar la creatividad sonora con inteligencia artificial.", aiIcon: "🎵" },
  kinestesica:   { desc: "Aprendes haciendo. Tu inteligencia vive en tus manos y tu cuerpo. Destacas en actividades físicas, manualidades y procesas mejor con movimiento y práctica.", ai: "IA de Interacción Física", aiDesc: "Robótica con IA, simuladores físicos y herramientas de prototipado como Arduino + ML para crear con las manos.", aiIcon: "🤖" },
  interpersonal: { desc: "Eres un conector de personas. Entiendes emociones, motivaciones y perspectivas ajenas con facilidad. Lideras, medias y construyes comunidades naturalmente.", ai: "IA de Colaboración", aiDesc: "Slack AI, Notion AI o Copilot para facilitar el trabajo en equipo, gestión de proyectos y comunicación grupal.", aiIcon: "💬" },
  intrapersonal: { desc: "Tu mayor laboratorio eres tú mismo. Tienes profunda conciencia de tus emociones, metas y procesos mentales. Eres reflexivo, filosófico y autodidacta.", ai: "IA de Reflexión Personal", aiDesc: "Journaling con IA, terapeutas digitales como Woebot o Claude para explorar ideas, emociones y crecimiento personal.", aiIcon: "🔮" },
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
    text: "¿Qué actividad te gusta más?",
    options: [
      { text: "Resolver acertijos o juegos de lógica", key: "logica" },
      { text: "Escribir historias, hablar o debatir", key: "linguistica" },
      { text: "Diseñar, dibujar o editar imágenes", key: "visual" },
      { text: "Escuchar música o crear ritmos", key: "musical" },
    ],
  },
  {
    text: "Cuando aprendes algo nuevo, prefieres:",
    options: [
      { text: "Ver cómo funciona paso a paso", key: "logica" },
      { text: "Leer o escuchar explicaciones detalladas", key: "linguistica" },
      { text: "Ver imágenes, gráficos o videos", key: "visual" },
      { text: "Practicar haciendo algo físico", key: "kinestesica" },
    ],
  },
  {
    text: "Cuando trabajas en equipo, tú:",
    options: [
      { text: "Organizas ideas y estructuras el plan", key: "logica" },
      { text: "Comunicas y explicas al grupo", key: "linguistica" },
      { text: "Propones ideas creativas y visuales", key: "visual" },
      { text: "Motivas y conectas con los demás", key: "interpersonal" },
    ],
  },
  {
    text: "¿Cuál de estas frases se parece más a ti?",
    options: [
      { text: "Me gusta entender cómo funcionan las cosas", key: "logica" },
      { text: "Me gusta expresarme con palabras", key: "linguistica" },
      { text: "Pienso en imágenes y soy muy creativo/a", key: "visual" },
      { text: "Reflexiono mucho sobre mí mismo/a", key: "intrapersonal" },
    ],
  },
];

const LETTERS = ["A", "B", "C", "D"];

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html, body, #root {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
  }

  .mit-root {
    font-family: 'DM Sans', sans-serif;
    background: #0D0A05;
    width: 100vw;
    min-height: 100vh;
    color: #F5E6D0;
    overflow-x: hidden;
    position: relative;
  }

  .aurora {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
  }
  .aurora-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(110px);
    opacity: 0.2;
    animation: drift linear infinite;
  }
  @keyframes drift {
    0%   { transform: translate(0,0) scale(1); }
    33%  { transform: translate(40px,-25px) scale(1.08); }
    66%  { transform: translate(-25px,20px) scale(0.92); }
    100% { transform: translate(0,0) scale(1); }
  }

  .grid-overlay {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image:
      linear-gradient(rgba(255,107,26,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,107,26,0.04) 1px, transparent 1px);
    background-size: 44px 44px;
  }

  /* ── LAYOUT PRINCIPAL ── */
  .mit-container {
    position: relative;
    z-index: 1;
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: stretch;
  }

  /* Panel izquierdo — branding/decorativo */
  .side-panel {
    width: 38%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem 2.5rem;
    position: sticky;
    top: 0;
    border-right: 1px solid rgba(255,107,26,0.08);
    background: rgba(255,107,26,0.02);
    backdrop-filter: blur(4px);
  }

  .side-brain {
    font-size: 120px;
    display: block;
    margin-bottom: 2rem;
    animation: floatBrain 3.5s ease-in-out infinite;
    filter: drop-shadow(0 0 40px rgba(255,107,26,0.7)) drop-shadow(0 0 80px rgba(255,61,61,0.3));
  }
  @keyframes floatBrain {
    0%,100% { transform: translateY(0) rotate(-3deg); }
    50%      { transform: translateY(-14px) rotate(3deg); }
  }

  .side-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    color: #FF9A3C;
    border: 1px solid rgba(255,154,60,0.35);
    background: rgba(255,107,26,0.08);
    padding: 7px 20px;
    border-radius: 50px;
    margin-bottom: 1.5rem;
  }
  .side-badge::before {
    content: '';
    width: 6px; height: 6px;
    background: #FF6B1A;
    border-radius: 50%;
    box-shadow: 0 0 10px #FF6B1A, 0 0 20px rgba(255,107,26,0.5);
    animation: blink 1.8s ease-in-out infinite;
  }
  @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(0.8)} }

  .side-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(26px, 2.8vw, 42px);
    font-weight: 800;
    line-height: 1.1;
    text-align: center;
    color: #FFF5EB;
    letter-spacing: -1px;
    margin-bottom: 1rem;
  }
  .side-title .grad {
    background: linear-gradient(135deg, #FF6B1A 0%, #FF9A3C 40%, #FFD166 80%, #FFBA08 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 24px rgba(255,107,26,0.4));
  }

  .side-sub {
    font-size: 13.5px;
    color: #7A5535;
    line-height: 1.8;
    text-align: center;
    margin-bottom: 2rem;
    font-weight: 300;
  }

  .intel-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    justify-content: center;
  }
  .intel-pill {
    font-size: 11px;
    padding: 5px 13px;
    border-radius: 50px;
    border: 1px solid rgba(255,107,26,0.15);
    color: #7A5535;
    background: rgba(255,107,26,0.05);
    font-weight: 400;
    transition: border-color 0.2s, color 0.2s;
  }
  .intel-pill:hover {
    border-color: rgba(255,154,60,0.4);
    color: #FF9A3C;
  }

  /* Panel derecho — contenido principal */
  .main-panel {
    flex: 1;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 3rem;
    overflow-y: auto;
  }

  .main-inner {
    width: 100%;
    max-width: 600px;
  }

  /* ── INTRO (pantalla completa sin panel lateral) ── */
  .intro-fullscreen {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 2rem;
  }

  .intro-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    width: 100%;
    min-height: 100vh;
    align-items: stretch;
  }

  .intro-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 4rem 4rem 4rem 6rem;
    border-right: 1px solid rgba(255,107,26,0.08);
  }

  .intro-right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4rem 5rem 4rem 4rem;
    background: rgba(255,107,26,0.02);
  }

  .intro-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 3.5px;
    text-transform: uppercase;
    color: #FF9A3C;
    border: 1px solid rgba(255,154,60,0.35);
    background: rgba(255,107,26,0.08);
    padding: 7px 20px;
    border-radius: 50px;
    margin-bottom: 2rem;
  }
  .intro-badge::before {
    content: '';
    width: 6px; height: 6px;
    background: #FF6B1A;
    border-radius: 50%;
    box-shadow: 0 0 10px #FF6B1A;
    animation: blink 1.8s ease-in-out infinite;
  }

  .intro-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(36px, 4vw, 64px);
    font-weight: 800;
    line-height: 1.05;
    margin-bottom: 1.25rem;
    letter-spacing: -2px;
    color: #FFF5EB;
  }
  .intro-title .grad {
    background: linear-gradient(135deg, #FF6B1A 0%, #FF9A3C 40%, #FFD166 80%, #FFBA08 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    filter: drop-shadow(0 0 30px rgba(255,107,26,0.4));
  }

  .intro-sub {
    font-size: 15px;
    color: #7A5535;
    line-height: 1.85;
    margin-bottom: 2.5rem;
    font-weight: 300;
    max-width: 400px;
  }

  .btn-start {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 12px;
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 700;
    padding: 18px 44px;
    border-radius: 50px;
    border: none;
    background: linear-gradient(135deg, #FF4500 0%, #FF6B1A 50%, #FF9A3C 100%);
    color: #fff;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.2s;
    box-shadow:
      0 4px 24px rgba(255,107,26,0.5),
      0 0 60px rgba(255,61,61,0.2),
      inset 0 1px 0 rgba(255,255,255,0.15);
    letter-spacing: 0.3px;
    overflow: hidden;
  }
  .btn-start::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #FF6B1A 0%, #FFD166 100%);
    opacity: 0;
    transition: opacity 0.25s;
  }
  .btn-start:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 44px rgba(255,107,26,0.65), 0 0 80px rgba(255,154,60,0.3);
  }
  .btn-start:hover::before { opacity: 1; }
  .btn-start:active { transform: scale(0.97) translateY(0); }
  .btn-start span { position: relative; z-index: 1; }

  .intro-brain-big {
    font-size: 160px;
    display: block;
    animation: floatBrain 3.5s ease-in-out infinite;
    filter: drop-shadow(0 0 50px rgba(255,107,26,0.8)) drop-shadow(0 0 100px rgba(255,61,61,0.4));
    margin-bottom: 2.5rem;
  }

  .stats-row {
    display: flex;
    gap: 2rem;
    margin-top: 1.5rem;
  }
  .stat-item { text-align: center; }
  .stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 28px;
    font-weight: 800;
    color: #FF6B1A;
    display: block;
    line-height: 1;
    margin-bottom: 4px;
  }
  .stat-label {
    font-size: 11px;
    color: #5A3A1A;
    letter-spacing: 1.5px;
    text-transform: uppercase;
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

  /* ── QUIZ ── */
  .progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .progress-label {
    font-size: 11px;
    color: #5A3A1A;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 500;
  }
  .progress-frac {
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    color: #FF9A3C;
    font-weight: 700;
  }
  .progress-track {
    height: 2px;
    background: rgba(255,107,26,0.1);
    border-radius: 2px;
    margin-bottom: 18px;
    position: relative;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #FF4500, #FF9A3C, #FFD166);
    border-radius: 2px;
    transition: width 0.55s cubic-bezier(0.4,0,0.2,1);
    box-shadow: 0 0 16px rgba(255,107,26,0.7);
    position: relative;
  }
  .progress-fill::after {
    content: '';
    position: absolute;
    right: -3px; top: 50%;
    transform: translateY(-50%);
    width: 8px; height: 8px;
    background: #FFD166;
    border-radius: 50%;
    box-shadow: 0 0 12px #FFD166;
  }

  .step-dots {
    display: flex;
    gap: 6px;
    justify-content: center;
    margin-bottom: 2rem;
  }
  .step-dot {
    height: 3px;
    width: 28px;
    border-radius: 3px;
    background: rgba(255,107,26,0.12);
    transition: background 0.3s, width 0.3s, box-shadow 0.3s;
  }
  .step-dot.active { background: #FF6B1A; width: 38px; box-shadow: 0 0 10px rgba(255,107,26,0.7); }
  .step-dot.done   { background: #FF9A3C; }

  .q-card {
    background: rgba(255,107,26,0.04);
    border: 1px solid rgba(255,107,26,0.12);
    border-radius: 24px;
    padding: 2.5rem;
    backdrop-filter: blur(24px);
    position: relative;
    overflow: hidden;
  }
  .q-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 140px; height: 140px;
    background: radial-gradient(circle at 0% 0%, rgba(255,107,26,0.12), transparent 70%);
    pointer-events: none;
  }
  .q-card.exit  { animation: screenOut 0.3s cubic-bezier(0.4,0,1,1) forwards; }
  .q-card.enter { animation: screenIn 0.45s cubic-bezier(0.16,1,0.3,1) forwards; }

  .q-number {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #FF6B1A;
    margin-bottom: 1rem;
  }
  .q-text {
    font-family: 'Syne', sans-serif;
    font-size: clamp(18px, 2vw, 24px);
    font-weight: 700;
    line-height: 1.4;
    color: #FFF5EB;
    margin-bottom: 1.75rem;
  }

  .options-list { display: flex; flex-direction: column; gap: 10px; }

  .option-btn {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 15px 20px;
    border-radius: 14px;
    border: 1px solid rgba(255,107,26,0.1);
    background: rgba(255,107,26,0.04);
    cursor: pointer;
    transition: border-color 0.2s, background 0.2s, transform 0.15s, box-shadow 0.2s;
    text-align: left;
    width: 100%;
    color: #D4A880;
  }
  .option-btn:hover {
    border-color: rgba(255,154,60,0.45);
    background: rgba(255,107,26,0.1);
    transform: translateX(5px);
    box-shadow: -4px 0 0 0 #FF6B1A, 0 0 20px rgba(255,107,26,0.12);
  }
  .option-btn.selected {
    border-color: #FF6B1A;
    background: rgba(255,107,26,0.14);
    box-shadow: -4px 0 0 0 #FF6B1A, 0 0 30px rgba(255,107,26,0.25);
    transform: translateX(5px);
    animation: optPick 0.35s ease;
  }
  .option-btn.disabled { pointer-events: none; opacity: 0.5; }

  @keyframes optPick {
    0%   { transform: scale(1) translateX(0); }
    35%  { transform: scale(1.015) translateX(7px); }
    100% { transform: scale(1) translateX(5px); }
  }

  .opt-letter {
    width: 36px; height: 36px;
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Syne', sans-serif;
    font-size: 13px;
    font-weight: 800;
    background: rgba(255,107,26,0.08);
    border: 1px solid rgba(255,107,26,0.15);
    color: #7A5535;
    flex-shrink: 0;
    transition: all 0.2s;
  }
  .option-btn:hover .opt-letter,
  .option-btn.selected .opt-letter {
    background: #FF6B1A;
    border-color: #FF6B1A;
    color: #fff;
    box-shadow: 0 0 20px rgba(255,107,26,0.6);
  }
  .opt-text {
    font-size: 14.5px;
    color: #C4906A;
    line-height: 1.5;
    font-weight: 400;
    transition: color 0.2s;
  }
  .option-btn:hover .opt-text,
  .option-btn.selected .opt-text { color: #FFF5EB; }

  /* ── RESULTADO ── */
  .result-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    width: 100%;
  }

  .result-hero {
    grid-column: 1 / -1;
    position: relative;
    border-radius: 24px;
    padding: 2.75rem 2.5rem;
    overflow: hidden;
    text-align: center;
    border: 1px solid rgba(255,107,26,0.2);
    background: rgba(13,10,5,0.6);
  }
  .result-hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at 50% -10%, rgba(255,107,26,0.25), transparent 65%),
      radial-gradient(ellipse at 100% 100%, rgba(255,61,61,0.12), transparent 50%);
    pointer-events: none;
  }
  .result-hero-scanlines {
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      0deg, transparent, transparent 3px,
      rgba(255,107,26,0.015) 3px, rgba(255,107,26,0.015) 4px
    );
    pointer-events: none;
  }
  .result-hero-content { position: relative; z-index: 1; }

  .result-emoji {
    font-size: 80px;
    display: block;
    margin-bottom: 1rem;
    animation: floatBrain 3s ease-in-out infinite;
  }
  .result-tag {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
    color: #FF9A3C;
  }
  .result-name {
    font-family: 'Syne', sans-serif;
    font-size: clamp(26px, 3vw, 44px);
    font-weight: 800;
    margin-bottom: 1rem;
    line-height: 1.1;
    letter-spacing: -0.5px;
  }
  .result-desc {
    font-size: 14.5px;
    color: #9A7050;
    line-height: 1.8;
    max-width: 520px;
    margin: 0 auto;
    font-weight: 300;
  }

  .glass-card {
    background: rgba(255,107,26,0.04);
    border: 1px solid rgba(255,107,26,0.1);
    border-radius: 18px;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
  }
  .glass-card::before {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 80px; height: 80px;
    background: radial-gradient(circle at 100% 0%, rgba(255,107,26,0.08), transparent 70%);
    pointer-events: none;
  }

  .card-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #5A3A1A;
    margin-bottom: 1rem;
  }

  .secondary-row { display: flex; align-items: center; gap: 14px; }
  .secondary-emoji { font-size: 32px; }
  .secondary-name {
    font-family: 'Syne', sans-serif;
    font-size: 17px;
    font-weight: 700;
    color: #FFF5EB;
    margin-bottom: 4px;
  }
  .secondary-desc { font-size: 13px; color: #7A5535; line-height: 1.5; }

  .bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .bar-name {
    font-size: 12px;
    color: #7A5535;
    width: 110px;
    text-align: right;
    flex-shrink: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bar-track {
    flex: 1;
    height: 4px;
    background: rgba(255,107,26,0.08);
    border-radius: 4px;
    overflow: hidden;
  }
  .bar-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 1.3s cubic-bezier(0.4,0,0.2,1);
  }
  .bar-num { font-size: 11px; color: #5A3A1A; width: 14px; text-align: right; flex-shrink: 0; }

  .ai-row { display: flex; align-items: flex-start; gap: 14px; }
  .ai-icon-wrap {
    width: 48px; height: 48px;
    border-radius: 14px;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    background: rgba(255,107,26,0.1);
    border: 1px solid rgba(255,107,26,0.2);
    flex-shrink: 0;
    box-shadow: 0 0 20px rgba(255,107,26,0.15);
  }
  .ai-name {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 700;
    color: #FF9A3C;
    margin-bottom: 6px;
  }
  .ai-desc { font-size: 13px; color: #7A5535; line-height: 1.7; font-weight: 300; }

  .result-bottom-row {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .restart-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 500;
    padding: 12px 32px;
    border-radius: 50px;
    border: 1px solid rgba(255,107,26,0.18);
    background: transparent;
    color: #5A3A1A;
    cursor: pointer;
    transition: border-color 0.2s, color 0.2s, background 0.2s;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.3px;
  }
  .restart-btn:hover {
    border-color: rgba(255,107,26,0.4);
    color: #FF9A3C;
    background: rgba(255,107,26,0.05);
  }

  /* ── LOADING SCREEN ── */
  .loading-screen {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #FAF4EE;
    animation: loadingFadeOut 0.6s ease-in-out forwards;
    animation-delay: 2.6s;
  }
  @keyframes loadingFadeOut {
    from { opacity: 1; transform: scale(1); }
    to   { opacity: 0; transform: scale(1.03); pointer-events: none; }
  }

  /* Navbar mock */
  .loading-nav {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.5rem;
    border-bottom: 1px solid rgba(255,107,26,0.1);
    background: rgba(250,244,238,0.9);
    backdrop-filter: blur(8px);
  }
  .loading-nav-brand {
    font-family: 'Syne', sans-serif;
    font-size: 15px;
    font-weight: 800;
    color: #FF6B1A;
    letter-spacing: -0.3px;
  }
  .loading-nav-links {
    display: flex;
    gap: 2rem;
    font-size: 14px;
    color: #9A7050;
    font-weight: 400;
  }
  .loading-nav-links span.active-nav {
    color: #FF6B1A;
    border-bottom: 2px solid #FF6B1A;
    padding-bottom: 2px;
    font-weight: 500;
  }
  .loading-nav-icons {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #C4906A;
    font-size: 18px;
  }
  .loading-nav-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF9A3C, #FF6B1A);
    display: flex; align-items: center; justify-content: center;
    font-size: 14px;
  }

  /* Centro */
  .loading-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  /* Círculo orbitante */
  .loading-orbit-wrap {
    position: relative;
    width: 180px;
    height: 180px;
    margin-bottom: 2rem;
  }
  /* Anillo exterior punteado */
  .loading-orbit-wrap::before {
    content: '';
    position: absolute;
    inset: -18px;
    border-radius: 50%;
    border: 1.5px dashed rgba(255,107,26,0.2);
    animation: orbitSpin 8s linear infinite;
  }
  /* Anillo exterior con punto corriendo */
  .loading-orbit-wrap::after {
    content: '';
    position: absolute;
    inset: -18px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: rgba(255,107,26,0.35);
    animation: orbitSpin 3s linear infinite;
  }
  @keyframes orbitSpin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  .loading-circle {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow:
      0 8px 40px rgba(255,107,26,0.15),
      0 2px 12px rgba(255,107,26,0.08);
  }

  /* SVG arc progress */
  .loading-svg {
    position: absolute;
    inset: -5px;
    width: calc(100% + 10px);
    height: calc(100% + 10px);
    transform: rotate(-90deg);
  }
  .loading-arc-bg {
    fill: none;
    stroke: rgba(255,107,26,0.1);
    stroke-width: 4;
  }
  .loading-arc {
    fill: none;
    stroke: #FF6B1A;
    stroke-width: 4;
    stroke-linecap: round;
    stroke-dasharray: 565;
    stroke-dashoffset: 565;
    animation: arcFill 2.4s cubic-bezier(0.4,0,0.2,1) forwards;
    filter: drop-shadow(0 0 6px rgba(255,107,26,0.7));
  }
  @keyframes arcFill {
    0%   { stroke-dashoffset: 565; }
    60%  { stroke-dashoffset: 80; }
    100% { stroke-dashoffset: 0; }
  }

  .loading-icon {
    font-size: 44px;
    animation: iconPulse 1.2s ease-in-out infinite;
    position: relative;
    z-index: 1;
    filter: drop-shadow(0 0 12px rgba(255,107,26,0.4));
  }
  @keyframes iconPulse {
    0%,100% { transform: scale(1); }
    50%      { transform: scale(1.1); }
  }

  .loading-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(28px, 4vw, 48px);
    font-weight: 900;
    color: #1A0D00;
    letter-spacing: -1px;
    margin-bottom: 0.6rem;
    animation: titleReveal 0.7s cubic-bezier(0.16,1,0.3,1) 0.3s both;
  }
  @keyframes titleReveal {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .loading-subtitle {
    font-size: 15px;
    color: #B07050;
    font-weight: 300;
    margin-bottom: 1.5rem;
    animation: titleReveal 0.7s cubic-bezier(0.16,1,0.3,1) 0.5s both;
  }

  .loading-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #FF6B1A;
    background: rgba(255,107,26,0.08);
    border: 1px solid rgba(255,107,26,0.2);
    padding: 8px 20px;
    border-radius: 50px;
    animation: titleReveal 0.7s cubic-bezier(0.16,1,0.3,1) 0.7s both;
  }
  .loading-dot-live {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #FF6B1A;
    box-shadow: 0 0 8px #FF6B1A;
    animation: blink 1s ease-in-out infinite;
  }

  /* Stats bottom */
  .loading-stats {
    position: absolute;
    bottom: 60px;
    display: flex;
    gap: 4rem;
    animation: titleReveal 0.7s cubic-bezier(0.16,1,0.3,1) 0.9s both;
  }
  .loading-stat { text-align: center; }
  .loading-stat-num {
    font-family: 'Syne', sans-serif;
    font-size: 26px;
    font-weight: 800;
    color: #FF6B1A;
    display: block;
    line-height: 1;
    margin-bottom: 4px;
    animation: countUp 2s ease-out forwards;
  }
  .loading-stat-label {
    font-size: 10px;
    color: #B07050;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  /* Separadores */
  .loading-dividers {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255,107,26,0.15), transparent);
  }
  .loading-dividers-v {
    position: absolute;
    bottom: 0; top: 56px;
    width: 1px;
    left: 33.33%;
    background: linear-gradient(180deg, transparent, rgba(255,107,26,0.06), transparent);
  }
  .loading-dividers-v2 {
    position: absolute;
    bottom: 0; top: 56px;
    width: 1px;
    left: 66.66%;
    background: linear-gradient(180deg, transparent, rgba(255,107,26,0.06), transparent);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .intro-grid { grid-template-columns: 1fr; min-height: auto; }
    .intro-left { padding: 3rem 2rem 1.5rem; align-items: center; text-align: center; border-right: none; border-bottom: 1px solid rgba(255,107,26,0.08); }
    .intro-right { padding: 2rem; }
    .intro-brain-big { font-size: 100px; }
    .side-panel { display: none; }
    .main-panel { padding: 2rem 1.5rem; }
    .result-layout { grid-template-columns: 1fr; }
    .result-hero { grid-column: 1; }
    .result-bottom-row { grid-column: 1; }
  }

  @media (max-width: 600px) {
    .intro-left { padding: 2.5rem 1.5rem 1.5rem; }
    .intro-title { font-size: 32px; }
    .q-card { padding: 1.5rem 1.25rem; }
    .bar-name { width: 90px; }
  }
`;

function Aurora() {
  const blobs = [
    { w: 700, h: 700, x: "-15%", y: "-20%", color: "#FF4500", dur: "20s" },
    { w: 550, h: 550, x: "55%",  y: "45%",  color: "#FF8C00", dur: "25s" },
    { w: 480, h: 480, x: "25%",  y: "30%",  color: "#FF2D00", dur: "30s" },
    { w: 420, h: 420, x: "75%",  y: "-10%", color: "#FFBA08", dur: "22s" },
    { w: 360, h: 360, x: "-5%",  y: "60%",  color: "#FF6B1A", dur: "28s" },
  ];
  return (
    <div className="aurora">
      {blobs.map((b, i) => (
        <div
          key={i}
          className="aurora-blob"
          style={{
            width: b.w, height: b.h,
            left: b.x, top: b.y,
            background: b.color,
            animationDuration: b.dur,
            animationDelay: `${i * -5}s`,
          }}
        />
      ))}
    </div>
  );
}

function IntroScreen({ onStart }) {
  return (
    <div className="intro-grid screen-enter">
      {/* Lado izquierdo: copy */}
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
          <div className="stat-item">
            <span className="stat-num">5</span>
            <span className="stat-label">Preguntas</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">2'</span>
            <span className="stat-label">Duración</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">7</span>
            <span className="stat-label">Perfiles</span>
          </div>
        </div>
      </div>

      {/* Lado derecho: visual */}
      <div className="intro-right">
        <span className="intro-brain-big">🧠</span>
        <div className="intel-pills">
          {Object.values(INTELLIGENCES).map((intel) => (
            <span key={intel.name} className="intel-pill">
              {intel.emoji} {intel.name}
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
      {/* Panel lateral fijo con contexto */}
      <div className="side-panel">
        <span className="side-brain">🧠</span>
        <div className="side-badge">Inteligencias Múltiples</div>
        <h2 className="side-title">
          Descubre tu<br /><span className="grad">perfil cognitivo</span>
        </h2>
        <p className="side-sub">
          Responde con honestidad.<br />No hay respuestas correctas o incorrectas.
        </p>
        <div className="intel-pills">
          {Object.values(INTELLIGENCES).map((intel) => (
            <span key={intel.name} className="intel-pill">
              {intel.emoji} {intel.name}
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
              <div
                key={i}
                className={`step-dot ${i < qIndex ? "done" : i === qIndex ? "active" : ""}`}
              />
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

  useEffect(() => {
    const t = setTimeout(() => setBarsReady(true), 350);
    return () => clearTimeout(t);
  }, []);

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
      {/* Panel lateral con resultado resumido */}
      <div className="side-panel">
        <span
          className="side-brain"
          style={{ filter: `drop-shadow(0 0 40px ${primary.glow}) drop-shadow(0 0 80px ${primary.glow})` }}
        >
          {primary.emoji}
        </span>
        <div className="side-badge">Tu resultado</div>
        <h2 className="side-title" style={{ color: primary.color }}>
          {primary.name}
        </h2>
        <p className="side-sub">{profile.desc}</p>
        <button className="restart-btn" onClick={onRestart}>↺ Repetir el test</button>
      </div>

      <div className="main-panel">
        <div className="main-inner">
          <div className="result-layout screen-enter">
            {/* Hero */}
            <div className="result-hero">
              <div className="result-hero-bg" />
              <div className="result-hero-scanlines" />
              <div className="result-hero-content">
                <span
                  className="result-emoji"
                  style={{ filter: `drop-shadow(0 0 28px ${primary.glow})` }}
                >
                  {primary.emoji}
                </span>
                <div className="result-tag">
                  {isTie ? "Inteligencias Dominantes" : "Tu inteligencia dominante"}
                </div>
                <div className="result-name" style={{ color: primary.color }}>
                  {primary.name}{isTie ? ` + ${secondary.name}` : ""}
                </div>
                <p className="result-desc">{profile.desc}</p>
              </div>
            </div>

            {/* Secundaria */}
            {!isTie && (
              <div className="glass-card">
                <div className="card-label">Inteligencia secundaria</div>
                <div className="secondary-row">
                  <span className="secondary-emoji">{secondary.emoji}</span>
                  <div>
                    <div className="secondary-name">{secondary.name}</div>
                    <div className="secondary-desc">{PROFILES[secondaryKey].desc.substring(0, 90)}…</div>
                  </div>
                </div>
              </div>
            )}

            {/* IA Recomendada */}
            <div className="glass-card">
              <div className="card-label">IA Recomendada para tu perfil</div>
              <div className="ai-row">
                <div className="ai-icon-wrap">{profile.aiIcon}</div>
                <div>
                  <div className="ai-name">{profile.ai}</div>
                  <div className="ai-desc">{profile.aiDesc}</div>
                </div>
              </div>
            </div>

            {/* Perfil completo */}
            <div className="glass-card" style={{ gridColumn: isTie ? "1 / -1" : "1 / -1" }}>
              <div className="card-label">Tu perfil completo</div>
              {visibleBars.map(([k, v]) => (
                <div className="bar-row" key={k}>
                  <div className="bar-name">{INTELLIGENCES[k].emoji} {INTELLIGENCES[k].name.split("-")[0]}</div>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{
                        width: barsReady ? `${(v / maxScore) * 100}%` : "0%",
                        background: `linear-gradient(90deg, ${INTELLIGENCES[k].color}88, ${INTELLIGENCES[k].color})`,
                        boxShadow: `0 0 10px ${INTELLIGENCES[k].glow}`,
                      }}
                    />
                  </div>
                  <div className="bar-num">{v}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

function LoadingScreen({ onDone }) {
  useEffect(() => {
    // La animación dura 2.6s de carga + 0.6s de fade = 3.2s total
    const t = setTimeout(onDone, 3200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="loading-screen">
      {/* Líneas decorativas de fondo */}
      <div className="loading-dividers" />
      <div className="loading-dividers-v" />
      <div className="loading-dividers-v2" />

      {/* Navbar mock */}
      <div className="loading-nav">
        <div className="loading-nav-brand">Insight Orchestrator</div>
        <div className="loading-nav-links">
          <span>Lanzamiento</span>
          <span className="active-nav">Análisis</span>
          <span>Historial</span>
        </div>
        <div className="loading-nav-icons">
          <span>🔔</span>
          <span>⚙️</span>
          <div className="loading-nav-avatar">🧠</div>
        </div>
      </div>

      {/* Centro */}
      <div className="loading-center">
        {/* Círculo con arco SVG */}
        <div className="loading-orbit-wrap">
          <div className="loading-circle">
            <svg className="loading-svg" viewBox="0 0 200 200">
              <circle className="loading-arc-bg" cx="100" cy="100" r="90" />
              <circle className="loading-arc"    cx="100" cy="100" r="90" />
            </svg>
            <span className="loading-icon">🧠</span>
          </div>
        </div>

        <h1 className="loading-title">EL ANÁLISIS</h1>
        <p className="loading-subtitle">Analizando tu perfil cognitivo...</p>
        <div className="loading-badge">
          <span className="loading-dot-live" />
          IA Orchestrator activa
        </div>
      </div>

      {/* Stats abajo */}
      <div className="loading-stats">
        <div className="loading-stat">
          <span className="loading-stat-num">88%</span>
          <span className="loading-stat-label">Sincronía</span>
        </div>
        <div className="loading-stat">
          <span className="loading-stat-num">4.2s</span>
          <span className="loading-stat-label">Latencia</span>
        </div>
        <div className="loading-stat">
          <span className="loading-stat-num">99.9</span>
          <span className="loading-stat-label">Precisión</span>
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
      // Mostrar loading antes del resultado
      setPendingAnswers(next);
      setShowLoading(true);
    }
  };
  const handleLoadingDone = () => {
    setShowLoading(false);
    setScreen("result");
  };
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