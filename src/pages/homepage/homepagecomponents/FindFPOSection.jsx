import React from 'react'
import { Button } from '../../../components/Buttons';

const FindFPOSection = () => {
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
    return (
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
                            <Button
                                buttonClassName="px-10 py-4 rounded-full text-white text-lg font-semibold
                                    bg-gradient-to-b from-[#0E3B26] to-[#072516]
                                    shadow-lg hover:scale-[1.02] transition"
                            >
                                Search
                            </Button>
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
                                    <Button
                                        buttonClassName="w-full bg-[linear-gradient(90deg,#011B19_0%,#134C29_100%)] text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
                                    >
                                        View Profile
                                        <span>↗</span>
                                    </Button>
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
                        <Button
                            buttonClassName="
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
                        </Button>
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
                        <Button
                            buttonClassName="
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
                        </Button>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default FindFPOSection