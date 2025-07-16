import { useQuery } from '@tanstack/react-query';

export function usePersonDetails(id: number) {
  return useQuery({
    queryKey: ['person-details', id],
    queryFn: async () => {
      const res = await fetch(`/tmdb-app/api/tmdbPerson?id=${id}`);
      if (!res.ok) throw new Error('Failed to fetch person details');
      return res.json();
    },
    enabled: !!id,
  });
} 