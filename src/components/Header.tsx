import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Bell,
  Sun,
  Moon
} from 'lucide-react';
import { Dropdown, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const items = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <header className={`h-16 px-6 border-b flex items-center justify-between transition-colors z-10 ${theme === 'dark'
      ? 'bg-navy-dark border-gray-800 text-white'
      : 'bg-white border-gray-200 text-gray-900'
      }`}>
      <div className="flex items-center flex-1">

      </div>

     
      <div className="flex items-center space-x-3 md:space-x-4">
   

        <div className={`h-6 w-px mx-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} hidden sm:block`} />
        <button className={`p-2 rounded-full relative transition-colors ${theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
          }`}>
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 block w-2 h-2 rounded-full bg-blue-500 ring-2 ring-white dark:ring-navy-dark"></span>
        </button>

        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-gray-800 text-yellow-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className={`h-6 w-px mx-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`} />

        <Dropdown
          menu={{ items }}
          placement="bottomRight"
          trigger={['click']}
        >
          <button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Avatar 
              size="small" 
              src={null}
              icon={<UserOutlined />}
              className="bg-gradient-to-r from-blue-500 to-cyan-500"
            />
            <span className="hidden sm:block text-sm font-medium">
              {user?.username || 'Admin'}
            </span>
          </button>
        </Dropdown>
      </div>
    </header>
  );
}
