import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SpinnerBS from "../../../Shared/Spinner/SpinnerBS";
import { postStartUpData , postInvestorData } from "../../../../Service/user";
import { selectUserCompanyData } from "../../../../Store/features/user/userSlice";

const PublicLinks = ({
  publicLinks,
  loading,
  setPublicLinks,
  investor = false,
}) => {
  const { isInvestor } = useSelector((state) => state.user.loggedInUser);
  const loggedInUser = useSelector((state)=> state.user.loggedInUser);
  const userCompanyData = useSelector(selectUserCompanyData);

  // Initialize state with the initial links provided as props
  const [links, setLinks] = useState({publicLinks});



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLinks((prevLinks) => ({
      ...prevLinks,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Build the data object to send
    const companySocialLinks = {
      socialLinks: {
        website: links.website || publicLinks.website,
        linkedin: links.linkedin || publicLinks.linkedin, 
        twitter: links.twitter || publicLinks.twitter,
        instagram: links.instagram || publicLinks.instagram,
      },
    };

    try {
      // Make the API call to save the public links
      let response;
      if(investor){
         response = await postStartUpData({
          ...companySocialLinks,
          founderId : loggedInUser._id
        });
      }

   else{
       response = await postInvestorData({
        ...companySocialLinks,
        founderId : loggedInUser._id
      });
   }
      
      // Optionally update state or props
      if (setPublicLinks) {
        setPublicLinks(links);
      }
    } catch (error) {
      console.error("Error saving public links:", error);
    }
  };


 

  return (
    <div
      className={`paragraph__component py-5 px-3 px-md-5 d-flex flex-column gap-4 ${
        isInvestor === "true" ? "rounded-4 border" : "rounded-4"
      }`}
      style={{ color: "var(--d-l-grey)" }}
    >
      <div className="d-flex flex-column-reverse flex-sm-row align-items-sm-center justify-content-between gap-3 gap-md-0">
        <h3>Public Links</h3>
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
              placeholder={userCompanyData.socialLinks.website}
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
              placeholder={userCompanyData.socialLinks.linkedin}
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
              placeholder={userCompanyData.socialLinks.twitter}
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
              placeholder={userCompanyData.socialLinks.instagram}
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

export default PublicLinks;
