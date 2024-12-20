import "./Explore.scss";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import SmallProfileCard from "../../../components/Investor/InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
// import Company from "../../../components/NewInvestor/Company/Company";
import FilterBySelect from "../../../components/NewInvestor/FilterBySelect/FilterBySelect";
// import CompanyProfile from "../../../components/NewInvestor/CompanyProfileComponents/CompanyProfile";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import VcProfileList from "../../../components/NewInvestor/CompanyProfileComponents/Vcprofile";
import CompanyProfileList from "../../../components/NewInvestor/CompanyProfileComponents/CompanyProfileList";
import { useDispatch } from "react-redux";
import { setPageTitle, setShowOnboarding } from "../../../Store/features/design/designSlice";
import PersonProfileList from "../../../components/Shared/PersonProfileComponents/PersonProfileList";
import {
  fetchExploreFilteredResultsAPI,
  fetchExploreFiltersAPI,
} from "../../../Service/user";
import SpinnerBS from "../../../components/Shared/Spinner/SpinnerBS";
// import OnBoardUser from "../../../components/OnBoardUser/OnBoardUser";
import { investorOnboardingSteps } from "../../../components/OnBoardUser/steps/investor";
import TutorialTrigger from "../../../components/Shared/TutorialTrigger/TutorialTrigger";
import { MdFilterAlt ,MdFilterAltOff } from "react-icons/md";
import axios from 'axios'
import { environment } from "../../../environments/environment";
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';

const baseUrl = environment.baseUrl;
const sectorOptions = [
  "Sector Agnostic",
  "B2B",
  "B2C",
  "AI/ML",
  "API",
  "AR/VR",
  "Analytics",
  "Automation",
  "BioTech",
  "Cloud",
  "Consumer Tech",
  "Creator Economy",
  "Crypto/Blockchain",
  "D2C",
  "DeepTech",
  "Developer Tools",
  "E-Commerce",
  "Education",
  "Climate Tech",
  "Fintech",
  "Gaming",
  "Healthtech",
  "IoT (Internet of Things)",
  "Legaltech",
  "Logistics and Supply Chain",
  "Manufacturing",
  "Media and Entertainment",
  "Mobility and Transportation",
  "PropTech (Property Technology)",
  "Robotics",
  "Saas (Software as a Service)",
  "SpaceTech",
  "SportsTech",
  "Telecommunications",
  "Travel and Tourism",
  "Wearables",
  "Insurtech",
  "Agtech (Agriculture Technology)",
  "Clean Energy / Renewable Energy",
  "HRtech (Human Resources Technology)",
  "B2B Marketplace",
  "Cybersecurity",
  "E-sports",
  "MarTech (Marketing Technology)",
  "MedTech (Medical Technology)",
  "Retail Tech",
  "others",
];

const genderOptions = ["Male", "Female"];

const sizeOptions = ["10+", "100+", "1000+"];

const ageOptions = ["Less then a year", "1-3 years", "3-5 years", "More thn 5 years"];

const stageOptions = [
  "Bootstrap",
  "Incubated",
  "Angel invested",
  "Pre seed",
  "Seed",
  "Series A and above",
];

const investmentStageOptions = [
  "Seed Stage",
  "Series A",
  "Series B",
  "Series C",
  "Series D and Beyond",
  "Early-stage (Seed to Series A)",
  "Growth-stage (Series B and Beyond)",
];

const fundingRaisedOptions = [
  "Less than ₹10 Lakh",
  "₹10 Lakh - ₹50 Lakh",
  "₹50 Lakh - ₹1 Crore",
  "More than ₹1 Crore",
];

const productStageOptions = [
  "Concept/Idea",
  "Prototype",
  "Minimum Viable Product (MVP)",
  "Beta Testing",
  "Fully Developed Product",
];

const investmentSizeOptions = [
  "Micro-investments (< ₹10,000)",
  "Small Investments (₹10,000 - ₹50,000)",
  "Moderate Investments (₹50,000 - ₹2 Lakhs)",
  "Significant Investments (₹2 Lakhs - ₹10 Lakhs)",
  "Large Investments (₹10 Lakhs - ₹1 Crore)",
  "Major Investments (₹1 Crore and above)",
];

// const sectorPreferenceOptions = [];

const previousExitsOptions = [
  "Successful IPO",
  "Acquisition by a Larger Company",
  "Merger",
  "No Previous Exit Experience",
];

const yearsOfExperienceOptions = [
  "0-2 years",
  "2-5 years",
  "5-10 years",
  "10-15 years",
  "15+ years",
];

