import React from 'react';
import { TextField, RadioGroup, SelectField } from '../../../components/FormFields';
import Table from '../../../components/Table';
import editSvg from "../../../assets/edit.svg";
import viewSvg from "../../../assets/view.svg";
import deleteSvg from "../../../assets/deleteAction.svg";

export const BoardMembers = () => {
  const sampleData = [
    {
      Name: "Saurav Ganguly",
      "Father's/Husband's Name": "Chandidas Ganguly",
      Designation: "Chairman",
      Gender: "Male",
    },
    {
      Name: "Rina Sharma",
      "Father's/Husband's Name": "Rajesh Sharma",
      Designation: "Director",
      Gender: "Female",
    },
    {
      Name: "Amit Kumar",
      "Father's/Husband's Name": "Vinod Kumar",
      Designation: "Manager",
      Gender: "Male",
    },
    {
      Name: "Neha Singh",
      "Father's/Husband's Name": "Pradeep Singh",
      Designation: "Secretary",
      Gender: "Female",
    },
    {
      Name: "Rahul Verma",
      "Father's/Husband's Name": "Suresh Verma",
      Designation: "Member",
      Gender: "Male",
    },
  ];

  return (
    <div>
      <h2 className="text-base font-normal">Board Member Update Form</h2>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <TextField
            label="Board Member Name"
            required
            name="boardMemberName"
            placeholder="Board Member Name"
            value=""
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <TextField
            label="Father's/Husband's Name"
            required
            name="fatherName"
            placeholder="Father's/Husband's Name"
            value=""
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <SelectField label="Designation" required name="designation">
            <option value="">Select Designation</option>
            {/* options */}
          </SelectField>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4 mt-4">
        <div className="col-span-12 md:col-span-4">
          <RadioGroup
            name="gender"
            label="Gender"
            required
            value={"M"}
            options={[
              { label: "Male", value: "M" },
              { label: "Female", value: "F" },
              { label: "Other", value: "O" },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <TextField
            label="Email"
            required
            name="email"
            placeholder="Enter Email"
            type="email"
            value=""
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <TextField
            label="Mobile Number"
            required
            name="mobile"
            placeholder="Enter Mobile Number"
            type="tel"
            value=""
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-6">
          <SelectField label="District" required name="district">
            <option value="">Select District</option>
            {/* options */}
          </SelectField>
        </div>

        <div className="col-span-12 md:col-span-6">
          <SelectField label="Block" required name="block">
            <option value="">Select Block</option>
            {/* options */}
          </SelectField>
        </div>

        <div className="col-span-12 md:col-span-6">
          <SelectField label="Gram Panchayat" required name="gramPanchayat">
            <option value="">Select Gram Panchayat</option>
            {/* options */}
          </SelectField>
        </div>

        <div className="col-span-12 md:col-span-6">
          <SelectField label="Village" required name="village">
            <option value="">Select Village</option>
            {/* options */}
          </SelectField>
        </div>
      </div>


      <hr className="border-1 my-[16px]" />

      <div className="h-[64px] flex justify-end gap-4 items-center">
        <button className="border border-[#253300] rounded-[8px] w-[95px] h-[43px] text-sm font-medium text-[#253300] p-y-[10px] p-x-[24px]">
          Reset
        </button>
        <button className="rounded-[8px] w-[226px] h-[43px] text-sm font-medium bg-[#3C9718] p-y-[10px] p-x-[24px]">
          Add to Board Member List
        </button>
      </div>

      <hr className="border-1 my-[16px]" />

      <h2 className="text-base font-medium my-[16px]">Board Member Detail view form</h2>

      <Table
        columns={["Name", "Father's/Husband's Name", "Designation", "Gender", "Actions"]}
        data={sampleData}
        renderActions={(row) => (
          <div className="flex items-center justify-center gap-[34px]">
            <img src={editSvg} alt="View" className="w-[32px] h-[32px] cursor-pointer" />
            {/* <img src={viewSvg} alt="Edit" className="w-[32px] h-[32px] cursor-pointer"  />
          <img src={deleteSvg} alt="Delete" className="w-[32px] h-[32px] cursor-pointer" /> */}
          </div>
        )}
      />

    </div>
  )
}
