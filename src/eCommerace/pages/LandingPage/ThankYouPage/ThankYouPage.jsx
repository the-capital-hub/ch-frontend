import React from "react";
import "./ThankYouPage.scss";
import FormResponse from "../../../Components/Shared/FormResponse/FormResponse";

export default function ThankYouPage() {
  return (
    <div className="thankyou_page_wrapper">
      <div className="container mx-auto p-0">
        <div className="thankyou_page_container h-100 d-flex justify-content-center align-items-center">
          <FormResponse />
        </div>
      </div>
    </div>
  );
}
