import { useQuery } from '@tanstack/react-query';

export function useMovieReviews(id: number, type: string) {
  return useQuery({
    queryKey: ['movie-reviews', id, type],
    queryFn: async () => {
      const res = await fetch(`/tmdb-app/api/tmdbReviews?id=${id}&type=${type}`);
      if (!res.ok) throw new Error('Failed to fetch reviews');
      const data = await res.json();
      return data.results;
    },
    enabled: !!id && !!type,
  });
} 