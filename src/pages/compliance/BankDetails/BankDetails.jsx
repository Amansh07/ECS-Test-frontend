import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { TextField } from '../../../components/FormFields';
import Table from '../../../components/Table';
import { Button } from '../../../components/Buttons';
import ConfirmationModal from '../../../components/ConfirmationModal';
import StatusModal from '../../../components/StatusModal';
import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";
import deleteSvg from "../../../assets/deleteAction.svg";
import reloadSvg from "../../../assets/reload.svg";
import { bankDetailsValidationSchema } from '../validation';
import { 
    listBankDetails, 
    createBankDetails, 
    updateBankDetails, 
    deleteBankDetails,
    getBankDetailsById 
} from '../../../api/bankDetailsMock';

const initialValues = {
    ifscCode: '',
    bankName: '',
    branchName: '',
    accountNumber: ''
};

    const [bankList, setBankList] = useState([
        {
            id: 1,
            'IFSC Code': 'SBIN0001234',
            'Account Number': '123456789012',
            'Bank Name': 'State Bank of India',
            'Branch Name': 'Main Branch'
        }
    ]);


    const [deletedBankList, setDeletedBankList] = useState([
        {
            id: 1,
            'IFSC Code': 'SBIN0001234',
            'Bank Name': 'State Bank of India',
            'Branch Name': 'Main Branch',
            'Account Number': '123456789012',
            'Deleted On (Timestamp)':'20-01-2026 16:25:55'
        },
        {
            id: 2,
            'IFSC Code': 'SBIN0001234',
            'Bank Name': 'State Bank of India',
            'Branch Name': 'Main Branch',
            'Account Number': '123456789012',
            'Deleted On (Timestamp)':'20-01-2026 16:25:55'
        }

    ]);


    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [statusConfig, setStatusConfig] = useState({ success: true, message: '' });
    const [pendingAction, setPendingAction] = useState(null);

    const formik = useFormik({
        initialValues,
        validationSchema: bankDetailsValidationSchema,
        validateOnBlur: true,
        validateOnChange: false,
    });

    // ------------------- LOAD DATA -------------------
    useEffect(() => {
        fetchBankList();
    }, []);

    const fetchBankList = () => {
        const res = listBankDetails(1); // fpoId = 1
        if (res.success) {
            setBankList(res.data);
        }
    };

    // ------------------- HANDLERS -------------------
    const handleReset = () => {
        formik.resetForm();
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
            return;
        }

        setPendingAction(isEditMode ? 'update' : 'add');
        setIsConfirmationOpen(true);
    };

    const handleConfirm = async () => {
        setIsConfirmationOpen(false);
        
        const payload = {
            fpoId: 1,
            ifscCode: formik.values.ifscCode,
            bankName: formik.values.bankName,
            branchName: formik.values.branchName,
            accountNumber: formik.values.accountNumber,
        };

        if (pendingAction === 'add') {
            const res = await createBankDetails(payload);
            if (res.status === 200 && res.data.success) {
                setStatusConfig({ success: true, message: 'Bank details added successfully.' });
                fetchBankList(); // Refresh list from mock
            }
        } else if (pendingAction === 'update') {
            const res = await updateBankDetails(editingId, payload);
            if (res.status === 200 && res.data.success) {
                setStatusConfig({ success: true, message: 'Bank details updated successfully.' });
                fetchBankList(); // Refresh list from mock
            }
        } else if (pendingAction === 'delete') {
            const res = await deleteBankDetails(editingId);
            if (res.status === 200 && res.data.success) {
                // For mock, manually remove from list since mock doesn't persist
                setBankList(prev => prev.filter(item => item.id !== editingId));
                setStatusConfig({ success: true, message: 'Bank details deleted successfully.' });
            }
        }
        
        setIsStatusOpen(true);
        handleReset();
    };

    const handleEdit = async (row) => {
        setIsEditMode(true);
        setEditingId(row.id);

        // Fetch by ID (optional - can use row data directly for mock)
        const res = await getBankDetailsById(row.id);
        if (res.status === 200 && res.data.success && res.data.data) {
            const data = res.data.data;
            formik.setValues({
                ifscCode: data.ifscCode || row.ifscCode,
                bankName: data.bankName || row.bankName,
                branchName: data.branchName || row.branchName,
                accountNumber: data.accountNumber || row.accountNumber,
            });
        } else {
            // Fallback to row data
            formik.setValues({
                ifscCode: row.ifscCode,
                bankName: row.bankName,
                branchName: row.branchName,
                accountNumber: row.accountNumber,
            });
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        setEditingId(id);
        setPendingAction('delete');
        setIsConfirmationOpen(true);
    };

    // Simple search icon SVG for IFSC field
    const searchIcon = (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 19L14.65 14.65M17 9.5C17 13.6421 13.6421 17 9.5 17C5.35786 17 2 13.6421 2 9.5C2 5.35786 5.35786 2 9.5 2C13.6421 2 17 5.35786 17 9.5Z" stroke="#58595B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );

    return (
        <div className="flex flex-col gap-6 animate-fadeIn pb-10">
            <div className='border border-stroke-200 rounded-[8px] p-[16px] bg-white shadow-sm'>
                <h2 className="text-base font-bold mb-6 text-grey-900">Bank Details Update/View</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    <div className="relative">
                        <TextField
                            label="IFSC Code"
                            name="ifscCode"
                            required
                            placeholder="Search IFSC Code"
                            value={formik.values.ifscCode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.errors.ifscCode}
                            touched={formik.touched.ifscCode}
                        />
                        <div className="absolute right-3 top-[33px] cursor-pointer">
                            {searchIcon}
                        </div>
                    </div>

                    <div className="hidden md:block"></div>

                    <TextField
                        label="Bank Name"
                        name="bankName"
                        required
                        placeholder="Bank Name"
                        value={formik.values.bankName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.bankName}
                        touched={formik.touched.bankName}
                        disabled
                        inputClassName="bg-grey-50"
                    />

                    <TextField
                        label="Branch Name"
                        name="branchName"
                        required
                        placeholder="Branch Name"
                        value={formik.values.branchName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.branchName}
                        touched={formik.touched.branchName}
                        disabled
                        inputClassName="bg-grey-50"
                    />

                    <TextField
                        label="Account Number"
                        name="accountNumber"
                        required
                        placeholder="Enter Account Number"
                        value={formik.values.accountNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.accountNumber}
                        touched={formik.touched.accountNumber}
                        inputClassName="md:col-span-1"
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
                        Save
                    </Button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200">
                <Table
                    columns={[
                        "IFSC Code",
                        "Account Number",
                        "Bank Name",
                        "Branch Name",
                        "Actions"
                    ]}
                    data={bankList.map((row) => ({
                        "IFSC Code": row.ifscCode,
                        "Account Number": row.accountNumber,
                        "Bank Name": row.bankName,
                        "Branch Name": row.branchName,
                        ...row, // Keep original data for edit/delete handlers
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


             {/* Deleted List */}
                         <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200">
                            <h3 className="text-lg font-semibold text-grey-900 mb-6">Deleted AGM Meeting Details</h3>
                            <Table
            
                                columns={[
                        "IFSC Code",
                         "Bank Name",
                        "Branch Name",
                        "Account Number",
                       
                        "Deleted On (Timestamp)"
                        // "Actions"
                    ]}
                                data={deletedBankList}
                                // renderActions={(row) => (
                                //     <div className="flex items-center justify-center gap-4">
                                //         <img src={editSvg} alt="Edit" className="w-6 h-6 cursor-pointer" onClick={() => handleEdit(row)} />
                                //         <img src={viewSvg} alt="View" className="w-6 h-6 cursor-pointer" />
                                //         <img src={deleteSvg} alt="Delete" className="w-6 h-6 cursor-pointer" onClick={() => handleDelete(row.id)} />
                                //     </div>
                                // )}
                                // renderColumn={(col, value) => {
                                //     if (col === "Meeting conducted in last one year") {
                                //         return (
                                //             <div className="flex justify-center">
                                //                 <span className={`w-6 h-6 flex items-center justify-center rounded-full ${value ? 'bg-success-100 text-success' : 'bg-danger-100 text-danger'}`}>
                                //                     {value ? '✓' : '✕'}
                                //                 </span>
                                //             </div>
                                //         );
                                //     }
                                //     return value;
                                // }}
                            />
                        </div>

            <ConfirmationModal
                isOpen={isConfirmationOpen}
                onClose={() => setIsConfirmationOpen(false)}
                onConfirm={handleConfirm}
                title={pendingAction === 'delete' ? 'Delete Record' : (isEditMode ? 'Update Record' : 'Save Record')}
                description={
                    pendingAction === 'delete'
                        ? 'Are you sure you want to delete this bank record?'
                        : `Are you sure you want to ${isEditMode ? 'update' : 'save'} these bank details?`
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
