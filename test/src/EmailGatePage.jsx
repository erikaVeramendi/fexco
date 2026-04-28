import { useState } from "react";

const SUPABASE_URL = 'https://ziosmbtgmxuvycnuewoj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_n__VY44aJXPKRtcrl5GMpA_eYnd02C5';

async function saveEmailLead(email, intel, thinking) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({ email, intel, thinking }),
    });
    return res.ok;
  } catch (err) {
    return false;
  }
}

const INTEL_NAMES = {
  logica: "Lógico-Matemática", linguistica: "Lingüística",
  visual: "Visual-Espacial", musical: "Musical",
  kinestesica: "Cinético-Corporal", interpersonal: "Interpersonal",
  intrapersonal: "Intrapersonal", naturalista: "Naturalista",
};
const INTEL_COLORS = {
  logica: "#6366F1", linguistica: "#38BDF8", visual: "#A78BFA",
  musical: "#F472B6", kinestesica: "#FBBF24", interpersonal: "#34D399",
  intrapersonal: "#F87171", naturalista: "#4ADE80",
};
const THINKING_DATA = {
  A: { name: "Analítico Sistémico",  label: "Mesa A", color: "#6EE7B7" },
  B: { name: "Empático Estratégico", label: "Mesa B", color: "#60A5FA" },
  C: { name: "Visual Exploratorio",  label: "Mesa C", color: "#C084FC" },
  D: { name: "Creativo Expresivo",   label: "Mesa D", color: "#FB923C" },
};

const IconLoader = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ animation: 'egSpin 1s linear infinite', display:'block', flexShrink:0 }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

