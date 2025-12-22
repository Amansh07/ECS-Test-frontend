// Reusable form fields used in both steps

export function TextField({
  label,
  required,
  labelClassName = "",
  inputClassName = "",
  ...inputProps
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className={`registration-label ${labelClassName}`}>
          {label}
          {required && (
            <span className="registration-label-required">*</span>
          )}
        </label>
      )}
      <input
        {...inputProps}
        className={`registration-input ${inputClassName}`}
      />
    </div>
  );
}

export function SelectField({
  label,
  required,
  labelClassName = "",
  selectClassName = "",
  children,
  ...selectProps
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className={`registration-label ${labelClassName}`}>
          {label}
          {required && (
            <span className="registration-label-required">*</span>
          )}
        </label>
      )}
      <select
        {...selectProps}
        className={`registration-select ${selectClassName}`}
      >
        {children}
      </select>
    </div>
  );
}
