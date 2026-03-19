import { PermissionUtils } from '../permissions/permissionUtils';
import { Permission } from '../permissions/permissions';
import { Role } from '../permissions/roles';
import { useAuth } from '../context/AuthContext';
import PermissionWrapper from '../components/PermissionWrapper';

// Example 1: Using PermissionUtils directly
export function ExampleComponent() {
  const { user } = useAuth();

  const canEditUsers = PermissionUtils.hasPermission(user, Permission.EDIT_USERS);
  const canManageRoles = PermissionUtils.hasAnyPermission(user, [Permission.VIEW_ROLES, Permission.EDIT_ROLES]);
  const isAdmin = PermissionUtils.hasRole(user, Role.ADMIN);
  const isAdminOrManager = PermissionUtils.hasMinimumRole(user, Role.MANAGER);

  return (
    <div>
      {canEditUsers && <button>Edit Users</button>}
      {canManageRoles && <button>Manage Roles</button>}
      {isAdmin && <button>Admin Panel</button>}
      {isAdminOrManager && <button>Management Panel</button>}
    </div>
  );
}

// Example 2: Using PermissionWrapper component
export function ExampleWithWrapper() {
  return (
    <div>
      {/* Show admin panel only to admins */}
      <PermissionWrapper roles={[Role.ADMIN]}>
        <AdminPanel />
      </PermissionWrapper>

      {/* Show user management to admins and managers */}
      <PermissionWrapper roles={[Role.ADMIN, Role.MANAGER]}>
        <UserManagement />
      </PermissionWrapper>

      {/* Show edit button only to users with edit permission */}
      <PermissionWrapper permissions={[Permission.EDIT_USERS]}>
        <EditButton />
      </PermissionWrapper>

      {/* Show advanced features only if user has ALL required permissions */}
      <PermissionWrapper 
        permissions={[Permission.EDIT_USERS, Permission.DELETE_USERS]}
        requireAll={true}
      >
        <AdvancedUserManagement />
      </PermissionWrapper>

      {/* Show fallback if no access */}
      <PermissionWrapper 
        permissions={[Permission.SYSTEM_ADMIN]}
        fallback={<div>Access Denied</div>}
      >
        <SystemSettings />
      </PermissionWrapper>
    </div>
  );
}

// Example 3: Creating users with different roles
export function createSampleUsers() {
  const admin = PermissionUtils.createUserWithRole('1', 'admin', 'admin@example.com', Role.ADMIN);
  const manager = PermissionUtils.createUserWithRole('2', 'manager', 'manager@example.com', Role.MANAGER);
  const user = PermissionUtils.createUserWithRole('3', 'user', 'user@example.com', Role.USER);
  const viewer = PermissionUtils.createUserWithRole('4', 'viewer', 'viewer@example.com', Role.VIEWER);

  return { admin, manager, user, viewer };
}

// Example 4: Checking route access
export function checkRouteAccess() {
  const { user } = useAuth();
  
  const canAccessDashboard = PermissionUtils.canAccessRoute(user, [Permission.VIEW_DASHBOARD]);
  const canAccessUserManagement = PermissionUtils.canAccessRoute(user, [Permission.VIEW_USERS]);
  const canAccessSystemSettings = PermissionUtils.canAccessRoute(user, [Permission.SYSTEM_ADMIN]);

  return {
    canAccessDashboard,
    canAccessUserManagement,
    canAccessSystemSettings
  };
}

// Example components
function AdminPanel() {
  return <div>Admin Panel - Only for Admins</div>;
}

function UserManagement() {
  return <div>User Management - Admins and Managers</div>;
}

function EditButton() {
  return <button>Edit User</button>;
}

function AdvancedUserManagement() {
  return <div>Advanced User Management - Requires Edit and Delete permissions</div>;
}

function SystemSettings() {
  return <div>System Settings - System Admin only</div>;
}
