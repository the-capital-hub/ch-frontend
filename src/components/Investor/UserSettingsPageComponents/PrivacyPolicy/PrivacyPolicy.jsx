import React from "react";
import "./PrivacyPolicy.scss";
import { selectIsInvestor } from "../../../../Store/features/user/userSlice";
import { useSelector } from "react-redux";

export default function PrivacyPolicy() {
  const isInvestor = useSelector(selectIsInvestor);

  return (
    <>
      <div className=" term_of_service_container py-5 px-5 ">
        <section className="title_section ">
          <h1 className="term_title">
            Terms and Conditions (T&C) for The Capital Hub
          </h1>
          <h6 className={`updated_text${isInvestor ? "investor" : "startup"}`}>
            Last Updated: Aug 30 ,2023
          </h6>
        </section>

        <section className="accept_the_term_section">
          <h2 className="heading_with_line_one">1. Acceptance of Terms:</h2>
          <p>
            Welcome to The Capital Hub. By accessing and using our services, you
            agree to comply with and be bound by these Terms and Conditions, our
            Privacy Policy, and any other applicable laws and regulations. If
            you do not agree with these terms, please refrain from using our
            services.
          </p>
        </section>

        <section className="accept_the_term_section">
          <h2 className="heading_with_line_two">2. User Accounts:</h2>
          <ul>
            <li>
              <b> 2.1.</b> In order to use certain features of our services, you
              may need to create an account. You are responsible for maintaining
              the confidentiality of your account information and for all
              activities that occur under your account.
            </li>
            <li>
              <b> 2.2. </b>You agree to provide accurate and up-to-date
              information when creating an account. You are solely responsible
              for the accuracy of the information you provide.
            </li>
          </ul>
          <h2 className="heading_with_line_two">3. Intellectual Property:</h2>
          <p>
            {" "}
            All content and materials provided through our services are
            protected by intellectual property laws and belong to The Capital
            Hub or its licensors. You may not reproduce, distribute, modify, or
            create derivative works based on such content without our explicit
            consent.
          </p>
          <h2 className="heading_with_line_two">4. Use of Services:</h2>
          <p>
            You agree to use our services only for lawful purposes and in
            accordance with these Terms and Conditions. You shall not engage in
            any activity that could harm, disrupt, or interfere with the
            functioning of our services.
          </p>
          <h2 className="heading_with_line_two">5. Limitation of Liability:</h2>

          <p>
            The Capital Hub shall not be liable for any direct, indirect,
            incidental, consequential, or exemplary damages arising from the use
            or inability to use our services.
          </p>

          <h2 className="heading_with_line_two">6. Governing Law:</h2>
          <p>
            These Terms and Conditions shall be governed by and construed in
            accordance with the laws of [Your Jurisdiction]. Any disputes
            arising under or in connection with these terms shall be subject to
            the exclusive jurisdiction of the courts in [Your Jurisdiction].
          </p>

          <h2 className="heading_with_line_two">
            Privacy Policy for Capital Hub
          </h2>

          <h2 className="heading_with_line_two">1. Information We Collect:</h2>
          <ul>
            <li>
              <b> 1.1.</b> We collect personal information that you provide to
              us when using our services. This includes but is not limited to,
              your name, email address, and contact details.
            </li>
            <li>
              <b> 1.2.</b> We also collect non-personal information such as
              usage data, analytics, and cookies to improve our services and
              enhance user experience.
            </li>
          </ul>
          <h2 className="heading_with_line_two">
            2. How We Use Your Information:
          </h2>
          <ul>
            <li>
              <b> 2.1.</b> We use your personal information to provide and
              improve our services, communicate with you, and ensure the
              security of your account.
            </li>
            <li>
              <b>2.2. </b>We may use non-personal information for analytical
              purposes, to better understand user behaviour, and to enhance our
              services.
            </li>
          </ul>
          <h2 className="heading_with_line_two">3. Sharing of Information:</h2>
          <p>
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information with trusted service
            providers who assist us in operating our services.
          </p>
          <h2 className="heading_with_line_two">4. Data Security:</h2>
          <p>
            We take reasonable measures to protect your information from
            unauthorised access, loss, misuse, or alteration. However, no data
            transmission over the internet is guaranteed to be completely
            secure.
          </p>

          <h2 className="heading_with_line_two">
            5. Changes to Privacy Policy:
          </h2>
          <p>
            . We reserve the right to modify this Privacy Policy at any time.
            Changes will be effective upon posting to our website.
          </p>

          <h2 className="heading_with_line_two">6. Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy,
            please contact us at [Contact Information].
          </p>
        </section>

        <section className="button_section ">
          <button
            className={`decline_btn${isInvestor ? "investor" : "startup"}`}
          >
            Decline
          </button>
          <button
            className={`accept_btn${isInvestor ? "investor" : "startup"}`}
          >
            Accept
          </button>
        </section>
      </div>
    </>
  );
}
