import { useQuery } from '@tanstack/react-query';

export function useTrendingMovies() {
  return useQuery({
    queryKey: ['trending-movies'],
    queryFn: async () => {
      const res = await fetch('/api/tmdbTrending?type=movie&time=week');
      if (!res.ok) throw new Error('Failed to fetch trending movies');
      const data = await res.json();
      return data.results;
    },
  });
} 