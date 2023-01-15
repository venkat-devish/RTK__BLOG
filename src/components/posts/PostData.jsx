import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import PostReactions from "./PostReactions";
import PostTimeAgo from "./PostTimeAgo";

const PostData = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 75)}...</p>
      <p className="postCredit">
        <Link to={`/post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <PostTimeAgo timeStamp={post.date} />
      </p>
      <PostReactions post={post} />
    </article>
  );
};

export default PostData;
