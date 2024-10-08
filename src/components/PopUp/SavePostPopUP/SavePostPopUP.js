import React, { useState, useEffect } from 'react';
import "./SavePostPopUP.scss";
import { getSavedPostCollections, savePostByUserIdAPI, updateUserById, addNotificationAPI } from "../../../Service/user";
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../../Store/features/user/userSlice';
// import AchievementToast from '../../Toasts/AchievementToast/AchievementToast';
// import { achievementTypes } from '../../Toasts/AchievementToast/types';
import toast from 'react-hot-toast';
import { selectTheme } from "../../../Store/features/design/designSlice";


function SavePostPopUP({ postId, onClose, savedPostStatus, isInvestor = false }) {
  const theme = useSelector(selectTheme);
  const [selectedOption, setSelectedOption] = useState("");
  const [collectionOptions, setCollectionOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [postSaveError, setPostSaveError] = useState(false);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();

  const buttonColor = isInvestor ? "#d3f36b" : "#fd5901";
  const buttonText = isInvestor ? "#000" : "#fff";

  useEffect(() => {
    getSavedPostCollections(loggedInUser._id)
      .then((res) => {
        setCollectionOptions(res);
      });
  }, [loggedInUser._id]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSavePost = async () => {
    try {
      const data = await savePostByUserIdAPI(loggedInUser._id, selectedOption !== 'Other' ? selectedOption : inputValue, postId);
      if (data?.message) {
        onClose();
        savedPostStatus();
      }

      //saved post achievement
      if (!loggedInUser.achievements.includes("658bb9748a18edb75e6f4241")) {
        const achievements = [...loggedInUser.achievements];
        achievements.push("658bb9748a18edb75e6f4241");
        const updatedData = { achievements };
        updateUserById(loggedInUser._id, updatedData)
          .then(({ data }) => {
            dispatch(loginSuccess(data.data));
            const notificationBody = {
              recipient: loggedInUser._id,
              type: "achievementCompleted",
              achievementId: "658bb9748a18edb75e6f4241",
            };
            addNotificationAPI(notificationBody)
              .then(() => console.log("Added"))
              .catch((error) => console.error(error.message));

            // toast.custom((t) => (
            //   <AchievementToast type={achievementTypes.seeYouLaterAlligator} />
            // ));
          })
          .catch((error) => {
            console.error("Error updating user:", error);
          });
      }
    } catch (err) {
      console.log(err?.response?.data?.message);
      setPostSaveError(true);
    }
  };

  return (
    <div className="save_post_popup">
      <div className="popup">
        <div className="popup-content">
          <div className='selection_input d-flex flex-column align-items-center gap-3'>
            <h4>
              Select the collection in which to save the post.
            </h4>
            <select className='collection_selecter' value={selectedOption} onChange={handleOptionChange}>
              <option value="">Select a collection</option>
              {collectionOptions?.data?.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                  <hr />
                </option>
              ))}
              <option value="Other">{collectionOptions.length === 0 ? "Other" : "Create New"}</option>
            </select>
            {selectedOption === "Other" && (
              <input
                className='w-100'
                type="text"
                placeholder="Create new collection"
                onChange={handleInputChange}
              />
            )}
            <button onClick={handleSavePost} style={{ background: buttonColor, color: buttonText }} className="ok_button py-2 px-5">
              Save
            </button>
            {postSaveError && <h6>Post is already in the collection</h6>}
          </div>
          <button className="close-button" style={{ color: theme === "dark" ? "#000" : "#fff" }} onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </div>
  );
}

export default SavePostPopUP;
