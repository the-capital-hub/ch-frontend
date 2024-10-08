import React from "react";
import "./TeamCard.scss";
import PramodSq from "../../../../../Images/Pramod.jpeg";

const TeamCard = () => {
  const cardData = [
    {
      title: "team",
      content: "Enter the problem statement your startup is addressing",
    },
    {
      title: "team2",
      content: "Enter the solution your startup is offering",
    },
    { title: "team3", content: "Mention your competitors" },
    { title: "team4", content: "Your startup’s revenue model" },
    { title: "team5", content: "Your Growth startegy" },
    { title: "team6", content: "Your Market traction" },
    // { title: "7.Business Model", content: "Your Business Model" },
  ];
  return (
    <>
      <div className="row team_card_container">
        {cardData.map((card, index) => (
          <div className="col-md-4" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <img src={PramodSq} alt="image" style={{height:"120px", width:"120px"}}/>
                <div className="company_text">
                  <h6>Enter company description </h6>
                  <hr />
                  <h6>Eg: India’s best startup platfrom</h6>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamCard;
