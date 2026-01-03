import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

import { TextField, RadioGroup, SelectField } from "../../../components/FormFields";
import Table from "../../../components/Table";

import editSvg from "../../../assets/edit.svg";

import { boardMembersValidationSchema } from "../validation";
import { addBoardMember } from "../../../api/memberManagement";

export const BoardMembers = () => {
  /* ================= SAMPLE TABLE DATA ================= */
  const sampleData = [
    { Name: "Saurav Ganguly", "Father's/Husband's Name": "Chandidas Ganguly", Designation: "Chairman", Gender: "Male" },
    { Name: "Rina Sharma", "Father's/Husband's Name": "Rajesh Sharma", Designation: "Director", Gender: "Female" },
    { Name: "Amit Kumar", "Father's/Husband's Name": "Vinod Kumar", Designation: "Manager", Gender: "Male" },
    { Name: "Neha Singh", "Father's/Husband's Name": "Pradeep Singh", Designation: "Secretary", Gender: "Female" },
    { Name: "Rahul Verma", "Father's/Husband's Name": "Suresh Verma", Designation: "Member", Gender: "Male" },
  ];

  /* ================= LOCAL STATES ================= */
  const initialBoardMemberCooperativeData = {
    boardMemberName: "",
    fatherName: "",
    designation: "",
    gender: "",
    email: "",
    mobile: "",
    district: "",
    block: "",
    gramPanchayat: "",
    village: "",
  };

  const [boardMemberCooperativeData, setBoardMemberCooperativeData] = useState(initialBoardMemberCooperativeData);
  const [boardMemberCooperativeErrors, setBoardMemberCooperativeErrors] = useState({});
  const [isSaveClicked, setIsSaveClicked] = useState(false);

  /* ================= FORMIK ================= */
  const formik = useFormik({
    initialValues: initialBoardMemberCooperativeData,
    validationSchema: boardMembersValidationSchema,
    validateOnChange: false,
    validateOnBlur: true,
  });

  /* ================= SYNC FORM VALUES TO STATE ================= */
  useEffect(() => {
    const syncForm = async () => {
      const errors = await formik.validateForm();
      setBoardMemberCooperativeErrors(errors);
      setBoardMemberCooperativeData({ ...formik.values });
    };
    syncForm();
  }, [formik.values]);

  /* ================= SAVE CLICK VALIDATION ================= */
  useEffect(() => {
    if (!isSaveClicked) return;

    const validateAndSubmit = async () => {
      const errors = await formik.validateForm();
      setBoardMemberCooperativeErrors(errors);
      console.log("values :", boardMemberCooperativeData);
      console.log("errors :", boardMemberCooperativeErrors);

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

      try {
        await addBoardMember(boardMemberCooperativeData);
        alert("Board member added successfully!");

        // Reset everything after successful save
        setBoardMemberCooperativeData(initialBoardMemberCooperativeData);
        formik.resetForm();
        setBoardMemberCooperativeErrors({});
      } catch (error) {
        console.error("Error adding board member:", error);
      } finally {
        setIsSaveClicked(false);
      }
    };

    validateAndSubmit();
  }, [isSaveClicked]);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    formik.handleChange(e);
  };

  /* ================= HANDLE RESET ================= */
  const handleReset = () => {
    setBoardMemberCooperativeData(initialBoardMemberCooperativeData);
    formik.resetForm(); // resets Formik values, errors, touched
    setBoardMemberCooperativeErrors({});
  };

  /* ================= UI ================= */
  return (
    <div>
      <h2 className="text-base font-normal">Board Member Update Form</h2>

      {/* Board Member Name */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <TextField
            label="Board Member Name"
            required
            name="boardMemberName"
            placeholder="Board Member Name"
            value={boardMemberCooperativeData.boardMemberName}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={boardMemberCooperativeErrors.boardMemberName}
            touched={formik.touched.boardMemberName}
          />
        </div>
      </div>

      {/* Father + Designation */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <TextField
            label="Father's/Husband's Name"
            required
            name="fatherName"
            placeholder="Father's/Husband's Name"
            value={boardMemberCooperativeData.fatherName}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={boardMemberCooperativeErrors.fatherName}
            touched={formik.touched.fatherName}
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <SelectField
            label="Designation"
            required
            name="designation"
            value={boardMemberCooperativeData.designation}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={boardMemberCooperativeErrors.designation}
            touched={formik.touched.designation}
          >
            <option value="">Select Designation</option>
            <option value="Chairman">Chairman</option>
            <option value="Director">Director</option>
            <option value="Manager">Manager</option>
            <option value="Secretary">Secretary</option>
            <option value="Member">Member</option>
          </SelectField>
        </div>
      </div>

      {/* Gender */}
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 md:col-span-4">
          <RadioGroup
            name="gender"
            label="Gender"
            required
            value={boardMemberCooperativeData.gender}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={boardMemberCooperativeErrors.gender}
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
            value={boardMemberCooperativeData.email}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={boardMemberCooperativeErrors.email}
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
            value={boardMemberCooperativeData.mobile}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={boardMemberCooperativeErrors.mobile}
            touched={formik.touched.mobile}
          />
        </div>
      </div>

      {/* District + Block + Gram Panchayat + Village */}
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 md:col-span-6">
          <SelectField
            label="District"
            required
            name="district"
            value={boardMemberCooperativeData.district}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={boardMemberCooperativeErrors.district}
            touched={formik.touched.district}
          >
            <option value="">Select District</option>
          </SelectField>
        </div>

        <div className="col-span-12 md:col-span-6">
          <SelectField
            label="Block"
            required
            name="block"
            value={boardMemberCooperativeData.block}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={boardMemberCooperativeErrors.block}
            touched={formik.touched.block}
          >
            <option value="">Select Block</option>
          </SelectField>
        </div>

        <div className="col-span-12 md:col-span-6">
          <SelectField
            label="Gram Panchayat"
            required
            name="gramPanchayat"
            value={boardMemberCooperativeData.gramPanchayat}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={boardMemberCooperativeErrors.gramPanchayat}
            touched={formik.touched.gramPanchayat}
          >
            <option value="">Select Gram Panchayat</option>
          </SelectField>
        </div>

        <div className="col-span-12 md:col-span-6">
          <SelectField
            label="Village"
            required
            name="village"
            value={boardMemberCooperativeData.village}
            onChange={handleChange}
            onBlur={formik.handleBlur}
            error={boardMemberCooperativeErrors.village}
            touched={formik.touched.village}
          >
            <option value="">Select Village</option>
          </SelectField>
        </div>
      </div>

      <hr className="border-1 my-[16px]" />

      {/* Buttons */}
      <div className="h-[64px] flex justify-end gap-4 items-center">
        <button
          type="button"
          onClick={handleReset}
          className="border border-[#253300] rounded-[8px] w-[95px] h-[43px] text-sm font-medium text-[#253300]"
        >
          Reset
        </button>

        <button
          type="button"
          onClick={() => setIsSaveClicked(true)}
          className="rounded-[8px] w-[226px] h-[43px] text-sm font-medium bg-[#3C9718] text-white"
        >
          Add to Board Member List
        </button>
      </div>

      <hr className="border-1 my-[16px]" />

      <h2 className="text-base font-medium my-[16px]">Board Member Detail view form</h2>

      <Table
        columns={["Name", "Father's/Husband's Name", "Designation", "Gender", "Actions"]}
        data={sampleData}
        renderActions={() => (
          <div className="flex items-center justify-center gap-[34px]">
            <img src={editSvg} alt="Edit" className="w-[32px] h-[32px] cursor-pointer" />
          </div>
        )}
      />
    </div>
  );
};


