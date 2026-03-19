import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { ApartmentOutlined, BarsOutlined, BranchesOutlined, IdcardOutlined, KeyOutlined, SafetyOutlined } from '@ant-design/icons';
import {
  Building2,
  LayoutDashboard,
  LogOut,
  Menu,
  Users
} from 'lucide-react';
import { useState } from 'react';

const menuItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/dashboard/company', icon: Building2, label: 'Company ' },
  { path: '/dashboard/branch', icon: BranchesOutlined, label: 'Branch' },
  { path: '/dashboard/department', icon: ApartmentOutlined, label: 'Department' },
  { path: '/dashboard/designation', icon: IdcardOutlined , label: 'Designation ' },
  { path: '/dashboard/role', icon: SafetyOutlined , label: 'Role' },
  { path: '/dashboard/permission', icon: KeyOutlined , label: 'Permission' },
  { path: '/dashboard/users', icon: Users, label: 'Users' },

  
];

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (val: boolean) => void;
}

export default function Sidebar({ isExpanded, setIsExpanded }: SidebarProps) {
  const location = useLocation();
  const { logout } = useAuth();
  const { theme } = useTheme();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully!', 'success');
    navigate('/');
  };

  const isDark = theme === 'dark';

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      <aside
        className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out flex flex-col ${isExpanded ? 'w-64' : 'w-20'
          } ${isDark
            ? 'bg-navy-dark text-white border-r border-gray-800 shadow-glass hover:border-blue-500'
            : 'bg-white text-gray-900 border-r border-gray-200 hover:border-blue-400'
          } shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col h-full relative">

          <div className={`flex items-center justify-between p-4 border-b h-16 transition-colors ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <div className={`flex items-center overflow-hidden transition-all duration-300 ${isExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'}`}>
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl mr-3 shadow-neon">
                W
              </div>
              <span className={`font-bold text-lg whitespace-nowrap ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Work OS
              </span>
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-1.5 rounded-lg transition-colors hidden lg:block 
  ${isDark ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-500'} 
  absolute right-4 top-4 z-10`}
            >
              <BarsOutlined className="text-[23px]" />
            </button>
            {!isExpanded && (
              <div className="flex-1 flex justify-center -ml-2 lg:-ml-0">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-neon cursor-pointer lg:hidden">
                  W
                </div>
              </div>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1 custom-scrollbar">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.path === '/dashboard'
                ? location.pathname === '/dashboard' || location.pathname === '/dashboard/'
                : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  title={!isExpanded ? item.label : undefined}
                  className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${isActive
                    ? 'bg-blue-600/10 text-blue-600 dark:bg-blue-900/40 dark:text-cyan-primary'
                    : isDark
                      ? 'text-gray-400 hover:bg-gray-800/80 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100/80 hover:text-blue-600'
                    }`}
                >
                  <div className={`flex-shrink-0 ${isActive ? 'text-blue-600 dark:text-cyan-primary' : ''}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`ml-3 font-medium whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100 translate-x-0 w-auto' : 'opacity-0 -translate-x-4 w-0 hidden'
                      }`}
                  >
                    {item.label}
                  </span>

                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 dark:bg-cyan-primary rounded-r-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className={`p-4 border-t h-20 transition-colors ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
            <button
              onClick={handleLogout}
              className={`flex items-center px-3 py-2.5 rounded-lg transition-colors duration-200 w-full justify-start ${isDark
                ? 'text-gray-400 hover:bg-red-500/10 hover:text-red-400'
                : 'text-gray-600 hover:bg-red-50 hover:text-red-600'
                }`}
              title={!isExpanded ? 'Logout' : undefined}
            >
              <LogOut className="w-5 h-5 flex-shrink-0" />
              <span className={`ml-3 font-medium whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden'
                }`}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
        />
      )}
    </>
  );
}
