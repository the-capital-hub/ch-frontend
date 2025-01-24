import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { environment } from "../../../../../environments/environment";
import { toast } from "react-hot-toast";
import "./EmailDisplay.scss";

const token = localStorage.getItem("accessToken");

const EmailDisplay = ({
	loading,
	loggedInUser,
	founder,
	setSubscriptionAlert,
}) => {
	const [showEmail, setShowEmail] = useState(false);
	const [email, setEmail] = useState("");

	const fetchEmailfromServer = async (id) => {
		try {
			const response = await fetch(
				`${environment.baseUrl}/users/getUserEmail/${id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			if (response.ok) {
				const data = await response.text();
				try {
					const jsonData = JSON.parse(data);
					return {
						id,
						email: jsonData.email,
						investorIdCount: jsonData.investorIdCount,
					};
				} catch (error) {
					throw new Error("Invalid response type. Expected JSON.");
				}
			} else {
				throw new Error(response.statusText);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const updateUserToServer = async (id, investorId) => {
		try {
			const response = await axios.patch(
				`${environment.baseUrl}/users/updateUserById/${id}`,
				{ investorId: investorId },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (response.status === 200) {
				localStorage.setItem(
					"loggedInUser",
					JSON.stringify(response.data.data)
				);
			} else {
				throw new Error(response.statusText);
			}
		} catch (error) {
			if (error.response) {
				console.error("Response error:", error.response.data);
			} else if (error.request) {
				console.error("Request error:", error.request);
			} else {
				console.error("Error message:", error.message);
			}
		}
	};

	useEffect(() => {
		const initializeEmail = async () => {
			setEmail("");
			if (loggedInUser.isSubscribed) {
				const emailData = await fetchEmailfromServer(founder?._id);
				setEmail(emailData?.email);
			} else if (loggedInUser?.investorIdCount?.includes(founder?._id)) {
				const emailData = await fetchEmailfromServer(founder?._id);
				setEmail(emailData?.email);
			}
		};

		initializeEmail();
	}, [loggedInUser, founder]);

	useEffect(() => {
		setShowEmail(false);
	}, [founder]);

	const handleShowEmail = async () => {
		const data = await fetchEmailfromServer(loggedInUser?._id);

		if (data?.investorIdCount?.includes(founder?._id)) {
			const emailData = await fetchEmailfromServer(founder?._id);
			setEmail(emailData.email);
			setShowEmail(true);
		} else if (
			data?.investorIdCount?.length < 5 &&
			!data?.investorIdCount?.includes(founder?._id)
		) {
			await updateUserToServer(loggedInUser?._id, founder._id);
			const emailData = await fetchEmailfromServer(founder?._id);
			setEmail(emailData.email);
			setShowEmail(true);

			// Display notification for remaining attempts
			const remainingAttempts = 5 - (data.investorIdCount.length + 1);
			toast.success(
				`Email revealed! You have ${remainingAttempts} ${
					remainingAttempts === 1 ? "attempt" : "attempts"
				} left.`
			);
		} else {
			setSubscriptionAlert(true);
			toast.error(
				"You've reached the maximum number of email views. Please subscribe for unlimited access."
			);
		}
	};

	const maskEmail = (email) => {
		if (!email) return "********@*****.com";
		const [username, domain] = email.split("@");
		return `${username.slice(0, 2)}******@${domain.slice(0, 2)}****.${
			domain.split(".")[1]
		}`;
	};

	return (
		<div className="email-container">
			<div className="email-show-btn">
				{loading ? (
					<Loader2 className="h-4 w-4 animate-spin" />
				) : loggedInUser?.isSubscribed ||
				  loggedInUser?.investorIdCount?.includes(founder?._id) ? (
					<h6 className="email_value">{email}</h6>
				) : loggedInUser.userName === founder?.userName ? (
					<h6 className="email_value">{loggedInUser.email}</h6>
				) : (
					<div className="email-display">
						<h6 className="email_value">
							{showEmail ? email : maskEmail(email)}
						</h6>
						{!showEmail && (
							<FaEye className="icon-button" onClick={handleShowEmail} />
						)}
					</div>
				)}
			</div>
			{/* {!loading && !email && <p className="company">No Email Available</p>} */}
		</div>
	);
};

export default EmailDisplay;
