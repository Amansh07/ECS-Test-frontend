import React from 'react';
import { TailChase } from 'ldrs/react'
import 'ldrs/react/TailChase.css'


const Loader = ({ text = "Getting things ready." }) => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-md bg-black/20 transition-all duration-300">
            <div className="flex flex-col items-center justify-center gap-4 animate-fade-in">
                <TailChase
                    size="60"
                    speed="1.75"
                    color="#D6FF66"
                />
                {text && (
                    <span className="text-white text-lg font-medium tracking-wide drop-shadow-md">
                        {text}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Loader;
