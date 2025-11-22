import React from 'react';
import WelcomeBanner from '../components/home/WelcomeBanner';
import HeroSection from '../components/home/HeroSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import { CEOsMessage } from '../components/home/CEOsMessage';
import Testimonials from '../components/home/Testimonials';
import TrendingCourses from '../components/home/TrendingCourses';
import SACTBanner from '../components/home/CareerGuidance';
import CallToAction from '../components/home/ActionSection';
import { LogIn } from 'lucide-react';
import FloatingWhatsAppButton from '../components/home/FloatingWhatsAppButton';



const HomeRoutes = () => {
    return (
        <div>
            <WelcomeBanner />
            <HeroSection />
            <WhyChooseUs />
            <CEOsMessage />
            <Testimonials />
            <TrendingCourses />
            <SACTBanner />
            <CallToAction />
            <FloatingWhatsAppButton />
            

        </div>
    )
}

export default HomeRoutes;