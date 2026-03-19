import { useState, useEffect } from 'react';
import { User, Role, Permission } from '../types/role';

interface UsePermissionsReturn {
  user: User | null;
  permissions: Permission[];
  hasPermission: (permissionCode: string) => boolean;
  hasAnyPermission: (permissionCodes: string[]) => boolean;
  hasAllPermissions: (permissionCodes: string[]) => boolean;
  hasRole: (roleCode: string) => boolean;
  hasAnyRole: (roleCodes: string[]) => boolean;
  isLoading: boolean;
}

export const usePermissions = (): UsePermissionsReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock user data - replace with actual authentication logic
    const mockUser: User = {
      user_id: 1,
      username: 'admin',
      email: 'admin@example.com',
      roles: [
        {
          role_id: 1,
          role_name: 'Super Admin',
          role_code: 'SUPER_ADMIN',
          description: 'Full system access',
          status: 'Active',
          permissions: [],
          created_at: '2024-01-01T00:00:00Z',
          updated_at: '2024-01-01T00:00:00Z'
        }
      ],
      permissions: []
    };

    // Mock permissions - replace with API call
    const mockPermissions: Permission[] = [
      { permission_id: 1, permission_name: 'View Users', permission_code: 'view_user_management', module: 'User Management', action: 'view', description: 'View user list and details', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 2, permission_name: 'Create User', permission_code: 'create_user_management', module: 'User Management', action: 'create', description: 'Create new users', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 3, permission_name: 'Edit User', permission_code: 'edit_user_management', module: 'User Management', action: 'edit', description: 'Edit user information', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 4, permission_name: 'Delete User', permission_code: 'delete_user_management', module: 'User Management', action: 'delete', description: 'Delete users', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 5, permission_name: 'View Roles', permission_code: 'view_role_management', module: 'Role Management', action: 'view', description: 'View role list and details', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 6, permission_name: 'Create Role', permission_code: 'create_role_management', module: 'Role Management', action: 'create', description: 'Create new roles', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 7, permission_name: 'Edit Role', permission_code: 'edit_role_management', module: 'Role Management', action: 'edit', description: 'Edit role information', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 8, permission_name: 'Delete Role', permission_code: 'delete_role_management', module: 'Role Management', action: 'delete', description: 'Delete roles', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 9, permission_name: 'Assign Permissions', permission_code: 'assign_role_management', module: 'Role Management', action: 'edit', description: 'Assign permissions to roles', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 10, permission_name: 'View Permissions', permission_code: 'view_permission_management', module: 'Permission Management', action: 'view', description: 'View permission list and details', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 11, permission_name: 'Create Permission', permission_code: 'create_permission_management', module: 'Permission Management', action: 'create', description: 'Create new permissions', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 12, permission_name: 'Edit Permission', permission_code: 'edit_permission_management', module: 'Permission Management', action: 'edit', description: 'Edit permission information', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 13, permission_name: 'Delete Permission', permission_code: 'delete_permission_management', module: 'Permission Management', action: 'delete', description: 'Delete permissions', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' }
    ];

    // Simulate API call delay
    setTimeout(() => {
      setUser(mockUser);
      setPermissions(mockPermissions);
      setIsLoading(false);
    }, 500);
  }, []);

  const hasPermission = (permissionCode: string): boolean => {
    if (!user) return false;
    
    // Check if user has SUPER_ADMIN role (wildcard access)
    if (user.roles.some(role => role.role_code === 'SUPER_ADMIN')) {
      return true;
    }
    
    // Check specific permission
    return permissions.some(permission => permission.permission_code === permissionCode);
  };

  const hasAnyPermission = (permissionCodes: string[]): boolean => {
    if (!user) return false;
    
    // Check if user has SUPER_ADMIN role
    if (user.roles.some(role => role.role_code === 'SUPER_ADMIN')) {
      return true;
    }
    
    return permissionCodes.some(code => hasPermission(code));
  };

  const hasAllPermissions = (permissionCodes: string[]): boolean => {
    if (!user) return false;
    
    // Check if user has SUPER_ADMIN role
    if (user.roles.some(role => role.role_code === 'SUPER_ADMIN')) {
      return true;
    }
    
    return permissionCodes.every(code => hasPermission(code));
  };

  const hasRole = (roleCode: string): boolean => {
    if (!user) return false;
    return user.roles.some(role => role.role_code === roleCode);
  };

  const hasAnyRole = (roleCodes: string[]): boolean => {
    if (!user) return false;
    return roleCodes.some(code => hasRole(code));
  };

  return {
    user,
    permissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,
    isLoading
  };
};
