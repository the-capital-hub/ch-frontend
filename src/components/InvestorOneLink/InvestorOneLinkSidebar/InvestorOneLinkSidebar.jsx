import React, { useState, useEffect } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import { Link, useParams } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { AiOutlineSchedule } from "react-icons/ai";
import DefaultAvatar from "../../../Images/Chat/default-user-avatar.webp";
import { getInvestorFromOneLinkAPI } from "../../../Service/user";
import { RxRocket } from "react-icons/rx";

import "./InvestorOneLinkSidebar.scss";
import { useSelector } from "react-redux";
import { selectIsMobileView } from "../../../Store/features/design/designSlice";

export default function InvestorOneLinkSidebar({
  sidebarCollapsed,
  setSidebarCollapsed,
}) {
  const isMobileView = useSelector(selectIsMobileView);

  // get params
  const { oneLink } = useParams();
  const { userId } = useParams();
  const [investorData, setInvestorData] = useState(null);

  // States for touch events
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  useEffect(() => {
    getInvestorFromOneLinkAPI(oneLink, userId)
      .then(({ data }) => {
        setInvestorData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  // States
  const [currentTab, setCurrentTab] = useState("investorProfile");

  // Methods for touch events
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX && touchEndX) {
      const deltaX = touchEndX - touchStartX;
      if (deltaX < -50) {
        setSidebarCollapsed(false); // Expand the sidebar
      } else if (deltaX > 50) {
        setSidebarCollapsed(true); // Collapse the sidebar
      }
      setTouchStartX(null);
      setTouchEndX(null);
    }
  };

  return (
    <div className="investor_oneLink_sidebar_container">
      <div
        className={`container sidebar_container investor_onelink_view_sidebar  ${
          sidebarCollapsed ? "collapsed" : ""
        }`}
        onMouseLeave={() => {
          if (!isMobileView) {
            setSidebarCollapsed(true);
          }
        }}
        onMouseEnter={() => {
          if (!isMobileView) {
            setSidebarCollapsed(false);
          }
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div id="header">
          <ProSidebar collapsed={sidebarCollapsed}>
            {/* Sidebar Header */}
            <SidebarHeader>
              <div className="logotext">
                <>
                  <img
                    src={
                      investorData?.investor?.profilePicture || DefaultAvatar
                    }
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <h3 className={`${sidebarCollapsed ? "d-none" : "visible"}`}>
                    {investorData?.investor?.firstName}{" "}
                    {investorData?.investor?.lastName}
                  </h3>
                  <h4 className={`${sidebarCollapsed ? "d-none" : "visible"}`}>
                    {investorData?.investor?.email}
                  </h4>
                </>
              </div>
            </SidebarHeader>

            {/* Sidebar Content */}
            <SidebarContent>
              <Menu iconShape="round">
                {/* Investor Profile */}
                <MenuItem
                  active={currentTab === "investorProfile"}
                  className="active-item"
                  onClick={() => setCurrentTab("investorProfile")}
                >
                  <Link to="">
                    <ImProfile size="22" />
                    {!sidebarCollapsed && <span>Investor Profile</span>}
                  </Link>
                </MenuItem>

                {/* Startups Invested */}
                <MenuItem
                  active={currentTab === "startupsInvested"}
                  className="active-item"
                  onClick={() => setCurrentTab("startupsInvested")}
                >
                  <Link to="startups-invested">
                    <RxRocket size={22} />
                    {!sidebarCollapsed && <span>Startups Invested</span>}
                  </Link>
                </MenuItem>

                {/* Investment Philosophy */}
                <MenuItem
                  active={currentTab === "philosophy"}
                  className="active-item"
                  onClick={() => setCurrentTab("philosophy")}
                >
                  <Link to="investment-philosophy">
                    <FaWandMagicSparkles size="22" />
                    {!sidebarCollapsed && <span>Philosophy</span>}
                  </Link>
                </MenuItem>

                {/* Appointment */}
                <MenuItem
                  active={currentTab === "appointment"}
                  className="active-item"
                  onClick={() => setCurrentTab("appointment")}
                >
                  <Link to="appointment">
                    <AiOutlineSchedule size={22} />
                    {!sidebarCollapsed && <span>Appointment</span>}
                  </Link>
                </MenuItem>
              </Menu>
            </SidebarContent>
            {/* <SidebarFooter>
          </SidebarFooter> */}
          </ProSidebar>
        </div>
      </div>
    </div>
  );
}
