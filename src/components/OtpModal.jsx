import React, { useState, useRef, useEffect } from 'react';
import { Button } from './Buttons';
import OtpVector from '../assets/OtpVector.svg';

const OtpModal = ({
    isOpen,
    onClose,
    onVerify,
    onResend,
    title = "Enter OTP Code",
    length = 6
}) => {
    const [otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);

    // Focus first input when modal opens
    useEffect(() => {
        if (isOpen && inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, [isOpen]);

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;

        const newOtp = [...otp];
        // Allow only last entered character
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input if value is entered
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1);

        // Optional: Move focus to the first empty input if trying to click ahead
        if (index > 0 && !otp[index - 1]) {
            inputRefs.current[otp.indexOf("")].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerify = () => {
        onVerify(otp.join(""));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-xl shadow-xl w-[480px] p-8 relative flex flex-col items-center animate-scaleIn">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-grey-500 hover:text-grey-700"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {/* Icon */}
                <div className="mb-6">
                    <img src={OtpVector} alt="Security Shield" className="w-16 h-16" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-medium text-grey-900 mb-8">
                    {title}
                </h3>

                {/* OTP Inputs */}
                <div className="flex gap-3 mb-8">
                    {otp.map((value, index) => (
                        <input
                            key={index}
                            ref={(input) => (inputRefs.current[index] = input)}
                            type="text"
                            value={value}
                            onChange={(e) => handleChange(index, e)}
                            onClick={() => handleClick(index)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-12 h-12 border border-stroke-300 rounded-lg text-center text-xl font-medium focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                        />
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 w-full justify-center">
                    <Button
                        type="button"
                        onClick={onResend}
                        buttonClassName="px-3 py-2.5 border border-stroke-300 rounded-lg text-grey-700 bg-white hover:bg-grey-50 font-medium w-[140px]"
                    >
                        Resend Code
                    </Button>
                    <Button
                        type="button"
                        onClick={handleVerify}
                        buttonClassName="px-3 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-800 font-medium w-[140px]"
                    >
                        Verify OTP
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OtpModal;
