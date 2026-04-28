import React, { useRef, useState, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';

// ─── PALETA ────────────────────────────────────────────────────────────────────
const LIME = "#CDF815";
const IMGBB_API_KEY = "5f8423f1a627d427e0acfeb1be1fcad3";

// ─── ICONOS SVG inline ────────────────────────────────────────────────────────
const IconDownload = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IconQR = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
    <rect x="14" y="14" width="3" height="3"/><rect x="19" y="14" width="2" height="2"/>
    <rect x="14" y="19" width="2" height="2"/><rect x="18" y="18" width="3" height="3"/>
  </svg>
);
const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconLoader = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
    style={{ animation: 'spin 1s linear infinite' }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

// ─── ESTILOS ──────────────────────────────────────────────────────────────────
const styles = `
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

  .ds-wrap {
    background: rgba(0,0,0,0.32);
    border-radius: 16px;
    padding: 1.75rem;
    margin-bottom: 1.1rem;
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(205,248,21,0.22);
  }
  .ds-wrap::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, #CDF815, transparent);
  }
  .ds-label {
    font-size: 8px; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: rgba(205,248,21,0.55);
    margin-bottom: 1rem;
    font-family: 'Inter', sans-serif;
  }
  .ds-inner {
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
  }
  .ds-qr-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.55rem;
    flex-shrink: 0;
  }
  .ds-qr-frame {
    background: #fff;
    border-radius: 12px;
    padding: 10px;
    position: relative;
    transition: all 0.3s;
  }
  .ds-qr-frame.uploading {
    opacity: 0.5;
    filter: blur(1px);
  }
  .ds-qr-overlay {
    position: absolute; inset: 0;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.55);
    backdrop-filter: blur(2px);
    font-size: 10px;
    color: #CDF815;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    flex-direction: column;
    gap: 6px;
  }
  .ds-qr-label {
    font-size: 10px;
    color: rgba(255,255,255,0.5);
    text-align: center;
    max-width: 160px;
    line-height: 1.5;
    font-family: 'Inter', sans-serif;
  }
  .ds-qr-label strong {
    color: #CDF815;
    display: block;
    font-size: 9px;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 2px;
  }
  .ds-actions {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
  }
  .ds-info {
    font-size: 12px;
    color: rgba(255,255,255,0.5);
    line-height: 1.7;
    margin-bottom: 0.3rem;
    font-family: 'Inter', sans-serif;
  }
  .ds-info b {
    color: rgba(255,255,255,0.85);
    font-weight: 600;
  }
  .ds-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    font-weight: 700;
    padding: 11px 18px;
    border-radius: 9px;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    border: none;
    width: 100%;
  }
  .ds-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .ds-btn-primary {
    background: #CDF815;
    color: #001621;
    box-shadow: 0 0 18px rgba(205,248,21,0.2);
  }
  .ds-btn-primary:hover:not(:disabled) {
    background: #BBE732;
    box-shadow: 0 0 30px rgba(205,248,21,0.4);
    transform: translateY(-1px);
  }
  .ds-btn-secondary {
    background: transparent;
    color: rgba(205,248,21,0.7);
    border: 1px solid rgba(205,248,21,0.25);
  }
  .ds-btn-secondary:hover:not(:disabled) {
    border-color: rgba(205,248,21,0.55);
    color: #CDF815;
    background: rgba(205,248,21,0.06);
  }
  .ds-status {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1px;
    text-transform: uppercase;
    text-align: center;
    padding: 6px 10px;
    border-radius: 6px;
    animation: fadeInUp 0.3s ease;
    font-family: 'Inter', sans-serif;
  }
  .ds-status.success {
    color: #4ADE80;
    background: rgba(74,222,128,0.08);
    border: 1px solid rgba(74,222,128,0.22);
  }
  .ds-status.error {
    color: #F87171;
    background: rgba(248,113,113,0.08);
    border: 1px solid rgba(248,113,113,0.22);
  }
  .ds-hint {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 10px 12px;
    border-radius: 8px;
    background: rgba(205,248,21,0.05);
    border: 1px solid rgba(205,248,21,0.12);
    font-size: 10px;
    color: rgba(255,255,255,0.45);
    line-height: 1.6;
    font-family: 'Inter', sans-serif;
  }
  .ds-hint-dot {
    width: 5px;
    height: 5px;
    background: #CDF815;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 4px;
    box-shadow: 0 0 6px #CDF815;
    animation: pulse 2s ease-in-out infinite;
  }
  @media (max-width: 500px) {
    .ds-inner { flex-direction: column; align-items: center; }
    .ds-qr-col { width: 100%; align-items: center; }
    .ds-actions { width: 100%; }
  }
`;

// ─── CERTIFICADO OCULTO ────────────────────────────────────────────────────────
function Certificate({ primary, thinking, profile, matrixItem, certRef }) {
  const C = primary.color;
  const T = thinking.color;
  return (
    <div ref={certRef} style={{
      position: 'absolute', left: '-9999px', top: 0,
      width: '600px',
      background: 'linear-gradient(155deg,#FF4103 0%,#7B2B12 20%,#1F1B1C 50%,#001621 100%)',
      color: '#fff', fontFamily: "'Poppins', sans-serif", padding: '0', overflow: 'hidden',
    }}>
      <div style={{ height: '4px', background: `linear-gradient(90deg, transparent, ${C}, transparent)` }} />
      <div style={{ padding: '32px 36px 24px', borderBottom: `1px solid rgba(255,255,255,0.08)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '22px', fontWeight: 900, color: LIME, letterSpacing: '-0.5px', lineHeight: 1 }}>Ai MODE</div>
            <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '3px' }}>LIFE · ON · by Unifranz</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '8px', color: 'rgba(205,248,21,0.5)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '3px' }}>Test de Inteligencias Múltiples</div>
            <div style={{ fontSize: '8px', color: 'rgba(255,255,255,0.25)', letterSpacing: '1px' }}>FEXCO 2026</div>
          </div>
        </div>
      </div>
      <div style={{ padding: '28px 36px 24px', background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(205,248,21,0.5)', marginBottom: '8px' }}>Tu inteligencia dominante</div>
        <div style={{ fontSize: '40px', fontWeight: 900, color: C, lineHeight: 1.05, marginBottom: '10px', textShadow: `0 0 30px ${C}66` }}>{primary.name}</div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: `${T}18`, border: `1px solid ${T}44`, borderRadius: '50px', padding: '5px 14px', marginBottom: '16px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: T }} />
          <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: T }}>{thinking.label} · {thinking.name}</span>
        </div>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, margin: 0, maxWidth: '460px' }}>{profile.desc}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: 'rgba(255,255,255,0.06)' }}>
        <div style={{ padding: '22px 28px', background: 'rgba(0,0,0,0.28)' }}>
          <div style={{ fontSize: '7px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(205,248,21,0.4)', marginBottom: '10px' }}>Herramienta IA recomendada</div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: LIME, marginBottom: '5px', lineHeight: 1.3 }}>{profile.ai}</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{profile.aiDesc}</div>
        </div>
        <div style={{ padding: '22px 28px', background: `${T}0a` }}>
          <div style={{ fontSize: '7px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: `${T}80`, marginBottom: '10px' }}>Tu mesa de trabajo IA</div>
          <div style={{ fontSize: '15px', fontWeight: 700, color: T, marginBottom: '5px', lineHeight: 1.3 }}>{matrixItem.herramienta}</div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>{matrixItem.desc}</div>
        </div>
      </div>
      <div style={{ padding: '16px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: `1px solid rgba(255,255,255,0.06)`, background: 'rgba(0,0,0,0.3)' }}>
        <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)', letterSpacing: '1px' }}>Creado por <span style={{ color: 'rgba(255,255,255,0.45)' }}>Alba Gomez & Erika Veramendi</span></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: LIME, boxShadow: `0 0 6px ${LIME}` }} />
          <span style={{ fontSize: '9px', color: LIME, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Ai MODE · Life On</span>
        </div>
      </div>
      <div style={{ height: '3px', background: `linear-gradient(90deg, transparent, ${C}, transparent)` }} />
    </div>
  );
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────
export default function DownloadSection({ primary, thinking, profile, matrixItem, primaryIntel, primaryThinking }) {
  const certRef = useRef();
  const [status, setStatus] = useState('idle');
  const [imageUrl, setImageUrl] = useState(null);
  const [localBlob, setLocalBlob] = useState(null);

  // ══════════════════════════════════════════════════════════════════════════
  // QR SIEMPRE APUNTA AL GATE — el celular pasará por la pantalla de email
  // antes de ver la imagen.
  //
  // • Sin imagen subida aún → gate con intel+thinking solamente
  // • Con imagen subida    → gate con intel+thinking+img (para mostrar botón
  //                          de descarga directo tras el email)
  // ══════════════════════════════════════════════════════════════════════════
  const baseGateUrl = `${window.location.origin}${window.location.pathname}?gate=1&intel=${primaryIntel}&thinking=${primaryThinking}`;

  const qrValue = imageUrl
    ? `${baseGateUrl}&img=${encodeURIComponent(imageUrl)}`
    : baseGateUrl;

  const generateAndUpload = useCallback(async () => {
    setStatus('generating');
    try {
      const canvas = await html2canvas(certRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#031720',
        logging: false,
      });

      const blob = await new Promise(res => canvas.toBlob(res, 'image/png'));
      setLocalBlob(blob);

      setStatus('uploading');
      const base64 = canvas.toDataURL('image/png').split(',')[1];
      const formData = new FormData();
      formData.append('image', base64);
      formData.append('name', `AiMODE_${primaryIntel}_${primaryThinking}`);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();

      if (data.success) {
        setImageUrl(data.data.url);
        setStatus('done');
      } else {
        throw new Error('ImgBB error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }, [primaryIntel, primaryThinking]);

  const downloadLocal = useCallback(() => {
    if (!localBlob) return;
    const url = URL.createObjectURL(localBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Perfil_AiMODE_${primary.name.replace(/\s/g, '_')}.png`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus('saved');
  }, [localBlob, primary.name]);

  const isLoading = status === 'generating' || status === 'uploading';

  return (
    <>
      <style>{styles}</style>

      {/* CERTIFICADO OCULTO */}
      <Certificate
        primary={primary}
        thinking={thinking}
        profile={profile}
        matrixItem={matrixItem}
        certRef={certRef}
      />

      {/* SECCIÓN VISIBLE */}
      <div className="ds-wrap">
        <div className="ds-label">Llévate tu resultado</div>

        <div className="ds-inner">

          {/* QR */}
          <div className="ds-qr-col">
            <div className={`ds-qr-frame ${isLoading ? 'uploading' : ''}`} style={{ border: `3px solid ${primary.color}` }}>
              <QRCodeSVG
                value={qrValue}
                size={150}
                level="M"
                fgColor={status === 'done' ? '#000' : '#555'}
              />
              {isLoading && (
                <div className="ds-qr-overlay">
                  <IconLoader />
                  <span>{status === 'generating' ? 'Generando...' : 'Subiendo...'}</span>
                </div>
              )}
            </div>
            <div className="ds-qr-label">
              {status === 'done'
                ? <><strong>✓ Listo · escanea ahora</strong>Tu celular pedirá tu correo y podrás descargar tu imagen</>
                : status === 'idle'
                ? <><strong>Genera tu QR</strong>Primero genera la imagen, luego escanea</>
                : status === 'error'
                ? <><strong>QR disponible</strong>Escanea para continuar con tu resultado</>
                : <><strong>Procesando...</strong>Generando tu imagen personalizada</>
              }
            </div>
          </div>

          {/* ACCIONES */}
          <div className="ds-actions">
            <p className="ds-info">
              Genera tu <b>imagen personalizada</b> y escanea el QR con tu celular.
              Se te pedirá tu <b>correo</b> para desbloquear y descargar tu resultado.
            </p>

            {status === 'idle' && (
              <button className="ds-btn ds-btn-primary" onClick={generateAndUpload}>
                <IconQR /> Generar imagen + QR
              </button>
            )}

            {isLoading && (
              <button className="ds-btn ds-btn-primary" disabled>
                <IconLoader />
                {status === 'generating' ? 'Generando imagen...' : 'Subiendo al servidor...'}
              </button>
            )}

            {(status === 'done' || status === 'saved') && (
              <>
                <div className="ds-status success">
                  <IconCheck /> QR listo · escanea con tu celular
                </div>
                <button className="ds-btn ds-btn-secondary" onClick={downloadLocal}>
                  <IconDownload /> También guardar en esta tablet
                </button>
                <button
                  className="ds-btn ds-btn-secondary"
                  onClick={() => { setStatus('idle'); setImageUrl(null); setLocalBlob(null); }}
                  style={{ opacity: 0.5, fontSize: '10px' }}
                >
                  ↺ Regenerar
                </button>
              </>
            )}

            {status === 'error' && (
              <>
                <div className="ds-status error">
                  Error al subir · descarga local disponible
                </div>
                {localBlob && (
                  <button className="ds-btn ds-btn-primary" onClick={downloadLocal}>
                    <IconDownload /> Guardar PNG en esta tablet
                  </button>
                )}
                <button className="ds-btn ds-btn-secondary" onClick={generateAndUpload}>
                  ↺ Reintentar subida
                </button>
              </>
            )}

            <div className="ds-hint">
              <div className="ds-hint-dot" />
              <span>
                Al escanear el QR, tu celular pedirá un correo antes de mostrar la imagen.
                Sin spam — solo guardamos tu perfil.
              </span>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}