import React, { useRef } from "react";
import { useSelector } from "react-redux";

export default function InfoField({ isEditing, data, name, legend, loading }) {
  const isMobileView = useSelector((state) => state.design.isMobileView);
  const textRef = useRef();

  // Handle Info Change
  function handleInfoChange(e) {
    // Resize
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + 2 + "px";
  }

  // Stop event propagation when clicking inside textarea
  function handleTextAreaClick(e) {
    e.stopPropagation();
  }

  return (
    <fieldset className="d-flex flex-column">
      {isEditing || !data ? (
        <textarea
          defaultValue={data === "" ? null : data}
          placeholder="Add your answer"
          name={name}
          onChange={handleInfoChange}
          className="profile_edit_field w-100"
          rows={isMobileView ? 5 : 3}
          ref={textRef}
          style={{ resize: "none" }}
          onClick={handleTextAreaClick} // Added onClick handler
        />
      ) : (
        <p
          className="text-secondary"
          data-empty={data === "" || !data ? true : false}
        >
          {data || "Click on edit to add Investment Philosophy"}
        </p>
      )}
    </fieldset>
  );
}
