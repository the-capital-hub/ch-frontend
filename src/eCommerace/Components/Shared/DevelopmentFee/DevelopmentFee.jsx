import React from "react";
import {
  InsureRight,
  Diversify,
  InvestEasy,
} from "../../../../Images/Ecommerace/FtechlandingPage";
import { useInView } from "react-intersection-observer";
import "./DevelopmentFee.scss";

export default function TransportDevFee() {
  const { inView, ref } = useInView({
    triggerOnce: true,
    fallbackInView: true,
    threshold: 0.5,
    // rootMargin: "-5%",
  });

  return (
    <>
      <div className="container mx-auto short-description text-center">
        <h2 className="mx-auto">Pay your development fee in tranches</h2>
        <p className="text-center my-2 my-lg-4">
          Capital HUB supports the startup ecosystem by accepting payment in
          tranches of three. Final payment is made only after the product is
          complete.
        </p>
      </div>

      <div
        className="container mx-auto feature-cards flex-column flex-md-row"
        ref={ref}
      >
        <div className={`feature-card slide-up ${inView ? "slide-reset" : ""}`}>
          <img src={InsureRight} alt="Insure Right" />
          <h6>Simple Landing Page</h6>
          <p>₹15,000 - ₹30,000*</p>
        </div>
        <div
          className={`feature-card short-slide-up ${
            inView ? "short-slide-reset" : ""
          }`}
        >
          <img src={Diversify} alt="Diversify Well" />
          <h6> Full-Fledged web application</h6>
          <p>₹50,000 - ₹2,00,000*</p>
        </div>
        <div className={`feature-card slide-up ${inView ? "slide-reset" : ""}`}>
          <img src={InvestEasy} alt="Invest Easy" />
          <h6>Web application plus mobile application</h6>
          <p>₹2,00,000 - ₹5,00,000*</p>
        </div>
      </div>
    </>
  );
}
