import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectPostById } from "../../app/postsSlice";
import PostAuthor from "./PostAuthor";
import PostReactions from "./PostReactions";
import PostTimeAgo from "./PostTimeAgo";

const FullPostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, postId));

  if (!post) {
    return (
      <section>
        <h2>Post Not Found!</h2>
      </section>
    );
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p className="postCredit">
        <Link to={`/post/${postId}/edit`}>Edit Post</Link>
        <PostAuthor userId={post.userId} />
        <PostTimeAgo timeStamp={post.date} />
      </p>
      <PostReactions post={post} />
    </article>
  );
};

export default FullPostPage;
