// import "./NavBar.scss";
// import Logo from "../../../Images/investorIcon/Logo.svg";
// import NotificationIcon from "../../../Images/investorIcon/notification.svg";
// import MessageIcon from "../../../Images/investorIcon/Message.svg";
// import profilePic from "../../../Images/investorIcon/profilePic.webp";
// import searchIcon from "../../../Images/investorIcon/searchIcon.svg";
// import { Link } from "react-router-dom";

// function NavBar() {
//   return (
//     <>
//       <div className="container pt-1">
//         <div className="row investor_view_navbar ">
//           <div className="col-md-5 d-flex">
//             <div className="row bar_logo_container ">
//               <div className="logo_container">
//                 <img src={Logo} alt="bar" />
//               </div>
//             </div>
//           </div>
//           <div className="col-md-7 navbar_right_container">
//             <div className="searchbar-container">
//               <input
//                 type="text"
//                 className="searchbar-input"
//                 placeholder="Search"
//               />
//               <button className="searchbar-button">
//                 <img src={searchIcon} alt="search" />
//               </button>
//             </div>
//             <div className="icons-container">
//               <div className="icon-wrapper">
//                 <span className="notification-icon">
//                   <img src={NotificationIcon} alt="notification" />
//                 </span>
//               </div>
//               <div className="icon-wrapper">
//                 <span className="message-icon">
//                   <img src={MessageIcon} alt="message" />
//                 </span>
//               </div>
//               <div className="icon-wrapper">
//                 <Link to={"/manage-account"}>
//                   {" "}
//                   <img className="profile-pic" src={profilePic} alt="Profile" />
//                 </Link>
//                 {/* <span className="me">Me</span> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default NavBar;

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

const NavBar = ({ handleSidebarToggle, sidebarCollapsed, ...props }) => {
  const theme = useSelector(selectTheme);
  const navigate = useNavigate();
  const isInvestor = useSelector(selectIsInvestor);
  console.log(theme);
  return (
    <div className="container" {...props}>
      <div className="investor_view_navbar ">
        <div className="d-flex align-items-center h-100" style={{justifyContent:"space-between"}}>
          <div className="row bar_logo_container ">
            <div className="logo_container">
              <img src={theme === "dark" ? WhiteLogo : DarkLogo} alt="bar" />
            </div>
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
          </div>
          <div style={{display:"flex"}}>
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
