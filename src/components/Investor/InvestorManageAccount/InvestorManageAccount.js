import "./InvestorManageAccount.scss";
import SmallProfileCard from "../InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import logoIcon from "../../../Images/manageAccount/Group 15186.svg";
import { Link } from "react-router-dom";
import {
	changePasswordAPI,
	updateUserById,
	addNotificationAPI,
	getUserByIdBody,
} from "../../../Service/user";
import { useEffect, useState } from "react";
import LogOutPopUp from "../../PopUp/LogOutPopUp/LogOutPopUp";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../Store/features/user/userSlice";
import MaxWidthWrapper from "../../Shared/MaxWidthWrapper/MaxWidthWrapper";
import {
	selectTheme,
	setPageTitle,
	toggleTheme,
} from "../../../Store/features/design/designSlice";
import { loginSuccess } from "../../../Store/features/user/userSlice";
import deleteIcon from "../../../Images/post/delete.png";
import { fetchCompanyData } from "../../../Store/features/user/userThunks";
import toast from "react-hot-toast";
import { MdDarkMode } from "react-icons/md";
import { GoSun } from "react-icons/go";
import { clearAllChatsData } from "../../../Store/features/chat/chatSlice";
import { fetchAllChats } from "../../../Store/features/chat/chatThunks";
import API from "../../../api";
import BatchImag from "../../../Images/tick-mark.png";
import { MdDelete } from "react-icons/md";
import { checkTopVoiceExpiry } from "../../../utils/utilityFunctions";
import { RiShieldStarFill } from "react-icons/ri";

