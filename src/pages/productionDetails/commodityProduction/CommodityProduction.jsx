// import React, { useState } from 'react';
// import { TextField, SelectField, CheckboxField } from '../../../components/FormFields';
// import Table from '../../../components/Table';
// import UploadDocument from '../../../components/UploadDocument';
// import Toggle from '../../../components/Toggle';
// import PreviewModal from '../../../components/PreviewModal';
// import StatusModal from '../../../components/StatusModal';
// import { Button } from '../../../components/Buttons';
// import { AccordionGroup } from '../../../components/Accordion';
// import editSvg from "../../../assets/edit.svg";
// import viewSvg from "../../../assets/view.svg";

// export const CommodityProduction = () => {
//     // Form state
//     const [formData, setFormData] = useState({
//         productCategory: '',
//         subcategory: '',
//         productName: '',
//         isOrganic: false,
//         annualProductionCap: '',
//         inProduction: '',
//         availableStock: '',
//         dateOfAvailability: ''
//     });

//     const [uploadedImage, setUploadedImage] = useState(null);
//     const [publishOnEmart, setPublishOnEmart] = useState(false);
//     const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
//     const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
//     const [productionList, setProductionList] = useState([
//         {
//             'Product Category': 'Value',
//             'Subcategory': 'Value',
//             'Product Name': 'Value',
//             'Is Organic': 'Value',
//             'Publish Emart': true
//         },
//         {
//             'Product Category': 'Value',
//             'Subcategory': 'Value',
//             'Product Name': 'Value',
//             'Is Organic': 'Value',
//             'Publish Emart': false
//         },
//         {
//             'Product Category': 'Value',
//             'Subcategory': 'Value',
//             'Product Name': 'Value',
//             'Is Organic': 'Value',
//             'Publish Emart': true
//         },
//     ]);

//     const uploadConfig = {
//         title: "Add Crop Image *",
//         maxSizeMB: "Max - 5mb",
//         allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
//     };

//     const handleInputChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const handleFileSelect = (file) => {
//         if (file) {
//             setUploadedImage(URL.createObjectURL(file));
//         } else {
//             setUploadedImage(null);
//         }
//     };

//     const handleAddToProductionList = () => {
//         // Open preview modal when "Add to Production List" is clicked
//         setIsPreviewModalOpen(true);
//     };

//     const handlePreviewConfirm = () => {
//         // Close preview modal and open status modal
//         setIsPreviewModalOpen(false);

//         // Add to production list
//         const newEntry = {
//             'Product Category': formData.productCategory || 'Value',
//             'Subcategory': formData.subcategory || 'Value',
//             'Product Name': formData.productName || 'Value',
//             'Is Organic': formData.isOrganic ? 'Yes' : 'No',
//             'Publish Emart': publishOnEmart
//         };
//         setProductionList(prev => [...prev, newEntry]);

//         // Show success modal
//         setIsStatusModalOpen(true);

//         // Reset form
//         setFormData({
//             productCategory: '',
//             subcategory: '',
//             productName: '',
//             isOrganic: false,
//             annualProductionCap: '',
//             inProduction: '',
//             availableStock: '',
//             dateOfAvailability: ''
//         });
//         setUploadedImage(null);
//         setPublishOnEmart(false);
//     };

//     const handleStatusModalClose = () => {
//         setIsStatusModalOpen(false);
//     };

//     const handleEditClick = (row) => {
//         console.log('Edit clicked for:', row);
//     };

//     const handleViewClick = (row) => {
//         console.log('View clicked for:', row);
//     };

//     // Prepare preview data
//     const previewData = [
//         { label: 'Product Category', value: formData.productCategory || '-' },
//         { label: 'Subcategory', value: formData.subcategory || '-' },
//         { label: 'Product Name', value: formData.productName || '-' },
//         { label: 'Is Organic', value: formData.isOrganic ? 'Yes' : 'No' },
//         { label: 'Annual Production Capacity', value: formData.annualProductionCap || '-' },
//         { label: 'In Production', value: formData.inProduction || '-' },
//         { label: 'Available Stock for Sale', value: formData.availableStock || '-' },
//         { label: 'Date Of Availability', value: formData.dateOfAvailability || '-' },
//         { label: 'Publish on e-Mart', value: publishOnEmart ? 'Yes' : 'No' }
//     ];

