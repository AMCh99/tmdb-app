import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, type } = req.query;
  if (!id || !type) return res.status(400).json({ error: 'Missing id or type' });

  const detailsUrl = `https://api.themoviedb.org/3/${type}/${id}`;
  const videosUrl = `https://api.themoviedb.org/3/${type}/${id}/videos`;

  const [detailsRes, videosRes] = await Promise.all([
    fetch(detailsUrl, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    }),
    fetch(videosUrl, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    })
  ]);

  if (!detailsRes.ok || !videosRes.ok) {
    return res.status(500).json({ error: 'Failed to fetch details or videos' });
  }

  const details = await detailsRes.json();
  const videos = await videosRes.json();
  const trailer = videos.results?.filter((item: any) => item?.type === 'Trailer');
  res.status(200).json({ ...details, trailer });
} 