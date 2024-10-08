import { useEffect } from "react";
import NewsCorner from "../../../components/Investor/InvestorGlobalCards/NewsCorner/NewsCorner";
import RecommendationCard from "../../../components/Investor/InvestorGlobalCards/Recommendation/RecommendationCard";
// import SmallProfileCard from "../../../components/Investor/InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import RightProfileCard from "../../../components/NewInvestor/InvestorRightProfileCard/InvestorRightProfileCard";
import "../Syndicates/Syndicates.scss";
import "./SavedPosts.scss";
import NavigatedCardViewer from "../../../components/Investor/SavePost/NavigatedCardViewer/NavigatedCardViewer";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import { setPageTitle, setShowOnboarding } from "../../../Store/features/design/designSlice";
import { useDispatch } from "react-redux";
import TutorialTrigger from "../../../components/Shared/TutorialTrigger/TutorialTrigger";
import { investorOnboardingSteps } from "../../../components/OnBoardUser/steps/investor";

export default function SavedPosts() {
  // const [selectedTab, setSelectedTab] = useState("startups");
  const dispatch = useDispatch();
  const userVisitCount = localStorage.getItem("userVisit")

  useEffect(()=>{
    if(Number(userVisitCount)<=1){
      dispatch(setShowOnboarding(true))
    }
  },[])
  useEffect(() => {
    window.title = "Saved Posts | The Capital Hub";
    dispatch(setPageTitle("Saved Posts"));
  }, [dispatch]);

  return (
    <MaxWidthWrapper>
      <div className="savedPosts__wrapper px-md-3 pb-lg-5 ">
        {/* Main content */}
        <section className="section__wrapper main__content d-flex flex-column gap-3">
          {/* Page indicators */}
          {/* <div className="">
            <SmallProfileCard text="Saved Posts" />
          </div> */}

          {/* Onboarding popup */}
          <TutorialTrigger
            steps={investorOnboardingSteps.savedPostsPage}
            className={""}
          />

          {/* Saved posts heading */}
          <div className="savedPosts__heading">
            <h4 className="white-to-grey d-l-grey border rounded-4 shadow-sm p-3">
              Find all your saved posts here.
            </h4>
          </div>
          {/* Saved Posts container */}
          <div className="savedPosts__container bg-white border rounded-4 overflow-hidden">
            <NavigatedCardViewer />
          </div>
        </section>
        {/* Right side content */}
        <aside className="aside__content d-none d-lg-flex flex-column gap-3">
          <RightProfileCard />
          <RecommendationCard />
          <NewsCorner />
        </aside>
      </div>
    </MaxWidthWrapper>
  );
}