//     return (
//         <div>
//             <div className='border border-stroke-200 rounded-[8px] p-[16px]'>
//                 <h2 className="text-base font-bold mb-6">Commodity Production Form</h2>

//                 {/* Form Fields */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//                     {/* Product Category */}
//                     <SelectField
//                         label="Product Category"
//                         required
//                         name="productCategory"
//                         value={formData.productCategory}
//                         onChange={handleInputChange}
//                     >
//                         <option value="">Select Product Category</option>
//                         <option value="Grains">Grains</option>
//                         <option value="Vegetables">Vegetables</option>
//                         <option value="Fruits">Fruits</option>
//                         <option value="Pulses">Pulses</option>
//                     </SelectField>

//                     {/* Subcategory */}
//                     <SelectField
//                         label="Subcategory"
//                         required
//                         name="subcategory"
//                         value={formData.subcategory}
//                         onChange={handleInputChange}
//                     >
//                         <option value="">Select Subcategory</option>
//                         <option value="Organic">Organic</option>
//                         <option value="Non-Organic">Non-Organic</option>
//                     </SelectField>

//                     {/* Product Name */}
//                     <SelectField
//                         label="Product Name"
//                         required
//                         name="productName"
//                         value={formData.productName}
//                         onChange={handleInputChange}
//                     >
//                         <option value="">Select Product Name</option>
//                         <option value="Rice">Rice</option>
//                         <option value="Wheat">Wheat</option>
//                         <option value="Tomato">Tomato</option>
//                         <option value="Potato">Potato</option>
//                     </SelectField>

//                     {/* Is Organic Checkbox */}
//                     <div className='mt-6'>
//                         <CheckboxField
//                             label="Is Organic?"
//                             name="isOrganic"
//                             checked={formData.isOrganic}
//                             onChange={handleInputChange}
//                         />
//                     </div>
//                     {/* Annual Production Capacity */}
//                     <TextField
//                         label="Annual Production Capacity"
//                         required
//                         name="annualProductionCap"
//                         placeholder="Enter Value"
//                         value={formData.annualProductionCap}
//                         onChange={handleInputChange}
//                     />

//                     {/* In Production */}
//                     <SelectField
//                         label="In Production"
//                         required
//                         name="inProduction"
//                         value={formData.inProduction}
//                         onChange={handleInputChange}
//                     >
//                         <option value="">Select Yes/No</option>
//                         <option value="Yes">Yes</option>
//                         <option value="No">No</option>
//                     </SelectField>

//                     {/* Available Stock for Sale */}
//                     <TextField
//                         label="Available Stock for Sale"
//                         name="availableStock"
//                         placeholder="Enter Value"
//                         value={formData.availableStock}
//                         onChange={handleInputChange}
//                     />

//                     {/* Date Of Availability */}
//                     <TextField
//                         label="Date Of Availability"
//                         required
//                         type="date"
//                         name="dateOfAvailability"
//                         placeholder="dd/mm/yyyy"
//                         value={formData.dateOfAvailability}
//                         onChange={handleInputChange}
//                     />
//                 </div>

//                 {/* Add Image Section */}
//                 <div className="mb-6">
//                     <AccordionGroup
//                         items={[
//                             {
//                                 id: 'add-image',
//                                 title: 'Add Image',
//                                 isInitiallyOpen: true,
//                                 content: (
//                                     <div className="p-4 bg-primary-50 rounded-lg">
//                                         <UploadDocument
//                                             config={uploadConfig}
//                                             onFileSelect={handleFileSelect}
//                                         />
//                                     </div>
//                                 )
//                             }
//                         ]}
//                     />
//                 </div>

//                 {/* Bottom Section: Publish Toggle + Action Buttons */}
//                 <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-grey-50 rounded-lg">
//                     {/* Publish on e-Mart Toggle */}
//                     <div className="flex items-center gap-4">
//                         <span className="text-sm font-medium text-grey-900">Want to Publish on e-Mart ?</span>
//                         <Toggle
//                             checked={publishOnEmart}
//                             onChange={setPublishOnEmart}
//                         />
//                     </div>

