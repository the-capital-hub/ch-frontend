import React, { useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
// import ArrowLeft from "../../../Images/investorsidebar/ArrowLeft.svg";
// import ArrowRight from "../../../Images/investorsidebar/ArrowRight.svg";
// import Setting from "../../../Images/investorsidebar/Settings.svg";
// import Support from "../../../Images/investorsidebar/Support.svg";
// import HomeIcon from "../../../Images/investorIcon/home.svg";
// import myStartUpIcon from "../../../Images/Investor/Sidebar/MyStartUps.svg";
// import exploreIcon from "../../../Images/Investor/Sidebar/explore.svg";
// import syndicateIcon from "../../../Images/Investor/Sidebar/syndicates.svg";
// import liveDealsIcon from "../../../Images/Investor/Sidebar/Live Deals.svg";
// import mySchedulesIcon from "../../../Images/Investor/Sidebar/My Schedules.svg";
// import savedPostsIcon from "../../../Images/Investor/Sidebar/SavedPosts.svg";
// import ExitIcon from "../../../Images/investorIcon/Exit.svg";
// import InvestorIcon from "../../../Images/investorIcon/Pot.svg";
// import PlusIcon from "../../../Images/investorIcon/Plus.svg";
import "react-pro-sidebar/dist/css/styles.css";
import { IoNewspaper } from "react-icons/io5";
import "./SideBar.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogOutPopUp from "../../PopUp/LogOutPopUp/LogOutPopUp";
import BatchImag from "../../../Images/tick-mark.png"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { logout } from "../../../Store/features/user/userSlice";
// import connectionsIcon from "../../../Images/investorsidebar/connection.svg";
import { PlusIcon } from "../SvgIcons";
// import companyProfileIcon from "../../../Images/Investor/Sidebar/company.svg";
import { BsChevronDown, BsChevronUp, BsLink45Deg } from "react-icons/bs";
import { ModalBsLauncher } from "../../PopUp/ModalBS";
import { FaHandshakeAngle } from "react-icons/fa6";
import CommunitiesIcon from "../../Investor/ChatComponents/CommunitiesIcon";
import { clearAllChatsData } from "../../../Store/features/chat/chatSlice";
import { GoHome } from "react-icons/go";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import {
  IoCompassOutline,
  IoExitOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import IconMyStartups from "../../Investor/SvgIcons/IconMyStartups";
import IconClock from "../../Investor/SvgIcons/IconClock";
import { PiFloppyDiskBackLight, PiSparkleLight } from "react-icons/pi";
import { HiOutlineUserPlus } from "react-icons/hi2";
import Batch from "../../Batch";
import OnboardingSwitch from "../../Investor/InvestorNavbar/OnboardingSwitch/OnboardingSwitch";
import { IoCalendarOutline } from "react-icons/io5";


// Investor Sidebar
const SideBar = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const {isInvestor} = useSelector((state)=> state.user.loggedInUser)
  const isMobileView = useSelector((state) => state.design.isMobileView);
  const [isCommunityDetailOpen, setIsCommunityDetailOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [isMeetingDetailOpen, setIsMeetingDetailOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  // const menuIconClick = () => {
  //   setSidebarCollapsed(true);
  // };

  const handleLogout = () => {
    // Step 3: Show the logout popup
    setShowLogoutPopup(true);
  };

  const handleLinkClick = () => {
		if (isMobileView) setSidebarCollapsed(true);
	};

  const handleLogoutLogic = () => {
    dispatch(logout());
    dispatch(clearAllChatsData);
    localStorage.removeItem("isLoggedIn");

    navigate("/login");
  };

  function handleMyCommunityClick() {
    navigate("/chats?isCommunityOpen=true");
  }

  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

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
    <div
      className={`container newInvestor_sidebar_container ${
        sidebarCollapsed ? "collapsed" : ""
      }`}
      onMouseLeave={() => {
        if (!isMobileView) {
          setSidebarCollapsed(true);
          setIsCommunityDetailOpen(false);
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
          <SidebarHeader>
            <div className="logotext">
              {sidebarCollapsed ? (
                <div
                    style={{
                      border: loggedInUser.isSubscribed
                        ? "3px solid rgb(211, 243, 107)"
                        : "",
                      borderRadius: "50%",
                      zIndex: 0,
                    }}
                  >
                <Link
                  // onClick={() => setSidebarCollapsed(true)}
                  to={"/investor/profile"}
                >
                  <img
                    // className="rounded-circle"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                    src={loggedInUser.profilePicture}
                    alt="User profile"
                  />
                </Link>
                
                </div>
              ) : (
                <>
                <div
                    style={{
                      border: loggedInUser.isSubscribed
                        ? "3px solid rgb(211, 243, 107)"
                        : "",
                      borderRadius: "50%",
                      zIndex: 0,
                    }}
                  >
                  <Link
                    // onClick={() => setSidebarCollapsed(true)}
                    to={"/investor/profile"}
                  >
                    {" "}
                    <img
                      className="rounded-circle"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                      src={loggedInUser.profilePicture}
                      alt="User profile"
                    />
                  </Link>
                 
                  </div>
                  <h3
                    style={{
                      fontSize: "20px",
                      color: loggedInUser?.isSubscribed ? "transparent" : "var(--investor)",
                      background: loggedInUser?.isSubscribed
                        ? "linear-gradient(180deg, #B68C3C 0%, #F4DD71 100%)"
                        : "none",
                      WebkitBackgroundClip: loggedInUser?.isSubscribed ? "text" : "none",
                    }}
                    className="mt-2"
                  >
                    {loggedInUser?.firstName} {loggedInUser?.lastName}
                    {loggedInUser.isSubscribed && <img
              src={BatchImag}
              style={{
                width: "1.2rem",
                height: "1.2rem",
                objectFit: "contain",
                marginLeft: "0.5rem", // Optional: adds space between the name and the icon
              }}
              alt="Batch Icon"
            />}
                  </h3>

                  <h3 style={{ fontSize: "13px" }}>{loggedInUser?.userName}</h3>
                </>
              )}
            </div>
            {/* <div className="closemenu" onClick={menuIconClick}>
              {sidebarCollapsed ? (
                <img className="closemenu-Right" src={ArrowRight} alt="image" />
              ) : (
                <img className="closemenu-Left" src={ArrowLeft} alt="image" />
              )}
            </div> */}
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="round">
              <MenuItem
                // active={location.pathname.includes("/")}
                className=""
              >
                <Link
                  // onClick={() => setSidebarCollapsed(true)}
                  to="/investor/home?showPopup=true"
                  id="sidebar_createAPost"
                >
                  {sidebarCollapsed ? (
                    <>
                      <button className="plus_btn_newInvestor">
                        {/* <img src={PlusIcon} alt="image" /> */}
                        <PlusIcon color="black" width="24" height="24" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="create_post_newInvestor">
                        {/* <span>Create a Post</span>
                        <img src={PlusIcon} alt="image" /> */}
                        <span className="text-black ms-0">Create Post</span>
                        {/* <img src={PlusIcon} alt="image" /> */}
                        <PlusIcon color="black" width="24" height="24" />
                      </button>
                    </>
                  )}
                </Link>
              </MenuItem>
              <MenuItem
                active={location.pathname.includes("/home")}
                className="active-item"
              >
                <Link
                  // onClick={() => setSidebarCollapsed(true)}
                  to="/investor/home"
                  id="sidebar_home"
                >
                  {/* <img src={HomeIcon} alt="link to Home" /> */}
                  <GoHome size={25} />
                  {!sidebarCollapsed && <span className="">Home</span>}
                </Link>
              </MenuItem>

              <MenuItem
                active={location.pathname.includes("/company-profile")}
                className="active-item"
              >
                <Link
                  // onClick={() => setSidebarCollapsed(true)}
                  to="/investor/company-profile"
                  id="sidebar_companyProfile"
                >
                  {/* <img src={companyProfileIcon} alt="link to Company Profile" /> */}
                  <HiOutlineOfficeBuilding size={25} />
                  {!sidebarCollapsed && <span className="">Company</span>}
                </Link>
              </MenuItem>
              <MenuItem
                active={location.pathname.includes("/live-deals")}
                className="active-item"
              >
                <Link
                  // onClick={() => setSidebarCollapsed(true)}
                  to="/investor/live-deals"
                  id="sidebar_myStartups"
                >
                  {/* <img
                  src={myStartUpIcon}
                  alt="link for My Startups"
                  width="17px"
                  height="17px"
                /> */}
                  <FaHandshakeAngle size={25} />
                  {!sidebarCollapsed && <span className="">Live Deals</span>}
                </Link>
              </MenuItem>
              <MenuItem
                active={location.pathname.includes("/onelink")}
                className="active-item"
              >
                <Link
                  // onClick={() => setSidebarCollapsed(true)}
                  to="/investor/onelink"
                  id="sidebar_onelink"
                >
                  <BsLink45Deg size={"25px"} />
                  {!sidebarCollapsed && <span className="">OneLink</span>}
                </Link>
              </MenuItem>

              <MenuItem
                active={location.pathname.includes("/chats")}
                className="active-item"
              >
                <div
                  className="sidebar__community d-flex gap-4 "
                  id="sidebar_community"
                >
                  <div
                    onClick={() => {
                      setSidebarCollapsed(true);
                      setIsCommunityDetailOpen(false);
                    }}
                  >
                    <CommunitiesIcon
                      width="25px"
                      height="25px"
                      color={`${
                        isCommunityDetailOpen
                          ? "var(--currentTheme-dark)"
                          : "var(--d-l-grey)"
                      }`}
                    />
                  </div>
                  {!sidebarCollapsed && (
                    <details className="">
                      <summary
                        className="d-flex align-items-center gap-2"
                        onClick={() =>
                          setIsCommunityDetailOpen(!isCommunityDetailOpen)
                        }
                      >
                        Community
                        {isCommunityDetailOpen ? (
                          <BsChevronUp />
                        ) : (
                          <BsChevronDown />
                        )}
                      </summary>
                      <div className="d-flex flex-column gap-2">
                        {/* Add new */}
                        <ModalBsLauncher
                          id="AddNewCommunity"
                          className="sidebar__community__btn m-0 "
                        >
                          <p className="m-0">Create a Community</p>
                        </ModalBsLauncher>
                        <button
                          className="sidebar__community__btn shadow-none"
                          onClick={handleMyCommunityClick}
                        >
                          My Community
                        </button>
                      </div>
                    </details>
                  )}
                </div>
              </MenuItem>

              <MenuItem
                active={location.pathname.includes("/explore")}
                className="active-item"
              >
                <Link
                  // onClick={() => setSidebarCollapsed(true)}
                  to="/investor/explore"
                  id="sidebar_explore"
                >
                  {/* <img
                    src={exploreIcon}
                    alt="link for Explore"
                    width="17px"
                    height="17px"
                  /> */}
                  <IoCompassOutline size={25} />
                  {!sidebarCollapsed && <span className="">Explore</span>}
                </Link>
              </MenuItem>
              <MenuItem
                active={location.pathname.includes("/news")}
                className="active-item"
              >
                <Link to="/investor/news" id="sidebar_news">
                  <IoNewspaper size={25} />
                  {!sidebarCollapsed && <span>News</span>}
                </Link>
              </MenuItem>
              <MenuItem
                active={location.pathname.includes("/mystartups")}
                className="active-item"
              >
                <Link
                  // onClick={() => setSidebarCollapsed(true)}
                  to="/investor/mystartups"
                  id="sidebar_myStartups"
                >
                  {/* <img
                    src={myStartUpIcon}
                    alt="link for My Startups"
                    width="17px"
                    height="17px"
                  /> */}
                  <IconMyStartups height="25px" width="25px" />
                  {!sidebarCollapsed && <span className="">My StartUps</span>}
                </Link>
              </MenuItem>
              <MenuItem
                active={location.pathname.includes("/my-schedule")}
                className="active-item"
              >
                <Link
                  // onClick={() => setSidebarCollapsed(true)}
                  to="/investor/my-schedule"
                  id="sidebar_mySchedule"
                >
                  {/* <img
                    src={mySchedulesIcon}
                    alt="link for My Schedules"
                    width="17px"
                    height="17px"
                  /> */}
                  <IconClock height="25px" width="25px" />
                  {!sidebarCollapsed && <span className="">My Schedules</span>}
                </Link>
              </MenuItem>
              <MenuItem
								active={location.pathname.includes("/chats")}
								className="active-item"
							>
								<div
									className="sidebar__community d-flex gap-4"
									id="sidebar_community"
								>
									<div onClick={handleLinkClick}>
										<IoCalendarOutline
											size={25}
											color={`${
												isMeetingDetailOpen ? "#d3f36b" : "var(--d-l-grey)"
											}`}
											className="me-1"
										/>
									</div>
									{!sidebarCollapsed && (
										<details className="">
											<summary
												className="d-flex align-items-center gap-2"
												onClick={() =>
													setIsMeetingDetailOpen(!isMeetingDetailOpen)
												}
											>
												Meetings
												{isMeetingDetailOpen ? (
													<BsChevronUp />
												) : (
													<BsChevronDown />
												)}
											</summary>
											<div className="d-flex flex-column gap-2">
												<button
													className="sidebar__community__btn shadow-none"
													onClick={() => {
														setSidebarCollapsed(true);
														navigate("/investor/meeting/events");
													}}
												>
													Events
												</button>
												<button
													className="sidebar__community__btn shadow-none"
													onClick={() => {
														setSidebarCollapsed(true);
														navigate("/investor/meeting/plans");
													}}
												>
													Plans
												</button>
												<button
													className="sidebar__community__btn shadow-none"
													onClick={() => {
														setSidebarCollapsed(true);
														navigate("/investor/meeting/availability");
													}}
												>
													Availability
												</button>
											</div>
										</details>
									)}
								</div>
							</MenuItem>
              <MenuItem
                active={location.pathname.includes("/saved-posts")}
                className="active-item"
              >
                <Link
                  // onClick={() => setSidebarCollapsed(true)}
                  to="/investor/saved-posts"
                  id="sidebar_savedPosts"
                >
                  {/* <img
                    src={savedPostsIcon}
                    alt="link for Saved Posts"
                    width="17px"
                    height="17px"
                  /> */}
                  <PiFloppyDiskBackLight size={25} />
                  {!sidebarCollapsed && <span className="">Saved Posts</span>}
                </Link>
              </MenuItem>
              <MenuItem
                active={location.pathname.includes("/connection")}
                className="active-item"
              >
                <Link
                  // onClick={() => setSidebarCollapsed(true)}
                  to="/investor/connection"
                  id="sidebar_connections"
                >
                  {/* <img
                    src={connectionsIcon}
                    alt="link for Connections"
                    width="17px"
                    height="17px"
                  /> */}
                  <HiOutlineUserPlus size={25} />
                  {!sidebarCollapsed && <span className="">Connection</span>}
                </Link>
              </MenuItem>

              <MenuItem
                active={location.pathname.includes("/settings")}
                className="active-item"
              >
                <Link
                  // onClick={() => setSidebarCollapsed(true)}
                  to="/investor/settings"
                  id="sidebar_settings"
                >
                  <IoSettingsOutline size={25} />
                  {!sidebarCollapsed && <span className="">Settings</span>}
                </Link>
              </MenuItem>

              {/* <MenuItem
                // active={location.pathname.includes("")}
                className="active-item"
              > */}
              {/* <Link
                  // onClick={() => setSidebarCollapsed(true)}
                  to="/"
                > */}
              {/* <img src={HomeIcon} alt="link to main landing page" /> */}
              {/* <PiSparkleLight size={25} />
                  {!sidebarCollapsed && <span>Learn More</span>}
                </Link>
              </MenuItem> */}
              {/* <MenuItem
                active={location.pathname.includes("/syndicates")}
                className="active-item"
              >
                <Link
                  // onClick={() => setSidebarCollapsed(true)}
                  to="/investor/syndicates"
                >
                  <img
                    src={syndicateIcon}
                    alt="image"
                    width="17px"
                    height="17px"
                  />
                  {!sidebarCollapsed && (
                    <span className="">Syndicates</span>
                  )}
                </Link>
              </MenuItem> */}

              {/* <MenuItem
                active={location.pathname.includes("/live-deals")}
                className="active-item"
              >
                <Link
                  // onClick={() => setSidebarCollapsed(true)}
                  to="/investor/live-deals"
                >
                  <img
                    src={liveDealsIcon}
                    alt="image"
                    width="17px"
                    height="17px"
                  />
                  {!sidebarCollapsed && (
                    <span className="">Live Deals</span>
                  )}
                </Link>
              </MenuItem> */}

              {/* <MenuItem
                active={location.pathname.includes("/investors")}
                className="active-item"
              >
                <Link onClick={() => setSidebarCollapsed(true)} to="/investors">
                  <img
                    src={InvestorIcon}
                    alt="image"
                    width="17px"
                    height="17px"
                  />
                  {!sidebarCollapsed && <span>Investors</span>}
                </Link>
              </MenuItem>
              <MenuItem
                active={location.pathname.includes("/connection")}
                className="active-item"
              >
                <Link
                  onClick={() => setSidebarCollapsed(true)}
                  to="/connection"
                >
                  <img
                    src={connectionsIcon}
                    alt="image"
                    width="17px"
                    height="17px"
                  />
                  {!sidebarCollapsed && <span>Connnections</span>}
                </Link>
              </MenuItem>

              <hr className="hr-above-support" />
              <MenuItem
                active={location.pathname.includes("/support")}
                className="active-item"
              >
                <Link onClick={() => setSidebarCollapsed(true)} to="/support">
                  <img src={Support} alt="image" width="17px" height="17px" />
                  {!sidebarCollapsed && <span>Support</span>}
                </Link>
              </MenuItem> */}
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="round">
            <MenuItem >
                
                <div className="d-flex justify-content-center align-items-center mobile-onboarding">
                  
                  {!sidebarCollapsed && <OnboardingSwitch/>}
                </div>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                {/* <img src={ExitIcon} alt="logout" width="17px" height="17px" /> */}
                <div className="d-flex justify-content-center align-items-center">
                  <IoExitOutline size={25} />
                  {!sidebarCollapsed && <span>Log out</span>}
                </div>
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
      {showLogoutPopup && (
        <LogOutPopUp
          setShowLogoutPopup={setShowLogoutPopup} // Make sure this prop is passed correctly
          handleLogoutLogic={handleLogoutLogic}
          showLogoutPopup
          isInvestor={true}
        />
      )}
    </div>
  );
};

export default SideBar;
