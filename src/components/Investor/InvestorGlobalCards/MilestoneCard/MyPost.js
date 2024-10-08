import React, { useEffect, useState } from "react";
import "./style.scss";
import { userPosts } from "../../../../Service/user";
import SpinnerBS from "../../../Shared/Spinner/SpinnerBS";
import MyPostCard from "../../Cards/FeaturedPostCard/MyPostCard";

const MyPost = ({ userId, postDelete, newPost }) => {
  const [allPosts, setAllPosts] = useState(null);
  const [user, setUser] = useState(null);
  const [isDeleteSuccessful, setIsDeleteSuccessful] = useState(false);
  // Fetch featured posts by userId
  useEffect(() => {
    userPosts()
      .then(({ data }) => {
        console.log("ft", data);
        setUser(data.userData);
        setAllPosts(data.allPosts);
      })
      .catch((err) => {
        console.log(err);
        setUser([]);
        setAllPosts([]);
      });
  }, [userId, isDeleteSuccessful]);
  return (
    <div className="card-container ">
      <div className="post_container_div d-flex gap-4 ps-3 w-100 overflow-x-auto">
        {allPosts ? (
          allPosts.length !== 0 ? (
            allPosts.map(
              ({ description, video, image, createdAt, likes, _id }) => (
                <MyPostCard
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
                  setUser={setUser}
                  setAllPosts={setAllPosts}
                  setIsDeleteSuccessful={setIsDeleteSuccessful}
                  isNotEditable
                  postDelete={postDelete}
                />
              )
            )
          ) : (
            <h6 className="text-secondary">No Posts</h6>
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

export default MyPost;
