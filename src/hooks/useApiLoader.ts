import { useLoading } from '../context/LoadingContext';

export const useApiLoader = () => {
  const { showLoader, hideLoader } = useLoading();

  const withLoader = async <T,>(
    apiCall: () => Promise<T>,
    message: string = 'Loading...'
  ): Promise<T> => {
    try {
      showLoader(message);
      const result = await apiCall();
      return result;
    } finally {
      hideLoader();
    }
  };

  return { withLoader };
};
