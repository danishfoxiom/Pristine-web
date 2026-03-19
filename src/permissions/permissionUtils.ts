import { Permission } from './permissions';
import { Role, ROLE_PERMISSIONS } from './roles';

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  permissions: Permission[];
}

export class PermissionUtils {
  /**
   * Check if a user has a specific permission
   */
  static hasPermission(user: User | null, permission: Permission): boolean {
    if (!user) return false;
    return user.permissions.includes(permission);
  }

  /**
   * Check if a user has any of the specified permissions
   */
  static hasAnyPermission(user: User | null, permissions: Permission[]): boolean {
    if (!user) return false;
    return permissions.some(permission => user.permissions.includes(permission));
  }

  /**
   * Check if a user has all of the specified permissions
   */
  static hasAllPermissions(user: User | null, permissions: Permission[]): boolean {
    if (!user) return false;
    return permissions.every(permission => user.permissions.includes(permission));
  }

  /**
   * Check if a user has a specific role
   */
  static hasRole(user: User | null, role: Role): boolean {
    if (!user) return false;
    return user.role === role;
  }

  /**
   * Check if a user has any of the specified roles
   */
  static hasAnyRole(user: User | null, roles: Role[]): boolean {
    if (!user) return false;
    return roles.includes(user.role);
  }

  /**
   * Get permissions for a role
   */
  static getPermissionsForRole(role: Role): Permission[] {
    return ROLE_PERMISSIONS[role] || [];
  }

  /**
   * Create a user with role-based permissions
   */
  static createUserWithRole(
    id: string,
    username: string,
    email: string,
    role: Role
  ): User {
    return {
      id,
      username,
      email,
      role,
      permissions: this.getPermissionsForRole(role)
    };
  }

  /**
   * Check if user can access a route based on required permissions
   */
  static canAccessRoute(user: User | null, requiredPermissions: Permission[]): boolean {
    return this.hasAnyPermission(user, requiredPermissions);
  }

  /**
   * Get user's role hierarchy level (higher number = higher privilege)
   */
  static getRoleHierarchy(role: Role): number {
    const hierarchy = {
      [Role.VIEWER]: 1,
      [Role.USER]: 2,
      [Role.MANAGER]: 3,
      [Role.ADMIN]: 4
    };
    return hierarchy[role] || 0;
  }

  /**
   * Check if user's role is at least as high as the required role
   */
  static hasMinimumRole(user: User | null, minimumRole: Role): boolean {
    if (!user) return false;
    return this.getRoleHierarchy(user.role) >= this.getRoleHierarchy(minimumRole);
  }
}