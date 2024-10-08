import React from "react";
import "./ServiceStats.scss";
import { useInView } from "react-intersection-observer";

export default function ServiceStats() {
  const { inView, ref } = useInView({
    triggerOnce: true,
    fallbackInView: true,
    threshold: 0.5,
    // rootMargin: "-5%",
  });

  return (
    <div className="service_stats_wrapper w-100 overflow-hidden">
      <div
        className={`container stats_container mx-auto py-5 ${inView ? "" : ""}`}
        ref={ref}
      >
        <div className={`stats_div ${inView ? "" : ""}`}>
          <h4 className={`text-captalize ${inView ? "slide-reset" : ""}`}>
            <span
              className={`${inView ? "animate_count animate_count_up-20" : ""}`}
            ></span>
            +
          </h4>
          <p className={`text-capitalize ${inView ? "short-slide-reset" : ""}`}>
            fundraising done
          </p>
        </div>

        <div className={`stats_div ${inView ? "" : ""}`}>
          <h4 className={`text-captalize ${inView ? "slide-reset" : ""}`}>
            <span
              className={`${inView ? "animate_count animate_count_up-40" : ""}`}
            ></span>
            +
          </h4>
          <p className={`text-capitalize ${inView ? "short-slide-reset" : ""}`}>
            Development Clients
          </p>
        </div>

        <div className={`stats_div ${inView ? "" : ""}`}>
          <h4 className={`text-captalize ${inView ? "slide-reset" : ""}`}>
            #
            <span
              className={`${
                inView ? "animate_count animate_count_down-1" : ""
              }`}
            ></span>
          </h4>
          <p className={`text-capitalize ${inView ? "short-slide-reset" : ""}`}>
            Lowest Market Rate
          </p>
        </div>

        <div className={`stats_div ${inView ? "" : ""}`}>
          <h4 className={`text-captalize ${inView ? "slide-reset" : ""}`}>
            <span
              className={`${inView ? "animate_count animate_count_up-10" : ""}`}
            ></span>
            X
          </h4>
          <p className={`text-capitalize ${inView ? "short-slide-reset" : ""}`}>
            Faster Delivery
          </p>
        </div>
      </div>
    </div>
  );
}
