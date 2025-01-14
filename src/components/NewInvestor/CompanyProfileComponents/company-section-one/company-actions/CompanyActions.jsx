import "./CompanyActions.scss";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SubcriptionPop from "../../../../PopUp/SubscriptionPopUp/SubcriptionPop"
import {
  selectIsInvestor,
  selectLoggedInUserId,
  selectMyInterests,
  setUserCompany,
} from "../../../../../Store/features/user/userSlice";
import {
  addMessage,
  addNotificationAPI,
  createChat,
  postInvestorData,
} from "../../../../../Service/user";
import { useState } from "react";
import SpinnerBS from "../../../../Shared/Spinner/SpinnerBS";
import { generateId } from "../../../../../utils/ChatsHelpers";
import AfterSuccessPopUp from "../../../../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import { setChatId } from "../../../../../Store/features/chat/chatSlice";

export default function CompanyActions({
  isOnelink = false,
  founderId,
  companyId,
}) {
  let location = useLocation();
  const dispatch = useDispatch();

  const [send, setSend] = useState(false);
  const [open, setOpen] = useState(false);
  const [popPayOpen, setPopPayOpen] = useState(false);
  const isInvestor = useSelector(selectIsInvestor);
  const myInterests = useSelector(selectMyInterests);
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const userCompanyData = useSelector((state) => state.user.company);

  // Loading states
  const [loading, setLoading] = useState(false);

  let myInterestsIds = myInterests?.map((interest) => interest.companyId);

  const linkTo = isInvestor
    ? `/investor/user/${
        founderId.firstName?.toLowerCase() +
        "-" +
        founderId.lastName?.toLowerCase()
      }/${founderId?.oneLinkId}`
    : `/user/${
        founderId.firstName?.toLowerCase() +
        "-" +
        founderId.lastName?.toLowerCase()
      }/${founderId?.oneLinkId}`;

  // Handle Uninterst click
  const handleUninterest = async (e, companyId) => {
    // guard clause
    if (!userCompanyData) {
      return;
    }

    setLoading(true);

    let updatedMyInterests = myInterests.filter(
      (interest) => interest.companyId !== companyId
    );
    // console.log("uninterest", updatedMyInterests)

    try {
      const { data } = await postInvestorData({
        founderId: loggedInUserId,
        myInterests: updatedMyInterests,
      });
      dispatch(setUserCompany(data));
    } catch (error) {
      console.log();
    } finally {
      setLoading(false);
    }
  };

  // Handle Interest click
  const handleInterest = async () => {
    setLoading(true);
    let updatedMyInterests = [...myInterests, { companyId }];

    try {
      const { data } = await postInvestorData({
        founderId: loggedInUserId,
        myInterests: updatedMyInterests,
      });
      dispatch(setUserCompany(data));
    } catch (error) {
      console.log();
    } finally {
      setLoading(false);
    }
  };

  const handelOnlinkRequest = async () => {
    try {
      setPopPayOpen(true);
      // const notificationBody = {
      //   recipient: founderId._id,
      //   type: "onlinkRequest",
      //   achievementId: "658bb97a8a18edb75e6f4243",
      // };

      // await createChat(founderId._id, loggedInUserId)
      //   .then(async (res) => {
      //     //console.log(res);
      //     if (res.message === "Chat already exists") {
      //       setOpen(true);
      //       return;
      //     }
      //     addNotificationAPI(notificationBody)
      //       .then((data) => console.log(""))
      //       .catch((error) => console.error(error.message));
      //     console.log("founderId", founderId);
      //     console.log("from create chat:", res.data);
      //     dispatch(setChatId(res?.data._id));
      //     const message = {
      //       id: generateId(),
      //       senderId: loggedInUserId,
      //       text: `${loggedInUser.firstName}${loggedInUser.lastName} has send you for onlink request`,
      //       chatId: res?.data?._id,
      //     };
      //     await addMessage(message)
      //       .then(({ data }) => {
      //         setSend(!send);
      //         console.log("response after adding to db", data);
      //       })
      //       .catch((error) => {
      //         console.error("Error-->", error);
      //       });
      //   })
      //   .catch((error) => {
      //     console.error("Error creating chat-->", error);
      //   });
    } catch (err) {
      console.log();
    }
  };

  return (
    <div className="company__actions d-flex flex-column justify-content-end justify-content-xl-start">
      {/* {isOnelink ? (
        ""
      ) : (
        <button className="bookmark position-absolute top-0 right-0 me-4">
          <img src={Bookmark} alt="bookmark icon" />
        </button>
      )} */}
      <div className="action__buttons d-flex flex-column flex-md-row align-items-start gap-3 mt-3 mb-3 mt-lg-0">
        {isOnelink ? (
          ""
        ) : (
          <>
            {/* Condition 1 -  check if path is either a company-profile page or explore page.
             Condition 2 - check if loggedInUser's myIntersts has the current company in it.
             Render Show Interest Button of condition 1 is true and condition 2 is false*/}
            {location.pathname.includes("/investor") && (
              <>
                {(location.pathname.includes("/investor/company-profile") ||
                  location.pathname.includes("/investor/explore")) &&
                !myInterestsIds?.includes(companyId) ? (
                  <button
                    className="btn-capital text-center"
                    onClick={handleInterest}
                  >
                    Interested
                  </button>
                ) : (
                  <button
                    type="button"
                    className="d-flex align-items-center gap-2 btn btn-danger fw-bold fs-6"
                    onClick={(e) => handleUninterest(e, companyId)}
                  >
                    {loading ? (
                      <>
                        <SpinnerBS
                          spinnerSizeClass="spinner-border-sm"
                          colorClass={"text-white"}
                        />
                        <span>Please wait</span>
                      </>
                    ) : (
                      "Uninterest"
                    )}
                  </button>
                )}
              </>
            )}
            {loggedInUserId !== founderId._id && (
              <Link to={linkTo}>
                <button
                  className="btn btn-capital-outline actions-btn"
                  style={{ fontSize: "14px" }}
                >
                  Connect with the Founder
                </button>
              </Link>
            )}
            {/* {loggedInUserId !== founderId._id && (
              <button
                className="btn btn-capital-outline actions-btn"
                style={{ fontSize: "14px", padding: "5px" }}
                onClick={handelOnlinkRequest}
              >
                Request for onelink
              </button>
            )} */}
          </>
        )}
        {!location.pathname === "/company-profile" && (
          <button className="btn-capital actions-btn">Invest Now</button>
        )}
        {open && (
          <AfterSuccessPopUp
            withoutOkButton
            onClose={() => setOpen(!open)}
            successText="Request send already"
          />
        )}
        {send && (
          <AfterSuccessPopUp
            withoutOkButton
            onClose={() => setSend(!send)}
            successText="Request send successfully"
          />
        )}
      </div>
      {popPayOpen && (
        <SubcriptionPop popPayOpen={popPayOpen} setPopPayOpen={setPopPayOpen} />
      )}
    </div>
  );
}
