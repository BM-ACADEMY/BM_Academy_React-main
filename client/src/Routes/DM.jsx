import React from 'react'
import Hero from '../Dashboard/Webinar/digitalmarketing/Hero'
import UnlockSection from '../Dashboard/Webinar/digitalmarketing/UnlockSection'
import { DiscoverSection, WhyAttend } from '../Dashboard/Webinar/digitalmarketing/WhyAttend'
import WhoShouldJoin from '../Dashboard/Webinar/digitalmarketing/WhoShouldJoin'
import HowToRegister from '../Dashboard/Webinar/digitalmarketing/HowToRegister'
import Gallery from '../Dashboard/Webinar/digitalmarketing/Gallery'
import FinalCallToAction from '../Dashboard/Webinar/digitalmarketing/FinalCallToAction'
import FloatingWhatsAppButton from '../Dashboard/Webinar/digitalmarketing/FloatingWhatsAppButton'
import Footer from '../Dashboard/Webinar/digitalmarketing/Footer'
import Testimonials from '../Dashboard/Webinar/digitalmarketing/Testimonials'

const DM = () => {
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

export default DM