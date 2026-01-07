import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, SelectField, RadioGroup } from '../../../components/FormFields';
import Table from '../../../components/Table';
import { Button } from '../../../components/Buttons';
import OtpModal from '../../../components/OtpModal';
import StatusModal from '../../../components/StatusModal';
import ConfirmationModal from '../../../components/ConfirmationModal';

import editSvg from '../../../assets/edit.svg';
import viewSvg from '../../../assets/view.svg';
import deleteSvg from '../../../assets/deleteAction.svg';
import reload from '../../../assets/reload.svg';

const validationSchema = Yup.object().shape({
  farmerName: Yup.string().required("Farmer's Name is required"),
  farmerId: Yup.string().required("Farmer ID is required"),
  fatherName: Yup.string().required("Father's/Husband's/Identifier's Name is required"),
  category: Yup.string().required("Category is required"),
  gender: Yup.string().required("Gender is required"),
  areaOfFarm: Yup.number().required("Area of Farm is required"),
  ownershipType: Yup.string().required("Type of Ownership is required"),
  mobileNumber: Yup.string().required("Mobile Number is required").matches(/^[0-9]{10}$/, "Must be a valid 10 digit number"),
  pincode: Yup.string().required("Pincode is required"),
  district: Yup.string().required("District is required"),
  village: Yup.string().required("Village is required"),
  address: Yup.string().required("Address is required"),
});

const initialValues = {
  farmerName: '',
  farmerId: '',
  fatherName: '',
  category: '',
  gender: '',
  areaOfFarm: '',
  ownershipType: '',
  mobileNumber: '',
  pincode: '',
  district: '',
  village: '',
  address: '',
};

