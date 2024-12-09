import React, { useEffect, useState } from "react";
import "./UserJourney.scss";
import { useSelector } from "react-redux";
import { selectTheme } from "../../Store/features/design/designSlice";
import { getPdfData, userPosts } from "../../Service/user";
import {
	userRequiredFields,
	oneLinkRequiredFields,
	companyRequiredFields,
	documentRequiredFields,
	calculateProfileCompletion,
} from "../../components/Investor/Milestones/UserMilestones";
import { useNavigate } from "react-router-dom";
import { environment } from "../../environments/environment";
const baseUrl = environment.baseUrl;
const token = localStorage.getItem("accessToken");

// Define milestone requirements for each level
const MILESTONES = {
	1: {
		name: "Profile",
		requirement: { type: "profile_completion", target: 100 },
	},
	2: {
		name: "Company Profile",
		requirement: { type: "company_profile_completion", target: 80 },
	},
	3: {
		name: "Onelink",
		requirement: { type: "onelink_completion", target: 100 },
	},
	4: { name: "First Post", requirement: { type: "posts_count", target: 1 } },
	5: { name: "First Poll", requirement: { type: "polls_count", target: 1 } },
	6: {
		name: "Thoughts Contribution",
		requirement: { type: "thoughts_count", target: 3 },
	},
	7: {
		name: "Events & Services",
		requirement: { type: "events_services_created", target: 1 },
	},
	8: {
		name: "Thoughts Contribution Advanced",
		requirement: { type: "thoughts_count", target: 10 },
	},
	9: {
		name: "Successful Bookings",
		requirement: { type: "successful_bookings", target: 10 },
	},
	10: {
		name: "Funding Round",
		requirement: { type: "funding_round_achieved", target: 1 },
	},
};

// Function to check user's current level based on milestoneData
const checkCurrentLevel = (milestoneData) => {
	for (let level = 9; level >= 1; level--) {
		const milestone = MILESTONES[level];
		const requirement = milestone.requirement;
		const currentValue = milestoneData[requirement.type] || 0;

		if (currentValue >= requirement.target) {
			// Check if all previous levels are also complete
			let allPreviousComplete = true;
			for (let prevLevel = 1; prevLevel <= level; prevLevel++) {
				const prevMilestone = MILESTONES[prevLevel];
				const prevRequirement = prevMilestone.requirement;
				const prevValue = milestoneData[prevRequirement.type] || 0;
				if (prevValue < prevRequirement.target) {
					allPreviousComplete = false;
					break;
				}
			}
			if (allPreviousComplete) {
				return level;
			}
		}
	}
	return 0;
};

const UserJourney = () => {
	const theme = useSelector(selectTheme);
	const [userProgress, setUserProgress] = useState({
		currentLevel: 1,
		levelProgress: 10,
		nextMilestone: null,
	});
	const [pdfDocumentsCount, setPdfDocumentsCount] = useState(0);
	const [postCount, setPostCount] = useState(0);
	const user = useSelector((state) => state.user.loggedInUser);
	const loggedInUserCompany = useSelector((state) => state.user.company);
	const navigate = useNavigate();
	const [userMilestones, setUserMilestones] = useState({});
	// console.log(userMilestones);
	const fetchUserMilestones = async () => {
		try {
			const response = await fetch(`${baseUrl}/users/getUserMilestones`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.status === 200) {
				const data = await response.json();
				// console.log("User milestones:", data.data);
				setUserMilestones(data.data);
			} else {
				throw new Error("Failed to fetch user milestones");
			}
		} catch (error) {
			console.error("Error fetching user milestones:", error);
		}
	};

	useEffect(() => {
		fetchUserMilestones();
	}, []);

	useEffect(() => {
		const fetchUserPosts = async () => {
			try {
				const response = await userPosts();
				setPostCount(response.data.allPosts.length);
			} catch (error) {
				console.error("Failed to fetch user posts:", error);
			}
		};

		fetchUserPosts();
	}, [user]);

	useEffect(() => {
		const fetchPdf = async () => {
			try {
				const pdfDataLegal = await getPdfData(
					user?.oneLinkId,
					"legal and compliance"
				);
				const pdfDataKyc = await getPdfData(user?.oneLinkId, "kycdetails");
				const pdfDataBusiness = await getPdfData(user?.oneLinkId, "business");
				const pdfDataPitch = await getPdfData(user?.oneLinkId, "pitchdeck");
				const documentsLength =
					pdfDataBusiness.data.length +
					pdfDataKyc.data.length +
					pdfDataLegal.data.length +
					pdfDataPitch.data.length;
				setPdfDocumentsCount(documentsLength);
			} catch (error) {
				console.error("Failed to fetch PDF data:", error);
			}
		};

		if (user?.oneLinkId) {
			fetchPdf();
		}
	}, [user?.oneLinkId]);

	const milestoneData = {
		profile_completion: calculateProfileCompletion(
			user,
			userRequiredFields,
			postCount,
			pdfDocumentsCount
		),
		company_profile_completion: Math.round(
			calculateProfileCompletion(
				loggedInUserCompany,
				companyRequiredFields,
				postCount,
				pdfDocumentsCount
			)
		),
		onelink_completion: calculateProfileCompletion(
			loggedInUserCompany,
			oneLinkRequiredFields,
			postCount,
			pdfDocumentsCount
		),
		posts_count: userMilestones?.userPosts?.length,
		polls_count: userMilestones?.userPolls?.length,
		contribute_thoughts: userMilestones?.userThoughts?.length,
		events_count: userMilestones?.events?.length,
		bookings_count: userMilestones?.userBookings?.length,
	};
	// console.log("milestoneData", milestoneData);

	useEffect(() => {
		const currentLevel = checkCurrentLevel(milestoneData);
		const levelProgress = currentLevel * 10;
		const nextMilestone =
			currentLevel < 10 ? MILESTONES[currentLevel + 1] : null;

		setUserProgress({
			currentLevel,
			levelProgress,
			nextMilestone,
		});
	}, []);

	return (
		<div
			className={`profile-section ${theme === "dark" ? " dark-theme" : ""}`}
			data-bs-theme={theme}
		>
			<div className="profile-header">
				<img src={user.profilePicture} alt="" className="profile-image" />
				<div className="profile-info">
					<h3>{user.firstName + " " + user.lastName}</h3>
					<p>{user.designation}</p>
				</div>
				<div className="achievement-badge">{userProgress.currentLevel}</div>
			</div>

			<div className="level-indicator">
				<div className="level-progress">
					<div
						className="level-fill"
						style={{ width: `${userProgress.levelProgress}%` }}
					></div>
				</div>
				<div className="level-labels">
					<span>Level {userProgress.currentLevel}</span>
					{userProgress.nextMilestone && (
						<div
							className="current-level"
							// style={{ left: `${userProgress.levelProgress}%` }}
						>
							Next: {userProgress.nextMilestone.name}
						</div>
					)}
					<span>(Level 10)</span>
				</div>
			</div>

			{/* Optional: Display current milestone status */}
			{userProgress.nextMilestone && (
				<div className="milestone-info">
					<p>Next milestone: {userProgress.nextMilestone.name}</p>
					<p>
						Required: {userProgress.nextMilestone.requirement.target}
						{userProgress.nextMilestone.requirement.target > 10 ? "% of " : " "}
						{userProgress.nextMilestone.requirement.type.replace(/_/g, " ")}
					</p>
				</div>
			)}
		</div>
	);
};

export default UserJourney;
