import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { TextField, SelectField } from '../../../components/FormFields';
import Table from '../../../components/Table';
import UploadDocument from '../../../components/UploadDocument';
import { Button } from '../../../components/Buttons';
import ConfirmationModal from '../../../components/ConfirmationModal';
import StatusModal from '../../../components/StatusModal';
import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";
import deleteSvg from "../../../assets/deleteAction.svg";
import { AccordionGroup } from '../../../components/Accordion';
import { annualTurnoverValidationSchema } from '../validation';
import { annualTurnoverMock } from '../../../api/annualTurnoverMock';

// ---------- Helpers ----------
const formatINRNumber = (n) => {
  if (n === null || n === undefined || isNaN(Number(n))) return '';
  return new Intl.NumberFormat('en-IN').format(Number(n));
};
const stripNonDigits = (s) => (s ?? '').toString().replace(/[^\d]/g, '');
const parseNumber = (s) => Number(stripNonDigits(s) || 0);
const nowTimestamp = () =>
  new Date().toLocaleString('en-GB', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  });

// Map API record to table row (carry file name)
const toRow = (r) => ({
  id: r.id,
  'Financial Year': r.financialYearName || String(r.financialYear),
  'Annual Turnover': formatINRNumber(r.annualTurnoverAmt),
  'Annual Profit': formatINRNumber(r.totalProfit),
  'Total Dividend Paid': formatINRNumber(r.totalDividend),
  'Balance Sheet (File)': r.docId || '-', // show actual filename or '-'
});

// ---------- Form initial values ----------
const initialValues = {
  financialYear: '',
  annualTurnover: '',
  totalAnnualProfit: '',
  totalDividendPaid: ''
};

