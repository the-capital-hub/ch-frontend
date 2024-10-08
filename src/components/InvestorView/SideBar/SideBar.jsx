import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import "../../Investor/InvestorSidebar/investorsidebar.scss";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SideBar.scss";
import { getUserById } from "../../../Service/user";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import IconUser from "../../Investor/SvgIcons/IconUser";
import IconFile from "../../Investor/SvgIcons/IconFile";
import { IoDocumentsOutline } from "react-icons/io5";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

const SideBar = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const isMobileView = useSelector((state) => state.design.isMobileView);
  const location = useLocation();
  const { username, userId } = useParams();
  const [user, setUser] = useState([]);
  const [currentTab, setCurrentTab] = useState(
    location.pathname.split("/").slice(-1)[0] === userId
      ? "company"
      : location.pathname.includes("documentation")
      ? "documentation"
      : location.pathname.split("/").slice(-1)[0]
  );

  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  useEffect(() => {
    getUserById(username, userId)
      .then(({ data }) => {
        setUser(data);
      })
      .catch(() => setUser([]));
  }, [username, userId]);

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
        setSidebarCollapsed(false);
      } else if (deltaX > 50) {
        setSidebarCollapsed(true);
      }
      setTouchStartX(null);
      setTouchEndX(null);
    }
  };

  return (
    <div
      className={`container sidebar_container investor_view_sidebar ${
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
                  <h4 className="" style={{ fontSize: "12px" }}>
                    {user?.email}
                  </h4>
                </>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="round">
              <MenuItem
                active={currentTab === "company"}
                className="active-item"
                onClick={() => setCurrentTab("company")}
              >
                <Link to="">
                  <HiOutlineOfficeBuilding size={25} />
                  {!sidebarCollapsed && (
                    <span
                      className={currentTab === "company" ? "items-active" : ""}
                    >
                      Company
                    </span>
                  )}
                </Link>
              </MenuItem>
              <MenuItem
                active={currentTab === "profile"}
                className="active-item"
                onClick={() => setCurrentTab("profile")}
              >
                <Link to="profile">
                  <IconUser height={25} width={25} />
                  {!sidebarCollapsed && (
                    <span
                      className={currentTab === "profile" ? "items-active" : ""}
                    >
                      Profile
                    </span>
                  )}
                </Link>
              </MenuItem>
              <MenuItem
                active={currentTab === "onepager"}
                className="active-item"
                onClick={() => setCurrentTab("onepager")}
              >
                <Link to="onepager">
                  <IconFile width={25} height={25} />
                  {!sidebarCollapsed && (
                    <span
                      className={
                        currentTab === "onepager" ? "items-active" : ""
                      }
                    >
                      Company Updates
                    </span>
                  )}
                </Link>
              </MenuItem>
              <MenuItem
                active={currentTab === "documentation"}
                className="active-item"
                onClick={() => setCurrentTab("documentation")}
              >
                <Link to="documentation">
                  <IoDocumentsOutline size={25} />
                  {!sidebarCollapsed && (
                    <span
                      className={
                        currentTab === "documentation" ? "items-active" : ""
                      }
                    >
                      Documentation
                    </span>
                  )}
                </Link>
              </MenuItem>
              <div className="pt-2">
                <MenuItem
                  active={currentTab === "investnow"}
                  onClick={() => setCurrentTab("investnow")}
                  className="active-item invest-now"
                >
                  <Link to="investnow">
                    <RiMoneyDollarCircleLine size={25} />
                    {!sidebarCollapsed && (
                      <span className={currentTab === "investnow" ?"items-active":""}>Invest Now</span>
                    )}
                  </Link>
                </MenuItem>
              </div>
            </Menu>
          </SidebarContent>
        </ProSidebar>
      </div>
    </div>
  );
};

export default SideBar;
