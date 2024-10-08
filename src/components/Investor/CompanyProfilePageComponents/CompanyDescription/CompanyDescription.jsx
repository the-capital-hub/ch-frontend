import React from "react";
import SpinnerBS from "../../../Shared/Spinner/SpinnerBS";
import { useDispatch, useSelector } from "react-redux";

export default function CompanyDescription({
  companyData,
  companyDescription,
  setCompanyDescription,
  isBioEditable,
  setIsBioEditable,
  submitBioHandler,
  handleDescriptionChange,
  loading,
}) {
  // fetch isInvestor
  const { isInvestor } = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();

  function handleResize(e) {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + 2 + "px";
  }

  return (
    <div
      className={`paragraph__component py-5 px-3 px-md-5 d-flex flex-column gap-4  ${
        isInvestor === "true" ? "rounded-4 border" : "rounded-4"
      } `}
      style={{ color: "var(--d-l-grey)" }}
    >
      <div className="d-flex flex-column-reverse flex-sm-row align-items-sm-center justify-content-between gap-3 gap-md-0">
        <h2>Company Description</h2>
        <span className="ms-auto">
          <div className="d-flex gap-2 justify-content-end flex-wrap flex-md-nowrap">
            <button
              type="button"
              className={`align-self-end btn-base ${
                isInvestor === "true" ? "investor" : "startup"
              } ${isBioEditable ? "btn-sm" : ""}`}
              onClick={() => {
                if (isBioEditable) {
                  setCompanyDescription(companyData.description);
                }
                setIsBioEditable(!isBioEditable);
              }}
            >
              {isBioEditable ? "Cancel" : "Edit"}
              {/* <CiEdit /> */}
            </button>
            {isBioEditable && (
              <button
                className={`align-self-end btn-base ${
                  isInvestor === "true" ? "investor" : "startup"
                } ${isBioEditable ? "btn-sm" : ""}`}
                onClick={(e) => submitBioHandler(e)}
              >
                {loading ? (
                  <SpinnerBS
                    colorClass={`${
                      isInvestor === "true" ? "text-dark" : "text-white"
                    }`}
                    spinnerSizeClass="spinner-border-sm"
                  />
                ) : (
                  "Save"
                )}
                {/* <CiSaveUp2 /> */}
              </button>
            )}
          </div>
        </span>
      </div>
      {/* <p>
              A little about myself. “Dejection is a sign of failure but it
              becomes the cause of success”. I wrote this when I was 16 years old
              and that’s exactly when I idealised the reality of life. In this
              current world, success is defined in many ways, some of which
              include money, fame and power. I believe that success is just the
              beginning of a new problem. Every step of our lives we work hard to
              solve an issue and every time we end up with a new problem.
            </p> */}
      {isBioEditable ? (
        <textarea
          value={companyDescription}
          name="bio"
          onChange={handleDescriptionChange}
          className="description_textarea p-2"
          onFocus={handleResize}
          autoFocus
          // rows={4}
        />
      ) : (
        <p className="small_typo">
          {companyDescription || "Click on edit to add company description"}
        </p>
      )}
      {/* <Link className="see__more align-self-end">See more</Link> */}
    </div>
  );
}
