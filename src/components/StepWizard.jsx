import React, { useState } from "react";

export default function StepWizard({ title, steps = [], onComplete, activeStep, setActiveStep, setNextButtonClicked, setBackButtonClicked, setSaveButtonClicked }) {

    const handleNext = () => {
        console.log("clicked next button");
        if (activeStep === 1) {
            setActiveStep(2);
        }
        if (activeStep === 4) {
            if (onComplete) onComplete();
        }
        setNextButtonClicked(Date.now());
    };

    const handleBack = () => {
        console.log("clicked back button");
        setBackButtonClicked(Date.now());
    };

    const currentStepItem = steps[activeStep - 1] || {};

    return (
        <div className="max-w-full mx-auto h-full flex flex-col">
            {/* Page Title */}
            {title && (
                <h1 className="text-xl text-center font-semibold mb-4 mt-8 md:mt-0 text-gray-800 shrink-0">
                    {title}
                </h1>
            )}

            {/* Stepper Indicators */}
            <div className="flex flex-col items-center justify-center mb-6 text-sm shrink-0">
                {/* Mobile View: Text Only */}
                <div
                    className="block md:hidden font-bold mb-2"
                    style={{ color: "rgb(var(--primary-700))" }}
                >
                    Step {activeStep} of {steps.length}
                </div>

                {/* Desktop View: Circles */}
                <div className="hidden md:flex items-center gap-8">
                    {steps.map((item, idx) => {
                        const stepNum = idx + 1;
                        const isCompleted = stepNum < activeStep;
                        const isActive = stepNum === activeStep;

                        return (
                            <div key={idx} className="flex items-center gap-2">
                                <div
                                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-semibold ${stepNum <= activeStep ? "bg-green-600" : "bg-gray-300"
                                        }`}
                                >
                                    {isCompleted ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={3}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    ) : (
                                        stepNum
                                    )}
                                </div>
                                <span
                                    className={
                                        stepNum <= activeStep
                                            ? "text-green-700 font-medium"
                                            : "text-gray-500"
                                    }
                                >
                                    {item.label}
                                </span>
                                {/* Separator Line (not after the last step) */}
                                {idx < steps.length - 1 && (
                                    <div
                                        className="w-10 h-px bg-gray-300 mx-1"
                                        aria-hidden="true"
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Content Area */}
            <section className="bg-white rounded shadow-sm border flex-1 flex flex-col min-h-0">
                {/* Step Title Header (only if label exists) */}
                <div className="px-6 py-3 shrink-0">
                    <h2 className="font-semibold text-gray-800">
                        {currentStepItem.label || ""}
                    </h2>
                </div>

                {/* Scrollable Content Body */}
                <div className="px-6 py-5 flex-1 flex flex-col overflow-y-auto">
                    <div className="flex-1">
                        {currentStepItem.component}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t mt-6 shrink-0">
                        {activeStep > 1 && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="px-5 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50"
                            >
                                Back
                            </button>
                        )}
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-6 py-2 rounded text-sm font-semibold bg-green-600 text-white hover:bg-green-700"
                            >
                                {activeStep === 4 ? "Submit" : "Next"}
                            </button>

                    </div>
                </div>
            </section>
        </div>
    );
}
