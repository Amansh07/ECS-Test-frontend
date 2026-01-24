import React from 'react'
import StateGovtBadge from '../../components/StateGovtBadge'
import { Button } from '../../components/Buttons'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
    const navItems = [
        'Home',
        'About Us',
        'Schemes',
        'E-Market',
        'Buyers',
        'Input Suppliers',
        'Resource Centre',
        'Agritech',
        'Gallery',
        "FAQ's",
        'Contact Us'
    ];
    const chips = [
        'Market Access',
        'Fair Prices',
        'Tech Support',
        'Training',
        'Credit Facilities',
    ];

    const CardsData = [
        { title: 'Registered FPOs', value: '12,450', backgroundClass: 'bg-grad-card-1', icon: "/src/assets/building.svg" },
        { title: 'Farmers', value: '2.8M+', backgroundClass: 'bg-grad-card-2', icon: '/src/assets/farmer.svg' },
        { title: 'Pending Fresh Registration', value: '856', backgroundClass: 'bg-grad-card-3', icon: '/src/assets/factory.svg' },
        { title: 'Warehouse/ColdStorage', value: '4,890+', backgroundClass: 'bg-grad-card-4', icon: '/src/assets/handshake.svg' },
        { title: 'Machinery/Equipment', value: '12,450', backgroundClass: 'bg-grad-card-5', icon: '/src/assets/tractor.svg' },
        { title: 'Buyers', value: '2.8M+', backgroundClass: 'bg-grad-card-6', icon: '/src/assets/money.svg' },
        { title: 'Input Suppliers', value: '856', backgroundClass: 'bg-grad-card-7', icon: '/src/assets/brick.svg' },
        { title: 'Startups', value: '4,890', backgroundClass: 'bg-grad-card-8', icon: '/src/assets/dress.svg' },
    ]

    const fpoTiles = [
        {
            id: 1,
            label: "All FPOs",
            count: "12.4K",
            icon: "🌾",
            variant: "primary",
        },
        {
            id: 2,
            label: "Dairy",
            count: "3.2K",
            icon: "🥛",
        },
        {
            id: 3,
            label: "Organic",
            count: "4.1K",
            icon: "🌿",
        },
        {
            id: 4,
            label: "Grains",
            count: "2.9K",
            icon: "🌽",
        },
        {
            id: 5,
            label: "Spices",
            count: "1.4K",
            icon: "🌶️",
        },
    ];

    const featuredFPOs = [
        {
            id: 1,
            category: "Organic Farming",
            name: "Sahyadri Farmers",
            location: {
                city: "Nashik",
                state: "Maharashtra",
            },
            stats: {
                members: 8500,
                femaleFarmers: 2221,
                licenses: 34,
            },
            image: "src/assets/sahyadri-farmers.jpg",
            cta: "View Profile",
        },
        {
            id: 2,
            category: "Organic Farming",
            name: "Sahyadri Farmers",
            location: {
                city: "Nashik",
                state: "Maharashtra",
            },
            stats: {
                members: 8500,
                femaleFarmers: 2221,
                licenses: 34,
            },
            image: "src/assets/sahyadri-farmers.jpg",
            cta: "View Profile",
        },
        {
            id: 3,
            category: "Organic Farming",
            name: "Sahyadri Farmers",
            location: {
                city: "Nashik",
                state: "Maharashtra",
            },
            stats: {
                members: 8500,
                femaleFarmers: 2221,
                licenses: 34,
            },
            image: "src/assets/sahyadri-farmers.jpg",
            cta: "View Profile",
        },
        // {
        //     id: 4,
        //     category: "Organic Farming",
        //     name: "Sahyadri Farmers",
        //     location: {
        //         city: "Nashik",
        //         state: "Maharashtra",
        //     },
        //     stats: {
        //         members: 8500,
        //         femaleFarmers: 2221,
        //         licenses: 34,
        //     },
        //     image: "src/assets/sahyadri-farmers.jpg",
        //     cta: "View Profile",
        // },
    ];

    const services = [
        {
            id: 1,
            title: "FPO Registration & Formation",
            description:
                "End-to-end support for legal registration, incorporation, and institutional framework setup for new and existing Farmer Producer Organizations.",
            image: "/src/assets/farmer1.jpg",
            icon: "⚡",
        },
        {
            id: 2,
            title: "Market Access & E-Commerce",
            description:
                "Digital marketplace connecting FPOs with buyers, enabling direct sales, price discovery, and access to national and international agricultural markets.",
            image: "",
            icon: "📈",
            stats: [
                { label: "Wholesale Buyers", value: 45 },
                { label: "Retail Partners", value: 30 },
                { label: "Export Channels", value: 25 },
            ],
        },
        {
            id: 3,
            title: "Training & Capacity Building",
            description:
                "End-to-end support for legal registration, incorporation, and institutional framework setup for new and existing Farmer Producer Organizations.",
            image: "/src/assets/farmer1.jpg",
            icon: "📊",
        },
    ];

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
        <div className="w-full">
            <nav className="d-flex justify-evenly items-center h-[54px] w-full border border-[rgba(240,240,240,1)] py-[0px] px-[32px] flex gap-[16px] bg-white overflow-x-auto">
                {navItems.map((item, index) => (
                    <div
                        key={index}
                        className="whitespace-nowrap cursor-pointer text-sm font-medium text-[rgb(23,102,0)] hover:text-green-600"
                    >
                        {item}
                    </div>
                ))}
            </nav>
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
                                    src="/src/assets/ThreeButtonsHomepage.svg"
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
                                <button className="flex items-center gap-3 bg-grad-009-bg hover:bg-primary-800 text-white px-6 py-3 rounded-[14px] shadow-2xl" onClick={handleRoute}>
                                    <span className="font-semibold">Register Your FPO</span>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                        <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>

                                <button className="flex items-center gap-3 bg-white px-6 py-3 rounded-[14px] shadow-md border border-[#F4A261]">
                                    <span className="bg-grad-011-text bg-clip-text text-transparent font-semibold">View Dashboard</span>
                                </button>
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
                                src="/src/assets/Farmers-collaboration.png"
                                alt="State Govt"
                                className="block w-full h-full object-cover"
                            />
                            {/* gradient overlay applied above the image */}
                            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(0deg, rgba(26, 77, 46, 0.8) 0%, rgba(26, 77, 46, 0.2) 50%, rgba(0, 0, 0, 0) 100%)' }} />

                            {/* Success Story card placed inside image container so it never overflows */}
                            <div className="absolute left-6 right-6 md:left-8 md:right-8 bottom-6 md:bottom-8 z-40 rounded-[18px] p-6 bg-white shadow-2xl border-4 border-white max-w-none mx-auto" role="region" aria-label="Success story">
                                <div className="relative flex items-start gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="text-[14px] text-primary-800 font-medium">Success Story</div>
                                        <h3 className="mt-3 text-[18px] md:text-[22px] font-extrabold text-primary-900 leading-tight">Maharashtra Collective</h3>
                                        <div className="mt-3 text-[13px] md:text-[14px] text-primary-800">1,245 farmers • ₹12.5Cr revenue</div>
                                    </div>

                                    {/* badge on the top-right */}
                                    <div className="flex-shrink-0 self-start">
                                        <div className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg border-2 border-white bg-grad-011-text">
                                            <img src="/src/assets/SuccessIcon.svg" alt="badge" className="w-7 h-7" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Top-right stat card overlay positioned relative to the parent so it can overflow the image */}
                        <div className="absolute top-0 right-0 translate-x-[-70%] translate-y-[70%] z-50 rounded-[18px] p-4 w-[140px] md:w-[180px] md:p-5 text-black shadow-2xl border-4 border-white bg-grad-011-text" aria-hidden>
                            <div className="flex items-start gap-2">
                                <img
                                    src="/src/assets/StarHomepage.svg"
                                    alt="State Govt"
                                    className='w-[33.3px] h-[33.3px]'
                                />
                            </div>

                            <div className="mt-1 text-[38px] md:text-[48px] font-extrabold leading-[1]">856</div>
                            <div className="text-sm md:text-base font-medium mt-1">Warehouses<br />Nationwide</div>
                        </div>

                        {/* Mid-Left image card overlay positioned relative to the parent so it can overflow the image */}
                        <div className="absolute -rotate-[6deg] translate-x-[-150%] translate-y-[-20%] z-50 rounded-[18px] w-[167.06px] md:w-[167.06px] h-[167.06px] md:h-[167.06px] text-black shadow-2xl border-4 border-white overflow-hidden" aria-hidden>
                            <img
                                src="/src/assets/farmingImage.jpg"
                                alt="farming"
                                className="w-full h-full object-cover block"
                            />
                            {/* gradient overlay on small tilted card */}
                            <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(0deg, rgba(26, 77, 46, 0.8) 0%, rgba(26, 77, 46, 0.2) 50%, rgba(0, 0, 0, 0) 100%)' }} />
                        </div>

                        {/* Bottom Success Story card positioned relative to the parent so it can overflow the image */}
                        <div className="absolute z-50 translate-y-[230%] translate-x-[-40%] rounded-[18px] px-[36px] bg-grad-012-bg shadow-2xl border-4 border-white" role="region" aria-label="Registrations this year">
                            <div className="relative flex items-center gap-6 px-[30px] py-[36px]">
                                <div className="flex-shrink-0">
                                    <div className="w-[56px] h-[56px] rounded-[14px] bg-[#E8B689] flex items-center justify-center">
                                        <img src="/src/assets/UpArrowHomePage.svg" alt="trend" className="w-6 h-6" />
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
                                    <img src="/src/assets/SuccessIconGreen.svg" alt="icon" className="w-12 h-12" />
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
                                    <img src="/src/assets/personIcon.svg" alt="icon" className="w-10 h-10" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white text-[28px] font-extrabold">2.5M+</span>
                                    <span className="text-white/80 text-sm whitespace-nowrap">CROPS</span>
                                </div>
                            </div>

                            {/* stat item 3 */}
                            <div className="flex-1 flex items-center gap-4 bg-primary-800/20 border border-primary-700 px-6 py-4 rounded-2xl min-h-[88px]">
                                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <img src="/src/assets/LocationIcon.svg" alt="icon" className="w-10 h-10" />
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

            {/*Empowering Agricultural Communities SECTION */}
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

            {/* 8 cards section */}
            <section className='mt-32 px-12'>
                <div className="w-full px-12 mt-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {CardsData.map((c, i) => (
                            <div key={i} className="relative bg-white rounded-2xl p-6 shadow-2xl border border-white">
                                <div className="absolute top-4 right-4 w-3 h-3 bg-lime-400 rounded-full" />

                                <div className="flex items-start gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-white shadow-md flex-shrink-0 ${c.backgroundClass}`}>
                                        <img src={c.icon} alt={c.title} className="w-8 h-8" />
                                    </div>
                                </div>

                                <div className="mt-6 text-[32px] font-extrabold text-primary-900">{c.value}</div>
                                <div className="text-sm text-primary-800 mt-2">{c.title}</div>

                                <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className={`${c.backgroundClass} h-2 rounded-full`} style={{ width: '72%' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Find Your FPO Match */}
            <section className='mt-32 px-12 bg-grad-007-bg'>
                <div className='flex flex-col items-start px-12'>
                    <div className='flex items-center gap-4'>
                        <div className='h-2 w-[80px] bg-grad-011-text rounded-2xl'></div>
                        <span className='text-sm font-medium leading-[20px] tracking-[0.1px] text-primary-800'>DISCOVER</span>
                    </div>
                    <div className='text-[80px] font-[900] text-center text-primary-800 leading-[100px] font-sans'>
                        Find Your FPO Match
                    </div>
                    <div className='font-semibold text-2xl text-left text-black mt-6 w-1/2' style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                        Connect with <span className='text-warning-400'>12,450+ farmer organisations</span> transforming agriculture across India
                    </div>
                    <div className="w-full flex justify-center mt-16 py-16">
                        <div
                            className="w-[90%] max-w-[1200px] rounded-full bg-white p-4 shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
                        >
                            <div className="flex items-center gap-4 bg-[#FFF9F1] rounded-full px-6 py-4">

                                <svg
                                    className="w-6 h-6 text-gray-400 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search FPO name, commodity, location..."
                                    className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-lg"
                                />
                                <button
                                    className="px-10 py-4 rounded-full text-white text-lg font-semibold
                                    bg-gradient-to-b from-[#0E3B26] to-[#072516]
                                    shadow-lg hover:scale-[1.02] transition"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex justify-center my-10">
                        <div className="grid grid-cols-4 gap-6 place-items-center">
                            {fpoTiles.map((tile) => {
                                const isPrimary = tile.variant === "primary";

                                return (
                                    <div
                                        key={tile.id}
                                        className={`
                                    flex items-center gap-4 px-6 py-4 rounded-2xl
                                    min-w-[220px] h-[72px]
                                    shadow-[0_20px_40px_rgba(0,0,0,0.25)]
                                    ${isPrimary
                                                ? "text-white bg-[linear-gradient(90deg,#011B19_0%,#134C29_100%)]"
                                                : "bg-white"
                                            }
                                    ${tile.id === 5 ? "col-span-4 justify-self-center" : ""}
                                `}
                                    >
                                        {/* Icon */}
                                        <span className="text-2xl">{tile.icon}</span>

                                        {/* Label */}
                                        <span
                                            className={`text-lg font-medium ${isPrimary ? "text-white" : "text-[#1F3D1B]"
                                                }`}
                                        >
                                            {tile.label}
                                        </span>

                                        {/* Count pill */}
                                        <span
                                            className={`
                                    ml-auto px-4 py-1 rounded-full text-sm font-semibold
                                    ${isPrimary
                                                    ? "bg-white/20 text-white"
                                                    : "bg-primary-100 text-primary-900"
                                                }
                                    `}
                                        >
                                            {tile.count}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
                {/* Featured Oranization */}
                <div className='flex flex-col items-start mt-32 px-12 mb-32'>
                    <div className='flex items-center gap-4'>
                        {/* <div className='h-2 w-[80px] bg-grad-011-text rounded-2xl'></div> */}
                        <span className='text-sm font-medium leading-[20px] tracking-[0.1px] text-warning-500'>TOP PERFORMERS</span>
                    </div>
                    <div className='flex justify-between item-center w-full mt-4'>
                        <div>
                            <span className='text-[80px] font-[900] text-center text-primary-900 leading-[100px]'>Featured Organizations</span>
                        </div>
                        <div>
                            <div className='flex items-center gap-2'>
                                <span className='text-[16px] font-[200] text-center text-primary-900 leading-[100px]'>View All</span>
                                <svg className="w-5 h-5 text-primary-900" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                    <path d="M5 19L19 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M5 5h14v14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-evenly w-full mt-10'>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {featuredFPOs.map((fpo) => (
                                <div
                                    key={fpo.id}
                                    className="bg-white rounded-[32px] shadow-[0_20px_40px_rgba(0,0,0,0.15)] overflow-hidden hover:shadow-[0_25px_50px_rgba(0,0,0,0.2)] transition-shadow duration-300"
                                >
                                    {/* Image section */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <img
                                            src={fpo.image}
                                            alt={fpo.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(0deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0) 100%)' }} />

                                        {/* Category badge */}
                                        <span className="absolute top-5 left-5 px-5 py-2 text-base font-medium rounded-full bg-[linear-gradient(180deg,#F6A35B_0%,#F3C57C_100%)] text-black">
                                            {fpo.category}
                                        </span>

                                        {/* Name & location overlay */}
                                        <div className="absolute bottom-5 left-5 text-white">
                                            <h3 className="text-2xl font-extrabold">{fpo.name}</h3>
                                            <div className="flex items-center gap-1.5 text-base opacity-90 mt-1">
                                                <span>📍</span>
                                                <span>
                                                    {fpo.location.city}, {fpo.location.state}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="px-8 pt-8">
                                        <div className="grid grid-cols-3 gap-3">
                                            {/* Members */}
                                            <div className="bg-[#FFF6E8] rounded-xl py-10 text-center flex flex-col items-center gap-2">
                                                <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center shadow-sm">
                                                    <img src="/src/assets/personIcon.svg" alt="members" className="w-6 h-6" />
                                                </div>
                                                <div className="text-xl font-bold text-primary-900">
                                                    {fpo.stats.members.toLocaleString()}
                                                </div>
                                                <div className="text-sm text-primary-700 mt-1">Members</div>
                                            </div>

                                            {/* Female farmers */}
                                            <div className="bg-[#FFF6E8] rounded-xl px-2 py-10 text-center flex flex-col items-center gap-2">
                                                <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center shadow-sm">
                                                    <img src="/src/assets/farmer.svg" alt="female farmers" className="w-6 h-6" />
                                                </div>
                                                <div className="text-xl font-bold text-primary-900">
                                                    {fpo.stats.femaleFarmers.toLocaleString()}
                                                </div>
                                                <div className="text-sm text-primary-700 mt-1">Female Farmers</div>
                                            </div>

                                            {/* Licenses */}
                                            <div className="bg-[#FFF6E8] rounded-xl py-10 text-center flex flex-col items-center gap-2">
                                                <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center shadow-sm">
                                                    <img src="/src/assets/shield.svg" alt="licenses" className="w-6 h-6" />
                                                </div>
                                                <div className="text-xl font-bold text-primary-900">
                                                    {fpo.stats.licenses}
                                                </div>
                                                <div className="text-sm text-primary-700 mt-1">Licenses</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <div className="px-8 pb-8 pt-6">
                                        <button className="w-full bg-[linear-gradient(90deg,#011B19_0%,#134C29_100%)] text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
                                            View Profile
                                            <span>↗</span>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Rankings and Regional Cards */}
                <div className='px-12 flex justify-between gap-6 mb-32'>
                    <div
                        className="
                            bg-grad-011-text
                            w-1/2
                            min-h-[500px]
                            rounded-[32px]
                            px-12
                            py-12
                            flex
                            flex-col
                            justify-between
                            text-white
                            overflow-hidden
                        "
                    >
                        {/* Top content */}
                        <div className="flex flex-col gap-8">
                            {/* Icon + label */}
                            <div className="flex flex-col gap-4">
                                <div className="w-16 h-16 flex items-center justify-center">
                                    <svg
                                        width="56"
                                        height="56"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <defs>
                                            <linearGradient id="gPin1" x1="0" x2="1" y1="0" y2="1">
                                                <stop offset="0%" stopColor="#F6D77A" />
                                                <stop offset="100%" stopColor="#E6B84A" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                                            fill="url(#gPin1)"
                                        />
                                        <circle cx="12" cy="9" r="2.5" fill="#FFFFFF" opacity="0.95" />
                                    </svg>
                                </div>

                                <span className="uppercase tracking-widest text-sm opacity-80">
                                    Rankings
                                </span>
                            </div>

                            {/* Title + subtitle */}
                            <div className="flex flex-col gap-4">
                                <h1 className="text-[52px] leading-[1.1] font-semibold">
                                    Top 100 FPOs
                                </h1>

                                <p className="text-lg opacity-90">
                                    Discover India's highest performing organizations
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <div>
                            <button
                                className="
                                inline-flex
                                items-center
                                gap-3
                                px-8
                                py-4
                                rounded-2xl
                                border
                                border-white/40
                                backdrop-blur-sm
                                text-lg
                                font-medium
                                hover:bg-white/10
                                transition
                            "
                            >
                                Explore Rankings
                                <span className="text-xl">↗</span>
                            </button>
                        </div>
                    </div>

                    <div
                        className="
                            bg-grad-008-bg
                            w-1/2
                            min-h-[500px]
                            rounded-[32px]
                            px-12
                            py-12
                            flex
                            flex-col
                            justify-between
                            text-white
                            overflow-hidden
                        "
                    >
                        {/* Top content */}
                        <div className="flex flex-col gap-8">
                            {/* Icon + label */}
                            <div className="flex flex-col items-start gap-4">
                                <div className="w-16 h-16 flex items-center justify-center" aria-hidden>
                                    <svg
                                        width="56"
                                        height="56"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <defs>
                                            <linearGradient id="gPin2" x1="0" x2="1" y1="0" y2="1">
                                                <stop offset="0%" stopColor="#F6D77A" />
                                                <stop offset="100%" stopColor="#E6B84A" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                                            fill="url(#gPin2)"
                                        />
                                        <circle cx="12" cy="9" r="2.5" fill="#FFFFFF" opacity="0.95" />
                                    </svg>
                                </div>

                                <span className="uppercase tracking-widest text-sm opacity-80">
                                    Regional
                                </span>
                            </div>

                            {/* Title + subtitle */}
                            <div className="flex flex-col gap-4">
                                <h1 className="text-[44px] leading-[1.1] font-semibold">
                                    Browse by District
                                </h1>

                                <p className="text-lg opacity-90">
                                    Explore FPOs across (State Name)
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="mt-6">
                            <button
                                className="
                                inline-flex
                                items-center
                                gap-3
                                px-8
                                py-4
                                rounded-2xl
                                border
                                border-white/40
                                backdrop-blur-sm
                                text-lg
                                font-medium
                                hover:bg-white/10
                                transition
                            "
                            >
                                View State Wise
                                <span className="text-xl">↗</span>
                            </button>
                        </div>
                    </div>

                </div>
            </section>

            {/* Allied Departments */}
            <section className="relative bg-grad-008-bg py-24 px-16 overflow-hidden">
                {/* Header */}
                <div className="flex flex-col mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative w-16 h-16 flex items-center justify-center">
                                {/* Gradient glow */}
                                <div className="absolute inset-0 rounded-full bg-grad-004 blur-lg opacity-70" />

                                {/* Main circle */}
                                <div
                                    className="
                                        relative z-10
                                        w-12 h-12
                                        rounded-full
                                        bg-grad-004
                                        flex items-center justify-center
                                        shadow-[0px_25px_50px_-12px_bg-grad-004]
                                        "
                                >
                                    {/* Icon */}
                                    <svg
                                        width="36"
                                        height="36"
                                        viewBox="0 0 25 23"
                                        fill="none"
                                        className="text-black"
                                    >
                                        <path
                                            d="M12 2L14.09 8.26L20.36 10.36L14.09 12.47L12 18.73L9.91 12.47L3.64 10.36L9.91 8.26L12 2Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </div>
                            </div>

                            <span className="bg-primary-800 text-primary-400 border border-primary-700 px-6 py-3 rounded-full text-sm font-medium shadow-lg shadow-stone-800">
                                Our Services
                            </span>
                        </div>
                    </div>
                    <div className='flex justify-between items-end'>
                        <h2 className="text-[72px] font-medium font-sans text-white leading-[100px]">
                            Allied Departments
                        </h2>
                        <button
                            className="
                                bg-white text-[#1A2E05]
                                px-10 py-4 rounded-full
                                font-semibold
                                flex items-center gap-3
                                transition-all duration-300
                                shadow-[0_0_40px_rgba(255,255,255,0.6)]
                                hover:shadow-[0_0_60px_rgba(255,255,255,0.8)]
                            "
                        >
                            View All Services
                            <span className="text-xl">→</span>
                        </button>

                    </div>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-3 gap-8">
                    {services.map((item, index) => {
                        const isFeatured = index === 1;

                        return (
                            <div
                                key={item.id}
                                className={`
                            relative rounded-3xl p-6 flex flex-col h-auto
                            ${isFeatured
                                        ? "bg-primary-500 text-black"
                                        : "bg-white text-[#1f2d16]"
                                    }
                        `}
                            >
                                {/* Icon */}
                                <div className="absolute -top-4 right-0 bg-grad-008-bg border-2 border-white text-lime-400 w-16 h-16 rounded-xl flex items-center justify-center text-lg shadow-lg shadow-lime-800">
                                    {item.icon}
                                </div>

                                {/* Content wrapper - grows to fill available space */}
                                <div className="flex-1">
                                    {/* Image - Conditional */}
                                    {item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="rounded-2xl mb-6 h-56 w-full object-cover"
                                        />
                                    )}

                                    {/* Title */}
                                    <h3 className={`font-sans font-semibold mb-3 ${item.image ? 'text-2xl leading-[32px]' : 'text-4xl leading-[48px]'}`}>
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className={`opacity-80 mb-6 font-normal ${item.image ? 'text-sm leading-relaxed' : 'text-base leading-relaxed'}`}>
                                        {item.description}
                                    </p>

                                    {/* Featured middle stats */}
                                    <hr className="border-2 border-[#2D4A2B33] mb-6" />
                                    {isFeatured && (
                                        <div className="mt-40 mb-6">
                                            {item.stats.map((stat, i) => (
                                                <div key={i} className="mb-4">
                                                    <div className="flex justify-between text-xs font-semibold mb-2">
                                                        <span>{stat.label}</span>
                                                        <span className={`px-3 py-1 rounded-full ${item.image ? '' : 'bg-black/10'}`}>{stat.value}%</span>
                                                    </div>
                                                    <div className={`h-2.5 rounded-full ${item.image ? 'bg-black/30' : 'bg-black/20'}`}>
                                                        <div
                                                            className="h-2.5 bg-black rounded-full"
                                                            style={{ width: `${stat.value}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* CTA - Always at bottom with consistent padding */}
                                <button className={`flex items-center gap-2 font-medium pt-6 ${item.image ? 'text-sm' : 'text-base'}`}>
                                    Learn More <span>→</span>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Implementing Agencies */}
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
                        <button onClick={handleRoute} className="px-12 py-6 rounded-[24px] font-bold text-xl text-gray-900 flex items-center gap-3 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                            style={{ background: 'linear-gradient(135deg, #F4A261 0%, #F8D5a3 100%)' }}>
                            Register Now
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                <path d="M5 12h14M13 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='mt-16'>
                    <div className='h-10 w-full rounded-full'></div>
                </div>
            </section>

            {/* Stay Connected with FPO Shakti */}
            <section className='bg-grad-008-bg py-16 px-12 md:px-16'>
                <div className='mx-auto'>
                    <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
                        {/* Left content */}
                        <div className='flex-1 text-white'>
                            <h2 className='text-[40px] md:text-[48px] font-bold leading-tight mb-4'>
                                Stay Connected with<br />FPO Shakti
                            </h2>
                            <p className='text-white/80 text-lg md:text-xl max-w-2xl'>
                                Get updates on latest schemes, training programs, and market opportunities
                            </p>
                        </div>

                        {/* Right form */}
                        <div className='flex-shrink-0 w-full md:w-auto'>
                            <div className='flex items-center gap-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 md:min-w-[500px]'>
                                <input
                                    type='email'
                                    placeholder='Enter your email address'
                                    className='flex-1 bg-transparent border-none outline-none text-white placeholder-white/60 text-base'
                                />
                                <button
                                    className="relative bg-grad-004 text-black font-semibold px-8 py-3 rounded-full flex items-center gap-2 whitespace-nowrap transition-all duration-300">
                                    {/* Gradient glow */}
                                    <span className="absolute inset-0 -z-10 rounded-full bg-grad-004 blur-xl opacity-70" aria-hidden />
                                    Subscribe
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Footer */}
            <footer className='bg-grad-002-bg text-white'>
                {/* Main footer content */}
                <div className='px-12 md:px-16 py-16'>
                    <div className='mx-auto'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12'>
                            {/* Left Section - Branding & Contact */}
                            <div className='lg:col-span-2'>
                                {/* Logo and Title */}
                                <div className='flex items-center gap-3 mb-4'>
                                    <div className='w-14 h-14 bg-grad-004 rounded-xl flex items-center justify-center'>
                                        <span className='text-2xl font-bold text-black'>FP</span>
                                    </div>
                                    <div>
                                        <h3 className='text-2xl font-bold text-white'>FPO Shakti</h3>
                                        <p className='text-sm text-lime-400'>Sangathan · Satat · Shakti</p>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className='text-white/70 text-base leading-relaxed mb-6 max-w-md'>
                                    A Government of India initiative empowering Farmer Producer Organizations through institutional support, capacity building, market linkages, and sustainable agricultural practices across the nation.
                                </p>

                                {/* Contact Information */}
                                <div className='flex flex-col gap-4'>
                                    {/* Phone */}
                                    <div className='flex items-center gap-3'>
                                        <div className='w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22 16.92V19.92C22 20.49 21.54 20.95 20.97 20.96C9.94 21.26 2.74 14.06 3.04 3.03C3.05 2.46 3.51 2 4.08 2H7.08C7.65 2 8.12 2.47 8.12 3.04C8.12 4.18 8.31 5.28 8.67 6.31C8.81 6.68 8.7 7.1 8.4 7.4L6.62 9.18C8.06 12.02 10.98 14.94 13.82 16.38L15.6 14.6C15.9 14.3 16.32 14.19 16.69 14.33C17.72 14.69 18.82 14.88 19.96 14.88C20.53 14.88 21 15.35 21 15.92Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span className='text-white/80'>1800-XXX-XXXX <span className='text-white/60'>(Toll Free)</span></span>
                                    </div>

                                    {/* Email */}
                                    <div className='flex items-center gap-3'>
                                        <div className='w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span className='text-white/80'>support@fposhakti.gov.in</span>
                                    </div>

                                    {/* Location */}
                                    <div className='flex items-center gap-3'>
                                        <div className='w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0'>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <span className='text-white/80'>Ministry of Agriculture, New Delhi, India</span>
                                    </div>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h4 className='text-lg font-semibold mb-6 relative'>
                                    Quick Links
                                    <span className='absolute -bottom-2 left-0 w-16 h-0.5 bg-lime-400'></span>
                                </h4>
                                <ul className='space-y-3'>
                                    <li><a href='#' className='text-white/70 hover:text-white transition-colors'>About Us</a></li>
                                    <li><a href='#' className='text-white/70 hover:text-white transition-colors'>Schemes</a></li>
                                    <li><a href='#' className='text-white/70 hover:text-white transition-colors'>E-Market</a></li>
                                    <li><a href='#' className='text-white/70 hover:text-white transition-colors'>Resource Centre</a></li>
                                    <li><a href='#' className='text-white/70 hover:text-white transition-colors'>Gallery</a></li>
                                </ul>
                            </div>

                            {/* Services */}
                            <div>
                                <h4 className='text-lg font-semibold mb-6 relative'>
                                    Services
                                    <span className='absolute -bottom-2 left-0 w-16 h-0.5 bg-lime-400'></span>
                                </h4>
                                <ul className='space-y-3'>
                                    <li><a href='#' className='text-white/70 hover:text-white transition-colors'>FPO Registration</a></li>
                                    <li><a href='#' className='text-white/70 hover:text-white transition-colors'>Market Access</a></li>
                                    <li><a href='#' className='text-white/70 hover:text-white transition-colors'>Training Programs</a></li>
                                    <li><a href='#' className='text-white/70 hover:text-white transition-colors'>Financial Support</a></li>
                                    <li><a href='#' className='text-white/70 hover:text-white transition-colors'>Agritech Solutions</a></li>
                                </ul>
                            </div>

                            {/* Support */}
                            <div>
                                <h4 className='text-lg font-semibold mb-6 relative'>
                                    Support
                                    <span className='absolute -bottom-2 left-0 w-16 h-0.5 bg-lime-400'></span>
                                </h4>
                                <ul className='space-y-3'>
                                    <li><a href='#' className='text-white/70 hover:text-white transition-colors'>Help Center</a></li>
                                    <li><a href='#' className='text-white/70 hover:text-white transition-colors'>FAQs</a></li>
                                    <li><a href='#' className='text-white/70 hover:text-white transition-colors'>Contact Us</a></li>
                                    <li><a href='#' className='text-white/70 hover:text-white transition-colors'>Feedback</a></li>
                                    <li><a href='#' className='text-white/70 hover:text-white transition-colors'>Privacy Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar - Copyright */}
                <div className='border-t border-white/10'>
                    <div className='px-12 md:px-16 py-6'>
                        <div className='mx-auto'>
                            <p className='text-white/60 text-sm text-center md:text-left'>
                                © 2025 FPO Shakti. Government of India Initiative. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default Homepage