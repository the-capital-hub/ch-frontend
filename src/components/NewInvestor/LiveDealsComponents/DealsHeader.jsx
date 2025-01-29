import SpinnerBS from "../../Shared/Spinner/SpinnerBS";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getStartupByFounderId, sendOneLinkRequest } from "../../../Service/user";
import { toast } from "react-hot-toast";
import SubcriptionPop from "../../PopUp/SubscriptionPopUp/SubcriptionPop";

export default function DealsHeader({
  image,
  name,
  motto,
  theme,
  handelDeals,
  loggedInUserId,
  userInterested,
  companyId,
  founderId,
  isInvestor,
}) {
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [popPayOpen, setPopPayOpen] = useState(false);
  const [oneLinkRequestStatus, setOneLinkRequestStatus] = useState(null);
  const [startupData, setStartupData] = useState(null);
  const [redirectTo, setRedirectTo] = useState(null);
  const [showSecretKey, setShowSecretKey] = useState(true);

  let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Generate the correct link path based on user type
  const linkTo = isInvestor
    ? `/investor/user/${
        founderId.firstName?.toLowerCase() +
        "." +
        founderId.lastName?.toLowerCase()
      }/${founderId?.oneLinkId}`
    : `/user/${
        founderId.firstName?.toLowerCase() +
        "." +
        founderId.lastName?.toLowerCase()
      }/${founderId?.oneLinkId}`;

  useEffect(() => {
    const fetchStartupData = async () => {
      if (founderId?._id) {
        try {
          const { data } = await getStartupByFounderId(founderId._id);
          setStartupData(data);
          const oneLinkRequest = data.oneLinkRequest?.find(
            (request) => request.userId === loggedInUserId
          );
          setOneLinkRequestStatus(oneLinkRequest ? oneLinkRequest.status : null);
          setRedirectTo(`/onelink/${data.oneLink}/${data.founderId?.oneLinkId}`);
        } catch (err) {
          console.error("Error fetching startup data:", err);
        }
      }
    };

    fetchStartupData();
  }, [founderId?._id, loggedInUserId]); // Added proper dependency

  const handleSecretKey = () => {
    setShowSecretKey(false);
  };

  const handelOnlinkRequest = async () => {
    try {
      setIsRequestLoading(true);
      if (loggedInUser.isSubscribed) {
        setPopPayOpen(false);
        await sendOneLinkRequest(companyId, loggedInUserId);
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

  return (
    <div className="deals__header pb-4 d-flex flex-column flex-lg-row justify-content-between align-items-center border-bottom" 
         style={{ 
           borderBottom: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} !important`,
           marginBottom: "2rem"
         }}>
      <div className="d-flex gap-3">
        <div className="position-relative">
          <img
            src={image}
            alt={name}
            style={{ 
              width: "96px", 
              height: "96px", 
              borderRadius: "24px",
              objectFit: "cover",
              border: `1px solid ${theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
            }}
            className="shadow-sm"
          />
        </div>
        <div className="d-flex flex-column gap-2 justify-content-center">
          <h3
            className="main__heading fw-semibold"
            style={{ color: theme === "dark" ? "#fff" : "black" }}
          >
            {name}
          </h3>
          <p
            className="company__motto"
            style={{ color: theme === "dark" ? "#fff" : "black" }}
          >
            {motto}
          </p>
        </div>
      </div>
      <div className="d-flex gap-2 mt-3 flex-wrap">
        {userInterested === loggedInUserId ? (
          <button
            type="button"
            className="d-flex align-items-center gap-2 btn btn-danger fw-bold fs-6"
            onClick={handelDeals}
          >
            Mark as not Interested
          </button>
        ) : (
          <button 
            className="d-flex align-items-center gap-2 btn btn-investor fw-bold fs-6" 
            onClick={handelDeals}
          >
            Show Interest
          </button>
        )}
        
        {loggedInUserId !== founderId?._id && (
          <>
            <Link to={linkTo}>
              <button
                className="btn btn-primary"
                style={{ fontSize: "14px" }}
              >
                Connect with Founder
              </button>
            </Link>

            {oneLinkRequestStatus === "pending" ? (
              <button className="btn btn-outline-warning" disabled>
                One Link Request Pending...
              </button>
            ) : oneLinkRequestStatus === "rejected" ? (
              <button className="btn btn-outline-danger" disabled>
                One Link Request Rejected!
              </button>
            ) : oneLinkRequestStatus === "approved" ? (
              <>
                <Link to={redirectTo}>
                  <button className="btn btn-outline-success">
                    Access OneLink
                  </button>
                </Link>
                {showSecretKey ? (
                  <button
                    className="btn btn-outline-info"
                    onClick={handleSecretKey}
                  >
                    View OneLink Secret Key
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-info"
                    style={{ fontSize: "16px" }}
                    disabled
                  >
                    {startupData?.founderId?.secretKey}
                  </button>
                )}
              </>
            ) : (
              <button
                className="btn btn-outline-primary"
                onClick={handelOnlinkRequest}
                disabled={isRequestLoading}
              >
                {isRequestLoading ? "Processing..." : "Request for OneLink"}
              </button>
            )}
          </>
        )}
      </div>
      {popPayOpen && (
        <SubcriptionPop popPayOpen={popPayOpen} setPopPayOpen={setPopPayOpen} />
      )}
    </div>
  );
}
