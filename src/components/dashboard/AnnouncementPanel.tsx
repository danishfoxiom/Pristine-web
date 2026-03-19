import { useTheme } from '../../context/ThemeContext';
import { Megaphone, FileText, ShieldAlert } from 'lucide-react';

const announcements = [
  { id: 1, type: 'policy', title: 'Updated WFH Guidelines', date: 'Today, 09:00 AM', read: false },
  { id: 2, type: 'announcement', title: 'Q2 Town Hall Meeting', date: 'Yesterday, 02:30 PM', read: true },
  { id: 3, type: 'compliance', title: 'Mandatory Security Training', date: 'Oct 12, 10:00 AM', read: false },
  { id: 4, type: 'announcement', title: 'New Health Benefits Portal', date: 'Oct 10, 11:15 AM', read: true },
];

export default function AnnouncementPanel() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`col-span-1 rounded-xl border p-6 shadow-soft transition-all duration-300 hover:border-pink-400 hover:shadow-lg flex flex-col h-[400px] ${
      isDark ? 'bg-navy-card border-gray-700 text-white hover:border-pink-400' : 'bg-white border-gray-100 hover:border-pink-400'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`font-semibold text-lg ${isDark ? 'text-text-light' : 'text-gray-900'}`}>Announcements</h2>
        <span className="text-xs font-semibold px-2 py-1 rounded bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">2 Unread</span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
        {announcements.map((item) => {
          let Icon = Megaphone;
          let iconColor = 'text-blue-500';
          let iconBg = isDark ? 'bg-blue-900/40' : 'bg-blue-50';

          if (item.type === 'policy') {
            Icon = FileText;
            iconColor = 'text-purple-500';
            iconBg = isDark ? 'bg-purple-900/40' : 'bg-purple-50';
          } else if (item.type === 'compliance') {
            Icon = ShieldAlert;
            iconColor = 'text-red-500';
            iconBg = isDark ? 'bg-red-900/40' : 'bg-red-50';
          }

          return (
            <div key={item.id} className={`flex gap-3 p-3 rounded-lg transition-colors border ${
              !item.read 
                ? isDark ? 'bg-gray-800/60 border-gray-600' : 'bg-blue-50/50 border-blue-100'
                : isDark ? 'bg-navy-dark border-gray-700' : 'bg-white border-gray-100'
            }`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${iconBg}`}>
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-medium text-sm truncate pr-2 ${
                    isDark ? 'text-gray-200' : 'text-gray-900'
                  } ${!item.read ? 'font-semibold' : ''}`}>{item.title}</h3>
                  {!item.read && <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />}
                </div>
                <div className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{item.date}</div>
              </div>
            </div>
          );
        })}
      </div>
      
      <button className={`w-full mt-4 py-2 text-sm font-medium rounded-lg transition-colors border ${
        isDark ? 'border-gray-700 text-gray-300 hover:bg-gray-800' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
      }`}>
        View All Updates
      </button>
    </div>
  );
}
