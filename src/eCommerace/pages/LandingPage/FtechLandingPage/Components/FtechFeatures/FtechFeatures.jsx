import React from "react";
import {
  CompanyBG,
  FinancialPlanner,
  TeamExp,
  UniqueFeatures,
} from "../../../../../../Images/Ecommerace/FtechlandingPage";
import { InView } from "react-intersection-observer";

const options = {
  threshold: 0.5,
  fallbackInView: true,
  triggerOnce: true,
};

export default function FtechFeatures() {
  return (
    <section
      className={`container mx-auto financial-planner row justify-content-center justify-content-md-around overflow-hidden`}
    >
      {/* Left section */}
      <div className={`col-md-7`}>
        <InView {...options}>
          {({ inView, ref }) => (
            <h3
              className={`mb-4 slide-left ${inView ? "slide-reset" : ""}`}
              ref={ref}
            >
              <span className="blue">
                Features that can be provided in the application
              </span>
              {/* <span className="orange"> financial planner</span> */}
            </h3>
          )}
        </InView>
        {/* <h4>Here is why we can help you</h4> */}
        <div className="helping-bullets">
          <InView {...options}>
            {({ inView, ref }) => (
              <div
                className={`helping-bullet slide-left ${
                  inView ? "slide-reset" : ""
                }`}
                ref={ref}
              >
                <div className="img">
                  <img src={CompanyBG} alt="Company Background" />
                </div>
                <p className="m-0">Credit-score tracking</p>
              </div>
            )}
          </InView>

          <InView {...options}>
            {({ inView, ref }) => (
              <div
                className={`helping-bullet slide-left ${
                  inView ? "slide-reset" : ""
                }`}
                ref={ref}
              >
                <div className="img">
                  <img src={TeamExp} alt="Team Experience" />
                </div>
                <p className="m-0">Payment gateway integration</p>
              </div>
            )}
          </InView>

          <InView {...options}>
            {({ inView, ref }) => (
              <div
                className={`helping-bullet slide-left ${
                  inView ? "slide-reset" : ""
                }`}
                ref={ref}
              >
                <div className="img">
                  <img src={UniqueFeatures} alt="Unique Features" />
                </div>
                <p className="m-0">Multi-factor authentication</p>
              </div>
            )}
          </InView>
        </div>
      </div>
      {/* Right section */}
      <div className={`img col-8 col-md-3 `}>
        <InView {...options}>
          {({ inView, ref }) => (
            <img
              src={FinancialPlanner}
              alt="Financial Planner"
              height={400}
              className={`slide-down ${inView ? "slide-reset" : ""}`}
              ref={ref}
            />
          )}
        </InView>
      </div>
    </section>
  );
}
