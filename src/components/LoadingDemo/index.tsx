import React from 'react';
import { Button, Space } from 'antd';
import { useLoading } from '../../context/LoadingContext';
import { useApiLoader } from '../../hooks/useApiLoader';
import apiClient from '../../api/apiClient';

const LoadingDemo: React.FC = () => {
  const { showLoader, hideLoader } = useLoading();
  const { withLoader } = useApiLoader();

  const handleManualLoader = () => {
    showLoader('Manual loading demo...');
    setTimeout(() => {
      hideLoader();
    }, 2000);
  };

  const handleApiCall = async () => {
    try {
      await withLoader(
        () => apiClient.get('/'),
        'Making API call...'
      );
    } catch (error) {
      console.log('API call completed (expected error for demo)');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Global Loader Demo</h2>
      <Space direction="vertical" size="middle">
        <Button type="primary" onClick={handleManualLoader}>
          Show Manual Loader (2 seconds)
        </Button>
        <Button type="default" onClick={handleApiCall}>
          Simulate API Call
        </Button>
      </Space>
    </div>
  );
};

export default LoadingDemo;
