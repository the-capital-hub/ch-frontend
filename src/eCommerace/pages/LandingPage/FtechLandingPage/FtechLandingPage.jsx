import // AppStore,
// Avoidance,
// CompanyBG,
// CostSaving,
// Diversify,
// FinancialOrg,
// FinancialPlanner,
// GooglePlayStore,
// ImprovedCredit,
// InsureRight,
// IntroGetLoan,
// IntroMain,
// InvestEasy,
// JoinUs,
// ManageYourFinance,
// TeamExp,
// UniqueFeatures,
"../../../../Images/Ecommerace/FtechlandingPage";
import "./FtechLandingPage.scss";
import { Helmet } from "react-helmet";
// import { Link } from "react-router-dom";
// import pramodImg from "../../../../Images/aboutUs/Pramod.jpeg";
import ContactForm from "../../../Components/Shared/ContactForm/ContactForm";
import ServiceStats from "../../../Components/Shared/ServiceStats/ServiceStats";
import OurClients from "../../../Components/Shared/OurClients/OurClients";
import Expert from "../../../Components/Shared/Expert/Expert";
import ConsultingServices from "../../../Components/Shared/ConsultingServices/ConsultingServices";
import DevelopmentFee from "../../../Components/Shared/DevelopmentFee/DevelopmentFee";
import FtechFeatures from "./Components/FtechFeatures/FtechFeatures";
import FtechPartOfPlatform from "./Components/FtechPartOfPlatform/FtechPartOfPlatform";
import FtechSecurity from "./Components/FtechSecurity/FtechSecurity";
import FtechBuildingApplication from "./Components/FtechBuildingApplication/FtechBuildingApplication";
import FtechHero from "./Components/FtechHero/FtechHero";

function FtechLandingPage() {
  return (
    <section className="landing-page container-fluid">
      <Helmet>
        <meta charSet="utf-8" />
        <title> Build your FinTech application with Capital HUB!</title>
        <meta
          name="description"
          content="Experience hassle-free financial management with our fintech solutions.
Say goodbye to the stress of making loan payments on time and join our community for
financial ease and security"
        />
      </Helmet>

      {/* Hero section */}
      <section className="intro container mx-auto overflow-hidden">
        <FtechHero />
        {/* Development Fee */}
        <DevelopmentFee />
      </section>

      {/* Service Stats */}
      <ServiceStats />

      {/* Features */}
      <FtechFeatures />

      <section className="">
        <div className="how-we-help container mx-auto">
          <h2 className="blue">Here's how we build your project</h2>
        </div>
        <ConsultingServices />
      </section>

      {/* Part of platform */}
      <FtechPartOfPlatform />

      {/* Expert */}
      <div className="py-4 overflow-hidden">
        <Expert />
      </div>

      {/* Security measures */}
      <FtechSecurity />

      {/* Building Application */}
      <FtechBuildingApplication />

      {/* OurClients */}
      <OurClients className="bg-dark" />

      {/* Contact form */}
      <div className="container row m-0 overflow-hidden">
        <ContactForm className="col-12 col-md-8 mx-auto" page={"fintech"} />
      </div>
    </section>
  );
}

export default FtechLandingPage;
