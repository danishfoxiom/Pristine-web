import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../../context/LoadingContext';

const RouteLoader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { showLoader, hideLoader } = useLoading();

  useEffect(() => {
    showLoader('Loading page...');
    
    const timer = setTimeout(() => {
      hideLoader();
    }, 500);

    return () => {
      clearTimeout(timer);
      hideLoader();
    };
  }, [location.pathname]);

  return <>{children}</>;
};

export default RouteLoader;
