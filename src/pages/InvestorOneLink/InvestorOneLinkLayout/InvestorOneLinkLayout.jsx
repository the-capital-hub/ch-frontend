import { useEffect, useState } from "react";
import { NavBar } from "../../../components/InvestorView";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import "./InvestorOneLinkLayout.scss";
import InvestorOneLinkSidebar from "../../../components/InvestorOneLink/InvestorOneLinkSidebar/InvestorOneLinkSidebar";
import { getInvestorFromOneLinkAPI } from "../../../Service/user";
import SpinnerBS from "../../../components/Shared/Spinner/SpinnerBS";
import OneLinkValidation from "../../../components/Shared/OnelinkValidation/OnelinkValidation";
import { selectTheme } from "../../../Store/features/design/designSlice";
import { useSelector } from "react-redux";

export default function InvestorOneLinkLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [investorData, setInvestorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const oneLinkUser = localStorage.getItem("oneLinkUser");
  const oneLinkLoggedIn = localStorage.getItem("oneLinkLoggedIn");
  const oneLinkId = localStorage.getItem("oneLinkId");

  const handleSidebarToggle = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const location = useLocation();
  const { oneLink, userId } = useParams();
  const theme = useSelector(selectTheme);

  useEffect(() => {
    getInvestorFromOneLinkAPI(oneLink, userId)
      .then(({ data }) => {
        setInvestorData(data);
        setLoading(false);
      })
      .catch(() => navigate("/"));
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="investor_onelink_layout_wrapper" data-bs-theme={theme}>
      {/* Top Navbar */}
      {!oneLinkUser || oneLinkLoggedIn === "false" || userId !== oneLinkId ? (
        <OneLinkValidation
          userId={userId}
          theme={"investor"}
          onelink={oneLink}
        />
      ) : (
        <>
          <NavBar
            handleSidebarToggle={handleSidebarToggle}
            sidebarCollapsed={sidebarCollapsed}
          />
          {!loading ? (
            <div
              className={`container-fluid investor_view_container ${
                sidebarCollapsed ? "sidebar-collapsed" : ""
              }`}
            >
              <div className="sidebar">
                <InvestorOneLinkSidebar
                  sidebarCollapsed={sidebarCollapsed}
                  setSidebarCollapsed={handleSidebarToggle}
                />
              </div>

              <div className="content">
                <MaxWidthWrapper>
                  <Outlet context={investorData} />
                </MaxWidthWrapper>
              </div>
            </div>
          ) : (
            <SpinnerBS
              className="my-3 mx-auto m-lg-5"
              colorClass="text-secondary"
            />
          )}
        </>
      )}
    </div>
  );
}
