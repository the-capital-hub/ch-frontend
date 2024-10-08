import React from "react";
import IconTick from "../../../../SvgIcons/IconTick";
import SpinnerBS from "../../../../../Shared/Spinner/SpinnerBS";

export default function CurrentQuestion({
  question,
  answer,
  handleAnswerSelect,
  handleBackToCategories,
  loading,
  handlePostAnswer,
}) {
  return (
    <div className="current_question mt-5">
      {question && (
        <div className="chat_box">
          <p className="m-0">{question.question}</p>
        </div>
      )}
      {/* Options */}
      {question && (
        <div className="d-flex gap-3 align-items-center flex-wrap mx-3 ">
          {question?.options?.map((option) => {
            return (
              <button
                key={option}
                type="button"
                className={`position-relative option_button ${(Array.isArray(answer) ? answer.includes(option) : option === answer) && "selected"
                  }`}
                onClick={(e) => handleAnswerSelect(e, option)}
              >
                {option}
                {(Array.isArray(answer) ? answer.includes(option) : option === answer) && (
                  <div className="position-absolute select_badge">
                    <IconTick />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
      <div className="d-flex align-items-center gap-3 mx-3">
        {/* Submit button for questions with options */}
        {question?.options.length && (
          <button
            type="submit"
            className="option_button back_button align-self-start"
            onClick={handlePostAnswer}
          >
            Submit
          </button>
        )}
        {/* Go back to categories */}
        {question && (
          <button
            type="button"
            className="option_button back_button align-self-start"
            onClick={handleBackToCategories}
          >
            Back
          </button>
        )}
      </div>
      {loading && (
        <div className="d-flex justify-content-center align-items-center py-3">
          <SpinnerBS spinnerClass="spinner-grow" colorClass={"color_main"} />
        </div>
      )}
    </div>
  );
}
