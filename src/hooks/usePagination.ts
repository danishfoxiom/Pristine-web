import { useState, useCallback, useMemo } from 'react';

interface UsePaginationProps {
  totalItems: number;
  initialPage?: number;
  initialItemsPerPage?: number;
  itemsPerPageOptions?: number[];
}

interface UsePaginationReturn {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  paginatedData: <T>(data: T[]) => T[];
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (itemsPerPage: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export const usePagination = ({
  totalItems,
  initialPage = 1,
  initialItemsPerPage = 10,
  itemsPerPageOptions = [10, 20, 50, 100]
}: UsePaginationProps): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage) || 1;
  }, [totalItems, itemsPerPage]);

  const startIndex = useMemo(() => {
    return (currentPage - 1) * itemsPerPage;
  }, [currentPage, itemsPerPage]);

  const endIndex = useMemo(() => {
    return Math.min(startIndex + itemsPerPage, totalItems);
  }, [startIndex, itemsPerPage, totalItems]);

  const paginatedData = useCallback(<T>(data: T[]): T[] => {
    return data.slice(startIndex, endIndex);
  }, [startIndex, endIndex]);

  const setCurrentPageSafe = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const setItemsPerPageSafe = useCallback((newItemsPerPage: number) => {
    if (itemsPerPageOptions.includes(newItemsPerPage)) {
      setItemsPerPage(newItemsPerPage);
      setCurrentPage(1); // Reset to first page when changing items per page
    }
  }, [itemsPerPageOptions]);

  const goToNextPage = useCallback(() => {
    setCurrentPageSafe(currentPage + 1);
  }, [currentPage, setCurrentPageSafe]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPageSafe(currentPage - 1);
  }, [setCurrentPageSafe]);

  const goToFirstPage = useCallback(() => {
    setCurrentPageSafe(1);
  }, [setCurrentPageSafe]);

  const goToLastPage = useCallback(() => {
    setCurrentPageSafe(totalPages);
  }, [setCurrentPageSafe, totalPages]);

  const canGoNext = currentPage < totalPages;
  const canGoPrevious = currentPage > 1;

  // Reset current page if it's out of bounds when total items or items per page changes
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPageSafe(totalPages);
  }

  return {
    currentPage,
    itemsPerPage,
    totalPages,
    startIndex,
    endIndex,
    paginatedData,
    setCurrentPage: setCurrentPageSafe,
    setItemsPerPage: setItemsPerPageSafe,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    canGoNext,
    canGoPrevious,
  };
};

export default usePagination;
