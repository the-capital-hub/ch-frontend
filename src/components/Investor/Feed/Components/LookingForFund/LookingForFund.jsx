import React from "react";
import "./LookingForFund.scss";
import { Link } from "react-router-dom";

export default function LookingForFund() {
  return (
    <div className="looking_for_fund_wrapper bg-black text-white py-3">
      <div className="d-flex align-items-center justify-content-around justify-content-md-between px-md-4 flex-wrap gap-3">
        <p className="m-0 fs-5">Apply for funding.</p>

        <Link
          to={"/funding"}
          className="btn orange_button d-flex align-items-center justify-content-center"
        >
          <span>Click Here</span>
        </Link>
      </div>
    </div>
  );
}
