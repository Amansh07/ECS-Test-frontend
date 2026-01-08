import React, { useState } from 'react';
import { TextField, SelectField, CheckboxField } from '../../../components/FormFields';
import Table from '../../../components/Table';
import UploadDocument from '../../../components/UploadDocument';
import { Button } from '../../../components/Buttons';
import ConfirmationModal from '../../../components/ConfirmationModal';
import StatusModal from '../../../components/StatusModal';
import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";
import deleteSvg from "../../../assets/deleteAction.svg";
import { AccordionGroup } from '../../../components/Accordion';

export const LicenseUpdate = () => {
    // Form state
    const [formData, setFormData] = useState({
        licenseName: '',
        otherLicense: '',
        issuedBy: '',
        issuedDate: '',
		validDate: '',
		licenseNumber: '',
		isUnlimited: '',
    });

    const [uploadedImage, setUploadedFile] = useState(null);
    const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [turnoverList, setTurnoverList] = useState([
        {
            id: 1,
            'License Name': 'Value',
            'Issued By': 'Value',
            'Issued Date': 'Value',
            'Valid Till ': 'Value',
            'License Number': 'Value',
			'Unlimited Validity of License?': 'Value'
        }
    ]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [statusConfig, setStatusConfig] = useState({ success: true, message: '' });
    const [pendingAction, setPendingAction] = useState(null);
	const [isUploadLicense, setisUploadLicense] = useState(false);

    const uploadConfig = {
        title: "Upload License *",
        maxSizeMB: "PDF size: 5",
        allowedTypes: ["file/pdf"],
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePreviewConfirm = () => {
        // Close preview modal and open status modal
        setIsPreviewModalOpen(false);

        // Show success modal
        setIsStatusModalOpen(true);

        // Reset form
        setFormData({
            licenseName: '',
            otherLicense: '',
            issuedBy: '',
            issuedDate: '',
			validDate: '',
			licenseNumber: '',
            isUnlimited: false,
        });
        setUploadedFile(null);
    };
	
	const handleFileSelect = (file) => {
        if (file) {
            setUploadedFile(URL.createObjectURL(file));
        } else {
            setUploadedFile(null);
        }
    };
	
	const save = () => {
        setPendingAction(isEditMode ? 'update' : 'add');
        setIsConfirmationOpen(true);
    };
	
	const handleConfirm = () => {
        setIsConfirmationOpen(false);
        if (pendingAction === 'add') {
            const newItem = {
                id: Date.now(),
                licenseName: '',
				otherLicense: '',
				issuedBy: '',
				issuedDate: '',
				validDate: '',
				licenseNumber: '',
				isUnlimited: false
            };
            setTurnoverList(prev => [...prev, newItem]);
            setStatusConfig({ success: true, message: 'FPO License details added successfully.' });
        } else if (pendingAction === 'update') {
            setTurnoverList(prev => prev.map(item =>
                item.id === editingId
                    ? {
                        ...item,
                        licenseName: '',
						otherLicense: '',
						issuedBy: '',
						issuedDate: '',
						validDate: '',
						licenseNumber: '',
						isUnlimited: false,
                    }
                    : item
            ));
            setStatusConfig({ success: true, message: 'FPO License details updated successfully.' });
        } else if (pendingAction === 'delete') {
            setTurnoverList(prev => prev.filter(item => item.id !== editingId));
            setStatusConfig({ success: true, message: 'FPO License details deleted successfully.' });
        }
        setIsStatusOpen(true);
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            licenseName: '',
            otherLicense: '',
            issuedBy: '',
            issuedDate: '',
			validDate: '',
			licenseNumber: '',
            isUnlimited: false,
        });
        setUploadedFile(null);
        setIsEditMode(false);
        setEditingId(null);
    };

    const handleEdit = (row) => {
        setFormData({
            licenseName: '',
            otherLicense: '',
            issuedBy: '',
            issuedDate: '',
			validDate: '',
			licenseNumber: '',
            isUnlimited: false,
        });
        setIsEditMode(true);
        setEditingId(row.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        setEditingId(id);
        setPendingAction('delete');
        setIsConfirmationOpen(true);
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
        { label: 'License Name', value: formData.licenseName || '-' },
		{ label: 'Other License', value: formData.otherLicense || '-' },
        { label: 'Issued By', value: formData.issuedBy || '-' },
        { label: 'Issue Date', value: formData.issuedDate || '-' },
        { label: 'License Valid Till', value: formData.validDate || '-' },
        { label: 'Unlimited Validity of License', value: formData.isUnlimited ? 'Yes' : 'No' },
    ];

    return (
            <div className='border border-stroke-200 rounded-[8px] p-[16px]'>
                <h2 className="text-base font-bold mb-6">FPO license update form/FPO license details</h2>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* Product Category */}
                    <SelectField
                        label="License Name"
                        required
                        name="licenseName"
                        value={formData.licenseName}
                        onChange={handleInputChange}
                    >
                        <option value="">Select License Type</option>
                        <option value="organic">Organic Certificate </option>
                        <option value="seeddelareship">State Seed Dealership License</option>
                        <option value="eNAM">eNAM</option>
                        <option value="fertilizerDealership">Fertilizer Dealership</option>
						<option value="other">Other</option>
                    </SelectField>

                    <TextField
                        label="Other License Name"
                        name="otherLicenseotherLicense"
                        placeholder="Enter License Name"
                        value={formData.otherLicense}
                        onChange={handleInputChange}
						disabled
                        inputClassName="bg-grey-50"
                    />
					
                    <TextField
                        label="Issued By"
                        required
						name="issuedBy"
                        placeholder="Enter the license issue authority name"
                        value={formData.issuedBy}
                        onChange={handleInputChange}
                    />
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <TextField
                        label="Issue Date"
                        required
                        type="date"
                        name="issuedDate"
                        placeholder="dd/mm/yyyy"
                        value={formData.issuedDate}
                        onChange={handleInputChange}
                    />
					
					<TextField
                        label="License Valid Till"
                        required
                        type="date"
                        name="validDate"
                        placeholder="dd/mm/yyyy"
                        value={formData.validDate}
                        onChange={handleInputChange}
                    />
					
					<TextField
                        label="License Number"
                        required
                        type="text"
                        name="licenseNumber"
                        placeholder="Enter License Number"
                        value={formData.licenseNumber}
                        onChange={handleInputChange}
                    />
					<div className="mt-8">
					<CheckboxField 
                        label="Unlimited Validity of License?"
                        name="isUnlimited"
                        checked={formData.isUnlimited}
                        onChange={handleInputChange}
                    />
					</div>
                </div>

                {/* Add Image Section */}
                <div className="border border-stroke-200 rounded-[8px]">
                    <div
                        className="w-full bg-primary-100 p-4 cursor-pointer flex justify-between items-center"
                        onClick={() => setisUploadLicense(!isUploadLicense)}
                    >
                        <h3 className="text-base font-medium">Upload License</h3>
                        <svg
                            className={`w-5 h-5 transition-transform ${isUploadLicense ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>

                    {isUploadLicense && (
                        <div className="rounded-xl">
                            <UploadDocument
                                config={uploadConfig}
                                onFileSelect={handleFileSelect}
                            />
                        </div>
                    )}
                </div>
				{/* Buttons */}
				<div className="flex justify-end gap-4 mt-8 pt-6 border-t border-stroke-100">
                    <Button
                        buttonClassName="px-6 py-2 bg-white border border-stroke-300 text-grey-700 rounded-md hover:bg-grey-50 font-medium flex items-center gap-2"
                    onClick={resetForm}    
                    >
                        Reset
                    </Button>
                    <Button
                        buttonClassName="px-8 py-2 bg-success text-white rounded-md hover:bg-success-dark font-medium"
                    onClick={save}    
                    >
                        Save
                    </Button>
                </div>
            
			{/* Table View Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-grey-900 mb-6">FPO License Update Detail View Table</h3>
                <Table
                    columns={[
                        "License Name",
                        "Issued By",
                        "Issued Date",
                        "Valid Till ",
                        "License Number",
						"Unlimited Validity of License?",
                        "Actions"
                    ]}
                    data={turnoverList}
                    renderActions={(row) => (
                        <div className="flex items-center justify-center gap-4">
                            <img src={editSvg} alt="Edit" className="w-6 h-6 cursor-pointer" onClick={() => handleEdit(row)} />
                            <img src={viewSvg} alt="View" className="w-6 h-6 cursor-pointer" />
                            <img src={deleteSvg} alt="Delete" className="w-6 h-6 cursor-pointer" onClick={() => handleDelete(row.id)} />
                        </div>
                    )}
                    renderColumn={(col, value) => {
                        if (col === "License Number") {
                            return (
                                <div className="flex justify-center">
                                    <span className={`w-6 h-6 flex items-center justify-center rounded-full ${value ? 'bg-success-100 text-success' : 'bg-danger-100 text-danger'}`}>
                                        {value ? '✓' : '✕'}
                                    </span>
                                </div>
                            );
                        }
                        return value;
                    }}
                />
            </div>
			<ConfirmationModal
					isOpen={isConfirmationOpen}
					onClose={() => setIsConfirmationOpen(false)}
					onConfirm={handleConfirm}
					title={pendingAction === 'delete' ? 'Delete Record' : pendingAction?.charAt(0)?.toUpperCase() + pendingAction?.slice(1) + " Record"}
					description={
						pendingAction === 'delete'
							? 'Are you sure you want to delete this record?'
							: `Are you sure you want to ${pendingAction} these details?`
					}
			/>

			<StatusModal
				isOpen={isStatusOpen}
				onClose={() => setIsStatusOpen(false)}
				status={statusConfig.success}
				message={statusConfig.message}
			/>
            
        </div>
    );
};
