export enum Permission {
  // User Management
  VIEW_USERS = 'view_users',
  CREATE_USERS = 'create_users',
  EDIT_USERS = 'edit_users',
  DELETE_USERS = 'delete_users',
  
  // Role Management
  VIEW_ROLES = 'view_roles',
  CREATE_ROLES = 'create_roles',
  EDIT_ROLES = 'edit_roles',
  DELETE_ROLES = 'delete_roles',
  
  // Permission Management
  VIEW_PERMISSIONS = 'view_permissions',
  CREATE_PERMISSIONS = 'create_permissions',
  EDIT_PERMISSIONS = 'edit_permissions',
  DELETE_PERMISSIONS = 'delete_permissions',
  
  // Dashboard
  VIEW_DASHBOARD = 'view_dashboard',
  EDIT_DASHBOARD = 'edit_dashboard',
  
  // Reports
  VIEW_REPORTS = 'view_reports',
  EXPORT_REPORTS = 'export_reports',
  
  // Settings
  VIEW_SETTINGS = 'view_settings',
  EDIT_SETTINGS = 'edit_settings',
  
  // System
  SYSTEM_ADMIN = 'system_admin'
}

export type PermissionType = Permission;