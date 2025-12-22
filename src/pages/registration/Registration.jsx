/******* src/pages/registration/Registration.jsx  *************/
import { useState } from "react";
// import Breadcrumb from "../../components/Breadcrumb";
import Stepper from "../../components/Stepper";
import { AccordionGroup } from "../../components/Accordion";
import { TextField, SelectField } from "../../components/FormFields";
import "./Registration.css";

const initialValues = {
  // Registration Details (Accordions)
  registeredUnder: "companies",
  cin: "",
  doi: "",
  companyName: "",
  rocName: "",
  companyStatus: "",
  addressType: "",
  address1: "",
  address2: "",
  pincode: "",
  primaryEmail: "",
  primaryContact: "",
  secondaryEmail: "",
  secondaryContact: "",
  totalShareholders: "",
  financialYear: "",
  turnOver: "",
  totalLand: "",
  // Registration form fields (below accordions)
  implementingAgency: "",
  block: "",
  communicationAddress: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export default function Registration() {
  const [values, setValues] = useState(initialValues);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepsCompleted, setStepsCompleted] = useState([true, true, false, false]);

  const steps = ["Select User", "Registration Details", "Add Documents", "Review"];

  const handleChange = (e) => {
    const { name, type } = e.target;
    const value = type === "radio" ? e.target.value : e.target.value;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const markStepCompleted = (index, completed = true) => {
    setStepsCompleted((prev) => {
      const next = [...prev];
      next[index] = completed;
      return next;
    });
  };

  const goNext = () => {
    // Validate both sections before proceeding
    if (!values.cin || !values.companyName || !values.username) {
      alert("Please fill mandatory fields (CIN, Company Name, Username).");
      return;
    }
    markStepCompleted(2, true);
    if (currentStep < 4) {
      setCurrentStep((s) => s + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit Registration", values);
  };

  // STEP 1: Registration Details Accordions
  const renderRegistrationDetails = () => {
    const items = [
      {
        id: "reg-main",
        title: "Registration Details",
        isInitiallyOpen: true,
        content: (
          <>
            <p className="registration-help-text">
              Register FPO into the system and after approval credentials communicate
              to them via mail/SMS.
            </p>

            <div className="mb-4">
              <p className="registration-label">
                Registered Under
                <span className="registration-label-required">*</span>
              </p>
              <div className="flex flex-wrap gap-6 text-sm">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="registeredUnder"
                    value="companies"
                    checked={values.registeredUnder === "companies"}
                    onChange={handleChange}
                  />
                  <span>Companies Act</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="registeredUnder"
                    value="cooperatives"
                    checked={values.registeredUnder === "cooperatives"}
                    onChange={handleChange}
                  />
                  <span>Cooperatives/Societies Act</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="CIN / LLPIN / FCRN"
                required
                name="cin"
                placeholder="Enter CIN / LLPIN / FCRN"
                value={values.cin}
                onChange={handleChange}
              />
              <TextField
                label="Date of Incorporation"
                required
                name="doi"
                type="date"
                placeholder="(dd/mm/yyyy)"
                value={values.doi}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Name of Company"
                required
                name="companyName"
                placeholder="Name of Company"
                value={values.companyName}
                onChange={handleChange}
              />
              <TextField
                label="ROC Name"
                required
                name="rocName"
                placeholder="ROC Name"
                value={values.rocName}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Company status"
                required
                name="companyStatus"
                value={values.companyStatus}
                onChange={handleChange}
              >
                <option value="">Company status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </SelectField>
              <div />
            </div>
          </>
        ),
      },
      {
        id: "address",
        title: "Address Details",
        isInitiallyOpen: false,
        content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Address Type"
              name="addressType"
              value={values.addressType}
              onChange={handleChange}
            >
              <option value="">Address Type</option>
              <option value="reg">Registered Office</option>
              <option value="branch">Branch Office</option>
            </SelectField>
            <TextField
              label="Address Line 1"
              required
              name="address1"
              placeholder="Address Line 1"
              value={values.address1}
              onChange={handleChange}
            />
            <TextField
              label="Address Line 2"
              name="address2"
              placeholder="Address Line 2"
              value={values.address2}
              onChange={handleChange}
            />
            <TextField
              label="Pincode"
              required
              name="pincode"
              placeholder="Pincode"
              value={values.pincode}
              onChange={handleChange}
            />
          </div>
        ),
      },
      {
        id: "contact",
        title: "Contact Details",
        isInitiallyOpen: false,
        content: (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Primary Email"
              required
              name="primaryEmail"
              type="email"
              placeholder="Primary Email"
              value={values.primaryEmail}
              onChange={handleChange}
            />
            <TextField
              label="Primary Contact Number"
              required
              name="primaryContact"
              placeholder="Primary Contact Number"
              value={values.primaryContact}
              onChange={handleChange}
            />
            <TextField
              label="Secondary Email"
              name="secondaryEmail"
              type="email"
              placeholder="Secondary Email"
              value={values.secondaryEmail}
              onChange={handleChange}
            />
            <TextField
              label="Secondary Contact Number"
              name="secondaryContact"
              placeholder="Secondary Contact Number"
              value={values.secondaryContact}
              onChange={handleChange}
            />
          </div>
        ),
      },
	    {
      id: "other-details",
      title: "Financial Details of Company",
      isInitiallyOpen: false,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Financial Year"
			required
            name="financialYear"
            placeholder="Financial Year"
          />
          <TextField
            label="Turnover "
			required
            name="turnOver"
            placeholder="Turnover"
          />
        </div>
      ),
    },  
    ];

    return <AccordionGroup items={items} />;
  };

  // Registration form fields (below accordions)
  const renderRegistrationForm = () => (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h3 className="text-sm font-semibold text-gray-800 mb-4">
        Registration Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Implementing Agency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Implementing Agency (Associated with){" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                name="implementingAgency"
                value={values.implementingAgency}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="">Select Agency</option>
                <option value="agency1">Agency 1</option>
                <option value="agency2">Agency 2</option>
              </select>
            </div>

            {/* Block */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Block<span className="text-red-500">*</span>
              </label>
              <select
                name="block"
                value={values.block}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="">Select Block</option>
                <option value="block1">Block 1</option>
              </select>
            </div>

            {/* Communication Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Communication Address<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="communicationAddress"
                value={values.communicationAddress}
                onChange={handleChange}
                placeholder="Enter Communication Address"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="pincode"
                value={values.pincode}
                onChange={handleChange}
                placeholder="Enter Value"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Number of Shareholders */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Shareholders<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="totalShareholders"
                value={values.totalShareholders}
                onChange={handleChange}
                placeholder="Enter Value"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Number of Female Shareholders */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Female Shareholders<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="femaleShareholders"
                value={values.femaleShareholders}
                onChange={handleChange}
                placeholder="Enter Value"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Number of Male Shareholders */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Male Shareholders<span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="maleShareholders"
                value={values.maleShareholders}
                onChange={handleChange}
                placeholder="Enter Value"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Percentage of Female Shareholders */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Percentage of Female Shareholders
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="femalePercentage"
                value={values.femalePercentage}
                onChange={handleChange}
                placeholder="Enter Value"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Total Land */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Land Owned by FPO Farmers (In Hectares)
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="totalLand"
                value={values.totalLand}
                onChange={handleChange}
                placeholder="Enter Value"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Secondary FPO email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secondary FPO email
              </label>
              <input
                type="email"
                name="secondaryEmail"
                value={values.secondaryEmail}
                onChange={handleChange}
                placeholder="Enter Email"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Secondary contact number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secondary FPO Contact Number
              </label>
              <input
                type="tel"
                name="secondaryContact"
                value={values.secondaryContact}
                onChange={handleChange}
                placeholder="Enter Contact Number"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                placeholder="Enter Text"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Create Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>
    </div>
  );

  // Render ALL content together (accordions + form fields)
  const renderStepContent = () => (
    <>
      {renderRegistrationDetails()}
      {renderRegistrationForm()}
    </>
  );

  return (
   <div className="max-w-full mx-auto">
	<div className="registration-page">
	{/*<Breadcrumb />*/}

      <h2 className="registration-page-title">FPC – Companies Act</h2>

      <Stepper steps={steps} currentStep={currentStep} completed={stepsCompleted} />

      <section className="registration-card">
        <h2 className="registration-section-title">Complete Registration</h2>

        <form onSubmit={handleSubmit}>
          {renderStepContent()}

          <div className="registration-button-bar">
            <button
              type="button"
              className="registration-btn-back"
              onClick={goBack}
              disabled={currentStep === 1}
            >
              Back
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                className="registration-btn-next"
                onClick={goNext}
              >
                Next
              </button>
            ) : (
              <button type="submit" className="registration-btn-next">
                Submit
              </button>
            )}
          </div>
        </form>
      </section>
     </div>
	</div>
  );
}
