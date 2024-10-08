import React from 'react';
import img1 from '../images/Rectangle 8197.png';
import img2 from '../images/Rectangle 8197 (1).png';
import img3 from '../images/Rectangle 8197 (2).png';
import img4 from '../images/Rectangle 8197 (3).png';
import down from '../images/Polygon 11.png';
import './deals.scss';
import { useNavigate } from 'react-router-dom';

const Deals = () => {
  const navigate = useNavigate()
  return (
    <div className='deals-container'>
      <img src={down} alt="" className='background-image background-image-1' />
      <center>
        <div className='deals-content'>
          <h1>Live Deals</h1>
          <p>"Startup live deals" could refer to several things in the context of entrepreneurship and startup ecosystem. Here are a few interpretations and how they might relate to startups</p>
        </div>
      </center>
      <div className='deals-cards'>
        <div className='deal-card'>
          <img src={img1} alt="" />
          <h1>Openleaf</h1>
          <p>At Openleaf, we're revolutionizing logistics for e-commerce businesses. Say goodbye to complexity and skyrocket your growth with our streamlined platform. Connect directly with major courier services, optimize costs, and enhance customer experiences. With Openleaf, simplify, connect, and deliver success.</p>
          <button className='grab-button' onClick={()=>{navigate("/signup")}}>Join Now</button>
        </div>
        <div className='deal-card'>
          <img src={img2} alt="" />
          <h1>Etric</h1>
          <p>An e-Mobility as a Service Enterprise, aiming to be one of the key players in EV 4W- Urban Shared Mobility Services in India. 100% Electric, Sustainable, Efficient, Affordable & Reliable
          e-Mobility Solutions, through a robust Technology Platform.</p>
          <button className='grab-button' onClick={()=>{navigate("/signup")}}>Join Now</button>
        </div>
        <div className='deal-card'>
          <img src={img3} alt="" />
          <h1>AgriVijay</h1>
          <p>AgriVijay is India’s first Marketplace of Renewable Energy Products for Farmers & Rural households making them Energy Independent by reducing their dependency on Fossil fuels such as diesel & firewood etc. increasing their savings & income along with contributing to the Climate Change mitigation.</p>
          <button className='grab-button' onClick={()=>{navigate("/signup")}}>Join Now</button>
        </div>
        <div className='deal-card'>
          <img src={img4} alt="" />
          <h1>Covesto</h1>
          <p>Covesto is a social trading and investing platform where like-minded investors can connect with each other, create groups and share market opinions for a better learning experience.</p>
          <button className='grab-button' onClick={()=>{navigate("/signup")}}>Join Now</button>
        </div>
      </div>
      <button className='main-button' onClick={()=>{navigate("/signup")}}>Join To Raise Funds Like A Pro</button>
    </div>
  );
}

export default Deals;
