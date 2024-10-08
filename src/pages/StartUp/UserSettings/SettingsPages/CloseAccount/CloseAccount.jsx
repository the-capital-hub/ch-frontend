import React, { useState } from "react";
import "./CloseAccount.scss";
import { Button, InputGroup } from "react-bootstrap";
import { Form, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function CloseAccount() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="CloseAccount">
      <h4 className="m-0 px-3 py-3 d-flex align-items-center gap-2">
        <Button
          className="back-button btn-sm  rounded-circle border-none"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft size={25} />
        </Button>
        Close account
      </h4>
      <div className=" border-top px-3 py-3 d-flex flex-column gap-2">
        <span className="fs-6 text-secondary">
          Just a quick reminder, closing your account means you’ll your
          connections
        </span>
        <form>
          <fieldset>
            <legend className="px-2">Email address</legend>
            <input
              type="tel"
              className="professional_form_input"
              name="Phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
        </form>

        <div className="d-flex flex-row gap-2">
          <Button className="two_step_verification">Delete</Button>
          <Button
            className="two_step_verification"
            onClick={() => {
              setPassword("");
              setEmail("");
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CloseAccount;
