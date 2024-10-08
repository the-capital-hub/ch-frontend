import React, { useState } from "react";
import "./ChangePassword.scss";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function ChangePassword() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const [retype, setRetype] = useState("");
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
        Change password
      </h4>
      <div className=" border-top px-3 py-3 d-flex flex-column gap-2">
        <span className="fs-6 text-secondary">
          Create a new password that is at least 8 characters long.
        </span>
        <span className="fs-6 text-secondary">
          What makes a strong password?
        </span>

        <form>
          <fieldset>
            <legend className="px-2">Current Password</legend>
            <input
              type="password"
              className="professional_form_input"
              name="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
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

          <fieldset>
            <legend className="px-2">Retype Password</legend>
            <input
              type="password"
              className="professional_form_input"
              name="password"
              value={retype}
              onChange={(e) => setRetype(e.target.value)}
            />
          </fieldset>
        </form>

        <Button className="  forgotpassword">Done</Button>
      </div>
    </div>
  );
}

export default ChangePassword;
