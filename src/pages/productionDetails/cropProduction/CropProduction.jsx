// src/pages/production/CropProduction.jsx
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
import { uploadDocument } from "../../../api/uploadMock";
import { getGeneralMasterByType, getCropsBySeason, getVarietyByCrop } from "../../../api/masterMock";
import { listCropProduction, createCropProduction, updateCropProduction, getCropProductionById } from "../../../api/productionDetailsMock";
import { cropProductionValidationSchema } from "../validation";

const initialCropProductionValues = {
  seasonId: "",
  cropId: "",
  cropVarietyId: "",
  productionQuantity: "",
  harvestedSurplus: "",
  dateOfHarvesting: "",
  estimatedOrHarvestedId: "",
  description: "",
};

export const CropProduction = () => {
  const [seasons, setSeasons] = useState([]);
  const [crops, setCrops] = useState([]);
  const [varieties, setVarieties] = useState([]);
  const [productionList, setProductionList] = useState([]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadResetKey, setUploadResetKey] = useState(0);
  const [publishOnEmart, setPublishOnEmart] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusConfig, setStatusConfig] = useState({ status: true, message: "" });
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [existingDocId, setExistingDocId] = useState(null);

  const uploadConfig = {
    title: "Add Crop Image *",
    maxSizeMB: "Max - 5mb",
    allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
  };

  const formik = useFormik({
    initialValues: initialCropProductionValues,
    validationSchema: cropProductionValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
  });

  // ------------------- LOAD DATA -------------------
  useEffect(() => {
    const res = getGeneralMasterByType("Season");
    if (res.success) setSeasons(res.data);
    fetchProductionList();
  }, []);

  const fetchProductionList = () => {
    const res = listCropProduction();
    if (res.success) setProductionList(res.data);
  };

  // ------------------- LOAD CROPS & VARIETIES -------------------
  useEffect(() => {
    if (!formik.values.seasonId) {
      setCrops([]);
      setVarieties([]);
      if (!isUpdateMode) {
        formik.setFieldValue("cropId", "");
        formik.setFieldValue("cropVarietyId", "");
      }
      return;
    }
    const res = getCropsBySeason(formik.values.seasonId);
    if (res.success) {
      setCrops(res.data);
      if (!isUpdateMode) formik.setFieldValue("cropId", "");
    }
  }, [formik.values.seasonId, isUpdateMode]);

  useEffect(() => {
    if (!formik.values.cropId) {
      setVarieties([]);
      if (!isUpdateMode) formik.setFieldValue("cropVarietyId", "");
      return;
    }
    const res = getVarietyByCrop(formik.values.cropId);
    if (res.success) {
      setVarieties(res.data);
      if (!isUpdateMode) formik.setFieldValue("cropVarietyId", "");
    }
  }, [formik.values.cropId, isUpdateMode]);

  // ------------------- CLEAR ERRORS ON VALUE CHANGE -------------------
  useEffect(() => {
    const newErrors = { ...formik.errors };
    let hasChanges = false;
    Object.keys(formik.values).forEach((field) => {
      if (formik.errors[field] && formik.values[field] !== "" && formik.values[field] != null) {
        newErrors[field] = undefined;
        hasChanges = true;
      }
    });
    if (hasChanges) formik.setErrors(newErrors);
  }, [formik.values]);

  // ------------------- HANDLERS -------------------
  const handleFileSelect = (file) => {
    setUploadedFile(file);
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleAddOrUpdateClick = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
      return;
    }
    setIsPreviewModalOpen(true);
  };

  const handlePreviewConfirm = async () => {
    let docId = existingDocId;
    if (uploadedFile) {
      const uploadRes = await uploadDocument({ file: uploadedFile, fpoId: 1, docType: 1 });
      if (uploadRes.status === 200 && uploadRes.data.success) {
        docId = uploadRes.data.documentId;
      }
    }

    const payload = {
      ...formik.values,
      seasonId: parseInt(formik.values.seasonId),
      cropId: parseInt(formik.values.cropId),
      cropVarietyId: parseInt(formik.values.cropVarietyId),
      productionQuantity: parseFloat(formik.values.productionQuantity),
      harvestedSurplus: parseFloat(formik.values.harvestedSurplus),
      emartPublish: publishOnEmart,
      docId,
      fpoId: 1,
    };

    if (isUpdateMode && editingId) {
      await updateCropProduction(editingId, payload); // ✅ update
    } else {
      await createCropProduction(payload); // ✅ create
    }

    setIsPreviewModalOpen(false);
    setStatusConfig({
      status: true,
      message: isUpdateMode
        ? "Crop Production Updated Successfully"
        : "Crop Production Added Successfully",
    });
    setIsStatusModalOpen(true);

    resetAll();
    fetchProductionList();
  };

  const resetAll = () => {
    setIsUpdateMode(false);
    setEditingId(null);
    setExistingDocId(null);
    formik.resetForm();
    setUploadedFile(null);
    setPreviewImage(null);
    setPublishOnEmart(false);
    setUploadResetKey((prev) => prev + 1);
  };

  // ------------------- EDIT HANDLER -------------------
  const handleEdit = async (row) => {
    setIsUpdateMode(true);
    setEditingId(row.id);

    const res = await getCropProductionById(row.id); // ✅ getById
    if (res.status === 200 && res.data.success && res.data.data) {
      const data = res.data.data;
      setExistingDocId(data.docId || null);
      setPublishOnEmart(data.emartPublish || false);

      setCrops(getCropsBySeason(data.seasonId).data);
      setVarieties(getVarietyByCrop(data.cropId).data);

      formik.setValues({
        seasonId: data.seasonId?.toString() || "",
        cropId: data.cropId?.toString() || "",
        cropVarietyId: data.cropVarietyId?.toString() || "",
        productionQuantity: data.productionQuantity != null ? data.productionQuantity.toString() : "",
        harvestedSurplus: data.harvestedSurplus != null ? data.harvestedSurplus.toString() : "",
        dateOfHarvesting: data.dateOfHarvesting || "",
        estimatedOrHarvestedId: data.estimatedOrHarvestedId || "",
        description: data.description || "",
      });

      setUploadedFile(null);
      setPreviewImage(data.docId ? `/mock/uploads/${data.docId}.jpg` : null);
    }
  };

  // ------------------- TABLE COLUMNS -------------------
  const columns = [
    "Season",
    "Crop",
    "Variety",
    "Production (Qtl.)",
    "Marketable Surplus",
    "Publish on e-Mart",
    "Actions",
  ];

  const previewData = [
    { label: "Season", value: seasons.find((s) => s.id == formik.values.seasonId)?.name || "" },
    { label: "Crop", value: crops.find((c) => c.id == formik.values.cropId)?.name || "" },
    { label: "Variety", value: varieties.find((v) => v.id == formik.values.cropVarietyId)?.name || "" },
    { label: "Production (Qtl.)", value: formik.values.productionQuantity },
    { label: "Marketable Surplus", value: formik.values.harvestedSurplus },
    { label: "Harvest Date", value: formik.values.dateOfHarvesting },
    { label: "Estimated/Harvested", value: formik.values.estimatedOrHarvestedId },
    { label: "Description", value: formik.values.description },
    { label: "Publish on e-Mart", value: publishOnEmart ? "Yes" : "No" },
  ];

  // ------------------- RENDER -------------------
  return (
    <div>
      {/* FORM */}
      <div className="border border-stroke-200 rounded-[8px] p-[16px]">
        <h2 className="text-base font-bold mb-6">
          {isUpdateMode ? "Update Crop Production" : "Crop Production Update"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <SelectField
            label="Season"
            required
            name="seasonId"
            value={formik.values.seasonId}
            onChange={(e) => formik.setFieldValue("seasonId", Number(e.target.value))}
            onBlur={formik.handleBlur}
            error={formik.errors.seasonId}
            touched={formik.touched.seasonId}
          >
            <option value="">Select Season</option>
            {seasons.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </SelectField>

          <SelectField
            label="Crop"
            required
            name="cropId"
            value={formik.values.cropId}
            onChange={(e) => formik.setFieldValue("cropId", Number(e.target.value))}
            onBlur={formik.handleBlur}
            error={formik.errors.cropId}
            touched={formik.touched.cropId}
          >
            <option value="">Select Crop</option>
            {crops.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </SelectField>

          <SelectField
            label="Variety"
            required
            name="cropVarietyId"
            value={formik.values.cropVarietyId}
            onChange={(e) => formik.setFieldValue("cropVarietyId", Number(e.target.value))}
            onBlur={formik.handleBlur}
            error={formik.errors.cropVarietyId}
            touched={formik.touched.cropVarietyId}
          >
            <option value="">Select Variety</option>
            {varieties.map((v) => (
              <option key={v.id} value={v.id}>{v.name}</option>
            ))}
          </SelectField>

          <TextField
            label="Production (in Qtl.)"
            name="productionQuantity"
            type="text"
            value={formik.values.productionQuantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.productionQuantity}
            touched={formik.touched.productionQuantity}
          />

          <TextField
            label="Marketable Surplus"
            name="harvestedSurplus"
            type="text"
            value={formik.values.harvestedSurplus}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.harvestedSurplus}
            touched={formik.touched.harvestedSurplus}
          />

          <TextField
            label="Date Of Harvesting"
            type="date"
            name="dateOfHarvesting"
            value={formik.values.dateOfHarvesting}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.dateOfHarvesting}
            touched={formik.touched.dateOfHarvesting}
          />

          <TextField
            label="Estimated/Harvested"
            name="estimatedOrHarvestedId"
            type="text"
            value={formik.values.estimatedOrHarvestedId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.estimatedOrHarvestedId}
            touched={formik.touched.estimatedOrHarvestedId}
          />
        </div>

        <TextArea
          label="Crop Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.description}
          touched={formik.touched.description}
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

        <div className="my-8 flex flex-col md:flex-row justify-between gap-4 p-4 bg-grey-50 rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Publish on e-Mart?</span>
            <Toggle checked={publishOnEmart} onChange={setPublishOnEmart} />
          </div>
          <div className="flex gap-4">
            <Button type="button">Preview</Button>
            <Button
              type="button"
              onClick={handleAddOrUpdateClick}
              buttonClassName="px-6 py-2.5 text-sm font-semibold text-white rounded-md shadow-sm bg-success"
            >
              {isUpdateMode ? "Update Production List" : "+ Add to Production List"}
            </Button>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-8">
        <Table
          columns={columns}
          data={productionList.map((row) => ({
            Season: row.seasonName ?? "-",
            Crop: row.cropName ?? "-",
            Variety: row.cropVarietyName ?? "-",
            "Production (Qtl.)": row.productionQuantity ?? "-",
            "Marketable Surplus": row.harvestedSurplus ?? "-",
            "Publish on e-Mart": row.emartPublish ? "Yes" : "No",
            Actions: "actions",
            ...row,
          }))}
          rowKey="id"
          renderActions={(row) => (
            <div className="flex gap-2 items-center">
              <img src={editSvg} alt="edit" className="w-6 cursor-pointer" onClick={() => handleEdit(row)} />
              <img
                src={viewSvg}
                alt="view"
                className="w-6 cursor-pointer"
                onClick={() => {
                  setPreviewImage(row.docId ? `/mock/uploads/${row.docId}.jpg` : null);
                  setIsPreviewModalOpen(true);
                }}
              />
              <span className="text-[10px] px-2 py-1 rounded bg-gray-100">
                {row.emartPublish ? "✓ Publish" : "Publish"}
              </span>
            </div>
          )}
          stickyLastColumn
        />
      </div>

      {/* MODALS */}
      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onConfirm={handlePreviewConfirm}
        data={previewData}
        image={previewImage}
      />

      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        status={statusConfig.status}
        message={statusConfig.message}
      />
    </div>
  );
};
