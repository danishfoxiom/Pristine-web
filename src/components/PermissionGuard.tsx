import React from 'react';
import { usePermissions } from '../hooks/usePermissions';

interface PermissionGuardProps {
  permissionCode?: string;
  permissionCodes?: string[];
  requireAll?: boolean;
  roleCode?: string;
  roleCodes?: string[];
  requireAllRoles?: boolean;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

const PermissionGuard: React.FC<PermissionGuardProps> = ({
  permissionCode,
  permissionCodes,
  requireAll = false,
  roleCode,
  roleCodes,
  requireAllRoles = false,
  fallback = null,
  children
}) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions, hasRole, hasAnyRole, isLoading } = usePermissions();

  if (isLoading) {
    return null; // or loading spinner
  }

  let hasAccess = false;

  // Check permissions
  if (permissionCode) {
    hasAccess = hasPermission(permissionCode);
  } else if (permissionCodes) {
    hasAccess = requireAll 
      ? hasAllPermissions(permissionCodes)
      : hasAnyPermission(permissionCodes);
  }

  // Check roles if no permissions specified
  if (!permissionCode && !permissionCodes) {
    if (roleCode) {
      hasAccess = hasRole(roleCode);
    } else if (roleCodes) {
      hasAccess = requireAllRoles 
        ? roleCodes.every(code => hasRole(code))
        : hasAnyRole(roleCodes);
    }
  }

  // If both permissions and roles are specified, require both
  if ((permissionCode || permissionCodes) && (roleCode || roleCodes)) {
    const hasPermissionAccess = permissionCode 
      ? hasPermission(permissionCode)
      : requireAll 
        ? hasAllPermissions(permissionCodes!)
        : hasAnyPermission(permissionCodes!);

    const hasRoleAccess = roleCode
      ? hasRole(roleCode)
      : requireAllRoles
        ? roleCodes!.every(code => hasRole(code))
        : hasAnyRole(roleCodes!);

    hasAccess = hasPermissionAccess && hasRoleAccess;
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};

export default PermissionGuard;
