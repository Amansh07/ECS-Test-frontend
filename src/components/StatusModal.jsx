import React from "react";

export default function StatusModal({ isOpen, onClose, status, message }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl lg:p-10 mx-4 animate-fade-in-up">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
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

                <div className="flex flex-col items-center text-center">
                    {/* Icon Circle */}
                    <div
                        className={`flex h-24 w-24 items-center justify-center rounded-full mb-6 ${status ? "bg-primary-700" : "bg-danger-600"
                            }`}
                    >
                        {status ? (
                            /* Success Check Icon */
                            <svg
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        ) : (
                            /* Error X Icon */
                            <svg
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        )}
                    </div>

                    {/* Message */}
                    <p className="mb-8 text-lg font-medium text-gray-800">{message}</p>

                    {/* Continue Button */}
                    <button
                        onClick={onClose}
                        className="w-[140px] rounded-md bg-[#253300] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#1a2400] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors ml-auto block"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
