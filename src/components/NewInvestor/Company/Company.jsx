import "./Company.scss";

import CardComponent from "../../../pages/InvestorView/Company/CardComponent/CardComponent";
import FeedbackCard from "../../../pages/InvestorView/Company/FeedbackCard/FeedbackCard";
import FundingTeamCard from "../../../pages/InvestorView/Company/FundingTeamCard/FundingTeamCard";

import profilePic from "../../../Images/investorView/Logo.png";
import saved from "../../../Images/investorView/saved.svg";
import CoinIcon from "../../../Images/investorView/Rectangle.png";

import LocationIcon from "../../../Images/investorView/location.svg";
import calenderIcon from "../../../Images/investorView/calenderIcon.svg";
import upgraphIcon from "../../../Images/investorView/upgraphIcon.svg";
import googleIcon from "../../../Images/investorView/Google svg(1).svg";
import fbIcon from "../../../Images/investorView/Facebook svg.svg";
import twIcon from "../../../Images/investorView/tw.svg";
import lnIcon from "../../../Images/investorView/ln.svg";
import feedbackIcon from "../../../Images/investorIcon/profilePic.webp";

import RaghuImage from "../../../Images/aboutUs/Raghu.jpeg";
import RajuImage from "../../../Images/Rectangle 1895.png";

