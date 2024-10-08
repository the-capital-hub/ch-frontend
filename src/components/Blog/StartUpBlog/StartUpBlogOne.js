import React, { useEffect } from "react";
import "./style.scss";
import BlogImageOne from "../../../Images/blog/Rectangle 1271.png";
import SearchIcon from "../../../Images/blog/Combined-Shape.svg";
import PopularArticle from "../../Card/PopularArticle/PopularArticle";
import fbIcon from "../../../Images/blog/typcn_social-facebook.svg";
import twIcon from "../../../Images/blog/typcn_social-twitter.svg";
import inIcon from "../../../Images/blog/typcn_social-instagram.svg";
import BlogoneImage from "../../../Images/blog/1 AsPGU1Q42C9lsVRoMg91Nw.webp";
import { Link } from "react-router-dom";
import Pramod from "../../../Images/aboutUs/Pramod.jpeg";

const StartUpBlogOne = () => {
  useEffect(() => {
    document.title = "Why mentoring matters? Blog | The Capital Hub";
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
          <span className="category">Start Up</span>
        </div>
        <hr />

        <div className="row">
          <div className="col-lg-12 col-md-12 seventy ">
            <h2 className="headingOne">
              Why Mentoring Matters: Why Angel Investors Should Prioritize
              Mentorship Before Investing in a Startup
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
                  <span>Published on May 1, 2023</span>
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
                <img
                  src={BlogoneImage}
                  width={"100%"}
                  style={{ maxWidth: "600px", objectFit: "contain" }}
                  className="mx-auto my-lg-3"
                  alt="img"
                />
              </div>

              <u>The Power of Mentorship in Startups:</u>
              <p>
                How Growthive Is Empowering Angel Investors to Be More Than Just
                Funders
              </p>
              <p>
                Starting a business can be a daunting task, particularly for
                first-time entrepreneurs. The journey from idea to successful
                company is fraught with challenges, and it can be difficult to
                navigate these challenges without help. That’s where mentorship
                comes in. The power of mentorship in startups cannot be
                overstated, and it is a critical component of success for many
                entrepreneurs. In this article, we will explore the importance
                of mentorship in startups and how Growthive — a Capital Hub
                initiative — is empowering angel investors to be more than just
                funders by becoming mentors first.
              </p>

              <p>
                Mentorship is a relationship between a more experienced and
                knowledgeable person (the mentor) and a less experienced person
                (the mentee) who is seeking guidance and support. In the context
                of startups, mentorship can take many forms. It can involve
                providing advice on business strategy, connecting entrepreneurs
                with potential customers and investors, or simply serving as a
                sounding board for ideas and concerns. Whatever form it takes,
                mentorship is a critical component of success for many
                entrepreneurs.
              </p>
              <div className="d-flex">
                <img
                  src="https://img.freepik.com/free-vector/businesswomen-presenting-graph-colleague_74855-2353.jpg?size=626&ext=jpg&ga=GA1.1.176513024.1692192688&semt=ais"
                  width={"100%"}
                  style={{ maxWidth: "600px", objectFit: "contain" }}
                  className="mx-auto my-lg-3"
                  alt="img"
                />
              </div>
              <p>
                The benefits of mentorship are many. First, mentors can provide
                valuable advice and guidance based on their own experiences.
                They can help entrepreneurs avoid common pitfalls and navigate
                the complexities of starting and growing a business. Second,
                mentors can provide a valuable network of contacts and
                connections, which can be instrumental in helping entrepreneurs
                build relationships with potential customers, investors, and
                partners. Finally, mentors can provide emotional support and
                encouragement, which can be invaluable during the ups and downs
                of the startup journey.
              </p>

              <p>
                This is where Growthive comes in. Growthive is a Capital Hub
                initiative that is designed to empower angel investors to be
                more than just funders. By becoming mentors first, angel
                investors can provide valuable guidance, support, and expertise
                to early-stage startups. The program is designed to be a win-win
                for both startups and angel investors. Startups benefit from the
                guidance and support of experienced mentors, while angel
                investors have the opportunity to work closely with promising
                startups and potentially invest in them down the road.
              </p>

              <p>
                The Growthive program is unique in that it prioritizes
                mentorship over funding. This means that angel investors who
                participate in the program are encouraged to focus on providing
                guidance and support to startups before they consider investing
                in them. This approach has several benefits. First, it allows
                startups to benefit from the experience and expertise of
                experienced mentors without feeling pressure to pitch for
                funding. Second, it allows angel investors to get to know
                startups on a deeper level and to make more informed investment
                decisions down the road.
              </p>
              <div className="d-flex">
                <img
                  src="https://img.freepik.com/free-vector/hand-drawn-flat-design-innovation-concept_23-2149149286.jpg?w=996&t=st=1693218161~exp=1693218761~hmac=8781da4f49ba7978b238936a183b3803f2acfe33143758a3afc5fa9f9ee879c6"
                  width={"100%"}
                  style={{ maxWidth: "600px", objectFit: "contain" }}
                  className="mx-auto my-lg-3"
                  alt="img"
                />
              </div>
              <p>
                In conclusion, the power of mentorship in startups cannot be
                overstated. Mentorship can provide valuable advice, guidance,
                and support to early-stage startups, and it can be a critical
                component of success for many entrepreneurs. The Growthive
                program, a Capital Hub initiative, is designed to empower angel
                investors to be more than just funders by becoming mentors
                first. By prioritizing mentorship over funding, the program is
                creating a win-win for both startups and angel investors. If
                you’re an angel investor looking to get involved in the startup
                ecosystem, consider joining the Growthive program to become a
                mentor first and potentially invest later.
              </p>
              <p>
                If you’re interested in joining our community of angel investors
                and supporting the next generation of entrepreneurs, we invite
                you to fill out our Google form to learn more about the program
                and get involved. We believe that together, we can make a
                significant impact in the startup community.
              </p>
              <p>
                Thank you for considering this opportunity and we look forward
                to hearing from you soon!
              </p>
              <p>Let’s Build a Valuable venture together.</p>
              <a href="http://thecapitalhub.in/">thecapitalhub.in</a>

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

              {/* <h2 className="inside_seventy_heading">
                How to learn about the Web Development ?
              </h2> */}
              {/* <p>
                Lorem ipsum dolor sit amet consectetur. At consequat purus
                hendrerit proin risus Sit purus ante dictum in malesuada
                id.Lorem ipsum dolor sit amet consectetur. At consequat purus
                hendrerit proin risus Sit purus ante dictum in malesuada id.{" "}
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur. At consequat purus
                hendrerit proin risus Sit purus ante dictum in malesuada
                id.Lorem ipsum dolor sit amet consectetur. At consequat purus
                hendrerit proin risus Sit purus ante dictum in malesuada id.{" "}
              </p> */}

              {/* <h2 className="inside_seventy_heading">
                Top web development courses in India
              </h2> */}

              {/* <ol>
                <li>Capital Hub</li>
                <p>
                  Lorem ipsum dolor sit amet consectetur. At consequat purus
                  hendrerit proin risus Sit purus ante dictum in malesuada
                  id.Lorem ipsum dolor sit amet consectetur. At consequat purus
                  hendrerit proin risus Sit purus ante dictum in malesuada id.{" "}
                </p>
              </ol> */}
              {/* <button className="inside_seventy_btn">
                Become a web Developer
              </button> */}
            </div>
          </div>
          {/* <div className="col-lg-5  col-md-12 thirty">
            <div className="search_bar">
              <div className="search-input-container">
                <img src={SearchIcon} className="search-icon fas fa-search" />
                <input type="search" placeholder="Search" />
              </div>
            </div>

            <div className="subscribe_now">
              <h3>
                More than 2 Lakh investors like you read our newsletter 'The
                Signal'
              </h3>
              <h2>Subscribe now</h2>
              <input type="email" placeholder="Enter Email Id" />
              <button>Subscribe</button>
            </div>

            <div className="popular_article">
              <h2>Popular Articles</h2>
              <PopularArticle image={BlogImageOne} button={"Stock Market"} />
              <PopularArticle image={BlogImageOne} button={"Stock Market"} />
              <PopularArticle image={BlogImageOne} button={"Stock Market"} />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default StartUpBlogOne;
