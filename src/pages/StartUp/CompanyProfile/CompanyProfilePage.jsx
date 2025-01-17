import React, { useState, useEffect } from "react";
import "./CompanyProfilePage.scss";
import CompanyProfile from "../../../components/NewInvestor/CompanyProfileComponents/CompanyProfile";
import SmallProfileCard from "../../../components/Investor/InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import RecommendationCard from "../../../components/Investor/InvestorGlobalCards/Recommendation/RecommendationCard";
import NewsCorner from "../../../components/Investor/InvestorGlobalCards/NewsCorner/NewsCorner";
import {
  getStartupByFounderId,
  searchStartUps,
  addStartUpToUser,
  updateUserAPI,
  addNotificationAPI,
  getUserById
} from "../../../Service/user";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import DefaultAvatar from "../../../Images/Chat/default-user-avatar.webp";
import AfterSuccessPopUp from "../../../components/PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import { useNavigate } from "react-router-dom";
import {
  selectTheme,
  setPageTitle,
  setShowOnboarding,
} from "../../../Store/features/design/designSlice";
import {
  selectLoggedInUserId,
  selectUserCompanyData,
  setUserCompany,
} from "../../../Store/features/user/userSlice";
import toast, { Toaster } from "react-hot-toast";
// import achievement from "../../../Images/Investor/Achievements/img_1.png";
import { achievementTypes } from "../../../components/Toasts/AchievementToast/types";
import AchievementToast from "../../../components/Toasts/AchievementToast/AchievementToast";
import OneLinkRequestsBanner from "../../../components/StartUp/OneLinkRequestsBanner/OneLinkRequestsBanner";

export default function CompanyProfilePage() {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  //const userCompanyData = useSelector(selectUserCompanyData);
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const [companyData, setCompanyData] = useState({});
  const [loading, setLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const userVisitCount = localStorage.getItem("userVisit");

  useEffect(()=>{
    if(Number(userVisitCount) <= 1){
      dispatch(setShowOnboarding(true));
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    getStartupByFounderId(loggedInUser._id)
      .then(({ data }) => {
        setCompanyData(data);
        dispatch(setUserCompany(data));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching startup data:", error.message);
      });
    getUserById("", loggedInUser._id).then(({ data }) => {
      setUserData(data);
    });
    document.title = "Company Profile | The Capital Hub";
    dispatch(setPageTitle("Company"));
  }, []);

  const handleSearchInputChange = (e) => {
    const newValue = e.target.value;
    searchStartUps(newValue)
      .then(({ data }) => {
        setCompanies(data);
      })
      .catch(() => {
        setCompanies([]);
      });
    setSelectedCompanyId(null);
  };

  const handleCompanySelection = (companyId, companyName) => {
    setSelectedCompanyId(companyId);
    const searchInput = document.querySelector(".search-company-input");
    searchInput.value = companyName;
    setCompanies([]);
  };

  const handleAddStartup = async () => {
    try {
      const response = await addStartUpToUser(
        loggedInUser._id,
        selectedCompanyId
      );
      if (response.isFirst) {
        notify();
        const notificationBody = {
          recipient: loggedInUser._id,
          type: "achievementCompleted",
          achievementId: "6564687349186bca517cd0cd",
        };
        addNotificationAPI(notificationBody)
          .then((data) => console.log())
          .catch((error) => console.error(error.message));
      }
      if (response.status === 200) {
        setShowSuccess(true);
        getStartupByFounderId(loggedInUser._id)
          .then(({ data }) => {
            setCompanyData(data);
            dispatch(setUserCompany(data));
            setUserData({...userData, startUp: data._id});
            setSelectedCompanyId(null);
            setCompanies([]);
          })
          .catch((error) => {
            console.error("Error fetching startup data:", error.message);
          });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddNew = () => {
    navigate("/company-profile/add");
  };

  const notify = () =>
    toast.custom((t) => <AchievementToast type={achievementTypes.employer} />);

  return (
    <MaxWidthWrapper>
      <div className="companyProfilePage__wrapper">
        {/* Main content */}
        <div className="main__content">
          <SmallProfileCard text={"Company Profile"} />
          {companyData?.founderId._id === loggedInUser._id && (
            <OneLinkRequestsBanner startUpId={companyData._id} />
          )}
          <div className="edit-container">
            <div className="add_company_data rounded-4 p-4 mb-2">
              <div className="text-center">
                <button className="btn-base startup" onClick={handleAddNew}>
                  Add new company details
                </button>
              </div>
              <div className="or-text-container">
                <p
                  className="text-decoration-none fs-5"
                  style={{ color: theme === "dark" ? "#fff" : "#000" }}
                >
                  Or
                </p>
              </div>
              <p
                className="text-decoration-none fs-5"
                style={{ color: theme === "dark" ? "#fff" : "#000" }}
              >
                Choose from an existing Company
              </p>
              <div>
                <input
                  type="text"
                  placeholder="Search company"
                  className="search-company-input"
                  onChange={handleSearchInputChange}
                />
                {companies.length !== 0 && (
                  <div className="suggestion" style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                    {companies.map((company, index) => (
                      <div
                        className={`suggestion-item ${
                          selectedCompanyId === company._id ? "active" : ""
                        }`}
                        key={index}
                        onClick={() =>
                          handleCompanySelection(company._id, company.company)
                        }
                      >
                        <img
                          src={company.logo || DefaultAvatar}
                          alt={"CompanyLogo"}
                          className="suggestion-logo"
                        />
                        {company.company}
                      </div>
                    ))}
                  </div>
                )}
                <button className="btn-base startup" onClick={handleAddStartup}>
                  Save
                </button>
              </div>
            </div>
            {!loading && (
              <>
                {companyData && companyData?.length !== 0 && (
                  companyData?.founderId._id === loggedInUser._id && (
                    <>
                      <div className="edit_company_text rounded-4 p-4 shadow-sm">
                        <Link
                          to="/company-profile/edit"
                          className="text-decoration-none  fs-5"
                        >
                          Edit company details
                        </Link>
                      </div>
                    </>
                  ))}
              </>
            )}
          </div>
          <Toaster
            containerStyle={{
              top: "100px",
            }}
            toastOptions={{
              duration: 10000,
            }}
          />
          {!loading ? (
            companyData?.length === 0 ? (
              <div className="bg-white rounded-4 p-4">
                <p>No company found.</p>
              </div>
            ) : userData.startUp === null ? (
              <div className="company__profile  shadow-sm rounded-2">
                <div className="company_section_one d-flex flex-column gap-4 p-3 p-md-5">
                  <h2 style={{ color: theme === "dark" ? "#fff" : "#000" }}>
                    No Company
                  </h2>
                </div>
              </div>
            ) : (
              <CompanyProfile
                isOnelink={true}
                companyData={companyData}
                startup="true"
                setCompanyData={setCompanyData}
                companyDelete={true}
              />
            )
          ) : (
            <div className="mx-auto w-100 bg-white rounded-4 p-5 d-flex justify-content-center min-vh-100">
              <div className="spinner-grow orange" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
        {/* Right side content */}
        <div className="right__content">
          <RecommendationCard />
          <NewsCorner />
        </div>
        {showSuccess && (
          <AfterSuccessPopUp
            // withoutOkButton
            onClose={() => setShowSuccess(!showSuccess)}
            successText="Company Added Successfully"
          />
        )}
      </div>
    </MaxWidthWrapper>
  );
}
