import React from "react";
import "./OurClients.scss";
// import { Link } from "react-router-dom";
import assets from "../../../../Images/Portfolio/PortfolioPage";
import { useInView } from "react-intersection-observer";

export default function OurClients({ className }) {
  // const scrollToContact = () => {
  //   const contactElement = document.getElementById("contact-us");
  //   if (contactElement) {
  //     window.scrollTo({
  //       top: contactElement.offsetTop,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  const { inView, ref } = useInView({
    triggerOnce: true,
    fallbackInView: true,
    threshold: 0.5,
    // rootMargin: "-5%",
  });

  return (
    <div
      className={`our_clients_wrapper w-100 ${className} ${
        inView ? "" : ""
      } overflow-hidden `}
      ref={ref}
    >
      <div className="our_clients_container container mx-auto px-5 py-5">
        <div
          className={`clients_heading slide-left ${
            inView ? "slide-reset" : ""
          }`}
        >
          <h1>Our Clients</h1>
          <p>We do game-changing work for game-changing companies.</p>
          {/* <Link to={"/contactus"} className="text-capitalize work_button"> */}
          <a
            href="#contact-us"
            // onClick={scrollToContact}
            className="text-capitalize work_button"
          >
            <span>Work with us</span>
          </a>
        </div>

        {/* Client Logos */}
        <div
          className={`client_logos d-flex flex-wrap gap-3 gap-lg-4 short-slide-right ${
            inView ? "short-slide-reset" : ""
          } `}
        >
          <img src={assets.yesgobus} alt="logo" width={100} height={80} />
          <img
            src={assets.impactshaala}
            alt="logo"
            width={200}
            height={"auto"}
            style={{ objectFit: "contain" }}
          />
          {/* <img
            src={assets.capitalHub}
            alt="logo"
            width={200}
            height={80}
            style={{ objectFit: "contain" }}
          /> */}
          <img
            src={assets.circleIcon}
            alt="logo"
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
          />
          <img
            src={assets.tiffinbuddy_logo}
            alt="logo"
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
          />
          <img
            src={assets.uipe_logo}
            alt="logo"
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
