import React, { useState } from 'react';
import { Role } from '../../types/role';
import DeletePopup from "../../components/deletePopup";
import { SafetyCertificateOutlined } from '@ant-design/icons';
import { Edit, Eye, Trash2 } from 'lucide-react';

interface RoleListProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onView: (role: Role) => void;
  onDelete: (role: Role) => void;
  onManagePermissions: (role: Role) => void;
  searchValue?: string;
  statusFilter?: string;
}

const RoleList: React.FC<RoleListProps> = ({
  roles,
  onEdit,
  onView,
  onDelete,
  onManagePermissions,
  searchValue = '',
  statusFilter = 'all'
}) => {
  const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.role_name.toLowerCase().includes(searchValue.toLowerCase()) ||
      role.role_code.toLowerCase().includes(searchValue.toLowerCase()) ||
      role.description.toLowerCase().includes(searchValue.toLowerCase());
    const matchesStatus = statusFilter === 'all' || role.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteRoleClick = (role: Role) => {
    setRoleToDelete(role);
    setDeletePopupOpen(true);
  };

  const confirmDeleteRole = () => {
    if (roleToDelete) {
      onDelete(roleToDelete);
      setRoleToDelete(null);
      setDeletePopupOpen(false);
    }
  };

  const cancelDeleteRole = () => {
    setRoleToDelete(null);
    setDeletePopupOpen(false);
  };

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-[20px] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full px-4">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b-2 border-slate-300 dark:border-slate-600">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Role Name</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Role Code</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Description</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Permissions</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredRoles.map((role) => (
                <tr key={role.role_id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {/* <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm shrink-0 border border-purple-200 dark:border-purple-500/30">
                        <Shield className="w-5 h-5" />
                      </div> */}
                      <div className="text-sm text-slate-900 dark:text-slate-100">{role.role_name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      {role.role_code}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600 dark:text-slate-400 max-w-xs truncate">
                      {role.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {role.permissions.length} permissions
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full min-w-[80px] ${role.status === 'Active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : role.status === 'Inactive'
                        ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                      {role.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onView(role)}
                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        title="View Role"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onEdit(role)}
                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        title="Edit Role"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onManagePermissions(role)}
                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        title="Manage Permissions"
                      >
                        <SafetyCertificateOutlined className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteRoleClick(role)}
                        className="p-2 text-slate-400 hover:text-red-700 hover:bg-red-100 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete Role"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredRoles.length === 0 && (
            <div className="text-center py-8">
              <p className="text-slate-500 dark:text-slate-400">
                {searchValue || statusFilter !== 'all'
                  ? 'No roles found matching your filters.'
                  : 'No roles available.'}
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-800/30">
          <div>
            Showing 1 to {filteredRoles.length} of {roles.length} results
          </div>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled>
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-md font-medium">
              1
            </button>
            <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

      <DeletePopup
        isOpen={deletePopupOpen}
        onClose={cancelDeleteRole}
        onConfirm={confirmDeleteRole}
        title="Delete Role"
        description={`Are you sure you want to delete the role "${roleToDelete?.role_name}"? This action cannot be undone.`}
      />
    </>
  );
};

export default RoleList;
