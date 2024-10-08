import React from "react";
import { Link } from "react-router-dom";
import GirlIcon from "../../../../Images/GirlIcons.png";
import "./LandingHero.scss";
import { InView } from "react-intersection-observer";

const options = {
  threshold: 0.5,
  fallbackInView: true,
  triggerOnce: true,
};

export default function LandingHero() {
  return (
    <div className="row overflow-hidden">
      <div className="row">
        <div className="d-md-none d-flex col-md-4 image_section ">
          {/* Mobile Image */}
          <InView {...options}>
            {({ inView, ref }) => (
              <img
                src={GirlIcon}
                alt="img1"
                className={`mx-auto w-100 slide-right ${
                  inView ? "slide-reset" : ""
                }`}
                style={{ marginTop: 0 }}
                ref={ref}
                loading="eager"
              />
            )}
          </InView>
        </div>

        {/* Hero Text */}
        <InView {...options}>
          {({ inView, ref }) => (
            <div
              className=" col-md-8 title__text d-flex flex-column justify-content-center"
              ref={ref}
            >
              <h1
                className={`short-slide-left ${
                  inView ? "short-slide-reset" : ""
                }`}
              >
                Fund your next big idea into a &nbsp;
                <span style={{ color: "#FD5901" }}>startup now !</span>
              </h1>
              <h2
                className={`short-slide-left ${
                  inView ? "short-slide-reset" : ""
                }`}
              >
                Register now as
              </h2>
              <div
                className={`buttons_row slide-left ${
                  inView ? "slide-reset" : ""
                }`}
              >
                <Link to="/signup">
                  <button className="btn1 btn-primary">Start Up</button>
                </Link>
                <Link to="/signup">
                  <button className="btn2 btn-primary">Investor</button>
                </Link>
              </div>
            </div>
          )}
        </InView>

        {/* Image for desktop */}
        <div className="d-none d-md-block col-md-4 image_section ">
          <InView {...options}>
            {({ inView, ref }) => (
              <img
                src={GirlIcon}
                alt="img1"
                className={`mx-auto slide-right ${inView ? "slide-reset" : ""}`}
                width={"100%"}
                ref={ref}
              />
            )}
          </InView>
        </div>
      </div>

      {/* Welcome text */}
      <section className="welcome_section my-5 pt-3 pb-2">
        <InView {...options}>
          {({ inView, ref }) => (
            <h6
              className={`slide-right ${
                inView ? "slide-reset growIn-short" : ""
              }`}
              ref={ref}
            >
              Welcome to The Capital Hub, Our integrated platform, where
              investors, startups, and professionals come together to unlock new
              opportunities and build meaningful connections. Whether your're
              seeking investment opportunities, looking to fund your startup, or
              eager to expand your network, our platform offers the perfect
              ecosystem to fulfill your goals
            </h6>
          )}
        </InView>
      </section>

      <div className="container section_container">
        <InView {...options}>
          {({ inView, ref }) => (
            <h2 className={`slide-up ${inView ? "slide-reset" : ""}`} ref={ref}>
              Who are &nbsp;<span style={{ color: "#FD5901" }}>we ?</span>
            </h2>
          )}
        </InView>
        <InView {...options}>
          {({ inView, ref }) => (
            <section
              className={`welcome_section short-slide-up ${
                inView ? "short-slide-reset" : ""
              }`}
              ref={ref}
            >
              <h6>
                The Capital Hub team comprises exceptional individuals with a
                diveerse range of expertise, spanning investment banking,
                startup management banking, startup management, software
                development, advisory services, and more. Our collective
                dedication is aimed at empowering startups to flourish and
                thrive in today's dynamic market. Together, we are committed to
                providing the guidance and support needed for your startup to
                reach new heights of success.
              </h6>
            </section>
          )}
        </InView>
      </div>
    </div>
  );
}
