import { useState, useEffect } from 'react';
import { Edit, Eye, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import UsersView from './usersView';
import { UsersForm } from './usersform';
import PageHeader from '../../components/PageHeader';
import DeletePopup from '../../components/deletePopup';
import { useToast } from '../../context/ToastContext';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  created_at: string;
}

const dummyData: User[] = [
  {
    id: 'USR-001',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Administrator',
    status: 'Active',
    created_at: '2023-01-15',
  },
  {
    id: 'USR-002',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Manager',
    status: 'Active',
    created_at: '2023-02-20',
  },
  {
    id: 'USR-003',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Staff',
    status: 'Inactive',
    created_at: '2023-03-10',
  },
  {
    id: 'USR-004',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'Analyst',
    status: 'Active',
    created_at: '2023-04-05',
  },
  {
    id: 'USR-005',
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'Staff',
    status: 'Pending',
    created_at: '2023-05-12',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-500/20';
    case 'Inactive':
      return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-500/20';
    case 'Pending':
      return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-500/20';
    default:
      return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-500/20';
  }
};

function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEdit, setIsEdit] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'form' | 'view'>('list');
  const [searchValue, setSearchValue] = useState('');
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const { addToast } = useToast();

  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(dummyData);
      localStorage.setItem('users', JSON.stringify(dummyData));
    }
  }, []);

  const handleAddUser = () => {
    setCurrentView('form');
    setSelectedUser(null);
    setIsEdit(false);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setCurrentView('view');
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEdit(true);
    setCurrentView('form');
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setIsDeletePopupOpen(true);
  };

  const confirmDeleteUser = () => {
    if (userToDelete) {
      const updatedUsers = users.filter(user => user.id !== userToDelete.id);
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUserToDelete(null);
      setIsDeletePopupOpen(false);
    }
  };

  const cancelDeleteUser = () => {
    setUserToDelete(null);
    setIsDeletePopupOpen(false);
  };

  const handleFormSubmit = (userData: Omit<User, 'id' | 'created_at'>) => {
    if (isEdit && selectedUser) {
      const updatedUsers = users.map(user =>
        user.id === selectedUser.id
          ? { ...user, ...userData }
          : user
      );
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    } else {
      const newUser: User = {
        ...userData,
        id: `USR-${String(users.length + 1).padStart(3, '0')}`,
        created_at: new Date().toISOString().split('T')[0]
      };
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
    setCurrentView('list');
  };

  const handleFormClose = () => {
    setCurrentView('list');
    setSelectedUser(null);
    setIsEdit(false);
  };

  const handleViewClose = () => {
    setCurrentView('list');
    setSelectedUser(null);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
    user.id.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
     <div className="space-y-6 max-w-7xl mx-auto pb-10 transition-colors duration-200">
      {currentView === 'list' && (
        <>
          <PageHeader
            title="User Management"
            description="Manage system users, roles, and permissions."
            searchPlaceholder="Search users by name, email, or ID..."
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            // showFilter={true}
            onFilterClick={() => addToast('Filter functionality coming soon!', 'info')}
            buttons={[
              {
                label: 'Add User',
                onClick: handleAddUser,
                variant: 'primary',
                icon: <Plus className="w-4 h-4" />
              }
            ]}
          />

          <div className="bg-white dark:bg-slate-800 rounded-[20px] border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
            <div className="overflow-x-auto w-full px-4">
              <table className="w-full">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b-2 border-slate-300 dark:border-slate-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">User ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Role</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Created At</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 dark:text-slate-300 uppercase tracking-wider whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm shrink-0 border border-blue-200 dark:border-blue-500/30">
                            {user.name.charAt(0)}
                          </div>
                          <div className="text-sm text-slate-900 dark:text-slate-100">{user.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {user.role}
                        </span>
                      </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full min-w-[80px] ${user.status === 'Active'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : user.status === 'Inactive'
                        ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                      {user.status}
                    </span>
                  </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900 dark:text-slate-100">{user.created_at}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewUser(user)}
                            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="View User"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="Edit User"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user)}
                            className="p-2 text-slate-400 hover:text-red-700 hover:bg-red-100 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete User"
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
                Showing 1 to {filteredUsers.length} of {users.length} results
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
        <UsersForm
          isOpen={true}
          onClose={handleFormClose}
          onCreateUser={handleFormSubmit}
          initialData={selectedUser || undefined}
          isEdit={isEdit}
        />
      )}

      {currentView === 'view' && selectedUser && (
        <UsersView
          user={selectedUser}
          onClose={handleViewClose}
          isOpen={true}
        />
      )}

      <DeletePopup
        isOpen={isDeletePopupOpen}
        onClose={cancelDeleteUser}
        onConfirm={confirmDeleteUser}
        title="Are you sure you want to delete this user?"
        description={`This will permanently delete ${userToDelete?.name || 'this user'} from the system.`}
      />
    </div>
  );
}

export default UserManagement;