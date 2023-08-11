import React from "react";

function PaginationButtons({
    currentPage,
    totalPages,
    handlePageChange,
    visiblePages,
}) {
    return (
        <div className="flex justify-center mt-4">
            {/* Previous Page button */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={`px-4 py-2 mr-2 border rounded ${
                    currentPage === 1
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-200"
                }`}
                disabled={currentPage === 1}
            >
                Previous Page
            </button>

            {/* Display visible page numbers */}
            {visiblePages.map((pageNumber, index) => (
                <React.Fragment key={index}>
                    {/* Show ellipsis for gaps between page numbers */}
                    {index > 0 &&
                        pageNumber !== visiblePages[index - 1] + 1 && (
                            <span className="px-3 py-2">...</span>
                        )}

                    {/* Page number button */}
                    <button
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-3 py-2 border rounded ${
                            currentPage === pageNumber
                                ? "bg-gray-200"
                                : "hover:bg-gray-200"
                        }`}
                    >
                        {pageNumber}
                    </button>
                </React.Fragment>
            ))}

            {/* Next Page button */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`px-4 py-2 ml-2 border rounded ${
                    currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-200"
                }`}
                disabled={currentPage === totalPages}
            >
                Next Page
            </button>
        </div>
    );
}

export default PaginationButtons;
