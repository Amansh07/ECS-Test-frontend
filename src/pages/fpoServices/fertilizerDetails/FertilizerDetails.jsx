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
import { fertilizerDetailsValidationSchema } from "../validation";

/* ================= INITIAL FERTILIZER VALUES ================= */
const initialFertilizerDetailsData = {
    fertilizerType: "",
    fertilizerName: "",
    fertilizerGrade: "",
    nameOfManufacturer: "",
    quantityType: "",
    quantity: "",
    cropDescription: "",
};

export const FertilizerDetails = () => {
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadResetKey, setUploadResetKey] = useState(0);
    const [publishOnEmart, setPublishOnEmart] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [isAddImageExpanded, setIsAddImageExpanded] = useState(false);

    const [fertilizerList, setFertilizerList] = useState([]);

    const uploadConfig = {
        title: "Upload Fertilizer Photo *",
        maxSizeMB: "Max - 5mb",
        allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
    };

    /* ================= FORMIK ================= */
    const formik = useFormik({
        initialValues: initialFertilizerDetailsData,
        validationSchema: fertilizerDetailsValidationSchema,
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
        setFertilizerList((prev) => [
            ...prev,
            {
                "Fertilizer Type": formik.values.fertilizerType,
                "Fertilizer Name": formik.values.fertilizerName,
                Grade: formik.values.fertilizerGrade,
                Manufacturer: formik.values.nameOfManufacturer,
                Quantity: `${formik.values.quantity} ${formik.values.quantityType}`,
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
        { label: "Fertilizer Type", value: formik.values.fertilizerType },
        { label: "Fertilizer Name", value: formik.values.fertilizerName },
        { label: "Grade", value: formik.values.fertilizerGrade },
        { label: "Manufacturer", value: formik.values.nameOfManufacturer },
        { label: "Quantity Type", value: formik.values.quantityType },
        { label: "Quantity", value: formik.values.quantity },
        { label: "Description", value: formik.values.cropDescription },
        { label: "Publish on e-Mart", value: publishOnEmart ? "Yes" : "No" },
    ];

    /* ================= UI ================= */
    return (
        <div>
            <div className="border border-stroke-200 rounded-[8px] p-[16px]">
                <h2 className="text-base font-bold mb-6">Fertilizer Details</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                        <option value="">Enter Category</option>
                        <option value="Organic">Organic</option>
                        <option value="Inorganic">Inorganic</option>
                    </SelectField>

                    <TextField
                        label="Fertilizer Name"
                        required
                        placeholder="Fertilizer Name"
                        name="fertilizerName"
                        value={formik.values.fertilizerName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.fertilizerName}
                        touched={formik.touched.fertilizerName}
                    />

                    <TextField
                        label="Fertilizer Grade"
                        required
                        name="fertilizerGrade"
                        placeholder="Enter Name"
                        value={formik.values.fertilizerGrade}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.fertilizerGrade}
                        touched={formik.touched.fertilizerGrade}
                    />

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
                        <option value="Bag">Bag</option>
                    </SelectField>

                    <TextField
                        label="Quantity"
                        required
                        name="quantity"
                        placeholder="Enter Value"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.quantity}
                        touched={formik.touched.quantity}
                    />
                </div>

                <TextArea
                    label="Crop Description"
                    required
                    name="cropDescription"
                    placeholder="Enter Text"
                    value={formik.values.cropDescription}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.cropDescription}
                    touched={formik.touched.cropDescription}
                />

                {/* Add Image */}
                <div className="mb-6">
                    <div
                        className="w-full bg-primary-100 rounded-xl p-4 cursor-pointer flex justify-between items-center"
                        onClick={() => setIsAddImageExpanded(!isAddImageExpanded)}
                    >
                        <h3 className="text-base font-medium">Add Image</h3>
                        <svg
                            className={`w-5 h-5 transition-transform ${isAddImageExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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

                <hr className="border border-stroke-200 my-4" />

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
            </div>
            {/* <hr className="border border-stroke-200 mt-6" /> */}
            <h3 className="font-bold text-base mb-[27px] mt-6">Fertilizer Listing</h3>
            <Table
                columns={[
                    "Fertilizer Type",
                    "Fertilizer Name",
                    "Grade",
                    "Manufacturer",
                    "Quantity",
                    "Actions",
                ]}
                data={fertilizerList}
                renderActions={(row) => (
                    <div className="flex gap-2">
                        <img src={editSvg} className="w-6 cursor-pointer" />
                        <img src={viewSvg} className="w-6 cursor-pointer" />
                        <div
                            className={`w-[137px] text-[14px] font-normal px-[12px] py-[6px] rounded-lg flex items-center justify-center
    ${row["Publish Emart"]
                                    ? "bg-primary-100 text-dark"
                                    : "bg-danger-50 text-dark"
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
                title="Preview Fertilizer Details"
                image={uploadedImage}
                data={previewData}
            />

            <StatusModal
                isOpen={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                status
                message="Fertilizer details added successfully."
            />
        </div>
    );
};
