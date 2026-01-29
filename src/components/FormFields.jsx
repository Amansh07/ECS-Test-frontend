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


import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export function TextField({
  label,
  required,
  labelClassName = "",
  inputClassName = "",
  imageSrc,
  error,
  touched,
  type,
  ...inputProps
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

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
          type={isPassword && showPassword ? "text" : type} 
          onBlur={inputProps.onBlur}
          className={`
            registration-input
            ${imageSrc ? "pl-10" : ""}
            ${isPassword ? "pr-10" : ""}   /* space for icon */
            ${touched && error ? "border-red-500" : ""}
            ${inputClassName}
          `}
        />

        {/* Show/Hide Icon */}
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            tabIndex={-1}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={18} />
            ) : (
              <AiOutlineEye size={18} />
            )}
          </button>
        )}
      </div>

      {touched && error && (
        <p className="mt-1 text-[12px] text-red-500">{error}</p>
      )}
    </div>
  );
}


/* ================= TEXT AREA ================= */
export function TextArea({
  label,
  required,
  labelClassName = "",
  textareaClassName = "",
  error,
  touched,
  rows = 4,
  ...textareaProps
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className={`registration-label ${labelClassName}`}>
          {label}
          {required && <span className="registration-label-required">*</span>}
        </label>
      )}

      <textarea
        {...textareaProps}
        rows={rows}
        className={`
          registration-input
          resize-none
          ${touched && error ? "border-red-500" : ""}
          ${textareaClassName}
        `}
      />

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
  disabled,
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
              disabled={disabled}
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


