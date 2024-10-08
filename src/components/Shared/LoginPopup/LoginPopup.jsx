import React from "react";
import "./LoginPopup.scss";
import MaxWidthWrapper from "../MaxWidthWrapper/MaxWidthWrapper";
import { Link } from "react-router-dom";

export default function LoginPopup({ children }) {
  return (
    <div className="login-popup-container bg-white shadow-lg">
      <MaxWidthWrapper>
        <div className="login-message-container py-4 px-2 px-md-4 d-flex flex-column gap-3 align-items-center">
          {/* Children */}
          {children}

          {/* Action links */}
          <div className="action_links d-flex flex-column flex-md-row align-items-center gap-1 gap-md-3">
            <Link
              to={"/login"}
              className="btn btn-primary text-white fs-5"
              style={{ width: "200px" }}
            >
              Login
            </Link>
            <p className="m-0">Or</p>
            <Link
              to={"/signup"}
              className="btn btn-secondary fs-5"
              style={{ width: "200px" }}
            >
              Create Account
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
