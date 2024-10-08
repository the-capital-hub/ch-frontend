import CompanyOverviewCard from "./CompanyOverviewCard";
import {
  WebIcon,
  ThreeUser,
  Location,
  UserOne,
  UserTwo,
} from "../../../Images/Investor/Syndicates";
import "./CompanyCard.scss";
import User from "./User";

export default function CompanyCard({ company, text = "Group" }) {
  return (
    <div className="company__card card border rounded-4">
      <div className="card-header m-0 p-0 d-flex align-items-center bg-transparent">
        <div className="card__image__container">
          <img src={company.image} alt={company.name} className="card__image" />
        </div>
        <div className="company__details d-flex flex-column justify-content-center pe-1">
          <h5 className="card-title m-0">{company.name}</h5>
          <p className="card__subtitle">{company.motto}</p>
        </div>
      </div>
      <div className="card-body mt-0 pt-0 d-flex flex-column gap-2 align-items-start w-100">
        <div className="company__overview">
          <h6 className="div__heading my-2">Over View</h6>
          <div className="d-flex flex-column gap-3 flex-lg-row gap-lg-5 ">
            <CompanyOverviewCard
              heading={"Website"}
              text={company.name}
              icon={WebIcon}
              iconAlt={"web icon"}
              key={"web"}
            />
            <CompanyOverviewCard
              heading={"Members"}
              text={"300-500"}
              icon={ThreeUser}
              iconAlt={"users icon"}
              key={"members"}
            />
            <CompanyOverviewCard
              heading={"Location"}
              text={"Bangalore, India"}
              icon={Location}
              iconAlt={"location pin icon"}
              key={"location"}
            />
          </div>
        </div>
        <div className="company__people w-100">
          <h6 className="div__heading my-2">People in group</h6>
          <div className="people__container d-flex gap-3 mt-3">
            <User
              userImgURL={UserOne}
              userName={company.userOne.name}
              userConnections={company.userOne.connections}
              isUserOne={true}
              key={"userOne"}
            />
            <User
              userImgURL={UserTwo}
              userName={company.userTwo.name}
              userConnections={company.userTwo.connections}
              key={"userTwo"}
            />

            <div className="join--btn">
              {/* <Button text={"Join Group"} /> */}
              <button className="btn-capital-small">{`Join ${text}`}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
