import React, { useState, useEffect } from "react";
import "./CompanyProfileForm.scss";
import { postStartUpData, postInvestorData } from "../../../Service/user";
import { getBase64 } from "../../../utils/getBase64";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../Store/features/user/userSlice";
import SpinnerBS from "../../Shared/Spinner/SpinnerBS";
import { setUserCompany } from "../../../Store/features/user/userSlice";
import { BsFillCameraFill } from "react-icons/bs";

const LOCATIONS = [
  "Select Location",
  "New Delhi",
  "Gurgaon",
  "Mumbai",
  "Pune",
  "Hyderabad",
  "Chennai",
  "Bengaluru",
  "Mangalore",
  "Kochi",
  "Lucknow",
  "Kolkata",
  "Others",
];

const SECTORS = [
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
const stageData = [
  "Bootstrap",
  "Incubated",
  "Angel invested",
  "Pre seed",
  "Seed",
  "Series A and above",
];
const productData = [
  "Concept/Idea",
  "Prototype",
  "Minimum Viable Product(MVP)",
  "Beta Testing",
  "Fully Deployed Product",
];

export default function CompanyProfileForm({
  companyData,
  investor = false,
  isSaveAll,
  handleShowPopup,
  theme,
}) {
  // States for form
  const [imagePreview, setImagePreview] = useState(companyData?.logo || null);
  const [formData, setFormData] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [othersClicked, setOthersClicked] = useState(false);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();
  // State for loading
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isSaveAll) {
      const event = new Event("submit", { cancelable: true });
      handleSubmit(event);
    }
  }, [isSaveAll]);

  useEffect(() => {
    if (investor) {
      setFormData({
        founderId: companyData.founderId || loggedInUser._id,
        company: companyData.companyName || "",
        tagline: companyData.tagline || "",
        location: companyData.location || LOCATIONS[0],
        startedAtDate: companyData.startedAtDate || "",
        industryType: companyData.industry || "",
        sector: companyData.sector || SECTORS[0],
        noOfEmployees: companyData.noOfEmployees || "",
        vision: companyData.vision || "",
        mission: companyData.mission || "",
        socialLinks: companyData.socialLinks || "",
        keyFocus: companyData.keyFocus || "",
        stage: companyData.stage || stageData[0],
        lastFunding: companyData.lastFunding || "",
        productStage: companyData.productStage || "",
      });
    } else {
      setFormData(companyData || {});
    }
  }, [companyData, investor]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "siteUrl") {
      setFormData((prevData) => ({
        ...prevData,
        socialLinks: {
          ...prevData.socialLinks,
          website: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle File Input change
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setImagePreview(imageUrl);
  };

  // Handle Location select
  const handleLocationSelect = (e, location) => {
    if (location === LOCATIONS[0]) return;
    if (location === "Others") {
      setOthersClicked(true);
    }
    setFormData((prevData) => ({ ...prevData, location: location }));
  };

  // Handle Dropdown Blur
  const handleDropdownBlur = () => {
    setOthersClicked(false);
    setFormData((prevData) => ({
      ...prevData,
      location:
        (formData.location !== "Others" && formData.location) ||
        companyData.location,
    }));
  };

  // Handle Sector Select
  const handleSectorSelect = (e, sector) => {
    if (sector === SECTORS[0]) return;
    setFormData((prevData) => ({ ...prevData, sector: sector }));
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // set loading
    setLoading(true);

    let updatedFormData = { ...formData };

    try {
      if (selectedFile) {
        const logo = await getBase64(selectedFile);
        updatedFormData.logo = logo;
      }
      if (investor) {
        const response = await postInvestorData({
          ...updatedFormData,
          companyName: updatedFormData.company,
          founderId: companyData.founderId || loggedInUser._id,
        });
        const user = {
          ...loggedInUser,
          investor: response.data._id,
        };
        dispatch(loginSuccess(user));
        dispatch(setUserCompany(response.data));
        // Show success popup
        setLoading(false);
        handleShowPopup({ success: true });
      } else {
        const response = await postStartUpData({
          ...updatedFormData,
          founderId: companyData.founderId || loggedInUser._id,
        });
        dispatch(setUserCompany(response.data));
        // Show success popup
        setLoading(false);
        handleShowPopup({ success: true });
      }
    } catch (error) {
      console.log(error);
      // Show error popup
      setLoading(false);
      handleShowPopup({ error: true });
    }
  };

  return (
    <div className="profile__form">
      <form action="" className="" onSubmit={handleSubmit}>
        <div className="mx-auto">
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            className="visually-hidden"
            onChange={handleFileInputChange}
          />
          <label htmlFor="image" className={`upload__label ${theme} `}>
            {imagePreview || companyData?.logo ? (
              <img
                src={imagePreview || companyData?.logo}
                alt="Selected"
                className="preview-image"
                style={{
                  width: "70px",
                  height: "70px",
                  objectFit: "contain",
                  borderRadius: "100px",
                }}
              />
            ) : (
              <BsFillCameraFill
                style={{
                  fontSize: "1.5rem",
                  color: `${
                    theme === "investor" ? "black" : "rgba(253, 89, 1,1)"
                  }`,
                }}
              />
            )}
          </label>
          <p
            className="div__heading"
            style={{ color: "#fff", marginBottom: "0" }}
          >
            Company Logo
          </p>
        </div>
        <fieldset className={investor ? "investor" : "startup"}>
          <legend>Company Name</legend>
          <input
            type="text"
            name="company"
            id="company"
            className="profile_form_input"
            value={formData.company || ""}
            onChange={handleInputChange}
          />
        </fieldset>

        <fieldset className={investor ? "investor" : "startup"}>
          <legend>Company Tagline</legend>
          <input
            type="text"
            name="tagline"
            id="tagline"
            className="profile_form_input"
            value={formData.tagline || ""}
            onChange={handleInputChange}
          />
        </fieldset>

        {/* <fieldset className={investor ? "investor" : "startup"}>
          <legend>Industry</legend>
          <input
            type="text"
            name="industryType"
            id="industry"
            className="profile_form_input"
            value={formData.industryType || ""}
            onChange={handleInputChange}
          />
        </fieldset> */}

        <fieldset className={investor ? "investor" : "startup"}>
          <legend>Location</legend>
          {othersClicked && (
            <input
              type="text"
              name="location"
              id="location"
              className="profile_form_input"
              placeholder={formData.location + "..."}
              onChange={handleInputChange}
              onBlur={handleDropdownBlur}
              autoFocus
            />
          )}
          {!othersClicked && (
            <div className="dropdown">
              <button
                className="btn profile_form_input w-auto dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {formData.location}
              </button>
              <ul
                className={`dropdown-menu m-0 p-0 ${
                  investor ? "investor" : "startup"
                }`}
              >
                {LOCATIONS.map((location, index) => {
                  return (
                    <li key={`${location}${index}`} className="m-0 p-0">
                      <button
                        type="button"
                        className={`btn btn-base list-btn w-100 text-start ps-3 ${
                          investor ? "investor" : "startup"
                        } ${location === formData.location ? "selected" : ""}`}
                        onClick={(e) => handleLocationSelect(e, location)}
                      >
                        {location}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </fieldset>

        <fieldset className={investor ? "investor" : "startup"}>
          <legend>Established Date</legend>
          <input
            type="date"
            name="startedAtDate"
            id="startedAtDate"
            className="profile_form_input"
            value={formData.startedAtDate || ""}
            onChange={handleInputChange}
          />
        </fieldset>

        <fieldset className={investor ? "investor" : "startup"}>
          <legend>Sector</legend>
          <div className="dropdown">
            <button
              className="btn profile_form_input w-auto dropdown-toggle sector_text"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {formData.sector}
            </button>
            <ul
              className={`dropdown-menu m-0 p-0 ${
                investor ? "investor" : "startup"
              }`}
            >
              {SECTORS.map((sector, index) => {
                return (
                  <li key={`${sector}${index}`} className="m-0 p-0">
                    <button
                      type="button"
                      className={`btn btn-base list-btn text-start ps-3 text-break ${
                        investor ? "investor" : "startup"
                      } ${sector === formData.sector ? "selected" : ""}`}
                      onClick={(e) => handleSectorSelect(e, sector)}
                    >
                      <p className="m-0">{sector}</p>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </fieldset>

        <fieldset className={investor ? "investor" : "startup"}>
          <legend>No. of Employees</legend>
          <input
            type="number"
            name="noOfEmployees"
            id="noOfEmployees"
            max={2000}
            min={0}
            className="profile_form_input"
            value={formData.noOfEmployees || ""}
            onChange={handleInputChange}
          />
        </fieldset>

        <fieldset className={investor ? "investor" : "startup"}>
          <legend>Website URL</legend>
          <input
            type="url"
            name="siteUrl"
            id="siteUrl"
            className="profile_form_input"
            value={formData.socialLinks?.website || ""}
            onChange={handleInputChange}
          />
        </fieldset>

        <fieldset className={investor ? "investor" : "startup"}>
          <legend>Vision</legend>
          <input
            type="text"
            name="vision"
            id="vision"
            className="profile_form_input"
            value={formData.vision || ""}
            onChange={handleInputChange}
          />
        </fieldset>

        <fieldset className={investor ? "investor" : "startup"}>
          <legend>Mission</legend>
          <input
            type="text"
            name="mission"
            id="mission"
            className="profile_form_input"
            value={formData.mission || ""}
            onChange={handleInputChange}
          />
        </fieldset>

        <fieldset className={investor ? "investor" : "startup"}>
          <legend>Key Focus</legend>
          <input
            type="text"
            name="keyFocus"
            id="keyFocus"
            className="profile_form_input"
            value={formData.keyFocus || ""}
            onChange={handleInputChange}
            placeholder="Finance, AR, VR, AI"
          />
        </fieldset>

        {!investor && (
          <fieldset className={investor ? "investor" : "startup"}>
            <legend className="fw-bolder">TAM</legend>
            <input
              type="text"
              name="TAM"
              id="TAM"
              className="profile_form_input fw-bold"
              value={formData.TAM || ""}
              onChange={handleInputChange}
              placeholder="TAM"
            />
          </fieldset>
        )}

        {!investor && (
          <fieldset className={investor ? "investor" : "startup"}>
            <legend className="fw-bolder">SAM</legend>
            <input
              type="text"
              name="SAM"
              id="SAM"
              className="profile_form_input fw-bold"
              value={formData.SAM || ""}
              onChange={handleInputChange}
              placeholder="SAM"
            />
          </fieldset>
        )}

        {!investor && (
          <fieldset className={investor ? "investor" : "startup"}>
            <legend className="fw-bolder">SOM</legend>
            <input
              type="text"
              name="SOM"
              id="SOM"
              className="profile_form_input fw-bold"
              value={formData.SOM || ""}
              onChange={handleInputChange}
              placeholder="SOM"
            />
          </fieldset>
        )}
        {!investor && (
          <fieldset className={investor ? "investor" : "startup"}>
            <legend className="fw-bolder">Last funding</legend>
            <input
              type="date"
              name="lastFunding"
              id="lastFunding"
              className="profile_form_input fw-bold"
              value={formData.lastFunding || ""}
              onChange={handleInputChange}
              placeholder="Last funding"
            />
          </fieldset>
        )}
        {!investor && (
          <fieldset className={investor ? "investor" : "startup"}>
            <legend>Investment stage</legend>
            <div className="dropdown">
              <button
                className="btn profile_form_input w-auto dropdown-toggle sector_text"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {formData.stage || stageData[0]}
              </button>
              <ul
                className={`dropdown-menu m-0 p-0 ${
                  investor ? "investor" : "startup"
                }`}
              >
                {stageData.map((sector, index) => {
                  return (
                    <li key={`${sector}${index}`} className="m-0 p-0">
                      <button
                        type="button"
                        className={`btn btn-base list-btn text-start ps-3 text-break ${
                          investor ? "investor" : "startup"
                        } ${sector === formData.stage ? "selected" : ""}`}
                        onClick={(e) => {
                          if (sector === stageData[0]) return;
                          setFormData((prevData) => ({
                            ...prevData,
                            stage: sector,
                          }));
                        }}
                      >
                        <p className="m-0">{sector}</p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </fieldset>
        )}
        {!investor && (
          <fieldset className={investor ? "investor" : "startup"}>
            <legend>Product stage</legend>
            <div className="dropdown">
              <button
                className="btn profile_form_input w-auto dropdown-toggle sector_text"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {formData.productStage || productData[0]}
              </button>
              <ul
                className={`dropdown-menu m-0 p-0 ${
                  investor ? "investor" : "startup"
                }`}
              >
                {productData.map((sector, index) => {
                  return (
                    <li key={`${sector}${index}`} className="m-0 p-0">
                      <button
                        type="button"
                        className={`btn btn-base list-btn text-start ps-3 text-break ${
                          investor ? "investor" : "startup"
                        } ${sector === formData.productStage ? "selected" : ""}`}
                        onClick={(e) => {
                          if (sector === productData[0]) return;
                          setFormData((prevData) => ({
                            ...prevData,
                            productStage: sector,
                          }));
                        }}
                      >
                        <p className="m-0">{sector}</p>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </fieldset>
        )}
        <button
          type="submit"
          className={`align-self-end btn-base ${
            investor ? "investor" : "startup"
          }`}
        >
          {loading ? (
            <SpinnerBS
              colorClass={`${investor ? "text-dark" : "text-white"}`}
              spinnerSizeClass="spinner-border-sm"
            />
          ) : (
            "Save"
          )}
        </button>
      </form>
    </div>
  );
}
