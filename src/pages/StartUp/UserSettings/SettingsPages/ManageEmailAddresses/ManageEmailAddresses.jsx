import React, { useState } from "react";
import "./ManageEmailAddresses.scss";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import Modal from "../../../../../components/PopUp/Modal/Modal";

function ManageEmailAddresses() {
  const navigate = useNavigate();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  return (
    <div className="manage_account_settings">
      <h4 className="m-0 px-3 py-3 d-flex align-items-center gap-2">
        <Button
          className="back-button btn-sm  rounded-circle border-none"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={25} />
        </Button>
        Email Addresses
      </h4>
      <div className=" border-top px-3 py-3 d-flex flex-column gap-2">
        <span className="fs-6 text-secondary">Emails you've added</span>
        <span className="fs-6  fw-bold">Primary email</span>
        <span className="fs-6 ">{loggedInUser?.email}</span>
        <div>
          <Button className="add_email_btn" onClick={() => setShowModal(true)}>
            Add email address
          </Button>
        </div>
        <span className="fs-6 text-secondary">
          If you have a verification (e.g. verified work email), you can manage
          it in your
        </span>
      </div>
      {showModal && (
        <Modal>
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h4>Add another Email Address</h4>
            <IoCloseSharp size={20} onClick={() => setShowModal(false)} />
          </div>
          <span className="fs-6 text-secondary ">
            We’ll send a verification code to this email address.
          </span>
          <form>
            <fieldset>
              <legend className="px-2">Email address</legend>
              {/* <input
              type="tel"
              className="professional_form_input"
              name="Phone"
             
            /> */}
              <InputGroup>
                <Form.Control
                  // placeholder="Recipient's username"
                  type="email"
                  aria-label="Phone number"
                  aria-describedby="basic-addon2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
            Your email address helps us keep your account secure by adding an
            additional layer of verification. <br /> It also helps others, who
            already have your email address, discover and connect with you.{" "}
            <br /> You can always decide how you want your email address used.
          </span>
        </Modal>
      )}
    </div>
  );
}

export default ManageEmailAddresses;
