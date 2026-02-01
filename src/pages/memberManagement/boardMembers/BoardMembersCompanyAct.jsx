import React, { useState } from 'react';
import { TextField } from '../../../components/FormFields';
import Table from '../../../components/Table';
import FormModal from '../../../components/FormModal';
import ConfirmationModal from '../../../components/ConfirmationModal';
import StatusModal from '../../../components/StatusModal';
import editSvg from "/assets/edit.svg";

export const BoardMembersCompanyAct = () => {
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [currentRow, setCurrentRow] = useState(null);

    const sampleData = [
        {
            Name: "Value",
            "Father's/Husband's Name": "Value",
            DIN: "Value",
            "DIN Status": "Value",
            DOB: "Value",
            "Association Status": "Value",
            Gender: "Value",
            "Mobile Number": "Value",
        },
        {
            Name: "Value",
            "Father's/Husband's Name": "Value",
            DIN: "Value",
            "DIN Status": "Value",
            DOB: "Value",
            "Association Status": "Value",
            Gender: "Value",
            "Mobile Number": "Value",
        },
        {
            Name: "Value",
            "Father's/Husband's Name": "Value",
            DIN: "Value",
            "DIN Status": "Value",
            DOB: "Value",
            "Association Status": "Value",
            Gender: "Value",
            "Mobile Number": "Value",
        },
        {
            Name: "Value",
            "Father's/Husband's Name": "Value",
            DIN: "Value",
            "DIN Status": "Value",
            DOB: "Value",
            "Association Status": "Value",
            Gender: "Value",
            "Mobile Number": "Value",
        },
    ];

    // Field configuration for the edit modal
    const editFields = [
        {
            type: "text",
            name: "name",
            label: "Farmer Name",
            required: true,
            placeholder: "Name, Middle Name, Surname",
            value: currentRow?.Name || "",
        },
        {
            type: "select",
            name: "gender",
            label: "Gender",
            required: false,
            value: currentRow?.Gender || "Male",
            options: [
                { label: "Male", value: "Male" },
                { label: "Female", value: "Female" },
                { label: "Other", value: "Other" },
            ],
        },
        {
            type: "tel",
            name: "mobile",
            label: "Mobile Number",
            required: true,
            placeholder: "+91- ********21",
            value: currentRow?.["Mobile Number"] || "",
        },
    ];

    const handleEditClick = (row) => {
        setCurrentRow(row);
        setIsFormModalOpen(true);
    };

    const handleFormSubmit = () => {
        // Close form modal and open confirmation modal
        setIsFormModalOpen(false);
        setIsConfirmationModalOpen(true);
    };

    const handleConfirmationClose = () => {
        setIsConfirmationModalOpen(false);
        setCurrentRow(null);
    };

    const handleConfirmationConfirm = () => {
        // Close confirmation modal and show status modal
        setIsConfirmationModalOpen(false);
        setIsStatusModalOpen(true);
    };

    const handleStatusModalClose = () => {
        setIsStatusModalOpen(false);
        setCurrentRow(null);
    };

    return (
        <div>
            <div className='border border-stroke-200 rounded-[8px] p-[16px] bg-white'>
                <h2 className="text-base font-bold mb-4">Board Member Details</h2>

                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-6">
                        <TextField
                            label="CIN / LLPIN / FCRN"
                            required
                            name="cinNumber"
                            placeholder="CIN / LLPIN / FCRN Number"
                            value=""
                            disabled
                        />
                    </div>
                </div>
            </div>
            {/* <hr className="border-1 my-[16px]" /> */}

            <h2 className="text-base font-medium my-[16px]">Board Member Detail view form</h2>

            <div className="border border-stroke-200 rounded-[8px] p-[16px] bg-white">
                <Table
                    columns={[
                        "Name",
                        "Father's/Husband's Name",
                        "DIN",
                        "DIN Status",
                        "DOB",
                        "Association Status",
                        "Gender",
                        "Mobile Number",
                        "Actions"
                    ]}
                    data={sampleData}
                    stickyLastColumn={false}
                    renderActions={(row) => (
                        <div className="flex items-center justify-center gap-[34px]">
                            <img
                                src={editSvg}
                                alt="Edit"
                                className="w-[32px] h-[32px] cursor-pointer"
                                onClick={() => handleEditClick(row)}
                            />
                        </div>
                    )}
                />
            </div>

            {/* Form Modal */}
            <FormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                title="Edit Details"
                fields={editFields}
                onSubmit={handleFormSubmit}
            />

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isConfirmationModalOpen}
                onClose={handleConfirmationClose}
                onConfirm={handleConfirmationConfirm}
                title="Confirm Update"
                description="Are you sure you want to update these board member details?"
            />

            {/* Status Modal */}
            <StatusModal
                isOpen={isStatusModalOpen}
                onClose={handleStatusModalClose}
                status={true}
                message="Board member details have been updated successfully."
            />
        </div>
    );
};
