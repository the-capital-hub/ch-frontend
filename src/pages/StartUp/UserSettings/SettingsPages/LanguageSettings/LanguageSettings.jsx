import React, { useEffect } from "react";
import "./LanguageSettings.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function LanguageSettings() {
  const navigate = useNavigate();
  const language =
    "en,hi,te,ta,kn,mr,bn,gu,ml,pa,or,as,ur,kok,ne,maithili,santali,kashmiri,bodo,dogri,manipuri,khasi,garo,mizo";
  useEffect(() => {
    const initGoogleTranslate = () => {
      const translateElement = document.getElementById(
        "google_translate_element"
      );

      if (translateElement) {
        translateElement.innerHTML = "";
      }

      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;

      script.onload = () => {
        window.googleTranslateElementInit = () => {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: language,
              layout:
                window.google.translate.TranslateElement.InlineLayout.TOP_RIGHT,
            },
            "google_translate_element"
          );
        };
      };

      document.body.appendChild(script);
    };

    initGoogleTranslate();
  }, []);

  return (
    <div className="language-settings">
      <h4 className="m-0 px-3 py-3 d-flex align-items-center gap-2">
        <Button
          className="back-button btn-sm rounded-circle border-none"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={25} />
        </Button>
        Choose a Language
      </h4>
      <div className="border-top px-3 py-3 d-flex flex-column gap-2">
        <span className="fs-6 text-secondary">
          Select the language you use on Capital hub.
        </span>
        {/* <Dropdown>
          <Dropdown.Toggle id="dropdown-basic">
            Select language
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {languages.map((item) => (
              <Dropdown.Item key={item.code} href="#/action-1">
                {item.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown> */}
        <div id="google_translate_element"></div>

        <span className="fs-6 text-secondary">
          Let us know which language you’re most comfortable using on Capital Hub. You can change it back at any time.
        </span>
      </div>
    </div>
  );
}

export default LanguageSettings;
