import React from "react";
import { ManageYourFinance } from "../../../../../../Images/Ecommerace/FtechlandingPage";
import { useInView } from "react-intersection-observer";

export default function FtechBuildingApplication() {
  const { inView, ref } = useInView({
    triggerOnce: true,
    fallbackInView: true,
    threshold: 0.25,
    // rootMargin: "-5%",
  });

  return (
    <section
      className={`container mx-auto mobile-apps row gap-3 flex-column-reverse flex-md-row justify-content-center align-items-center pt-5 overflow-hidden ${
        inView ? "" : ""
      }`}
      ref={ref}
    >
      <img
        className={`col-6 col-md-3 slide-down ${inView ? "slide-reset" : ""}`}
        src={ManageYourFinance}
        alt="Mobile app"
      />
      <div
        className={`col-md-7 d-flex flex-column gap-2 slide-right ${
          inView ? "slide-reset" : ""
        }`}
      >
        <h2 className="px-3">
          <span className="light-orange">
            Building your FinTech application is just a call away.
          </span>
          {/* <span className="blue"> with us is a tap away</span> */}
        </h2>
        <div className="app-icons d-flex flex-column flex-md-row gap-3 align-items-center">
          {/* <img src={GooglePlayStore} alt="Google Play" height={80} /> */}
          {/* <img src={AppStore} alt="App Store" height={65} /> */}
        </div>
      </div>
    </section>
  );
}
