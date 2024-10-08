import React from "react";
import { InView } from "react-intersection-observer";

const options = {
  threshold: 0.5,
  fallbackInView: true,
  triggerOnce: true,
};

export default function FoodSmoothInterface({ image }) {
  return (
    <div className="container mx-auto forth-section d-flex flex-column overflow-hidden">
      <h4 className="mx-auto mt-5 mb-3">About Us</h4>
      <div className="inner d-flex flex-column align-self-center flex-md-row">
        <InView {...options}>
          {({ inView, ref }) => (
            <div
              className={`left-section d-flex justify-content-center flex-column slide-down ${
                inView ? "slide-reset" : ""
              }`}
              ref={ref}
            >
              <img
                src={image}
                alt="sinfleMobile"
                className="w-50 mb-5 mx-auto"
              />
            </div>
          )}
        </InView>
        <InView {...options}>
          {({ inView, ref }) => (
            <div
              className={`right-section d-flex align-self-center flex-column container slide-right ${
                inView ? "slide-reset" : ""
              }`}
              ref={ref}
            >
              <h1>Responsive and Smooth Interface for Foodies</h1>
              {/* <p>
                  Prioritize your well-being with our commitment to providing the
                  highest quality food. Nourish your body and delight your taste
                  buds with the harmonious pairing of health and taste
                </p> */}
              <a href="#contact-us" className="LinkBtn">
                Contact Us
              </a>
            </div>
          )}
        </InView>
      </div>
    </div>
  );
}
