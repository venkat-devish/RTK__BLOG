import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { selectPostById } from "../features/postsSlice";
import PostAuthor from "./PostAuthor";
import ReactionButtons from "./ReactionButtons";
import TimeAgo from "./TimeAgo";

const FullPost = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, +postId));

  if (!post) {
    <section>
      <h2>Post not found!</h2>
    </section>;
  }

  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>

      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </p>

      <ReactionButtons post={post} />
    </article>
  );
};

export default FullPost;
