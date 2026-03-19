import { useTheme } from '../../context/ThemeContext';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Clock, UserX, Target } from 'lucide-react';

const attendanceData = [
  { time: '08:00', present: 100, late: 0, absent: 50 },
  { time: '08:30', present: 250, late: 20, absent: 50 },
  { time: '09:00', present: 800, late: 80, absent: 40 },
  { time: '09:30', present: 1200, late: 150, absent: 20 },
  { time: '10:00', present: 1350, late: 210, absent: 15 },
  { time: '10:30', present: 1420, late: 230, absent: 12 },
];

export default function AttendanceDashboard() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`col-span-1 rounded-xl border p-6 shadow-soft transition-all duration-300 hover:border-emerald-400 hover:shadow-lg ${
      isDark ? 'bg-navy-card border-gray-700 text-white hover:border-emerald-400' : 'bg-white border-gray-100 hover:border-emerald-400'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`font-semibold text-lg ${isDark ? 'text-text-light' : 'text-gray-900'}`}>Workforce Attendance</h2>
        <span className="text-sm font-bold text-emerald-500">96.4% Today</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`p-4 rounded-lg flex flex-col items-start ${isDark ? 'bg-emerald-900/10' : 'bg-emerald-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Users className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
            <span className={`text-xs font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>Present</span>
          </div>
          <div className={`text-2xl font-bold ${isDark ? 'text-text-light' : 'text-gray-900'}`}>1,420</div>
        </div>

        <div className={`p-4 rounded-lg flex flex-col items-start ${isDark ? 'bg-orange-900/10' : 'bg-orange-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Clock className={`w-4 h-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
            <span className={`text-xs font-semibold ${isDark ? 'text-orange-400' : 'text-orange-700'}`}>Late Entries</span>
          </div>
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>230</div>
        </div>

        <div className={`p-4 rounded-lg flex flex-col items-start ${isDark ? 'bg-red-900/10' : 'bg-red-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <UserX className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
            <span className={`text-xs font-semibold ${isDark ? 'text-red-400' : 'text-red-700'}`}>Absentees</span>
          </div>
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>12</div>
        </div>

        <div className={`p-4 rounded-lg flex flex-col items-start ${isDark ? 'bg-blue-900/10' : 'bg-blue-50'}`}>
          <div className="flex items-center gap-2 mb-2">
            <Target className={`w-4 h-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
            <span className={`text-xs font-semibold ${isDark ? 'text-blue-400' : 'text-blue-700'}`}>On-Time Rate</span>
          </div>
          <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>83%</div>
        </div>
      </div>

      <div className="h-[200px] w-full mt-4 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={attendanceData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke={isDark ? '#4b5563' : '#9ca3af'} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke={isDark ? '#4b5563' : '#9ca3af'} fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#112A52' : '#ffffff',
                borderColor: isDark ? '#1f2937' : '#f3f4f6',
                color: isDark ? '#fff' : '#000',
                borderRadius: '8px'
              }} 
            />
            <Area type="monotone" dataKey="present" stroke="#10b981" fillOpacity={1} fill="url(#colorPresent)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
