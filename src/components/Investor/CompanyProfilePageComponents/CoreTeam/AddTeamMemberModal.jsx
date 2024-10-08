import React, { useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import {
  postStartUpData,
  uploadLogo,
  postInvestorData,
} from "../../../../Service/user";
import { getBase64 } from "../../../../utils/getBase64";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import SpinnerBS from "../../../Shared/Spinner/SpinnerBS";
import { setUserCompany } from "../../../../Store/features/user/userSlice";

export default function AddTeamMemberModal({
  companyData,
  setCompanyData,
  theme,
}) {
  const initialMemberState = {
    name: "",
    designation: "",
    image: "",
    index: null,
  };
  // State for member
  const [member, setMember] = useState(initialMemberState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // handleChange
  function handleInputChange(e) {
    const { name, value } = e.target;
    setMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // handleFileChange
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const imageUrl = URL.createObjectURL(file);
        setSelectedFile(file);
        setImagePreview(imageUrl);
      } catch (error) {
        console.error("Error creating object URL:", error);
      }
    }
  };

  // handle AddTeamMember
  const handleAddTeamMember = async (e) => {
    setLoading(true);
    e.preventDefault();
    let index = member.index;
    let profileImage = member.image;

    if (selectedFile) {
      try {
        const logo = await getBase64(selectedFile);
        const { url } = await uploadLogo({ logo });
        profileImage = url;
      } catch (error) {
        console.log("Error:", error);
        setLoading(false);
        return;
      }
    }

    const updatedTeamMember = {
      name: member.name,
      designation: member.designation,
      image: profileImage,
    };

    try {
      if (isEditing) {
        let editedTeam = [...companyData.team];
        editedTeam[index] = updatedTeamMember;

        setCompanyData((previousData) => ({
          ...previousData,
          team: editedTeam,
        }));

        const response = loggedInUser.isInvestor === "true"
          ? await postInvestorData({
              founderId: companyData.founderId,
              team: editedTeam,
            })
          : await postStartUpData({
              founderId: companyData.founderId,
              team: editedTeam,
            });
        dispatch(setUserCompany(response.data));
      } else {
        const newTeam = [...companyData.team, updatedTeamMember];

        setCompanyData((previousData) => ({
          ...previousData,
          team: newTeam,
        }));

        const response = loggedInUser.isInvestor === "true"
          ? await postInvestorData({
              founderId: companyData.founderId,
              team: newTeam,
            })
          : await postStartUpData({
              founderId: companyData.founderId,
              team: newTeam,
            });
        dispatch(setUserCompany(response.data));
      }

      setMember(initialMemberState);
      setSelectedFile(null);
      setIsEditing(false);
      setImagePreview(null);
    } catch (error) {
      console.error("Error adding team member:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle select click
  function handleSelectClick(e, member, index) {
    setIsEditing(true);
    setMember({ ...member, index });
    setImagePreview(member.image);
  }

  // Handle Delete click
  async function handleDeleteClick(e, member, index) {
    let response = window.confirm(
      `Are you sure you want to remove "${member.name}" from your Team?`
    );
    if (response) {
      const newTeam = [...companyData.team];
      newTeam.splice(index, 1);

      try {
        setCompanyData((previousData) => ({
          ...previousData,
          team: newTeam,
        }));

        const postResponse = loggedInUser.isInvestor === "true"
          ? await postInvestorData({
              founderId: companyData.founderId,
              team: newTeam,
            })
          : await postStartUpData({
              founderId: companyData.founderId,
              team: newTeam,
            });
        dispatch(setUserCompany(postResponse.data));

        setMember(initialMemberState);
        setSelectedFile(null);
        setIsEditing(false);
        setImagePreview(null);
      } catch (error) {
        console.error("Error deleting team member:", error);
      }
    }
  }

  // Handle Clear
  function handleClear() {
    setMember(initialMemberState);
    setIsEditing(false);
    setSelectedFile(null);
    setImagePreview(null);
  }

  return (
    <div className="team_member_modal d-flex flex-column flex-lg-row gap-4 justify-content-around py-3">
      {/* Edit/Remove modal */}

      {companyData?.team?.length > 0 && (
        <div className="edit_remove_team d-flex flex-column gap-3 overflow-y-auto py-3">
          <h5 className="m-0 text-center">Select member to edit</h5>
          <div className="d-flex flex-column gap-3">
            {companyData?.team?.map((member, index) => (
              <div
                className="team_member_reomve d-flex align-items-center justify-content-around p-2 rounded-4"
                key={`${member.name}${index}`}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                  className="rounded-circle"
                />
                <h6 className="m-0 flex-grow-1 text-center">{member.name}</h6>
                <div className="d-flex gap-2">
                  <button
                    className={`modal_edit_btn ${theme}`}
                    onClick={(e) => handleSelectClick(e, member, index)}
                  >
                    <FaRegEdit size={10} style={{ fill: "black" }} />
                  </button>
                  <button
                    className={`modal_delete_btn ${theme}`}
                    onClick={(e) => handleDeleteClick(e, member, index)}
                  >
                    <MdDelete size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add modal */}
      <div className="add_team d-flex flex-column gap-3 rounded-4 shadow-sm py-3">
        <h5 className="m-0 text-center">Add new Member</h5>

        <form
          onSubmit={handleAddTeamMember}
          className="d-flex flex-column gap-4 p-4"
        >
          {/* Profile picture input */}
          <div className="mx-auto">
            <input
              type="file"
              name="image"
              id="teamMemberImage"
              accept="image/*"
              className="visually-hidden"
              onChange={handleFileChange}
            />
            <label htmlFor="teamMemberImage" className={`upload__label ${theme}`}>
              {imagePreview ? (
                <img
                  src={imagePreview}
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
                    color: theme === "investor" ? "black" : "rgba(253, 89, 1,1)",
                  }}
                />
              )}
            </label>
          </div>
          <div className="">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Name"
              value={member.name}
              className={`modal__input p-2 rounded-2 w-100 ${theme}`}
              onChange={handleInputChange}
              style={{ color: "black" }}
              required
            />
          </div>
          <div className="">
            <input
              type="text"
              name="designation"
              id="designation"
              placeholder="Enter Designation"
              value={member.designation}
              className={`modal__input p-2 rounded-2 w-100 ${theme}`}
              onChange={handleInputChange}
              style={{ color: "black" }}
              required
            />
          </div>
          <button
            disabled={!member.designation || !member.name}
            className={`orange_button ${theme}`}
            type="submit"
          >
            {loading ? (
              <SpinnerBS
                colorClass={theme === "investor" ? "text-dark" : "text-light"}
                spinnerSizeClass="spinner-border-sm"
              />
            ) : isEditing ? "Update" : "Add"}
          </button>
          <button
            type="button"
            className={`orange_button ${theme}`}
            onClick={handleClear}
          >
            Clear
          </button>
        </form>
      </div>
    </div>
  );
}
