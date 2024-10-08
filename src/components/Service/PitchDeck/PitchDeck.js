import React, { useEffect } from "react";
import "./PitchDeck.scss";
import serviceFiveIcon from "../../../Images/service/Group 15408.svg";
import listIcon from "../../../Images/ListDot.svg";
import BackIcon from "../../../Images/BackIcon.svg";
import { Link } from "react-router-dom";

const PitchDeck = () => {
  useEffect(() => {
    document.title = "Pitch Deck Service | The Capital Hub";
  }, []);
  return (
    <>
      <div className="container pitch_main_container">
        <div className="container">
          <Link to={"/service"}>
            <img src={BackIcon} alt="back" />
            Back
          </Link>
          <section className="heading_section_fund">
            <h1>
              We offer the best
              <span style={{ color: "#FD5901" }}> services</span>
            </h1>

            <div className="title_and_image">
              <img src={serviceFiveIcon} alt="image" />
              <h2>Pitch Deck</h2>
            </div>

            <p className="mt-4">
              The Capital HUB offers elegant pitch deck design and professional
              support to startups. With our advanced designs and friendly
              support, you can confidently present your business case to
              investors.
            </p>

            <p>
              If you're looking to put your best product forward with a pitch
              deck that will impress angel investors or VCs, you need Capital
              HUB. We have advanced designs and professional support to help you
              create a pitch deck that will make your startup look polished and
              professional. Whether you're seeking angel round funding or
              looking to attract investors, we can help you begin your
              fundraising journey with The Capital HUB.
            </p>
          </section>

          <section className="list_section">
            <ol>
              <h2>Our process :</h2>
              <li>
                <div>
                  Initial Consultation and Understanding of Business Model
                </div>{" "}
              </li>

              <li>
                <div>Market and Competitor Analysis</div>{" "}
              </li>

              <li>
                <div>Storyboarding & content preparation</div>{" "}
              </li>

              <li>
                <div>Financial Modeling</div>{" "}
              </li>

              <li>
                <div>Graphic Designing</div>{" "}
              </li>
            </ol>

            <ul>
              <h2>What's included in the financial documentations :</h2>
              <li>
                <img src={listIcon} alt="image" />
                <div>Problem</div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Solution</div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Value Proposition</div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Market Size</div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Competition</div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Revenue Model</div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Go to Market</div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Team</div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Current Traction</div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Milestones</div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Financial Projection</div>
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Investment Ask & Exit Strategy</div>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default PitchDeck;
