import React, { useState, useEffect, useRef } from "react";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import SpinnerBS from "../../../components/Shared/Spinner/SpinnerBS";
import "./StartupExplore.scss";

import FilterBySelect from "../../../components/NewInvestor/FilterBySelect/FilterBySelect";
import VcProfileList from "../../../components/NewInvestor/CompanyProfileComponents/Vcprofile";
import CompanyProfileList from "../../../components/NewInvestor/CompanyProfileComponents/CompanyProfileList";
import { useDispatch } from "react-redux";
import {
	setPageTitle,
	setShowOnboarding,
} from "../../../Store/features/design/designSlice";
import {
	fetchExploreFilteredResultsAPI,
	fetchExploreFiltersAPI,
} from "../../../Service/user";
import PersonProfileList from "../../../components/Shared/PersonProfileComponents/PersonProfileList";
import { startupOnboardingSteps } from "../../../components/OnBoardUser/steps/startup";
import {
	sectorOptions,
	ageOptions,
	fundingRaisedOptions,
	genderOptions,
	investmentSizeOptions,
	investmentStageOptions,
	productStageOptions,
	sizeOptions,
	stageOptions,
	yearsOfExperienceOptions,
} from "../../../constants/Startups/ExplorePage";
import TutorialTrigger from "../../../components/Shared/TutorialTrigger/TutorialTrigger";
import InvestorProfileList from "../../../components/Shared/InvestorProfileComponent/InvestorProfileList";
import { MdFilterAlt, MdFilterAltOff } from "react-icons/md";
import SkeletonLoader from "../../../components/Investor/Feed/Components/SkeletonLoader/SkeletonLoader";
import Modal from "react-bootstrap/Modal"; // Import Modal
import { toast } from "react-toastify"; // Import toast for notifications
import axios from "axios"; // Import axios for API calls
import { environment } from "../../../environments/environment"; // Import environment for base URL
import { useSelector } from "react-redux";
const baseUrl = environment.baseUrl; // Define base URL for API calls

