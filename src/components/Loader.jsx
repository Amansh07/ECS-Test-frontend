import React from 'react';

const Loader = ({ text = "Getting things ready." }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-start p-10 backdrop-blur-sm bg-black/5">
            <div className="flex items-center gap-5 bg-[#152000] px-8 py-5 rounded-full shadow-2xl relative overflow-hidden min-w-[320px] animate-fade-in-up">
                {/* Spinner */}
                <div className="relative w-14 h-14 shrink-0 animate-spin">
                    <div
                        className="w-full h-full rounded-full"
                        style={{
                            background: 'conic-gradient(from 180deg at 50% 50%, #3C9718 0deg, #D6FF66 63.24deg, rgba(255, 255, 255, 0) 360deg)',
                            maskImage: 'radial-gradient(closest-side, transparent 75%, black 76%)',
                            WebkitMaskImage: 'radial-gradient(closest-side, transparent 75%, black 76%)'
                        }}
                    />
                </div>

                {/* Text */}
                <span className="text-white text-xl font-semibold tracking-wide">{text}</span>
            </div>
        </div>
    );
};

export default Loader;
