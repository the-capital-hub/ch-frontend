import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBarIV from "../../../components/InvestorView/NavBar/NavBar";
import SideBarIV from "../../../components/InvestorView/SideBar/SideBar";
import "./ValidateOneLink.scss";
import OneLinkValidation from "../../../components/Shared/OnelinkValidation/OnelinkValidation";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTheme } from "../../../Store/features/design/designSlice";

function ValidateOneLink({ children, ...props }) {
  const { userId } = useParams();
  const { username } = useParams();
  const theme = useSelector(selectTheme);

  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const handleSidebarToggle = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  // const oneLinkUser = useSelector((state) => state.onelink?.oneLinkUser);
  // const oneLinkLoggedIn = useSelector(
  //   (state) => state.onelink?.oneLinkLoggedIn
  // );
  // const oneLinkId = useSelector((state) => state.onelink?.oneLinkId);
  const oneLinkUser = localStorage.getItem("oneLinkUser");
  const oneLinkLoggedIn = localStorage.getItem("oneLinkLoggedIn");
  const oneLinkId = localStorage.getItem("oneLinkId");

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      {!oneLinkUser || oneLinkLoggedIn === "false" || userId !== oneLinkId ? (
        <OneLinkValidation userId={userId} onelink={username} />
      ) : (
        <>
          <NavBarIV
            handleSidebarToggle={handleSidebarToggle}
            sidebarCollapsed={sidebarCollapsed}
            data-bs-theme={theme}
          />

          <div
            className={`container-fluid investor_view_container ${
              sidebarCollapsed ? "sidebar-collapsed" : ""
            }`}
            data-bs-theme={theme}
          >
            <div className="sidebar">
              <SideBarIV
                sidebarCollapsed={sidebarCollapsed}
                setSidebarCollapsed={handleSidebarToggle}
              />
            </div>

            <div className="content">
              <Outlet />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default ValidateOneLink;
