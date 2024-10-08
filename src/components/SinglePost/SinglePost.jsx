import { useState } from "react";
import FeedPostCard from "../Investor/Cards/FeedPost/FeedPostCard";
import "./SinglePost.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  getSavedPostCollections,
  getSinglePostAPI,
  postUserPost,
} from "../../Service/user";
import RightProfileCard from "../Investor/InvestorGlobalCards/RightProfileCard/RightProfileCard";
import RecommendationCard from "../Investor/InvestorGlobalCards/Recommendation/RecommendationCard";
// import NewsCorner from "../Investor/InvestorGlobalCards/NewsCorner/NewsCorner";
import CreatePostPopUp from "../PopUp/CreatePostPopUp/CreatePostPopUp";
import { useSelector } from "react-redux";
import SpinnerBS from "../Shared/Spinner/SpinnerBS";
import MaxWidthWrapper from "../Shared/MaxWidthWrapper/MaxWidthWrapper";
import InvestorRightProfileCard from "../../components/NewInvestor/InvestorRightProfileCard/InvestorRightProfileCard";
import InvestorFeedPostCard from "../NewInvestor/InvesterFeedPostCard/InvestorFeedPostCard";

function SinglePost() {
  const [postData, setPostData] = useState(null);
  const navigate = useNavigate();
  const { _id } = useParams();
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    document.title = "Social Post | The Capital Hub";
    setPostLoading(true);
    getSinglePostAPI(_id)
      .then(({ data }) => {
        setPostData(data);
        return getSavedPostCollections(loggedInUser._id);
      })
      .then(({ data }) => {
        setgetSavedPostData(data);
        setPostLoading(false);
      })
      .catch((err) => {
        console.log("Error showing single post : ", err);
        navigate("/");
      });
  }, [_id]);

  const [repostLoading, setRepostLoading] = useState({
    instant: false,
    withThoughts: false,
  });

  const [respostingPostId, setRepostingPostId] = useState("");

  const repostInstantly = (resharedPostId) => {
    setRepostLoading({ ...repostLoading, instant: true });
    postUserPost({ resharedPostId })
      .then(() => navigate("/home"))
      .catch((err) => console.log(err))
      .finally(() => setRepostLoading({ ...repostLoading, instant: false }));
  };
  const [popupOpen, setPopupOpen] = useState(false);
  const openPopup = () => {
    setPopupOpen(!popupOpen);
  };
  const [newPost, setNewPost] = useState(false);
  const [getSavedPostData, setgetSavedPostData] = useState("");

  return (
    <MaxWidthWrapper>
      <div className="single-post-page">
        {!postLoading ? (
          <>
            {loggedInUser.isInvestor === "true" ? (
              <InvestorFeedPostCard
                userId={postData?.user?._id}
                postId={postData?._id}
                designation={postData?.user?.designation}
                profilePicture={postData?.user?.profilePicture}
                startUpCompanyName={postData?.user?.startUp}
                investorCompanyName={postData?.user?.investor}
                description={postData?.description}
                firstName={postData?.user?.firstName}
                lastName={postData?.user?.lastName}
                oneLinkId={postData?.user?.oneLinkId}
                video={postData?.video}
                image={postData?.image}
                documentName={postData?.documentName}
                documentUrl={postData?.documentUrl}
                createdAt={postData?.createdAt}
                likes={postData?.likes}
                response={getSavedPostData}
                repostWithToughts={(resharedPostId) => {
                  setRepostingPostId(resharedPostId);
                  openPopup();
                }}
                repostInstantly={repostInstantly}
                resharedPostId={postData?.resharedPostId}
                isSinglePost={true}
              />
            ) : (
              <FeedPostCard
                userId={postData?.user?._id}
                postId={postData?._id}
                designation={postData?.user?.designation}
                profilePicture={postData?.user?.profilePicture}
                startUpCompanyName={postData?.user?.startUp}
                investorCompanyName={postData?.user?.investor}
                description={postData?.description}
                firstName={postData?.user?.firstName}
                lastName={postData?.user?.lastName}
                oneLinkId={postData?.user?.oneLinkId}
                video={postData?.video}
                image={postData?.image}
                documentName={postData?.documentName}
                documentUrl={postData?.documentUrl}
                createdAt={postData?.createdAt}
                likes={postData?.likes}
                response={getSavedPostData}
                repostWithToughts={(resharedPostId) => {
                  setRepostingPostId(resharedPostId);
                  openPopup();
                }}
                repostInstantly={repostInstantly}
                resharedPostId={postData?.resharedPostId}
                isSinglePost={true}
              />
            )}
            {popupOpen && (
              <CreatePostPopUp
                setPopupOpen={setPopupOpen}
                popupOpen
                setNewPost={setNewPost}
                respostingPostId={respostingPostId}
              />
            )}
          </>
        ) : (
          <div className="loader">
            <SpinnerBS
              colorClass={"text-secondary"}
              spinnerSizeClass="spinner-border-lg"
            />
          </div>
        )}
        <div className="right-sidebar d-none d-lg-block">
          {loggedInUser.isInvestor === "true" ? (
            <>
              <InvestorRightProfileCard />
              <RecommendationCard isInvestor={true} />
            </>
          ) : (
            <>
              <RightProfileCard />
              <RecommendationCard />
            </>
          )}

          {/* <NewsCorner /> */}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default SinglePost;
