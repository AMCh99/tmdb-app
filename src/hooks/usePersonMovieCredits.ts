import { useQuery } from '@tanstack/react-query';

export function usePersonMovieCredits(id: number) {
  return useQuery({
    queryKey: ['person-movie-credits', id],
    queryFn: async () => {
      const res = await fetch(`/api/tmdbPersonMovieCredits?id=${id}`);
      if (!res.ok) throw new Error('Failed to fetch person movie credits');
      return res.json();
    },
    enabled: !!id,
  });
} 