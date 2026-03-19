import { useTheme } from '../context/ThemeContext';

export function Dashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const statCards = [
    {
      label: 'Total Users',
      value: '0',
      bgColor: isDark ? 'bg-blue-900/30' : 'bg-blue-100',
      textColor: isDark ? 'text-blue-300' : 'text-blue-800',
    },
    {
      label: 'Active Sessions',
      value: '0',
      bgColor: isDark ? 'bg-green-900/30' : 'bg-green-100',
      textColor: isDark ? 'text-green-300' : 'text-green-800',
    },
    {
      label: 'Content Items',
      value: '0',
      bgColor: isDark ? 'bg-yellow-900/30' : 'bg-yellow-100',
      textColor: isDark ? 'text-yellow-300' : 'text-yellow-800',
    },
    {
      label: 'System Status',
      value: 'Active',
      bgColor: isDark ? 'bg-red-900/30' : 'bg-red-100',
      textColor: isDark ? 'text-red-300' : 'text-red-800',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat) => (
        <div
          key={stat.label}
          className={`${stat.bgColor} rounded-lg p-6 shadow-sm`}
        >
          <div className={`text-4xl font-bold ${stat.textColor} mb-2`}>
            {stat.value}
          </div>
          <div className={`text-sm font-medium ${stat.textColor}`}>
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
