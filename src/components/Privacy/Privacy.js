import React from "react";
import "./Privacy.scss";

const Privacy = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="container privacy_container">
          <section className="title_section">
            <h1 className="term_title">
              Terms and Conditions (T&C) and Privacy Policy for Capital Hub
            </h1>
          </section>

          <section className="accept_the_term_section">
            <h2 className="heading_with_line_one">
              Privacy Policy: Your Privacy Matters
            </h2>
            <p>
              Welcome to Capital Hub ("us," "we," or "our"). We are committed to
              protecting your privacy and ensuring the security of your personal
              information. This Privacy Policy outlines how we collect, use,
              share, and protect your data when you use our services. By
              accessing or using Capital Hub, you agree to the terms outlined in
              this policy.
            </p>
          </section>

          <section className="accept_the_term_section">
            <h2 className="heading_with_line_two">1. Data We Collect</h2>
            <ul>
              <li>
                <b>Registration Information:</b> When you sign up for Capital Hub, we
                collect your name, email address, and other necessary details.
              </li>
              <li>
               <b> Profile Information:</b>You have the option to provide additional
                information to create a professional profile. This may include
                your photo, professional experience, skills, and other relevant
                information.
              </li>
              <li>
              <b> Usage Information:</b> We gather data about how you interact with our
                platform, including the content you view, your connections, and
                your interactions with other users.
              </li>
              <li>
              <b>Communication: </b>We may collect information from your
                communications on Capital Hub, such as messages and posts.
              </li>
              <li>
              <b> Cookies and Tracking Technologies: </b>We use cookies and similar
                technologies to collect data about your usage patterns and
                preferences.
              </li>

              <li>
              <b>Device and Location Information:</b> We collect data about the device
                you use to access our services and your approximate location.
              </li>
            </ul>
            <h2 className="heading_with_line_two">2. How We Use Your Data</h2>
            <p>
              We use your data to provide, personalise, and improve our
              services, including: Creating and maintaining your profile.
              Connecting you with other professionals and opportunities. Sending
              you relevant content, updates, and notifications. Analysing usage
              patterns to improve our platform.
            </p>

            <h2 className="heading_with_line_two">
              3. How We Share Information
            </h2>
            <p>We may share your data with:</p>
            <ul>
              <li>
              <b> Other Users:</b> Your profile information, connections, and
                interactions are visible to other users according to your
                settings.
              </li>
              <li>
              <b> Third-Party Service Providers: </b> We work with service providers to
                assist in various aspects of our business, such as analytics and
                customer support.
              </li>
              <li>
              <b> Legal Requirements: </b> We may disclose your data to comply with
                legal obligations or protect our rights.
              </li>
            </ul>

            <h2 className="heading_with_line_two">
              4. Your Choices and Obligations
            </h2>
            <ul>
              <li>
               <b> Profile Settings:</b>You can control the information you share and
                who can see it through your account settings.{" "}
              </li>
              <li>
                <b>Communication Preferences:</b>You can manage your communication
                preferences to control the messages you receive from us.{" "}
              </li>
              <li>
               <b> Data Access and Deletion:</b> You can request access to your data or
                ask us to delete it by contacting us.
              </li>
            </ul>
            <h2 className="heading_with_line_two">
              5. Other Important Information
            </h2>
            <ul>
              <li>
                <b>Security:</b> We take measures to protect your data, but no system
                is completely secure. Please use strong passwords and keep your
                account information confidential.
              </li>
              <li>
                <b>Children's Privacy: </b>Capital Hub is not intended for individuals
                under the age of 18.
              </li>
              <li>
               <b> Changes to this Policy:</b> We may update this policy as our
                services evolve. We will notify you of significant changes.
              </li>
            </ul>
          </section>

         
        </div>
      </div>
    </>
  );
};

export default Privacy;
