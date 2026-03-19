import { useQuery } from '@tanstack/react-query';
import useDebounce from './useDebounce';
import apiClient from '../api/apiClient';
import { API } from '../api/api';

export interface Employee {
  employee_id: string;
  employee_code: string;
  user_name: string;
  user_email: string;
  institution_id: string;
  user: {
    user_id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    email: string;
    userInstitution?: {
      institution_id: string;
      name: string;
    };
  };
}

/**
 * Hook to fetch employees with debounced search functionality
 * 
 * @param searchTerm - Search term for filtering employees (debounced by 500ms)
 * @param enabled - Whether the query should be enabled (default: true)
 * @param institutionId - Institution ID to filter employees by (optional)
 * 
 * @returns Object containing:
 * - employees: Array of Employee objects
 * - isLoading: Boolean indicating if the request is in progress
 * - error: Error object if the request failed
 * - refetch: Function to manually refetch the data
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const { employees, isLoading, error } = useEmployees();
 * 
 * // With search
 * const [searchTerm, setSearchTerm] = useState('');
 * const { employees, isLoading } = useEmployees(searchTerm);
 * 
 * // With institution filter
 * const { employees } = useEmployees('', true, 'institution-123');
 * 
 * // Conditional fetching
 * const { employees } = useEmployees('', isFormOpen);
 * ```
 */
export const useEmployees = (searchTerm: string = '', enabled: boolean = true, institutionId?: string) => {
  const debouncedSearch = useDebounce(searchTerm, 500);

  const {
    data: employees = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['employees', debouncedSearch, institutionId],
    queryFn: async (): Promise<Employee[]> => {
      const params: any = {};
      if (debouncedSearch) params.search = debouncedSearch;
      if (institutionId) params.institutionId = institutionId;
      
      const response = await apiClient.get(API.GET_EMPLOYEES, { params });
      if (!response.data.status) throw new Error(response.data.message || 'Failed to fetch employees');
      return response.data.data;
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    enabled: enabled, // Can be controlled by parent component
  });

  return {
    employees,
    isLoading,
    error,
    refetch,
  };
}; 