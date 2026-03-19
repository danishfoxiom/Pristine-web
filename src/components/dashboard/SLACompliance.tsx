import { useTheme } from '../../context/ThemeContext';
import { ShieldAlert, AlertCircle, Clock, FileWarning } from 'lucide-react';

export default function SLACompliance() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Heatmap generation: 7 weeks x 7 days
  const heatmapData = Array.from({ length: 49 }, () => Math.floor(Math.random() * 100));

  const getHeatmapColor = (value: number) => {
    if (value > 90) return isDark ? 'bg-emerald-500' : 'bg-emerald-500';
    if (value > 70) return isDark ? 'bg-yellow-500' : 'bg-yellow-400';
    if (value > 40) return isDark ? 'bg-orange-500' : 'bg-orange-400';
    return isDark ? 'bg-red-500' : 'bg-red-500';
  };

  return (
    <div className={`col-span-1 lg:col-span-2 rounded-xl border p-6 shadow-soft transition-all duration-300 hover:border-red-400 hover:shadow-lg ${
      isDark ? 'bg-navy-card border-gray-700 text-white hover:border-red-400' : 'bg-white border-gray-100 hover:border-red-400'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`font-semibold text-lg ${isDark ? 'text-text-light' : 'text-gray-900'}`}>SLA & Compliance Monitoring</h2>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Violation</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center ${
          isDark ? 'bg-navy-dark border-gray-700' : 'bg-red-50/50 border-red-100'
        }`}>
          <ShieldAlert className={`w-6 h-6 mb-2 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
          <div className={`text-2xl font-bold ${isDark ? 'text-text-light' : 'text-red-700'}`}>14</div>
          <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-red-600/80'}`}>SLA Violations</div>
        </div>
        
        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center ${
          isDark ? 'bg-navy-dark border-gray-700' : 'bg-orange-50/50 border-orange-100'
        }`}>
          <Clock className={`w-6 h-6 mb-2 ${isDark ? 'text-orange-400' : 'text-orange-500'}`} />
          <div className={`text-2xl font-bold ${isDark ? 'text-text-light' : 'text-orange-700'}`}>86</div>
          <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-orange-600/80'}`}>Delayed Responses</div>
        </div>

        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center ${
          isDark ? 'bg-navy-dark border-gray-700' : 'bg-yellow-50/50 border-yellow-100'
        }`}>
          <AlertCircle className={`w-6 h-6 mb-2 ${isDark ? 'text-yellow-400' : 'text-yellow-500'}`} />
          <div className={`text-2xl font-bold ${isDark ? 'text-text-light' : 'text-yellow-700'}`}>24</div>
          <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-yellow-600/80'}`}>Escalations</div>
        </div>

        <div className={`p-4 rounded-xl border flex flex-col items-center justify-center text-center ${
          isDark ? 'bg-navy-dark border-gray-700' : 'bg-purple-50/50 border-purple-100'
        }`}>
          <FileWarning className={`w-6 h-6 mb-2 ${isDark ? 'text-purple-400' : 'text-purple-500'}`} />
          <div className={`text-2xl font-bold ${isDark ? 'text-text-light' : 'text-purple-700'}`}>8</div>
          <div className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-purple-600/80'}`}>Compliance Notices</div>
        </div>
      </div>

      <div>
        <h3 className={`text-sm font-medium mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>7-Week Compliance Health Heatmap</h3>
        <div className="grid grid-cols-7 gap-1.5 md:gap-3">
          {heatmapData.map((val, idx) => (
            <div 
              key={idx} 
              className={`aspect-square rounded-md lg:rounded-lg opacity-80 hover:opacity-100 transition-opacity cursor-pointer ${getHeatmapColor(val)}`}
              title={`Compliance Score: ${val}%`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-3 px-1 text-[10px] md:text-sm text-gray-500 font-medium">
          <span>7 Weeks Ago</span>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
}
