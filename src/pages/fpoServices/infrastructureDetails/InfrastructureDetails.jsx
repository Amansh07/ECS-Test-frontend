import React, { useEffect, useState } from 'react';
import { TextField, SelectField } from '../../../components/FormFields';
import Table from '../../../components/Table';
import { Button } from '../../../components/Buttons';
import ConfirmationModal from '../../../components/ConfirmationModal';
import StatusModal from '../../../components/StatusModal';
import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";
import deleteSvg from "../../../assets/deleteAction.svg";
import unarchive from "../../../assets/unarchive.svg";
import reloadSvg from "../../../assets/reload.svg";
import { useFormik } from "formik";
import { infraDetailsValidationSchema } from '../validation';
import Toggle from "../../../components/Toggle";
import {
    getAllInfrastructure,
    createInfrastructure,
    updateInfrastructure,
    deleteInfrastructure,
    getInfrastructureById,
    getInfraSubcategoriesByCategoryId,
    getArchivedInfrastructure
} from '../../../api/InfrastructureDetailsMock';

export const InfrastructureDetails = () => {
    const initialInfrastructureDetailsData = {
        category: '',
        subCategory: '',
        unit: '',
        capacity: '',
        other: ''
    };

    const [infraDetailList, setInfraDetailList] = useState([]);
    const [archivedInfraList, setArchivedInfraList] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [statusConfig, setStatusConfig] = useState({ success: true, message: '' });
    const [pendingAction, setPendingAction] = useState(null);
    // const [infraData, setInfraData] = useState(initialInfrastructureDetailsData);
    const [infraErrors, setInfraErrors] = useState({});
    const [isSaveClicked, setIsSaveClicked] = useState(false);
    const [isOther, setIsOther] = useState(false);
    const [tobeUnarchived, setToBeUnarchived] = useState({});

    // Validation Modal State
    const [showValidationModal, setShowValidationModal] = useState(false);
    const [validationTitle, setValidationTitle] = useState("");
    const [validationMessage, setValidationMessage] = useState("");

    const [optionsData, setoptionsData] = useState([]);
    const [isSubCategoryLoading, setIsSubCategoryLoading] = useState(false);

    /* ================= FORMIK ================= */
    const formik = useFormik({
        initialValues: initialInfrastructureDetailsData,
        validationSchema: infraDetailsValidationSchema,
        validateOnChange: false,
        validateOnBlur: true,
    });

    const { values, handleChange, handleBlur, setFieldValue, setFieldTouched, touched, errors } = formik;

    // ------------------- LOAD DATA -------------------
    useEffect(() => {
        fetchInfraList();
    }, []);

    const fetchInfraList = () => {
        const res = getAllInfrastructure(1); // fpoId = 1
        if (res.success) {
            setInfraDetailList(res.data);
        }

        // Fetch Archived List
        const archivedRes = getArchivedInfrastructure(1);
        if (archivedRes.success) {
            setArchivedInfraList(archivedRes.data);
        }
    };

    /* ================= HANDLERS ================= */
    const handleReset = () => {
        formik.resetForm();
        setoptionsData([]);
        setIsOther(false);
        setInfraErrors({});
        setIsEditMode(false);
        setEditingId(null);
    };

    const handleSave = async () => {
        const errors = await formik.validateForm();

        if (Object.keys(errors).length > 0) {
            formik.setTouched(
                Object.keys(errors).reduce((acc, key) => {
                    acc[key] = true;
                    return acc;
                }, {})
            );

            setValidationTitle("Validation Required");
            setValidationMessage("Please complete all required fields before proceeding.");
            setShowValidationModal(true);
            return;
        }

        setPendingAction(isEditMode ? 'update' : 'add');
        setIsConfirmationOpen(true);
    };

    const handleConfirm = async () => {
        setIsConfirmationOpen(false);

        const payload = {
            fpoId: 1,
            infraCategory: parseInt(formik.values.category),
            infraSubCategory: parseInt(formik.values.subCategory),
            availableCapacity: parseFloat(formik.values.capacity)
            // 'other' handling if API supports it, currently mock doesn't explicitly show 'other' field in payload structure
        };

        if (pendingAction === 'add') {
            const res = await createInfrastructure(payload);
            if (res.status === 200 && res.data.success) {
                setStatusConfig({ success: true, message: 'Infrastructure added successfully.' });
                fetchInfraList();
            }
        } else if (pendingAction === 'update') {
            const res = await updateInfrastructure(editingId, payload);
            if (res.status === 200 && res.data.success) {
                setStatusConfig({ success: true, message: 'Infrastructure updated successfully.' });
                fetchInfraList();
            }
        } else if (pendingAction === 'delete') {
            const res = await deleteInfrastructure(editingId);
            if (res.status === 200 && res.data.success) {
                setInfraDetailList(prev => prev.filter(item => item.id !== editingId));
                setStatusConfig({ success: true, message: 'Infrastructure deleted successfully.' });
            }
        } else if (pendingAction === 'archive') {
            // Mock archive logic - move to local archived list for UI demo
            const itemToArchive = infraDetailList.find(item => item.id === editingId);
            if (itemToArchive) {
                setArchivedInfraList(prev => [...prev, itemToArchive]);
                setInfraDetailList(prev => prev.filter(item => item.id !== editingId));
                setStatusConfig({ success: true, message: 'Infrastructure archived successfully.' });
            }
        } else if (pendingAction === 'unarchive') {
            // Mock unarchive logic
            const newItem = {
                ...tobeUnarchived,
                id: editingId
            };
            // For real API this would be an 'activate' call
            setInfraDetailList(prev => [...prev, newItem]);
            setArchivedInfraList(prev => prev.filter(item => item.id !== editingId));
            setStatusConfig({ success: true, message: 'Infrastructure unarchived successfully.' });
        }

        setIsStatusOpen(true);
        handleReset();
    };

    const handleEdit = async (row) => {
        setIsEditMode(true);
        setEditingId(row.id);

        // Load Subcategories first based on category
        if (row.infraCategory) {
            await loadSubCategories(row.infraCategory);
        }

        const res = await getInfrastructureById(row.id);
        if (res.status === 200 && res.data.success && res.data.data) {
            const data = res.data.data;
            formik.setValues({
                category: data.infraCategory,
                subCategory: data.infraSubCategory,
                unit: data.unitName, // Display string for read-only unit field
                capacity: data.availableCapacity,
                other: '' // Mock doesn't have other field in response
            });
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        setEditingId(id);
        setPendingAction('delete');
        setIsConfirmationOpen(true);
    };

    const handleArchive = (id) => {
        setEditingId(id);
        setPendingAction('archive');
        setIsConfirmationOpen(true);
    };

    const handleUnArchive = (row) => {
        setEditingId(row.id);
        setToBeUnarchived(row); // Keep track of data to restore
        setPendingAction('unarchive');
        setIsConfirmationOpen(true);
    };

    useEffect(() => {
        console.log("formik.values.category", formik.values.category);
        formik.validateField('category');
    }, [formik.values.category]);

    useEffect(() => {
        console.log("formik.values.subCategory", formik.values.subCategory);
        formik.validateField('subCategory');
    }, [formik.values.subCategory]);

    useEffect(() => {
        formik.validateField('capacity');
    }, [formik.values.capacity])

    const handleChangeOnselectCategory = async (e) => {
        const categoryId = e.target.value;
        formik.handleChange(e);
        console.log("categoryId", formik.values.category);
        formik.setFieldValue('subCategory', ''); // Reset subcategory
        formik.setFieldValue('unit', ''); // Reset unit

        if (categoryId) {
            await loadSubCategories(categoryId);
        } else {
            setoptionsData([]);
        }
    };

    const loadSubCategories = async (categoryId) => {
        setIsSubCategoryLoading(true);
        const res = await getInfraSubcategoriesByCategoryId(categoryId);
        if (res.success) {
            const options = res.data.map(item => ({
                value: item.id,
                label: item.subcategoryName,
                unit: item.unit
            }));
            setoptionsData(options);
        } else {
            setoptionsData([]);
        }
        setIsSubCategoryLoading(false);
    };

    // useEffect(() => {
    //     console.log(formik.values);


    //     // if (formik.values.category && formik.values.subCategory) {
    //     if (values.category && values.subCategory) {
    //         const selectedOption = optionsData.find(opt => opt.value === values.subCategory);
    //         if (selectedOption) {
    //             formik.setFieldValue('unit', selectedOption.unit);
    //         }
    //     }
    // }, [values.subCategory]);
    const handleChangeOnSelectSubCategory = (e) => {
        const subCategoryId = parseInt(e.target.value);
        console.log(formik.values.subCategory);
        console.log("subCategoryId", subCategoryId);
        formik.setFieldValue('subCategory', subCategoryId);
        formik.handleChange(e);
        console.log(formik.values.subCategory);
        // Find selected option to set Unit
        const selectedOption = optionsData.find(opt => opt.value === subCategoryId);
        if (selectedOption) {
            formik.setFieldValue('unit', selectedOption.unit);
            // Logic for 'Other' if needed - checking label "Others"
            if (selectedOption.label === "Others") {
                setIsOther(true);
            } else {
                setIsOther(false);
            }
        }
    };

    return (
        <div className="flex flex-col gap-6 animate-fadeIn pb-10">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-base font-bold text-grey-900">Infrastructure Update Form</h2>
                    <Toggle
                        label="Organic Farming"
                        toggled={false}
                        onClick={() => { }}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <SelectField
                        label="Infrastructure Category"
                        name="category"
                        required
                        value={formik.values.category?.toString() || ''}
                        onChange={handleChangeOnselectCategory}
                        onBlur={formik.handleBlur}
                        error={formik.errors.category}
                        touched={formik.touched.category}
                    >
                        <option value="">Select</option>
                        {/* IDs from requirements/mock, labels hardcoded for now or fetch Master if exists */}
                        <option value="955">Cultivation</option>
                        <option value="956">Processing</option>
                    </SelectField>

                    <SelectField
                        label="Infrastructure Subcategory"
                        name="subCategory"
                        required
                        value={formik.values.subCategory?.toString() || ''}
                        onChange={handleChangeOnSelectSubCategory}
                        // onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.subCategory}
                        touched={formik.touched.subCategory}
                        disabled={!formik.values.category}
                    >
                        <option value="">Select Subcategory</option>
                        {optionsData.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </SelectField>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {isOther && (
                        <TextField
                            label="Other Facilities"
                            name="other"
                            placeholder="Enter Other Facilities"
                            value={formik.values.other}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.other}
                            touched={formik.touched.other}
                        />
                    )}

                    <TextField
                        label="Unit"
                        name="unit"
                        placeholder="Unit"
                        required
                        disabled={true}
                        value={formik.values.unit}
                        onChange={formik.handleChange} // Read-only but kept standard
                        inputClassName="bg-gray-100"
                    />

                    <TextField
                        label="Available Capacity"
                        name="capacity"
                        type="text"
                        value={formik.values.capacity}
                        placeholder="Enter Value"
                        required
                        onChange={(e) => {
                            if (/^\d*\.?\d*$/.test(e.target.value)) {
                                formik.handleChange(e);
                            }
                        }}
                        onBlur={formik.handleBlur}
                        error={formik.errors.capacity}
                        touched={formik.touched.capacity}
                    />
                </div>

                <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-stroke-100">
                    <Button
                        buttonClassName="px-6 py-2 bg-white border border-stroke-300 text-grey-700 rounded-md hover:bg-grey-50 font-medium flex items-center gap-2"
                        onClick={handleReset}
                    >
                        <img src={reloadSvg} alt="Reset" className="w-4 h-4" />
                        Reset Form
                    </Button>
                    <Button
                        buttonClassName="px-8 py-2 bg-success text-white rounded-md hover:bg-success-dark font-medium"
                        onClick={handleSave}
                    >
                        {isEditMode ? 'Update' : 'Save'}
                    </Button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200">
                <h3 className="text-base font-bold text-grey-900 mb-6">Infrastructure Details View Table</h3>
                <Table
                    columns={[
                        'Infra Category',
                        'Infra Subcategory',
                        'Unit',
                        'Available Capacity',
                        "Actions"
                    ]}
                    data={infraDetailList.map(item => ({
                        ...item,
                        // Map fields for table column matching
                        'Infra Category': item.infraCategoryName,
                        'Infra Subcategory': item.infraSubCategoryName,
                        'Unit': item.unitName,
                        'Available Capacity': item.availableCapacity
                    }))}
                    renderActions={(row) => (
                        <div className="flex items-center justify-center gap-4">
                            <img src={editSvg} alt="Edit" className="w-6 h-6 cursor-pointer" onClick={() => handleEdit(row)} />
                            <img src={viewSvg} alt="View" className="w-6 h-6 cursor-pointer" />
                            <img src={deleteSvg} alt="Delete" className="w-6 h-6 cursor-pointer" onClick={() => handleArchive(row.id)} />
                        </div>
                    )}
                />
            </div>

            {archivedInfraList.length > 0 && (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200 mt-6 opacity-100">
                    <h3 className="text-base font-bold text-grey-900 mb-6">Archived Infrastructure</h3>
                    <Table
                        columns={[
                            'Infra Category',
                            'Infra Subcategory',
                            'Unit',
                            'Available Capacity',
                            "Actions"
                        ]}
                        data={archivedInfraList.map(item => ({
                            ...item,
                            'Infra Category': item.infraCategoryName,
                            'Infra Subcategory': item.infraSubCategoryName,
                            'Unit': item.unitName,
                            'Available Capacity': item.availableCapacity
                        }))}
                        renderActions={(row) => (
                            <div className="flex items-center justify-center gap-4">
                                <img src={unarchive} alt="Unarchive" className="w-6 h-6 cursor-pointer" onClick={() => handleUnArchive(row)} />
                            </div>
                        )}
                    />
                </div>
            )}

            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                onConfirm={handleConfirm}
                title={pendingAction === 'delete' ? 'Delete Record' : (pendingAction === 'archive' ? 'Archive Record' : (pendingAction === 'unarchive' ? 'Unarchive Record' : (isEditMode ? 'Update Record' : 'Save Record')))}
                description={
                    pendingAction === 'delete'
                        ? 'Are you sure you want to delete this record?'
                        : (pendingAction === 'archive'
                            ? 'Are you sure you want to archive this record?'
                            : (pendingAction === 'unarchive'
                                ? 'Are you sure you want to unarchive this record?'
                                : `Are you sure you want to ${isEditMode ? 'update' : 'save'} these details?`))
                }
            />

            <StatusModal
                isOpen={showValidationModal}
                onClose={() => setShowValidationModal(false)}
                status={false}
                title={validationTitle}
                message={validationMessage}
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
