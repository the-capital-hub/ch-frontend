import { BsLink45Deg } from "react-icons/bs";
import { IoCompassOutline } from "react-icons/io5";
import { CiSquarePlus } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { HiOutlineHome } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  toggleCreatePostModal,
  toggleinvestorCreatePostModal,
} from "../../../Store/features/design/designSlice";
import "./MobileNavbar.scss";

export default function MobileNavbar({ isInvestor }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleToggleCreatePostModal = () => {
    navigate(isInvestor ? "/investor/home" : "/home");
    dispatch(
      isInvestor ? toggleinvestorCreatePostModal() : toggleCreatePostModal()
    );
  };

  return (
    <div className="mobile-bottom-toolbar container p-2 shadow d-flex gap-1 justify-content-center border-top align-items-center px-3 d-md-none text-secondary">
      <div className="d-flex flex-column align-items-center mx-3">
        <NavLink to={isInvestor ? "/investor/home" : "/home"}>
          <HiOutlineHome size={"18px"} />
        </NavLink>
        <span className="nav-link-text">Home</span>
      </div>
      <div className="d-flex flex-column align-items-center mx-3">
        <NavLink to={isInvestor ? "/investor/connection" : "/connection"}>
          <FiUsers size={"18px"} />
        </NavLink>
        <span className="nav-link-text">Connections</span>
      </div>

      <div
        className="d-flex flex-column align-items-center mx-3"
        onClick={handleToggleCreatePostModal}
      >
        <CiSquarePlus size={"22px"} style={{ fill: "grey" }} />
        <span className="nav-link-text">Post</span>
      </div>

      <div className="d-flex flex-column align-items-center mx-3">
        {isInvestor ? (
          <>
            <NavLink to="/investor/onelink">
              <BsLink45Deg size={"18px"} />
            </NavLink>
            <span className="nav-link-text">{"OneLink"}</span>
          </>
        ) : (
          <>
            <NavLink to="/onelink">
              <BsLink45Deg size={"18px"} />
            </NavLink>
            <span className="nav-link-text">{"OneLink"}</span>
          </>
        )}
      </div>

      <div className="d-flex flex-column align-items-center mx-3">
        {isInvestor ? (
          <>
            <NavLink to="/investor/explore">
              <IoCompassOutline size={"18px"} />
            </NavLink>
            <span className="nav-link-text text-center">{"Explore"}</span>
          </>
        ) : (
          <>
            <NavLink to="/explore">
              <IoCompassOutline size={"18px"} />
            </NavLink>
            <span className="nav-link-text">{"Explore"}</span>
          </>
        )}
      </div>
    </div>
  );
}
