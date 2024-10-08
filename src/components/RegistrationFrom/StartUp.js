import React, { useEffect, useState } from "react";
import UserName from "./UserName";
import { IoIosArrowBack } from "react-icons/io";
import ProfilePick from "./ProfilePick";
import Bio from "./Bio";
import SelectIndustries from "./SelectIndustries";
import Success from "./Success";
import CompanyDetail from "./CompanyDetail";
import CompanyLogo from "./CompanyLogo";
import CompanyBio from "./CompanyBio";
import Links from "./Links";
import Welcome from "./Welcome";

const StartUp = () => {
  const [fromStep, setFromStep] = useState(0);
  const [successType, setSuccessType] = useState("user");
  const [para, setPara] = useState({
    title: "Create a Username",
    paragraph:
      "Add a username or use our suggestion. You can change this at any time",
  });
  useEffect(() => {
    switch (fromStep) {
      case 1:
        setPara({
          title: "Add a profile picture",
          paragraph:
            "Add a profile picture so your investore and founder's know ti's you. Everyone wil be able to see your picture",
        });
        break;
      case 2:
        setPara({
          title: "Add a Bio",
          paragraph: "Write something about you!",
        });
        break;
      case 3:
        setPara({
          title: "Select Industries",
          paragraph: "Select the industries max 3",
        });
        break;
      case 5:
        setPara({ title: "Update Company Details", paragraph: "" });
        break;
      case 6:
        setPara({
          title: "Update Logo",
          paragraph: "Upload a logo of your company",
        });
        break;
      case 7:
        setPara({
          title: "Write Description",
          paragraph: "Write something about Company!",
        });
        break;
      case 8:
        setPara({
          title: "Social Media Links",
          paragraph: "Upload Social Media Links",
        });
        break;
      default:
      // code block
    }
  }, [fromStep]);
  return (
    <div className="startup_form_container_register">
      <div className="popup-container">
        <div className="popup-container">
          <div className="model_header">
            {(fromStep !== 4 || fromStep !== 10 || fromStep !== 9) && (
              <div style={{ display: "flex" }}>
                <IoIosArrowBack
                  size={35}
                  onClick={() => {
                    setFromStep(0);
                  }}
                />
                <div style={{ width: "100%" }}>
                  <h2 style={{ textAlign: "left" }}>{para.title}</h2>{" "}
                  <p>{para.paragraph}</p>
                </div>
              </div>
            )}
          </div>

          {fromStep === 0 && <UserName setFromStep={setFromStep} />}
          {fromStep === 1 && <ProfilePick setFromStep={setFromStep} />}
          {fromStep === 2 && <Bio setFromStep={setFromStep} />}
          {/*   {fromStep === 3 && (
            <SelectIndustries
              setFromStep={setFromStep}
              setSuccessType={setSuccessType}
            />
          )}
          {fromStep === 4 && (
            <Success
              setFromStep={setFromStep}
              successType={successType}
              setSuccessType={setSuccessType}
            />
          )}
          {fromStep === 5 && <CompanyDetail setFromStep={setFromStep} />}
          {fromStep === 6 && <CompanyLogo setFromStep={setFromStep} />}
          {fromStep === 7 && <CompanyBio setFromStep={setFromStep} />}
          {fromStep === 8 && (
            <Links setFromStep={setFromStep} setSuccessType={setSuccessType} />
          )}
          {fromStep === 9 && (
            <Success
              setFromStep={setFromStep}
              successType={successType}
              setSuccessType={setSuccessType}
            />
          )}*/}
          {fromStep === 3 && <Welcome />}
        </div>
      </div>
    </div>
  );
};

export default StartUp;
