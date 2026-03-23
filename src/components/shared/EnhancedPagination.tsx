import React from 'react';
import { Select } from 'antd';
import Pagination from './Pagination';

interface EnhancedPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  onItemsPerPageChange: (itemsPerPage: number) => void;
  itemsPerPageOptions?: number[];
  showInfo?: boolean;
  className?: string;
  size?: 'small' | 'default' | 'large';
}

const EnhancedPagination: React.FC<EnhancedPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 20, 50, 100],
  showInfo = true,
  className = '',
  size = 'default'
}) => {
  const handleItemsPerPageChange = (value: number) => {
    onItemsPerPageChange(value);
    onPageChange(1); // Reset to first page when changing items per page
  };

  return (
    <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 ${className}`}>
      <div className="flex items-center gap-4 order-2 sm:order-1">
        {showInfo && (
          <span className="text-sm text-gray-600">
            Showing {((currentPage - 1) * itemsPerPage) + 1}-{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
          </span>
        )}
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Items per page:</span>
          <Select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            size={size === 'small' ? 'small' : size === 'large' ? 'large' : 'middle'}
            className="min-w-[80px]"
            options={itemsPerPageOptions.map(option => ({
              label: option.toString(),
              value: option
            }))}
          />
        </div>
      </div>
      
      <div className="order-1 sm:order-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          showInfo={false}
          size={size}
        />
      </div>
    </div>
  );
};

export default EnhancedPagination;
