import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Buttons';
const AgenciesSection = () => {
    const implementingAgencies = [
        {
            id: 1,
            title: "NABARD",
            description: "National Bank for Agriculture and Rural Development",
            fpoCount: 3245,
            fpoShare: 26,
            icon: "🏢",
        },
        {
            id: 2,
            title: "NABARD",
            description: "National Bank for Agriculture and Rural Development",
            fpoCount: 3245,
            fpoShare: 26,
            icon: "🏢",
        },
        {
            id: 3,
            title: "NABARD",
            description: "National Bank for Agriculture and Rural Development",
            fpoCount: 3245,
            fpoShare: 26,
            icon: "🏢",
        },
    ];
    const navigate = useNavigate();
    const handleRoute = () => {
        navigate("/registration");
    };
    return (
        <section className='mt-32 px-12 bg-grad-010-bg'>
            <div className='flex items-center gap-4'>
                {/* <div className='h-2 w-[80px] bg-grad-011-text rounded-2xl'></div> */}
                <span className='text-sm font-medium leading-[20px] tracking-[0.1px] text-warning-500'>DISTRIBUTION</span>
            </div>
            <div className='flex flex-col items-start py-6'>
                <div className='text-[72px] font-medium text-left text-primary-900 leading-[100px]'>Implementing Agencies</div>
            </div>
            <div className='flex flex-col items-start'>
                <div className='text-[20px] font-semibold text-left text-primary-800 leading-[24px]'>Supporting farmer collectives through diverse implementation models</div>
            </div>

            {/* 3 cards section */}
            <div className="grid grid-cols-3 gap-12 py-12 bg-[radial-gradient(ellipse_80%_40%_at_50%_50%,rgba(232,252,255,0.4)_0%,rgba(207,240,250,0.25)_25%,rgba(176,224,240,0.15)_50%,transparent_100%)]">
                {implementingAgencies.map((agency) => (
                    <div
                        key={agency.id}
                        className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full min-h-[380px]"
                    >
                        {/* Icon Badge */}
                        <div className="mb-6">
                            <div className="w-full h-20 bg-grad-001-bg rounded-2xl flex items-center justify-center shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.45)]">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 7V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V7M3 7H21M3 7L7 3H17L21 7M10 10V16M14 10V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-[40px] font-semibold text-gray-900 mb-2 uppercase leading-[48px]">
                            {agency.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-600 text-base font-semibold leading-[20px] my-8">
                            {agency.description}
                        </p>

                        {/* Content Spacer */}
                        <div className="flex-1"></div>

                        {/* FPO Count */}
                        <div className="mb-6">
                            <div className="flex items-baseline gap-2">
                                <span className="text-[72px] font-bold font-sans font-[900] bg-gradient-to-r from-[#11998E] to-[#38EF7D] bg-clip-text text-transparent">
                                    {(agency.fpoCount / 1000).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 3 })
                                        .replace(/\.(\d{1,3})$/, ',$1')
                                        .replace(/^(\d+),(\d{3})$/, '$1,$2')}
                                </span>
                                <span className="text-[#2C363999] font-medium text-[22px]">FPOs</span>
                            </div>
                        </div>

                        {/* FPO Share */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-[#2C363999]">FPO Share</span>
                                <span className="text-xl font-bold text-gray-900">{agency.fpoShare}%</span>
                            </div>
                            <div className="w-full h-2.5 bg-primary-50 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 rounded-full transition-all duration-300"
                                    style={{ width: `${agency.fpoShare}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Ready to transform? */}
            <div className="bg-grad-009-bg rounded-[40px] py-20 px-16 my-16 flex items-center justify-between relative">
                {/* Decorative elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

                {/* Left content */}
                <div className="flex-1 relative z-10">
                    {/* JOIN US badge */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F4A261] to-[#E76F51] flex items-center justify-center">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-white/80 font-medium tracking-widest text-sm uppercase">Join Us</span>
                    </div>

                    {/* Main heading */}
                    <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight font-sans">
                        Ready to<br />Transform<br />Agriculture?
                    </h2>

                    {/* Description */}
                    <p className="text-white/90 text-xl md:text-2xl leading-relaxed max-w-2xl font-medium" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                        Register your FPO and unlock sustainable growth opportunities across India
                    </p>
                </div>

                {/* Right CTA Button */}
                <div className="flex-shrink-0 relative z-10 ml-12">
                    <Button onClick={handleRoute} buttonClassName="px-12 py-6 rounded-[24px] font-bold text-xl text-gray-900 flex items-center gap-3 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #F4A261 0%, #F8D5a3 100%)' }}>
                        Register Now
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                    </Button>
                </div>
            </div>
            <div className='mt-16'>
                <div className='h-10 w-full rounded-full'></div>
            </div>
        </section>
    )
}

export default AgenciesSection