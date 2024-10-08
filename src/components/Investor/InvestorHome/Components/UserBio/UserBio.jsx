import React, { useState } from "react";
import { CiEdit, CiSaveUp2 } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { updateUserAPI } from "../../../../../Service/user";
import {
  loginSuccess,
  selectIsInvestor,
  selectUserBio,
} from "../../../../../Store/features/user/userSlice";
import SpinnerBS from "../../../../Shared/Spinner/SpinnerBS";
import InvestorAfterSuccessPopUp from "../../../../PopUp/InvestorAfterSuccessPopUp/InvestorAfterSuccessPopUp";
import ErrorPopUp from "../../../../PopUp/ErrorPopUp/ErrorPopUp";
import AfterSuccessPopUp from "../../../../PopUp/AfterSuccessPopUp/AfterSuccessPopUp";

export default function UserBio({ canEdit = true, bioText = "" }) {
  // Fetch from store
  const userBio = useSelector(selectUserBio);
  const isInvestor = useSelector(selectIsInvestor);
  const dispatch = useDispatch();

  // States for Bio
  const [isBioEditable, setIsBioEditable] = useState(false);
  const [bioContent, setBioContent] = useState(userBio || bioText || "");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Submit Bio
  const submitBioHandler = async () => {
    setLoading(true);

    try {
      const {
        data: { data },
      } = await updateUserAPI({ bio: bioContent });
      dispatch(loginSuccess(data));
      setIsBioEditable(!isBioEditable);
      setAlert({ success: "Changes Saved!" });
    } catch (error) {
      console.error("Error saving bio:", error);
      setAlert({ error: "Error saving Bio! Please try again." });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  };

  return (
    <div>
      <div
        className={`box personal_information rounded-2 ${canEdit ? "pb-4" : ""} ${
          isInvestor ? "rounded-2 border shadow-sm" : ""
        } `}
        id="userBio"
      
      >
        <div className="personal_information_header" style={{marginBottom:"0.3rem"}}>
          <h2 className="typography" >Bio</h2>
          {/* Edit button */}
          {canEdit && (
            <span className="ms-auto d-flex align-items-center gap-2">
              <button
                type="button"
                className="btn d-flex align-items-center gap-1"
                onClick={() => {
                  setBioContent(userBio);
                  setIsBioEditable(!isBioEditable);
                }}
                disabled={loading}
              >
                {/*{isBioEditable ? "Cancel" : "Edit"}*/}
                <CiEdit style={{ color: isInvestor?"rgb(211, 243, 107)": "#ffb27d" }}/>
              </button>
              {isBioEditable && (
                <button
                  type="submit"
                  className="btn ms-2 d-flex align-items-center gap-2"
                  onClick={() => submitBioHandler()}
                  disabled={loading}
                >
                  {loading ? (
                    <SpinnerBS spinnerSizeClass="spinner-border-sm" />
                  ) : (
                    <>
                      <span>Save</span> <CiSaveUp2 />
                    </>
                  )}
                </button>
              )}
            </span>
          )}
        </div>

          <div className="designation_info">
            {isBioEditable ? (
              <textarea
                value={bioContent}
                name="bio"
                onChange={(e) => setBioContent(e.target.value)}
                className="profile_edit_field"
                rows={5}
                autoFocus
              />
            ) : (
              <p className="small_typo" style={{fontSize:"12px"}}>
                {bioContent || "Click on edit to add bio"}
              </p>
            )}
          </div>
        {/* <div className="col-12 mt-2 designation_see_more">
      <Link to={""}>See more</Link>
    </div> */}
      </div>
      {alert?.success && isInvestor && (
        <InvestorAfterSuccessPopUp
          successText={alert.success}
          onClose={() => setAlert(null)}
        />
      )}
      {alert?.success && !isInvestor && (
        <AfterSuccessPopUp
          successText={alert.success}
          onClose={() => setAlert(null)}
        />
      )}
      {alert?.error && (
        <ErrorPopUp message={alert.error} onClose={() => setAlert(null)} />
      )}
    </div>
  );
}
