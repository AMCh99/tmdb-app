import { useQuery } from '@tanstack/react-query';

export function useSearchMulti(query: string) {
  return useQuery({
    queryKey: ['search-multi', query],
    queryFn: async () => {
      const res = await fetch(`/api/tmdbSearch?query=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error('Failed to search');
      const data = await res.json();
      return data.results;
    },
    enabled: !!query,
  });
} 