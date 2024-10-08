import CompanyCard from "./CompanyCard";
import { Infosys, HCL, TCS, Wipro } from "../../../Images/Investor/Syndicates";
import "./CompanyCardContainer.scss";

const companyInfosys = {
  name: "Infosys",
  motto: "Making groups booking easier & faster through automation",
  image: Infosys,
  userOne: {
    name: "Karthik",
    connections: 100,
  },
  userTwo: {
    name: "Rahul",
    connections: 90,
  },
};
const companyHCL = {
  name: "HCL",
  motto: "Making groups booking easier & faster through automation",
  image: HCL,
  userOne: {
    name: "Karthik",
    connections: 100,
  },
  userTwo: {
    name: "Rahul",
    connections: 90,
  },
};
const companyTCS = {
  name: "TCS",
  motto: "Making groups booking easier & faster through automation",
  image: TCS,
  userOne: {
    name: "Karthik",
    connections: 100,
  },
  userTwo: {
    name: "Rahul",
    connections: 90,
  },
};
const companyWipro = {
  name: "Wipro",
  motto: "Making groups booking easier & faster through automation",
  image: Wipro,
  userOne: {
    name: "Karthik",
    connections: 100,
  },
  userTwo: {
    name: "Rahul",
    connections: 90,
  },
};
// Fetch companies here
// const companiesArray

export default function CompanyCardContainer({ isCompanies, text }) {
  return (
    <div className="companyCard__container d-flex flex-column gap-5">
      <div className="company__row d-flex gap-5 pb-2">
        <CompanyCard company={companyInfosys} text={text} />
        <CompanyCard company={companyHCL} text={text} />
        <CompanyCard company={companyTCS} text={text} />
        <CompanyCard company={companyWipro} text={text} />
      </div>
      {isCompanies ? (
        <div className="company__row d-flex gap-5 pb-2">
          <CompanyCard company={companyWipro} />
          <CompanyCard company={companyInfosys} />
          <CompanyCard company={companyHCL} />
          <CompanyCard company={companyTCS} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
