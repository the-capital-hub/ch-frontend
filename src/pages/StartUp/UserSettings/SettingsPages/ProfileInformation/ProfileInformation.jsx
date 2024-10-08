import React, { useState } from "react";
import "./ProfileInformation.scss";
import IconCloudUpload from "../../../../../components/Investor/SvgIcons/IconCloudUpload";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { educationOptions } from "../../../../../constants/Startups/ExplorePage";
import { useSelector } from "react-redux";
import {
  selectCompanyName,
  selectUserBio,
} from "../../../../../Store/features/user/userSlice";

const EXPERIENCE_OPTIONS = [
  "0",
  "1 year",
  "2 years",
  "3 years",
  "4 years",
  "5 years",
  "6 years",
  "7 years",
  "8 years",
  "9 years",
  "10 years",
  "11 years",
  "12 years",
  "13 years",
  "14 years",
  "15 years",
  "16 years",
  "17 years",
  "18 years",
  "19 years",
  "20 years",
];

function ProfileInformation() {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const companyName = useSelector(selectCompanyName);
  const userBio = useSelector(selectUserBio);

  const [selectedFile, setSelectedFile] = useState(null);
  const [professionalData, setProfessionalData] = useState({
    designation: loggedInUser?.designation || "",
    education: loggedInUser?.education || "",
    experience: loggedInUser?.experience || "",
    profilePicture: loggedInUser.profilePicture || "",
    fullName: loggedInUser?.firstName + " " + loggedInUser?.lastName || "",
    company: companyName,
    location: loggedInUser?.location || "Bangalore, India",
  });
  const [bioContent, setBioContent] = useState(userBio || "");

  const navigate = useNavigate();

  // Handle Text Change
  function handleTextChange(e) {
    let { name, value } = e.target;
    setProfessionalData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  // Handle File change
  function handleFileChange(e) {
    const file = e.target.files[0];
    setSelectedFile(file);
  }

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <section className="personal_information_section flex-grow-1 ">
      <div className="d-flex flex-row gap-2 align-items-center border-bottom p-3">
        <button className="back_btn " onClick={() => navigate(-1)}>
          <FaArrowLeft size={25} />
        </button>
        <h2>Personal Information</h2>
      </div>
      <form className="py-4 px-3" onSubmit={handleSubmit}>
        {/* profilePicture*/}
        <fieldset>
          <legend className="px-2">Profile Picture</legend>
          <input
            type="file"
            accept="image/*"
            className="visually-hidden"
            name="profilePicture"
            id="profilePicture"
            onChange={handleFileChange}
          />
          <div className="professional_form_input d-flex align-items-center gap-4">
            <label htmlFor="profilePicture" style={{ cursor: "pointer" }}>
              <IconCloudUpload
                color={"#fd5901"}
                height="1.75rem"
                width="1.75rem"
              />
            </label>
            {/* <p className="m-0 fs-6 fw-light">{profilePicture?.name}</p> */}
          </div>
        </fieldset>

        {/* full name */}
        <fieldset>
          <legend className="px-2">Full name</legend>
          <input
            type="text"
            className="professional_form_input"
            name="Firstname"
            value={professionalData.fullName}
            onChange={handleTextChange}
          />
        </fieldset>

        {/* last Name */}
        {/* <fieldset>
          <legend className="px-2">Last name</legend>
          <input
            type="text"
            className="professional_form_input"
            name="Lastname"
            // value={lastName}
            // onChange={(e) => setLastName(e.target.value)}
          />
        </fieldset> */}

        {/* bio */}
        <fieldset>
          <legend className="px-2">Bio</legend>
          <textarea
            type="text"
            className="professional_form_input"
            name="bio"
            rows={5}
            value={bioContent}
            onChange={(e) => setBioContent(e.target.value)}
          />
        </fieldset>

        {/* Company */}
        <fieldset>
          <legend className="px-2">Company</legend>
          <input
            type="text"
            className="professional_form_input"
            name="company"
            value={professionalData.company}
            onChange={handleTextChange}
          />
        </fieldset>

        {/* Designation */}
        <fieldset>
          <legend className="px-2">Designation</legend>
          <input
            type="text"
            className="professional_form_input"
            name="designation"
            value={professionalData.designation}
            onChange={handleTextChange}
          />
        </fieldset>

        {/* Education */}

        <fieldset>
          <legend className="px-2">Education</legend>

          <select
            name="education"
            id="userEducation"
            onChange={handleTextChange}
            value={professionalData.education}
            className="professional_form_input"
          >
            <option value="" hidden={Boolean(professionalData.education)}>
              Education
            </option>
            {educationOptions.map((option, index) => {
              return (
                <option value={option} key={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </fieldset>

        {/* Experience */}

        <fieldset>
          <legend className="px-2">Experience</legend>

          <select
            name="experience"
            id="userExperience"
            onChange={handleTextChange}
            value={professionalData.experience}
            className="professional_form_input"
          >
            <option value="" hidden={Boolean(professionalData.experience)}>
              Experience
            </option>
            {EXPERIENCE_OPTIONS.map((option, index) => {
              return (
                <option value={option} key={option}>
                  {option}
                </option>
              );
            })}
          </select>
        </fieldset>

        {/* Button */}
        <div className="d-flex flex-row gap-2 ms-auto">
          <button type="submit" className="btn py-auto">
            Submit
          </button>
          <button type="cancle" className="btn py-auto">
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProfileInformation;
