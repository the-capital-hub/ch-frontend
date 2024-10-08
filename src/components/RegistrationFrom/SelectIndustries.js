import React, { useState } from "react";
import { data } from "./data";
import { updateUserAPI } from "../../Service/user";

const SelectIndustries = ({ setFromStep, setSuccessType }) => {
  const [industry, setIndustry] = useState(0);
  const [diversityMetrics, setDiversityMetrics] = useState([]);
  const [sectorPreferences, setSectorPreferences] = useState([]);
  const handelNext = async () => {
    const res = await updateUserAPI({ diversityMetrics, sectorPreferences });
    if (res.status === 200) {
      setFromStep(4);
      setSuccessType("user");
    }
  };
  return (
    <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
      <div
        className="popup"
        style={{ padding: "1rem", marginRight: "2rem", maxWidth: "500px" }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              width: "100%",
              border: industry === index ? "1px solid #ffb27d" : "1px solid",
              borderRadius: "10px",
              padding: "10px",
              marginBottom: "0.5rem",
              fontWeight: "bold",
              cursor: "pointer",
              color: industry === index ? "#ffb27d" : "black",
            }}
            onClick={() => {
              setIndustry(index);
              setDiversityMetrics([...diversityMetrics, item.title]);
            }}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="popup">
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {data[industry].icons.map((item, index) => (
                <div
                  style={{
                    maxWidth: "110px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    
                    margin: "4px",
                    cursor: "pointer"
                  }}
                  key={index}
                  onClick={() => {
                    if (sectorPreferences.includes(item.title)) {
                      const data = sectorPreferences.filter(
                        (i) => i !== item.title
                      );
                      setSectorPreferences(data);
                    } else {
                      setSectorPreferences([...sectorPreferences, item.title]);
                    }
                  }}
                >
                  <div style={{border: sectorPreferences.includes(item.title)
                      ? "2px solid #fd5901"
                      : "2px solid #fff",
                      borderRadius: "15px",}}>
                    <img src={item.icon} alt={item.icon} />
                  </div>
                  <p style={{color: sectorPreferences.includes(item.title)
                    ? " #fd5901"
                    : "black"}}>{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button className="from_btn startup" onClick={handelNext}>
          Next
        </button>
        <button
        onClick={() => {
          setFromStep(4);
          setSuccessType("user");
        }}
        className="from_btn"
      >
        {">>"}Skip
      </button>
      </div>
    </div>
  );
};

export default SelectIndustries;
