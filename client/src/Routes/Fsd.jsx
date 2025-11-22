import React from 'react'
import Hero from '../Dashboard/Webinar/fullstackdevelopment/Hero'
import UnlockSection from '../Dashboard/Webinar/fullstackdevelopment/UnlockSection'
import { DiscoverSection, WhyAttend } from '../Dashboard/Webinar/fullstackdevelopment/WhyAttend'
import WhoShouldJoin from '../Dashboard/Webinar/fullstackdevelopment/WhoShouldJoin'
import HowToRegister from '../Dashboard/Webinar/fullstackdevelopment/HowToRegister'
import Gallery from '../Dashboard/Webinar/fullstackdevelopment/Gallery'
import FinalCallToAction from '../Dashboard/Webinar/fullstackdevelopment/FinalCallToAction'
import FloatingWhatsAppButton from '../Dashboard/Webinar/fullstackdevelopment/FloatingWhatsAppButton'
import Footer from '../Dashboard/Webinar/fullstackdevelopment/Footer'
import Testimonials from '../Dashboard/Webinar/fullstackdevelopment/Testimonials'

const FSD = () => {
  return (
    <div>
        <Hero/>
      <UnlockSection/>
      <WhyAttend/>
      <DiscoverSection/>
      <WhoShouldJoin/>
      <HowToRegister/>
      <Gallery/>
      <FinalCallToAction/>
      <Testimonials/>
      <FloatingWhatsAppButton/>
      {/* <Footer/> */}
      </div>
  )
}

export default FSD