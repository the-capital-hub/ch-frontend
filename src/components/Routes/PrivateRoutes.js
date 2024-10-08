import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import InvestorNavbar from "../Investor/InvestorNavbar/InvestorNavbar";
import InvestorSidebar from "../Investor/InvestorSidebar/InvestorSidebar";
import "./style.scss";
import LogOutPopUp from "../PopUp/LogOutPopUp/LogOutPopUp";
import { ModalBSContainer, ModalBSBody, ModalBSHeader } from "../PopUp/ModalBS";
import NewCommunityModal from "../Investor/ChatComponents/NewCommunityModal";
import { useSelector } from "react-redux";
import MobileNavbar from "../Shared/MobileNavbar/MobileNavbar";
import { Toaster } from "react-hot-toast";
import { selectTheme } from "../../Store/features/design/designSlice";

function PrivateRoute({ children, ...props }) {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const theme = useSelector(selectTheme);

  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const handleSidebarToggle = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const isLoggedIn = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn === "true";
  };

  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  if (isLoggedIn()) {
    if (loggedInUser.isInvestor === "true") {
      return <Navigate to="/investor/home" replace />;
    }
    return (
      <div className="investor-private-routes" data-bs-theme={theme}>
        <InvestorNavbar
          handleSidebarToggle={handleSidebarToggle}
          sidebarCollapsed={sidebarCollapsed}
        />

        <div
          className={`container-fluid p-0 investor_home_container position-relative ${
            sidebarCollapsed ? "sidebar-collapsed" : ""
          }`}
        >
          <LogOutPopUp />

          <div className="sidebar">
            <InvestorSidebar
              sidebarCollapsed={sidebarCollapsed}
              setSidebarCollapsed={handleSidebarToggle}
            />
          </div>

          <div className="content pb-5 pb-mb-0">
            <Outlet />
          </div>

          {/* Mobile Navbar */}
          <MobileNavbar />

          <div className="modals">
            {/* Modal for creating new Community */}
            <ModalBSContainer
              isStatic={false}
              id="AddNewCommunity"
              className="z-n1"
            >
              <ModalBSHeader
                title={"Create a Community"}
                className={"orange__heading"}
              />
              <ModalBSBody>
                <NewCommunityModal />
              </ModalBSBody>
            </ModalBSContainer>
          </div>

          {/* React Hot Toast */}
          <Toaster
            containerStyle={{
              top: "100px",
            }}
            toastOptions={{
              duration: 10000,
            }}
          />
        </div>
      </div>
    );
  } else <Navigate to="/login" replace />;
}

export default PrivateRoute;
