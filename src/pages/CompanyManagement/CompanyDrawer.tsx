import React from 'react';
import { X, Building2, Mail, Phone, MapPin, Calendar, CheckCircle } from 'lucide-react';

interface Company {
  company_id: number;
  company_name: string;
  company_code: string;
  logo: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  created_at: string;
}

interface CompanyDrawerProps {
  isOpen: boolean;
  company: Company | null;
  onClose: () => void;
}

export function CompanyDrawer({ isOpen, company, onClose }: CompanyDrawerProps) {
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
      <CheckCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
    );
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-[450px] bg-white dark:bg-slate-800 shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">View Details</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">{company?.company_name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {company && (
          <div className="p-6 overflow-y-auto flex-1">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={company.logo}
                alt={`${company.company_name} Logo`}
                className="w-16 h-16 rounded-lg object-cover border border-slate-200 dark:border-slate-700"
              />
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{company.company_name}</h3>
                <p className="text-slate-500 dark:text-slate-400">Code: {company.company_code}</p>
                <div className="flex items-center gap-2 mt-2">
                  {getStatusIcon(company.status)}
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(company.status)}`}>
                    {company.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <Building2 className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Company ID</p>
                    <p className="text-sm text-slate-900 dark:text-slate-100">#{company.company_id}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</p>
                    <p className="text-sm text-slate-900 dark:text-slate-100">{company.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <Phone className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phone</p>
                    <p className="text-sm text-slate-900 dark:text-slate-100">{company.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                  <div className="flex-grow">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Address</p>
                    <p className="text-sm text-slate-900 dark:text-slate-100">{company.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <div>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Created Date</p>
                    <p className="text-sm text-slate-900 dark:text-slate-100">{company.created_at}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CompanyDrawer;