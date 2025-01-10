import React from 'react'
import Home from './COMPONENTS/Home/Home'
import Process from './COMPONENTS/Process/Process'
import Deals from './COMPONENTS/Deals/Deals'
import Pricing from './COMPONENTS/Pricing/Pricing'
import MainVideo from './COMPONENTS/MainVideo/MainVideo'
import Founder from './COMPONENTS/Founder/founder'
import About from './COMPONENTS/About/AboutUs'
import "./salesLandingPage.css"

const StartUpLendingPage = () => {
  return (
    <div className='sales-lending-page-container'>
      <Home/>
      <MainVideo/>
      <Process/>
      <Deals/>
      <Pricing/>
      <Founder />
      <About />
    </div>
  )
}

export default StartUpLendingPage