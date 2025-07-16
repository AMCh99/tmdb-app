import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type, list } = req.query;
  if (!type || !list) return res.status(400).json({ error: 'Missing type or list' });
  const url = `https://api.themoviedb.org/3/${type}/${list}?language=en-US&page=1`;

  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
    },
  });

  if (!response.ok) {
    return res.status(response.status).json({ error: 'Failed to fetch data' });
  }

  const data = await response.json();
  res.status(200).json(data);
} 