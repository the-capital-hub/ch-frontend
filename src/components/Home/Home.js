import "./home.scss";
import WhyChooseUsCard from "../Card/Home/WhyChooseUs/WhyChooseUsCard";
import { featuresData } from "../../constants/LandingPageFeatures";
import Features from "../WebsiteComponents/LandingPage/Features/Features";
import LandingHero from "../WebsiteComponents/LandingPage/LandingHero/LandingHero";
import { selectIsMobileApp } from "../../Store/features/design/designSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
  const isMobileApp = useSelector(selectIsMobileApp);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  if (isMobileApp) {
    if (loggedInUser && loggedInUser.isInvestor === "true") {
      return <Navigate to="/investor/home" />;
    } else if (loggedInUser && loggedInUser.isInvestor === "false") {
      return <Navigate to="/home" />;
    } else {
      return <Navigate to="login" />;
    }
  }

  return (
    <>
      
      {/* <NewYearPopper /> */}
      {/* Hero section */}
      <div className="container mb-md-5">
        <LandingHero />
      </div>

      {/* Why Choose us */}
      <div className="container-fluid why_choose_us_container">
        <div className="container">
          <WhyChooseUsCard />
        </div>
      </div>

      {/* Features section */}
      <div className="container-fluid m-0 p-0">
        <div className="container my-0 mx-auto px-xl-0 px-3 py-4">
          <Features
            dataObject={featuresData.onelink}
            btnClass={"btn-purple"}
            ltr={true}
          />
          <Features
            dataObject={featuresData.angel}
            btnClass={"btn-green"}
            ltr={false}
          />
          <Features
            dataObject={featuresData.manageTeam}
            btnClass={"btn-purple"}
            ltr={true}
          />
          <Features
            dataObject={featuresData.manageClient}
            btnClass={"btn-green"}
            ltr={false}
          />
          <Features
            dataObject={featuresData.manageInvestor}
            btnClass={"btn-black"}
            ltr={true}
          />
          <Features
            dataObject={featuresData.growthive}
            btnClass={"btn-orange"}
            ltr={false}
          />
        </div>
      </div>

      {/* <div className="container-fluid our_startups_section mb-5">
        <OurStartUp />
      </div> */}

      {/* <div className="container-fluid our_investor_section">
        <CoInvestor />
      </div>

      <div className="container-fluid">
        <OurCollabration />
      </div> */}
    </>
  );
};

export default Home;
