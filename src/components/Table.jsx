// // src/components/Table.jsx
// import React from "react";
// const defaultColumns = [
//   "Financial Year",
//   "Turnover",
//   "Profit/Loss",
//   "Financial Range",
//   "Audit Status Applicability",
//   "Audit Status",
//   "Type",
// ];

// export default function Table({
//   columns = defaultColumns,
//   rows = 4,
//   placeholder = "Value",
// }) {
//   const rowArray = Array.from({ length: rows });

//   return (
//     <div className="registration-table-wrapper">
//       <table className="registration-table">
//         <thead>
//           <tr>
//             {columns.map((col) => (
//               <th key={col}>{col}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {rowArray.map((_, index) => (
//             <tr key={index}>
//               {columns.map((col) => (
//                 <td key={col}>{placeholder}</td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// src/components/Table.jsx

import React from "react";

export default function Table({
  columns = ["Name", "Father's/Husband's Name", "Designation", "Gender", "Actions"],
  data = [], // Array of objects for rows
  renderActions, // Function to render custom action buttons per row
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="text-center text-[12px] bg-[#F3F3F3] h-[67px] px-4 py-5 text-sm font-[700]"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-white border-t border-b border-[#F1FFCC]"
              >
                {columns.map((col) => {
                  if (col === "Actions") {
                    return (
                      <td
                        key={col}
                        className="text-center px-4 py-5 text-[12px] h-[60px] font-normal"
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
                      className="text-center px-4 py-5 text-sm h-[60px]"
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
