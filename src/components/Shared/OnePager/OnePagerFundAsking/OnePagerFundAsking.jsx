import React from "react";

export default function OnePagerFundAsking({ companyData }) {

  return (
    <div className="onePager_fund__Asking">
      <h4 className="main_color">Fund Asking</h4>
      <div className="two_col_grid row-gap-4 column-gap-5">
        {companyData?.fundingsAsk.map((fund, index) => (
          <React.Fragment key={index}>
            <fieldset>
              <legend className="main_color">Required For</legend>
              <input
                type="text"
                readOnly
                value={fund.required || ""}
                className="onePager_input shadow-sm main_border"
              />
            </fieldset>
            <fieldset>
              <legend className="main_color">Amount</legend>
              <input
                type="text"
                readOnly
                value={fund.amount || ""}
                className="onePager_input shadow-sm main_border"
              />
            </fieldset>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
