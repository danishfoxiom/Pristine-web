import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

interface Branch {
  branch_id: number;
  branch_name: string;
  branch_code: string;
  company_name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  created_at: string;
}

interface BranchFormProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBranch: (branchData: Omit<Branch, 'branch_id' | 'created_at'>) => void;
  onUpdateBranch?: (branchId: number, branchData: Omit<Branch, 'branch_id' | 'created_at'>) => void;
  initialData?: Branch;
  isEdit?: boolean;
}

export function BranchForm({ isOpen, onClose, onCreateBranch, onUpdateBranch, initialData, isEdit = false }: BranchFormProps) {
  const [formData, setFormData] = useState({
    branch_name: '',
    branch_code: '',
    company_name: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active'
  });

  useEffect(() => {
    if (initialData && isEdit) {
      setFormData({
        branch_name: initialData.branch_name,
        branch_code: initialData.branch_code,
        company_name: initialData.company_name,
        email: initialData.email,
        phone: initialData.phone,
        address: initialData.address,
        status: initialData.status
      });
    } else {
      setFormData({
        branch_name: '',
        branch_code: '',
        company_name: '',
        email: '',
        phone: '',
        address: '',
        status: 'Active'
      });
    }
  }, [initialData, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit && onUpdateBranch && initialData) {
      onUpdateBranch(initialData.branch_id, formData);
    } else {
      onCreateBranch(formData);
    }

    onClose();
    setFormData({
      branch_name: '',
      branch_code: '',
      company_name: '',
      email: '',
      phone: '',
      address: '',
      status: 'Active'
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            {isEdit ? 'Edit Branch' : 'Add New Branch'}
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
                Branch Name
              </label>
              <input
                type="text"
                name="branch_name"
                value={formData.branch_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="Enter branch name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Branch Code
              </label>
              <input
                type="text"
                name="branch_code"
                value={formData.branch_code}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="Enter branch code"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              placeholder="Enter company name"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="Enter email address"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="Enter phone number"
                required
              />
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
              Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              placeholder="Enter branch address"
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
              {isEdit ? 'Update Branch' : 'Create Branch'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function BranchFormPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    const storedBranches = localStorage.getItem('branches');
    if (storedBranches) {
      setBranches(JSON.parse(storedBranches));
    }
  }, []);

  const handleCreateBranch = (branchData: Omit<Branch, 'branch_id' | 'created_at'>) => {
    const newBranch: Branch = {
      ...branchData,
      branch_id: Math.max(...branches.map(b => b.branch_id), 0) + 1,
      created_at: new Date().toISOString().split('T')[0]
    };

    const updatedBranches = [...branches, newBranch];
    setBranches(updatedBranches);
    localStorage.setItem('branches', JSON.stringify(updatedBranches));
    navigate('/dashboard/branch');
  };

  const handleUpdateBranch = (branchId: number, branchData: Omit<Branch, 'branch_id' | 'created_at'>) => {
    const updatedBranches = branches.map(branch =>
      branch.branch_id === branchId
        ? { ...branch, ...branchData }
        : branch
    );
    setBranches(updatedBranches);
    localStorage.setItem('branches', JSON.stringify(updatedBranches));
    navigate('/dashboard/branch');
  };

  const handleClose = () => {
    setIsModalOpen(false);
    navigate('/dashboard/branch');
  };

  const initialData = location.state?.branch;
  const isEdit = location.state?.isEdit || !!id;

  return (
    <BranchForm
      isOpen={isModalOpen}
      onClose={handleClose}
      onCreateBranch={handleCreateBranch}
      onUpdateBranch={handleUpdateBranch}
      initialData={initialData}
      isEdit={isEdit}
    />
  );
}