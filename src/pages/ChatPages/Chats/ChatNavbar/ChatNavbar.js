import React, { useEffect, useState } from "react";
import "./ChatNavbar.scss";
import threeDotIcon from "../../../../Images/whiteTheeeDots.svg";
import {
  getUserByIdBody,
  blockUser,
  unblockUser,
  clearChat,
  getCommunityById,
  getUserAndStartUpByUserIdAPI
} from "../../../../Service/user";
import { useDispatch, useSelector } from "react-redux";
import SpinnerBS from "../../../../components/Shared/Spinner/SpinnerBS";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { resetChat, blockUserSuccess, unblockUserSuccess } from "../../../../Store/features/chat/chatSlice";
import { selectIsMobileView } from "../../../../Store/features/design/designSlice";
import { selectBlockedUsers } from "../../../../Store/features/chat/chatSlice";

const ChatNavbar = ({ isclear, cleared, setIsSettingsOpen }) => {
  // Fetch GlobalState
  const allChatsData = useSelector((state) => state.chat.allChatsData);
  const chatId = useSelector((state) => state.chat.chatId);
  const userId = useSelector((state) => state.chat.userId);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const isCommunitySelected = useSelector((state) => state.chat.isCommunitySelected);
  const isMobileView = useSelector(selectIsMobileView);
  const blockedUsers = useSelector(selectBlockedUsers);

  const [chatkebabMenu, setChatkebabMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isBlocked = blockedUsers.includes(userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getUserByIdBody(userId);
      } catch (error) {
        console.error("Error", error.response?.data || error.message);
      }
    };

    fetchData();
  }, [userId]);

  const handleClearChat = () => {
    clearChat(chatId, loggedInUser._id)
      .then((res) => {
        if (res.status === 200) {
          isclear(!cleared);
          window.location.reload(); // Force a full page reload
        }
      })
      .catch((error) => {
        console.error("Error-->", error);
      })
      .finally(() => setChatkebabMenu(false));
  };
  
  const handleBlockUser = () => {
    blockUser(loggedInUser._id, userId)
      .then(() => {
        dispatch(blockUserSuccess(userId));
      })
      .catch((error) => {
        console.error("Error blocking user:", error.response?.data || error.message);
      })
      .finally(() => setChatkebabMenu(false));
  };

  const handleUnblockUser = () => {
    unblockUser(loggedInUser._id, userId)
      .then(() => {
        dispatch(unblockUserSuccess(userId));
      })
      .catch((error) => {
        console.error("Error unblocking user:", error.response?.data || error.message);
      })
      .finally(() => setChatkebabMenu(false));
  };

  const [user, setUser] = useState(null);
  const [community, setCommunity] = useState(null);

  useEffect(() => {
    setCommunity(null);
    setUser(null);
    if (isCommunitySelected) {
      setLoading(true);
      getCommunityById(chatId)
        .then((res) => {
          setCommunity(res.data);
          setUser(null);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error-->", error);
          setLoading(false);
        });
    } else {
      setLoading(true);
      getUserAndStartUpByUserIdAPI(userId)
        .then((res) => {
          setUser(res.data);
          setCommunity(null);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error-->", error);
          setLoading(false);
        });
    }
  }, [userId, isCommunitySelected, chatId]);

  function handleOpenSettingsClick() {
    setIsSettingsOpen(true);
  }

  function handleChatBack() {
    if (!chatId) {
      navigate(-1);
    } else {
      dispatch(resetChat());
    }
  }

  return (
    <div className="chat_navbar_container position-relative">
      {loading ? (
        <SpinnerBS
          colorClass={"text-light"}
          spinnerClass="spinner-grow"
          spinnerSizeClass="spinner-grow-sm"
          className="d-flex h-100 w-100 justify-content-center align-items-center"
        />
      ) : (
        <>
          <div className="left">
            {isMobileView && (
              <button
                className="btn border-0 p-0 d-flex align-items-center justify-content-center me-2"
                onClick={handleChatBack}
              >
                <IoMdArrowRoundBack size={30} />
              </button>
            )}

            <div
              onClick={handleOpenSettingsClick}
              style={{ cursor: "pointer" }}
            >
              {user?.profilePicture || community?.profileImage ? (
                <img
                  src={user?.profilePicture || community?.profileImage}
                  className="rounded_img object-fit-cover"
                  alt={`${user?.firstName} ${user?.lastName}`}
                />
              ) : (
                <HiOutlineUserGroup
                  style={{
                    height: "60px",
                    width: "60px",
                    color: "rgba(159, 159, 159, 1)",
                  }}
                />
              )}
            </div>
            <div
              className="title_and_message"
              onClick={handleOpenSettingsClick}
              style={{ cursor: "pointer" }}
            >
              <h5 className="name_title text-capitalize m-0 lh-1">
                {user
                  ? `${user.firstName} ${user.lastName}`
                  : community?.communityName}
              </h5>

              <h5 className="message_title m-0">{user?.designation}</h5>
            </div>
          </div>
          <div className="right" style={{ cursor: "pointer" }}>
            <img
              src={threeDotIcon}
              className="threedot me-2"
              onClick={() => setChatkebabMenu(!chatkebabMenu)}
              alt=""
            />
            {chatkebabMenu && (
              <ul className="kebab_menu border rounded shadow-sm p-3">
                <li onClick={handleClearChat}>Clear Chat</li>
                {!isBlocked && <li onClick={handleBlockUser}>Block User</li>}
                {isBlocked && <li onClick={handleUnblockUser}>Unblock User</li>}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatNavbar;
