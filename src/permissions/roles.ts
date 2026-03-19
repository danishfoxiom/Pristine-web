import { Permission } from './permissions';

export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
  VIEWER = 'viewer'
}

export interface RolePermissions {
  [Role.SUPER_ADMIN]: Permission[];
  [Role.ADMIN]: Permission[];
  [Role.MANAGER]: Permission[];
  [Role.USER]: Permission[];
  [Role.VIEWER]: Permission[];
}

export const ROLE_PERMISSIONS: RolePermissions = {
  [Role.SUPER_ADMIN]: [
    // Super Admin has all permissions including permission management
    Permission.VIEW_USERS,
    Permission.CREATE_USERS,
    Permission.EDIT_USERS,
    Permission.DELETE_USERS,
    Permission.VIEW_ROLES,
    Permission.CREATE_ROLES,
    Permission.EDIT_ROLES,
    Permission.DELETE_ROLES,
    Permission.VIEW_PERMISSIONS,
    Permission.CREATE_PERMISSIONS,
    Permission.EDIT_PERMISSIONS,
    Permission.DELETE_PERMISSIONS,
    Permission.VIEW_DASHBOARD,
    Permission.EDIT_DASHBOARD,
    Permission.VIEW_REPORTS,
    Permission.EXPORT_REPORTS,
    Permission.VIEW_SETTINGS,
    Permission.EDIT_SETTINGS,
    Permission.SYSTEM_ADMIN
  ],
  
  [Role.ADMIN]: [
    // Admin has all permissions except permission management
    Permission.VIEW_USERS,
    Permission.CREATE_USERS,
    Permission.EDIT_USERS,
    Permission.DELETE_USERS,
    Permission.VIEW_ROLES,
    Permission.CREATE_ROLES,
    Permission.EDIT_ROLES,
    Permission.DELETE_ROLES,
    Permission.VIEW_DASHBOARD,
    Permission.EDIT_DASHBOARD,
    Permission.VIEW_REPORTS,
    Permission.EXPORT_REPORTS,
    Permission.VIEW_SETTINGS,
    Permission.EDIT_SETTINGS,
    Permission.SYSTEM_ADMIN
  ],
  
  [Role.MANAGER]: [
    // Manager permissions
    Permission.VIEW_USERS,
    Permission.EDIT_USERS,
    Permission.VIEW_ROLES,
    Permission.VIEW_DASHBOARD,
    Permission.EDIT_DASHBOARD,
    Permission.VIEW_REPORTS,
    Permission.EXPORT_REPORTS,
    Permission.VIEW_SETTINGS
  ],
  
  [Role.USER]: [
    // Regular user permissions
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_REPORTS
  ],
  
  [Role.VIEWER]: [
    // Read-only permissions
    Permission.VIEW_DASHBOARD,
    Permission.VIEW_REPORTS
  ]
};

export type RoleType = Role;