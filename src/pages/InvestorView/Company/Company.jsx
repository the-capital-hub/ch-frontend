// import profilePic from "../../../Images/investorView/Logo.png";
// import saved from "../../../Images/investorView/saved.svg";
// import CoinIcon from "../../../Images/investorView/Rectangle.png";

// import LocationIcon from "../../../Images/investorView/location.svg";
// import calenderIcon from "../../../Images/investorView/calenderIcon.svg";
// import upgraphIcon from "../../../Images/investorView/upgraphIcon.svg";
// import googleIcon from "../../../Images/investorView/Google svg(1).svg";
// import fbIcon from "../../../Images/investorView/Facebook svg.svg";
// import twIcon from "../../../Images/investorView/tw.svg";
// import lnIcon from "../../../Images/investorView/ln.svg";
// import feedbackIcon from "../../../Images/investorIcon/profilePic.webp";

// import { useSelector } from "react-redux";
import "./Company.scss";
// import CardComponent from "./CardComponent/CardComponent";
// import FeedbackCard from "./FeedbackCard/FeedbackCard";
// import FundingTeamCard from "./FundingTeamCard/FundingTeamCard";
import { useParams } from "react-router-dom";
import { getOnePager } from "../../../Service/user";
import { useState, useEffect } from "react";
// import RaghuImage from "../../../Images/aboutUs/Raghu.jpeg";
// import UpmaImage from "../../../Images/aboutUs/Upma.jpg";
// import PreetiImage from "../../../Images/aboutUs/Preeti.jpg";
// import RajuImage from "../../../Images/Rectangle 1895.png";
// import AdithyaImage from "../../../Images/aboutUs/developers/Adithya.png";
// import ShahabasImage from "../../../Images/aboutUs/developers/Shahabas.jpg";
// import SrihariImage from "../../../Images/aboutUs/developers/Srihari.jpg";
// import JijinImage from "../../../Images/aboutUs/developers/Jijin.jpg";

// import TweeterIcon from "../../../Images/investorIcon/Tweeter.svg";
// import IntagramIcon from "../../../Images/investorIcon/Instagram.svg";
// import LinkedinIcon from "../../../Images/investorIcon/Linkedin.svg";
// import WebIcon from "../../../Images/investorIcon/WebIcon.svg";
import CompanyProfile from "../../../components/NewInvestor/CompanyProfileComponents/CompanyProfile";
import MaxWidthWrapper from "../../../components/Shared/MaxWidthWrapper/MaxWidthWrapper";
import SpinnerBS from "../../../components/Shared/Spinner/SpinnerBS";

