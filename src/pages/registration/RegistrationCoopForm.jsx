// src/pages/registration/RegistrationCoopForm.jsx
import { useState } from "react";
import { AccordionGroup } from "../../components/Accordion";
import { TextField, SelectField, RadioGroup } from "../../components/FormFields";
import "./Registration.css";

const RegistrationCoopForm = ({ values = {}, handleChange = () => { }, disabled = false }) => {
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
              Registered FPO into the system and after approval credentials will be
              communicated via mail/SMS.
            </p>
            {/* <div className="mt-2 pt-2 border-t border-gray-200"></div> */}

            <div className="mb-4">
              <p className="registration-label">
                Registered Under <span className="registration-label-required">*</span>
              </p>
              <div className="flex flex-wrap gap-6 text-sm">
                <label className="inline-flex items-center gap-2">
                  <input
                    type="radio"
                    name="registeredUnder"
                    value="companies"
                    checked={values.registeredUnder === "companies"}
                    onChange={handleChange}
                    disabled={disabled}
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
                    disabled={disabled}
                  />
                  <span>Cooperatives/Societies Act</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Registration Number"
                required
                name="regdNo"
                placeholder="Registration Number"
                value={values.regdNo || ""}
                onChange={handleChange}
                disabled={disabled}
              />
              <TextField
                label="Name of Cooperatives/Societies"
                required
                name="coopsocietyName"
                placeholder="Name of Cooperatives/Societies"
                value={values.coopsocietyName || ""}
                onChange={handleChange}
                disabled={disabled}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Date of Registration"
                required
                name="doreg"
                type="date"
                placeholder="dd/mm/yyyy"
                value={values.doreg || ""}
                onChange={handleChange}
                disabled={disabled}
              />
              <SelectField
                label="Cooperative/Society status"
                required
                name="companyStatus"
                value={values.companyStatus || ""}
                onChange={handleChange}
                disabled={disabled}
              >
                <option value="">Company status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </SelectField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextField
                label="Registration Authority Name"
                required
                name="roaName"
                placeholder="Registration Authority Name"
                value={values.roaName || ""}
                onChange={handleChange}
                disabled={disabled}
              />
            </div>
          </>
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
              required
              name="emailAddress"
              type="email"
              placeholder="Email Address"
              value={values.emailAddress || ""}
              onChange={handleChange}
            />
            <TextField
              label="Contact Number"
              required
              name="contactNumber"
              placeholder="Contact Number"
              value={values.contactNumber || ""}
              onChange={handleChange}
            />
          </div>
        ),
      },
      {
        id: "financial",
        title: "Financial details of Company",
        isInitiallyOpen: false,
        content: (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Financial Year"
                required
                name="financialYear"
                value={values.financialYear || ""}
                onChange={handleChange}
                disabled={disabled}
              >
                <option value="">Select Year</option>
                <option value="2023-24">2023-24</option>
                <option value="2022-23">2022-23</option>
              </SelectField>
              <TextField
                label="Turnover"
                required
                name="turnOver"
                placeholder="Enter Value"
                value={values.turnOver || ""}
                onChange={handleChange}
                disabled={disabled}
              />
              <TextField
                label="Profit/Loss"
                required
                name="profitLoss"
                placeholder="Enter Value"
                value={values.profitLoss || ""}
                onChange={handleChange}
                disabled={disabled}
              />
              <SelectField
                label="Financial Range"
                required
                name="financialRange"
                value={values.financialRange || ""}
                onChange={handleChange}
                disabled={disabled}
              >
                <option value="">Select Range</option>
                <option value="1-5Crores">1-5 Crores</option>
                <option value="6-20 Crores">6-20 Crores</option>
              </SelectField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <RadioGroup
                label="Audit Status Applicability"
                required
                name="auditApplicability"
                value={values.auditApplicability || ""}
                onChange={handleChange}
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                ]}
                disabled={disabled}
              />
              <RadioGroup
                label="Audit Status"
                required
                name="auditStatus"
                value={values.auditStatus || ""}
                onChange={handleChange}
                options={[
                  { value: "done", label: "Done" },
                  { value: "notdone", label: "Not Done" },
                ]}
                disabled={disabled}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectField
                label="Type"
                required
                name="auditType"
                value={values.auditType || ""}
                onChange={handleChange}
                disabled={disabled}
              >
                <option value="na">Not Applicable</option>
                <option value="internal">Internal Audit</option>
                <option value="statutory">Statutory Audit</option>
              </SelectField>
            </div>
          </>
        ),
      },
    ];

    return <AccordionGroup items={items} />;
  };

  // Registration form fields below accordions
  const renderRegistrationForm = () => (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <h3 className="text-sm font-semibold text-gray-800 mb-4">
        Registration Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          label="Agency Associated with"
          required
          name="implementingAgency"
          value={values.implementingAgency || ""}
          onChange={handleChange}
          disabled={disabled}
        >
          <option value="">Select Agency</option>
          <option value="sima">SIMA</option>
          <option value="hofd">HOFD</option>
        </SelectField>

        <SelectField
          label="Block"
          required
          name="block"
          value={values.block || ""}
          onChange={handleChange}
          disabled={disabled}
        >
          <option value="bloc-a">Block-A</option>
          <option value="bloc-b">Block-B</option>
        </SelectField>

        <SelectField
          label="District"
          required
          name="district"
          value={values.district || ""}
          onChange={handleChange}
          disabled={disabled}
        >
          <option value="">Select District</option>
          <option value="district1">District-1</option>
          <option value="district2">District-2</option>
        </SelectField>

        <TextField
          label="Address"
          name="communicationAddress"
          placeholder="Enter Communication Address"
          value={values.communicationAddress || ""}
          onChange={handleChange}
          disabled={disabled}
        />

        <TextField
          label="Pincode"
          required
          type="text"
          name="pincode"
          placeholder="Enter Value"
          value={values.pincode || ""}
          onChange={handleChange}
          disabled={disabled}
        />

        <TextField
          label="Number of Shareholders"
          required
          type="number"
          name="totalShareholders"
          placeholder="Enter Value"
          value={values.totalShareholders || ""}
          onChange={handleChange}
          disabled={disabled}
        />

        <TextField
          label="Number of Female Shareholders"
          required
          type="number"
          name="femaleShareholders"
          placeholder="Enter Value"
          value={values.femaleShareholders || ""}
          onChange={handleChange}
          disabled={disabled}
        />

        <TextField
          label="Number of Male Shareholders"
          required
          type="number"
          name="maleShareholders"
          placeholder="Enter Value"
          value={values.maleShareholders || ""}
          onChange={handleChange}
          disabled={disabled}
        />

        <TextField
          label="Percentage of Female Shareholders"
          type="number"
          name="femalePercentage"
          placeholder="Enter Value"
          value={values.femalePercentage || ""}
          onChange={handleChange}
          disabled={disabled}
        />

        <TextField
          label="Total Land Owned by FPO Farmers In Hectares"
          required
          type="number"
          name="totalLand"
          placeholder="Enter Value"
          value={values.totalLand || ""}
          onChange={handleChange}
          disabled={disabled}
        />

        <TextField
          label="Secondary FPO email"
          required
          type="email"
          name="secondaryEmail"
          placeholder="Enter Email"
          value={values.secondaryEmail || ""}
          onChange={handleChange}
          disabled={disabled}
        />

        <TextField
          label="Secondary FPO Contact Number"
          required
          type="tel"
          name="secondaryContact"
          placeholder="Enter Contact Number"
          value={values.secondaryContact || ""}
          onChange={handleChange}
          disabled={disabled}
        />

        <TextField
          label="Username"
          required
          type="text"
          name="username"
          placeholder="Enter Text"
          value={values.username || ""}
          onChange={handleChange}
          disabled={disabled}
        />

        <TextField
          label="Password"
          required
          type="password"
          name="password"
          placeholder="Enter Password"
          value={values.password || ""}
          onChange={handleChange}
          disabled={disabled}
        />

        <TextField
          label="Confirm Password"
          required
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={values.confirmPassword || ""}
          onChange={handleChange}
          disabled={disabled}
        />

        <TextField
          label="FPO Pan No."
          required
          type="text"
          name="fpopan"
          placeholder="FPO Pan Number"
          value={values.fpopan || ""}
          onChange={handleChange}
          disabled={disabled}
        />
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

export default RegistrationCoopForm;