export const AnnualTurnover = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [currentDocId, setCurrentDocId] = useState(null);
  const [turnoverList, setTurnoverList] = useState([]);
  const [deletedTurnoverList, setDeletedTurnoverList] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [statusConfig, setStatusConfig] = useState({ success: true, message: '' });
  const [pendingAction, setPendingAction] = useState(null);

  // Load from mock (mock persists via localStorage in the version I shared earlier)
  useEffect(() => {
    (async () => {
      const res = await annualTurnoverMock.getListByFpo(1, 0, 100);
      if (res?.success) setTurnoverList(res.data.map(toRow));
    })();
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: annualTurnoverValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
  });

  // ---- Live INR formatting handler ----
  const handleCurrencyChange = (e, fieldName) => {
    const digits = stripNonDigits(e.target.value);
    const formatted = digits ? formatINRNumber(digits) : '';
    formik.setFieldValue(fieldName, formatted);
  };

  const handleFileSelect = (file) => setUploadedFile(file);

  const handleAddOrUpdate = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
      return;
    }
    setPendingAction(isEditMode ? 'update' : 'add');
    setIsConfirmationOpen(true);
  };

  const handleConfirm = async () => {
    setIsConfirmationOpen(false);

    const fyName = formik.values.financialYear; // "2024-25"
    const fyStartYear = Number(String(fyName).split('-')[0] || new Date().getFullYear());

    // Use the ACTUAL uploaded file name if a file is attached, else keep previous on edit
    const effectiveDocId =
      uploadedFile ? uploadedFile.name : (isEditMode ? currentDocId : null);

    if (pendingAction === 'add') {
      const payload = {
        fpoId: 1,
        financialYear: fyStartYear,
        financialYearName: fyName,
        annualTurnoverAmt: parseNumber(formik.values.annualTurnover),
        totalProfit: parseNumber(formik.values.totalAnnualProfit),
        totalDividend: parseNumber(formik.values.totalDividendPaid),
        docId: effectiveDocId, // <- filename or null
      };
      const res = await annualTurnoverMock.create(payload);
      if (res?.success) {
        setTurnoverList((prev) => [...prev, toRow(res.data)]);
        setStatusConfig({ success: true, message: 'Annual turnover details added successfully.' });
      } else {
        setStatusConfig({ success: false, message: res?.message || 'Failed to add record' });
      }
    } else if (pendingAction === 'update') {
      const payload = {
        financialYear: fyStartYear,
        financialYearName: fyName,
        annualTurnoverAmt: parseNumber(formik.values.annualTurnover),
        totalProfit: parseNumber(formik.values.totalAnnualProfit),
        totalDividend: parseNumber(formik.values.totalDividendPaid),
        docId: effectiveDocId, // keep previous if not uploading anew
      };
      const res = await annualTurnoverMock.update(editingId, payload);
      if (res?.success) {
        const updatedRow = toRow(res.data);
        setTurnoverList((prev) => prev.map((r) => (r.id === editingId ? updatedRow : r)));
        setStatusConfig({ success: true, message: 'Annual turnover details updated successfully.' });
      } else {
        setStatusConfig({ success: false, message: res?.message || 'Failed to update record' });
      }
    } else if (pendingAction === 'delete') {
      // Grab current row before deletion for deleted table (to carry filename)
      const current = turnoverList.find((x) => x.id === editingId);
      const res = await annualTurnoverMock.delete(editingId);
      if (res?.success) {
        if (current) {
          setDeletedTurnoverList((prev) => ([
            {
              'Financial Year': current['Financial Year'],
              'Annual Turnover (in Rupees)': current['Annual Turnover'],
              'Total Annual Profit (in Rupees)': current['Annual Profit'],
              'Total Dividend Paid (in Rupees)': current['Total Dividend Paid'],
              // Carry the file name here too:
              'Uploaded Balance Sheet (File)': current['Balance Sheet (File)'],
              'Deleted on (Timestamp)': nowTimestamp(),
            },
            ...prev
          ]));
        }
        setTurnoverList((prev) => prev.filter((x) => x.id !== editingId));
        setStatusConfig({ success: true, message: 'Annual turnover details deleted successfully.' });
      } else {
        setStatusConfig({ success: false, message: res?.message || 'Failed to delete record' });
      }
    }

    setIsStatusOpen(true);
    resetForm();
  };

  const resetForm = () => {
    formik.resetForm();
    setUploadedFile(null);
    setCurrentDocId(null);
    setIsEditMode(false);
    setEditingId(null);
  };

  const handleEdit = async (row) => {
    const res = await annualTurnoverMock.getById(row.id);
    if (res?.success && res.data) {
      const d = res.data;
      formik.setValues({
        financialYear: d.financialYearName || String(d.financialYear),
        annualTurnover: formatINRNumber(d.annualTurnoverAmt),
        totalAnnualProfit: formatINRNumber(d.totalProfit),
        totalDividendPaid: formatINRNumber(d.totalDividend),
      });
      setCurrentDocId(d.docId || null); // keep current filename for later
      setIsEditMode(true);
      setEditingId(d.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = (id) => {
    setEditingId(id);
    setPendingAction('delete');
    setIsConfirmationOpen(true);
  };

  return (
    <div className="flex flex-col animate-fadeIn">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-stroke-200">
        <h2 className="text-base font-bold mb-6">Annual Turnover & Profit</h2>

        {/* Form Fields */}
		<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <SelectField
            label="Financial Year"
            name="financialYear"
            required
            value={formik.values.financialYear}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.financialYear}
            touched={formik.touched.financialYear}
			>
            <option value="">Financial Year</option>
            <option value="2024-25">2024-25</option>
            <option value="2023-24">2023-24</option>
            <option value="2022-23">2022-23</option>
          </SelectField>

          <TextField
            label="Annual Turnover (in Rupees)"
            name="annualTurnover"
            placeholder="Enter Value"
            required
            value={formik.values.annualTurnover}
            onChange={(e) => handleCurrencyChange(e, 'annualTurnover')}
            onBlur={(e) => handleCurrencyChange(e, 'annualTurnover')}
            error={formik.errors.annualTurnover}
            touched={formik.touched.annualTurnover}
          />

          <TextField
            label="Total Annual Profit (in Rupees)"
            name="totalAnnualProfit"
            placeholder="Enter Value"
            required
            value={formik.values.totalAnnualProfit}
            onChange={(e) => handleCurrencyChange(e, 'totalAnnualProfit')}
            onBlur={(e) => handleCurrencyChange(e, 'totalAnnualProfit')}
            error={formik.errors.totalAnnualProfit}
            touched={formik.touched.totalAnnualProfit}
          />

          <TextField
            label="Total Dividend Paid (in Rupees)"
            name="totalDividendPaid"
            placeholder="Enter Value"
            value={formik.values.totalDividendPaid}
            onChange={(e) => handleCurrencyChange(e, 'totalDividendPaid')}
            onBlur={(e) => handleCurrencyChange(e, 'totalDividendPaid')}
            error={formik.errors.totalDividendPaid}
            touched={formik.touched.totalDividendPaid}
          />
        </div>

        <div className="mt-8">
          <AccordionGroup
            items={[
              {
                id: 'balance-sheet',
                title: 'Add Balance Sheet',
                isInitiallyOpen: true,
                content: (
                  <div className="p-4 bg-primary-50 rounded-lg">
                    <UploadDocument
                      onFileSelect={setUploadedFile}
                      config={{
                        title: "Add Documents",
                        maxSizeMB: "PDF Size: Max 5MB",
                        allowedTypes: ['application/pdf'],
                      }}
                    />
                  </div>
                )
              }
            ]}
          />
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <Button
            buttonClassName="px-8 py-2.5 bg-white border border-stroke-300 text-grey-700 rounded-md hover:bg-grey-50 font-medium"
            onClick={resetForm}
          >
            Reset
          </Button>
          <Button
            buttonClassName="px-8 py-2.5 bg-success text-white rounded-md hover:bg-success-dark font-medium flex items-center gap-2"
            onClick={handleAddOrUpdate}
          >
            {isEditMode ? (
              <>
                <span>+</span> Update Production List
              </>
            ) : (
              <>
                <span>+</span> Add To Production List
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200">
        <h3 className="text-lg font-semibold text-grey-900 mb-6">Annual Turnover and Profit Detail View Table</h3>
        <Table
          columns={[
            "Financial Year",
            "Annual Turnover",
            "Annual Profit",
            "Total Dividend Paid",
            "Balance Sheet (File)",
            "Actions"
          ]}
          data={turnoverList}
          renderActions={(row) => (
            <div className="flex items-center justify-center gap-4">
			{/*<img src={editSvg} alt="Edit" className="w-6 h-6 cursor-pointer" onClick={() => handleEdit(row)} />
			<img src={viewSvg} alt="View" className="w-6 h-6 cursor-pointer" />*/}
              <img src={deleteSvg} alt="Delete" className="w-6 h-6 cursor-pointer" onClick={() => handleDelete(row.id)} />
            </div>
          )}
          renderColumn={(col, value) => {
            if (col === "Balance Sheet (File)") {
              const hasFile = !!(value && value !== '-');
              return (
                <div className="flex items-center justify-center gap-2">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full ${hasFile ? 'bg-success-100 text-success' : 'bg-danger-100 text-danger'}`}>
                    {hasFile ? '✓' : '✕'}
                  </span>
                  <span className="text-sm text-grey-800 truncate max-w-[180px]" title={hasFile ? value : '-'}>
                    {hasFile ? value : '-'}
                  </span>
                </div>
              );
            }
            return value;
          }}
        />
      </div>

      {/* Deleted List */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200">
        <h3 className="text-lg font-semibold text-grey-900 mb-6">Deleted Annual Turnover Data</h3>
        <Table
          columns={[
            "Financial Year",
            "Annual Turnover (in Rupees)",
            "Total Annual Profit (in Rupees)",
            "Total Dividend Paid (in Rupees)",
            "Uploaded Balance Sheet (File)",
            "Deleted on (Timestamp)"
          ]}
          data={deletedTurnoverList}
          renderColumn={(col, value) => {
            if (col === "Uploaded Balance Sheet (File)") {
              const hasFile = !!(value && value !== '-');
              return (
                <div className="flex items-center justify-center gap-2">
                  <span className={`w-6 h-6 flex items-center justify-center rounded-full ${hasFile ? 'bg-success-100 text-success' : 'bg-danger-100 text-danger'}`}>
                    {hasFile ? '✓' : '✕'}
                  </span>
                  <span className="text-sm text-grey-800 truncate max-w-[180px]" title={hasFile ? value : '-'}>
                    {hasFile ? value : '-'}
                  </span>
                </div>
              );
            }
            return value;
          }}
        />
      </div>

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirm}
        title={pendingAction === 'delete' ? 'Delete Record' : pendingAction?.charAt(0)?.toUpperCase() + pendingAction?.slice(1) + " Record"}
        description={
          pendingAction === 'delete'
            ? 'Are you sure you want to delete this record?'
            : `Are you sure you want to ${pendingAction} these details?`
        }
      />

      <StatusModal
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
        status={statusConfig.success}
        message={statusConfig.message}
      />
    </div>
  );
};
