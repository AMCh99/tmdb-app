import { useQuery } from '@tanstack/react-query';

export function useTrendingTvShows() {
  return useQuery({
    queryKey: ['trending-tv-shows'],
    queryFn: async () => {
      const res = await fetch('/api/tmdbTrending?type=tv&time=week');
      if (!res.ok) throw new Error('Failed to fetch trending tv shows');
      const data = await res.json();
      return data.results;
    },
  });
} 