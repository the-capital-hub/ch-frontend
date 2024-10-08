import React from "react";
import AddUserIconBlack from "../../../Images/investorIcon/Add-UserBlack.svg";
import AfterSuccessPopup from "../../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";
import "./investorRecommendationCard.scss";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  getRecommendations,
  sentConnectionRequest,
} from "../../../Service/user";
import { Link } from "react-router-dom";

const RecommendationCard = () => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getRecommendations(loggedInUser._id)
      .then(({ data }) => {
        setUsers(data.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setUsers({}));
  }, [loggedInUser._id]);

  const [connectionSent, setConnectionSent] = useState(false);

  //   const handleConnect = (userId) => {
  //     sentConnectionRequest(loggedInUser._id, userId)
  //       .then(({ data }) => {
  //         setConnectionSent(!connectionSent);
  //         setTimeout(() => setConnectionSent((prev) => !prev), 2500);
  //         getRecommendations(loggedInUser._id)
  //           .then(({ data }) => {
  //             setUsers(data.slice(0, 5));
  //           })
  //           .catch(() => setUsers({}));
  //       })
  //       .catch((error) => console.log(error));
  //   };

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
                {users.map((user, i) => (
                  <div key={i}>
                    <div
                      className="card-body recommendation_card_body "
                      // key={i}
                    >
                      <Link to={`#`} className="rounded-circle">
                        <img
                          src={user.profilePicture}
                          alt="img"
                          className="rounded-circle"
                        />
                      </Link>
                      <div className="recommendation_card_text">
                        <h3>
                          {user.firstName} {user.lastName}
                        </h3>
                        <h4 className="smallest_typo">
                          {user.designation || ""}
                        </h4>
                      </div>
                      <button
                        className="connect_button"
                        // onClick={() => handleConnect(user._id)}
                      >
                        <img src={AddUserIconBlack} alt="add user" />
                        <span>Connect</span>
                      </button>
                    </div>
                    <hr className="hr" />
                  </div>
                ))}
              </>
            )}
          </div>
          {connectionSent && (
            <AfterSuccessPopup
              withoutOkButton
              onClose={() => setConnectionSent(!connectionSent)}
              successText="Connection Sent Successfully"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default RecommendationCard;
