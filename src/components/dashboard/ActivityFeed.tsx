import { useTheme } from '../../context/ThemeContext';
import { CheckCircle, MessageSquare, PlusSquare, FileText } from 'lucide-react';

const activities = [
  { id: 1, user: 'Sarah Smith', action: 'created a new task', target: 'Update Q3 Marketing Deck', time: '10 mins ago', type: 'task' },
  { id: 2, user: 'Robert Chen', action: 'requested approval for', target: 'Cloud Setup Invoice', time: '1 hour ago', type: 'approval' },
  { id: 3, user: 'Alice Walker', action: 'updated project stage', target: 'Nova Enterprise Migration', time: '2 hours ago', type: 'project' },
  { id: 4, user: 'System', action: 'posted a new announcement', target: 'WFH Guidelines', time: '5 hours ago', type: 'announcement' },
  { id: 5, user: 'John Doe', action: 'completed task', target: 'Database Backup', time: 'Yesterday', type: 'task' },
];

export default function ActivityFeed() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`col-span-1 rounded-xl border p-6 shadow-soft transition-all duration-300 hover:border-cyan-400 hover:shadow-lg flex flex-col ${
      isDark ? 'bg-navy-card border-gray-700 text-white hover:border-cyan-primary' : 'bg-white border-gray-100 hover:border-cyan-400'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`font-semibold text-lg ${isDark ? 'text-text-light' : 'text-gray-900'}`}>Recent Activity</h2>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div className="relative border-l-2 ml-4 space-y-6 pb-2 border-gray-200 dark:border-gray-600">
          {activities.map((item) => {
            let Icon = MessageSquare;
            let iconBg = 'bg-gray-100';
            let iconColor = 'text-gray-600';
            
            if (item.type === 'task') {
              Icon = PlusSquare;
              iconBg = 'bg-blue-100';
              iconColor = 'text-blue-600';
            } else if (item.type === 'approval') {
              Icon = CheckCircle;
              iconBg = 'bg-emerald-100';
              iconColor = 'text-emerald-600';
            } else if (item.type === 'project') {
              Icon = FileText;
              iconBg = 'bg-purple-100';
              iconColor = 'text-purple-600';
            } else if (item.type === 'announcement') {
              Icon = MessageSquare;
              iconBg = 'bg-orange-100';
              iconColor = 'text-orange-600';
            }

            return (
              <div key={item.id} className="relative pl-6">
                <span className={`absolute -left-3.5 top-1 p-1.5 rounded-full ring-4 ring-white dark:ring-navy-card ${iconBg} ${iconColor}`}>
                  <Icon className="w-3.5 h-3.5" />
                </span>
                <div>
                  <div className="text-sm">
                    <span className={`font-semibold ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{item.user}</span>
                    <span className={`mx-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.action}</span>
                    <span className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-800'}`}>{item.target}</span>
                  </div>
                  <div className={`mt-1 text-xs font-medium ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    {item.time}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
