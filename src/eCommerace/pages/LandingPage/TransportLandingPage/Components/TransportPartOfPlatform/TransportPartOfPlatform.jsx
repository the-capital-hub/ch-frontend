import React from "react";
import tchLogo from "../../../../../../Images/RoundLogo.png";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

export default function TransportPartOfPlatform({ image }) {
  const { inView, ref } = useInView({
    triggerOnce: true,
    fallbackInView: true,
    threshold: 0.5,
    // rootMargin: "-5%",
  });

  return (
    <div
      className={`container mx-auto fifth-section  d-flex flex-column  justify-content-center align-items-center gap-5 flex-md-row ${
        inView ? "opacity-1" : "opacity-0"
      } overflow-hidden`}
      ref={ref}
    >
      <div
        className={`left-section d-flex flex-column gap-3 slide-left ${
          inView ? "slide-reset opacity-1" : "opacity-0"
        }`}
      >
        <h1>Be part of the Capital Hub Platform</h1>
        <Link to={"/"} className="mx-auto">
          <img
            src={tchLogo}
            alt="Capital Hub"
            className="d-md-none mx-auto capital-hub-logo"
          />
        </Link>
        <p>
          {/* Working with Capital Hub gives you access to a community of 30+
        startup founders and 80+ angel investors to boost your network
        launch your startup ahead{" "} */}
          Joining Capital Hub unlocks a thriving ecosystem of 30+ visionary
          startup leaders and 80+ angel investors, propelling your startup into
          the fast lane of success!
        </p>
        <div className="d-flex gap-3 mb-3">
          <a href="#contact-us" className="LinkBtn shadow-sm">
            Get started
          </a>
          <a href="#contact-us" className="LinkBtn LinkBtn-white shadow-sm">
            Our Portfolio
          </a>
        </div>
      </div>

      <div
        className={`right-section slide-up ${
          inView ? "slide-reset opacity-1" : "opacity-0"
        }`}
      >
        <img src={image} alt="international" />
      </div>
    </div>
  );
}
