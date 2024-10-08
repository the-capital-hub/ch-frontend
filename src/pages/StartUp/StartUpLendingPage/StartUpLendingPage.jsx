import React from 'react'
import Home from './COMPONENTS/Home/Home'
import Process from './COMPONENTS/Process/Process'
import Deals from './COMPONENTS/Deals/Deals'
import Pricing from './COMPONENTS/Pricing/Pricing'
import "./startUpLending.css"

const StartUpLendingPage = () => {
  return (
    <div className='hom-container'>
      <Home/>
      <Process/>
      <Deals/>
      <Pricing/>
    </div>
  )
}

export default StartUpLendingPage