import React, { useState } from "react";
import "./TwoStepVerification.scss";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { GoShieldLock } from "react-icons/go";
import { CiMobile4 } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";

import Modal from "../../../../../components/PopUp/Modal/Modal";

function TwoStepVerification() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="TwoStepVerification">
      <h4 className="m-0 px-3 py-3 d-flex align-items-center gap-2">
        <Button
          className="back-button btn-sm  rounded-circle border-none"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={25} />
        </Button>
        Two step verification
      </h4>
      <div className=" border-top px-3 py-3 d-flex flex-column gap-2">
        <span className="fs-6 text-secondary">
          Secure your Capital Hub account with two-step verification.
        </span>
        <span className="fs-6 text-secondary d-flex flex-row gap-2">
          <GoShieldLock size={30} />
          Two step verification gives you additional security by requiring a
          verification code whenever you sign in on new device.
        </span>

        <span className="fs-6 text-secondary d-flex flex-row gap-2 pb-auto">
          <CiMobile4 style={{ width: "90px", height: "50px" }} />
          Your phone number or Authenticator App helps us keep your account
          secure by adding an additional layer of verification. Your phone
          number also helps others, who already have your phone number, discover
          and connect with you. You can always decide how you want your phone
          number used.
        </span>

        <div>
          <Button
            className="two_step_verification"
            onClick={() => setShowModal(true)}
          >
            Set Up
          </Button>
        </div>
      </div>
      {showModal && (
        <Modal>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h4>Verify using mobile number</h4>
            <IoCloseSharp size={20} onClick={() => setShowModal(false)} />
          </div>
          <span className="fs-6 text-secondary ">
            We’ll send a verification code to this number.
          </span>
          <form>
            <fieldset>
              <legend className="px-2">Phone number</legend>
              {/* <input
              type="tel"
              className="professional_form_input"
              name="Phone"
             
            /> */}
              <InputGroup>
                <Form.Control
                  // placeholder="Recipient's username"
                  className=""
                  aria-label="Phone number"
                  aria-describedby="basic-addon2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Button
                  className=""
                  variant="outline-secondary"
                  id="button-addon2"
                >
                  Verify
                </Button>
              </InputGroup>
            </fieldset>

            <fieldset>
              <legend className="px-2">Password</legend>
              <input
                type="password"
                className="professional_form_input"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
            <Button className="sent_code w-100">Done</Button>
          </form>
          <span className="fs-6 text-secondary py-2">
            Your phone number helps us keep your account secure by adding an
            additional layer of verification. <br /> It also helps others, who
            already have your phone number, discover and connect with you.{" "}
            <br /> You can always decide how you want your phone number used.
          </span>
        </Modal>
      )}
    </div>
  );
}

export default TwoStepVerification;