export const Farmers = () => {
  const [farmersList, setFarmersList] = useState([]);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [fetchOption, setFetchOption] = useState('registry'); // 'registry' or 'manual'
  const [registryOption, setRegistryOption] = useState('mobile'); // 'mobile', 'aadhaar', 'id'
  const [searchQuery, setSearchQuery] = useState('');

  // CRUD State
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      setPendingAction(isEditMode ? 'update' : 'add');
      setIsConfirmationOpen(true);
    },
  });

  const handleSendOtp = () => {
    setIsOtpModalOpen(true);
  };

  const handleVerifyOtp = (otp) => {
    // Validation logic can be added here
    setIsOtpModalOpen(false);
    setStatusMessage('Otp verified');
    setIsStatusModalOpen(true);
  };

  const handleConfirm = () => {
    setIsConfirmationOpen(false);

    if (pendingAction === 'add') {
      const newItem = {
        id: Date.now(),
        ...formik.values,
      };
      setFarmersList(prev => [...prev, newItem]);
      setStatusMessage('Farmer details added successfully.');
    } else if (pendingAction === 'update') {
      setFarmersList(prev => prev.map(item =>
        item.id === editingId ? { ...item, ...formik.values } : item
      ));
      setStatusMessage('Farmer details updated successfully.');
    } else if (pendingAction === 'delete') {
      setFarmersList(prev => prev.filter(item => item.id !== editingId));
      setStatusMessage('Farmer details deleted successfully.');
    }

    setIsStatusModalOpen(true);
    handleReset();
  };

  const handleReset = () => {
    formik.resetForm();
    setIsEditMode(false);
    setEditingId(null);
    setSearchQuery('');
  };

  const handleEdit = (row) => {
    formik.setValues(row);
    setEditingId(row.id);
    setIsEditMode(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    setEditingId(id);
    setPendingAction('delete');
    setIsConfirmationOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn pb-10">
      <div className='border border-stroke-200 rounded-[8px] p-[16px] bg-white shadow-sm'>
        <h2 className="text-base font-bold mb-6 text-grey-900">
          FPO Farmers Update
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="text-sm font-medium text-grey-700 mb-2 block">
              Choose one of the options to fetch details from Farmer Registry *
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="fetchOption"
                  checked={fetchOption === 'registry'}
                  onChange={() => setFetchOption('registry')}
                  className="accent-primary"
                />
                <span className="text-sm text-grey-900">Fetch data from Farmer Registry</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="fetchOption"
                  checked={fetchOption === 'manual'}
                  onChange={() => setFetchOption('manual')}
                  className="accent-primary"
                />
                <span className="text-sm text-grey-900">Enter manually</span>
              </label>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-grey-700 mb-2 block">
              Choose one of the options to fetch details from Farmer Registry *
            </label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="registryOption"
                  checked={registryOption === 'mobile'}
                  onChange={() => setRegistryOption('mobile')}
                  className="accent-primary"
                />
                <span className="text-sm text-grey-900">Registered mobile number</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="registryOption"
                  checked={registryOption === 'aadhaar'}
                  onChange={() => setRegistryOption('aadhaar')}
                  className="accent-primary"
                />
                <span className="text-sm text-grey-900">Aadhaar Number</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="registryOption"
                  checked={registryOption === 'id'}
                  onChange={() => setRegistryOption('id')}
                  className="accent-primary"
                />
                <span className="text-sm text-grey-900">Farmer ID</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium text-grey-700 mb-1 block">
            Enter Registered Mobile/ Aadhaar/ Farmer ID *
          </label>
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter Registered Mobile/ Aadhaar/ Farmer ID"
              className="w-full h-10 px-3 border border-stroke-300 rounded-md text-sm outline-none focus:border-primary-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-grey-500 hover:text-grey-700"
              >
                ✕
              </button>
            )}
          </div>
          <div className="mt-4">
            <Button
              type="button"
              onClick={handleSendOtp}
              buttonClassName="bg-primary text-white px-6 py-2 rounded text-sm font-medium hover:bg-primary-800"
            >
              Send OTP
            </Button>
          </div>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <TextField
              label="Farmer's Name"
              required
              name="farmerName"
              placeholder="Enter Farmer's Name"
              value={formik.values.farmerName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.farmerName}
              touched={formik.touched.farmerName}
            />
            <TextField
              label="Farmer ID"
              required
              name="farmerId"
              placeholder="Enter Farmer ID"
              value={formik.values.farmerId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.farmerId}
              touched={formik.touched.farmerId}
            />
            <TextField
              label="Father's/Husband's/Identifier's Name"
              required
              name="fatherName"
              placeholder="Enter Father's/ Husband's/Identifier's Name"
              value={formik.values.fatherName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.fatherName}
              touched={formik.touched.fatherName}
            />
            <SelectField
              label="Category"
              required
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.category}
              touched={formik.touched.category}
            >
              <option value="">Select Category</option>
              <option value="General">General</option>
              <option value="OBC">OBC</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
            </SelectField>

            <SelectField
              label="Gender"
              required
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.gender}
              touched={formik.touched.gender}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </SelectField>

            <TextField
              label="Area of Farm (in hectare)"
              required
              name="areaOfFarm"
              placeholder="Enter Value"
              value={formik.values.areaOfFarm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.areaOfFarm}
              touched={formik.touched.areaOfFarm}
            />

            <SelectField
              label="Type of Ownership"
              required
              name="ownershipType"
              value={formik.values.ownershipType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.ownershipType}
              touched={formik.touched.ownershipType}
            >
              <option value="">Select Below</option>
              <option value="Owner">Owner</option>
              <option value="Tenant">Tenant</option>
            </SelectField>

            <TextField
              label="Mobile Number"
              required
              name="mobileNumber"
              placeholder="Enter Mobile Number"
              value={formik.values.mobileNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.mobileNumber}
              touched={formik.touched.mobileNumber}
            />

            <TextField
              label="Pincode"
              required
              name="pincode"
              placeholder="Enter Value"
              value={formik.values.pincode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.pincode}
              touched={formik.touched.pincode}
            />

            <SelectField
              label="District"
              required
              name="district"
              value={formik.values.district}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.district}
              touched={formik.touched.district}
            >
              <option value="">Select District</option>
              <option value="District 1">District 1</option>
              <option value="District 2">District 2</option>
            </SelectField>

            <SelectField
              label="Village"
              required
              name="village"
              value={formik.values.village}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.village}
              touched={formik.touched.village}
            >
              <option value="">Select Village</option>
              <option value="Village 1">Village 1</option>
              <option value="Village 2">Village 2</option>
            </SelectField>
          </div>

          <div className="mt-4">
            <TextField
              label="Address"
              required
              name="address"
              placeholder="Enter Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.address}
              touched={formik.touched.address}
            />
          </div>

          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-stroke-200">
            <Button
              type="button"
              buttonClassName="px-6 py-2 bg-white border border-stroke-300 text-grey-700 rounded-md hover:bg-grey-50 font-medium flex items-center gap-2"
              onClick={handleReset}
            >
              <img src={reload} alt="Reset" className="w-4 h-4" />
              Reset Form
            </Button>
            <Button
              type="submit"
              buttonClassName="px-8 py-2 bg-primary text-white rounded-md hover:bg-primary-800 font-medium"
            >
              Save
            </Button>
          </div>
        </form>
      </div>

      <div className='flex flex-col'>
        <h3 className="text-base font-bold mb-4 text-grey-900">FPO Farmers Details View Table</h3>
        <div className="bg-white p-0 rounded-lg shadow-sm border border-stroke-200 overflow-hidden">
          <Table
            columns={[
              "Farmer Registration Number",
              "Father/Husband Name",
              "Username",
              "Gender",
              "Email",
              "Actions"
            ]}
            data={farmersList.map(item => ({
              ...item,
              "Farmer Registration Number": item.farmerId,
              "Father/Husband Name": item.fatherName,
              "Username": item.farmerName,
              "Gender": item.gender,
              "Email": item.email || "N/A", // Placeholder as email isn't in form
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

      <OtpModal
        isOpen={isOtpModalOpen}
        onClose={() => setIsOtpModalOpen(false)}
        onVerify={handleVerifyOtp}
        onResend={() => console.log('Resend OTP')}
      />

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onConfirm={handleConfirm}
        title={pendingAction === 'delete' ? 'Delete Record' : (isEditMode ? 'Update Record' : 'Save Record')}
        description={
          pendingAction === 'delete'
            ? 'Are you sure you want to delete this farmer record?'
            : `Are you sure you want to ${isEditMode ? 'update' : 'save'} these farmer details?`
        }
      />

      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        status={true}
        message={statusMessage}
      />
    </div>
  );
};