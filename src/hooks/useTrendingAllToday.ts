import { useQuery } from '@tanstack/react-query';

export function useTrendingAllToday() {
  return useQuery({
    queryKey: ['trending-all-today'],
    queryFn: async () => {
      const res = await fetch('/api/tmdbTrending?type=all&time=day');
      if (!res.ok) throw new Error('Failed to fetch trending all today');
      const data = await res.json();
      return data.results;
    },
  });
} 