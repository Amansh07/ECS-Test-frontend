import React, { useState } from 'react';
import { TextField, SelectField, CheckboxField } from '../../../components/FormFields';
import Table from '../../../components/Table';
import UploadDocument from '../../../components/UploadDocument';
import Toggle from '../../../components/Toggle';
import PreviewModal from '../../../components/PreviewModal';
import StatusModal from '../../../components/StatusModal';
import { Button } from '../../../components/Buttons';
import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";

export const CommodityProduction = () => {
    // Form state
    const [formData, setFormData] = useState({
        productCategory: '',
        subcategory: '',
        productName: '',
        isOrganic: false,
        annualProductionCapacity: '',
        inProduction: '',
        availableStock: '',
        dateOfAvailability: ''
    });

    const [uploadedImage, setUploadedImage] = useState(null);
    const [publishOnEmart, setPublishOnEmart] = useState(false);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [productionList, setProductionList] = useState([
        {
            'Product Category': 'Value',
            'Subcategory': 'Value',
            'Product Name': 'Value',
            'Is Organic': 'Value',
            'Publish Emart': true
        },
        {
            'Product Category': 'Value',
            'Subcategory': 'Value',
            'Product Name': 'Value',
            'Is Organic': 'Value',
            'Publish Emart': false
        },
        {
            'Product Category': 'Value',
            'Subcategory': 'Value',
            'Product Name': 'Value',
            'Is Organic': 'Value',
            'Publish Emart': true
        },
    ]);
    const [isAddImageExpanded, setIsAddImageExpanded] = useState(false);

    const uploadConfig = {
        title: "Add Crop Image *",
        maxSizeMB: "Max - 5mb",
        allowedTypes: ["image/jpeg", "image/png", "image/jpg"],
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileSelect = (file) => {
        if (file) {
            setUploadedImage(URL.createObjectURL(file));
        } else {
            setUploadedImage(null);
        }
    };

    const handleAddToProductionList = () => {
        // Open preview modal when "Add to Production List" is clicked
        setIsPreviewModalOpen(true);
    };

    const handlePreviewConfirm = () => {
        // Close preview modal and open status modal
        setIsPreviewModalOpen(false);

        // Add to production list
        const newEntry = {
            'Product Category': formData.productCategory || 'Value',
            'Subcategory': formData.subcategory || 'Value',
            'Product Name': formData.productName || 'Value',
            'Is Organic': formData.isOrganic ? 'Yes' : 'No',
            'Publish Emart': publishOnEmart
        };
        setProductionList(prev => [...prev, newEntry]);

        // Show success modal
        setIsStatusModalOpen(true);

        // Reset form
        setFormData({
            productCategory: '',
            subcategory: '',
            productName: '',
            isOrganic: false,
            annualProductionCapacity: '',
            inProduction: '',
            availableStock: '',
            dateOfAvailability: ''
        });
        setUploadedImage(null);
        setPublishOnEmart(false);
    };

    const handleStatusModalClose = () => {
        setIsStatusModalOpen(false);
    };

    const handleEditClick = (row) => {
        console.log('Edit clicked for:', row);
    };

    const handleViewClick = (row) => {
        console.log('View clicked for:', row);
    };

    // Prepare preview data
    const previewData = [
        { label: 'Product Category', value: formData.productCategory || '-' },
        { label: 'Subcategory', value: formData.subcategory || '-' },
        { label: 'Product Name', value: formData.productName || '-' },
        { label: 'Is Organic', value: formData.isOrganic ? 'Yes' : 'No' },
        { label: 'Annual Production Capacity', value: formData.annualProductionCapacity || '-' },
        { label: 'In Production', value: formData.inProduction || '-' },
        { label: 'Available Stock for Sale', value: formData.availableStock || '-' },
        { label: 'Date Of Availability', value: formData.dateOfAvailability || '-' },
        { label: 'Publish on e-Mart', value: publishOnEmart ? 'Yes' : 'No' }
    ];

    return (
        <div>
            <div className='border border-stroke-200 rounded-[8px] p-[16px]'>
                <h2 className="text-base font-bold mb-6">Commodity Production Form</h2>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Product Category */}
                    <SelectField
                        label="Product Category"
                        required
                        name="productCategory"
                        value={formData.productCategory}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Product Category</option>
                        <option value="Grains">Grains</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Pulses">Pulses</option>
                    </SelectField>

                    {/* Subcategory */}
                    <SelectField
                        label="Subcategory"
                        required
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Subcategory</option>
                        <option value="Organic">Organic</option>
                        <option value="Non-Organic">Non-Organic</option>
                    </SelectField>

                    {/* Product Name */}
                    <SelectField
                        label="Product Name"
                        required
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Product Name</option>
                        <option value="Rice">Rice</option>
                        <option value="Wheat">Wheat</option>
                        <option value="Tomato">Tomato</option>
                        <option value="Potato">Potato</option>
                    </SelectField>

                    {/* Is Organic Checkbox */}
                    <CheckboxField
                        label="Is Organic?"
                        name="isOrganic"
                        checked={formData.isOrganic}
                        onChange={handleInputChange}
                    />

                    {/* Annual Production Capacity */}
                    <TextField
                        label="Annual Production Capacity"
                        required
                        name="annualProductionCapacity"
                        placeholder="Enter Value"
                        value={formData.annualProductionCapacity}
                        onChange={handleInputChange}
                    />

                    {/* In Production */}
                    <SelectField
                        label="In Production"
                        required
                        name="inProduction"
                        value={formData.inProduction}
                        onChange={handleInputChange}
                    >
                        <option value="">Select Yes/No</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </SelectField>

                    {/* Available Stock for Sale */}
                    <TextField
                        label="Available Stock for Sale"
                        name="availableStock"
                        placeholder="Enter Value"
                        value={formData.availableStock}
                        onChange={handleInputChange}
                    />

                    {/* Date Of Availability */}
                    <TextField
                        label="Date Of Availability"
                        required
                        type="date"
                        name="dateOfAvailability"
                        placeholder="dd/mm/yyyy"
                        value={formData.dateOfAvailability}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Add Image Section */}
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
                                config={uploadConfig}
                                onFileSelect={handleFileSelect}
                            />
                        </div>
                    )}
                </div>

                {/* Bottom Section: Publish Toggle + Action Buttons */}
                <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-grey-50 rounded-lg">
                    {/* Publish on e-Mart Toggle */}
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-grey-900">Want to Publish on e-Mart ?</span>
                        <Toggle
                            checked={publishOnEmart}
                            onChange={setPublishOnEmart}
                        />
                    </div>

                    {/* Action Buttons */}
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

                {/* <hr className="border-1 my-6" /> */}
            </div>

            {/* Table Section */}
            <h2 className="text-base font-medium my-6">Commodity Production Detail view form</h2>

            <Table
                columns={[
                    "Product Category",
                    "Subcategory",
                    "Product Name",
                    "Is Organic",
                    "Actions"
                ]}
                data={productionList}
                stickyLastColumn={true}
                renderActions={(row) => (
                    <div className="flex items-center justify-center gap-2">
                        <img
                            src={editSvg}
                            alt="Edit"
                            className="w-7 h-7 cursor-pointer flex-shrink-0"
                            onClick={() => handleEditClick(row)}
                        />
                        <img
                            src={viewSvg}
                            alt="View"
                            className="w-7 h-7 cursor-pointer flex-shrink-0"
                            onClick={() => handleViewClick(row)}
                        />
                        <span
                            className={`px-2 py-1 text-[10px] font-medium rounded whitespace-nowrap ${row['Publish Emart']
                                ? 'bg-success-100 text-success-800'
                                : 'bg-grey-100 text-grey-800'
                                }`}
                        >
                            {row['Publish Emart'] ? '✓ Publish' : 'Publish'}
                        </span>
                    </div>
                )}
            />

            {/* Preview Modal */}
            <PreviewModal
                isOpen={isPreviewModalOpen}
                onClose={() => setIsPreviewModalOpen(false)}
                onConfirm={handlePreviewConfirm}
                title="Preview Commodity Production"
                image={uploadedImage}
                data={previewData}
            />

            {/* Status Modal */}
            <StatusModal
                isOpen={isStatusModalOpen}
                onClose={handleStatusModalClose}
                status={true}
                message="Commodity production details have been added successfully."
            />
        </div>
    );
};
