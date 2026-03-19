import React from 'react';
import { X } from 'lucide-react';

export interface CommonInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: 'text' | 'search' | 'email' | 'password';
  className?: string;
  icon?: React.ReactNode;
  showClearButton?: boolean;
  onClear?: () => void;
  disabled?: boolean;
  id?: string;
  name?: string;
  autoComplete?: string;
  required?: boolean;
}

export default function CommonInput({
  placeholder = 'Enter text...',
  value = '',
  onChange,
  type = 'text',
  className = '',
  icon,
  showClearButton = false,
  onClear,
  disabled = false,
  id,
  name,
  autoComplete = 'off',
  required = false,
}: CommonInputProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleClear = () => {
    onClear?.();
  };

  return (
    <div className={`relative ${className}`}>
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          {icon}
        </div>
      )}
      
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        autoComplete={autoComplete}
        required={required}
        className={`w-full py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 disabled:opacity-50 disabled:cursor-not-allowed ${
          icon ? 'pl-9' : 'pl-3'
        } ${showClearButton ? 'pr-10' : 'pr-3'} bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg hover:border-slate-300 dark:hover:border-slate-500`}
      />
      
      {showClearButton && value && !disabled && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          title="Clear input"
          type="button"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
