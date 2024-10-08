// import React, { useEffect } from "react";
import OnePagerTable from "./OnePagerTable";

export default function OnePagerProjections({ companyData }) {
  return (
    <div className="onePager_projections">
      <h4 className="main_color">Projections</h4>
      <div className="d-flex flex-column gap-3">
        {companyData?.projections[0]?.rows?.map((row, index) => (
          <OnePagerTable key={index} heading={row.label} data={row.values} />
        ))}
      </div>
    </div>
  );
}
