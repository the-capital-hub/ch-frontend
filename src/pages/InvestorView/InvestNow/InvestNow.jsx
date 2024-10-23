import React, { useState, useEffect } from "react";
import { Input, ThankYouModal } from "../../../components/InvestorView";
import { useNavigate } from "react-router-dom";
import "./InvestNow.scss";
import { useParams } from "react-router-dom";
import { getUserById } from "../../../Service/user";
import SpinnerBS from "../../../components/Shared/Spinner/SpinnerBS";
import { useSelector } from "react-redux";
import SubcriptionPop from "../../../components/PopUp/SubscriptionPopUp/SubcriptionPop";
import emailjs from "emailjs-com"; // Import EmailJS

const InvestNow = ({ page }) => {
  const [user, setUser] = useState({});
  const { username } = useParams();
  const [popPayOpen, setPopPayOpen] = useState(false);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  useEffect(() => {
    document.title = "Invest Now - OneLink | The Capital Hub";
    getUserById(username)
      .then(({ data }) => {
        setUser(data);
      })
      .catch(() => setUser({}));
  }, [username]);

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // State variables to store input data
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [commitmentAmount, setCommitmentAmount] = useState("");

  const handleSubmit = () => {
    setLoading(true);
    const templateParams = {
      from_name: fullName,
      from_email: email,
      from_mobile: mobileNumber,
      commitment_amount: commitmentAmount,
    };

    emailjs.send('service_0jwzlw5', 'template_diknlz3', templateParams, 'dGUx-9NH42p_jnnBx')
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
        setShowModal(true);
        setLoading(false);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error('Failed to send email:', error);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="investNow">
        {showModal && <ThankYouModal onCancel={() => setShowModal(false)} />}
        <div className="investNowContainer shadow-sm">
          {page === "onePager" ? (
            <>
              <p>Contact Details</p>
              <div className="inputs">
                <Input
                  type={"text"}
                  placeholder={"Full Name"}
                  value={user.firstName + " " + user.lastName}
                />
                <Input
                  type={"text"}
                  placeholder={"Mobile number"}
                  value={user.phoneNumber}
                />
                <Input
                  type={"email"}
                  placeholder={"Email Id"}
                  value={user.email}
                />
                <select
                  className="select-commit"
                  value={commitmentAmount}
                  onChange={(e) => setCommitmentAmount(e.target.value)}
                >
                  <option value="">Commitment Amount</option>
                  <option value="₹1L - ₹2.5L">₹1L - ₹2.5L</option>
                  <option value="₹2.5L - ₹5L">₹2.5L - ₹5L</option>
                  <option value="₹5L - ₹10L ">₹5L - ₹10L </option>
                  <option value="₹10 - ₹25L">₹10 - ₹25L</option>
                  <option value="₹25L - ₹50L">₹25L - ₹50L</option>
                </select>
              </div>
            </>
          ) : (
            <>
              <p style={{ fontSize: "1.5rem" }}>Contact Details</p>
              <div className="inputs">
                <Input
                  type={"text"}
                  placeholder={"Full Name"}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <Input
                  type={"tel"}
                  placeholder={"Mobile number"}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <Input
                  type={"email"}
                  placeholder={"Email Id"}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <select
                  className="select-commit"
                  value={commitmentAmount}
                  onChange={(e) => setCommitmentAmount(e.target.value)}
                >
                  <option value="">Commitment Amount</option>
                  <option value="₹1L - ₹2.5L">₹1L - ₹2.5L</option>
                  <option value="₹2.5L - ₹5L">₹2.5L - ₹5L</option>
                  <option value="₹5L - ₹10L ">₹5L - ₹10L </option>
                  <option value="₹10 - ₹25L">₹10 - ₹25L</option>
                  <option value="₹25L - ₹50L">₹25L - ₹50L</option>
                </select>
                {isSubmitted ? (
                  <button>Submitted</button>
                ) : (
                  <button onClick={handleSubmit}>
                    {loading ? (
                      <SpinnerBS
                        colorClass={"text-light"}
                        spinnerSizeClass="spinner-border-sm"
                      />
                    ) : (
                      "Show Interest"
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {popPayOpen && (
        <SubcriptionPop popPayOpen={popPayOpen} setPopPayOpen={setPopPayOpen} />
      )}
    </>
  );
};

export default InvestNow;
