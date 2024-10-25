import { IoDocumentsOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  toggleCreatePostModal,
  toggleinvestorCreatePostModal,
} from "../../../Store/features/design/designSlice";
import "./MobileOneLinkNavbar.scss";
import IconFile from "../../Investor/SvgIcons/IconFile";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import IconUser from "../../Investor/SvgIcons/IconUser";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

// Define the menu items array that can be shared between Sidebar and MobileOneLinkNavbar
const menuItems = [
  { label: "Company", icon: <HiOutlineOfficeBuilding size={25} />, path: "", tab: "company" },
  { label: "Profile", icon: <IconUser height={25} width={25} />, path: "profile", tab: "profile" },
  { label: "Invest", icon: <RiMoneyDollarCircleLine size={65} />, path: "investnow", tab: "investnow", className: "invest-now" },
  { label: "Updates", icon: <IconFile width={25} height={25} />, path: "onepager", tab: "onepager" },
  { label: "Doc", icon: <IoDocumentsOutline size={25} />, path: "documentation", tab: "documentation" },
];

export default function MobileOneLinkNavbar({  }) {

  return (
    <div className="mobile-bottom-toolbar container p-2 shadow d-flex gap-1 justify-content-center border-top align-items-center px-3 d-md-none text-secondary">
      {menuItems.map((item) => (
        <div key={item.tab} className="d-flex flex-column align-items-center mx-3">
          <NavLink to={item.path}>
            {item.icon}
          </NavLink>
          <span className="nav-link-text">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
