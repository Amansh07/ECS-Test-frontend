import React from 'react';

export const Toggle = ({ checked = false, onChange, label, disabled = false }) => {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={() => onChange(!checked)}
            className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out
        ${checked ? 'bg-[#253300]' : 'bg-gray-300'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
        >
            <span
                className={`
          inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out
          ${checked ? 'translate-x-6' : 'translate-x-0.5'}
        `}
            />
        </button>
    );
};

export default Toggle;
