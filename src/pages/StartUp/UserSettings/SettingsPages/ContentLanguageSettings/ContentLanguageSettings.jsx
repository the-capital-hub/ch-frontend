import React from "react";
import "./ContentLanguageSettings.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function ContentLanguageSettings() {
  const navigate = useNavigate();

  return (
    <div className="content-language-settings flex-grow-1 ">
      <h4 className="m-0 px-3 py-3 d-flex align-items-center gap-2">
        <Button
          className="back-button btn-sm  rounded-circle border-none"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={15} />
        </Button>
        Select a Content Language
      </h4>
      <div className="border-top px-3 py-3 d-flex flex-column gap-3 ">
        <span className="fs-6 text-secondary">
          Which language do you want content on Capital hub translated into?
        </span>
        <span className="fs-6 text-secondary">
          We'll auto-translate content or show options to translate content such
          as posts and comments to this language and use this information to
          improve your overall Capital hub experience.
        </span>
        <div className="d-flex flex-row align-items-center border-bottom py-2">
          <h5>English (English)</h5>
          <Button className="ms-auto">Change</Button>
        </div>
        <span className="fs-6 text-secondary">
          Which languages do you not want content on Capital hub translated
          from?
        </span>
        <span className="fs-6 text-secondary">
          We won't auto-translate content or show options to translate content
          in these languages and we’ll use this information to improve your
          overall Capital hub experience.
        </span>
        <div>
          <Button>Add a language</Button>
        </div>
      </div>
    </div>
  );
}

export default ContentLanguageSettings;
