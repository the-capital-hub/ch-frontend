import React from "react";

export default function OnePagerSocialLinks({ companyData }) {
  // const { competitors } = companyData;

  return (
    <div className="social_links">
      <h4 className="main_color">Competitors</h4>
      <div className="three_col_grid gap-3">
        {companyData?.competitors?.map((competitor, index) => (
          <fieldset key={index}>
            <legend className="main_color">{`Competitor name ${index + 1}`}</legend>
            <input
              type="text"
              readOnly
              value={competitor.name}
              className="onePager_input shadow-sm main_border"
            />
          </fieldset>
        ))}
      </div>
    </div>
  );
}
