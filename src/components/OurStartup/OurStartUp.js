import React, { useEffect } from "react";
import "./style.scss";
import serviceOneIcon from "../../Images/service/Group 15409.svg";
import BackIcon from "../../Images/BackIcon.svg";
import { Link } from "react-router-dom";
import InvestorIcon from "../../Images/ourInvestor/InvestorIcon.png";
import OurInvestorCard from "../Card/OurInvestorCard/OurInvestorCard";

const OurStartup = () => {
  useEffect(() => {
    document.title = "Our Investors | The Capital Hub";
  }, []);
  return (
    <>
      <div className="container investor_main_container">
        <div className="container">
          <Link to={"/"}>
            <img src={BackIcon} alt="back" />
            Back
          </Link>
          <section className="heading_section_investor">
            <div className="title_and_image">
              <img src={serviceOneIcon} alt="image" />
              <h2>Startup</h2>
            </div>
          </section>

          <section className="row image_and_text">
            <div className="col-lg-4 col-md-12">
              <div className="image_section">
                <img src={InvestorIcon} alt="image" />
              </div>
            </div>
            <div className="col-lg-8 col-md-12">
              <div className="text_section">
                <h1>READY TO BE AN ANGEL INVESTOR?</h1>
                <p>
                  Begin your journey of Angel investment with as low as INR 2.5
                  - 5 Lakhs. The Capital HUB focuses on connecting angels with
                  the right startups in their preferred area and industry of
                  investment.
                  <br />
                  <br />
                  The Capital HUB always provides investors with verified,
                  authenticated, and fully documented startups. Capital HUB
                  focuses on the 3M's (management, Market, and mathematics ),
                  product, technology, startup stage, founder's experience,
                  current traction, and many more to help find the right fit to
                  begin your angel investment journey with Capital HUB.
                </p>
                <h1>COMPLIANCE AND DUE DILIGENCE</h1>
                <p>
                  Startups and founders are thoroughly vetted through our due
                  diligence processes such as LDD, FDD, and CDD to make a
                  smoother decision and save time while you begin your investing
                  journey.
                </p>
                <h1>CONVENIENCE</h1>
                <p>
                  End-to-End Documentation and handholding is done by The
                  Capital HUB.
                </p>
              </div>
            </div>
          </section>
          <section className="row benifits_container">
            <h1>BENEFITS OF BEING AN ANGEL INVESTOR WITH THE CAPITAL HUB</h1>
            <OurInvestorCard />
          </section>
          {/* <section className="heading_section_investor">
            <div className="title_and_image">
              <h2>TESTIMONIALS</h2>
            </div>
            <p>We love our customers and they love us back</p>

          </section> */}
        </div>
      </div>
    </>
  );
};

export default OurStartup;
