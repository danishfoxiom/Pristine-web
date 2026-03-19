import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

interface Company {
  company_id: number;
  company_name: string;
  company_code: string;
  logo: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  created_at: string;
}

interface CompanyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCompany: (companyData: Omit<Company, 'company_id' | 'created_at'>) => void;
  onUpdateCompany?: (companyId: number, companyData: Omit<Company, 'company_id' | 'created_at'>) => void;
  initialData?: Company;
  isEdit?: boolean;
}

export function CompanyForm({ isOpen, onClose, onCreateCompany, onUpdateCompany, initialData, isEdit = false }: CompanyFormProps) {
  const [formData, setFormData] = useState({
    company_name: '',
    company_code: '',
    logo: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active'
  });

  useEffect(() => {
    if (initialData && isEdit) {
      setFormData({
        company_name: initialData.company_name,
        company_code: initialData.company_code,
        logo: initialData.logo,
        email: initialData.email,
        phone: initialData.phone,
        address: initialData.address,
        status: initialData.status
      });
    } else {
      setFormData({
        company_name: '',
        company_code: '',
        logo: '',
        email: '',
        phone: '',
        address: '',
        status: 'Active'
      });
    }
  }, [initialData, isEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isEdit && onUpdateCompany && initialData) {
      onUpdateCompany(initialData.company_id, formData);
    } else {
      onCreateCompany(formData);
    }

    onClose();
    setFormData({
      company_name: '',
      company_code: '',
      logo: '',
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
            {isEdit ? 'Edit Company' : 'Add New Company'}
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
            
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Company Code
              </label>
              <input
                type="text"
                name="company_code"
                value={formData.company_code}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                placeholder="Enter company code"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Logo URL
            </label>
            <input
              type="url"
              name="logo"
              value={formData.logo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              placeholder="Enter logo URL"
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
                  className="w-4 h-4 text-blue-600 border-slate-300 dark:border-slate-600 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-slate-700 dark:text-white"
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
                  className="w-4 h-4 text-blue-600 border-slate-300 dark:border-slate-600 focus:ring-blue-500 dark:focus:ring-blue-400 dark:bg-slate-700 dark:text-white"
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
              placeholder="Enter company address"
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
              {isEdit ? 'Update Company' : 'Create Company'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CompanyFormPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const storedCompanies = localStorage.getItem('companies');
    if (storedCompanies) {
      setCompanies(JSON.parse(storedCompanies));
    }
  }, []);

  const handleCreateCompany = (companyData: Omit<Company, 'company_id' | 'created_at'>) => {
    const newCompany: Company = {
      ...companyData,
      company_id: Math.max(...companies.map(c => c.company_id), 0) + 1,
      created_at: new Date().toISOString().split('T')[0]
    };

    const updatedCompanies = [...companies, newCompany];
    setCompanies(updatedCompanies);
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));
    navigate('/dashboard/company');
  };

  const handleUpdateCompany = (companyId: number, companyData: Omit<Company, 'company_id' | 'created_at'>) => {
    const updatedCompanies = companies.map(company =>
      company.company_id === companyId
        ? { ...company, ...companyData }
        : company
    );
    setCompanies(updatedCompanies);
    localStorage.setItem('companies', JSON.stringify(updatedCompanies));
    navigate('/dashboard/company');
  };

  const handleClose = () => {
    setIsModalOpen(false);
    navigate('/dashboard/company');
  };

  const initialData = location.state?.company;
  const isEdit = location.state?.isEdit || !!id;

  return (
    <CompanyForm
      isOpen={isModalOpen}
      onClose={handleClose}
      onCreateCompany={handleCreateCompany}
      onUpdateCompany={handleUpdateCompany}
      initialData={initialData}
      isEdit={isEdit}
    />
  );
}