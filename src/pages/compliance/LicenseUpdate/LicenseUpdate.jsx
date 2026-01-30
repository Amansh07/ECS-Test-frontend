import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { TextField, SelectField, CheckboxField } from "../../../components/FormFields";
import Table from "../../../components/Table";
import UploadDocument from "../../../components/UploadDocument";
import { Button } from "../../../components/Buttons";
import ConfirmationModal from "../../../components/ConfirmationModal";
import StatusModal from "../../../components/StatusModal";
import PreviewModal from "../../../components/PreviewModal";
import ValidationModal from "../../../components/ValidationModal";
import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";
import deleteSvg from "../../../assets/deleteAction.svg";
import { licenseUpdateValidationSchema } from "../validation";
import { createLicense, updateLicense, listLicense, getLicenseById, getLicenses } from "../../../api/complianceMock";
import { uploadDocument } from "../../../api/uploadMock";

export const LicenseUpdate = () => {
  const [licenseList, setLicenseList] = useState([]);
  const [licenseTypes, setLicenseTypes] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedPreview, setUploadedPreview] = useState(null);
  const [currentDocId, setCurrentDocId] = useState(null); // remember docId during edit

  // Option C applied earlier: start empty and add unique deletion id
  const [deletedLicenses, setDeletedLicenses] = useState([]);

  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [pendingAction, setPendingAction] = useState(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [statusConfig, setStatusConfig] = useState({ success: true, message: "" });

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState(null);
  const [rowPreviewData, setRowPreviewData] = useState(null);

  const [isUploadLicense, setIsUploadLicense] = useState(false);

  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationTitle, setValidationTitle] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const initialValues = {
    licenseId: "",
    licenseName: "",
    issuedBy: "",
    issuedDate: "",
    validDate: "",
    licenseNumber: "",
    isUnlimited: false,
  };

  const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD
    
  const formik = useFormik({
    initialValues,
    validationSchema: licenseUpdateValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
	});
	
  const isOtherSelected = Number(formik.values.licenseId) === 26;
  const isUnlimited = formik.values.isUnlimited;
  const issuedDate = formik.values.issuedDate;
  const requireValidTill = !isUnlimited && !!issuedDate;
	

	useEffect(() => {
		if (isUnlimited && formik.values.validDate) {
			formik.setFieldValue("validDate", "", false);
		}
		}, [isUnlimited]);

  
  
  const uploadConfig = {
    title: "Upload License *",
    maxSizeMB: "PDF size: 2mb",
    allowedTypes: ["application/pdf"], // correct MIME type
  };

  /* ================= MASTER ================= */
  useEffect(() => {
    const res = getLicenses();
    if (res.success) setLicenseTypes(res.data);
  }, []); // master list includes id 26 = "Other" [1]

  /* ================= LIST ================= */
  useEffect(() => {
    const res = listLicense();
    if (res.success) setLicenseList(res.data);
  }, []); // initial mock data load [1]

  /* ================= FILE SELECT ================= */
  const handleFileSelect = (file) => {
    if (file) {
      setUploadedFile(file);
      setUploadedPreview(URL.createObjectURL(file));
    } else {
      setUploadedFile(null);
      setUploadedPreview(null);
    }
  };

  /* ================= PREVIEW DATA ================= */
  const formPreviewData = [
    {
      label: "License Type",
      value:
        licenseTypes.find((l) => l.licenseId == formik.values.licenseId)?.licenseName ||
        "-",
    },
    { label: "Other License", value: formik.values.licenseName || "-" },
    { label: "Issued By", value: formik.values.issuedBy || "-" },
    { label: "Issued Date", value: formik.values.issuedDate || "-" },
    { label: "Valid Till", value: formik.values.validDate || "-" },
    { label: "License Number", value: formik.values.licenseNumber || "-" },
    { label: "Unlimited Validity", value: formik.values.isUnlimited ? "Yes" : "No" },
  ];

  const mapRowToPreview = (row) => [
    {
      label: "License Type",
      value:
        licenseTypes.find((l) => l.licenseId === row.licenseId)?.licenseName ||
        "-",
    },
    { label: "Other License", value: row.licenseName || "-" },
    { label: "Issued By", value: row.licenseIssuedBy || "-" },
    { label: "Issued Date", value: row.licenseIssuedDt || "-" },
    { label: "Valid Till", value: row.licenseValidTill || "-" },
    { label: "License Number", value: row.licenseNumber || "-" },
    { label: "Unlimited Validity", value: row.unlimitedLicenseVal ? "Yes" : "No" },
  ];

  /* ================= MARK ALL TOUCHED ================= */
  const markAllTouched = (values) => {
    return Object.keys(values).reduce((acc, key) => ({ ...acc, [key]: true }), {});
  };

  /* ================= SAVE (PREVIEW) ================= */
  const handleSave = async () => {
    const errors = await formik.validateForm();
    formik.setTouched(markAllTouched(formik.values));
    if (Object.keys(errors).length > 0) {
      setValidationTitle("Validation Required");
      setValidationMessage("Please complete all required fields before proceeding.");
      setShowValidationModal(true);
      return;
    }
    setPreviewMode("FORM");
    setIsPreviewModalOpen(true);
  };

  /* ================= CONFIRMATION ================= */
  const handleConfirm = async () => {
    setIsConfirmationOpen(false);

    // 1) Upload new file if selected
    let newDocId = null;
    if (uploadedFile) {
      const uploadRes = await uploadDocument({
        file: uploadedFile,
        fpoId: 1,
        docType: 2,
      });
      if (uploadRes?.data?.success) newDocId = uploadRes.data.documentId;
    }

    // 2) Build payload (preserve previous docId on update)
    const effectiveDocId = newDocId ?? (isEditMode ? currentDocId : null);

    const payload = {
      fpoId: 1,
      licenseId: Number(formik.values.licenseId),
      licenseName: formik.values.licenseName,
      licenseIssuedBy: formik.values.issuedBy,
      licenseIssuedDt: formik.values.issuedDate,
      licenseValidTill: formik.values.validDate,
      licenseNumber: formik.values.licenseNumber,
      unlimitedLicenseVal: formik.values.isUnlimited,
      docId: effectiveDocId,
    };

    let res;
    if (pendingAction === "add") {
      res = await createLicense(payload);
      setStatusConfig({ success: true, message: "License created successfully." });
    } else if (pendingAction === "update") {
      res = await updateLicense(editingId, payload);
      setStatusConfig({ success: true, message: "License updated successfully." });
    }

    // 3) Update local state from API response (do not reload static list)
    if (pendingAction === "add" && res?.data?.success) {
      const created = res.data.data;
      setLicenseList((prev) => [...prev, created]);
      setIsStatusOpen(true);
      resetForm();
      return;
    }

    if (pendingAction === "update" && res?.data?.success) {
      const updated = res.data.data;
      setLicenseList((prev) =>
        prev.map((item) => (item.id === editingId ? { ...item, ...updated } : item))
      );
      setIsStatusOpen(true);
      resetForm();
      return;
    }

    if (pendingAction === "delete") {
      // --- FIX: Avoid nested setState & add duplicate guard ---
      // Find the record to delete using current state (no side-effects here)
      const toDelete = licenseList.find((x) => x.id === editingId);

      if (toDelete) {
        const deletedRow = {
          // visible unique key
          'Deleted Id': Date.now(),
          // hidden unique relation to original item (guard)
          'Original Id': toDelete.id,
          'License Name':
            licenseTypes.find((l) => l.licenseId === toDelete.licenseId)?.licenseName || "-",
          'Issued By': toDelete.licenseIssuedBy || "-",
          'Issued Date': toDelete.licenseIssuedDt || "-",
          'License Valid Till ': toDelete.licenseValidTill || "-",
          'License Number': toDelete.licenseNumber || "-",
          'Unlimited Validity of License?': !!toDelete.unlimitedLicenseVal,
          'Uploaded License': toDelete.docId ? `${toDelete.docId}.pdf` : "-",
          'Deleted On (Timestamp)': new Date().toLocaleString("en-GB", {
            day: "2-digit", month: "2-digit", year: "numeric",
            hour: "2-digit", minute: "2-digit", second: "2-digit",
          }),
        };

        // Duplicate guard: if we already logged a deletion for this Original Id, skip
        setDeletedLicenses((prevDel) => {
          const exists = prevDel.some((r) => r['Original Id'] === toDelete.id);
          if (exists) return prevDel;
          return [deletedRow, ...prevDel];
        });

        // Now remove from main list in a separate state update
        setLicenseList((prev) => prev.filter((item) => item.id !== editingId));
      }

      setStatusConfig({ success: true, message: "License deleted successfully." });
      setIsStatusOpen(true);
      resetForm();
      return;
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = async (row) => {
    const res = await getLicenseById(row.id);
    if (res.data.success) {
      const d = res.data.data;
      // Set values
      formik.setValues({
        licenseId: d.licenseId,
        licenseName: d.licenseName || "",
        issuedBy: d.licenseIssuedBy,
        issuedDate: d.licenseIssuedDt,
        validDate: d.licenseValidTill,
        licenseNumber: d.licenseNumber,
        isUnlimited: d.unlimitedLicenseVal,
      });
      // Reset validation state
      formik.setTouched({});
      formik.setErrors({});

      setUploadedPreview(d.docId ? `/mock/uploads/${d.docId}.pdf` : null);
      setUploadedFile(null);

      setCurrentDocId(d.docId || null);
      setEditingId(d.id);
      setIsEditMode(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    setEditingId(id);
    setPendingAction("delete");
    setIsConfirmationOpen(true);
  };

  const resetForm = () => {
    formik.resetForm();
    setUploadedFile(null);
    setUploadedPreview(null);
    setCurrentDocId(null);
    setIsEditMode(false);
    setEditingId(null);
  };

  return (
    <div className="bg-white border border-stroke-200 rounded-[8px] p-[16px]">
      <h2 className="text-base font-bold mb-6">FPO License Update Form / FPO License Details</h2>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <SelectField
          label="License Name"
          required
          name="licenseId"
          value={formik.values.licenseId}
          onChange={(e) => {
            formik.handleChange(e);
            const val = Number(e.target.value);
        	if (val !== 26) {
			  formik.setFieldValue("licenseName", "", false);
			  formik.setFieldTouched("licenseName", false, false);
			  formik.setFieldError("licenseName", undefined);
			}
          }}
          onBlur={formik.handleBlur}
          error={formik.errors.licenseId}
          touched={formik.touched.licenseId}
        >
          <option value="">Select License Type</option>
          {licenseTypes.map((l) => (
            <option key={l.licenseId} value={l.licenseId}>
              {l.licenseName}
            </option>
          ))}
        </SelectField>

        <TextField
          label="Other License Name"
		  required={isOtherSelected}
          name="licenseName"
          placeholder="Enter License Name"
          value={formik.values.licenseName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.licenseName}
          touched={formik.touched.licenseName}
          disabled={formik.values.licenseId != 26}
        />

        <TextField
          label="Issued By"
          required
          name="issuedBy"
          placeholder="Enter license issuing authority"
          value={formik.values.issuedBy}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.issuedBy}
          touched={formik.touched.issuedBy}
        />

        <TextField
          label="Issue Date"
		  required
          type="date"
          name="issuedDate"
          placeholder="dd/mm/yyyy"
          value={formik.values.issuedDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.issuedDate}
          touched={formik.touched.issuedDate}
        />

        <TextField
          label="License Valid Till"
          type="date"
		  min={today}
          name="validDate"
          placeholder="dd/mm/yyyy"
          value={formik.values.validDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.validDate}
          touched={formik.touched.validDate}
		  required={requireValidTill}    // shows asterisk only when required
		  disabled={isUnlimited}         // disabled when Unlimited is checked
		/>
        
		<TextField
          label="License Number"
          required
          name="licenseNumber"
          placeholder="Enter License Number"
          value={formik.values.licenseNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.licenseNumber}
          touched={formik.touched.licenseNumber}
        />

        <div className="mt-8">
          <CheckboxField
            label="Unlimited Validity of License?"
            name="isUnlimited"
            checked={formik.values.isUnlimited}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.isUnlimited}
            touched={formik.touched.isUnlimited}
          />
        </div>
      </div>

      {/* Upload Section */}
      <div className="border border-stroke-200 rounded-[8px]">
        <div
          className="w-full bg-primary-100 p-4 cursor-pointer flex justify-between items-center"
          onClick={() => setIsUploadLicense(!isUploadLicense)}
        >
          <h3 className="text-base font-medium">Upload License</h3>
          <svg
            className={`w-5 h-5 transition-transform ${isUploadLicense ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isUploadLicense && (
          <div className="rounded-xl p-4">
            <UploadDocument
              config={uploadConfig}
              onFileSelect={handleFileSelect}
              preview={uploadedPreview}
            />
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-stroke-100">
        <Button
          buttonClassName="px-6 py-2 bg-white border border-stroke-300 text-grey-700 rounded-md hover:bg-grey-50 font-medium"
          onClick={resetForm}
        >
          Reset
        </Button>

        <Button
          buttonClassName="px-8 py-2 bg-success text-white rounded-md hover:bg-success-dark font-medium"
          onClick={handleSave}
        >
          {isEditMode ? "Update" : "Save"}
        </Button>
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm mt-8">
        <h3 className="text-lg font-semibold text-grey-900 mb-6">FPO License Detail View Table</h3>
        <Table
          columns={[
            "License Type",
            "Issued By",
            "Issued Date",
            "Valid Till",
            "License Number",
            "Unlimited Validity",
            "Actions",
          ]}
          data={licenseList.map((r) => ({
            ...r,
            "License Type":
              licenseTypes.find((l) => l.licenseId === r.licenseId)?.licenseName ||
              "-",
            "Issued By": r.licenseIssuedBy || "-",
            "Issued Date": r.licenseIssuedDt || "-",
            "Valid Till": r.licenseValidTill || "-",
            "License Number": r.licenseNumber || "-",
            "Unlimited Validity": r.unlimitedLicenseVal ? "Yes" : "No",
          }))}
          renderActions={(row) => (
            <div className="flex items-center justify-center gap-4">
			{/*<img
                src={editSvg}
                alt="Edit"
                className="w-6 h-6 cursor-pointer"
                onClick={() => handleEdit(row)}
			/>*/}
              <img
                src={viewSvg}
                alt="View"
                className="w-6 h-6 cursor-pointer"
                onClick={() => {
                  setRowPreviewData(row);
                  setPreviewMode("ROW");
                  setIsPreviewModalOpen(true);
                }}
              />
              <img
                src={deleteSvg}
                alt="Delete"
                className="w-6 h-6 cursor-pointer"
                onClick={() => handleDelete(row.id)}
              />
            </div>
          )}
        />
      </div>

      {/* Deleted Licenses View Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold text-grey-900 mb-6">FPO License Deleted Records Table</h3>
        <Table
          columns={[
            'Deleted Id',                 // visible unique key
            'License Name',
            'Issued By',
            'Issued Date',
            'License Valid Till ',
            'License Number',
            'Unlimited Validity of License?',
            'Uploaded License',
            'Deleted On (Timestamp)'
          ]}
          data={deletedLicenses}
          renderColumn={(col, value) => {
            if (col?.trim() === "Unlimited Validity of License?") {
              return (
                <div className="flex justify-center">
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-full ${
                      value ? 'bg-success-100 text-success' : 'bg-danger-100 text-danger'
                    }`}
                  >
                    {value ? '✓' : '✕'}
                  </span>
                </div>
              );
            }
            return value;
          }}
        />
      </div>

      {/* Modals */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        title={
          previewMode === "ROW"
            ? "View License Details"
            : isEditMode
            ? "Preview - Update License"
            : "Preview - Add License"
        }
        data={previewMode === "ROW" ? mapRowToPreview(rowPreviewData) : formPreviewData}
        image={
          previewMode === "FORM"
            ? uploadedPreview
            : rowPreviewData?.docId
            ? `/mock/uploads/${rowPreviewData.docId}.pdf`
            : null
        }
        actionButton={previewMode === "FORM"}
        isDescriptionAvailable={false}
        onConfirm={() => {
          setIsPreviewModalOpen(false);
          setPendingAction(isEditMode ? "update" : "add");
          setIsConfirmationOpen(true);
        }}
        onClose={() => {
          setRowPreviewData(null);
          setPreviewMode(null);
          setIsPreviewModalOpen(false);
        }}
      />

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirm}
        title={
          pendingAction === "delete"
            ? "Delete Record"
            : pendingAction?.charAt(0).toUpperCase() + pendingAction?.slice(1) + " Record"
        }
        description={
          pendingAction === "delete"
            ? "Are you sure you want to delete this record?"
            : `Are you sure you want to ${pendingAction} these details?`
        }
      />

      <StatusModal
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
        status={statusConfig.success}
        message={statusConfig.message}
      />

      <ValidationModal
        isOpen={showValidationModal}
        title={validationTitle}
        message={validationMessage}
        onClose={() => setShowValidationModal(false)}
      />
    </div>
  );
};