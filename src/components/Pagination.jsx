// src/components/Pagination.jsx

export default function Pagination({ page, pageCount, onPageChange, totalRecords }) {
  const pageSize = 5;
  const startRecord = (page - 1) * pageSize + 1;
  const endRecord = Math.min(page * pageSize, totalRecords);

  return (
    <div className="pagination-wrapper">
      {/* LEFT: Records info */}
      <div className="records-info">
        Showing {startRecord} to {endRecord} of {totalRecords} entries
      </div>
      
      {/* RIGHT: Pagination buttons */}
      <div className="pagination-buttons">
        <button
          className="page-btn prev"
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>
        
        <span className="page-info">
          Page {page} of {pageCount}
        </span>
        
        <button
          className="page-btn next"
          disabled={page === pageCount}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

