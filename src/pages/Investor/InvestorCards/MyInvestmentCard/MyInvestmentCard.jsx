import React, { useEffect, useRef, useState } from "react";
import "./MyInvestmentCard.scss";
import InvestedIcon from "../../../../Images/investorIcon/Ellipse 192.svg";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
	getInvestorById,
	postInvestorData,
	uploadLogo,
} from "../../../../Service/user";
import { getBase64 } from "../../../../utils/getBase64";
import SpinnerBS from "../../../../components/Shared/Spinner/SpinnerBS";
import { selectTheme } from "../../../../Store/features/design/designSlice";

const MyInvestmentCard = ({
	company,
	isInterests = false,
	editMode = false,
	updateCompanies,
	index,
	setInvestedStartups,
	setMyInterests,
	isPastInvestments,
	setPastInvestments,
}) => {
	const loggedInUser = useSelector((state) => state.user.loggedInUser);
	const [currCompany, setCurrCompany] = useState(null);
	const [loading, setLoading] = useState(false);
	const closeButton = useRef();
	const theme = useSelector(selectTheme);

	useEffect(() => {
		setCurrCompany(company);
	}, [company]);

	const handleInputChange = (e, id) => {
		let value = e.target.value;
		let key = e.target.name;
		if (key === "logoFile") {
			setCurrCompany((prevCurrCompany) => {
				return { ...prevCurrCompany, logo: e.target.files[0] };
			});
		} else {
			setCurrCompany((prevCurrCompany) => {
				return { ...prevCurrCompany, [key]: value };
			});
		}
	};

	const handleCommitmentSelect = (e, option) => {
		setCurrCompany((prevCurrCompany) => {
			return { ...prevCurrCompany, commitment: option };
		});
	};

	const handleSave = async (currCompany) => {
		if (currCompany.description && currCompany.description.length > 400) {
			alert("Maximum allowed characters for description is 400.");
			return;
		}
		setLoading(true);

		try {
			const { data: investor } = await getInvestorById(loggedInUser?.investor);
			if (isInterests) {
				const editMyInterests = investor.myInterests[index];
				editMyInterests.name = currCompany.name;
				editMyInterests.ask = currCompany.ask;
				editMyInterests.commitment = currCompany.commitment;
				editMyInterests.investedEquity = currCompany.investedEquity;
				if (currCompany.logo instanceof Blob) {
					const logo = await getBase64(currCompany.logo);
					const { url } = await uploadLogo({ logo });
					editMyInterests.logo = url;
				}
				investor.myInterests[index] = editMyInterests;
				const { data: response } = await postInvestorData(investor);
				setMyInterests(response.myInterests);
			} else if (isPastInvestments) {
				const editPastInvestment = investor.pastInvestments[index];
				editPastInvestment.name = currCompany.name;
				editPastInvestment.description = currCompany.description;
				if (currCompany.logo instanceof Blob) {
					const logo = await getBase64(currCompany.logo);
					const { url } = await uploadLogo({ logo });
					editPastInvestment.logo = url;
				}
				investor.pastInvestments[index] = editPastInvestment;
				const { data: response } = await postInvestorData(investor);
				setPastInvestments(response.pastInvestments);
			} else {
				const editedStartUp = investor.startupsInvested[index];
				editedStartUp.name = currCompany.name;
				editedStartUp.description = currCompany.description;
				editedStartUp.investedEquity = currCompany.investedEquity;
				if (currCompany.logo instanceof Blob) {
					const logo = await getBase64(currCompany.logo);
					const { url } = await uploadLogo({ logo });
					editedStartUp.logo = url;
				}
				investor.startupsInvested[index] = editedStartUp;
				const { data: response } = await postInvestorData(investor);
				setInvestedStartups(response.startupsInvested);
			}
			closeButton.current.click();
		} catch (error) {
			console.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const getCompanyLogo = () => {
		if (isInterests) {
			return currCompany?.data?.logo || currCompany?.logo;
		}
		return currCompany?.logo;
	};

	const getCompanyName = () => {
		if (isInterests) {
			return currCompany?.data?.company || currCompany?.name;
		}
		return currCompany?.name;
	};

	const getCompanyDescription = () => {
		if (isInterests) {
			return currCompany?.data?.description || currCompany?.description;
		}
		return currCompany?.description;
	};

	return (
		<div
			className="investment-card-container rounded-4 position-relative d-flex flex-column"
			style={{ backgroundColor: theme === "dark" ? "#18181899" : "#b1b0b04d" }}
		>
			<div className="d-flex flex-column py-2 px-3 border-bottom flex-grow-1">
				<div className="left">
					<img
						src={getCompanyLogo()}
						alt="Logo"
						className="logo"
						style={{ width: "60px", height: "60px", marginRight: "10px" }}
					/>
					{editMode ? (
						<>
							<div className="mt-2">
								<label
									htmlFor={`logoFile-${currCompany?.id}`}
									className="upload__label rounded-circle"
									style={{ width: "60px", height: "60px" }}
								>
									<BsFillCloudUploadFill
										style={{
											fontSize: "1.5rem",
											color: "rgba(140, 90, 201, 1)",
										}}
									/>
								</label>
								<input
									type="file"
									name="logoFile"
									id={`logoFile-${currCompany?.id}`}
									accept="image/*"
									className="visually-hidden"
									onChange={(e) => handleInputChange(e, currCompany?.id)}
								/>
							</div>
							<input
								type="text"
								name="name"
								value={getCompanyName()}
								className="modal__input ms-3 rounded-2 p-2 mt-2"
								onChange={(e) => handleInputChange(e, currCompany?.id)}
							/>
						</>
					) : (
						<p className="text m-0 ms-1">
							<strong className="company-name-text">{getCompanyName()}</strong>
						</p>
					)}
				</div>
				{editMode ? (
					<textarea
						id="description"
						name="description"
						rows={6}
						value={getCompanyDescription()}
						className="modal__input mt-2 w-100 rounded-2 p-2 d-block"
						onChange={(e) => handleInputChange(e, currCompany?.id)}
					/>
				) : (
					<p
						className={`m-0 mt-1 py-2 ${editMode ? "d-none" : "d-block"}`}
						style={{
							maxHeight: "100px",
							minHeight: "100px",
							overflowY: "auto",
							fontSize: "14px",
							scrollbarWidth: "none" /* For Firefox */,
							msOverflowStyle: "none" /* For Internet Explorer and Edge */,
						}}
					>
						<span style={{ color: theme === "dark" ? "#DDFF71" : "#7a8e38" }}>
							<b>Company description:</b>
						</span>{" "}
						{getCompanyDescription()}
					</p>
				)}
			</div>
			{!isInterests ? (
				<div
					className="bottom d-flex align-items-center py-2 px-3 gap-2"
					style={{
						backgroundColor: theme === "dark" ? "" : "#bcbcbc99",
						borderRadius: "10px",
					}}
				>
					<img src={InvestedIcon} alt="" className="small-image" />
					<p className="m-0 text-secondary flex flex-row">
						Invested:
						<span
							className={`equity d-l-grey  ms-2 ${editMode ? "d-none" : ""}`}
						>
							{currCompany?.investedEquity}%{" "}
						</span>
						{editMode && (
							<input
								type="number"
								name="investedEquity"
								id="investedEquity"
								value={currCompany?.investedEquity}
								min={0}
								max={100}
								className="modal__input rounded-2 mx-2 p-2 d-block"
								onChange={(e) => handleInputChange(e, currCompany?.id)}
							/>
						)}
						<strong>Equity</strong>
					</p>
				</div>
			) : (
				<>
					<div
						className="d-flex align-items-center py-2 px-3"
						style={{
							backgroundColor: theme === "dark" ? "" : "#bcbcbc99",
							borderRadius: "10px",
						}}
					>
						<p className={`m-0`}>
							<strong>My Commitment:</strong>{" "}
							<span className={`${editMode ? "d-none" : ""}`}>
								{currCompany?.commitment}
							</span>
						</p>
						{editMode && (
							<div className="dropdown flex-grow-1 ms-2">
								<button
									className="btn commitment_form_input dropdown-toggle text-start d-flex align-items-center"
									type="button"
									data-bs-toggle="dropdown"
									aria-expanded="false"
								>
									{currCompany?.commitment}
								</button>
								<ul className="dropdown-menu m-0 p-0 w-100">
									{["N.A", "Soft commitment", "Due diligence phase"].map(
										(option, idx) => (
											<li key={idx} className="m-0 p-0">
												<button
													type="button"
													className={`btn list-btn w-100 text-start ps-3 rounded-0 ${
														option === currCompany?.commitment ? "selected" : ""
													}`}
													onClick={(e) => handleCommitmentSelect(e, option)}
												>
													{option}
												</button>
											</li>
										)
									)}
								</ul>
							</div>
						)}
					</div>
					<p className="m-0 text-secondary">{currCompany?.ask}</p>
				</>
			)}
			{editMode && (
				<button
					className="btn btn-investor save__button position-absolute start-50 translate-middle-x"
					onClick={() => handleSave(currCompany)}
				>
					{loading ? (
						<SpinnerBS
							colorClass={"text-dark"}
							spinnerSizeClass="spinner-border-sm"
						/>
					) : (
						"Save"
					)}
				</button>
			)}
			<button
				data-bs-dismiss="modal"
				style={{ display: "none" }}
				ref={closeButton}
			></button>
		</div>
	);
};

export default MyInvestmentCard;
