import React from "react";
import InvestorProfile from "./InvestorProfile";


export default function InvestorProfileList({ theme, short, data }) {
  return (
    <div className="d-flex flex-column gap-3">
      {data?.map((person) => {
        return (
          <InvestorProfile
            theme={theme}
            short={short}
            personData={person}
            key={person._id}
          />
        );
      })}
    </div>
  );
}
