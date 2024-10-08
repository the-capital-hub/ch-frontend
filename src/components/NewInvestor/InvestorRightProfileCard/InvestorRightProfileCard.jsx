import "./investorRightProfileCard.scss";
// import profilePic from "../../../../Images/investorIcon/profilePic.webp";
import LoopIcon from "../../../Images/investorIcon/LoopIcon.svg";
import BatchImag from "../../../Images/tick-mark.png"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getInvestorById, getUserByIdBody } from "../../../Service/user";

const RightProfileCard = ({ noProfile }) => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [investor, setInvestor] = useState(null);
  const [isPassword,setIsPassword]= useState(false);

  useEffect(() => {
    if (loggedInUser?.investor) {
      getInvestorById(loggedInUser?.investor).then(({ data }) => {
        setInvestor(data);
      });
    }
  const getUser = async() =>{

      await getUserByIdBody(loggedInUser)
      .then((res)=>{
              if(res.data.password){
                setIsPassword(true)
              }
            
      });
    }
    getUser();

  }, [loggedInUser]);

  return (
    <>
      <div className="col-12 investor_profile_container">
        <div className="view_profile">
          <div className="view_profile_name_section mt-2">
            <img
              src={loggedInUser.profilePicture}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
              className="rounded-circle profile-image"
              alt="profileimage"
            />
             
            <div className="right_profile_text flex_content">
              <h2 className="typography">
                {loggedInUser?.firstName} {loggedInUser?.lastName}
                {loggedInUser.isSubscribed && <img
              src={BatchImag}
              style={{
                width: "1.2rem",
                height: "1.2rem",
                objectFit: "contain",
                marginLeft: "0.5rem", // Optional: adds space between the name and the icon
              }}
              alt="Batch Icon"
            />}
              </h2>
              <span className="smallest_typo">{loggedInUser?.email}</span>
              <span className="smallest_typo">
                {`${loggedInUser?.designation} at ${
                  loggedInUser?.startUp?.company || investor?.companyName
                }`}
              </span>
            </div>
            <Link
              to="/investor/profile"
              className="profile_btn mt-2 investor__green"
            >
              View Profile
            </Link>

            <Link
              to="/investor/manage-account"
              className="profile_btn mt-1 investor__green"
            >
              Manage Account
            </Link>
             {!isPassword && <Link
          to="/investor/manage-account"
          className="profile_btn mt-1 investor__green"
        >
          Set Password
        </Link>}
          </div>
        </div>
      </div>
    </>
  );
};

export default RightProfileCard;
