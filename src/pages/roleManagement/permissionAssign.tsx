import React, { useState, useEffect } from 'react';
import { Role, Permission } from '../../types/role';

interface PermissionAssignProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role | null;
  availablePermissions: Permission[];
  onAssignPermissions: (roleId: number, permissionIds: number[]) => void;
}

const PermissionAssign: React.FC<PermissionAssignProps> = ({ 
  isOpen, 
  onClose, 
  role, 
  availablePermissions, 
  onAssignPermissions 
}) => {
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState('all');

  useEffect(() => {
    if (role) {
      setSelectedPermissions(role.permissions.map(p => p.permission_id));
    }
  }, [role]);

  if (!isOpen || !role) return null;

  const modules = Array.from(new Set(availablePermissions.map(p => p.module)));
  
  const filteredPermissions = availablePermissions.filter(permission => {
    const matchesSearch = permission.permission_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permission.permission_code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = selectedModule === 'all' || permission.module === selectedModule;
    return matchesSearch && matchesModule;
  });

  const groupedPermissions = filteredPermissions.reduce((acc, permission) => {
    if (!acc[permission.module]) {
      acc[permission.module] = [];
    }
    acc[permission.module].push(permission);
    return acc;
  }, {} as Record<string, typeof filteredPermissions>);

  const handlePermissionToggle = (permissionId: number) => {
    setSelectedPermissions(prev => 
      prev.includes(permissionId) 
        ? prev.filter(id => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const handleModuleToggle = (module: string) => {
    const modulePermissions = groupedPermissions[module].map(p => p.permission_id);
    const allSelected = modulePermissions.every(id => selectedPermissions.includes(id));
    
    if (allSelected) {
      setSelectedPermissions(prev => prev.filter(id => !modulePermissions.includes(id)));
    } else {
      setSelectedPermissions(prev => [...new Set([...prev, ...modulePermissions])]);
    }
  };

  const handleSubmit = () => {
    onAssignPermissions(role.role_id, selectedPermissions);
    onClose();
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
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Manage Permissions
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Role: <span className="font-medium">{role.role_name}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            ✕
          </button>
        </div>
        
        <div className="mb-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                placeholder="Search permissions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
            <div>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              >
                <option value="all">All Modules</option>
                {modules.map(module => (
                  <option key={module} value={module}>{module}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">
              {selectedPermissions.length} of {availablePermissions.length} permissions selected
            </span>
            <div className="gap-2">
              <button
                onClick={() => setSelectedPermissions([])}
                className="px-3 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Clear All
              </button>
              <button
                onClick={() => setSelectedPermissions(availablePermissions.map(p => p.permission_id))}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Select All
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          {Object.entries(groupedPermissions).map(([module, permissions]) => {
            const modulePermissionIds = permissions.map(p => p.permission_id);
            const allSelected = modulePermissionIds.every(id => selectedPermissions.includes(id));
            const someSelected = modulePermissionIds.some(id => selectedPermissions.includes(id));
            
            return (
              <div key={module} className="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-slate-900 dark:text-white">{module}</h4>
                  <button
                    onClick={() => handleModuleToggle(module)}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      allSelected 
                        ? 'bg-blue-600 text-white' 
                        : someSelected 
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {allSelected ? 'Deselect All' : someSelected ? 'Partial' : 'Select All'}
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {permissions.map((permission) => (
                    <label
                      key={permission.permission_id}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(permission.permission_id)}
                        onChange={() => handlePermissionToggle(permission.permission_id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            {permission.permission_name}
                          </span>
                          <span className={`inline-flex px-1.5 py-0.5 text-xs font-medium rounded ${getActionColor(permission.action)}`}>
                            {permission.action}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {permission.permission_code}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-600">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Permissions
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionAssign;
