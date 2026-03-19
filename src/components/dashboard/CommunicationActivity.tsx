import { useTheme } from '../../context/ThemeContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { MessageSquare, AlertTriangle, ShieldCheck, Bell } from 'lucide-react';

const commsData = [
  { name: 'Mon', tasks: 120, approvals: 45, reminders: 60, escalations: 12 },
  { name: 'Tue', tasks: 132, approvals: 54, reminders: 45, escalations: 8 },
  { name: 'Wed', tasks: 101, approvals: 62, reminders: 30, escalations: 15 },
  { name: 'Thu', tasks: 134, approvals: 40, reminders: 70, escalations: 5 },
  { name: 'Fri', tasks: 90, approvals: 80, reminders: 40, escalations: 20 },
];

export default function CommunicationActivity() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`col-span-1 rounded-xl border p-6 shadow-soft transition-all duration-300 hover:border-teal-400 hover:shadow-lg ${
      isDark ? 'bg-navy-card border-gray-700 text-white hover:border-teal-400' : 'bg-white border-gray-100 hover:border-teal-400'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`font-semibold text-lg ${isDark ? 'text-text-light' : 'text-gray-900'}`}>Communication Activity</h2>
        <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-cyan-primary">Today</span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-cyan-primary">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Task Msgs</div>
            <div className={`text-lg font-bold ${isDark ? 'text-text-light' : 'text-gray-900'}`}>548</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Approvals</div>
            <div className={`text-lg font-bold ${isDark ? 'text-text-light' : 'text-gray-900'}`}>182</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Reminders</div>
            <div className={`text-lg font-bold ${isDark ? 'text-text-light' : 'text-gray-900'}`}>246</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Escalations</div>
            <div className={`text-lg font-bold ${isDark ? 'text-text-light' : 'text-gray-900'}`}>43</div>
          </div>
        </div>
      </div>

      <div className="h-[220px] w-full min-h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={commsData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#374151' : '#e5e7eb'} />
            <XAxis dataKey="name" stroke={isDark ? '#4b5563' : '#9ca3af'} fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke={isDark ? '#4b5563' : '#9ca3af'} fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{ fill: isDark ? '#1f2937' : '#f3f4f6' }}
              contentStyle={{ 
                backgroundColor: isDark ? '#112A52' : '#ffffff',
                borderColor: isDark ? '#1f2937' : '#f3f4f6',
                color: isDark ? '#fff' : '#000',
                borderRadius: '8px'
              }} 
            />
            <Bar dataKey="tasks" stackId="a" fill="#3b82f6" radius={[0, 0, 4, 4]} />
            <Bar dataKey="approvals" stackId="a" fill="#10b981" />
            <Bar dataKey="reminders" stackId="a" fill="#f59e0b" />
            <Bar dataKey="escalations" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
