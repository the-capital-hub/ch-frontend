import React from "react";
import { JoinUs } from "../../../../../../Images/Ecommerace/FtechlandingPage";
import { InView } from "react-intersection-observer";

const options = {
  threshold: 0.5,
  fallbackInView: true,
  triggerOnce: true,
};

export default function FtechPartOfPlatform() {
  return (
    <section className="join-us overflow-hidden">
      <div
        className={`container mx-auto header row justify-content-between align-items-center `}
      >
        <InView {...options}>
          {({ inView, ref }) => (
            <div
              className={`short-details col-md-5 text-white slide-left ${
                inView ? "slide-reset" : ""
              }`}
              ref={ref}
            >
              <h2>
                <span>Be part of the Capital Hub Platform</span>
                {/* <span className="light-orange"> EMI problems again!</span> */}
              </h2>
              <p>
                Working with Capital Hub gives you access to a community of 30+
                startup founders and 80+ angel investors to boost your network
                launch your startup ahead.
              </p>
            </div>
          )}
        </InView>
        <InView {...options}>
          {({ inView, ref }) => (
            <div
              className={`img-container col-md-4 slide-right ${
                inView ? "slide-reset" : ""
              }`}
              ref={ref}
            >
              <img className="mx-auto" src={JoinUs} alt="Join Us" />
            </div>
          )}
        </InView>
      </div>
      <div className="join-us-cards">
        {/* <div className="join-us-card rounded-4">
              <img
                className="rounded"
                src={FinancialOrg}
                width={300}
                alt="Financial Organisation"
              />
              <div className="p-3">
                <h6>Financial Organisation</h6>
                <p className="fs-14">
                  Never have to worry about tracking and planning your EMIs and
                  finances by yourself anymore!
                </p>
              
                <Link to="/web-development" className="LinkBtn btn btn-primary rounded-pill text-white px-4 py-1 fs-12">Taking Us</Link>
              </div>
            </div> */}
        {/* <div className="join-us-card rounded-4">
              <img
                className="rounded"
                src={Avoidance}
                width={300}
                alt="Avoidance of missed payments"
              />
              <div className="p-3">
                <h6>Avoidance of missed payments</h6>
                <p className="fs-14">
                  Our 0 interest loans will help you stay ahead of your payments!
                </p>
               
                <Link to="/web-development" className="LinkBtn btn btn-primary rounded-pill text-white px-4 py-1 fs-12">Taking Us</Link>
              </div>
            </div> */}
        {/* <div className="join-us-card rounded-4">
              <img
                className="rounded"
                src={ImprovedCredit}
                width={300}
                alt="Improved credit score"
              />
              <div className="p-3">
                <h6>Improved credit score</h6>
                <p className="fs-14">
                  Ensure your Cibil score is always top-notch, and never have to
                  worry about not being credit-worthy in the future!
                </p>
                <Link to="/web-development" className="LinkBtn btn btn-primary rounded-pill text-white px-4 py-1 fs-12">Taking Us</Link>
              </div>
            </div> */}
        {/* <div className="join-us-card rounded-4">
            <img
              className="rounded"
              src={pramodImg}
              width={351}
              alt="Cost Savings"
            />
            <div className="p-3 ">
              <h6 className="mx-auto">pramod Badiger</h6>
              <p className="fs-14 mx-auto">Connect with our expert</p>
             
              <Link
                to="https://www.linkedin.com/in/pramod-badiger-a3226618b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                className="LinkBtn btn btn-primary rounded-pill text-white px-4 py-1 fs-12 mx-auto"
              >
                Connect
              </Link>
            </div>
          </div> */}
      </div>
    </section>
  );
}
