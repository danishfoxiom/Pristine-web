import React, { useState, useEffect } from 'react';
import { Edit, Eye, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import DepartmentForm from './form';
import DepartmentView from './view';
import DeletePopup from '../../components/deletePopup';
import PageHeader from '../../components/PageHeader';
import { useToast } from '../../context/ToastContext';

interface Department {
  department_id: number;
  department_name: string;
  department_code: string;
  company_name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  created_at: string;
}

const dummyData: Department[] = [
  {
    department_id: 1,
    department_name: 'Human Resources',
    department_code: 'HR001',
    company_name: 'Acme Corporation',
    email: 'hr@acme.com',
    phone: '+1-123-456-7891',
    address: '123 Main Street, Anytown, USA',
    status: 'Active',
    created_at: '2023-01-15',
  },
  {
    department_id: 2,
    department_name: 'Information Technology',
    department_code: 'IT001',
    company_name: 'Tech Innovations Ltd',
    email: 'it@techinnovations.com',
    phone: '+1-234-567-8902',
    address: '456 Tech Avenue, Silicon Valley, CA',
    status: 'Active',
    created_at: '2023-02-20',
  },
  {
    department_id: 3,
    department_name: 'Finance',
    department_code: 'FIN001',
    company_name: 'Global Solutions Inc',
    email: 'finance@globalsolutions.com',
    phone: '+1-345-678-9013',
    address: '789 Business Blvd, New York, NY',
    status: 'Inactive',
    created_at: '2023-03-10',
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

function DepartmentManagement() {
  const { addToast } = useToast();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'form' | 'view'>('list');
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const storedDepartments = localStorage.getItem('departments');
    if (storedDepartments) {
      setDepartments(JSON.parse(storedDepartments));
    } else {
      setDepartments(dummyData);
      localStorage.setItem('departments', JSON.stringify(dummyData));
    }
  }, []);

  const handleAddDepartment = () => {
    setCurrentView('form');
    setSelectedDepartment(null);
    setIsEdit(false);
  };

  const handleViewDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setCurrentView('view');
  };

  const handleEditDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setIsEdit(true);
    setCurrentView('form');
  };

  const handleDeleteDepartment = (departmentId: number) => {
    setDepartmentToDelete(departmentId);
    setIsDeletePopupOpen(true);
  };

  const confirmDeleteDepartment = () => {
    if (departmentToDelete !== null) {
      const updatedDepartments = departments.filter(department => department.department_id !== departmentToDelete);
      setDepartments(updatedDepartments);
      localStorage.setItem('departments', JSON.stringify(updatedDepartments));
      setDepartmentToDelete(null);
      setIsDeletePopupOpen(false);
    }
  };

  const cancelDelete = () => {
    setDepartmentToDelete(null);
    setIsDeletePopupOpen(false);
  };

  const handleFormSubmit = (departmentData: Omit<Department, 'department_id' | 'created_at'>) => {
    if (isEdit && selectedDepartment) {
      const updatedDepartments = departments.map(department =>
        department.department_id === selectedDepartment.department_id
          ? { ...department, ...departmentData }
          : department
      );
      setDepartments(updatedDepartments);
      localStorage.setItem('departments', JSON.stringify(updatedDepartments));
    } else {
      const newDepartment: Department = {
        ...departmentData,
        department_id: Math.max(...departments.map(d => d.department_id), 0) + 1,
        created_at: new Date().toISOString().split('T')[0]
      };
      const updatedDepartments = [...departments, newDepartment];
      setDepartments(updatedDepartments);
      localStorage.setItem('departments', JSON.stringify(updatedDepartments));
    }
    setCurrentView('list');
  };

  const handleFormClose = () => {
    setCurrentView('list');
    setSelectedDepartment(null);
    setIsEdit(false);
  };                                                                            

  const handleViewClose = () => {
    setCurrentView('list');
    setSelectedDepartment(null);
  };

  const filteredDepartments = departments.filter(department =>
    department.department_name.toLowerCase().includes(searchValue.toLowerCase()) ||
    department.department_code.toLowerCase().includes(searchValue.toLowerCase()) ||
    department.company_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 transition-colors duration-200">
      {currentView === 'list' && (
        <>
          <PageHeader
            title="Department Management"
            description="Manage department information, contacts, and status."
            searchPlaceholder="Search departments by name, code, or company..."
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            // showFilter={true}
            onFilterClick={() => addToast('Filter functionality coming soon!', 'info')}
            buttons={[
              {
                label: 'Add Department',
                onClick: handleAddDepartment,
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
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Department Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Department Code</th>
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
                  {filteredDepartments.map((department) => (
                    <tr key={department.department_id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{department.department_id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{department.department_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{department.department_code}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{department.company_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{department.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{department.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100 max-w-xs truncate" title={department.address}>{department.address}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full min-w-[80px] ${department.status === 'Active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : department.status === 'Inactive'
                        ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                      {department.status}
                    </span>
                  </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{department.created_at}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDepartment(department)}
                            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="View Department"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditDepartment(department)}
                            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="Edit Department"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteDepartment(department.department_id)}
                            className="p-2 text-slate-400 hover:text-red-700 hover:bg-red-100 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete Department"
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
                Showing 1 to {filteredDepartments.length} of {departments.length} results
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
        <DepartmentForm
          isOpen={true}
          onClose={handleFormClose}
          onCreateDepartment={handleFormSubmit}
          initialData={selectedDepartment || undefined}
          isEdit={isEdit}
        />
      )}

      {currentView === 'view' && selectedDepartment && (
        <DepartmentView
          department={selectedDepartment}
          onClose={handleViewClose}
          isOpen={true}
        />
      )}

      <DeletePopup
        isOpen={isDeletePopupOpen}
        onClose={cancelDelete}
        onConfirm={confirmDeleteDepartment}
        title="Delete Department"
        description="Are you sure you want to delete this department? This action cannot be undone."
      />
    </div>
  );
}

export default DepartmentManagement;