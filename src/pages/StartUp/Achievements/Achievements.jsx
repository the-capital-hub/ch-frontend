import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import "./Achievements.scss";

import img_3 from "../../../Images/Investor/Achievements/img_3.png";
import silver from "../../../Images/Investor/Achievements/silver.png";
import gold from "../../../Images/Investor/Achievements/gold.png";
import bronze from "../../../Images/Investor/Achievements/bronze.png";
import rectangle from "../../../Images/Investor/Achievements/Rectangle.png";
// import { getUserAchievements } from "../../../Service/user";
import SpinnerBS from "../../../components/Shared/Spinner/SpinnerBS";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../Store/features/design/designSlice";

function Achievements() {
  const [completedAchievements, setCompletedAchievements] = useState([]);
  const [inCompleteAchievements, setInCompleteAchievements] = useState([]);
  const [goldCount, setGoldCount] = useState(0);
  const [silverCount, setSilverCount] = useState(0);
  const [bronzeCount, setBronzeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeMedal, setActiveMedal] = useState("gold");
  const [filteredAchievements, setFilteredAchievements] = useState([]);

  const getAchievements = useCallback(async () => {
    try {
      setLoading(true);
      // const response = await getUserAchievements();
      // setCompletedAchievements(response?.data.completed);
      // setInCompleteAchievements(response?.data.incomplete);

      // const gCount =
      //   response?.data.completed?.filter((medal) => medal.badge === "gold") ||
      //   [];
      // setGoldCount(gCount.length);

      // const sCount =
      //   response?.data.completed?.filter((medal) => medal.badge === "silver") ||
      //   [];
      // setSilverCount(sCount.length);

      // const bCount =
      //   response?.data.completed?.filter((medal) => medal.badge === "bronze") ||
      //   [];
      // setBronzeCount(bCount.length);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    getAchievements();

    // Update title
    document.title = "Achievements | The Capital Hub";
    dispatch(setPageTitle("Achievements"));
  }, []);

  const handleMedalClick = (medalType) => {
    setActiveMedal(medalType);
    if (medalType === "incomplete") {
      setFilteredAchievements(inCompleteAchievements);
    } else {
      setFilteredAchievements(
        completedAchievements.filter((item) => item.badge === medalType)
      );
    }
  };

  const badgeImageMap = {
    silver: silver,
    bronze: bronze,
    gold: gold,
  };

  const medals = [
    { image: gold, h1: `Gold (${goldCount})`, badge: "gold" },
    { image: silver, h1: `Silver (${silverCount})`, badge: "silver" },
    { image: bronze, h1: `Bronze (${bronzeCount})`, badge: "bronze" },
    {
      image: img_3,
      h1: `Incomplete (${inCompleteAchievements?.length})`,
      badge: "incomplete",
    },
  ];

  return (
    <section className="startup_achievements_section d-flex flex-column align-items-evenly py-2 mx-2 mx-md-5  shadow-sm rounded-4">
      <Nav
        variant="underline"
        fill
        defaultActiveKey="gold"
        className="nav-tabs"
      >
        {medals?.map((item, index) => (
          <Nav.Item key={index}>
            <Nav.Link
              eventKey={item.badge}
              onClick={() => handleMedalClick(item.badge)}
              className="text-decoration-none border-top-0 border-start-0 border-end-0"
            >
              <img
                src={item.image}
                alt={item.badge}
                width={55}
                height={55}
                className={`rounded-pill ${
                  activeMedal === item.h1.toLowerCase() ? "active-medal" : ""
                }`}
              />
              <h5>{item.h1}</h5>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <div className="Achievements">
        {loading ? (
          <div className="container p-5 text-secondary  text-center my-5  rounded-5 ">
            <SpinnerBS />
          </div>
        ) : filteredAchievements?.length ? (
          <section className="row m-0 row-cols-4 row-cols-md-5 row-cols-lg-7 justify-content-around">
            {filteredAchievements.map((item, index) => (
              <div className="single-card col" key={index}>
                <img
                  src={badgeImageMap[item.badge]}
                  alt="achievement"
                  className="badge-icon"
                />
                <div className="image_text">
                  <img src={rectangle} alt="rectangle" className="w-100" />
                  <div className="text py-2">
                    <h6>{item.title}</h6>
                  </div>
                </div>
                <p className="description fs-xs">{item.description}</p>
              </div>
            ))}
          </section>
        ) : (
          <h5 className="text-center text-secondary my-5">
            No {activeMedal} achievement yet
          </h5>
        )}
      </div>
    </section>
  );
}

export default Achievements;
