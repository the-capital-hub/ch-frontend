import "./investorNavbar.scss";
import DarkLogo from "../../../Images/investorIcon/new-logo.png";
import WhiteLogo from "../../../Images/investorIcon/logo-white.png";
import logo from "../../../Images/investorIcon/LogoX.png";
import { FiSearch } from "react-icons/fi";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import {
	getSearchResultsAPI,
	getNotificationCount,
} from "../../../Service/user";
import NotificationsPopup from "./NotificationsPopup/NotificationsPopup";
import OnboardingSwitch from "./OnboardingSwitch/OnboardingSwitch";
import {
	selectIsMobileView,
	selectNotificationtModal,
	selectTheme,
} from "../../../Store/features/design/designSlice";
import {
	selectLoggedInUserId,
	selectUnreadNotifications,
	selectUserProfilePicture,
	setUnreadNotifications,
} from "../../../Store/features/user/userSlice";
import { BsBell } from "react-icons/bs";
import { AiOutlineMessage } from "react-icons/ai";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { selectTotalUnreadCount } from "../../../Store/features/chat/chatSlice";
import { fetchTotalUnreadMessagesCount } from "../../../Store/features/chat/chatThunks";

// Startup navbar
const InvestorNavbar = (props) => {
	const theme = useSelector(selectTheme);
	const loggedInUserId = useSelector(selectLoggedInUserId);
	const userProfilePicture = useSelector(selectUserProfilePicture);
	const isMobileView = useSelector(selectIsMobileView);
	const isNotificationModalOpen = useSelector(selectNotificationtModal);
	const unreadNotifications = useSelector(selectUnreadNotifications);
	const totalUnreadCount = useSelector(selectTotalUnreadCount);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [searchSuggestions, setSearchSuggestions] = useState(false);
	const [searchInput, setSearchInput] = useState("");
	const [loading, setLoading] = useState(false);
	const [inputOnFocus, setInputOnFocus] = useState(false);
	const [toggleNotificationPopup, setToggleNotificationPopup] = useState(false);
	const notificationPopup = useRef();

	useEffect(() => {
		getNotificationCount()
			.then(({ data }) => {
				dispatch(setUnreadNotifications(data.unreadCount));
			})
			.catch((error) => console.error(error));
	}, [loggedInUserId, dispatch]);

	useEffect(() => {
		if (loggedInUserId) {
			dispatch(fetchTotalUnreadMessagesCount(loggedInUserId));
		}
	}, [loggedInUserId, dispatch]);

	const searchInputHandler = async ({ target }) => {
		try {
			setLoading(true);
			setSearchInput(target.value);
			const { data } = await getSearchResultsAPI(target.value);
			setSearchSuggestions(data);
		} catch (error) {
			console.error("Error getting search results: ", error);
		}
		setLoading(false);
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				notificationPopup.current &&
				!notificationPopup.current.contains(event.target)
			) {
				setToggleNotificationPopup(false);
			}
		}
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [toggleNotificationPopup]);

	const searchSubmitHandler = (e) => {
		if (e) e.preventDefault();
		if (!searchInput) return;
		navigate(`/search?query=${searchInput}`);
	};

	const searchInputBlurHandler = () => {
		setTimeout(() => {
			if (mobileSearch) setMobileSearch(false);
			setInputOnFocus(false);
			setSearchSuggestions(false);
			setSearchInput("");
		}, 500);
	};
	const [mobileSearch, setMobileSearch] = useState(false);

	const pageTitle = useSelector((state) => state.design.pageTitle);

	return (
		<>
			<div className="startup_navbar_container">
				{/* Navbar left */}
				<div className="startup_navbar_left_container">
					{/* {props.sidebarCollapsed && (
						<div
							className="hamburger"
							style={{
								color: theme === "dark" ? "#B0B0B0" : "#000",
							}}
							onClick={props.handleSidebarToggle}
						>
							<FaBars size={30} />
						</div>
					)} */}
					<div className="logo_container">
						<img
							src={logo}
							onClick={() => navigate("/home")}
							alt="the capital hub logo"
						/>
					</div>

					<div className="startup_navbar_search_container position-relative">
						<form
							onSubmit={searchSubmitHandler}
							className="searchbar-container"
						>
							<button
								type="submit"
								className="searchbar-button d-flex align-items-center justify-content-center"
							>
								<FiSearch size={25} />
							</button>
							<input
								type="text"
								className="searchbar-input"
								placeholder="Search"
								// style={{
								// 	width: `${inputOnFocus ? "400px" : "100%"}`,
								// }}
								value={searchInput}
								onChange={searchInputHandler}
								onFocus={() => setInputOnFocus(true)}
								onBlurCapture={searchInputBlurHandler}
							/>
						</form>
						{inputOnFocus && searchSuggestions && !mobileSearch && (
							<div className="search_results rounded-4 border shadow-sm p-4 position-absolute">
								{!loading ? (
									searchSuggestions && (
										<>
											{!searchSuggestions?.company?.length &&
												!searchSuggestions?.users?.length && (
													<h6 className="h6 text-center w-100 text-secondary">
														No Suggestions.
													</h6>
												)}
											{searchSuggestions?.users
												?.slice(0, 5)
												.map(({ firstName, lastName, oneLinkId, _id }) => (
													<Link
														key={_id}
														className="single_result"
														to={`/user/${firstName.toLowerCase()}.${lastName.toLowerCase()}/${oneLinkId}`}
													>
														{firstName} {lastName}
													</Link>
												))}
											{searchSuggestions?.users?.length > 5 && (
												<span className="w-100 d-flex justify-content-center">
													<button
														className="btn btn-xs btn-light"
														onClick={() => {
															searchSubmitHandler();
															searchInputBlurHandler();
														}}
													>
														Show more
													</button>
												</span>
											)}
											{searchSuggestions?.company
												?.slice(0, 5)
												.map(({ company, founderId, _id, isInvestor }) => (
													<span className="single_result">
														<Link
															to={
																isInvestor
																	? `/company-profile/${_id}?investor=1`
																	: `/company-profile/${founderId}`
															}
														>
															{company}
														</Link>
													</span>
												))}
											{searchSuggestions?.company?.length > 5 && (
												<span className="w-100 d-flex justify-content-center">
													<button
														className="btn btn-xs btn-light"
														onClick={() => {
															searchSubmitHandler();
															searchInputBlurHandler();
														}}
													>
														Show more
													</button>
												</span>
											)}
										</>
									)
								) : (
									<div class="d-flex justify-content-center">
										<div class="spinner-border text-secondary" role="status">
											<span class="visually-hidden">Loading...</span>
										</div>
									</div>
								)}
							</div>
						)}
					</div>

					{/* Mobile hamberger and page title */}
					{!props.isCommunity && (
						<div
							className={`mobile-home-hamberger`}
							onClick={props.handleSidebarToggle}
						>
							<span
								className={`${props.pageTitle === "Chats" ? "d-none" : ""}`}
							>
								{props.sidebarCollapsed ? (
									<MdMenu
										size={25}
										style={{
											color: "var(--d-l-grey)",
										}}
									/>
								) : (
									<MdMenuOpen
										size={25}
										style={{
											color: "var(--currentTheme)",
										}}
									/>
								)}
							</span>
							<h1 className="ms-2 text-break">
								{props.pageTitle || pageTitle}
							</h1>
						</div>
					)}
					{props.isCommunity && (
						<div
							className={`mobile-home-hamberger`}
							onClick={props.handleSidebarToggle}
						>
							<h1 className="ms-2 text-break">{"Community"}</h1>
						</div>
					)}
				</div>

				{/* Navbar right */}
				<div className="startup_navbar_right_container">
					{/* Search for mobile view start*/}
					{mobileSearch && !props.isCommunity && (
						<div className="search_container_mobile rounded-4 shadow-sm border p-3 position-absolute d-flex flex-column">
							<form
								onSubmit={searchSubmitHandler}
								className="searchbar-container "
							>
								<input
									type="text"
									className="searchbar-input"
									placeholder="Search"
									value={searchInput}
									onChange={searchInputHandler}
									onFocus={() => setInputOnFocus(true)}
									onBlurCapture={(e) =>
										setTimeout(() => {
											searchInputBlurHandler(e);
										}, 500)
									}
								/>
								<button
									type="submit"
									className="searchbar-button d-flex align-items-center justify-content-center"
								>
									<FiSearch size={25} color="white" />
								</button>
							</form>
							{inputOnFocus && searchSuggestions && mobileSearch && (
								<div className="search_results py-4 px-2">
									{!loading ? (
										searchSuggestions && (
											<>
												{!searchSuggestions?.company?.length &&
													!searchSuggestions?.users?.length && (
														<h6 className="h6 text-center w-100 text-secondary">
															No Suggestions.
														</h6>
													)}
												{!!searchSuggestions?.users?.length && (
													<span className="search-heading">Users</span>
												)}
												{searchSuggestions?.users
													?.slice(0, 5)
													.map(({ firstName, lastName, oneLinkId, _id }) => (
														<span
															key={_id}
															className="single_result text-secondary"
															onClick={() =>
																navigate(
																	`/user/${firstName.toLowerCase()}-${lastName.toLowerCase()}/${oneLinkId}`
																)
															}
														>
															{firstName} {lastName}
														</span>
													))}
												{searchSuggestions?.users?.length > 5 && (
													<span className="w-100 d-flex justify-content-center">
														<button
															className="btn btn-xs btn-light"
															onClick={() => {
																searchSubmitHandler();
																searchInputBlurHandler();
															}}
														>
															Show more
														</button>
													</span>
												)}
												{!!searchSuggestions?.company?.length && (
													<span className="mt-2 search-heading">Companies</span>
												)}
												{searchSuggestions?.company
													?.slice(0, 5)
													.map(({ company, founderId }) => (
														<span
															key={founderId}
															className="single_result text-secondary"
														>
															<Link to={`/company-profile/${founderId}`}>
																{company}
															</Link>
														</span>
													))}
												{searchSuggestions?.company?.length > 5 && (
													<span className="w-100 d-flex justify-content-center">
														<button
															className="btn btn-xs btn-light"
															onClick={() => {
																searchSubmitHandler();
																searchInputBlurHandler();
															}}
														>
															Show more
														</button>
													</span>
												)}
											</>
										)
									) : (
										<div class="d-flex justify-content-center">
											<div class="spinner-border text-secondary" role="status">
												<span class="visually-hidden">Loading...</span>
											</div>
										</div>
									)}
								</div>
							)}
						</div>
					)}
					<div className="icons-container">
						{/* Search for mobile view start*/}
						{!props.isCommunity && (
							<div className="mobile-icon-wrapper-search position-relative ">
								<span
									className="notification-icon"
									onClick={() => setMobileSearch((prev) => !prev)}
								>
									<FiSearch
										size={25}
										style={{
											color: "var(--d-l-grey)",
										}}
									/>
								</span>
							</div>
						)}

						{/* Notification */}
						<div
							className={`notification-container icon-wrapper`}
							ref={notificationPopup}
						>
							{isNotificationModalOpen || toggleNotificationPopup ? (
								<>
									<BsBell
										size={25}
										style={{
											color: "var(--currentTheme)",
										}}
										onClick={() => setToggleNotificationPopup((prev) => !prev)}
									/>
									<NotificationsPopup
										toggleVisibility={setToggleNotificationPopup}
									/>
								</>
							) : (
								<>
									<BsBell
										size={25}
										style={{
											color: "var(--d-l-grey)",
										}}
										onClick={() => {
											setToggleNotificationPopup((prev) => !prev);
											dispatch(setUnreadNotifications(0));
										}}
									/>
									{!toggleNotificationPopup && unreadNotifications > 0 && (
										<div className="notification-count">
											{unreadNotifications}
										</div>
									)}
								</>
							)}
						</div>

						<Link to="/chats" className="rounded-circle message-icon">
							<div className="icon-wrapper">
								<AiOutlineMessage
									size={25}
									style={{ fill: "var(--d-l-grey)" }}
								/>
								{totalUnreadCount > 0 && (
									<div className="message-count">{totalUnreadCount}</div>
								)}
							</div>
						</Link>

						<div className="icon-wrapper">
							<Link
								to={"/manage-account"}
								className="p-0 p-md-1 rounded-circle"
							>
								<img
									className="profile-pic rounded-circle"
									src={userProfilePicture}
									alt="Profile"
									style={{ objectFit: "cover" }}
								/>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default InvestorNavbar;
