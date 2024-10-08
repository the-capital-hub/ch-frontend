import React from "react";
import "./OneLinkMarketSection.scss";
import { useSelector } from "react-redux";
import { postStartUpData } from "../../../../../Service/user";

const OneLinkMarketSection = ({ company, page }) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const cardData = [
    {
      field: "TAM",
      // title: "title",
      content: "TAM", // (Total Addressable Market)
    },
    {
      field: "SAM",
      // title: "2.Solution",
      content: "SAM", // (Servicable Addressable Market)
    },
    {
      field: "SOM",
      // title: "3.Competitive Landscape",
      content: "SOM", // (Serviceable Obtainable Market)
    },
    // { title: "7.Business Model", content: "Your Business Model" },
  ];

  const handleUpdate = (field, event) => {
    const updatedValue = event.target.value;
    if (!updatedValue) return;
    postStartUpData({
      [field]: updatedValue,
      founderId: loggedInUser._id,
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="row onelink_market_container">
        {cardData.map((card, index) => (
          <div className="col-md-4 before_card" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.content}</p>
                {page === "oneLinkEdit" ? (
                  <input
                    // placeholder={company[card.field]}
                    onBlur={(e) => handleUpdate([card.field], e)}
                  />
                ) : (
                  <h6>{company[card.field]}</h6>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OneLinkMarketSection;
