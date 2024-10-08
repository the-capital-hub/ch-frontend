import React from "react";
import "./ConsultingServices.scss";
import { useInView } from "react-intersection-observer";

export default function ConsultingServices() {
  const { inView, ref } = useInView({
    triggerOnce: true,
    fallbackInView: true,
    threshold: 0.25,
    // rootMargin: "-5%",
  });

  return (
    <div
      className={`mx-auto help-cards flex-column flex-md-row flex-md-wrap py-5 px-lg-5 ${
        inView ? "" : ""
      } overflow-hidden`}
      ref={ref}
    >
      <div className={`help-card slide-left ${inView ? "slide-reset" : ""}`}>
        <p className="count">01.</p>
        <h6 className="title">
          Stay Informed with Our Product Manager's Timely Insights and Updates
        </h6>

        {/* <Link to="/web-development" className="LinkBtn LinkBtn-blue">
            Contact Us
          </Link> */}
      </div>
      <div
        className={`help-card short-slide-up ${
          inView ? "short-slide-reset" : ""
        }`}
      >
        <p className="count">02.</p>
        <h6 className="title">
          Expert Tech Insights and recommendations from Our Core Team
        </h6>

        {/* <Link to="/web-development" className="LinkBtn">
            Contact Us
          </Link> */}
      </div>
      <div
        className={`help-card short-slide-up ${
          inView ? "short-slide-reset" : ""
        }`}
      >
        <p className="count">03.</p>
        <h6 className="title">
          Specialised and unique Startup Business Consulting That Sets You Apart
        </h6>

        {/* <Link to="/web-development" className="LinkBtn LinkBtn-blue">
            Contact Us
          </Link> */}
      </div>
      <div className={`help-card slide-right ${inView ? "slide-reset" : ""}`}>
        <p className="count">04.</p>
        <h6 className="title">
          Hassle-Free Deployment Managed by Capital HUB Team
        </h6>

        {/* <Link to="/web-development" className="LinkBtn">
            Contact Us
          </Link> */}
      </div>
    </div>
  );
}
