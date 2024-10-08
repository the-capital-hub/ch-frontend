import "./InvestedStartUpCard.scss";

import PublicLinks from "../../../../components/NewInvestor/CompanyProfileComponents/company-section-two/public-links/PublicLinks";
import CompanyInfo from "../../../../components/NewInvestor/CompanyProfileComponents/company-section-one/company-info/CompanyInfo";

import tempLogo from "../../../../Images/Logo.svg";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../../Store/features/design/designSlice";

function InvestedStartUpCard({ startUp }) {
  const theme = useSelector(selectTheme)
  let socialLinks = {
    website: "",
    facebook: "",
    twitter: "",
    linkedin: "",
  };

  return (
    <div className="invested-startup-card d-flex flex-column gap-3 shadow-sm rounded-4 border p-2 p-md-4">
      <CompanyInfo
        foundedYear={startUp?.foundedYear || 2023}
        lastFunding={startUp?.lastFunding || 2023}
        location={startUp?.location || "Bangalore"}
        logo={startUp?.logo || tempLogo}
        name={startUp?.name || "The Capital Hub"}
        tagline={startUp?.tagline || "tagline"}
      />
      <fieldset className="rounded " style={{border:"none",background:"#212121"}}>
        <legend className="px-2 shadow-sm" style={{background:theme === "dark"?"#292B33":"#f5f5f5",borderRadius:"10px"}}>About the company</legend>
        <p className="p-2">{startUp?.description || "Lorem..."}</p>
      </fieldset>
      <p style={{color:theme==="dark"?"#fff":"#000"}}>Public Links</p>
      <PublicLinks socialLinks={startUp?.publicLinks || socialLinks} />
    </div>
  );
}

export default InvestedStartUpCard;
