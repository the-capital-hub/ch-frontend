import React, { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem, SidebarHeader, SidebarContent } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import IconUser from "../../Investor/SvgIcons/IconUser";
import IconFile from "../../Investor/SvgIcons/IconFile";
import { IoDocumentsOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { getUserById } from "../../../Service/user";
import "../../Investor/InvestorSidebar/investorsidebar.scss";
import "./SideBar.scss";
import MobileNavbar from "../../Shared/MobileNavbar/MobileNavbar";
import MobileOneLinkNavbar from "../../Shared/MobileOnelinkNavbar/MobileOneLinkNavbar";

const SideBar = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const isMobileView = useSelector((state) => state.design.isMobileView);
  const location = useLocation();
  const { username, userId } = useParams();

  const [user, setUser] = useState({});
  const [currentTab, setCurrentTab] = useState(
    location.pathname.includes("documentation") ? "documentation" :
    location.pathname.split("/").slice(-1)[0] === userId ? "company" :
    location.pathname.split("/").slice(-1)[0]
  );

  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  useEffect(() => {
    getUserById(username, userId)
      .then(({ data }) => setUser(data))
      .catch(() => setUser({}));
  }, [username, userId]);

  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchMove = (e) => setTouchEndX(e.touches[0].clientX);

  const handleTouchEnd = () => {
    if (touchStartX && touchEndX) {
      const deltaX = touchEndX - touchStartX;
      if (deltaX < -50) setSidebarCollapsed(false);
      else if (deltaX > 50) setSidebarCollapsed(true);
      setTouchStartX(null);
      setTouchEndX(null);
    }
  };

  const menuItems = [
    { label: "Company", icon: <HiOutlineOfficeBuilding size={25} />, path: "", tab: "company" },
    { label: "Profile", icon: <IconUser height={25} width={25} />, path: "profile", tab: "profile" },
    { label: "Invest", icon: <RiMoneyDollarCircleLine size={!isMobileView ? "25" : "65"} />, path: "investnow", tab: "investnow", className: "invest-now" },
    { label: "Updates", icon: <IconFile width={25} height={25} />, path: "onepager", tab: "onepager" },
    { label: "Doc", icon: <IoDocumentsOutline size={25} />, path: "documentation", tab: "documentation" },
  ];

  return (
    <div
      className={`container sidebar_container investor_view_sidebar ${sidebarCollapsed ? "collapsed" : ""}`}
      onMouseLeave={() => !isMobileView && setSidebarCollapsed(true)}
      onMouseEnter={() => !isMobileView && setSidebarCollapsed(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {!isMobileView ? (
        // Desktop Sidebar
        <div id="header">
          <ProSidebar collapsed={sidebarCollapsed}>
            <SidebarHeader>
              <div className="logotext">
                {sidebarCollapsed ? (
                  <img src={user.profilePicture} alt="user profile" />
                ) : (
                  <>
                    <img src={user.profilePicture} alt="user profile" />
                    <h3 className="fs-6 mt-2">
                      {user?.firstName} {user?.lastName}
                    </h3>
                    <h4 style={{ fontSize: "12px" }}>{user?.email}</h4>
                  </>
                )}
              </div>
            </SidebarHeader>
            <SidebarContent>
              <Menu iconShape="round">
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.tab}
                    active={currentTab === item.tab}
                    className={`active-item ${item.className || ""}`}
                    onClick={() => setCurrentTab(item.tab)}
                  >
                    <Link to={item.path}>
                      {item.icon}
                      {!sidebarCollapsed && (
                        <span className={currentTab === item.tab ? "items-active" : ""}>
                          {item.label}
                        </span>
                      )}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </SidebarContent>
          </ProSidebar>
        </div>
      ) : (
        // Mobile Bottom Navigation
        <MobileOneLinkNavbar/>
      )}
    </div>
  );
};

export default SideBar;
