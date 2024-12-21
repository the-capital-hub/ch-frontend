import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ProtectedInvestorRoutes.scss";
import LogOutPopUp from "../../../components/PopUp/LogOutPopUp/LogOutPopUp";
import InvestorNavbar from "../../../components/NewInvestor/NavBar/NavBar";
import InvestorSidebar from "../../../components/NewInvestor/SideBar/SideBar";
import {
  ModalBSBody,
  ModalBSContainer,
  ModalBSHeader,
} from "../../../components/PopUp/ModalBS";
import NewCommunityModal from "../../../components/Investor/ChatComponents/NewCommunityModal";
import { useSelector, useDispatch } from "react-redux";
// import {
//   toggleNotificationModal,
//   toggleinvestorCreatePostModal,
// } from "../../../Store/features/design/designSlice";
import MobileNavbar from "../../../components/Shared/MobileNavbar/MobileNavbar";
import { setThemeColor } from "../../../utils/setThemeColor";
import { Toaster } from "react-hot-toast";
import { selectTheme } from "../../../Store/features/design/designSlice";
import { setSidebar } from "../../../Store/features/design/sidebarSlice";

function ProtectedInvestorRoutes({ children, ...props }) {
  const theme = useSelector(selectTheme);

  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const handleSidebarToggle = () => {
    setSidebarCollapsed((prev) => !prev);
    dispatch(setSidebar(!sidebarCollapsed));
  };
  const location = useLocation();

  useEffect(() => {
    setThemeColor();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);

    useEffect(() => {
    if (theme === "dark") {
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundColor = "white";
    }
  }, [theme]);

  const isLoggedIn = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    return isLoggedIn === "true";
  };

  if (!isLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  if (isLoggedIn()) {
    if (loggedInUser.isInvestor === "false") {
      return <Navigate to="/home" replace />;
    }

    return (
      <>
        <div className="new-investor-private-routes" data-bs-theme={theme}>
          <InvestorNavbar
            handleSidebarToggle={handleSidebarToggle}
            sidebarCollapsed={sidebarCollapsed}
          />

          <div
            className={`container-fluid p-0 newInvestor_container ${
              sidebarCollapsed ? "sidebar-collapsed" : ""
            }`}
          >
            <div className="sidebar">
              <InvestorSidebar
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={handleSidebarToggle}
              />
            </div>

            <div className="content pb-5 pb-md-0">
              <Outlet />
            </div>
          </div>

          {/* Mobile Navbar */}
          <MobileNavbar isInvestor={true} />

          <LogOutPopUp />

          <div className="modals">
            {/* Modal for creating new Community */}
            <ModalBSContainer
              isStatic={false}
              id="AddNewCommunity"
              className="z-n1"
            >
              <ModalBSHeader title={"Create a Community"} className={``} />
              <ModalBSBody>
                <NewCommunityModal theme="investor" />
              </ModalBSBody>
            </ModalBSContainer>
          </div>

          <Toaster
            containerStyle={{
              top: "100px",
            }}
            toastOptions={{
              duration: 10000,
            }}
          />
        </div>
      </>
    );
  } else <Navigate to="/login" replace />;
}

export default ProtectedInvestorRoutes;
