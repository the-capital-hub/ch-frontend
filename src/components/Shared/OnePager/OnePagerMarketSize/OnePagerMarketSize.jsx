import React from "react";

export default function OnePagerMarketSize({ companyData }) {
  return (
    <div className="market_size">
      <h4 className="main_color">Market Size (in Billions $)</h4>
      <div className="three_col_grid gap-3">
        <fieldset>
          <legend className="main_color">Total Addressable Market:</legend>
          <input
            type="text"
            readOnly
            value={companyData?.TAM}
            className="onePager_input shadow-sm main_border"
          />
        </fieldset>

        <fieldset>
          <legend className="main_color">Service Addressable Market:</legend>
          <input
            type="text"
            readOnly
            value={companyData?.SAM}
            className="onePager_input shadow-sm main_border"
          />
        </fieldset>

        <fieldset>
          <legend className="main_color">Service Obtainable Market:</legend>
          <input
            type="text"
            readOnly
            value={companyData?.SOM}
            className="onePager_input shadow-sm main_border"
          />
        </fieldset>
      </div>
    </div>
  );
}
