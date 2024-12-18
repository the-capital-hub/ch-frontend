import React, { useState, useEffect } from "react";
import "./NavigatedCardViewer.scss";
import {
  getSavedPostCollections,
  getSavedPostsByCollection,
} from "../../../../Service/user";
import { useSelector } from "react-redux";
import SavedPostSmallCard from "../../InvestorGlobalCards/SavedPostSmallCard/SavedPostSmallCard";
import SpinnerBS from "../../../Shared/Spinner/SpinnerBS";
import { selectTheme } from "../../../../Store/features/design/designSlice";

const NavigatedCardViewer = () => {
  const [activeHeader, setActiveHeader] = useState("All Saved Posts");
  const [loading, setLoading] = useState(false);
  const theme = useSelector(selectTheme);
  const [allPosts, setAllPosts] = useState([]);
  const [headerTabs, setHeaderTabs] = useState(["All Saved Posts"]);
  const [collectionName, setCollectionName] = useState(null);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  const handleHeaderClick = (header) => {
    setActiveHeader(header);
    setCollectionName(header);
    setLoading(true);
  };

  useEffect(() => {
    setLoading(true);
    getSavedPostCollections(loggedInUser._id)
      .then((res) => {
        const collectionHeaders = res.data.map((val) => val.name);
        setHeaderTabs(["All Saved Posts", ...collectionHeaders]);
        setActiveHeader("All Saved Posts");
        setLoading(false);
      })
      .catch((error) => {
        console.log();
        setLoading(false);
      });
  }, [loggedInUser]);

  useEffect(() => {
    if (headerTabs.length > 0) {
      setCollectionName(headerTabs[0]);
    }
  }, [headerTabs]);

  useEffect(() => {
    if (collectionName) {
      setLoading(true);
      let fetchPosts;
      if (collectionName === "All Saved Posts") {
        fetchPosts = getSavedPostsByCollection(loggedInUser._id, "my saved posts");
      } else {
        fetchPosts = getSavedPostsByCollection(loggedInUser._id, collectionName);
      }

      fetchPosts
        .then((data) => {
          setAllPosts(data.data || []);
          setLoading(false);
        })
        .catch((error) => {
          console.log();
          setAllPosts([]);
          setLoading(false);
        });
    }
  }, [loggedInUser, collectionName, activeHeader]);

  return (
    <div className="navigated_box_container">
      <div className="navigated-card-viewer">
        <div className="navigation-header border-bottom">
          {headerTabs.map((header) => (
            <div
              key={header}
              className={`nav-item ${activeHeader === header ? "active" : ""}`}
              onClick={() => handleHeaderClick(header)}
            >
              {header}
            </div>
          ))}
        </div>
        <div className="card-viewer">
          {loading ? (
            <SpinnerBS
              className={"d-flex py-5 justify-content-center align-items-center w-100"}
              colorClass={"d-l-grey"}
            />
          ) : allPosts.length > 0 ? (
            allPosts.map(
              (
                {
                  description,
                  user: {
                    firstName = "",
                    lastName = "",
                    profilePicture = "",
                    designation = "",
                    _id: userId,
                    oneLinkId = "",
                  } = {},
                  video,
                  image,
                  createdAt,
                  _id,
                  resharedPostId,
                },
                index
              ) => (
                <SavedPostSmallCard
                  activeHeader={activeHeader}
                  userId={userId}
                  key={index}
                  description={description || ""}
                  profilePicture={profilePicture}
                  firstName={firstName}
                  lastName={lastName}
                  oneLinkId={oneLinkId}
                  video={video}
                  image={image}
                  createdAt={createdAt}
                  designation={designation}
                  postId={_id}
                  setAllPosts={setAllPosts}
                  allPosts={allPosts}
                  resharedPostId={resharedPostId}
                />
              )
            )
          ) : (
            <p className="container p-5 text-center my-5 d-l-grey mx-auto" style={{ color: theme === "dark" ? "#fff" : "#000" }}>
              No posts saved
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavigatedCardViewer;
