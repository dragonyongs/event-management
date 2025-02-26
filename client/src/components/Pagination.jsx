import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    return (
        <div className="flex items-center justify-center gap-4 mt-4">
            <button
                onClick={() => handlePageChange('prev')}
                disabled={currentPage === 1}
                className="p-2 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50 transition"
            >
                <FiChevronLeft />
            </button>
            <span className="text-sm text-gray-600">
                {currentPage} / {totalPages}
            </span>
            <button
                onClick={() => handlePageChange('next')}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 disabled:opacity-50 transition"
            >
                <FiChevronRight />
            </button>
        </div>
    );
};

export default Pagination;