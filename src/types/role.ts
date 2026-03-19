export interface Permission {
  permission_id: number;
  permission_name: string;
  permission_code: string;
  module: string;
  action: 'view' | 'create' | 'edit' | 'delete' | 'export' | 'import' | string; // Allow string for multiple actions
  description: string;
  status: 'Active' | 'Inactive';
  created_at: string;
  updated_at: string;
}

export interface Role {
  role_id: number;
  role_name: string;
  role_code: string;
  description: string;
  status: 'Active' | 'Inactive';
  permissions: Permission[];
  created_at: string;
  updated_at: string;
}

export interface RolePermission {
  role_id: number;
  permission_id: number;
  assigned_at: string;
  assigned_by: number;
}

export interface User {
  user_id: number;
  username: string;
  email: string;
  roles: Role[];
  permissions: Permission[];
}
