import React from 'react'
import { Button } from '../../../components/Buttons'

const EmpoweringCommunitiesSection = () => {
    return (
        <div className='flex mt-16 px-12'>
            {/* left container */}
            <div className='mt-32'>
                <div className="relative w-full h-[600px] pointer-events-none top-16">
                    {/* main glow */}
                    <div className="absolute inset-0 rounded-full blur-3xl opacity-10 z-10
                                bg-[radial-gradient(circle,_#C4FF0D_0%,_#B0E600_45%,_rgba(176,230,0,0.6)_65%,_rgba(0,0,0,0)_100%)]" />

                    {/* protrusion 1 */}
                    <div className="absolute -top-6 left-0 w-[420px] h-[150px]
                                rounded-full blur-3xl opacity-70 rotate-6 z-10
                                bg-[radial-gradient(circle,_#C4FF0D_0%,_#B0E600_50%,_rgba(0,0,0,0)_75%)]" />

                    {/* stacked image cards centered over the glow */}
                    <div className='relative z-20 pointer-events-auto flex flex-col justify-center items-center h-[700px] w-full px-16'>
                        <div className='w-full h-full mb-6 rounded-[24px] overflow-hidden border-[8px] border-white shadow-2xl'>
                            <img
                                src="/src/assets/farmer1.jpg"
                                alt="card bottom"
                                className="w-full h-full object-cover block"
                            />
                        </div>
                        <div className='w-full h-full mb-6 rounded-[24px] overflow-hidden border-[8px] border-white shadow-2xl'>
                            <img
                                src="/src/assets/farmer2.jpg"
                                alt="card bottom"
                                className="w-full h-full object-cover block"
                            />
                        </div>
                    </div>

                </div>
            </div>


            {/* right container */}
            <div className='w-1/2 flex justify-start mt-16 relative'>
                <div className="absolute-z-10">
                    {/* <div className="absolute top-20 left-10 w-72 h-72 bg-primary-900 rounded-full blur-3xl" /> */}
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C4FF0D1A] rounded-full blur-2xl" />
                </div>
                <div className='flex flex-col'>
                    <div className='flex'>
                        <div className='w-[40px] h-[40px] rounded-[50%] bg-primary-400 flex items-center justify-center mt-2 shadow-lg'>
                            <img
                                src="/src/assets/Stars.svg"
                                alt="card bottom"
                                className="w-[20px] h-[20px]"
                            />
                        </div>
                        <div className='w-[150px] h-[40px] bg-primary-100 rounded-2xl flex items-center justify-center ml-4 mt-2 shadow-lg'>
                            <span className='text-primary-900 font-medium text-sm'>About FPO Shakti</span>
                        </div>
                    </div>
                    <div className='font-medium text-[56px] text-[#2D4A2B] tracking-[0%] leading-[72px] mt-8'>
                        <span className='block'>Empowering</span>
                        <span className='block'>Agricultural</span>
                        <span className='block'>Communities</span>
                    </div>
                    <div>
                        <span className='block text-lg text-[#3E5E3A] leading-[28px] mt-6' style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                            FPO Shakti is a transformative initiative by the Government of India aimed at strengthening Farmer Producer Organizations (FPOs) through institutional support, capacity building, market access, and financial assistance. Our mission is to create sustainable livelihoods for farmers by fostering collective action and enterprise development.                            </span>
                    </div>

                    <div className='flex flex-col mt-8'>
                        <div className='flex justify-between'>
                            <span className='font-medium text-xs leading-[20px] tracking-[0.1px] text-dark'>FPO Formation & Strengthening</span>
                            <div className='flex items-center gap-2'>
                                <img
                                    src="/src/assets/UpArrowHomepage.svg"
                                    alt="card bottom"
                                    className="w-[20px] h-[20px]"
                                />
                                <span>85%</span>
                            </div>
                        </div>
                        <div>
                            <div className="mt-0 w-full h-3 rounded-full overflow-hidden" style={{ background: 'linear-gradient(90deg, #F3F4F6 0%, #E5E7EB 100%)' }}>
                                <div className="h-3 rounded-full" style={{ width: '85%', background: 'linear-gradient(90deg, #C4FF0D 0%, #B0E600 100%)' }} />
                            </div>
                        </div>

                        <div className='flex justify-between mt-8'>
                            <span className='font-medium text-xs leading-[20px] tracking-[0.1px] text-dark'>Market Linkages & E-Commerce</span>
                            <div className='flex items-center gap-2'>
                                <img
                                    src="/src/assets/UpArrowHomepage.svg"
                                    alt="card bottom"
                                    className="w-[20px] h-[20px]"
                                />
                                <span>72%</span>
                            </div>
                        </div>
                        <div>
                            <div className="mt-0 w-full h-3 rounded-full overflow-hidden" style={{ background: 'linear-gradient(90deg, #F3F4F6 0%, #E5E7EB 100%)' }}>
                                <div className="h-3 rounded-full" style={{ width: '72%', background: 'linear-gradient(90deg, #C4FF0D 0%, #B0E600 100%)' }} />
                            </div>
                        </div>

                        <div className='flex justify-between mt-8'>
                            <span className='font-medium text-xs leading-[20px] tracking-[0.1px] text-dark'>Financial Assistance & Credit Linkage</span>
                            <div className='flex items-center gap-2'>
                                <img
                                    src="/src/assets/UpArrowHomepage.svg"
                                    alt="card bottom"
                                    className="w-[20px] h-[20px]"
                                />
                                <span>78%</span>
                            </div>
                        </div>
                        <div>
                            <div className="mt-0 w-full h-3 rounded-full overflow-hidden" style={{ background: 'linear-gradient(90deg, #F3F4F6 0%, #E5E7EB 100%)' }}>
                                <div className="h-3 rounded-full" style={{ width: '78%', background: 'linear-gradient(90deg, #C4FF0D 0%, #B0E600 100%)' }} />
                            </div>
                        </div>
                    </div>

                    <div className='mt-12'>
                        <Button buttonClassName="w-[254px] h-[56px] rounded-[16777200px] bg-grad-004 flex justify-center items-center gap-4">
                            Learn More About Us
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <path d="M5 12h14M13 5l7 7-7 7" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmpoweringCommunitiesSection