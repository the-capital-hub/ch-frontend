import React, { useState } from "react";
import { postStartUpData } from "../../Service/user";

const CompanyBio = ({ setFromStep }) => {
  const [description, setDescription] = useState("");
  const handelNext = async () => {
    const response = await postStartUpData({
      description,
    });

    if (response.status === 200) {
      setFromStep(8);
    }
  };
  return (
    <div className="popup">
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <label>Write Company Description</label>
        <textarea
          style={{
            width: "100%",
            borderRadius: "10px",
            outline: "none",
            padding: "4px",
            minHeight: "200px",
            fontSize: "14px",
          }}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </div>
      <p style={{ width: "100%", textAlign: "end", fontSize: "12px" }}>
        Min 300 Characters
      </p>
      <button className="from_btn startup" onClick={handelNext}>
        Next
      </button>
    </div>
  );
};

export default CompanyBio;
