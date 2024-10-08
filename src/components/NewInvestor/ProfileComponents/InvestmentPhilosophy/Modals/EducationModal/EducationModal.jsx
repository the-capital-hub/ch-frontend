import React, { useRef, useState } from "react";
import "./EducationModal.scss";
import {
  ModalBSBody,
  ModalBSContainer,
  ModalBSHeader,
} from "../../../../../PopUp/ModalBS";
// import IconCloudUpload from "../../../../../Investor/SvgIcons/IconCloudUpload";
import { useDispatch, useSelector } from "react-redux";
// import { getBase64 } from "../../../../../../utils/getBase64";
import {
  addRecentEducation,
  updateRecentEducation,
} from "../../../../../../Service/user";
import {
  loginSuccess,
  updateLoggedInUser,
} from "../../../../../../Store/features/user/userSlice";
import SpinnerBS from "../../../../../Shared/Spinner/SpinnerBS";
import CurrentEducation from "./CurrentEducation";

const initialForm = {
  logo: "",
  schoolName: "",
  location: "",
  passoutYear: "",
  course: "",
};

export default function EducationModal() {
  // Fetch education from global state
  const { recentEducation, _id: userId } = useSelector(
    (state) => state.user.loggedInUser
  );
  const dispatch = useDispatch();

  // States for inputs
  // const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  //   State for loading
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //   Ref for close button
  const closeRef = useRef(null);

  // Handle file change
  // async function handleFileChange(e) {
  //   let newFile = e.target.files[0];
  //   // console.log(newFile);
  //   if (!newFile) {
  //     return;
  //   }

  //   // let previewImage = URL.createObjectURL(newFile);
  //   try {
  //     let baseImage = await getBase64(newFile);

  //     // Set State
  //     setFormData((prev) => ({ ...prev, logo: baseImage }));
  //     // setPreview(previewImage);
  //   } catch (error) {
  //     console.log("Error getting base64:", error);
  //   }
  // }

  // Handle Input change
  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "passoutYear") {
      // Test for numeric values
      if (!/[0-9]{4}/.test(value)) {
        setError("Please enter Valid Graduation Year");
        return;
      } else {
        setError(null);
      }
    }
  }

  //   Handle Edit click
  function handleEditClick(e, data) {
    setFormData(data);
    // setPreview(data.logo);
    setIsEditing(true);
  }

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (error) {
      return;
    }

    // Set loading
    setLoading(true);

    if (isEditing) {
      const { _id: educationId, ...updatedData } = formData;
      // console.log("edit", educationId, updatedData);

      try {
        const { data } = await updateRecentEducation(educationId, updatedData);
        // console.log("update response", data);
        dispatch(updateLoggedInUser({ recentEducation: data }));
      } catch (error) {
        console.error("Error saving Education:", error);
      } finally {
        clearStates();
      }
    } else {
      try {
        // console.log("add edu", formData);

        const { data } = await addRecentEducation(userId, formData);
        // console.log("Add response", data);
        dispatch(loginSuccess(data));
      } catch (error) {
        console.error("Error saving Education:", error);
      } finally {
        clearStates();
      }
    }
  }

  //   Clear States
  function clearStates() {
    setFormData(initialForm);
    setIsEditing(false);
    setLoading(false);
    // setPreview(null);
    setIsEditing(false);
    setError(null);
  }

  return (
    <div className="education_modal_wrapper">
      <ModalBSContainer id={"educationModal"} isStatic={false} modalXl>
        <ModalBSHeader
          title={"Add/Edit Education"}
          closeCallback={clearStates}
          closeRef={closeRef}
        />
        <ModalBSBody>
          <div className="education_modal_body d-flex flex-column flex-lg-row justify-content-between gap-3 ">
            {/* Current education */}
            <div className="current_education rounded-4 border p-2  p-lg-3 oveflow-y-auto d-flex flex-column gap-3">
              <h5 className="green_underline">Current Education</h5>
              {/* loop current education here */}
              {recentEducation?.map((data, index) => {
                return (
                  <CurrentEducation
                    data={data}
                    key={data._id}
                    loading={loading}
                    handleEditClick={handleEditClick}
                    clearStates={clearStates}
                  />
                );
              })}
            </div>

            {/* Education form */}
            <form
              className="education_form d-flex flex-column gap-3 rounded-4 border p-2 p-lg-3"
              onSubmit={handleSubmit}
            >
              <h5 className="green_underline">Update Education</h5>

              {/* <fieldset>
                <label htmlFor="edulogo" className="upload__label">
                  {preview ? (
                    <img
                      src={preview}
                      alt={"logo"}
                      height={75}
                      width={75}
                      className="rounded-circle"
                    />
                  ) : (
                    <IconCloudUpload height="2.5rem" width="2.5rem" />
                  )}
                </label>
                <input
                  type="file"
                  name="logo"
                  id="edulogo"
                  className="visually-hidden"
                  onInput={handleFileChange}
                  required
                />
              </fieldset> */}

              {/* School Name */}
              <fieldset>
                <legend className="ps-1">Institution</legend>
                <input
                  type="text"
                  name="schoolName"
                  id="schoolName"
                  className="p-2 w-100 rounded-3 modal__input"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  required
                />
              </fieldset>

              {/* Location */}
              <fieldset>
                <legend className="ps-1">Location</legend>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="p-2 w-100 rounded-3 modal__input"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </fieldset>

              {/* Passed out */}
              <fieldset>
                <legend className="ps-1">Graduation Year</legend>
                <input
                  type="text"
                  minLength={4}
                  maxLength={4}
                  name="passoutYear"
                  id="passoutYear"
                  className={`p-2 w-100 rounded-3 modal__input `}
                  value={formData.passoutYear}
                  onChange={handleInputChange}
                  required
                />
                <em className="small text-danger error_alert">{error}</em>
              </fieldset>

              {/* Course */}
              <fieldset>
                <legend className="ps-1">Specialization</legend>
                <input
                  type="text"
                  name="course"
                  id="course"
                  className="p-2 w-100 rounded-3 modal__input"
                  value={formData.course}
                  onChange={handleInputChange}
                  required
                />
              </fieldset>

              <div className="d-flex gap-3 align-items-center">
                <button
                  type="button"
                  className="btn btn-investor"
                  onClick={() => clearStates()}
                  disabled={loading}
                >
                  Clear
                </button>
                <button
                  type="submit"
                  className="btn btn-investor"
                  disabled={loading}
                >
                  {loading ? (
                    <SpinnerBS spinnerSizeClass="spinner-border-sm" />
                  ) : (
                    <>{isEditing ? "Update" : "Save"}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </ModalBSBody>
      </ModalBSContainer>
    </div>
  );
}
