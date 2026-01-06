
import ExportButton from "./ExportButton";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import SearchInput from "./SearchInput";


const columns = [
  { key: "serialNo", label: "S. No", width: "80px" },
  { key: "fpoMentorName", label: "FPO Mentor Name", width: "200px" },
  { key: "mobileNumber", label: "Mobile Number", width: "140px" },
  { key: "email", label: "Email ID", width: "220px" },
  { key: "createdOn", label: "Created On", width: "120px" },
];

export default function MentorTable({
  data,
  filteredData,
  searchText,
  onSearchChange,
  page,
  pageCount,
  onPageChange,
  totalRecords
}) {
  return (
    <div className="mentor-table">
	{/* TOP HEADER: Export LEFT + Search RIGHT - SAME ROW */}
      <div className="table-header">
        <div className="header-left">
          <ExportButton data={filteredData} filename="member-details" />
        </div>
        <div className="header-right">
          <SearchInput
            value={searchText}
            onChange={onSearchChange}
            placeholder="Search for..."
          />
        </div>
      </div>
      
      {/* TABLE */}
      <DataTable data={data} columns={columns} />
      
      {/* BOTTOM PAGINATION - FULL WIDTH */}
      {pageCount > 1 && (
        <div className="table-footer">
          <Pagination
            page={page}
            pageCount={pageCount}
            onPageChange={onPageChange}
            totalRecords={totalRecords}
          />
        </div>
      )}
    </div>
  );
}
