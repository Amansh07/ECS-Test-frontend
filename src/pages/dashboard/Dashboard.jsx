import React, { useState } from 'react';
import { RadioGroup, SelectField, TextArea } from '../../components/FormFields';
import Table from '../../components/Table';
import Toggle from "../../components/Toggle";
import PreviewModal from "../../components/PreviewModal";
import StatusModal from "../../components/StatusModal";
import { Button } from "../../components/Buttons";
import reloadSvg from "/assets/reload.svg";
import editSvg from "/assets/edit.svg";
import viewSvg from "/assets/view.svg";
import deleteSvg from "/assets/deleteAction.svg";
import "./Dashboard.css";


// Inline SVG Icons
	const ApprovedIcon = () => (
	  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
		<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
	  </svg>
	);

	const PendingIcon = () => (
	  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
		<circle cx="12" cy="12" r="10"/>
	  </svg>
	);

	const CompletedIcon = () => (
	  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
		<circle cx="12" cy="12" r="10"/>
		<path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
	  </svg>
	);
	
	const formData = {
		approvereject: '',
		rejectionReason: '',
		comment: '',
	};
	
	const handleInputChange = (e) => {
	};
	const handleChange = (e) => formik.handleChange(e);

	const ViewForm = ({ type }) => {
	  const titles = {
		approved: 'Approved Registrations',
		pending: 'Pending for Registration',
		rejected: 'Rejected/Deactivated Registration'
	  };

	return (
    <div className="view-form">
     <hr className="border border-stroke-200 my-4" />
	 <h2 className="text-base font-bold mb-6">View Form [ {titles[type]} ]</h2>
	 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 mt-2">
		<RadioGroup
			label="Approve/Reject FPO"
			name="approvereject"
			required
			value={formData.approvereject}
			onChange={handleInputChange}
			//onBlur={formik.handleBlur}
			//error={formik.approvereject}
			//touched={formik.approvereject}
			options={[
			  { label: "Approve", value: "approve" },
			  { label: "Reject", value: "reject" },
			]}
		  />
		<SelectField
			label="Rejection Reason"
			required
			name="rejectionReason"
			value={formData.rejectionReason}
			onChange={handleInputChange}
			>
			<option value="">Select</option>
			<option value="Reason1">Reason1 </option>
			<option value="Reason2">Reason2</option>
		</SelectField>
		</div>
		<div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-6">
		<TextArea
			label="Add Comment"
			required
			name="comment"
			placeholder="Enter Text"
			value={formData.comment}
			onChange={handleChange}
			//onChange={formik.handleChange}
			//onBlur={formik.handleBlur}
			//error={formik.errors.comment}
			//touched={formik.touched.comment}
		/>
		<div className="flex items-center justify-between w-full md:w-auto gap-6">
			<span className="text-sm font-medium text-grey-900">Send notification</span>
			{/*<Toggle
				checked={govAssistance}
				onChange={setGovAssistance}
			/>*/}
		</div>
		
		
		<div className="flex items-center justify-end w-full md:w-auto gap-4">
			<Button
				type="button"
				buttonClassName="px-6 py-2 bg-white border border-stroke-300 text-grey-700 rounded-md hover:bg-grey-50 font-medium flex items-center gap-2"
			>
			<img src={reloadSvg} alt="Reset" className="w-4 h-4" />
            Reset Form
			</Button>
			<Button
				type="submit"
				buttonClassName="px-8 py-2 bg-success text-white rounded-md hover:bg-success-dark font-medium"
			>
				Save
			</Button>
		</div>
	  </div>
      	{/* Table View Section */}
            <hr className="border border-stroke-200 my-4" />
			<div className="bg-white p-6 rounded-lg shadow-sm">
                
				<h3 className="text-lg font-semibold text-grey-900 mb-6">FPO Approve/Reject Table</h3>
                <Table
                    columns={[
                        "Block",
                        "FPO Name",
                        "Registration No",
                        "No. of Farmers ",
                        "Approved/Rejected On",
                        "Actions"
                    ]}
                />
            </div>
    </div>
  );
};

const DashboardLegends = ({ onLegendClick, activeTab }) => (
  <div className="legends-container">
    <div 
      className={`legend approved ${activeTab === 'approved' ? 'active' : ''}`} 
      onClick={() => onLegendClick('approved')}
    >
      <ApprovedIcon />
      <div className="legend-number">105</div>
      <div className="legend-text">Approved Registration</div>
    </div>

    <div 
      className={`legend pending ${activeTab === 'pending' ? 'active' : ''}`} 
      onClick={() => onLegendClick('pending')}
    >
      <PendingIcon />
      <div className="legend-number">35</div>
      <div className="legend-text">Pending for Registration</div>
    </div>

    <div 
      className={`legend completed ${activeTab === 'rejected' ? 'active' : ''}`} 
      onClick={() => onLegendClick('rejected')}
    >
      <CompletedIcon />
      <div className="legend-number">10</div>
      <div className="legend-text">Rejected/Deactivated Registration</div>
    </div>
  </div>
);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="dashboard">
      <div className="header">
        <h1>Dashboard</h1>
      </div>
      {/* <DashboardLegends onLegendClick={setActiveTab} activeTab={activeTab} />
      {activeTab && <ViewForm type={activeTab} />} */}
    </div>
  );
};
export default Dashboard;
