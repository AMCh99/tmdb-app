import { useQuery } from '@tanstack/react-query';

export function useMovieList(type: string, list: string) {
  return useQuery({
    queryKey: ['movie-list', type, list],
    queryFn: async () => {
      const res = await fetch(`/api/tmdbLists?type=${type}&list=${list}`);
      if (!res.ok) throw new Error('Failed to fetch lists');
      const data = await res.json();
      return data.results;
    },
    enabled: !!type && !!list,
  });
} 