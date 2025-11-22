import React from 'react'
import SACTHeroSection from '../components/SACT/SACTHeroSection'
import CareerTestSection from '../components/SACT/CareerTestSection'
import SACTBanner from '../components/home/CareerGuidance'


export const SACTroutes = () => {
  return (
    <div>
        <SACTHeroSection/>
        {/* <SACTBanner/> */}
        <CareerTestSection/>
    </div>
  )
}


export default SACTroutes