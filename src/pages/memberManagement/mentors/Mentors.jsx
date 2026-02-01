
import React, { useEffect, useState } from "react";
import MentorTable from "../../../components/MentorTable";
import "./Mentors.css";
import "./MentorTable.css";
import "./TableComponents.css";

const sampleData = [
  { id: 1, serialNo: 1, fpoMentorName: "John Doe", mobileNumber: "9876543210", email: "john@example.com", createdOn: "2025-01-01" },
  { id: 2, serialNo: 2, fpoMentorName: "Jane Smith", mobileNumber: "9876543211", email: "jane@example.com", createdOn: "2026-01-02" },
  { id: 3, serialNo: 3, fpoMentorName: "Bob Johnson", mobileNumber: "9876543212", email: "bob@example.com", createdOn: "2026-01-03" },
  { id: 4, serialNo: 4, fpoMentorName: "Alice Brown", mobileNumber: "9876543213", email: "alice@example.com", createdOn: "2026-01-04" },
  { id: 5, serialNo: 5, fpoMentorName: "Charlie Wilson", mobileNumber: "9876543214", email: "charlie@example.com", createdOn: "2026-01-05" },
  { id: 6, serialNo: 6, fpoMentorName: "Donald Wilson", mobileNumber: "9876123450", email: "donald@example.com", createdOn: "2026-01-05" },
];

export const Mentors = () => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return sampleData;
    const term = searchText.toLowerCase();
    return sampleData.filter(row =>
      row.fpoMentorName.toLowerCase().includes(term) ||
      row.mobileNumber.includes(term) ||
      row.email.toLowerCase().includes(term)
    );
  }, [searchText, sampleData]);

  const pageCount = Math.ceil(filteredData.length / pageSize);
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="member-details-page">
      <div className="page-header">
        <h2 className="text-base font-bold mb-4">FPO Mentor Detail</h2>
      </div>

      <div className="table-container p-6">
        <MentorTable
          data={paginatedData}
          filteredData={filteredData}
          searchText={searchText}
          onSearchChange={setSearchText}
          page={page}
          pageCount={pageCount}
          onPageChange={setPage}
          totalRecords={filteredData.length}
        />
      </div>
    </div>
  );
}

