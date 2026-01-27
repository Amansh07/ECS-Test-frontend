import React from 'react'

const MainFooter = () => {
    return (
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
    )
}

export default MainFooter