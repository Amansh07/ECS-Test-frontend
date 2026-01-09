import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, SelectField, TextArea } from '../../../components/FormFields';
import Table from '../../../components/Table';
import { Button } from '../../../components/Buttons';
import UploadDocument from '../../../components/UploadDocument';
import Toggle from '../../../components/Toggle';
import ConfirmationModal from '../../../components/ConfirmationModal';
import StatusModal from '../../../components/StatusModal';
import { AccordionGroup } from '../../../components/Accordion';

import editSvg from '../../../assets/edit.svg';
import viewSvg from '../../../assets/view.svg';
import deleteSvg from '../../../assets/deleteAction.svg';
import reloadSvg from '../../../assets/reload.svg';
import StateExtension, { getExtensionData } from '../../../components/StateExtension';

const validationSchema = Yup.object().shape({
    machineryCategory: Yup.string().required('Machinery Category is required'),
    machineryName: Yup.string().required('Machinery Name is required'),
    brandName: Yup.string().required('Brand Name is required'),
    unit: Yup.string().required('Unit is required'),
    rentAmount: Yup.number().required('Rent Amount is required').positive('Must be positive'),
    quantity: Yup.number().required('Quantity is required').positive('Must be positive').integer('Must be an integer'),
    address: Yup.string().required('Address is required'),
    specifications: Yup.string(),
    manufacturerName: Yup.string(),
    stateExtension: {},
});

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
};

