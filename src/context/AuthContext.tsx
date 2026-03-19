import { createContext, useContext, useState, ReactNode } from 'react';
import { User, PermissionUtils } from '../permissions/permissionUtils';
import { Role } from '../permissions/roles';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_CREDENTIALS = [
  { username: 'superadmin', password: 'super123', role: Role.SUPER_ADMIN },
  { username: 'admin', password: 'admin123', role: Role.ADMIN },
  { username: 'manager', password: 'manager123', role: Role.MANAGER },
  { username: 'user', password: 'user123', role: Role.USER },
  { username: 'viewer', password: 'viewer123', role: Role.VIEWER }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState<User | null>(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');
    if (storedAuth === 'true' && storedUser) {
      return JSON.parse(storedUser);
    }
    return null;
  });

  const login = (username: string, password: string): boolean => {
    const credentials = ADMIN_CREDENTIALS.find(
      cred => cred.username === username && cred.password === password
    );
    
    if (credentials) {
      const loggedInUser = PermissionUtils.createUserWithRole(
        '1',
        credentials.username,
        `${credentials.username}@example.com`,
        credentials.role
      );
      
      setIsAuthenticated(true);
      setUser(loggedInUser);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
