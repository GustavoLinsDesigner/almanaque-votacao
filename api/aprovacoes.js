// GET /api/aprovacoes?k=CHAVE — lista as respostas da fase 2 (protegido por RESULTADOS_KEY)
function headers(key, extra) {
  const h = Object.assign({ apikey: key }, extra || {});
  if (!key.startsWith('sb_')) h.Authorization = 'Bearer ' + key;
  return h;
}
module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const k = (req.query && req.query.k) || '';
  if (!process.env.RESULTADOS_KEY || k !== process.env.RESULTADOS_KEY) return res.status(401).json({ erro: 'Chave inválida' });
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return res.status(500).json({ erro: 'Variáveis SUPABASE_URL / SUPABASE_SERVICE_KEY não configuradas' });
  const r = await fetch(url + '/rest/v1/aprovacoes?select=nome,votos,comentarios,enviado_em&order=enviado_em.desc', { headers: headers(key) });
  if (!r.ok) return res.status(502).json({ erro: 'Supabase: ' + (await r.text()) });
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ respostas: await r.json() });
};
