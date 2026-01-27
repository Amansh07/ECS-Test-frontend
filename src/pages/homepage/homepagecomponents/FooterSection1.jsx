import React from 'react'

const FooterSection1 = () => {
    return (
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
    )
}

export default FooterSection1