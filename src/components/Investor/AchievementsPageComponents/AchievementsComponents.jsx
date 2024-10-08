import React, { useEffect, useState } from "react";
import "./AchievementsComponents.scss";
import silver from "../../../Images/Investor/Achievements/silver.png";
import gold from "../../../Images/Investor/Achievements/gold.png";
import bronze from "../../../Images/Investor/Achievements/bronze.png";
import rectangle from "../../../Images/Investor/Achievements/Rectangle.png";
import { getUserAchievements } from "../../../Service/user";

function AchievementsComponents() {
  const [completedAchievements, setCompletedAchievements] = useState([]);

  const getAchievements = async () => {
    try {
      const response = await getUserAchievements();
      setCompletedAchievements(response?.data.completed);
    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
    getAchievements();
  }, [])

  const badgeImageMap = {
    silver: silver,
    bronze: bronze,
    gold: gold,
  };

  return (
    <div className="achievements_components m-3 pb-2 d-flex flex-md-row justify-content-start gap-4">
      {completedAchievements?.map((item, index) => (
        <div className="single-card" key={index}>
          <img src={badgeImageMap[item.badge]} alt="achievement" />
          <div className="image_text">
            <img src={rectangle} alt="rectangle" />
            <div className="text">
              <h6>{item.title}</h6>
              {/* <h6>{item.p}</h6> */}

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AchievementsComponents;
