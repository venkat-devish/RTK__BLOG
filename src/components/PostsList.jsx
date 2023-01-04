import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  getPostError,
  getPostStatus,
  selectAllPosts,
} from "../features/postsSlice";
import PostData from "./PostData";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const getStatus = useSelector(getPostStatus);
  const getError = useSelector(getPostError);

  useEffect(() => {
    if (getStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [getStatus, dispatch]);

  let content;
  if (getStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (getStatus === "success") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts.map((post) => {
      return <PostData key={post.id} post={post} />;
    });
  } else if (getStatus === "failed") {
    content = <p>{getError}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
