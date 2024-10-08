import React, { useEffect, useState } from "react";
import "./AuthorProfile.scss";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import { useParams } from "react-router-dom";
import { getUserAndStartUpByUserIdAPI } from "../../../Service/user";
import ProfessionalInfoDisplay from "../../../components/Investor/StartupProfilePageComponents/ProfessionalInfo/ProfessionalInfoDisplay";
import UserBio from "../../../components/Investor/InvestorHome/Components/UserBio/UserBio";
import ConnectionCard from "../../../components/Investor/ConnectionCard/ConnectionCard";
import CompanyDetailsCard from "../../../components/Investor/InvestorGlobalCards/CompanyDetails/CompanyDetailsCard";
import ColorCards from "../../../components/Investor/InvestorHome/Components/ColorCards/ColorCards";
import TCHLogoLoader from "../../../components/Shared/TCHLoaders/TCHLogoLoader/TCHLogoLoader";
import LoginPopup from "../../../components/Shared/LoginPopup/LoginPopup";

export default function AuthorProfile() {
  const { userId } = useParams();

  // States
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserAndStartUpByUserIdAPI(userId)
      .then(({ data }) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching Author Profile:", error));
  }, [userId]);

  // Extracting Data
  let professionalData = {
    designation: userData?.designation || "",
    education: userData?.education || "",
    experience: userData?.experience || "",
    profilePicture: userData?.profilePicture || "",
    fullName: userData?.firstName + " " + userData?.lastName || "",
    company: userData?.startUp.company,
    location: userData?.location || "Bangalore, India",
  };

  return (
    <div className="author-profile-wrapper position-relative">
      <MaxWidthWrapper>
        {loading ? (
          <div className="" style={{ height: "80vh" }}>
            <TCHLogoLoader
              className={
                "d-flex justify-content-center align-items-center h-100"
              }
            />
          </div>
        ) : (
          <div className="profile-container d-flex flex-column gap-4">
            {/* Professional Info */}
            <section
              className={`professional_info_section d-flex flex-column gap-3 p-2 px-md-4 py-4 bg-white shadow-sm ${
                userData?.isInvestor === "true"
                  ? "rounded-4 border"
                  : "rounded-4"
              }`}
            >
              <ProfessionalInfoDisplay
                professionalData={professionalData}
                isEditing={false}
                canEdit={false}
              />
            </section>

            {/* UserBio */}
            <section className="d-flex flex-column gap-3 p-2 px-md-4 py-4 bg-white shadow-sm rounded-4">
              <UserBio canEdit={false} bioText={userData.bio} />
            </section>

            {/* Connections */}
            <section className="d-flex flex-column gap-3 p-2 px-md-4 py-4 bg-white shadow-sm rounded-4">
              <h2 className="">Connections</h2>
              <ConnectionCard userIdData={userData._id} />
            </section>

            {/* Achievements */}

            {/* CompanyDetails */}
            <div className="">
              <CompanyDetailsCard
                className=""
                userDetails={userData}
                page={""}
                theme="startup"
              />
            </div>

            {/* Color Cards */}
            <ColorCards
              colorCardInfo={userData.startUp.colorCard}
              isNotEditable={true}
            />

            {/*  */}
          </div>
        )}
      </MaxWidthWrapper>

      {/* login popup */}
      {!loading && (
        <LoginPopup>
          <p className="m-0 fs-4 text-center">
            Connect with{" "}
            <span className="fw-bold">
              {userData.firstName} {userData.lastName}
            </span>{" "}
            on <span className="text-primary">Capital HUB</span>
          </p>
        </LoginPopup>
      )}
    </div>
  );
}
