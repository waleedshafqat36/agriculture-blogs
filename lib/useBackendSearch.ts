import { useState, useCallback } from 'react';
import { Article } from '@/lib/searchUtils';

export interface SearchResult extends Article {
  relevanceScore: number;
  matchedKeywords: string[];
}

interface UseSearchOptions {
  limit?: number;
  debounce?: number;
}

export const useBackendSearch = (options: UseSearchOptions = {}) => {
  const { limit = 10, debounce = 300 } = options;
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const search = useCallback(
    async (query: string) => {
      // Clear previous timer
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      // Empty query
      if (!query.trim()) {
        setResults([]);
        return;
      }

      // Set new debounce timer
      const timer = setTimeout(async () => {
        try {
          setLoading(true);
          setError(null);

          const response = await fetch(
            `/api/blog/search?q=${encodeURIComponent(query)}&limit=${limit}`
          );

          if (!response.ok) {
            throw new Error(`Search failed: ${response.statusText}`);
          }

          const data = await response.json();
          setResults(data.results || []);
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : 'Search failed';
          setError(errorMessage);
          setResults([]);
        } finally {
          setLoading(false);
        }
      }, debounce);

      setDebounceTimer(timer);
    },
    [debounce, limit]
  );

  return {
    results,
    loading,
    error,
    search,
    clear: () => setResults([])
  };
};

/**
 * Example usage in a component:
 * 
 * const { results, loading, search, clear } = useBackendSearch({ limit: 10 });
 * 
 * useEffect(() => {
 *   search(searchQuery);
 * }, [searchQuery]);
 * 
 * return (
 *   <div>
 *     {loading && <p>Searching...</p>}
 *     {error && <p>Error: {error}</p>}
 *     {results.map(article => (
 *       <div key={article._id}>{article.title}</div>
 *     ))}
 *   </div>
 * );
 */
