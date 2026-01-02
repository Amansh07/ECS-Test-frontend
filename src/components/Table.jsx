// src/components/Table.jsx

import React from "react";

export default function Table({
  columns = ["Name", "Father's/Husband's Name", "Designation", "Gender", "Actions"],
  data = [], // Array of objects for rows
  renderActions, // Function to render custom action buttons per row
  stickyLastColumn = false, // Enable sticky last column
}) {
  return (
    <div className="overflow-x-auto relative">
      <table className="border-collapse" style={{ minWidth: '100%' }}>
        <thead>
          <tr>
            {columns.map((col, index) => {
              const isLastColumn = index === columns.length - 1;
              const isActionsColumn = col === "Actions";

              return (
                <th
                  key={col}
                  className={[
                    "text-center text-[12px] bg-[#F3F3F3] h-[67px] px-4 py-5 text-sm font-[700] whitespace-nowrap",
                    stickyLastColumn && isLastColumn
                      ? "sticky right-0 z-10 shadow-[-4px_0_8px_rgba(0,0,0,0.05)]"
                      : "",
                  ].join(" ")}
                  style={{
                    minWidth: isActionsColumn ? '280px' : '150px',
                    width: isActionsColumn ? '280px' : 'auto',
                  }}
                >
                  {col}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-white border-t border-b border-[#F1FFCC]"
              >
                {columns.map((col, colIndex) => {
                  const isLastColumn = colIndex === columns.length - 1;
                  const isActionsColumn = col === "Actions";

                  if (col === "Actions") {
                    return (
                      <td
                        key={col}
                        className={[
                          "text-center px-4 py-5 text-[12px] h-[60px] font-normal bg-white whitespace-nowrap",
                          stickyLastColumn && isLastColumn
                            ? "sticky right-0 z-10 shadow-[-4px_0_8px_rgba(0,0,0,0.05)]"
                            : "",
                        ].join(" ")}
                        style={{
                          minWidth: '280px',
                          width: '280px',
                        }}
                      >
                        {renderActions ? renderActions(row, rowIndex) : null}
                      </td>
                    );
                  }

                  // Use row[col] safely
                  const value = row[col] ?? "-";

                  return (
                    <td
                      key={col}
                      className={[
                        "text-center px-4 py-5 text-sm h-[60px] whitespace-nowrap",
                        stickyLastColumn && isLastColumn
                          ? "sticky right-0 z-10 bg-white shadow-[-4px_0_8px_rgba(0,0,0,0.05)]"
                          : "",
                      ].join(" ")}
                      style={{
                        minWidth: '150px',
                      }}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-5 text-sm h-[60px] bg-white border-t border-b border-[#F1FFCC]"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
