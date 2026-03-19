import { useTheme } from '../../context/ThemeContext';
import StatCards from '../../components/dashboard/StatCards';
import ProjectOverview from '../../components/dashboard/ProjectOverview';
import TaskOverview from '../../components/dashboard/TaskOverview';
import AIRiskPanel from '../../components/dashboard/AIRiskPanel';
import EmployeePerformance from '../../components/dashboard/EmployeePerformance';


export default function DashboardHome() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`space-y-6 max-w-7xl mx-auto pb-10 transition-colors duration-200`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Dashboard
          </h1>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Welcome back. Here's what's happening across your organization today.
          </p>
        </div>


      </div>

      <StatCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProjectOverview />
        <TaskOverview />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <EmployeePerformance />
        <AIRiskPanel />
      </div>
    </div>
  );
}