export const Machinery = () => {
    const [machineryList, setMachineryList] = useState([]);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [govAssistance, setGovAssistance] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // Modals
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [statusConfig, setStatusConfig] = useState({ success: true, message: '' });
    const [pendingAction, setPendingAction] = useState(null);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, { setFieldError, setFieldTouched }) => {
            // Manual Validation for State Extension
            let isExtensionValid = true;
            const extensionData = getExtensionData('machinery');

            if (extensionData.extensionEnabled) {
                const extensionValues = values.stateExtension || {};
                extensionData.fields.forEach(field => {
                    if (field.isMandatory && !extensionValues[field.fieldName]) {
                        setFieldError(`stateExtension.${field.fieldName}`, `${field.label || field.fieldName} is required`);
                        setFieldTouched(`stateExtension.${field.fieldName}`, true, false);
                        isExtensionValid = false;
                    }
                });
            }

            if (!isExtensionValid) {
                // Ideally show a toast or alert
                alert("Please fill all mandatory state extension fields.");
                return;
            }

            setPendingAction(isEditMode ? 'update' : 'add');
            setIsConfirmationOpen(true);
        },
    });

    const handleFileSelect = (file) => {
        setUploadedImage(file);
    };

    const handleConfirm = () => {
        setIsConfirmationOpen(false);

        if (pendingAction === 'add') {
            const newItem = {
                id: Date.now(),
                ...formik.values,
                govAssistance,
                image: uploadedImage
            };
            setMachineryList(prev => [...prev, newItem]);
            setStatusConfig({ success: true, message: 'Machinery details added successfully.' });
        } else if (pendingAction === 'update') {
            setMachineryList(prev => prev.map(item =>
                item.id === editingId
                    ? { ...item, ...formik.values, govAssistance, image: uploadedImage }
                    : item
            ));
            setStatusConfig({ success: true, message: 'Machinery details updated successfully.' });
        } else if (pendingAction === 'delete') {
            setMachineryList(prev => prev.filter(item => item.id !== editingId));
            setStatusConfig({ success: true, message: 'Machinery details deleted successfully.' });
        }

        setIsStatusOpen(true);
        handleReset();
    };

    const handleReset = () => {
        formik.resetForm();
        setGovAssistance(false);
        setUploadedImage(null);
        setIsEditMode(false);
        setEditingId(null);
    };

    const handleEdit = (row) => {
        formik.setValues({
            machineryCategory: row.machineryCategory,
            machineryName: row.machineryName,
            brandName: row.brandName,
            unit: row.unit,
            rentAmount: row.rentAmount,
            quantity: row.quantity,
            address: row.address,
            specifications: row.specifications,
            manufacturerName: row.manufacturerName || ''
        });
        setGovAssistance(row.govAssistance);
        setUploadedImage(row.image);
        setEditingId(row.id);
        setIsEditMode(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        setEditingId(id);
        setPendingAction('delete');
        setIsConfirmationOpen(true);
    };

    const uploadConfig = {
        title: "Upload Machinery/Equipment Photo",
        maxSizeMB: "PDF size: Max - 5mb",
        allowedTypes: ['image/jpeg', 'image/png'] // Assuming photo only based on current usage
    };

    return (
        <div className="flex flex-col gap-6 animate-fadeIn pb-10">
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
                            value={formik.values.machineryCategory}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.machineryCategory}
                            touched={formik.touched.machineryCategory}
                        >
                            <option value="">Enter Category</option>
                            <option value="Tractor">Tractor</option>
                            <option value="Harvester">Harvester</option>
                            <option value="Pump">Pump</option>
                        </SelectField>

                        <TextField
                            label="Machinery/Equipment Name"
                            required
                            name="machineryName"
                            placeholder="Enter Name"
                            value={formik.values.machineryName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.machineryName}
                            touched={formik.touched.machineryName}
                        />

                        <TextField
                            label="Machinery/Equipment Brand Name"
                            required
                            name="brandName"
                            placeholder="Enter Brand Name of Machinery/Equipment"
                            value={formik.values.brandName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.brandName}
                            touched={formik.touched.brandName}
                        />

                        <SelectField
                            label="Unit (Per hour/day/hectare)"
                            required
                            name="unit"
                            value={formik.values.unit}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.unit}
                            touched={formik.touched.unit}
                        >
                            <option value="">Select Unit</option>
                            <option value="Hour">Per Hour</option>
                            <option value="Day">Per Day</option>
                            <option value="Hectare">Per Hectare</option>
                        </SelectField>

                        <TextField
                            label="Rent amount"
                            required
                            name="rentAmount"
                            placeholder="Enter Amount"
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
                            placeholder="Enter number of machinery/equipment available with FPO"
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
                            required
                            name="address"
                            placeholder="Enter the address where machinery/equipment is located"
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
                            placeholder="Enter Text"
                            value={formik.values.specifications}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.specifications}
                            touched={formik.touched.specifications}
                            rows={4}
                        />
                        <div className="text-right text-xs text-grey-500 mt-1">0/100</div>
                    </div>

                    <div className="mt-6">
                        <AccordionGroup
                            items={[
                                {
                                    id: 'add-image',
                                    title: 'Add Image',
                                    isInitiallyOpen: true,
                                    content: (
                                        <div className="p-4 bg-primary-50 rounded-lg">
                                            <UploadDocument
                                                config={uploadConfig}
                                                onFileSelect={handleFileSelect}
                                            />
                                        </div>
                                    )
                                }
                            ]}
                        />
                    </div>
                    <div>
                        <StateExtension formik={formik} pageId="machinery" />
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between mt-8 p-4 bg-grey-50 rounded-lg gap-4 md:gap-0">
                        <div className="flex items-center justify-between w-full md:w-auto gap-6">
                            <span className="text-sm font-medium text-grey-900">Government assistance received?</span>
                            <Toggle
                                checked={govAssistance}
                                onChange={setGovAssistance}
                            />
                        </div>
                        <div className="flex items-center justify-end w-full md:w-auto gap-4">
                            <Button
                                type="button"
                                buttonClassName="px-6 py-2 bg-white border border-stroke-300 text-grey-700 rounded-md hover:bg-grey-50 font-medium flex items-center gap-2"
                                onClick={handleReset}
                            >
                                Reset
                            </Button>
                            <Button
                                type="submit"
                                buttonClassName="px-8 py-2 bg-success text-white rounded-md hover:bg-success-dark font-medium"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </div>

            <div className='flex flex-col'>
                <h3 className="text-base font-bold mb-4 text-grey-900">Machinery/Equipment Listing</h3>
                <div className="bg-white p-0 rounded-lg shadow-sm border border-stroke-200 overflow-hidden">
                    <Table
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
                    />
                </div>
            </div>

            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                onConfirm={handleConfirm}
                title={pendingAction === 'delete' ? 'Delete Record' : (isEditMode ? 'Update Record' : 'Save Record')}
                description={
                    pendingAction === 'delete'
                        ? 'Are you sure you want to delete this machinery record?'
                        : `Are you sure you want to ${isEditMode ? 'update' : 'save'} these machinery details?`
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
