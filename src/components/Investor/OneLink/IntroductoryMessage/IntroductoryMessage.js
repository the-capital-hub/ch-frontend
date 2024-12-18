import React, { useState } from "react";
import "./IntroductoryMessage.scss";
// import Send from "../../../../Images/Send.svg";
import { VscSend } from "react-icons/vsc";

import { updateIntroMsgAPI, postInvestorData } from "../../../../Service/user";
import { useSelector, useDispatch } from "react-redux";
import SpinnerBS from "../../../Shared/Spinner/SpinnerBS";
import { setUserCompany } from "../../../../Store/features/user/userSlice";

const IntroductoryMessage = ({
	title,
	image,
	para,
	previous,
	input,
	className,
	isExitClicked,
	setCompany,
	investor = false,
	showPreviousIM = false,
}) => {
	const [newIntroMsg, setNewIntroMsg] = useState("");
	const [newPara, setNewPara] = useState("");
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const [showPreviousMessages, setShowPreviousMessages] =
		useState(showPreviousIM);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const togglePreviousMessages = () => {
		setShowPreviousMessages(!showPreviousMessages);
	};

	let top3Previous = [];
	if (previous) {
		const sortedPrevious = [...previous];
		top3Previous = sortedPrevious.slice(-3);
	}

	const submitNewIMHandler = async () => {
		setLoading(true);
		try {
			const formattedMsg = newIntroMsg.replace(/\n/g, "<br/>");
			if (investor) {
				let updatedMessages = previous;

				if (previous) {
					updatedMessages = [...previous, formattedMsg];
				} else {
					updatedMessages = [formattedMsg];
				}
				const response = await postInvestorData({
					founderId: loggedInUser._id,
					introductoryMessage: formattedMsg,
					previousIntroductoryMessage: updatedMessages,
				});
				dispatch(setUserCompany(response.data));
			} else {
				const { data: response } = await updateIntroMsgAPI({
					introductoryMessage: formattedMsg,
				});
				dispatch(setUserCompany(response.data.data));
			}
			setNewPara(formattedMsg);
			setCompany((prevCompany) => ({
				...prevCompany,
				introductoryMessage: formattedMsg,
				previousIntroductoryMessage: [...previous, formattedMsg],
			}));
			setNewIntroMsg("");
		} catch (error) {
			console.error("Error updating intro: ", error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className={`introductory_message_container ${className}`}>
			<div className="box_container rounded-4  shadow-sm">
				<section className="title_section ">
					<div
						className={`title_wrapper border-bottom ${
							!para ? "title-only-border" : "default-border"
						}`}
					>
						<h6>{title}</h6>
						{para && (
							<button
								className={`toggle-button ${investor ? "investor" : "startup"}`}
								onClick={togglePreviousMessages}
							>
								{showPreviousMessages
									? "Hide Previous Messages"
									: "Show Previous Messages"}
							</button>
						)}
					</div>
				</section>
				{isExitClicked &&
					newPara === "" &&
					(para === undefined || para === "") && (
						<div className="warning_message">
							Please enter an introductory message.
						</div>
					)}
				{(para || newPara) && (
					<section className="text_section border-bottom">
						{showPreviousMessages && (
							<>
								<p>
									<strong>Previous Introductory Message:</strong>
								</p>
								{previous && previous.length > 0 ? (
									top3Previous?.map((message, index) => (
										<p
											key={index}
											dangerouslySetInnerHTML={{ __html: message }}
										/>
									))
								) : (
									<p>No previous introductory messages.</p>
								)}
								<hr />
							</>
						)}

						<p dangerouslySetInnerHTML={{ __html: newPara || para }} />
					</section>
				)}
				{input && (
					<section className="input_section">
						<div className="input_container">
							<textarea
								type="text"
								name="introductoryMessage"
								placeholder="Type your text here"
								value={newIntroMsg}
								onChange={(e) => setNewIntroMsg(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter" && !e.shiftKey) {
										e.preventDefault();
										submitNewIMHandler();
									}
								}}
								style={{
									height: "50px",
									lineHeight: "50px",
									paddingTop: "0",
									paddingBottom: "0",
									display: "flex",
									alignItems: "center",
								}}
							/>
							<div className="right_icons" onClick={submitNewIMHandler}>
								{loading ? (
									<SpinnerBS
										// colorClass={}
										spinnerSizeClass="spinner-border-sm"
									/>
								) : (
									// <img src={Send} alt="Send" />
									<VscSend size={25} style={{ fill: "#f59e0b" }} />
								)}
							</div>
						</div>
					</section>
				)}
			</div>
		</div>
	);
};

export default IntroductoryMessage;
