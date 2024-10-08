import React, { useState } from "react";
import "./Logout.scss";
import logoIcon from "../../../../Images/manageAccount/Group 15186.svg";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LogOutPopUp from "../../../PopUp/LogOutPopUp/LogOutPopUp";
import { clearAllChatsData } from "../../../../Store/features/chat/chatSlice";
import { logout, selectIsInvestor } from "../../../../Store/features/user/userSlice";
import {
  selectIsMobileView,
  selectTheme,
  toggleTheme,
} from "../../../../Store/features/design/designSlice";
import { GoSun } from "react-icons/go";
import { MdDarkMode } from "react-icons/md";
import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

export default function Logout({ setActiveTab }) {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const isMobileView = useSelector(selectIsMobileView);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isInvestor = useSelector(selectIsInvestor);


  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const theme = useSelector(selectTheme);

  const handleLogoutLogic = () => {
    dispatch(logout());
    dispatch(clearAllChatsData());
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };
  return (
    <section className="col present_accounts_section">
      <div className="present_account ">
        {/* Header */}
        <div className="d-flex align-items-center gap-3">
          {isMobileView && (
            <Button
              className="back-button btn-sm rounded-circle border-0 bg-transparent"
              onClick={() => setActiveTab(null)}
            >
              <FaArrowLeft size={15} />
            </Button>
          )}
          <div className="d-flex align-items-center">
            <div className="logo">
              <img src={logoIcon} alt="img" />
            </div>
            <div className="header_text px-2">Logout</div>
          </div>
        </div>
        <hr />
        <div className="d-flex flex-column flex-md-row align-items-center gap-5">
          <div className="d-flex align-items-center">
            <div className="profile_image">
              <img
                src={loggedInUser?.profilePicture}
                alt="img"
                className="rounded-pill"
                width={55}
                height={55}
              />
            </div>
            <div className="name_email">
              <h4 className="text-break">
                {loggedInUser?.firstName} {loggedInUser?.lastName}
              </h4>
              <span className="text-break">{loggedInUser?.email}</span>
            </div>
          </div>
          <div className="footer d-flex gap-3 ms-md-auto">
            <Link
              to={isInvestor?"/investor/profile":"/profile"}
              className={`btn btn-delete`}
              style={{
                backgroundColor: "var(--currentTheme)",
              }}
            >
              View profile
            </Link>
            <button className="btn btn-delete" onClick={setShowLogoutPopup}>
              Log out
            </button>
            {showLogoutPopup && (
              <LogOutPopUp
                setShowLogoutPopup={setShowLogoutPopup} // Make sure this prop is passed correctly
                handleLogoutLogic={handleLogoutLogic}
                showLogoutPopup
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
