import React from "react";
import { InView } from "react-intersection-observer";

const options = {
  threshold: 0.5,
  fallbackInView: true,
  triggerOnce: true,
};

export default function FtechSecurity() {
  return (
    <section className="trusted-security container mx-auto overflow-hidden">
      <h3>
        <span className="blue">Trusted security</span>
        <span className="orange"> measures</span>
      </h3>
      <InView {...options}>
        {({ inView, ref }) => (
          <div
            className={`trapezoid-container row justify-content-center`}
            ref={ref}
          >
            <div
              className={`trapezoid col-md-5 col-lg-4 rounded shadow p-3 slide-left ${
                inView ? "slide-reset" : ""
              }`}
            >
              <i>
                <h4 className="light-blue">Encryption</h4>
                <p>
                  We use the best and most up-to-date encryption measures to
                  ensure top-notch protection of your data
                </p>
              </i>
            </div>
            <div
              className={`trapezoid col-md-5 col-lg-4 rounded shadow p-3 slide-right ${
                inView ? "slide-reset" : ""
              }`}
            >
              <i>
                <h4 className="light-blue">Multi-factor Authentication</h4>
                <p>
                  We use this in parallel with encryption to ensure maximum data
                  protection for our users
                </p>
              </i>
            </div>
          </div>
        )}
      </InView>
    </section>
  );
}
