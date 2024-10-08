import React, { useState, useEffect } from "react";
import CompanyProfile from "./CompanyProfile";

export default function CompanyProfileList({ isStartup, data,pageName,show,companyDelete }) {
  const [loading, setLoading] = useState(false); //Change default to true when integrating

  return (
    <div className="d-flex flex-column gap-3">
      {/* Loop company Profile here */}
      {data?.map((company) => (
        <CompanyProfile
          short
          startup={`${isStartup ? "true" : "false"}`}
          companyData={company}
          pageName={pageName}
          show = {show}
          companyDelete={companyDelete}
        />
      ))}
    </div>
  );
}
