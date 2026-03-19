import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface CommonSelectOption {
  label: string;
  value: string;
}

export interface CommonSelectProps {
  value?: string;
  onChange?: (value: string) => void;
  options: CommonSelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
}

export default function CommonSelect({
  value = '',
  onChange,
  options,
  placeholder = 'Select an option...',
  className = '',
  disabled = false,
  id,
  name,
}: CommonSelectProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={`relative ${className}`}>
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className="w-full pl-3 pr-10 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-300 dark:hover:border-slate-500 appearance-none cursor-pointer"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            {option.label}
          </option>
        ))}
      </select>
      
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
}
