import { useTheme } from '../../context/ThemeContext';
import {
  Building2,
  ClipboardList,
  TrendingDown,
  TrendingUp,
  Minus
} from 'lucide-react';
import { UsergroupAddOutlined,ProjectOutlined } from '@ant-design/icons';

export default function StatCards() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const stats = [
    {
      label: 'Total Companies',
      value: '1,245',
       icon: Building2,
      // color: 'text-blue-50',
      bg: isDark ? 'bg-blue-500/10' : 'bg-blue-50',
      trend: 12,
      trendType: 'up'
    },
    {
      label: 'Total Employees',
      value: '45.2K',
      icon: () => <UsergroupAddOutlined className="text-xl" />,
      color: '',
      bg: isDark ? 'bg-indigo-500/10' : 'bg-indigo-50',
      trend: 5.4,
      trendType: 'up'
    },
    {
      label: 'Active Projects',
      value: '892', 
      icon: () => <ProjectOutlined className=" text-xl" />,
      color: 'text-purple-500',
      bg: isDark ? 'bg-purple-500/10' : 'bg-purple-50',
      trend: 0,
      trendType: 'flat'
    },
    {
      label: 'Pending Tasks',
      value: '14,023',
      icon: () => <ClipboardList className=" text-xl" />,
      color: 'text-yellow-500',
      bg: isDark ? 'bg-yellow-500/10' : 'bg-yellow-50',
      trend: -2.3,
      trendType: 'down'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;

        const isBadTrend = (stat.label.includes('Overdue') || stat.label.includes('Alert')) && stat.trendType === 'up';
        const isGoodTrend = stat.trendType === 'down' && (stat.label.includes('Overdue') || stat.label.includes('Alert'));

        const trendColorClasses = isBadTrend
          ? 'text-red-500'
          : isGoodTrend
            ? 'text-emerald-500'
            : stat.trendType === 'up'
              ? 'text-emerald-500'
              : stat.trendType === 'down' ? 'text-red-500' : 'text-gray-400';

        return (
          <div
            key={idx}
className={`group rounded-xl p-5 border transition-all duration-300 cursor-default hover:border-blue-400 hover:shadow-lg hover:-translate-y-1
${
  isDark
    ? 'bg-navy-card border-gray-700 hover:border-cyan-primary'
    : 'bg-white border-gray-100 hover:border-blue-400'
}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>

              <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${isDark ? 'bg-gray-800/50' : 'bg-gray-100'
                } ${trendColorClasses}`}>
                {stat.trendType === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> :
                  stat.trendType === 'down' ? <TrendingDown className="w-3 h-3 mr-1" /> :
                    <Minus className="w-3 h-3 mr-1" />}
                {stat.trend === 0 ? '0%' : `${Math.abs(stat.trend)}%`}
              </div>
            </div>

            <div>
              <h3 className={`text-sm font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {stat.label}
              </h3>
              <div className={`text-2xl font-bold tracking-tight ${isDark ? 'text-text-light' : 'text-gray-900'}`}>
                {stat.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
