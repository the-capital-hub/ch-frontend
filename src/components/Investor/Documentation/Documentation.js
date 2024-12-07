import { useContext, useEffect, useState } from "react";
import "./Documentation.scss";
import SmallProfileCard from "../InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import RightProfileCard from "../InvestorGlobalCards/RightProfileCard/RightProfileCard";
import RecommendationCard from "../InvestorGlobalCards/Recommendation/RecommendationCard";
import NewsCorner from "../InvestorGlobalCards/NewsCorner/NewsCorner";
import IntroductoryMessage from "../OneLink/IntroductoryMessage/IntroductoryMessage";
import UploadContainer from "./UploadContainer/UploadContainer";
import { Card } from "../../InvestorView";
import UploadModal from "./UploadModal/UploadModal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { environment } from "../../../environments/environment";
import MaxWidthWrapper from "../../Shared/MaxWidthWrapper/MaxWidthWrapper";
import {
  Business,
  KYC,
  Legal,
  Pitch,
  GreenBusiness, GreenKYC , GreenLegal, GreenPitch
} from "../../../Images/StartUp/Documentaion";
import { setPageTitle, setShowOnboarding } from "../../../Store/features/design/designSlice";
import { useDispatch, useSelector } from "react-redux";
import { getFoldersApi } from "../../../Service/user";
import SpinnerBS from "../../Shared/Spinner/SpinnerBS";
import TutorialTrigger from "../../Shared/TutorialTrigger/TutorialTrigger";
import { startupOnboardingSteps } from "../../OnBoardUser/steps/startup";


const Documentation = () => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const userVisitCount = localStorage.getItem("userVisit")
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if(Number(userVisitCount)<=1){
      dispatch(setShowOnboarding(true))
    }
  },[])
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getFolders = () => {
    setLoading(true);
    getFoldersApi(loggedInUser.oneLinkId)
      .then((data) => {
        setFolderName(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        console.log(error);
      });
  };
  useEffect(() => {
    getFolders(); // Call the getFolders function to fetch data
  }, []);

  useEffect(() => {
    document.title = "Documentation | The Capital Hub";
    dispatch(setPageTitle("Documentation"));
  }, []);

  return (
    <MaxWidthWrapper>
      <div className="documentation-wrapper">
        {/* Main content */}
        <div className="left-content">
          <SmallProfileCard text={"Documentation"} />

          {/* Onboarding popup */}
          <TutorialTrigger steps={startupOnboardingSteps.documentationPage} />

          <div className="documentationStartup">
            {showModal && (
              <UploadModal
                onCancel={setShowModal}
                fetchFolder={getFolders}
                // notify={notify}
              />
            )}
         
            <IntroductoryMessage
              title={"Upload your document"}
        
            />
            <UploadContainer
              onClicked={setShowModal}
              fetchFolder={getFolders}
            />
            <div className="cards px-xxl-4  py-5 rounded-4 document_container ">
             
              {loading && (
                <SpinnerBS
                  className={
                    "d-flex py-5 justify-content-center align-items-center w-100"
                  }
                />
              )}

              {folderName.map((folder, index) => {
                let imageToShow;
                let folderName;

                switch (folder) {
                  case "pitchdeck":
                    imageToShow = Pitch;
                    folderName = "Pitch Deck";
                    break;
                  case "business":
                    imageToShow = Business;
                    folderName = "Business";
                    break;
                  case "kycdetails":
                    imageToShow = KYC;
                    folderName = "KYC Details";
                    break;
                  case "legal and compliance":
                    imageToShow = Legal;
                    folderName = "Legal And Compliance";
                    break;
                    case "onelinkpitch":
                      imageToShow = GreenPitch;
                      folderName = "OneLink Pitch";
                      break;
                  default:
                    imageToShow = Pitch;
                    folderName = folder;
                }

                return (
                  <Card
                    key={index}
                    onClicked={() => navigate(`/documentation/${folder}`)}
                    text={folderName}
                    image={imageToShow}
                  />
                );
              })}

            </div>
          </div>
        </div>
        {/* Right content */}
        <div className="right-content">
          <RightProfileCard />
          <RecommendationCard />
          <NewsCorner />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Documentation;
