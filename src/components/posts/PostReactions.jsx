import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "../../app/postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};
const PostReactions = ({ post }) => {
  const dispatch = useDispatch();
  const reactionButton = Object.entries(reactionEmoji).map(([eName, emoji]) => {
    return (
      <button
        key={eName}
        className="reactionButton"
        onClick={() => {
          dispatch(reactionAdded({ postId: post.id, reactionName: eName }));
        }}
      >
        {emoji} {post.reactions[eName]}
      </button>
    );
  });
  return <div>{reactionButton}</div>;
};

export default PostReactions;
