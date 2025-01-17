import "./CompanyActions.scss";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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
  sendOneLinkRequest,
  getStartupByFounderId
} from "../../../../../Service/user";
import { useState } from "react";
import SpinnerBS from "../../../../Shared/Spinner/SpinnerBS";
import { generateId } from "../../../../../utils/ChatsHelpers";
import AfterSuccessPopUp from "../../../../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import { setChatId } from "../../../../../Store/features/chat/chatSlice";
import { toast } from "react-hot-toast";

export default function CompanyActions({
  isOnelink = false,
  founderId,
  companyId,
}) {
  let location = useLocation();
  const dispatch = useDispatch();

  const [send, setSend] = useState(false);
  const [open, setOpen] = useState(false);
  const [startupData, setStartupData] = useState(null);
  const [popPayOpen, setPopPayOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);
  const [showSecretKey, setShowSecretKey] = useState(true);
  const isInvestor = useSelector(selectIsInvestor);
  const myInterests = useSelector(selectMyInterests);
  const loggedInUserId = useSelector(selectLoggedInUserId);
  const userCompanyData = useSelector((state) => state.user.company);

  let loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    loggedInUser = JSON.parse(loggedInUser);
  }

  // Loading states
  const [loading, setLoading] = useState(false);
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  // New state for OneLink request status
  const [oneLinkRequestStatus, setOneLinkRequestStatus] = useState(null);

  let myInterestsIds = myInterests?.map((interest) => interest.companyId);

  useEffect(() => {
    // Check if founderId._id is valid before making the API call
    if (founderId?._id) {
      getStartupByFounderId(founderId._id)
        .then(({ data }) => {
          setStartupData(data);
          // Fetch OneLink request status here
          const oneLinkRequest = data.oneLinkRequest.find(
            (request) => request.userId.toString() === loggedInUserId
          );
          setOneLinkRequestStatus(oneLinkRequest ? oneLinkRequest.status : null);
          setRedirectTo(`/onelink/${data.oneLink}/${data.founderId?.oneLinkId}`);
        })
        .catch((err) => console.log(err));
    }
  }, [founderId, loggedInUserId]);

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
      setIsRequestLoading(true);
      if (loggedInUser.isSubscribed) {
        setPopPayOpen(false);
        const response = await sendOneLinkRequest(companyId, loggedInUserId);
        toast.success("OneLink request sent successfully!");
        setOneLinkRequestStatus("pending");
      } else {
        setPopPayOpen(true);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to send OneLink request.");
    } finally {
      setIsRequestLoading(false);
    }
  };

  const handleSecretKey = () => {
    setShowSecretKey(false);
  };

  return (
    <div className="company__actions d-flex flex-column justify-content-end">
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
      {loggedInUserId !== founderId._id && (
          <>
            {oneLinkRequestStatus === "pending" ? (
              <button className="btn btn-capital-outline actions-btn" style={{ fontSize: "14px" }} disabled>
                One Link Request Pending...
              </button>
            ) : oneLinkRequestStatus === "rejected" ? (
              <button className="btn btn-capital-outline actions-btn" style={{ fontSize: "14px" }} disabled>
                One Link Request Rejected!
              </button>
            ) : oneLinkRequestStatus === "approved" ? (
              <>
                <Link to={redirectTo}>
                  <button className="btn btn-capital-outline actions-btn" style={{ fontSize: "14px" }}>
                    Access OneLink
                  </button>
                </Link>
               { showSecretKey ? (<button
                  className="btn btn-capital-outline actions-btn"
                  style={{ fontSize: "14px" }}
                  onClick={() => handleSecretKey()}
                >
                  View OneLink Secret Key
                </button>
                ) : (<button
                  className="btn btn-capital-outline actions-btn"
                  style={{ fontSize: "25px" }}
                  disabled
                >
                  {startupData.founderId.secretKey}
                </button>
                )}
              </>
            ) : (
              <button
                className="btn btn-capital-outline actions-btn"
                style={{ fontSize: "14px" }}
                onClick={handelOnlinkRequest}
                disabled={isRequestLoading}
              >
                {isRequestLoading ? (
                  "One Link Request Loading..."
                ) : (
                  "Request for OneLink"
                )}
              </button>
            )}
          </>
        )}

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