const educationOptions = [
  "Computer Science Engineering",
  "Electrical and Electronics Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Chemical Engineering",
  "Aerospace Engineering",
  "Biomedical Engineering",
  "Environmental Engineering",
  "Software Engineering",
  "MBA in Marketing",
  "MBA in Finance",
  "MBA in Data Science",
];

const diversityMetricsOptions = [
  "Gender Diversity",
  "Ethnic Diversity",
  "Age Diversity",
  "LGBTQ+ Inclusivity",
  "Disability Inclusivity",
  "Socioeconomic Diversity",
];

function Explore() {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("Startup");
  const [filterOptions, setFilterOptions] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const userVisitCount = localStorage.getItem("userVisit");
  const abortControllerRef = useRef(null);

  const loggedInUser = useSelector((state) => state.user.loggedInUser);


  useEffect(()=>{
    if(Number(userVisitCount)<=1){
      dispatch(setShowOnboarding(true))
    }
  },[])
  // Set page title
  useEffect(() => {
    document.title = "Explore | Investors - The Capital Hub";
    dispatch(setPageTitle("Explore"));
  }, [dispatch]);

  useEffect(() => {
    fetchFilters();
    onSubmitFilters();
  }, [activeTab]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
    
  };

  const fetchFilters = async () => {
    try {
      const { data } = await fetchExploreFiltersAPI(activeTab);
      setFilterOptions(data);
    } catch (error) {
    }
  };

  const onSubmitFilters = async (e) => {
    e?.preventDefault();
    setLoading(true);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController
    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const { data } = await fetchExploreFilteredResultsAPI({
        type: activeTab,
        ...filters,
      });
      if (controller.signal.aborted) return;

      setFilteredData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const fetchInitialData = async () => {
    setFilters(null);
    setLoading(true);
    try {
      const { data } = await fetchExploreFilteredResultsAPI({
        type: activeTab,
      });
      setFilteredData(data);

    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Render filter result
  const renderTabContent = () => {
    switch (activeTab) {
      case "Startup":
        return <CompanyProfileList isStartup={false} data={filteredData} />;
      case "Founder":
        return (
          <PersonProfileList
            theme={"investor"}
            short={true}
            data={filteredData}
          />
        );
      case "Investor":
        return (
          <PersonProfileList
            theme={"investor"}
            short={true}
            data={filteredData}
          />
        );
        case "VC":
        return (
          <VcProfileList
          theme={'investor'}
            data={filteredData}
          />
        );
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
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      switch(activeTab) {
        case "Founder":
          response = await axios.post(`${baseUrl}/users/createUser`, {
            ...formData,
            isInvestor: false
          });
          break;
        case "Investor":
          response = await axios.post(`${baseUrl}/users/createUser`, {
            ...formData,
            isInvestor: true
          });
          break;
        case "Startup":
          response = await axios.post(`${baseUrl}/startup/createStartup`, formData);
          break;
        case "VC":
          response = await axios.post(`${baseUrl}/vc/createVc`, formData);
          break;
      }
      
      if(response.data) {
        toast.success(`${activeTab} added successfully`);
        setShowModal(false);
        onSubmitFilters(); // Refresh the list
      }
    } catch (error) {
      toast.error(`Error adding ${activeTab}`);
      console.error(error);
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="explore_container px-md-3 mb-4">
        <SmallProfileCard text="Explore" />

        {/* Onboarding popup */}
        <TutorialTrigger steps={investorOnboardingSteps.explorePage} />

        <section className="filter_container border">
          <h5 className="h5">Find StartUps by</h5>
          <div className="filter_by">
            <button
              className={activeTab === "Startup" ? "active" : "s_f_i_button "}
              onClick={() => handleTabChange("Startup")}
            >
              Startup
            </button>
            <button
              className={activeTab === "Founder" ? "active" : "s_f_i_button "}
              onClick={() => handleTabChange("Founder")}
            >
              Founder
            </button>
            <button
              className={activeTab === "Investor" ? "active" : "s_f_i_button "}
              onClick={() => handleTabChange("Investor")}
            >
              Investor
            </button>
            <button
              className={`btn_base py-3 px-3 ${activeTab === "VC" ? "active" : ""}`}
              onClick={() => handleTabChange("VC")}
            >
              VC
            </button>
            {filters && (
              <button
                className={`btn-capital-small p-2 p-md-3 ms-auto`}
                onClick={fetchInitialData}
              >
                <span className="d-none d-md-block">Show All</span>
                <span className="d-md-none">X</span>
              </button>
            )}

{!showFilters && (<MdFilterAlt color="rgba(253, 89, 1, 1)" onClick={()=> setShowFilters(true)} style={{fontSize:'2rem', marginLeft:"10px"}}/>)}
{showFilters && (<MdFilterAltOff color="white" onClick={()=> setShowFilters(false)} style={{fontSize:'2rem', marginLeft:"10px"}}/>)}
          </div>

          {/* Filters */}
         {showFilters &&(
          <form onSubmit={onSubmitFilters}>
            <div className="investor_explore_filters_container">
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
                  {/*<FilterBySelect
                    value={filters?.sectorPreference}
                    onChange={handleOnChange}
                    options={filterOptions?.sectors || sectorOptions}
                    label="Sector Preference"
                    name="sectorPreference"
                  />*/}
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
                    label="Size"
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
                    options={filterOptions?.productStage || productStageOptions}
                    label="Product Stage"
                    name="productStage"
                  />
                  <FilterBySelect
                    value={filters?.stage}
                    onChange={handleOnChange}
                    options={filterOptions?.stage || stageOptions}
                    label="Stage"
                    name="stage"
                  />
                  <FilterBySelect
                    value={filters?.age}
                    onChange={handleOnChange}
                    options={filterOptions?.age || ageOptions}
                    label="Age"
                    name="age
                  "
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
                  {/*<FilterBySelect
                    value={filters?.education}
                    onChange={handleOnChange}
                    options={filterOptions?.education || educationOptions}
                    label="Education"
                    name="education"
                  />*/}
                  <FilterBySelect
                    value={filters?.diversityMetrics}
                    onChange={handleOnChange}
                    options={
                      filterOptions?.diversityMetrics || diversityMetricsOptions
                    }
                    label="Diversity Metrics"
                    name="diversityMetrics"
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
              <button className="btn-capital  " type="submit">
                Filter {activeTab}
              </button>
            </div>
          </form>
         )}
          {/* <FilterBySelect label="Sector" name="sector" />
            <FilterBySelect label="Sub-Sector" name="subSector" />
            <FilterBySelect label="State" name="state" />
            <FilterBySelect label="City" name="city" />
            <FilterBySelect label="Age" name="age" />
            <FilterBySelect label="Business Model" name="businessModel" />
            <FilterBySelect
              label="Incorporation Model"
              name="incorporationModel"
            />
            <FilterBySelect label="DPIIT Registered" name="dpiitRegistered" />
            {activeTab === "Founder" && (
              <>
                <FilterBySelect label="Incubation" name="incubation" />
                <FilterBySelect label="Incubation" name="incubation" />
              </>
            )} */}
        </section>

        {/* Filtered data list */}
        
        <div className="filtered-results">
        {loggedInUser?.isAdmin && (
  <button 
    className="btn-capital-admin ms-2"
    onClick={() => setShowModal(true)}
  >
    Add {activeTab}
  </button>
)}

{/* Modal */}
<Modal show={showModal} onHide={() => setShowModal(false)} centered>
  <Modal.Header closeButton>
    <Modal.Title>Add New {activeTab}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <form onSubmit={handleFormSubmit}>
      {activeTab === "Founder" || activeTab === "Investor" ? (
        <>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              name="firstName"
              onChange={handleFormChange}
            />
          </div>
          {/* Add other fields similarly */}
        </>
      ) : activeTab === "Startup" ? (
        <>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Company Name"
              name="company"
              onChange={handleFormChange}
            />
          </div>
          {/* Add other startup fields */}
        </>
      ) : (
        <>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="VC Name"
              name="name"
              onChange={handleFormChange}
            />
          </div>
          {/* Add other VC fields */}
        </>
      )}
      <button type="submit" className="btn-capital w-100">
        Submit
      </button>
    </form>
  </Modal.Body>
</Modal>
          {loading ? (
            <SpinnerBS
              className="container white-to-grey d-l-grey d-flex justify-content-center align-items-center p-5 rounded-4 shadow-sm"
              colorClass="text-secondary"
              spinnerSizeClass="xl"
            />
          ) : (
            <>
              {!filteredData?.length ? (
                <div className="container white-to-grey d-l-grey d-flex justify-content-center align-items-center p-5 rounded-4 shadow-sm">
                  No {activeTab} found
                </div>
              ) : (
                renderTabContent()
              )}
            </>
          )}
        </div>
      </div>
      {/* <OnBoardUser steps={investorOnboardingSteps.explorePage} /> */}
    </MaxWidthWrapper>
  );
}

export default Explore;
