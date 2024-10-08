import { useEffect } from "react";
import "./MeeshoBlog.scss";
import fbIcon from "../../../Images/blog/typcn_social-facebook.svg";
import twIcon from "../../../Images/blog/typcn_social-twitter.svg";
import inIcon from "../../../Images/blog/typcn_social-instagram.svg";
import Pramod from "../../../Images/aboutUs/Pramod.jpeg";
import { Link } from "react-router-dom";

function MeeshoBlog() {
  useEffect(() => {
    document.title =
      "Meesho: Revolutionising E-Commerce for Entrepreneurs | Blog | The Capital Hub";
  }, []);
  window.scrollTo({ top: 0, behavior: "smooth" });
  let loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
    loggedInUser = JSON.parse(loggedInUser);
  }
  return (
    <>
      <div className="container blog_detailed_container">
        {/* Blog category */}
        <div className="category_section">
          <span className="blog">Blog</span> {"> "}
          <span className="category">Start Up</span>
        </div>
        <hr />

        {/* Blog Container */}
        <div className="row">
          <div className="col-lg-12 col-md-12 seventy ">
            {/* Blog Header */}
            <h2 className="headingOne">
              Meesho: Revolutionising E-Commerce for Entrepreneurs
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

            {/* Blog Body */}
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
                In the ever-expanding world of e-commerce, Meesho has emerged as
                a frontrunner, distinguishing itself as a unique platform that
                empowers aspiring entrepreneurs to start and grow their
                businesses. With a commitment to fostering economic independence
                and inclusivity, Meesho has revolutionised the way individuals
                connect with suppliers, market products, and establish their own
                online enterprises.
              </p>

              <u>Sanjeev Barnwal:</u>
              <p>
                Sanjeev Barnwal, the other co-founder of Meesho, shares Aatrey's
                passion for empowering budding entrepreneurs. As the Chief
                Technology Officer (CTO) of Meesho, Barnwal is responsible for
                the platform's technological advancements and ensuring a
                seamless user experience. His expertise in machine learning and
                data analytics has greatly contributed to Meesho's success.
              </p>

              <u>Meesho: A Pioneer in Social Commerce:</u>
              <p>
                Meesho has redefined the concept of social commerce by providing
                a seamless platform for entrepreneurs to sell products directly
                to their social networks. The platform effectively merges the
                power of e-commerce with the reach of social media, enabling
                entrepreneurs to leverage existing relationships and create
                personalised shopping experiences.
              </p>

              <u>Empowering Entrepreneurs</u>
              <p>
                One of the most significant aspects of Meesho is its commitment
                to empowering individuals from all walks of life. Through
                Meesho, anyone with a smartphone and internet connection can
                become an entrepreneur. The platform provides a user-friendly
                interface, comprehensive product catalogue, and various
                marketing tools to support entrepreneurs' journeys, regardless
                of their location or prior experience.
              </p>

              <u>Flexible Business Models</u>
              <p>
                Meesho offers flexible business models tailored to suit each
                entrepreneur's needs. Whether individuals want to run their
                businesses full-time or as a side hustle, Meesho provides the
                freedom and versatility to customise work hours and income
                potential. This flexibility has opened doors for individuals to
                explore entrepreneurship on their terms and break free from
                traditional employment constraints.
              </p>

              <u>Seamless Integration of Technology</u>
              <p>
                Meesho's success can be attributed, in part, to its continuous
                focus on innovation and integration of cutting-edge technology.
                The platform's user-friendly mobile application enables
                entrepreneurs to manage orders, track inventory, and communicate
                with customers effortlessly. Meesho leverages data analytics and
                artificial intelligence to provide personalised recommendations
                and insights to optimise entrepreneurs' businesses.
              </p>

              <u>Building a Supportive Community</u>
              <p>
                A key strength of Meesho lies in its vibrant community of
                entrepreneurs who support and uplift each other. Through active
                social networking and interactive training programs, Meesho
                fosters a sense of camaraderie among its members. The community
                provides a platform for knowledge sharing, collaboration, and
                mentorship, helping entrepreneurs grow their businesses and
                overcome challenges together.
              </p>

              <u>Conclusion</u>
              <p>
                Meesho's exceptional e-commerce platform has revolutionised the
                way individuals venture into entrepreneurship. By combining the
                power of social media with e-commerce, Meesho offers a simple
                and accessible pathway to financial independence. With its
                commitment to fostering inclusivity and providing extensive
                support, Meesho continues to empower entrepreneurs and reshape
                the landscape of e-commerce.
              </p>

              <ul className="blog-references">
                <h6>Head over to : </h6>
                <li>
                  <a href="https://www.meesho.com/">meesho.com</a>
                </li>
                <li>
                  <a href="https://www.crunchbase.com/organization/meesho">
                    crunchbase.com/organization/meesho
                  </a>
                </li>
                <li>
                  <a href="https://en.wikipedia.org/wiki/Meesho">
                    en.wikipedia.org/wiki/Meesho
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

export default MeeshoBlog;
