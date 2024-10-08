import React, { useState, useEffect } from "react";
import "./EditChatSettings.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCommunity,
  getUnAddedMembers,
  addMembersToCommunity,
  getCommunitySettings,
} from "../../../../../Service/user";
import { setCommunityProfile } from "../../../../../Store/features/chat/chatSlice";

export default function EditChatSettings({ theme = "startup" }) {
  const [addedMembers, setAddedMembers] = useState([]);
  const [memberIds, setMemberIds] = useState([]);

  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const communityProfile = useSelector((state) => state.chat.communityProfile);
  const chatId = useSelector((state) => state.chat.chatId);
  const [aboutText, setAboutText] = useState("");
  const dispatch = useDispatch();
  const handleTextAreaChange = (e) => {
    setAboutText(e.target.value);
  };

  const handleSave = () => {
    const updatedData = {
      about: aboutText,
    };
    updateCommunity(communityProfile?.community._id, updatedData)
      .then(({ data }) => {
        const updatedCommunityProfile = {
          ...communityProfile,
          community: {
            ...communityProfile.community,
            ...updatedData,
          },
        };
        dispatch(setCommunityProfile(updatedCommunityProfile));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [unAddedMembers, setUnAddedMembers] = useState([]);

  useEffect(() => {
    getUnAddedMembers(chatId, loggedInUser._id)
      .then(({ data }) => {
        setUnAddedMembers(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [chatId, loggedInUser._id]);

  const handleButtonClick = (event, memberId) => {
    event.preventDefault();
    if (memberIds.includes(memberId)) {
      const updatedMemberIds = memberIds.filter((id) => id !== memberId);
      setMemberIds(updatedMemberIds);
      const updatedAddedMembers = addedMembers.filter(
        (member) => member._id !== memberId
      );
      setAddedMembers(updatedAddedMembers);
    } else {
      setMemberIds([...memberIds, memberId]);
      const addedMember = unAddedMembers.find(
        (member) => member._id === memberId
      );
      setAddedMembers([...addedMembers, addedMember]);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await addMembersToCommunity(chatId, memberIds);
      if (response.status === 200) {
        getCommunitySettings(chatId)
          .then(({ data }) => {
            dispatch(setCommunityProfile(data));
            console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="edit_settings_container d-flex flex-column gap-3">
      <fieldset className="edit_about rounded-4">
        <legend className="px-2 py-1 rounded-pill">About</legend>
        <textarea
          name="about"
          id="about"
          rows="5"
          className="edit_chat_input"
          value={aboutText}
          onChange={handleTextAreaChange}
        />
      </fieldset>
      <button
        type="button"
        data-bs-dismiss="offcanvas"
        className={`btn-base ${theme}`}
        onClick={handleSave}
      >
        Save
      </button>
      <hr />
      Add New members:
      {/* Display added members */}
      {addedMembers.length > 0 && (
        <div className="added-members">
          <div className="added-members-list">
            <strong>Added Members:</strong>
            <ul>
              {addedMembers.map((member) => (
                <li key={member._id}>
                  {member.firstName} {member.lastName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {/* members */}
      <div className="top__contacts p-2 d-flex flex-column gap-2 ">
        {unAddedMembers?.map((member, index) => {
          const isAdded = addedMembers.some(
            (addedMember) => addedMember._id === member._id
          );
          return (
            <div
              className="single-member p-2 d-flex justify-content-between align-items-center rounded-4"
              key={member?._id}
            >
              <img
                src={member?.profilePicture}
                alt="contact"
                className="img-fluid"
              />

              <h6 className="m-0">
                {" "}
                {`${member?.firstName ? member?.firstName : "name"} ${
                  member?.lastName ? member?.lastName : ""
                }`}
              </h6>
              {/* <button
                className="orange_button"
                onClick={() => handleButtonClick(contact?._id)}
              > */}
              <button
                className={`orange_button ${
                  isAdded ? "added-button" : ""
                } ${theme} `}
                onClick={(event) => handleButtonClick(event, member._id)}
              >
                {isAdded ? "Added" : "Add"}
              </button>
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-center align-items-center gap-2">
        <button className="cancel_button " data-bs-dismiss="offcanvas">
          Cancel
        </button>
        <button
          type="submit"
          className={`orange_button ${theme}`}
          data-bs-dismiss="offcanvas"
          onClick={(event) => handleSubmit(event)}
        >
          Done
        </button>
      </div>
    </div>
  );
}
