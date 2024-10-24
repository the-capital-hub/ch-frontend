import "./NavBar.scss";
import DarkLogo from "../../../Images/investorIcon/new-logo.png";
import WhiteLogo from "../../../Images/investorIcon/logo-white.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsInvestor } from "../../../Store/features/user/userSlice";
import { MdOutlineMenu, MdOutlineMenuOpen } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { selectTheme } from "../../../Store/features/design/designSlice";
import OnboardingSwitch from "../../Investor/InvestorNavbar/OnboardingSwitch/OnboardingSwitch";
import { useState, useEffect } from "react";

const NavBar = ({ handleSidebarToggle, sidebarCollapsed, ...props }) => {
  const theme = useSelector(selectTheme);
  const navigate = useNavigate();
  const isInvestor = useSelector(selectIsInvestor);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Monitor window resize for mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Always show sidebar on mobile
  useEffect(() => {
    if (isMobile && sidebarCollapsed) {
      handleSidebarToggle(); // Open sidebar if it's collapsed on mobile
    }
  }, [isMobile, sidebarCollapsed, handleSidebarToggle]);

  return (
    <div className="container" {...props}>
      <div className="investor_view_navbar">
        <div
          className="d-flex align-items-center h-100"
          style={{ justifyContent: "space-between" }}
        >
          <div className="row bar_logo_container">
            <div className="logo_container">
              <img src={theme === "dark" ? WhiteLogo : DarkLogo} alt="bar" />
            </div>
            {!isMobile && ( // Hide burger icon if in mobile view
              <div
                className="mobile-home-hamberger"
                onClick={handleSidebarToggle}
              >
                {sidebarCollapsed ? (
                  <MdOutlineMenu size={25} />
                ) : (
                  <MdOutlineMenuOpen size={25} color="var(--investor)" />
                )}
              </div>
            )}
          </div>
          <div style={{ display: "flex" }}>
            <OnboardingSwitch />
            <span
              className="ms-auto m-2 px-2 close-button"
              onClick={() =>
                navigate(isInvestor === "true" ? "/investor/home" : "/home")
              }
            >
              <IoArrowBackCircleOutline size={25} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
