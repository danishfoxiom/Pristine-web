import { useState, useEffect } from 'react';
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { BranchForm } from './form';
import BranchView from './view';
import DeletePopup from '../../components/deletePopup';
import PageHeader from '../../components/PageHeader';
import { useToast } from '../../context/ToastContext';

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

const dummyData: Branch[] = [
  {
    branch_id: 1,
    branch_name: 'Downtown Branch',
    branch_code: 'BR001',
    company_name: 'Acme Corporation',
    email: 'downtown@acme.com',
    phone: '+1-123-456-7891',
    address: '123 Main Street, Anytown, USA',
    status: 'Active',
    created_at: '2023-01-15',
  },
  {
    branch_id: 2,
    branch_name: 'Tech Park Branch',
    branch_code: 'BR002',
    company_name: 'Tech Innovations Ltd',
    email: 'techpark@techinnovations.com',
    phone: '+1-234-567-8902',
    address: '456 Tech Avenue, Silicon Valley, CA',
    status: 'Active',
    created_at: '2023-02-20',
  },
  {
    branch_id: 3,
    branch_name: 'Westside Office',
    branch_code: 'BR003',
    company_name: 'Global Solutions Inc',
    email: 'westside@globalsolutions.com',
    phone: '+1-345-678-9013',
    address: '789 Business Blvd, New York, NY',
    status: 'Inactive',
    created_at: '2023-03-10',
  },
  {
    branch_id: 4,
    branch_name: 'North Campus',
    branch_code: 'BR004',
    company_name: 'NextGen Enterprises',
    email: 'north@nextgen.com',
    phone: '+1-456-789-0124',
    address: '321 Innovation Drive, Austin, TX',
    status: 'Active',
    created_at: '2023-04-05',
  },
  {
    branch_id: 5,
    branch_name: 'Southside Branch',
    branch_code: 'BR005',
    company_name: 'Pioneer Systems',
    email: 'southside@pioneersystems.com',
    phone: '+1-567-890-1235',
    address: '654 Pioneer Way, Seattle, WA',
    status: 'Active',
    created_at: '2023-05-12',
  },
  {
    branch_id: 6,
    branch_name: 'East End Office',
    branch_code: 'BR006',
    company_name: 'Future Tech Corp',
    email: 'eastend@futuretech.com',
    phone: '+1-678-901-2346',
    address: '987 Future Street, Boston, MA',
    status: 'Inactive',
    created_at: '2023-06-18',
  },
  {
    branch_id: 7,
    branch_name: 'Innovation Hub',
    branch_code: 'BR007',
    company_name: 'Innovate Now LLC',
    email: 'hub@innovatenow.com',
    phone: '+1-789-012-3457',
    address: '147 Innovate Lane, Denver, CO',
    status: 'Active',
    created_at: '2023-07-22',
  },
  {
    branch_id: 8,
    branch_name: 'Digital Center',
    branch_code: 'BR008',
    company_name: 'Digital Dynamics',
    email: 'center@digitaldynamics.com',
    phone: '+1-890-123-4568',
    address: '258 Digital Drive, Miami, FL',
    status: 'Active',
    created_at: '2023-08-30',
  },
  {
    branch_id: 9,
    branch_name: 'New Branch',
    branch_code: 'BR009',
    company_name: 'New Company',
    email: 'new@newcompany.com',
    phone: '+1-901-234-5678',
    address: '123 New Street, New York, NY',
    status: 'Active',
    created_at: '2023-09-01',
  },
  {
    branch_id: 10,
    branch_name: 'Another Branch',
    branch_code: 'BR010',
    company_name: 'Another Company',
    email: 'another@anothercompany.com',
    phone: '+1-902-345-6789',
    address: '456 Another Street, Chicago, IL',
    status: 'Active',
    created_at: '2023-09-02',
  },
];

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

