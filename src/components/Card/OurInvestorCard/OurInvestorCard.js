import React from "react";
import "./OurInvestorCard.scss";
import RightFit from "../../../Images/ourInvestor/RightFit.svg";
import VerifiedStartups from "../../../Images/ourInvestor/VerifiedStartups.svg";
import ComplianceDiligence from "../../../Images/ourInvestor/Compliancediligence.svg";
import CompleteDocumentation from "../../../Images/ourInvestor/Completedocumentation.svg";
import Support from "../../../Images/ourInvestor/Support.svg";
import Convenience from "../../../Images/ourInvestor/Convenience.svg";
import Regularupdates from "../../../Images/ourInvestor/Regularupdates.svg";
import TrustFaith from "../../../Images/ourInvestor/TrustandFaith.svg";
import BestOfferings from "../../../Images/ourInvestor/Best Offerings.svg";

const OurInvestorCard = () => {
  return (
    <>
      <div className="our_investor_container">
        <div className="our_investor row justify-content-around align-items-center my-4">
          <div className="col-md-6 col-lg-4 col-sm-12 b our_investor_card mb-69">
            <div className="row d-flex justify-content-center align-item-center inside_card">
              <img src={RightFit} alt="img" />
              <h3 className="underline_one">Right Fit</h3>
              <h4>
                Invest in the right startups with your preferred area of
                interest, industry, and expertise.{" "}
              </h4>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 col-sm-12 b our_investor_card mb-69">
            <div className="row d-flex justify-content-center align-item-center inside_card">
              <img src={VerifiedStartups} alt="img" />
              <h3 className="underline_two">Verified Startups</h3>
              <h4>
                The Capital HUB verifies every startup presented to an investor
                to maintain the authenticity and value of the community built.{" "}
              </h4>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 col-sm-12 b our_investor_card mb-69">
            <div className="row d-flex justify-content-center align-item-center inside_card">
              <img src={ComplianceDiligence} alt="img" />
              <h3 className="underline_three">Compliance and due diligence</h3>
              <h4>
                Startups and founders are thoroughly vetted and DD such as LDD,
                FDD, and CDD are done by The Capital HUB, to make a smoother
                decision and save time while you begin your investing journey.{" "}
              </h4>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 col-sm-12 b our_investor_card mb-69">
            <div className="row d-flex justify-content-center align-item-center inside_card">
              <img src={CompleteDocumentation} alt="img" />
              <h3 className="underline_four">Complete documentation</h3>
              <h4>
                We always present only hand-picked startups with complete
                documentation available at requests such as Pitch deck, Business
                plan, Financials, DD, and complaint.{" "}
              </h4>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 col-sm-12 b our_investor_card mb-69">
            <div className="row d-flex justify-content-center align-item-center inside_card">
              <img src={Support} alt="img" />
              <h3 className="underline_five">24/7 Support</h3>
              <h4>
                The Capital HUB believes in finding your best half ( startups ),
                so we will be available 24/7 to make your experience in angel
                investing worthwhile.
              </h4>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 col-sm-12 b our_investor_card mb-69">
            <div className="row d-flex justify-content-center align-item-center inside_card">
              <img src={Convenience} alt="img" />
              <h3 className="underline_six"> Convenience</h3>
              <h4>
                End End Documentation and handholding is done by The Capital
                HUB.
              </h4>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 col-sm-12 b our_investor_card mb-69">
            <div className="row d-flex justify-content-center align-item-center inside_card">
              <img src={Regularupdates} alt="img" />
              <h3 className="underline_seven">Regular updates</h3>
              <h4>
                The Capital HUB will take the responsibility to provide weekly,
                Monthly, and quarterly updates from founders and startups to
                showcase our commitment to using the funds for the right cause
              </h4>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 col-sm-12 b our_investor_card mb-69">
            <div className="row d-flex justify-content-center align-item-center inside_card">
              <img src={TrustFaith} alt="img" />
              <h3 className="underline_eight">Trust and Faith</h3>
              <h4>
                The Capital HUB and its valued advisors act as an observer on
                the board to successfully help startups network, retain
                authenticity and manage funds in the right direction of
                scalability and growth.
              </h4>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 col-sm-12 b our_investor_card mb-69">
            <div className="row d-flex justify-content-center align-item-center inside_card">
              <img src={BestOfferings} alt="img" />
              <h3 className="underline_nine">Best Offerings</h3>
              <h4>
                Goes without saying we always find you the best startups with
                the best offers to invest
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurInvestorCard;
