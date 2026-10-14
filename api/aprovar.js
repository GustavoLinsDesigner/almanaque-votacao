// POST /api/aprovar — grava uma resposta da fase 2 (proposta de design) na tabela aprovacoes
function headers(key, extra) {
  const h = Object.assign({ apikey: key }, extra || {});
  if (!key.startsWith('sb_')) h.Authorization = 'Bearer ' + key;
  return h;
}
function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
module.exports = async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ erro: 'Use POST' });
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return res.status(500).json({ erro: 'Variáveis SUPABASE_URL / SUPABASE_SERVICE_KEY não configuradas' });
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { return res.status(400).json({ erro: 'JSON inválido' }); } }
  if (!body || typeof body !== 'object') return res.status(400).json({ erro: 'Corpo vazio' });
  const nome = String(body.nome || '').trim().slice(0, 120);
  if (!nome) return res.status(400).json({ erro: 'Nome obrigatório' });
  const votos = body.votos && typeof body.votos === 'object' ? body.votos : {};
  const comentarios = body.comentarios && typeof body.comentarios === 'object' ? body.comentarios : {};
  const r = await fetch(url + '/rest/v1/aprovacoes', {
    method: 'POST',
    headers: headers(key, { 'Content-Type': 'application/json', Prefer: 'return=minimal' }),
    body: JSON.stringify({ nome, votos, comentarios })
  });
  if (!r.ok) return res.status(502).json({ erro: 'Supabase: ' + (await r.text()) });
  res.status(200).json({ ok: true });
};
