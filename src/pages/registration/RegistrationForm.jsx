
import React from "react";
import { AccordionGroup } from "../../components/Accordion";
import { TextField, SelectField, RadioGroup } from "../../components/FormFields";
import FinancialDetailsTable from "../../components/Table";
import "./Registration.css";

const RegistrationForm = ({ values, handleChange, disabled = false }) => {
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
              Registered FPO into the system and after approval credentials
              communicate to them via mail/SMS.
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
                    disabled={disabled} />
                  <span>Companies Act</span>
                </label>
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="registeredUnder"
                    value="cooperatives"
                    checked={values.registeredUnder === "cooperatives"}
                    onChange={handleChange}
                    disabled={disabled} />
                  <span>Cooperatives/Societies Act</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex-1">
                <TextField
                  label="CIN / LLPIN / FCRN"
                  required
                  name="cin"
                  placeholder="Enter CIN / LLPIN / FCRN"
                  value={values.cin}
                  onChange={handleChange}
                  disabled={disabled} />
              </div>
              <div className="pt-6">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-green-600 text-white text-sm font-mediumhover:bg-green-700" /*onClick={handleFetchCinData}*/>
                  Fetch
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <TextField
                label="Name of Company"
                required
                name="companyName"
                placeholder="Name of Company"
                value={values.companyName}
                onChange={handleChange}
                disabled={disabled} />
              <TextField
                label="Date of Incorporation"
                required
                name="doi"
                type="date"
                placeholder="(dd/mm/yyyy)"
                value={values.doi}
                onChange={handleChange}
                disabled={disabled} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="ROC Name"
                required
                name="rocName"
                placeholder="ROC Name"
                value={values.rocName}
                onChange={handleChange}
                disabled={disabled} />
              <SelectField
                label="Company status"
                required
                name="companyStatus"
                value={values.companyStatus}
                onChange={handleChange}
                disabled={disabled}>
                <option value="">Company status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </SelectField>
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
              readOnly
              name="addressType"
              value={values.addressType}
              onChange={handleChange}
              disabled={disabled}>
              <option value="">Address Type</option>
              <option value="reg">Registered Office</option>
              <option value="branch">Branch Office</option>
            </SelectField>
            <TextField
              label="Address Line 1"
              readOnly
              name="address1"
              placeholder="Address Line 1"
              value={values.address1}
              onChange={handleChange}
              disabled={disabled} />
            <TextField
              label="Address Line 2"
              readOnly
              name="address2"
              placeholder="Address Line 2"
              value={values.address2}
              onChange={handleChange}
              disabled={disabled} />
            <TextField
              label="Area"
              readOnly
              name="areea"
              placeholder="Area"
              value={values.areea}
              onChange={handleChange}
              disabled={disabled} />
            <SelectField
              label="City"
              readOnly
              name="city"
              value={values.city}
              onChange={handleChange}
              disabled={disabled}>
              <option value="">City</option>
              <option value="city1">city1</option>
              <option value="city2">city2</option>
            </SelectField>
            <SelectField
              label="District"
              readOnly
              name="district"
              value={values.district}
              onChange={handleChange}
              disabled={disabled}>
              <option value="">District</option>
              <option value="district1">District-1</option>
              <option value="district2">District-2</option>
            </SelectField>
            <TextField
              label="Pincode"
              readOnly
              name="pincode"
              placeholder="Pincode"
              value={values.pincode}
              onChange={handleChange}
              disabled={disabled} />
            <SelectField
              label="State"
              readOnly
              name="state"
              value={values.state}
              onChange={handleChange}
              disabled={disabled}>
              <option value="">State</option>
              <option value="state1">State-1</option>
              <option value="state2">State-2</option>
            </SelectField>
            <SelectField
              label="Country"
              readOnly
              name="country"
              value={values.country}
              onChange={handleChange}
              disabled={disabled}>
              <option value="">Country</option>
              <option value="ind">India</option>
            </SelectField>
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
              label="Email Address"
              readOnly
              name="primaryEmail"
              type="email"
              placeholder="Email Address"
              value={values.primaryEmail}
              onChange={handleChange}
              disabled={disabled} />
            <TextField
              label="Contact Number"
              readOnly
              name="primaryContact"
              placeholder="Contact Number"
              value={values.primaryContact}
              onChange={handleChange}
              disabled={disabled} />
          </div>
        ),
      },
      {
        id: "financial-details",
        title: "Financial details of Company",
        isInitiallyOpen: false,
        content: (
          <>
            {/* --- READ ONLY TABLE COMPONENT --- */}
            <FinancialDetailsTable rows={4} placeholder="Value" />
          </>
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
        <SelectField
          label="Agency (Associated with)"
          required
          name="implementingAgency"
          value={values.implementingAgency}
          onChange={handleChange}
          disabled={disabled}>
          <option value="">Select Agency</option>
          <option value="sima">SIMA</option>
          <option value="hofd">HOFD</option>
        </SelectField>
        {/* Block */}
        <SelectField
          label="Block"
          required
          name="block"
          value={values.block}
          onChange={handleChange}
          disabled={disabled}>
          <option value="">Select Block</option>
          <option value="bloc-a">Block-A</option>
          <option value="bloc-b">Block-B</option>
        </SelectField>
        {/* Communication Address */}
        <TextField
          label="Communication Address"
          type="text"
          name="communicationAddress"
          placeholder="Enter Communication Address"
          value={values.communicationAddress}
          onChange={handleChange}
          disabled={disabled} />
        {/* Pincode */}
        <TextField
          label="Pincode"
          required
          type="text"
          name="pincode"
          placeholder="Enter Value"
          value={values.pincode}
          onChange={handleChange}
          disabled={disabled} />
        {/* Number of Shareholders */}
        <TextField
          label="Number of Farmers/Shareholders"
          required
          type="number"
          name="totalShareholders"
          placeholder="Enter Value"
          value={values.totalShareholders}
          onChange={handleChange}
          disabled={disabled} />
        {/* Number of Female Shareholders */}
        <TextField
          label="Number of Female Farmers/Shareholders"
          required
          type="number"
          name="femaleShareholders"
          placeholder="Enter Value"
          value={values.femaleShareholders}
          onChange={handleChange}
          disabled={disabled} />
        {/* Number of Male Shareholders */}
        <TextField
          label="Number of Male Shareholders"
          required
          type="number"
          name="maleShareholders"
          placeholder="Enter Value"
          value={values.maleShareholders}
          onChange={handleChange}
          disabled={disabled} />
        {/* Percentage of Female Shareholders */}
        <TextField
          label="Percentage of Female Shareholders"
          type="number"
          name="femalePercentage"
          placeholder="Enter Value"
          value={values.femalePercentage}
          onChange={handleChange}
          disabled={disabled} />
        {/* Total Land */}
        <TextField
          label="Total Land Owned by FPO Farmers (In Hectares)"
          required
          type="number"
          name="totalLand"
          placeholder="Enter Value"
          value={values.totalLand}
          onChange={handleChange}
          disabled={disabled} />
        {/* Secondary FPO email */}
        <TextField
          label="Secondary FPO email"
          required
          type="email"
          name="secondaryEmail"
          placeholder="Enter Email"
          value={values.secondaryEmail}
          onChange={handleChange}
          disabled={disabled} />
        {/* Secondary contact number */}
        <TextField
          label="Secondary FPO Contact Number"
          required
          type="tel"
          name="secondaryContact"
          placeholder="Enter Contact Number"
          value={values.secondaryContact}
          onChange={handleChange}
          disabled={disabled} />
        {/* Username */}
        <TextField
          label="Username"
          required
          type="text"
          name="username"
          placeholder="Enter Text"
          value={values.username}
          onChange={handleChange}
          disabled={disabled} />
        {/* Password */}
        <TextField
          label="Password"
          required
          type="password"
          name="password"
          placeholder="Enter Password"
          value={values.password}
          onChange={handleChange}
          disabled={disabled} />
        {/* Confirm Password */}
        <TextField
          label="Confirm Password"
          required
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={values.confirmPassword}
          onChange={handleChange}
          disabled={disabled} />
        {/* FPO Pan */}
        <TextField
          label="FPO Pan No."
          type="text"
          name="fpopan"
          placeholder="FPO Pan Number"
          value={values.fpopan}
          onChange={handleChange}
          disabled={disabled} />
      </div>
    </div>
  );

  return (
    <div>
      {renderRegistrationDetails()}
      {renderRegistrationForm()}
    </div>
  );
};

export default RegistrationForm;