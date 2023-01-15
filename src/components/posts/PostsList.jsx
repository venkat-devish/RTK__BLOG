import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  fetchPosts,
  getPostAddedStatus,
  getPostsError,
  getPostsStatus,
  selectAllPosts,
} from "../../app/postsSlice";
import PostData from "./PostData";
import { MetroSpinner, PongSpinner } from "react-spinners-kit";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);
  const addPostStatus = useSelector(getPostAddedStatus);
  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content = <></>;
  if (postsStatus === "loading") {
    content = (
      <div className="spinner">
        <MetroSpinner size={75} color="#333" />
      </div>
    );
  } else if (addPostStatus === "loading") {
    content = (
      <div className="spinner">
        <PongSpinner size={100} color="#333" />
      </div>
    );
  } else if (postsStatus === "success") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => (
      <PostData key={post.id} post={post} />
    ));
  } else if (postsStatus === "error") {
    content = <p>{postsError}</p>;
  }
  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
