import React, { useState } from "react";
import { useFormik } from "formik";

import { TextField, SelectField, TextArea } from "../../../components/FormFields";
import Table from "../../../components/Table";
import UploadDocument from "../../../components/UploadDocument";
import Toggle from "../../../components/Toggle";
import PreviewModal from "../../../components/PreviewModal";
import StatusModal from "../../../components/StatusModal";
import { Button } from "../../../components/Buttons";

import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";
import { insecticideOrPesticideDetailsValidationSchema } from "../validation";

/* ================= INITIAL VALUES ================= */
const initialInsecticideOrPesticideDetailsData = {
  insecticideOrPesticideType: "",
  insecticideOrPesticideName: "",
  nameOfManufacturer: "",
  quantityType: "",
  quantity: "",
  cibRcNumber: "",
  cibRcIssueDate: "",
  insecticideOrPesticideDescription: "",
};

export const InsecticideOrPesticideDetails = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadResetKey, setUploadResetKey] = useState(0);
  const [publishOnEmart, setPublishOnEmart] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isAddImageExpanded, setIsAddImageExpanded] = useState(false);

  const [insecticideOrPesticideList, setInsecticideOrPesticideList] =
    useState([]);

  const uploadConfig = {
    title: "Upload Insecticide / Pesticide Photo *",
    maxSizeMB: "Max - 5mb",
    allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
  };

  /* ================= FORMIK ================= */
  const formik = useFormik({
    initialValues: initialInsecticideOrPesticideDetailsData,
    validationSchema: insecticideOrPesticideDetailsValidationSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  /* ================= HANDLERS ================= */
  const handleFileSelect = (file) => {
    setUploadedImage(file ? URL.createObjectURL(file) : null);
  };

  const handleAddToList = async () => {
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

  const handlePreviewConfirm = () => {
    setInsecticideOrPesticideList((prev) => [
      ...prev,
      {
        "Type": formik.values.insecticideOrPesticideType,
        "Name": formik.values.insecticideOrPesticideName,
        "Manufacturer": formik.values.nameOfManufacturer,
        "CIB & RC No.": formik.values.cibRcNumber,
        "Issue Date": formik.values.cibRcIssueDate,
        "Quantity": `${formik.values.quantity} ${formik.values.quantityType}`,
        "Publish Emart": publishOnEmart,
      },
    ]);

    setIsPreviewModalOpen(false);
    setIsStatusModalOpen(true);

    formik.resetForm();
    setUploadedImage(null);
    setPublishOnEmart(false);
    setUploadResetKey((prev) => prev + 1);
  };

  /* ================= PREVIEW DATA ================= */
  const previewData = [
    {
      label: "Type",
      value: formik.values.insecticideOrPesticideType,
    },
    {
      label: "Name",
      value: formik.values.insecticideOrPesticideName,
    },
    {
      label: "Manufacturer",
      value: formik.values.nameOfManufacturer,
    },
    {
      label: "CIB & RC Number",
      value: formik.values.cibRcNumber,
    },
    {
      label: "CIB & RC Issue Date",
      value: formik.values.cibRcIssueDate,
    },
    {
      label: "Quantity Type",
      value: formik.values.quantityType,
    },
    {
      label: "Quantity",
      value: formik.values.quantity,
    },
    {
      label: "Description",
      value: formik.values.insecticideOrPesticideDescription,
    },
    {
      label: "Publish on e-Mart",
      value: publishOnEmart ? "Yes" : "No",
    },
  ];

  /* ================= UI ================= */
  return (
    <div>
      <h2 className="text-base font-bold mb-6">
        Insecticide / Pesticide Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <SelectField
          label="Type"
          required
          name="insecticideOrPesticideType"
          value={formik.values.insecticideOrPesticideType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.insecticideOrPesticideType}
          touched={formik.touched.insecticideOrPesticideType}
        >
          <option value="">Select Type</option>
          <option value="Insecticide">Insecticide</option>
          <option value="Pesticide">Pesticide</option>
        </SelectField>

        <TextField
          label="Name"
          required
          name="insecticideOrPesticideName"
          placeholder="Enter Name"
          value={formik.values.insecticideOrPesticideName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.insecticideOrPesticideName}
          touched={formik.touched.insecticideOrPesticideName}
        />

        <TextField
          label="Name of Manufacturer"
          required
          name="nameOfManufacturer"
          placeholder="Enter Manufacturer Name"
          value={formik.values.nameOfManufacturer}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.nameOfManufacturer}
          touched={formik.touched.nameOfManufacturer}
        />

        <TextField
          label="CIB & RC Number"
          required
          name="cibRcNumber"
          placeholder="Enter CIB & RC Number"
          value={formik.values.cibRcNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.cibRcNumber}
          touched={formik.touched.cibRcNumber}
        />

        <TextField
          label="CIB & RC Issue Date"
          required
          type="date"
          name="cibRcIssueDate"
          value={formik.values.cibRcIssueDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.cibRcIssueDate}
          touched={formik.touched.cibRcIssueDate}
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
          <option value="">Select Type</option>
          <option value="Kg">Kg</option>
          <option value="Litre">Litre</option>
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
      </div>

      <TextArea
        label="Description"
        required
        name="insecticideOrPesticideDescription"
        placeholder="Enter Description"
        value={formik.values.insecticideOrPesticideDescription}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.insecticideOrPesticideDescription}
        touched={formik.touched.insecticideOrPesticideDescription}
      />

      {/* Add Image */}
      <div className="mb-6">
        <div
          className="w-full bg-primary-100 rounded-xl p-4 cursor-pointer flex justify-between items-center"
          onClick={() => setIsAddImageExpanded(!isAddImageExpanded)}
        >
          <h3 className="text-base font-medium">Add Image</h3>
          <svg
            className={`w-5 h-5 transition-transform ${isAddImageExpanded ? "rotate-180" : ""
              }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {isAddImageExpanded && (
          <div className="mt-4 p-4 bg-primary-100 rounded-xl">
            <UploadDocument
              key={uploadResetKey}
              config={uploadConfig}
              onFileSelect={handleFileSelect}
            />
          </div>
        )}
      </div>

      <div className="my-8 flex justify-between items-center p-4 bg-grey-50 rounded-lg">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Publish on e-Mart?</span>
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
            onClick={handleAddToList}
            buttonClassName="px-6 py-2.5 text-sm font-semibold text-white bg-success rounded-md"
          >
            + Add to Inventory
          </Button>
        </div>
      </div>

      <h3 className="font-bold text-base mb-6">
        Insecticide / Pesticide Listing
      </h3>

      <Table
        columns={[
          "Type",
          "Name",
          "Manufacturer",
          "CIB & RC No.",
          "Issue Date",
          "Quantity",
          "Actions",
        ]}
        data={insecticideOrPesticideList}
        renderActions={(row) => (
          <div className="flex gap-2">
            <img src={editSvg} className="w-6 cursor-pointer" />
            <img src={viewSvg} className="w-6 cursor-pointer" />
            <div
              className={`px-3 py-1 rounded-lg text-sm ${row["Publish Emart"]
                ? "bg-primary-100"
                : "bg-danger-50"
                }`}
            >
              {row["Publish Emart"] ? "✓ Publish Emart" : "Publish Emart"}
            </div>
          </div>
        )}
      />

      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onConfirm={handlePreviewConfirm}
        title="Preview Insecticide / Pesticide Details"
        image={uploadedImage}
        data={previewData}
      />

      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        status
        message="Insecticide / Pesticide details added successfully."
      />
    </div>
  );
};
