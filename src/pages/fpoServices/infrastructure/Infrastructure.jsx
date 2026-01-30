import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { TextField, SelectField, CheckboxField, RadioGroup } from '../../../components/FormFields';
import Table from '../../../components/Table';
import { Button } from '../../../components/Buttons';
import ConfirmationModal from '../../../components/ConfirmationModal';
import StatusModal from '../../../components/StatusModal';
import ValidationModal from '../../../components/ValidationModal';
import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";
import deleteSvg from "../../../assets/deleteAction.svg";
import { infrastructureValidationSchema } from "../validation"

export const Infrastructure = () => {

    const initialInfrastructureData = {
        storageType: '',
        storageCapacity: '',
        warehouseAddress: '',
        wdraAccredited: '',
        rentAvailable: '',
    };

    const [infrastructureList, setInfrastructureList] = useState([]);
    const [pendingAction, setPendingAction] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [statusConfig, setStatusConfig] = useState({ success: true, message: '' });
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    // Validation Modal State
    const [showValidationModal, setShowValidationModal] = useState(false);
    const [validationTitle, setValidationTitle] = useState("");
    const [validationMessage, setValidationMessage] = useState("");

    /* ================= FORMIK ================= */
    const formik = useFormik({
        initialValues: initialInfrastructureData,
        validationSchema: infrastructureValidationSchema,
        validateOnChange: false,
        validateOnBlur: true,
    });

    /* ================= HANDLERS ================= */
    const handleSave = async () => {
        const errors = await formik.validateForm();

        if (Object.keys(errors).length > 0) {
            formik.setTouched(
                Object.keys(errors).reduce((acc, key) => {
                    acc[key] = true;
                    return acc;
                }, {})
            );

            // Show validation modal
            setValidationTitle("Validation Required");
            setValidationMessage("Please complete all required fields before proceeding.");
            setShowValidationModal(true);
            return;
        }

        setPendingAction(isEditMode ? 'update' : 'add');
        setIsConfirmationOpen(true);
    };

    const handleConfirm = () => {
        setIsConfirmationOpen(false);
        if (pendingAction === 'add') {
            const newItem = {
                id: Date.now(),
                storageType: formik.values.storageType,
                storageCapacity: formik.values.storageCapacity,
                warehouseAddress: formik.values.warehouseAddress,
                wdraAccredited: formik.values.wdraAccredited,
                rentAvailable: formik.values.rentAvailable,
            };
            setInfrastructureList(prev => [...prev, newItem]);
            setStatusConfig({ success: true, message: 'Infrastructure details added successfully.' });
        } else if (pendingAction === 'update') {
            setInfrastructureList(prev => prev.map(item =>
                item.id === editingId
                    ? {
                        ...item,
                        storageType: formik.values.storageType,
                        storageCapacity: formik.values.storageCapacity,
                        warehouseAddress: formik.values.warehouseAddress,
                        wdraAccredited: formik.values.wdraAccredited,
                        rentAvailable: formik.values.rentAvailable,
                    }
                    : item
            ));
            setStatusConfig({ success: true, message: 'Infrastructure details updated successfully.' });
        } else if (pendingAction === 'delete') {
            setInfrastructureList(prev => prev.filter(item => item.id !== editingId));
            setStatusConfig({ success: true, message: 'Infrastructure details deleted successfully.' });
        }
        setIsStatusOpen(true);
        handleReset();
    };

    const handleReset = () => {
        formik.resetForm();
        setEditingId(null);
        setIsEditMode(false);
    };

    const handleEdit = (row) => {
        formik.setValues({
            storageType: row.storageType,
            storageCapacity: row.storageCapacity,
            warehouseAddress: row.warehouseAddress,
            wdraAccredited: row.wdraAccredited,
            rentAvailable: row.rentAvailable,
        });
        setEditingId(row.id);
        setIsEditMode(true);
    };

    const handleDelete = (id) => {
        setEditingId(id);
        setPendingAction('delete');
        setIsConfirmationOpen(true);
    };

    const handleViewClick = (row) => {
        console.log('View clicked for:', row);
    };

    return (
        <div className='border border-stroke-200 rounded-[8px] p-[16px] bg-white'>
            <h2 className="text-base font-bold mb-6">FPO Infrastructure update form</h2>

            {/* Form Fields */}
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
                <div className="col-span-12 md:col-span-4">
                    <RadioGroup
                        label="Type of Storage"
                        name="storageType"
                        required
                        value={formik.values.storageType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.storageType}
                        touched={formik.touched.storageType}
                        options={[
                            { label: "Cold Stoarge", value: "coldstorage" },
                            { label: "Warehouse", value: "warehouse" },
                        ]}
                    />
                </div>
                <TextField
                    label="Storage Capacity (in MT)"
                    required
                    type="text"
                    name="storageCapacity"
                    placeholder="Enter capacity"
                    value={formik.values.storageCapacity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.storageCapacity}
                    touched={formik.touched.storageCapacity}
                />
                <TextField
                    label="Warehouse/Cold Storage Address"
                    required
                    type="text"
                    name="warehouseAddress"
                    placeholder="Enter Address"
                    value={formik.values.warehouseAddress}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.warehouseAddress}
                    touched={formik.touched.warehouseAddress}
                />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
                <RadioGroup
                    label="WDRA Accredited"
                    name="wdraAccredited"
                    required
                    value={formik.values.wdraAccredited}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.errors.wdraAccredited}
                    touched={formik.touched.wdraAccredited}
                    options={[
                        { label: "Yes", value: "yes" },
                        { label: "No", value: "no" },
                    ]}
                />
                <div className="mt-6">
                    <CheckboxField
                        label="Is Available for Rent?"
                        name="rentAvailable"
                        value={formik.values.rentAvailable}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.rentAvailable}
                        touched={formik.touched.rentAvailable}
                    />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-stroke-100">
                <Button
                    type="button"
                    onClick={handleReset}
                    buttonClassName="px-6 py-2 bg-white border border-stroke-300 text-grey-700 rounded-md hover:bg-grey-50 font-medium flex items-center gap-2"
                >
                    Reset
                </Button>
                <Button
                    type="button"
                    onClick={handleSave}
                    buttonClassName="px-8 py-2 bg-success text-white rounded-md hover:bg-success-dark font-medium"
                >
                    Save
                </Button>
            </div>
            <hr className="border border-stroke-200 my-4" />
            {/* Table View Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-grey-900 mb-6">FPO Infrastructure Detail View Table</h3>
                <Table
                    columns={[
                        "Type of Storage",
                        "Stoare Cpacity (in MT)",
                        "Warehouse/ColdStorage Address",
                        "WDRA Accredited",
                        "Available for rent ? ",
                        "Actions"
                    ]}
                    data={infrastructureList.map(item => ({
                        ...item,
                        "Type of Storage": item.storageType,
                        "Stoare Cpacity (in MT)": item.storageCapacity,
                        "Warehouse/ColdStorage Address": item.warehouseAddress,
                        "WDRA Accredited": item.wdraAccredited,
                        "Available for rent ? ": item.rentAvailable ? "Yes" : "No",
                    }))}
                    renderActions={(row) => (
                        <div className="flex items-center justify-center gap-4">
                            <img src={editSvg} alt="Edit" className="w-6 h-6 cursor-pointer" onClick={() => handleEdit(row)} />
                            <img src={viewSvg} alt="View" className="w-6 h-6 cursor-pointer" onClick={() => handleViewClick(row)} />
                            <img src={deleteSvg} alt="Delete" className="w-6 h-6 cursor-pointer" onClick={() => handleDelete(row.id)} />
                        </div>
                    )}
                />
            </div>
            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                onConfirm={handleConfirm}
                title={pendingAction === 'delete' ? 'Delete Record' : (isEditMode ? 'Update Record' : 'Save Record')}
                description={
                    pendingAction === 'delete'
                        ? 'Are you sure you want to delete this record?'
                        : `Are you sure you want to ${isEditMode ? 'update' : 'save'} these details?`
                }
            />

            <StatusModal
                isOpen={isStatusOpen}
                onClose={() => setIsStatusOpen(false)}
                status={statusConfig.success}
                message={statusConfig.message}
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
