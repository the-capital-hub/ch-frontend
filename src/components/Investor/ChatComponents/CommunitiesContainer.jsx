import "./CommunitiesContainer.scss";
import CommunityCard from "./CommunityCard";
import { useRef, useState } from "react";
import CommunitiesIcon from "./CommunitiesIcon";
import ModalBsLauncher from "../../PopUp/ModalBS/ModalBsLauncher/ModalBsLauncher";
// import ModalBSBody from "../../PopUp/ModalBS/ModalBSBody/ModalBSBody";
// import ModalBSContainer from "../../PopUp/ModalBS/ModalBSContainer/ModalBSContainer";
// import ModalBSHeader from "../../PopUp/ModalBS/ModalBSHeader/ModalBSHeader";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
// import NewCommunityModal from "../ChatComponents/NewCommunityModal";
import { getAllCommunity } from "../../../Service/user";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectLoggedInUserId } from "../../../Store/features/user/userSlice";
import {
  // selectAllChatsStatus,
  selectCommunities,
} from "../../../Store/features/chat/chatSlice";

export default function CommunitiesContainer({
  isCommunityOpen,
  recieveMessage,
  sendMessage,
  isRead,
  setIsRead,
}) {
  const loggedInUserId = useSelector(selectLoggedInUserId);
  // const allChatsStatus = useSelector(selectAllChatsStatus);
  const communities = useSelector(selectCommunities);
  const [getCommunity, setGetCommunity] = useState(communities);
  const chatProfile = useSelector((state) => state.chat.chatProfile);
  const chatId = useSelector((state) => state.chat.chatId);
  const launchRef = useRef();

  useEffect(() => {
    getAllCommunity(loggedInUserId)
      .then((res) => {
        setGetCommunity(res.data);
      })
      .catch((error) => console.error("Error", error));
  }, [chatProfile, chatId, sendMessage, recieveMessage, loggedInUserId]);

  const openAddNewCommunityModal = () => {
    // Trigger the ModalBsLauncher programmatically
    if (launchRef.current) {
      launchRef.current.click();
    }
  };

  return (
    <details
      className="communities__wrapper d-flex flex-column rounded-4 shadow-sm overflow-hidden"
      open={isCommunityOpen}
      id="sidebarCommunities"
    >
      <summary className="communities__header d-flex align-items-center gap-2 py-3 px-4 ">
        {/* <HiOutlineUserGroup style={{ fontSize: "2rem" }} /> */}
        <CommunitiesIcon
          style={{ height: "30px", width: "30px", color: "currentColor" }}
        />
        <div className="d-flex align-items-center justify-content-between w-100">
          <h4 className="m-0 text-capitalize">Community</h4>

          <AiOutlineUsergroupAdd
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
            onClick={openAddNewCommunityModal}
          />
        </div>
      </summary>
      <div className="communities__chats d-flex flex-column">
        {/* Add new */}
        <ModalBsLauncher
          id="AddNewCommunity"
          launchRef={launchRef}
        ></ModalBsLauncher>
        {/* Add new Modal is added to chats.js because it was not triggered in mobileview */}
        {/* <ModalBSContainer isStatic={false} id="AddNewCommunity">
          <ModalBSHeader
            title={"Create a Community"}
            className={loggedInUser.isInvestor === "true" ? "yellow__heading" : "orange__heading"}
          />
          <ModalBSBody>
            <NewCommunityModal theme={loggedInUser.isInvestor === "true" ? "investor" : ""} />
          </ModalBSBody>
        </ModalBSContainer> */}

        {/* Render communities list */}
        <div className="my__communities d-flex flex-column">
          {/* <h5 className="px-3 m-0 py-3">My Communities</h5> */}
          {getCommunity?.map((community, index) => {
            return (
              <CommunityCard
                community={community}
                key={community._id}
                recieveMessage={recieveMessage}
                sendMessage={sendMessage}
                setIsRead={setIsRead}
                isRead={isRead}
              />
            );
          })}
        </div>
      </div>
    </details>
  );
}
