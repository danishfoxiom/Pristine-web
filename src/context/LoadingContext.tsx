import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  loadingMessage: string;
  setLoadingMessage: (message: string) => void;
  showLoader: (message?: string) => void;
  hideLoader: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');

  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  const showLoader = (message = 'Loading...') => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const hideLoader = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const handleShowLoader = (event: CustomEvent) => {
      showLoader(event.detail);
    };

    const handleHideLoader = () => {
      hideLoader();
    };

    window.addEventListener('showGlobalLoader', handleShowLoader as EventListener);
    window.addEventListener('hideGlobalLoader', handleHideLoader);

    return () => {
      window.removeEventListener('showGlobalLoader', handleShowLoader as EventListener);
      window.removeEventListener('hideGlobalLoader', handleHideLoader);
    };
  }, []);

  const value: LoadingContextType = {
    isLoading,
    setLoading,
    loadingMessage,
    setLoadingMessage,
    showLoader,
    hideLoader,
  };

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