function Company() {
  const { username } = useParams();
  const [onePager, setOnePager] = useState([]);
  useEffect(() => {
    document.title = "Company - OneLink | The Capital Hub";
    getOnePager(username)
      .then(({ data }) => {
        setOnePager(data);
      })
      .catch(() => setOnePager([]));
  }, [username]);

  // console.log("company", one Pager);

  return (
    // Older version of company profile
    // <div className="container-fluid company_main_container">
    //   {/* <div className="row mt-2">
    //     <div className="col">
    //       <div className="row">
    //         <div className="col-12 mt-2">
    //           <div className="  box">
    //             <div className="row">
    //               <div className="col-lg-7 col-md-12">
    //                 <div className="image_name_section mt-2">
    //                   <img
    //                     src={onePager.logo || profilePic}
    //                     alt="profileimage"
    //                     className="rounded-circle"
    //                     width={100}
    //                   />
    //                   <div className="left_profile_text flex_content ms-3">
    //                     <h2 className="typography">{onePager.company}</h2>
    //                     <span className="small_typo text-uppercase">
    //                       {onePager.sector}
    //                     </span>
    //                     <div>
    //                       <span className="small_typo_location">
    //                         {" "}
    //                         <img src={LocationIcon} alt="location" />{" "}
    //                         {onePager.location}
    //                       </span>
    //                       <span className="small_typo_location">
    //                         {" "}
    //                         <img src={calenderIcon} alt="location" /> Founded in
    //                         , 2014
    //                       </span>
    //                       <span className="small_typo_location">
    //                         {" "}
    //                         <img src={upgraphIcon} alt="location" /> Last
    //                         Funding in May, 2023
    //                       </span>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //               <div className="col-lg-5 right_buttons mobile_display_none"> */}
    //   {/* comment below img in onelink */}
    //   {/* <img src={saved} alt="saved" /> */}
    //   {/* <div className="connect_btn m-4"> */}
    //   {/* comment connect with founder in onelink */}
    //   {/* <button className="connect_founder">
    //                     Connect with the founder
    //                   </button> */}
    //   {/* <button className="invest_now">Invest Now</button>
    //                 </div> */}
    //   {/* </div>
    //             </div>
    //             <div className="row about_company_section">
    //               <div className="col-lg-3 col-md-12 ">
    //                 <h1>About the Company:</h1>
    //               </div>
    //               <div className="col-lg-9 col-md-12">
    //                 <p>{onePager.description}</p>
    //               </div>
    //             </div>

    //             <div className="row card_section">
    //               <CardComponent
    //                 color="white"
    //                 background="#BB98FF"
    //                 text="Company Title"
    //                 image={CoinIcon}
    //                 amount={"500 M"}
    //               />

    //               <CardComponent
    //                 color="white"
    //                 background="#DAC191"
    //                 text="Company Title"
    //                 image={CoinIcon}
    //                 amount={"500"}
    //               />

    //               <CardComponent
    //                 color="white"
    //                 background="#DCDCDC"
    //                 text="Company Title"
    //                 image={CoinIcon}
    //                 amount={"500"}
    //               />
    //               <CardComponent
    //                 color="white"
    //                 background="#8F85FF"
    //                 text="Company Title"
    //                 image={CoinIcon}
    //                 amount={"500"}
    //               />
    //             </div>

    //             <div className="row revenue_section">
    //               <h2>Revenue Statistics (FY19)</h2>
    //               <div className="row card_section">
    //                 <CardComponent
    //                   color="white"
    //                   background="#2B2B2B"
    //                   text="Company Title"
    //                   image={CoinIcon}
    //                   amount={"500 M"}
    //                 />

    //                 <CardComponent
    //                   color="white"
    //                   background="#FF7373"
    //                   text="Company Title"
    //                   image={CoinIcon}
    //                   amount={"500"}
    //                 />

    //                 <CardComponent
    //                   color="white"
    //                   background="#9198DA"
    //                   text="Company Title"
    //                   image={CoinIcon}
    //                   amount={"500"}
    //                 />
    //               </div>
    //             </div>
    //             <hr />
    //             <div className="row public_link_section">
    //               <h2>Public Links</h2>
    //               <div className="public_link">
    //                 <div className="social_icons">
    //                   <span>
    //                     <a
    //                       href={onePager?.socialLinks?.website}
    //                       target="_blank"
    //                       rel="noopener noreferrer"
    //                     >
    //                       <img src={WebIcon} alt="google" /> Website
    //                     </a>
    //                   </span>
    //                 </div>
    //                 <div className="social_icons">
    //                   <span>
    //                     <a
    //                       href={onePager?.socialLinks?.instagram}
    //                       target="_blank"
    //                       rel="noopener noreferrer"
    //                     >
    //                       <img src={IntagramIcon} alt="google" /> Instagram
    //                     </a>
    //                   </span>
    //                 </div>
    //                 <div className="social_icons">
    //                   <span>
    //                     <a
    //                       href={onePager?.socialLinks?.twitter}
    //                       target="_blank"
    //                       rel="noopener noreferrer"
    //                     >
    //                       <img src={twIcon} alt="google" /> Twitter
    //                     </a>
    //                   </span>
    //                 </div>
    //                 <div className="social_icons">
    //                   <span>
    //                     <a
    //                       href={onePager?.socialLinks?.linkedin}
    //                       target="_blank"
    //                       rel="noopener noreferrer"
    //                     >
    //                       <img src={lnIcon} alt="google" /> LinkedIn
    //                     </a>
    //                   </span>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="row feedback_section feedback_card_section">
    //               <h2>Feedback</h2>
    //               <div className="feedbackcard">
    //                 <FeedbackCard
    //                   image={feedbackIcon}
    //                   name="Sagar S"
    //                   stars={5}
    //                   paragraph="I had an amazing experience with The Capital Hub! The team's dedication to innovation really stood out to me. Their commitment to producing high-quality products while prioritizing safety is commendable. I was thoroughly impressed with their transparent communication throughout the process."
    //                 />
    //                 <FeedbackCard
    //                   image={RaghuImage}
    //                   name="Raghukrishnan J"
    //                   stars={5}
    //                   paragraph="The Capital Hub exceeded my expectations in every way possible. Their professionalism and knowledge in biotechnology are unparalleled. The quality of their products speaks volumes about their commitment to excellence.My interactions with their team left me confident in their capabilities and eager to explore more of their offerings. A fantastic experience overall!"
    //                 />{" "}
    //                 <FeedbackCard
    //                   image={RajuImage}
    //                   name="Raju Prasain"
    //                   stars={4}
    //                   paragraph="Working with The Capital Hub was an absolute pleasure. I was pleasantly surprised by their prompt delivery and exceptional customer service. The team's passion for advancing healthcare solutions is evident in their work. I look forward to collaborating with them again in the future."
    //                 />
    //               </div>
    //             </div>

    //             <div className="row fundingteam_section fundingteam_card_section">
    //               <h2>Founding Team</h2>
    //               <div className="fundingteamcard">
    //                 <FundingTeamCard
    //                   image={UpmaImage}
    //                   name="Upma Singh"
    //                   designation="Sr. Investment Analyst"
    //                   age={30}
    //                   paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel justo et nisl consectetur hendrerit. Fusce pharetra fringilla ligula, id rhoncus nisl imperdiet nec."
    //                 />
    //                 <FundingTeamCard
    //                   image={PreetiImage}
    //                   name="Preeti Yadav"
    //                   designation="Sr. Investment Analyst"
    //                   age={30}
    //                   paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel justo et nisl consectetur hendrerit. Fusce pharetra fringilla ligula, id rhoncus nisl imperdiet nec."
    //                 />
    //                 <FundingTeamCard
    //                   image={RaghuImage}
    //                   name="Raghukrishnan J"
    //                   designation="Sr. Investment Analyst"
    //                   age={30}
    //                   paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel justo et nisl consectetur hendrerit. Fusce pharetra fringilla ligula, id rhoncus nisl imperdiet nec."
    //                 />

    //                 <FundingTeamCard
    //                   image={ShahabasImage}
    //                   name="Muhamed Shahabas C"
    //                   designation="Full Stack Developer"
    //                   age={30}
    //                   paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel justo et nisl consectetur hendrerit. Fusce pharetra fringilla ligula, id rhoncus nisl imperdiet nec."
    //                 />

    //                 <FundingTeamCard
    //                   image={AdithyaImage}
    //                   name="Adithya Hebbar"
    //                   designation="Backend Developer"
    //                   age={30}
    //                   paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel justo et nisl consectetur hendrerit. Fusce pharetra fringilla ligula, id rhoncus nisl imperdiet nec."
    //                 />

    //                 <FundingTeamCard
    //                   image={JijinImage}
    //                   name="Jijin"
    //                   designation="Frontend Developer"
    //                   age={30}
    //                   paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel justo et nisl consectetur hendrerit. Fusce pharetra fringilla ligula, id rhoncus nisl imperdiet nec."
    //                 />

    //                 <FundingTeamCard
    //                   image={SrihariImage}
    //                   name="Srihari M S"
    //                   designation="Frontend Developer"
    //                   age={30}
    //                   paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel justo et nisl consectetur hendrerit. Fusce pharetra fringilla ligula, id rhoncus nisl imperdiet nec."
    //                 />
    //               </div>
    //             </div>

    //             <div className="row key_focus_section">
    //               <h2>Key Focusing Area</h2>
    //               <div className="focus_things">
    //                 <div className="focusItem">
    //                   <span>Finance</span>
    //                 </div>
    //                 <div className="focusItem">
    //                   <span>3D Scanning</span>
    //                 </div>
    //                 <div className="focusItem">
    //                   <span>Augmented Reality AR</span>
    //                 </div>
    //                 <div className="focusItem">
    //                   <span>Virtual Reality VR</span>
    //                 </div>
    //                 <div className="focusItem">
    //                   <span>Artificial Intelligence</span>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div> */}
    // </div>

    // Newer version of company profile
    <MaxWidthWrapper>
      <div className="company__profile__container mx-lg-3 my-4 my-xl-3">
        {onePager.length !== 0 ? (
          <CompanyProfile
            isOnelink={true}
            companyData={onePager}
            startup={"true"}
          />
        ) : (
          <SpinnerBS
            className="white-to-grey rounded-4 border p-lg-4 shadow-sm d-flex justify-content-center min-vh-100"
            colorClass={"d-l-grey"}
          />
        )}
      </div>
    </MaxWidthWrapper>
  );
}

export default Company;
