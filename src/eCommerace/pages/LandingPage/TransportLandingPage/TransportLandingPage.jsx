import React from "react";
import assets from "../../../../Images/Ecommerace/TransportLandingPage/index";
import "./TransportLandingPage.scss";
import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
// import {
//   InvestEasy,
//   Diversify,
//   InsureRight,
// } from "../../../../Images/Ecommerace/FtechlandingPage";
// import pramodImg from "../../../../Images/aboutUs/Pramod.jpeg";
// import tchLogo from "../../../../Images/RoundLogo.png";
import ContactForm from "../../../Components/Shared/ContactForm/ContactForm";
import ServiceStats from "../../../Components/Shared/ServiceStats/ServiceStats";
import OurClients from "../../../Components/Shared/OurClients/OurClients";
import TransportHero from "./Components/TransportHero/TransportHero";
import TransportStreamlined from "./Components/TransportStreamlined/TransportStreamlined";
import TransportPartOfPlatform from "./Components/TransportPartOfPlatform/TransportPartOfPlatform";
import TransportBuildingApplications from "./Components/TransportBuildingApplications/TransportBuildingApplications";
import TransportPickupDelivery from "./Components/TransportPickupDelivery/TransportPickupDelivery";
import DevelopmentFee from "../../../Components/Shared/DevelopmentFee/DevelopmentFee";
import ConsultingServices from "../../../Components/Shared/ConsultingServices/ConsultingServices";
import Expert from "../../../Components/Shared/Expert/Expert";

function TransportLandingPage() {
  return (
    <div className="transport-landing-page container-fluid overflow-x-hidden">
      <Helmet>
        <meta charSet="utf-8" />
        <title> Build your logistics application with Capital HUB!</title>
        <meta
          name="description"
          content="Experience efficient, sustainable, and reliable transportation solutions with Capital Hub. Send your belongings worldwide, with customizable pick-up and delivery options, and simplified logistics management. See why our customers trust us for their shipping needs."
        />
      </Helmet>

      {/* Hero section */}
      <TransportHero image={assets.twoMobile} />

      {/* Service Stats */}
      <ServiceStats key={"logistics"} />

      {/* Building efficient transport applications */}
      <TransportBuildingApplications image={assets.mobileLocation} />

      {/* Pickup and Delivery */}
      <TransportPickupDelivery image={assets.map} />

      {/* Development Fee */}
      <DevelopmentFee />

      {/* Transport Streamlined */}
      <TransportStreamlined image={assets.singleMobile} />

      {/* Consulting services */}
      <ConsultingServices />
      {/* <div className="card_bg">
        <div className="join-us-card rounded-4 mx-auto ">
          <img
            className="rounded "
            src={pramodImg}
            width={350}
            alt="Cost Savings"
          />
          <div className="p-3  mx-auto text-center">
            <h5 className="mx-auto">Pramod Badiger</h5>
            <p className="fs-14 mx-auto">Connect with our expert</p>
            <Link
              to="https://www.linkedin.com/in/pramod-badiger-a3226618b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              className="LinkBtn btn btn-primary rounded-pill text-white px-4 py-1 fs-12 mx-auto"
            >
              Connect
            </Link>
          </div>
        </div>
      </div> */}

      {/* Expert */}
      <Expert />

      {/* Transport Be a part of platform */}
      <TransportPartOfPlatform image={assets.bookingDetails} />

      <div className="container mx-auto last-section">
        {/* <div className="left-section">
          <h1>What our Customer’s say about us</h1>
          <p>What our Customer’s say about us</p>
            <button>View more</button> 
          <p>
            The Capital Hub has consistently delivered on their promise of
            reliable logistics solutions. Their services have earned our trust,
            satisfaction, and peace of mind. They are our preferred logistics
            partner.
          </p>
          <p>
            Choosing The Capital Hub for our logistics needs has been a
            game-changer. Their efficient services have led to complete
            satisfaction and peace of mind. We rely on them for all our shipping
            requirements
          </p>
        </div> */}
        {/* <div className="right-section">
            <p>I loved there work because of the staff working very carefully and the transport is the good i liked there wotk</p>
            <hr />
            <div className="user-data">
                <div className="user-name">
                <img src="" alt="" />
                <h4><i>Priya</i></h4>
                </div>
                <div className="changing-btn">
                    <button></button>
                    <button></button>
                </div>
            </div>
        </div> */}
      </div>

      {/* OurClients */}
      <OurClients className="bg-dark" />

      {/* contact form */}
      <div className="container row m-0 mx-auto">
        <ContactForm className="col-12 col-md-8 mx-auto" page={"logistics"} />
      </div>
    </div>
  );
}

export default TransportLandingPage;
