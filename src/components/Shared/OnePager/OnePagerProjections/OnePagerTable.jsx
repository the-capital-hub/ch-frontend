import React from "react";
import "./OnePagerTable.scss";

export default function OnePagerTable({ heading, data }) {
  return (
    <div className="onePager_table_wrapper">
      <div className="table_container overflow-x-auto pb-2">
        <table className="border rounded-2 shadow-sm">
          <tbody>
            <tr>
              <td className="text-center fw-semibold">{heading}</td>
              {data?.map((amount, index) => (
                <td key={index}>
                  <div
                    className="w-50 border-end d-flex align-items-center"
                    style={{ minHeight: "50%" }}
                  >
                    <p className="m-0 ps-3" style={{ fontSize: "12px" }}>
                      Amount
                    </p>
                  </div>
                  <p className="m-0 ps-3" style={{ fontSize: "14px" }}>
                    {amount}
                  </p>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
