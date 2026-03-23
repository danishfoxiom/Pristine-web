import React from 'react';
import { Button } from 'antd';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
  showInfo?: boolean;
  className?: string;
  size?: 'small' | 'default' | 'large';
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage = 10,
  showInfo = true,
  className = '',
  size = 'default'
}) => {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const maxVisible = size === 'small' ? 3 : size === 'large' ? 7 : 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxVisible / 2);
      let start = Math.max(1, currentPage - half);
      let end = Math.min(totalPages, start + maxVisible - 1);
      
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push('...');
        }
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case 'small': return 'small';
      case 'large': return 'large';
      default: return 'middle';
    }
  };

  if (totalPages <= 1) {
    return showInfo && totalItems ? (
      <div className={`flex justify-between items-center ${className}`}>
        <span className="text-sm text-gray-600">
          Showing {totalItems} items
        </span>
      </div>
    ) : null;
  }

  const visiblePages = getVisiblePages();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems || 0);

  return (
    <div className={`flex flex-col sm:flex-row justify-between items-center gap-4 ${className}`}>
      {showInfo && totalItems && (
        <div className="text-sm text-gray-600 order-2 sm:order-1">
          Showing {startItem}-{endItem} of {totalItems} items
        </div>
      )}
      
      <div className="flex items-center gap-1 order-1 sm:order-2">
        <Button
          size={getButtonSize()}
          icon={<ChevronLeft size={16} />}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center"
        >
          <span className="hidden sm:inline ml-1">Previous</span>
        </Button>
        
        <div className="flex items-center gap-1">
          {visiblePages.map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="px-2 text-gray-500">
                ...
              </span>
            ) : (
              <Button
                key={page}
                size={getButtonSize()}
                type={currentPage === page ? 'primary' : 'default'}
                onClick={() => handlePageChange(page as number)}
                className={`min-w-[40px] ${
                  currentPage === page 
                    ? 'bg-blue-600 border-blue-600 hover:bg-blue-700' 
                    : 'hover:bg-[#102257] hover:text-white'
                }`}
              >
                {page}
              </Button>
            )
          ))}
        </div>
        
        <Button
          size={getButtonSize()}
          icon={<ChevronRight size={16} />}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center"
        >
          <span className="hidden sm:inline mr-1">Next</span>
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
