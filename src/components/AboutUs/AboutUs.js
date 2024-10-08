import "./aboutus.scss";
import CoInvestorCard from "../Card/AboutUs/CoInvestor/CoInvestorCard";
import MeetOurTeam from "../Card/AboutUs/MeetOurTeam/MeetOurTeam";
import PramodImage from "../../Images/aboutUs/Pramod.jpeg";
import { useEffect } from "react";

const AboutUs = () => {
  useEffect(() => {
    document.title = "About Us | The Capital Hub";
  }, []);
  return (
    <>
      <div className="container-fluid aboutus_container">
        <div className="row title_text_row">
          <h2>Helping Millions of Indians build startups</h2>
        </div>
        <div className="container mx-auto mt-4">
          <div className="about_us_title_text">
            <h2>About Us</h2>
            <p>
              Welcome to The Capital HUB, where our mission is to empower
              millions of aspiring Indian entrepreneurs in building successful
              startups. Our platform provides a dynamic ecosystem, connecting
              startups with investors and mentors, fostering growth and
              innovation. With a relentless commitment to supporting the startup
              community, we strive to be the driving force behind India's
              entrepreneurial revolution. Join us on this exciting journey as we
              collectively shape a thriving future for the Indian startup
              landscape.
            </p>
          </div>

          <div className="founder_section mb-5">
            <h1>Founding team</h1>
            <div className="founder_container">
              <div className="image rounded-circle">
                <img
                  src={PramodImage}
                  className="rounded-circle"
                  alt="founder"
                />
              </div>

              <div className="text_content">
                <h2>Pramod Badiger</h2>
                <span>Founder and CEO</span>
                <p className="para_margin">
                  With an entrepreneurial spirit and a flair for innovation,
                  Pramod Badiger, the Founder and CEO of The Capital HUB, is a
                  force to be reckoned with. He thrives on structured processes
                  but cherishes the beauty of unscripted conversations. Pramod
                  prefers informal meetings and keeps business updates formal,
                  effortlessly balancing the best of both worlds.
                  <br />A true believer in diving deep into the details and
                  envisioning the future, he is often found crystal ball gazing
                  to chart the path ahead. As the silent cheerleader and
                  occasional horse whisperer at The Capital HUB, Pramod lends
                  his unwavering support to founders, encouraging them to build
                  their businesses with conviction and individuality. To him,
                  it's not just about offering opinions; it's about empowering
                  founders to shape their dreams on their terms.
                </p>
              </div>
            </div>
          </div>

          {/* <div className="founder_section mb-5">
            <div className="founder_container">
              <div className="image rounded-circle">
                <img src="" alt="founder" className="rounded-circle" />
              </div>

              <div className="text_content">
                <h2>Rohit Sharma</h2>
                <span>Mentor and Advisor</span>
                <p className="para_margin">
                  Rohit Sharma, a seasoned Mentor and Advisor at The Capital
                  HUB, brings a wealth of experience and wisdom to the table.
                  With a penchant for strategic thinking and a passion for
                  guiding startups, he is a true inspiration to aspiring
                  entrepreneurs. Rohit's expertise spans various industries,
                  making him a versatile mentor capable of providing valuable
                  insights and support tailored to each startup's unique needs.
                  As a trusted advisor, he dedicates himself to helping startups
                  navigate challenges, capitalize on opportunities, and achieve
                  sustainable growth. With
                  <br />
                  Rohit Sharma by their side, startups find the guidance and
                  encouragement they need to reach new heights of success.
                </p>
              </div>
            </div>
          </div> */}

          {/* <div className="founder_section mb-5">
            <div className="founder_container">
              <div className="image rounded-circle">
                <img src="" alt="image" className="rounded-circle" />
              </div>

              <div className="text_content">
                <h2>Shruthi Sullerey</h2>
                <span>Principal Investor Relations</span>
                <p className="para_margin">
                  Meet Shruthi Sullerey, the dynamic Principal of Investor
                  Relations at The Capital HUB. With an innate ability to
                  connect with investors and foster meaningful relationships,
                  Shruthi plays a pivotal role in shaping the future of
                  startups. Her expertise in the financial realm, combined with
                  a passion for nurturing partnerships, ensures that startups
                  receive the support and resources they need to thrive.
                  Shruthi's dedication to creating win-win scenarios for both
                  investors and entrepreneurs makes her a driving force behind
                  successful funding endeavors. As the go-to person for investor
                  engagement, Shruthi leaves an indelible mark on the journey of
                  every startup she collaborates with, propelling them towards
                  greater heights.
                </p>
              </div>
            </div>
          </div> */}

          <div className="about_us_title_text">
            <h2>Our Story</h2>
            <p>
              Once upon a time, in the bustling world of startups, Pramod
              embarked on an exciting journey. He found himself in the company
              of passionate founders brimming with optimistic ideas. As he
              delved deeper, he realized that building visionary products was
              only the beginning of their adventure. These brilliant minds faced
              a daunting challenge - raising funds!
            </p>
            <p>
              In the year 2021, a whopping $42 billion was raised by startups in
              India, and the global funding frenzy reached a staggering $621
              billion. Yet, a puzzling 30% of these funds eluded the grasp of
              new early-stage startups.
            </p>
            <p>
              The founders' quest for the perfect Strategic Angel Investors
              became the stuff of legends. They yearned for more than just
              capital; they craved the magic of networking and the wisdom of
              mentorship to turn their dreams into realities.
            </p>
            <p>That's why we started The Capital HUB</p>
          </div>

          <div className="about_us_title_text meet_our_team">
            <h2 className="mb-5">Meet our Warriors</h2>
            <MeetOurTeam />
          </div>
          <div className="about_us_title_text  co-investor_title mb-5">
            <h2 className="mb-3">Our Collaborations</h2>
            <CoInvestorCard />
          </div>

          {/* <div className="about_us_title_text mt-5 team_title">
            <h2 className="mb-4"> Team</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur. At consequat purus
              hendrerit proin risus tempor ultrices. Sit purus ante dictum in
              malesuada id. Tincidunt massa purus nascetur elit ullamcorper ac
              sit in. Egestas vitae lobortis tellus.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur. At consequat purus
              hendrerit proin risus tempor ultrices. Sit purus ante dictum in
              malesuada id. Tincidunt massa purus nascetur elit ullamcorper ac
              sit in. Egestas vitae lobortis tellus.
            </p>
          </div> */}

          {/* <div className="about_us_title_text mt-5 our_service co-investor_title">
            <h2 className="mb-5">Our Professional Services</h2>
            <p>
              The Capital HUB provides a 360-degree approach to building a great
              Startup. We work with startups on Raising Angel investments, Pitch
              deck creation, Financials, Business plans, Brand management,
              Growth model, Software development, Marketing, and Compliance
              services.
            </p>
            <ul>
              <li>
                <b> FUNDRAISING </b>: With a closed curated network of over
                1000+ angels, The Capital HUB is now your one-stop destination for
                all your fundraising needs.
              </li>
              <li>
                <b>PITCH DECK </b>: The Capital HUB offers elegant pitch deck design
                and professional support to startups.
              </li>
              <li>
                <b> FINANCIALS DOCUMENTATION </b>: Financial projections are one
                of the most crucial elements of any business plan, and they can
                have a big impact on your business's success.
              </li>
              <li>
                <b> WEB DEVELOPMENT</b> : The Capital HUB is the go-to source for
                startups when it comes to Web development, and Android and iOS
                development services. 
              </li>
              <li>
                <b> STARTUP CONSULTING / CXO SERVICES </b>:  The Capital HUB is
                building a better working world by realizing business
                transformation through the power of people, technology, and
                innovation. 
              </li>
            </ul>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AboutUs;
