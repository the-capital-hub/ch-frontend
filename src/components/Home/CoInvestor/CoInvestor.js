import React from "react";
import "./coinvestor.scss";
import Accel from "../../../Images/Accel.svg";
import RTP from "../../../Images/RTP.svg";
import Zoover from "../../../Images/Zoover2.svg";
import Nexus from "../../../Images/Nexus Mods.svg";
import Matrix from "../../../Images/Matrix .svg";
import Vhal from "../../../Images/Vhall .svg";
import YCom from "../../../Images/Y Combinator.png";
import LightSpeedIcon from "../../../Images/LightSpeed.svg";
import Kalari from "../../../Images/KalaariCapital.svg";
import GoogleIcon from "../../../Images/Google.svg";
import MicrosoftIcon1 from "../../../Images/Microsoft1.svg";


const CoInvestor = () => {
  return (
    <>
      <div className="container brand_icon_container">
        <div className="row ">
          <h2 style={{ textAlign: "center" }}>Co-investors</h2>
          <div className="col-2 brand_icon d-flex justify-content-center align-items-center">
            <img src={Accel} alt="brans icons" />
          </div>
          <div className="col-2 brand_icon d-flex justify-content-center align-items-center mt-80">
            <img src={RTP} alt="brans icons" />
          </div>
          <div className="col-2 brand_icon d-flex justify-content-center align-items-center">
            <img src={Zoover} alt="brans icons" />
          </div>
          <div className="col-2 brand_icon d-flex justify-content-center align-items-center mt-80">
            <img src={Nexus} alt="brans icons" />
          </div>
          <div className="col-2 brand_icon d-flex justify-content-center align-items-center">
            <img src={Matrix} alt="brans icons" />
          </div>
          <div className="col-2 brand_icon d-flex justify-content-center align-items-center mt-80">
            <img src={Vhal} alt="brans icons" />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-2 brand_icon d-flex justify-content-center align-items-center">
            <img src={YCom} alt="brans icons" />
          </div>
          <div className="col-2 brand_icon d-flex justify-content-center align-items-center ">
            <img src={LightSpeedIcon} alt="brans icons" />
          </div>
          <div className="col-2 brand_icon d-flex justify-content-center align-items-center">
            <img src={Kalari} alt="brans icons" />
          </div>
          <div className="col-2 brand_icon d-flex justify-content-center align-items-center ">
            <img src={GoogleIcon} alt="brans icons" />
          </div>
          <div className="col-2 brand_icon d-flex justify-content-center align-items-center">
            <img src={MicrosoftIcon1} alt="brans icons" />
          </div>
          <div className="col-2 brand_icon d-flex justify-content-center align-items-center ">
            <img src={Vhal} alt="brans icons" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoInvestor;
