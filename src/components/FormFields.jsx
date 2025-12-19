/**** Common Form Field Comonents *************/

export function TextField({ label, required, ...inputProps }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-600 ml-0.5">*</span>}
      </label>
      <input
        {...inputProps}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4b7a00] focus:border-[#4b7a00]"
      />
    </div>
  );
}

export function SelectField({ label, required, children, ...selectProps }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-600 ml-0.5">*</span>}
      </label>
      <select
        {...selectProps}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-[#4b7a00] focus:border-[#4b7a00]"
      >
        {children}
      </select>
    </div>
  );
}
