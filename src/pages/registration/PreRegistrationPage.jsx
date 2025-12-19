import { useState } from "react";
import { AccordionGroup } from "../../components/Accordion";
import { TextField, SelectField } from "../../components/FormFields";
import "./PreRegistrationPage.css";

export default function PreRegistrationPage() {
  // dummy handler
  const handleSubmit = (e) => {
    e.preventDefault();
    // integrate with your existing submit later
  };

  const accordionItems = [
    {
      id: "reg-details",
      title: "Registration Details",
      isInitiallyOpen: true,
      content: (
        <>
          {/* top help text */}
          <p className="text-xs text-red-600 mb-4">
            Register FPO into the system and after approval, communicate credentials to them via mail/SMS.
          </p>

          {/* Registered under */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-700 mb-2">
              Registered Under <span className="text-red-600">*</span>
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="registeredUnder" defaultChecked />
                <span>Companies Act</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="radio" name="registeredUnder" />
                <span>Cooperatives/Societies Act</span>
              </label>
            </div>
          </div>

          {/* CIN & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="CIN / LLPIN / FCRN"
              required
              placeholder="Enter CIN / LLPIN / FCRN"
              name="cin"
            />
            <TextField
              label="Date of Incorporation"
              required
              placeholder="(dd/mm/yyyy)"
              name="doi"
              type="date"
            />
          </div>

          {/* Name & ROC */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField
              label="Name of Company"
              required
              placeholder="Name of Company"
              name="companyName"
            />
            <TextField
              label="ROC Name"
              required
              placeholder="ROC Name"
              name="rocName"
            />
          </div>

          {/* Company status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Company status"
              required
              name="companyStatus"
              defaultValue=""
            >
              <option value="" disabled>Company status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </SelectField>
            <div />
          </div>
        </>
      ),
    },
    {
      id: "address-details",
      title: "Address Details",
      isInitiallyOpen: false,
      content: (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField label="Address Type" name="addressType" defaultValue="">
              <option value="" disabled>Address Type</option>
              <option value="reg">Registered Office</option>
              <option value="branch">Branch Office</option>
            </SelectField>
            <TextField
              label="Address Line 1"
              required
              name="address1"
              placeholder="Address Line 1"
            />
            <TextField
              label="Address Line 2"
              name="address2"
              placeholder="Address Line 2"
            />
            <TextField
              label="Area"
              required
              name="area"
              placeholder="Area"
            />
			<TextField
              label="City"
              required
              name="city"
              placeholder="City"
            />
			<TextField
              label="Pincode"
              required
              name="pincode"
              placeholder="Pincode"
            />
          </div>
        </>
      ),
    },
    {
      id: "contact-details",
      title: "Contact Details",
      isInitiallyOpen: false,
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextField
            label="Email Address"
            required
            name="Email"
            placeholder="Email"
            type="email"
          />
          <TextField
            label="Contact Number"
            required
            name="Contact"
            placeholder="Contact Number"
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
            label="Total Shareholders"
            name="totalShareholders"
            placeholder="Total Shareholders"
          />
          <TextField
            label="Total Land"
            name="totalLand"
            placeholder="Total Land (in acres)"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-full mx-auto">
	  <h1 className="text-xl text-center font-semibold mb-4 text-gray-800">
        FPC Companies Act
      </h1>
	  {/* Stepper */}
      {/* <div className="flex items-center justify-center gap-8 mb-6 text-sm">
        {[
          { step: 1, label: "Select User" },
          { step: 2, label: "Registration Details" },
          { step: 3, label: "Add Documents" },
          { step: 4, label: "Review" },
        ].map((item, idx) => (
          <div key={item.step} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold ${
                item.step <= 2 ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              {item.step}
            </div>
            <span
              className={
                item.step <= 2 ? "text-green-700 font-medium" : "text-gray-500"
              }
            >
              {item.label}
            </span>
            {idx < 3 && (
              <div className="w-10 h-px bg-gray-300 mx-1" aria-hidden="true" />
            )}
          </div>
        ))}
      </div> */}
	  <section className="w-full p-6 bg-white rounded shadow-sm border">
		{/* Page heading (matches screenshot style) */}
        <h2 className="font-semibold text-gray-800 py-3">Registration Form</h2>
        <form onSubmit={handleSubmit}>
          <AccordionGroup items={accordionItems} />

          {/* bottom-right buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              className="px-6 py-2 text-sm font-semibold rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-100"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-8 py-2 text-sm font-semibold rounded-md bg-[#4b7a00] text-white hover:bg-[#3b6100]"
            >
              Next
            </button>
          </div>
        </form>
      </section>
	</div>
  );
}
