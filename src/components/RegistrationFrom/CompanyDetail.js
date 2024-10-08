import React from "react";

const CompanyDetail = ({ setFromStep }) => {
  return (
    <div className="popup" style={{ padding: "1rem 2rem" }}>
      <div className="input_container" style={{ marginTop: "0.8rem" }}>
        <label>Brand Name</label>
        <input />
      </div>
      <div className="input_container" style={{ marginTop: "0.8rem" }}>
        <label>Legal Name</label>
        <input />
      </div>
      <div className="input_container" style={{ marginTop: "0.8rem" }}>
        <label>Website Link</label>
        <input />
      </div>
      <div className="input_container" style={{ marginTop: "0.8rem" }}>
        <label>Stage of Company</label>
        <select style={{width:"100%"}}>
          <option>Bootstrap </option>
          <option>Incubated </option>
          <option>Angel invested </option>
          <option>Pre seed</option>
          <option>Seed</option>
          <option>Series A and above</option>
        </select>
      </div>
      <button
        className="from_btn startup"
        onClick={() => {
          setFromStep(6);
        }}
      >
        Next
      </button>
      <button
        onClick={() => {
          setFromStep(6);
        }}
        className="from_btn"
      >
        {">>"}Skip
      </button>
    </div>
  );
};

export default CompanyDetail;
