import { createContext, useContext, useCallback, ReactNode } from 'react';
import { message, ConfigProvider } from 'antd';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

interface ToastContextType {
  addToast: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const addToast = useCallback((content: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    switch (type) {
      case 'success':
        message.success(content);
        break;
      case 'error':
        message.error(content);
        break;
      case 'warning':
        message.warning(content);
        break;
      case 'info':
      default:
        message.info(content);
        break;
    }
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#6366f1',
        },
      }}
    >
      <ToastContext.Provider value={{ addToast }}>
        {children}
      </ToastContext.Provider>
    </ConfigProvider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
