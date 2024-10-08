import React, { useEffect } from "react";
import "./WebDevelopment.scss";
import serviceOneIcon from "../../../Images/service/Group 15409.svg";
import serviceThreeIcon from "../../../Images/service/Group 15406.svg";
import listIcon from "../../../Images/ListDot.svg";
import BackIcon from "../../../Images/BackIcon.svg";
import { Link } from "react-router-dom";
import webIcon from "../../../Images/service/web.png";
import inovationTechIcon from "../../../Images/service/image 59.png";
import devlopmentIcon from "../../../Images/service/image 60.png";
import applicationIcon from "../../../Images/service/image 61.png";
import isoIcon from "../../../Images/service/image 62.png";
import prototypingIcon from "../../../Images/service/image 63.png";

const WebDevelopment = () => {
  useEffect(() => {
    document.title = "Web Development Service | The Capital Hub";
  }, []);
  return (
    <>
      <div className="container webdevlopment_main_container">
        <div className="container">
          <Link to={"/service"}>
            <img src={BackIcon} alt="back" />
            Back
          </Link>
          <section className="heading_section_fund">
            <div className="title_and_image">
              <img src={serviceThreeIcon} alt="image" />
              <h2>Web Development</h2>
            </div>
            <h1>
              We offer the best
              <span style={{ color: "#FD5901" }}> services</span>
            </h1>
            <div className="para-image">
              <div className="para">
                <p className="mt-2">
                  The Capital HUB is the go-to source for startups when it comes
                  to web development, and Android and iOS development services.
                  We recognize that building a great startup begins with
                  adapting to new technology and evolving as a startup with all
                  new features.
                </p>
                <p>
                  Our team of experienced developers can help you with
                  everything from Web development to Android and iOS
                  development. With our help, you'll be able to create and
                  launch the best possible product.
                  <br />
                  So, what are you waiting for? Start your journey with Capital
                  HUB today!
                  <br />
                  <br />
                  <Link to={"/web-development/portfolio"}>
                    <button className="btn_red">
                      Go to Portfolio
                    </button>
                  </Link>
                  <br />
                  <br />
                  <br />
                  Development services offered:
                </p>
              </div>
              <div className="image-sec">
                <img src={webIcon} alt="img" />
              </div>
            </div>
          </section>

          <section className="explore_service">
            <h1 style={{ color: "#FD5901" }}>Explore</h1>
            <h1>Development services offered</h1>

            <section class="card-section row">
              <div class="card col-md-6 col-sm-12">
                <img src={inovationTechIcon} alt="text" />
                <p> Innovation/ Tech-consultants</p>
              </div>
              <div class="card col-md-6 col-sm-12">
                <img src={devlopmentIcon} alt="text" />
                <p>Website development services</p>
              </div>
              <div class="card col-md-6 col-sm-12">
                <img src={applicationIcon} alt="text" />
                <p> Android application development</p>
              </div>
              <div class="card col-md-6 col-sm-12">
                <img src={isoIcon} alt="text" />
                <p> iOS development services</p>
              </div>
              <div class="card col-md-6 col-sm-12">
                <img src={prototypingIcon} alt="text" />
                <p> Rapid prototyping model for startups</p>
              </div>
            </section>
          </section>

          <section className="list_section">
            <p>
              That's why we're here to support you every step of the way, from
              design and development to marketing and scaling. Whether you're
              starting from scratch or just need a little help getting started,
              The Capital HUB has you covered.
            </p>
            <p>
              Our team of experienced developers can help you with everything
              from Web development to Android and iOS development. With our
              help, you'll be able to create and launch the best possible
              product.
            </p>
            <p>
              So, what are you waiting for? Start your journey with The Capital
              HUB today!
            </p>
          </section>

        </div>
      </div>
    </>
  );
};

export default WebDevelopment;
