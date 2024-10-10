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
	}, [activeTab]);

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
		} catch (error) {
			console.log("Error fetching filters: ", error);
		}
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
			});
			if (controller.signal.aborted) return;

			setFilteredData(data); // Only update filteredData after fetching is complete
		} catch (error) {
			console.log("Error fetching filtered results: ", error);
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
			setFilteredData(data);
		} catch (error) {
			console.log("Error fetching initial filtered results: ", error);
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
					/>
				);
			case "Founder":
				return (
					<PersonProfileList
						theme={"startup"}
						short={true}
						data={filteredData}
					/>
				);
			case "Investor":
				return (
					<InvestorProfileList
						theme={"startup"}
						short={true}
						data={filteredData}
					/>
				);
			case "VC":
				return <VcProfileList data={filteredData} />;
			default:
				return null;
		}
	};

	const handleTabChange = (tab) => {
		setFilters({});
		setActiveTab(tab);
		localStorage.setItem("activeTab", tab);
		localStorage.removeItem("filters");
	};

	return (
		<MaxWidthWrapper>
			<section className="startup_explore_wrapper d-flex flex-column gap-3 mb-4">
				<TutorialTrigger steps={startupOnboardingSteps.explorePage} />

				{/* Header */}
				<div className="filter_container rounded-4 shadow-sm d-flex flex-column gap-4 px-4 py-4">
					{/* Heading */}
					<h5 className="m-0" style={{ color: "var(--d-l-grey)" }}>
						Find {activeTab} by
					</h5>

					{/* Tabs */}
					<div className="startup_explore_tabs d-flex align-items-center border-bottom">
						<button
							className={`btn_base py-3 px-3 ${
								activeTab === "Startup" ? "active" : ""
							}`}
							onClick={() => handleTabChange("Startup")}
						>
							Startup
						</button>
						<button
							className={`btn_base py-3 px-3 ${
								activeTab === "Founder" ? "active" : ""
							}`}
							onClick={() => handleTabChange("Founder")}
						>
							Founder
						</button>
						<button
							className={`btn_base py-3 px-3 ${
								activeTab === "Investor" ? "active" : ""
							}`}
							onClick={() => handleTabChange("Investor")}
						>
							Investor
						</button>
						<button
							className={`btn_base py-3 px-3 ${
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
											options={filterOptions?.investmentSize || investmentSizeOptions}
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
											options={filterOptions?.investmentSize || investmentSizeOptions}
											label="Investment Size"
											name="investmentSize"
										/>
										<FilterBySelect
											value={filters?.investmentStage}
											onChange={handleOnChange}
											options={filterOptions?.investmentStage || investmentStageOptions}
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
											options={filterOptions?.fundingRaised || fundingRaisedOptions}
											label="Funding Raised"
											name="fundingRaised"
										/>
										<FilterBySelect
											value={filters?.productStage}
											onChange={handleOnChange}
											options={filterOptions?.productStage || productStageOptions}
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
											options={filterOptions?.yearsOfExperience || yearsOfExperienceOptions}
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
						<SpinnerBS
							className="container spinner_loader d-flex justify-content-center align-items-center p-5 rounded-4 shadow-sm"
							colorClass="text-secondary"
							spinnerSizeClass="xl"
						/>
					) : filteredData?.length > 0 ? (
						renderTabContent()
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