import { Outlet } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout() {
  const { theme } = useTheme();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  
  return (
    <div className={`flex flex-col h-screen overflow-hidden ${theme === 'dark' ? 'bg-[#121212] text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="flex flex-1 overflow-hidden w-full h-full">
        <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
        
        <div className="flex-1 flex flex-col h-full bg-transparent overflow-hidden relative">
          <Header />
            
          <main className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-transparent">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
