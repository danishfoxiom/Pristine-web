import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

interface Designation {
  designation_id: number;
  designation_name: string;
  designation_code: string;
  department_name: string;
  email: string;
  phone: string;
  description: string;
  status: string;
  created_at: string;
  level: string;
}

interface DesignationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateDesignation: (designationData: Omit<Designation, 'designation_id' | 'created_at'>) => void;
  onUpdateDesignation?: (designationId: number, designationData: Omit<Designation, 'designation_id' | 'created_at'>) => void;
  initialData?: Designation;
  isEdit?: boolean;
}

export function DesignationForm({ isOpen, onClose, onCreateDesignation, onUpdateDesignation, initialData, isEdit = false }: DesignationFormProps) {
  const [formData, setFormData] = useState({
    designation_name: '',
    designation_code: '',
    department_name: '',
    email: '',
    phone: '',
    description: '',
    status: 'Active',
    level: ''
  });

  useEffect(() => {
    if (initialData && isEdit) {
      setFormData({
        designation_name: initialData.designation_name,
        designation_code: initialData.designation_code,
        department_name: initialData.department_name,
        email: initialData.email,
        phone: initialData.phone,
        description: initialData.description,
        status: initialData.status,
        level: initialData.level
      });
    } else {
      setFormData({
        designation_name: '',
        designation_code: '',
        department_name: '',
        email: '',
        phone: '',
        description: '',
        status: 'Active',
        level: ''
      });
    }
  }, [initialData, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit && onUpdateDesignation && initialData) {
      onUpdateDesignation(initialData.designation_id, formData);
    } else {
      onCreateDesignation(formData);
    }

    onClose();
    setFormData({
      designation_name: '',
      designation_code: '',
      department_name: '',
      email: '',
      phone: '',
      description: '',
      status: 'Active',
      level: ''
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
            {isEdit ? 'Edit Designation' : 'Add New Designation'}
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
                Designation Name
              </label>
              <input
                type="text"
                name="designation_name"
                value={formData.designation_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="Enter designation name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Designation Code
              </label>
              <input
                type="text"
                name="designation_code"
                value={formData.designation_code}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="Enter designation code"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Department Name
            </label>
            <input
              type="text"
              name="department_name"
              value={formData.department_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              placeholder="Enter department name"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Level
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                required
              >
                <option value="">Select Level</option>
                <option value="Junior">Junior</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
              </select>
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
              placeholder="Enter designation description"
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
              {isEdit ? 'Update Designation' : 'Create Designation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DesignationFormPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [designations, setDesignations] = useState<Designation[]>([]);

  useEffect(() => {
    const storedDesignations = localStorage.getItem('designations');
    if (storedDesignations) {
      setDesignations(JSON.parse(storedDesignations));
    }
  }, []);

  const handleCreateDesignation = (designationData: Omit<Designation, 'designation_id' | 'created_at'>) => {
    const newDesignation: Designation = {
      ...designationData,
      designation_id: Math.max(...designations.map(d => d.designation_id), 0) + 1,
      created_at: new Date().toISOString().split('T')[0]
    };

    const updatedDesignations = [...designations, newDesignation];
    setDesignations(updatedDesignations);
    localStorage.setItem('designations', JSON.stringify(updatedDesignations));
    navigate('/dashboard/designation');
  };

  const handleUpdateDesignation = (designationId: number, designationData: Omit<Designation, 'designation_id' | 'created_at'>) => {
    const updatedDesignations = designations.map(designation =>
      designation.designation_id === designationId
        ? { ...designation, ...designationData }
        : designation
    );
    setDesignations(updatedDesignations);
    localStorage.setItem('designations', JSON.stringify(updatedDesignations));
    navigate('/dashboard/designation');
  };

  const handleClose = () => {
    setIsModalOpen(false);
    navigate('/dashboard/designation');
  };

  const initialData = location.state?.designation;
  const isEdit = location.state?.isEdit || !!id;

  return (
    <DesignationForm
      isOpen={isModalOpen}
      onClose={handleClose}
      onCreateDesignation={handleCreateDesignation}
      onUpdateDesignation={handleUpdateDesignation}
      initialData={initialData}
      isEdit={isEdit}
    />
  );
}