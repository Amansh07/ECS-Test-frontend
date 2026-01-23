import React, { useEffect, useState } from 'react';
import { TextField, SelectField } from '../../components/FormFields';
import Table from '../../components/Table';
import { Button } from '../../components/Buttons';
import ConfirmationModal from '../../components/ConfirmationModal';
import StatusModal from '../../components/StatusModal';

import editSvg from "../../assets/edit.svg";
import viewSvg from "../../assets/view.svg";
import deleteSvg from "../../assets/deleteAction.svg";
import reloadSvg from "../../assets/reload.svg";

import { useFormik } from "formik";
import { fpoCapitalValidationSchema } from './validation';
import {
    listCapitalDetails,
    createCapitalDetails,
    updateCapitalDetails,
    deleteCapitalDetails,
    getCapitalDetailsById
} from '../../api/FpoCapitalUpdate';

const initialCapitalData = {
    totalEquity: '',
    isGrantReceived: '',
    grantReceived: ''
};

    //const [uploadedFile, setUploadedFile] = useState(null);
    const [capitalList, setCapitalList] = useState([
        {
            id: 1,
            'Total FPO Equity Capital(in Rupees)': 10000,
            'Whether Equity Grant Received?': 'Yes',
            'FPO Equity Grant Received(in Rupees)': 1000000
        },
        {
           id: 2,
            'Total FPO Equity Capital(in Rupees)': 20000,
            'Whether Equity Grant Received?': 'No',
            'FPO Equity Grant Received(in Rupees)': 0
        }
    ]);

    const [deletedCapitalList, setDeletedCapitalList] = useState([
        {
            id: 1,
            'Total FPO Equity Capital(in Rupees)': 10000,
            'Whether Equity Grant Received?': 'Yes',
            'FPO Equity Grant Received(in Rupees)': 1000000,
            'Deleted on (Timestamp)':'19-01-2026 10:32:05'
        },
        {
           id: 2,
            'Total FPO Equity Capital(in Rupees)': 20000,
            'Whether Equity Grant Received?': 'No',
            'FPO Equity Grant Received(in Rupees)': 0,
            'Deleted on (Timestamp)':'18-01-2026 11:47:45'
        }
    ]);



    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [statusConfig, setStatusConfig] = useState({ success: true, message: '' });
    const [pendingAction, setPendingAction] = useState(null);

    /* ================= FORMIK ================= */
    const formik = useFormik({
        initialValues: initialCapitalData,
        validationSchema: fpoCapitalValidationSchema,
        validateOnChange: false,
        validateOnBlur: true,
    });

    // ------------------- LOAD DATA -------------------
    useEffect(() => {
        fetchCapitalList();
    }, []);

    const fetchCapitalList = () => {
        const res = listCapitalDetails(1); // fpoId = 1
        if (res.success) {
            setCapitalList(res.data);
        }
    };

    /* ================= HANDLERS ================= */
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
            totalFpoEquityCap: parseFloat(formik.values.totalEquity),
            isEquityGrant: formik.values.isGrantReceived === 'Yes',
            fpoEquityGrantAmt: formik.values.isGrantReceived === 'Yes' ? parseFloat(formik.values.grantReceived) : 0
        };

        if (pendingAction === 'add') {
            const res = await createCapitalDetails(payload);
            if (res.status === 200 && res.data.success) {
                setStatusConfig({ success: true, message: 'FPO Capital details added successfully.' });
                fetchCapitalList();
            }
        } else if (pendingAction === 'update') {
            const res = await updateCapitalDetails(editingId, payload);
            if (res.status === 200 && res.data.success) {
                setStatusConfig({ success: true, message: 'FPO Capital details updated successfully.' });
                fetchCapitalList();
            }
        } else if (pendingAction === 'delete') {
            const res = await deleteCapitalDetails(editingId);
            if (res.status === 200 && res.data.success) {
                setCapitalList(prev => prev.filter(item => item.id !== editingId));
                setStatusConfig({ success: true, message: 'FPO Capital details deleted successfully.' });
            }
        }

        setIsStatusOpen(true);
        handleReset();
    };

    const handleEdit = async (row) => {
        setIsEditMode(true);
        setEditingId(row.id);

        const res = await getCapitalDetailsById(row.id);
        if (res.status === 200 && res.data.success && res.data.data) {
            const data = res.data.data;
            formik.setValues({
                totalEquity: data.totalFpoEquityCap,
                isGrantReceived: data.isEquityGrant ? 'Yes' : 'No',
                grantReceived: data.fpoEquityGrantAmt
            });
        } else {
            // Fallback
            formik.setValues({
                totalEquity: row.totalFpoEquityCap,
                isGrantReceived: row.isEquityGrant ? 'Yes' : 'No',
                grantReceived: row.fpoEquityGrantAmt
            });
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id) => {
        setEditingId(id);
        setPendingAction('delete');
        setIsConfirmationOpen(true);
    };

    return (
        <div className="flex flex-col gap-6 animate-fadeIn pb-10">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200">
                <h2 className="text-base font-bold text-grey-900 mb-6">FPO Capital Update Form</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <TextField
                        label="Total FPO Equity Capital (in Rupees)"
                        name="totalEquity"
                        placeholder="Enter Value"
                        required
                        value={formik.values.totalEquity}
                        onChange={(e) => {
                            if (/^\d*\.?\d*$/.test(e.target.value)) {
                                formik.handleChange(e);
                            }
                        }}
                        onBlur={formik.handleBlur}
                        error={formik.errors.totalEquity}
                        touched={formik.touched.totalEquity}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <SelectField
                        label="Whether Equity Grant Received?"
                        name="isGrantReceived"
                        required
                        value={formik.values.isGrantReceived}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.isGrantReceived}
                        touched={formik.touched.isGrantReceived}
                    >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </SelectField>

                    {(formik.values.isGrantReceived === 'Yes') && (
                        <TextField
                            label="FPO Equity Grant Received(in Rupees)"
                            name="grantReceived"
                            value={formik.values.grantReceived}
                            placeholder="Enter Value"
                            required
                            onChange={(e) => {
                                if (/^\d*\.?\d*$/.test(e.target.value)) {
                                    formik.handleChange(e);
                                }
                            }}
                            onBlur={formik.handleBlur}
                            error={formik.errors.grantReceived}
                            touched={formik.touched.grantReceived}
                        />
                    )}

                    {(formik.values.isGrantReceived === 'No' || formik.values.isGrantReceived === '') && (
                        <TextField
                            label="FPO Equity Grant Received(in Rupees)"
                            name="grantReceived"
                            value=""
                            placeholder="Enter Value"
                            disabled={true}
                        />
                    )}
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
                <h3 className="text-base font-bold text-grey-900 mb-6">FPO Capital Details View Table</h3>
                <Table
                    columns={[
                        "Total FPO Equity Capital(in Rupees)",
                        "Whether Equity Grant Received?",
                        "FPO Equity Grant Received(in Rupees)",
                        "Actions"
                    ]}
                    data={capitalList.map(row => ({
                        "Total FPO Equity Capital(in Rupees)": row.totalFpoEquityCap,
                        "Whether Equity Grant Received?": row.isEquityGrant ? 'Yes' : 'No', // Passed as boolean, handled in renderColumn
                        "FPO Equity Grant Received(in Rupees)": row.fpoEquityGrantAmt,
                        ...row
                    }))}
                    renderActions={(row) => (
                        <div className="flex items-center justify-center gap-4">
                            <img src={editSvg} alt="Edit" className="w-6 h-6 cursor-pointer" onClick={() => handleEdit(row)} />
                            <img src={viewSvg} alt="View" className="w-6 h-6 cursor-pointer" />
                            <img src={deleteSvg} alt="Delete" className="w-6 h-6 cursor-pointer" onClick={() => handleDelete(row.id)} />
                        </div>
                    )}
                    renderColumn={(col, value) => {
                        if (col === "Whether Equity Grant Received?") {
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

            {/* Archived List */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200">
                <h3 className="text-lg font-semibold text-grey-900 mb-6">Deleted FPO Capital Details</h3>
                <Table

                    columns={[
                        "Total FPO Equity Capital(in Rupees)",
                        "Whether Equity Grant Received?",
                        "FPO Equity Grant Received(in Rupees)",
                       "Deleted on (Timestamp)"
                        // "Actions"
                    ]}
                    data={deletedCapitalList}
                    // renderActions={(row) => (
                    //     <div className="flex items-center justify-center gap-4">
                    //         <img src={editSvg} alt="Edit" className="w-6 h-6 cursor-pointer" onClick={() => handleEdit(row)} />
                    //         <img src={viewSvg} alt="View" className="w-6 h-6 cursor-pointer" />
                    //         <img src={deleteSvg} alt="Delete" className="w-6 h-6 cursor-pointer" onClick={() => handleDelete(row.id)} />
                    //     </div>
                    // )}
                    renderColumn={(col, value) => {
                        if (col === "Whether Equity Grant Received?") {
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
        </div>
    );
};
