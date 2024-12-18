import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpinnerBS from "../../../Shared/Spinner/SpinnerBS";
import { postInvestorData } from "../../../../Service/user";
import { selectUserCompanyData } from "../../../../Store/features/user/userSlice";

const InvestorPublicLinks = ({
  publicLinks,
  loading,
  setPublicLinks,
  investor = false,
}) => {
  const { isInvestor } = useSelector((state) => state.user.loggedInUser);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);


  // Initialize state with the initial links provided as props
  const [links, setLinks] = useState(publicLinks || {
    website: "",
    linkedin: "",
    twitter: "",
    instagram: "",
  });



  useEffect(() => {
    // Update the state with the latest publicLinks
    if (publicLinks) {
      setLinks(publicLinks);
    }
  }, [publicLinks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLinks((prevLinks) => ({
      ...prevLinks,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Make the API call to save the public links
      const response = await postInvestorData({
        socialLinks: links,
        founderId: loggedInUser._id,
      });

      if (setPublicLinks) {
        setPublicLinks(links); 
      }
    } catch (error) {
      console.error("Error saving public links:", error);
    }
  };

  const socialLinks = publicLinks?.socialLinks || {};

  return (
    <div
      className={`paragraph__component py-5 px-3 px-md-5 d-flex flex-column gap-4 ${
        isInvestor === "true" ? "rounded-4 border" : "rounded-4"
      }`}
      style={{ color: "var(--d-l-grey)" }}
    >
      <div className="d-flex flex-column-reverse flex-sm-row align-items-sm-center justify-content-between gap-3 gap-md-0">
        <h3>Public</h3>
      </div>
      <div className="profile__form">
        <form onSubmit={handleSave}>
          <fieldset className={investor ? "investor" : "startup"}>
            <legend>Website Link</legend>
            <input
              type="text"
              name="website"
              id="website"
              className="profile_form_input"
              placeholder={socialLinks.website || "Enter The Website"}
              value={links.website || ""}
              onChange={handleInputChange}
            />
          </fieldset>
          <fieldset className={investor ? "investor" : "startup"}>
            <legend>Linkedin</legend>
            <input
              type="text"
              name="linkedin"
              id="linkedin"
              className="profile_form_input"
              placeholder={socialLinks.linkedin || "Enter Linkedin"}
              value={links.linkedin || ""}
              onChange={handleInputChange}
            />
          </fieldset>
          <fieldset className={investor ? "investor" : "startup"}>
            <legend>Twitter</legend>
            <input
              type="text"
              name="twitter"
              id="twitter"
              className="profile_form_input"
              placeholder={socialLinks.twitter || "Enter Twitter"}
              value={links.twitter || ""}
              onChange={handleInputChange}
            />
          </fieldset>
          <fieldset className={investor ? "investor" : "startup"}>
            <legend>Instagram</legend>
            <input
              type="text"
              name="instagram"
              id="instagram"
              className="profile_form_input"
              placeholder={socialLinks.instagram || "Enter Instagram"}
              value={links.instagram || ""}
              onChange={handleInputChange}
            />
          </fieldset>
          <button
            type="submit"
            className={`align-self-end btn-base ${
              isInvestor === "true" ? "investor" : "startup"
            }`}
          >
            {loading ? (
              <SpinnerBS
                colorClass={`${
                  isInvestor === "true" ? "text-dark" : "text-white"
                }`}
                spinnerSizeClass="spinner-border-sm"
              />
            ) : (
              "Save"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default InvestorPublicLinks;
