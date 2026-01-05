import React, { useState } from 'react';
import { TextField } from '../../../components/FormFields';
import Table from '../../../components/Table';
import { Button } from '../../../components/Buttons';
import ConfirmationModal from '../../../components/ConfirmationModal';
import StatusModal from '../../../components/StatusModal';
import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";
import deleteSvg from "../../../assets/deleteAction.svg";
import reloadSvg from "../../../assets/reload.svg";

export const BankDetails = () => {
    const [formData, setFormData] = useState({
        ifscCode: '',
        bankName: '',
        branchName: '',
        accountNumber: ''
    });

    const [bankList, setBankList] = useState([
        {
            id: 1,
            'IFSC Code': 'SBIN0001234',
            'Account Number': '123456789012',
            'Bank Name': 'State Bank of India',
            'Branch Name': 'Main Branch'
        }
    ]);

    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [statusConfig, setStatusConfig] = useState({ success: true, message: '' });
    const [pendingAction, setPendingAction] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFormData({
            ifscCode: '',
            bankName: '',
            branchName: '',
            accountNumber: ''
        });
        setIsEditMode(false);
        setEditingId(null);
    };

    const handleSave = () => {
        setPendingAction(isEditMode ? 'update' : 'add');
        setIsConfirmationOpen(true);
    };

    const handleConfirm = () => {
        setIsConfirmationOpen(false);
        if (pendingAction === 'add') {
            const newItem = {
                id: Date.now(),
                'IFSC Code': formData.ifscCode,
                'Account Number': formData.accountNumber,
                'Bank Name': formData.bankName,
                'Branch Name': formData.branchName
            };
            setBankList(prev => [...prev, newItem]);
            setStatusConfig({ success: true, message: 'Bank details added successfully.' });
        } else if (pendingAction === 'update') {
            setBankList(prev => prev.map(item =>
                item.id === editingId
                    ? {
                        ...item,
                        'IFSC Code': formData.ifscCode,
                        'Account Number': formData.accountNumber,
                        'Bank Name': formData.bankName,
                        'Branch Name': formData.branchName
                    }
                    : item
            ));
            setStatusConfig({ success: true, message: 'Bank details updated successfully.' });
        } else if (pendingAction === 'delete') {
            setBankList(prev => prev.filter(item => item.id !== editingId));
            setStatusConfig({ success: true, message: 'Bank details deleted successfully.' });
        }
        setIsStatusOpen(true);
        handleReset();
    };

    const handleEdit = (row) => {
        setFormData({
            ifscCode: row['IFSC Code'],
            bankName: row['Bank Name'],
            branchName: row['Branch Name'],
            accountNumber: row['Account Number']
        });
        setEditingId(row.id);
        setIsEditMode(true);
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
                            value={formData.ifscCode}
                            onChange={handleInputChange}
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
                        value={formData.bankName}
                        onChange={handleInputChange}
                        disabled
                        inputClassName="bg-grey-50"
                    />

                    <TextField
                        label="Branch Name"
                        name="branchName"
                        required
                        placeholder="Branch Name"
                        value={formData.branchName}
                        onChange={handleInputChange}
                        disabled
                        inputClassName="bg-grey-50"
                    />

                    <TextField
                        label="Account Number"
                        name="accountNumber"
                        required
                        placeholder="Enter Account Number"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
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
                    data={bankList}
                    renderActions={(row) => (
                        <div className="flex items-center justify-center gap-4">
                            <img src={editSvg} alt="Edit" className="w-6 h-6 cursor-pointer" onClick={() => handleEdit(row)} />
                            <img src={viewSvg} alt="View" className="w-6 h-6 cursor-pointer" />
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
