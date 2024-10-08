import React from "react";
import { InView } from "react-intersection-observer";

const options = {
  threshold: 0.5,
  fallbackInView: true,
  triggerOnce: true,
};

export default function FoodHero({ twoMobile, downArrow }) {
  return (
    <div className="frist-section container mx-auto d-flex flex-column justify-content-evenly flex-md-row">
      <InView {...options}>
        {({ inView, ref }) => (
          <div
            className={`left-section d-flex flex-column justify-content-evenly p-md-3 overflow-hidden ${
              inView ? "" : ""
            }`}
            ref={ref}
          >
            {/* <p className="fw-bold"># 1 Food Delivery Services</p> */}
            <h1
              className={`short-slide-left ${
                inView ? "short-slide-reset" : ""
              }`}
            >
              Build your food delivery{" "}
              <span className="text-orange">application with Capital HUB!</span>
            </h1>
            {/* <h1
              className={`text-orange short-slide-left ${
                inView ? "short-slide-reset" : ""
              }`}
            >
              application with Capital HUB!
            </h1> */}
            <h6 className={`mt-2 slide-left ${inView ? "slide-reset" : ""}`}>
              Build your business as Capital HUB builds your application. Enable
              food delivery applications with the smoothest user interface
              available in the market.{" "}
            </h6>
            <a href="#contact-us" className="LinkBtn mt-2">
              Contact Us
            </a>
          </div>
        )}
      </InView>

      <InView {...options}>
        {({ inView, ref }) => (
          <div
            className={`right-section py-2 d-flex justify-content-evenly ${
              inView ? "rotateInRight" : ""
            }`}
            ref={ref}
          >
            <img
              src={twoMobile}
              alt="twoMobile"
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
      </InView>

      <img src={downArrow} alt="downArrow" className="down-arrow" />
    </div>
  );
}
