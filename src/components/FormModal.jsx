import React from "react";
import { TextField, SelectField, RadioGroup } from "./FormFields";

export default function FormModal({
    isOpen,
    onClose,
    title = "Edit Details",
    fields = [],
    onSubmit,
}) {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) {
            onSubmit();
        }
    };

    const renderField = (field, index) => {
        const { type, name, label, required, value, options, placeholder, ...otherProps } = field;

        switch (type) {
            case "text":
            case "email":
            case "tel":
            case "number":
                return (
                    <TextField
                        key={index}
                        label={label}
                        required={required}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        type={type}
                        {...otherProps}
                    />
                );

            case "select":
                return (
                    <SelectField
                        key={index}
                        label={label}
                        required={required}
                        name={name}
                        value={value}
                        {...otherProps}
                    >
                        {options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </SelectField>
                );

            case "radio":
                return (
                    <RadioGroup
                        key={index}
                        name={name}
                        label={label}
                        required={required}
                        value={value}
                        options={options}
                        {...otherProps}
                    />
                );

            case "checkbox":
                return (
                    <div key={index} className="mb-4">
                        {label && (
                            <p className="registration-label">
                                {label}
                                {required && <span className="registration-label-required">*</span>}
                            </p>
                        )}
                        <div className="flex flex-col gap-2">
                            {options?.map((option) => (
                                <label
                                    key={option.value}
                                    className="inline-flex items-center gap-2 cursor-pointer"
                                >
                                    <input
                                        type="checkbox"
                                        name={name}
                                        value={option.value}
                                        checked={option.checked}
                                        {...otherProps}
                                    />
                                    <span className="text-sm">{option.label}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-xl mx-4 animate-fade-in-up flex flex-col max-h-[90vh]">
                {/* Header - Fixed */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        aria-label="Close modal"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Form Content - Scrollable */}
                <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6">
                        {fields.map((field, index) => renderField(field, index))}
                    </div>

                    {/* Actions - Fixed at bottom */}
                    <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 rounded-md border border-danger-600 text-danger-600 font-medium hover:bg-danger-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-md bg-[#3C9718] text-white font-medium hover:bg-[#2d7112] transition-colors shadow-sm"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