// ── CSS idéntico al estilo de la app principal ────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600;700&display=swap');

  @keyframes egSpin  { to { transform: rotate(360deg); } }
  @keyframes egUp    { from { opacity:0; transform:translateY(18px) scale(0.98); } to { opacity:1; transform:translateY(0) scale(1); } }
  @keyframes egPop   { 0%{transform:scale(0.75);opacity:0} 65%{transform:scale(1.08)} 100%{transform:scale(1);opacity:1} }
  @keyframes egFloat { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-10px) rotate(1deg)} }
  @keyframes egBlink { 0%,100%{opacity:1} 50%{opacity:0.25} }
  @keyframes egShine { 0%{left:-100%} 100%{left:200%} }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { width: 100%; min-height: 100%; overflow-x: hidden; }

  /* — ROOT — mismo gradiente que .mit-root */
  .eg-root {
    font-family: 'Inter', sans-serif;
    background: linear-gradient(155deg,#FF4103 0%,#A8320E 12%,#7B2B12 24%,#4A2419 36%,#1F1B1C 50%,#031720 74%,#001621 100%);
    width: 100vw;
    min-height: 100vh;
    color: #fff;
    overflow-x: hidden;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.25rem 2.5rem;
  }

  /* grid overlay igual que la app */
  .eg-grid {
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background-image:
      linear-gradient(rgba(205,248,21,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(205,248,21,0.035) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  /* — CARD — igual que .q-card / .glass-card de la app */
  .eg-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 480px;
    background: rgba(0,0,0,0.28);
    border: 1px solid rgba(205,248,21,0.16);
    border-radius: 16px;
    padding: 2rem 1.75rem 1.75rem;
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    animation: egUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }
  .eg-card::before {
    content: '';
    position: absolute; top: 0; left: 0; width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, #CDF815, transparent);
  }

  /* logo — igual que AiModeLogo pero centrado */
  .eg-logo-wrap {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  .eg-logo-main {
    font-family: 'Poppins', sans-serif;
    font-size: 30px; font-weight: 900; line-height: 1;
    color: #CDF815; letter-spacing: -1px;
    text-shadow: 0 0 25px rgba(205,248,21,0.45);
  }
  .eg-logo-row {
    display: inline-flex; align-items: center; gap: 7px; margin-top: 4px;
  }
  .eg-logo-word {
    font-family: 'Poppins', sans-serif;
    font-size: 14px; font-weight: 900; color: #fff; letter-spacing: 2px;
  }
  .eg-logo-toggle {
    width: 32px; height: 18px;
    border: 2px solid #CDF815; border-radius: 9px;
    position: relative; flex-shrink: 0;
  }
  .eg-logo-toggle-dot {
    position: absolute; right: 2px; top: 2px;
    width: 10px; height: 10px;
    background: #CDF815; border-radius: 50%;
    box-shadow: 0 0 8px #CDF815;
  }
  .eg-logo-by {
    font-family: 'Inter', sans-serif;
    font-size: 10px; font-weight: 500; color: #CDF815;
  }

  /* badge live — mismo estilo que .side-badge */
  .eg-badge {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 9px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;
    color: #CDF815; border: 1px solid rgba(205,248,21,0.32);
    background: rgba(205,248,21,0.07); padding: 6px 14px; border-radius: 50px;
    margin: 0 auto 1.25rem; display: flex; width: fit-content;
  }
  .eg-badge-dot {
    width: 5px; height: 5px; background: #CDF815; border-radius: 50%;
    box-shadow: 0 0 8px #CDF815; animation: egBlink 2s ease-in-out infinite; flex-shrink: 0;
  }

  /* — FORM SECTION — */
  .eg-form-icon {
    width: 64px; height: 64px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1rem;
    animation: egFloat 4s ease-in-out infinite;
    filter: drop-shadow(0 0 18px rgba(205,248,21,0.3));
  }

  .eg-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(20px, 5vw, 28px); font-weight: 800;
    line-height: 1.2; text-align: center; color: #fff;
    margin-bottom: 0.5rem; letter-spacing: -0.5px;
  }
  .eg-title span { color: #CDF815; text-shadow: 0 0 18px rgba(205,248,21,0.45); }

  .eg-sub {
    font-size: 13px; color: rgba(255,255,255,0.5);
    line-height: 1.75; text-align: center; margin-bottom: 1.35rem;
  }

  /* perks — igual que las pills de intel */
  .eg-perks { display: flex; flex-direction: column; gap: 7px; margin-bottom: 1.4rem; }
  .eg-perk {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 14px; border-radius: 9px;
    border: 1px solid rgba(205,248,21,0.1);
    background: rgba(255,255,255,0.03);
    font-size: 12.5px; color: rgba(255,255,255,0.65); font-weight: 500;
  }
  .eg-perk-dot {
    width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0;
    animation: egBlink 2.5s ease-in-out infinite;
  }

  /* input row — igual que .option-btn */
  .eg-input-wrap {
    display: flex; border-radius: 9px; overflow: hidden;
    border: 1px solid rgba(205,248,21,0.18);
    background: rgba(255,255,255,0.03);
    transition: border-color 0.18s, box-shadow 0.18s;
    margin-bottom: 0.5rem;
  }
  .eg-input-wrap:focus-within {
    border-color: #CDF815;
    box-shadow: -3px 0 0 0 #CDF815, 0 0 22px rgba(205,248,21,0.18);
  }
  .eg-input-wrap.err { border-color: rgba(248,113,113,0.55); }
  .eg-input-icon {
    display: flex; align-items: center; padding: 0 13px;
    color: rgba(205,248,21,0.45); flex-shrink: 0;
  }
  .eg-input {
    flex: 1; background: transparent; border: none; outline: none;
    color: #fff; font-family: 'Inter', sans-serif;
    font-size: 14px; padding: 13px 0; min-width: 0;
  }
  .eg-input::placeholder { color: rgba(255,255,255,0.2); }
  .eg-submit-btn {
    display: flex; align-items: center; justify-content: center;
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 800;
    padding: 0 20px; border: none; cursor: pointer;
    transition: filter 0.18s, background 0.18s;
    flex-shrink: 0; min-width: 54px; letter-spacing: 0.5px;
  }
  .eg-submit-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .eg-submit-btn:hover:not(:disabled) { filter: brightness(0.88); }

  .eg-error {
    font-size: 11px; color: #F87171; text-align: center;
    padding: 7px 12px; border-radius: 8px; margin-bottom: 0.4rem;
    background: rgba(248,113,113,0.08); border: 1px solid rgba(248,113,113,0.2);
  }
  .eg-trust {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    font-size: 10px; color: rgba(255,255,255,0.25); margin-top: 0.65rem;
  }

  /* — SUCCESS SECTION — */
  .eg-success {
    display: flex; flex-direction: column; align-items: center;
    text-align: center;
    animation: egUp 0.45s cubic-bezier(0.16,1,0.3,1) both;
  }

  .eg-check {
    width: 80px; height: 80px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.1rem;
    animation: egPop 0.5s cubic-bezier(0.16,1,0.3,1) both,
               egFloat 3.5s ease-in-out 0.5s infinite;
  }

  .eg-s-title {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(22px, 6vw, 32px); font-weight: 900;
    color: #fff; margin-bottom: 0.3rem; line-height: 1.15; letter-spacing: -0.5px;
  }
  .eg-s-email {
    font-size: 12px; color: rgba(255,255,255,0.38);
    margin-bottom: 1.25rem; line-height: 1.6;
  }
  .eg-s-email strong { color: rgba(255,255,255,0.7); font-weight: 600; }

  /* result card — igual que .result-hero */
  .eg-result {
    width: 100%;
    border-radius: 16px; overflow: hidden;
    border: 1px solid rgba(205,248,21,0.18);
    background: rgba(0,0,0,0.28);
    position: relative; margin-bottom: 1.1rem;
    text-align: center;
  }
  .eg-result::before {
    content: '';
    position: absolute; top: 0; left: 0; width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, var(--ic, #CDF815), transparent);
  }
  .eg-result-body { padding: 1.5rem 1.25rem 1.25rem; }

  .eg-r-tag {
    font-size: 8px; font-weight: 700; letter-spacing: 2.5px;
    text-transform: uppercase; color: rgba(205,248,21,0.65);
    margin-bottom: 0.5rem; display: block;
  }
  .eg-r-name {
    font-family: 'Poppins', sans-serif;
    font-size: clamp(28px, 8vw, 40px); font-weight: 900;
    line-height: 1.05; margin-bottom: 0.75rem;
  }
  /* thinking badge — igual que .result-thinking-badge */
  .eg-thinking-badge {
    display: inline-flex; align-items: center; gap: 6px;
    font-size: 10px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; padding: 5px 14px; border-radius: 50px;
  }
  .eg-thinking-dot { width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0; }

  /* descarga btn — igual que .btn-start pero sólido */
  .eg-dl {
    width: 100%; padding: 14px 20px; border-radius: 9px; border: none;
    font-family: 'Poppins', sans-serif; font-size: 14px; font-weight: 800;
    cursor: pointer; letter-spacing: 1px; text-transform: uppercase;
    color: #001621; background: #CDF815;
    display: flex; align-items: center; justify-content: center; gap: 9px;
    position: relative; overflow: hidden;
    transition: transform 0.18s, box-shadow 0.18s;
    box-shadow: 0 0 25px rgba(205,248,21,0.18);
  }
  .eg-dl::after {
    content: '';
    position: absolute; top: 0; left: -100%; width: 60%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    animation: egShine 3s ease-in-out infinite;
  }
  .eg-dl:hover { background: #BBE732; box-shadow: 0 0 45px rgba(205,248,21,0.5); transform: translateY(-2px); }
  .eg-dl span { position: relative; z-index: 1; }
  .eg-dl svg  { position: relative; z-index: 1; flex-shrink: 0; }

  .eg-no-img {
    width: 100%; padding: 1rem 1.1rem; border-radius: 9px;
    border: 1px solid rgba(205,248,21,0.1);
    background: rgba(255,255,255,0.03);
    font-size: 12px; color: rgba(255,255,255,0.38); line-height: 1.65; text-align: center;
  }
  .eg-no-img strong { color: rgba(255,255,255,0.6); font-weight: 600; }

  /* credits footer — igual que .credits-footer */
  .eg-footer {
    position: relative; z-index: 1; margin-top: 1.25rem;
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(205,248,21,0.05); border: 1px solid rgba(205,248,21,0.18);
    border-radius: 50px; padding: 7px 18px; backdrop-filter: blur(10px);
  }
  .eg-footer-label {
    font-size: 9px; font-weight: 600; color: rgba(255,255,255,0.3);
    letter-spacing: 1.8px; text-transform: uppercase; white-space: nowrap;
  }
  .eg-footer-dot { width: 3px; height: 3px; background: rgba(205,248,21,0.3); border-radius: 50%; }
  .eg-footer-name {
    font-family: 'Poppins', sans-serif; font-size: 11px; font-weight: 800;
    color: #CDF815; letter-spacing: 0.4px; white-space: nowrap;
    text-shadow: 0 0 9px rgba(205,248,21,0.35);
  }
  .eg-footer-sep { font-size: 10px; color: rgba(205,248,21,0.22); }

  /* responsivo */
  @media (max-width: 480px) {
    .eg-root { padding: 1.5rem 1rem 2rem; }
    .eg-card { padding: 1.75rem 1.25rem 1.5rem; border-radius: 16px; }
  }
  @media (max-width: 380px) {
    .eg-card { padding: 1.5rem 1rem 1.25rem; }
    .eg-r-name { font-size: 26px; }
  }
  @media (max-height: 680px) {
    .eg-root { justify-content: flex-start; padding-top: 1.25rem; }
    .eg-perks { gap: 5px; margin-bottom: 1rem; }
    .eg-logo-wrap { margin-bottom: 1rem; }
  }
`;

// ── Pantalla éxito ─────────────────────────────────────────────────────────────
function SuccessScreen({ email, intel, thinking, imageUrl }) {
  const intelName  = INTEL_NAMES[intel]    || intel;
  const intelColor = INTEL_COLORS[intel]   || "#CDF815";
  const thinkObj   = THINKING_DATA[thinking] || { name: thinking, label: `Mesa ${thinking}`, color: "#6EE7B7" };

  return (
    <div className="eg-success">
      {/* check animado con color de inteligencia */}
      <div className="eg-check" style={{
        background: `${intelColor}18`,
        border: `1px solid ${intelColor}44`,
        boxShadow: `0 0 22px ${intelColor}30`,
      }}>
        <svg width="38" height="38" viewBox="0 0 24 24" fill="none"
          stroke={intelColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      <h2 className="eg-s-title">¡Tu perfil está listo!</h2>
      <p className="eg-s-email">Guardado como <strong>{email}</strong></p>

      {/* card resultado — idéntica a .result-hero */}
      <div className="eg-result" style={{ '--ic': intelColor }}>
        <div className="eg-result-body">
          <span className="eg-r-tag">Tu inteligencia dominante</span>
          <div className="eg-r-name" style={{
            color: intelColor,
            textShadow: `0 0 22px ${intelColor}44`,
          }}>
            {intelName}
          </div>
          <div className="eg-thinking-badge" style={{
            background: `${thinkObj.color}18`,
            border: `1px solid ${thinkObj.color}44`,
            color: thinkObj.color,
          }}>
            <div className="eg-thinking-dot" style={{ background: thinkObj.color }}/>
            {thinkObj.label} · {thinkObj.name}
          </div>
        </div>
      </div>

      {/* botón descarga o mensaje */}
      {imageUrl ? (
        <button className="eg-dl" onClick={() => window.open(imageUrl, '_blank')}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#001621"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span>Descargar mi imagen</span>
        </button>
      ) : (
        <div className="eg-no-img">
          Regresa a la tablet y presiona<br/>
          <strong>"Generar imagen + QR"</strong><br/>
          luego escanea de nuevo para descargar.
        </div>
      )}
    </div>
  );
}

// ── Componente principal ────────────────────────────────────────────────────────
export default function EmailGatePage({ intel, thinking, imageUrl }) {
  const intelColor = INTEL_COLORS[intel] || "#CDF815";

  const [email,      setEmail]      = useState('');
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState('');
  const [done,       setDone]       = useState(false);
  const [savedEmail, setSavedEmail] = useState('');

  const isValid = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const handleSubmit = async () => {
    if (!isValid(email)) { setError('Ingresa un correo válido, por favor'); return; }
    setError(''); setLoading(true);
    await saveEmailLead(email.trim().toLowerCase(), intel, thinking);
    setSavedEmail(email.trim().toLowerCase());
    setLoading(false); setDone(true);
  };

  return (
    <>
      <style>{css}</style>
      <div className="eg-root">
        <div className="eg-grid"/>

        <div className="eg-card">

          {/* Logo — idéntico a AiModeLogo centrado */}
          <div className="eg-logo-wrap">
            <div className="eg-logo-main">Ai MODE</div>
            <div style={{ display:'flex', justifyContent:'center' }}>
              <div className="eg-logo-row">
                <span className="eg-logo-word">LIFE</span>
                <div className="eg-logo-toggle">
                  <div className="eg-logo-toggle-dot"/>
                </div>
                <span className="eg-logo-word">ON</span>
                <span className="eg-logo-by">by Unifranz</span>
              </div>
            </div>
          </div>

          {!done ? (
            <>
              {/* badge */}
              <div className="eg-badge">
                <div className="eg-badge-dot"/>
                Test de Inteligencias Múltiples
              </div>

              {/* ícono correo flotante */}
              <div className="eg-form-icon" style={{
                background: `${intelColor}14`,
                border: `1px solid ${intelColor}38`,
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                  stroke={intelColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M2 7l10 7 10-7"/>
                </svg>
              </div>

              <h1 className="eg-title">
                Un paso para ver<br/><span>tu resultado</span>
              </h1>
              <p className="eg-sub">
                Ingresa tu correo y accede a tu perfil cognitivo completo con herramientas IA.
              </p>

              <div className="eg-perks">
                {[
                  'Tu inteligencia dominante y tipo de pensamiento',
                  'Herramientas IA recomendadas para ti',
                  'Imagen descargable lista para compartir',
                ].map(b => (
                  <div key={b} className="eg-perk">
                    <div className="eg-perk-dot" style={{ background: intelColor, boxShadow: `0 0 7px ${intelColor}` }}/>
                    {b}
                  </div>
                ))}
              </div>

              {/* input */}
              <div className={`eg-input-wrap ${error ? 'err' : ''}`}>
                <div className="eg-input-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="M2 7l10 7 10-7"/>
                  </svg>
                </div>
                <input
                  type="email"
                  className="eg-input"
                  placeholder="tucorreo@gmail.com"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  autoComplete="email"
                  autoFocus
                />
                <button
                  className="eg-submit-btn"
                  onClick={handleSubmit}
                  disabled={loading || !email.trim()}
                  style={{ background: intelColor, color: '#001621' }}
                >
                  {loading ? <IconLoader/> : '→'}
                </button>
              </div>

              {error && <div className="eg-error">{error}</div>}

              <div className="eg-trust">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                  stroke={intelColor} strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" style={{ opacity:0.55, flexShrink:0 }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                Tu información está segura con nosotros
              </div>
            </>
          ) : (
            <SuccessScreen
              email={savedEmail}
              intel={intel}
              thinking={thinking}
              imageUrl={imageUrl}
            />
          )}
        </div>

        {/* footer — idéntico a CreditsFooter */}
        <div className="eg-footer">
          <span className="eg-footer-label">Creado por</span>
          <span className="eg-footer-dot"/>
          <span className="eg-footer-name">Alba Gomez</span>
          <span className="eg-footer-sep">&amp;</span>
          <span className="eg-footer-name">Erika Veramendi</span>
        </div>
      </div>
    </>
  );
}