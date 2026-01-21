// src/pages/production/Machinery.jsx
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { TextField, SelectField, TextArea } from '../../../components/FormFields';
import Table from '../../../components/Table';
import { Button } from '../../../components/Buttons';
import UploadDocument from '../../../components/UploadDocument';
import Toggle from '../../../components/Toggle';
import ConfirmationModal from '../../../components/ConfirmationModal';
import StatusModal from '../../../components/StatusModal';
import ValidationModal from '../../../components/ValidationModal';
import { AccordionGroup } from '../../../components/Accordion';

import editSvg from '../../../assets/edit.svg';
import viewSvg from '../../../assets/view.svg';
import deleteSvg from '../../../assets/deleteAction.svg';
import StateExtension, { getExtensionData } from '../../../components/StateExtension';

import { machineryValidationSchema } from '../validation';
import {
  createMachinery,
  updateMachinery,
  listMachinery,
  getMachineryById
} from '../../../api/fpoServicesMock';
import { getGeneralMasterByType } from '../../../api/masterMock';
import { uploadDocument } from '../../../api/uploadMock';
import PreviewModal from '../../../components/PreviewModal';


const initialValues = {
  machineryCategory: '',
  machineryName: '',
  brandName: '',
  unit: '',
  rentAmount: '',
  quantity: '',
  address: '',
  specifications: '',
  manufacturerName: '',
  stateExtension: {}
};

