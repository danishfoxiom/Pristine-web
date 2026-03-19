import React, { useState, useEffect } from 'react';
import { Edit, Eye, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import CompanyView from './view';
import { CompanyForm } from './form';
import PageHeader from '../../components/PageHeader';
import DeletePopup from '../../components/deletePopup';
import { useToast } from '../../context/ToastContext';

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

const dummyData: Company[] = [
  {
    company_id: 1,
    company_name: 'Acme Corporation',
    company_code: 'ACM001',
    logo: 'https://via.placeholder.com/50',
    email: 'info@acme.com',
    phone: '+1-123-456-7890',
    address: '123 Main Street, Anytown, USA',
    status: 'Active',
    created_at: '2023-01-15',
  },
  {
    company_id: 2,
    company_name: 'Tech Innovations Ltd',
    company_code: 'TEC002',
    logo: 'https://via.placeholder.com/50',
    email: 'contact@techinnovations.com',
    phone: '+1-234-567-8901',
    address: '456 Tech Avenue, Silicon Valley, CA',
    status: 'Active',
    created_at: '2023-02-20',
  },
  {
    company_id: 3,
    company_name: 'Global Solutions Inc',
    company_code: 'GLB003',
    logo: 'https://via.placeholder.com/50',
    email: 'support@globalsolutions.com',
    phone: '+1-345-678-9012',
    address: '789 Business Blvd, New York, NY',
    status: 'Inactive',
    created_at: '2023-03-10',
  },
  {
    company_id: 4,
    company_name: 'NextGen Enterprises',
    company_code: 'NGN004',
    logo: 'https://via.placeholder.com/50',
    email: 'hello@nextgen.com',
    phone: '+1-456-789-0123',
    address: '321 Innovation Drive, Austin, TX',
    status: 'Active',
    created_at: '2023-04-05',
  },
  {
    company_id: 5,
    company_name: 'Pioneer Systems',
    company_code: 'PIO005',
    logo: 'https://via.placeholder.com/50',
    email: 'info@pioneersystems.com',
    phone: '+1-567-890-1234',
    address: '654 Pioneer Way, Seattle, WA',
    status: 'Active',
    created_at: '2023-05-12',
  },
  {
    company_id: 6,
    company_name: 'Future Tech Corp',
    company_code: 'FTC006',
    logo: 'https://via.placeholder.com/50',
    email: 'contact@futuretech.com',
    phone: '+1-678-901-2345',
    address: '987 Future Street, Boston, MA',
    status: 'Inactive',
    created_at: '2023-06-18',
  },
  {
    company_id: 7,
    company_name: 'Innovate Now LLC',
    company_code: 'INN007',
    logo: 'https://via.placeholder.com/50',
    email: 'support@innovatenow.com',
    phone: '+1-789-012-3456',
    address: '147 Innovate Lane, Denver, CO',
    status: 'Active',
    created_at: '2023-07-22',
  },
  {
    company_id: 8,
    company_name: 'Digital Dynamics',
    company_code: 'DIG008',
    logo: 'https://via.placeholder.com/50',
    email: 'hello@digitaldynamics.com',
    phone: '+1-890-123-4567',
    address: '258 Digital Drive, Miami, FL',
    status: 'Active',
    created_at: '2023-08-30',
  },
];
function CompanyManagement() {
  const { addToast } = useToast();
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'form' | 'view'>('list');
  const [searchValue, setSearchValue] = useState('');
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);

  useEffect(() => {
    const storedCompanies = localStorage.getItem('companies');
    if (storedCompanies) {
      setCompanies(JSON.parse(storedCompanies));
    } else {
      setCompanies(dummyData);
      localStorage.setItem('companies', JSON.stringify(dummyData));
    }
  }, []);

  const handleAddCompany = () => {
    setCurrentView('form');
    setSelectedCompany(null);
    setIsEdit(false);
  };

  const handleViewCompany = (company: Company) => {
    setSelectedCompany(company);
    setCurrentView('view');
  };

  const handleEditCompany = (company: Company) => {
    setSelectedCompany(company);
    setIsEdit(true);
    setCurrentView('form');
  };

  const handleDeleteCompany = (company: Company) => {
    setCompanyToDelete(company);
    setIsDeletePopupOpen(true);
  };

  const confirmDeleteCompany = () => {
    if (companyToDelete) {
      const updatedCompanies = companies.filter(company => company.company_id !== companyToDelete.company_id);
      setCompanies(updatedCompanies);
      localStorage.setItem('companies', JSON.stringify(updatedCompanies));
      setCompanyToDelete(null);
      setIsDeletePopupOpen(false);
    }
  };

  const cancelDeleteCompany = () => {
    setCompanyToDelete(null);
    setIsDeletePopupOpen(false);
  };

  const handleFormSubmit = (companyData: Omit<Company, 'company_id' | 'created_at'>) => {
    if (isEdit && selectedCompany) {
      const updatedCompanies = companies.map(company =>
        company.company_id === selectedCompany.company_id
          ? { ...company, ...companyData }
          : company
      );
      setCompanies(updatedCompanies);
      localStorage.setItem('companies', JSON.stringify(updatedCompanies));
    } else {
      const newCompany: Company = {
        ...companyData,
        company_id: Math.max(...companies.map(c => c.company_id), 0) + 1,
        created_at: new Date().toISOString().split('T')[0]
      };
      const updatedCompanies = [...companies, newCompany];
      setCompanies(updatedCompanies);
      localStorage.setItem('companies', JSON.stringify(updatedCompanies));
    }
    setCurrentView('list');
  };

  const handleFormClose = () => {
    setCurrentView('list');
    setSelectedCompany(null);
    setIsEdit(false);
  };

  const handleViewClose = () => {
    setCurrentView('list');
    setSelectedCompany(null);
  };

  const filteredCompanies = companies.filter(company =>
    company.company_name.toLowerCase().includes(searchValue.toLowerCase()) ||
    company.company_code.toLowerCase().includes(searchValue.toLowerCase()) ||
    company.email.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 transition-colors duration-200">
      {currentView === 'list' && (
        <>
          <PageHeader
            title="Company Management"
            description="Manage company information, contacts, and status."
            searchPlaceholder="Search companies by name, email, or code..."
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            // showFilter={true}
            onFilterClick={() => addToast('Filter functionality coming soon!', 'info')}
            buttons={[
              {
                label: 'Add Company',
                onClick: handleAddCompany,
                variant: 'primary',
                icon: <Plus className="w-4 h-4" />
              }
            ]}
          />

          <div className="bg-white dark:bg-slate-800 rounded-[20px] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto w-full">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b-2 border-slate-300 dark:border-slate-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Company Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Company Code</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Logo</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Address</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Created At</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredCompanies.map((company) => (
                    <tr key={company.company_id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{company.company_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{company.company_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{company.company_code}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img src={company.logo} alt="Company Logo" className="w-10 h-10 rounded-lg object-cover" />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{company.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{company.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100 max-w-xs truncate" title={company.address}>{company.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full min-w-[80px] ${company.status === 'Active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : company.status === 'Inactive'
                            ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                          {company.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{company.created_at}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewCompany(company)}
                            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="View Company"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditCompany(company)}
                            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="Edit Company"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCompany(company)}
                            className="p-2 text-slate-400 hover:text-red-700 hover:bg-red-100 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete Company"
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
                Showing 1 to {filteredCompanies.length} of {companies.length} results
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
        </>
      )}

      {currentView === 'form' && (
        <CompanyForm
          isOpen={true}
          onClose={handleFormClose}
          onCreateCompany={handleFormSubmit}
          initialData={selectedCompany || undefined}
          isEdit={isEdit}
        />
      )}

      {currentView === 'view' && selectedCompany && (
        <CompanyView
          company={selectedCompany}
          onClose={handleViewClose}
          isOpen={true}
        />
      )}

      <DeletePopup
        isOpen={isDeletePopupOpen}
        onClose={cancelDeleteCompany}
        onConfirm={confirmDeleteCompany}
        title="Do you really want to delete this company?"
        description={`This will permanently delete "${companyToDelete?.company_name}" and all associated data. This action cannot be undone.`}
      />
    </div>
  );
}

export default CompanyManagement;