import React, { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, SelectField } from '../../../components/FormFields';
import Table from '../../../components/Table';
import UploadDocument from '../../../components/UploadDocument';
import { Button } from '../../../components/Buttons';
import ConfirmationModal from '../../../components/ConfirmationModal';
import StatusModal from '../../../components/StatusModal';
import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";
import deleteSvg from "../../../assets/deleteAction.svg";
import { AccordionGroup } from '../../../components/Accordion';
import { annualTurnoverValidationSchema } from '../validation';

const initialValues = {
    financialYear: '',
    annualTurnover: '',
    totalAnnualProfit: '',
    totalDividendPaid: ''
};

export const AnnualTurnover = () => {
    const [uploadedFile, setUploadedFile] = useState(null);
    const [turnoverList, setTurnoverList] = useState([
        {
            id: 1,
            'Financial Year': '2023-24',
            'Annual Turnover': '50,00,000',
            'Annual Profit': '10,00,000',
            'Total Dividend Paid': '2,00,000',
            'Balance Sheet': 'Balancesheet.pdf',
        },
        {
            id: 2,
            'Financial Year': '2022-23',
            'Annual Turnover': '45,00,000',
            'Annual Profit': '8,00,000',
            'Total Dividend Paid': '1,50,000',
            'Balance Sheet': 'Balancesheet.pdf'
        }
    ]);

    const [deletedTurnoverList, setDeletedTurnoverList] = useState([
        {
            id: 1,
            'Financial Year': '2023-24',
            'Annual Turnover (in Rupees)': '50,00,000',
            'Total Annual Profit (in Rupees)': '10,00,000',
            'Total Dividend Paid (in Rupees)': '2,00,000',
            'Uploaded Balance Sheet': 'Balancesheet.pdf',
            'Deleted on (Timestamp)':'20-01-2026 22:05:55'
        },
        {
            id: 2,
            'Financial Year': '2023-24',
            'Annual Turnover (in Rupees)': '50,00,000',
            'Total Annual Profit (in Rupees)': '10,00,000',
            'Total Dividend Paid (in Rupees)': '2,00,000',
            'Uploaded Balance Sheet': 'Balancesheet.pdf',
            'Deleted on (Timestamp)':'20-01-2026 22:05:55'
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
        validationSchema: annualTurnoverValidationSchema,
        validateOnBlur: true,
        validateOnChange: false,
    });

    const handleFileSelect = (file) => {
        setUploadedFile(file);
    };

    const handleAddOrUpdate = async () => {
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

    const handleConfirm = () => {
        setIsConfirmationOpen(false);
        if (pendingAction === 'add') {
            const newItem = {
                id: Date.now(),
                'Financial Year': formik.values.financialYear,
                'Annual Turnover': formik.values.annualTurnover,
                'Annual Profit': formik.values.totalAnnualProfit,
                'Total Dividend Paid': formik.values.totalDividendPaid,
                'Balance Sheet': !!uploadedFile
            };
            setTurnoverList(prev => [...prev, newItem]);
            setStatusConfig({ success: true, message: 'Annual turnover details added successfully.' });
        } else if (pendingAction === 'update') {
            setTurnoverList(prev => prev.map(item =>
                item.id === editingId
                    ? {
                        ...item,
                        'Financial Year': formik.values.financialYear,
                        'Annual Turnover': formik.values.annualTurnover,
                        'Annual Profit': formik.values.totalAnnualProfit,
                        'Total Dividend Paid': formik.values.totalDividendPaid,
                        'Balance Sheet': !!uploadedFile || item['Balance Sheet']
                    }
                    : item
            ));
            setStatusConfig({ success: true, message: 'Annual turnover details updated successfully.' });
        } else if (pendingAction === 'delete') {
            setTurnoverList(prev => prev.filter(item => item.id !== editingId));
            setStatusConfig({ success: true, message: 'Annual turnover details deleted successfully.' });
        }
        setIsStatusOpen(true);
        resetForm();
    };

    const resetForm = () => {
        formik.resetForm();
        setUploadedFile(null);
        setIsEditMode(false);
        setEditingId(null);
    };

    const handleEdit = (row) => {
        formik.setValues({
            financialYear: row['Financial Year'],
            annualTurnover: row['Annual Turnover'],
            totalAnnualProfit: row['Annual Profit'],
            totalDividendPaid: row['Total Dividend Paid']
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

    return (
        <div className="flex flex-col gap-6 animate-fadeIn">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200">
                <h2 className="text-xl font-semibold text-grey-900 mb-6">Annual Turnover & Profit</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <SelectField
                        label="Financial Year"
                        name="financialYear"
                        required
                        value={formik.values.financialYear}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.financialYear}
                        touched={formik.touched.financialYear}
                    >
                        <option value="">Financial Year</option>
                        <option value="2024-25">2024-25</option>
                        <option value="2023-24">2023-24</option>
                        <option value="2022-23">2022-23</option>
                    </SelectField>

                    <TextField
                        label="Annual Turnover (in Rupees)"
                        name="annualTurnover"
                        placeholder="Enter Value"
                        required
                        value={formik.values.annualTurnover}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.annualTurnover}
                        touched={formik.touched.annualTurnover}
                    />

                    <TextField
                        label="Total Annual Profit (in Rupees)"
                        name="totalAnnualProfit"
                        placeholder="Enter Value"
                        required
                        value={formik.values.totalAnnualProfit}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.totalAnnualProfit}
                        touched={formik.touched.totalAnnualProfit}
                    />

                    <TextField
                        label="Total Dividend Paid (in Rupees)"
                        name="totalDividendPaid"
                        placeholder="Enter Value"
                        value={formik.values.totalDividendPaid}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.totalDividendPaid}
                        touched={formik.touched.totalDividendPaid}
                    />
                </div>

                <div className="mt-8">
                    <AccordionGroup
                        items={[
                            {
                                id: 'balance-sheet',
                                title: 'Add Balance Sheet',
                                isInitiallyOpen: true,
                                content: (
                                    <div className="p-4 bg-primary-50 rounded-lg">
                                        <UploadDocument
                                            onFileSelect={handleFileSelect}
                                            config={{
                                                title: "Add Documents",
                                                maxSizeMB: "PDF Size: Max 5MB",
                                                allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
                                            }}
                                        />
                                    </div>
                                )
                            }
                        ]}
                    />
                </div>

                <div className="flex justify-end gap-4 mt-8">
                    <Button
                        buttonClassName="px-8 py-2.5 bg-white border border-stroke-300 text-grey-700 rounded-md hover:bg-grey-50 font-medium"
                        onClick={resetForm}
                    >
                        Preview
                    </Button>
                    <Button
                        buttonClassName="px-8 py-2.5 bg-success text-white rounded-md hover:bg-success-dark font-medium flex items-center gap-2"
                        onClick={handleAddOrUpdate}
                    >
                        {isEditMode ? (
                            <>
                                <span>+</span> Update Production List
                            </>
                        ) : (
                            <>
                                <span>+</span> Add To Production List
                            </>
                        )}
                    </Button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200">
                <h3 className="text-lg font-semibold text-grey-900 mb-6">Annual Turnover and Profit Detail View Table</h3>
                <Table
                    columns={[
                        "Financial Year",
                        "Annual Turnover",
                        "Annual Profit",
                        "Total Dividend Paid",
                        "Balance Sheet",
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
                        if (col === "Balance Sheet") {
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

            {/* ARchived List */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-stroke-200" >
                            <h3 className="text-lg font-semibold text-grey-900 mb-6">Deleted Annual Turnover Data</h3>
                            <Table
            
                                columns={[
                        "Financial Year",
                        "Annual Turnover (in Rupees)",
                        "Total Annual Profit (in Rupees)",
                        "Total Dividend Paid (in Rupees)",
                        "Uploaded Balance Sheet",
                        "Deleted on (Timestamp)"
                        // "Actions"
                    ]}
                                data={deletedTurnoverList}
                                //   {/*  renderActions={(row) => (
                                //     <div className="flex items-center justify-center gap-4">
                                //      <img src={editSvg} alt="Edit" className="w-6 h-6 cursor-pointer" onClick={() => handleEdit(row)} />
                                //         <img src={viewSvg} alt="View" className="w-6 h-6 cursor-pointer" /> 
                                //         <img src={unarchive} alt="Delete" className="w-6 h-6 cursor-pointer" onClick={() => handleUnArchive(row)} />
                                //     </div>
                                // )}*/}
                               renderColumn={(col, value) => {
                        if (col === "Uploaded Balance Sheet") {
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
