import { useTheme } from '../../context/ThemeContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Jan', completed: 40, delayed: 24, active: 85 },
  { name: 'Feb', completed: 30, delayed: 13, active: 90 },
  { name: 'Mar', completed: 60, delayed: 28, active: 95 },
  { name: 'Apr', completed: 45, delayed: 39, active: 105 },
  { name: 'May', completed: 70, delayed: 48, active: 110 },
  { name: 'Jun', completed: 90, delayed: 38, active: 125 },
];

const projects = [
  { id: 1, name: 'Nova Enterprise Migration', stage: 'Testing', manager: 'Alice Walker', progress: 85, deadline: '2026-04-15', status: 'On Track' },
  { id: 2, name: 'Cloud Native DB Refactor', stage: 'Development', manager: 'John Doe', progress: 45, deadline: '2026-05-20', status: 'Delayed' },
  { id: 3, name: 'Global Payroll Integration', stage: 'Planning', manager: 'Sarah Smith', progress: 15, deadline: '2026-06-30', status: 'On Track' },
  { id: 4, name: 'Security Audit Q2', stage: 'Review', manager: 'Robert Chen', progress: 95, deadline: '2026-03-20', status: 'Near Deadline' },
];

export default function ProjectOverview() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`col-span-1 lg:col-span-2 rounded-xl border p-6 shadow-soft transition-all duration-300 hover:border-purple-400 hover:shadow-lg ${
      isDark ? 'bg-navy-card border-gray-700 text-white hover:border-purple-400' : 'bg-white border-gray-100 hover:border-purple-400'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`font-semibold text-lg ${isDark ? 'text-text-light' : 'text-gray-900'}`}>Project Portfolio</h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Active (125)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-orange-500"></span>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Delayed (38)</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-1 flex flex-col justify-center gap-4">
          <div className={`p-4 rounded-lg border ${isDark ? 'bg-navy-dark border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
            <div className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completed Projects</div>
            <div className={`text-2xl font-bold ${isDark ? 'text-text-light' : 'text-gray-900'}`}>90</div>
          </div>
          <div className={`p-4 rounded-lg border ${isDark ? 'bg-navy-dark border-gray-700' : 'bg-gray-50 border-gray-100'}`}>
            <div className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Near Deadline</div>
            <div className={`text-2xl font-bold ${isDark ? 'text-text-light' : 'text-gray-900'}`}>12</div>
          </div>
        </div>

        <div className="md:col-span-2 h-48 min-h-[192px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" stroke={isDark ? '#4b5563' : '#9ca3af'} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={isDark ? '#4b5563' : '#9ca3af'} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: isDark ? '#1a2f4a' : '#ffffff',
                  borderColor: isDark ? '#374151' : '#f3f4f6',
                  color: isDark ? '#f3f4f6' : '#000000'
                }} 
              />
              <Area type="monotone" dataKey="active" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActive)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className={`w-full text-sm text-left ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <thead className={`text-xs uppercase bg-opacity-50 ${isDark ? 'bg-gray-800/50 text-gray-400' : 'bg-gray-50 text-gray-700'}`}>
            <tr>
              <th className="px-4 py-3 rounded-tl-lg rounded-bl-lg">Project Name</th>
              <th className="px-4 py-3">Stage</th>
              <th className="px-4 py-3">Manager</th>
              <th className="px-4 py-3">Progress</th>
              <th className="px-4 py-3 rounded-tr-lg rounded-br-lg">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((item) => (
              <tr className={`border-b last:border-0 hover:bg-opacity-50 transition-colors ${
                isDark ? 'border-gray-700 hover:bg-gray-800/30' : 'border-gray-100 hover:bg-gray-50'
              }`}>
                <td className={`px-4 py-3 font-medium ${isDark ? 'text-text-light' : 'text-gray-900'}`}>
                  {item.name}
                  {item.status === 'Delayed' && <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Delayed</span>}
                </td>
                <td className="px-4 py-3">{item.stage}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                    {item.manager.charAt(0)}
                  </div>
                  {item.manager}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-8">{item.progress}%</span>
                    <div className={`w-full h-1.5 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className={`h-1.5 rounded-full ${item.progress > 80 ? 'bg-emerald-500' : item.progress < 50 ? 'bg-orange-500' : 'bg-blue-500'}`} 
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">{item.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