export const Machinery = () => {
  const [machineryList, setMachineryList] = useState([]);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [govAssistance, setGovAssistance] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [statusConfig, setStatusConfig] = useState({ success: true, message: '' });
  const [pendingAction, setPendingAction] = useState(null);

  const [extensionData, setExtensionData] = useState(null);
  const [validationSchema, setValidationSchema] = useState(null);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationTitle, setValidationTitle] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [rowPreviewData, setRowPreviewData] = useState(null);
  const [previewTitle, setPreviewTitle] = useState("View");
  const [previewMode, setPreviewMode] = useState(null);


  const [machineryCategories, setMachineryCategories] = useState([]);
  const [units, setUnits] = useState([]);

  // ===================== FETCH MASTER DATA =====================
  useEffect(() => {
    const loadMasterData = async () => {
      // Example of fetching categories and units from general master
      const catResponse = getGeneralMasterByType("machinerycategory");
      const unitResponse = getGeneralMasterByType("quantitytype");

      if (catResponse.success) setMachineryCategories(catResponse.data);
      if (unitResponse.success) setUnits(unitResponse.data);

      // Load extension data
      const extData = await getExtensionData('machinery');
      setExtensionData(extData);
      setValidationSchema(machineryValidationSchema(extData));
    };

    loadMasterData();
  }, []);

  // ===================== LOAD LIST DATA =====================
  useEffect(() => {
    const res = listMachinery();
    if (res.success) setMachineryList(res.data);
  }, []);

  // ===================== FORMIK =====================
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  const formPreviewData = [
    {
      label: "Machinery Category",
      value:
        machineryCategories.find(c => c.id == formik.values.machineryCategory)?.name || "-"
    },
    { label: "Machinery Name", value: formik.values.machineryName || "-" },
    { label: "Brand Name", value: formik.values.brandName || "-" },
    {
      label: "Unit",
      value: units.find(u => u.id == formik.values.unit)?.name || "-"
    },
    { label: "Rent Amount", value: formik.values.rentAmount || "-" },
    { label: "Quantity", value: formik.values.quantity || "-" },
    { label: "Manufacturer Name", value: formik.values.manufacturerName || "-" },
    { label: "Address", value: formik.values.address || "-" },
    { label: "Description", value: formik.values.specifications || "-" },
    { label: "Government Assistance", value: govAssistance ? "Yes" : "No" }
  ];


  const mapRowToPreview = (row) => {
    return [
      {
        label: "Machinery Category",
        value: machineryCategories.find(c => c.id === row.machineryCategory)?.name || "-"
      },
      { label: "Machinery Name", value: row.machineryName || "-" },
      { label: "Brand Name", value: row.brandName || "-" },
      {
        label: "Unit",
        value: units.find(u => u.id === row.unit)?.name || "-"
      },
      { label: "Rent Amount", value: row.rentAmount || "-" },
      { label: "Quantity", value: row.quantity || "-" },
      { label: "Manufacturer Name", value: row.manufacturerName || "-" },
      { label: "Address", value: row.address || "-" },
      { label: "Description", value: row.remarks || "-" },
      { label: "Government Assistance", value: row.govAssistance ? "Yes" : "No" }
    ];
  };


  const markAllTouched = (values) => {
    const touched = {};
    Object.keys(values).forEach(key => {
      if (typeof values[key] === 'object' && values[key] !== null) {
        touched[key] = {};
        Object.keys(values[key]).forEach(subKey => {
          touched[key][subKey] = true;
        });
      } else {
        touched[key] = true;
      }
    });
    return touched;
  };

  const handleFileSelect = (file) => {
    setUploadedFile(file);
    setUploadedImage(file ? URL.createObjectURL(file) : null);
  };

  const uploadConfig = {
    title: "Upload Machinery/Equipment Photo",
    maxSizeMB: "Size: 5mb",
    allowedTypes: ['image/jpeg', 'image/png']
  };

  // ===================== SAVE =====================
  const handleSave = async () => {
    const errors = await formik.validateForm();

    formik.setTouched(markAllTouched(formik.values));

    // Validate stateExtension manually if needed
    let isExtensionValid = true;
    if (extensionData?.extensionEnabled) {
      const extensionValues = formik.values.stateExtension || {};
      extensionData.fields.forEach(field => {
        if (field.isMandatory && !extensionValues[field.fieldName]) {
          formik.setFieldError(
            `stateExtension.${field.fieldName}`,
            `${field.label || field.fieldName} is required`
          );
          isExtensionValid = false;
        }
      });
    }

    if (Object.keys(errors).length > 0 || !isExtensionValid) {
      setValidationTitle("Validation Required");
      setValidationMessage("Please complete all required fields before saving.");
      setShowValidationModal(true);
      return;
    }

    setPendingAction(isEditMode ? 'update' : 'add');
    setIsConfirmationOpen(true);
  };

  const handleConfirm = async () => {
    setIsConfirmationOpen(false);
    let docId = null;

    if (uploadedFile) {
      const uploadRes = await uploadDocument({ file: uploadedFile, fpoId: 1, docType: 1 });
      if (uploadRes.status === 200 && uploadRes.data.success) docId = uploadRes.data.documentId;
    }

    const payload = {
      fpoId: 1,
      machineryCategory: formik.values.machineryCategory,
      machineryName: formik.values.machineryName,
      brandName: formik.values.brandName,
      unit: formik.values.unit,
      rentAmount: parseFloat(formik.values.rentAmount),
      quantity: parseFloat(formik.values.quantity),
      address: formik.values.address,
      specifications: formik.values.specifications,
      manufacturerName: formik.values.manufacturerName,
      govAssistance,
      stateExtension: formik.values.stateExtension,
      docId
    };

    let response;
    if (pendingAction === 'add') {
      response = await createMachinery(payload);
      setStatusConfig({ success: true, message: 'Machinery details added successfully.' });
    } else if (pendingAction === 'update') {
      response = await updateMachinery(editingId, payload);
      setStatusConfig({ success: true, message: 'Machinery details updated successfully.' });
    } else if (pendingAction === 'delete') {
      setMachineryList(prev => prev.filter(item => item.id !== editingId));
      setStatusConfig({ success: true, message: 'Machinery details deleted successfully.' });
      setIsStatusOpen(true);
      handleReset();
      return;
    }

    if (response.data.success) {
      setMachineryList(listMachinery().data);
      setIsStatusOpen(true);
      handleReset();
    }
  };

  // ===================== RESET =====================
  const handleReset = () => {
    formik.resetForm();
    setGovAssistance(false);
    setUploadedImage(null);
    setUploadedFile(null);
    setIsEditMode(false);
    setEditingId(null);
  };

  // ===================== EDIT / DELETE =====================
  const handleEdit = async (row) => {
    const res = await getMachineryById(row.id);
    if (res.data.success) {
      const data = res.data.data;
      formik.setValues({
        machineryCategory: data.machineryCategory ?? "",
        machineryName: data.machineryName ?? "",
        brandName: data.brandName ?? "",
        unit: data.unit ?? "",
        rentAmount: data.purchaseValue ?? "",
        quantity: data.quantity ?? "",
        address: data.address ?? "",
        specifications: data.remarks ?? "",
        manufacturerName: data.manufacturerName ?? "",
        stateExtension: data.stateExtension || {}
      });

      setGovAssistance(data.govAssistance || false);
      setUploadedImage(data.docId ? `/mock/uploads/${data.docId}.jpg` : null);
      setEditingId(data.id);
      setIsEditMode(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDelete = (id) => {
    setEditingId(id);
    setPendingAction('delete');
    setIsConfirmationOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn pb-10">
      {/* ================= FORM ================= */}
      <div className='border border-stroke-200 rounded-[8px] p-[16px] bg-white shadow-sm'>
        <h2 className="text-base font-bold mb-6 text-grey-900">
          FPO Machinery/Equipment update form/ FPO Machinery details
        </h2>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <SelectField
              label="Machinery/Equipment Category"
              required
              name="machineryCategory"
              value={formik.values.machineryCategory ?? ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.machineryCategory}
              touched={formik.touched.machineryCategory}
            >
              <option value="">Select Category</option>
              {machineryCategories.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </SelectField>


            <TextField
              label="Machinery/Equipment Name"
              required
              name="machineryName"
              value={formik.values.machineryName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.machineryName}
              touched={formik.touched.machineryName}
            />

            <TextField
              label="Brand Name"
              name="brandName"
              value={formik.values.brandName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.brandName}
              touched={formik.touched.brandName}
            />

            <SelectField
              label="Unit"
              required
              name="unit"
              value={formik.values.unit ?? ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.unit}
              touched={formik.touched.unit}
            >
              <option value="">Select Unit</option>
              {units.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </SelectField>


            <TextField
              label="Rent Amount"
              required
              name="rentAmount"
              value={formik.values.rentAmount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.rentAmount}
              touched={formik.touched.rentAmount}
            />

            <TextField
              label="Quantity"
              required
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.quantity}
              touched={formik.touched.quantity}
            />
          </div>

          <div className="mt-4">
            <TextField
              label="Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.address}
              touched={formik.touched.address}
            />
          </div>

          <div className="mt-4">
            <TextArea
              label="Technical Specifications"
              name="specifications"
              value={formik.values.specifications}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.specifications}
              touched={formik.touched.specifications}
              rows={4}
            />
          </div>

          <div className="mt-6">
            <AccordionGroup
              items={[{
                id: 'add-image',
                title: 'Add Image',
                isInitiallyOpen: true,
                content: <UploadDocument config={uploadConfig} onFileSelect={handleFileSelect} />
              }]}
            />
          </div>

          <div>
            <StateExtension formik={formik} pageId="machinery" />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between mt-8 p-4 bg-grey-50 rounded-lg gap-4 md:gap-0">
            <div className="flex items-center justify-between w-full md:w-auto gap-6">
              <span className="text-sm font-medium text-grey-900">Government assistance received?</span>
              <Toggle checked={govAssistance} onChange={setGovAssistance} />
            </div>
            <div className="flex items-center justify-end w-full md:w-auto gap-4">
              <Button buttonClassName="px-6 py-2 bg-white border border-stroke-300 text-grey-700 rounded-md hover:bg-grey-50 font-medium" onClick={handleReset}>Reset</Button>
              <Button
                buttonClassName="px-8 py-2 bg-success text-white rounded-md hover:bg-success-dark font-medium"
                onClick={async () => {
                  const errors = await formik.validateForm();
                  formik.setTouched(markAllTouched(formik.values));

                  if (Object.keys(errors).length > 0) {
                    setValidationTitle("Validation Required");
                    setValidationMessage("Please complete all required fields before proceeding.");
                    setShowValidationModal(true);
                    return;
                  }

                  setPreviewTitle(isEditMode ? "Preview - Update Machinery" : "Preview - Add Machinery");
                  setPreviewMode("FORM");
                  setIsPreviewModalOpen(true);
                }}
              >
                {isEditMode ? "Update" : "Save"}
              </Button>

            </div>
          </div>
        </form>
      </div>

      {/* ================= LIST TABLE ================= */}
      <div className='flex flex-col'>
        <h3 className="text-base font-bold mb-4 text-grey-900">Machinery/Equipment Listing</h3>
        <div className="bg-white p-0 rounded-lg shadow-sm border border-stroke-200 overflow-hidden">
          {/* <Table
            columns={[
              "Machinery Category",
              "Machinery Name",
              "Brand",
              "Unit",
              "Rent Amount",
              "Quantity",
              "Manufacturer Name",
              "Actions"
            ]}
            data={machineryList.map(item => ({
              ...item,
              "Machinery Category": item.machineryCategory,
              "Machinery Name": item.machineryName,
              "Brand": item.brandName,
              "Unit": item.unit,
              "Rent Amount": item.rentAmount,
              "Quantity": item.quantity,
              "Manufacturer Name": item.manufacturerName || '-',
            }))}
            renderActions={(row) => (
              <div className="flex items-center justify-center gap-4">
                <img src={editSvg} alt="Edit" className="w-6 h-6 cursor-pointer" onClick={() => handleEdit(row)} />
                <img src={viewSvg} alt="View" className="w-6 h-6 cursor-pointer" />
                <img src={deleteSvg} alt="Delete" className="w-6 h-6 cursor-pointer" onClick={() => handleDelete(row.id)} />
              </div>
            )}
          /> */}
          <Table
            columns={[
              "Machinery Category",
              "Machinery Name",
              "Brand",
              "Unit",
              "Rent Amount",
              "Quantity",
              "Manufacturer Name",
              "Technical specifications",
              "Actions"
            ]}
            data={machineryList.map(row => ({
              ...row,
              "Machinery Category":
                machineryCategories.find(c => c.id === row.machineryCategory)?.name || "-",
              "Machinery Name": row.machineryName || "-",
              "Brand": row.brandName || "-",
              "Unit":
                units.find(u => u.id === row.unit)?.name || "-",
              "Rent Amount": row.rentAmount || "-",
              "Quantity": row.quantity || "-",
              "Manufacturer Name": row.manufacturerName || "-",
              "Technical specifications": row.remarks || "-"
            }))}
            renderActions={(row) => (
              <div className="flex gap-4 items-center justify-center">
                <img src={editSvg} className="w-6 cursor-pointer" onClick={() => handleEdit(row)} />
                <img
                  src={viewSvg}
                  className="w-6 cursor-pointer"
                  onClick={() => {
                    setRowPreviewData(row);
                    setPreviewMode("ROW");
                    setPreviewTitle("View Machinery Details");
                    setIsPreviewModalOpen(true);
                  }}
                />


                <img src={deleteSvg} className="w-6 cursor-pointer" onClick={() => handleDelete(row.id)} />
              </div>
            )}
          />
        </div>
      </div>

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirm}
        title={pendingAction === 'delete' ? 'Delete Record' : (isEditMode ? 'Update Record' : 'Save Record')}
        description={pendingAction === 'delete'
          ? 'Are you sure you want to delete this machinery record?'
          : `Are you sure you want to ${isEditMode ? 'update' : 'save'} these machinery details?`}
      />

      <StatusModal
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
        status={statusConfig.success}
        message={statusConfig.message}
      />

     <PreviewModal
  isOpen={isPreviewModalOpen}
  title={previewTitle}
  data={
    previewMode === "ROW"
      ? mapRowToPreview(rowPreviewData)
      : formPreviewData
  }
  image={
    previewMode === "FORM"
      ? uploadedImage
      : rowPreviewData?.docId
        ? `/mock/uploads/${rowPreviewData.docId}.jpg`
        : null
  }
  actionButton={previewMode === "FORM"}
  onConfirm={
    previewMode === "FORM"
      ? async () => {
          setIsPreviewModalOpen(false);
          setPreviewMode(null);
          await handleSave();
        }
      : null
  }
  onClose={() => {
    setRowPreviewData(null);
    setPreviewMode(null);
    setIsPreviewModalOpen(false);
  }}
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
