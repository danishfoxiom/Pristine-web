import React from 'react';
import { Filter, Search } from 'lucide-react';
import CommonInput from './CommonInput';
import CommonSelect from './CommonSelect';

export interface PageHeaderButton {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showFilter?: boolean;
  onFilterClick?: () => void;
  buttons?: PageHeaderButton[];
  className?: string;
  showStatusSelector?: boolean;
  statusValue?: string;
  onStatusChange?: (value: string) => void;
  statusOptions?: { label: string; value: string }[];
}

export default function PageHeader({
  title,
  description,
  searchPlaceholder = 'Search...',
  searchValue = '',
  onSearchChange,
  showFilter = false,
  onFilterClick,
  buttons = [],
  className = '',
  showStatusSelector = false,
  statusValue = '',
  onStatusChange,
  statusOptions = [],
}: PageHeaderProps) {
  return (
    <div className={`h-[100px] bg-white dark:bg-navy-dark border border-slate-200 dark:border-slate-700 rounded-[20px] mb-6 p-6 flex items-center justify-between shadow-sm hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md transition-all duration-300 ease-in-out ${className}`}>
      <div className="flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h1>
        {description && (
          <p className="text-slate-500 dark:text-gray-400 mt-1">{description}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {onSearchChange && (
          <CommonInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={onSearchChange}
            type="search"
            className="w-80"
            icon={<Search className="w-4 h-4" />}
            showClearButton={true}
            onClear={() => onSearchChange('')}
          />
        )}

        {showFilter && onFilterClick && (
          <button 
            onClick={onFilterClick}
            className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-sm"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        )}

        {showStatusSelector && (
          <CommonSelect
            value={statusValue}
            onChange={onStatusChange}
            options={statusOptions}
            placeholder="Select Status"
            className="w-40"
          />
        )}

        {buttons.map((button, index) => (
          <button
            key={index}
            onClick={button.onClick}
            disabled={button.disabled}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
              button.variant === 'primary'
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                : 'bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-slate-600'
            } ${button.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {button.icon}
            <span>{button.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
