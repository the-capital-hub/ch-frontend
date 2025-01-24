import React, { useState } from "react";
import { IoDocumentsOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
	toggleCreatePostModal,
	toggleinvestorCreatePostModal,
} from "../../../Store/features/design/designSlice";
import IconFile from "../../Investor/SvgIcons/IconFile";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import IconUser from "../../Investor/SvgIcons/IconUser";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import "./MobileOneLinkNavbar.scss";

// Define the menu items array that can be shared between Sidebar and MobileOneLinkNavbar
const menuItems = [
	{
		label: "Company",
		icon: <HiOutlineOfficeBuilding size={25} />,
		path: "",
		tab: "company",
	},
	{
		label: "Profile",
		icon: <IconUser height={25} width={25} />,
		path: "profile",
		tab: "profile",
	},
	{
		label: "Invest",
		icon: <RiMoneyDollarCircleLine size={25} />,
		path: "investnow",
		tab: "investnow",
		className: "invest-now",
	},
	{
		label: "Updates",
		icon: <IconFile width={25} height={25} />,
		path: "onepager",
		tab: "onepager",
	},
	{
		label: "Doc",
		icon: <IoDocumentsOutline size={25} />,
		path: "documentation",
		tab: "documentation",
	},
];

export default function MobileOneLinkNavbar() {
	const [isPitchSidebarOpen, setIsPitchSidebarOpen] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const togglePitchSidebar = () => {
		setIsPitchSidebarOpen(!isPitchSidebarOpen);
	};

	const handlePitchButtonClick = (path) => {
		// Close sidebar and navigate to the specified path
		setIsPitchSidebarOpen(false);
		navigate(path);
	};

	return (
		<>
			<div className="mobile-bottom-toolbar container p-2 shadow d-flex gap-1 justify-content-center border-top align-items-center px-3 d-md-none text-secondary">
				{menuItems.map((item) => (
					<div
						key={item.tab}
						className="d-flex flex-column align-items-center mx-3"
					>
						<NavLink to={item.path} className={item.className}>
							{item.icon}
						</NavLink>
						<span className="nav-link-text">{item.label}</span>
					</div>
				))}

				{/* Pitch tab with toggle functionality */}
				<div
					className={`d-flex flex-column align-items-center mx-3 ${
						location.pathname.includes("pitch") ? "active" : ""
					}`}
					onClick={togglePitchSidebar}
				>
					<FaMicrophone size={25} />
					<span className="nav-link-text">Pitch</span>
				</div>
			</div>

			{/* Pitch Sidebar */}
			<div
				className={`mobile-onelink-pitch-section-wrapper ${
					isPitchSidebarOpen ? "open" : ""
				}`}
			>
				<div className="mobile-onelink-pitch-section">
					<button
						onClick={() =>
							handlePitchButtonClick("/onelink/capitalhub11/654231/pitchdays")
						}
						className="pitch-button"
					>
						Pitch Days
					</button>
					<button
						onClick={() =>
							handlePitchButtonClick(
								"/onelink/capitalhub11/654231/documentation/onelinkpitch"
							)
						}
						className="pitch-button"
					>
						Pitch Recordings
					</button>
				</div>
			</div>
		</>
	);
}
