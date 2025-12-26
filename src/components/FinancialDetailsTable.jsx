// src/components/FinancialDetailsTable.jsx
import React from "react";
const defaultColumns = [
  "Financial Year",
  "Turnover",
  "Profit/Loss",
  "Financial Range",
  "Audit Status Applicability",
  "Audit Status",
  "Type",
];

export default function FinancialDetailsTable({
  columns = defaultColumns,
  rows = 4,
  placeholder = "Value",
}) {
  const rowArray = Array.from({ length: rows });

  return (
    <div className="registration-table-wrapper">
      <table className="registration-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowArray.map((_, index) => (
            <tr key={index}>
              {columns.map((col) => (
                <td key={col}>{placeholder}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
