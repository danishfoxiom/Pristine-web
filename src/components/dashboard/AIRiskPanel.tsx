import { useTheme } from '../../context/ThemeContext';
import { BrainCircuit, AlertTriangle, UserX, Clock, ShieldAlert } from 'lucide-react';

const aiAlerts = [
  {
    id: 1,
    title: 'Project Delay Risk',
    description: 'Cloud Native DB Refactor has a 78% probability of missing the May 20th deadline based on current velocity.',
    icon: AlertTriangle,
    // color: 'text-amber-500',
    bg: 'bg-amber-500/10'
  },
  {
    id: 2,
    title: 'Task Overload',
    description: 'Frontend Team is operating at 125% capacity. Risk of burnout and quality degradation.',
    icon: UserX,
    // color: 'text-rose-500',
    bg: 'bg-rose-500/10'
  },
  {
    id: 3,
    title: 'Communication Bottleneck',
    description: 'Approval responses from Finance Dept have slowed by 40% this week. Expect SLA violations.',
    icon: Clock,
    // color: 'text-orange-500',
    bg: 'bg-orange-500/10'
  },

];

export default function AIRiskPanel() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`col-span-1 border rounded-xl p-6 shadow-soft transition-colors flex flex-col ${
      isDark ? 'bg-navy-card border-gray-700 text-white' : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-cyan-500" />
          <h2 className={`font-semibold text-lg ${isDark ? 'text-text-light' : 'text-gray-900'}`}>AI Risk Intelligence</h2>
        </div>
        <span className="flex w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse"></span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 custom-scrollbar pr-2">
        {aiAlerts.map(alert => {
          const Icon = alert.icon;
          return (
            <div 
              key={alert.id} 
              className={`p-4 rounded-xl border flex gap-4 transition-all hover:-translate-y-0.5 ${
                isDark ? 'bg-navy-dark border-gray-700 hover:border-gray-600' : 'bg-gray-50 border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-1 ${alert.bg} ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className={`font-semibold text-sm mb-1 ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{alert.title}</h3>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{alert.description}</p>
                <div className="mt-3 flex gap-2">
                  <button className="text-xs font-medium text-blue-600 dark:text-cyan-primary hover:underline">Take Action</button>
                  <button className={`text-xs font-medium hover:underline ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>Dismiss</button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
