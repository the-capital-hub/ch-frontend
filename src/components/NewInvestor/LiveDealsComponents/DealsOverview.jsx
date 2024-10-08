import {
  WebIcon,
  ThreeUser,
  Location,
} from "../../../Images/Investor/Syndicates";
import CompanyOverviewCard from "../../../components/NewInvestor/SyndicateComponents/CompanyOverviewCard";

export default function DealsOverview({ name, about,theme }) {
  return (
    <div className="deals__overview gap-4">
      <h6 className="div__heading my-2" style={{color:theme === "dark"?"#fff":"black",}}>Over View</h6>
      <div className="d-flex flex-column gap-4 flex-md-row gap-md-5" style={{paddingTop:"10px"}}>
        <CompanyOverviewCard
          heading={"Website"}
          text={name}
          icon={WebIcon}
          iconAlt={"web icon"}
          key={"web"}
          fontBase
          theme={theme}
        />
        <CompanyOverviewCard
          heading={"Employees"}
          text={"300-500"}
          icon={ThreeUser}
          iconAlt={"users icon"}
          key={"members"}
          fontBase
          theme={theme}
        />
        <CompanyOverviewCard
          heading={"Location"}
          text={"Bangalore, India"}
          icon={Location}
          iconAlt={"location pin icon"}
          key={"location"}
          fontBase
          theme={theme}
        />
      </div>
      <p className="overview__about" style={{color:theme === "dark"?"#fff":"black",padding:"0px"}}>{about}</p>
    </div>
  );
}
