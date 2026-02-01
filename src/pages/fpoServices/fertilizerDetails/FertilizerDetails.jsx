// ==============================================
// FertilizerDetails.jsx  (FULL UPDATED VERSION)
// ==============================================

import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

import { TextField, SelectField, TextArea } from "../../../components/FormFields";
import Table from "../../../components/Table";
import UploadDocument from "../../../components/UploadDocument";
import Toggle from "../../../components/Toggle";
import PreviewModal from "../../../components/PreviewModal";
import StatusModal from "../../../components/StatusModal";
import { Button } from "../../../components/Buttons";
import { AccordionGroup } from "../../../components/Accordion";
import editSvg from "/assets/edit.svg";
import viewSvg from "/assets/view.svg";
import ValidationModal from "../../../components/ValidationModal";

import { fertilizerDetailsValidationSchema } from "../validation";

import { getGeneralMasterByType } from "../../../api/masterMock";

import {
  createFertilizer,
  updateFertilizer,
  listFertilizer,
  getFertilizerById,
} from "../../../api/fpoServicesMock";
import { uploadDocument } from "../../../api/uploadMock";

// ================= INITIAL FORM VALUES =================
const initialFertilizerDetailsData = {
  fertilizerType: "",
  fertilizerName: "",
  fertilizerGrade: "",
  manufacturerName: "",
  quantityType: "",
  quantity: "",
  remarks: "",
};

