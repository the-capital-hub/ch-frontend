import React, { useEffect, useState } from "react";
import "./news.scss";
import SmallProfileCard from "../InvestorGlobalCards/TwoSmallMyProfile/SmallProfileCard";
import RightProfileCard from "../InvestorGlobalCards/RightProfileCard/RightProfileCard";
import { useDispatch, useSelector } from "react-redux";
import NewsCorner from "../InvestorGlobalCards/NewsCorner/NewsCorner";
import RecommendationCard from "../InvestorGlobalCards/Recommendation/RecommendationCard";
import SpinnerBS from "../../Shared/Spinner/SpinnerBS";
import MaxWidthWrapper from "../../Shared/MaxWidthWrapper/MaxWidthWrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import { setPageTitle, setShowOnboarding } from "../../../Store/features/design/designSlice";
import { startupOnboardingSteps } from "../../OnBoardUser/steps/startup";
import TutorialTrigger from "../../Shared/TutorialTrigger/TutorialTrigger";
import LookingForFund from "../Feed/Components/LookingForFund/LookingForFund";
import { environment } from "../../../environments/environment";
import NewsCard from "../Feed/Components/NewsCard/NewsCard";

const baseUrl = environment.baseUrl;

const Feed = () => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();
  const [newsData, setNewsData] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const userVisitCount = localStorage.getItem("userVisit");
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (Number(userVisitCount) <= 1) {
      dispatch(setShowOnboarding(true));
    }
  }, [dispatch, userVisitCount]);

  // Fetching NEWS
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${baseUrl}/news/getNewsByDate`);
        const data = await response.json();
        const filteredArticles = data.articles?.filter(article => 
          article.title && 
          article.description && 
          article.url && 
          article.urlToImage && 
          article.publishedAt
        ) || [];
        setNewsData(filteredArticles);
        setHasMore(filteredArticles.length > 0); // Update hasMore based on filtered data
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    document.title = "News | The Capital Hub";
    dispatch(setPageTitle("News"));
  }, [dispatch]);

  return (
    <MaxWidthWrapper>
      <div className="mx-0 feed_container">
        <div className="main_content">
          <div className="Posts__column d-flex flex-column gap-2">
            {/* Small Profile Card */}
            <SmallProfileCard className="d-none d-md-block" text={"News"} />

            {/* Onboarding popup */}
            <TutorialTrigger steps={startupOnboardingSteps.homePage} />

            {/* Looking for funding */}
            <LookingForFund />

            {/* Posts container - column of <FeedPostCard /> */}
            <div className="posts__container d-flex flex-column gap-3">
              <InfiniteScroll
                className="m-0 p-0"
                dataLength={newsData.length}
                hasMore={hasMore}
                loader={
                  <div className="loader_spinner container p-5 text-center my-5 rounded-5 shadow-sm">
                    <SpinnerBS colorClass={"d-l-grey"} />
                  </div>
                }
              >
                {newsData.map(
                  ({ title, description, url, urlToImage, publishedAt }, index) => (
                    <NewsCard 
                      key={index} 
                      title={title} 
                      description={description} 
                      url={url} 
                      urlToImage={urlToImage} 
                      publishedAt={publishedAt} 
                    />
                  )
                )}
              </InfiniteScroll>
            </div>
          </div>
        </div>

        <div className="right_content">
          <RightProfileCard />
          <RecommendationCard />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Feed;
