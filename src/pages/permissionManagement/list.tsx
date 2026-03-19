import React, { useState } from 'react';
import { Permission } from '../../types/role';
import { Edit, Eye, Trash2 } from 'lucide-react';
import TruncatedText from '../../components/TruncatedText';

interface PermissionListProps {
  permissions: Permission[];
  onEdit: (permission: Permission) => void;
  onView: (permission: Permission) => void;
  onDelete: (permission: Permission) => void;
  searchValue?: string;
}

const PermissionList: React.FC<PermissionListProps> = ({
  permissions,
  onEdit,
  onView,
  onDelete,
  searchValue = ''
}) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');

  const modules = Array.from(new Set(permissions.map(p => p.module)));
  const actions = Array.from(new Set(permissions.map(p => p.action)));

  const filteredPermissions = permissions.filter(permission => {
    const matchesSearch = permission.permission_name.toLowerCase().includes(searchValue.toLowerCase()) ||
      permission.permission_code.toLowerCase().includes(searchValue.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchValue.toLowerCase());
    const matchesStatus = statusFilter === 'all' || permission.status === statusFilter;
    const matchesModule = moduleFilter === 'all' || permission.module === moduleFilter;
    const matchesAction = actionFilter === 'all' || permission.action === actionFilter;
    return matchesSearch && matchesStatus && matchesModule && matchesAction;
  });

  const handleDelete = (permission: Permission) => {
    onDelete(permission);
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'view': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'create': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'edit': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'delete': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'export': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'import': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-[20px] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">

      <div className="overflow-x-auto w-full px-4">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800/50 border-b-2 border-slate-300 dark:border-slate-600">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">
                Permission Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">
                Code
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">
                Module
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">
                Action
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {filteredPermissions.map((permission) => (
              <tr key={permission.permission_id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      <TruncatedText text={permission.permission_name} maxWords={5} className="block" />
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 max-w-xs">
                      <TruncatedText text={permission.description} maxWords={20} />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900 dark:text-slate-100 font-mono">
                    {permission.permission_code}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-slate-900 dark:text-slate-100">
                    {permission.module}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex justify-center items-center w-16 px-2 py-1 text-xs font-medium rounded-full ${getActionColor(permission.action)}`}>
                    {permission.action.charAt(0).toUpperCase() + permission.action.slice(1)}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full min-w-[80px] ${permission.status === 'Active'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : permission.status === 'Inactive'
                      ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                    {permission.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(permission)}
                      className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      title="View Permission"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onEdit(permission)}
                      className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      title="Edit Permission"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(permission)}
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

        {filteredPermissions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-slate-500 dark:text-slate-400">
              {searchValue || statusFilter !== 'all' || moduleFilter !== 'all' || actionFilter !== 'all'
                ? 'No permissions found matching your filters.'
                : 'No permissions available.'}
            </p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-800/30">
        <div>
          Showing 1 to {filteredPermissions.length} of {permissions.length} results
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
  );
};

export default PermissionList;
