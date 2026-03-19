import { useTheme } from '../../context/ThemeContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const perfData = [
  { name: 'Engineering', completion: 92, attendance: 98, response: 4.2 }, // response in hrs inverted conceptually in UI
  { name: 'Design', completion: 88, attendance: 95, response: 2.1 },
  { name: 'Product', completion: 95, attendance: 99, response: 1.5 },
  { name: 'Marketing', completion: 85, attendance: 94, response: 5.6 },
  { name: 'Sales', completion: 90, attendance: 97, response: 3.2 },
];

export default function EmployeePerformance() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`col-span-1 lg:col-span-2 rounded-xl border p-6 shadow-soft transition-all duration-300 hover:border-indigo-400 hover:shadow-lg ${
      isDark ? 'bg-navy-card border-gray-700 text-white hover:border-indigo-400' : 'bg-white border-gray-100 hover:border-indigo-400'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`font-semibold text-lg ${isDark ? 'text-text-light' : 'text-gray-900'}`}>Employee Performance Analytics</h2>
        <select className={`text-sm border rounded px-3 py-1.5 focus:outline-none transition-colors ${
          isDark ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-gray-300 text-gray-700'
        }`}>
          <option>This Month</option>
          <option>Last Quarter</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Avg Task Completion', value: '90%', trend: '+2.4%' },
          { label: 'Avg Response Time', value: '3.1 hrs', trend: '-1.2 hrs' },
          { label: 'Attendance consistency', value: '96.2%', trend: '+0.8%' },
          { label: 'Project Participation', value: '84%', trend: '+5.0%' },
        ].map((stat, idx) => (
          <div key={idx} className={`p-4 rounded-xl border flex flex-col justify-center transition-colors ${
            isDark ? 'bg-navy-dark border-gray-700' : 'bg-gray-50 border-gray-100'
          }`}>
            <div className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</div>
            <div className={`text-2xl font-bold mb-1 ${isDark ? 'text-text-light' : 'text-gray-900'}`}>{stat.value}</div>
            <div className="text-xs font-semibold text-emerald-500">{stat.trend}</div>
          </div>
        ))}
      </div>

      <div className="h-[250px] w-full min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={perfData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="name" stroke={isDark ? '#4b5563' : '#9ca3af'} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke={isDark ? '#4b5563' : '#9ca3af'} fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
            <Tooltip 
              cursor={{ fill: isDark ? '#1f2937' : '#f3f4f6' }}
              contentStyle={{ 
                backgroundColor: isDark ? '#112A52' : '#ffffff',
                borderColor: isDark ? '#1f2937' : '#f3f4f6',
                color: isDark ? '#fff' : '#000',
                borderRadius: '8px'
              }} 
            />
            <Legend wrapperStyle={{ paddingTop: '20px', fontSize: '12px', color: isDark ? '#9ca3af' : '#6b7280' }} />
            <Bar dataKey="completion" name="Task Completion (%)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="attendance" name="Attendance (%)" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
