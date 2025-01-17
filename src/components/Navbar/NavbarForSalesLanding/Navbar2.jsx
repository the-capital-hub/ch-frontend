import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../Images/Logo.png";
import { RxCross2 } from "react-icons/rx";
import HambergerIcon from "../../../Images/Hamberger.svg";
import { useSelector } from "react-redux";
import { setThemeColor } from "../../../utils/setThemeColor";
import "./navbar2.scss";

function Navbar() {
	const [clicked, setClicked] = useState(false);
	const [selectedLink, setSelectedLink] = useState("home");
	const [isScrolling, setIsScrolling] = useState(false);
	//const [hideDropdown, setHideDropDown] = useState(false);

	useEffect(() => {
		setThemeColor();
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleScroll = () => {
		const scrollTop = window.pageYOffset;
		setIsScrolling(scrollTop > 0);
	};

	const handleClick = () => {
		setClicked(!clicked);
	};

	// const handleMouseOver = () => {
	//   setHideDropDown(true);
	// };

	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const isLoggedInLocal = localStorage.getItem("isLoggedIn");

	const navigate = useNavigate();

	const isLoggedIn = () => {
		if (!isLoggedInLocal || !loggedInUser) return navigate("/login");
		if (isLoggedInLocal.isInvestor === "true") {
			return navigate("/investor/home");
		} else {
			return navigate("/home");
		}
	};

	return (
		<>
			<div className="navbar-container2">
				<div className="navbar-logo">
					<div className="hamberger-logo">
						<div id="mobile" onClick={handleClick}>
							{clicked ? (
								<RxCross2 size={"2rem"} className="i" />
							) : (
								<img src={HambergerIcon} alt="hamberger" />
							)}
						</div>
					</div>
					<div className="log">
						<Link to="/" className="logo">
							<img src={Logo} alt="bar" />
						</Link>
					</div>
				</div>

				<div className={`navbar-items ${clicked ? "active" : ""}`}>
					<ul id="navbar" className={clicked ? "active" : ""}>
						<li>
							<Link
								to="/"
								className={selectedLink === "home" ? "active" : ""}
								onClick={() => setSelectedLink("home")}
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/about"
								className={selectedLink === "about" ? "active" : ""}
								onClick={() => setSelectedLink("about")}
							>
								About Us
							</Link>
						</li>
						<li>
							<Link
								to="/contactus"
								className={selectedLink === "contact" ? "active" : ""}
								onClick={() => setSelectedLink("contactus")}
							>
								Contact Us
							</Link>
						</li>
						<li>
							<Link
								to="/investor"
								className={selectedLink === "investor" ? "active" : ""}
								onClick={() => setSelectedLink("investor")}
							>
								Investor
							</Link>
						</li>
						<li>
							<Link
								to="/start-up"
								className={selectedLink === "startup" ? "active" : ""}
								onClick={() => setSelectedLink("startup")}
							>
								Start Up
							</Link>
						</li>
						<li>
							<Link
								to="/blog"
								className={selectedLink === "blog" ? "active" : ""}
								onClick={() => setSelectedLink("blog")}
							>
								Blog
							</Link>
						</li>
					</ul>
				</div>

				<div className="login-btn-container">
					<button
						className="login-btn"
						id="btn-461"
						onClick={() => {
							setSelectedLink("login");
							isLoggedIn();
						}}
					>
						{loggedInUser && isLoggedInLocal ? (
							<>{loggedInUser?.firstName + " " + loggedInUser?.lastName}</>
						) : (
							"Login"
						)}
					</button>
					<button
						className="login-btn"
						id="btn-460"
						onClick={() => {
							setSelectedLink("login");
							isLoggedIn();
						}}
					>
						{loggedInUser && isLoggedInLocal ? (
							<>{loggedInUser?.firstName}</>
						) : (
							"Login"
						)}
					</button>
				</div>
			</div>

			<div className={`navbar-items-wrapper ${clicked ? "active" : ""}`}>
				<div className="navbar-logo">
					<div className="hamberger-logo">
						<div id="mobile" onClick={handleClick}>
							{clicked ? (
								<RxCross2 size={"2rem"} className="i" />
							) : (
								<img src={HambergerIcon} alt="hamberger" />
							)}
						</div>
					</div>
					<div className="log">
						<Link to="/" className="logo">
							<img src={Logo} alt="bar" />
						</Link>
					</div>
				</div>
				<ul id="navbar-wrapper" className={clicked ? "active" : ""}>
					<li>
						<Link
							to="/"
							className={selectedLink === "home" ? "active" : ""}
							onClick={() => setSelectedLink("home")}
						>
							Home
						</Link>
					</li>
					<li>
						<Link
							to="/about"
							className={selectedLink === "about" ? "active" : ""}
							onClick={() => setSelectedLink("about")}
						>
							About Us
						</Link>
					</li>
					<li>
						<Link
							to="/contactUs"
							className={selectedLink === "contact" ? "active" : ""}
							onClick={() => setSelectedLink("contact")}
						>
							Contact Us
						</Link>
					</li>
					<li>
						<Link
							to="/investor"
							className={selectedLink === "investor" ? "active" : ""}
							onClick={() => setSelectedLink("investor")}
						>
							Investor
						</Link>
					</li>
					<li>
						<Link
							to="/start-up"
							className={selectedLink === "startup" ? "active" : ""}
							onClick={() => setSelectedLink("startup")}
						>
							Start Up
						</Link>
					</li>
					<li>
						<Link
							to="/blog"
							className={selectedLink === "blog" ? "active" : ""}
							onClick={() => setSelectedLink("blog")}
						>
							Blog
						</Link>
					</li>
				</ul>
			</div>
		</>
	);
}

export default Navbar;
