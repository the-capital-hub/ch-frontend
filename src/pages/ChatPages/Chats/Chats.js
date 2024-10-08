import "./Chats.scss";
import ChatSearch from "./ChatSearch/ChatSearch";
import ChatSidebar from "./ChatSidebar/ChatSidebar";
import ChatNavbar from "./ChatNavbar/ChatNavbar";
import ChatDashboard from "./ChatDashboard/ChatDashboard";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { environment } from "../../../environments/environment";
import {
  Link,
  // useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { findChat, createChat } from "../../../Service/user";
import CommunitiesContainer from "../../../components/Investor/ChatComponents/CommunitiesContainer";
import ChatSettings from "../../../components/Investor/ChatComponents/ChatSettings/ChatSettings";
import CommunityDashboard from "./CommunityDashboard/CommunityDashboard";
import {
  resetChat,
  setChatId,
  setUserId,
  setIsCommuntySelected,
  // updateLastMessage,
  selectAllChatsStatus,
  // updateCreateChat,
} from "../../../Store/features/chat/chatSlice";
import backIcon from "../../../Images/Chat/BackIcon.svg";
import navBarLogo from "../../../Images/investorIcon/Logo.svg";
import selectAChatIcon from "../../../Images/Chat/selectAChat.png";
import {
  ModalBSBody,
  ModalBSContainer,
  ModalBSHeader,
} from "../../../components/PopUp/ModalBS";
import NewCommunityModal from "../../../components/Investor/ChatComponents/NewCommunityModal";
import { setThemeColor } from "../../../utils/setThemeColor";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import TutorialTrigger from "../../../components/Shared/TutorialTrigger/TutorialTrigger";
import { startupOnboardingSteps } from "../../../components/OnBoardUser/steps/startup";
import {
  selectIsInvestor,
  selectLoggedInUserId,
} from "../../../Store/features/user/userSlice";
import { fetchAllChats } from "../../../Store/features/chat/chatThunks";
import TCHLogoLoader from "../../../components/Shared/TCHLoaders/TCHLogoLoader/TCHLogoLoader";
import { selectTheme } from "../../../Store/features/design/designSlice";
import { Toaster } from "react-hot-toast";

const Chats = () => {
  // search params
  // const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramUserId = searchParams.get("userId");
  const isCommunityOpen = searchParams.get("isCommunityOpen");
  const navigate = useNavigate();

  // Fetch global state
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const isInvestor = useSelector(selectIsInvestor);
  const theme = useSelector(selectTheme);
  // const userId = useSelector((state) => state.chat.userId);
  const chatId = useSelector((state) => state.chat.chatId);
  const isCommunitySelected = useSelector(
    (state) => state.chat.isCommunitySelected
  );
  const dispatch = useDispatch();

  // New Fetch call
  const allChatsStatus = useSelector(selectAllChatsStatus);
  useEffect(() => {
    const fetchallChatsData = async () => {
      try {
        console.log("fetching ");
        await dispatch(fetchAllChats()).unwrap();
      } catch (error) {
        console.error("Error fetching initial all chats:", error);
      }
    };

    if (allChatsStatus === null) {
      fetchallChatsData();
    }
  }, [allChatsStatus, dispatch]);

  // const [selectedChat, setSelectedChat] = useState(null);
  // const [selectedUser, setSelectedUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [recieveMessage, setRecieveMessage] = useState(null);
  const [cleared, setCleared] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [loading, setLoading] = useState({ userChat: false });

  // const [isCommunitySelected, setIsCommunitySelected] = useState(false);
  // const previousUrl = window.history.length > 1 ? window.history.go(-1) : null;

  // if (previousUrl) {
  //   console.log('Previous URL:', window.location.href);
  // }

  // When directed to chats scroll page to top
  useEffect(() => {
    document.title = "Chats | The Capital Hub";
    window.scrollTo({ top: 0, behavior: "smooth" });
    function handleWindowResize() {
      const isMobile = window.innerWidth <= 820;
      setIsMobileView(isMobile);
    }
    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();

    setThemeColor();

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const socket = useRef();

  const disconnectSocket = () => {
    socket.current?.disconnect();
  };
  const disconnectFromServer = () => {
    socket.current?.emit("disconnected");
  };

  // Initialize Socket
  useEffect(() => {
    socket.current = io(environment.baseUrl);
    socket.current.emit("new-user-add", loggedInUserId);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
    return () => {
      disconnectFromServer();
      disconnectSocket();
    };
  }, [loggedInUserId]);

  useEffect(() => {
    console.log("recieve");
    socket.current?.on("recieve-message", (data) => {
      setRecieveMessage(data);
      // update last message
      // dispatch(
      //   updateLastMessage({
      //     chatId: data.chatId,
      //     text: data.text,
      //     createdAt: data.createdAt,
      //   })
      // );
    });
  }, [socket, dispatch]);

  useEffect(() => {
    console.log("Send");
    console.log(sendMessage);
    if (sendMessage !== null) {
      socket.current?.emit("send-message", sendMessage);
      // update last message
      // dispatch(
      //   updateLastMessage({
      //     chatId: sendMessage.chatId,
      //     text: sendMessage.text,
      //     createdAt: sendMessage.createdAt,
      //   })
      // );
    }
  }, [sendMessage, dispatch]);

  // create chat. Pass userId and loggedInUserId
  const handleCreateChat = useCallback(async () => {
    setLoading((prev) => {
      return { ...prev, userChat: true };
    });
    await createChat(paramUserId, loggedInUserId)
      .then((res) => {
        console.log("from create chat:", res.data);
        dispatch(setChatId(res.data._id));
        // Add to persoanl chats
        // dispatch(updateCreateChat(res.data));
        setLoading((prev) => {
          return { ...prev, userChat: false };
        });
      })
      .catch((error) => {
        console.error("Error creating chat-->", error);
      });
  }, [paramUserId, loggedInUserId, dispatch]);

  // When userId changes findchat and set selectedChatId and selectedUserId
  // If a chat does not exist, create a new chat.
  useEffect(() => {
    if (paramUserId) {
      dispatch(setUserId(paramUserId));
      findChat(paramUserId, loggedInUserId)
        .then((res) => {
          console.log("Result", res);
          dispatch(setIsCommuntySelected(false));
          if (res.data.length === 0) {
            return handleCreateChat();
          } else {
            dispatch(setChatId(res.data._id));
          }
        })
        .catch((error) => {
          console.error("Error-->", error);
        })
        .finally(() => {
          searchParams.delete("userId");
          setSearchParams(searchParams);
        });
    }
  }, [paramUserId, loggedInUserId, dispatch]);

  // const renderMobileHeader = useMemo(() => {
  //   return (
  //     <div
  //       className="mobile-nav shadow-sm pb-2 px-2"
  //       style={{ height: "70px" }}
  //     >
  //       <button
  //         className="btn btn-sm btn-light"
  //         onClick={() => {
  //           console.log(chatId);
  //           if (!chatId) {
  //             navigate(-1);
  //           } else {
  //             dispatch(resetChat());
  //           }
  //         }}
  //       >
  //         <IoMdArrowRoundBack /> Back
  //       </button>
  //       <Link to="/">
  //         <img src={navBarLogo} alt="nav bar logo" />
  //       </Link>
  //       <button
  //         className="btn btn-sm btn-light"
  //         onClick={() =>
  //           navigate(isInvestor === "true" ? "/investor/home" : "/home")
  //         }
  //         // onClick={() => dispatch(resetChat())}
  //       >
  //         <AiOutlineHome /> Home
  //       </button>
  //     </div>
  //   );
  // }, [dispatch, isInvestor, navigate, chatId]);

  const renderMobileMainSection = useMemo(() => {
    return !isSettingsOpen ? (
      <>
        <ChatNavbar
          isclear={setCleared}
          cleared={cleared}
          setIsSettingsOpen={setIsSettingsOpen}
        />
        {!isCommunitySelected && (
          <ChatDashboard
            setSendMessage={setSendMessage}
            recieveMessage={recieveMessage}
            cleared={cleared}
          />
        )}
        {isCommunitySelected && (
          <CommunityDashboard
            setSendMessage={setSendMessage}
            recieveMessage={recieveMessage}
            cleared={cleared}
            setIsRead={setIsRead}
            isRead={isRead}
          />
        )}
      </>
    ) : (
      <div className="right_section_wrapper overflow-y-auto">
        <section className="right_section hide_scrollbar w-100 ">
          <ChatSettings setIsSettingsOpen={setIsSettingsOpen} />
        </section>
      </div>
    );
  }, [
    isSettingsOpen,
    setCleared,
    cleared,
    setIsSettingsOpen,
    setSendMessage,
    recieveMessage,
    isCommunitySelected,
    setIsRead,
    isRead,
  ]);

  return allChatsStatus === "loading" ? (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "100dvh", backgroundColor: "var(--startup-bg)" }}
      data-bs-theme={theme}
    >
      <TCHLogoLoader />
      <h4 className="" style={{ color: "var(--d-l-grey)" }}>
        Fetching your Chats
      </h4>
    </div>
  ) : (
    <>
      {/* Onboarding popup */}
      <TutorialTrigger
        steps={startupOnboardingSteps.chatsPage}
        fromUp={true}
        isChatPage={true}
        theme={theme}
      />

      <div className="chat-page-wrapper" data-bs-theme={theme}>
        <div className="container-xxl p-0 chat_main_container position-relative fadeIn-025">
          {/* Left section */}
          <div
            className={`left_section_wrapper mx-3 ${isMobileView && "d-none"}`}
          >
            <section className="left_section">
              <span
                className="back_img rounded-circle shadow-sm"
                title="Go Back"
              >
                <img
                  src={backIcon}
                  width={20}
                  height={20}
                  onClick={() => navigate(-1)}
                  alt=""
                />
              </span>
              <ChatSearch />
              <div class="chats-col">
                <CommunitiesContainer
                  isCommunityOpen={isCommunityOpen}
                  recieveMessage={recieveMessage}
                  sendMessage={sendMessage}
                  setIsRead={setIsRead}
                  isRead={isRead}
                />
                <ChatSidebar
                  recieveMessage={recieveMessage}
                  sendMessage={sendMessage}
                />
              </div>
            </section>
          </div>
          {/* Main Chat section */}
          <section className="main_section">
            {/* {isMobileView && renderMobileHeader} */}
            {isMobileView ? (
              chatId ? (
                renderMobileMainSection
              ) : (
                // <section className="overflow-y-auto mobileView_chat_sidebar">
                //   <div className="d-flex flex-column gap-3 px-1">
                //     <ChatSearch />
                //     <CommunitiesContainer
                //       isCommunityOpen={isCommunityOpen}
                //       recieveMessage={recieveMessage}
                //       sendMessage={sendMessage}
                //       setIsRead={setIsRead}
                //       isRead={isRead}
                //     />
                //     <ChatSidebar
                //       recieveMessage={recieveMessage}
                //       sendMessage={sendMessage}
                //     />
                //   </div>
                // </section>
                <section className="left_section">
                  {/* <span
                    className="back_img rounded-circle shadow-sm"
                    title="Go Back"
                  >
                    <img
                      src={backIcon}
                      width={20}
                      height={20}
                      onClick={() => navigate(-1)}
                      alt=""
                    />
                  </span> */}
                  <ChatSearch />
                  <div class="chats-col">
                    <CommunitiesContainer
                      isCommunityOpen={isCommunityOpen}
                      recieveMessage={recieveMessage}
                      sendMessage={sendMessage}
                      setIsRead={setIsRead}
                      isRead={isRead}
                    />
                    <ChatSidebar
                      recieveMessage={recieveMessage}
                      sendMessage={sendMessage}
                    />
                  </div>
                </section>
              )
            ) : chatId && !loading?.userChat ? (
              <>
                <ChatNavbar
                  isclear={setCleared}
                  cleared={cleared}
                  setIsSettingsOpen={setIsSettingsOpen}
                />
                {!isCommunitySelected && (
                  <ChatDashboard
                    setSendMessage={setSendMessage}
                    recieveMessage={recieveMessage}
                    cleared={cleared}
                  />
                )}
                {isCommunitySelected && (
                  <CommunityDashboard
                    setSendMessage={setSendMessage}
                    recieveMessage={recieveMessage}
                    cleared={cleared}
                    setIsRead={setIsRead}
                    isRead={isRead}
                  />
                )}
              </>
            ) : (
              <div className="select-chat-container">
                <img src={selectAChatIcon} alt="select a chat" />
                <h3>Select a message</h3>
              </div>
            )}
          </section>
          {/*Right section chat settings */}
          {!isMobileView && isSettingsOpen ? (
            <div className="right_section_wrapper ms-lg-3">
              <section className="right_section w-100 ">
                <ChatSettings setIsSettingsOpen={setIsSettingsOpen} />
              </section>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Modal */}
        <div className="addNewCommunity_modal_wrapper">
          <ModalBSContainer isStatic={false} id="AddNewCommunity">
            <ModalBSHeader
              title={"Create a Community"}
              className={isInvestor ? "yellow__heading" : "orange__heading"}
            />
            <ModalBSBody>
              <NewCommunityModal theme={isInvestor ? "investor" : ""} />
            </ModalBSBody>
          </ModalBSContainer>
        </div>
      </div>

      <Toaster
        containerStyle={{
          top: "100px",
        }}
        toastOptions={{
          duration: 10000,
        }}
      />
    </>
  );
};

export default Chats;
