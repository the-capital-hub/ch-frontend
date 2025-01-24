import React, { useState, useEffect, useCallback } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { IoDocumentsOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa6";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import IconFile from "../../Investor/SvgIcons/IconFile";
import IconUser from "../../Investor/SvgIcons/IconUser";
import Dollar from "../../../Images/investorOneLink/3d-dollar.png";
// import { useDispatch } from "react-redux";
// import {
// 	toggleCreatePostModal,
// 	toggleinvestorCreatePostModal,
// } from "../../../Store/features/design/designSlice";
// import { FaMoneyBillTrendUp } from "react-icons/fa6";
import "./MobileOneLinkNavbar.scss";

const menuItems = [
	{
		label: "Company",
		icon: <HiOutlineOfficeBuilding size={25} />,
		path: "company",
		tab: "company",
	},
	{
		label: "Profile",
		icon: <IconUser height={25} width={25} />,
		path: "profile",
		tab: "profile",
	},
	// {
	// 	label: "Invest",
	// 	icon: <RiMoneyDollarCircleLine size={25} />,
	// 	path: "investnow",
	// 	tab: "investnow",
	// 	className: "invest-now-btn",
	// },
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
	const [investBtnAnimationClass, setInvestBtnAnimationClass] = useState("");
	// const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const animationSequence = [
			{ class: "invest-btn-rotate", duration: 1000 },
			{ class: "invest-btn-jump", duration: 500 },
			{ class: "invest-btn-pulse", duration: 500 },
		];

		let currentIndex = 0;

		const runAnimation = () => {
			setInvestBtnAnimationClass(animationSequence[currentIndex].class);

			setTimeout(() => {
				setInvestBtnAnimationClass("");
				currentIndex = (currentIndex + 1) % animationSequence.length;
			}, animationSequence[currentIndex].duration);
		};

		const animationInterval = setInterval(runAnimation, 10000);

		return () => clearInterval(animationInterval);
	}, []);

	const handleInvestBtnHover = useCallback(() => {
		setInvestBtnAnimationClass("invest-btn-pulse");
		setTimeout(() => setInvestBtnAnimationClass(""), 500);
	}, []);

	const togglePitchSidebar = () => {
		setIsPitchSidebarOpen(!isPitchSidebarOpen);
	};

	const handlePitchButtonClick = (path) => {
		setIsPitchSidebarOpen(false);
		navigate(path);
	};

	const handleInvestNowClick = () => {
		navigate("investnow");
	};

	return (
		<>
			<div className="mobile-bottom-toolbar container p-2 shadow d-flex gap-1 justify-content-between border-top align-items-center px-3 d-md-none text-secondary">
				{menuItems.map((item) => (
					<div
						key={item.tab}
						className="d-flex flex-column align-items-center mx-3"
					>
						<NavLink
							to={item.path}
							className={({ isActive }) => {
								// Force Company tab to always be active if on root or no specific path
								const isCompanyActive =
									item.tab === "company" &&
									(location.pathname === "/" || location.pathname === "");

								return `${item.className || ""} ${
									isActive || isCompanyActive ? "active" : ""
								}`;
							}}
						>
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

			{/* Invest Now Button */}
			<button
				className={`invest-now-floating-btn ${investBtnAnimationClass}`}
				onClick={handleInvestNowClick}
				onMouseEnter={handleInvestBtnHover}
			>
				<img src={Dollar || "/placeholder.svg"} alt="Dollar" />
			</button>

			{/* Pitch Sidebar */}
			<div
				className={`mobile-onelink-pitch-section-wrapper ${
					isPitchSidebarOpen ? "open" : ""
				}`}
			>
				<div className="mobile-onelink-pitch-section">
					<button
						onClick={() => handlePitchButtonClick("pitchdays")}
						className="pitch-button"
					>
						Pitch Days
					</button>
					<button
						onClick={() => handlePitchButtonClick("documentation/onelinkpitch")}
						className="pitch-button"
					>
						Pitch Recordings
					</button>
				</div>
			</div>
		</>
	);
}
