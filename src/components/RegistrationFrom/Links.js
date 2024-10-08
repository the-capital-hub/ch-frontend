import React, { useState } from "react";
import { postStartUpData } from "../../Service/user";

const Links = ({ setFromStep, setSuccessType }) => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
  });
  const handelNext = async () => {
    const response = await postStartUpData({
      socialLinks,
    });
    if (response.status === 200) {
      setFromStep(9);
      setSuccessType("company");
    }
  };
  return (
    <div className="popup" style={{ padding: "1rem 2rem" }}>
      <div className="input_container" style={{marginTop:"0.8rem"}}>
        <label>Facebook</label>
        <input
        type="text"
        id="facebook"
        name="facebook"
          onChange={(e) => {
            setSocialLinks({ ...socialLinks, facebook: e.target.value });
          }}
        />
      </div>
      <div className="input_container" style={{marginTop:"0.8rem"}}>
        <label>Instagram</label>
        <input
        type="text"
        id="instagram"
        name="instagram"
          onChange={(e) => {
            setSocialLinks({ ...socialLinks, instagram: e.target.value });
          }}
        />
      </div>
      <div className="input_container" style={{marginTop:"0.8rem"}}>
        <label>Twitter</label>
        <input
        type="text"
        id="twitter"
        name="twitter"
          onChange={(e) => {
            setSocialLinks({ ...socialLinks, twitter: e.target.value });
          }}
        />
      </div>
      <button className="from_btn startup" onClick={handelNext}>
        Next
      </button>
    </div>
  );
};

export default Links;
