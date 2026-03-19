import React, { useState, useEffect } from 'react';
import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { DesignationForm } from './form';
import DesignationView from './view';
import DeletePopup from '../../components/deletePopup';
import PageHeader from '../../components/PageHeader';
import { useToast } from '../../context/ToastContext';

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

const dummyData: Designation[] = [
  {
    designation_id: 1,
    designation_name: 'Software Engineer',
    designation_code: 'SE001',
    department_name: 'Engineering',
    level: 'Junior',
    email: 'se@company.com',
    phone: '+1-123-456-7891',
    description: 'Responsible for developing and maintaining software applications',
    status: 'Active',
    created_at: '2023-01-15',
  },
  {
    designation_id: 2,
    designation_name: 'Project Manager',
    designation_code: 'PM002',
    level: 'Senior',
    department_name: 'Management',
    email: 'pm@company.com',
    phone: '+1-234-567-8902',
    description: 'Manages project timelines, resources, and team coordination',
    status: 'Active',
    created_at: '2023-02-20',
  },
  {
    designation_id: 3,
    designation_name: 'UX Designer',
    designation_code: 'UX003',
    level: 'Mid-level',
    department_name: 'Design',
    email: 'ux@company.com',
    phone: '+1-345-678-9013',
    description: 'Creates user experience designs and interfaces',
    status: 'Inactive',
    created_at: '2023-03-10',
  },
  {
    designation_id: 4,
    designation_name: 'Data Analyst',
    designation_code: 'DA004',
    level: 'Mid-level',
    department_name: 'Analytics',
    email: 'da@company.com',
    phone: '+1-456-789-0124',
    description: 'Analyzes data and provides insights for business decisions',
    status: 'Active',
    created_at: '2023-04-05',
  },
  {
    designation_id: 5,
    designation_name: 'Marketing Specialist',
    designation_code: 'MS005',
    level: 'Mid-level',
    department_name: 'Marketing',
    email: 'ms@company.com',
    phone: '+1-567-890-1235',
    description: 'Develops and implements marketing strategies',
    status: 'Active',
    created_at: '2023-05-12',
  },
  {
    designation_id: 6,
    designation_name: 'HR Manager',
    designation_code: 'HR006',
    level: 'Senior',
    department_name: 'Human Resources',
    email: 'hr@company.com',
    phone: '+1-678-901-2346',
    description: 'Manages human resources and employee relations',
    status: 'Inactive',
    created_at: '2023-06-18',
  },
  {
    designation_id: 7,
    designation_name: 'Sales Executive',
    designation_code: 'SE007',
    level: 'Mid-level',
    department_name: 'Sales',
    email: 'sales@company.com',
    phone: '+1-789-012-3457',
    description: 'Handles client relationships and sales activities',
    status: 'Active',
    created_at: '2023-07-22',
  },
  {
    designation_id: 8,
    designation_name: 'QA Engineer',
    designation_code: 'QA008',
    level: 'Mid-level',
    department_name: 'Engineering',
    email: 'qa@company.com',
    phone: '+1-890-123-4568',
    description: 'Ensures software quality through testing and validation',
    status: 'Active',
    created_at: '2023-08-30',
  },
  {
    designation_id: 9,
    designation_name: 'DevOps Engineer',
    designation_code: 'DO009',
    level: 'Senior',
    department_name: 'Engineering',
    email: 'devops@company.com',
    phone: '+1-901-234-5678',
    description: 'Ensures the smooth operation of software systems',
    status: 'Active',
    created_at: '2023-08-30',
  },
  {
    designation_id: 10,
    designation_name: 'Cloud Engineer',
    designation_code: 'CE010',
    level: 'Senior',
    department_name: 'Engineering',
    email: 'cloud@company.com',
    phone: '+1-902-345-6789',
    description: 'Designs and implements cloud infrastructure',
    status: 'Active',
    created_at: '2023-09-01',
  },
  {
    designation_id: 11,
    designation_name: 'Network Engineer',
    designation_code: 'NE011',
    level: 'Senior',
    department_name: 'Engineering',
    email: 'network@company.com',
    phone: '+1-903-456-7890',
    description: 'Designs and implements network infrastructure',
    status: 'Active',
    created_at: '2023-09-02',
  },
  {
    designation_id: 12,
    designation_name: 'Cyber Security Engineer',
    designation_code: 'CSE012',
    level: 'Senior',
    department_name: 'Engineering',
    email: 'cybersecurity@company.com',
    phone: '+1-904-567-8901',
    description: 'Develops and implements cyber security measures',
    status: 'Active',
    created_at: '2023-09-03',
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

function DesignationManagement() {
  const { addToast } = useToast();
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [selectedDesignation, setSelectedDesignation] = useState<Designation | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'form' | 'view'>('list');
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [designationToDelete, setDesignationToDelete] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const storedDesignations = localStorage.getItem('designations');
    if (storedDesignations) {
      setDesignations(JSON.parse(storedDesignations));
    } else {
      setDesignations(dummyData);
      localStorage.setItem('designations', JSON.stringify(dummyData));
    }
  }, []);

  const handleAddDesignation = () => {
    setCurrentView('form');
    setSelectedDesignation(null);
    setIsEdit(false);
  };

  const handleViewDesignation = (designation: Designation) => {
    setSelectedDesignation(designation);
    setCurrentView('view');
  };

  const handleEditDesignation = (designation: Designation) => {
    setSelectedDesignation(designation);
    setIsEdit(true);
    setCurrentView('form');
  };

  const handleDeleteDesignation = (designationId: number) => {
    setDesignationToDelete(designationId);
    setIsDeletePopupOpen(true);
  };

  const confirmDeleteDesignation = () => {
    if (designationToDelete !== null) {
      const updatedDesignations = designations.filter(designation => designation.designation_id !== designationToDelete);
      setDesignations(updatedDesignations);
      localStorage.setItem('designations', JSON.stringify(updatedDesignations));
      setDesignationToDelete(null);
      setIsDeletePopupOpen(false);
    }
  };

  const cancelDelete = () => {
    setDesignationToDelete(null);
    setIsDeletePopupOpen(false);
  };

  const handleFormSubmit = (designationData: Omit<Designation, 'designation_id' | 'created_at'>) => {
    if (isEdit && selectedDesignation) {
      const updatedDesignations = designations.map(designation =>
        designation.designation_id === selectedDesignation.designation_id
          ? { ...designation, ...designationData }
          : designation
      );
      setDesignations(updatedDesignations);
      localStorage.setItem('designations', JSON.stringify(updatedDesignations));
    } else {
      const newDesignation: Designation = {
        ...designationData,
        designation_id: Math.max(...designations.map(d => d.designation_id), 0) + 1,
        created_at: new Date().toISOString().split('T')[0]
      };
      const updatedDesignations = [...designations, newDesignation];
      setDesignations(updatedDesignations);
      localStorage.setItem('designations', JSON.stringify(updatedDesignations));
    }
    setCurrentView('list');
  };

  const handleFormClose = () => {
    setCurrentView('list');
    setSelectedDesignation(null);
    setIsEdit(false);
  };

  const handleViewClose = () => {
    setCurrentView('list');
    setSelectedDesignation(null);
  };

  const filteredDesignations = designations.filter(designation =>
    designation.designation_name.toLowerCase().includes(searchValue.toLowerCase()) ||
    designation.designation_code.toLowerCase().includes(searchValue.toLowerCase()) ||
    designation.department_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 transition-colors duration-200">
      {currentView === 'list' && (
        <>
          <PageHeader
            title="Designation Management"
            description="Manage designation information, contacts, and status."
            searchPlaceholder="Search designations by name, code, or department..."
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            // showFilter={true}
            onFilterClick={() => addToast('Filter functionality coming soon!', 'info')}
            buttons={[
              {
                label: 'Add Designation',
                onClick: handleAddDesignation,
                variant: 'primary',
                icon: <Plus className="w-4 h-4" />,
              },
            ]}
          />
          <div className="bg-white dark:bg-slate-800 rounded-[20px] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto w-full">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b-2 border-slate-300 dark:border-slate-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap"> ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Designation Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Designation Code</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Level</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Description</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Created At</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredDesignations.map((designation) => (
                    <tr key={designation.designation_id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{designation.designation_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{designation.designation_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{designation.designation_code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{designation.level}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100 max-w-xs truncate" title={designation.description}>{designation.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full min-w-[80px] ${getStatusColor(designation.status)}`}>
                          {designation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{designation.created_at}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDesignation(designation)}
                            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="View Designation"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditDesignation(designation)}
                            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="Edit Designation"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteDesignation(designation.designation_id)}
                            className="p-2 text-slate-400 hover:text-red-700 hover:bg-red-100 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete Designation"
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
                Showing 1 to {filteredDesignations.length} of {filteredDesignations.length} results
              </div>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-md hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" disabled>
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-md font-medium">
                  1
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {currentView === 'form' && (
        <DesignationForm
          isOpen={true}
          onClose={handleFormClose}
          onCreateDesignation={handleFormSubmit}
          initialData={selectedDesignation || undefined}
          isEdit={isEdit}
        />
      )}

      {currentView === 'view' && selectedDesignation && (
        <DesignationView
          designation={selectedDesignation}
          onClose={handleViewClose}
          isOpen={true}
        />
      )}

      <DeletePopup
        isOpen={isDeletePopupOpen}
        onClose={cancelDelete}
        onConfirm={confirmDeleteDesignation}
        title="Delete Designation"
        description="Are you sure you want to delete this designation? This action cannot be undone."
      />
    </div>
  );
}

export default DesignationManagement;