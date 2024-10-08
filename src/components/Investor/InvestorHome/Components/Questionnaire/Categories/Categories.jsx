import React from "react";
import { OPTIONS } from "../Questionnaire";

export default function Categories({ option, handleOptionSelect, countData }) {
  return (
    <>
      <div className="chat_box">
        <p className="m-0">
          Start by picking the category to fill your information.
        </p>
      </div>
      <div className="chat_box d-flex align-items-start gap-4 p-0 border-0 shadow-none flex-wrap">
        {(option === "Company" || option === null) && (
          <button
            type="button"
            className="category_button"
            onClick={(e) => handleOptionSelect(e, OPTIONS.company)}
          >
            {OPTIONS.company.text} ({countData?.companyQuestionCount})
          </button>
        )}
        {(option === "Personal" || option === null) && (
          <button
            type="button"
            className="category_button"
            onClick={(e) => handleOptionSelect(e, OPTIONS.personal)}
          >
            {OPTIONS.personal.text} ({countData?.personalQuestionCount})
          </button>
        )}
      </div>
    </>
  );
}
