import React from 'react'

const StatsCardSection = () => {
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
    return (
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
    )
}

export default StatsCardSection