import { useTheme } from '../../context/ThemeContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CheckCircle2, Clock, AlertCircle, PlayCircle } from 'lucide-react';

const taskData = [
  { name: 'Completed', value: 45, color: '#10b981' },
  { name: 'In Progress', value: 25, color: '#3b82f6' },
  { name: 'Pending', value: 20, color: '#f59e0b' },
  { name: 'Overdue', value: 10, color: '#ef4444' },
];

export default function TaskOverview() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`col-span-1 rounded-xl border p-6 shadow-soft transition-all duration-300 hover:border-orange-400 hover:shadow-lg flex flex-col ${
      isDark ? 'bg-navy-card border-gray-700 text-white hover:border-orange-400' : 'bg-white border-gray-100 hover:border-orange-400'
    }`}>
      <h2 className={`font-semibold text-lg mb-6 ${isDark ? 'text-text-light' : 'text-gray-900'}`}>My Tasks Overview</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`p-4 flex flex-col items-center justify-center rounded-lg border ${
          isDark ? 'bg-navy-dark/40 border-gray-600' : 'bg-gray-50 border-gray-100'
        }`}>
          <CheckCircle2 className="w-5 h-5 mb-2" />
          <div className="text-xl font-bold ">24</div>
          <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Completed</div>
        </div>
        
        <div className={`p-4 flex flex-col items-center justify-center rounded-lg border ${
          isDark ? 'bg-navy-dark/40 border-gray-600' : 'bg-gray-50 border-gray-100'
        }`}>
          <PlayCircle className="w-5 h-5  mb-2" />
          <div className="text-xl font-bold ">12</div>
          <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>In Progress</div>
        </div>
        
        <div className={`p-4 flex flex-col items-center justify-center rounded-lg border ${
          isDark ? 'bg-navy-dark/40 border-gray-600' : 'bg-gray-50 border-gray-100'
        }`}>
          <Clock className="w-5 h-5 mb-2" />
          <div className="text-xl font-bold ">8</div>
          <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Pending</div>
        </div>

        <div className={`p-4 flex flex-col items-center justify-center rounded-lg border ${
          isDark ? 'bg-red-900/20 border-red-800/30' : 'bg-red-50 border-red-100'
        }`}>
          <AlertCircle className="w-5 h-5  mb-2" />
          <div className="text-xl font-bold ">3</div>
          <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Overdue</div>
        </div>
      </div>

      <div className="flex-1 min-h-[200px] flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={taskData}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {taskData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#1a2f4a' : '#ffffff',
                borderColor: isDark ? '#374151' : '#f3f4f6',
                color: isDark ? '#f3f4f6' : '#000000',
                borderRadius: '8px'
              }}
              itemStyle={{ color: isDark ? '#f3f4f6' : '#000000' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className={`text-2xl font-bold ${isDark ? 'text-text-light' : 'text-gray-900'}`}>47</span>
          <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Total Tasks</span>
        </div>
      </div>
      
      <button className={`w-full mt-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        isDark ? 'bg-navy-dark hover:bg-gray-700 text-cyan-primary' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
      }`}>
        View All Tasks
      </button>
    </div>
  );
}
