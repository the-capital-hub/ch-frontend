import React from "react";
import AccountAccess from "./AccountAccess/AccountAccess";

export default function SignInAndSecurity({ setActiveTab }) {
  return (
    <div className="signInAndSecurity-wrapper d-flex flex-column gap-2">
      <AccountAccess setActiveTab={setActiveTab} />
    </div>
  );
}
