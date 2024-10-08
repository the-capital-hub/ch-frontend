import React from "react";
import { useOutletContext } from "react-router-dom";

export default function PhilosophyTable() {
  const { company } = useOutletContext();
  const { revenue } = company;

  return (
    <div className="revenue_table">
      <div className="table_container overflow-x-auto pb-2">
        <fieldset className="border p-0 position-relative shadow-sm rounded-3 ">
          <legend className=" m-0 px-3 ms-3 rounded-pill bg-white ">
            Revenue
          </legend>
          <table className="d-l-grey">
            <tbody>
              <tr>
                <td className="text-center">Revenue</td>

                {revenue.map(({ year, amount }, index) => {
                  return (
                    <td key={index}>
                      <div className="h-50 d-flex align-items-stretch">
                        <div
                          className="w-50 border-end d-flex align-items-center"
                          style={{ minHeight: "50%" }}
                        >
                          <p className="m-0 ps-3" style={{ fontSize: "14px" }}>
                            {year}
                          </p>
                        </div>
                        {/* Amount here */}
                        <div className="w-50 d-flex align-items-center">
                          <p className="m-0 ps-3" style={{ fontSize: "14px" }}>
                            {amount}
                          </p>
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </fieldset>
      </div>
    </div>
  );
}
