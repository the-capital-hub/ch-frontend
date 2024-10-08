import React from "react";

export default function Greeting() {
  return (
    <>
      {/* TCH logo */}
      <div
        className="d-flex justify-content-center align-items-center bg-light rounded-circle shadow-sm border mx-3"
        style={{ height: "60px", width: "60px" }}
      >
        <img
          src="https://res.cloudinary.com/drjt9guif/image/upload/v1698409124/TheCapitalHub/users/profilePictures/vwy3v5c0tq1hbloqsnlx.webp"
          alt="The Capital HUB profile"
          height={"50px"}
          width={"50px"}
          style={{ objectFit: "cover" }}
          className="rounded-circle"
        />
      </div>
      {/* Intro */}
      <div className="chat_box">
        <p className="m-0">
          Hello, I am Lupe, Your Capital Hub chat assistant!
        </p>
        <p className="m-0">I am here to help you complete your profile.</p>
      </div>
    </>
  );
}
