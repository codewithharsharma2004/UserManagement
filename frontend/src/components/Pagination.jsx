import "./Pagination.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage < maxVisible - 1) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        Previous
      </button>

      <div className="pagination-pages">
        {currentPage > 3 && (
          <>
            <button className="pagination-page" onClick={() => handlePageClick(1)}>
              1
            </button>
            {currentPage > 4 && <span className="pagination-ellipsis">...</span>}
          </>
        )}

        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`pagination-page ${page === currentPage ? "active" : ""}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}

        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && <span className="pagination-ellipsis">...</span>}
            <button className="pagination-page" onClick={() => handlePageClick(totalPages)}>
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        className="pagination-btn"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
}