import React from "react";
import { Link } from "react-router-dom";
import pramodImg from "../../../../Images/aboutUs/Pramod.jpeg";
import "./Expert.scss";
import { useInView } from "react-intersection-observer";

export default function Expert() {
  const { inView, ref } = useInView({
    triggerOnce: true,
    fallbackInView: true,
    threshold: 0.5,
    // rootMargin: "-5%",
  });

  return (
    <section
      className={`container mx-auto contact-our-team row justify-content-around bg-black rounded-4 px-2 px-md-5 py-5 align-items-center ${
        inView ? "" : ""
      } overflow-hidden`}
      ref={ref}
    >
      <div className={`col-8 col-md-4 ${inView ? "" : ""}`}>
        <img
          className={`rounded-circle ${inView ? "ripple-out" : ""}`}
          src={pramodImg}
          width={250}
          height={250}
          style={{ objectFit: "cover" }}
          alt="Cost Savings"
        />
      </div>
      <div className={`col-10 col-md-6 mt-3 mt-md-0 d-flex flex-column gap-3`}>
        <h3 className={`text-white slide-up ${inView ? "slide-reset" : ""}`}>
          "Dejection is a sign of failure but it becomes the cause of success"
        </h3>
        <p
          className={`text-secondary short-slide-up ${
            inView ? "short-slide-reset" : ""
          }`}
        >
          Founder and CEO of The Capital HUB, is a dynamic entrepreneur known
          for his innovative approach. He values structured processes but enjoys
          unscripted conversations, balancing formality and informality. Pramod
          is a visionary who dives deep into details and foresees the future,
          offering steadfast support to founders in shaping their dreams with
          conviction and individuality at Capital HUB.
        </p>
        <h4
          className={`text-light short-slide-up ${
            inView ? "short-slide-reset" : ""
          }`}
        >
          Pramod Badiger
        </h4>
        <Link
          to="https://www.linkedin.com/in/pramod-badiger-a3226618b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          className="LinkBtn btn btn-primary rounded-pill text-white px-4 py-2 fs-12"
          style={{ width: "max-content" }}
        >
          Connect with our Expert
        </Link>
      </div>
    </section>
  );
}
