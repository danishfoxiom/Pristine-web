import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { ThemeProvider } from './context/ThemeContext';
import { LoadingProvider } from './context/LoadingContext';
import { message } from 'antd';
import DashboardLayout from './layout/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import UsersPage from './pages/users';
import NotFound from './pages/notFound/NotFound';
import CompanyManagement from './pages/CompanyManagement';
import BranchManagement from './pages/BranchManagement';
import DesignationManagement from './pages/DesignationManagement';
import DepartmentManagement from './pages/departmentManagement';
import RoleManagement from './pages/roleManagement';
import PermissionManagement from './pages/permissionManagement';
import ProtectedRoute from './components/ProtectedRoute';
import AuthModal from './components/AuthModal';
import LoginPage from './pages/login';
import { Permission } from './permissions/permissions';
import { useState, useEffect } from 'react';

// Configure global message settings
message.config({
  top: 20,
  duration: 3,
  maxCount: 3,
  rtl: false,
});

// Example pages for demonstration
const UnauthorizedPage = () => <div className="flex items-center justify-center min-h-screen text-white">Unauthorized Access</div>;

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    setIsAuthModalOpen(!isAuthenticated);
  }, [isAuthenticated]);

  return (
    <>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      
      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredPermissions={[Permission.VIEW_DASHBOARD]}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardHome />} />
        
        {/* User management routes - require user management permissions */}
        <Route 
          path="users" 
          element={
            <ProtectedRoute requiredPermissions={[Permission.VIEW_USERS]}>
              <UsersPage />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="company" 
          element={
            <ProtectedRoute requiredPermissions={[Permission.EDIT_SETTINGS]}>
              <CompanyManagement />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="branch" 
          element={
            <ProtectedRoute requiredPermissions={[Permission.EDIT_SETTINGS]}>
              <BranchManagement />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="department" 
          element={
            <ProtectedRoute requiredPermissions={[Permission.EDIT_SETTINGS]}>
              <DepartmentManagement />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="designation" 
          element={
            <ProtectedRoute requiredPermissions={[Permission.EDIT_SETTINGS]}>
              <DesignationManagement />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="role" 
          element={
            <ProtectedRoute requiredPermissions={[Permission.VIEW_ROLES]}>
              <RoleManagement />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="permission" 
          element={
            <ProtectedRoute requiredPermissions={[Permission.VIEW_PERMISSIONS]}>
              <PermissionManagement />
            </ProtectedRoute>
          } 
        />
        
        <Route path="*" element={<NotFound />} />
      </Route>
      
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
    </>
  );
}

function App() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <ThemeProvider>
          <ToastProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </ToastProvider>
        </ThemeProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}

export default App;
