import { Building2, CheckCircle, XCircle } from 'lucide-react';
import { CalendarOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

interface Designation {
  designation_id: number;
  designation_name: string;
  designation_code: string;
  department_name: string;
  email: string;
  phone: string;
  description: string;
  status: string;
  created_at: string;
  level: string;
}

interface DesignationViewProps {
  designation: Designation;
  onClose: () => void;
  isOpen: boolean;
}

export function DesignationView({ designation, onClose, isOpen }: DesignationViewProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-500/20';
      case 'Inactive':
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-500/20';
      default:
        return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-500/20';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'Active' ? (
      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
    ) : (
      <XCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Designation Details
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            ✕
          </button>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center border-2 border-slate-200 dark:border-slate-700">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{designation.designation_name.charAt(0)}</span>
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{designation.designation_name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Designation Code: {designation.designation_code}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Department: {designation.department_name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Level: {designation.level}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(designation.status)}
                  <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(designation.status)}`}>
                    {designation.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Contact Information
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg">
                  <MailOutlined  className="w-5 h-5 " />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Email</p>
                  <p className="text-sm text-slate-900 dark:text-slate-100 break-all">{designation.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 ">
                  <PhoneOutlined  className="w-4 h-4 " />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Phone</p>
                  <p className="text-sm text-slate-900 dark:text-slate-100">{designation.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 ">
                  <EnvironmentOutlined className="w-4 h-4 " />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Description</p>
                  <p className="text-sm text-slate-900 dark:text-slate-100">{designation.description}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/30 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Designation Details
            </h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 ">
                  <Building2 className="w-4 h-4 " />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Designation ID</p>
                  <p className="text-sm text-slate-900 dark:text-slate-100">#{designation.designation_id}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 ">
                  <CalendarOutlined  className="w-4 h-4 " />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Created Date</p>
                  <p className="text-sm text-slate-900 dark:text-slate-100">{designation.created_at}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 ">
                  <CheckCircle className="w-4 h-4 " />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Status</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(designation.status)}`}>
                    {designation.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignationView;