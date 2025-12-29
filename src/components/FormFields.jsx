// Reusable form fields used in both steps

export function TextField({
  label,
  required,
  labelClassName = "",
  inputClassName = "",
  imageSrc,
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
       {/* Input wrapper */}
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
          className={`registration-input ${
            imageSrc ? "pl-10" : ""
          } ${inputClassName}`}
        />
      </div>
      {/* <input
        {...inputProps}
        className={`registration-input ${inputClassName}`}
      /> */}
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

export function RadioGroup({
  name,
  label,
  required,
  options,
  value,
  onChange,
}) {
  return (
    <div className="mb-4">
      {label && (
        <p className="registration-label">
          {label}
          {required && (
            <span className="registration-label-required">*</span>
          )}
        </p>
      )}

      <div className="flex flex-col gap-2 text-sm">
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
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
