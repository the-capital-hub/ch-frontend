import React from "react";
import successImage from "../../Images/industryImage/image.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllChats } from "../../Store/features/chat/chatThunks";
import { fetchCompanyData } from "../../Store/features/user/userThunks";

const Success = ({ setFromStep, successType, setSuccessType }) => {

  return (
    <div className="popup">
      <img
        src={successImage}
        style={{ maxWidth: "250px" }}
        alt={successImage}
      />
      {successType === "company" ? (
        <p style={{ textAlign: "center", paddingTop: "1rem" }}>
          Your Company details is successfully <br />
          updated
        </p>
      ) : (
        <p style={{ textAlign: "center", paddingTop: "1rem" }}>
          Your Profile is successfully created, please <br /> complete the
          remaining profile
        </p>
      )}
      <button
        className="from_btn startup"
        style={{ marginTop: "1rem" }}
        onClick={() => {
          if (successType === "company") {
            setFromStep(10);
          } else {
            setFromStep(5);
          }

          setSuccessType("");
        }}
      >
        Complete Profile
      </button>
    </div>
  );
};

export default Success;
