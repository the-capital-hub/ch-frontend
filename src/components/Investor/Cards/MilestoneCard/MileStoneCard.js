import React, { useState } from "react";
import './style.scss'

const Card = () => {
  const [visibleCards, setVisibleCards] = useState(4);
  const [allCards] = useState([
    "Card 1",
    "Card 2",
    "Card 3",
    "Card 4",
    "Card 5",
    "Card 6",
    "Card 7",
    "Card 8",
    "Card 9",
    "Card 10",
    "Card 11",
    "Card 12",
    "Card 13",
    "Card 14",
    "Card 15",
    "Card 16",
    "Card 17",
    "Card 18",
    "Card 19",
    "Card 20"
  ]);

  const handleSeeMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);
  };

  return (
    <div className="card-container">
      {allCards.slice(0, visibleCards).map((card, index) => (
        <div key={index} className="card_layout">
          {card}
        </div>
      ))}

      {visibleCards < allCards.length && (
        <button onClick={handleSeeMore}>See More</button>
      )}
    </div>
  );
};

export default Card;
