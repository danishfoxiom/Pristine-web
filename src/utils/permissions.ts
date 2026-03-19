import { Permission } from '../types/role';

// Permission constants for easy reference
export const PERMISSIONS = {
  // User Management
  VIEW_USERS: 'view_user_management',
  CREATE_USER: 'create_user_management',
  EDIT_USER: 'edit_user_management',
  DELETE_USER: 'delete_user_management',

  // Role Management
  VIEW_ROLES: 'view_role_management',
  CREATE_ROLE: 'create_role_management',
  EDIT_ROLE: 'edit_role_management',
  DELETE_ROLE: 'delete_role_management',
  ASSIGN_PERMISSIONS: 'assign_role_management',

  // Permission Management
  VIEW_PERMISSIONS: 'view_permission_management',
  CREATE_PERMISSION: 'create_permission_management',
  EDIT_PERMISSION: 'edit_permission_management',
  DELETE_PERMISSION: 'delete_permission_management',

  // Department Management
  VIEW_DEPARTMENTS: 'view_department_management',
  CREATE_DEPARTMENT: 'create_department_management',
  EDIT_DEPARTMENT: 'edit_department_management',
  DELETE_DEPARTMENT: 'delete_department_management',

  // Company Management
  VIEW_COMPANIES: 'view_company_management',
  CREATE_COMPANY: 'create_company_management',
  EDIT_COMPANY: 'edit_company_management',
  DELETE_COMPANY: 'delete_company_management',

  // Designation Management
  VIEW_DESIGNATIONS: 'view_designation_management',
  CREATE_DESIGNATION: 'create_designation_management',
  EDIT_DESIGNATION: 'edit_designation_management',
  DELETE_DESIGNATION: 'delete_designation_management',

  // Branch Management
  VIEW_BRANCHES: 'view_branch_management',
  CREATE_BRANCH: 'create_branch_management',
  EDIT_BRANCH: 'edit_branch_management',
  DELETE_BRANCH: 'delete_branch_management',

  // Reports
  VIEW_REPORTS: 'view_reports',
  EXPORT_REPORTS: 'export_reports',
  GENERATE_REPORTS: 'generate_reports',

  // Settings
  VIEW_SETTINGS: 'view_settings',
  EDIT_SETTINGS: 'edit_settings',

  // Dashboard
  VIEW_DASHBOARD: 'view_dashboard'
} as const;

// Role constants
export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  HR_MANAGER: 'HR_MANAGER',
  DEPT_HEAD: 'DEPT_HEAD',
  EMPLOYEE: 'EMPLOYEE'
} as const;

// Permission groups for common use cases
export const PERMISSION_GROUPS = {
  USER_MANAGEMENT: [
    PERMISSIONS.VIEW_USERS,
    PERMISSIONS.CREATE_USER,
    PERMISSIONS.EDIT_USER,
    PERMISSIONS.DELETE_USER
  ],
  ROLE_MANAGEMENT: [
    PERMISSIONS.VIEW_ROLES,
    PERMISSIONS.CREATE_ROLE,
    PERMISSIONS.EDIT_ROLE,
    PERMISSIONS.DELETE_ROLE,
    PERMISSIONS.ASSIGN_PERMISSIONS
  ],
  PERMISSION_MANAGEMENT: [
    PERMISSIONS.VIEW_PERMISSIONS,
    PERMISSIONS.CREATE_PERMISSION,
    PERMISSIONS.EDIT_PERMISSION,
    PERMISSIONS.DELETE_PERMISSION
  ],
  DEPARTMENT_MANAGEMENT: [
    PERMISSIONS.VIEW_DEPARTMENTS,
    PERMISSIONS.CREATE_DEPARTMENT,
    PERMISSIONS.EDIT_DEPARTMENT,
    PERMISSIONS.DELETE_DEPARTMENT
  ],
  COMPANY_MANAGEMENT: [
    PERMISSIONS.VIEW_COMPANIES,
    PERMISSIONS.CREATE_COMPANY,
    PERMISSIONS.EDIT_COMPANY,
    PERMISSIONS.DELETE_COMPANY
  ],
  DESIGNATION_MANAGEMENT: [
    PERMISSIONS.VIEW_DESIGNATIONS,
    PERMISSIONS.CREATE_DESIGNATION,
    PERMISSIONS.EDIT_DESIGNATION,
    PERMISSIONS.DELETE_DESIGNATION
  ],
  BRANCH_MANAGEMENT: [
    PERMISSIONS.VIEW_BRANCHES,
    PERMISSIONS.CREATE_BRANCH,
    PERMISSIONS.EDIT_BRANCH,
    PERMISSIONS.DELETE_BRANCH
  ],
  REPORTS: [
    PERMISSIONS.VIEW_REPORTS,
    PERMISSIONS.EXPORT_REPORTS,
    PERMISSIONS.GENERATE_REPORTS
  ],
  SETTINGS: [
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.EDIT_SETTINGS
  ]
} as const;

// Utility functions
export const getModulePermissions = (module: keyof typeof PERMISSION_GROUPS): string[] => {
  return [...(PERMISSION_GROUPS[module] || [])];
};

export const getActionPermissions = (action: string): string[] => {
  return Object.values(PERMISSIONS).filter(permission => 
    permission.startsWith(action.toLowerCase())
  );
};

export const formatPermissionName = (permissionCode: string): string => {
  return permissionCode
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

export const getPermissionFromCode = (permissions: Permission[], code: string): Permission | undefined => {
  return permissions.find(permission => permission.permission_code === code);
};

export const groupPermissionsByModule = (permissions: Permission[]): Record<string, Permission[]> => {
  return permissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, Permission[]>);
};

export const validatePermissionCode = (code: string): boolean => {
  const pattern = /^[a-z]+_[a-z_]+$/;
  return pattern.test(code);
};

export const generatePermissionCode = (action: string, module: string): string => {
  const actionCode = action.toLowerCase();
  const moduleCode = module.toLowerCase().replace(/\s+/g, '_');
  return `${actionCode}_${moduleCode}`;
};
