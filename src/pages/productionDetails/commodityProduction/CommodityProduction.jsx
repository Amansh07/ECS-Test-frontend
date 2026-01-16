// src/pages/production/CommodityProduction.jsx
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { TextField, SelectField, CheckboxField } from "../../../components/FormFields";
import Table from "../../../components/Table";
import UploadDocument from "../../../components/UploadDocument";
import PreviewModal from "../../../components/PreviewModal";
import StatusModal from "../../../components/StatusModal";
import { Button } from "../../../components/Buttons";
import { AccordionGroup } from "../../../components/Accordion";
import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";
import Toggle from "../../../components/Toggle";
import { uploadDocument } from "../../../api/uploadMock";
import { getProductCategories, getSubCategoriesById, getProductsBySubCategoryId } from "../../../api/masterMock";
import { listCommodityProduction, createCommodityProduction, updateCommodityProduction } from "../../../api/productionDetailsMock";
import * as Yup from "yup";

// ------------------- INITIAL VALUES & VALIDATION -------------------
const initialCommodityValues = {
  productCategoryId: "",
  productSubcategoryId: "",
  productId: "",
  annualProductionCap: "",
  availableStock: "",
  inProduction: false,
  dateOfAvailability: "",
  isOrganic: false,
};

const commodityProductionValidationSchema = Yup.object({
  productCategoryId: Yup.string().required("Category is required"),
  productSubcategoryId: Yup.string().required("Subcategory is required"),
  productId: Yup.string().required("Product is required"),
  annualProductionCap: Yup.number().typeError("Must be a number").required("Annual Production Cap is required"),
  availableStock: Yup.number().typeError("Must be a number").required("Available Stock is required"),
  dateOfAvailability: Yup.string().required("Date of Availability is required"),
  // inProduction: Yup.boolean()
  //   .oneOf([true], "Must be in production")
  //   .required("In Production selection is required"),
  // isOrganic: Yup.boolean()
  //   .oneOf([true], "Must be organic")
  //   .required("Organic selection is required"),
});

