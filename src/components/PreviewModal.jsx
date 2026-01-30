import React from "react";

export default function PreviewModal({
    isOpen,
    onClose,
    onConfirm,
    isUpdateMode,
    title = "Preview",
    image,
    actionButton,
    isDescriptionAvailable = true,
    data = [],
}) {
    if (!isOpen) return null;

    // Extract description from data array
    const descriptionItem = data.find((item) => item.label === "Description");
    const descriptionText = descriptionItem?.value || "No description available.";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-xl mx-4 animate-fade-in-up flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-stroke-100">
                    <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close modal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
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

                {/* Scrollable Content */}
                <div className="overflow-y-auto p-4 md:p-6 space-y-6">
                    <div className="flex flex-col md:flex-row gap-4">

                        {/* Image Column */}
                        <div className="w-full md:w-1/4 flex-shrink-0">
                            <div className="w-[200px] h-[200px] rounded-md overflow-hidden bg-gray-100 border border-stroke-200 flex items-center justify-center">
                                {image ? (
                                    <img
                                        src={image}
                                        alt="Preview Image"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-gray-400 flex flex-col items-center gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="48"
                                            height="48"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                                            <polyline points="21 15 16 10 5 21"></polyline>
                                        </svg>
                                        <span className="text-sm">No Image</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Key-Value Details Column */}
                        <div className="w-full md:w-2/3 space-y-3">
                            {data.length > 0 ? (
                                data.map((item, index) => (
                                    <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-1">
                                        <span className="font-semibold text-gray-900 min-w-[140px] text-sm md:text-base">
                                            {item.label} :
                                        </span>
                                        <span className="text-gray-700 text-sm md:text-base flex-1">
                                            {item.value}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 italic">Nothing to show</p>
                            )}
                        </div>
                    </div>

                    {isDescriptionAvailable && <><hr className="border-stroke-100" />

                        {/* Description Section */}
                        <div className="space-y-2">
                            <label className="block font-semibold text-gray-900 text-sm md:text-base">
                                Description :
                            </label>

                            {/* Read-only description text */}
                            <div className="p-3 rounded-md border border-stroke-300 bg-gray-50 text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-line">
                                {descriptionText}
                            </div>
                        </div></>}
                </div>

                {/* Footer */}
                {actionButton && <div className="p-4 md:p-6 border-t border-stroke-100 flex flex-col sm:flex-row justify-end gap-3 bg-gray-50 rounded-b-lg">
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto px-6 py-2 rounded-md border border-danger-600 text-danger-600 font-medium hover:bg-danger-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(descriptionText)}
                        className="w-full sm:w-auto px-6 py-2 rounded-md bg-success text-white font-medium hover:bg-[#2e7d10] transition-colors shadow-sm"
                    >
                       {isUpdateMode ? "Update Production List" : "Add to Production List"}
                    </button>
                </div>}

            </div>
        </div>
    );
}