function BranchManagement() {
  const { addToast } = useToast();
  const [branches, setBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'form' | 'view'>('list');
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState<Branch | null>(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const storedBranches = localStorage.getItem('branches');
    if (storedBranches) {
      setBranches(JSON.parse(storedBranches));
    } else {
      setBranches(dummyData);
      localStorage.setItem('branches', JSON.stringify(dummyData));
    }
  }, []);

  const handleAddBranch = () => {
    setCurrentView('form');
    setSelectedBranch(null);
    setIsEdit(false);
  };

  const handleDeleteBranch = (branch: Branch) => {
    setBranchToDelete(branch);
    setIsDeletePopupOpen(true);
  };

  const confirmDeleteBranch = () => {
    if (branchToDelete) {
      const updatedBranches = branches.filter(branch => branch.branch_id !== branchToDelete.branch_id);
      setBranches(updatedBranches);
      localStorage.setItem('branches', JSON.stringify(updatedBranches));
      setBranchToDelete(null);
      setIsDeletePopupOpen(false);
    }
  };

  const cancelDelete = () => {
    setBranchToDelete(null);
    setIsDeletePopupOpen(false);
  };

  const handleViewBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setCurrentView('view');
  };

  const handleEditBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setIsEdit(true);
    setCurrentView('form');
  };

  const handleFormSubmit = (branchData: Omit<Branch, 'branch_id' | 'created_at'>) => {
    if (isEdit && selectedBranch) {
      const updatedBranches = branches.map(branch =>
        branch.branch_id === selectedBranch.branch_id
          ? { ...branch, ...branchData, branch_id: selectedBranch.branch_id }
          : branch
      );
      setBranches(updatedBranches);
      localStorage.setItem('branches', JSON.stringify(updatedBranches));
    } else {
      const newBranch: Branch = {
        ...branchData,
        branch_id: Math.max(...branches.map(b => b.branch_id), 0) + 1,
        created_at: new Date().toISOString().split('T')[0]
      };
      const updatedBranches = [...branches, newBranch];
      setBranches(updatedBranches);
      localStorage.setItem('branches', JSON.stringify(updatedBranches));
    }
    setCurrentView('list');
  };

  const handleFormClose = () => {
    setCurrentView('list');
    setSelectedBranch(null);
    setIsEdit(false);
  };

  const handleViewClose = () => {
    setCurrentView('list');
    setSelectedBranch(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 transition-colors duration-200">
      {currentView === 'list' && (
        <>
          <PageHeader
            title="Branch Management"
            description="Manage branch information, contacts, and status."
            searchPlaceholder="Search branches by name, code, or company..."
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            // showFilter={true}
            onFilterClick={() => addToast('Filter functionality coming soon!', 'info')}
            buttons={[
              {
                label: 'Add Branch',
                onClick: handleAddBranch,
                variant: 'primary',
                icon: <Plus className="w-4 h-4" />
              }
            ]}
          />

          <div className="bg-white dark:bg-slate-800 rounded-[20px] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">


            <div className="overflow-x-auto w-full">
              <table className="w-full rounded-[20px]">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b-2 border-slate-300 dark:border-slate-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap"> ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Branch Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Branch Code</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Company Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Phone</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Address</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Created At</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {branches.map((branch) => (
                    <tr key={branch.branch_id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{branch.branch_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{branch.branch_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{branch.branch_code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{branch.company_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{branch.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{branch.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100 max-w-xs truncate" title={branch.address}>{branch.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full min-w-[80px] ${branch.status === 'Active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : branch.status === 'Inactive'
                            ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}>
                          {branch.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{branch.created_at}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewBranch(branch)}
                            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="View Branch"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditBranch(branch)}
                            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="Edit Branch"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBranch(branch)}
                            className="p-2 text-slate-400 hover:text-red-700 hover:bg-red-100 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete Branch"
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
                Showing 1 to {branches.length} of {branches.length} results
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
        <BranchForm
          isOpen={true}
          onClose={handleFormClose}
          onCreateBranch={handleFormSubmit}
          initialData={selectedBranch || undefined}
          isEdit={isEdit}
        />
      )}

      {currentView === 'view' && selectedBranch && (
        <BranchView
          branch={selectedBranch}
          onClose={handleViewClose}
          isOpen={true}
        />
      )}
      <DeletePopup
        isOpen={isDeletePopupOpen}
        onClose={cancelDelete}
        onConfirm={confirmDeleteBranch}
        title="Delete Branch"
        description={`This will permanently delete "${branchToDelete?.branch_name}" and all associated data. This action cannot be undone.`}
      />
    </div>
  );
}

export default BranchManagement;