import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { TextField, SelectField, CheckboxField, RadioGroup } from '../../../components/FormFields';
import Table from '../../../components/Table';
import { Button } from '../../../components/Buttons';
import ConfirmationModal from '../../../components/ConfirmationModal';
import StatusModal from '../../../components/StatusModal';
import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";
import deleteSvg from "../../../assets/deleteAction.svg";
import { infrastructureValidationSchema } from "../validation";

export const Infrastructure = () => {
	
	const initialInfrastructureData = {
		storageType: '',
		storageCapacity: '',
		warehouseAddress: '',
		wdraAccredited: '',
		rentAvailable: '',
	};
	
	const [pendingAction, setPendingAction] = useState(null);
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
	const [statusConfig, setStatusConfig] = useState({ success: true, message: '' });
    const [isStatusOpen, setIsStatusOpen] = useState(false);
	const handleDelete = (id) => {
        setEditingId(id);
        setPendingAction('delete');
        setIsConfirmationOpen(true);
    };
	
	const handleConfirm = () => {
        setIsConfirmationOpen(false);
        if (pendingAction === 'add') {
            const newItem = {
                id: Date.now(),
				storageType: '',
				storageCapacity: '',
				warehouseAddress: '',
				wdraAccredited: '',
				rentAvailable: '',
            };
            initialInfrastructureData(prev => [...prev, newItem]);
            setStatusConfig({ success: true, message: 'Infrastructure details added successfully.' });
        } else if (pendingAction === 'update') {
            initialInfrastructureData(prev => prev.map(item =>
                item.id === editingId
                    ? {
                        ...item,
                        storageType: '',
						storageCapacity: '',
						warehouseAddress: '',
						wdraAccredited: '',
						rentAvailable: '',
                    }
                    : item
            ));
            setStatusConfig({ success: true, message: 'Infrastructure details updated successfully.' });
        } else if (pendingAction === 'delete') {
            setTurnoverList(prev => prev.filter(item => item.id !== editingId));
            setStatusConfig({ success: true, message: 'Infrastructure details deleted successfully.' });
        }
        setIsStatusOpen(true);
        resetForm();
    };
	
    const handleEditClick = (row) => {
        console.log('Edit clicked for:', row);
    };

    const handleViewClick = (row) => {
        console.log('View clicked for:', row);
    };
	
	const [InfrastructureData, setinitialInfrastructureData] = useState(initialInfrastructureData);
    const [initialInfrastructureErrors, setinitialInfrastructureErrors] = useState({});
    const [isSaveClicked, setIsSaveClicked] = useState(false);
	
	
	/* ================= FORMIK ================= */
	const formik = useFormik({
		initialValues: initialInfrastructureData,
		validationSchema: infrastructureValidationSchema,
		validateOnChange: true,
		validateOnBlur: true,
	  });
	
	/* ================= SYNC FORM VALUES TO STATE ================= */
	useEffect(() => {
		const syncForm = async () => {
		  const errors = await formik.validateForm();
		  setinitialInfrastructureErrors(errors);
		  setinitialInfrastructureData({ ...formik.values });
		};
    syncForm();
  }, [formik.values]);

  /* ================= SAVE CLICK VALIDATION ================= */
  useEffect(() => {
    if (!isSaveClicked) return;

    const validateAndSubmit = async () => {
      const errors = await formik.validateForm();
      setinitialInfrastructureErrors(errors);
      console.log("values :", initialInfrastructureData);
      console.log("errors :", initialInfrastructureErrors);

      if (Object.keys(errors).length > 0) {
        formik.setTouched(
          Object.keys(errors).reduce((acc, key) => {
            acc[key] = true;
            return acc;
          }, {})
        );
        setIsSaveClicked(false);
        return;
      }
    };
	
    validateAndSubmit();
  }, [isSaveClicked]);

  /* ================= HANDLERS ================= */
  const handleChange = (e) => formik.handleChange(e);

  const handleReset = () => {
    setinitialInfrastructureData(initialInfrastructureData);
    formik.resetForm();
    setinitialInfrastructureErrors({});
  };
    
    return (
            <div className='border border-stroke-200 rounded-[8px] p-[16px]'>
                <h2 className="text-base font-bold mb-6">FPO Infrastructure update form</h2>

                {/* Form Fields */}
					<div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
					<div className="col-span-12 md:col-span-4">
					<RadioGroup
						label="Type of Storage"
						name="storageType"
						required
						value={InfrastructureData.storageType}
						onChange={handleChange}
						onBlur={formik.handleBlur}
						error={InfrastructureData.storageType}
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
                        value={InfrastructureData.storageCapacity}
                        onChange={handleChange}
						onBlur={formik.handleBlur}
						error={InfrastructureData.storageCapacity}
						touched={formik.touched.storageCapacity}
                    />
					<TextField
                        label="Warehouse/Cold Storage Address"
                        required
                        type="text"
                        name="warehouseAddress"
                        placeholder="Enter Address"
                        value={InfrastructureData.warehouseAddress}
                        onChange={handleChange}
						onBlur={formik.handleBlur}
						error={InfrastructureData.warehouseAddress}
						touched={formik.touched.warehouseAddress}
                    />
					</div>
					<div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-4">
					<RadioGroup
						label="WDRA Accredited"
						name="wdraAccredited"
						required
						value={InfrastructureData.wdraAccredited}
						onChange={handleChange}
						onBlur={formik.handleBlur}
						error={InfrastructureData.wdraAccredited}
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
                        value={InfrastructureData.rentAvailable}
                        onChange={handleChange}
						onBlur={formik.handleBlur}
						error={InfrastructureData.rentAvailable}
						touched={formik.touched.rentAvailable}
                    />
					</div>
					</div>

				{/* Buttons */}
				<div className="flex justify-end gap-4 mt-8 pt-6 border-t border-stroke-100">
                    <Button
                        buttonClassName="px-6 py-2 bg-white border border-stroke-300 text-grey-700 rounded-md hover:bg-grey-50 font-medium flex items-center gap-2"
                    >
                        Reset
                    </Button>
                    <Button
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
                    data={initialInfrastructureData}
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
