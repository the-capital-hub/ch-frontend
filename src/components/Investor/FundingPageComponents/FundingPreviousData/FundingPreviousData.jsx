import React from "react";
import "./FundingPreviousData.scss";
import { useSelector } from "react-redux";
import { selectFundingQuestions } from "../../../../Store/features/user/userSlice";
import { fundingQuestions } from "../../../../constants/Startups/FundingInfo";

export default function FundingPreviousData({ setShowForm }) {
  const fundingViaCapitalHubQuestions = useSelector(selectFundingQuestions);

  return (
    <div className="funding-previous-wrapper px-3 px-lg-5 d-flex flex-column gap-4">
      {Object.keys(fundingQuestions).map((question, index) => {
        return (
          <fieldset key={question}>
            <legend className="fs-5">{fundingQuestions[question]}</legend>
            <p className="">{fundingViaCapitalHubQuestions[question]}</p>
          </fieldset>
        );
      })}

      {/* New Submission */}
      <button
        type="button"
        className="btn btn-startup fs-6 d-flex align-items-center justify-content-center gap-2 w-50 mx-auto"
        onClick={() => setShowForm(true)}
        data-bs-theme="dark"
      >
        New Submission
      </button>
    </div>
  );
}
