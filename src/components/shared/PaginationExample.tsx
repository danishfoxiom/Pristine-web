import React from 'react';
import Pagination from './Pagination';
import EnhancedPagination from './EnhancedPagination';

interface PaginationExampleProps {
  type?: 'simple' | 'enhanced';
}

const PaginationExample: React.FC<PaginationExampleProps> = ({ type = 'simple' }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const totalItems = 156;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (type === 'enhanced') {
    return (
      <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Enhanced Pagination Example</h3>
        <p className="text-gray-600 mb-6">
          This pagination includes items per page selector and detailed information.
        </p>
        
        <EnhancedPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={setItemsPerPage}
          itemsPerPageOptions={[5, 10, 20, 50]}
        />
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold mb-4">Simple Pagination Example</h3>
      <p className="text-gray-600 mb-6">
        This is a basic pagination component with page numbers and navigation.
      </p>
      
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        showInfo={true}
      />
    </div>
  );
};

export default PaginationExample;
