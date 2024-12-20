import React, { useState, useEffect } from "react";
import GoogleIcon from "../../../Images/Group 22.svg";
import { googleLoginAPI } from "../../../Service/user";
import { useNavigate } from "react-router-dom";
import "./GoogleLogin.scss";

const GoogleLoginButton = ({
	isInvestorSelected,
	setIsLoginSuccessfull,
	setIsInvestorSelected,
	setError,
}) => {
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleGoogleLogin = async () => {
		try {
			setLoading(true);
			const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
			const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

			const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
			authUrl.searchParams.append("client_id", clientId);
			authUrl.searchParams.append("redirect_uri", redirectUri);
			authUrl.searchParams.append("response_type", "code");
			authUrl.searchParams.append("access_type", "offline");
			authUrl.searchParams.append("prompt", "consent");
			authUrl.searchParams.append(
				"scope",
				[
					"https://www.googleapis.com/auth/userinfo.profile",
					"https://www.googleapis.com/auth/userinfo.email",
					"https://www.googleapis.com/auth/calendar",
					"https://www.googleapis.com/auth/calendar.events",
				].join(" ")
			);

			window.location.href = authUrl.toString();
		} catch (error) {
			console.error("Error initiating Google login:", error);
			setError("Failed to initiate Google login");
		} finally {
			setLoading(false);
		}
	};

	const exchangeCodeForTokens = async (code) => {
		try {
			const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
			const clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
			const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

			const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
				body: new URLSearchParams({
					code,
					client_id: clientId,
					client_secret: clientSecret,
					redirect_uri: redirectUri,
					grant_type: "authorization_code",
				}),
			});

			if (!tokenResponse.ok) {
				throw new Error("Failed to exchange code for tokens");
			}

			const tokens = await tokenResponse.json();
			// console.log("tokens", tokens);

			const response = await googleLoginAPI({
				access_token: tokens.access_token,
				refresh_token: tokens.refresh_token,
				id_token: tokens.id_token,
			});

			if (response.status === 200) {
				const { user, token } = response;
				localStorage.setItem("accessToken", token);
				localStorage.setItem("isLoggedIn", "true");

				if (!isInvestorSelected && user.isInvestor === "true") {
					setError("Invalid credentials");
					return;
				}
				if (isInvestorSelected && user.isInvestor === "false") {
					setError("Invalid credentials");
					return;
				}

				const storedAccountsKey =
					user.isInvestor === "true" ? "InvestorAccounts" : "StartupAccounts";
				const storedAccounts =
					JSON.parse(localStorage.getItem(storedAccountsKey)) || [];

				if (
					!storedAccounts.some((account) => account.user?._id === user?._id)
				) {
					storedAccounts.push(response);
					localStorage.setItem(
						storedAccountsKey,
						JSON.stringify(storedAccounts)
					);
				}

				setIsLoginSuccessfull(true);

				setTimeout(() => {
					setIsInvestorSelected(false);
					setIsLoginSuccessfull(false);
					if (!user.isInvestor) navigate("/home");
					else navigate("/investor/home");
				}, 2000);
			}
		} catch (error) {
			console.error("Error during token exchange:", error);
			setError("Google login failed. Please try again.");
		}
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const code = urlParams.get("code");

		if (code) {
			exchangeCodeForTokens(code);
			window.history.replaceState({}, document.title, window.location.pathname);
		}
	}, []);

	return (
		<button
			className="google-login-btn"
			onClick={handleGoogleLogin}
			disabled={loading}
		>
			{loading ? (
				<>
					<img src={GoogleIcon} alt="Google logo" />
					<span className="loading-spinner"></span>
				</>
			) : (
				<>
					<img src={GoogleIcon} alt="Google logo" />
					{/* <span>Sign in with Google</span> */}
				</>
			)}
		</button>
	);
};

export default GoogleLoginButton;
