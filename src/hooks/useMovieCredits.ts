import { useQuery } from '@tanstack/react-query';

export function useMovieCredits(id: number, type: string) {
  return useQuery({
    queryKey: ['movie-credits', id, type],
    queryFn: async () => {
      const res = await fetch(`/tmdb-app/api/tmdbCredits?id=${id}&type=${type}`);
      if (!res.ok) throw new Error('Failed to fetch credits');
      return res.json();
    },
    enabled: !!id && !!type,
  });
} 