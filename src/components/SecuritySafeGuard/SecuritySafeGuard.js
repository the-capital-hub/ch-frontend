import React from "react";
import "./SecuritySafeGuard.scss";

const SecuritySafeGuard = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="container ssg_container">
          <section className="title_section">
            <h1 className="term_title">Security Safeguards</h1>
            <p>
              At Capital Hub, we prioritise the security of your data and are
              dedicated to maintaining a safe environment for our users. We have
              implemented a range of security measures to protect your
              information, ensuring your peace of mind while using our platform.
            </p>
          </section>
          <section className="title__section">
            <h2 className="heading_with_line_one">
              1. Robust Security Measures
            </h2>
            <p>
              We have established stringent security protocols to safeguard your
              data from unauthorised access, disclosure, alteration, or
              destruction. Our measures include:
            </p>

            <ul>
              <li>
                Data Encryption: We use industry-standard encryption
                technologies to secure data transmission and storage, ensuring
                that your information remains confidential.
              </li>
              <li>
                Access Control: Access to your personal data is restricted to
                authorised personnel only, and strict authentication processes
                are in place to verify their identity.
              </li>
              <li>
                Regular Audits: We conduct regular security audits and
                assessments to identify vulnerabilities and promptly address any
                potential risks
              </li>
            </ul>
            <h2 className="heading_with_line_one">2. Service Providers</h2>
            <p>
              We work with trusted third-party service providers to enhance our
              platform's functionality. These providers adhere to strict
              security standards and practices, ensuring that your data remains
              protected. They are contractually bound to use your data only for
              authorised purposes.
            </p>

            <h2 className="heading_with_line_one">3. Analytics</h2>
            <p>
              We utilise analytics tools to better understand user behaviour and
              improve our services. These tools help us identify trends, enhance
              user experience, and ensure the platform's security. Your data
              used for analytics purposes is anonymized and aggregated to
              protect your privacy.
            </p>
            <h2 className="heading_with_line_one">4. Security of Data</h2>
            <p>
              We have established comprehensive security protocols to maintain
              the integrity and confidentiality of your data:
            </p>
            <ul>
              <li>
                Regular Updates: We keep our systems up to date with the latest
                security patches and updates to safeguard against potential
                vulnerabilities.
              </li>
              <li>
                Firewalls and Intrusion Detection: Our network is protected by
                firewalls and intrusion detection systems to prevent
                unauthorised access.
              </li>
              <li>
                Backup and Recovery: Regular data backups are performed to
                ensure that your information can be recovered in case of
                unexpected incidents.
              </li>
            </ul>

            <h2 className="heading_with_line_one">User Responsibilities</h2>
            <p>
              While we implement robust security measures, you also play a
              crucial role in ensuring your data's security:
            </p>
            <ul>
              <li>
                Strong Passwords: Use strong, unique passwords for your Capital
                Hub account and update them regularly.
              </li>
              <li>
                Account Security: Keep your account credentials confidential and
                avoid sharing them with others.
              </li>
              <li>
                Device Security: Ensure the security of the devices you use to
                access Capital Hub by using updated antivirus software and
                secure network connections.
              </li>
            </ul>

            <h2 className="heading_with_line_one">
              6. Reporting Security Concerns
            </h2>

            <p>
              If you come across any suspicious activity or security concerns
              while using Capital Hub, please report them promptly to our
              dedicated security team at [security email].
            </p>
          </section>
        </div>
      </div>
    </>
  );
};

export default SecuritySafeGuard;
