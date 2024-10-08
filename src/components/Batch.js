import React from "react";
import BatchImag from "../Images/tick-mark.png"

const Batch = ({ isSubscribed }) => {
  return (
    <>
      {isSubscribed && (
        <div
          style={{
            position: "absolute",
            marginLeft: "6rem",
            top: "8rem",
            borderRadius: "50%",
            width: "1.5rem",
            height: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={BatchImag}
            style={{
              width: "1.2rem",
              height: "1.2rem",
              objectFit: "contain",
            }}
            alt="Batch Icon"
          />
        </div>
      )}
    </>
  );
};

export default Batch;
