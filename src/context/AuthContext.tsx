import React, { createContext, useContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user with dashboard permission for development
const demoUser: User = {
  id: 'demo-user',
  name: 'Demo User',
  email: 'demo@example.com',
  role: 'Super Admin',
  permissions: [
    "dashboard",
    "patients",
    "order-history",
    "products"
  ]
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // For demo purposes, auto-login with demo user
  // In production, this would handle actual authentication
  const [user, setUser] = React.useState<User | null>(demoUser);

  const login = (userData: User) => {
    setUser(userData);
    // TODO: Store in localStorage/sessionStorage for persistence
  };

  const logout = () => {
    setUser(null);
    // TODO: Clear localStorage/sessionStorage
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
