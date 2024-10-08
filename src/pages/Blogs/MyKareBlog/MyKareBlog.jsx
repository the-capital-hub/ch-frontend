import "./MyKareBlog.scss";
import { useEffect } from "react";

import fbIcon from "../../../Images/blog/typcn_social-facebook.svg";
import twIcon from "../../../Images/blog/typcn_social-twitter.svg";
import inIcon from "../../../Images/blog/typcn_social-instagram.svg";
import Pramod from "../../../Images/aboutUs/Pramod.jpeg";
import { Link } from "react-router-dom";

function MyKareBlog() {
  useEffect(() => {
    document.title =
      "Empowering Patient Care: Mykare Health's Innovative Approach to HealthTech | Blog | The Capital Hub";
  }, []);
  window.scrollTo({ top: 0, behavior: "smooth" });

  let loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    loggedInUser = JSON.parse(loggedInUser);
  }
  return (
    <>
      <div className="container blog_detailed_container">
        <div className="category_section">
          <span className="blog">Blog</span> {"> "}
          <span className="category">Health Tech</span>
        </div>
        <hr />

        <div className="row">
          <div className="col-lg-12 col-md-12 seventy ">
            <h2 className="headingOne">
              Empowering Patient Care: Mykare Health's Innovative Approach to
              HealthTech
            </h2>

            <div className="time_icon w-">
              <div className="d-flex flex-row align-items-center">
                <Link
                  to={
                    loggedInUser
                      ? loggedInUser?.isInvestor === "true"
                        ? "/investor/user/pramod-badiger/184455"
                        : "/user/pramod-badiger/184455"
                      : "/author-profile/pramod-badiger/184455"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dark text-decoration-none"
                >
                  <img
                    className="user rounded-pill mx-2 object-fit-cover"
                    src={Pramod}
                    alt="img"
                    width={60}
                    height={60}
                  />
                </Link>
                <div className="py-2">
                  <Link
                    to={
                      loggedInUser
                        ? loggedInUser?.isInvestor === "true"
                          ? "/investor/user/pramod-badiger/184455"
                          : "/user/pramod-badiger/184455"
                        : "/author-profile/pramod-badiger/184455"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark text-decoration-none"
                  >
                    <p className="m-0">
                      <b>Pramod Badiger</b>
                    </p>
                  </Link>
                  <span>Published on September 20, 2023</span>
                </div>
              </div>

              <div className="social_icon_container d-flex flex-row justify-content-end">
                <img className="social_icon" src={fbIcon} alt="img" />
                <img className="social_icon" src={twIcon} alt="img" />
                <img className="social_icon" src={inIcon} alt="img" />
              </div>
            </div>
            <div className="col-12 image_section">
              <div className="d-flex">
                {/* <img
                  src={}
                  width={"100%"}
                  style={{ maxWidth: "600px", objectFit: "contain" }}
                  className="mx-auto my-lg-3"
                  alt="img"
                /> */}
              </div>
              <u>Introduction:</u>
              <p>
                In the rapidly evolving healthcare landscape, Mykare Health has
                emerged as a pioneering company that is leveraging advanced
                technologies to transform patient care. With a focus on
                healthtech solutions, Mykare Health is redefining the way
                healthcare services are delivered, leading to improved outcomes,
                patient satisfaction, and overall well-being. In this blog, we
                will explore how Mykare Health is utilising various technical
                advancements to revolutionise the healthcare industry.
              </p>

              <u>Company Background</u>
              <p>
                Mykare Health primarily helps in researching and panelling
                specialist doctors and quality hospitals, zero cost EMI,
                end-to-end operational support for prompt and reliable
                healthcare services. Its core focus is planning and managing
                elective surgeries across major disciplines, including
                orthopaedic and vascular care, urology, proctology, laparoscopic
                procedures, ophthalmology and cosmetic surgery.
              </p>
              <p>
                Mykare Health operates at a hyperlocal level in Tier 1 and 2
                cities in South India. “About 99% of our patients are locals,
                mostly within the radius of 10 Km of network hospitals. However,
                we also cater to inter-city/town patients,” explained Sam.
                Currently, Mykare Health is operational in 12 Indian cities,
                including Pune, Kochi, Chennai, Bengaluru, Hyderabad and
                Visakhapatnam.
              </p>
              <div className="d-flex">
                <img
                  src="https://res.cloudinary.com/drjt9guif/image/upload/v1695211021/TheCapitalHub/blogs/mykare-founder_x0mxk5.png"
                  width={"100%"}
                  style={{ maxWidth: "400px", objectFit: "contain" }}
                  className="mx-auto my-lg-3"
                  alt="img"
                />
              </div>
              <u>Mr. Senu Sam Founder & CEO of Mykare Health</u>
              <p>
                In the fast-paced world of healthcare, innovation is key to
                addressing the diverse needs of patients and improving the
                overall quality of care. And at the forefront of this
                revolutionary movement stands Mykare Health, a groundbreaking
                company spearheaded by the visionary Founder and CEO, Mr. Senu
                Sam.
              </p>
              <p>
                With an unwavering commitment to revolutionising the healthcare
                industry, Mykare Health has been making waves with its
                innovative approach to patient care. Headed by Mr. Senu Sam, a
                renowned and highly respected figure in the field, the company
                has already made a significant impact on the lives of countless
                individuals.
              </p>

              <u>Mykare Health's Platform:</u>
              <p>
                Mykare Health's platform connects patients with a network of
                qualified doctors, nurses, and other healthcare professionals.
                Patients can use the platform to book appointments, consult with
                doctors online, and order medications. Mykare Health also offers
                a variety of other services, such as diagnostic tests, health
                packages, and home care services.
              </p>

              <u>Mykare Health's Impact on Patient Care:</u>
              <p>
                Mykare Health is empowering patients by giving them more control
                over their healthcare. Patients can now access high-quality
                healthcare from the comfort of their own homes, without having
                to wait in long queues or travel to hospitals.
              </p>
              <p>
                Mykare Health is also making healthcare more affordable. The
                company's platform offers a variety of affordable services, and
                it also partners with insurance companies to provide cashless
                payments.
              </p>

              <u>Benefits of Mykare Health:</u>
              <ul>
                <li>
                  Convenient and accessible healthcare: Patients can access
                  healthcare from anywhere, anytime, without having to wait in
                  long queues or travel to hospitals.
                </li>
                <li>
                  Affordable healthcare: Mykare Health offers a variety of
                  affordable services, and it also partners with insurance
                  companies to provide cashless payments.
                </li>
                <li>
                  High-quality healthcare: Mykare Health has a network of
                  qualified doctors, nurses, and other healthcare professionals
                  who provide high-quality healthcare services.
                </li>
                <li>
                  Personalised care: Mykare Health's platform provides patients
                  with personalised care based on their individual needs.
                </li>
              </ul>

              <u>How to Get Started with Mykare Health:</u>
              <p>
                To get started with Mykare Health, simply visit the company's
                website and create an account. Once you have created an account,
                you can start booking appointments, consulting with doctors
                online, and ordering medications.
              </p>
              <p>
                Mykare Health is making healthcare more accessible, affordable,
                and convenient for everyone. If you are looking for a way to
                improve your healthcare experience, be sure to check out Mykare
                Health.
              </p>

              <ul className="blog-references">
                <h6>Head over to : </h6>
                <li>
                  <a href="https://mykarehealth.com/">mykarehealth.com</a>
                </li>
                <li>
                  <a
                    href="https://www.cxotoday.com/interviews/with-accessible-and-affordable-patient-centric-technology-mykare-health-is-revolutionizing-healthcare-in-india/
"
                  >
                    CXOToday Interview
                  </a>
                </li>
                <li>
                  <a href="https://inc42.com/startups/how-healthtech-startup-mykare-health-is-uplifting-patient-experience-and-empowering-small-medium-hospitals/">
                    INC42 - MyKare Health
                  </a>
                </li>
              </ul>

              {/* About the Author */}
              <h2 className="inside_seventy_heading">About the author :</h2>
              <p>
                <b>Pramod Badiger</b> is a dynamic entrepreneur and the{" "}
                <b>founder and CEO of The Capital HUB.</b> The Capital HUB is a
                company that helps startups raise angel investments and helps
                investors invest in high-growth startups. As a founder, Pramod
                is passionate about connecting startups with potential investors
                and providing them with the resources and support they need to
                succeed. He is also building an angel networking platform to
                bridge the gap between startups and angel investors, making it
                easier for them to connect and collaborate. With his deep
                understanding of the startup ecosystem and his ability to
                identify and capitalize on new opportunities, Pramod is
                well-positioned to lead Capital HUB to success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyKareBlog;
