import React from "react";
// import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

export default function TransportHero({ image }) {
  // Intersection Observer
  const { inView, ref } = useInView({
    triggerOnce: true,
    fallbackInView: true,
    threshold: 0.5,
    // rootMargin: "-5%",
  });

  return (
    <div
      className={` ${
        inView ? "opacity-1" : "opacity-0"
      } overflow-hidden container mx-auto first-section d-flex flex-column`}
      ref={ref}
    >
      <div className="inner-section d-flex flex-column justify-content-evenly flex-md-row">
        <div
          className={`left-section d-flex flex-column justify-content-center gap-4 slide-left ${
            inView ? "slide-reset opacity-1" : "opacity-0"
          }`}
        >
          {/* <h6>#1 Logistic Platform</h6> */}
          <h1 className="">
            {" "}
            Build your logistics application with Capital HUB!
          </h1>
          <p>
            {/* Build your business as Capital HUB builds your application. Enable
        doorstep pickups and global deliveries and let your worries take a
        backseat. */}
            Supercharge your business while Capital HUB works our magic on your
            application. Embrace door-to-door pickups and worldwide deliveries,
            and watch your worries fade away.
          </p>
          <div className="d-flex gap-3 mb-3">
            <a
              href="#contact-us"
              // onClick={scrollToContact}
              className="LinkBtn shadow-sm"
            >
              Say Hello
            </a>
            <a
              href="#contact-us"
              // onClick={scrollToContact}
              className="LinkBtn LinkBtn-white shadow-sm"
            >
              Our Portfolio
            </a>
          </div>
        </div>
        <div
          className={`right-section slide-up  ${
            inView ? "slide-reset opacity-1" : "opacity-0"
          }`}
        >
          <img src={image} alt="transport" />
        </div>
      </div>
      {/* working place on coustomer button */}
      <div className="img-button">{/* <button>Customers</button> */}</div>
    </div>
  );
}
