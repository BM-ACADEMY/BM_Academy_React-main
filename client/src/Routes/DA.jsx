import React from 'react'
import Hero from '../Dashboard/Webinar/data analyst/Hero'
import UnlockSection from '../Dashboard/Webinar/data analyst/UnlockSection'
import { DiscoverSection, WhyAttend } from '../Dashboard/Webinar/data analyst/WhyAttend'
import WhoShouldJoin from '../Dashboard/Webinar/data analyst/WhoShouldJoin'
import HowToRegister from '../Dashboard/Webinar/data analyst/HowToRegister'
import Gallery from '../Dashboard/Webinar/data analyst/Gallery'
import FinalCallToAction from '../Dashboard/Webinar/data analyst/FinalCallToAction'
import FloatingWhatsAppButton from '../Dashboard/Webinar/data analyst/FloatingWhatsAppButton'
import Footer from '../Dashboard/Webinar/data analyst/Footer'
import Testimonials from '../Dashboard/Webinar/data analyst/Testimonials'

const DA = () => {
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

export default DA