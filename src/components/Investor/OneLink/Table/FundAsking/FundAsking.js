import React from "react";
import "./FundAsking.scss";
import PramodSq from "../../../../../Images/Pramod.jpeg";
import { useSelector } from "react-redux";
import { postStartUpData } from "../../../../../Service/user";

const FundAsking = ({ company, page }) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const handleUpdate = (field, event) => {
    const updatedValue = event.target.value;
    if (!updatedValue) return;
    postStartUpData({
      [field]: updatedValue,
      founderId: loggedInUser._id,
    })
      .then(({ data }) => {
        console.log(data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className=" fund_asking_container">
        <div className="col-md-12 col-lg-12 col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title px-2">Funding Ask (in lakhs)</h5>
              <img
                src={company?.logo}
                alt="image"
                style={{ height: "120px", width: "120px" }}
              />
              <hr />
              <div className="amount_text">
                {page === "oneViewEdit" ? (
                  <input
                    placeholder={company?.fundingAsk}
                    onBlur={(e) => handleUpdate("fundingAsk", e)}
                    className="px-2 py-1 fundAsk_input"
                    style={{ outline: "none" }}
                  />
                ) : (
                  <h6>{company?.fundingAsk}</h6>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FundAsking;
