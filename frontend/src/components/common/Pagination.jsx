import React, { useMemo } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = useMemo(() => {
        const pageNumbers = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            // Show all pages if total pages is less than max visible pages
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Show first page
            pageNumbers.push(1);
            
            // Calculate start and end of visible pages
            let start = Math.max(currentPage - 1, 2);
            let end = Math.min(currentPage + 1, totalPages - 1);
            
            // Adjust if we're near the start or end
            if (currentPage <= 2) {
                end = 4;
            }
            if (currentPage >= totalPages - 1) {
                start = totalPages - 3;
            }
            
            // Add ellipsis if needed
            if (start > 2) {
                pageNumbers.push('...');
            }
            
            // Add middle pages
            for (let i = start; i <= end; i++) {
                pageNumbers.push(i);
            }
            
            // Add ellipsis if needed
            if (end < totalPages - 1) {
                pageNumbers.push('...');
            }
            
            // Show last page
            pageNumbers.push(totalPages);
        }
        
        return pageNumbers;
    }, [currentPage, totalPages]);

    return (
        <nav className="flex items-center justify-center">
            <ul className="flex items-center space-x-1">
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`
                            p-2 rounded-md
                            ${currentPage === 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-500 hover:bg-gray-100'
                            }
                        `}
                    >
                        <FaChevronLeft className="h-5 w-5" />
                    </button>
                </li>
                
                {pages.map((page, index) => (
                    <li key={index}>
                        {page === '...' ? (
                            <span className="px-4 py-2 text-gray-500">...</span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page)}
                                className={`
                                    px-4 py-2 rounded-md
                                    ${currentPage === page
                                        ? 'bg-primary-600 text-white'
                                        : 'text-gray-500 hover:bg-gray-100'
                                    }
                                `}
                            >
                                {page}
                            </button>
                        )}
                    </li>
                ))}
                
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`
                            p-2 rounded-md
                            ${currentPage === totalPages
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-500 hover:bg-gray-100'
                            }
                        `}
                    >
                        <FaChevronRight className="h-5 w-5" />
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default React.memo(Pagination); 