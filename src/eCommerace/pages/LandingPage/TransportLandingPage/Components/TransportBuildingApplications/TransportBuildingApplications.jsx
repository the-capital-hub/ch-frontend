import React from "react";
import { useInView } from "react-intersection-observer";
// import { Link } from "react-router-dom";

export default function TransportBuildingApplications({ image }) {
  const { inView, ref } = useInView({
    triggerOnce: true,
    fallbackInView: true,
    threshold: 0.5,
    // rootMargin: "-5%",
  });

  return (
    <div
      className={`second-section container mx-auto d-flex flex-column  justify-content-evenly flex-md-row p-5 align-items-center ${
        inView ? "" : ""
      } overflow-hidden`}
      ref={ref}
    >
      <div className={`left-section ${inView ? "" : ""}`}>
        <img src={image} alt="white-truck" />
      </div>
      <div className={`right-section d-flex flex-column ${inView ? "" : ""}`}>
        <h1
          className={`slide-up ${
            inView ? "opacity-1 slide-reset" : "opacity-0"
          }`}
        >
          {" "}
          Building efficient transportation applications
        </h1>
        <p
          className={`short-slide-up ${
            inView ? "opacity-1 short-slide-reset" : "opacity-0"
          }`}
        >
          Our shared vision and mission in building logistics applications are
          dedicated to connecting businesses and individuals, ensuring timely
          deliveries, fostering global connectivity, and prioritizing customer
          satisfaction and environmental responsibility
        </p>
        {/* <p>
            Lorem ipsum dolor sit amet consectetur. At consequat purus hendrerit
            proin risus Sit purus ante dictum in malesuada id. it purus ante
            dictum in malesuada id.
          </p> */}
        <a href="#contact-us" className="LinkBtn">
          Get in touch
        </a>
        {/* <div className="number-div d-flex flex-column  justify-content-evenly flex-md-row">
            <div className="users">
              <h3>255k+</h3>
              <p>User’s use app</p>
            </div>
            <div className="features">
              <h3>100+</h3>
              <p>Features in apps</p>
            </div>
            <div className="rating">
              <h3>5.0</h3>
              <p>Rating for app</p>
            </div>
          </div> */}
      </div>
    </div>
  );
}
