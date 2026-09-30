// GET /api/resultados?k=CHAVE — lista as respostas (protegido por RESULTADOS_KEY)
module.exports = async (req, res) => {
  const k = (req.query && req.query.k) || '';
  if (!process.env.RESULTADOS_KEY || k !== process.env.RESULTADOS_KEY) return res.status(401).json({ erro: 'Chave inválida' });
  const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) return res.status(500).json({ erro: 'Variáveis SUPABASE_URL / SUPABASE_SERVICE_KEY não configuradas' });
  const r = await fetch(url + '/rest/v1/votos?select=nome,votos,comentarios,enviado_em&order=enviado_em.desc', {
    headers: { apikey: key, Authorization: 'Bearer ' + key }
  });
  if (!r.ok) return res.status(502).json({ erro: 'Supabase: ' + (await r.text()) });
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ respostas: await r.json() });
};
