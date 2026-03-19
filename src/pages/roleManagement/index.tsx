import React, { useState, useEffect } from 'react';
import { Role, Permission } from '../../types/role';
import RoleList from './list';
import RoleForm from './form';
import { RoleView } from './view';
import PermissionAssign from './permissionAssign';
import DeletePopup from "../../components/deletePopup";
import PageHeader from '../../components/PageHeader';
import { Plus } from 'lucide-react';
import { useToast } from '../../context/ToastContext';


const RoleManagement: React.FC = () => {
  const { addToast } = useToast();
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'form' | 'view' | 'permissions'>('list');
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const mockRoles: Role[] = [
      {
        role_id: 1,
        role_name: 'Super Admin',
        role_code: 'SUPER_ADMIN',
        description: 'Full system access with all permissions',
        status: 'Active',
        permissions: [],
        created_at: '2024-01-15T10:30:00Z',
        updated_at: '2024-01-15T10:30:00Z'
      },
      {
        role_id: 2,
        role_name: 'HR Manager',
        role_code: 'HR_MANAGER',
        description: 'Manages employees, departments, and related functions',
        status: 'Active',
        permissions: [],
        created_at: '2024-01-16T14:20:00Z',
        updated_at: '2024-01-16T14:20:00Z'
      },
      {
        role_id: 3,
        role_name: 'Department Head',
        role_code: 'DEPT_HEAD',
        description: 'Manages department employees and operations',
        status: 'Active',
        permissions: [],
        created_at: '2024-01-17T09:15:00Z',
        updated_at: '2024-01-17T09:15:00Z'
      }
    ];

    const mockPermissions: Permission[] = [
      { permission_id: 1, permission_name: 'View Users', permission_code: 'view_users', module: 'User Management', action: 'view', description: 'View user list and details', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 2, permission_name: 'Create User', permission_code: 'create_user', module: 'User Management', action: 'create', description: 'Create new users', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 3, permission_name: 'Edit User', permission_code: 'edit_user', module: 'User Management', action: 'edit', description: 'Edit user information', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 4, permission_name: 'Delete User', permission_code: 'delete_user', module: 'User Management', action: 'delete', description: 'Delete users', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      
      { permission_id: 5, permission_name: 'View Roles', permission_code: 'view_roles', module: 'Role Management', action: 'view', description: 'View role list and details', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 6, permission_name: 'Create Role', permission_code: 'create_role', module: 'Role Management', action: 'create', description: 'Create new roles', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 7, permission_name: 'Edit Role', permission_code: 'edit_role', module: 'Role Management', action: 'edit', description: 'Edit role information', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 8, permission_name: 'Delete Role', permission_code: 'delete_role', module: 'Role Management', action: 'delete', description: 'Delete roles', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 9, permission_name: 'Assign Permissions', permission_code: 'assign_permissions', module: 'Role Management', action: 'edit', description: 'Assign permissions to roles', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      
      { permission_id: 10, permission_name: 'View Departments', permission_code: 'view_departments', module: 'Department Management', action: 'view', description: 'View department list and details', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 11, permission_name: 'Create Department', permission_code: 'create_department', module: 'Department Management', action: 'create', description: 'Create new departments', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 12, permission_name: 'Edit Department', permission_code: 'edit_department', module: 'Department Management', action: 'edit', description: 'Edit department information', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 13, permission_name: 'Delete Department', permission_code: 'delete_department', module: 'Department Management', action: 'delete', description: 'Delete departments', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      
      { permission_id: 14, permission_name: 'View Permissions', permission_code: 'view_permissions', module: 'Permission Management', action: 'view', description: 'View permission list and details', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 15, permission_name: 'Create Permission', permission_code: 'create_permission', module: 'Permission Management', action: 'create', description: 'Create new permissions', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 16, permission_name: 'Edit Permission', permission_code: 'edit_permission', module: 'Permission Management', action: 'edit', description: 'Edit permission information', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
      { permission_id: 17, permission_name: 'Delete Permission', permission_code: 'delete_permission', module: 'Permission Management', action: 'delete', description: 'Delete permissions', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' }
    ];

    setRoles(mockRoles);
    setPermissions(mockPermissions);
  }, []);

  const handleAddRole = () => {
    setCurrentView('form');
    setSelectedRole(null);
    setIsEdit(false);
  };

  const handleViewRole = (role: Role) => {
    setSelectedRole(role);
    setCurrentView('view');
  };

  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setIsEdit(true);
    setCurrentView('form');
  };

  const handleDeleteRole = (role: Role) => {
    setRoleToDelete(role.role_id);
    setIsDeletePopupOpen(true);
  };

  const confirmDeleteRole = () => {
    if (roleToDelete !== null) {
      const updatedRoles = roles.filter(role => role.role_id !== roleToDelete);
      setRoles(updatedRoles);
      setRoleToDelete(null);
      setIsDeletePopupOpen(false);
    }
  };

  const cancelDelete = () => {
    setRoleToDelete(null);
    setIsDeletePopupOpen(false);
  };

  const handleManagePermissions = (role: Role) => {
    setSelectedRole(role);
    setCurrentView('permissions');
  };

  const handleFormSubmit = (roleData: Omit<Role, 'role_id' | 'created_at' | 'updated_at' | 'permissions'>) => {
    if (isEdit && selectedRole) {
      const updatedRoles = roles.map(role =>
        role.role_id === selectedRole.role_id
          ? { ...role, ...roleData, updated_at: new Date().toISOString() }
          : role
      );
      setRoles(updatedRoles);
    } else {
      const newRole: Role = {
        ...roleData,
        role_id: Math.max(...roles.map(r => r.role_id), 0) + 1,
        permissions: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      const updatedRoles = [...roles, newRole];
      setRoles(updatedRoles);
    }
    setCurrentView('list');
  };

  const handleFormClose = () => {
    setCurrentView('list');
    setSelectedRole(null);
    setIsEdit(false);
  };

  const handleViewClose = () => {
    setCurrentView('list');
    setSelectedRole(null);
  };

  const handlePermissionsClose = () => {
    setCurrentView('list');
    setSelectedRole(null);
  };

  const handleAssignPermissions = (roleId: number, permissionIds: number[]) => {
    const updatedRoles = roles.map(role => {
      if (role.role_id === roleId) {
        const assignedPermissions = permissions.filter(p => permissionIds.includes(p.permission_id));
        return {
          ...role,
          permissions: assignedPermissions,
          updated_at: new Date().toISOString()
        };
      }
      return role;
    });
    
    setRoles(updatedRoles);
  };

  return (
     <div className="space-y-6 max-w-7xl mx-auto pb-10 transition-colors duration-200">
      <PageHeader
        title="Role Management"
        description="Manage system roles and their permissions"
        searchPlaceholder="Search roles by name, code, or description..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        // showFilter={true}
        onFilterClick={() => addToast('Filter functionality coming soon!', 'info')}
        showStatusSelector={true}
        statusValue={statusFilter}
        onStatusChange={setStatusFilter}
        statusOptions={[
          { label: 'All Status', value: 'all' },
          { label: 'Active', value: 'Active' },
          { label: 'Inactive', value: 'Inactive' }
        ]}
        buttons={[
          {
            label: 'Add New Role',
            onClick: handleAddRole,
            variant: 'primary',
            icon: <Plus className="w-4 h-4" />,
          },
        ]}
      />

      {currentView === 'list' && (
        <RoleList
          roles={roles}
          onEdit={handleEditRole}
          onView={handleViewRole}
          onDelete={handleDeleteRole}
          onManagePermissions={handleManagePermissions}
          searchValue={searchValue}
          statusFilter={statusFilter}
        />
      )}

      {currentView === 'form' && (
        <RoleForm
          isOpen={true}
          onClose={handleFormClose}
          onCreateRole={handleFormSubmit}
          initialData={selectedRole || undefined}
          isEdit={isEdit}
        />
      )}

      {currentView === 'view' && selectedRole && (
        <RoleView
          role={selectedRole}
          onClose={handleViewClose}
          isOpen={true}
          onEdit={handleEditRole}
          onManagePermissions={handleManagePermissions}
        />
      )}

      {currentView === 'permissions' && selectedRole && (
        <PermissionAssign
          isOpen={true}
          onClose={handlePermissionsClose}
          role={selectedRole}
          availablePermissions={permissions}
          onAssignPermissions={handleAssignPermissions}
        />
      )}

      <DeletePopup
        isOpen={isDeletePopupOpen}
        onClose={cancelDelete}
        onConfirm={confirmDeleteRole}
        title="Delete Role"
        description="Are you sure you want to delete this role? This action cannot be undone."
      />
    </div>
  );
};

export default RoleManagement;
