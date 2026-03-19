import React, { useState, useEffect } from 'react';
import { Permission } from '../../types/role';
import { PermissionForm } from './form';
import PermissionView from './view';
import DeletePopup from "../../components/deletePopup";
import PageHeader from '../../components/PageHeader';
import { Edit, Eye, Plus, Trash2 } from "lucide-react";


const PermissionManagement: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'form' | 'view'>('list');
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [permissionToDelete, setPermissionToDelete] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState('');

    const handleDeletePermission = (permissionId: number) => {
    setPermissionToDelete(permissionId);
    setIsDeletePopupOpen(true);
  };

  const confirmDelete = () => {
    if (permissionToDelete !== null) {
      const updatedPermissions = permissions.filter(permission => permission.permission_id !== permissionToDelete);
      setPermissions(updatedPermissions);
      localStorage.setItem('permissions', JSON.stringify(updatedPermissions));
      setPermissionToDelete(null);
      setIsDeletePopupOpen(false);
    }
  };

  const cancelDelete = () => {
    setPermissionToDelete(null);
    setIsDeletePopupOpen(false);
  };
  useEffect(() => {
    const storedPermissions = localStorage.getItem('permissions');
    if (storedPermissions) {
      setPermissions(JSON.parse(storedPermissions));
    } else {
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
        { permission_id: 13, permission_name: 'Delete Permission', permission_code: 'delete_permission_management', module: 'Permission Management', action: 'delete', description: 'Delete permissions', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
        { permission_id: 14, permission_name: 'View Departments', permission_code: 'view_department_management', module: 'Department Management', action: 'view', description: 'View department list and details', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
        { permission_id: 15, permission_name: 'Create Department', permission_code: 'create_department_management', module: 'Department Management', action: 'create', description: 'Create new departments', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
        { permission_id: 16, permission_name: 'Edit Department', permission_code: 'edit_department_management', module: 'Department Management', action: 'edit', description: 'Edit department information', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' },
        { permission_id: 17, permission_name: 'Delete Department', permission_code: 'delete_department_management', module: 'Department Management', action: 'delete', description: 'Delete departments', status: 'Active', created_at: '2024-01-01T00:00:00Z', updated_at: '2024-01-01T00:00:00Z' }
      ];
      setPermissions(mockPermissions);
      localStorage.setItem('permissions', JSON.stringify(mockPermissions));
    }
  }, []);

  const handleAddPermission = () => {
    setCurrentView('form');
    setSelectedPermission(null);
    setIsEdit(false);
  };

  const handleViewPermission = (permission: Permission) => {
    setSelectedPermission(permission);
    setCurrentView('view');
  };

  const handleEditPermission = (permission: Permission) => {
    setSelectedPermission(permission);
    setIsEdit(true);
    setCurrentView('form');
  };

  const handleFormSubmit = (permissionData: Omit<Permission, 'permission_id' | 'created_at' | 'updated_at'>) => {
    if (isEdit && selectedPermission) {
      const updatedPermissions = permissions.map(permission =>
        permission.permission_id === selectedPermission.permission_id
          ? { ...permission, ...permissionData, updated_at: new Date().toISOString() }
          : permission
      );
      setPermissions(updatedPermissions);
      localStorage.setItem('permissions', JSON.stringify(updatedPermissions));
    } else {
      const newPermission: Permission = {
        ...permissionData,
        permission_id: Math.max(...permissions.map(p => p.permission_id), 0) + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      const updatedPermissions = [...permissions, newPermission];
      setPermissions(updatedPermissions);
      localStorage.setItem('permissions', JSON.stringify(updatedPermissions));
    }
    setCurrentView('list');
  };

  const handleFormClose = () => {
    setCurrentView('list');
    setSelectedPermission(null);
    setIsEdit(false);
  };

  const handleViewClose = () => {
    setCurrentView('list');
    setSelectedPermission(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-500/20';
      case 'Inactive':
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-500/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-500/20';
    }
  };

  const filteredPermissions = permissions.filter(permission =>
    permission.permission_name.toLowerCase().includes(searchValue.toLowerCase()) ||
    permission.permission_code.toLowerCase().includes(searchValue.toLowerCase()) ||
    permission.module.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 transition-colors duration-200">
      {currentView === 'list' && (
        <>
          <PageHeader
            title="Permission Management"
            description="Manage system permissions and access controls"
            searchPlaceholder="Search permissions by name, code, or description..."
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            buttons={[
              {
                label: 'Add Permission',
                onClick: handleAddPermission,
                variant: 'primary',
                icon: <Plus className="w-4 h-4" />,
              },
            ]}
          />
          <div className="bg-white dark:bg-slate-800 rounded-[20px] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto w-full">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b-2 border-slate-300 dark:border-slate-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Permission Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Permission Code</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Module</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Action</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Description</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredPermissions.map((permission) => (
                    <tr key={permission.permission_id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{permission.permission_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{permission.permission_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{permission.permission_code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{permission.module}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{permission.action}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100 max-w-xs truncate" title={permission.description}>{permission.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full min-w-[80px] ${getStatusColor(permission.status)}`}>
                          {permission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewPermission(permission)}
                            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="View Permission"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditPermission(permission)}
                            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="Edit Permission"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePermission(permission.permission_id)}
                            className="p-2 text-slate-400 hover:text-red-700 hover:bg-red-100 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete Permission"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-800/30">
              <div>
                Showing 1 to {filteredPermissions.length} of {filteredPermissions.length} results
              </div>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md font-medium">
                  1
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {currentView === 'form' && (
        <PermissionForm
          isOpen={true}
          onClose={handleFormClose}
          onCreatePermission={handleFormSubmit}
          onUpdatePermission={isEdit ? (permissionId, data) => handleFormSubmit(data) : undefined}
          initialData={selectedPermission || undefined}
          isEdit={isEdit}
        />
      )}

      {currentView === 'view' && selectedPermission && (
        <PermissionView
          permission={selectedPermission}
          onClose={handleViewClose}
          isOpen={true}
          onEdit={handleEditPermission}
        />
      )}

      <DeletePopup
        isOpen={isDeletePopupOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Delete Permission"
        description="Are you sure you want to delete this permission? This action cannot be undone."
      />
    </div>
  );
};

export default PermissionManagement;