const InvestorManageAccount = () => {
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const [otherAccounts, setOtherAccounts] = useState(
		JSON.parse(localStorage.getItem("StartupAccounts")) || []
	);
	const [selectedAccount, setSelectedAcc] = useState(loggedInUser);
	const [selectedAccountFull, setSelectedAccFull] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isPassword, setIsPassword] = useState(false);
	const [passwordChanged, setPasswordChanged] = useState(false);
	const theme = useSelector(selectTheme);

	useEffect(() => {
		const getUser = async () => {
			await getUserByIdBody(loggedInUser._id).then((res) => {
				if (res.data.password) {
					setIsPassword(true);
				} else {
					setIsPassword(false);
				}
				console.log("IsPassword", isPassword);
			});
		};
		getUser();
	}, [passwordChanged, loggedInUser]);

	const changeTheme = () => {
		dispatch(toggleTheme());

		if (
			!loggedInUser.achievements.includes("658bb96e8a18edb75e6f423f") &&
			theme === "light"
		) {
			const achievements = [...loggedInUser.achievements];
			achievements.push("658bb96e8a18edb75e6f423f");
			const updatedData = { achievements };
			updateUserById(loggedInUser._id, updatedData)
				.then(({ data }) => {
					dispatch(loginSuccess(data.data));
					const notificationBody = {
						recipient: loggedInUser._id,
						type: "achievementCompleted",
						achievementId: "658bb96e8a18edb75e6f423f",
					};
					addNotificationAPI(notificationBody)
						.then((data) => console.log("Added"))
						.catch((error) => console.error(error.message));
				})
				.catch((error) => {
					console.error("Error updating user:", error);
				});
		}
	};

	const initialForm = {
		oldPassword: "",
		newPassword: "",
		confirmNewPassword: "",
	};
	const [changePasswordForm, setChangePasswordForm] = useState({
		...initialForm,
	});
	const [message, setMessage] = useState(false);

	const onChangeFormHandler = (event) => {
		setMessage(false);
		const { name, value } = event.target;
		setChangePasswordForm((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	};

	const onSubmitChangePasswordHandler = async (event) => {
		event.preventDefault();

		let response;

		if (isPassword) {
			response = await fetch(API.loginUser, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					phoneNumber: loggedInUser.email,
					password: changePasswordForm.oldPassword,
				}),
			});

			if (
				!response.ok ||
				changePasswordForm.confirmNewPassword !== changePasswordForm.newPassword
			) {
				console.log(response);
				return setMessage("Passwords don't match");
			}
		}

		if (
			changePasswordForm.confirmNewPassword !== changePasswordForm.newPassword
		) {
			console.log(response);
			return setMessage("Passwords don't match");
		}
		changePasswordAPI(changePasswordForm)
			.then(({ message }) => {
				setMessage(message);
				setChangePasswordForm(initialForm);
				setPasswordChanged(!passwordChanged);
			})
			.catch(({ message }) => setMessage(message))
			.finally(() => setTimeout(() => setMessage(false), 3000));
	};

	const dispatch = useDispatch();

	useEffect(() => {
		document.title = "Manage Account | The Capital Hub";
		dispatch(setPageTitle("Manage Account"));
	}, [dispatch]);

	const [showLogoutPopup, setShowLogoutPopup] = useState(false);
	const navigate = useNavigate();
	const handleLogoutLogic = () => {
		dispatch(logout());
		dispatch(clearAllChatsData());
		localStorage.removeItem("isLoggedIn");
		navigate("/login");
	};

	const handleSwitchAccount = () => {
		if (selectedAccountFull) {
			const confirmSwitch = window.confirm(
				"Are you sure you want to switch account?"
			);
			setIsSubmitting(true);
			if (confirmSwitch) {
				setTimeout(() => {
					dispatch(loginSuccess(selectedAccountFull.user));
					let isInvestor =
						selectedAccountFull.user.isInvestor === "true" ? true : false;
					dispatch(fetchCompanyData(selectedAccountFull.user._id, isInvestor));
					// fetch chats
					dispatch(clearAllChatsData());
					dispatch(fetchAllChats());
					localStorage.setItem("accessToken", selectedAccountFull.token);
					setIsSubmitting(false);
					toast.success("Account switched successfully", {
						duration: 3000,
						position: "top-center",
					});
				}, 2000);
			}
		}
	};

	const handleSelectedAccount = (account) => {
		setSelectedAcc(account.user);
		setSelectedAccFull(account);
	};

	//remove acc
	const handleRemoveAccount = (removeAccountDetails) => {
		const shouldRemove = window.confirm(
			"Are you sure you want to remove this account?"
		);
		if (!shouldRemove) {
			return;
		}
		const storedAccounts =
			JSON.parse(localStorage.getItem("StartupAccounts")) || [];
		const updatedAccounts = storedAccounts.filter(
			(account) => account.user._id !== removeAccountDetails.user._id
		);
		setOtherAccounts(updatedAccounts);
		localStorage.setItem("StartupAccounts", JSON.stringify(updatedAccounts));
		if (loggedInUser && loggedInUser._id === removeAccountDetails.user._id) {
			const updatedLoggedInUser =
				updatedAccounts.length > 0 ? updatedAccounts[0].user : null;
			if (updatedLoggedInUser === null) {
				handleLogoutLogic();
				navigate("/login");
			} else {
				dispatch(loginSuccess(updatedLoggedInUser));
			}
		}
	};

	return (
		<MaxWidthWrapper>
			<div className="manage_account_container">
				<div className="row">
					<div className="col">
						<SmallProfileCard
							className="mt-5 mt-xl-3"
							text={"Manage Account"}
						/>
						<div className="box_container p-4 row row-cols-1 row-cols-lg-2 row-cols-xl-3 row-gap-3 flex-lg-row">
							{/* Change Password */}
							<section className="col password_section">
								<div className="change_password border border-secondary-subtle">
									{/* Header */}
									<div className="d-flex align-items-center gap-2">
										<div className="logo">
											<img src={logoIcon} alt="img" />
										</div>
										<span
											className="header_text"
											style={{ color: "var(--d-l-grey)" }}
										>
											{isPassword ? "Change Password" : "Set Password"}
										</span>
									</div>
									<hr />
									{/* Body */}
									<form
										onSubmit={onSubmitChangePasswordHandler}
										className="d-flex flex-column"
									>
										{isPassword && (
											<div className="form-input col">
												<label htmlFor="oldPassword">Old Password</label>
												<input
													id="oldPassword"
													type="text"
													value={changePasswordForm.oldPassword}
													onChange={onChangeFormHandler}
													name="oldPassword"
												/>
											</div>
										)}
										<div className="form-input col">
											<label htmlFor="newPassword">New Password</label>
											<input
												id="newPassword"
												type="password"
												name="newPassword"
												value={changePasswordForm.newPassword}
												onChange={onChangeFormHandler}
												required
											/>
										</div>
										<div className="form-input col">
											<label htmlFor="confirmNewPassword">
												Confirm Password
											</label>
											<input
												id="confirmNewPassword"
												type="password"
												name="confirmNewPassword"
												value={changePasswordForm.confirmNewPassword}
												onChange={onChangeFormHandler}
												required
											/>
										</div>
										{/* Footer */}
										<div className="footer w-100">
											{message && <p className="text-center">{message}</p>}
											<button type="submit" className="w-100">
												Save Changes
											</button>
										</div>
									</form>
								</div>
							</section>

							{/* Present Accounts */}
							<section className="col present_accounts_section">
								<div className="present_account border border-secondary-subtle">
									{/* Header */}
									<div className="d-flex align-items-center">
										<div className="logo">
											<img src={logoIcon} alt="img" />
										</div>
										<div className="header_text">Present account</div>
									</div>
									<hr />
									{/* Body */}
									<div className="d-flex align-items-center">
										<div className="profile_image">
											<img src={loggedInUser?.profilePicture} alt="img" />
										</div>
										<div className="name_email">
											<h4 className="text-break">
												{loggedInUser?.firstName} {loggedInUser?.lastName}
												{loggedInUser.isSubscribed && (
													<img
														src={BatchImag}
														style={{
															width: "1.2rem",
															height: "1.2rem",
															objectFit: "contain",
															marginLeft: "0.5rem", // Optional: adds space between the name and the icon
														}}
														alt="Batch Icon"
													/>
												)}
												{loggedInUser?.isTopVoice?.status &&
													checkTopVoiceExpiry(
														loggedInUser?.isTopVoice?.expiry
													) && (
														<span className="top-voice-badge">
															<RiShieldStarFill className="top-voice-icon" />
															<span className="top-voice-text">Top Voice</span>
														</span>
													)}
											</h4>
											<span className="text-break">{loggedInUser?.email}</span>
										</div>
									</div>
									{/* Footer */}
									<div className="footer d-flex gap-3">
										<Link
											to="/profile"
											className={`btn btn-delete`}
											style={{
												backgroundColor: "var(--currentTheme)",
											}}
										>
											View profile
										</Link>
										<button
											className="btn btn-delete"
											onClick={() => setShowLogoutPopup(true)}
										>
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
								<div className="toggle-theme d-flex">
									<button
										className="btn btn-dark text-capitalize mx-auto my-2"
										onClick={() => changeTheme()}
									>
										{theme === "light" ? <GoSun /> : <MdDarkMode />} {theme}{" "}
										mode
									</button>
								</div>
							</section>

							{/* Logout Section */}
							<section className="col present_accounts_section">
								<div className="present_account border border-secondary-subtle">
									<div className="d-flex align-items-center">
										<div className="logo">
											<img src={logoIcon} alt="img" />
										</div>
										<div className="header_text">Accounts</div>
									</div>
									<hr />
									<section className="existing_accounts">
										{otherAccounts?.map((account, index) => {
											const fullName = account?.user
												? account.user.firstName + " " + account.user.lastName
												: "Unknown User";

											return (
												<div className="small_card" key={index}>
													<div className="left_section">
														<div className="d-flex align-items-center">
															<label className="checkbox_container me-2">
																<input
																	type="checkbox"
																	checked={
																		account.user?._id === selectedAccount?._id
																	}
																	onChange={() =>
																		handleSelectedAccount(account)
																	}
																/>
																<span className="checkmark"></span>
															</label>
															<div className="profile_image">
																<img
																	src={account.user?.profilePicture || ""}
																	alt="img"
																/>
															</div>
															<div className="name_email">
																<h5 className="m-0">
																	{fullName}
																	{account.user.isSubscribed && (
																		<img
																			src={BatchImag}
																			style={{
																				width: "1.2rem",
																				height: "1.2rem",
																				objectFit: "contain",
																				marginLeft: "0.5rem", // Optional: adds space between the name and the icon
																			}}
																			alt="Batch Icon"
																		/>
																	)}
																	{account.user?.isTopVoice?.status &&
																		checkTopVoiceExpiry(
																			account.user?.isTopVoice?.expiry
																		) && (
																			<span className="top-voice-badge">
																				<RiShieldStarFill className="top-voice-icon" />
																				<span className="top-voice-text">
																					Top Voice
																				</span>
																			</span>
																		)}
																</h5>
																<span className="fs-sm fw-semibold ">
																	{window.innerWidth <= 600
																		? account.user?.email?.slice(0, 21) ===
																		  account.user?.email
																			? account.user?.email
																			: account.user?.email?.slice(0, 21) +
																			  "..."
																		: account.user?.email?.slice(0, 23) ===
																		  account.user?.email
																		? account.user?.email
																		: account.user?.email?.slice(0, 23) + "..."}
																</span>
															</div>
														</div>
													</div>
													<div className="right_section d-flex flex-column ">
														<button
															className="img-btn pt-md-2"
															onClick={() => handleRemoveAccount(account)}
														>
															<MdDelete size={25} />
														</button>
													</div>
												</div>
											);
										})}
										<div className="footer d-flex gap-3">
											{otherAccounts.length > 1 && (
												<button
													className="btn btn-delete"
													style={{
														backgroundColor: "var(--currentTheme)",
													}}
													onClick={handleSwitchAccount}
												>
													{isSubmitting
														? "Switching Account...."
														: "Switch Account"}
												</button>
											)}
											<Link to="/login" className="btn btn-delete bg-secondary">
												Add account
											</Link>
										</div>
									</section>
								</div>
							</section>
						</div>
					</div>
				</div>
			</div>
		</MaxWidthWrapper>
	);
};

export default InvestorManageAccount;
