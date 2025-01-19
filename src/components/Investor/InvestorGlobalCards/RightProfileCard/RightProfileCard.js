import "./rightProfileCard.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getInvestorById, getUserByIdBody } from "../../../../Service/user";
import BatchImag from "../../../../Images/tick-mark.png";
import { checkTopVoiceExpiry } from "../../../../utils/utilityFunctions";
import { RiShieldStarFill } from "react-icons/ri";
import avatar4 from "../../../../Images/avatars/image.png";

const RightProfileCard = ({ noProfile }) => {
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const companyName = useSelector((state) => state.user.company?.company);
	const [investor, setInvestor] = useState(null);
	const [isPassword, setIsPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadData = async () => {
			setIsLoading(true);
			try {
				if (loggedInUser?.investor) {
					const { data } = await getInvestorById(loggedInUser?.investor);
					setInvestor(data);
				}
				const res = await getUserByIdBody(loggedInUser);
				setIsPassword(!!res.data.password);
			} catch (error) {
				console.error("Error loading profile data:", error);
			}
			setIsLoading(false);
		};

		if (loggedInUser) {
			loadData();
		}
	}, [loggedInUser]);

	if (isLoading) return null;

	return (
		<div className="card view_profile_container">
			<div className="view_profile_name_section mt-2">
				{loggedInUser.isSubscribed ? (
					<img
						src={loggedInUser.profilePicture || avatar4}
						style={{
							width: "100px",
							height: "100px",
							objectFit: "cover",
							border: loggedInUser.isSubscribed
								? "2px solid transparent" // Set border width here
								: "none",
							background: loggedInUser.isSubscribed
								? "linear-gradient(180deg, #B68C3C 0%, #F4DD71 100%)"
								: "none",
						}}
						className="rounded-circle"
						alt="profileimage"
					/>
				) : (
					<img
						src={loggedInUser.profilePicture || avatar4}
						style={{
							width: "100px",
							height: "100px",
							objectFit: "cover",
						}}
						className="rounded-circle profile-image"
						alt="profileimage"
					/>
				)}

				<div className="right_profile_text flex_content">
					<h2 className="typography">
						<span style={{ display: "flex", alignItems: "center" }}>
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
								checkTopVoiceExpiry(loggedInUser?.isTopVoice?.expiry) && (
									<span className="top-voice-badge">
										<RiShieldStarFill className="top-voice-icon" />
										<span className="top-voice-text">Top Voice</span>
									</span>
								)}
						</span>
					</h2>
					<span className="smallest_typo">{loggedInUser?.email}</span>
					<span className="smallest_typo">
						{loggedInUser?.designation
							? `${loggedInUser.designation} at ${
									companyName || investor?.companyName || ""
							  }`
							: ""}
					</span>
				</div>
				{!noProfile && (
					<Link
						to="/profile"
						className="btn profile_btn mt-2 manage_acount_btn"
					>
						View Profile
					</Link>
				)}
				<Link
					to="/manage-account"
					className="btn profile_btn mt-1 manage_acount_btn"
				>
					Manage Account
				</Link>
				{!isPassword && (
					<Link
						to="/manage-account"
						className="btn profile_btn mt-1 manage_acount_btn"
					>
						Set Password
					</Link>
				)}
			</div>
		</div>
	);
};

export default RightProfileCard;
