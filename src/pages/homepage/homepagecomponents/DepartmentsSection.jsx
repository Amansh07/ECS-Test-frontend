import React from 'react'
import { Button } from '../../../components/Buttons';

const DepartmentsSection = () => {
    const services = [
        {
            id: 1,
            title: "FPO Registration & Formation",
            description:
                "End-to-end support for legal registration, incorporation, and institutional framework setup for new and existing Farmer Producer Organizations.",
            image: "/assets/farmer1.jpg",
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
            image: "/assets/farmer1.jpg",
            icon: "📊",
        },
    ];
    return (
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
                    <Button
                        buttonClassName="
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
                    </Button>

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
                            <Button buttonClassName={`flex items-center gap-2 font-medium pt-6 ${item.image ? 'text-sm' : 'text-base'}`}>
                                Learn More <span>→</span>
                            </Button>
                        </div>
                    );
                })}
            </div>
        </section>
    )
}

export default DepartmentsSection