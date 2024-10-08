import React from "react";
import "./FormResponse.scss";
import IconCircleTick from "../SvgIcons/IconCircleTick";
import { useNavigate } from "react-router-dom";

export default function FormResponse() {
  const navigate = useNavigate();

  return (
    <div className="response_wrapper d-flex flex-column gap-5 px-3 px-md-0">
      <div className="response_container bg-white shadow-lg rounded-4 py-5 px-3 px-md-5 d-flex flex-column justify-content-center align-items-center">
        <h1 className="text-center grow_in">
          Thank you for your{" "}
          <span className="color-currentTheme">Submission!</span>
        </h1>
        <span className="grow_in">
          <IconCircleTick height="3rem" width="3rem" color="#fd5901" />
        </span>
      </div>

      <div className="action_links d-flex justify-content-center gap-5">
        <button className="btn btn-light" onClick={() => navigate(-1)}>
          Go Back
        </button>
        <button className="btn btn-light" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
    </div>
  );
}
