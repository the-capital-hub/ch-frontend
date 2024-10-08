import React, { useState } from "react";
import "./SharingOneLinkPopUp.scss";
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  WhatsappIcon,
  EmailIcon,
  FacebookIcon,
} from "react-share";
import { HiOutlineClipboard } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { createSecretKey } from "../../../Service/user";
import { loginSuccess } from "../../../Store/features/user/userSlice";
import { selectIsMobileApp } from "../../../Store/features/design/designSlice";
import { Link } from "react-router-dom";

const SharingOneLinkPopUp = ({
  introMessage,
  oneLink,
  onClose,
  investor = false,
}) => {
  console.log(oneLink)
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();
  const [isSecretKeyAssigned, setIsSecretKeyAssigned] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobileApp = useSelector(selectIsMobileApp);

  // State for Invalid secret Key
  const [error, setError] = useState(null);
  const [pin, setPin] = useState(loggedInUser.secretKey || null);

  const shareUrl = investor
    ? "/investor/onelink/" + oneLink + "/" + loggedInUser.oneLinkId
    : "/onelink/" + oneLink + "/" + loggedInUser.oneLinkId;
  const targetAttribute = isMobileApp ? "_self" : "_blank";

  const messageForSharing = introMessage.replace(/<br\s*\/?>/g, "\n");
  const [copyStatus, setCopyStatus] = useState(""); // State for copy status

  // Function to handle copying to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => setCopyStatus("Copied!"))
      .catch(() => setCopyStatus("Copy failed"))
      .finally(() =>
        setTimeout(() => {
          setCopyStatus("");
        }, 1000)
      );
  };

  // Handle invalid Secret Key
  const handleInvalid = (value) => {
    setPin(value);
    // if value length is 0
    if (value.length === 0) {
      setError(null);
      return;
    }
    // console.log("val-->", value, /[0-9]{4}/.test(value));

    // if value length is < 4
    if (value.length < 4) {
      return;
    }

    // Test for numeric values
    if (!/[0-9]{4}/.test(value)) {
      setError("Please enter Valid 4 digit Key");
      return;
    }

    // Then
    setError(null);
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { user } = await createSecretKey(pin);
      dispatch(loginSuccess(user));
      setIsSecretKeyAssigned(true);
      setTimeout(() => {
        setIsSecretKeyAssigned(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="after_register_popup">
      <div className="popup">
        <div className="popup-content">
          <p className="text_section">{messageForSharing}</p>

          {/* Assign Secret Key */}
          {isSecretKeyAssigned && (
            <p className="success-message">Secret key assigned successfully!</p>
          )}
          <form onSubmit={handleSubmit} className="key_form">
            <fieldset className={`key rounded-2 ${"invalid"}`}>
              <legend className="key_title px-2">Assign Secret Key</legend>
              <input
                type="text"
                minLength={4}
                maxLength={4}
                pattern="[0-9]{4}"
                inputMode="numeric"
                placeholder="4 digit Key"
                required
                className="key_input"
                autoComplete="off"
                onChange={(e) => handleInvalid(e.target.value)}
                value={pin}
              />
            </fieldset>
            <em
              className="text-danger alert_text"
              style={{ fontSize: "0.75rem" }}
            >
              {error}
            </em>
            <button
              type="submit"
              className={`assign_btn ${investor ? "investor" : "startup"}`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Assign"}
            </button>
          </form>
          {/* )} */}
          <h6 style={{ color: "var(--d-l-grey)" }}>
            Click here for:{" "}
            <Link
              to={shareUrl}
              // target="_blank"
              target={targetAttribute}
              rel="noopener noreferrer"
              className="share_link"
            >
              OneLink
            </Link>
          </h6>

          <h4 style={{ color: "var(--d-l-grey)" }}>Share this details via</h4>
          <div className="share-buttons d-flex justify-content-center align-items-center position-relative">
            {/*<FacebookShareButton
              url={`${shareUrl} \nSecret Key: ${loggedInUser.secretKey}`}
              quote={messageForSharing}
            >
              <FacebookIcon size={32} round />
        </FacebookShareButton>*/}
            <WhatsappShareButton
              url={`\nHere is Our OneLink : https://thecapitalhub.in${shareUrl} \nSecret Key: ${loggedInUser.secretKey}`}
              title={messageForSharing}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <EmailShareButton
              url={`${shareUrl} \nSecret Key: ${loggedInUser.secretKey}`}
              body={messageForSharing}
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
            {/* Clipboard icon */}
            <HiOutlineClipboard
              size={32}
              style={{
                minWidth: "32px",
                color: "var(--d-l-grey)",
              }}
              onClick={() =>
                copyToClipboard(
                  `${messageForSharing} \nHere is Our OneLink: https://thecapitalhub.in${shareUrl} \nSecret Key: ${loggedInUser.secretKey}`
                )
              }
            />
            {copyStatus && (
              <p className="position-absolute bg-white rounded m-0 border shadow px-3 py-2">
                {copyStatus}
              </p>
            )}
          </div>

          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default SharingOneLinkPopUp;
