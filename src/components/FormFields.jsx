// // Reusable form fields used in both steps

// export function TextField({
//   label,
//   required,
//   labelClassName = "",
//   inputClassName = "",
//   imageSrc,
//   ...inputProps
// }) {
//   return (
//     <div className="mb-4">
//       {label && (
//         <label className={`registration-label ${labelClassName}`}>
//           {label}
//           {required && (
//             <span className="registration-label-required">*</span>
//           )}
//         </label>
//       )}
//       {/* Input wrapper */}
//       <div className="relative">
//         {imageSrc && (
//           <img
//             src={imageSrc}
//             alt=""
//             className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
//           />
//         )}

//         <input
//           {...inputProps}
//           className={`registration-input ${imageSrc ? "pl-10" : ""
//             } ${inputClassName}`}
//         />
//       </div>
//       {/* <input
//         {...inputProps}
//         className={`registration-input ${inputClassName}`}
//       /> */}
//     </div>
//   );
// }

// export function SelectField({
//   label,
//   required,
//   labelClassName = "",
//   selectClassName = "",
//   children,
//   ...selectProps
// }) {
//   return (
//     <div className="mb-4">
//       {label && (
//         <label className={`registration-label ${labelClassName}`}>
//           {label}
//           {required && (
//             <span className="registration-label-required">*</span>
//           )}
//         </label>
//       )}
//       <select
//         {...selectProps}
//         className={`registration-select ${selectClassName} `}
//       >
//         {children}
//       </select>
//     </div>
//   );
// }

// export function RadioGroup({
//   name,
//   label,
//   required,
//   options,
//   value,
//   onChange,
// }) {
//   return (
//     <div className="mb-4">
//       {label && (
//         <p className="registration-label">
//           {label}
//           {required && (
//             <span className="registration-label-required">*</span>
//           )}
//         </p>
//       )}

//       <div className="flex flex-col md:flex-row gap-4 text-sm">
//         {options.map((opt) => (
//           <label
//             key={opt.value}
//             className="inline-flex items-center gap-2 cursor-pointer"
//           >
//             <input
//               type="radio"
//               name={name}
//               value={opt.value}
//               checked={value === opt.value}
//               onChange={onChange}
//             />
//             <span>{opt.label}</span>
//           </label>
//         ))}
//       </div>
//     </div>
//   );
// }

// export function CheckboxField({
//   label,
//   name,
//   checked,
//   onChange,
//   labelClassName = "",
//   checkboxClassName = "",
//   ...checkboxProps
// }) {
//   return (
//     <div className="mb-4 flex items-center">
//       <input
//         type="checkbox"
//         name={name}
//         checked={checked}
//         onChange={onChange}
//         className={`w-5 h-5 text-success bg-grey-100 border-grey-300 rounded focus:ring-success focus:ring-2 ${checkboxClassName}`}
//         {...checkboxProps}
//       />
//       {label && (
//         <label className={`ml-2 text-sm font-medium text-grey-900 cursor-pointer ${labelClassName}`}>
//           {label}
//         </label>
//       )}
//     </div>
//   );
// }


import React from "react";

/* ================= TEXT FIELD ================= */
export function TextField({
  label,
  required,
  labelClassName = "",
  inputClassName = "",
  imageSrc,
  error,
  touched,
  ...inputProps
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className={`registration-label ${labelClassName}`}>
          {label}
          {required && <span className="registration-label-required">*</span>}
        </label>
      )}

      <div className="relative">
        {imageSrc && (
          <img
            src={imageSrc}
            alt=""
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4"
          />
        )}

        <input
          {...inputProps}
          onBlur={inputProps.onBlur}
          className={`
            registration-input
            ${imageSrc ? "pl-10" : ""}
            ${touched && error ? "border-red-500" : ""}
            ${inputClassName}
          `}
        />
      </div>

      {touched && error && (
        <p className="mt-1 text-[12px] text-red-500">{error}</p>
      )}
    </div>
  );
}

/* ================= SELECT FIELD ================= */
export function SelectField({
  label,
  required,
  labelClassName = "",
  selectClassName = "",
  children,
  error,
  touched,
  ...selectProps
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className={`registration-label ${labelClassName}`}>
          {label}
          {required && <span className="registration-label-required">*</span>}
        </label>
      )}

      <select
        {...selectProps}
        onBlur={selectProps.onBlur}
        className={`
          registration-select
          ${touched && error ? "border-red-500" : ""}
          ${selectClassName}
        `}
      >
        {children}
      </select>

      {touched && error && (
        <p className="mt-1 text-[12px] text-red-500">{error}</p>
      )}
    </div>
  );
}

/* ================= RADIO GROUP ================= */
export function RadioGroup({
  name,
  label,
  required,
  options,
  value,
  onChange,
  onBlur,
  error,
  touched,
}) {
  return (
    <div className="mb-4">
      {label && (
        <p className="registration-label">
          {label}
          {required && <span className="registration-label-required">*</span>}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-[10px] text-sm">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="inline-flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
              onBlur={onBlur}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>

      {touched && error && (
        <p className="mt-1 text-[12px] text-red-500">{error}</p>
      )}
    </div>
  );
}

/* ================= CHECKBOX FIELD ================= */
export function CheckboxField({
  label,
  name,
  checked,
  onChange,
  onBlur,
  error,
  touched,
  labelClassName = "",
  checkboxClassName = "",
  ...checkboxProps
}) {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-[10px]">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          onBlur={onBlur}
          className={`
            w-[16px] h-[16px] border rounded cursor-pointer
            ${touched && error ? "border-red-500" : "border-gray-300"}
            ${checkboxClassName}
          `}
          {...checkboxProps}
        />

        {label && (
          <label
            htmlFor={name}
            className={`registration-label cursor-pointer ${labelClassName}`}
          >
            {label}
          </label>
        )}
      </div>

      {touched && error && (
        <p className="mt-1 text-[12px] text-red-500">{error}</p>
      )}
    </div>
  );
}


