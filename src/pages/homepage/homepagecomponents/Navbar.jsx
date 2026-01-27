import React from 'react'

const Navbar = () => {
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
    return (
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
    )
}

export default Navbar