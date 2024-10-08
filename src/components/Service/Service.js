import React, { useEffect, useState } from "react";
import "./service.scss";
import serviceSixIcon from "../../Images/service/Group 15404.svg";
import serviceTwoIcon from "../../Images/service/Group 15405.svg";
import serviceThreeIcon from "../../Images/service/Group 15406.svg";
import serviceFourIcon from "../../Images/service/Group 15407.svg";
import serviceFiveIcon from "../../Images/service/Group 15408.svg";
import imageReview from "../../Images/service/Rectangle 1980.png";
import serviceOneIcon from "../../Images/service/Group 15409.svg";
import leftIcon from "../../Images/service/Arrow---Left-Circle.svg";
import rightIcon from "../../Images/service/Arrow---Right-Circle.svg";
import { useNavigate, useNavigation } from "react-router-dom";

const Service = () => {
  const [showMore, setShowMore] = useState(false);

  const handleReadMoreClick = (route) => {
    navigate(route);
    setShowMore(!showMore);
  };
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Services | The Capital Hub";
  }, []);
  return (
    <>
      <div className="container-fluid service_main_container">
        <div className="container">
          <section className="heading_section">
            <h1>
              We offer the best
              <span style={{ color: "#FD5901" }}> services</span>
            </h1>
            <p>
              The Capital HUB provides a 360-degree approach to building a great
              Startup. We work with startups on Raising Angel investments, Pitch
              deck creation, Financials, Business plans, Brand management,
              Growth model, Software development, Marketing, and Compliance
              services.
            </p>
          </section>
          <section className="our_service">
            <h1>Our Services</h1>
            <div className="list_container">
              <div className="number_section">01</div>
              <div className="content_and_text">
                <img src={serviceOneIcon} alt="img" />
                <div className="text_container">
                  <h5>Fundraising</h5>
                  <p>
                    With a closed curated network of over 1000+ angels, Capital
                    HUB is now your one-stop destination for all your
                    fundraising needs.{" "}
                  </p>
                  <button
                    onClick={() => handleReadMoreClick("/fundraising")}
                    className="read_more"
                  >
                    Read more >>
                  </button>
                </div>
              </div>
            </div>
            <hr />

            <div className="list_container ">
              <div className="number_section">02</div>
              <div className="content_and_text">
                <img src={serviceFiveIcon} alt="img" />
                <div className="text_container">
                  <h5>Pitch Deck</h5>
                  <p>
                    The Capital HUB offers elegant pitch deck design and
                    professional support to startups.
                  </p>
                  <button
                    onClick={() => handleReadMoreClick("/pitch-deck")}
                    className="read_more"
                  >
                    Read more >>
                  </button>
                </div>
              </div>
            </div>
            <hr />

            <div className="list_container ">
              <div className="number_section">03</div>
              <div className="content_and_text">
                <img src={serviceFourIcon} alt="img" />
                <div className="text_container">
                  <h5>Financials Documentation</h5>
                  <p>
                    Financial projections are one of the most crucial elements
                    of any business plan, and they can have a big impact on your
                    business's success.
                  </p>
                  <button
                    onClick={() => handleReadMoreClick("/financials-document")}
                    className="read_more"
                  >
                    Read more >>
                  </button>
                </div>
              </div>
            </div>
            <hr />

            <div className="list_container ">
              <div className="number_section">04</div>
              <div className="content_and_text">
                <img src={serviceThreeIcon} alt="img" />
                <div className="text_container">
                  <h5>Web Development</h5>
                  <p>
                    The Capital HUB is the go-to source for startups when it
                    comes to Web development, and Android and iOS development
                    services.
                  </p>
                  <button
                    onClick={() => handleReadMoreClick("/web-development")}
                    className="read_more"
                  >
                    Read more >>
                  </button>
                </div>
              </div>
            </div>
            <hr />

            <div className="list_container ">
              <div className="number_section">05</div>
              <div className="content_and_text">
                <img src={serviceTwoIcon} alt="img" />
                <div className="text_container">
                  <h5>Startup Consulting / CXO Services</h5>
                  <p>
                    The Capital HUB is building a better working world by
                    realizing business transformation through the power of
                    people, technology, and innovation.
                  </p>
                  <button
                    onClick={() => handleReadMoreClick("/sturtup-consulting")}
                    className="read_more"
                  >
                    Read more >>
                  </button>
                </div>
              </div>
            </div>
            <hr />

            <div className="list_container ">
              <div className="number_section">06</div>
              <div className="content_and_text">
                <img src={serviceSixIcon} alt="img" />
                <div className="text_container">
                  <h5>Compliances and due diligence</h5>
                  <p>
                    The Capital HUB supports startups with compliance and DD
                    services as part of their fundraising journey.
                  </p>
                  <button
                    onClick={() => handleReadMoreClick("/complience")}
                    className="read_more"
                  >
                    Read more >>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* <section className="our_client_feedback ">
            <h1>What Our Client Says</h1>
            <div className="feedback_container mt-5 mb-5">
              <div className="col-lg-6 image_container">
                <img src={imageReview} alt="img" />
              </div>
              <div className="col-lg-6 text_section">
                <p>
                  Lorem ipsum dolor sit amet consectetur. Maecenas ac elementum
                  lacus vel vitae sed nisi aliquam aliquet. Vel adipiscing
                  placerat tellus faucibus diam mauris ipsum vitae. Justo
                  adipiscing integer dictum tortor viverra vel .
                </p>
                <hr />
                <div className="name_buttons">
                  <h4>Rohit Kumar</h4>
                  <div className="left_right_btns">
                    <img src={leftIcon} alt="left" />
                    <img src={rightIcon} alt="right" />
                  </div>
                </div>
              </div>
            </div>
            <p className="end_para">
              Lorem ipsum dolor sit amet consectetur. Maecenas ac elementum
              lacus vel vitae sed nisi aliquam aliquet. Vel adipiscing placerat
              tellus faucibus diam mauris ipsum vitae. Justo adipiscing integer
              dictum tortor viverra vel .Lorem ipsum dolor sit amet consectetur.
            </p>
          </section> */}
        </div>
      </div>
    </>
  );
};

export default Service;
