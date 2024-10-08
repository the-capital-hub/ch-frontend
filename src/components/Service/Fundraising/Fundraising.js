import React, { useEffect } from "react";
import "./fundraising.scss";
import serviceOneIcon from "../../../Images/service/Group 15409.svg";
import listIcon from "../../../Images/ListDot.svg";
import BackIcon from "../../../Images/BackIcon.svg";
import { Link } from "react-router-dom";
import moneyIcon from "../../../Images/service/image 48.png";
import bulbIcon from "../../../Images/service/image 49.png";
import mvpIcon from "../../../Images/service/image 51.png";
import flyingIcon from "../../../Images/service/image 52.png";
import handshakeIcon from "../../../Images/service/image 54.png";
import investorlistIcon from "../../../Images/service/image 56.png";
import emailIcon from "../../../Images/service/image 58(1).png";

const Fundraising = () => {
  useEffect(() => {
    document.title = "Fundraising Service | The Capital Hub";
  }, []);
  return (
    <>
      <div className="container fundraising_main_container">
        <div className="container">
          <Link to={"/service"}>
            <img src={BackIcon} alt="back" />
            Back
          </Link>
          <section className="heading_section_fund">
            <div className="title_and_image">
              <img src={serviceOneIcon} alt="image" />
              <h2>Fundraising</h2>
            </div>
            <h1>
              We offer the best
              <span style={{ color: "#FD5901" }}> services</span>
            </h1>
            <div className="para-image">
              <div className="para">
                <p className="mt-2">
                  Start raising your first round of angel investments with The
                  Capital HUB. At its very core The Capital HUB focuses on
                  finding ideal and right strategic investors to Support,
                  Mentor, and guide founders to experience the full potential of
                  raising investment from an angel. With a closed curated
                  network of over 1000+ angels, The Capital HUB is now your
                  one-stop destination for all your fundraising needs.{" "}
                </p>

                <p>
                  Building a great product begins with a great idea and a great
                  idea is built with even greater teams. Having over thousands
                  of start-ups in India are being founded every year. It's a
                  competitive market to raise funds in the current economy. So
                  here are a few tips to help you build a great startup and
                  raise funds at the earliest all by yourself.
                </p>
              </div>
              <div className="image-sec">
                <img src={moneyIcon} alt="img" />
              </div>
            </div>
          </section>
          <section className="explore_service">
            <h1 style={{ color: "#FD5901" }}>Explore</h1>
            <h1>Our Popular Services</h1>

            <section class="card-section row">
              <div class="card col-lg-4 col-md-6 col-sm-12">
                <img src={bulbIcon} alt="text" />
                <p>Have a great idea</p>
              </div>
              <div class="card col-lg-4 col-md-6 col-sm-12">
                <img src={mvpIcon} alt="text" />
                <p>MVP (Minimal Viable Product)</p>
              </div>
              <div class="card col-lg-4 col-md-6 col-sm-12">
                <img src={flyingIcon} alt="text" />
                <p>Have initial traction</p>
              </div>
              <div class="card col-lg-4 col-md-6 col-sm-12">
                <img src={handshakeIcon} alt="text" />
                <p>Build an elegant pitch deck</p>
              </div>
              <div class="card col-lg-4 col-md-6 col-sm-12">
                <img src={investorlistIcon} alt="text" />
                <p>Create a investor list</p>
              </div>
              <div class="card col-lg-4 col-md-6 col-sm-12">
                <img src={emailIcon} alt="text" />
                <p>Approach by cold emails and LinkedIn</p>
              </div>
            </section>
          </section>

          <section className="list_section">
            <ul>
              <li>
                <img src={listIcon} alt="image" />
                <div>
                  <b>
                    {" "}
                    Have a <span style={{ color: "#FD5901" }}>
                      {" "}
                      great idea
                    </span>{" "}
                  </b>
                  Ideas are not something that you work on for a few days and
                  let go of another day. Ideas need to capture one's interest
                  which can benefit and change millions of lives throughout your
                  journey. Now build a great team who can not only support you
                  but help execute the idea into a reality.
                </div>{" "}
              </li>

              <li>
                <img src={listIcon} alt="image" />
                <div>
                  <b>
                    {" "}
                    Create an
                    <span style={{ color: "#FD5901" }}> MVP</span> (minimal
                    viable product) or a prototype.
                  </b>
                  Once you have the right idea. Now start building a niche
                  product that can attract a few early customers where you can
                  test your idea and your beta product.
                </div>{" "}
              </li>

              <li>
                <img src={listIcon} alt="image" />
                <div>
                  <b>
                    {" "}
                    Have initial{" "}
                    <span style={{ color: "#FD5901" }}>traction</span>
                  </b>
                  Having Initial traction not only brings hope to your idea but
                  also serves as a testing period where you can offer your
                  customers the right fit and develop a need to use your product
                  or service.
                </div>{" "}
              </li>

              <li>
                <img src={listIcon} alt="image" />
                <div>
                  <b>
                    {" "}
                    Build an elegant
                    <span style={{ color: "#FD5901" }}> pitch deck</span>{" "}
                  </b>
                  Once your team, product, and initial traction are ready. If
                  you're looking to expand your horizons in better product
                  development, the right team or raise funds for further
                  operations. You need an elegant pitch deck. Building a pitch
                  deck is the most important part of fundraising as it gives an
                  investor a better understanding of the Management, Market, and
                  Mathematics of your business.
                </div>{" "}
              </li>

              <li>
                <img src={listIcon} alt="image" />
                <div>
                  <b>
                    Create an{" "}
                    <span style={{ color: "#FD5901" }}>investors list</span>{" "}
                  </b>
                  All you need to do when you need help is ask. You will have to
                  knock on the right doors to get the right mentorship, funds,
                  and networking with individuals who are as passionate as you
                  about your business. To find the right people in a similar
                  domain, CXO
                  <br />
                  who are currently working in a similar domain, Angel
                  investors, and early-stage incubators or accelerators to push
                  your product to a whole new level.
                </div>{" "}
              </li>

              <li>
                <img src={listIcon} alt="image" />
                <div>
                  <b>
                    Approach by cold{" "}
                    <span style={{ color: "#FD5901" }}>
                      emails and LinkedIn
                    </span>{" "}
                  </b>
                  Once the investor list is created, start approaching the
                  investors providing them sufficient amount of information and
                  an ample amount of time to get back to you and discuss more.
                  Always remember to work with those individuals who are willing
                  to give you the right mentorship and advice to scale your
                  business. Entrepreneurship is not easy Building a great team,
                  product, and pitch deck take a lot of time and effort.
                  Founders will tend to fail again and again, but it's the hope,
                  passion, and faith that keep them going. Remember to always
                  expect NO and try to believe in the idea that you once started
                  and never stop working on it until you reach your goals. Seems
                  like a lot of work? Contact us now and let us help you build
                  your next great venture together at The Capital HUB
                </div>{" "}
              </li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default Fundraising;
