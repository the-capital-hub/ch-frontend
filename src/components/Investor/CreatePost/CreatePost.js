import "./createPost.scss";
import React, { useContext, useEffect } from "react";
import profilePic from "../../../Images/investorIcon/profilePic.webp";
import AddUserIcon from "../../../Images/investorIcon/Add-User.svg";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import FeaturedPostsContainer from "../InvestorGlobalCards/MilestoneCard/FeaturedPostsContainer";
import { SidebarContext } from "../../Sidebar/SidebarContext";
import SmallProfileCard from "../InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import RightProfileCard from "../InvestorGlobalCards/RightProfileCard/RightProfileCard";
import RecommendationCard from "../InvestorGlobalCards/Recommendation/RecommendationCard";
import NewsCorner from "../InvestorGlobalCards/NewsCorner/NewsCorner";
import CompanyDetailsCard from "../InvestorGlobalCards/CompanyDetails/CompanyDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../../Store/features/design/designSlice";

const CreatePost = () => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "Create a Post | The Capital Hub";
    dispatch(setPageTitle("Create Post"));
  }, []);

  return (
    <div className="container-fluid createpost_container">
      <div className="row">
        <div className="col">
          <SmallProfileCard />
          <div className="content-70">
            <div className="row">
              <div className="col-12 colSize">
                <div className=" box bio_container">
                  <div className="row">
                    <div className="ceatepost_img_name">
                      <img
                        src={profilePic}
                        alt="profile pic"
                        className="rounded-circle"
                      />
                      <span className="">
                        <h2>
                          {loggedInUser?.firstName} {loggedInUser?.lastName}
                        </h2>
                        <h6>Post to anyone</h6>
                      </span>
                    </div>
                    <hr />
                  </div>
                  <div className="row createpost_text_area">
                    <div className="createpost_header ">
                      <h4>Title</h4>
                    </div>
                    <div className="createpost_textarea ">
                      <textarea className="custom-textarea" />
                    </div>
                    <div className="createpost_footer ">
                      <div className="createpost_footer_links">
                        <Link to={"/addpicture"}>
                          <b style={{ color: "red" }}>+</b> Add Picture
                        </Link>
                        <Link to={"/addpicture"}>
                          <b style={{ color: "red" }}>+</b> Add Video
                        </Link>
                        <Link to={"/addpicture"}>
                          <b style={{ color: "red" }}>+</b> Add Source
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="row createpost_buttons_input">
                    <div className="createpost_input mt-4">
                      <label for="category">Category</label>
                      <input
                        type="text"
                        id="category"
                        placeholder="Select a category for your post"
                      />
                    </div>
                    <div className="createpost_input mt-4">
                      <label for="category">Tags</label>
                      <input
                        type="text"
                        id="category"
                        placeholder="Separated by comma (no more than 5 )"
                      />
                    </div>
                    <div className="createpost_buttons mt-4">
                      <button type="submit">Post</button>
                      <button>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col  d-none d-xl-block">
          <div className="content-30">
            <div className="row">
              <RightProfileCard />
              <RecommendationCard />
              <NewsCorner />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
