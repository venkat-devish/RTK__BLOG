import React from "react";
import { Link } from "react-router-dom";
import PostAuthor from "./PostAuthor";
import PostReactions from "./PostReactions";
import PostTimeAgo from "./PostTimeAgo";

const PostData = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <PostTimeAgo timeStamp={post.date} />
      </p>
      <PostReactions post={post} />
    </article>
  );
};

export default PostData;
