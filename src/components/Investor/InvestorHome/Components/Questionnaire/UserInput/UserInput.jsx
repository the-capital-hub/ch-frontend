import React from "react";
import IconSend from "../../../../SvgIcons/IconSend";

export default function UserInput({
  question,
  answer,
  handleAnswerChange,
  handlePostAnswer,
}) {
  return (
    <form className="user_input_container border-top p-3 d-flex align-items-center gap-3">
      <textarea
        type="text"
        name="answer"
        id="answer"
        placeholder="Type here..."
        className="user_input border-0 px-3 py-4 rounded-4"
        value={question?.options?.length > 0 ? "" : answer}
        onChange={handleAnswerChange}
        autoFocus
        rows={1}
        disabled={!question || question?.options?.length > 0}
      />
      <button
        type="submit"
        className="send_btn d-flex align-items-center justify-content-center"
        onClick={handlePostAnswer}
      >
        <IconSend style={{ marginLeft: "8px" }} />
      </button>
    </form>
  );
}
