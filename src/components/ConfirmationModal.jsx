import React from "react";

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl lg:p-8 mx-4 animate-fade-in-up">
                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>

                {/* Description */}
                <p className="text-gray-600 mb-8 leading-relaxed text-sm lg:text-base">
                    {description}
                </p>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-md border border-danger-600 text-danger-600 font-medium hover:bg-danger-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 rounded-md bg-[#253300] text-white font-medium hover:bg-[#1a2400] transition-colors shadow-sm"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
