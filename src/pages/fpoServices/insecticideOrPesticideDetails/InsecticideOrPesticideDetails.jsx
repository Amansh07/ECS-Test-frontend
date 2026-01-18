// ==============================================
// InsecticideOrPesticideDetails.jsx (Updated)
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

import { insecticideOrPesticideDetailsValidationSchema } from "../validation";
import { getGeneralMasterByType } from "../../../api/masterMock";

import {
  createInsecticide,
  updateInsecticide,
  listInsecticide,
  getInsecticideById,
} from "../../../api/fpoServicesMock";
import { uploadDocument } from "../../../api/uploadMock";

// ================= INITIAL FORM VALUES =================
const initialInsecticideData = {
  insecticideType: "",
  insecticideName: "",
  manufacturerName: "",
  quantityType: "",
  quantity: "",
  purchaseDate: "",
  expiryDate: "",
  batchNo: "",
  remarks: "",
};

export const InsecticideOrPesticideDetails = () => {
  const [insecticideTypes, setInsecticideTypes] = useState([]);
  const [quantityTypes, setQuantityTypes] = useState([]);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadResetKey, setUploadResetKey] = useState(0);
  const [publishOnEmart, setPublishOnEmart] = useState(false);

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [insecticideList, setInsecticideList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  // ================= HANDLE FILE =================
  const handleFileSelect = (file) => {
    setUploadedFile(file);
    setUploadedImage(file ? URL.createObjectURL(file) : null);
  };

  const uploadConfig = {
    title: "Upload Insecticide / Pesticide Photo *",
    maxSizeMB: "Max - 5mb",
    allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
  };

  // ================= FETCH MASTER DATA =================
  useEffect(() => {
    const typeResponse = getGeneralMasterByType("insecticideType");
    const qtyResponse = getGeneralMasterByType("quantityType");

    if (typeResponse.success) setInsecticideTypes(typeResponse.data);
    if (qtyResponse.success) setQuantityTypes(qtyResponse.data);

    loadInsecticideList();
  }, []);

  // ================= LOAD LIST =================
  const loadInsecticideList = () => {
    const res = listInsecticide();
    if (res.success) setInsecticideList(res.data);
  };

  // ================= FORMIK =================
  const formik = useFormik({
    initialValues: initialInsecticideData,
    validationSchema: insecticideOrPesticideDetailsValidationSchema,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: true,
  });

  // ================= PREVIEW BEFORE SAVE =================
  const handleAddOrEdit = async () => {
    const errors = await formik.validateForm();
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

  // Upload file if selected
  if (uploadedFile) {
    const uploadRes = await uploadDocument({ file: uploadedFile, fpoId: 1, docType: 1 });
    if (uploadRes.status === 200 && uploadRes.data.success) {
      docId = uploadRes.data.documentId;
    }
  }

  // =================== CONVERT NUMERIC FIELDS ===================
  const payload = {
    fpoId: 1, // always integer
    insecticideType: parseInt(formik.values.insecticideType),
    insecticideName: formik.values.insecticideName,
    manufacturerName: formik.values.manufacturerName,
    quantityType: parseInt(formik.values.quantityType),
    quantity: parseFloat(formik.values.quantity),
    purchaseDate: formik.values.purchaseDate,
    expiryDate: formik.values.expiryDate,
    batchNo: formik.values.batchNo,
    remarks: formik.values.remarks,
    emartPublish: publishOnEmart,
    docId: docId, // only if uploaded
  };

  let response;
  if (editId) {
    response = await updateInsecticide(editId, payload);
    setStatusMessage("Insecticide details updated successfully!");
  } else {
    response = await createInsecticide(payload);
    setStatusMessage("Insecticide added successfully!");
  }

  if (response.data.success) {
    loadInsecticideList();
    resetFormFields();
    setIsStatusModalOpen(true);
  }

  setIsPreviewModalOpen(false);
};


  // ================= EDIT =================
  const handleEdit = async (id) => {
    const response = await getInsecticideById(id);
    if (response.data?.data) {
      const data = response.data.data;
      formik.setValues({
        insecticideType: data.insecticideType,
        insecticideName: data.insecticideName,
        manufacturerName: data.manufacturerName,
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
      setUploadedImage(data.docId ? `/mock/uploads/${data.docId}.jpg` : null);
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
    { label: "Type", value: formik.values.insecticideType },
    { label: "Name", value: formik.values.insecticideName },
    { label: "Manufacturer", value: formik.values.manufacturerName },
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
        <h2 className="text-base font-bold mb-6">Insecticide / Pesticide Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <SelectField
            label="Type"
            required
            name="insecticideType"
            value={formik.values.insecticideType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.insecticideType}
            touched={formik.touched.insecticideType}
          >
            <option value="">Select Type</option>
            {insecticideTypes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </SelectField>

          <TextField
            label="Name"
            required
            name="insecticideName"
            placeholder="Enter Name"
            value={formik.values.insecticideName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.insecticideName}
            touched={formik.touched.insecticideName}
          />

          <TextField
            label="Manufacturer Name"
            required
            name="manufacturerName"
            placeholder="Enter Manufacturer"
            value={formik.values.manufacturerName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.manufacturerName}
            touched={formik.touched.manufacturerName}
          />

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
            {editId ? "Update Insecticide" : "+ Add to Inventory"}
          </Button>
        </div>
      </div>

      <h3 className="font-bold text-base mb-[27px] mt-6">Insecticide / Pesticide Listing</h3>

      <Table
        columns={[
          "insecticideType",
          "insecticideName",
          "manufacturerName",
          "quantity",
          "Actions",
        ]}
        data={insecticideList}
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

      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onConfirm={handlePreviewConfirm}
        title={editId ? "Preview - Update Insecticide" : "Preview - Add Insecticide"}
        image={uploadedImage}
        data={previewData}
      />

      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        status
        message={statusMessage}
      />
    </div>
  );
};
