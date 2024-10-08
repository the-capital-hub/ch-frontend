import React, { useRef, useState } from "react";
import { fundingQuestions } from "../../../../constants/Startups/FundingInfo";
import { selectIsMobileView } from "../../../../Store/features/design/designSlice";
import { useSelector } from "react-redux";
// import SpinnerBS from "../../../Shared/Spinner/SpinnerBS";
import "./FundingFormFields.scss";
// import {
//   selectFundingQuestions,
//   selectLoggedInUserId,
//   setUserCompany,
// } from "../../../../Store/features/user/userSlice";
// import { postStartUpData } from "../../../../Service/user";
// import IconEditCapital from "../../../InvestorOneLink/SvgIcons/IconEditCapital";

const MAXWORDCOUNT = 250;

export default function FundingFormFields({ question }) {
  const isMobileView = useSelector(selectIsMobileView);
  // const fundingViaCapitalHubQuestions = useSelector(selectFundingQuestions);
  // const loggedInUserId = useSelector(selectLoggedInUserId);
  // const dispatch = useDispatch();

  // const [editMode, setEditMode] = useState(false);
  // const [saving, setSaving] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const textRef = useRef();

  // useEffect(() => {
  //   setEditMode(false);
  // }, [answer]);

  // handle edit click
  // function handleEditClick() {
  //   setEditMode(!editMode);
  // }

  // Handle input change
  function handleInputChange(e) {
    // auto resize
    textRef.current.style.height = "auto";
    textRef.current.style.height = textRef.current.scrollHeight + 2 + "px";

    // Enforce word limit
    const { value } = e.target;
    let words = value.split(" ");
    if (words.length > MAXWORDCOUNT) {
      textRef.current.value = words.slice(0, words.length - 1).join(" ");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } else {
      return;
    }
  }

  // Handle singe field save
  // async function handleSave() {
  //   const value = textRef.current.value;

  //   setSaving(true);

  //   let updatedData = {
  //     fundingViaCapitalhubQuestions: {
  //       ...fundingViaCapitalHubQuestions,
  //       [question]: value,
  //     },
  //     founderId: loggedInUserId,
  //   };

  //   console.log("single save - ", updatedData);

  //   try {
  //     const { data } = await postStartUpData(updatedData);
  //     console.log("single save:", data);
  //     dispatch(setUserCompany(data));
  //   } catch (error) {
  //     console.error("Error saving Answer:", error);
  //   } finally {
  //     setSaving(false);
  //     setEditMode(false);
  //   }
  // }

  return (
    <div className="funding_form_field d-flex flex-column gap-2">
      <fieldset>
        <legend className="fs-5 d-flex align-items-center gap-3 flex-wrap">
          <span>{fundingQuestions[question]}</span>{" "}
          {/* <button
            type="button"
            className="edit-field-btn btn border-0"
            onClick={handleEditClick}
          >
            <IconEditCapital />
          </button> */}
        </legend>

        <textarea
          name={question}
          id={question}
          rows={isMobileView ? 8 : 5}
          className="funding_textarea"
          onChange={handleInputChange}
          ref={textRef}
          style={{ resize: "none" }}
          required
        ></textarea>
      </fieldset>
      {showAlert && (
        <div className="alert alert-danger py-2" role="alert">
          Word limit exceeded! Please complete in 250 words or less.
        </div>
      )}
      {/* {(editMode || !answer) && (
        <button
          type="button"
          className="btn orange-button d-flex align-items-center justify-content-center gap-2 ms-auto"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? (
            <>
              <SpinnerBS
                colorClass={"text-white"}
                spinnerSizeClass="spinner-border-sm"
              />
              <span>Please wait...</span>
            </>
          ) : (
            "Save"
          )}
        </button>
      )} */}
    </div>
  );
}
