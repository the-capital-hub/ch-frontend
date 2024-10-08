import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DefaultAvatar from "../../../Images/Chat/default-user-avatar.webp";
import { CiEdit, CiSaveUp2 } from "react-icons/ci";
import { selectTheme } from "../../../Store/features/design/designSlice";
import SpinnerBS from "../../Shared/Spinner/SpinnerBS";
import { updateUserAPI } from "../../../Service/user";
import { loginSuccess } from "../../../Store/features/user/userSlice";

const InvestorPhilosophy = ({ showProfile }) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [loading,setLoading] = useState(false)
  const [philosophy,setPhilosophy] = useState(loggedInUser?.investmentPhilosophy)
  const theme = useSelector(selectTheme);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let editedData = {
      investmentPhilosophy:philosophy
    };

    try {
      const {
        data: { data },
      } = await updateUserAPI(editedData);
      console.log("data updateUserAPI", data);
      dispatch(loginSuccess(data));
      setPhilosophy(philosophy);
    } catch (error) {
      console.log(error);
    } finally {
      setIsEditing(false);
      setLoading(false);
    }
  }
  return (
    <div
      className={`${
        showProfile
          ? "ShareLink_container"
          : "startups_invested border shadow-sm"
      } rounded-2 introductory_message_container`}
    >
      <div className="box_container rounded-2 border shadow-sm p-4">
        {showProfile ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h5
              className="green_underline typography"
              style={{ paddingBottom: "0.5rem",color:theme==="dark"?"#fff":"#000" }}
            >
              Investment Philosophy
            </h5>
          </div>
        ) : (
          <div
            className="header border-bottom d-flex"
            style={{ paddingBottom: "15px", marginBottom: "0.5rem",color:theme==="dark"?"#fff":"#000",width:"100%",justifyContent:"space-between" }}
          >
            <h2 className="green_underline typography" style={{color:theme==="dark"?"#fff":"#000"}}>
              Investment Philosophy
            </h2>
            {!showProfile && (
              <span className="edit_btn d-flex align-self-end align-md-self-start ">
                <div
                  className="btn d-flex align-items-center gap-1"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <CiEdit
                    style={{
                      color:
                        theme !== "startup" ? "rgb(211, 243, 107)" : "#ffb27d",
                    }}
                  />
                </div>
                {isEditing &&  (
                  <span className="edit_btn d-flex align-self-end align-md-self-start ">
                    <button
                      className="btn ms-2 d-flex align-items-center gap-1"
                      style={{border:"none",color:
                        theme !== "startup" ? "rgb(211, 243, 107)" : "#ffb27d",}}
                      onClick={handleSubmit}
                      
                    >
                      {loading ? (
                        <SpinnerBS spinnerSizeClass="spinner-border-sm" />
                      ) : (
                        <>
                          Save <CiSaveUp2 />
                        </>
                      )}
                    </button>
                  </span>
                )}
              </span>
            )}
          </div>
        )}

        {isEditing ? (
          <textarea
            className="typography rounded-2"
            style={{
              fontSize: "14px",
              width: "100%",
              minHeight: "10rem",
              padding: "10px",
              fontWeight:"100"
            }}
            value={philosophy}
            onChange={(e)=>{setPhilosophy(e.target.value)}}
          />
        ) : (
          <p className="typography" style={{ fontSize: "14px",color:theme==="dark"?"#fff":"#000",fontWeight:"100" }}>
            {philosophy}
          </p>
        )}
      </div>
    </div>
  );
};

export default InvestorPhilosophy;
