import React, { useEffect, useState } from 'react';
import Features from '../Features/Features';
import { TiStarFullOutline } from 'react-icons/ti';
import { IoTriangleOutline } from 'react-icons/io5';
import CountUp from 'react-countup';
import './home.scss';
import line from '../images/Line 180 (1).png';
import smallline from '../images/Line 152.png';
import lefttop from '../images/Group 1261152819.png';
import dot from '../images/Ellipse 17 (2).png';
import blurdot from '../images/Ellipse 13 (2).png';
import bg from '../images/Polygon 1 (2).png';
import VentureImg from '../images/venture-bg2.png';
import blur from '../images/Ellipse 10.png';
import sideline from '../images/Group 1261152797.png';
import leftbottom from '../images/Group 1261152797 (1).png';
import line1 from '../images/Group 1261152757 (1).png';
import StartupPlus from '../images/startupPlus.png';
import AngelPlus from '../images/angelPlus.png';
import VCPlus from '../images/vcPlus.png';
import SyndicatePlus from '../images/syndicatePlus.png';
import Flag from '../images/india-flag.png';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    setStartAnimation(true);
  }, []);

  return (
    <div className='home'>
      <div className='home__container'>
        <img src={bg} alt="" className='bg-image' />
        <img width={"100%"} src={line} alt="" className='line-image' />
        <img src={lefttop} alt="" className='lefttop-image' />
        
        <div className='best-startup'>
          <img src={smallline} alt="" className='smallline' />
          <h1><b>Best fundraising platform in India </b> <img src={Flag} className='flag' alt="india" /></h1>
          <img src={smallline} alt="" className='smallline' />
        </div>
        
        <div className='rotated-text'>
          <TiStarFullOutline className='star-icon' />
          <div className="circle-text">
            <span>A</span>
            <span>R</span>
            <span>E</span>
            <span> </span>
            <span>Y</span>
            <span>O</span>
            <span>U</span>
            <span> </span>
            <span>A</span>
            <span> </span>
            <span>S</span>
            <span>T</span>
            <span>A</span>
            <span>R</span>
            <span>T</span>
            <span>U</span>
            <span>P ?</span>
            <span> </span>
            <span> </span>
            <span> </span>
          </div>
        </div>
        
        <h1 className='main-heading'>Raise Funds Like A <span>Pro</span></h1>
        <img src={blurdot} alt="" className='blurdot' />
        <img src={dot} alt="" className='dot' />
        <img src={blur} alt="" className='blur' />
        
        <center>
          <p className='description'>Funds refer to pooled investment vehicles that gather capital from multiple investors to invest in a diversified portfolio of assets. The main types of funds include mutual funds, exchange-traded funds (ETFs), hedge funds, and index funds.</p>
        </center>
        <img src={blur} alt="" className='blur-bottom' />
        <center className='community'>
          <div className='community-line'>
            <img src={sideline} alt="" className='sideline' />
            <h1><b>Join our community</b></h1>
            <img src={sideline} alt="" className='sideline' />
          </div>
        </center>

        <div className='stats'>
          <div className='stat'>
            <img src={StartupPlus} alt="Startup 2000" className='triangle-icon' />
            <h1><b><i>STARTUPS : <CountUp start={startAnimation ? 0 : null} end={2000} duration={2} />+</i></b></h1>
          </div>
          <div className='stat'>
            <img src={AngelPlus} alt="Angel 800+" className='triangle-icon' />
            <h1><b><i>Angels : <CountUp start={startAnimation ? 0 : null} end={800} duration={2} />+</i></b></h1>
          </div>
          <div className='stat'>
            <img src={VCPlus} alt="VC 27+" className='triangle-icon' />
            <h1><b><i>VC : <CountUp start={startAnimation ? 0 : null} end={27} duration={2} />+</i></b></h1>
          </div>
          <div className='stat'>
            <img src={SyndicatePlus} alt="Syndicates 38+" className='triangle-icon' />
            <h1><b><i>Syndicates : <CountUp start={startAnimation ? 0 : null} end={38} duration={2} />+</i></b></h1>
          </div>
        </div>
        
        <center className='partner'>
          <div className='partner-line'>
            <img src={sideline} alt="" className='sideline' />
            <h1><strong>VENTURE PARTNER</strong></h1>
            <img src={sideline} alt="" className='sideline' />
          </div>
          <div className="ventureImg">
            <img src={VentureImg} alt="" className="sideline" />
            <h1>
              <b>
                <i>
                Inflection Point Ventures (IPV) is a 14000+ strong members angel investing firm
                which supports new-age entrepreneurs, providing them monetary & experiential
                capital by connecting them with a diverse group of investors.
                </i>
              </b>
            </h1>
          </div>

          <img src={leftbottom} alt="" className='leftbottom' />
        </center>
        <img src={blur} alt="" className='blur-cta' />
        <button onClick={()=>{navigate("/signup")}} className='join-button'>Join now to raise funds like a pro</button>
        <img src={line1} alt="" className='line1' />
      </div>

      <Features />
      {/* <Process /> */}
    </div>
  );
};

export default Home;