export const FertilizerDetails = () => {
  const [fertilizerTypes, setFertilizerTypes] = useState([]);
  const [fertilizerGrades, setFertilizerGrades] = useState([]);
  const [quantityTypes, setQuantityTypes] = useState([]);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadResetKey, setUploadResetKey] = useState(0);
  const [publishOnEmart, setPublishOnEmart] = useState(false);
  const [rowPreviewData, setRowPreviewData] = useState(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("Preview");
  const [fertilizerList, setFertilizerList] = useState([]);
  const [editId, setEditId] = useState(null);

  const [uploadedFile, setUploadedFile] = useState(null);

  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationTitle, setValidationTitle] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleFileSelect = (file) => {
    setUploadedFile(file); // <-- real file for upload
    setUploadedImage(file ? URL.createObjectURL(file) : null); // preview only
  };

  const uploadConfig = {
    title: "Upload Fertilizer Photo",
    maxSizeMB: "Max - 2mb",
    allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
  };

  // ================= FETCH MASTER DATA =================
  useEffect(() => {
    const typeResponse = getGeneralMasterByType("fertilizertype");
    const gradeResponse = getGeneralMasterByType("fertilizergrade");
    const qtyResponse = getGeneralMasterByType("quantitytype");

    if (typeResponse.success) setFertilizerTypes(typeResponse.data);
    if (gradeResponse.success) setFertilizerGrades(gradeResponse.data);
    if (qtyResponse.success) setQuantityTypes(qtyResponse.data);

    loadFertilizerList();
  }, []);

  // ================= LOAD LIST DATA =================
  const loadFertilizerList = () => {
    const res = listFertilizer();
    console.log("Fertilizer List Loaded:", res); // ✅ log
    if (res.success) {
      setFertilizerList(res.data);
    }
  };

  // ================= FORMIK =================
  const formik = useFormik({
    initialValues: initialFertilizerDetailsData,
    validationSchema: fertilizerDetailsValidationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
  });

  // ================= OPEN PREVIEW =================
  const handleAddOrEdit = async () => {
    const errors = await formik.validateForm();
    console.log("errors :", errors);
    if (Object.keys(errors).length > 0) {
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );

      // SHOW VALIDATION MODAL
      setValidationTitle("Validation Required");
      setValidationMessage("Please complete all required fields before proceeding.");
      setShowValidationModal(true);

      return;
    }
    setPreviewTitle("Preview");
    setIsPreviewModalOpen(true);
  };

  // ================= SAVE AFTER PREVIEW =================
  const handlePreviewConfirm = async () => {

    // ----------------- VALIDATION -----------------
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      setIsPreviewModalOpen(false);
      // Highlight the invalid fields
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );

      // Show validation modal
      setValidationTitle("Validation Required");
      setValidationMessage("Please complete all required fields before submitting.");
      setShowValidationModal(true);
      return; // stop execution if errors exist
    }

    let docId = null;

    // Only upload if a real file is selected
    if (uploadedFile) {
      const uploadRes = await uploadDocument({ file: uploadedFile, fpoId: 1, docType: 1 });
      if (uploadRes.status === 200 && uploadRes.data.success) {
        docId = uploadRes.data.documentId;
      }
    }

    // =================== CONVERT NUMERIC FIELDS ===================
    const payload = {
      fpoId: 1, // always integer
      fertilizerType: parseInt(formik.values.fertilizerType),
      fertilizerGrade: parseInt(formik.values.fertilizerGrade),
      fertilizerName: formik.values.fertilizerName,
      manufacturerName: formik.values.manufacturerName,
      quantityType: parseInt(formik.values.quantityType),
      quantity: parseFloat(formik.values.quantity), // in case user enters decimal
      remarks: formik.values.remarks,
      emartPublish: publishOnEmart,
      docId: docId, // only if uploaded
    };

    let response;
    if (editId) {
      response = await updateFertilizer(editId, payload);
      setStatusMessage("Fertilizer details updated successfully!");
    } else {
      response = await createFertilizer(payload);
      setStatusMessage("Fertilizer added successfully!");
    }

    if (response.data.success) {
      loadFertilizerList();
      resetFormFields();
      setIsStatusModalOpen(true);
    }

    setIsPreviewModalOpen(false);
  };




  // ================= EDIT ROW =================
  const handleEdit = async (id) => {
    const response = await getFertilizerById(id);
    if (response.data?.data) {
      const data = response.data.data;

      formik.setValues({
        fertilizerType: data.fertilizerType,
        fertilizerName: data.fertilizerName,
        fertilizerGrade: data.fertilizerGrade,
        manufacturerName: data.manufacturerName,
        quantityType: data.quantityType,
        quantity: data.quantity,
        remarks: data.remarks,
      });

      formik.setErrors({});
      formik.setTouched({});

      setEditId(id);
      setPublishOnEmart(data.emartPublish || false);
      setUploadedFile(null);
      setUploadedImage(data.docId ? `/mock/uploads/${data.docId}.jpg` : null); // <-- load preview image
    }
  };



  // ================= RESET FORM =================
  const resetFormFields = () => {
    setEditId(null);
    formik.resetForm();
    setUploadedFile(null);
    setUploadedImage(null);
    setPublishOnEmart(false);
    setUploadResetKey((prev) => prev + 1);
  };

  // ================= PREVIEW DATA =================
  const previewData = [
    { label: "Fertilizer Type", value: fertilizerTypes.find((t) => t.id == formik.values.fertilizerType)?.name || "" },
    { label: "Fertilizer Name", value: formik.values.fertilizerName },
    { label: "Fertilizer Grade", value: fertilizerGrades.find((g) => g.id == formik.values.fertilizerGrade)?.name || "" },
    { label: "Name of Manufacturer", value: formik.values.manufacturerName },
    { label: "Quantity Type", value: quantityTypes.find((q) => q.id == formik.values.quantityType)?.name || "" },
    { label: "Quantity", value: formik.values.quantity },
    { label: "Description", value: formik.values.remarks },
    { label: "Publish on e-Mart", value: publishOnEmart ? "Yes" : "No" },
  ];

  // ================= MAP ROW TO PREVIEW =================
  const mapRowToPreview = (row) => {
    const fertilizerTypeName = fertilizerTypes.find((t) => t.id === row.fertilizerType)?.name || "";
    const fertilizerGradeName = fertilizerGrades.find((g) => g.id === row.fertilizerGrade)?.name || "";
    const quantityTypeName = quantityTypes.find((q) => q.id === row.quantityType)?.name || "";

    return [
      { label: "Fertilizer Type", value: fertilizerTypeName },
      { label: "Fertilizer Name", value: row.fertilizerName },
      { label: "Fertilizer Grade", value: fertilizerGradeName },
      { label: "Name of Manufacturer", value: row.manufacturerName },
      { label: "Quantity Type", value: quantityTypeName },
      { label: "Quantity", value: row.quantity },
      { label: "Description", value: row.remarks },
      { label: "Publish on e-Mart", value: row.emartPublish ? "Yes" : "No" },
    ];
  };


  // ================= UI =================
  return (
    <div>
      <div className="border border-stroke-200 rounded-[8px] p-[16px] bg-white">
        <h2 className="text-base font-bold mb-6">Fertilizer Details</h2>

        {/* FORM FIELDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

          {/* Fertilizer Type */}
          <SelectField
            label="Fertilizer Type"
            required
            name="fertilizerType"
            value={formik.values.fertilizerType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.fertilizerType}
            touched={formik.touched.fertilizerType}
          >
            <option value="">Select Fertilizer Type</option>
            {fertilizerTypes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </SelectField>

          {/* Fertilizer Name */}
          <TextField
            label="Fertilizer Name"
            name="fertilizerName"
            placeholder="Enter Name"
            value={formik.values.fertilizerName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.fertilizerName}
            touched={formik.touched.fertilizerName}
          />

          {/* Grade */}
          <SelectField
            label="Fertilizer Grade"
            name="fertilizerGrade"
            value={formik.values.fertilizerGrade}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.fertilizerGrade}
            touched={formik.touched.fertilizerGrade}
          >
            <option value="">Select Fertilizer Grade</option>
            {fertilizerGrades.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </SelectField>

          {/* Manufacturer */}
          <TextField
            label="Name of Manufacturer"
            required
            name="manufacturerName"
            placeholder="Enter Name of Manufacturer"
            value={formik.values.manufacturerName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.manufacturerName}
            touched={formik.touched.manufacturerName}
          />

          {/* Quantity Type */}
          <SelectField
            label="Quantity Type"
            required
            name="quantityType"
            value={formik.values.quantityType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.quantityType}
            touched={formik.touched.quantityType}
          >
            <option value="">Select Quantity Type</option>
            {quantityTypes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </SelectField>

          {/* Quantity */}
          <TextField
            label="Quantity"
            name="quantity"
            placeholder="Enter Quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.quantity}
            touched={formik.touched.quantity}
          />

        </div>

        {/* Remarks */}
        <TextArea
          label="Crop Description"
          name="remarks"
          placeholder="Enter Crop Description"
          value={formik.values.remarks}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.remarks}
          touched={formik.touched.remarks}
        />

        {/* Upload Section */}
        <div className="mb-6">
          <AccordionGroup
            items={[
              {
                id: "add-image",
                title: "Add Image",
                isInitiallyOpen: true,
                content: (
                  <UploadDocument
                    key={uploadResetKey}
                    config={uploadConfig}
                    onFileSelect={handleFileSelect}
                  />
                ),
              },
            ]}
          />
        </div>

        {/* Publish & Button */}
        <div className="my-8 flex justify-between items-center p-4 bg-grey-50 rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Publish on e-Mart?</span>
            <Toggle checked={publishOnEmart} onChange={setPublishOnEmart} />
          </div>
          <div className="flex gap-4">
            <Button
              buttonClassName="p-[10px] text-[14px] text-primary-900 font-medium border border-primary-900 rounded-[8px] bg-white"
              onClick={() => { setPreviewTitle("Preview"); setIsPreviewModalOpen(true) }}
            >
              Preview
            </Button>
            <Button
              type="button"
              onClick={handleAddOrEdit}
              buttonClassName="px-6 py-2.5 text-sm font-semibold text-white bg-success rounded-md"
            >

              {editId ? "Update Fertilizer" : "+ Add to Inventory"}
            </Button>
          </div>
        </div>
      </div>

      {/* LIST TABLE */}
      <h3 className="font-bold text-base mb-[27px] mt-6">Fertilizer Listing</h3>

      <div className="border border-stroke-200 rounded-[8px] p-[16px] bg-white">
        <Table
          columns={[
            "Fertilizer Type",
            "Fertilizer Name",
            "Fertilizer Grade",
            "Name of Manufacturer",
            "Quantity Type",
            "Quantity",
            "Crop Description",
            "Actions",
          ]}
          data={fertilizerList.map(row => ({
            "Fertilizer Type": row.fertilizerTypeName || "-",
            "Fertilizer Name": row.fertilizerName || "-",
            "Fertilizer Grade": row.fertilizerGradeName || "-",
            "Name of Manufacturer": row.manufacturerName || "-",
            "Quantity Type": row.quantityTypeName || "-",
            "Crop Description": row.remarks || "-",
            "Quantity": row.quantity || "-",
            ...row,
          }))}
          renderActions={(row) => (
            <div className="flex gap-2 items-center justify-center">
              <img
                src={editSvg}
                className="w-6 cursor-pointer"
                onClick={() => handleEdit(row.id)}
              />

              {/* <img
              src={viewSvg}
              className="w-6 cursor-pointer"
              onClick={() => alert("View functionality coming soon")}
            /> */}

              <img
                src={viewSvg}
                alt="view"
                className="w-6 cursor-pointer"
                onClick={() => {
                  setRowPreviewData(row);   // <-- store row data
                  setPreviewTitle("View");
                  setIsPreviewModalOpen(true);
                }}
              />

              <div
                className={`w-[137px] text-[14px] font-normal px-[12px] py-[6px] rounded-lg flex items-center justify-center
                ${row.publishEmart ? "bg-primary-100 text-dark" : "bg-danger-50 text-dark"}
              `}
              >
                {row.publishEmart ? "✓ Publish Emart" : "Publish Emart"}
              </div>
            </div>
          )}
          stickyLastColumn
        />
      </div>
      {/* PREVIEW MODAL */}
      {/* <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onConfirm={handlePreviewConfirm}
        title={editId ? "Preview - Update Fertilizer" : "Preview - Add Fertilizer"}
        image={uploadedImage}
        data={previewData}
      /> */}

      <PreviewModal
        isOpen={isPreviewModalOpen}
        title={previewTitle}
        data={rowPreviewData ? mapRowToPreview(rowPreviewData) : previewData}
        onConfirm={rowPreviewData ? null : handlePreviewConfirm}
        actionButton={rowPreviewData ? false : true}
        image={uploadedImage}
        onClose={() => {
          setRowPreviewData(null); // reset after closing
          setIsPreviewModalOpen(false);
        }}
      />

      {/* STATUS MODAL */}
      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        status
        message={statusMessage}
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
