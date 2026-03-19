import React from 'react';
import { Permission } from '../../types/role';
import { Shield, Key, Folder, Calendar, CheckCircle, XCircle, FileText } from 'lucide-react';

interface PermissionViewProps {
  permission: Permission;
  onClose: () => void;
  isOpen: boolean;
  onEdit: (permission: Permission) => void;
}

const PermissionView: React.FC<PermissionViewProps> = ({ 
  permission, 
  onClose, 
  isOpen, 
}) => {
  if (!isOpen) return null;

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

  const getStatusIcon = (status: string) => {
    return status === 'Active' ? (
      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
    ) : (
      <XCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
    );
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Permission Details
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            ✕
          </button>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-xl object-cover border-2 border-slate-200 dark:border-slate-700 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{permission.permission_name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Permission Code: {permission.permission_code}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(permission.status)}
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(permission.status)}`}>
                    {permission.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Permission Information
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg">
                  <Folder className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Module</p>
                  <p className="text-sm text-slate-900 dark:text-slate-100">{permission.module}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg">
                  <Key className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Action</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getActionColor(permission.action)}`}>
                    {permission.action.charAt(0).toUpperCase() + permission.action.slice(1)}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Description</p>
                  <p className="text-sm text-slate-900 dark:text-slate-100">{permission.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              System Details
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg">
                  <Shield className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Permission ID</p>
                  <p className="text-sm text-slate-900 dark:text-slate-100">#{permission.permission_id}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg">
                  <Calendar className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Created Date</p>
                  <p className="text-sm text-slate-900 dark:text-slate-100">{new Date(permission.created_at).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Status</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(permission.status)}`}>
                    {permission.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionView;
