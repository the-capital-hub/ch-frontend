import React, { useEffect } from "react";
import "./StartupConsulting.scss";
import serviceTwoIcon from "../../../Images/service/Group 15405.svg";
import BackIcon from "../../../Images/BackIcon.svg";
import { Link } from "react-router-dom";
import listIcon from "../../../Images/ListDot.svg";

const StartupConsulting = () => {
  useEffect(() => {
    document.title = "Start Up Counselling Service | The Capital Hub";
  }, []);
  return (
    <>
      <div className="container startup-consulting_main_container ">
        <div className="container">
          <Link to={"/service"}>
            <img src={BackIcon} alt="back" />
            Back
          </Link>
          <section className="heading_section_fund">
            <h1>
              We offer the best
              <span style={{ color: "#FD5901" }}> services</span>
            </h1>

            <div className="title_and_image">
              <img src={serviceTwoIcon} alt="image" />
              <h2>Startup Consulting / CXO Services</h2>
            </div>

            <p className="mt-4">
              The Capital HUB is building a better working world by realizing
              business transformation through the power of people, technology,
              and innovation. <br />
              By using these three pillars, we are able to create a more
              efficient and effective workplace for all our portfolio startups.
              We believe that by empowering founders, we can create a dynamic
              and innovative Startup culture. Our technology infrastructure
              allows us to stay ahead of the curve, and our innovation
              capabilities help us stay innovative and competitive.
              <br />
              The nature of startups is evolving quickly, we're all being asked
              to adopt new technology, management style, and smart executions-
              to be more innovative, more agile, more collaborative, and more
              everything.
            </p>
            <p>
              <b>Reframe the future and ask new and different questions: </b>
              <br />
              How do you create customer intimacy as the core of your business?
              Where does team centricity meet the future of work?
              <br /> How can technology at speed create a competitive advantage?
              <br /> Where does innovation at scale meet the exponential curve
              for growth and scalability? <br />
              By placing customers as the core, leveraging adaptive technology
              at a pace, and enabling innovation at scale, our startups are
              transforming to realize long-term value for startups, businesses,
              and society as a whole.
            </p>
          </section>

          <section className="list_section">
            <ul>
              <li>
                <img src={listIcon} alt="image" />
                <div>Situational Analysis</div>{" "}
              </li>

              <li>
                <img src={listIcon} alt="image" />
                <div>Competitor Analysis</div>{" "}
              </li>

              <li>
                <img src={listIcon} alt="image" />
                <div>SWOT Brand Positioning</div>{" "}
              </li>

              <li>
                <img src={listIcon} alt="image" />
                <div>Goal Setting along with KPIs</div>{" "}
              </li>

              <li>
                <img src={listIcon} alt="image" />
                <div>User Persona Research</div>{" "}
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Marketing Communications Audit</div>{" "}
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Digital Audit - SEO, Content, and Social Media</div>{" "}
              </li>
              <li>
                <img src={listIcon} alt="image" />
                <div>Strategy Consulting and GTM Roadmap</div>{" "}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default StartupConsulting;
