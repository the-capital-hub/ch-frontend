import React, { useState } from "react";
import "./Reviewcarousel.scss";
import assets from "../../../../Images/Ecommerace/FoodLandingPage/index";

function Reviewcarousel({ reviews }) {
  const [buttonState, setButtonState] = useState(0);

  return (
    <div className="carousel-review">
      <div className="reviews d-flex   justify-content-evenly flex-column flex-md-row ">
        <div className="left-review w-100 ">
          <div className="review">
            <p>{reviews[buttonState].text}</p>

            <div className="user-data d-flex flex-column  ">
              <div>
                <img src={reviews[buttonState].img} alt="" />
              </div>

              <div className=" data-div w-100">
                <h5>{reviews[buttonState].name}</h5>
                <p>{reviews[buttonState].work}</p>
              </div>
              <div className="star-rating w-100 d-flex   m-auto ">
                {Array.from({ length: reviews[buttonState].star }).map(
                  (_, i) => (
                    <img
                      key={i}
                      src={assets.star}
                      alt="star"
                      className="star-rating"
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="right-review w-100">
          <div className="review">
            <p>{reviews[buttonState + 1].text}</p>

            <div className="user-data d-flex flex-column   ">
              <div>
                <img src={reviews[buttonState + 1].img} alt="" />
              </div>

              <div className="data-div w-100">
                <h5>{reviews[buttonState + 1].name}</h5>
                <p>{reviews[buttonState + 1].work}</p>
              </div>
              <div className="star-rating w-100 d-flex   m-auto ">
                {Array.from({ length: reviews[buttonState + 1].star }).map(
                  (_, i) => (
                    <img
                      key={i}
                      src={assets.star}
                      alt="star"
                      className="star-rating"
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            setButtonState(0);
          }}
        ></button>
        <button
          onClick={() => {
            setButtonState(2);
          }}
        ></button>
        <button
          onClick={() => {
            setButtonState(4);
          }}
        ></button>
      </div>
    </div>
  );
}

export default Reviewcarousel;
