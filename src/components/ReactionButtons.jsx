import React from "react";
import { useDispatch } from "react-redux";
import { reactionAdded } from "../features/postsSlice";

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
};
const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  const reactionButtonEmojis = Object.entries(reactionEmoji).map(
    ([emojiName, emoji]) => {
      return (
        <button
          className="reactionButton"
          key={emojiName}
          onClick={() => {
            dispatch(
              reactionAdded({ postId: post.id, reactionName: emojiName })
            );
          }}
        >
          {emoji} {post.reactions[emojiName]}
        </button>
      );
    }
  );
  console.log(reactionButtonEmojis);

  return <div>{reactionButtonEmojis}</div>;
};

export default ReactionButtons;
