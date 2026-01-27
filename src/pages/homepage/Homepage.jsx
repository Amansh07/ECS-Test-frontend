import React from 'react'
import StateGovtBadge from '../../components/StateGovtBadge'
import { Button } from '../../components/Buttons'
import { useNavigate } from 'react-router-dom'
import Navbar from './homepagecomponents/Navbar'
import HeroSection from './homepagecomponents/HeroSection'
import EmpoweringCommunitiesSection from './homepagecomponents/EmpoweringCommunitiesSection'
import StatsCardSection from './homepagecomponents/StatsCardSection'
import FindFPOSection from './homepagecomponents/FindFPOSection'
import DepartmentsSection from './homepagecomponents/DepartmentsSection'
import AgenciesSection from './homepagecomponents/AgenciesSection'
import FooterSection1 from './homepagecomponents/FooterSection1'
import MainFooter from './homepagecomponents/MainFooter'

const Homepage = () => {
    return (
        <div className="w-full">
            {/* Navbar for Homepage */}
            <Navbar />

            {/* Hero Section */}
            <HeroSection />

            {/*Empowering Agricultural Communities SECTION */}
            <EmpoweringCommunitiesSection />

            {/* 8 cards section */}
            <StatsCardSection />

            {/* Find Your FPO Match */}
            <FindFPOSection />

            {/* Allied Departments */}
            <DepartmentsSection />

            {/* Implementing Agencies */}
            <AgenciesSection />

            {/* Stay Connected with FPO Shakti */}
            <FooterSection1 />

            {/* Main Footer */}
            <MainFooter />

        </div>
    )
}

export default Homepage