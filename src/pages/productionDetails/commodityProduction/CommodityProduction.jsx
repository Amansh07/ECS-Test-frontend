import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { TextField, SelectField, TextArea, CheckboxField } from "../../../components/FormFields";
import Table from "../../../components/Table";
import UploadDocument from "../../../components/UploadDocument";
import Toggle from "../../../components/Toggle";
import PreviewModal from "../../../components/PreviewModal";
import StatusModal from "../../../components/StatusModal";
import { Button } from "../../../components/Buttons";
import { AccordionGroup } from "../../../components/Accordion";

import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";
import { cropProductionValidationSchema } from "../validation"; // You can create a separate schema for commodities

import { listCommodityProduction, createCommodityProduction, updateCommodityProduction } from "../../../api/productionDetailsMock";
import { getGeneralMasterByType } from "../../../api/masterMock";
import { uploadDocument } from "../../../api/uploadMock";

const initialValues = {
  productCategoryId: "",
  productSubcategoryId: "",
  productId: "",
  isOrganic: false,
  annualProductionCap: "",
  inProduction: false,
  availableStock: "",
  dateOfAvailability: "",
  description: "",
};

export const CommodityProduction = () => {
  const [isPopulatingEditValues, setIsPopulatingEditValues] = useState(false);
  const [prevCategoryId, setPrevCategoryId] = useState("");
  const [prevSubcategoryId, setPrevSubcategoryId] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadResetKey, setUploadResetKey] = useState(0);
  const [publishOnEmart, setPublishOnEmart] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusConfig, setStatusConfig] = useState({ status: true, message: "" });

  const [commodityList, setCommodityList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [existingDocId, setExistingDocId] = useState(null);

  const uploadConfig = {
    title: "Add Crop Image *",
    maxSizeMB: "Max - 5mb",
    allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: cropProductionValidationSchema, // create a separate one if needed
    validateOnChange: false,
    validateOnBlur: true,
  });

  useEffect(() => {
    fetchCommodityList();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await getGeneralMasterByType("ProductCategory");
    if (res.status === 200 && res.data.success) {
      setCategories(res.data.data.filter((c) => c.isActive));
    }
  };

  useEffect(() => {
    if (!formik.values.productCategoryId) {
      setSubcategories([]);
      setProducts([]);
      if (!isPopulatingEditValues) {
        formik.setFieldValue("productSubcategoryId", "");
        formik.setFieldValue("productId", "");
      }
      setPrevCategoryId("");
      return;
    }

    const fetchSubcategories = async () => {
      const res = await getGeneralMasterByType("ProductSubcategory");
      if (res.status === 200 && res.data.success) {
        const activeSubcats = res.data.data.filter((s) => s.isActive);
        setSubcategories(activeSubcats);

        if (!isPopulatingEditValues && formik.values.productCategoryId !== prevCategoryId) {
          formik.setFieldValue("productSubcategoryId", "");
          formik.setFieldValue("productId", "");
        }
        setPrevCategoryId(formik.values.productCategoryId);
      }
    };
    fetchSubcategories();
  }, [formik.values.productCategoryId, isPopulatingEditValues]);

  useEffect(() => {
    if (!formik.values.productSubcategoryId) {
      setProducts([]);
      if (!isPopulatingEditValues) {
        formik.setFieldValue("productId", "");
      }
      setPrevSubcategoryId("");
      return;
    }

    const fetchProducts = async () => {
      const res = await getGeneralMasterByType("Product");
      if (res.status === 200 && res.data.success) {
        const activeProducts = res.data.data.filter((p) => p.isActive);
        setProducts(activeProducts);

        if (!isPopulatingEditValues && formik.values.productSubcategoryId !== prevSubcategoryId) {
          formik.setFieldValue("productId", "");
        }
        setPrevSubcategoryId(formik.values.productSubcategoryId);
      }
    };
    fetchProducts();
  }, [formik.values.productSubcategoryId, isPopulatingEditValues]);

  const fetchCommodityList = async () => {
    const res = await listCommodityProduction(1);
    if (res.status === 200 && res.data.success) {
      const categoriesMaster = await getGeneralMasterByType("ProductCategory");
      const subcategoriesMaster = await getGeneralMasterByType("ProductSubcategory");
      const productsMaster = await getGeneralMasterByType("Product");

      const mapped = res.data.data.map((item) => ({
        itemId: item.id,
        productCategoryId: item.productCategoryId,
        productSubcategoryId: item.productSubcategoryId,
        productId: item.productId,
        isOrganic: item.isOrganic,
        annualProductionCap: item.annualProductionCap,
        inProduction: item.inProduction,
        availableStock: item.availableStock,
        dateOfAvailability: item.dateOfAvailability,
        emartPublish: item.emartPublish,
        docId: item.docId,

        Category: categoriesMaster.data.data.find((c) => c.parentId === item.productCategoryId)?.name || `Category ${item.productCategoryId}`,
        Subcategory: subcategoriesMaster.data.data.find((s) => s.parentId === item.productSubcategoryId)?.name || `Subcategory ${item.productSubcategoryId}`,
        Product: productsMaster.data.data.find((p) => p.parentId === item.productId)?.name || `Product ${item.productId}`,
      }));
      setCommodityList(mapped);
    }
  };

  const handleFileSelect = (file) => {
    setUploadedFile(file);
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleAddOrUpdateClick = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      formik.setTouched(Object.keys(errors).reduce((acc, key) => { acc[key] = true; return acc; }, {}));
      return;
    }
    setIsPreviewModalOpen(true);
  };

  const handlePreviewConfirm = async () => {
    let docId = existingDocId;
    if (uploadedFile) {
      const uploadRes = await uploadDocument({ file: uploadedFile, fpoId: 1, docType: 1 });
      if (uploadRes.status === 200 && uploadRes.data.success) docId = uploadRes.data.documentId;
    }

    const payload = {
      productCategoryId: formik.values.productCategoryId,
      productSubcategoryId: formik.values.productSubcategoryId,
      productId: formik.values.productId,
      isOrganic: formik.values.isOrganic,
      annualProductionCap: formik.values.annualProductionCap,
      inProduction: formik.values.inProduction,
      availableStock: formik.values.availableStock,
      dateOfAvailability: formik.values.dateOfAvailability,
      description: formik.values.description,
      emartPublish: publishOnEmart,
      docId,
      fpoId: 1,
    };

    let res;
    if (isUpdateMode) res = await updateCommodityProduction(editingId, payload);
    else res = await createCommodityProduction(payload);

    if (res.status === 200 && res.data.success) {
      setIsPreviewModalOpen(false);
      setStatusConfig({ status: true, message: isUpdateMode ? "Commodity Updated Successfully" : "Commodity Added Successfully" });
      setIsStatusModalOpen(true);
      resetAll();
      fetchCommodityList();
    } else {
      setStatusConfig({ status: false, message: "Something went wrong. Try again!" });
      setIsStatusModalOpen(true);
    }
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

  const handleEdit = async (row) => {
    setIsUpdateMode(true);
    setEditingId(row.itemId);
    setExistingDocId(row.docId);
    setIsPopulatingEditValues(true);
    setPreviewImage(row.docId ? `/mock/uploads/${row.docId}.jpg` : null);
    setPublishOnEmart(row.emartPublish);


    const subcategoriesRes = await getGeneralMasterByType("ProductSubcategory");
    setSubcategories(subcategoriesRes.data.data.filter((s) => s.isActive));

    const productsRes = await getGeneralMasterByType("Product");
    setProducts(productsRes.data.data.filter((p) => p.isActive));

    formik.setValues({
      productCategoryId: row.productCategoryId,
      productSubcategoryId: row.productSubcategoryId,
      productId: row.productId,
      isOrganic: row.isOrganic,
      annualProductionCap: row.annualProductionCap,
      inProduction: row.inProduction,
      availableStock: row.availableStock,
      dateOfAvailability: row.dateOfAvailability,
      description: row.description || "",
    });

    setTimeout(() => setIsPopulatingEditValues(false), 0);
  };

  const previewData = [
    { label: "Category", value: formik.values.productCategoryId },
    { label: "Subcategory", value: formik.values.productSubcategoryId },
    { label: "Product", value: formik.values.productId },
    { label: "Organic", value: formik.values.isOrganic ? "Yes" : "No" },
    { label: "Annual Production Cap", value: formik.values.annualProductionCap },
    { label: "In Production", value: formik.values.inProduction ? "Yes" : "No" },
    { label: "Available Stock", value: formik.values.availableStock },
    { label: "Date of Availability", value: formik.values.dateOfAvailability },
    { label: "Publish on e-Mart", value: publishOnEmart ? "Yes" : "No" },
  ];

  return (
    <div>
      {/* Form */}
      <div className="border border-stroke-200 rounded-[8px] p-[16px]">
        <h2 className="text-base font-bold mb-6">{isUpdateMode ? "Update Commodity" : "Add Commodity"}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <SelectField label="Category" required name="productCategoryId" value={formik.values.productCategoryId}
            onChange={e => formik.setFieldValue("productCategoryId", Number(e.target.value))} onBlur={formik.handleBlur}
            error={formik.errors.productCategoryId} touched={formik.touched.productCategoryId}>
            <option value="">Select Category</option>
            {categories.map(c => <option key={c.parentId} value={c.parentId}>{c.name}</option>)}
          </SelectField>

          <SelectField label="Subcategory" required name="productSubcategoryId" value={formik.values.productSubcategoryId}
            onChange={e => formik.setFieldValue("productSubcategoryId", Number(e.target.value))} onBlur={formik.handleBlur}
            error={formik.errors.productSubcategoryId} touched={formik.touched.productSubcategoryId}>
            <option value="">Select Subcategory</option>
            {subcategories.map(s => <option key={s.parentId} value={s.parentId}>{s.name}</option>)}
          </SelectField>

          <SelectField label="Product" required name="productId" value={formik.values.productId}
            onChange={e => formik.setFieldValue("productId", Number(e.target.value))} onBlur={formik.handleBlur}
            error={formik.errors.productId} touched={formik.touched.productId}>
            <option value="">Select Product</option>
            {products.map(p => <option key={p.parentId} value={p.parentId}>{p.name}</option>)}
          </SelectField>

          <CheckboxField
            label="Organic?"
            name="isOrganic"
            checked={formik.values.isOrganic}
            onChange={(e) => formik.setFieldValue("isOrganic", e.target.checked)}
            onBlur={formik.handleBlur}
            error={formik.errors.isOrganic}
            touched={formik.touched.isOrganic}
          />


          <TextField label="Annual Production Cap" type="number" name="annualProductionCap" value={formik.values.annualProductionCap}
            onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.annualProductionCap} touched={formik.touched.annualProductionCap} />

          <CheckboxField
            label="In Production?"
            name="inProduction"
            checked={formik.values.inProduction}
            onChange={(e) => formik.setFieldValue("inProduction", e.target.checked)}
            onBlur={formik.handleBlur}
            error={formik.errors.inProduction}
            touched={formik.touched.inProduction}
          />


          <TextField label="Available Stock" type="number" name="availableStock" value={formik.values.availableStock}
            onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.availableStock} touched={formik.touched.availableStock} />

          <TextField label="Date Of Availability" type="date" name="dateOfAvailability" value={formik.values.dateOfAvailability}
            onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.dateOfAvailability} touched={formik.touched.dateOfAvailability} />

          <TextArea label="Description" name="description" value={formik.values.description}
            onChange={formik.handleChange} onBlur={formik.handleBlur} error={formik.errors.description} touched={formik.touched.description} />
        </div>

      <div className="mb-6">
          <AccordionGroup
            items={[{
              id: "add-image",
              title: "Add Image",
              isInitiallyOpen: true,
              content: (
                <div className="p-4 bg-primary-50 rounded-lg">
                  <UploadDocument key={uploadResetKey} config={uploadConfig} onFileSelect={handleFileSelect} />
                </div>
              ),
            }]}
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

      {/* Table */}
      <h3 className="font-bold text-base my-6">Commodity Production Detail View</h3>
      <Table
        columns={["Category", "Subcategory", "Product", "Organic", "Annual Production Cap", "In Production", "Available Stock", "Date of Availability", "Actions"]}
        data={commodityList.map(row => ({
          ...row,
          Category: row.Category,
          Subcategory: row.Subcategory,
          Product: row.Product,
          Organic: row.isOrganic ? "Yes" : "No",
          "Annual Production Cap": row.annualProductionCap,
          "In Production": row.inProduction ? "Yes" : "No",
          "Available Stock": row.availableStock,
          "Date of Availability": row.dateOfAvailability,
        }))}
        renderActions={row => (
          <div className="flex gap-2 items-center">
            <img src={editSvg} alt="edit" className="w-6 cursor-pointer" onClick={() => handleEdit(row)} />
            <img src={viewSvg} alt="view" className="w-6 cursor-pointer" onClick={() => { setPreviewImage(row.docId ? `/mock/uploads/${row.docId}.jpg` : null); setIsPreviewModalOpen(true); }} />
            <span className="text-[10px] px-2 py-1 rounded bg-gray-100">{row.emartPublish ? "✓ Publish" : "Publish"}</span>
          </div>
        )}
      />

      {/* Modals */}
      <PreviewModal isOpen={isPreviewModalOpen} onClose={() => setIsPreviewModalOpen(false)} onConfirm={handlePreviewConfirm} data={previewData} image={previewImage} />
      <StatusModal isOpen={isStatusModalOpen} onClose={() => setIsStatusModalOpen(false)} status={statusConfig.status} message={statusConfig.message} />
    </div>
  );
};
