import { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { Permission } from '../permissions/permissions';
import { PermissionUtils } from '../permissions/permissionUtils';

interface PermissionWrapperProps {
  children: ReactNode;
  permissions?: Permission[];
  roles?: string[];
  requireAll?: boolean;
  fallback?: ReactNode;
}

export default function PermissionWrapper({
  children,
  permissions = [],
  roles = [],
  requireAll = false,
  fallback = null
}: PermissionWrapperProps) {
  const { user } = useAuth();

  if (!user) {
    return <>{fallback}</>;
  }

  let hasAccess = false;

  if (permissions.length > 0) {
    if (requireAll) {
      hasAccess = PermissionUtils.hasAllPermissions(user, permissions);
    } else {
      hasAccess = PermissionUtils.hasAnyPermission(user, permissions);
    }
  } else if (roles.length > 0) {
    hasAccess = roles.includes(user.role);
  } else {
    hasAccess = true;
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}
