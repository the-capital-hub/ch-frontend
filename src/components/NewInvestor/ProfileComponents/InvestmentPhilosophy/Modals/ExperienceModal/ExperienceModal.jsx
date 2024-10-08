import React, { useRef, useState } from "react";
import "./ExperienceModal.scss";
import {
  ModalBSBody,
  ModalBSContainer,
  ModalBSHeader,
} from "../../../../../PopUp/ModalBS";
import IconCloudUpload from "../../../../../Investor/SvgIcons/IconCloudUpload";
import { getBase64 } from "../../../../../../utils/getBase64";
import SpinnerBS from "../../../../../Shared/Spinner/SpinnerBS";
import { useDispatch, useSelector } from "react-redux";
import {
  addRecentExperience,
  updateRecentExperience,
} from "../../../../../../Service/user";
import {
  loginSuccess,
  updateLoggedInUser,
} from "../../../../../../Store/features/user/userSlice";
import CurrentExperience from "./CurrentExperience";

const initialForm = {
  logo: "",
  companyName: "",
  location: "",
  experienceDuration: "",
  role: "",
};

export default function ExperienceModal() {
  // Fetch experience from global state
  const { recentExperience, _id: userId } = useSelector(
    (state) => state.user.loggedInUser
  );
  const dispatch = useDispatch();

  // States for inputs
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(false);

  //   State for loading
  const [loading, setLoading] = useState(false);

  //   Ref for close button
  const closeRef = useRef(null);

  // Handle file change
  async function handleFileChange(e) {
    let newFile = e.target.files[0];
    // console.log(newFile);
    if (!newFile) {
      return;
    }

    let previewImage = URL.createObjectURL(newFile);
    try {
      let baseImage = await getBase64(newFile);

      // Set State
      setFormData((prev) => ({ ...prev, logo: baseImage }));
    } catch (error) {
      console.log("Error getting base64:", error);
    }

    // Set State
    setPreview(previewImage);
  }

  // Handle Input change
  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  //   Handle Edit click
  function handleEditClick(e, data) {
    setFormData(data);
    setPreview(data.logo);
    setIsEditing(true);
  }

  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();

    // Set loading
    setLoading(true);

    if (isEditing) {
      const { _id: experienceId, ...updatedData } = formData;
      // console.log("edit", experienceId, updatedData);

      try {
        const { data } = await updateRecentExperience(
          experienceId,
          updatedData
        );
        // console.log("update response", data);
        dispatch(updateLoggedInUser({ recentExperience: data }));
      } catch (error) {
        console.error("Error saving Experience:", error);
      } finally {
        clearStates();
      }
    } else {
      try {
        // console.log("add exp", formData);

        const { data } = await addRecentExperience(userId, formData);
        // console.log("Add response", data);
        dispatch(loginSuccess(data));
      } catch (error) {
        console.error("Error saving Experience:", error);
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
    setPreview(null);
    setIsEditing(false);
  }

  return (
    <div className="experience_modal_wrapper">
      <ModalBSContainer id={"experienceModal"} isStatic={false} modalXl>
        <ModalBSHeader
          title={"Add/Edit Experience"}
          closeCallback={clearStates}
          closeRef={closeRef}
        />
        <ModalBSBody>
          <div className="experience_modal_body d-flex flex-column flex-lg-row justify-content-between gap-3 ">
            {/* Current Experience */}
            <div className="current_experience rounded-4 border p-2 p-lg-3 oveflow-y-auto d-flex flex-column gap-3">
              <h5 className="green_underline">Current Experience</h5>
              {/* loop current experiences here */}
              {recentExperience?.map((data, index) => {
                return (
                  <CurrentExperience
                    data={data}
                    key={data._id}
                    loading={loading}
                    handleEditClick={handleEditClick}
                    clearStates={clearStates}
                  />
                );
              })}
            </div>

            {/* Experience form */}
            <form
              className="experience_form d-flex flex-column gap-3 rounded-4 border p-2  p-lg-3"
              onSubmit={handleSubmit}
            >
              <h5 className="green_underline">Update Experience</h5>

              <fieldset className="" style={{ cursor: "pointer" }}>
                <label htmlFor="logo" className="upload__label">
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
                  id="logo"
                  accept="image/*"
                  className="visually-hidden"
                  onChange={handleFileChange}
                />
              </fieldset>

              {/* Company Name */}
              <fieldset>
                <legend className="ps-1">Company Name</legend>
                <input
                  type="text"
                  name="companyName"
                  id="companyName"
                  className="p-2 w-100 rounded-3 modal__input"
                  value={formData.companyName}
                  onChange={handleInputChange}
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
                />
              </fieldset>

              {/* Experience */}
              <fieldset>
                <legend className="ps-1">Experience</legend>
                <input
                  type="text"
                  name="experienceDuration"
                  id="experienceDuration"
                  className="p-2 w-100 rounded-3 modal__input"
                  value={formData.experienceDuration}
                  onChange={handleInputChange}
                />
              </fieldset>

              {/* Role */}
              <fieldset>
                <legend className="ps-1">Role</legend>
                <input
                  type="text"
                  name="role"
                  id="role"
                  className="p-2 w-100 rounded-3 modal__input"
                  value={formData.role}
                  onChange={handleInputChange}
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
