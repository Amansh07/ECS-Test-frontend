import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { TextField, RadioGroup, SelectField } from "../../../components/FormFields";
import Table from "../../../components/Table";
import { Button } from '../../../components/Buttons';
import ConfirmationModal from '../../../components/ConfirmationModal';
import StatusModal from '../../../components/StatusModal';
import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";
import deleteSvg from "../../../assets/deleteAction.svg";
import { resourceMembersValidationSchema } from "../validation";

export const Resources = () => {

  /* ================= LOCAL STATES ================= */
  const initialResourcMemberCooperativeData = {
    resourceName: '',
    resourcefatherName: '',
    designation: '',
    gender: '',
    email: '',
    mobile: '',
    district: '',
    block: '',
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
				resourceName: '',
				resourcefatherName: '',
				designation: '',
				gender: '',
				email: '',
				mobile: '',
				district: '',
				block: '',
            };
            initialResourcMemberCooperativeData(prev => [...prev, newItem]);
            setStatusConfig({ success: true, message: 'Resource details added successfully.' });
        } else if (pendingAction === 'update') {
            initialResourcMemberCooperativeData(prev => prev.map(item =>
                item.id === editingId
                    ? {
                        ...item,
                            resourceName: '',
							resourcefatherName: '',
							designation: '',
							gender: '',
							email: '',
							mobile: '',
							district: '',
							block: '',
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
	
	const handleStatusModalClose = () => {
        setIsStatusModalOpen(false);
    };

    const handleEditClick = (row) => {
        console.log('Edit clicked for:', row);
    };

    const handleViewClick = (row) => {
        console.log('View clicked for:', row);
    };

  
    const [ResourcMemberCooperativeData, setResourceMemberCooperativeData] = useState(initialResourcMemberCooperativeData);
    const [resourceMemberCooperativeErrors, setResourceMemberCooperativeErrors] = useState({});
    const [isSaveClicked, setIsSaveClicked] = useState(false);

  /* ================= FORMIK ================= */
  const formik = useFormik({
    initialValues: initialResourcMemberCooperativeData,
    validationSchema: resourceMembersValidationSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  /* ================= SYNC FORM VALUES TO STATE ================= */
  useEffect(() => {
    const syncForm = async () => {
      const errors = await formik.validateForm();
      setResourceMemberCooperativeErrors(errors);
      setResourceMemberCooperativeData({ ...formik.values });
    };
    syncForm();
  }, [formik.values]);

  /* ================= SAVE CLICK VALIDATION ================= */
  useEffect(() => {
    if (!isSaveClicked) return;

    const validateAndSubmit = async () => {
      const errors = await formik.validateForm();
      setResourceMemberCooperativeErrors(errors);
      console.log("values :", ResourcMemberCooperativeData);
      console.log("errors :", resourceMemberCooperativeErrors);

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
    setResourceMemberCooperativeData(initialResourcMemberCooperativeData);
    formik.resetForm();
    setResourceMemberCooperativeErrors({});
  };

  /* ================= UI ================= */
  return (
    <div>
      <h2 className="text-base font-bold mb-6">
        FPO Resource Update Form
      </h2>

      {/* Form Fields */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <TextField
            label="Resource Name"
            required
            name="resourceName"
            placeholder="Enter Resource Name"
			value={ResourcMemberCooperativeData.resourceName}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={resourceMemberCooperativeErrors.resourceName}
            touched={formik.touched.resourceName}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <TextField
            label="Father's/Husband's Name"
            required
            name="resourcefatherName"
            placeholder="Father's/Husband's Name"
            value={ResourcMemberCooperativeData.resourcefatherName}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={resourceMemberCooperativeErrors.resourcefatherName}
            touched={formik.touched.resourcefatherName}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <SelectField
            label="Designation"
            required
            name="designation"
            value={ResourcMemberCooperativeData.designation}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={resourceMemberCooperativeErrors.designation}
            touched={formik.touched.designation}
          >
            <option value="">Select Designation</option>
            <option value="CEO">CEO</option>
            <option value="Accountant">Accountant</option>
            <option value="LabourManager">Labour</option>
            <option value="Others">Others</option>
            <option value="Member">Member</option>
          </SelectField>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 md:col-span-4">
          <RadioGroup
            label="Gender"
			required
			name="gender"
            value={ResourcMemberCooperativeData.gender}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={resourceMemberCooperativeErrors.gender}
            touched={formik.touched.gender}
            options={[
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
              { label: "Other", value: "Other" },
            ]}
          />
        </div>
      </div>

      {/* Email + Mobile */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <TextField
            label="Email"
            required
            name="email"
            placeholder="Enter Email"
            type="email"
            value={ResourcMemberCooperativeData.email}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={resourceMemberCooperativeErrors.email}
            touched={formik.touched.email}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <TextField
            label="Mobile Number"
            required
            name="mobile"
            placeholder="Enter Mobile Number"
            type="tel"
            value={ResourcMemberCooperativeData.mobile}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={resourceMemberCooperativeErrors.mobile}
            touched={formik.touched.mobile}
          />
        </div>
      </div>

      {/* Location */}
      <div className="grid grid-cols-12 gap-4 mt-4">
        {["district", "block"].map((field) => {
          // Convert camelCase to "Camel Case" format
          const formattedField = field
            .replace(/([A-Z])/g, " $1")   // Add space before capital letters
            .replace(/^./, (str) => str.toUpperCase()); // Capitalize first letter

          return (
            <div key={field} className="col-span-12 md:col-span-6">
              <SelectField
                label={formattedField}
                required
                name={field}
                value={ResourcMemberCooperativeData[field]}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                error={resourceMemberCooperativeErrors[field]}
                touched={formik.touched[field]}
              >
                <option value="">Select {formattedField}</option>
              </SelectField>
            </div>
          );
        })}
      </div>


      <hr className="border border-stroke-200 my-4" />

      {/* Buttons */}
      <div className="h-[64px] flex justify-end gap-4 items-center">
        <button
          type="button"
          onClick={handleReset}
          className="
            border border-primary
            text-primary
            rounded-lg
            w-[95px] h-[43px]
            text-sm font-medium
            hover:bg-primary-50
          "
        >
          Reset Form
        </button>

        <button
          type="button"
          onClick={() => setIsSaveClicked(true)}
          className="
            rounded-lg
            w-[96px] h-[43px]
            text-sm font-medium
            bg-success
            text-text-light
            hover:bg-success-600
          "
        >
          Save
        </button>
      </div>
		
      <hr className="border border-stroke-200 my-4" />
	  {/* Table View Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-base font-medium my-4 text-text-dark">Resource Member Detail View Form
				</h2>			
                <Table
                    columns={[
                        "Resource Name",
                        "Father’s/Husband’s Name",
                        "Designation",
                        "Gender",
                        "Email Address",
						"Mobile Number",
						"District",
						"Block",
                        "Actions"
                    ]}
                    data={initialResourcMemberCooperativeData}
                    renderActions={(row) => (
                        <div className="flex items-center justify-center gap-4">
                            <img src={editSvg} alt="Edit" className="w-6 h-6 cursor-pointer" onClick={() => handleEdit(row)} />
                            <img src={viewSvg} alt="View" className="w-6 h-6 cursor-pointer" />
                            <img src={deleteSvg} alt="Delete" className="w-6 h-6 cursor-pointer" onClick={() => handleDelete(row.id)} />
                        </div>
                    )}
                    renderColumn={(col, value) => {
                        if (col === "Resource Name") {
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

