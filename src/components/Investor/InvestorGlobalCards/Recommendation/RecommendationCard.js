import React from "react";
import AddUserIconBlack from "../../../../Images/investorIcon/Add-UserBlack.svg";
import AfterSuccessPopup from "../../../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import InvestorAfterSuccessPopUp from "../../../PopUp/InvestorAfterSuccessPopUp/InvestorAfterSuccessPopUp";
import "./recommendation.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  getRecommendations,
  sentConnectionRequest,
} from "../../../../Service/user";
import { Link, useLocation } from "react-router-dom";
import { setRecommendations } from "../../../../Store/features/user/userSlice";
import { FaUserPlus , FaUserCircle } from "react-icons/fa";


const RecommendationCard = ({ maxCount = 5 }) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const recommendations = useSelector((state) => state.user.recommendations);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const isInvestorAccount = pathname.includes("/investor");

  const [loading, setLoading] = useState(false);
  const [connectionSent, setConnectionSent] = useState(false);

  useEffect(() => {
    if (recommendations === null) {
      setLoading(true);
      getRecommendations(loggedInUser._id)
        .then(({ data }) => {
          dispatch(setRecommendations(data.slice(0, 5)));
          setLoading(false);
        })
        .catch(() => {
          dispatch(setRecommendations({}));
          setLoading(false);
        });
    }
  }, [dispatch, loggedInUser._id, recommendations]);

  const handleConnect = (userId) => {
    sentConnectionRequest(loggedInUser._id, userId)
      .then(({ data }) => {
        setConnectionSent(true);
        setTimeout(() => setConnectionSent(false), 2500);

        setLoading(true);
        getRecommendations(loggedInUser._id)
          .then(({ data }) => {
            dispatch(setRecommendations(data.slice(0, 5)));
            setLoading(false);
          })
          .catch(() => {
            dispatch(setRecommendations({}));
            setLoading(false);
          });
      })
      .catch((error) => console.log());
  };

 
  return (
    <>
      <div className="recommendation_main_container">
        <div className="col-12 recommendation_card">
          <div className="card mt-2 right_view_profile_card right_view_profile">
            <div className="card-header">
              <div className="title">
                <span>Recommendation</span>
              </div>
            </div>

            {loading ? (
              <div className="d-flex justify-content-center my-4">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {recommendations && recommendations.length > 0 ? (
                  recommendations.slice(0, maxCount).map((user, i) => {
                    const userLink = isInvestorAccount
                      ? `/investor/user/${user?.firstName.toLowerCase()}-${user?.lastName.toLowerCase()}/${user.oneLinkId}`
                      : `/user/${user?.firstName.toLowerCase()}-${user?.lastName.toLowerCase()}/${user.oneLinkId}`;

                      // console.log("reco", recommendations);

                    return (
                      <Link
                        to={userLink}
                        className="card_wrapper"
                        key={i}
                        style={{ textDecoration: "none" }}
                      >
                        <div className="card-body recommendation_card_body">
                          <img
                            src={
                              user.profilePicture && user.profilePicture.trim() !== ""
                                ? user.profilePicture
                                : <FaUserCircle /> // External fallback image URL
                            }
                            alt="img"
                            className="rounded-circle"
                            style={{ objectFit: "cover" }}
                          />
                          <div className="recommendation_card_text">
                            <h3 style={{color: "var(--d-l-grey)"}}>
                              {user.firstName} {user.lastName}
                            </h3>
                            {user.designation && (
                              <h4 style={{color: "var(--d-l-grey)"}} className="smallest_typo">
                                {user.designation}
                              </h4>
                            )}
                          </div>
                          <button
                            className="btn connect_button"
                            onClick={(e) => {
                              e.preventDefault(); // Prevents Link navigation when button is clicked
                              handleConnect(user._id);
                            }}
                          >
                            <FaUserPlus />
                            <span>Connect</span>
                          </button>
                        </div>
                      </Link>

                    );
                  })
                ) : (
                  <p className="card-body">No Recommendations</p>
                )}
              </>
            )}
          </div>
          {connectionSent && !isInvestorAccount && (
            <AfterSuccessPopup
              withoutOkButton
              onClose={() => setConnectionSent(false)}
              successText="Connection Sent Successfully"
            />
          )}
          {connectionSent && isInvestorAccount && (
            <InvestorAfterSuccessPopUp
              withoutOkButton
              onClose={() => setConnectionSent(false)}
              successText="Connection Sent Successfully"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default RecommendationCard;
