import React from "react";
import "./ourcollabration.scss";
import GoogleIcon1 from "../../../Images/Google1.svg";
import MicrosoftIcon from "../../../Images/Microsoft.svg";
import Amazon from "../../../Images/amazon.svg";
import Zoover1 from "../../../Images/Zoover.svg";

const OurCollabration = () => {
  return (
    <>
      <div className="container mb-5 our_collabration_container">
        <div className="row d-flex justify-content-around align-items-center">
          <h2>Our Collaboration</h2>
          <div className="col-md-2 collab_brand_icon d-flex justify-content-center align-items-center">
            <img src={Amazon} alt="brans icons" />
          </div>
          <div className="col-md-2 collab_brand_icon d-flex justify-content-center align-items-center">
            <img src={Zoover1} alt="brans icons" />
          </div>
          <div className="col-md-2 collab_brand_icon d-flex justify-content-center align-items-center">
            <img src={GoogleIcon1} alt="brans icons" />
          </div>
          <div className="col-md-2 collab_brand_icon d-flex justify-content-center align-items-center">
            <img src={MicrosoftIcon} alt="brans icons" />
          </div>
        </div>
      </div>
    </>
  );
};

export default OurCollabration;
