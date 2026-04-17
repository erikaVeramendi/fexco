// ─── CONFIGURACIÓN SUPABASE ───────────────────────────────────────────────────
const SUPABASE_URL = 'https://ziosmbtgmxuvycnuewoj.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_n__VY44aJXPKRtcrl5GMpA_eYnd02C5';

// Helper para llamar a Supabase REST API
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
  return res.json();
}

// ─── GUARDAR RESULTADO: incrementa total_tests + inteligencia dominante ────────
async function saveTestResult(primaryIntel) {
  try {
    // Incrementar total_tests
    await supabaseRequest(
      `estadisticas?nombre=eq.total_tests`,
      {
        method: 'PATCH',
        body: JSON.stringify({ valor: `valor + 1` }),
        // Supabase no soporta expresiones directas en REST; usamos RPC:
      }
    );
  } catch (_) {}
  // Usamos RPC para incremento atómico (evita race conditions en múltiples equipos)
  try {
    await supabaseRequest('rpc/incrementar_contador', {
      method: 'POST',
      body: JSON.stringify({ nombre_contador: 'total_tests' }),
    });
    await supabaseRequest('rpc/incrementar_contador', {
      method: 'POST',
      body: JSON.stringify({ nombre_contador: primaryIntel }),
    });
  } catch (err) {
    console.error('Error guardando en Supabase:', err);
  }
}

// ─── CARGAR ESTADÍSTICAS ──────────────────────────────────────────────────────
async function loadStats() {
  try {
    const rows = await supabaseRequest('estadisticas?select=nombre,valor');
    const stats = { total: 0, logica: 0, linguistica: 0, visual: 0, musical: 0, kinestesica: 0, interpersonal: 0, intrapersonal: 0, naturalista: 0 };
    rows.forEach(row => {
      if (row.nombre === 'total_tests') stats.total = row.valor;
      else stats[row.nombre] = row.valor;
    });
    return stats;
  } catch (err) {
    console.error('Error cargando stats:', err);
    return { total: 0, logica: 0, linguistica: 0, visual: 0, musical: 0, kinestesica: 0, interpersonal: 0, intrapersonal: 0, naturalista: 0 };
  }
}