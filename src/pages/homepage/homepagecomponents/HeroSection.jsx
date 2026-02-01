import React from 'react'
import StateGovtBadge from '../../../components/StateGovtBadge'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/Buttons';
import AuthService from '../../../auth/AuthService';

const HeroSection = () => {
    const chips = [
        'Market Access',
        'Fair Prices',
        'Tech Support',
        'Training',
        'Credit Facilities',
    ];
    const navigate = useNavigate();
    const handleRoute = () => {
        navigate("/registration");
    };
    const token = AuthService.getAccessToken();
    const isLoggedIn = !!token;
    return (
        <div className='bg-grad-005-bg pb-4'>
            <div className='flex'>
                <div className='w-full flex flex-col justify-center pl-10'>
                    <div className="pt-10 px-12 flex">
                        <StateGovtBadge />
                    </div>
                    <div className='px-12 w-full pt-10'>
                        <span className="
                                    font-inter
                                    font-black
                                    text-[131.1px]
                                    leading-[117.99px]
                                    tracking-[-6.55px]
                                    lg:flex
                                    lg:flex-col
                                    ">
                            <span className='text-primary-900 font-sans'>FPO</span>
                            <span className='text-primary-900 font-sans'>Shakti</span>
                        </span>
                    </div>
                    <div className='px-12 w-full'>
                        <div className='flex items-center gap-[10px]'>
                            <img
                                src="/assets/ThreeButtonsHomepage.svg"
                                alt="State Govt"
                                className="w-12 h-12"
                            />
                            <span className='bg-grad-011-text bg-clip-text text-transparent text-3xl font-bold tracking-[0.4px] leading-[36px] font-inter'>संगठन • सतत • शक्ति</span>
                        </div>
                    </div>
                    <div className='px-12 w-full lg:max-w-4xl mt-6 mb-12'>
                        <span className="block w-full text-[28px] leading-[32px] font-normal" style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                            <span className="text-black font-bold">State's</span>{' '}
                            digital ecosystem connecting {' '}
                            <span className="text-primary-800 font-semibold text-[32px] leading-[40px]">2.8 million farmers</span>
                            {' '}with sustainable markets and growth opportunities.
                        </span>

                        <div className="mt-8 flex flex-wrap gap-4">
                            {chips.map((label, idx) => (
                                <div
                                    key={idx}
                                    className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-md"
                                    style={{ minWidth: 140 }}
                                >
                                    <span className="w-6 h-6 rounded-full flex items-center justify-center border border-[#E9C46A] text-[#E76F51]">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                            <path d="M20 6L9 17l-5-5" stroke="#E76F51" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </span>
                                    <span className="text-[16px] font-medium text-[rgb(23,102,0)]">{label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            {!isLoggedIn && <Button buttonClassName="flex items-center gap-3 bg-grad-009-bg hover:bg-primary-800 text-white px-6 py-3 rounded-[14px] shadow-2xl" onClick={handleRoute}>
                                <span className="font-semibold">Register Your FPO</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                    <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Button>}

                            <Button buttonClassName="flex items-center gap-3 bg-white px-6 py-3 rounded-[14px] shadow-md border border-[#F4A261]">
                                <span className="bg-grad-011-text bg-clip-text text-transparent font-semibold">View Dashboard</span>
                            </Button>
                        </div>

                        {/* <div className="mt-6 w-full border-t border-[#E6F0D8]" /> */}

                        <div className="mt-10 flex items-end gap-12 border-t-2 border-[#8ABD007A]">
                            <div>
                                <div className="text-[56px] font-extrabold bg-grad-011-text bg-clip-text text-transparent">12.4K+</div>
                                <div className="text-sm font-semibold text-primary-900 mt-2">FPO</div>
                            </div>

                            <div>
                                <div className="text-[56px] font-extrabold bg-grad-011-text bg-clip-text text-transparent">25</div>
                                <div className="text-sm font-semibold text-primary-900 mt-2">DISTRICTS</div>
                            </div>

                            <div>
                                <div className="text-[56px] font-extrabold bg-grad-011-text bg-clip-text text-transparent">100</div>
                                <div className="text-sm font-semibold text-primary-900 mt-2">BLOCKS</div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* image section right side */}
                <div className='relative w-full flex items-center justify-center'>
                    <div className='relative rounded-[48px] overflow-hidden border-[8px] border-white max-w-[720px] w-3/5 h-2/3' style={{ boxShadow: '0px 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
                        <img
                            src="/assets/Farmers-collaboration.png"
                            alt="State Govt"
                            className="block w-full h-full object-cover"
                        />
                        {/* gradient overlay applied above the image */}
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(0deg, rgba(26, 77, 46, 0.8) 0%, rgba(26, 77, 46, 0.2) 50%, rgba(0, 0, 0, 0) 100%)' }} />

                        {/* Success Story card placed inside image container so it never overflows */}
                        <div className="absolute left-6 right-6 md:left-8 md:right-8 bottom-6 md:bottom-8 rounded-[18px] p-6 bg-white shadow-2xl border-4 border-white max-w-none mx-auto" role="region" aria-label="Success story">
                            <div className="relative flex items-start gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="text-[14px] text-primary-800 font-medium">Success Story</div>
                                    <h3 className="mt-3 text-[18px] md:text-[22px] font-extrabold text-primary-900 leading-tight">Maharashtra Collective</h3>
                                    <div className="mt-3 text-[13px] md:text-[14px] text-primary-800">1,245 farmers • ₹12.5Cr revenue</div>
                                </div>

                                {/* badge on the top-right */}
                                <div className="flex-shrink-0 self-start">
                                    <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg border-2 border-white bg-grad-011-text">
                                        <img src="/assets/SuccessIcon.svg" alt="badge" className="w-7 h-7" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Top-right stat card overlay positioned relative to the parent so it can overflow the image */}
                    <div className="absolute top-0 right-0 translate-x-[-70%] translate-y-[70%] rounded-[18px] p-4 w-[140px] md:w-[180px] md:p-5 text-black shadow-2xl border-4 border-white bg-grad-011-text" aria-hidden>
                        <div className="flex items-start gap-2">
                            <img
                                src="/assets/StarHomepage.svg"
                                alt="State Govt"
                                className='w-[33.3px] h-[33.3px]'
                            />
                        </div>

                        <div className="mt-1 text-[38px] md:text-[48px] font-extrabold leading-[1]">856</div>
                        <div className="text-sm md:text-base font-medium mt-1">Warehouses<br />Nationwide</div>
                    </div>

                    {/* Mid-Left image card overlay positioned relative to the parent so it can overflow the image */}
                    <div className="absolute -rotate-[6deg] translate-x-[-150%] translate-y-[-20%] rounded-[18px] w-[167.06px] md:w-[167.06px] h-[167.06px] md:h-[167.06px] text-black shadow-2xl border-4 border-white overflow-hidden" aria-hidden>
                        <img
                            src="/assets/farmingImage.jpg"
                            alt="farming"
                            className="w-full h-full object-cover block"
                        />
                        {/* gradient overlay on small tilted card */}
                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(0deg, rgba(26, 77, 46, 0.8) 0%, rgba(26, 77, 46, 0.2) 50%, rgba(0, 0, 0, 0) 100%)' }} />
                    </div>

                    {/* Bottom Success Story card positioned relative to the parent so it can overflow the image */}
                    <div className="absolute translate-y-[230%] translate-x-[-40%] rounded-[18px] px-[36px] bg-grad-012-bg shadow-2xl border-4 border-white" role="region" aria-label="Registrations this year">
                        <div className="relative flex items-center gap-6 px-[30px] py-[36px]">
                            <div className="flex-shrink-0">
                                <div className="w-[56px] h-[56px] rounded-[14px] bg-[#E8B689] flex items-center justify-center">
                                    <img src="/assets/UpArrowHomePage.svg" alt="trend" className="w-6 h-6" />
                                </div>
                            </div>

                            <div className="flex-1">
                                <div className="text-[18px] md:text-[28px] font-normal text-white leading-none">+156</div>
                                <div className="text-sm text-white/90 mt-1">Registrations This Year</div>

                                <div className="mt-4 w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                    <div className="h-2 rounded-full" style={{ width: '77%', background: 'linear-gradient(90deg, #F4A261 0%, #E76F51 100%)' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-12 flex justify-center w-full p-[52px]'>
                <div className="w-full h-2/3 rounded-[40px] p-[48px] bg-grad-009-bg flex justify-between items-center gap-[8px] opacity-100">
                    {/* stat item 1 */}
                    <div>
                        <div className="flex-1 flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl bg-grad-011-text flex items-center justify-center flex-shrink-0">
                                <img src="/assets/SuccessIconGreen.svg" alt="icon" className="w-12 h-12" />
                            </div>
                            <div>
                                <div className="text-white text-[12px] font-normal">ENDORSED BY</div>
                                <div className="text-white/80 text-[28px]">The State Government</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-stretch gap-6">
                        {/* stat item 2 */}
                        <div className="flex-1 flex items-center gap-4 bg-primary-800/20 border border-primary-700 px-6 py-4 rounded-2xl min-h-[88px]">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <img src="/assets/personIcon.svg" alt="icon" className="w-10 h-10" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white text-[28px] font-extrabold">2.5M+</span>
                                <span className="text-white/80 text-sm whitespace-nowrap">CROPS</span>
                            </div>
                        </div>

                        {/* stat item 3 */}
                        <div className="flex-1 flex items-center gap-4 bg-primary-800/20 border border-primary-700 px-6 py-4 rounded-2xl min-h-[88px]">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <img src="/assets/LocationIcon.svg" alt="icon" className="w-10 h-10" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white text-[28px] font-extrabold">650</span>
                                <span className="text-white/80 text-sm whitespace-nowrap">WAREHOUSES</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection