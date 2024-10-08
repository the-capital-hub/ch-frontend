import React, { useRef, useState } from "react";
import {
  ModalBSBody,
  ModalBSContainer,
  ModalBSHeader,
} from "../../../PopUp/ModalBS";
import "./SelectCommitmentModal.scss";
import SpinnerBS from "../../../Shared/Spinner/SpinnerBS";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserInvestor,
  setUserCompany,
} from "../../../../Store/features/user/userSlice";
import { addMyInterest } from "../../../../Service/user";

const commitmentOptions = ["N.A", "Soft commitment", "Due diligence phase"];

export default function SelectCommitmentModal({ interestData, founderId }) {
  const userInvestor = useSelector(selectUserInvestor);
  const dispatch = useDispatch();

  const [selectedCommitment, setSelectedCommitment] = useState(
    commitmentOptions[0]
  );
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const closeRef = useRef();

  // Handle commitment select
  function handleCommitmentSelect(e, option) {
    setSelectedCommitment(option);
  }

  // Handle Show Interest
  async function handleInterestSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let newInterestData = { ...interestData, commitment: selectedCommitment };
    // console.log("Submitted:", newInterestData);

    try {
      const { data } = await addMyInterest(userInvestor, newInterestData);
      dispatch(setUserCompany(data));
      setAlert({ success: "Interest Saved" });
      setTimeout(() => {
        setAlert(null);
        closeRef.current.click();
      }, 2000);
    } catch (error) {
      console.error("Error Saving Interest:", error);
      setAlert({ error: "Error Saving Interest! Please try again." });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="select_commitment_modal_wrapper">
      <ModalBSContainer
        id={`selectCommitmentModal${founderId._id}`}
        isStatic={false}
      >
        <ModalBSHeader title={interestData.name} closeRef={closeRef} />
        <ModalBSBody>
          <form
            onSubmit={handleInterestSubmit}
            className="d-flex flex-column gap-4"
            style={{height:"15rem"}}
          >
            <fieldset>
              <legend>Select Commitment</legend>
              <div className="dropdown">
                <button
                  className="btn commitment_form_input dropdown-toggle text-start d-flex align-items-center w-100"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {selectedCommitment}
                </button>
                <ul className={`dropdown-menu m-0 p-0 w-100`}>
                  {commitmentOptions.map((option, index) => {
                    return (
                      <li key={`${option}${index}`} className="m-0 p-0">
                        <button
                          type="button"
                          className={`btn list-btn w-100 text-start ps-3 rounded-0 ${
                            option === selectedCommitment ? "selected" : ""
                          }`}
                          onClick={(e) => handleCommitmentSelect(e, option)}
                        >
                          {option}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </fieldset>

            {/* Alerts */}
            {alert?.success && (
              <span
                className="fs-5 text-center growIn-short"
                style={{ animationDuration: "0.25s" }}
              >
                {alert.success}
              </span>
            )}
            {alert?.error && (
              <span
                className="fs-5 text-danger text-center growIn-short"
                style={{ animationDuration: "0.25s" }}
              >
                {alert.error}
              </span>
            )}

            {/* Action buttons */}
            <div className="d-flex align-items-center gap-3 ms-auto">
              <button
                type="button"
                className="btn btn-base cancel"
                data-bs-dismiss="modal"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-base save"
                disabled={loading}
              >
                {loading ? (
                  <SpinnerBS spinnerSizeClass="spinner-border-sm" />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </ModalBSBody>
      </ModalBSContainer>
    </div>
  );
}
