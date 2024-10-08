import React, { useState } from "react";
import "./ourstartup.scss";
import { Link } from "react-router-dom";

const OurStartUp = () => {
  const [selectedLink, setSelectedLink] = useState("fintech");

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  return (
    <div className="container our_startup_main_container">
      <div className="row d-flex align-items-center justify-content-between startups_title ">
        <h3>Our Startups</h3>
        <div className="col-md-4 our_startups">
          <ul id="navbar" className="d-flex justify-content-center">
            <li>
              <Link
                className={selectedLink === "fintech" ? "active" : ""}
                onClick={() => handleLinkClick("fintech")}
              >
                Fintech
              </Link>
            </li>
            <li>
              <Link
                className={selectedLink === "edutech" ? "active" : ""}
                onClick={() => handleLinkClick("edutech")}
              >
                Edutech
              </Link>
            </li>
            <li>
              <Link
                className={selectedLink === "agreective" ? "active" : ""}
                onClick={() => handleLinkClick("agreective")}
              >
                Agritech
              </Link>
            </li>
            <li>
              <Link
                className={selectedLink === "invest" ? "active" : ""}
                onClick={() => handleLinkClick("invest")}
              >
                Invest
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-4 title_text d-flex justify-content-end invest_now_startup_btn">
        <Link to={'/contactus'} style={{textDecoration:"none"}}>  <button className="startups_section_btn">Invest now</button></Link>
        </div>
      </div>
      <div className="row d-flex justify-content-between align-items-center pt-5 pb-5 our_startup_container">
        {/* Conditionally render the corresponding card based on the selectedLink */}
        <div className="col-md-2 fintech_card"> </div>
        {selectedLink === "fintech" && (
          <>
            <div className="col-md-2 fintech_card"> </div>
            <div className="col-md-2 fintech_card"> </div>
            <div className="col-md-2 fintech_card"> </div>
          </>
        )}
        {selectedLink === "edutech" && (
          <div className="col-12 col-md-2 edutech_card fintech_card"></div>
        )}
        {selectedLink === "agreective" && (
          <>
            <div className="col-12 col-md-2 agreective_card fintech_card"></div>
            <div className="col-12 col-md-2 agreective_card fintech_card"></div>
            <div className="col-12 col-md-2 agreective_card fintech_card"></div>
          </>
        )}
        {selectedLink === "invest" && (
          <div className="col-12 col-md-2 invest_card fintech_card"></div>
        )}
      </div>
    </div>
  );
};

export default OurStartUp;
