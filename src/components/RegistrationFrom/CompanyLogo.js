import React, { useRef, useState } from "react";
import { IoImage } from "react-icons/io5";
import { postStartUpData } from "../../Service/user";
import { getBase64 } from "../../utils/getBase64";

const CompanyLogo = ({ setFromStep }) => {
  const [profilePick, setProfilePick] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleProfileClick = () => {
    // Trigger the hidden file input when the profile picture is clicked
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePick(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handelNext = async () => {
    const logo = await getBase64(selectedFile);

    const response = await postStartUpData({
      logo,
    });
    if (response.status === 200) {
      setFromStep(7);
    }
  };
  return (
    <div className="popup">
      <div
        className="profile_pick"
        onClick={handleProfileClick}
        style={{ cursor: "pointer" }}
      >
        {profilePick ? (
          <img src={profilePick} alt="Profile" style={{ width: "100%" }} />
        ) : (
          <IoImage style={{ fontSize: "4rem" }} />
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleFileChange}
      />
      {profilePick ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button className="from_btn startup" onClick={handelNext}>
            Done
          </button>
          <button className="from_btn" onClick={handleProfileClick}>
            Change Logo
          </button>
        </div>
      ) : (
        <div>
          <button
            className="from_btn startup"
            onClick={handleProfileClick} // Trigger the file input when this button is clicked
          >
            Add Logo
          </button>
          <button
            onClick={() => {
              setFromStep(7);
            }}
              className="from_btn"
          >
            {">>"}Skip
          </button>
        </div>
      )}
    </div>
  );
};

export default CompanyLogo;
