import React, { useState, useEffect } from "react";
import "./LinkedInLogin.css";
import { environment } from "../../../environments/environment";
import { fetchCompanyData } from "../../../Store/features/user/userThunks";
import { fetchAllChats } from "../../../Store/features/chat/chatThunks";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	loginSuccess,
	// loginFailure,
} from "../../../Store/features/user/userSlice";

const LinkedInLogin = ({
	isInvestorSelected,
	setIsLoginSuccessfull,
	setIsInvestorSelected,
	setError,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const userVisitCount = localStorage.getItem("userVisit");

	// Replace with your configuration
	const CLIENT_ID = process.env.REACT_APP_LINKEDIN_CLIENT_ID;
	const REDIRECT_URI = "https://thecapitalhub.in/login";
	const BACKEND_URL = environment.baseUrl;
	const SCOPE = "email openid profile w_member_social";

	const generateState = () => {
		const array = new Uint32Array(1);
		window.crypto.getRandomValues(array);
		return array[0].toString(36);
	};

	useEffect(() => {
		const handleCallback = async () => {
			const urlParams = new URLSearchParams(window.location.search);
			const code = urlParams.get("code");
			const state = urlParams.get("state");
			const savedState = localStorage.getItem("linkedin_state");

			if (code && state === savedState) {
				setIsLoading(true);
				try {
					const response = await fetch(`${BACKEND_URL}/users/linkedInLogin`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ code }),
					});
					// console.log("response", response);
					const data = await response.json();
					// console.log(data);
					if (data.success === true) {
						const user = data.user;
						const token = data.token;
						const linkedinToken = data.linkedinToken;
						if (!userVisitCount) {
							localStorage.setItem("userVisit", 1);
						} else {
							localStorage.setItem("userVisit", 2);
						}
						localStorage.setItem("accessToken", token);
						localStorage.setItem("linkedinToken", linkedinToken);
						localStorage.setItem("isLoggedIn", "true");
						if (data) {
							// console.log("data", data);
							if (!isInvestorSelected && data.user.isInvestor === "true") {
								setError("Invalid credentials");
								return;
							}
							if (isInvestorSelected && data.user.isInvestor === "false") {
								setError("Invalid credentials");
								return;
							}

							const storedAccountsKey =
								data.user.isInvestor === "true"
									? "InvestorAccounts"
									: "StartupAccounts";
							const storedAccounts =
								JSON.parse(localStorage.getItem(storedAccountsKey)) || [];
							const isAccountExists = storedAccounts.some(
								(account) => account.user?._id === user?._id
							);

							if (!isAccountExists) {
								storedAccounts.push(data);
								localStorage.setItem(
									storedAccountsKey,
									JSON.stringify(storedAccounts)
								);
							}

							setIsLoginSuccessfull(true);

							setTimeout(() => {
								setIsInvestorSelected(false);
								setIsLoginSuccessfull(false);

								if (!data.user.isInvestor) navigate("/home");
								else navigate("/investor/home");
							}, 2000);

							dispatch(loginSuccess(data?.user));

							let isInvestor = data?.user?.isInvestor === "true" ? true : false;
							if (isInvestor) {
								dispatch(fetchCompanyData(data?.user?.investor, isInvestor));
							} else {
								dispatch(fetchCompanyData(data?.user?._id, isInvestor));
							}

							dispatch(fetchAllChats());
						}
					}
				} catch (err) {
					setError("Failed to authenticate");
				} finally {
					setIsLoading(false);
				}
			}
		};

		handleCallback();
	}, []);

	const initiateLogin = () => {
		const state = generateState();
		localStorage.setItem("linkedin_state", state);
		const page = "Login";

		const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
			REDIRECT_URI
		)}&state=${state}&page=${encodeURIComponent(
			page
		)}&scope=${encodeURIComponent(SCOPE)}`;

		window.location.href = authUrl;
	};

	return (
		<div className="linkedin-login-container">
			<button
				onClick={initiateLogin}
				disabled={isLoading}
				className={`linkedin-button ${isLoading ? "loading" : ""}`}
			>
				{isLoading && <div className="spinner" />}
				<span>{isLoading ? "Sign In..." : "Sign in with LinkedIn"}</span>
			</button>
		</div>
	);
};

export default LinkedInLogin;
