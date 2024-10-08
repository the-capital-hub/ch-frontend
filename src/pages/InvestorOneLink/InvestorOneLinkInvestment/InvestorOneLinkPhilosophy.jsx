import React, { useEffect } from "react";
import DefaultAvatar from "../../../Images/Chat/default-user-avatar.webp";
import "./InvestorOneLinkPhilosophy.scss";
import { useOutletContext } from "react-router-dom";
import PhilosophyDetails from "../../../components/InvestorOneLink/InvestorOneLinkPhilosophy/PhilosophyDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTheme,
  setPageTitle,
} from "../../../Store/features/design/designSlice";
import Investment from "../InvestorOneLinkProfile/Investment";

export default function InvestorOneLinkInvestment() {
  const theme = useSelector(selectTheme);
  const { company, investor } = useOutletContext();
  const {
    firstName,
    lastName,
    designation,
    location,
    profilePicture,
    investmentPhilosophy,
  } = investor || {};
  const { companyName } = company || {};
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Philosophy | The Capital Hub";
    dispatch(setPageTitle("Philosophy"));
  }, [dispatch]);

  if (!investor || !company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="investment_philosophy_wrapper mb-5">
      <h2 className="mb-3 px-3 px-xxl-0 fw-bold page_heading">
        Investment Philosophy
      </h2>

      <section className="investment_philosophy_section px-3 py-4 px-lg-4 rounded-4 border d-flex flex-column gap-4">
        <header className="d-flex flex-column flex-md-row align-items-center gap-4">
          <img
            src={profilePicture || DefaultAvatar}
            alt={`${firstName} ${lastName}` || "fullName"}
            width={"120px"}
            height={"120px"}
            className="rounded-circle"
          />

          <div className="investor-details me-md-auto text-center text-md-start">
            <h4 className="fw-semibold">
              {`${firstName} ${lastName}` || "fullName"}
            </h4>
            <p className=" fs-5 fw-light m-0">{designation || "designation"}</p>
            <p className=" fs-5 fw-light m-0">{location || "location"}</p>
          </div>
        </header>
        <p style={{ color: theme === "dark" ? "#fff" : "#000" }}>
          {investmentPhilosophy}
        </p>
      </section>
      <div
        className="main_inner-section d-flex flex-column gap-3 p-3 border rounded-2"
        style={{
          marginTop: "1rem",
          background: theme === "dark" ? "#2f2f2f" : "#f5f5f5",
        }}
      >
        <Investment canEdit={false} />
      </div>
      <div
        className="main_inner-section d-flex flex-column gap-3 p-3 border rounded-2"
        style={{
          marginTop: "1rem",
          background: theme === "dark" ? "#2f2f2f" : "#f5f5f5",
        }}
      >
        <h4
          className="typography"
          style={{ color: theme === "dark" ? "#fff" : "#000" }}
        >
          Investment Thesis
        </h4>
        {investmentPhilosophy ? (
          <PhilosophyDetails canEdit={false} theme={theme} investmentPhilosophy={investmentPhilosophy} />
        ) : (
          <p style={{ color: theme === "dark" ? "#fff" : "#000" }}>No investment philosophy details available.</p>
        )}
      </div>
    </div>
  );
}
