import React from 'react'
import "./Header.scss"
import assets from "../../../../Images/Portfolio/Header/index"
import serviceThreeIcon from "../../../../Images/service/Group 15406.svg";


function Header() {
  return (
    <div className='portfolio_header d-flex flex-row justify-content-between container-fluid p-4 align-items-center' >
<div className='right_section'>
  <span className='d-flex'><img src={serviceThreeIcon} alt="serviceThreeIcon" className='mt-md-1' /> <h1>Our Portfolio</h1>
</span>
<hr className='p-0 my-3'/>
<h6>Here are some of the top startups that we have backed with our web development services</h6>

</div>
{/* <div className="left_section d-flex flex-row justify-content-between gap-3">
<img src={assets.search} alt="search" />
<img src={assets.threeLine} alt="threeLine" />
</div> */}
    </div>
  )
}

export default Header