function Company() {
  return (
    <div className="company_container border rounded-4 shadow-sm">
      <div className="row">
        <div className="col-lg-7 col-md-12">
          <div className="image_name_section mt-2">
            <img
              src={profilePic}
              alt="profileimage"
              className="rounded-circle"
              width={100}
            />
            <div className="left_profile_text flex_content ms-3">
              <h2 className="typography">The Capital Hub</h2>
              <span className="small_typo text-uppercase">FinTech</span>
              <div className="d-flex flex-column flex-md-row gap-2">
                <span className="small_typo_location text-secondary">
                  <img src={LocationIcon} alt="location" /> Bangalore
                </span>
                <span className="small_typo_location text-secondary">
                  <img src={calenderIcon} alt="location" /> Founded in , 2014
                </span>
                <span className="small_typo_location text-secondary">
                  <img src={upgraphIcon} alt="location" /> Last Funding in May,
                  2023
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-5 right_buttons ">
          <img src={saved} alt="saved" className="d-none d-md-block" />
          <div className="connect_btn m-4">
            <button className="connect_founder">
              Connect with the founder
            </button>
            <button className="invest_now">Invest Now</button>
          </div>
        </div>
      </div>
      <div className="row about_company_section">
        <div className="col-lg-3 col-md-12 ">
          <h1>About the Company:</h1>
        </div>
        <div className="col-lg-9 col-md-12">
          <p>
            Man's all about building great start-ups from a simple idea to an
            elegant reality. Humbled and honored to have worked with Angels and
            VC's across the globe to support and grow the startup culture.With
            the vision of make in India for the world, they design and build
            augmented reality glasses for Defence, Enterprise, and Training
            sectors. In addition to hardware, they also provide their clients
            with end-to-end AR/VR/MR solutions that are tailored to their
            business needs.
          </p>
        </div>
      </div>

      <div className="row card_section">
        <CardComponent
          color="white"
          background="#BB98FF"
          text="Company Title"
          image={CoinIcon}
          amount={"500 M"}
        />

        <CardComponent
          color="white"
          background="#DAC191"
          text="Company Title"
          image={CoinIcon}
          amount={"500"}
        />

        <CardComponent
          color="white"
          background="#DCDCDC"
          text="Company Title"
          image={CoinIcon}
          amount={"500"}
        />
        <CardComponent
          color="white"
          background="#8F85FF"
          text="Company Title"
          image={CoinIcon}
          amount={"500"}
        />
      </div>

      <div className="row revenue_section">
        <h2>Revenue Statistics</h2>
        <div className="row card_section">
          <CardComponent
            color="white"
            background="#2B2B2B"
            text="Company Title"
            image={CoinIcon}
            amount={"500 M"}
          />

          <CardComponent
            color="white"
            background="#FF7373"
            text="Company Title"
            image={CoinIcon}
            amount={"500"}
          />

          <CardComponent
            color="white"
            background="#9198DA"
            text="Company Title"
            image={CoinIcon}
            amount={"500"}
          />
        </div>
      </div>
      <hr />
      <div className="row public_link_section">
        <h2>Public Links</h2>
        <div className="public_link">
          <div className="social_icons">
            <span>
              <img src={googleIcon} alt="google" /> Google
            </span>
          </div>
          <div className="social_icons">
            <span>
              <img src={fbIcon} alt="google" /> Facebook
            </span>
          </div>
          <div className="social_icons">
            <span>
              <img src={twIcon} alt="google" /> Twitter
            </span>
          </div>
          <div className="social_icons">
            <span>
              <img src={lnIcon} alt="google" /> LinkedIn
            </span>
          </div>
        </div>
      </div>
      {/* <div className="row feedback_section feedback_card_section">
        <h2>Feedback</h2>
        <div className="feedbackcard">
          <FeedbackCard
            image={feedbackIcon}
            name="image
        Sagar S"
            stars={5}
            paragraph="I had an amazing experience with Kyntox Biotech! The team's dedication to innovation really stood out to me. Their commitment to producing high-quality products while prioritizing safety is commendable. I was thoroughly impressed with their transparent communication throughout the process."
          />
          <FeedbackCard
            image={RaghuImage}
            name="Raghukrishnan J"
            stars={5}
            paragraph="Kyntox Biotech exceeded my expectations in every way possible. Their professionalism and knowledge in biotechnology are unparalleled. The quality of their products speaks volumes about their commitment to excellence.My interactions with their team left me confident in their capabilities and eager to explore more of their offerings. A fantastic experience overall!"
          />{" "}
          <FeedbackCard
            image={RajuImage}
            name="Raju Prasain"
            stars={4}
            paragraph="Working with Kyntox Biotech was an absolute pleasure. I was pleasantly surprised by their prompt delivery and exceptional customer service. The team's passion for advancing healthcare solutions is evident in their work. I look forward to collaborating with them again in the future."
          />

        </div>
      </div> */}

      <div className="row fundingteam_section fundingteam_card_section">
        <h2>Founding Team</h2>
        <div className="fundingteamcard">
          <FundingTeamCard
            image={
              "https://res.cloudinary.com/drjt9guif/image/upload/q_92/v1692963108/TheCapitalHub/startUps/teamMembers/greendrive/sagar_jae33e.webp"
            }
            name="Sagar S"
            designation="Sr. Operation Manager"
            age={30}
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel justo et nisl consectetur hendrerit. Fusce pharetra fringilla ligula, id rhoncus nisl imperdiet nec."
          />
          <FundingTeamCard
            image={
              "https://res.cloudinary.com/drjt9guif/image/upload/q_100/v1692963218/TheCapitalHub/startUps/teamMembers/greendrive/shashi_nd30jr.webp"
            }
            name="Shashidhar B N"
            designation="Operation Manager"
            age={30}
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel justo et nisl consectetur hendrerit. Fusce pharetra fringilla ligula, id rhoncus nisl imperdiet nec."
          />
          <FundingTeamCard
            image={
              "https://res.cloudinary.com/drjt9guif/image/upload/v1692963289/TheCapitalHub/startUps/teamMembers/greendrive/ashiq_ou8o2v.webp"
            }
            name="Ashiq M"
            designation="Sr. Service Manager"
            age={30}
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel justo et nisl consectetur hendrerit. Fusce pharetra fringilla ligula, id rhoncus nisl imperdiet nec."
          />

          <FundingTeamCard
            image={
              "https://res.cloudinary.com/drjt9guif/image/upload/v1692963438/TheCapitalHub/startUps/teamMembers/greendrive/melam-steven_wb41ee.webp"
            }
            name="Melam Steven Ezra"
            designation="Operation Manager"
            age={30}
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel justo et nisl consectetur hendrerit. Fusce pharetra fringilla ligula, id rhoncus nisl imperdiet nec."
          />

          <FundingTeamCard
            image={
              "https://res.cloudinary.com/drjt9guif/image/upload/v1692963528/TheCapitalHub/startUps/teamMembers/greendrive/nagaraju_savm2s.webp"
            }
            name="Molumoori Nagaraju"
            designation="Growth Manager"
            age={30}
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel justo et nisl consectetur hendrerit. Fusce pharetra fringilla ligula, id rhoncus nisl imperdiet nec."
          />

          <FundingTeamCard
            image={
              "https://res.cloudinary.com/drjt9guif/image/upload/v1692963668/TheCapitalHub/startUps/teamMembers/greendrive/navya_blspa8.webp"
            }
            name="Navya M"
            designation="HR Manager"
            age={30}
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel justo et nisl consectetur hendrerit. Fusce pharetra fringilla ligula, id rhoncus nisl imperdiet nec."
          />

          <FundingTeamCard
            image={
              "https://res.cloudinary.com/drjt9guif/image/upload/v1692963755/TheCapitalHub/startUps/teamMembers/greendrive/swathi-k_ediifp.webp"
            }
            name="Swathi K"
            designation="Accountant Manager"
            age={30}
            paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel justo et nisl consectetur hendrerit. Fusce pharetra fringilla ligula, id rhoncus nisl imperdiet nec."
          />
        </div>
      </div>

      <div className="row key_focus_section">
        <h2>Key Focusing Area</h2>
        <div className="focus_things">
          <div className="focusItem">
            <span>Finance</span>
          </div>
          <div className="focusItem">
            <span>3D Scanning</span>
          </div>
          <div className="focusItem">
            <span>Augmented Reality AR</span>
          </div>
          <div className="focusItem">
            <span>Virtual Reality VR</span>
          </div>
          <div className="focusItem">
            <span>Artificial Intelligence</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Company;
