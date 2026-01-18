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
import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";

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
  nameOfManufacturer: "",
  quantityType: "",
  quantity: "",
  purchaseDate: "",
  expiryDate: "",
  batchNo: "",
  remarks: "",
};

export const FertilizerDetails = () => {
  const [fertilizerTypes, setFertilizerTypes] = useState([]);
  const [fertilizerGrades, setFertilizerGrades] = useState([]);
  const [quantityTypes, setQuantityTypes] = useState([]);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadResetKey, setUploadResetKey] = useState(0);
  const [publishOnEmart, setPublishOnEmart] = useState(false);

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [fertilizerList, setFertilizerList] = useState([]);
  const [editId, setEditId] = useState(null);

  const [uploadedFile, setUploadedFile] = useState(null);

const handleFileSelect = (file) => {
  setUploadedFile(file); // <-- real file for upload
  setUploadedImage(file ? URL.createObjectURL(file) : null); // preview only
};


  const uploadConfig = {
    title: "Upload Fertilizer Photo *",
    maxSizeMB: "Max - 5mb",
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
    console.log("errors :",errors);
    if (Object.keys(errors).length > 0) {
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {})
      );
      return;
    }

    setIsPreviewModalOpen(true);
  };

  // ================= SAVE AFTER PREVIEW =================
const handlePreviewConfirm = async () => {
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
    manufacturerName: formik.values.nameOfManufacturer,
    quantityType: parseInt(formik.values.quantityType),
    quantity: parseFloat(formik.values.quantity), // in case user enters decimal
    purchaseDate: formik.values.purchaseDate,
    expiryDate: formik.values.expiryDate,
    batchNo: formik.values.batchNo,
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
      nameOfManufacturer: data.manufacturerName,
      quantityType: data.quantityType,
      quantity: data.quantity,
      purchaseDate: data.purchaseDate,
      expiryDate: data.expiryDate,
      batchNo: data.batchNo,
      remarks: data.remarks,
    });

    formik.setErrors({});
    formik.setTouched({}); 

    setEditId(id);
    setPublishOnEmart(data.emartPublish || false);
    setUploadedImage(data.docId ? `/mock/uploads/${data.docId}.jpg` : null); // <-- load preview image
  }
};



  // ================= RESET FORM =================
  const resetFormFields = () => {
    setEditId(null);
    formik.resetForm();
    setUploadedImage(null);
    setPublishOnEmart(false);
    setUploadResetKey((prev) => prev + 1);
  };

  // ================= PREVIEW DATA =================
  const previewData = [
    { label: "Fertilizer Type", value: formik.values.fertilizerType },
    { label: "Fertilizer Name", value: formik.values.fertilizerName },
    { label: "Grade", value: formik.values.fertilizerGrade },
    { label: "Manufacturer", value: formik.values.nameOfManufacturer },
    { label: "Quantity Type", value: formik.values.quantityType },
    { label: "Quantity", value: formik.values.quantity },
    { label: "Purchase Date", value: formik.values.purchaseDate },
    { label: "Expiry Date", value: formik.values.expiryDate },
    { label: "Batch No", value: formik.values.batchNo },
    { label: "Remarks", value: formik.values.remarks },
    { label: "Publish on e-Mart", value: publishOnEmart ? "Yes" : "No" },
  ];

  // ================= UI =================
  return (
    <div>
      <div className="border border-stroke-200 rounded-[8px] p-[16px]">
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
            <option value="">Select Type</option>
            {fertilizerTypes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </SelectField>

          {/* Fertilizer Name */}
          <TextField
            label="Fertilizer Name"
            required
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
            required
            name="fertilizerGrade"
            value={formik.values.fertilizerGrade}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.fertilizerGrade}
            touched={formik.touched.fertilizerGrade}
          >
            <option value="">Select Grade</option>
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
            name="nameOfManufacturer"
            placeholder="Enter Name"
            value={formik.values.nameOfManufacturer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.nameOfManufacturer}
            touched={formik.touched.nameOfManufacturer}
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
            <option value="">Select Unit</option>
            {quantityTypes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </SelectField>

          {/* Quantity */}
          <TextField
            label="Quantity"
            required
            name="quantity"
            placeholder="Enter Quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.quantity}
            touched={formik.touched.quantity}
          />

          {/* Dates */}
          <TextField
            label="Purchase Date"
            required
            name="purchaseDate"
            type="date"
            value={formik.values.purchaseDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.purchaseDate}
            touched={formik.touched.purchaseDate}
          />

          <TextField
            label="Expiry Date"
            required
            name="expiryDate"
            type="date"
            value={formik.values.expiryDate}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.expiryDate}
            touched={formik.touched.expiryDate}
          />

          {/* Batch No */}
          <TextField
            label="Batch No"
            required
            name="batchNo"
            placeholder="Enter Batch No"
            value={formik.values.batchNo}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.batchNo}
            touched={formik.touched.batchNo}
          />

        </div>

        {/* Remarks */}
        <TextArea
          label="Remarks"
          name="remarks"
          placeholder="Enter Remarks"
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

          <Button
            type="button"
            onClick={handleAddOrEdit}
            buttonClassName="px-6 py-2.5 text-sm font-semibold text-white bg-success rounded-md"
          >
            {editId ? "Update Fertilizer" : "+ Add to Inventory"}
          </Button>
        </div>
      </div>

      {/* LIST TABLE */}
      <h3 className="font-bold text-base mb-[27px] mt-6">Fertilizer Listing</h3>

      <Table
        columns={[
          "fertilizerTypeName",
          "fertilizerName",
          "fertilizerGradeName",
          "manufacturerName",
          "quantity",
          "Actions",
        ]}
        data={fertilizerList}
        renderActions={(row) => (
          <div className="flex gap-2 items-center">
            <img
              src={editSvg}
              className="w-6 cursor-pointer"
              onClick={() => handleEdit(row.id)}
            />

            <img
              src={viewSvg}
              className="w-6 cursor-pointer"
              onClick={() => alert("View functionality coming soon")}
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

      {/* PREVIEW MODAL */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onConfirm={handlePreviewConfirm}
        title={editId ? "Preview - Update Fertilizer" : "Preview - Add Fertilizer"}
        image={uploadedImage}
        data={previewData}
      />

      {/* STATUS MODAL */}
      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        status
        message={statusMessage}
      />
    </div>
  );
};
