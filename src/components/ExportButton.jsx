
import { useState, useRef, useEffect } from "react";
import * as ExcelJS from 'exceljs';  // ✅ DIRECT IMPORT
import { saveAs } from 'file-saver';  // ✅ DIRECT IMPORT

export default function ExportButton({ data, filename }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const exportToExcel = async () => {
    setIsExporting(true);
    setIsOpen(false);
    
    try {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Member Details');

      // Headers - EXACT MATCH
      worksheet.addRow(['S.No', 'FPO Mentor Name', 'Mobile Number', 'Email ID', 'Created On']);
      
      // Data rows - SAFE ACCESS
      data.forEach((row, index) => {
        worksheet.addRow([
          row.serialNo || '',
          row.fpoMentorName || 'N/A',
          row.mobileNumber || 'N/A', 
          row.email || 'N/A',
          row.createdOn || 'N/A'
        ]);
      });

      // Professional styling
      worksheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
      worksheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF10B981' }  // Green header
      };
      
      // Column widths
      worksheet.columns = [
        { width: 8 },   // S.No
        { width: 25 },  // Name  
        { width: 15 },  // Mobile
        { width: 30 },  // Email
        { width: 12 }   // Date
      ];

      // Generate and download
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      
      saveAs(blob, `${filename}.xlsx`);
      
    } catch (error) {
      console.error('Excel Export Error:', error);
      // Fallback CSV
      const csv = [
        ['S.No', 'FPO Mentor Name', 'Mobile Number', 'Email ID', 'Created On'],
        ...data.map(row => [
          row.serialNo || '',
          row.fpoMentorName || '',
          row.mobileNumber || '',
          row.email || '',
          row.createdOn || ''
        ])
      ].map(row => row.join(',')).join('\n');
      
      const csvBlob = new Blob([csv], { type: 'text/csv' });
      saveAs(csvBlob, `${filename}.csv`);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToPDF = () => {
    setIsExporting(true);
    setIsOpen(false);
    
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Mentor Details - ${filename}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; line-height: 1.6; }
          .header { text-align: center; margin-bottom: 30px; color: #1f2937; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          th, td { padding: 15px 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
          th { background: #10b981; color: white; font-weight: 600; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px; }
          tr:nth-child(even) { background: #f8fafc; }
          tr:hover { background: #ecfdf5; }
          @media print { body { padding: 20px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>Mentor Details Report</h2>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>FPO Mentor Name</th>
              <th>Mobile Number</th>
              <th>Email ID</th>
              <th>Created On</th>
            </tr>
          </thead>
          <tbody>
            ${data.map((row, index) => `
              <tr>
                <td>${row.serialNo || '-'}</td>
                <td>${row.fpoMentorName || '-'}</td>
                <td>${row.mobileNumber || '-'}</td>
                <td>${row.email || '-'}</td>
                <td>${row.createdOn || '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <script>
          window.onload = function() {
            setTimeout(() => {
              window.print();
              setTimeout(() => window.close(), 2000);
            }, 500);
          };
        </script>
      </body>
      </html>
    `;
    
    printWindow.document.write(html);
    printWindow.document.close();
    setIsExporting(false);
  };

  return (
    <div className="export-dropdown" ref={dropdownRef}>
      <button 
        className="px-4 py-2 rounded text-sm font-bold bg-green-600 text-white hover:bg-green-700"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isExporting}>
        <span>Export</span>
        {/*<svg className="caret-icon" viewBox="0 0 24 24" fill="none" width="16" height="16">
          <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>*/}
      </button>

      {isOpen && (
        <div className="export-dropdown-menu">
          <button className="dropdown-item excel" onClick={exportToExcel} disabled={isExporting}>
            <span className="item-icon">📊</span>
            Excel (.xlsx)
          </button>
          <button className="dropdown-item pdf" onClick={exportToPDF} disabled={isExporting}>
            <span className="item-icon">📄</span>
            PDF
          </button>
        </div>
      )}
    </div>
  );
}
