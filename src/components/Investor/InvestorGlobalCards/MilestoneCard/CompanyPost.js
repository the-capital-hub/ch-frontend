import React, { useEffect, useState } from "react";
import "./style.scss";
import { getCompanyPost } from "../../../../Service/user";
import SpinnerBS from "../../../Shared/Spinner/SpinnerBS";
import CompanyUpdateCard from "../../Cards/FeaturedPostCard/CompanyUpdateCard";

const CompanyPost = ({ userId, postDelete, newPost }) => {
  const [allPosts, setAllPosts] = useState(null);
  const [user, setUser] = useState(null);
  const [isDeleteSuccessful, setIsDeleteSuccessful] = useState(false);

  // Fetch featured posts by userId
  useEffect(() => {
    getCompanyPost(userId)
      .then(({ user }) => {
        setUser(user);
        setAllPosts(user.companyUpdate);
      })
      .catch((err) => {
        console.log(err);
        setUser([]);
        setAllPosts([]);
      });
  }, [userId, newPost]);

  useEffect(() => {
    if (isDeleteSuccessful) {
      getCompanyPost(userId)
        .then(({ user }) => {
          setUser(user);
          setAllPosts(user.companyUpdate);
        })
        .catch((err) => {
          console.log(err);
          setUser([]);
          setAllPosts([]);
        });
      setIsDeleteSuccessful(false);
    }
  }, [isDeleteSuccessful, userId]);

  return (
    <div className="card-container ">
      <div className="post_container_div d-flex gap-4 ps-3 w-100 overflow-x-auto">
        {allPosts ? (
          allPosts.length !== 0 ? (
            allPosts.map(
              ({ description, video, image, createdAt, likes, _id }) => (
                <CompanyUpdateCard
                  key={_id} // Use a unique key for each post
                  postId={_id}
                  userId={userId}
                  designation={user?.designation}
                  profilePicture={user?.profilePicture}
                  description={description}
                  firstName={user?.firstName}
                  lastName={user?.lastName}
                  oneLinkId={user?.oneLinkId}
                  video={video}
                  image={image}
                  createdAt={createdAt}
                  likes={likes}
                  setIsDeleteSuccessful={setIsDeleteSuccessful}
                  isNotEditable
                  postDelete={postDelete}
                />
              )
            )
          ) : (
            <h6 className="text-secondary">No Company Update Posts</h6>
          )
        ) : (
          <SpinnerBS
            className={
              "d-flex justify-content-center align-items-center w-100 py-5"
            }
          />
        )}
      </div>
    </div>
  );
};

export default CompanyPost;