//                     {/* Action Buttons */}
//                     <div className="flex gap-4">
//                         <Button
//                             type="button"
//                             buttonClassName="px-6 py-2.5 text-sm font-semibold text-grey-700 bg-white border border-stroke-300 rounded-md shadow-sm hover:bg-grey-50 transition-colors"
//                         >
//                             Preview
//                         </Button>
//                         <Button
//                             type="button"
//                             onClick={handleAddToProductionList}
//                             buttonClassName="px-6 py-2.5 text-sm font-semibold text-white bg-success rounded-md shadow-sm hover:bg-success-600 transition-colors flex items-center gap-2"
//                         >
//                             <span>+</span>
//                             Add to Production List
//                         </Button>
//                     </div>
//                 </div>

//                 {/* <hr className="border-1 my-6" /> */}
//             </div>

//             {/* Table Section */}
//             <h2 className="text-base font-medium my-6">Commodity Production Detail view form</h2>

//             <Table
//                 columns={[
//                     "Product Category",
//                     "Subcategory",
//                     "Product Name",
//                     "Is Organic",
//                     "Actions"
//                 ]}
//                 data={productionList}
//                 stickyLastColumn={true}
//                 renderActions={(row) => (
//                     <div className="flex items-center justify-center gap-2">
//                         <img
//                             src={editSvg}
//                             alt="Edit"
//                             className="w-7 h-7 cursor-pointer flex-shrink-0"
//                             onClick={() => handleEditClick(row)}
//                         />
//                         <img
//                             src={viewSvg}
//                             alt="View"
//                             className="w-7 h-7 cursor-pointer flex-shrink-0"
//                             onClick={() => handleViewClick(row)}
//                         />
//                         <span
//                             className={`px-2 py-1 text-[10px] font-medium rounded whitespace-nowrap ${row['Publish Emart']
//                                 ? 'bg-success-100 text-success-800'
//                                 : 'bg-grey-100 text-grey-800'
//                                 }`}
//                         >
//                             {row['Publish Emart'] ? '✓ Publish' : 'Publish'}
//                         </span>
//                     </div>
//                 )}
//             />

//             {/* Preview Modal */}
//             <PreviewModal
//                 isOpen={isPreviewModalOpen}
//                 onClose={() => setIsPreviewModalOpen(false)}
//                 onConfirm={handlePreviewConfirm}
//                 title="Preview Commodity Production"
//                 image={uploadedImage}
//                 data={previewData}
//             />

//             {/* Status Modal */}
//             <StatusModal
//                 isOpen={isStatusModalOpen}
//                 onClose={handleStatusModalClose}
//                 status={true}
//                 message="Commodity production details have been added successfully."
//             />
//         </div>
//     );
// };
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";

import { TextField, SelectField, CheckboxField, TextArea } from "../../../components/FormFields";
import Table from "../../../components/Table";
import UploadDocument from "../../../components/UploadDocument";
import Toggle from "../../../components/Toggle";
import PreviewModal from "../../../components/PreviewModal";
import StatusModal from "../../../components/StatusModal";
import { Button } from "../../../components/Buttons";
import { AccordionGroup } from "../../../components/Accordion";

import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";
import { commodityProductionValidationSchema } from "../validation";

import { createCommodityProduction, listCommodityProduction } from "../../../api/productionDetailsMock";
import { getGeneralMasterByType } from "../../../api/masterMock";
import { uploadDocument } from "../../../api/uploadMock";

const initialValues = {
  productCategoryId: null,
  productSubcategoryId: null,
  productId: null,
  isOrganic: false,
  annualProductionCap: null,
  inProduction: false,
  availableStock: null,
  dateOfAvailability: "",
  productDescription: "",
};

