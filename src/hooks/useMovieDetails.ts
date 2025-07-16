import { useQuery } from '@tanstack/react-query';

export function useMovieDetails(id: number, type: string) {
  return useQuery({
    queryKey: ['movie-details', id, type],
    queryFn: async () => {
      const res = await fetch(`/api/tmdbDetails?id=${id}&type=${type}`);
      if (!res.ok) throw new Error('Failed to fetch details');
      return res.json();
    },
    enabled: !!id && !!type,
  });
} 