// ------------------- COMPONENT -------------------
export const CommodityProduction = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [commodityList, setCommodityList] = useState([]);
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
    title: "Upload Product Document *",
    maxSizeMB: "Max - 5mb",
    allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
  };

  const formik = useFormik({
    initialValues: initialCommodityValues,
    validationSchema: commodityProductionValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
  });

  // ------------------- LOAD CATEGORIES & COMMODITY LIST -------------------
  useEffect(() => {
    const res = getProductCategories();
    if (res.success) setCategories(res.data);
    fetchCommodityList();
  }, []);

  const fetchCommodityList = () => {
    const res = listCommodityProduction(1); // fpoId = 1 mock
    if (res.success) setCommodityList(res.data);
  };

  // ------------------- LOAD SUBCATEGORIES & PRODUCTS -------------------
  useEffect(() => {
    if (!formik.values.productCategoryId) {
      setSubcategories([]);
      setProducts([]);
      if (!isUpdateMode) {
        formik.setFieldValue("productSubcategoryId", "");
        formik.setFieldValue("productId", "");
      }
      return;
    }
    const subRes = getSubCategoriesById(Number(formik.values.productCategoryId));
    if (subRes.success) {
      setSubcategories(subRes.data);
      if (!isUpdateMode) formik.setFieldValue("productSubcategoryId", "");
    }
  }, [formik.values.productCategoryId, isUpdateMode]);

  useEffect(() => {
    if (!formik.values.productSubcategoryId) {
      setProducts([]);
      if (!isUpdateMode) formik.setFieldValue("productId", "");
      return;
    }
    const prodRes = getProductsBySubCategoryId(Number(formik.values.productSubcategoryId));
    if (prodRes.success) {
      setProducts(prodRes.data);
      if (!isUpdateMode) formik.setFieldValue("productId", "");
    }
  }, [formik.values.productSubcategoryId, isUpdateMode]);

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

  // Reset docId when a new file is selected
  setExistingDocId(null);
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
  // Close preview modal first
  setIsPreviewModalOpen(false);

  let docId = existingDocId;

  if (uploadedFile) {
    const uploadRes = await uploadDocument({ file: uploadedFile, fpoId: 1, docType: 1 });
    if (uploadRes.status === 200 && uploadRes.data?.documentId) {
      docId = uploadRes.data.documentId;
      setExistingDocId(docId);
    }
  }

  const payload = {
    ...formik.values,
    productCategoryId: Number(formik.values.productCategoryId),
    productSubcategoryId: Number(formik.values.productSubcategoryId),
    productId: Number(formik.values.productId),
    annualProductionCap: Number(formik.values.annualProductionCap),
    availableStock: Number(formik.values.availableStock),
    inProduction: formik.values.inProduction,
    dateOfAvailability: formik.values.dateOfAvailability,
    isOrganic: formik.values.isOrganic,
    emartPublish: publishOnEmart,
    docId,
    fpoId: 1,
  };

  if (isUpdateMode) {
    await updateCommodityProduction(payload);
    setStatusConfig({ status: true, message: "Commodity Production Updated Successfully" });
  } else {
    await createCommodityProduction(payload);
    setStatusConfig({ status: true, message: "Commodity Production Added Successfully" });
  }

  setIsStatusModalOpen(true);
  resetAll();
  fetchCommodityList();
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

  const handleEdit = (row) => {
    setIsUpdateMode(true);
    setEditingId(row.id);
    setExistingDocId(row.docId);
    setPublishOnEmart(row.emartPublish);

    setSubcategories(getSubCategoriesById(row.productCategoryId).data);
    setProducts(getProductsBySubCategoryId(row.productSubcategoryId).data);

    formik.setValues({
      productCategoryId: row.productCategoryId?.toString() || "",
      productSubcategoryId: row.productSubcategoryId?.toString() || "",
      productId: row.productId?.toString() || "",
      annualProductionCap: row.annualProductionCap?.toString() || "",
      availableStock: row.availableStock?.toString() || "",
      inProduction: row.inProduction || false,
      dateOfAvailability: row.dateOfAvailability || "",
      isOrganic: row.isOrganic || false,
    });

    setUploadedFile(null);
    setPreviewImage(row.docId ? `/mock/uploads/${row.docId}.jpg` : null);
  };

  // ------------------- TABLE -------------------
  const columns = [
    "Category",
    "Subcategory",
    "Product",
    "Annual Production Cap",
    "Available Stock",
    "In Production",
    "Publish on e-Mart",
    "Actions",
  ];

  const previewData = [
    { label: "Category", value: categories.find((c) => c.productCategoryId == formik.values.productCategoryId)?.productCategoryName || "" },
    { label: "Subcategory", value: subcategories.find((s) => s.productSubcategoryId == formik.values.productSubcategoryId)?.subcategoryName || "" },
    { label: "Product", value: products.find((p) => p.id == formik.values.productId)?.productName || "" },
    { label: "Annual Production Cap", value: formik.values.annualProductionCap },
    { label: "Available Stock", value: formik.values.availableStock },
    { label: "In Production", value: formik.values.inProduction ? "Yes" : "No" },
    { label: "Date of Availability", value: formik.values.dateOfAvailability },
    { label: "Organic", value: formik.values.isOrganic ? "Yes" : "No" },
    { label: "Publish on e-Mart", value: publishOnEmart ? "Yes" : "No" },
  ];

  // ------------------- RENDER -------------------
  return (
    <div>
      <div className="border border-stroke-200 rounded-[8px] p-[16px]">
        <h2 className="text-base font-bold mb-6">
          {isUpdateMode ? "Update Commodity Production" : "Add Commodity Production"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <SelectField
            label="Category"
            required
            name="productCategoryId"
            value={formik.values.productCategoryId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.productCategoryId}
            touched={formik.touched.productCategoryId}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.productCategoryId} value={c.productCategoryId}>{c.productCategoryName}</option>
            ))}
          </SelectField>

          <SelectField
            label="Subcategory"
            required
            name="productSubcategoryId"
            value={formik.values.productSubcategoryId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.productSubcategoryId}
            touched={formik.touched.productSubcategoryId}
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((s) => (
              <option key={s.productSubcategoryId} value={s.productSubcategoryId}>{s.subcategoryName}</option>
            ))}
          </SelectField>

          <SelectField
            label="Product"
            required
            name="productId"
            value={formik.values.productId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.productId}
            touched={formik.touched.productId}
          >
            <option value="">Select Product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.productName}</option>
            ))}
          </SelectField>

          <TextField
            label="Annual Production Cap"
            name="annualProductionCap"
            type="text"
            value={formik.values.annualProductionCap}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.annualProductionCap}
            touched={formik.touched.annualProductionCap}
          />

          <TextField
            label="Available Stock"
            name="availableStock"
            type="text"
            value={formik.values.availableStock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.availableStock}
            touched={formik.touched.availableStock}
          />



          <CheckboxField
            label="Organic"
            name="isOrganic"
            checked={formik.values.isOrganic}
            onChange={() => {
              formik.setFieldValue("isOrganic", !formik.values.isOrganic);
              formik.setFieldTouched("isOrganic", true);
            }}
            error={formik.errors.isOrganic}
            touched={formik.touched.isOrganic}
          />


          <TextField
            label="Date of Availability"
            type="date"
            name="dateOfAvailability"
            value={formik.values.dateOfAvailability}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.dateOfAvailability}
            touched={formik.touched.dateOfAvailability}
          />

          <CheckboxField
            label="In Production"
            name="inProduction"
            checked={formik.values.inProduction}
            onChange={() => {
              formik.setFieldValue("inProduction", !formik.values.inProduction);
              formik.setFieldTouched("inProduction", true);
            }}
            error={formik.errors.inProduction}
            touched={formik.touched.inProduction}
          />
        </div>

        <AccordionGroup
          items={[{
            id: "add-doc",
            title: "Upload Document",
            isInitiallyOpen: true,
            content: <UploadDocument key={uploadResetKey} config={uploadConfig} onFileSelect={handleFileSelect} />,
          }]}
        />

        {/* <div className="my-8 flex flex-col md:flex-row justify-between gap-4 p-4 bg-grey-50 rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Publish on e-Mart?</span>
            <CheckboxField
              checked={publishOnEmart}
              onChange={() => setPublishOnEmart(!publishOnEmart)}
            />
          </div>
          <div className="flex gap-4">
            <Button type="button" onClick={handleAddOrUpdateClick}>
              {isUpdateMode ? "Update" : "+ Add"}
            </Button>
          </div>
        </div> */}

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

      <div className="mt-8">
        <Table
          columns={columns}
          data={commodityList.map((row) => ({
            Category: row.productCategoryName || "-",
            Subcategory: row.productSubcategoryName || "-",
            Product: row.productName || "-",
            "Annual Production Cap": row.annualProductionCap ?? "-",
            "Available Stock": row.availableStock ?? "-",
            "In Production": row.inProduction ? "Yes" : "No",
            "Publish on e-Mart": row.emartPublish ? "Yes" : "No",
            ...row,
          }))}
          rowKey="id"
          renderActions={(row) => (
            <div className="flex gap-2 items-center">
              <img src={editSvg} alt="edit" className="w-6 cursor-pointer" onClick={() => handleEdit(row)} />
              <img src={viewSvg} alt="view" className="w-6 cursor-pointer" onClick={() => {
                setPreviewImage(row.docId ? `/mock/uploads/${row.docId}.jpg` : null);
                setIsPreviewModalOpen(true);
              }} />
              <span className="text-[10px] px-2 py-1 rounded bg-gray-100">
                {row.emartPublish ? "✓ Publish" : "Publish"}
              </span>
            </div>
          )}
        />
      </div>

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