export const CommodityProduction = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadResetKey, setUploadResetKey] = useState(0);
  const [publishOnEmart, setPublishOnEmart] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const [productionList, setProductionList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);

  const uploadConfig = {
    title: "Add Product Image *",
    maxSizeMB: "Max - 5mb",
    allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
  };

  const formik = useFormik({
    initialValues,
    validationSchema: commodityProductionValidationSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  useEffect(() => {
    fetchProductionList();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await getGeneralMasterByType("ProductCategory");
    if (res.status === 200 && res.data.success) {
      setCategories(res.data.data);
    }
  };

  const handleSubcategoryDropdown = async () => {
    if (formik.values.productCategoryId !== null) {
      const res = await getGeneralMasterByType("Subcategory");
      if (res.status === 200 && res.data.success) {
        setSubcategories(res.data.data);
      }
    }
  };

  const handleProductDropdown = async () => {
    if (formik.values.productSubcategoryId !== null) {
      const res = await getGeneralMasterByType("ProductName");
      if (res.status === 200 && res.data.success) {
        setProducts(res.data.data);
      }
    }
  };

  useEffect(() => {
    formik.setFieldValue("productSubcategoryId", null);
    formik.setFieldValue("productId", null);
    setSubcategories([]);
    setProducts([]);
  }, [formik.values.productCategoryId]);

  useEffect(() => {
    formik.setFieldValue("productId", null);
    setProducts([]);
  }, [formik.values.productSubcategoryId]);

  const fetchProductionList = async () => {
    const res = await listCommodityProduction(1);
    if (res.status === 200 && res.data.success) {
      const categoriesMaster = await getGeneralMasterByType("ProductCategory");
      const subcategoriesMaster = await getGeneralMasterByType("Subcategory");
      const productsMaster = await getGeneralMasterByType("ProductName");

      const mapped = res.data.data.map((item) => ({
        "Product Category":
          categoriesMaster.data.data.find((c) => c.id === item.productCategoryId)?.name ||
          `Category ${item.productCategoryId}`,
        Subcategory:
          subcategoriesMaster.data.data.find((s) => s.id === item.productSubcategoryId)?.name ||
          `Subcategory ${item.productSubcategoryId}`,
        "Product Name":
          productsMaster.data.data.find((p) => p.id === item.productId)?.name ||
          `Product ${item.productId}`,
        "Is Organic": item.isOrganic ? "Yes" : "No",
        "Publish Emart": item.emartPublish,
      }));

      setProductionList(mapped);
    }
  };

  const handleFileSelect = (file) => {
    setUploadedFile(file);
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleAddToProductionList = async () => {
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

  const handlePreviewConfirm = async () => {
    let docId = null;
    if (uploadedFile) {
      const uploadRes = await uploadDocument({ file: uploadedFile, fpoId: 1, docType: 1 });
      if (uploadRes.status === 200 && uploadRes.data.success) {
        docId = uploadRes.data.documentId;
      }
    }

    const payload = {
      productCategoryId: formik.values.productCategoryId,
      productSubcategoryId: formik.values.productSubcategoryId,
      productId: formik.values.productId,
      isOrganic: formik.values.isOrganic,
      annualProductionCap: Number(formik.values.annualProductionCap),
      inProduction: formik.values.inProduction,
      availableStock: Number(formik.values.availableStock),
      dateOfAvailability: formik.values.dateOfAvailability,
      productDescription: formik.values.productDescription,
      emartPublish: publishOnEmart,
      docId,
      fpoId: 1,
    };

    const res = await createCommodityProduction(payload);
    if (res.status === 200 && res.data.success) {
      setIsPreviewModalOpen(false);
      setIsStatusModalOpen(true);
      await fetchProductionList();
    }

    formik.resetForm();
    setUploadedFile(null);
    setPreviewImage(null);
    setPublishOnEmart(false);
    setUploadResetKey((prev) => prev + 1);
  };

  const previewData = [
    { label: "Product Category", value: categories.find(c => c.id === formik.values.productCategoryId)?.name || "" },
    { label: "Subcategory", value: subcategories.find(s => s.id === formik.values.productSubcategoryId)?.name || "" },
    { label: "Product Name", value: products.find(p => p.id === formik.values.productId)?.name || "" },
    { label: "Is Organic", value: formik.values.isOrganic ? "Yes" : "No" },
    { label: "Annual Production Capacity", value: formik.values.annualProductionCap },
    { label: "In Production", value: formik.values.inProduction ? "Yes" : "No" },
    { label: "Available Stock", value: formik.values.availableStock },
    { label: "Date Of Availability", value: formik.values.dateOfAvailability },
    { label: "Product Description", value: formik.values.productDescription },
    { label: "Publish on e-Mart", value: publishOnEmart ? "Yes" : "No" },
  ];

  return (
    <div>
      <div className="border border-stroke-200 rounded-[8px] p-[16px]">
        <h2 className="text-base font-bold mb-6">Commodity Production Update</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <SelectField
            label="Product Category"
            required
            name="productCategoryId"
            value={formik.values.productCategoryId ?? ""}
            onChange={(e) => formik.setFieldValue("productCategoryId", e.target.value ? Number(e.target.value) : null)}
            onBlur={formik.handleBlur}
            error={formik.errors.productCategoryId}
            touched={formik.touched.productCategoryId}
            onClick={fetchCategories}
          >
            <option value={null}>Select Product Category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </SelectField>

          <SelectField
            label="Subcategory"
            required
            name="productSubcategoryId"
            value={formik.values.productSubcategoryId ?? ""}
            onChange={(e) => formik.setFieldValue("productSubcategoryId", e.target.value ? Number(e.target.value) : null)}
            onBlur={formik.handleBlur}
            error={formik.errors.productSubcategoryId}
            touched={formik.touched.productSubcategoryId}
            onClick={handleSubcategoryDropdown}
          >
            <option value={null}>Select Subcategory</option>
            {subcategories.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </SelectField>

          <SelectField
            label="Product Name"
            required
            name="productId"
            value={formik.values.productId ?? ""}
            onChange={(e) => formik.setFieldValue("productId", e.target.value ? Number(e.target.value) : null)}
            onBlur={formik.handleBlur}
            error={formik.errors.productId}
            touched={formik.touched.productId}
            onClick={handleProductDropdown}
          >
            <option value={null}>Select Product Name</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </SelectField>

          <CheckboxField
            label="Is Organic?"
            name="isOrganic"
            checked={formik.values.isOrganic}
            onChange={formik.handleChange}
          />

          <TextField
            label="Annual Production Capacity"
            required
            type="number"
            name="annualProductionCap"
            placeholder="Enter Value"
            value={formik.values.annualProductionCap ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.annualProductionCap}
            touched={formik.touched.annualProductionCap}
          />

          <CheckboxField
            label="In Production?"
            name="inProduction"
            checked={formik.values.inProduction}
            onChange={formik.handleChange}
          />

          <TextField
            label="Available Stock"
            type="number"
            name="availableStock"
            placeholder="Enter Value"
            value={formik.values.availableStock ?? ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.availableStock}
            touched={formik.touched.availableStock}
          />

          <TextField
            label="Date Of Availability"
            required
            type="date"
            name="dateOfAvailability"
            value={formik.values.dateOfAvailability}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.dateOfAvailability}
            touched={formik.touched.dateOfAvailability}
          />
        </div>

          <TextArea
            label="Product Description"
            required
            name="productDescription"
            placeholder="Enter Description"
            value={formik.values.productDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.productDescription}
            touched={formik.touched.productDescription}
          />

        <div className="mb-6">
          <AccordionGroup
            items={[
              {
                id: "add-image",
                title: "Add Image",
                isInitiallyOpen: true,
                content: (
                  <div className="p-4 bg-primary-50 rounded-lg">
                    <UploadDocument
                      key={uploadResetKey}
                      config={uploadConfig}
                      onFileSelect={handleFileSelect}
                    />
                  </div>
                ),
              },
            ]}
          />
        </div>

        <div className="my-8 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-grey-50 rounded-lg">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Want to Publish on e-Mart ?</span>
            <Toggle checked={publishOnEmart} onChange={setPublishOnEmart} />
          </div>

          <div className="flex gap-4">
            <Button
              type="button"
              buttonClassName="px-6 py-2.5 text-sm font-semibold text-grey-700 bg-white border border-stroke-300 rounded-md shadow-sm hover:bg-grey-50 transition-colors"
            >
              Preview
            </Button>
            <Button
              type="button"
              onClick={handleAddToProductionList}
              buttonClassName="px-6 py-2.5 text-sm font-semibold text-white bg-success rounded-md shadow-sm hover:bg-success-600 transition-colors flex items-center gap-2"
            >
              <span>+</span>
              Add to Production List
            </Button>
          </div>
        </div>
      </div>

      <h3 className="font-bold text-base my-6">Commodity Production Detail view form</h3>
      <Table
        columns={["Product Category", "Subcategory", "Product Name", "Is Organic", "Actions"]}
        data={productionList}
        renderActions={(row) => (
          <div className="flex gap-2">
            <img src={editSvg} className="w-6 cursor-pointer" />
            <img src={viewSvg} className="w-6 cursor-pointer" />
            <span className="text-[10px] px-2 py-1 rounded">
              {row["Publish Emart"] ? "✓ Publish" : "Publish"}
            </span>
          </div>
        )}
      />

      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onConfirm={handlePreviewConfirm}
        title="Preview Commodity Production"
        image={previewImage}
        data={previewData}
      />

      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        status={true}
        message="Commodity production details have been added successfully."
      />
    </div>
  );
};
