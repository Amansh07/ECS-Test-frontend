import { useState } from "react";
import "./RegisterScreen.css";

const initialValues = {
  implementingAgency: "",
  block: "",
  communicationAddress: "",
  pincode: "",
  totalShareholders: "",
  femaleShareholders: "",
  maleShareholders: "",
  femalePercentage: "",
  totalLand: "",
  secondaryEmail: "",
  secondaryContact: "",
  username: "",
  password: "",
  confirmPassword: "",
};

export default function Registration() {
  const [values, setValues] = useState(initialValues);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: submit to API
    console.log("Form submit", values);
  }

  return (
    <div className="max-w-full mx-auto">
      <h1 className="text-xl text-center font-semibold mb-4 text-gray-800">
        FPC Companies Act
      </h1>
	  {/* Stepper */}
      <div className="flex items-center justify-center gap-8 mb-6 text-sm">
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
      </div>

      <section className="bg-white rounded shadow-sm border">
        <div className="px-6 py-3">
          <h2 className="font-semibold text-gray-800">Registration Form</h2>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-6">
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

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              className="px-5 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded text-sm font-semibold bg-green-600 text-white hover:bg-green-700"
            >
              Next
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
