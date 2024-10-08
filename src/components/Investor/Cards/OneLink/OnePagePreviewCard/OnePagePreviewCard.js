import React from "react";
import "./OnePagePreviewCard.scss";

const OnePagePreviewCard = () => {
  const cardData = [
    {
      title: "1.Problem",
      content: "Enter the problem statement your startup is addressing",
    },
    {
      title: "2.Solution",
      content: "Enter the solution your startup is offering",
    },
    { title: "3.Competitive Landscape", content: "Mention your competitors" },
    { title: "4.Revenue Model", content: "Your startup’s revenue model" },
    { title: "5.Growth Strategy", content: "Your Growth startegy" },
    { title: "6.Market Traction", content: "Your Market traction" },
    // { title: "7.Business Model", content: "Your Business Model" },
  ];

  return (
    <>
      <div className="row onepage_card_container">
        {cardData.map((card, index) => (
          <div className="col-md-4" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OnePagePreviewCard;
