import { useQuery } from '@tanstack/react-query';

export function useMovieVideos(id: number, type: string) {
  return useQuery({
    queryKey: ['movie-videos', id, type],
    queryFn: async () => {
      const res = await fetch(`/tmdb-app/api/tmdbVideos?id=${id}&type=${type}`);
      if (!res.ok) throw new Error('Failed to fetch videos');
      const data = await res.json();
      return data.results;
    },
    enabled: !!id && !!type,
  });
} 