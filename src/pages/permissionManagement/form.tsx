import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Permission } from '../../types/role';

interface PermissionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePermission: (permissionData: Omit<Permission, 'permission_id' | 'created_at' | 'updated_at'>) => void;
  onUpdatePermission?: (permissionId: number, permissionData: Omit<Permission, 'permission_id' | 'created_at' | 'updated_at'>) => void;
  initialData?: Permission;
  isEdit?: boolean;
}

const modules = [
  'User Management',
  'Role Management',
  'Permission Management',
  'Department Management',
  'Company Management',
  'Designation Management',
  'Branch Management',
  'Reports',
  'Settings',
  'Dashboard'
];

const actions = [
  { value: 'view', label: 'View' },
  { value: 'create', label: 'Create' },
  { value: 'edit', label: 'Edit' },
  { value: 'delete', label: 'Delete' },
  { value: 'export', label: 'Export' },
  { value: 'import', label: 'Import' }
];

export function PermissionForm({ isOpen, onClose, onCreatePermission, onUpdatePermission, initialData, isEdit = false }: PermissionFormProps) {
  const [formData, setFormData] = useState({
    permission_name: '',
    permission_code: '',
    module: '',
    action: [] as string[],
    description: '',
    status: 'Active' as 'Active' | 'Inactive'
  });

  useEffect(() => {
    if (initialData && isEdit) {
      const actionArray = initialData.action.includes(',') 
        ? initialData.action.split(',') 
        : [initialData.action];
      setFormData({
        permission_name: initialData.permission_name,
        permission_code: initialData.permission_code,
        module: initialData.module,
        action: actionArray,
        description: initialData.description,
        status: initialData.status
      });
    } else {
      setFormData({
        permission_name: '',
        permission_code: '',
        module: '',
        action: [],
        description: '',
        status: 'Active' as 'Active' | 'Inactive'
      });
    }
  }, [initialData, isEdit]);

  const handleActionToggle = (actionValue: string) => {
    setFormData(prev => ({
      ...prev,
      action: prev.action.includes(actionValue)
        ? prev.action.filter(a => a !== actionValue)
        : [...prev.action, actionValue]
    }));
  };

  const removeAction = (actionValue: string) => {
    setFormData(prev => ({
      ...prev,
      action: prev.action.filter(a => a !== actionValue)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      action: formData.action.join(',')
    };

    if (isEdit && onUpdatePermission && initialData) {
      onUpdatePermission(initialData.permission_id, submissionData);
    } else {
      onCreatePermission(submissionData);
    }

    onClose();
    setFormData({
      permission_name: '',
      permission_code: '',
      module: '',
      action: [],
      description: '',
      status: 'Active' as 'Active' | 'Inactive'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generatePermissionCode = () => {
    if (formData.module && formData.action.length > 0) {
      const moduleCode = formData.module.toLowerCase().replace(/\s+/g, '_');
      const actionCodes = formData.action.join('_or_');
      setFormData(prev => ({
        ...prev,
        permission_code: `${actionCodes}_${moduleCode}`
      }));
    }
  };

  useEffect(() => {
    generatePermissionCode(); 
  }, [formData.module, formData.action]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('action-dropdown');
      const button = event.target as HTMLElement;
      
      if (dropdown && !dropdown.contains(button) && !button.closest('button')) {
        dropdown.classList.add('hidden');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {isEdit ? 'Edit Permission' : 'Add New Permission'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            ✕
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Permission Name
              </label>
              <input
                type="text"
                name="permission_name"
                value={formData.permission_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="Enter permission name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Permission Code
              </label>
              <input
                type="text"
                name="permission_code"
                value={formData.permission_code}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="Enter permission code"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Module
            </label>
            <select
              name="module"
              value={formData.module}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              required
            >
              <option value="">Select Module</option>
              {modules.map(module => (
                <option key={module} value={module}>{module}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Actions
            </label>
            <div className="space-y-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    const dropdown = document.getElementById('action-dropdown');
                    dropdown?.classList.toggle('hidden');
                  }}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white text-left flex justify-between items-center"
                >
                  <span className={formData.action.length === 0 ? 'text-slate-400' : ''}>
                    {formData.action.length === 0 ? 'Select actions' : `${formData.action.length} action(s) selected`}
                  </span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div id="action-dropdown" className="hidden absolute z-10 w-full mt-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-lg">
                  <div className="max-h-40 overflow-y-auto">
                    {actions.map(action => (
                      <label
                        key={action.value}
                        className="flex items-center px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-600 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.action.includes(action.value)}
                          onChange={() => handleActionToggle(action.value)}
                          className="w-4 h-4 text-blue-600 bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-600 rounded focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                          {action.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              
              {formData.action.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.action.map(actionValue => {
                    const action = actions.find(a => a.value === actionValue);
                    return (
                      <span
                        key={actionValue}
                        className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400"
                      >
                        {action?.label || actionValue}
                        <button
                          type="button"
                          onClick={() => removeAction(actionValue)}
                          className="ml-1 text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
          
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Status
            </label>
          <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={formData.status === 'Active'}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 dark:bg-slate-700 dark:border-slate-600"
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Active</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={formData.status === 'Inactive'}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-slate-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-slate-800 dark:bg-slate-700 dark:border-slate-600"
                />
                <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Inactive</span>
              </label>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              placeholder="Enter permission description"
              required
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEdit ? 'Update Permission' : 'Create Permission'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function PermissionFormPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [permissions, setPermissions] = useState<Permission[]>([]);

  useEffect(() => {
    const storedPermissions = localStorage.getItem('permissions');
    if (storedPermissions) {
      setPermissions(JSON.parse(storedPermissions));
    }
  }, []);

  const handleCreatePermission = (permissionData: Omit<Permission, 'permission_id' | 'created_at' | 'updated_at'>) => {
    const newPermission: Permission = {
      ...permissionData,
      permission_id: Math.max(...permissions.map(p => p.permission_id), 0) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const updatedPermissions = [...permissions, newPermission];
    setPermissions(updatedPermissions);
    localStorage.setItem('permissions', JSON.stringify(updatedPermissions));
    navigate('/dashboard/permission');
  };

  const handleUpdatePermission = (permissionId: number, permissionData: Omit<Permission, 'permission_id' | 'created_at' | 'updated_at'>) => {
    const updatedPermissions = permissions.map(permission =>
      permission.permission_id === permissionId
        ? { ...permission, ...permissionData, updated_at: new Date().toISOString() }
        : permission
    );
    setPermissions(updatedPermissions);
    localStorage.setItem('permissions', JSON.stringify(updatedPermissions));
    navigate('/dashboard/permission');
  };

  const handleClose = () => {
    setIsModalOpen(false);
    navigate('/dashboard/permission');
  };

  return (
    <PermissionForm
      isOpen={isModalOpen}
      onClose={handleClose}
      onCreatePermission={handleCreatePermission}
      onUpdatePermission={handleUpdatePermission}
    />
  );
}
