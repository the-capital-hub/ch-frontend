import React from "react";
import "./newscorner.scss";
import { Link } from "react-router-dom";
import startupOneImage from "../../../../Images/blog/1 AsPGU1Q42C9lsVRoMg91Nw.webp";
import startupTwoImage from "../../../../Images/blog/eighttips.webp";
import startupThreeImage from "../../../../Images/blog/threefive.webp";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../../Store/features/design/designSlice";

const NewsCorner = ({ title, btnlink }) => {
  const theme = useSelector(selectTheme)
  // Fetch news items
  const newsItems = [
    {
      title:
        "Why Mentoring Matters: Why Angel Investors Should Prioritize Mentorship Before Investing in a Startup",
      btnlink: "/blog/startupOne",
      image: startupOneImage,
      id: 1,
    },
    {
      title: "8 Tips to start raising Angel investments for startups",
      btnlink: "/blog/startupTwo",
      image: startupTwoImage,
      id: 2,
    },
    {
      title: "HOW TO BUILD A GREAT STARTUP by Pramod Badiger",
      btnlink: "/blog/startupThree",
      image: startupThreeImage,
      id: 3,
    },
  ];

  return (
    <>
      <div className="newscorner_container">
        <div className="col-12 newscorner_card">
          <div className="card mt-2 right_view_profile_card right_view_profile">
            <div className="card-header">
              <div className="title">
                <span>News Corner</span>
              </div>
            </div>
            {newsItems.map((item, index) => (
              <Link
                to={item.btnlink ? item.btnlink : ""}
                style={{ textDecoration: "none" }}
                target="_blank"
                className="card-body newscorner_card_body "
                key={item.id}
              >
                <div className="newscorner_card_text d-flex align-items-center gap-1">
                  <h4 className="smallest_typo" style={{color:theme==="dark"?"#fff":"#000"}}>
                    {item.title
                      ? item.title
                      : " Cellbell startup has raised to $10 million dollor funding"}
                  </h4>
                  <div className="newsImage__container">
                    <img
                      src={item.image}
                      alt="News"
                      style={{
                        width: "100px",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  {/* <Link
                      to={item.btnlink ? item.btnlink : ""}
                      style={{ textDecoration: "none" }}
                      target="_blank"
                      className="d-flex justify-content-center align-items-center mt-1 show__more__link mx-auto"
                    >
                      <button className="d-flex align-items-center justify-content-center show__more">
                        <span className="text-center">Show more</span>
                      </button>
                    </Link> */}
                </div>
              </Link>
            ))}
            {/* <hr className="hr" /> */}
            {/* <div className="card-body newscorner_card_body ">
              <div className="newscorner_card_text">
                <h4 className="smallest_typo">
                  {title
                    ? title
                    : " Cellbell startup has raised to $10 million dollor funding"}
                </h4>
                <Link to={btnlink ? btnlink : ""} style={{textDecoration:"none"}}>
                  <button>
                    <span>Show more</span>
                  </button>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsCorner;
