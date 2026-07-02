export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const r = await fetch('https://raw.githubusercontent.com/tabatkins/wordle-list/main/words');
    if (!r.ok) throw new Error('Upstream fetch failed');
    const text = await r.text();
    res.setHeader('Cache-Control', 's-maxage=86400');
    res.status(200).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
