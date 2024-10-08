import React from "react";
import { InView } from "react-intersection-observer";

const options = {
  threshold: 0.5,
  fallbackInView: true,
  triggerOnce: true,
};

export default function FoodBestFeatures({ image }) {
  return (
    <div className="third-section d-flex justify-content-center flex-column flex-md-row rounded overflow-hidden">
      {/* <div className="left-section">
          <h6>Best Features</h6>
          <h1>
            Get Upto <span>50%</span> Offers On
          </h1>
          <h1>Festival Season!</h1>
          <p>
            Celebrate the festive spirit with joy and savings! Enjoy exclusive
            offers of up to 50% off on a wide range of products and experiences
            during this festival season. Don't miss out.
          </p>
          <Link to="/web-development" className="LinkBtn">Taking Us</Link>
        </div> */}
      <InView {...options}>
        {({ inView, ref }) => (
          <div
            className={`right-section slide-up ${inView ? "slide-reset" : ""}`}
            ref={ref}
          >
            <img src={image} alt="halfMobile" className="w-75 " />
          </div>
        )}
      </InView>
    </div>
  );
}
