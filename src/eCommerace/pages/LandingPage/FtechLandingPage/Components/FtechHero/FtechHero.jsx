import React from "react";
import {
  IntroMain,
  IntroGetLoan,
} from "../../../../../../Images/Ecommerace/FtechlandingPage";
import { InView } from "react-intersection-observer";

export default function FtechHero() {
  const options = {
    threshold: 0.5,
    fallbackInView: true,
    triggerOnce: true,
  };

  return (
    <>
      <InView {...options}>
        {({ inView, ref }) => (
          <div className="" ref={ref}>
            <h2
              className={`text-center short-slide-left ${
                inView ? "short-slide-reset" : ""
              }`}
            >
              Build your FinTech application with Capital HUB!
              {/* <span className="orange">, for you</span> */}
            </h2>
            <h6
              className={`text-center my-2 my-lg-4 slide-left ${
                inView ? "slide-reset" : ""
              }`}
            >
              {/* Build your business as Capital HUB builds your application. */}
              Let Capital HUB Shape Your App, While You Shape Your Success!{" "}
            </h6>
          </div>
        )}
      </InView>
      <div className="intro-main-img">
        <InView {...options}>
          {({ inView, ref }) => (
            <img
              src={IntroMain}
              alt="introduction"
              className={`mx-auto ${inView ? "fadeIn" : ""}`}
              ref={ref}
            />
          )}
        </InView>
        <InView {...options}>
          {({ inView, ref }) => (
            <img
              src={IntroGetLoan}
              alt="get a loan"
              className={`mx-auto mb-5 slide-up ${inView ? "slide-reset" : ""}`}
              ref={ref}
            />
          )}
        </InView>
      </div>
    </>
  );
}
