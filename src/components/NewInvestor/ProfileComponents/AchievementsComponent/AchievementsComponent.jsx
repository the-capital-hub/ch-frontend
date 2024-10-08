import React, { useEffect, useState } from "react";
import rectangle from "../../../../Images/Investor/Achievements/Rectangle.png";
import silver from "../../../../Images/Investor/Achievements/silver.png";
import gold from "../../../../Images/Investor/Achievements/gold.png";
import bronze from "../../../../Images/Investor/Achievements/bronze.png";
import './AchievementsComponent.scss'
import { Link } from "react-router-dom";
import { getUserAchievements } from "../../../../Service/user";

export default function AchievementsComponent() {

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
    <>
      <div className="AchievementsComponent border shadow-sm">
        <div className="header border-bottom p-4 ">
          <h2 className="green_underline typography">Achievements
          </h2>
          <div className="">
            <p

              className={"green_button px-2 px-sm-3 "}
            >
              <Link to={"/investor/profile/achievements"}>See more</Link>

            </p>
          </div>
        </div>
        {/* Loop cards here */}
        <div className="achievements_cards px-3 py-4">
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

      </div>
    </>
  );
}
