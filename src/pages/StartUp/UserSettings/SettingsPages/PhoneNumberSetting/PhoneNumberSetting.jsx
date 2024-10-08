import React, { useState } from "react";
import "./PhoneNumberSetting.scss";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Modal from "../../../../../components/PopUp/Modal/Modal";
import { IoCloseSharp } from "react-icons/io5";

function PhoneNumberSetting() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <div className="PhoneNumberSetting">
      <h4 className="m-0 px-3 py-3 d-flex align-items-center gap-2">
        <Button
          className="back-button btn-sm  rounded-circle border-none"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={25} />
        </Button>
        Phone numbers
      </h4>
      <div className=" border-top px-3 py-3 d-flex flex-column gap-2">
        <span className="fs-6 text-secondary">Phone numbers you've added</span>
        <span className="fs-6 text-secondary">
          These won't be displayed on your profile.
        </span>
        <div className="d-flex flex-row align-items-center ">
          <h5>IN+9876543210</h5>
          <div className="d-flex flex-row gap-2 ms-auto">
            <span className="fs-6  fw-bold">Make primary</span>
            <span className="fs-6  fw-bold">Remove</span>
          </div>
        </div>
        <div>
          <div className="py-2 d-flex flex-row align-items-center">
            <span className="fs-6  fw-bold">Use for resetting password</span>
            <div className="onboarding_switch_wrapper ms-auto">
              <div className="form-check form-switch">
                <input
                  className={`form-check-input `}
                  type="checkbox"
                  role="switch"
                />
              </div>
            </div>
          </div>

          <span className="fs-6  fw-bold ">
            If selected, you'll be able to use this number to reset your
            password
          </span>
        </div>
        <span className="fs-6 text-secondary">
          Your phone number helps us keep your account secure by adding an
          additional layer of verification. It also helps others, who already
          have your phone number, discover and connect with you. You can always
          decide how you want your phone number used
        </span>
        <Button
          className="ms-auto  add_phone_btn w-100"
          onClick={() => setShowModal(true)}
        >
          Add phone number
        </Button>
      </div>
      {showModal && (
        <Modal>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h4>Add another Mobile Number</h4>
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
                  type="text"
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
            <Button className="done w-100">Done</Button>
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

export default PhoneNumberSetting;
