// Proxy for the parent site's GBP-synced review feed (colourcraftpainting.com
// blocks cross-origin reads, so pages fetch this same-origin endpoint instead).
// Mirrors the parent exactly: live rating, live count, 5 newest R&D reviews.
export default async function handler(req, res) {
  try {
    const r = await fetch('https://colourcraftpainting.com/api/trpc/reviews.getAll');
    if (!r.ok) throw new Error('upstream ' + r.status);
    const data = await r.json();
    const j = data.result.data.json;
    const meta = (j.meta || []).find(m => m.franchiseName === 'Richmond & Delta');
    if (!meta) throw new Error('no Richmond & Delta meta');
    const reviews = (j.reviews || [])
      .filter(rv => rv.franchiseName === 'Richmond & Delta' && rv.text)
      .map(rv => ({
        authorName: rv.authorName,
        authorPhoto: rv.authorPhoto,
        rating: rv.rating,
        text: rv.text,
        relativeTime: rv.relativeTime,
        publishedAt: rv.publishedAt,
      }));
    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400');
    res.status(200).json({
      rating: meta.rating,
      totalReviews: meta.totalReviews,
      lastSyncedAt: meta.lastSyncedAt,
      reviews,
    });
  } catch (e) {
    res.status(502).json({ error: 'unavailable' });
  }
}
