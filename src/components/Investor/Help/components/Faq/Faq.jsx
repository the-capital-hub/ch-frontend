import React from "react";
import question from "./question";

import "./Faq.scss";

export default function Faq() {
  return (
    <div className="accordion d-flex flex-column gap-3" id="accordionExample">
      {question.map((qaPair, index) => (
        <div className="accordion-item rounded-2" style={{overflow:"hidden"}}>
          <h2 className="accordion-header" id={`heading${index}`}>
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index}`}
              aria-expanded="false"
              aria-controls={`collapse${index}`}
              style={{boxShadow:"none",color:"#fff"}}
            >
              {qaPair.q}
            
            </button>
          </h2>
          <div
            id={`collapse${index}`}
            className="accordion-collapse collapse"
            aria-labelledby={`heading${index}`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <p>
                {qaPair.a}
               
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
