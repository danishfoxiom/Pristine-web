import { useQuery } from '@tanstack/react-query';
import useDebounce from './useDebounce';
import apiClient from '../api/apiClient';

export interface Institution {
  institution_id: string;
  name: string;
  // Add other fields as needed
}

export const useInstitutions = (searchTerm: string = '', enabled: boolean = true) => {
  const debouncedSearch = useDebounce(searchTerm, 500);

  const {
    data: institutions = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['institutions', debouncedSearch],
    queryFn: async (): Promise<Institution[]> => {
      const params = debouncedSearch ? { search: debouncedSearch } : {};
      const response = await apiClient.get('/institutions', { params });
      if (!response.data.status) throw new Error(response.data.message || 'Failed to fetch institutions');
      return response.data.data;
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: enabled, // Can be controlled by parent component
  });

  return {
    institutions,
    isLoading,
    error,
    refetch,
  };
}; 