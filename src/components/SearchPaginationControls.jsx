// src/components/SearchPaginationControls.jsx
import SearchInput from "./SearchInput";
import Pagination from "./Pagination";

export default function SearchPaginationControls({
  searchText,
  onSearchChange,
  page,
  pageCount,
  onPageChange,
  totalRecords
}) {
  return (
    <div className="search-pagination-controls">
      <SearchInput
        value={searchText}
        onChange={onSearchChange}
        placeholder="Search for..."
      />
      
      {pageCount > 1 && (
        <Pagination
          page={page}
          pageCount={pageCount}
          onPageChange={onPageChange}
          totalRecords={totalRecords}
        />
      )}
    </div>
  );
}
