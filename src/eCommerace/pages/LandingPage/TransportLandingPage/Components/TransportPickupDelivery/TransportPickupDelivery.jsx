import React from "react";
import { useInView } from "react-intersection-observer";

export default function TransportPickupDelivery({ image }) {
  const { inView, ref } = useInView({
    triggerOnce: true,
    fallbackInView: true,
    threshold: 0.5,
    // rootMargin: "-5%",
  });

  return (
    <div
      className="container mx-auto thired-section d-flex flex-column  justify-content-evenly flex-md-row align-items-center overflow-hidden"
      ref={ref}
    >
      <div className="left-section p-lg-5 m-md-5 d-flex flex-column align-items-center align-items-md-start w-100">
        <h1 className={`slide-left ${inView ? "slide-reset" : ""}`}>
          {/* Customizable Pick-Up and Delivery -&gt;  */} Customizable Pick-Up
          and Delivery Features
        </h1>
        <p className={`slide-left ${inView ? "slide-reset" : ""}`}>
          Empower your logistics experience by choosing pick-up and delivery
          locations in the application as per convenience. With our customizable
          options, you're in control for a seamless and personalized shipping
          experience"
        </p>
        <div
          className={`buttons d-flex flex-column flex-md-row gap-2 align-items-center py-auto short-slide-left ${
            inView ? "short-slide-reset" : ""
          }`}
        >
          <button>Efficient and sustainable transportation</button>
          <p className="arrow mt-3">&#x27F6;</p>
          <button>Applications for efficient transportations</button>
        </div>
      </div>
      <div
        className={`right-section w-100 slide-right ${
          inView ? "slide-reset" : ""
        } `}
      >
        <img src={image} alt="map" />
      </div>
    </div>
  );
}