export default function StartupExplore() {
	const dispatch = useDispatch();

	const [activeTab, setActiveTab] = useState(
		localStorage.getItem("activeTab") || "Startup"
	);
	const [filterOptions, setFilterOptions] = useState({});
	const [filters, setFilters] = useState(
		JSON.parse(localStorage.getItem("filters")) || {}
	);
	const [filteredData, setFilteredData] = useState(undefined); // Initialize as undefined
	const [loading, setLoading] = useState(true); // Initially set to true
	const [showFilters, setShowFilters] = useState(false);
	const userVisitCount = localStorage.getItem("userVisit");
	const abortControllerRef = useRef(null);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [showModal, setShowModal] = useState(false); // State for modal visibility
	const [formData, setFormData] = useState({}); // State for form data
	const [bulkData, setBulkData] = useState(""); // State for bulk JSON data

	const loggedInUser = useSelector((state) => state.user.loggedInUser);

	useEffect(() => {
		if (Number(userVisitCount) <= 1) {
			dispatch(setShowOnboarding(true));
		}
	}, []);

	useEffect(() => {
		document.title = "Explore | The Capital Hub";
		dispatch(setPageTitle("Explore"));

		const savedFilters = JSON.parse(localStorage.getItem("filters"));
		const savedTab = localStorage.getItem("activeTab");

		if (savedFilters) {
			setFilters(savedFilters);
		}

		if (savedTab) {
			setActiveTab(savedTab);
		}

		fetchFilters();
		onSubmitFilters();

		// Restore scroll position
		const savedScrollPosition = localStorage.getItem("scrollPosition");
		if (savedScrollPosition) {
			window.scrollTo(0, parseInt(savedScrollPosition, 10));
		}

		return () => {
			// Save scroll position
			localStorage.setItem("scrollPosition", window.scrollY);
		};
	}, [dispatch]);

	useEffect(() => {
		fetchFilters();
		onSubmitFilters();
	}, [activeTab, currentPage]);

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		const newFilters = {
			...filters,
			[name]: value,
		};
		setFilters(newFilters);
		localStorage.setItem("filters", JSON.stringify(newFilters));
	};

	const fetchFilters = async () => {
		try {
			const { data } = await fetchExploreFiltersAPI(activeTab);
			setFilterOptions(data); // Correctly set the filter options for the current tab
		} catch (error) {}
	};

	const onSubmitFilters = async (e) => {
		e?.preventDefault();
		setLoading(true);

		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}

		const controller = new AbortController();
		abortControllerRef.current = controller;

		try {
			const { data } = await fetchExploreFilteredResultsAPI({
				type: activeTab,
				...filters,
				page: currentPage,
				limit: itemsPerPage,
			});
			if (controller.signal.aborted) return;
			console.log("Initial data:", data);
			setFilteredData(data); // Only update filteredData after fetching is complete
		} catch (error) {
			console.error("Error fetching filtered data:", error);
		} finally {
			setLoading(false); // Data fetching is complete
		}
	};

	const fetchInitialData = async () => {
		setFilters({});
		setLoading(true);
		try {
			const { data } = await fetchExploreFilteredResultsAPI({
				type: activeTab,
			});
			// console.log("Initial data:", data);
			setFilteredData(data);
		} catch (error) {
			console.error("Error fetching initial data:", error);
		} finally {
			setLoading(false);
		}
	};

	const renderTabContent = () => {
		switch (activeTab) {
			case "Startup":
				return (
					<CompanyProfileList
						isStartup
						data={filteredData}
						pageName="Startup"
						show={true}
						companyDelete={false}
						isAdmin={loggedInUser.isAdmin}
						setAllCompanyData={setFilteredData}
					/>
				);
			case "Founder":
				return (
					<PersonProfileList
						theme={"startup"}
						short={true}
						data={filteredData}
						isAdmin={loggedInUser.isAdmin}
					/>
				);
			case "Investor":
				return (
					<InvestorProfileList
						theme={"startup"}
						short={true}
						data={filteredData}
						isAdmin={loggedInUser.isAdmin}
					/>
				);
			case "VC":
				return (
					<VcProfileList
						data={filteredData}
						isAdmin={loggedInUser.isAdmin}
					/>
				);
			default:
				return null;
		}
	};

	const handleTabChange = (tab) => {
		setFilters({});
		setActiveTab(tab);
		setCurrentPage(1);
		localStorage.setItem("activeTab", tab);
		localStorage.removeItem("filters");
	};

	const handleLoadMore = () => {
		setCurrentPage((prevPage) => prevPage + 1);
	};
	const handleLoadPrevious = () => {
		setCurrentPage((prevPage) => prevPage - 1);
	};

	const handleFormChange = (e) => {
		const { name, value } = e.target;

		if (name === "sector_focus" || name === "stage_focus") {
			const arrayValue = value.split(",").map((item) => item.trim());
			setFormData((prevData) => ({
				...prevData,
				[name]: arrayValue,
			}));
		} else {
			setFormData((prevData) => ({
				...prevData,
				[name]: value,
			}));
		}
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			let response;
			switch (activeTab) {
				case "Founder":
					response = await axios.post(`${baseUrl}/users/createUser`, {
						...formData,
						isInvestor: false,
					});
					break;
				case "Investor":
					response = await axios.post(`${baseUrl}/users/createUser`, {
						...formData,
						isInvestor: true,
					});
					break;
				case "Startup":
					response = await axios.post(
						`${baseUrl}/startup/createStartup`,
						formData
					);
					break;
				case "VC":
					response = await axios.post(`${baseUrl}/vc/createVc`, formData);
					break;
			}

			if (response.data) {
				toast.success(`${activeTab} added successfully`);
				setShowModal(false);
				onSubmitFilters(); // Refresh the list
				setBulkData("");
			}
		} catch (error) {
			toast.error(`Error adding ${activeTab}`);
			console.error(error);
		}
	};

	const handleBulkFormSubmit = async (e) => {
		e.preventDefault();
		try {
			const parsedData = JSON.parse(bulkData); // Parse the JSON input
			for (const entry of parsedData) {
				let response;
				switch (activeTab) {
					case "Founder":
						response = await axios.post(`${baseUrl}/users/createUser`, {
							...entry,
							isInvestor: false,
						});
						break;
					case "Investor":
						response = await axios.post(`${baseUrl}/users/createUser`, {
							...entry,
							isInvestor: true,
						});
						break;
					case "Startup":
						response = await axios.post(
							`${baseUrl}/startup/createStartup`,
							entry
						);
						break;
					case "VC":
						response = await axios.post(`${baseUrl}/vc/createVc`, entry);
						break;
				}

				if (response.data) {
					toast.success(`${activeTab} added successfully`);
				}
			}
			setShowModal(false);
			onSubmitFilters();
		} catch (error) {
			toast.error(`Error adding ${activeTab}`);
			console.error(error);
		}
	};

	return (
		<MaxWidthWrapper className="startup-explore-wrapper">
			<section className="startup_explore_wrapper d-flex flex-column gap-3 mb-4 px-3">
				<TutorialTrigger steps={startupOnboardingSteps.explorePage} />

				{/* Add Button */}
				{loggedInUser.isAdmin && (
					<button
						className="btn-capital-admin ms-2"
						onClick={() => setShowModal(true)}
						style={{ color: "white" }}
					>
						Add {activeTab}
					</button>
				)}

				{/* Modal */}
				<Modal show={showModal} onHide={() => setShowModal(false)} centered dialogClassName="modal-dialog-centered">
					<Modal.Header closeButton>
						<Modal.Title style={{ color: "black" }}>
							Add New {activeTab}
						</Modal.Title>
					</Modal.Header>

					<Modal.Body>
						<form onSubmit={handleFormSubmit}>
							{(activeTab === "Founder" || activeTab === "Investor") && (
								<>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="First Name"
											name="firstName"
											onChange={handleFormChange}
											required
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Last Name"
											name="lastName"
											onChange={handleFormChange}
											required
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="email"
											className="form-control"
											placeholder="Email"
											name="email"
											onChange={handleFormChange}
											required
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="tel"
											className="form-control"
											placeholder="Phone Number"
											name="phoneNumber"
											onChange={handleFormChange}
											required
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Designation"
											name="designation"
											onChange={handleFormChange}
											required
										/>
									</div>
									<div className="form-group mb-3">
										<select
											className="form-control"
											name="gender"
											onChange={handleFormChange}
											required
										>
											<option value="">Select Gender</option>
											<option value="male">Male</option>
											<option value="female">Female</option>
											<option value="other">Other</option>
										</select>
									</div>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Company"
											name="company"
											onChange={handleFormChange}
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="url"
											className="form-control"
											placeholder="Profile Picture"
											name="profilePicture"
											onChange={handleFormChange}
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Location"
											name="location"
											onChange={handleFormChange}
										/>
									</div>
								</>
							)}

							{activeTab === "Startup" && (
								<>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Company Name"
											name="company"
											onChange={handleFormChange}
											required
										/>
									</div>
									<div className="form-group mb-3">
										<textarea
											className="form-control"
											placeholder="Introductory Message"
											name="introductoryMessage"
											onChange={handleFormChange}
											rows="3"
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Logo URL"
											name="logo"
											onChange={handleFormChange}
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Location"
											name="location"
											onChange={handleFormChange}
										/>
									</div>
									<div className="form-group mb-3">
										<textarea
											className="form-control"
											placeholder="Description"
											name="description"
											onChange={handleFormChange}
											rows="3"
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Age of the company"
											name="age"
											onChange={handleFormChange}
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Industry Type"
											name="industryType"
											onChange={handleFormChange}
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Revenue"
											name="revenue"
											onChange={handleFormChange}
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Funding Ask"
											name="fundingAsk"
											onChange={handleFormChange}
										/>
									</div>
									<div className="form-group mb-3">
										<h6>Contact Details</h6>
										<input
											type="text"
											className="form-control mb-2"
											placeholder="Full Name"
											name="contactDetails.fullname"
											onChange={handleFormChange}
										/>
										<input
											type="tel"
											className="form-control mb-2"
											placeholder="Phone Number"
											name="contactDetails.phoneNumber"
											onChange={handleFormChange}
										/>
										<input
											type="email"
											className="form-control"
											placeholder="Email"
											name="contactDetails.email"
											onChange={handleFormChange}
										/>
									</div>
									<div className="form-group mb-3">
										<h6>Social Links</h6>
										<input
											type="url"
											className="form-control mb-2"
											placeholder="Website"
											name="socialLinks.website"
											onChange={handleFormChange}
										/>
										<input
											type="url"
											className="form-control mb-2"
											placeholder="LinkedIn"
											name="socialLinks.linkedin"
											onChange={handleFormChange}
										/>
										<input
											type="url"
											className="form-control mb-2"
											placeholder="Twitter"
											name="socialLinks.twitter"
											onChange={handleFormChange}
										/>
										<input
											type="url"
											className="form-control"
											placeholder="Instagram"
											name="socialLinks.instagram"
											onChange={handleFormChange}
										/>
									</div>
								</>
							)}

							{activeTab === "VC" && (
								<>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="VC Name"
											name="name"
											onChange={handleFormChange}
											required
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Location"
											name="location"
											onChange={handleFormChange}
											required
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Logo URL"
											name="logo"
											onChange={handleFormChange}
											required
										/>
									</div>
									<div className="form-group mb-3">
										<h6>Social Links</h6>
										<input
											type="url"
											className="form-control mb-2"
											placeholder="Facebook"
											name="facebook"
											onChange={handleFormChange}
										/>
										<input
											type="url"
											className="form-control mb-2"
											placeholder="Instagram"
											name="instagram"
											onChange={handleFormChange}
										/>
										<input
											type="url"
											className="form-control mb-2"
											placeholder="LinkedIn"
											name="linkedin"
											onChange={handleFormChange}
										/>
										<input
											type="url"
											className="form-control"
											placeholder="Twitter"
											name="twitter"
											onChange={handleFormChange}
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Total Portfolio"
											name="total_portfolio"
											onChange={handleFormChange}
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Current Fund Corpus"
											name="current_fund_corpus"
											onChange={handleFormChange}
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Total Fund Corpus"
											name="total_fund_corpus"
											onChange={handleFormChange}
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="number"
											className="form-control"
											placeholder="Ticket Size"
											name="ticket_size"
											onChange={handleFormChange}
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="number"
											className="form-control"
											placeholder="Age"
											name="age"
											onChange={handleFormChange}
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Sector Focus (comma-separated)"
											name="sector_focus"
											onChange={handleFormChange}
										/>
									</div>
									<div className="form-group mb-3">
										<input
											type="text"
											className="form-control"
											placeholder="Stage Focus (comma-separated)"
											name="stage_focus"
											onChange={handleFormChange}
										/>
									</div>
									<div className="form-group mb-3">
										<textarea
											className="form-control"
											placeholder="Description"
											name="description"
											onChange={handleFormChange}
											rows="3"
										/>
									</div>
								</>
							)}

							{/* New section for bulk addition */}
							<h6 style={{ color: "black" }}>Bulk Addition (JSON format)</h6>
							<textarea
								className="form-control mb-3"
								placeholder="Enter JSON data here"
								name="bulkData"
								value={bulkData}
								onChange={(e) => setBulkData(e.target.value)}
								rows="5"
							/>
							<button
								type="button"
								className="btn-capital w-100"
								onClick={handleBulkFormSubmit}
							>
								Submit Bulk {activeTab}s
							</button>
							<button type="submit" className="btn-capital w-100">
								Submit
							</button>
						</form>
					</Modal.Body>
				</Modal>

				{/* Header */}
				<div className="filter_container rounded-4 shadow-sm d-flex flex-column gap-4 px-2 sm:px-4 py-4">
					{/* Heading */}
					<h5
						className="m-0 d-none d-sm-block"
						style={{ color: "var(--d-l-grey)" }}
					>
						Find {activeTab} by
					</h5>

					{/* Tabs */}
					<div className="startup_explore_tabs d-flex align-items-center border-bottom">
						<button
							className={`btn_base py-3 px-2 sm:px-3 ${
								activeTab === "Startup" ? "active" : ""
							}`}
							onClick={() => handleTabChange("Startup")}
						>
							Startup
						</button>
						<button
							className={`btn_base py-3 px-2 sm:px-3 ${
								activeTab === "Founder" ? "active" : ""
							}`}
							onClick={() => handleTabChange("Founder")}
						>
							Founder
						</button>
						<button
							className={`btn_base py-3 px-2 sm:px-3 ${
								activeTab === "Investor" ? "active" : ""
							}`}
							onClick={() => handleTabChange("Investor")}
						>
							Investor
						</button>
						<button
							className={`btn_base py-3 px-2 sm:px-3 ${
								activeTab === "VC" ? "active" : ""
							}`}
							onClick={() => handleTabChange("VC")}
						>
							VC
						</button>
						{filters && (
							<button
								className="btn-capital-small p-2 p-md-3 ms-auto"
								onClick={fetchInitialData}
							>
								<span className="d-none d-md-block">Show All</span>
								<span className="d-md-none">X</span>
							</button>
						)}

						{!showFilters && (
							<MdFilterAlt
								color="rgba(253, 89, 1, 1)"
								onClick={() => setShowFilters(true)}
								style={{
									fontSize: "2rem",
									marginLeft: "10px",
									filter: "drop-shadow(0px 4px 4px rgba(253, 89, 1, 1))",
								}}
							/>
						)}
						{showFilters && (
							<MdFilterAltOff
								color="rgba(253, 89, 1, 1)"
								onClick={() => setShowFilters(false)}
								style={{
									fontSize: "2rem",
									marginLeft: "10px",
									filter: "drop-shadow(0px 4px 4px rgba(253, 89, 1, 1))",
								}}
							/>
						)}
					</div>

					{/* Filters */}
					{showFilters && (
						<form onSubmit={onSubmitFilters}>
							<div className="startup_filters_container">
								{activeTab === "VC" && (
									<>
										<FilterBySelect
											value={filters?.sector_focus}
											onChange={handleOnChange}
											options={filterOptions?.sectors || sectorOptions}
											label="Sector Focus"
											name="sector_focus"
										/>
										<FilterBySelect
											value={filters?.stage_focus}
											onChange={handleOnChange}
											options={filterOptions?.stage || stageOptions}
											label="Stage Focus"
											name="stage_focus"
										/>
										<FilterBySelect
											value={filters?.ticket_size}
											onChange={handleOnChange}
											options={
												filterOptions?.investmentSize || investmentSizeOptions
											}
											label="Ticket Size"
											name="ticket_size"
										/>
									</>
								)}

								{activeTab === "Investor" && (
									<>
										<FilterBySelect
											value={filters?.sector}
											onChange={handleOnChange}
											options={filterOptions?.sectors || sectorOptions}
											label="Sector"
											name="sector"
										/>
										<FilterBySelect
											value={filters?.city}
											onChange={handleOnChange}
											options={filterOptions?.cities}
											label="Location"
											name="city"
										/>
										<FilterBySelect
											value={filters?.gender}
											onChange={handleOnChange}
											options={filterOptions?.genders || genderOptions}
											label="Gender"
											name="gender"
										/>
										<FilterBySelect
											value={filters?.investmentSize}
											onChange={handleOnChange}
											options={
												filterOptions?.investmentSize || investmentSizeOptions
											}
											label="Investment Size"
											name="investmentSize"
										/>
										<FilterBySelect
											value={filters?.investmentStage}
											onChange={handleOnChange}
											options={
												filterOptions?.investmentStage || investmentStageOptions
											}
											label="Investment Stage"
											name="investmentStage"
										/>
									</>
								)}

								{activeTab === "Startup" && (
									<>
										<FilterBySelect
											value={filters?.sector}
											onChange={handleOnChange}
											options={filterOptions?.sectors || sectorOptions}
											label="Sector"
											name="sector"
										/>
										<FilterBySelect
											value={filters?.city}
											onChange={handleOnChange}
											options={filterOptions?.cities}
											label="City"
											name="city"
										/>
										<FilterBySelect
											value={filters?.size}
											onChange={handleOnChange}
											options={filterOptions?.sizes || sizeOptions}
											label="Employee Size"
											name="size"
										/>
										<FilterBySelect
											value={filters?.fundingRaised}
											onChange={handleOnChange}
											options={
												filterOptions?.fundingRaised || fundingRaisedOptions
											}
											label="Funding Raised"
											name="fundingRaised"
										/>
										<FilterBySelect
											value={filters?.productStage}
											onChange={handleOnChange}
											options={
												filterOptions?.productStage || productStageOptions
											}
											label="Startup Stage"
											name="productStage"
										/>
										<FilterBySelect
											value={filters?.stage}
											onChange={handleOnChange}
											options={filterOptions?.stage || stageOptions}
											label="Investment Stage"
											name="stage"
										/>
										<FilterBySelect
											value={filters?.age}
											onChange={handleOnChange}
											options={filterOptions?.age || ageOptions}
											label="Age of startup"
											name="age"
										/>
									</>
								)}

								{activeTab === "Founder" && (
									<>
										<FilterBySelect
											value={filters?.sector}
											onChange={handleOnChange}
											options={filterOptions?.sectors || sectorOptions}
											label="Sector"
											name="sector"
										/>
										<FilterBySelect
											value={filters?.city}
											onChange={handleOnChange}
											options={filterOptions?.cities}
											label="City"
											name="city"
										/>
										<FilterBySelect
											value={filters?.gender}
											onChange={handleOnChange}
											options={filterOptions?.genders || genderOptions}
											label="Gender"
											name="gender"
										/>
										<FilterBySelect
											value={filters?.yearsOfExperience}
											onChange={handleOnChange}
											options={
												filterOptions?.yearsOfExperience ||
												yearsOfExperienceOptions
											}
											label="Years of Experience"
											name="yearsOfExperience"
										/>
									</>
								)}
							</div>
							<div className="d-flex flex-column flex-md-row gap-2 py-3">
								<input
									type="search"
									className="search-filter-input"
									placeholder="Search"
									name="searchQuery"
									onChange={handleOnChange}
								/>
								<button className="filter_button btn-capital" type="submit">
									Filter {activeTab}
								</button>
							</div>
						</form>
					)}
				</div>

				{/* Companies List */}
				<div className="filtered-results">
					{loading ? (
						<SkeletonLoader />
					) : // <SpinnerBS
					// 	className="container spinner_loader d-flex justify-content-center align-items-center p-5 rounded-4 shadow-sm"
					// 	colorClass="text-secondary"
					// 	spinnerSizeClass="xl"
					// />
					filteredData?.length > 0 ? (
						<>
							{renderTabContent()}
							<div className="d-flex justify-content-between align-items-center">
								{currentPage > 1 && (
									<button
										className="btn"
										onClick={handleLoadPrevious}
										style={{
											backgroundColor: "rgba(253, 89, 1, 1)",
											color: "#fff",
										}}
										aria-label="Load previous content"
									>
										Previous
									</button>
								)}
								<div className="d-flex justify-content-end flex-grow-1">
									<button
										className="btn"
										onClick={handleLoadMore}
										style={{
											backgroundColor: "rgba(253, 89, 1, 1)",
											color: "#fff",
										}}
										aria-label="Load more content"
									>
										Next
									</button>
								</div>
							</div>
						</>
					) : filteredData === undefined ? null : (
						<div className="container bg-white d-flex justify-content-center align-items-center p-5 rounded-4 shadow-sm">
							No {activeTab} found
						</div>
					)}
				</div>
			</section>
		</MaxWidthWrapper>
	);
}
